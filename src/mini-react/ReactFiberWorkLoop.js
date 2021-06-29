import { updateHostComponent } from './ReactFiberReconcile';

let nextUnitWork = null;
let wipRoot = null;

export function scheduleUpdateOnFiber(fiber) {
	nextUnitWork = fiber;
	wipRoot = fiber;
}

requestIdleCallback(workLoop);

function workLoop(IdleDeadline) {
	while (nextUnitWork && IdleDeadline.timeRemaining() > 0) {
		nextUnitWork = performUnitWork(nextUnitWork);
	}
	if (!nextUnitWork && wipRoot) {
		// 没有任务就提交
		commitRoot();
	}
}

function performUnitWork(wip) {
	const { type } = wip;
	if (typeof type === 'string') {
		updateHostComponent(wip);
	}

	// 返回下一个待执行的fiber
	if (wip.child) {
		return wip.child;
	}
	let next = wip;
	while (next) {
		if (next.sibling) {
			return next.sibling;
		}
		next = next.return;
	}
  return null;
}
function commitRoot() {
	commitWorker(wipRoot.child);
}
function commitWorker(wip) {
	if (!wip) return;
	const { stateNode } = wip;
	let parentNode = getParentNode(wip.return);
  if(stateNode) {
    parentNode.appendChild(stateNode);
  }
  commitWorker(wip.child);
  commitWorker(wip.sibling);
}

function getParentNode(wip) {
  let tem = wip;
  while(tem){
    if(tem.stateNode) {
      return tem.stateNode;
    }
    tem = tem.return;
  }
}
