/**
 * Calculates distance between verses by chapter and verse.
 * @depends on bible.js and bible.reference.js from bib.ly by John Dyer which are copyrighted by him and licensed under CC BY 3.0
 *
 * @author khornberg
 * @version 0.1.7
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
    else if (args[0].chapter1 >= 0 && args[0].chapter2 >= 0 && args[0].verse1 === -1 && args[0].verse2 === -1) {
        for (var ch = args[0].chapter2; ch >= 0; ch--) {
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

    // account for multiple single chapter references
    reference.verse2 = (reference.verse2 === -1 && reference.chapter2 >= 0) ? bible.Books[reference.bookIndex].verses[reference.chapter2] : reference.verse2;
    
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
