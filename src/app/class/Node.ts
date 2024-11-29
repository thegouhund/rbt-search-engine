export default class Node {
  constructor(
    public key: string,
    public value: string,
    public isRed: boolean,
    public left: Node | null = null,
    public right: Node | null = null,
    public parent: Node | null = null,
  ) {}

  public toJSON() {
    return {
      key: this.key,
      value: this.value,
    };
  }
}
