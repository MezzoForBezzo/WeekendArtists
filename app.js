var express = require('express');
var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs")

var digitalNZKey = "dHe4fP3p2HMw4jm92snZ";
var databaseVersion = "v3";



function getExampleImage(){
  var id = "5983a0ca1257573778000722";
  var digitalNZUrl = "http://api.digitalnz.org/" +databaseVersion +"/records/" +id +"?api_key=" +digitalNZKey;
  var request = request({url: digitalNZUrl, json: true});
  console.log(request);
  return request;
}

app.get('/', function (req, res) {
  getExampleImage().then(res.render("index.html.ejs"));
});
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
