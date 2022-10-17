const { NotImplementedError } = require("../extensions/index.js");

const { ListNode } = require("../extensions/list-node.js");

/**
 * Implement the Queue with a given interface via linked list (use ListNode extension above).
 *
 * @example
 * const queue = new Queue();
 *
 * queue.enqueue(1); // adds the element to the queue
 * queue.enqueue(3); // adds the element to the queue
 * queue.dequeue(); // returns the top element from queue and deletes it, returns 1
 * queue.getUnderlyingList() // returns { value: 3, next: null }
 */
class Queue {
	constructor() {
		this.head = null;
	}

	getUnderlyingList() {
		return this.head;
	}

	enqueue(value) {
		let newNode = new ListNode(value);
		if (this.head === null) { // the queue is empty
			this.head = newNode;
		} else {
			// go to the end of the queue
      let node = this.head;
			while (node.next !== null) {
				node = node.next;
			}
			node.next = newNode;
		}
	}

	dequeue() {
		let node = this.head;
    if (node === null) return node;
		this.head = node.next;
		return node.value;
	}
}

module.exports = {
	Queue,
};
