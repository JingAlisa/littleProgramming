// pages/movies/movie.js
var util = require("../../utils/utils.js");
var app = getApp();
var baseUrl = app.globalData.g_doubanAPI;
Page({

  /**
   * 页面的初始数据
   */
  data: {
    cancelIcon: false,
    movieContainer: true,
    searchResult: false,
    searchTotal:0,
    search: {
      movies: [], 
      categoryTitle:''
    },
    inTheater: {
      movies: [],
      categoryTitle: ''
    },
    comingSoon: {
      movies: [],
      categoryTitle: ''
    },
    top250: {
      movies: [],
      categoryTitle: ''
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var inTheaterUrl = baseUrl + "/v2/movie/in_theaters?start=0&count=3";
    var comingSoonUrl = baseUrl + "/v2/movie/coming_soon?start=0&count=3";
    var top250Url = baseUrl + "/v2/movie/top250?start=0&count=3";
    this.getMoviesData(inTheaterUrl, 'inTheater', "正在热映");
    this.getMoviesData(comingSoonUrl, 'comingSoon', "即将上映");
    this.getMoviesData(top250Url, 'top250', "Top250");
    console.log("123");
  },
  getMoviesData: function (url, moviesPart, categoryTitle) {
    var that = this;
    wx.request({
      url: url,
      header: {
        'content-type': 'application/xml'
      },
      success: function (res) {
        console.log(res.data);
        that.getMyData(res.data.subjects, moviesPart, categoryTitle);
      }
    });
  },
  getMyData: function (moviesData, moviesPart, categoryTitle) {
    var movie = [];
    console.log(moviesData);
    
    for (var x in moviesData) {
      var title = moviesData[x].title
      title = title.slice(0,6);
      movie.push({
        title: title,
        images: moviesData[x].images.small,
        score: moviesData[x].rating.average,
        stars: util.startsArr(moviesData[x].rating.stars),
        movieId: moviesData[x].id
      })
    }
    movie = this.data[moviesPart].movies.concat(movie);
    var readyData = {};
      readyData[moviesPart] = { movies: movie, categoryTitle: categoryTitle };
    this.setData(readyData);
  },
  onMoreTap: function (event) {
    var categoryTitle = event.currentTarget.dataset.category;
    wx.navigateTo({
      url: 'more_movie/moreMovie?categoryTitle=' + categoryTitle,
    })
  },
  onSearchChange: function (event) {
    var text = event.detail.value
    var searchUrl = baseUrl + "/v2/movie/search?q=" + text;
    this.getMoviesData(searchUrl, 'search', "");
    this.setData({
      searchKey:text,
      cancelIcon: true,
      movieContainer: false,
      searchResult: true
    })
  },
  closeSearch: function () {
    this.setData({
      cancelIcon: false,
      movieContainer: true,
      searchResult: false
    })
  },
  loadMore: function () {
    var category = this.data.searchKey;
    var total = this.data.searchTotal + 20;
    this.setData({
      searchTotal: total
    })
    var moreUrl = util.selectUrl(category) + "&start=" + total + "&count=20";
    this.getMoviesData(moreUrl, 'search', category);
    console.log(moreUrl);
  },
  onMovieDetail:function(event){
    var movieId = event.currentTarget.dataset.id;
    console.log(movieId);
    wx.navigateTo({
      url: 'movie_detail/movieDetail?movieId=' + movieId,
    })
  }


})