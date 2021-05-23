const path = require("path");
const express = require("express");
const hbs = require("hbs");

const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();
const port = process.env.PORT || 3000;

// Defione paths for Express config
const publicDirectory = path.join(__dirname, "../public");
const viewsDirectory = path.join(__dirname, "../templates/views");
const partialsDirectory = path.join(__dirname, "../templates/partials");

// Setup handelbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsDirectory);
hbs.registerPartials(partialsDirectory);

//Setup static directory to serve
app.use(express.static(publicDirectory));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App!",
    createdBy: "Saaransh",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    createdBy: "Saaransh",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    helpMessage: "Do you require any help?",
    createdBy: "Saaransh",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "address not provided.",
    });
  }

  geocode(req.query.address, (err, { lat, long, location } = {}) => {
    if (err) {
      return res.send({
        error: err,
      });
    }
    forecast(lat, long, (err, forecastData) => {
      if (err) {
        return res.send({
          error: err,
        });
      }
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address,
      });
    });
  });
});

app.get("/products", (req, res) => {
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404!",
    errorText: "Help article not found!",
    createdBy: "Saaransh",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404!",
    errorText: "Page not found!",
    createdBy: "Saaransh",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port + " .");
});
