const mongoose = require("mongoose");

const dbConnect = () => {
    mongoose.connect(process.env.MONGODB_CONNECTION_STRING).then((response) => {
        console.log("Database connected : ",
            response.connection.host,
            response.connection.name
        );

    }).catch((error) => {
        console.log(error);
    })
};

module.exports = dbConnect;