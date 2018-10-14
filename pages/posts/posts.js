var postsData =require('../../data/posts-data.js');

Page({
  data: {
    //小程序总是会读取data对象来做数据绑定,是在onload事件执行之后发生的
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    //this.data.postList = postsData.postList不能用,废弃了?
    
    //将数组放进data中,这种是万能的,在异步里也能用
    this.setData({
      postList: postsData.postList
      });
  },
  //根据id跳转到相应页面
  onPostTap(event){
    //这里的event.currentTarget.dataset.postid的postid不能写成postId,已经转换了
    var postId=event.currentTarget.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id='+postId
    })
  },
onSwiperTap(event) {
    //targer指的是当前点击的组件,而currentTarget指的是事件捕获的组件.
    //target这里指的是image,而currentTarget指的是swiper
    var postId = event.target.dataset.postid;
    wx.navigateTo({
      url: 'post-detail/post-detail?id=' + postId
    })
  }
 
})