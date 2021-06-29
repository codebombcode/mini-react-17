

export function createFiber(vnode, returnFiber) {
  let fiber = {
    type: vnode.type,
    children: [],
    sibling: null,
    props: vnode.props,
    return: returnFiber,
    stateNode: null,
  }
  if(typeof vnode === 'string') {
    fiber = {
      type: vnode.type,
      children: [],
      sibling: null,
      props: vnode.props,
      return: returnFiber,
      stateNode: document.createTextNode(vnode),
    }
  }
  return fiber;
}