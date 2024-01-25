const app=require("./app");
const doteve=require("dotenv");
const databaseConnection=require("./config/databaseConnection");
doteve.config({path:"./config/config.env"});

// Database Connection
databaseConnection();




app.listen(process.env.PORT,function(){
    console.log(`server is running on port ${process.env.PORT}`);
});