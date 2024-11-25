import { ReactElement } from "react";
import { GimmickNode } from "./GimmickNode";

export class ColorNode extends GimmickNode {
  constructor(
    public key: string,
    public value: string,
    public content: string,
    public gimmickComponent: () => ReactElement,
  ) {
    super(key, value, content, gimmickComponent);
  }
}
