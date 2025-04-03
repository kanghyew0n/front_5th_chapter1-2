import { addEvent } from "./eventManager";

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
    $fragment.append(...vNode.map(createElement));

    return $fragment;
  }

  const { type, props, children } = vNode;

  const $el = document.createElement(type);

  updateAttributes($el, props);
  $el.append(...children.map(createElement));

  return $el;
}

function updateAttributes($el, props) {
  Object.entries(props || {}).forEach(([key, value]) => {
    if (key.startsWith("on") && typeof value === "function") {
      return addEvent($el, key.replace("on", "").toLowerCase(), value);
    }
    if (key.startsWith("class") && typeof value === "string") {
      return $el.setAttribute("class", value);
    }
    $el.setAttribute(key, value);
  });
}
