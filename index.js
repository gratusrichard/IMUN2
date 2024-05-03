const express = require('express');
const { appendFile } = require('fs');
const mongoose = require('mongoose');
const engine = require('ejs-mate');
const path = require('path');
const methodOverride = require('method-override');
const person = require('./models/person')

const app = express();
mongoose
  .connect('mongodb://127.0.0.1:27017/snsimun')
  .then(() => console.log('connection opened with mongoose'))
  .catch((err) => console.log('cannot access mongodb for some reason'));
app.engine('ejs', engine);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.set('view engine', 'ejs');
app.use('/views', express.static(__dirname + '/views'));

app.use(express.static('public'));

app.use(methodOverride('_method'));

app.use(express.urlencoded({extended:true}))

app.listen(3000, () => {
  console.log('the port is opened on 3000');
});

app.get('/', (req, res, next) => {
  res.render('./boilerplate/home');
});

app.get('/admin', (req, res, next) => {
  var name = { name: ' gratus', namee2: '' };
  res.render('admin', { name });
});



app.get('/about', (req, res, next) => {
  res.render('about');
});


app.post('/admin', async (req, res, next) => {

  console.log(req.body)
  var personDetail = await new person(req.body)
  personDetail.save();
  res.send('success')
})


