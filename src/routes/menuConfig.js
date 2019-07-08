export default {
  menuList: [
    {
      title: "系统总览",
      key: "/pandect/mapshow",
      type: "pandect",
      component: "MapShow",
      icon: "action-shujuzonglan",
    },
    {
      title: "项目管理",
      key: "/project",
      icon: "action-guanli1",
      children: [
        {
          title: "项目方案",
          key: "/main/scheme",
          component: "Scheme"
        },
        {
          title: "项目调查",
          key: "/main/surveyrepro",
          component: "SurveyRepro"
        },
        {
          title: "项目评估",
          key: "/main/assessrepro",
          component: "AssessRepro"
        },
        {
          title: "监测规划",
          key: "/main/monitorpro",
          component: "Monitorpro"
        },
        {
          title: "项目勘察",
          key: "/main/prospectrepro",
          component: "ProspectRepro"
        },
        {
          title: "项目设计",
          key: "/main/designrepro",
          component: "DesignRepro"
        },
        {
          title: "项目施工",
          key: "/main/construction",
          component: "Construction"
        },
        {
          title: "施工监理",
          key: "/main/supervisor",
          component: "Supervisor"
        },
        {
          title: "监测报告",
          key: "/main/monitorrepro",
          component: "MonitorRepro"
        },
        {
          title: "项目治理",
          key: "/main/treatment",
          component: "Treatment"
        },
        {
          title: "项目基金",
          key: "/main/funds",
          component: "Funds"
        },
        {
          title: "项目验收",
          key: "/main/checkaccept",
          component: "CheckAccept"
        },
        {
          title: "系统预案",
          key: "/plan",
          children: [
            {
              title: "我的预案",
              key: "/main/myplan",
              component: "MyPlan"
            },
            {
              title: "推荐预案",
              key: "/main/recommend",
              component: "Recommend"
            }
          ]
        }
      ]
    },
    {
      title: "监测数据",
      key: "/monitor",
      icon: "action-101",
      children: [
        {
          title: "点位设备",
          key: "/main/dotequip",
          component: "Dotequip"
        },
        {
          title: "阈值设置",
          key: "/main/threshold",
          component: "Threshold"
        },
        {
          title: "预警设置",
          key: "/main/warning",
          component: "Warning"
        }
      ]
    },
    {
      title: "系统管理",
      key: "/systemmanage",
      icon: "action-shezhi",
      children: [
        {
          title: "企业信息",
          key: "/main/companyinfo",
          component: "Companyinfo"
        },
        {
          title: "用户管理",
          key: "/main/userinfo",
          component: "Userinfo"
        },
        {
          title: "设备列表",
          key: "/main/equipmanage",
          component: "Equipmanage"
        },
        {
          title: "基础数据",
          key: "/main/basicdata",
          component: "Basicdata"
        },
          // {
          //     title: "ceshi",
          //     key: "/main/test",
          //     component: "Test"
          // }
      ]
    }
  ],
  other: [
    {
      title: "预案编辑",
      key: "/main/edit",
      component: "Edit"
    },
    {
      title: "查看详情",
      key: "/main/lookplan",
      component: "Lookplan"
    },
      {
          title: "查看我的预案详情",
          key: "/main/mylookplan",
          component: "MyLookplan"
      },
    {
      title: "点位详情",
      key: "/main/dotdetails*",
      component: "Dotdetails"
    },
    {
      title: "点位阈值",
      key: "/main/thresholddot",
      component: "ThresholdDot"
    },
    {
      title: "监测规划变更记录",
      key: "/main/monitorprolook",
      component: "Monitorprolook"
    },
    {
        title: "企业信息编辑",
        key: "/main/companyinfoEdit",
        component: "companyinfoEdit"
    },
      {
          title: "项目信息编辑",
          key: "/main/projectinfoEdit",
          component: "ProjectinfoEdit"
      },
  ]
};
