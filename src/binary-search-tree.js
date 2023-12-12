const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {

  constructor() {
    this.rn = null;
  }

  root() {
    return this.rn;
  }

  add(data) {
    let node = new Node(data);
    let temp = this.rn;
    if (!this.rn) {
      return (this.rn = node);
    }
    while (temp) {
      if (node.data < temp.data) {
        if (!temp.left) {
          return (temp.left = node);
        }
        temp = temp.left;
      } else {
        if (!temp.right) {
          return (temp.right = node);
        }
        temp = temp.right;
      }
    }
  }

  has(data) {
    return !this.find(data) ? false : true;
  }

  find(data) {
    let temp = this.rn;
    return traverse(temp);
    function traverse(node) {
      return !node
        ? null
        : node.data === data
          ? node
          : node.data < data
            ? traverse(node.right)
            : traverse(node.left);
    }
  }

  remove(data) {
    this.rn = removeNode(this.rn, data);
    function removeNode(node, value) {
      if (!node) {
        return null;
      }
      if (value > node.data) {
        node.right = removeNode(node.right, value);
        return node;
      } else if (value < node.data) {
        node.left = removeNode(node.left, value);
        return node;
      } else {
        if (!node.left && !node.right) {
          return null;
        }
        if (!node.left) {
          node = node.right;
          return node;
        }
        if (!node.right) {
          node = node.left;
          return node;
        }
        let minData = node.right;
        while (minData.left) {
          minData = minData.left;
        }
        node.data = minData.data;
        node.right = removeNode(node.right, minData.data);
        return node;
      }
    }
  }

  min() {
    let temp = this.rn;
    while (temp.left) {
      temp = temp.left;
    }
    return temp.data;
  }

  max() {
    let temp = this.rn;
    while (temp.right) {
      temp = temp.right;
    }
    return temp.data;
  }
}

module.exports = {
  BinarySearchTree
};