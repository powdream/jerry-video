import Stack from '../structure/Stack';

export const PageType = {
  TOP_LIST: "top-list",
  PROGRAM: "program"
};

export class PageStack {
  constructor(oldStack = null) {
    if (oldStack == null) {
      this.stack = new Stack();
    } else {
      this.stack = oldStack.clone();
    }
  }

  push(newPage) {
    const newStack = new PageStack(this.stack);
    newStack.stack.push(newPage);
    return newStack;
  }

  peek() {
    return this.stack.peek();
  }

  pop() {
    const newStack = new PageStack(this.stack);
    newStack.stack.pop();
    return newStack;
  }
}