const express = require("express");
const DBconfig = require("./config/DBconfig");
const userRoutes = require("./routes/UserRoutes");

require("dotenv").config();

const app = express();
const db = new DBconfig();

app.use(express.json());

db.connect(); 

app.use("/api/users", userRoutes);

app.listen(3000, () => {
    console.log("Server running on port 3000");
});
