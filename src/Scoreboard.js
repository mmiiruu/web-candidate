import React, { useState, useEffect } from "react";
import { ref, set, get, update, onValue } from "firebase/database";
import { database } from "./firebaseConfig"; 

function Scoreboard() {
  const [score, setScore] = useState(0);

  function addScore() {
    const scoreRef = ref(database, "scores/point1"); 
    get(scoreRef).then((snapshot) => {
      if (snapshot.exists()) {
        const currentScore = snapshot.val();
        update(scoreRef, { value: currentScore.value + 1 });
      } else {
        set(scoreRef, { value: 1 });
      }
    });
  }
  useEffect(() => {
    const scoreRef = ref(database, "scores/point1");
    onValue(scoreRef, (snapshot) => {
      const data = snapshot.val();
      setScore(data ? data.value : 0);
    });
  }, []);

  return (
    <div>
      <h1>คะแนนปัจจุบัน: {score}</h1>
      <button onClick={addScore}>เพิ่มคะแนน</button>
    </div>
  );
}

export default Scoreboard;
