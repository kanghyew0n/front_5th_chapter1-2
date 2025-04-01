import { addEvent, removeEvent, setupEventListeners } from "./eventManager";
import { createElement } from "./createElement.js";

function updateAttributes(target, originNewProps = {}, originOldProps = {}) {
  // newProps 반영
  for (const [key, value] of Object.entries(originNewProps || {})) {
    if (originOldProps[key] === originNewProps[key]) continue;
    if (key.startsWith("on") && typeof value === "function") {
      return addEvent(target, key.replace("on", "").toLowerCase(), value);
    }
    if (key.startsWith("class") && typeof value === "string") {
      return target.setAttribute("class", value);
    }
    target.setAttribute(key, value);
  }

  // oldProps에만 남은 속성 제거
  for (const key of Object.keys(originOldProps || {})) {
    if (originNewProps[key] !== undefined) continue;
    removeEvent(
      target,
      key.replace("on", "").toLowerCase(),
      originOldProps[key],
    );
    target.removeAttribute(key);
  }
}

export function updateElement(parentElement, newNode, oldNode, index = 0) {
  if (!parentElement) {
    return;
  }

  // oldNode
  if (!newNode && oldNode) {
    parentElement.removeChild(parentElement.children[index]);
    return removeEvent(oldNode, "click", oldNode.props.onClick);
  }
  // newNode
  if (newNode && !oldNode) {
    const $el = createElement(newNode);
    parentElement.appendChild($el);
    setupEventListeners(parentElement);
    return;
  }
  // 모두 text 타입
  if (typeof newNode === "string" && typeof oldNode === "string") {
    if (newNode === oldNode) {
      return;
    }
    return parentElement.replaceChild(
      createElement(newNode),
      parentElement.children[index],
    );
  }

  // 태그이름만 다를 경우
  if (newNode.type !== oldNode.type) {
    return parentElement.replaceChild(
      createElement(newNode),
      parentElement.children[index],
    );
  }
  // 태그이름이 같을 경우
  updateAttributes(parentElement.children[index], newNode.props, oldNode.props);

  // 반복
  const maxLength = Math.max(newNode.children.length, oldNode.children.length);
  for (let i = 0; i < maxLength; i++) {
    updateElement(
      parentElement.children[i],
      newNode.children[i],
      oldNode.children[i],
      i,
    );
  }
}
