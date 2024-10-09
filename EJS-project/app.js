//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
var _ = require("lodash");

const homeStartingContent =
  "Welcome to my blog application! This platform is designed for tech enthusiasts, developers, and anyone passionate about learning and sharing knowledge. Built using modern web technologies like React, Node.js, and MongoDB, this application allows users to easily create, edit, and explore blog posts on a variety of topics. Whether you're here to share insights or discover new ideas, this blog offers a space for meaningful discussions and knowledge exchange in the world of software development and beyond.";
const aboutContent =
  "This blog application is a space where technology and creativity meet. Designed and developed to offer a seamless experience, it enables users to share their thoughts, insights, and experiences on various topics, particularly around software development, tech trends, and problem-solving. Powered by the MERN stack—MongoDB, Express.js, React, and Node.js—the application is built with scalability and user experience in mind. Whether you're a seasoned developer or just starting your journey, this platform is a place for learning, collaboration, and innovation. Join the conversation and be part of a growing community that thrives on sharing knowledge and ideas.";
const contactContent =
  "Have questions, suggestions, or ideas you'd like to share? I'd love to hear from you! Whether you're interested in collaborating on a project, providing feedback, or simply discussing a topic featured on the blog, feel free to reach out. Your input is valuable in making this platform better and more engaging. Use the contact form below, or connect with me directly via email or social media. Let’s collaborate and grow together!";

const app = express();
var posts = [];

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", function (req, res) {
  res.render("home", { data: homeStartingContent, composeData: posts });
});

app.get("/about", function (req, res) {
  res.render("about", { aboutData: aboutContent });
});

app.get("/contact", function (req, res) {
  res.render("contact", { contactData: contactContent });
});

app.get("/compose", function (req, res) {
  res.render("compose", { title: posts });
});

app.get("/post", function (req, res) {
  res.render("compose", { title: posts });
});

app.post("/compose", function (req, res) {
  const post = {
    title: req.body.postTitle,
    post: req.body.postBody,
  };
  posts.push(post);
  res.redirect("/");
});

app.get("/post/:topic", function (req, res) {
  posts.forEach(function (element) {
    var topics = _.lowerCase(req.params.topic);
    var title = _.lowerCase(element.title);
    if (topics === title) {
      console.log("Match Found!!");
    } else {
      console.log("Match not found!!");
    }

    res.render("post", { postTitle: posts });
  });
});

app.listen(5000, function (err) {
  if (err) {
    console.log(err);
  } else {
    console.log("Server started on port 5000");
  }
});
