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
