import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  getDatabase,
  ref,
  onValue,
  push,
  update,
  remove,
} from "firebase/database";
import "./css/candidate.css";
function Candidate() {
  const { year } = useParams(); // รับพารามิเตอร์ปีจาก URL
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับปุ่มย้อนกลับ
  const [candidates, setCandidates] = useState([]);
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const database = getDatabase();

  // อ่านข้อมูลผู้สมัครแบบเรียลไทม์
  useEffect(() => {
    const candidatesRef = ref(database, `elections/${year}/candidates`);
    onValue(candidatesRef, (snapshot) => {
      const data = snapshot.val();
      const candidatesList = data
        ? Object.entries(data).map(([id, info]) => ({
            id,
            ...info,
            score: typeof info.score === "number" ? info.score : 0, // ตรวจสอบให้แน่ใจว่า score เป็นตัวเลข
          }))
        : [];
      setCandidates(candidatesList);
    });
  }, [year]);

  // ฟังก์ชันสำหรับเพิ่มผู้สมัครใหม่
  const addCandidate = async () => {
    if (name && photo) {
      try {
        const candidatesRef = ref(database, `elections/${year}/candidates`);
        await push(candidatesRef, { name, photo, score: 0 });
        setName(""); // รีเซ็ตฟิลด์ชื่อ
        setPhoto(""); // รีเซ็ตฟิลด์รูปภาพ
      } catch (error) {
        console.error("Error adding candidate:", error);
      }
    } else {
      alert("Please fill in both name and photo URL.");
    }
  };

  // ฟังก์ชันสำหรับเพิ่มคะแนน
  const incrementScore = async (id, currentScore) => {
    const scoreRef = ref(database, `elections/${year}/candidates/${id}`);
    await update(scoreRef, { score: (currentScore || 0) + 1 });
  };

  // ฟังก์ชันสำหรับลบผู้สมัคร
  const deleteCandidate = async (id) => {
    const candidateRef = ref(database, `elections/${year}/candidates/${id}`);
    await remove(candidateRef);
  };

  return (
    <div className="body-candidates">
      <button className="rollback" onClick={() => navigate(-1)}>
        Back
      </button>{" "}
      {/* ปุ่มย้อนกลับ */}
      <h2>Candidates for {year}</h2>
      {candidates.length === 0 && (
        <p>No candidates found. Add a new candidate below:</p>
      )}
      {/* คอนเทนเนอร์สำหรับการ์ดผู้สมัคร */}
      <div className="candidate-container">
        {candidates.map((candidate) => (
          <div className="card" key={candidate.id}>
            <img src={candidate.photo} alt={candidate.name} />
            <div className="card-body">
              <h3 className="card-title">{candidate.name}</h3>
              <p className="card-text">Score: {candidate.score}</p>
            </div>
            <button
              onClick={() => incrementScore(candidate.id, candidate.score)}
            >
              Give Vote
            </button>
            <button onClick={() => deleteCandidate(candidate.id)}>
              Delete Candidate
            </button>
          </div>
        ))}
      </div>
      <h3>Add New Candidate</h3>
      <div className="add-candidate-section">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Candidate Name"
        />
        <input
          type="text"
          value={photo}
          onChange={(e) => setPhoto(e.target.value)}
          placeholder="Photo URL"
        />
        <button onClick={addCandidate}>Add Candidate</button>
      </div>
    </div>
  );
}

export default Candidate;
