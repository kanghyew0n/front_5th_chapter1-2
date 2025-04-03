import { attributeRules } from "./utils";

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
    for (const rule of Object.values(attributeRules)) {
      if (rule.condition(key, value)) {
        return rule.apply($el, key, value);
      }
    }
    $el.setAttribute(key, value);
  });
}
