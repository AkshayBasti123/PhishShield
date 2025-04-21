function analyzeEmail() {
  const input = document.getElementById("emailInput").value;
  const riskLevelElem = document.getElementById("riskLevel");
  const suggestionsElem = document.getElementById("suggestions");
  const resultContainer = document.getElementById("resultContainer");

  // Basic keyword check for phishing indicators
  const suspiciousKeywords = ["urgent", "verify", "click here", "account locked", "reset password", "login", "payment failed"];
  let riskScore = 0;

  suspiciousKeywords.forEach(keyword => {
    if (input.toLowerCase().includes(keyword)) {
      riskScore += 15;
    }
  });

  // Optional: boost score for sketchy links
  const urlMatches = input.match(/https?:\/\/[^\s]+/g);
  if (urlMatches) riskScore += urlMatches.length * 10;

  // Basic thresholding
  let riskLevel = "Low";
  let nextSteps = "The email doesn't seem very suspicious. Still, verify the sender before responding.";

  if (riskScore >= 40) {
    riskLevel = "High";
    nextSteps = "⚠️ This email appears to be highly suspicious. Do NOT click any links or respond. Report this to your IT department immediately.";
  } else if (riskScore >= 20) {
    riskLevel = "Medium";
    nextSteps = "⚠️ This email has signs of phishing. Be cautious. Avoid clicking on any links or attachments.";
  }

  // Display results
  riskLevelElem.innerText = riskLevel;
  suggestionsElem.innerText = nextSteps;
  resultContainer.classList.remove("hidden");

  // Optionally send to Cluster AI for deeper analysis
  sendToCluster(input);
}
