const https = require("https");

const SYSTEM_PROMPT = `You are a helpful AI assistant on Roey Zalta's ML/AI portfolio website. 
Roey is a Machine Learning Engineer and AI Developer based in Israel. 

Key facts about Roey:
- Specializes in Machine Learning, Deep Learning, NLP, and GenAI
- Experienced with Python, PyTorch, TensorFlow, LangChain, and cloud platforms (AWS, GCP, Azure)
- Has built projects including: Chat with Websites via LLM Agent, Chat-GPThrones (Neo4j knowledge graph chatbot), multi-agent research assistants, and various ML/DL projects
- Active on LinkedIn sharing AI/ML insights
- GitHub: github.com/roy2392

Keep responses concise, friendly, and helpful. If asked about something you don't know about Roey, say so honestly rather than guessing. You can also help visitors understand ML/AI concepts.`;

module.exports = async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const token = process.env.GITHUB_TOKEN;
  if (!token) {
    return res.status(500).json({ error: "Server misconfigured" });
  }

  const { messages } = req.body || {};

  if (!Array.isArray(messages) || messages.length === 0 || messages.length > 20) {
    return res.status(400).json({ error: "Invalid messages" });
  }

  for (const msg of messages) {
    if (!msg.role || !msg.content || typeof msg.content !== "string" || msg.content.length > 2000) {
      return res.status(400).json({ error: "Invalid message format" });
    }
  }

  const payload = JSON.stringify({
    model: "openai/gpt-4o-mini",
    messages: [{ role: "system", content: SYSTEM_PROMPT }, ...messages],
    max_tokens: 512,
    temperature: 0.7,
  });

  try {
    const response = await new Promise((resolve, reject) => {
      const options = {
        hostname: "models.inference.ai.azure.com",
        path: "/chat/completions",
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "Content-Length": Buffer.byteLength(payload),
        },
      };

      const request = https.request(options, (resp) => {
        let data = "";
        resp.on("data", (chunk) => (data += chunk));
        resp.on("end", () => {
          if (resp.statusCode >= 400) {
            reject(new Error(`API error ${resp.statusCode}: ${data}`));
          } else {
            resolve(JSON.parse(data));
          }
        });
      });

      request.on("error", reject);
      request.setTimeout(30000, () => {
        request.destroy();
        reject(new Error("Request timeout"));
      });
      request.write(payload);
      request.end();
    });

    const reply = response.choices?.[0]?.message?.content || "Sorry, I couldn't generate a response.";
    return res.status(200).json({ reply });
  } catch (err) {
    console.error("Chat API error:", err.message);
    return res.status(502).json({ error: "Failed to get response from AI" });
  }
};
