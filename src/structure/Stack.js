class Stack {
  constructor() {
    this.storage = [];
    this.size = 0;
  }

  push(item) {
    this.storage[this.size++] = item;
  }

  pop() {
    if (this.size > 0) {
      return this.storage[--this.size];
    } else {
      return null;
    }
  }

  peek() {
    return this.size > 0 ? this.storage[this.size - 1] : null;
  }

  clone() {
    const newStack = new Stack();
    newStack.storage = Object.assign({}, this.storage);
    newStack.size = this.size;
    return newStack;
  }
}

export default Stack;