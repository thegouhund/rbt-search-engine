class Node {
  constructor(
    public key: string,
    public value: string,
    public isRed: boolean,
    public left: Node | null = null,
    public right: Node | null = null,
    public parent: Node | null = null
  ) {}

  public toJSON(): Node {
    return {
      key: this.key,
      value: this.value,
      isRed: this.isRed,
      left: this.left ? this.left.toJSON() : null,
      right: this.right ? this.right.toJSON() : null,
    };
  }
}

export class RedBlackTree {
  private root: Node | null = null;

  private rotateLeft(x: Node) {
    const y = x.right;
    if (!y) return;
    x.right = y.left;
    if (y.left) y.left.parent = x;
    y.parent = x.parent;
    if (!x.parent) {
      this.root = y;
    } else if (x === x.parent.left) {
      x.parent.left = y;
    } else {
      x.parent.right = y;
    }
    y.left = x;
    x.parent = y;
  }

  private rotateRight(y: Node) {
    const x = y.left;
    if (!x) return;
    y.left = x.right;
    if (x.right) x.right.parent = y;
    x.parent = y.parent;
    if (!y.parent) {
      this.root = x;
    } else if (y === y.parent.right) {
      y.parent.right = x;
    } else {
      y.parent.left = x;
    }
    x.right = y;
    y.parent = x;
  }

  private fixInsert(z: Node) {
    while (z.parent && z.parent.isRed) {
      if (z.parent === z.parent.parent?.left) {
        const y = z.parent.parent.right;
        if (y && y.isRed) {
          z.parent.isRed = false;
          y.isRed = false;
          z.parent.parent.isRed = true;
          z = z.parent.parent;
        } else {
          if (z === z.parent.right) {
            z = z.parent;
            this.rotateLeft(z);
          }
          z.parent.isRed = false;
          if (z.parent.parent) {
            z.parent.parent.isRed = true;
            this.rotateRight(z.parent.parent);
          }
        }
      } else {
        const y = z.parent.parent.left;
        if (y && y.isRed) {
          z.parent.isRed = false;
          y.isRed = false;
          z.parent.parent.isRed = true;
          z = z.parent.parent;
        } else {
          if (z === z.parent.left) {
            z = z.parent;
            this.rotateRight(z);
          }
          z.parent.isRed = false;
          if (z.parent.parent) {
            z.parent.parent.isRed = true;
            this.rotateLeft(z.parent.parent);
          }
        }
      }
    }
    this.root.isRed = false;
  }

  public insert(key: string, value: any) {
    const newNode = new Node(key, value, true);
    if (!this.root) {
      this.root = newNode;
      this.root.isRed = false;
      return;
    }

    let current = this.root;
    let parent: Node | null = null;

    while (current) {
      parent = current;
      if (newNode.key < current.key) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    newNode.parent = parent;
    if (parent) {
      if (newNode.key < parent.key) {
        parent.left = newNode;
      } else {
        parent.right = newNode;
      }
    }

    this.fixInsert(newNode);
  }

  public printTree() {
    if (!this.root) {
      console.log("Tree is empty");
      return;
    }
    this.printNode(this.root, 0);
  }

  private printNode(node: Node | null, level: number) {
    if (!node) return;
    this.printNode(node.right, level + 1);
    console.log(
      " ".repeat(level * 4) + (node.isRed ? "R" : "B") + ":" + node.key
    );
    this.printNode(node.left, level + 1);
  }

  public search(key: string): Node | null {
    let current = this.root;
    while (current) {
      if (key === current.key) {
        return current;
      } else if (key < current.key) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return null;
  }

  public visualize(): any {
    const result: any[] = [];
    this.inOrderTraversal(this.root, result);
    return result;
  }

  public searchByKeySubstring(substring: string): Node[] {
    const result: Node[] = [];
    this.searchByKeySubstringHelper(this.root, substring, result);
    return result;
  }

  private searchByKeySubstringHelper(
    node: Node | null,
    substring: string,
    result: Node[]
  ) {
    if (!node) return;
    if (node.key.includes(substring)) {
      result.push(node.toJSON());
    }
    this.searchByKeySubstringHelper(node.left, substring, result);
    this.searchByKeySubstringHelper(node.right, substring, result);
  }
}
