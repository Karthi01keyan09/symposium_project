const express = require("express");
const path = require("path");
const cors = require("cors");

const registrationRoutes = require("./routes/registrationRoutes");

const app = express();

// Middleware - Allow requests from Vercel frontend and local dev
const corsOptions = {
    origin: [
        /\.vercel\.app$/,       // any *.vercel.app domain
        "http://localhost:4000",
        "http://localhost:3000"
    ],
    methods: ["GET", "POST"],
    credentials: true
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// API routes
app.use("/api", registrationRoutes);

// Serve frontend files - FIXED for Windows
app.use(express.static(path.resolve(__dirname, "../frontend")));

// Default route
app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../frontend/index.html"));
});

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});





app.post("/admin/login", (req,res)=>{

const {username,password} = req.body;

const sql = "SELECT * FROM admins WHERE username=? AND password=?";

db.query(sql,[username,password],(err,result)=>{

if(err) return res.json({success:false});

if(result.length>0){

res.json({success:true});

}else{

res.json({success:false});

}

});

});

app.get("/admin/registrations",(req,res)=>{

db.query("SELECT * FROM registrations",(err,result)=>{

if(err) return res.send(err);

res.json(result);

});

});