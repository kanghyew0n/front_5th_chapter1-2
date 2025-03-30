export function normalizeVNode(vNode) {
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return "";
  }
  if (typeof vNode === "string" || typeof vNode === "number") {
    return `${vNode}`;
  }

  // type이 인자가 있을 거라곤 생각 못했는데...! 테스트 코드의 { children, ...props }에서 자꾸 에러가 났다.
  // type에 UnorderedList 함수가 들어가고 UnorderedList는 인자를 가지고 있다.
  // type은 element의 tagName 뿐만 아니라 component다.
  if (vNode.type && typeof vNode.type === "function") {
    const { type, props, children } = vNode;
    const result = type({ ...props, children });

    return normalizeVNode(result);
  }

  return {
    ...vNode,
    children: vNode.children
      ?.map(normalizeVNode)
      .filter((child) => Boolean(child)),
  };
}
