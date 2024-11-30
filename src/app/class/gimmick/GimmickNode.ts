import { ReactElement } from "react";
import Node from "../Node";

export class GimmickNode extends Node {
  constructor(
    public key: string,
    public value: string,
    public gimmickComponent: () => ReactElement,
  ) {
    super(key, value, true);
  }
}
