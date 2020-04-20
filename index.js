const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
let Json = require('./data.json')






const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/', function (req, res) {
    res.send({'message':'hello world'})
  })

app.get('/data', function (req, res) {
    var pageCount = Math.ceil(Json.length / 10);
    var page = parseInt(req.query.page);
    var sort = req.query.sort;
    if(sort){
        var dataset = Json.reverse();
    }
    else{
        var dataset = Json;
    }
    if (!page) { page = 1;}
    if (page > pageCount) {
        page = pageCount
      }
    res.send({'message':'success',count:dataset.length,data:dataset.slice(page * 10 - 10, page * 10)})
  })




const PORT = process.env.PORT || 3000;



app.listen(PORT , function() {
  console.log('App is running!',PORT);
});