export default {
  menuList : [
    {
        title: '首页',
        key: '/home',
        component: "Datamanage",
    },
    {
        title: '大数据',
        key: '/datashow',
        type:'pandect',
        children: [
            {
                title: '数据管理',
                key: '/pandect/datamanage',
                type:'pandect',
                component: "Datamanage",
            },
            {
                title: '项目管理',
                key: '/pandect/projectmanage',
                type:'pandect',
                component: "Projectmanage",
            },
            {
                title: '地图',
                key: '/pandect/mapshow',
                type:'pandect',
                component: "MapShow",
            }
        ]
    },
    // {
    //     title: '数据总览',
    //     key: '/overview',
    //     children: [
    //         {
    //             title: 'InSAR遥感影像',
    //             key: '/main/insar',
    //             component: "Insar",
    //         },
    //         {
    //             title: '地质灾害数据',
    //             key: '/main/geology',
    //             component: "Geology",
    //         },
    //         {
    //           title: '含水层监测数据',
    //           key: '/main/aquifer',
    //           component: "Aquifer",
    //         },
    //         {
    //           title: '地形地貌检测数据',
    //           key: '/main/landform',
    //           component: "Landform",
    //         },
    //         {
    //           title: '水土污染监测数据',
    //           key: '/main/pollution',
    //           component: "Pollution",
    //         },
    //         {
    //           title: '土地损毁与复垦监测数据',
    //           key: '/main/soil',
    //           component: "Soil",
    //         }
    //     ]
    // },
    // {
    // 	title: '预警系统',
    //     key: '/main/soil',
    // },
    // {
    //     title: '数据管理',
    //     key: '/manage',
    //     children: [
    //         {
    //           title: 'inSAR遥感数据',
    //           key: '/main/insarmanage',
    //           component: "Insarmanage",
    //         },
    //         {
    //           title: '含水层数据',
    //           key: '/main/aquifermanage',
    //           component: "Aquifermanage",
    //         },
    //         {
    //           title: '地形地貌高分遥感数据',
    //           key: '/main/landformmanage',
    //           component: "Landformmanage",
    //         },
    //         {
    //           title: '水土污染监测数据',
    //           key: '/main/pollutionmanage',
    //           component: "Pollutionmanage",
    //         },
    //         {
    //           title: '土地损毁与复垦数据',
    //           key: '/main/soilmanage',
    //           component: "Soilmanage",
    //         },   
    //     ]
    // },
    // {
    //     title: '设备管理',
    //     key: '/equipment',
    //     children: [
    //       {
    //         title: '我的设备',
    //         key: '/main/monitor',
    //         component: "Monitor",
    //       },
    //       {
    //       	title: 'claa设备',
    //       	key: '/main/claamonitor',
    //         component: "ClaaMonitor",
    //       },{
    //       	title: '视频监控',
    //       	key: '/main/evideo',
    //         component: "Evideo",
    //       }]
    // },
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
        title: '项目管理',
        key: '/project',
        children: [
            // {
            //     title: '添加项目',
            //     key: '/main/addproject',
            //     component: "Addproject",
            // },
            {
                title: '项目方案',
                key: '/main/scheme',
                component: "Scheme",
            },
            {
                title: '监测规划',
                key: '/main/monitorpro',
                component: "Monitorpro",
            },
            {
                title: '项目基金',
                key: '/main/funds',
                component: "Funds",
            },
            {
                title: '评估报告',
                key: '/main/assessrepro',
                component: "AssessRepro",
            },
            {
                title: '调查报告',
                key: '/main/surveyrepro',
                component: "SurveyRepro",
            },
            {
                title: '勘察报告',
                key: '/main/prospectrepro',
                component: "ProspectRepro",
            },
            {
                title: '设计报告',
                key: '/main/designrepro',
                component: "DesignRepro",
            },
            {
                title: '项目施工',
                key: '/main/construction',
                component: "Construction",
            },
            {
                title: '施工监理',
                key: '/main/supervisor',
                component: "Supervisor",
            },
            {
                title: '监测报告',
                key: '/main/monitorrepro',
                component: "MonitorRepro",
            },
            {
                title: '治理方案',
                key: '/main/treatment',
                component: "Treatment",
            },
            {
                title: '项目验收',
                key: '/main/checkaccept',
                component: "CheckAccept",
            },
            ]
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
            key: '/main/edit',
            component: "Edit",
        },
        {
            title: '富文本编辑',
            key: '/main/lookplan',
            component: "Lookplan",
        },
        {
            title: '地形地貌监测数据预览',
            key: '/main/overview/preview',
            component: "Preview",
        },
    ]
}