bible.math.js
=============

Provides methods to add or subtract verses from a given reference and to get a distance between two references.

## Usage

Include `bible.math.min.js` in your project found in the `/dist`.

Use `bible.parseReference` to get a reference object.  
You can, however, manually create a reference object as defined below and use it.  

```
var ref = bible.parseReference('Romans 1:2');
bible.add(ref, 10); // changes reference object to Romans 1:12
ref.toString(); // Romans 1:12 
```

For those with Bower: `bower install bible.math --save`

### Methods
All references use the [bible.Reference object](#bible.reference-object) format.

#### Add
`bible.add(reference, verses) // changes reference to new value`

Example:
Add 10 verses to 1 John 5:20
```    
var ref1 = {bookIndex: 61, chapter: 5, verse: 20, chapter1: 5, verse1: 20, chapter2: -1, verse2: -1};
bible.add(ref1, 10);
ref1.toString(); // returns "2 John 1:9"
```
Keys chapter and verse of the returned object remain unchanged. Chapter1 and verse1 are the correct chapter and verse.  

#### Subtract
`bible.subtract(reference, verses) // changes reference to new value`

Exmple:
Subtract 10 verses from 2 John 7
```
var ref1 = {bookIndex: 62, chapter: 1, verse: 7, chapter1: 1, verse1: 7, chapter2: -1, verse2: -1};
var result = bible.subtract(ref1, 10);
ref.toString(); // returns "1 John 5:19"
```
Keys chapter and verse of the returned object remain unchanged. Chapter1 and verse1 are the correct chapter and verse.  

If subtracting a number of verses from the reference equals zero, then the last verse of the preceding chapter is returned.    
For example, if seven verses are subtracted from 2 John 1:7, then a reference to 1 John 5:21 is returned.  

#### Distance
`bible.distance(reference1, *reference2) // returns javascript object with chapters and verses`

The bible order of the references does not matter.  
If more than two references are passed, only the first two will be used.  
Only one reference is necessary if chapter2 and verse2 of the object contain values.  
Passing a reference as a whole book (only bookIndex has a value, all others are -1) returns the chapters and verses of that book (see note below).  

Example:
Calculate distance between Genesis 2:5 and Leviticus 4:5.
```
var ref1 = {bookIndex: 0, chapter: 2, verse: 5, chapter1: 2, verse1: 5, chapter2: -1, verse2: -1};
var ref2 = {bookIndex: 2, chapter: 4, verse: 5, chapter1: 4, verse1: 5, chapter2: -1, verse2: -1};
bible.distance(ref1, ref2); // returns {'chapters': 92, 'verses': 2766}
```

The distance calculation includes the referenced verses. The distance between Gen 1:1 and Gen 1:3 is three.  
Why? If one is reading verses Gen 1:1-3, one has read three verses.  

The distance between Gen 1 and Gen 3 is `{chapters: 2, verses: 80}`. There are two chapters between Gen 1:1 and Gen 3:1 and 80 verses from Gen 1:1 to Gen 3:24 (i.e. beginning of Gen 1 to the end of Gen 3).

*Important*
* The `distance` method can calculate the distance (chapters and verses) of an entire book, however the reference must be created manually. This is because `parseReference('Gen')` returns the same object as `parseReference('Gen 1')`. The reference must set `chapter` and `chapter1` to `-1`.  
* New objects are not created. The math is performed on the passed object.

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
-1 as a value of any key represents that the key is unused.

### Testing
Tests are found in the `tests` directory.  
Tests can be run either mannually by opening `tests/tests.html` in a browser or on the command line via `grunt test`.

## Change Log

### 0.1.7
* Fix book names in bible.js
* Fix whole chapter references in bible.reference.js
* Update tests for whole chapter fix

### 0.1.6
* Distribute as single file
* Added Grunt for tests, concat, and minify

### 0.1.5
* Fixed whole chapter references
* Whole book distances are not assumed any more

### 0.1.4
* Handle whole chapter references

### 0.1.3
* Stops when adding or subtracting past the ends of the bible

### 0.1.2
* Changed meaning of normalize function
* Added denormalize function


### Licence
Apache v2

### Copyright
Kyle Hornberg 

Extends John Dyer's bible.js and bible.reference.js in [bib.ly](bib.ly) which is copyrighted by him and licensed under [Creative Commons 3.0](http://creativecommons.org/licenses/by/3.0/)