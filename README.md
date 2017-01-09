# vanilla

vanilla is a lightweight JavaScript library that works across browsers for processing AJAX requests, event handling, and DOM traversal and manipulation. vanilla works by wrapping JavaScript functions for accessing the Document Object Model into more intuitive syntax. Now your project can be anything but vanilla!

## Getting Started

### Download & Install

Get started with vanilla by downloading this repo and adding `dist/vanilla.js` as a script in your program.

```html
<script type="text/javascript" src="./dist/vanilla.js" charset="utf-8"></script>
```
You can test that it's working by running the following command in the console:

```javascript
$v( () => alert('thank you for downloading vanilla.') )
```
### Compiling from Source

To compile the source on your own machine, download this repo and run webpack from `src/main.js`

## API
**`$v (arg)` -**
The wrapper `$v` is used to create collections of nodes from DOM objects. If `arg` is a string or HTML element, return a collection of all matched elements. If `arg` is a function, it is stored to be called when the document has loaded.

**`.ajax(options)` -** Perform an asynchronous `XMLHTTPRequest` using given `options` object. Return a Promise that can be chained when the request returns.

**`.attr(key[, val])` -** Get the value of an attribute for the first element in the set of matched elements or set one or more attributes for every matched element to `val`.

**`.children()` -** Return a collection of children of each element in the set of matched elements.

**`.each()` -** Iterate over a `DOMNodeCollection`, executing a function for each matched element.

**`.empty()` -** Remove all child nodes of the set of matched elements from the DOM.

**`.find(selector)` -** Get the descendants of each element in the current set of matched elements, filtered by a string containing one or more CSS selectors separated by commas.The returned `DOMNodeCollection` will contain all the elements in the document that are matched by any of the specified selectors.

**`.html(html)` -** If given a `string`, set the HTML content of each node to be equal to `string`. Otherwise, return the HTML content of the first element in the set of matched elements.

**`.append(children)` -**
Insert content to the end of each element in the set of matched elements.

**`.remove()` -** Remove the set of matched elements from the DOM.

**`.on(eventName, callback)` -** Attach an event handler function for one or more events to the selected elements.

**`.off(eventName)` -** Remove an event handler.

**`.parent()` -** Return parent of each element in the current set of matched elements.

**`.addClass(className)` -** Add class `className` to each element in the set of matched elements.

**`.removeClass(className)` -** Remove a class `className` from each element in the set of matched elements.

## Demo

[Live](https://ywenc.github.io/vanilla) [Source](https://github.com/ywenc/vanilla/blob/master/index.html)
