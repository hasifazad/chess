const express = require("express");
const app = express();
const cors = require("cors")

const dotenv = require("dotenv").config();

const errorHandler = require("./middlewares/ErrorHandler.js");
const dbConnect = require("./config/MongoDbConnection.js");



app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

dbConnect();

const userRoute = require("./routes/UserRoute.js")
const gameRoute = require("./routes/GameRoute.js")
const chatRoute = require("./routes/ChatRoute.js")
const quizRoute = require("./routes/QuizRoute.js")

app.use("/api/user", userRoute);
app.use("/api/game", gameRoute);
app.use("/api/chat", chatRoute);
app.use("/api/quiz", quizRoute);

app.use(errorHandler)


const PORT = process.env.PORT || 3002;


app.listen(PORT, (err) => {

    if (err){
    
        console.log(`server listening to the ports ${PORT}`);
    } else{
        console.log(`server connected to port ${PORT}`);
        
    }
        
})

