var express = require('express');
var request = require('request-promise-native');
var jsonQuery = require('json-query')

var app = express();
app.use(express.static(__dirname + "/public"));
app.set("view engine", "ejs")

var digitalNZKey = "dHe4fP3p2HMw4jm92snZ";
var databaseVersion = "v3";

function testColorPicker(){
  // Formatted colours: Returned in array as {IMG, IMG, IMG, BG, BG, BG, FG, FG, FG
  var request = require('request'),
      apiKey = 'acc_f8948e118b862e4',
      apiSecret = '768f05ab9814e9bc93a28a4cd2cbb179',
      imageUrl = 'https://imagga.com/static/images/tagging/wind-farm-538576_640.jpg';

  request.get('https://api.imagga.com/v1/colors?url='+encodeURIComponent(imageUrl), function (error, response, body) {
      // console.log('Status:', response.statusCode);
      // console.log('Headers:', JSON.stringify(response.headers));
      // console.log('Response:', body);
      var result = JSON.parse(body);
      var colors = []
      result.results[0]["info"].image_colors.forEach((img) => colors.push(img.html_code));
      result.results[0]["info"].background_colors.forEach((bgImg) => colors.push(bgImg.html_code));
      result.results[0]["info"].foreground_colors.forEach((fgImg) => colors.push(fgImg.html_code));
      console.log(colors);
      console.log(body);
  }).auth(apiKey, apiSecret, true);

  return colors;
};


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
  var digitalNZUrl = "http://api.digitalnz.org/v3/records.json?api_key=" + digitalNZKey + "&text=kiwi&per_page=100&category=images";
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

app.get('/test', function(req,res){
    testColorPicker();
});

app.get('/description', function(req,res){
    console.log(req.query.id);
    var id = req.query.id;
    var variables = {id}
    res.render("description.html.ejs", variables);
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});
