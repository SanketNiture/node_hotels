
const express = require("express");
const db = require("./db");
const app = express();
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bodyParser = require("body-parser");
const menu = require("./menu");
const Person = require("./person");

app.use(bodyParser.json());
app.use(passport.initialize());

// Define passport local strategy for user authentication
passport.use("user", new LocalStrategy(async (username, password, done) => {
  try {
    console.log("Received credentials", username, password);
    const user = await Person.findOne({ username: username });
    if (!user) {
      return done(null, false, { message: "Incorrect Username" });
    }
    const isPasswordMatch = user.password === password;
    if (isPasswordMatch) {
      return done(null, user);
    } else {
      return done(null, false, { message: "Incorrect Password" });
    }
  } catch (error) {
    return done(error);
  }
}));

// Define authentication middleware for the '/' route
app.get('/', passport.authenticate('user', { session: false }), (req, res) => {
  res.send("Welcome to our hotel");
});

app.get("/menu/:VaryDishes", async (req, res) => {
  try {
    const VaryDishes = req.params.VaryDishes;
    if (
      VaryDishes == "Palak Paneer" ||
      VaryDishes == "Mutton Curry" ||
      VaryDishes == "Mutton Biryani" ||
      VaryDishes == "Chicken Biryani"
    ) {
      const response = await menu.find({ dishes: VaryDishes });
      console.log("Response fetched");
      res.status(200).json(response);
    } else {
      res.status(400).json({ error: "Invalid dish" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Import the router files
const personRoutes = require("./routes/PersonRoute");
const menuRoutes = require("./routes/MenuRoute");

// Use the routers
app.use("/person", personRoutes);
app.use("/menu", menuRoutes);

const port = 8000;
app.listen(port, () => {
  console.log("Server is running on port", port);
});
