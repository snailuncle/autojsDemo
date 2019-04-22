var appPackageName = 'com.aaa.bbb'
var config = {
  一般动作执行后需等待的时间: 2000,
  首页activity: appPackageName+'.main.MainActivity',
  主播详情页activity: appPackageName+'.main.MainActivity',
  粉丝列表页activity: appPackageName+'.following.ui.FollowingFollowerActivity',
  粉丝详情页activity: appPackageName+'.profile.ui.UserProfileActivity',
  首页的首页按钮属性: {
    depth: 14,
    className: 'TextView',
    text: '首页',
    id: appPackageName+':id/bz3',
    bounds: [63, 1693, 153, 1754],
  },
  首页的主播名字按钮属性: {
    depth: 22,
    className: 'TextView',
    id: appPackageName+':id/title',
    boundsInside: [10, 1000, 1000, 1500],
  },
  主播详情页的获赞按钮属性: {
    depth: 16,
    className: 'TextView',
    text: '获赞',
    boundsInside: [10, 1029, 344, 1332],
  },
  主播详情页的粉丝按钮属性: {
    depth: 16,
    className: 'TextView',
    text: '粉丝',
    boundsInside: [341, 1029, 900, 1332],
  },
  粉丝列表页的列表parentView属性: {
    depth: 8,
    className: 'android.support.v7.widget.RecyclerView',
    id: appPackageName+':id/akp',
    boundsInside: [0, 228, 1080, 1794],
  },
  粉丝详情页关注按钮属性: {
    depth: 18,
    className: 'android.widget.Button',
    id: appPackageName+':id/ahq',
    text: '关注'
  },
  粉丝详情页资料view属性: {
    depth: 17,
    boundsInside: [45, 711, 1033, 1245],
    className: 'android.widget.LinearLayout',
    id: appPackageName+':id/aip',
  },
  粉丝列表一个粉丝的bounds: [0, 625, 1080, 853],
  粉丝列表页顶部按钮bounds: [0, 72, 1080, 228],
  粉丝详情页资料id: appPackageName+':id/aip',
  要关注的粉丝性别: '男',
  boyColor: '#08a2b5',
  girlColor: '#d94965',
  粉丝列表页关注男粉丝的限制时长: 60 * 2 * 1000,

}
module.exports = config
