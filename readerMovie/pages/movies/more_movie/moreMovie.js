// pages/movies/more_movie/moreMovie.js
var app = getApp();
var util = require("../../../utils/utils.js");
Page({
  data: {
    movies: [],
    total:0
  },
  onLoad: function (options) {
    var category = options.categoryTitle;
    console.log(options.categoryTitle);
    this.data.title = category;
    var contentUrl = util.selectUrl(category);
    this.setData({
      title: category
    });
    
    util.http(contentUrl, this.getMoviesData);
  },
  getMoviesData: function (moviesData) {
    var moviesData = moviesData.subjects;
    var movie = [];
    for (var x in moviesData) {
      var title = moviesData[x].title
      title = title.slice(0, 6);
      movie.push({
        title: title,
        images: moviesData[x].images.large ? moviesData[x].images.large:'',
        score: moviesData[x].rating.average,
        stars: util.startsArr(moviesData[x].rating.stars),
        movieId: moviesData[x].id
      })
    }
    movie = this.data.movies.concat(movie);
    console.log(movie);
    this.setData({
      movies: movie
    });
  },
  onShow: function () {
    var title = this.data.title;
    wx.setNavigationBarTitle({
      title: title
    })
  },
  loadMore:function(){
    var category=this.data.title;
    var total = this.data.total + 20;
    this.setData({
      total:total
    })
    var moreUrl = util.selectUrl(category)+"?start="+total+"&count=20";
    util.http(moreUrl, this.getMoviesData);
    console.log(moreUrl);
  },
  onMovieDetail:function (event) {
    var movieId = event.currentTarget.dataset.id;
    console.log(movieId);
    wx.navigateTo({
      url: '../movie_detail/movieDetail?movieId=' + movieId,
    })
  }
})