import webData from "@/app/webs.json";
import RedBlackTree from "./class/RedBlackTree";
import { ColorNode } from "./class/gimmick/ColorNode";
import ColorGimmick from "./components/gimmick/ColorGimmick";
import Calculator from "./components/gimmick/CalculatorGimmick";
import { CalculatorNode } from "./class/gimmick/CalculatorNode";
import { faker } from "@faker-js/faker";

const tree = new RedBlackTree();

faker.seed(123);

for (let i = 0; i < 50; i++) {
  const value =
    faker.lorem.paragraph(10) +
    "\n" +
    faker.lorem.paragraph(15) +
    "\n" +
    faker.lorem.paragraph(15);

  tree.insert(faker.lorem.word(10), value);
}

tree.insertNode(new ColorNode("blue", "blue.com", ColorGimmick));
tree.insertNode(
  new CalculatorNode(
    "calc",
    "This is a calculator gimmick node",
    Calculator,
  ),
);

webData.forEach((web) => {
  tree.insert(web.key, web.value);
});

tree.printTree()
console.log("tree populated!!");

export default tree;
