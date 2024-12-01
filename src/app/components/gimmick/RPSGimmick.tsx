import React, { useState } from "react";

const RPSGimmick = () => {
  const [playerChoice, setPlayerChoice] = useState<string | null>(null);
  const [computerChoice, setComputerChoice] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);

  const choices = ["✊", "✋", "✌️"];

  const play = (playerChoice: string) => {
    const computerChoice = choices[Math.floor(Math.random() * choices.length)];
    setPlayerChoice(playerChoice);
    setComputerChoice(computerChoice);
    setResult(getResult(playerChoice, computerChoice));
  };

  const getResult = (player: string, computer: string) => {
    if (player === computer) return "Draw!";
    if (
      (player === "✊" && computer === "✌️") ||
      (player === "✋" && computer === "✊") ||
      (player === "✌️" && computer === "✋")
    ) {
      return "You win!";
    }
    return "Computer wins!";
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="mb-8 text-4xl font-bold">Rock Paper Scissors</h1>
      <div className="mb-8 flex space-x-4">
        {choices.map((choice, index) => (
          <button
            key={index}
            className="rounded-full bg-white p-4 shadow-md transition-shadow hover:shadow-lg"
            onClick={() => play(choice)}
          >
            <span className="text-6xl">{choice}</span>
          </button>
        ))}
      </div>
      <div className="mb-4 text-2xl font-semibold">
        {result ? result : "Choose your move!"}
      </div>
      <div className="flex space-x-8">
        <div className="text-center">
          <div className="mb-2 text-xl font-medium">You</div>
          <div className="rounded-fullshadow-md flex h-24 w-24 items-center justify-center">
            <span className="text-5xl">{playerChoice || "?"}</span>
          </div>
        </div>
        <div className="text-center">
          <div className="mb-2 text-xl font-medium">Computer</div>
          <div className="rounded-fullshadow-md flex h-24 w-24 items-center justify-center">
            <span className="text-5xl">{computerChoice || "?"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RPSGimmick;
