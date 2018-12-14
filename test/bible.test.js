import { test, module } from 'qunit';
import Bible from '../bible2';

// deep equal failing for some reason
// assert.deepEqual(b.parseReference('Gen 1:1'), expected);
function deepEqual(ref, expected, assert) {
  assert.equal(ref.bookIndex, expected.bookIndex);
  assert.equal(ref.chapter, expected.chapter);
  assert.equal(ref.chapter1, expected.chapter1);
  assert.equal(ref.chapter2, expected.chapter2);
  assert.equal(ref.verse, expected.verse);
  assert.equal(ref.verse1, expected.verse1);
  assert.equal(ref.verse2, expected.verse2);
}

test('Can istantiate Bible', assert => {
  assert.ok(new Bible());
});

test('Bible has 66 books', assert => {
  const b = new Bible();
  assert.equal(b.books.length, 66);
});

test('Can parse reference', assert => {
  const bible = new Bible();
  const expected = { bookIndex: 0, chapter: 1, verse: 1, chapter1: 1, verse1: 1, chapter2: -1, verse2: -1 };
  deepEqual(bible.parseReference('Gen 1:1'), expected, assert);
});

test('parse Genesis 1-3', assert => {
  const bible = new Bible();
  var resultRef = bible.parseReference('Genesis 1-3');
  var expectedResults = { bookIndex: 0, chapter: 1, chapter1: 1, chapter2: 3, verse: -1, verse1: -1, verse2: -1 };
  assert.equal(resultRef.bookIndex, expectedResults.bookIndex);
  assert.equal(resultRef.chapter, expectedResults.chapter);
  assert.equal(resultRef.chapter1, expectedResults.chapter1);
  assert.equal(resultRef.chapter2, expectedResults.chapter2);
  assert.equal(resultRef.verse, expectedResults.verse);
  assert.equal(resultRef.verse1, expectedResults.verse1);
  assert.equal(resultRef.verse2, expectedResults.verse2);
});

module('verse distance', () => {
  // Gen 2 - Gen 4
  test('verse distance same book', assert => {
    const bible = new Bible();
    var resultDistance = bible.verseDistance(0, 1, 3);
    var expectedResults = 49;
    assert.equal(resultDistance, expectedResults);
  });

  // Gen 1 - Gen 1
  test('verse distance same book and chapter', assert => {
    const bible = new Bible();
    var resultDistance = bible.verseDistance(0, 0, 0);
    var expectedResults = 0;
    assert.equal(resultDistance, expectedResults);
  });

  // Gen 1 - Gen 50
  // Whole book, end chapter must be length of array
  test('verse distance whole book', assert => {
    const bible = new Bible();
    var resultDistance = bible.verseDistance(0, 0, 50);
    var expectedResults = 1533;
    assert.equal(resultDistance, expectedResults);
  });
});

module('distance', hooks => {
  hooks.beforeEach(() => {
    this.bible = new Bible();
  });

  // whole book Col
  test('verse distance whole book * must use custom reference', assert => {
    var ref1 = { bookIndex: 50, chapter: -1, verse: -1, chapter1: -1, verse1: -1, chapter2: -1, verse2: -1 };
    var resultDistance = this.bible.distance(ref1);
    var expectedResults = { chapters: 4, verses: 95 };
    deepEqual(resultDistance, expectedResults, assert);
  });

  // Gen 1
  test('distance whole chapter gen 1', assert => {
    var ref1 = { bookIndex: 0, chapter: 1, verse: -1, chapter1: 1, verse1: -1, chapter2: -1, verse2: -1 };
    var resultDistance = this.bible.distance(ref1);
    var expectedResults = { chapters: 0, verses: 31 };
    deepEqual(resultDistance, expectedResults, assert);
  });

  // Psalm 150
  test('distance whole chapter ps 150', assert => {
    var ref1 = { bookIndex: 18, chapter: 150, verse: -1, chapter1: 150, verse1: -1, chapter2: -1, verse2: -1 };
    var resultDistance = this.bible.distance(ref1);
    var expectedResults = { chapters: 0, verses: 6 };
    deepEqual(resultDistance, expectedResults, assert);
  });

  // Gen 1:3
  test('distance single chapter and verse', assert => {
    var ref1 = { bookIndex: 0, chapter: 1, verse: 3, chapter1: 1, verse1: 3, chapter2: -1, verse2: -1 };
    var resultDistance = this.bible.distance(ref1);
    var expectedResults = { chapters: 0, verses: 1 };
    deepEqual(resultDistance, expectedResults, assert);
  });

  // Gen 1 - Gen 2 verses
  // +1 verse because the whole of Gen 1 is counted and the first verse of Gen 2
  test('verse distance between whole chapters', assert => {
    var ref1 = { bookIndex: 0, chapter: 1, verse: -1, chapter1: 1, verse1: -1, chapter2: -1, verse2: -1 };
    var ref2 = { bookIndex: 0, chapter: 2, verse: -1, chapter1: 2, verse1: -1, chapter2: -1, verse2: -1 };
    var resultDistance = this.bible.distance(ref1, ref2);
    var expectedResults = { chapters: 1, verses: 32 };
    deepEqual(resultDistance, expectedResults, assert);
  });

  // Gen 1 - Gen 3 verses
  test('verse distance between whole chapters in single ref', assert => {
    var ref1 = { bookIndex: 0, chapter: 1, verse: -1, chapter1: 1, verse1: -1, chapter2: 3, verse2: -1 };
    var resultDistance = this.bible.distance(ref1);
    var expectedResults = { chapters: 2, verses: 80 };
    deepEqual(resultDistance, expectedResults, assert);
  });

  // Gen 4 - Gen 6 verses
  test('verse distance between whole chapters in single ref', assert => {
    var ref1 = { bookIndex: 0, chapter: 1, verse: -1, chapter1: 1, verse1: -1, chapter2: 3, verse2: -1 };
    var resultDistance = this.bible.distance(ref1);
    var expectedResults = { chapters: 2, verses: 80 };
    deepEqual(resultDistance, expectedResults, assert);
  });

  // Gen 2:5 - Lev 4:5
  test('distance partial book to partial book though another book', assert => {
    var ref1 = { bookIndex: 0, chapter: 2, verse: 5, chapter1: 2, verse1: 5, chapter2: -1, verse2: -1 };
    var ref2 = { bookIndex: 2, chapter: 4, verse: 5, chapter1: 4, verse1: 5, chapter2: -1, verse2: -1 };
    var resultDistance = this.bible.distance(ref1, ref2);
    var expectedResults = { chapters: 92, verses: 2766 };
    deepEqual(resultDistance, expectedResults, assert);
  });

  // Gen 1:1 - Gen 1:3
  test('distance same book', assert => {
    var ref1 = { bookIndex: 0, chapter: 1, verse: 1, chapter1: 1, verse1: 1, chapter2: -1, verse2: -1 };
    var ref2 = { bookIndex: 0, chapter: 1, verse: 3, chapter1: 1, verse1: 3, chapter2: -1, verse2: -1 };
    var resultDistance = this.bible.distance(ref1, ref2);
    var expectedResults = { chapters: 0, verses: 3 };
    deepEqual(resultDistance, expectedResults, assert);
  });

  // Gen 1:1 - Gen 1:3
  test('distance same book single ref', assert => {
    var ref1 = { bookIndex: 0, chapter: 1, verse: 1, chapter1: 1, verse1: 1, chapter2: 0, verse2: 3 };
    var resultDistance = this.bible.distance(ref1);
    var expectedResults = { chapters: 0, verses: 3 };
    deepEqual(resultDistance, expectedResults, assert);
  });

  // 2 John 3 - 3 John 5
  test('verse distance middle of book to middle of another book', assert => {
    var ref1 = { bookIndex: 62, chapter: 1, verse: 3, chapter1: 1, verse1: 3, chapter2: -1, verse2: -1 };
    var ref2 = { bookIndex: 63, chapter: 1, verse: 5, chapter1: 1, verse1: 5, chapter2: -1, verse2: -1 };
    var resultDistance = this.bible.distance(ref1, ref2);
    var expectedResults = { chapters: 1, verses: 16 };
    deepEqual(resultDistance, expectedResults, assert);
  });

  // References reversed.
  // 2 Chron 36:22 - Ezra 1:4
  test('verse distance middle of book to middle of another book small', assert => {
    var ref1 = { bookIndex: 13, chapter: 36, verse: 22, chapter1: 36, verse1: 22, chapter2: -1, verse2: -1 };
    var ref2 = { bookIndex: 14, chapter: 1, verse: 4, chapter1: 1, verse1: 4, chapter2: -1, verse2: -1 };
    var resultDistance = this.bible.distance(ref2, ref1);
    var expectedResults = { chapters: 1, verses: 6 };
    deepEqual(resultDistance, expectedResults, assert);
  });

  // Eph 5:1 - Eph 6:10
  // Eph 5:1-6:10
  test('verse distance same book chapter to chapter', assert => {
    var ref1 = { bookIndex: 48, chapter: 5, verse: 1, chapter1: 5, verse1: 1, chapter2: 6, verse2: 10 };
    var resultDistance = this.bible.distance(ref1);
    var expectedResults = { chapters: 1, verses: 43 };
    deepEqual(resultDistance, expectedResults, assert);
  });

  // Gen 1:2 - Gen 1:3
  test('distance same book obj by ref?', assert => {
    var ref1 = { bookIndex: 0, chapter: 1, verse: 1, chapter1: 1, verse1: 1, chapter2: -1, verse2: -1 };
    var ref2 = { bookIndex: 0, chapter: 1, verse: 3, chapter1: 1, verse1: 3, chapter2: -1, verse2: -1 };
    ref1 = this.bible.add(ref1, 4);
    ref1 = this.bible.subtract(ref1, 3);
    var resultDistance = this.bible.distance(ref1, ref2);
    var expectedResults = { chapters: 0, verses: 2 };
    deepEqual(resultDistance, expectedResults, assert);
  });

  test('distance obj by ref1 is not changed', assert => {
    var ref1 = { bookIndex: 0, chapter: 1, verse: 1, chapter1: 1, verse1: 1, chapter2: -1, verse2: -1 };
    var ref2 = { bookIndex: 0, chapter: 1, verse: 3, chapter1: 1, verse1: 3, chapter2: -1, verse2: -1 };
    this.bible.distance(ref1, ref2);
    deepEqual(ref1, { bookIndex: 0, chapter: 1, verse: 1, chapter1: 1, verse1: 1, chapter2: -1, verse2: -1 }, assert);
  });

  test('distance obj by ref2 is not changed', assert => {
    var ref1 = { bookIndex: 0, chapter: 1, verse: 1, chapter1: 1, verse1: 1, chapter2: -1, verse2: -1 };
    var ref2 = { bookIndex: 0, chapter: 1, verse: 3, chapter1: 1, verse1: 3, chapter2: -1, verse2: -1 };
    this.bible.distance(ref1, ref2);
    deepEqual(ref2, { bookIndex: 0, chapter: 1, verse: 3, chapter1: 1, verse1: 3, chapter2: -1, verse2: -1 }, assert);
  });

  // Errored reference
  test('verse distance whole book error all -1', assert => {
    var ref1 = { bookIndex: -1, chapter: -1, verse: -1, chapter1: -1, verse1: -1, chapter2: -1, verse2: -1 };
    assert.throws(
      () => {
        this.bible.distance(ref1);
      },
      /invalid/,
      'Invalid reference'
    );
  });

  // Errored reference
  test('verse distance whole book error all -1', assert => {
    var ref1 = { bookIndex: 0, chapter: 1, verse: 1, chapter1: 1, verse1: 1, chapter2: -1, verse2: -1 };
    var ref2 = { bookIndex: -1, chapter: -1, verse: -1, chapter1: -1, verse1: -1, chapter2: -1, verse2: -1 };
    assert.throws(
      () => {
        this.bible.distance(ref1, ref2);
      },
      /invalid/,
      'Invalid reference'
    );
  });
});

module('edge cases', hooks => {
  hooks.beforeEach(() => {
    this.bible = new Bible();
  });

  // Rev 22:1 + 25 = Rev 22:21
  test('add verses past end of bible', assert => {
    var ref1 = { bookIndex: 65, chapter: 22, verse: 1, chapter1: 22, verse1: 1, chapter2: -1, verse2: -1 };
    var n = 25;
    var result = this.bible.add(ref1, n);
    var expectedResults = {
      bookIndex: 65,
      chapter: 22,
      verse: 1,
      chapter1: 22,
      verse1: 21,
      chapter2: -1,
      verse2: -1
    };
    deepEqual(result, expectedResults, assert);
  });

  // Jude 1:1 + 10 000 = Rev 22:21
  test('add 10 000 verses past end of bible', assert => {
    var ref1 = { bookIndex: 64, chapter: 1, verse: 1, chapter1: 1, verse1: 1, chapter2: -1, verse2: -1 };
    var n = 10000;
    var result = this.bible.add(ref1, n);
    var expectedResults = { bookIndex: 65, chapter: 1, verse: 1, chapter1: 22, verse1: 21, chapter2: -1, verse2: -1 };
    deepEqual(result, expectedResults, assert);
  });

  // Gen 1:6 - 10 = Gen 1:1
  test('subtract verses from beginning of bible', assert => {
    var ref1 = { bookIndex: 0, chapter: 1, verse: 6, chapter1: 1, verse1: 6, chapter2: -1, verse2: -1 };
    var n = 10;
    var result = this.bible.subtract(ref1, n);
    var expectedResults = { bookIndex: 0, chapter: 1, verse: 6, chapter1: 1, verse1: 1, chapter2: -1, verse2: -1 };
    deepEqual(result, expectedResults, assert);
  });

  // Gen 3:6 - 10 000 = Gen 1:1
  test('subtract 10 000 verses from beginning of bible', assert => {
    var ref1 = { bookIndex: 3, chapter: 1, verse: 6, chapter1: 1, verse1: 6, chapter2: -1, verse2: -1 };
    var n = 10000;
    var result = this.bible.subtract(ref1, n);
    var expectedResults = { bookIndex: 0, chapter: 1, verse: 6, chapter1: 1, verse1: 1, chapter2: -1, verse2: -1 };
    deepEqual(result, expectedResults, assert);
  });
});

module('add', hooks => {
  hooks.beforeEach(() => {
    this.bible = new Bible();
  });

  // 1 John 5:1 + 5 verses
  test('add 5 verses from begining of book, same book', assert => {
    var ref1 = { bookIndex: 61, chapter: 5, verse: 1, chapter1: 5, verse1: 1, chapter2: -1, verse2: -1 };
    var n = 5;
    var result = this.bible.add(ref1, n);
    var expectedResults = { bookIndex: 61, chapter: 5, verse: 1, chapter1: 5, verse1: 6, chapter2: -1, verse2: -1 };
    deepEqual(result, expectedResults, assert);
  });

  // 1 John 5:20 + 10 verses
  test('add 10 verses from middle of book, change 1 book', assert => {
    var ref1 = { bookIndex: 61, chapter: 5, verse: 20, chapter1: 5, verse1: 20, chapter2: -1, verse2: -1 };
    var n = 10;
    var result = this.bible.add(ref1, n);
    var expectedResults = { bookIndex: 62, chapter: 5, verse: 20, chapter1: 1, verse1: 9, chapter2: -1, verse2: -1 };
    deepEqual(result, expectedResults, assert);
  });

  // Gen 3:5 + 100 verses
  test('natural add 100 verses from middle of book, change several chapters', assert => {
    var ref1 = this.bible.parseReference('Genesis 3:5');
    var n = 100;
    ref1.add(n);
    var expectedResults = { bookIndex: 0, chapter: 3, verse: 5, chapter1: 7, verse1: 1, chapter2: -1, verse2: -1 };
    assert.equal(ref1.bookIndex, expectedResults.bookIndex);
    assert.equal(ref1.chapter, expectedResults.chapter);
    assert.equal(ref1.chapter1, expectedResults.chapter1);
    assert.equal(ref1.chapter2, expectedResults.chapter2);
    assert.equal(ref1.verse, expectedResults.verse);
    assert.equal(ref1.verse1, expectedResults.verse1);
    assert.equal(ref1.verse2, expectedResults.verse2);
  });

  // Gen 3:5 + 100 verses
  test('add 100 verses from middle of book, change several chapters', assert => {
    var ref1 = { bookIndex: 0, chapter: 3, verse: 5, chapter1: 3, verse1: 5, chapter2: -1, verse2: -1 };
    var n = 100;
    var result = this.bible.add(ref1, n);
    var expectedResults = { bookIndex: 0, chapter: 3, verse: 5, chapter1: 7, verse1: 1, chapter2: -1, verse2: -1 };
    deepEqual(result, expectedResults, assert);
  });

  // Ps 3:5 + 100 verses
  test('add 100 verses from middle of book, change several chapters', assert => {
    var ref1 = { bookIndex: 18, chapter: 3, verse: 5, chapter1: 3, verse1: 5, chapter2: -1, verse2: -1 };
    var n = 100;
    var result = this.bible.add(ref1, n);
    var expectedResults = { bookIndex: 18, chapter: 3, verse: 5, chapter1: 11, verse1: 3, chapter2: -1, verse2: -1 };
    deepEqual(result, expectedResults, assert);
  });

  // 1 John 5:1 + 100 verses
  test('add 100 verses from middle of book, change several chapters and books', assert => {
    var ref1 = { bookIndex: 61, chapter: 5, verse: 1, chapter1: 5, verse1: 1, chapter2: -1, verse2: -1 };
    var n = 100;
    var result = this.bible.add(ref1, n);
    var expectedResults = { bookIndex: 65, chapter: 5, verse: 1, chapter1: 2, verse1: 8, chapter2: -1, verse2: -1 };
    deepEqual(result, expectedResults, assert);
  });

  // 1 John 5:1 + 0 verses
  test('add 0 verses from middle of book', assert => {
    var ref1 = { bookIndex: 61, chapter: 5, verse: 1, chapter1: 5, verse1: 1, chapter2: -1, verse2: -1 };
    var n = 0;
    var result = this.bible.add(ref1, n);
    var expectedResults = { bookIndex: 61, chapter: 5, verse: 1, chapter1: 5, verse1: 1, chapter2: -1, verse2: -1 };
    deepEqual(result, expectedResults, assert);
  });

  // Gen 2 + 10 verses
  test('add 10 verses from a chapter reference', assert => {
    var ref1 = { bookIndex: 0, chapter: 2, verse: -1, chapter1: 2, verse1: -1, chapter2: -1, verse2: -1 };
    var n = 10;
    var result = this.bible.add(ref1, n);
    var expectedResults = { bookIndex: 0, chapter: 2, verse: -1, chapter1: 2, verse1: 11, chapter2: -1, verse2: -1 };
    deepEqual(result, expectedResults, assert);
  });

  // Pass verses which is not a number
  test('add verses passed not a number', assert => {
    var ref1 = this.bible.parseReference('Genesis 4:20');
    var n = '50';
    assert.throws(
      () => {
        ref1.add(n);
      },
      /verses not a number/,
      'Not a number'
    );
  });

  // Invalid ref
  test('add verses passed invalid reference', assert => {
    var ref1 = this.bible.parseReference('Genesis2 5:20');
    var n = 50;
    assert.throws(
      () => {
        ref1.add(n);
      },
      /invalid/,
      'Reference invalid'
    );
  });

});

module('subtract', hooks => {
  hooks.beforeEach(() => {
    this.bible = new Bible();
  });

  // 2 John 7 - 5 verses
  test('subtract 5 verses from middle of book', assert => {
    var ref1 = { bookIndex: 62, chapter: 1, verse: 7, chapter1: 1, verse1: 7, chapter2: -1, verse2: -1 };
    var n = 5;
    var result = this.bible.subtract(ref1, n);
    var expectedResults = { bookIndex: 62, chapter: 1, verse: 7, chapter1: 1, verse1: 2, chapter2: -1, verse2: -1 };
    deepEqual(result, expectedResults, assert);
  });

  // 2 John 7 - 10 verses
  test('subtract 10 verses from middle of book', assert => {
    var ref1 = { bookIndex: 62, chapter: 1, verse: 7, chapter1: 1, verse1: 7, chapter2: -1, verse2: -1 };
    var n = 10;
    var result = this.bible.subtract(ref1, n);
    var expectedResults = { bookIndex: 61, chapter: 1, verse: 7, chapter1: 5, verse1: 19, chapter2: -1, verse2: -1 };
    deepEqual(result, expectedResults, assert);
  });

  // Gen 4:20 - 50 verses
  test('subtract 50 verses from middle of book', assert => {
    var ref1 = { bookIndex: 0, chapter: 4, verse: 20, chapter1: 4, verse1: 20, chapter2: -1, verse2: -1 };
    var n = 50;
    var result = this.bible.subtract(ref1, n);
    var expectedResults = { bookIndex: 0, chapter: 4, verse: 20, chapter1: 2, verse1: 19, chapter2: -1, verse2: -1 };
    deepEqual(result, expectedResults, assert);
  });

  // Gen 4:20 - 50 verses
  test('natural subtract 50 verses from middle of book', assert => {
    var ref1 = this.bible.parseReference('Genesis 4:20');
    var n = 50;
    ref1.subtract(n);
    var expectedResults = { bookIndex: 0, chapter: 4, verse: 20, chapter1: 2, verse1: 19, chapter2: -1, verse2: -1 };
    assert.equal(ref1.bookIndex, expectedResults.bookIndex);
    assert.equal(ref1.chapter, expectedResults.chapter);
    assert.equal(ref1.chapter1, expectedResults.chapter1);
    assert.equal(ref1.chapter2, expectedResults.chapter2);
    assert.equal(ref1.verse, expectedResults.verse);
    assert.equal(ref1.verse1, expectedResults.verse1);
    assert.equal(ref1.verse2, expectedResults.verse2);
  });

  // 2 John 7 - 7 verses
  test('subtract 7 verses resulting in 0 verses from middle of book', assert => {
    var ref1 = { bookIndex: 62, chapter: 1, verse: 7, chapter1: 1, verse1: 7, chapter2: -1, verse2: -1 };
    var n = 7;
    var result = this.bible.subtract(ref1, n);
    var expectedResults = { bookIndex: 61, chapter: 1, verse: 7, chapter1: 5, verse1: 21, chapter2: -1, verse2: -1 };
    deepEqual(result, expectedResults, assert);
  });

  // Gen 2 - 10 verses
  test('subtract 10 verses from a chapter reference', assert => {
    var ref1 = { bookIndex: 0, chapter: 2, verse: -1, chapter1: 2, verse1: -1, chapter2: -1, verse2: -1 };
    var n = 10;
    var result = this.bible.subtract(ref1, n);
    var expectedResults = { bookIndex: 0, chapter: 2, verse: -1, chapter1: 1, verse1: 22, chapter2: -1, verse2: -1 };
    deepEqual(result, expectedResults, assert);
  });

  // Pass verses which is not a number
  test('subtract verses passed not a number', assert => {
    var ref1 = this.bible.parseReference('Genesis 4:20');
    var n = '50';
    assert.throws(
      () => {
        ref1.subtract(n);
      },
      /verses not a number/,
      'Not a number'
    );
  });

  // Invalid ref
  test('subtract verses passed invalid reference', assert => {
    var ref1 = this.bible.parseReference('Genesis 0:20');
    var n = 50;
    assert.throws(
      function() {
        ref1.subtract(n);
      },
      /invalid/,
      'Reference invalid'
    );
  });
});

/*Verse difference tests equal add and subtract tests*/

//difference does not include verse, add/subtract does

// Gen 2:5 - Lev 4:5
test('distance ref equals add of verses ref', assert => {
  var ref1 = { bookIndex: 0, chapter: 2, verse: 5, chapter1: 2, verse1: 5, chapter2: -1, verse2: -1 };
  var ref2 = { bookIndex: 2, chapter: 4, verse: 5, chapter1: 4, verse1: 5, chapter2: -1, verse2: -1 };
  var verses = 2766;
  var addresult = this.bible.add(ref1, verses);
  var addexpectedResults = { bookIndex: 2, chapter: 2, verse: 5, chapter1: 4, verse1: 6, chapter2: -1, verse2: -1 };
  deepEqual(addresult, addexpectedResults, assert);
});

test('distance ref equals subtract of verses ref', assert => {
  var ref1 = { bookIndex: 0, chapter: 2, verse: 5, chapter1: 2, verse1: 5, chapter2: -1, verse2: -1 };
  var ref2 = { bookIndex: 2, chapter: 4, verse: 5, chapter1: 4, verse1: 5, chapter2: -1, verse2: -1 };
  var verses = 2766;
  var addresult = this.bible.subtract(ref2, verses);
  var addexpectedResults = { bookIndex: 0, chapter: 4, verse: 5, chapter1: 2, verse1: 6, chapter2: -1, verse2: -1 };
  deepEqual(addresult, addexpectedResults, assert);
});
