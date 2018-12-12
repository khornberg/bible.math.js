import books from './books';

class Bible {
  constructor() {
    this.books = books;
    var _bookIndex = -1,
      _chapter1 = -1,
      _verse1 = -1,
      _chapter2 = -1,
      _verse2 = -1,
      args = arguments;

    if (args.length === 0) {
      // error
    } else if (args.length == 1 && typeof args[0] == 'string') {
      // a string that needs to be parsed
      return this.parseReference(args[0]);
    } else if (args.length == 1) {
      // unknown
      return null;
    } else {
      _bookIndex = args[0];
      _chapter1 = args[1];
      if (args.length >= 3) _verse1 = args[2];
      if (args.length >= 4) _chapter2 = args[3];
      if (args.length >= 5) _verse2 = args[4];
    }
    this.bookIndex = _bookIndex;
    this.chapter = _chapter1;
    this.verse = _verse1;
    this.chapter1 = _chapter1;
    this.verse1 = _verse1;
    this.chapter2 = _chapter2;
    this.verse2 = _verse2;
  }

  get_reference() {
    return {
      bookIndex: this.bookIndex,
      chapter: this.chapter,
      verse: this.verse,
      chapter1: this.chapter1,
      verse1: this.verse1,
      chapter2: this.chapter2,
      verse2: this.verse2
    };
  }

  set_reference(reference) {
    this.bookIndex = reference.bookIndex;
    this.chapter = reference.chapter;
    this.verse = reference.verse;
    this.chapter1 = reference.chapter1;
    this.verse1 = reference.verse1;
    this.chapter2 = reference.chapter2;
    this.verse2 = reference.verse2;
    return this.get_reference();
  }

  parseReference(textReference) {
    var bookIndex = -1,
      chapter1 = -1,
      verse1 = -1,
      chapter2 = -1,
      verse2 = -1,
      textRef = this.replaceRoman(textReference),
      input = textRef
        .replace('&ndash;', '-')
        .replace('–', '-')
        .replace(/(\d+[.:])\s+(\d+)/gi, '$1$2'),
      i,
      j,
      il,
      jl,
      afterRange = false,
      afterSeparator = false,
      startedNumber = false,
      currentNumber = '',
      name,
      possibleMatch = null,
      c;
    // take the entire reference (John 1:1 or 1 Cor) and move backwards until we find a letter or space
    // 'John 1:1' => 'John '
    // '1 Cor' => '1 Cor'
    // 'July15' => 'July'
    for (i = input.length; i >= 0; i--) {
      if (/[A-Za-z\s]/.test(input.substring(i - 1, i))) {
        possibleMatch = input.substring(0, i);
        break;
      }
    }

    if (possibleMatch !== null) {
      // tear off any remaining spaces
      // 'John ' => 'John'
      possibleMatch = possibleMatch
        .replace(/\s+$/, '')
        .replace(/\.+$/, '')
        .toLowerCase();

      // go through all books and test all names
      for (i = 0, il = this.books.length; i < il && bookIndex == -1; i++) {
        // test each name starting with the full name, then short code, then abbreviation, then alternates
        for (j = 0, jl = this.books[i].names.length; j < jl; j++) {
          name = this.books[i].names[j].toLowerCase();

          if (possibleMatch == name) {
            bookIndex = i;
            input = input.substring(name.length);
            break;
          }
        }
      }

      if (bookIndex > -1) {
        for (i = 0; i < input.length; i++) {
          c = input.charAt(i);

          if (c == ' ' || isNaN(c)) {
            if (!startedNumber) continue;

            if (c == '-' || c == '–') {
              afterRange = true;
              afterSeparator = false;
            } else if (c == ':' || c == ',' || c == '.') {
              afterSeparator = true;
            } else {
              // ignore
            }

            // reset
            currentNumber = '';
            startedNumber = false;
          } else {
            startedNumber = true;
            currentNumber += c;

            if (afterSeparator) {
              if (afterRange) {
                verse2 = parseInt(currentNumber, 10);
              } else {
                // 1:1
                verse1 = parseInt(currentNumber, 10);
              }
            } else {
              if (afterRange) {
                chapter2 = parseInt(currentNumber, 10);
              } else {
                // 1
                chapter1 = parseInt(currentNumber, 10);
              }
            }
          }
        }

        // for books with only one chapter, treat the chapter as a vers
        if (this.books[bookIndex].verses.length == 1) {
          // Jude 6 ==> Jude 1:6
          if (chapter1 > 1 && verse1 == -1) {
            verse1 = chapter1;
            chapter1 = 1;
          }
        }

        // reassign 1:1-2
        if (chapter1 > 0 && verse1 > 0 && chapter2 > 0 && verse2 <= 0) {
          verse2 = chapter2;
          chapter2 = chapter1;
        }
        // fix 1-2:5
        if (chapter1 > 0 && verse1 <= 0 && chapter2 > 0 && verse2 > 0) {
          verse1 = 1;
        }

        // just book
        if (bookIndex > -1 && chapter1 <= 0 && verse1 <= 0 && chapter2 <= 0 && verse2 <= 0) {
          chapter1 = 1;
          //verse1 = 1;
        }

        // validate max chapter
        if (typeof this.books[bookIndex].verses != 'undefined') {
          if (chapter1 == -1) {
            chapter1 = 1;
          } else if (chapter1 > this.books[bookIndex].verses.length) {
            chapter1 = this.books[bookIndex].verses.length;
            if (verse1 > 0) verse1 = 1;
          }

          // validate max verse
          if (verse1 > this.books[bookIndex].verses[chapter1 - 1]) {
            verse1 = this.books[bookIndex].verses[chapter1 - 1];
          }
          if (chapter1 === chapter2 && verse2 <= verse1) {
            chapter2 = -1;
            verse2 = -1;
          }
        }
      }
    }
    // finalize
    return new Bible(bookIndex, chapter1, verse1, chapter2, verse2);
  }

  replaceRoman(str) {
    // get roman numerals from string
    var matches = str.match(/((CM|CD)|(D)?(C){0,3})((XC|XL)|(L)?(X){0,3})((IX|IV)|(V)?(I){0,3})(?=(\s|[.,;:-])|$)/gi);

    // remove "", null, undefined, and 0
    matches = matches.filter(function(e) {
      return e;
    });

    // replace the roman numerals with arabic numerals
    for (var i = matches.length - 1; i >= 0; i--) {
      var arabicNumeral = this.romanToArabic(matches[i]);
      var romanNumeral = new RegExp('\\b' + matches[i] + '(?=(\\s|[.,;:-])|$)', 'gi');
      str = str.replace(romanNumeral, arabicNumeral);
    }

    return str;
  }

  romanToArabic(romanNumeral) {
    var romanNumerals = [
      [100, 'C'],
      [90, 'XC'],
      [50, 'L'],
      [40, 'XL'],
      [10, 'X'],
      [9, 'IX'],
      [5, 'V'],
      [4, 'IV'],
      [1, 'I']
    ];

    // Test if string is a valid roman numeral
    var rom = '^((CM|CD)|(D)?(C){0,3})((XC|XL)|(L)?(X){0,3})((IX|IV)|(V)?(I){0,3})$';
    var romanRegExp = new RegExp(rom, 'mi');
    if (romanRegExp.test(romanNumeral)) {
      var n = 0;
      for (var i = 0; i < romanNumerals.length; ++i) {
        for (
          var x = romanNumerals[i], l = x[1].length;
          romanNumeral.substr(0, l).toUpperCase() == x[1];
          romanNumeral = romanNumeral.substr(l).toUpperCase()
        )
          n += x[0];
      }
      return n;
    } else {
      return romanNumeral;
    }
  }

  isValid() {
    return this.bookIndex > -1 && this.bookIndex < this.books.length && this.chapter1 > 0;
  }

  chapterAndVerse(cvSeparator, vvSeparator, ccSeparator) {
    cvSeparator = cvSeparator || ':';
    vvSeparator = vvSeparator || '-';
    ccSeparator = ccSeparator || '-';

    var chapter1 = this.chapter1,
      chapter2 = this.chapter2,
      verse1 = this.verse1,
      verse2 = this.verse2;

    if (chapter1 > 0 && verse1 <= 0 && chapter2 <= 0 && verse2 <= 0)
      // John 1
      return chapter1;
    else if (chapter1 > 0 && verse1 > 0 && chapter2 <= 0 && verse2 <= 0)
      // John 1:1
      return chapter1 + cvSeparator + verse1;
    else if (chapter1 > 0 && verse1 > 0 && chapter2 <= 0 && verse2 > 0)
      // John 1:1-5
      return chapter1 + cvSeparator + verse1 + vvSeparator + verse2;
    else if (chapter1 > 0 && verse1 <= 0 && chapter2 > 0 && verse2 <= 0)
      // John 1-2
      return chapter1 + ccSeparator + chapter2;
    else if (chapter1 > 0 && verse1 > 0 && chapter2 > 0 && verse2 > 0)
      // John 1:1-2:2
      return (
        chapter1 + cvSeparator + verse1 + ccSeparator + (chapter1 != chapter2 ? chapter2 + cvSeparator : '') + verse2
      );
    else return '?';
  }

  toString() {
    if (this.bookIndex < 0 || this.bookIndex >= this.books.length) return 'invalid';

    return this.books[this.bookIndex].names[0] + ' ' + this.chapterAndVerse();
  }

  toShortUrl() {
    if (this.bookIndex < 0 || this.bookIndex >= this.books.length) return 'invalid';
    return 'http://bib.ly/' + this.books[this.bookIndex].names[1] + this.chapterAndVerse('.', '-', '-');
  }

  /**
   * Add verses to a bible reference
   * @param {object} reference A bible.Reference object
   * @param {int} verses Number of verses to add
   */
  add() {
    let args = arguments;
    let verses = args.length === 1 ? args[0] : args[1];
    let reference = args.length === 1 ? this.get_reference() : args[0];
    // validate
    if (!this.isNumber(verses)) {
      throw '(bible.math.add) verses not a number';
    }

    if (!this.isValidReference(reference)) {
      throw '(bible.math.add) reference invalid';
    }
    this.denormalize(reference);
    // account for single chapter references
    reference.verse1 = reference.verse1 === -1 && reference.chapter1 >= 0 ? 1 : reference.verse1;
    while (verses !== 0) {
      var chapterVerses = this.books[reference.bookIndex].verses[reference.chapter1];

      if (reference.verse1 + verses <= chapterVerses) {
        reference.verse1 = reference.verse1 + verses;
        verses = 0;
      } else {
        verses = Math.abs(chapterVerses - reference.verse1 - verses);
        reference.verse1 = 0;
      }

      if (verses !== 0) {
        var nextChapter = reference.chapter1 + 1;
        //-1 for 0 indexed array
        if (this.books[reference.bookIndex].verses.length - 1 < nextChapter) {
          // Cannot add past the end of the bible
          if (reference.bookIndex === 65) {
            reference.verse1 = 21;
            break;
          } else {
            reference.bookIndex++;
            reference.chapter1 = 0;
          }
        } else {
          reference.chapter1++;
        }
      }
    }
    this.normalize(reference);
    return this.set_reference(reference);
  }

  /**
   * Subtract verses from a bible reference
   * @param {object} reference A bible.Reference object
   * @param {int} verses Number of verses to subtract
   */
  subtract() {
    let args = arguments;
    let verses = args.length === 1 ? args[0] : args[1];
    let reference = args.length === 1 ? this.get_reference() : args[0];
    // validate
    if (!this.isNumber(verses)) {
      throw '(bible.math.subtract) verses not a number';
    }
    if (!this.isValidReference(reference)) {
      throw '(bible.math.subtract) reference invalid';
    }
    this.denormalize(reference);
    // account for single chapter references
    reference.verse1 = reference.verse1 === -1 && reference.chapter1 >= 0 ? 1 : reference.verse1;
    while (verses !== 0) {
      if (reference.verse1 - verses > 0) {
        reference.verse1 = reference.verse1 - verses;
        verses = 0;
      } else if (reference.verse1 - verses === 0) {
        reference.bookIndex--;
        reference.chapter1 = this.books[reference.bookIndex].verses.length - 1;
        reference.verse1 = this.books[reference.bookIndex].verses[reference.chapter1];
        verses = 0;
      } else {
        verses = Math.abs(reference.verse1 - verses);
      }
      if (verses !== 0) {
        var previousChapter = reference.chapter1 - 1;
        //0 indexed array
        if (previousChapter < 0) {
          // Cannot subtract past the beginning of the bible
          if (reference.bookIndex === 0) {
            reference.verse1 = 1;
            break;
          } else {
            reference.bookIndex--;
            reference.chapter1 = this.books[reference.bookIndex].verses.length - 1;
            reference.verse1 = this.books[reference.bookIndex].verses[reference.chapter1] + 1;
          }
        } else {
          reference.chapter1--;
          reference.verse1 = this.books[reference.bookIndex].verses[reference.chapter1];
        }
      }
    }
    this.normalize(reference);
    return this.set_reference(reference);
  }

  distance() {
    //arguments received
    var args = arguments;
    var chapters = null;
    var verses = null;
    var startRef = null;
    var endRef = null;

    // Valid references?
    if (!this.isValidReference(args[0])) {
      throw '(bible.math.distance) reference1 invalid';
    }
    if (typeof args[1] !== 'undefined') {
      if (!this.isValidReference(args[1])) {
        throw '(bible.math.distance) reference2 invalid';
      }
    }

    // Reference book check
    if (args[0].bookIndex < 0 || args[0].bookIndex > 65) return { chapters: null, verses: null };

    // Sort references based on book order
    if (args.length > 1) {
      if (args[0].bookIndex <= args[1].bookIndex) {
        startRef = args[0];
        endRef = args[1];
      } else {
        startRef = args[1];
        endRef = args[0];
      }
    }

    // Normalize chapters to 0 based arrays
    for (var i = 0; i < args.length; i++) {
      this.denormalize(args[i]);
    }

    //1 argument
    if (args.length == 1) {
      // whole book ref passed
      if (args[0].chapter1 === -1 && args[0].chapter2 === -1) {
        verses = this.books[args[0].bookIndex].verses.reduce(function(a, b) {
          return a + b;
        }, 0);
        chapters = this.books[args[0].bookIndex].verses.length;
      }

      // single whole chapter ref passed
      else if (args[0].chapter1 >= 0 && args[0].chapter2 === -1 && args[0].verse1 === -1 && args[0].verse2 === -1) {
        verses = this.books[args[0].bookIndex].verses[args[0].chapter1];
        chapters = 0;
      }

      // single chapter and verse
      else if (args[0].chapter1 >= 0 && args[0].chapter2 === -1 && args[0].verse1 >= 0 && args[0].verse2 === -1) {
        verses = 1;
        chapters = 0;
      }

      // chapter1 and chapter2 are whole chapters
      else if (args[0].chapter1 >= 0 && args[0].chapter2 >= 0 && args[0].verse1 === -1 && args[0].verse2 === -1) {
        for (var ch = args[0].chapter2; ch >= args[0].chapter1; ch--) {
          verses += this.books[args[0].bookIndex].verses[ch];
        }
        chapters = Math.abs(args[0].chapter2 - args[0].chapter1);
      }

      // distance between chapter1, verse1 and chapter2, verse2
      if (args[0].chapter1 !== -1 && args[0].verse1 !== -1 && args[0].chapter2 !== -1 && args[0].verse2 !== -1) {
        verses =
          args[0].verse2 +
          this.verseDistance(args[0].bookIndex, args[0].chapter1, args[0].chapter2) -
          args[0].verse1 +
          1;
        chapters = args[0].chapter2 - args[0].chapter1;
      }

      //chapter2 and verse2 are not set, expects a second argument
      //neither distance can be calculated, returning null
      else {
        this.normalize(args[0]);
        return { chapters: chapters, verses: verses };
      }

      this.normalize(args[0]);
    }
    //2 arguments, any more are ignored
    else {
      // Book indices are different
      if (startRef.bookIndex !== endRef.bookIndex) {
        var startBook = 0;
        var versesBegin = 0;
        var versesMiddle = 0;
        var versesEnd = 0;
        var chaptersBegin = 0;
        var chaptersMiddle = 0;
        var chaptersEnd = 0;

        startBook = this.books[startRef.bookIndex].verses.length;
        versesBegin = this.verseDistance(startRef.bookIndex, startRef.chapter1, startBook) - startRef.verse1 + 1;
        chaptersBegin = startBook - startRef.chapter1;
        versesEnd = this.verseDistance(endRef.bookIndex, 0, endRef.chapter1) + endRef.verse;
        chaptersEnd = endRef.chapter1;

        //whole book distances
        for (let b = startRef.bookIndex + 1; b < endRef.bookIndex; b++) {
          versesMiddle = this.verseDistance(b, 0, this.books[b].verses.length) + versesMiddle;
          chaptersMiddle += this.books[b].verses.length;
        }

        verses = versesBegin + versesMiddle + versesEnd;
        chapters = chaptersBegin + chaptersMiddle + chaptersEnd;
      } else {
        verses =
          endRef.verse1 +
          this.verseDistance(startRef.bookIndex, startRef.chapter1, endRef.chapter1) -
          startRef.verse1 +
          1;
        chapters = endRef.chapter1 - startRef.chapter1;
      }

      this.normalize(startRef);
      this.normalize(endRef);
    }

    return { chapters: chapters, verses: verses };
  }

  /**
   * Calculate distance between two chapters of a book
   * @param {int} bookIndex Book in bible.js
   * @param {int} chapter1 Index of chapter
   * @param {int} chapter2 Index of chapter
   */
  verseDistance(bookIndex, chapter1, chapter2) {
    var chapters = this.books[bookIndex].verses;
    var verses = 0;
    //single chapter
    if (chapter1 == chapter2) return 0;

    for (let i = chapter1; i < chapter2; i++) {
      verses = chapters[i] + verses;
    }

    return verses;
  }

  /**
   * Changes chapter numbers to 0 based arrays (subtracts 1 from the chapters)
   * @param {object} reference Reference passed by reference
   */
  denormalize(reference) {
    reference.chapter1 = reference.chapter1 > 0 ? reference.chapter1 - 1 : reference.chapter1;
    reference.chapter2 = reference.chapter2 > 0 ? reference.chapter2 - 1 : reference.chapter2;
  }

  /**
   * Changes chapter numbers to 1 based arrays (add 1 to the chapters)
   * @param {object} reference Reference passed by reference
   */
  normalize(reference) {
    reference.chapter1 = reference.chapter1 >= 0 ? reference.chapter1 + 1 : reference.chapter1;
    reference.chapter2 = reference.chapter2 >= 0 ? reference.chapter2 + 1 : reference.chapter2;
  }

  /**
   * Checks if varible is a number
   * @param {number} number of verses to add or subtract
   * Entirely taken from underscore.js
   */
  isNumber(verses) {
    return toString.call(verses) == '[object Number]';
  }

  /**
   * Most minimal check for valid reference object
   * @param {object} reference
   * Entirely taken from bible.reference.js
   */
  isValidReference(reference) {
    return (
      reference.bookIndex > -1 &&
      reference.bookIndex < this.books.length &&
      (reference.chapter1 > 0 || (reference.chapter === -1 && reference.chapter1 === -1))
    );
  }

}

export default Bible;
