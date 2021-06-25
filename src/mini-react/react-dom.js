
function render(vnode, container) {
  console.log(vnode);
  // 1 vnode => node
  // 2 注入container
  const node = createNode(vnode);
  container.appendChild(node);
}

/**
 * 创建真实节点
 * @param {*} vnode 
 * @returns 
 */
function createNode(vnode) {
  const {type, props} = vnode;
  if(!type) {
    return document.createTextNode(vnode)
  }
  const {children} = props;
  const node = document.createElement(type);
  // fuck
  setValueForProperty(node, props);
  reconclieChildren(node, children)
  return node
}

const attrMap = {
  className: 'class',
  src: 'src',
  href: 'href',
}
/**
 * 
 * @param {*} node 节点
 * @param {*} property 属性
 */
function setValueForProperty(node, property) {
  Object.keys(property).forEach(prop => {
    if(attrMap[prop]) {
      node.setAttribute(attrMap[prop], property[prop]);
    }
  })
}
/**
 * 
 * @param {*} parentNode 父节点
 * @param {*} children 虚拟子节点的集合
 */
function reconclieChildren(parentNode, children = []) {
  if(Array.isArray(children)) {
    children.forEach((child, i) => {
      render(child, parentNode);
    })
  } else {
    render(children, parentNode);
  }

}


export default {render}