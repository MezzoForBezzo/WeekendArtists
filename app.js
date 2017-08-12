var express = require('express');
var request = require('request-promise-native');

var app = express();
app.use(express.static("public"));
app.set("view engine", "ejs")

var digitalNZKey = "dHe4fP3p2HMw4jm92snZ";
var databaseVersion = "v3";



function getExampleImage(){
  // DO STUFF
  var id = "36680895";
  var digitalNZUrl = "http://api.digitalnz.org/" +databaseVersion +"/records/" +id +"?api_key=" +digitalNZKey;
  return request({url: digitalNZUrl, json: true}).then(data => {
    var imageUrl = data.record.large_thumbnail_url;
    var title = data.record.title;
    console.log(imageUrl);
    results = [imageUrl, title];
    return results;
  });
};

app.get('/', function (req, res) {
  getExampleImage().then(image => {
    var variables = {image};
    res.render("index.html.ejs", variables);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
