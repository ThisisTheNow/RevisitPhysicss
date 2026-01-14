

const userId = Number(localStorage.getItem("userId"));

async function loadProgress(quizName) {
  const r = await fetch(`https://revisitphysics.onrender.com/progress/load?userId=${userId}`);
  const data = await r.json();
  if (!data.ok) return null;

  return data.progress.find(p => p.quiz_id === quizName) || null;
}

async function loadScore(quizName) {
  const quiz = await loadProgress(quizName);
  return quiz ? quiz.score : null;
}

async function loadTotal(quizName) {
  const quiz = await loadProgress(quizName);
  return quiz ? quiz.total : null;
}

async function loadLastUpdate(quizName) {
  const quiz = await loadProgress(quizName);
  return quiz ? quiz.updated_at : null;
}
async function continuousUpdate(spanId, quizName) {
  const el = document.getElementById(spanId);
  if (!el) return;
  const lastUpdateSpan = document.getElementById(quizName + "LastAttempt");
  if (!lastUpdateSpan) return;
  
  const raw = await loadLastUpdate(quizName);
  const d = new Date(raw);
  const hours = d.getHours();
  const minutes = d.getMinutes().toString().padStart(2, "0");
  const onlyDate = d.toISOString().split("T")[0];
  const lastUpdate = `${onlyDate} at ${hours}:${minutes}`;
  
  const score = await loadScore(quizName);
  const total = await loadTotal(quizName);
  if (score === null) {
    el.textContent = "Not attempted";
  } else {
    el.textContent = `${score} / ${total}`;
    lastUpdateSpan.textContent = lastUpdate;
    
  }
}
continuousUpdate("IandSFScore", "IandSF");
setInterval(() => {
  continuousUpdate("IandSFScore", "IandSF");
}, 5000);