import React from "react";
import { getDatabase, ref, update } from "firebase/database";

function AdminPage({ year, candidates }) {
  const database = getDatabase();

  const incrementScore = (id, currentScore) => {
    const scoreRef = ref(database, `elections/${year}/candidates/${id}/score`);
    update(scoreRef, { score: currentScore + 1 });
  };

  return (
    <div>
      <h2>Admin Control</h2>
      {candidates.map((candidate) => (
        <div key={candidate.id}>
          <p>{candidate.name}</p>
          <p>Current Score: {candidate.score}</p>
          <button onClick={() => incrementScore(candidate.id, candidate.score)}>
            Add Score
          </button>
        </div>
      ))}
    </div>
  );
}

export default AdminPage;
