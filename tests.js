/** Verse distances */
// Gen 2 - Gen 4
test("verse distance same book", function() {
    var resultDistance = bible.verseDistance(0, 1, 3);
    var expectedResults = 49;
	equal(resultDistance, expectedResults);
});

// Gen 1 - Gen 1
test("verse distance same book and chapter", function() {
    var resultDistance = bible.verseDistance(0, 0, 0);
    var expectedResults = 0;
	equal(resultDistance, expectedResults);
});

// Gen 1 - Gen 50
// Whole book, end chapter must be length of array
test("verse distance whole book", function() {
    var resultDistance = bible.verseDistance(0, 0, 50);
    var expectedResults = 1533;
	equal(resultDistance, expectedResults);
});

// Gen 2:5 - Lev 4:5
test("distance partial book to partial book though another book", function() {
    var ref1 = {bookIndex: 0, chapter: 2, verse: 5, chapter1: 2, verse1: 5, chapter2: -1, verse2: -1};
    var ref2 = {bookIndex: 2, chapter: 4, verse: 5, chapter1: 4, verse1: 5, chapter2: -1, verse2: -1};
    var resultDistance = bible.distance(ref1, ref2);
    var expectedResults = {'chapters': 92, 'verses': 2766};
	deepEqual(resultDistance, expectedResults);
});

// Gen 1:1 - Gen 1:3
test("distance same book", function() {
    var ref1 = {bookIndex: 0, chapter: 1, verse: 1, chapter1: 1, verse1: 1, chapter2: -1, verse2: -1};
    var ref2 = {bookIndex: 0, chapter: 1, verse: 3, chapter1: 1, verse1: 3, chapter2: -1, verse2: -1};
    var resultDistance = bible.distance(ref1, ref2);
    var expectedResults = {'chapters': 0, 'verses': 3};
	deepEqual(resultDistance, expectedResults);
});

// Gen 1:1 - Gen 1:3
test("distance same book single ref", function() {
    var ref1 = {bookIndex: 0, chapter: 1, verse: 1, chapter1: 1, verse1: 1, chapter2: 0, verse2: 3};
    var resultDistance = bible.distance(ref1);
    var expectedResults = {'chapters': 0, 'verses': 3};
	deepEqual(resultDistance, expectedResults);
});

// 2 John 3 - 3 John 5
test("verse distance middle of book to middle of another book", function() {
    var ref1 = {bookIndex: 62, chapter: 1, verse: 3, chapter1: 1, verse1: 3, chapter2: -1, verse2: -1};
    var ref2 = {bookIndex: 63, chapter: 1, verse: 5, chapter1: 1, verse1: 5, chapter2: -1, verse2: -1};
    var resultDistance = bible.distance(ref1, ref2);
    var expectedResults = {'chapters': 1, 'verses': 16};
    deepEqual(resultDistance, expectedResults);
});

// References reversed.
// 2 Chron 36:22 - Ezra 1:4
test("verse distance middle of book to middle of another book small", function() {
    var ref1 = {bookIndex: 13, chapter: 36, verse: 22, chapter1: 36, verse1: 22, chapter2: -1, verse2: -1};
    var ref2 = {bookIndex: 14, chapter: 1, verse: 4, chapter1: 1, verse1: 4, chapter2: -1, verse2: -1};
    var resultDistance = bible.distance(ref2, ref1);
    var expectedResults = {'chapters': 1, 'verses': 6};
    deepEqual(resultDistance, expectedResults);
});

// Eph 5:1 - Eph 6:10
// Eph 5:1-6:10
test("verse distance same book chapter to chapter", function() {
    var ref1 = {bookIndex: 48, chapter: 5, verse: 1, chapter1: 5, verse1: 1, chapter2: 6, verse2: 10};
    var resultDistance = bible.distance(ref1);
    var expectedResults = {'chapters': 1, 'verses': 43};
    deepEqual(resultDistance, expectedResults);
});

// Col
test("verse distance whole book", function() {
    var ref1 = {bookIndex: 50, chapter: -1, verse: -1, chapter1: -1, verse1: -1, chapter2: -1, verse2: -1};
    var resultDistance = bible.distance(ref1);
    var expectedResults = {'chapters': 4, 'verses': 95};
    deepEqual(resultDistance, expectedResults);
});

// Errored reference
test("verse distance whole book error all -1", function() {
    var ref1 = {bookIndex: -1, chapter: -1, verse: -1, chapter1: -1, verse1: -1, chapter2: -1, verse2: -1};
    var resultDistance = bible.distance(ref1);
    var expectedResults = {'chapters': null, 'verses': null};
    deepEqual(resultDistance, expectedResults);
});

// Other errors?


/** Add tests */
// 1 John 5:1 + 5 verses
test("add 5 verses from begining of book, same book", function() {
    var ref1 = {bookIndex: 61, chapter: 5, verse: 1, chapter1: 5, verse1: 1, chapter2: -1, verse2: -1};
    var n = 5;
    var result = bible.add(ref1, n);
    var expectedResults = {bookIndex: 61, chapter: 5, verse: 1, chapter1: 5, verse1: 6, chapter2: -1, verse2: -1};
    deepEqual(result, expectedResults);
});

// 1 John 5:20 + 10 verses
test("add 10 verses from middle of book, change 1 book", function() {
    var ref1 = {bookIndex: 61, chapter: 5, verse: 20, chapter1: 5, verse1: 20, chapter2: -1, verse2: -1};
    var n = 10;
    var result = bible.add(ref1, n);
    var expectedResults = {bookIndex: 62, chapter: 5, verse: 20, chapter1: 1, verse1: 9, chapter2: -1, verse2: -1};
    deepEqual(result, expectedResults);
});

// Gen 3:5 + 100 verses
test("add 100 verses from middle of book, change several chapters", function() {
    var ref1 = {bookIndex: 0, chapter: 3, verse: 5, chapter1: 3, verse1: 5, chapter2: -1, verse2: -1};
    var n = 100;
    var result = bible.add(ref1, n);
    var expectedResults = {bookIndex: 0, chapter: 3, verse: 5, chapter1: 7, verse1: 1, chapter2: -1, verse2: -1};
    deepEqual(result, expectedResults);
});

// Ps 3:5 + 100 verses
test("add 100 verses from middle of book, change several chapters", function() {
    var ref1 = {bookIndex: 18, chapter: 3, verse: 5, chapter1: 3, verse1: 5, chapter2: -1, verse2: -1};
    var n = 100;
    var result = bible.add(ref1, n);
    var expectedResults = {bookIndex: 18, chapter: 3, verse: 5, chapter1: 11, verse1: 3, chapter2: -1, verse2: -1};
    deepEqual(result, expectedResults);
});

// 1 John 5:1 + 100 verses
test("add 100 verses from middle of book, change several chapters and books", function() {
    var ref1 = {bookIndex: 61, chapter: 5, verse: 1, chapter1: 5, verse1: 1, chapter2: -1, verse2: -1};
    var n = 100;
    var result = bible.add(ref1, n);
    var expectedResults = {bookIndex: 65, chapter: 5, verse: 1, chapter1: 2, verse1: 8, chapter2: -1, verse2: -1};
    deepEqual(result, expectedResults);
});

// 1 John 5:1 + 0 verses
test("add 0 verses from middle of book", function() {
    var ref1 = {bookIndex: 61, chapter: 5, verse: 1, chapter1: 5, verse1: 1, chapter2: -1, verse2: -1};
    var n = 0;
    var result = bible.add(ref1, n);
    var expectedResults = {bookIndex: 61, chapter: 5, verse: 1, chapter1: 5, verse1: 1, chapter2: -1, verse2: -1};
    deepEqual(result, expectedResults);
});

/*Subtract Tests*/
// 2 John 7 - 5 verses
test("subtract 5 verses from middle of book", function() {
    var ref1 = {bookIndex: 62, chapter: 1, verse: 7, chapter1: 1, verse1: 7, chapter2: -1, verse2: -1};
    var n = 5;
    var result = bible.subtract(ref1, n);
    var expectedResults = {bookIndex: 62, chapter: 1, verse: 7, chapter1: 1, verse1: 2, chapter2: -1, verse2: -1};
    deepEqual(result, expectedResults);
});

// 2 John 7 - 10 verses
test("subtract 10 verses from middle of book", function() {
    var ref1 = {bookIndex: 62, chapter: 1, verse: 7, chapter1: 1, verse1: 7, chapter2: -1, verse2: -1};
    var n = 10;
    var result = bible.subtract(ref1, n);
    var expectedResults = {bookIndex: 61, chapter: 1, verse: 7, chapter1: 5, verse1: 19, chapter2: -1, verse2: -1};
    deepEqual(result, expectedResults);
});

// Gen 4:20 - 50 verses
test("subtract 50 verses from middle of book", function() {
    var ref1 = {bookIndex: 0, chapter: 4, verse: 20, chapter1: 4, verse1: 20, chapter2: -1, verse2: -1};
    var n = 50;
    var result = bible.subtract(ref1, n);
    var expectedResults = {bookIndex: 0, chapter: 4, verse: 20, chapter1: 2, verse1: 19, chapter2: -1, verse2: -1};
    deepEqual(result, expectedResults);
});

// 2 John 7 - 7 verses
test("subtract 7 verses resulting in 0 verses from middle of book", function() {
    var ref1 = {bookIndex: 62, chapter: 1, verse: 7, chapter1: 1, verse1: 7, chapter2: -1, verse2: -1};
    var n = 7;
    var result = bible.subtract(ref1, n);
    var expectedResults = {bookIndex: 61, chapter: 1, verse: 7, chapter1: 5, verse1: 21, chapter2: -1, verse2: -1};
    deepEqual(result, expectedResults);
});

/*Verse difference tests equal add and subtract tests*/

//difference does not include verse, add/subtract does

// Gen 2:5 - Lev 4:5
test("distance ref equals add of verses ref", function() {
    var ref1 = {bookIndex: 0, chapter: 2, verse: 5, chapter1: 2, verse1: 5, chapter2: -1, verse2: -1};
    var ref2 = {bookIndex: 2, chapter: 4, verse: 5, chapter1: 4, verse1: 5, chapter2: -1, verse2: -1};
    var verses = 2766;
    var addresult = bible.add(ref1, verses);
    var addexpectedResults = {bookIndex: 2, chapter: 2, verse: 5, chapter1: 4, verse1: 6, chapter2: -1, verse2: -1}
	deepEqual(addresult, addexpectedResults);
});

test("distance ref equals subtract of verses ref", function() {
    var ref1 = {bookIndex: 0, chapter: 2, verse: 5, chapter1: 2, verse1: 5, chapter2: -1, verse2: -1};
    var ref2 = {bookIndex: 2, chapter: 4, verse: 5, chapter1: 4, verse1: 5, chapter2: -1, verse2: -1};
    var verses = 2766;
    var addresult = bible.subtract(ref2, verses);
    var addexpectedResults = {bookIndex: 0, chapter: 4, verse: 5, chapter1: 2, verse1: 6, chapter2: -1, verse2: -1}
	deepEqual(addresult, addexpectedResults);
});

