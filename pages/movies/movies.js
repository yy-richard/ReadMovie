var inTheatersMovies = require('../../data/movie-in-theaters-data.js');
var comingSoonMovies = require('../../data/movie-coming-soon-data.js');
var top250Movies = require('../../data/movie-top250-data.js');
var util = require('../../utils/util.js');

//var app=getApp();
Page({
  data:{
    inTheaters:{},
    comingSoon:{},
    top250:{}
  },
onLoad(event){
  this.setData({
    inTheatersMovie: inTheatersMovies.inTheatersList
  });
  this.setData({
    comingSoonMovie: comingSoonMovies.comingSoonList
  });
  this.setData({
    top250Movie: top250Movies.top250List
  });
  //豆瓣api拒绝小程序的访问权限(其他可以),这里是用本地的数据(也是豆瓣的)
  //一行显示3条数据
  // var inTheatersUrl = app.globalData.doubanBase +"/v2/movie/in_theaters"+"?start=0 &             count=3";
  // var comingSoonUrl = app.globalData.doubanBase +"v2/movie/coming_soon""?start=0 &             count=3";
  // var top250 = app.globalData.doubanBase +"v2/movie/top250""?start=0 &count=3";
   //this.getMovieListData(inTheatersUrl);
  // this.getMovieListData(comingSoonUrl); 
  // this.getMovieListData(top250); 
  //var that=this;
    var movieDouban = this.data.inTheatersMovie;
    var subjects = movieDouban[0].subjects;
  //this.processDoubanData(movieDouban);
  // that.processDoubanData(this.data.comingSoonMovie);
  // that.processDoubanData(this.data.top250Movie);
  var movies = [];
  for (var idx in subjects) {
    var subject = subjects[idx];
    var title = subject.title;
    if (title.length >= 6) {
      title = title.substring(0, 6) + "...";
    }
    var temp = {
      stars: util.convertToStarsArray(subject.rating.stars),
      title: title,
      average: subject.rating.average,
      coverageUrl: subject.images.large,
      movieId: subject.id
    }
    movies.push(temp)
  }
  this.setData({
    movies: movies
  })

},
//获得电影信息
  // getMovieListData: function (url) {
  //   wx.request({
  //     url: url,
  //     data: {},
  //     //设置请求的header
  //     header: {
  //       "Content-Type": ""
  //     },
  //     method: 'get',
  //     success: function (res) {
  //       console.log(res)
  //     },
  //     fail: function (error) {
  //       console.log(error)
  //     }
  //   })
  // }
  //将返回的数据格式化,得到我们想要的数据
  
  // processDoubanData(movieDouban){
  //   var movies=[];
  //   for (var idx in movieDouban.subjects){
  //     var subject = movieDouban.subjects[idx];
  //     var title =subject.title;
  //     console.log(title);
  //     if(title.length>=6){
  //       title=title.substring(0,6)+"...";
  //     }
  //     var temp={
  //       title:title,
  //       average:subject.rating.average,
  //       coverageUrl:subject.images.large,
  //       movieId:subject.id
  //     }
  //     movies.push(temp)
  //   }
  //   this.setData({
  //     movies:movies
  //   })
    
  // }
})