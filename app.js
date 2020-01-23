const express = require("express");
const path = require("path");
const multer = require("multer");
const ejs = require("ejs");

const storage = multer.diskStorage({
  destination: "./public",
  filename: (req, file, cb) => {
    cb(
      null,
      file.originalname + "_" + Date.now() + path.extname(file.originalname)
    );
  }
});

//Init upload
const upload = multer({
  storage: storage
  //   limits: { fileSize: 10 }
}).single("myImage");

//Init App
const app = express();

//EJS
app.set("view engine", "ejs");

//public folder
app.use(express.static("/public"));

app.get("/", (req, res) => res.render("index"));

app.post("/upload", (req, res) => {
  upload(req, res, err => {
    if (err) {
      res.render("index", {
        msg: err
      });
    } else {
      if (req.file == undefined) {
        res.render("index", {
          msg: "Error: No File Selected !"
        });
      } else {
        console.log(req.file);
        res.render("index", {
          msg: "File Uploaded!",
          file: `/public/${req.file.filename}`
        });
      }
    }
  });
});

const port = 3000;

app.listen(port, () => console.log(` app started on port No. ${port}`));
