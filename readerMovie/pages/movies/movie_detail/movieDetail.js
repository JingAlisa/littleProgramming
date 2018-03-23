// pages/movies/movie_detail/movieDetail.js
var app=getApp();
var util=require("../../../utils/utils.js");
Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var detailUrl = app.globalData.g_doubanAPI + "/v2/movie/subject/" + options.movieId; 
    util.http(detailUrl,this.getMovieDetail);
  },
  getMovieDetail:function(data){
    var stars = util.startsArr(data.rating.stars);
    var movieStars=[];
    var directors=[];
    var movieType=[];
    for(var x in data.casts){
      movieStars.push({name:data.casts[x].name,image:data.casts[x].avatars.large});
    }
    for(var x in data.directors){
      directors.push(data.directors[x].name);
    }
    for(var x in data.genres){
      movieType.push(data.genres[x]);
    }
    console.log(directors);
    console.log(movieType);
    console.log(movieStars);
    this.setData({
      title:data.title,
      country:data.countries[0],
      year:data.year,
      like:data.collect_count,
      comment:data.comments_count,
      titleImage:data.images.large,
      originalTitle:data.original_title,
      score:data.rating.average,
      stars:stars,
      directors:directors,
      movieType: movieType,
      summary:data.summary,
      movieStars: movieStars
    })
  },
  onShareAppMessage:function(res){
    return{
      title:'转发此信息？'
    }
  }
})