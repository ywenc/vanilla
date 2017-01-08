const DOMNodeCollection = require("./dom_node_collection.js");

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
