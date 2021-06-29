
import {scheduleUpdateOnFiber} from './ReactFiberWorkLoop'
function render(vnode, container) {
  console.log(vnode);
  // 1 vnode => node
  // 2 注入container
  // const node = createNode(vnode);
  // container.appendChild(node);
  const fiberRoot = {
    type: container.nodeName.toLocaleLowerCase(),
    stateNode: container,
    props: {
      children: vnode,
    }
  }
  scheduleUpdateOnFiber(fiberRoot);
}

export default {render}