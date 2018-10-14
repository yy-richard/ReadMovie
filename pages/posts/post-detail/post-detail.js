var postsData = require('../../../data/posts-data.js');
// 引入app
var app =getApp();
Page({
  data: {
    isPlayingMusic: false
  },
  onLoad: function(option) {
    //获取id
    var postId = option.id;
    this.setData({
      currentPostId: postId
    })
    var postDate = postsData.postList[postId];
    // console.log(postDate);
    //可能有问题,绑定数据的方法.
    // this.data.postDate = postDate;
    this.setData({
      postDate: postDate
    });

    //设置缓存功能,收藏.
    //同步
    //第一种
    //wx.setStorageSync('key', '风暴英雄')
    //第二种
    // wx.setStorageSync('key', {
    //   game: '风暴英雄',
    //   develope: "暴雪"
    // })

    //文章缓存状态
    // var postsCollected={
    //   1:"true",
    //   2:"false",
    //   3:"true",
    //   ...
    // }
    //获得文章列表的缓存状态
    var postsCollected = wx.getStorageSync('posts_collected');
    if (postsCollected) {
      //获得点击的文章的缓存状态
      var postCollected = postsCollected[postId]
      this.setData({
        collected: postCollected
      })
    } else {
      var postsCollected = {};
      postsCollected[postId] = false;
      wx.setStorageSync('posts_collected', postsCollected);
    }
    //退出当前页面,再进入时音乐还是播放状态
    if (app.globalData.g_isPlayingMusic && app.globalData.g_currentMusicPostId=== postId){
      this.setData({
        isPlayingMusic:true
      })
    }
    this.setMusicMonitor();
  },
  //音乐播放监控
  setMusicMonitor(){
    //监听音乐播放,更换音乐图标,这里需配合head-image类,音乐播放,head-image换成封面
    //"isPlayingMusic? '{{postDate.headImgSrc}}':'{{postDate.music.coverImgUrl}}'"
    //点击控制台暂停按钮,改变我们自定义的暂停图片
    var that = this;
    wx.onBackgroundAudioPlay(function () {
      that.setData({
        isPlayingMusic: true
      })
      //设置全局的播放变量为true
      app.globalData.g_isPlayingMusic =true;
      app.globalData.g_currentMusicPostId = that.data.currentPostId;
    });
    wx.onBackgroundAudioPause(function () {
      that.setData({
        isPlayingMusic: false
      })
      //设置全局的播放变量为false
      app.globalData.g_isPlayingMusic=false;
      app.globalData.g_currentMusicPostId=null;
    });
    wx.onBackgroundAudioStop(function () {
      that.setData({
        isPlayingMusic: false
      })
    });
  },
  
  //获取缓存,缓存最大10M.
  onCollectionTap(event) {
    // var game=wx.getStorageSync('key');
    //console.log(game);
    //清除指定缓存
    //wx.removeStorageSync('key')
    //清除所有缓存
    //wx.clearStorageSync()

    //this.getPostsCollectedSyc();
    //异步获取缓存
    this.getPostsCollectedAsy();
  },
  //异步获取缓存
  getPostsCollectedAsy() {
    var that = this;
    wx.getStorage({
      key: "posts_collected",
      success: function(res) {
        var postsCollected = res.data;
        var postCollected = postsCollected[that.data.currentPostId];
        //收藏变成未收藏,未收藏变收藏
        postCollected = !postCollected;
        postsCollected[that.data.currentPostId] = postCollected;
        that.showToast(postsCollected, postCollected);
      }
    })
  },
  //同步获取缓存
  getPostsCollectedSyc() {
    var that = this;
    var postsCollected = wx.getStorageSync('posts_collected');
    // console.log(this.data.currentPostId);
    var postCollected = postsCollected[that.data.currentPostId];
    //收藏变成未收藏,未收藏变收藏
    postCollected = !postCollected;
    postsCollected[that.data.currentPostId] = postCollected;
    that.showToast(postsCollected, postCollected);
  },

  //showToast界面反馈API-提示用户收藏成功或取消成功,自动消失.
  showToast(postsCollected, postCollected) {
    var that = this;
    //更新文章的是否收藏的缓存值
    wx.setStorageSync('posts_collected', postsCollected);
    //更新数据绑定变量,从而实现切换图片
    that.setData({
      collected: postCollected
    })
    //showToast界面反馈API-提示用户收藏成功或取消成功,自动消失.
    wx.showToast({
      title: postCollected ? '收藏成功' : '取消成功',
      //间隔时间
      duration: 1000,
      //图标只支持success和loading
      icon: "success"
    })

  },
  showModal(postsCollected, postCollected) {
    var that = this;
    //showModal界面反馈API,手动提示用户收藏成功或取消
    wx.showModal({
      title: '收藏',
      content: postCollected ? '收藏文章' : '取消收藏',
      showCancel: "true",
      cancelText: "取消",
      confirmText: "确认",
      confirmColor: "405f80",
      success(res) {
        if (res.confirm) {
          //更新文章的是否收藏的缓存值
          wx.setStorageSync('posts_collected', postsCollected);
          //更新数据绑定变量,从而实现切换图片
          that.setData({
            collected: postCollected
          })
        }
      }
    })
  },
  onShareTap: function(event) {
    var itemList = [
      "分享给微信好友",
      "分享到微信朋友圈",
      "分享到QQ",
      "分享到微博"
    ]
    //showActionSheet界面反馈API,接收数组展示
    wx.showActionSheet({
      itemList: itemList,
      itemColor: "#405f80",
      success: function(res) {
        //res.cancel 用户是否点击了取消按钮
        //res.tabIndex 数组元素的序号,从0开始
        wx.showModal({
          title: '用户' + itemList[res.tapIndex],
          content: '用户是否取消?' + res.cancel + '现在无法实现分享功能,什么时候能实现呢'
        })
      }
    })
  },

  //音乐播放
  onMusicTap(event) {
    var currentPostId = this.data.currentPostId;
    var postDate = postsData.postList[currentPostId];
    var isPlayingMusic = this.data.isPlayingMusic;
    if (isPlayingMusic) {
      wx.pauseBackgroundAudio();
      this.setData({
        //以键值对的形式赋值,写错会报错
        isPlayingMusic: false
      })
      //this.data.isPlayingMusic = false;
    } else {
      wx.playBackgroundAudio({
        dataUrl: postDate.music.dataUrl,
        title: postDate.music.title,
        coverImgUrl: postDate.music.coverImgUrl
      })
      this.setData({
        isPlayingMusic: true
      })
      //this.data.isPlayingMusic = true;
    }
  }


})