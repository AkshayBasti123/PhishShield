const scenarios = [
  {
    message: `Subject: Urgent - Update Your Banking Info\n\nDear user, we noticed unusual activity in your bank account. Please click the link below to confirm your details:\n\nhttp://secure-banking123.com`,
    isLegit: false
  },
  {
    message: `Subject: Reminder - School Project Deadline\n\nHey Akshay,\n\nJust a reminder that your science fair project is due this Friday. Let me know if you need help!\n\n- Mr. Singh`,
    isLegit: true
  },
  {
    message: `Subject: You’ve Won a Gift Card!\n\nCongratulations! You have won a $100 Amazon gift card. Click here to claim now!\n\nhttp://amazon-prizes-now.net`,
    isLegit: false
  },
  {
    message: `Subject: School WiFi Maintenance\n\nDear students,\n\nWe’ll be performing maintenance on the school WiFi network this Saturday at 9AM.\n\n- IT Dept.`,
    isLegit: true
  }
];

let score = 0;
let current = 0;

function loadScenario() {
  const card = document.getElementById("phish-card");
  const scenario = scenarios[current];
  card.textContent = scenario.message;
  document.getElementById("feedback").textContent = '';
}

function submitAnswer(userSaysLegit) {
  const correct = scenarios[current].isLegit === userSaysLegit;
  const feedback = document.getElementById("feedback");

  if (correct) {
    score++;
    feedback.textContent = "✅ Correct!";
    feedback.style.color = "green";
  } else {
    feedback.textContent = "❌ Oops! That was incorrect.";
    feedback.style.color = "red";
  }

  document.getElementById("score").textContent = `Score: ${score}`;

  current++;
  if (current < scenarios.length) {
    setTimeout(loadScenario, 1500);
  } else {
    setTimeout(() => {
      document.getElementById("phish-card").textContent = "You've completed the quiz!";
      document.querySelector(".buttons").style.display = "none";
    }, 1500);
  }
}

window.onload = loadScenario;
