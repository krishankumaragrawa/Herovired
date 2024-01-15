require('dotenv').config()
const express=require("express");
const cors=require("cors");
const app=express();
app.use(cors());
app.use(express.json());
require("./routes")(app);
const port=process.env.PORT||3001;

app.listen(port,()=>{
    console.log("server has started");
});
/*
● Name
● Price
● Domain (Ex. Data, Finance, etc.)
● Program Type
● Registrations- open or closed
● Description
● Placement Assurance - Yes/No
● Image url
● University Name
● Faculty Profile(Linkedin URL if available)
● Learning Hours and Duration
● Certificate/Diploma
● Eligibility Criteria

*/