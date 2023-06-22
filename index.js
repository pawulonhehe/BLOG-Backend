const express = require("express");
const connection = require("./db.js");
const cors = require("cors");

const app = express();
app.use(cors({ origin: "http://localhost:3000", credentials: true }));

//Routes
const posts = require("./routes/posts.js");
app.use("/posts", posts);

const users = require("./routes/users.js");
app.use("/users", users);

const auth = require("./routes/auth.js");
app.use("/auth", auth);

const tags = require("./routes/tags.js");
app.use("/tags", tags);

app.get("/", (req, res) => {
  res.json({ status: "ok" });
});

app.listen(1234, () => {
  console.log("serwer dziala XD");
});
