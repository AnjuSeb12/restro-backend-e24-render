const express=require("express");
const cors=require("cors");
const cookieParser=require("cookie-parser");
const app=express();
app.use(cors({
    credentials:true,
    origin:true,
}));
app.use(express.static("uploads"));
app.use(cookieParser());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(__dirname + "/uploads",express.static(__dirname + "uploads"))
// userRoutes
const useRoutes=require("./routes/userRoutes");
const restaurantRoutes=require("./routes/restaurantRoutes");
app.use('/api/v1',useRoutes);
app.use("/api/v1",restaurantRoutes);


app.use((err,req,res,next)=> {
    console.log(err.message);
});
module.exports=app;