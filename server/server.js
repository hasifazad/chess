const express = require("express");
const app = express();
const cors = require("cors")

const dotenv = require("dotenv").config();

const errorHandler = require("./middlewares/ErrorHandler.js");
const dbConnect = require("./config/MongoDbConnection.js");



app.use(express.json());
app.use(cors());

dbConnect();

app.use(errorHandler)
const userRoute = require("./routes/UserRoute.js")
const gameRoute = require("./routes/GameRoute.js")
const chatRoute = require("./routes/ChatRoute.js")

app.use("/api/user", userRoute);
app.use("/api/game", gameRoute);
app.use("/api/chat", chatRoute);


const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
    console.log(`server listening to the ports ${PORT}`);
})