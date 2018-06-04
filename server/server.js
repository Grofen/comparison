require('./config/config');

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const hbs = require('hbs');
const {ObjectID} = require('mongodb');

var {mongoose} = require('./db/mongoose');
var {Movie} = require('./models/movies');
var {Gallery} = require('./models/gallery');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000;

var app = express();
app.use(bodyParser.json());
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var moviesData = Movie.find();

hbs.registerPartials(path.join(__dirname, '../views/partials'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

app.use(express.static(publicPath));
hbs.registerHelper('websiteTitle', () => 'Feelmotion 3.0');
hbs.registerHelper('currentYear', () => new Date().getFullYear());

app.get('/', (req, res) => {
  Movie.find((err,result) => {
    res.render('index.html', {
      result
    });
  });
});

app.get('/json', (req, res) => {
  Movie.find((err,result) => {
    res.json({result});
  });
});

app.get('/submit', (req, res) => {
  res.render('submit.html');
});

app.get('/program', (req, res) => {
  res.render('program.html');
});

app.get('/about', (req, res) => {
  res.render('about.html');
});

app.get('/parties', (req, res) => {
  res.render('parties.html');
});

app.get('/classes', (req, res) => {
  res.render('classes.html');
});

app.get('/gallery', (req, res) => {
  Gallery.find((err, photos) => {
    res.render('gallery.html', {
      photos
    });
  });
});

app.get('/awards', (req, res) => {
  res.render('awards.html');
});

app.get('/data', (req, res) => {
  res.render('data.html');
});

app.get('/galleryData', (req, res) => {
  res.render('galleryData.html');
});

app.post('/new', urlencodedParser, (req, res) => {
  var movie = new Movie({
    name: req.body.name,
    director: req.body.director,
    link: req.body.link,
    date: req.body.date,
    screening: req.body.screening
  });

  movie.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.post('/newGallery', urlencodedParser, (req, res) => {
  var photo = new Gallery({
    imgUrl: req.body.imgUrl
  });

  photo.save().then((doc) => {
    res.send(doc);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.get('/films/:id', (req, res) => {
  Movie.find({
    _id: req.params.id
  }).then((doc) => {
    res.render('singleMovie.html', {
      singleMovie: doc
    });
    // console.log(req.params.id);
  }, (err) => {
    res.status(400).send(err);
  });
});

app.listen(port, () => {
  console.log(`server is up on ${port}`);
});
