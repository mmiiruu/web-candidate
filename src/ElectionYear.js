import React from "react";
import { useNavigate } from "react-router-dom";
import "./css/year.css";
function ElectionYear() {
  const navigate = useNavigate();
  const handleYearSelect = (year) => {
    navigate(`/year/${year}`);
  };

  return (
    <div className="body-year">
      <h2>Select Election Year</h2>
      <div className="select">
        {[2020, 2021, 2022, 2023, 2024, 2025, 2026].map((year) => (
          <button
            className="btn btn-year btn-primary"
            key={year}
            onClick={() => handleYearSelect(year)}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
}

export default ElectionYear;
