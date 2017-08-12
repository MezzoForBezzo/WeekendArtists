var express = require('express');
var request = require('request-promise-native');

var app = express();
app.use(express.static(__dirname + "/public"));
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
    var desc = data.record.description;
    console.log(imageUrl);
    results = [imageUrl, title, desc];
    return results;
  });
};

function getRandomImages(){
  // DO STUFF
  var digitalNZUrl = "http://api.digitalnz.org/v3/records.json?api_key=" + digitalNZKey + "&text=&per_page=100&category=images";
  return request({url: digitalNZUrl, json: true}).then(data => {

    var rndImages = [];

    (data.search["results"].forEach((img) => rndImages.push(img.large_thumbnail_url)));
    debugger;
    //var imageUrl = data.record.large_thumbnail_url;
    //var title = data.record.title;
    //var desc = data.record.description;

    // results = [imageUrl, title, desc];
    return rndImages;
  });
};

app.get('/', function (req, res) {
  getRandomImages().then(image => {
    var variables = {image};
    res.render("index.html.ejs", variables);
  });
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
