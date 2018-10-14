Page({
  onTap:function(event){
    //父子级跳转,子级只能跳转5级
     wx.navigateTo({
       url: '../posts/posts'
    })
   // 同级页面跳转
    // wx.redirectTo({
    //   url: '../posts/posts',
    // })
  }
})