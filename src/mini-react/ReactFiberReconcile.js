import { createFiber } from './fiber';

export function updateHostComponent(wip) {
	if (!wip.stateNode) {
		wip.stateNode = createNode(wip);
	}
	reconcileChildren(wip, wip.props.children);
}
/**
 *
 * @param {*} wip 父节点
 * @param {*} children 虚拟子节点的集合
 */
function reconcileChildren(wip, children = []) {
	if (typeof children === 'string') {
		return;
	}
	const newChildren = Array.isArray(children) ? children : [children];
  let nextNewFiber = null;
  for(let i=0;i<newChildren.length;i++) {
    const newChild = newChildren[i];
    console.log(newChild)
    const newFiber = createFiber(newChild,wip);
    if(nextNewFiber === null) {
      wip.child = newFiber;
    } else {
      nextNewFiber.sibling = newFiber;
    }
    nextNewFiber = newFiber;
  }
}
function createNode(wip) {
	const { type, props } = wip;
  const node = document.createElement(type);
  updateNode(node, props);
	return node;
}

function updateNode(node, props) {
  Object.keys(props).forEach(k => {
    if(k==='children') {
      if(typeof props[k] === 'string') {
        node.textContent = props[k];
      }
    } else {
      node[k] = props[k];
    }
  })
}

