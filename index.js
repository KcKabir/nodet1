import express from 'express';
import bodyParser from 'body-parser';
import { dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

let User = false;

// ✅ Only used for POST /movies
function PwdCheck(req, res, next) {
  const password = req.body["password"];
  if (password === "shyandgoofy") {
    User = true;
  } else {
    User = false;
  }
  next(); // Continue to route handler
}

// ✅ Homepage route (no password needed here)
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// ✅ Apply password check ONLY to this route
app.post("/movies", PwdCheck, (req, res) => {
  if (User) {
    res.sendFile(__dirname + "/movies.html");
  } else {
    res.sendFile(__dirname + "/index.html");
  }
});

// ✅ Server startup
app.listen(3000, () => {
  console.log("The server is running at http://localhost:3000");
});
