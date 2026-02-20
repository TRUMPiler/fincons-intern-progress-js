const express=require("express");
const server=express();
const userRoutes=require("./routes/UserRoutes");
const taskRoutes=require("./routes/TaskRoutes");
const DBconfig = require("./config/DBconfig");
const cors = require('cors');
const errorHandler=require('./middleware/ErrorHandling');
const Port=process.env.PORT

server.use(express.json());
server.use(cors());
const db = new DBconfig(); 

db.connect();
server.use("/api/users", userRoutes);
server.use("/api/tasks",taskRoutes);
server.use(errorHandler);
server.listen(Port,()=>
{
   console.log("Server is started at http://localhost:"+Port);
});