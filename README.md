bible.math.js
=============

Provides methods to add or subtract verses from a given reference and to get a distance between two references.

## Usage

Include `bible.math.js` in your project. You must also have `bible.js` and `bible.reference.js` included as well.

The indended usage is used in conjunction with `bible.parseReference` to get an reference object.

```
var ref = bible.parseReference('Romans 1:2");
bible.add(ref, 10); //returns reference to Romans 1:12
```

### Methods
All references use the [bible.Reference object](#bible.reference-object) format.

#### Add
`bible.add(reference, verses) // returns a new reference`

Example:
Add 10 verses to 1 John 5:20
```    
var ref1 = {bookIndex: 61, chapter: 4, verse: 20, chapter1: 4, verse1: 20, chapter2: -1, verse2: -1};
bible.add(ref1, 10); // returns {bookIndex: 62, chapter: 4, verse: 20, chapter1: 0, verse1: 9, chapter2: -1, verse2: -1}
```
The chapter and verse of the returned object remain unchanged. Chapter1 and verse1 are the next chapter and verse.  
The returned object is 2 John 9 (bookIndex 62, chapter1 0, verse1 9).

#### Subtract
`bible.subtract(reference, verses) // returns a new reference`

Exmple:
Subtract 10 verses from 2 John 7
```
var ref1 = {bookIndex: 62, chapter: 0, verse: 7, chapter1: 0, verse1: 7, chapter2: -1, verse2: -1};
var result = bible.subtract(ref1, 10); // returns {bookIndex: 61, chapter: 0, verse: 7, chapter1: 4, verse1: 19, chapter2: -1, verse2: -1}
```
The chapter and verse of the returned object remain unchanged. Chapter1 and verse1 are the next chapter and verse.  
The returned object is 1 John 5:19 (bookIndex 61, chapter1 4, verse1 19). 

Subtracting a number of verses from the reference that equals zero, returns the previous chapter's last verse. This works across books as well.  
In the example above, if seven verses are subtracted, a reference to 1 John 5:21 is returned.  

#### Distance
`bible.distance(reference1, *reference2) // returns javascript object with chapters and verses`

The bible order of the references does not matter.  
If more than two references are passed, the first two will be used.  
Only one reference is necessary if chapter2 and verse2 of the object contain values.  
Passing a reference as a whole book (only bookIndex has a value, all others are -1) returns the chapters and verses of the book.  

Example:
Calculate distance between Genesis 2:5 and Leviticus 4:5.
```
var ref1 = {bookIndex: 0, chapter: 1, verse: 5, chapter1: 1, verse1: 5, chapter2: -1, verse2: -1};
var ref2 = {bookIndex: 2, chapter: 3, verse: 5, chapter1: 3, verse1: 5, chapter2: -1, verse2: -1};
bible.distance(ref1, ref2); // returns {'chapters': 92, 'verses': 2766}
```

The distance calculation includes the referenced verses. The distance between Gen 1:1 and Gen 1:3 is three.  
Why? If one is reading verses Gen 1:1-3, one has read three verses.


##### bible.Reference object
```javascript
bookIndex: _bookIndex,
chapter: _chapter1,
verse: _verse1,
chapter1: _chapter1,
verse1: _verse1,
chapter2: _chapter2,
verse2: _verse2
```
-1 as a value of any key represents not used.

### Licence
Apache v2

### Copyright
Kyle Hornberg  
Extends John Dyer's bible.js and bible.reference.js in [bib.ly](bib.ly) which is copyrighted by him.