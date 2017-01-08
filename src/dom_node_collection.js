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

    return new DomNodeCollection(childNodes);
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

    return new DomNodeCollection(selected);
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
      this.domElements.forEach(domNode => {
        domNode.innerHTML += children;
      });
      return;
    }

    children.domElements.forEach(domNode => {
      for (let i = 0; i < this.domElements.length; i++) {
        this.domElements[i].appendChild(domNode.cloneNode(true));
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
    return new DomNodeCollection(parents);
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
