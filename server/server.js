var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var port = 3030;

var userMock = require("./mock/user.json");
var userProductsMock = require("./mock/userProducts.json");

// Configure app to use bodyParser to parse json data
var app = express();
var server = require("http").createServer(app);
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Test server is working (GET http://localhost:3001/api)
app.get("/api/", function(req, res) {
  res.json({ message: "Hi, welcome to the server api!" });
});

// JWT based login service.
app.get("/api/user", function(req, res) {
  res.send(userMock)
});
// get user products
app.get("/api/user/products", function(req, res) {
  res.send(userProductsMock)
});

// Start the server
server.listen(port);
console.log("Server is listening on port " + port);
