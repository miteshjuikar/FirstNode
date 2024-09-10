const express = require("express");
const { connectMongoDB } = require("./connection");

const { logReqRes } = require("./middlewares");
const userRouter = require("./routes/user");

const app = express();
const port = 8080;

//Connection
connectMongoDB("mongodb://127.0.0.1:27017/firstDB")
    .then(() => console.log("MangoDB Connected"))
    .catch((err) => console.log("Mongo Error", err));

//Middlewares
app.use(express.urlencoded({extended: false}));
app.use(logReqRes("logFile.txt"));

//Routes
app.use("/users", userRouter);

app.listen(port, () => console.log(`Server is started on post ${port}`));