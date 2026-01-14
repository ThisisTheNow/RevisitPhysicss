
function randInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function unhide(id) {
  const el = document.getElementById(id);
  if (el) el.classList.remove("hidden");
}

function hide(id) {
  const el = document.getElementById(id);
  if (el) el.classList.add("hidden");
}

function shuffleAnswers(boxID) {
  const box = document.getElementById(boxID);
  if (!box) return;

  const buttons = Array.from(box.children);
  for (let i = buttons.length - 1; i > 0; i--) {
    const j = randInt(0, i);
    [buttons[i], buttons[j]] = [buttons[j], buttons[i]];
  }
  buttons.forEach(btn => box.appendChild(btn));
}

const CHECK_URL = "https://revisitphysics.onrender.com/check";
const MULTI_SELECT = new Set([3, 6, 9]);
quizName = "IandSF"
let cos = 0;
let currentQuestion = 1;

async function checkWithServer(question, answer) {
  const res = await fetch(CHECK_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question, answer })
  });

  if (!res.ok) throw new Error("Server error");
  return res.json();
}


function saveProgress(quizId, score, total) {
  const userId = Number(localStorage.getItem("userId"));
  if (!Number.isInteger(userId)) return;

  return fetch("https://revisitphysics.onrender.com/progress/save", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ userId, quizId, score, total })
  });
}

totalQuestions = 10; 

function questionId(n) {
  return `Question${n}`;
}

function wrapId(n) {
  return `Q${n}wrap`;
}

function hideAll() {
  let n = 1;
  while (document.getElementById(questionId(n))) {
    hide(questionId(n));
    n++;
  }
  hide("QuizEnd");
}

function showQuestion(n) {
  hideAll();

  if (!document.getElementById(questionId(n))) {
    endQuiz();
    return;
  }

  unhide(questionId(n));

  if (document.getElementById(wrapId(n))) {
    shuffleAnswers(wrapId(n));
  }
}

function goNext() {
  currentQuestion++;
  showQuestion(currentQuestion);
}

function endQuiz() {
  hideAll();
  unhide("QuizEnd");

  const scoreEl = document.getElementById("FinalScore");
  if (scoreEl) scoreEl.textContent = String(cos);
  saveProgress(quizName, cos, totalQuestions);
}

function setupAnswerButtons() {
  const buttons = document.querySelectorAll(".Qoption[data-question][data-answer]");

  buttons.forEach(btn => {
    btn.addEventListener("click", async () => {
      const q = Number(btn.dataset.question);
      const a = btn.dataset.answer;

      if (MULTI_SELECT.has(q)) {
        btn.classList.toggle("chosen");
        return;
      }

      btn.disabled = true;

      try {
        const data = await checkWithServer(q, a);
        if (data.correct) cos++;
        goNext();
      } catch (err) {
        console.error(err);
        btn.disabled = false;
      }
    });
  });
}

function setupSubmitButtons() {
  const submitButtons = document.querySelectorAll('button[id^="Submit"]');

  submitButtons.forEach(btn => {
    btn.addEventListener("click", async () => {
      const q = Number(btn.id.replace("Submit", ""));
      if (!MULTI_SELECT.has(q)) return;

      const chosen = document.querySelectorAll(
        `.Qoption[data-question="${q}"].chosen`
      );
      const answers = Array.from(chosen).map(b => b.dataset.answer);

      btn.disabled = true;

      try {
        const data = await checkWithServer(q, answers);
        if (data.correct) cos++;
        goNext();
      } catch (err) {
        console.error(err);
        btn.disabled = false;
      }
    });
  });
}

function quizstarted() {
   cos = 0;
  currentQuestion = 1;
  showQuestion(currentQuestion);
}

window.quizstarted = quizstarted;

setupAnswerButtons();
setupSubmitButtons();

