var app = getApp();
var baseUrl = app.globalData.g_doubanAPI;
function getStars(str) {
  var num = str.toString().substring(0, 1);
  var arr = [];
  for (var i = 1; i <= 5; i++) {
    if (i < num) {
      arr.push('1');
    } else {
      arr.push('0');
    }
  }
  return arr;
}
function http(url, callback) {
  wx.request({
    url: url,
    header: {
      'content-type': 'application/xml'
    },
    success: function (res) {
      callback(res.data);
    }
  });
}
function selectUrl(category) {
  var resultUrl = "";
  switch (category) {
    case "正在热映":
      resultUrl = baseUrl + "/v2/movie/in_theaters";
      break;
    case "即将上映":
      resultUrl = baseUrl + "/v2/movie/coming_soon";
      break;
    case "Top250":
      resultUrl = baseUrl + "/v2/movie/top250";
      break;
    default:
      resultUrl = baseUrl + "/v2/movie/search?q=" + category;
      break;
  }
  return resultUrl;
}
module.exports = {
  startsArr: getStars,
  http: http,
  selectUrl: selectUrl
}