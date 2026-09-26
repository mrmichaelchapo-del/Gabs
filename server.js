import express from "express";
import fs from "fs";
import { exec } from "child_process";

const app = express();
app.use(express.json());

// TEMP login memory (replace with DB later)
let loggedInUsers = {};

// --- LOGIN STATUS CHECK ---
app.get("/api/login-status", (req, res) => {
  const user = req.query.user;
  res.json({ loggedIn: !!loggedInUsers[user] });
});

// --- CREATE REPO ---
app.post("/api/repos", (req, res) => {
  const { owner, name, visibility, readme } = req.body;

  if (!loggedInUsers[owner]) {
    return res.status(403).json({ error: "Not logged in" });
  }

  const basePath = `./repos/${owner}`;
  const repoPath = `${basePath}/${name}.git`;

  fs.mkdirSync(basePath, { recursive: true });

  exec(`git init --bare ${repoPath}`, (err) => {
    if (err) return res.status(500).json({ error: err.message });

    const meta = {
      visibility,
      readme,
      created: new Date().toISOString(),
    };

    fs.writeFileSync(`${repoPath}/repo.json`, JSON.stringify(meta, null, 2));

    res.json({ message: `Repo ${name} created`, meta });
  });
});

app.listen(3000, () => {
  console.log("Server running... Creating repo...");
});