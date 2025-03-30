let currentQuestion = 0;
let questions = [];

async function loadQuestions() {
  const res = await fetch(`/data/${topicId}.json`);
  questions = await res.json();
  loadQuestion();
}

function loadQuestion() {
  const q = questions[currentQuestion];
  document.getElementById("question").innerText = q.question;
  const choicesDiv = document.getElementById("choices");
  const feedback = document.getElementById("feedback");
  feedback.innerText = "";
  choicesDiv.innerHTML = "";

  q.choices.forEach(choice => {
    const label = document.createElement("label");
    label.innerHTML = `<input type="radio" name="mc" value="${choice}" /> ${choice}<br/>`;
    choicesDiv.appendChild(label);
  });
}

function checkAnswer() {
  const selected = document.querySelector('input[name="mc"]:checked');
  if (!selected) {
    alert("請選擇一個答案！");
    return;
  }

  const answer = selected.value;
  const correct = questions[currentQuestion].answer;
  const feedback = document.getElementById("feedback");

  if (answer === correct) {
    feedback.innerText = "✅ 正確！";
  } else {
    feedback.innerText = `❌ 錯了，正確答案是：${correct}`;
  }
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    loadQuestion();
  } else {
    document.getElementById("question").innerText = "🎉 你已完成所有題目！";
    document.getElementById("choices").innerHTML = "";
    document.getElementById("feedback").innerText = "";
  }
}

window.onload = loadQuestions;
