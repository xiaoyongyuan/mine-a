const menuList = [
    {
        title: '首页',
        key: '/home'
    },
    {
        title: '大数据',
        key: '/datashow',
        children: [
            {
                title: '数据管理',
                key: '/datashow/datamanage',
            },
            {
                title: '项目管理',
                key: '/datashow/projectmanage',
            }
        ]
    },
];
export default menuList;