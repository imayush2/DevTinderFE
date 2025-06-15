const express = require("express");

const app = express();

app.use("/",(req,res)=>{
    res.send("hello")
})


//listining 
app.listen(3000, (req, res) => {
  console.log("server is listinging");
});
