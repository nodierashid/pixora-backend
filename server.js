const express = require("express");
const cors = require("cors");

const app = express();
const PORT = procss.env.port ||  3000;

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    success: true,
    message: "Pixora API is running",
    developer: "nodierashid"
  });
});

app.get("/api/status", (req, res) => {
  res.json({
    online: true,
    service: "Pixora",
    message: "Backend connected"
  });
});

app.post("/api/process", (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.status(400).json({
      success: false,
      message: "URL is required"
    });
  }

  res.json({
    success: true,
    message: "URL received successfully",
    url: url
  });
});

app.listen(PORT, () => {
  console.log(`Pixora API running on port ${PORT}`);
});
