import React, { useState, useEffect } from "react";
import { ref, set, get, update, onValue } from "firebase/database";
import { database } from "./firebaseConfig"; // ไฟล์ที่เชื่อมต่อ Firebase

function Scoreboard() {
  const [score, setScore] = useState(0);

  // ฟังก์ชันสำหรับเพิ่มคะแนน
  function addScore() {
    const scoreRef = ref(database, "scores/point1"); // กำหนดตำแหน่งที่เก็บคะแนน
    get(scoreRef).then((snapshot) => {
      if (snapshot.exists()) {
        const currentScore = snapshot.val();
        update(scoreRef, { value: currentScore.value + 1 });
      } else {
        set(scoreRef, { value: 1 });
      }
    });
  }

  // อ่านข้อมูลแบบเรียลไทม์เพื่ออัพเดตคะแนนทันที
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
