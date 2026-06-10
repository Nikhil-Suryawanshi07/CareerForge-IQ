import { useState } from "react";

function App() {
  const [currentRole, setCurrentRole] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [certs, setCerts] = useState([]);
  const [score, setScore] = useState(0);
  const [studyPlan, setStudyPlan] = useState([]);
  const [questions, setQuestions] = useState([]);

  const generatePlan = async () => {
    try {
      const response = await fetch(
        "http://127.0.0.1:5000/career-plan",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            targetRole: targetRole,
          }),
        }
      );

      const data = await response.json();

      setCerts(data.certifications);
      setScore(data.readiness_score);

      const planResponse = await fetch(
        "http://127.0.0.1:5000/study-plan"
      );

      const planData = await planResponse.json();

      setStudyPlan(planData.plan);

      const interviewResponse = await fetch(
        "http://127.0.0.1:5000/interview-questions"
      );

      const interviewData = await interviewResponse.json();

      setQuestions(interviewData.questions);

    } catch (error) {
      console.error(error);
      alert("Backend connection failed");
    }
  };

  return (
    <div style={{ padding: "30px", fontFamily: "Arial" }}>
      <h1>CareerForge IQ</h1>

      <h3>Current Role</h3>
      <input
        type="text"
        value={currentRole}
        onChange={(e) => setCurrentRole(e.target.value)}
        placeholder="Student"
      />

      <h3>Target Role</h3>
      <input
        type="text"
        value={targetRole}
        onChange={(e) => setTargetRole(e.target.value)}
        placeholder="DevOps Engineer"
      />

      <br /><br />

      <button onClick={generatePlan}>
        Generate Career Plan
      </button>

      <hr />

      <h3>Recommended Certifications</h3>
      <ul>
        {certs.map((cert, index) => (
          <li key={index}>{cert}</li>
        ))}
      </ul>

      <h3>Career Readiness Score</h3>
      <p>{score}%</p>

      <h3>📚 Study Plan</h3>
      <ul>
        {studyPlan.map((week, index) => (
          <li key={index}>{week}</li>
        ))}
      </ul>

      <h3>🎤 Interview Questions</h3>
      <ul>
        {questions.map((question, index) => (
          <li key={index}>{question}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;