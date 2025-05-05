// filepath: c:\Users\hp\giphy\giphy-app\src\components\ReactionSystem.jsx
import React, { useState } from "react";

const ReactionSystem = () => {
  const [reactions, setReactions] = useState({ like: 0, laugh: 0, love: 0 });

  const addReaction = (type) => {
    setReactions({ ...reactions, [type]: reactions[type] + 1 });
  };

  return (
    <div>
      <h3 className="font-bold text-lg">React to this GIF</h3>
      <div className="flex gap-2">
        <button onClick={() => addReaction("like")}>👍 {reactions.like}</button>
        <button onClick={() => addReaction("laugh")}>😂 {reactions.laugh}</button>
        <button onClick={() => addReaction("love")}>❤️ {reactions.love}</button>
      </div>
    </div>
  );
};

export default ReactionSystem;