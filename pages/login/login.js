Page({
  data: {
    // 页面的初始数据
  },

  handleWechatLogin() {
    wx.login({
      success: (res) => {
        if (res.code) {
          // 发送 res.code 到后台换取 openId, sessionKey, unionId
          console.log('微信登录成功，code:', res.code);
          wx.switchTab({
            url: '/pages/index/index'
          });
        } else {
          console.log('登录失败！' + res.errMsg);
        }
      }
    });
  },

  handlePhoneLogin() {
    wx.showModal({
      title: '提示',
      content: '是否使用手机号登录？',
      success: (res) => {
        if (res.confirm) {
          wx.getUserProfile({
            desc: '用于完善用户资料',
            success: (res) => {
              console.log('获取用户信息成功', res);
              wx.switchTab({
                url: '/pages/index/index'
              });
            },
            fail: (err) => {
              console.log('获取用户信息失败', err);
            }
          });
        }
      }
    });
  },

  navigateToAgreement() {
    // 跳转到用户协议页面
    wx.showToast({
      title: '用户协议',
      icon: 'none'
    });
  },

  navigateToPrivacy() {
    // 跳转到隐私政策页面
    wx.showToast({
      title: '隐私政策',
      icon: 'none'
    });
  }
})