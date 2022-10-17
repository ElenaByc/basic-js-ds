const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
class BinarySearchTree {
	constructor() {
		this.rootNode = null;
	}

	root() {
		return this.rootNode;
	}

	add(data) {
		const newNode = new Node(data);
		if (this.rootNode === null) {
			// tree is empty
			this.rootNode = newNode;
		} else {
			// tree is not empty
			addNodeRecursive(this.rootNode);
		}

		function addNodeRecursive(node) {
			if (newNode.data === node.data) {
				// a node with this data already presents in the tree, no need to add newNode
			} else if (newNode.data < node.data) {
				if (node.left !== null) {
					addNodeRecursive(node.left);
				} else {
					node.left = newNode;
					console.log(
						"new Node with data=" +
							newNode.data +
							" was added to the left of " +
							node.data
					);
				}
			} else {
				if (node.right !== null) {
					addNodeRecursive(node.right);
				} else {
					node.right = newNode;
					console.log(
						"new Node with data=" +
							newNode.data +
							" was added to the right of " +
							node.data
					);
				}
			}
		}
	}

	has(data) {
		return this.find(data) !== null;
	}

	find(data) {
		if (this.rootNode === null) {
			// tree is empty
			return null;
		} else {
			return findNodeRecursive(this.rootNode);
		}

		function findNodeRecursive(node) {
			if (node.data === data) {
				return node;
			}
			if (data < node.data) {
				if (node.left !== null) {
					return findNodeRecursive(node.left);
				} else {
					return null;
				}
			} else {
				if (node.right !== null) {
					return findNodeRecursive(node.right);
				} else {
					return null;
				}
			}
		}
	}

	remove(data) {
		if (this.rootNode === null) {
			// tree is empty, there is nothing to remove
			return;
		}
		if (this.has(data)) {
			this.rootNode = removeNodeRecursive(this.rootNode, data);
		}

		function removeNodeRecursive(node, data) {
			if (node === null) return;

			if (data < node.data) {
				node.left = removeNodeRecursive(node.left, data);
				return node;
			} else if (node.data < data) {
				node.right = removeNodeRecursive(node.right, data);
				return node;
			} else {
				// we need to remove this node
				if (node.left === null && node.right === null) {
					// this node does not have children
					node = null; //delete it
					return node;
				}
				if (node.left === null) {
					// the node has only right child
					node = node.right;
					return node;
				}
				if (node.right === null) {
					// the node has only left child
					node = node.left;
					return node;
				}
				// the node has both right and left shildren
				// find node to put instead of deleted node
				let minFromRight = node.right;
				while (minFromRight.left) {
					minFromRight = minFromRight.left;
				}
				node.data = minFromRight.data;
				node.right = removeNodeRecursive(node.right, minFromRight.data);
				return node;
			}
		}
	}

	min() {
		if (this.rootNode === null) {
			// tree is empty, there is nothing to return
			return undefined;
		}
		let node = this.rootNode;
		while (node.left !== null) {
			node = node.left;
		}
		return node.data;
	}

	max() {
		if (this.rootNode === null) {
			// tree is empty, there is nothing to return
			return undefined;
		}
		let node = this.rootNode;
		while (node.right !== null) {
			node = node.right;
		}
		return node.data;
	}
}

module.exports = {
	BinarySearchTree,
};
