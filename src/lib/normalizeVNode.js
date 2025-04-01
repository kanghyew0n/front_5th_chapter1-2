export function normalizeVNode(vNode) {
  if (vNode === null || vNode === undefined || typeof vNode === "boolean") {
    return "";
  }
  if (typeof vNode === "string" || typeof vNode === "number") {
    return `${vNode}`;
  }

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
