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
        key: 'main/overview',
        children: [
            // {
            //     title: '封装',
            //     key: '/main/cs/common',
            // },
            {
                title: '地质灾害数据',
                key: '/main/geology',
                children: [
                {
                	title: 'inSAR检测数据',
                	key: '/main/geology/insar',
                  component: "Insar",
                },{
                	title: '地裂缝数据',
                	key: '/main/geology/fissure',
                  component: "Fissure",

                }// },{
                // 	title: '沉降数据',
                // 	key: '/main/geology/sediment',
                //   component: "Sediment",
                // },{
                // 	title: '位移数据',
                // 	key: '/main/geology/displacement',
                //   component: "Displacement",
                // },{
                // 	title: '形变数据',
                // 	key: '/main/geology/shapechange',
                //   component: "Shapechange",
                // },{
                // 	title: '雨量计',
                // 	key: '/main/geology/rainfall',
                //   component: "Rainfall",
                // },{
                // 	title: '土压力计',
                // 	key: '/main/geology/soilpressure',
                //   component: "Soilpressure",
                // }
                ]
            },
            // {
            //   title: '含水层监测数据',
            //   key: '/main/aquifer',
            //   children: [
            //   {
            //   	title: '水位数据',
            //   	key: '/main/aquifer/waterlevel',
            //   },{
            //   	title: '水压数据',
            //   	key: '/main/aquifer/pressure',
            //   },{
            //   	title: '水质简分析',
            //   	key: '/main/aquifer/qualityeasy',
            //   },{
            //   	title: '水质全分析',
            //   	key: '/main/aquifer/qualityentirety',
            //   }]
            // },
            // {
            //   title: '地形地貌检测数据',
            //   key: '/main/landform',
            // },
            // {
            //   title: '水土污染监测数据',
            //   key: '/main/pollution',
            //   children: [
            //   {
            //   	title: '水体监测数据',
            //   	key: '/main/pollution/waterdetect',
            //   },{
            //   	title: '土壤监测数据',
            //   	key: '/main/pollution/soildetect',
            //   }]
            // },
            // {
            //   title: '土地损毁与复垦监测数据',
            //   key: '/main/soil',
            //   children: [
            //   {
            //   	title: '高分遥感数据',
            //   	key: '/main/soil/highmark',
            //   },{
            //   	title: '土地损毁数据',
            //   	key: '/main/soil/soilmar',
            //   },{
            //   	title: '土地复垦数据',
            //   	key: '/main/soil/reclamation',
            //   }]
            // },
            
        ]
    },
    // {
    // 	title: '预警系统',
    //   key: '/main/soil',
    // },
    // {
    //     title: '数据管理',
    //     key: '/manage',
    //     children: [
    //         // {
    //         //     title: '封装',
    //         //     key: '/main/cs/common',
    //         // },
    //         {
    //             title: '地质灾害数据管理',
    //             key: '/main/geologymanage',
    //             children: [
    //             {
    //             	title: 'inSAR检测数据',
    //             	key: '/main/geologymanage/insar',
    //             },{
    //             	title: '地裂缝数据',
    //             	key: '/main/geologymanage/fissure',
    //             },{
    //             	title: '沉降数据',
    //             	key: '/main/geologymanage/sediment',
    //             },{
    //             	title: '位移数据',
    //             	key: '/main/geologymanage/displacement',
    //             },{
    //             	title: '形变数据',
    //             	key: '/main/geologymanage/shapechange',
    //             },{
    //             	title: '雨量计',
    //             	key: '/main/geologymanage/rainfall',
    //             },{
    //             	title: '土压力计',
    //             	key: '/main/geologymanage/soilpressure',
    //             }]
    //         },
    //         {
    //           title: '含水层监测数据',
    //           key: '/main/aquifermanage',
    //           children: [
    //           {
    //           	title: '水位数据',
    //           	key: '/main/aquifermanage/waterlevel',
    //           },{
    //           	title: '水压数据',
    //           	key: '/main/aquifermanage/pressure',
    //           },{
    //           	title: '在线检测',
    //           	key: '/main/aquifermanage/onlinetest',
    //           },{
    //           	title: '水质简分析',
    //           	key: '/main/aquifermanage/qualityeasy',
    //           },{
    //           	title: '水质全分析',
    //           	key: '/main/aquifermanage/qualityentirety',
    //           }]
    //         },
    //         {
    //           title: '地形地貌检测数据',
    //           key: '/main/landformmanage',
    //           children: [
    //           {
    //           	title: '高分遥感数据',
    //           	key: '/main/remote/high',
    //           }]
    //         },
    //         {
    //           title: '水土污染监测数据',
    //           key: '/main/pollutionmanage',
    //           children: [
    //           {
    //           	title: '在线水体数据',
    //           	key: '/main/pollutionmanage/onlinewater',
    //           },
    //           {
    //           	title: '水体数据',
    //           	key: '/main/pollutionmanage/water',
    //           },
    //           {
    //           	title: '在线土壤数据',
    //           	key: '/main/pollutionmanage/onlinesoil',
    //           },
    //           {
    //           	title: '土壤数据',
    //           	key: '/main/pollutionmanage/soil',
    //           }]
    //         },
    //         {
    //           title: '土地损毁与复垦监测数据管理',
    //           key: '/main/soilmanage',
    //           children: [
    //           {
    //           	title: '高分遥感数据',
    //           	key: '/main/soilmanage/highmark',
    //           },{
    //           	title: '土地损毁数据',
    //           	key: '/main/soilmanage/soilmar',
    //           },{
    //           	title: '土地复垦数据',
    //           	key: '/main/soilmanage/reclamation',
    //           }]
    //         },
            
    //     ]
    // },
    // {
    // 	title: '设备管理',
    //   key: '/equipment',
    //   children: [
    //   {
    //   	title: '北斗CNSS监测仪',
    //   	key: '/main/equipment/cnss',
    //   },{
    //   	title: '裂缝计',
    //   	key: '/main/equipment/fissure',
    //   },{
    //   	title: '水位水压监测仪',
    //   	key: '/main/equipment/pressure',
    //   },{
    //   	title: '水质监测仪',
    //   	key: '/main/equipment/quality',
    //   },{
    //   	title: '雨量监测仪',
    //   	key: '/main/equipment/rainfall',
    //   },{
    //   	title: '土压力监测仪',
    //   	key: '/main/equipment/soilpressure',
    //   },{
    //   	title: '视频监控',
    //   	key: '/main/equipment/video',
    //   }]

    // },
  ]
}