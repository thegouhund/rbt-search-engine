import webData from "@/app/webs.json";
import { faker } from "@faker-js/faker";
import RedBlackTree from "./class/RedBlackTree";

const tree = new RedBlackTree();

webData.forEach((web) => {
  tree.insert(web.key, web.url, faker.lorem.paragraphs({ min: 20, max: 50 }));
});
console.log("tree populated!!");

export default tree;
