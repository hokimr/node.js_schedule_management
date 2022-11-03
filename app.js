const express = require('express');
const bodyParser = require('body-parser');
const { getDate } = require('./date');
const date = require(__dirname +"/date.js");

const app = express();


app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('pubilc'));

const port = 3000;

const items = [];
const worklist = [];

app.get('/', (req, res) => {

    const day = date.getDay();

    res.render('list',{day: day, newitem: items});

})

app.get('/work', (req,res) => {

  res.render('list',{day:"Work List", newitem: worklist});
})

app.post('/', (req,res) => {

    if (req.body.LIST === "Work"){
      let newitem = req.body.list_name;
      worklist.push(newitem);
      res.redirect('/work')
    } else{
      let newitem = req.body.list_name;
      items.push(newitem);
      res.redirect('/')
    }


});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})