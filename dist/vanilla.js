/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const DOMNodeCollection = __webpack_require__(1);
	
	const _docReadyCallbacks = [];
	let _documentReady = false;
	
	const $v = (arg) => {
	  switch(typeof(arg)){
	    case "function":
	      return callDocReadycbs(arg);
	    case "string":
	      return retrieveDOMNodes(arg);
	    case "object":
	      if(arg instanceof HTMLElement){
	        return new DOMNodeCollection([arg]);
	      }
	  }
	};
	
	$v.extend = (base, ...objects) => {
	  return Object.assign(base, ...objects);
	};
	
	$v.ajax = (options) => {
	
	  return new Promise((success, error) => {
	    const request = new XMLHttpRequest();
	    const defaults = {
	      contentType: 'application/x-www-form-urlencoded; charset=UTF-8',
	      method: "GET",
	      url: "",
	      success: () => {},
	      error: () => {},
	      data: {},
	    };
	
	    const merged = $v.extend(defaults, options);
	
	    request.open(merged.method, merged.url, true);
	
	    request.onload = () => {
	      if (request.status === 200) {
	        options.success(request.response);
	      } else {
	        options.error(request.response);
	      }
	    };
	
	    request.send(JSON.stringify(merged.data));
	  });
	};
	
	callDocReadycbs = (func) => {
	  if (_documentReady) {
	    func();
	  } else {
	    docReadyCallbacks.push(func);
	  }
	};
	
	retrieveDOMNodes = (selector) => {
	  const nodeList = document.querySelectorAll(selector);
	  const nodeArr = Array.from(nodeList);
	  return new DOMNodeCollection(nodeArr);
	};
	
	document.addEventListener("DOMContentLoaded", () => {
	  _documentReady = true;
	  _docReadyCallbacks.forEach((func) => func());
	});
	
	window.$v = $v;


/***/ },
/* 1 */
/***/ function(module, exports) {

	class DOMNodeCollection {
	  constructor(nodes = []) {
	    this.nodes = nodes;
	  }
	
	  attr(key, val) {
	    if (typeof val === "string") {
	      this.each( node => node.setAttribute(key, val) );
	    } else {
	      return this.nodes[0].getAttribute(key);
	    }
	  }
	
	  children() {
	    let childNodes = [];
	
	    this.each(node => {
	      const childNodeList = node.children;
	      childNodes = childNodes.concat(Array.from(childNodeList));
	    });
	
	    return new DOMNodeCollection(childNodes);
	  }
	
	  each(cb) {
	    this.nodes.forEach(cb);
	  }
	
	  empty() {
	    this.html('');
	  }
	
	  find(selector) {
	    let selected = [];
	
	    this.each(node => {
	      const nodeList = node.querySelectorAll(selector);
	      selected = selected.concat(Array.from(nodeList));
	    });
	
	    return new DOMNodeCollection(selected);
	  }
	
	  html(html) {
	    if (typeof html === "string") {
	      this.each(node => node.innerHTML = html);
	    } else {
	      if (this.nodes.length > 0) {
	        return this.nodes[0].innerHTML;
	      }
	    }
	  }
	
	  append(children) {
	    if (children instanceof HTMLElement) children = $v(children);
	
	    if (typeof children === "string") {
	      this.nodes.forEach(domNode =>
	        domNode.innerHTML += children
	      );
	      return;
	    }
	
	    children.nodes.forEach(domNode => {
	      for (let i = 0; i < this.domElements.length; i++) {
	        this.nodes[i].appendChild(domNode.cloneNode(true));
	      }
	    });
	  }
	
	  remove() {
	    this.each(node => node.parentNode.removeChild(node));
	  }
	
	  on(eventName, cb) {
	   this.each(node => {
	     node.addEventListener(eventName, cb);
	     const eventKey = `jqliteEvents-${eventName}`;
	
	     if (typeof node[eventKey] === "undefined") {
	       node[eventKey] = [];
	     }
	
	     node[eventKey].push(cb);
	   });
	 }
	
	  off(eventName) {
	    this.each(node => {
	      const eventKey = `jqliteEvents-${eventName}`;
	
	      if (node[eventKey]) {
	        node[eventKey].forEach(cb => {
	          node.removeEventListener(eventName, cb);
	        });
	      }
	
	      node[eventKey] = [];
	    });
	  }
	
	  parent() {
	    const parents = [];
	    this.each(node => parents.push(node.parentNode));
	    return new DOMNodeCollection(parents);
	  }
	
	  addClass(className) {
	    this.each(node => node.classList.add(className));
	  }
	
	  removeClass(className) {
	    this.each(node => node.classList.remove(className));
	  }
	
	  toggleClass(className) {
	    this.each(node => node.classList.toggle(className));
	  }
	}
	
	module.exports = DOMNodeCollection;


/***/ }
/******/ ]);
//# sourceMappingURL=vanilla.js.map