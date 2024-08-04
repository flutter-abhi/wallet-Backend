
require("dotenv").config();
const mongoose = require("mongoose");


exports.database = () => {

    mongoose.connect(process.env.DB_URL).then(
        console.log("database connect succefully")
    ).catch(
        (error) => {
            console.log(error);
            process.exit(1);
        }
    );
}