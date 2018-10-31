const express = require('express')
const mustacheExpress = require('mustache-express')
var bodyParser = require('body-parser')
const app = express()
const port = 3005

app.use(bodyParser.urlencoded({ extended: false }))

app.engine('mustache',mustacheExpress())
app.set("views","./views")
app.set("view engine","mustache")
app.use(express.static('css'))
//-------------------------------
let movieList = []

app.get('/',function(req,res){
  res.render('index', {movieList:movieList})
})
app.get('/add_movies', function(req,res){
  res.render('add_movies')
})
app.post('/add_movies',function(req,res){
  let genre = req.body.genre
  let movieTitle = req.body.movieTitle
  let movieDescription =req.body.movieDescription
  let movieUrl = req.body.movieUrl
  movieList.push({movieTitle: movieTitle, movieDescription: movieDescription, genre:genre, movieUrl:movieUrl})
  res.redirect('/')
})

app.post('/delete_movie',function(req,res){
  let title = req.body.movieTitle
  movieList= movieList.filter(function(each){
    if(each.movieTitle != title)
    return each
  })
  res.redirect('/')
})

app.get('/add_more_movie',function(req,res){
  res.redirect('/add_movies')
})
app.get('/movies/:genre',function(req,res){
  let genre = req.params.genre
  let moviesByGenre = movieList.filter(function(each){
    return genre == each.genre
  })
res.render('index', {movieList:moviesByGenre})
})

app.listen(port, function(){
  console.log("Server has started...")
})
