export default {
  menuList : [
    {
        title: '首页',
        key: '/home',
        component: "Datamanage",
    },
    {
        title: '大数据',
        key: '/pandect/datashow',
        type:'pandect',
        children: [
            {
                title: '数据管理',
                key: '/pandect/datashow/datamanage',
                type:'pandect',
                component: "Datamanage",
            },
            {
                title: '项目管理',
                key: '/pandect/datashow/projectmanage',
                type:'pandect',
                component: "Projectmanage",
            }
        ]
    },
    {
        title: '数据总览',
        key: '/overview',
        children: [
            {
                title: 'InSAR遥感影像',
                key: '/main/insar',
                component: "Insar",
            },
            {
                title: '地质灾害数据',
                key: '/main/geology',
                component: "Geology",
            },
            {
              title: '含水层监测数据',
              key: '/main/aquifer',
              component: "Aquifer",
            },
            {
              title: '地形地貌检测数据',
              key: '/main/landform',
              component: "Landform",
            },
            {
              title: '水土污染监测数据',
              key: '/main/pollution',
              component: "Pollution",
            },
            {
              title: '土地损毁与复垦监测数据',
              key: '/main/soil',
              component: "Soil",
            }
        ]
    },
    // {
    // 	title: '预警系统',
    //     key: '/main/soil',
    // },
    {
        title: '数据管理',
        key: '/manage',
        children: [
            {
              title: 'inSAR遥感数据',
              key: '/main/insarmanage',
              component: "Insarmanage",
            },
            {
              title: '含水层数据',
              key: '/main/aquifermanage',
              component: "Aquifermanage",
            },
            {
              title: '地形地貌高分遥感数据',
              key: '/main/landformmanage',
              component: "Landformmanage",
            },
            {
              title: '水土污染监测数据',
              key: '/main/pollutionmanage',
              component: "Pollutionmanage",
            },
            {
              title: '土地损毁与复垦数据',
              key: '/main/soilmanage',
              component: "Soilmanage",
            },   
        ]
    },
    {
        title: '设备管理',
        key: '/equipment',
        children: [
          {
            title: '我的设备',
            key: '/main/monitor',
            component: "Monitor",
          },
          {
          	title: 'claa设备',
          	key: '/main/claamonitor',
            component: "ClaaMonitor",
          },{
          	title: '视频监控',
          	key: '/main/evideo',
            component: "Evideo",
          }]
    },
    {
        title: '系统预案',
        key: '/plan',
        children: [
          {
            title: '我的预案',
            key: '/main/myplan',
            component: "MyPlan",
          },
          {
            title: '推荐预案',
            key: '/main/recommend',
            component: "Recommend",
          }]
    },
      {
          title: '系统管理',
          key: '/systemmanage',
          children: [
              {
                  title: '企业信息',
                  key: '/main/companyinfo',
                  component: "Companyinfo",
              },
              {
                  title: '用户管理',
                  key: '/main/userinfo',
                  component: "Userinfo",
              }]
      },
  ],
    other:[
        {
        title: 'inSAR详细数据',
        key: '/main/geology/detaildata',
        component: "Detaildata",
        },
        {
            title: '检测报告详细数据',
            key: '/main/geology/detaildata',
            component: "Detaildata",
        },
        {
            title: '预案详情',
            key: '/main/plan/detailplan',
            component: "Detailplan",
        },
        {
            title: '土地损毁复垦新增',
            key: '/main/overview/soilbreathe',
            component: "Soilbreathe",
        },
        {
            title: '富文本编辑',
            key: '/main/Edit',
            component: "Edit",
        },
        {
            title: '地形地貌监测数据预览',
            key: '/main/overview/preview',
            component: "Preview",
        },
    ]
}