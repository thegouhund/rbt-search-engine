export type Node = {
  key: string;
  value: string;
  description: string;
  left: Node | null;
  right: Node | null;
  parent: Node | null;
  isRed: boolean;
};
