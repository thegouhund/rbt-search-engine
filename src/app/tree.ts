import webData from "@/app/webs.json";
import { faker } from "@faker-js/faker";
import RedBlackTree from "./class/RedBlackTree";
import { ColorNode } from "./class/gimmick/ColorNode";
import ColorGimmick from "./components/gimmick/ColorGimmick";

const tree = new RedBlackTree();
tree.insertNode(new ColorNode(
  "blue",
  "blue.com",
  "This is a color node",
  ColorGimmick,
));



webData.forEach((web) => {
  tree.insert(web.key, web.url, faker.lorem.paragraphs({ min: 20, max: 50 }));
});



console.log("tree populated!!");

export default tree;
