const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const tableRoutes = require("./routes/tables");
const orderRoutes = require("./routes/orders");
const sabjiRoutes = require("./routes/sabji");


require("./db");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/tables", tableRoutes);
app.use("/api/orders", orderRoutes); 
app.use("/api/sabji", sabjiRoutes);

app.listen(5000, () => {
  console.log("Backend running on port 5000");
});
