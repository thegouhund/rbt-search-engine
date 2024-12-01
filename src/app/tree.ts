import webData from "@/app/webs.json";
import RedBlackTree from "./class/RedBlackTree";
import ColorGimmick from "./components/gimmick/ColorGimmick";
import Calculator from "./components/gimmick/CalculatorGimmick";
import { GimmickNode } from "./class/GimmickNode";
import RPSGimmick from "./components/gimmick/RPSGimmick";
import TimerGimmick from "./components/gimmick/TimerGimmick";

const tree = new RedBlackTree();

const populateTree = () => {
  tree.insertNode(new GimmickNode("blue", "blue content", ColorGimmick));
  tree.insertNode(
    new GimmickNode(
      "calculator",
      "This is a calculator gimmick node",
      Calculator,
    ),
  );
  tree.insertNode(
    new GimmickNode("RPS", "Rock-Paper-Scissor game", RPSGimmick),
  );
  tree.insertNode(
    new GimmickNode(
      "rock paper scissor",
      "Rock-Paper-Scissor game",
      RPSGimmick,
    ),
  );
  tree.insertNode(new GimmickNode("timer", "Timer feature", TimerGimmick));

  webData.forEach((web) => {
    tree.insert(web.key, web.value);
  });
};

// faker.seed(123);

// for (let i = 0; i < 50; i++) {
//   const value =
//     faker.lorem.paragraph(10) +
//     "\n" +
//     faker.lorem.paragraph(15) +
//     "\n" +
//     faker.lorem.paragraph(15);

//   tree.insert(faker.lorem.words(5), value);
// }

populateTree();
tree.printTree();

export default tree;
