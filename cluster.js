async function sendToCluster(emailText) {
  const endpoint = "https://in03-6a569fb1520e04c.serverless.gcp-us-west1.cloud.zilliz.com";
  const token = "d96d97cb22ad6197bbb0a5d76507f70133645e1d6995729e04b0aca41f3143d8411ad7bab827f25763d5e751a841f9aa0c688298"; 
  try {
    const response = await fetch(endpoint + "/v1/vector/analyze", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: emailText })
    });

    const result = await response.json();
    console.log("Cluster AI result:", result);
  
  } catch (error) {
    console.error("Cluster AI error:", error);
  }
}
