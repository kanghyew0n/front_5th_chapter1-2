// import { addEvent } from "./eventManager";

export function createElement(vNode) {
  if (
    vNode === null ||
    typeof vNode === "undefined" ||
    typeof vNode === "boolean"
  ) {
    return document.createTextNode("");
  }

  if (typeof vNode === "string" || typeof vNode === "number") {
    return document.createTextNode(vNode);
  }

  if (Array.isArray(vNode)) {
    const $fragment = document.createDocumentFragment();
    vNode.forEach((child) => {
      const $child = createElement(child);
      $fragment.appendChild($child);
    });
    return $fragment;
  }

  const { type, props, children } = vNode;

  const $el = document.createElement(type);
  if (props) {
    console.log(props);
    Object.entries(props).forEach(([name, value]) => {
      if (name.toLowerCase() === "classname") {
        return $el.setAttribute("class", value);
      }
      $el.setAttribute(name, value);
    });
  }

  children.forEach((child) => {
    const $child = createElement(child);
    $el.appendChild($child);
  });

  return $el;
}

// function updateAttributes($el, props) {}
