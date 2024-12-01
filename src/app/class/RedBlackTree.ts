/* eslint-disable @typescript-eslint/ban-ts-comment */
// @ts-nocheck

import Node from "./Node";

export default class RedBlackTree {
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
          z.parent.parent.isRed = true;
          this.rotateRight(z.parent.parent);
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
          z.parent.parent.isRed = true;
          this.rotateLeft(z.parent.parent);
        }
      }
    }
    this.root.isRed = false;
  }

  public insert(key: string, value: string) {
    const normalizedKey = key.trim();
    const newNode = new Node(normalizedKey, value, true);

    if (!this.root) {
      this.root = newNode;
      this.root.isRed = false;
      return;
    }

    let current = this.root;
    let parent: Node | null = null;

    while (current) {
      parent = current;
      if (normalizedKey === current.key) {
        current.value = value;
        return;
      } else if (normalizedKey < current.key) {
        current = current.left;
      } else {
        current = current.right;
      }
    }

    newNode.parent = parent;
    if (parent) {
      if (normalizedKey < parent.key) {
        parent.left = newNode;
      } else {
        parent.right = newNode;
      }
    }

    this.fixInsert(newNode);
  }

  public insertNode(newNode: Node) {
    if (!this.root) {
      this.root = newNode;
      this.root.isRed = false;
      return;
    }

    let current = this.root;
    let parent: Node | null = null;

    while (current) {
      parent = current;
      if (newNode.key === current.key) {
        current.value = value;
        return;
      } else if (newNode.key < current.key) {
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

  public printTree(): void {
    if (!this.root) {
      console.log("Tree is empty");
      return;
    }
    this.printTreeRec(this.root, 0, true);
  }

  private printTreeRec(
    node: Node | null,
    level: number,
    isLeft: boolean,
  ): void {
    if (!node) return;

    this.printTreeRec(node.right, level + 1, false);

    console.log(
      " ".repeat(level * 4) +
        (level > 0 ? (isLeft ? "└── " : "┌── ") : "") +
        (node.isRed ? "\x1b[31m" : "\x1b[0m") +
        `[${level}] ${node.key}` +
        "\x1b[0m",
    );

    this.printTreeRec(node.left, level + 1, true);
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

  preorder() {
    this._preorderRec(this.root);
    console.log();
  }

  _preorderRec(root: Node | null) {
    if (root !== null) {
      process.stdout.write(root.key + " -> ");
      this._preorderRec(root.left);
      this._preorderRec(root.right);
    }
  }

  inorder() {
    this._inorderRec(this.root);
    console.log();
  }

  _inorderRec(root: Node | null) {
    if (root !== null) {
      this._inorderRec(root.left);
      process.stdout.write(root.key + " -> ");
      this._inorderRec(root.right);
    }
  }

  postorder() {
    this._postorderRec(this.root);
    console.log();
  }

  _postorderRec(root: Node | null) {
    if (root !== null) {
      this._postorderRec(root.left);
      this._postorderRec(root.right);
      process.stdout.write(root.key + " -> ");
    }
  }

  public searchBySubstring(substring: string): Node[] {
    const result: Node[] = [];
    this.searchBySubstringHelper(this.root, substring, result);
    return result;
  }

  private searchBySubstringHelper(
    node: Node | null,
    substring: string,
    result: Node[],
  ) {
    const key = node?.key.toLowerCase();
    const value = node?.value.toLowerCase();
    if (!node) return;
    if (key === substring && !result.includes(node)) result.unshift(node);
    if (key.includes(substring) && !result.includes(node)) {
      result.push(node);
    } else if (value.includes(substring) && !result.includes(node)) {
      result.push(node);
    }
    this.searchBySubstringHelper(node.left, substring, result);
    this.searchBySubstringHelper(node.right, substring, result);
  }

  public searchByKeySubstring(substring: string): Node[] {
    const result: Node[] = [];
    this.searchByKeySubstringHelper(this.root, substring.toLowerCase(), result);
    return result;
  }
  
  private searchByKeySubstringHelper(
    node: Node | null,
    substring: string,
    result: Node[],
  ) {
    if (!node) return;
  
    const key = node.key.toLowerCase();
  
    if (key.startsWith(substring)) {
      result.push(node);
    }
  
    if (substring < key) {
      this.searchByKeySubstringHelper(node.left, substring, result);
    } else {
      this.searchByKeySubstringHelper(node.left, substring, result);
      this.searchByKeySubstringHelper(node.right, substring, result);
    }
  }
}
