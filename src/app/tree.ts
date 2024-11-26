import webData from "@/app/webs.json";
import { faker } from "@faker-js/faker";
import RedBlackTree from "./class/RedBlackTree";
import { ColorNode } from "./class/gimmick/ColorNode";
import ColorGimmick from "./components/gimmick/ColorGimmick";
import Calculator from "./components/gimmick/CalculatorGimmick";

const tree = new RedBlackTree();
tree.insertNode(
  new ColorNode("blue", "blue.com", "This is a color node", ColorGimmick),
);
tree.insertNode(
  new ColorNode(
    "calculator",
    "calculator.com",
    "This is a calculator gimmick node",
    Calculator,
  ),
);

webData.forEach((web) => {
  tree.insert(web.key, web.url, faker.lorem.paragraphs({ min: 20, max: 50 }));
});

for (let i = 0; i < 20; i++) {
  tree.insert(
    faker.lorem.word(),
    faker.internet.url(),
    faker.lorem.paragraphs({ min: 20, max: 50 }),
  );
}

console.log("tree populated!!");

export default tree;
