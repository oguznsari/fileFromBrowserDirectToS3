const express = require("express");
const app = express();

app.use(express.static("public")); // serve static fronted
app.use(express.json());

const indexRouter = require("./indexRouter");
app.use(indexRouter);

app.listen("3000");
console.log("Listening on port 3000");
