
const express = require("express");
const mongoose = require("mongoose");


const User = require("./models/blog");

const userRoute = require("./routes/user");



const app = express();
const PORT =8000;

mongoose
  .connect("mongodb://127.0.0.1:27017/blogify")
  .then((e) => console.log("MongoDB Connected"));

app.use(express.urlencoded({ extended: false }));


app.get("/", async (req, res) => {
  const allBlogs = await Blog.find({});
  res.render("home", {
    user: req.user,
    blogs: allBlogs,
  });
});

app.use("/user", userRoute);


app.listen(PORT, () => console.log(`Server Started at PORT:${PORT}`));