var bible = {};
(function () {
	// splits the names into multiples
	var split = function(input) {
			return input.split(' ');
		},
		//
		ordinals = function(number,input) {
			var parts = input.split(' '),
				result = [],
				ords = null,
				i,il,j,jl;
			if (number == 1) {
				ords = ['1','I','First'];
			} else if (number ==2) {
				ords = ['2','II','Second'];
			} else if (number == 3) {
				ords = ['3','III','Third'];
			}
			for (i=0,il=parts.length; i<il; i++) {
				for (j=0,jl=ords.length; j<jl; j++) {
					// 1 John
					result.push(ords[j] + ' ' + parts[i]);
					// 1John
					if (j === 0) {
						result.push(ords[j] + parts[i]);
					}
				}
			}

			// second item should be short URL version
			result.unshift(ords[0] + parts[1]);
			// first should be the full name
			result.unshift(ords[0] + ' ' + parts[0]);

			return result;
		};


bible.Books = [
{
	names:split('Genesis Ge Gen')
	,verses:[31,25,24,26,32,22,24,22,29,32,32,20,18,24,21,16,27,33,38,18,34,24,20,67,34,35,46,22,35,43,55,32,20,31,29,43,36,30,23,23,57,38,34,34,28,34,31,22,33,26]
},
{
	names:split('Exodus Ex Exo')
	,verses:[22,25,22,31,23,30,25,32,35,29,10,51,22,31,27,36,16,27,25,26,36,31,33,18,40,37,21,43,46,38,18,35,23,35,35,38,29,31,43,38]
},
{
	names:split('Leviticus Le Lev')
	,verses:[17,16,17,35,19,30,38,36,24,20,47,8,59,57,33,34,16,30,37,27,24,33,44,23,55,46,34]
},
{
	names:split('Numbers Nu Num')
	,verses:[54,34,51,49,31,27,89,26,23,36,35,16,33,45,41,50,13,32,22,29,35,41,30,25,18,65,23,31,40,16,54,42,56,29,34,13]
},
{
	names:split('Deuteronomy Dt Deut Deu De')
	,verses:[46,37,29,49,33,25,26,20,29,22,32,32,18,29,23,22,20,22,21,20,23,30,25,22,19,19,26,68,29,20,30,52,29,12]
},
{
	names:split('Joshua Js Jos Jos Josh')
	,verses:[18,24,17,24,15,27,26,35,27,43,23,24,33,15,63,10,18,28,51,9,45,34,16,33]
},
{
	names:split('Judges Jg Jud Jdg Ju Jdgs Judg')
	,verses:[36,23,31,24,31,40,25,35,57,18,40,15,25,20,20,31,13,31,30,48,25]
},
{
	names:split('Ruth Ru Rut')
	,verses:[22,23,18,22]
},
{
	names:ordinals(1,'Samuel Sa Sam')
	,verses:[28,36,21,22,12,21,17,22,27,27,15,25,23,52,35,23,58,30,24,42,15,23,29,22,44,25,12,25,11,31,13]
},
{
	names:ordinals(2,'Samuel Sa Sam')
	,verses:[27,32,39,12,25,23,29,18,13,19,27,31,39,33,37,23,29,33,43,26,22,51,39,25]
},
{
	names:ordinals(1,'Kings Ki King Kin Kngs')
	,verses:[53,46,28,34,18,38,51,66,28,29,43,33,34,31,34,34,24,46,21,43,29,53]
},
{
	names:ordinals(2,'Kings Ki King Kin Kngs')
	,verses:[18,25,27,44,27,33,20,29,37,36,21,21,25,29,38,20,41,37,37,21,26,20,37,20,30]
},
{
	names:ordinals(1,'Chronicles Ch Chr')
	,verses:[54,55,24,43,26,81,40,40,44,14,47,40,14,17,29,43,27,17,19,8,30,19,32,31,31,32,34,21,30]
},
{
	names:ordinals(2,'Chronicles Ch Chr')
	,verses:[17,18,17,22,14,42,22,18,31,19,23,16,22,15,19,14,19,34,11,37,20,12,21,27,28,23,9,27,36,27,21,33,25,33,27,23]
},
{
	names:split('Ezra Ez Ezr')
	,verses:[11,70,13,24,17,22,28,36,15,44]
},
{
	names:split('Nehemiah Ne Neh Neh Ne')
	,verses:[11,20,32,23,19,19,73,18,38,39,36,47,31]
},
{
	names:split('Esther Es Est Esth Ester')
	,verses:[22,23,15,17,14,14,10,17,32,3]
},
{
	names:split('Job Jb Job')
	,verses:[22,13,26,21,27,30,21,22,35,22,20,25,28,22,35,22,16,21,29,29,34,30,17,25,6,14,23,28,25,31,40,22,33,37,16,33,24,41,30,24,34,17]
},
{
	names:split('Psalm Ps Psa Pss')
	,verses:[6,12,8,8,12,10,17,9,20,18,7,8,6,7,5,11,15,50,14,9,13,31,6,10,22,12,14,9,11,12,24,11,22,22,28,12,40,22,13,17,13,11,5,26,17,11,9,14,20,23,19,9,6,7,23,13,11,11,17,12,8,12,11,10,13,20,7,35,36,5,24,20,28,23,10,12,20,72,13,19,16,8,18,12,13,17,7,18,52,17,16,15,5,23,11,13,12,9,9,5,8,28,22,35,45,48,43,13,31,7,10,10,9,8,18,19,2,29,176,7,8,9,4,8,5,6,5,6,8,8,3,18,3,3,21,26,9,8,24,13,10,7,12,15,21,10,20,14,9,6]
},
{
	names:split('Proverbs Pr Prov Pro')
	,verses:[33,22,35,27,23,35,27,36,18,32,31,28,25,35,33,33,28,24,29,30,31,29,35,34,28,28,27,28,27,33,31]
},
{
	names:split('Ecclesiastes Ec Ecc')
	,verses:[18,26,22,16,20,12,29,17,18,20,10,14]
},
{
	names:['Song of Solomon','SOS','Song of Songs', 'SongOfSongs']
	,verses:[17,17,11,16,16,13,13,14]
},
{
	names:split('Isaiah Isa')
	,verses:[31,22,26,6,30,13,25,22,21,34,16,6,22,32,9,14,14,7,25,6,17,25,18,23,12,21,13,29,24,33,9,20,24,17,10,22,38,22,8,31,29,25,28,28,25,13,15,22,26,11,23,15,12,17,13,12,21,14,21,22,11,12,19,12,25,24]
},
{
	names:split('Jeremiah Je Jer')
	,verses:[19,37,25,31,31,30,34,22,26,25,23,17,27,22,21,21,27,23,15,18,14,30,40,10,38,24,22,17,32,24,40,44,26,22,19,32,21,28,18,16,18,22,13,30,5,28,7,47,39,46,64,34]
},
{
	names:split('Lamentations La Lam Lament')
	,verses:[22,22,66,22,22]
},
{
	names:split('Ezekiel Ek Ezek Eze')
	,verses:[28,10,27,17,17,14,27,18,11,22,25,28,23,23,8,63,24,32,14,49,32,31,49,27,17,21,36,26,21,26,18,32,33,31,15,38,28,23,29,49,26,20,27,31,25,24,23,35]
},
{
	names:split('Daniel Da Dan Dl Dnl')
	,verses:[21,49,30,37,31,28,28,27,27,21,45,13]
},
{
	names:split('Hosea Ho Hos')
	,verses:[11,23,5,19,15,11,16,14,17,15,12,14,16,9]
},
{
	names:split('Joel Jl Joel Joe')
	,verses:[20,32,21]
},
{
	names:split('Amos Am Amos Amo')
	,verses:[15,16,15,13,27,14,17,14,15]
},
{
	names:split('Obadiah Ob Oba Obd Odbh')
	,verses:[21]
},
{
	names:split('Jonah Jh Jon Jnh')
	,verses:[17,10,10,11]
},
{
	names:split('Micah Mi Mic')
	,verses:[16,13,12,13,15,16,20]
},
{
	names:split('Nahum Na Nah Na')
	,verses:[15,13,19]
},
{
	names:split('Habakkuk Hb Hab Hk Habk')
	,verses:[17,20,19]
},
{
	names:split('Zephaniah Zp Zep Zeph Ze')
	,verses:[18,15,20]
},
{
	names:split('Haggai Ha Hag Hagg')
	,verses:[15,23]
},
{
	names:split('Zechariah Zc Zech Zec')
	,verses:[21,13,10,14,11,15,14,23,17,12,17,14,9,21]
},
{
	names:split('Malachi Ml Mal Mlc')
	,verses:[14,17,18,6]
},
{
	names:split('Matthew Mt Matt Mat')
	,verses:[25,23,17,25,48,34,29,34,38,42,30,50,58,36,39,28,27,35,30,34,46,46,39,51,46,75,66,20]
},
{
	names:split('Mark Mk Mrk')
	,verses:[45,28,35,41,43,56,37,38,50,52,33,44,37,72,47,20]
},
{
	names:split('Luke Lk Luk Lu')
	,verses:[80,52,38,44,39,49,50,56,62,42,54,59,35,35,32,31,37,43,48,47,38,71,56,53]
},
{
	names:split('John Jn Joh Jo')
	,verses:[51,25,36,54,47,71,53,59,41,42,57,50,38,31,27,33,26,40,42,31,25]
},
{
	names:split('Acts Ac Act')
	,verses:[26,47,26,37,42,15,60,40,43,48,30,25,52,28,41,40,34,28,41,38,40,30,35,27,27,32,44,31]
},
{
	names:split('Romans Ro Rom Rmn Rmns')
	,verses:[32,29,31,25,21,23,25,39,33,21,36,21,14,23,33,27]
},
{
	names:ordinals(1,'Corinthians Co Cor')
	,verses:[31,16,23,21,13,20,40,13,27,33,34,31,13,40,58,24]
},
{
	names:ordinals(2,'Corinthians Co Cor')
	,verses:[24,17,18,18,21,18,16,24,15,18,33,21,14]
},
{
	names:split('Galatians Ga Gal Gltns')
	,verses:[24,21,29,31,26,18]
},
{
	names:split('Ephesians Ep Eph Ephn')
	,verses:[23,22,21,32,33,24]
},
{
	names:split('Philippians Phi Phil Phi')
	,verses:[30,30,21,23]
},
{
	names:split('Colossians Co Col Colo Cln Clns')
	,verses:[29,23,25,18]
},
{
	names:ordinals(1,'Thessalonians Th Thess Thes')
	,verses:[10,20,13,18,28]
},
{
	names:ordinals(2,'Thessalonians Th Thess Thes')
	,verses:[12,17,18]
},
{
	names:ordinals(1,'Timothy Ti Tim')
	,verses:[20,15,16,16,25,21]
},
{
	names:ordinals(2,'Timothy Ti Tim')
	,verses:[18,26,17,22]
},
{
	names:split('Titus Ti Tit Tt Ts')
	,verses:[16,15,15]
},
{
	names:split('Philemon Pm Phile Philm Pm')
	,verses:[25]
},
{
	names:split('Hebrews He Heb Hw')
	,verses:[14,18,19,16,14,20,28,13,28,39,40,29,25]
},
{
	names:split('James Jm Jam Jas Ja')
	,verses:[27,26,18,17,20]
},
{
	names:ordinals(1,'Peter Pe Pet P')
	,verses:[25,25,22,19,14]
},
{
	names:ordinals(2,'Peter Pe Pet P')
	,verses:[21,22,18]
},
{
	names:ordinals(1,'John Joh Jo Jn J')
	,verses:[10,29,24,21,21]
},
{
	names:ordinals(2,'John Joh Jo Jn J')
	,verses:[13]
},
{
	names:ordinals(3,'John Joh Jo Jn J')
	,verses:[14]
},
{
	names:split('Jude Jude')
	,verses:[25]
},
{
	names:split('Revelation Re Rev Rvltn')
	,verses:[20,29,22,11,14,17,17,13,21,11,19,17,18,20,8,21,18,24,21,15,27,20]
}
];
})();
bible.genNames= function() {
	var names = [],
		i = 0,
		il = bible.Books.length;
	for (; i<il; i++) {
		names.push( bible.Books[i].names.join('|') );
	}

	return names.join('|');
};;bible.parseReference = function (textReference) {

	var 
		bookIndex = -1,
		chapter1 = -1,
		verse1 = -1,
		chapter2 = -1,
		verse2 = -1,
		textRef = bible.replaceRoman(textReference),
		input = textRef.replace('&ndash;','-').replace('–','-').replace(/(\d+[\.:])\s+(\d+)/gi, '$1$2'),
		i, j, il, jl,
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
	for (i=input.length; i>=0; i--) {
		if (/[A-Za-z\s]/.test(input.substring(i-1,i))) {
			possibleMatch = input.substring(0,i);					
			break;
		}
	}
	
	if (possibleMatch !== null) {
		
		// tear off any remaining spaces
		// 'John ' => 'John'
		possibleMatch = possibleMatch.replace(/\s+$/,'').replace(/\.+$/,'').toLowerCase();

		// go through all books and test all names
		for (i = 0, il = bible.Books.length ; i < il && bookIndex == -1; i++) {
			// test each name starting with the full name, then short code, then abbreviation, then alternates
			for (j = 0, jl = bible.Books[i].names.length; j<jl; j++) {
				name = bible.Books[i].names[j].toLowerCase();

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
					if (!startedNumber)
						continue;

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
						} else { // 1:1
							verse1 = parseInt(currentNumber, 10);
						}
					} else {
						if (afterRange) {
							chapter2 = parseInt(currentNumber, 10);
						} else { // 1
							chapter1 = parseInt(currentNumber, 10);
						}
					}
				}
			}
			
			// for books with only one chapter, treat the chapter as a vers
			if (bible.Books[bookIndex].verses.length == 1) {
				
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
			if ( typeof bible.Books[bookIndex].verses  != 'undefined') {
				if (chapter1 == -1) {
					chapter1 = 1;
				} else if (chapter1 > bible.Books[bookIndex].verses.length) {
					chapter1 = bible.Books[bookIndex].verses.length;
					if (verse1 > 0)
						verse1 = 1;
				}

				// validate max verse
				if (verse1 > bible.Books[bookIndex].verses[chapter1 - 1]) {
					verse1 = bible.Books[bookIndex].verses[chapter1 - 1];
				}
				if (chapter1 === chapter2 && verse2 <= verse1) {
					chapter2 = -1;
					verse2 = -1;
				}
			}
		}
	}
	// finalize
	return bible.Reference(bookIndex, chapter1, verse1, chapter2, verse2);
};

bible.replaceRoman = function(str) {
	// get roman numerals from string
	var matches = str.match(/((CM|CD)|(D)?(C){0,3})((XC|XL)|(L)?(X){0,3})((IX|IV)|(V)?(I){0,3})(?=(\s|[\.,;:-])|$)/gi);

	// remove "", null, undefined, and 0
	matches = matches.filter(function(e){
        return e;
    });
        
	// replace the roman numerals with arabic numerals
	for (var i = matches.length - 1; i >= 0; i--) {
		var arabicNumeral = bible.romanToArabic(matches[i]);
		var romanNumeral = new RegExp('\\b' + matches[i] + '(?=(\\s|[.,;:-])|$)', 'gi');
		str = str.replace(romanNumeral, arabicNumeral);
	}

	return str;
};

bible.romanToArabic = function(romanNumeral){
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
	var romanRegExp = new RegExp(rom ,'mi');
	if(romanRegExp.test(romanNumeral)) {
		var n = 0;
		for (var i = 0; i < romanNumerals.length; ++i){
			for (var x = romanNumerals[i], l = x[1].length; romanNumeral.substr(0,l).toUpperCase() == x[1]; romanNumeral = romanNumeral.substr(l).toUpperCase()) 
                n += x[0];
		}
		return n;
	}
	else {
		return romanNumeral;
	}
};

bible.Reference = function () {

	var 
		_bookIndex = -1,
		_chapter1 = -1,
		_verse1 = -1,
		_chapter2 = -1,
		_verse2 = -1,
		args = arguments;

	if (args.length === 0) {
		// error		
	} else if (args.length == 1 && typeof args[0] == 'string') { // a string that needs to be parsed
		return bible.parseReference(args[0]);
	} else if (args.length == 1) { // unknown
		return null;
	} else {
		_bookIndex = args[0];
		_chapter1 = args[1];
		if (args.length >= 3) _verse1 = args[2];
		if (args.length >= 4) _chapter2 = args[3];
		if (args.length >= 5) _verse2 = args[4];
	}

	return {
		bookIndex: _bookIndex,
		chapter: _chapter1,
		verse: _verse1,
		chapter1: _chapter1,
		verse1: _verse1,
		chapter2: _chapter2,
		verse2: _verse2,

		isValid: function () {
			return (_bookIndex > -1 && _bookIndex < bible.Books.length && _chapter1 > 0);
		},

		chapterAndVerse: function (cvSeparator, vvSeparator, ccSeparator) {
			cvSeparator = cvSeparator || ':';
			vvSeparator = vvSeparator || '-';
			ccSeparator = ccSeparator || '-';
			
			var chapter1 = this.chapter1, 
				chapter2 = this.chapter2, 
				verse1 = this.verse1, 
				verse2 = this.verse2;

			if (chapter1 > 0 && verse1 <= 0 && chapter2 <= 0 && verse2 <= 0) // John 1
				return chapter1;
			else if (chapter1 > 0 && verse1 > 0 && chapter2 <= 0 && verse2 <= 0) // John 1:1
				return chapter1 + cvSeparator + verse1;
			else if (chapter1 > 0 && verse1 > 0 && chapter2 <= 0 && verse2 > 0) // John 1:1-5
				return chapter1 + cvSeparator + verse1 + vvSeparator + verse2;
			else if (chapter1 > 0 && verse1 <= 0 && chapter2 > 0 && verse2 <= 0) // John 1-2
				return chapter1 + ccSeparator + chapter2;
			else if (chapter1 > 0 && verse1 > 0 && chapter2 > 0 && verse2 > 0) // John 1:1-2:2
				return chapter1 + cvSeparator + verse1 + ccSeparator + ((chapter1 != chapter2) ? chapter2 + cvSeparator : '') + verse2;
			else
				return '?';
		},

		toString: function () {
			if (this.bookIndex < 0 || this.bookIndex >= bible.Books.length) return "invalid";

			return bible.Books[this.bookIndex].names[0] + ' ' + this.chapterAndVerse();
		},

		toShortUrl: function () {
			if (this.bookIndex < 0 || this.bookIndex >= bible.Books.length) return "invalid";
			return 'http://bib.ly/' + bible.Books[this.bookIndex].names[1] + this.chapterAndVerse('.','-','-');
		}
	};
};;/**
 * Calculates distance between verses by chapter and verse.
 * @depends on bible.js and bible.reference.js from bib.ly by John Dyer which are copyrighted by him and licensed under CC BY 3.0
 *
 * @author khornberg
 * @version 0.1.0
 * 
 * @param {object} A bible.Reference object. Expects one or two references, any more will be ignored.
 *
 * Expects a bible.Reference object
 *      bookIndex: _bookIndex,
 *      chapter: _chapter1,
 *      verse: _verse1,
 *      chapter1: _chapter1,
 *      verse1: _verse1,
 *      chapter2: _chapter2,
 *      verse2: _verse2
 *
 *  bookIndex is a 0 based array
 *  chapters are expected as a 1 based array (how you see it in the bible) 
 *  and are normalized to a 0 based array
 */

bible.distance = function () {
 //arguments received
 var args = arguments;
 var chapters = null;
 var verses = null;
 var startRef = null;
 var endRef = null;
    
 // Reference book check
 if (args[0].bookIndex < 0 || args[0].bookIndex > 65) return {'chapters': null, 'verses': null};
 
 // Sort references based on book order
 if (args.length > 1) {
    if (args[0].bookIndex <= args[1].bookIndex) {
        startRef = args[0];
        endRef = args[1];
    }
    else {
        startRef = args[1];
        endRef = args[0];
    }
 }
    
// Normalize chapters to 0 based arrays
for (var i=0; i<args.length; i++) { 
    bible.denormalize(args[i]);
}

 //1 argument
 if (args.length == 1) {
    //chapter2 and verse2 are set, calculate distance between chapter1, verse1 and chapter2, verse2
    if (args[0].chapter2 !== -1 && args[0].verse2 !== -1) {
        verses = args[0].verse2 + bible.verseDistance(args[0].bookIndex, args[0].chapter1, args[0].chapter2) - args[0].verse1 + 1;
        chapters = args[0].chapter2 - args[0].chapter1;
    }
    // chapter1 and chapter2 are whole chapters 
    else if (args[0].chapter1 >= 0 && args[0].chapter2 >= 0) {
        for (var ch = args[0].chapter2 - 1; ch >= 0; ch--) {
            verses += bible.Books[args[0].bookIndex].verses[ch];
        }
        chapters = Math.abs(args[0].chapter2-args[0].chapter1);
    }
    // single whole chapter ref passed 
    else if (args[0].chapter1 >= 0 && args[0].chapter2 === -1) {
        verses = bible.Books[args[0].bookIndex].verses[args[0].chapter1];
        chapters = 1;
    }
    // whole book ref passed 
    else if (args[0].chapter1 === -1 && args[0].chapter2 === -1) {
        verses = bible.Books[args[0].bookIndex].verses.reduce(function(a, b){
            return a + b;
        }, 0);
        chapters = bible.Books[args[0].bookIndex].verses.length;
    }
    //chapter2 and verse2 are not set, expects a second argument
    //neither distance can be calculated, returning null
    else {   
        bible.normalize(args[0]);
        return {'chapters': chapters, 'verses': verses};
    }
     
    bible.normalize(args[0]);
 }
 //2 arguments, any more are ignored
 else {
    // Book indices are different
    if(startRef.bookIndex !== endRef.bookIndex) {
        var startBook = 0;
        var versesBegin = 0;
        var versesMiddle = 0;
        var versesEnd = 0;
        var chaptersBegin = 0;
        var chaptersMiddle = 0;
        var chaptersEnd = 0;
        
        startBook = bible.Books[startRef.bookIndex].verses.length;
        versesBegin = bible.verseDistance(startRef.bookIndex, startRef.chapter1, startBook) - startRef.verse1 + 1;
        chaptersBegin = startBook - startRef.chapter1;
        versesEnd = bible.verseDistance(endRef.bookIndex, 0, endRef.chapter1) + endRef.verse;
        chaptersEnd = endRef.chapter1;
        
        //whole book distances
        for(b=startRef.bookIndex+1; b<endRef.bookIndex; b++) {
            versesMiddle = bible.verseDistance(b, 0, bible.Books[b].verses.length) + versesMiddle;
            chaptersMiddle += bible.Books[b].verses.length;
        }
        
        verses = versesBegin + versesMiddle + versesEnd;
        chapters = chaptersBegin + chaptersMiddle + chaptersEnd;
    }
    else {
        verses = endRef.verse1 + bible.verseDistance(startRef.bookIndex, startRef.chapter1, endRef.chapter1) - startRef.verse1 + 1;
        chapters = endRef.chapter1 - startRef.chapter1;
    }

    bible.normalize(startRef);
    bible.normalize(endRef);

 }

 return {'chapters': chapters, 'verses': verses};
};

/** 
* Calculate distance between two chapters of a book
* @param {int} bookIndex Book in bible.js 
* @param {int} chapter1 Index of chapter 
* @param {int} chapter2 Index of chapter 
*/
bible.verseDistance = function(bookIndex, chapter1, chapter2) {
    var chapters = bible.Books[bookIndex].verses;
    var verses = 0;
    //single chapter
    if(chapter1==chapter2) return 0;
    
    for(i=chapter1; i<chapter2; i++) {
        verses = chapters[i] + verses;
    }
    
    return verses;
};

/** 
* Add verses to a bible reference 
* @param {object} reference A bible.Reference object 
* @param {int} verses Number of verses to add 
*/
bible.add = function (reference, verses) {
    bible.denormalize(reference);
    
    // account for single chapter references
    reference.verse1 = (reference.verse1 === -1 && reference.chapter1 >= 0) ? 1 : reference.verse1;
    
    while (verses !== 0) {
        var chapterVerses = bible.Books[reference.bookIndex].verses[reference.chapter1];

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
            if ((bible.Books[reference.bookIndex].verses.length - 1) < nextChapter) {
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

    bible.normalize(reference);
    
    return reference;
};

/** 
* Subtract verses from a bible reference 
* @param {object} reference A bible.Reference object 
* @param {int} verses Number of verses to subtract 
*/
bible.subtract = function (reference, verses) {
    bible.denormalize(reference);
    
    // account for single chapter references
    reference.verse1 = (reference.verse1 === -1 && reference.chapter1 >= 0) ? 1 : reference.verse1;
    
    while (verses !== 0) {
        if (reference.verse1 - verses > 0) {
            reference.verse1 = reference.verse1 - verses;
            verses = 0;
        } else if (reference.verse1 - verses === 0) {
            reference.bookIndex--;
            reference.chapter1 = bible.Books[reference.bookIndex].verses.length - 1;
            reference.verse1 = bible.Books[reference.bookIndex].verses[reference.chapter1];
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
                    reference.chapter1 = bible.Books[reference.bookIndex].verses.length - 1;
                    reference.verse1 = bible.Books[reference.bookIndex].verses[reference.chapter1] + 1;
                }
            } else {
                reference.chapter1--;
                reference.verse1 = bible.Books[reference.bookIndex].verses[reference.chapter1];
            }
        }
    }
    
    bible.normalize(reference);
    
    return reference;
};

/**
* Changes chapter numbers to 0 based arrays (subtracts 1 from the chapters)
* @param {object} reference Reference passed by reference
*/
bible.denormalize = function (reference) {
//    reference.chapter = (reference.chapter > 0) ? reference.chapter - 1 : reference.chapter;
    reference.chapter1 = (reference.chapter1 > 0) ? reference.chapter1 - 1 : reference.chapter1;
    reference.chapter2 = (reference.chapter2 > 0) ? reference.chapter2 - 1 : reference.chapter2;
};

/**
* Changes chapter numbers to 1 based arrays (add 1 to the chapters)
* @param {object} reference Reference passed by reference
*/
bible.normalize = function (reference) {
//    reference.chapter = (reference.chapter > 0) ? reference.chapter - 1 : reference.chapter;
    reference.chapter1 = (reference.chapter1 >= 0) ? reference.chapter1 + 1 : reference.chapter1;
    reference.chapter2 = (reference.chapter2 >= 0) ? reference.chapter2 + 1 : reference.chapter2;
};

//sdg
