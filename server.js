const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 3000;

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

  let parsedUrl;

  try {
    parsedUrl = new URL(url);
  } catch {
    return res.status(400).json({
      success: false,
      message: "Invalid URL"
    });
  }

  if (!["http:", "https:"].includes(parsedUrl.protocol)) {
    return res.status(400).json({
      success: false,
      message: "Only HTTP and HTTPS URLs are supported"
    });
  }

  res.json({
    success: true,
    message: "Public media URL accepted",
    status: "ready",
    sourceUrl: parsedUrl.href,
    downloadUrl: null,
    note: "Connect an authorized media processor to generate the download URL."
  });
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Pixora API running on port ${PORT}`);
});
