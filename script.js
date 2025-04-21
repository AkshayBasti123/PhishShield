function analyzePhish() {
  const input = document.getElementById("inputText").value;
  const resultBox = document.getElementById("resultBox");
  const riskLevel = document.getElementById("riskLevel");
  const output = document.getElementById("highlightedOutput");
  const adviceList = document.getElementById("adviceList");

  resultBox.classList.remove("hidden");
  adviceList.innerHTML = "";

  // Simulated Cluster AI logic
  const redFlags = [
    { pattern: /click here/i, advice: "Avoid vague link text like 'Click here'." },
    { pattern: /urgent|immediately|act now/i, advice: "Be cautious of urgent language." },
    { pattern: /http:\/\/.*(login|secure|verify).*\.com/i, advice: "This URL looks suspicious." },
    { pattern: /congratulations|won|gift card/i, advice: "Unexpected prizes are common bait." },
    { pattern: /account has been suspended/i, advice: "Fake alerts often try to scare you." }
  ];

  let flagged = [];
  let riskScore = 0;
  let highlighted = input;

  redFlags.forEach(flag => {
    if (flag.pattern.test(input)) {
      riskScore += 25;
      flagged.push(flag.advice);
      highlighted = highlighted.replace(flag.pattern, match => `<mark>${match}</mark>`);
    }
  });

  // Display risk level
  if (riskScore >= 75) {
    riskLevel.innerHTML = "🔴 <strong>High Risk</strong> – Very likely phishing.";
  } else if (riskScore >= 40) {
    riskLevel.innerHTML = "🟠 <strong>Moderate Risk</strong> – Be cautious.";
  } else if (riskScore > 0) {
    riskLevel.innerHTML = "🟡 <strong>Low Risk</strong> – No obvious danger, but stay alert.";
  } else {
    riskLevel.innerHTML = "🟢 <strong>Safe</strong> – No red flags detected.";
  }

  // Output highlights + advice
  output.innerHTML = highlighted;
  flagged.forEach(advice => {
    const li = document.createElement("li");
    li.textContent = advice;
    adviceList.appendChild(li);
  });
}
