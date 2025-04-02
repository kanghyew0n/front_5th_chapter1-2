import { addEvent, removeEvent } from "./eventManager";
import { createElement } from "./createElement.js";

function updateAttributes(target, newProps, oldProps) {
  // 달라지거나 추가된 Props를 반영
  for (const [attr, value] of Object.entries(newProps)) {
    if (oldProps[attr] === value) continue;

    if (attr.startsWith("on")) {
      return addEvent(target, attr.replace("on", "").toLowerCase(), value);
    }

    if (attr.startsWith("class") && typeof value === "string") {
      return target.setAttribute("class", value);
    }

    target.setAttribute(attr, value);
  }

  // 없어진 props를 attribute에서 제거
  for (const attr of Object.keys(oldProps)) {
    if (newProps[attr] !== undefined) continue;
    if (attr.startsWith("on")) {
      return removeEvent(
        target,
        attr.replace("on", "").toLowerCase(),
        oldProps[attr],
      );
    }

    target.removeAttribute(attr);
  }
}

export function updateElement(parentElement, newNode, oldNode, index = 0) {
  if (!parentElement) {
    return;
  }

  // oldNode
  if (!newNode && oldNode) {
    return parentElement.removeChild(parentElement.childNodes[index]);
  }

  // newNode
  if (newNode && !oldNode) {
    const $el = createElement(newNode);
    return parentElement.appendChild($el);
  }

  // 모두 text 타입
  if (typeof newNode === "string" && typeof oldNode === "string") {
    if (newNode === oldNode) {
      return;
    }
    return parentElement.replaceChild(
      createElement(newNode),
      parentElement.childNodes[index],
    );
  }

  // 태그이름만 다를 경우
  if (newNode.type !== oldNode.type) {
    return parentElement.replaceChild(
      createElement(newNode),
      parentElement.childNodes[index],
    );
  }
  // 태그이름이 같을 경우
  updateAttributes(
    parentElement.childNodes[index],
    newNode.props || {},
    oldNode.props || {},
  );

  // 반복
  const maxLength = Math.max(newNode.children.length, oldNode.children.length);

  for (let i = 0; i < maxLength; i++) {
    updateElement(
      parentElement.childNodes[index], // 헉..
      newNode.children[i],
      oldNode.children[i],
      i,
    );
  }
}
