const paymentRoutes = require("./router/paymentRoutes");
const express = require("express");

const app = express();

app.use("/payments", paymentRoutes);

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(8000, () => {
  console.log("Server listening on port 8000");
});
