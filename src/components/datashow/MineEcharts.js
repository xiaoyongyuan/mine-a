import React, { Component } from 'react';
import ReactEcharts from 'echarts-for-react';
class mineEcharts extends Component {
    constructor(props){
        super(props);
        this.state={
            type:"mine",
            option:{}
        };
    }
    componentWillMount(){
        this.setState({
            type:this.props.type,
        });
    }
    componentDidMount(){
        this[this.state.type]()
    }
    //矿山整体大数据
    mine=()=>{
         let option={
             tooltip : {
                 trigger: 'item',
                 formatter: "{a} <br/>{b} : {c} ({d}%)"
             },
             color:["#2964FA","#FFB800","#b93fff","#4DF6DC","#FE7401","#00ccee"],
             legend:{
                 orient:"vertical",
                 left:"left",
                 top:"20%",
                 data:["水土污染","预警次数","土地损毁","土地复垦","基金缴纳","基金提取"],
                 textStyle: {
                     color:"#fff"
                 }
             },
             series : [
                 {
                     name: '水土污染',
                     type: 'pie',
                     radius : ['25%', '30%'],
                     label: {
                         show:false
                     },
                     labelLine:{
                         show:false
                     },
                     data:[
                         {
                             value:'967',
                             name:'水土污染',
                             itemStyle: {
                                 emphasis: {
                                     shadowBlur: 10,
                                     shadowOffsetX: 0,
                                     shadowColor: 'rgba(0, 0, 0, 0.5)',
                                     normal: {
                                         color: '#2964FA'
                                     }
                                 },
                                 label: {
                                     show:false
                                 },
                                 labelLine:{
                                     show:false
                                 }
                             },
                         },
                         {
                             value:'2800',
                             itemStyle: {
                                 normal: {
                                     color: 'transparent'
                                 }
                             }
                         }
                     ]
                 },  {
                     name: '预警次数',
                     type: 'pie',
                     radius : ['35%', '40%'],
                     data:[
                         {
                             value:'825',
                             name:'预警次数',
                             itemStyle: {
                                 emphasis: {
                                     shadowBlur: 10,
                                     shadowOffsetX: 0,
                                     shadowColor: 'rgba(0, 0, 0, 0.5)',
                                     normal: {
                                         color: '#dc1439'
                                     }
                                 }
                             },
                             label: {
                                 show:false
                             },
                             labelLine:{
                                 show:false
                             }
                         },
                         {
                             value:'500',
                             itemStyle: {
                                 normal: {
                                     color: 'transparent'
                                 }
                             }
                         }
                     ]

                 },  {
                     name: '土地损毁',
                     type: 'pie',
                     radius : ['45%', '50%'],
                     data:[
                         {
                             value:'1078',
                             name:'土地损毁',
                             itemStyle: {
                                 emphasis: {
                                     shadowBlur: 10,
                                     shadowOffsetX: 0,
                                     shadowColor: 'rgba(0, 0, 0, 0.5)',
                                     normal: {
                                         color: '#dc1439'
                                     }
                                 }
                             },
                             label: {
                                 show:false
                             },
                             labelLine:{
                                 show:false
                             }
                         },
                         {
                             value:'800',
                             itemStyle: {
                                 normal: {
                                     color: 'transparent'
                                 }
                             }
                         }

                     ]
                 },  {
                     name: '土地复垦',
                     type: 'pie',
                     radius : ['55%', '60%'],
                     data:[
                         {
                             value:'981',
                             name:'土地复垦',
                             itemStyle: {
                                 emphasis: {
                                     shadowBlur: 10,
                                     shadowOffsetX: 0,
                                     shadowColor: 'rgba(0, 0, 0, 0.5)',
                                     normal: {
                                         color: '#dc1439'
                                     }
                                 }
                             },
                             label: {
                                 show:false
                             },
                             labelLine:{
                                 show:false
                             }
                         },
                         {
                             value:'900',
                             itemStyle: {
                                 normal: {
                                     color: 'transparent'
                                 }
                             }
                         }
                     ]
                 },  {
                     name: '基金缴纳',
                     type: 'pie',
                     radius : ['65%', '70%'],
                     data:[
                         {
                             value:'877',
                             name:'基金缴纳',
                             itemStyle: {
                                 emphasis: {
                                     shadowBlur: 10,
                                     shadowOffsetX: 0,
                                     shadowColor: 'rgba(0, 0, 0, 0.5)',
                                     normal: {
                                         color: '#dc1439'
                                     }
                                 },
                             },
                             label: {
                                 show:false
                             },
                             labelLine:{
                                 show:false
                             }
                         },
                         {
                             value:'500',
                             itemStyle: {
                                 normal: {
                                     color: 'transparent'
                                 }
                             }
                         }
                     ]
                 },  {
                     name: '基金提取',
                     type: 'pie',
                     radius : ['75%', '80%'],
                     data:[
                         // {value:939, name:'地理'}
                         {
                             value:'439',
                             name:'基金提取',
                             itemStyle: {
                                 emphasis: {
                                     shadowBlur: 10,
                                     shadowOffsetX: 0,
                                     shadowColor: 'rgba(0, 0, 0, 0.5)',
                                     normal: {
                                         color: '#dc1439'
                                     }
                                 }
                             },
                             label: {
                                 show:false
                             },
                             labelLine:{
                                 show:false
                             }
                         },
                         {
                             value:'200',
                             itemStyle: {
                                 normal: {
                                     color: 'transparent'
                                 }
                             }
                         }
                     ]
                 },
             ]
        };
         this.setState({option})
    };
    //地质灾害数据
    earth=()=>{
        let option={
            color: ['#fdda29'],
            tooltip : {
                trigger: 'axis',
                axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                    type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '5%',
                containLabel: true
            },
            xAxis : [{
                    type : 'category',
                    data : ['塌陷', '地裂缝', '位移', '沉降', '滑坡', '形变'],
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    }
            }],
            yAxis : [{
                    name:"设备个数",
                    type : 'value',
                    axisLine: {
                        lineStyle: {
                            color: '#fff'
                        }
                    },
                    splitLine: {
                        show: false
                    },
                }],
            series : [
                {
                    name:'直接访问',
                    type:'bar',
                    barWidth: '28%',
                    data:[10, 22, 20, 24, 30, 15],
                }
            ]
        };
        this.setState({option})
    };
    //地形地貌数据总览
    terrain=()=>{
        let option={
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            color:["#22db5f","#00c6ff"],
            series : [
                {
                    type: 'pie',
                    radius : '55%',
                    center: ['50%', '60%'],
                    data:[
                        {value:335, name:'项目评估',selected:true},
                        {value:210, name:'项目勘察'},
                    ],
                    label: {
                        color: "#fff",
                    },
                    labelLine:{
                        lineStyle:{
                            color: "#fff",
                        }
                    },
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]
        };
        this.setState({option})
    };
    //含水层数据
    waterLayer=()=>{
        var dataBJ = [
            [1,55,9,56,0.46,18,6,"良"],
            [2,25,11,21,0.65,34,9,"优"],
            [3,56,7,63,0.3,14,5,"良"],
            [4,33,7,29,0.33,16,6,"优"],
            [5,42,24,44,0.76,40,16,"优"],
            [6,82,58,90,1.77,68,33,"良"],
            [7,74,49,77,1.46,48,27,"良"],
            [8,78,55,80,1.29,59,29,"良"],
            [9,267,216,280,4.8,108,64,"重度污染"],
            [10,185,127,216,2.52,61,27,"中度污染"],
            [11,39,19,38,0.57,31,15,"优"],
            [12,41,11,40,0.43,21,7,"优"],
            [13,64,38,74,1.04,46,22,"良"],
            [14,108,79,120,1.7,75,41,"轻度污染"],
            [15,108,63,116,1.48,44,26,"轻度污染"],
            [16,33,6,29,0.34,13,5,"优"],
            [17,94,66,110,1.54,62,31,"良"],
            [18,186,142,192,3.88,93,79,"中度污染"],
            [19,57,31,54,0.96,32,14,"良"],
            [20,22,8,17,0.48,23,10,"优"],
            [21,39,15,36,0.61,29,13,"优"],
            [22,94,69,114,2.08,73,39,"良"],
            [23,99,73,110,2.43,76,48,"良"],
            [24,31,12,30,0.5,32,16,"优"],
            [25,42,27,43,1,53,22,"优"],
            [26,154,117,157,3.05,92,58,"中度污染"],
            [27,234,185,230,4.09,123,69,"重度污染"],
            [28,160,120,186,2.77,91,50,"中度污染"],
            [29,134,96,165,2.76,83,41,"轻度污染"],
            [30,52,24,60,1.03,50,21,"良"],
            [31,46,5,49,0.28,10,6,"优"]
        ];

        var dataGZ = [
            [1,26,37,27,1.163,27,13,"优"],
            [2,85,62,71,1.195,60,8,"良"],
            [3,78,38,74,1.363,37,7,"良"],
            [4,21,21,36,0.634,40,9,"优"],
            [5,41,42,46,0.915,81,13,"优"],
            [6,56,52,69,1.067,92,16,"良"],
            [7,64,30,28,0.924,51,2,"良"],
            [8,55,48,74,1.236,75,26,"良"],
            [9,76,85,113,1.237,114,27,"良"],
            [10,91,81,104,1.041,56,40,"良"],
            [11,84,39,60,0.964,25,11,"良"],
            [12,64,51,101,0.862,58,23,"良"],
            [13,70,69,120,1.198,65,36,"良"],
            [14,77,105,178,2.549,64,16,"良"],
            [15,109,68,87,0.996,74,29,"轻度污染"],
            [16,73,68,97,0.905,51,34,"良"],
            [17,54,27,47,0.592,53,12,"良"],
            [18,51,61,97,0.811,65,19,"良"],
            [19,91,71,121,1.374,43,18,"良"],
            [20,73,102,182,2.787,44,19,"良"],
            [21,73,50,76,0.717,31,20,"良"],
            [22,84,94,140,2.238,68,18,"良"],
            [23,93,77,104,1.165,53,7,"良"],
            [24,99,130,227,3.97,55,15,"良"],
            [25,146,84,139,1.094,40,17,"轻度污染"],
            [26,113,108,137,1.481,48,15,"轻度污染"],
            [27,81,48,62,1.619,26,3,"良"],
            [28,56,48,68,1.336,37,9,"良"],
            [29,82,92,174,3.29,0,13,"良"],
            [30,106,116,188,3.628,101,16,"轻度污染"],
            [31,118,50,0,1.383,76,11,"轻度污染"]
        ];

        var dataSH = [
            [1,91,45,125,0.82,34,23,"良"],
            [2,65,27,78,0.86,45,29,"良"],
            [3,83,60,84,1.09,73,27,"良"],
            [4,109,81,121,1.28,68,51,"轻度污染"],
            [5,106,77,114,1.07,55,51,"轻度污染"],
            [6,109,81,121,1.28,68,51,"轻度污染"],
            [7,106,77,114,1.07,55,51,"轻度污染"],
            [8,89,65,78,0.86,51,26,"良"],
            [9,53,33,47,0.64,50,17,"良"],
            [10,80,55,80,1.01,75,24,"良"],
            [11,117,81,124,1.03,45,24,"轻度污染"],
            [12,99,71,142,1.1,62,42,"良"],
            [13,95,69,130,1.28,74,50,"良"],
            [14,116,87,131,1.47,84,40,"轻度污染"],
            [15,108,80,121,1.3,85,37,"轻度污染"],
            [16,134,83,167,1.16,57,43,"轻度污染"],
            [17,79,43,107,1.05,59,37,"良"],
            [18,71,46,89,0.86,64,25,"良"],
            [19,97,71,113,1.17,88,31,"良"],
            [20,84,57,91,0.85,55,31,"良"],
            [21,87,63,101,0.9,56,41,"良"],
            [22,104,77,119,1.09,73,48,"轻度污染"],
            [23,87,62,100,1,72,28,"良"],
            [24,168,128,172,1.49,97,56,"中度污染"],
            [25,65,45,51,0.74,39,17,"良"],
            [26,39,24,38,0.61,47,17,"优"],
            [27,39,24,39,0.59,50,19,"优"],
            [28,93,68,96,1.05,79,29,"良"],
            [29,188,143,197,1.66,99,51,"中度污染"],
            [30,174,131,174,1.55,108,50,"中度污染"],
            [31,187,143,201,1.39,89,53,"中度污染"]
        ];

        var schema = [
            {name: 'date', index: 0, text: '日'},
            {name: 'AQIindex', index: 1, text: 'AQI指数'},
            {name: 'PM25', index: 2, text: 'PM2.5'},
            {name: 'PM10', index: 3, text: 'PM10'},
            {name: 'CO', index: 4, text: '一氧化碳（CO）'},
            {name: 'NO2', index: 5, text: '二氧化氮（NO2）'},
            {name: 'SO2', index: 6, text: '二氧化硫（SO2）'}
        ];


        var itemStyle = {
            normal: {
                opacity: 0.8,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        };

        let option={
            color: [
                '#dd4444', '#fec42c', '#80F1BE'
            ],
            legend: {
                show:false,
                y: 'top',
                data: ['北京', '上海', '广州'],
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                }
            },
            grid:{
                top:"8%",
                right:"15%",
                bottom:"15%"
            },
            tooltip: {
                padding: 10,
                backgroundColor: '#222',
                borderColor: '#777',
                borderWidth: 1,
                formatter: function (obj) {
                    var value = obj.value;
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                        + obj.seriesName + ' ' + value[0] + '日：'
                        + value[7]
                        + '</div>'
                        + schema[1].text + '：' + value[1] + '<br>'
                        + schema[2].text + '：' + value[2] + '<br>'
                        + schema[3].text + '：' + value[3] + '<br>'
                        + schema[4].text + '：' + value[4] + '<br>'
                        + schema[5].text + '：' + value[5] + '<br>'
                        + schema[6].text + '：' + value[6] + '<br>';
                }
            },
            xAxis: {
                type: 'value',
                name: '日期',
                nameGap: 16,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14
                },
                max: 31,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                }
            },
            yAxis: {
                type: 'value',
                nameLocation: 'end',
                nameGap: 20,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 16
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                },
                splitLine: {
                    show: false
                }
            },
            series: [
                {
                    name: '北京',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: dataBJ
                },
                {
                    name: '上海',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: dataSH
                },
                {
                    name: '广州',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: dataGZ
                }
            ]
        };
        this.setState({option})
    };
    waterLayer1=()=>{
        var dataBJ = [
            [1,55,9,56,0.46,18,6,"良"],
            [2,25,11,21,0.65,34,9,"优"],
            [3,56,7,63,0.3,14,5,"良"],
            [4,33,7,29,0.33,16,6,"优"],
            [5,42,24,44,0.76,40,16,"优"],
            [6,82,58,90,1.77,68,33,"良"],
            [7,74,49,77,1.46,48,27,"良"],
            [8,78,55,80,1.29,59,29,"良"],
            [9,267,216,280,4.8,108,64,"重度污染"],
            [10,185,127,216,2.52,61,27,"中度污染"],
            [11,39,19,38,0.57,31,15,"优"],
            [12,41,11,40,0.43,21,7,"优"],
            [13,64,38,74,1.04,46,22,"良"],
            [14,108,79,120,1.7,75,41,"轻度污染"],
            [15,108,63,116,1.48,44,26,"轻度污染"],
            [16,33,6,29,0.34,13,5,"优"],
            [17,94,66,110,1.54,62,31,"良"],
            [18,186,142,192,3.88,93,79,"中度污染"],
            [19,57,31,54,0.96,32,14,"良"],
            [20,22,8,17,0.48,23,10,"优"],
            [21,39,15,36,0.61,29,13,"优"],
            [22,94,69,114,2.08,73,39,"良"],
            [23,99,73,110,2.43,76,48,"良"],
            [24,31,12,30,0.5,32,16,"优"],
            [25,42,27,43,1,53,22,"优"],
            [26,154,117,157,3.05,92,58,"中度污染"],
            [27,234,185,230,4.09,123,69,"重度污染"],
            [28,160,120,186,2.77,91,50,"中度污染"],
            [29,134,96,165,2.76,83,41,"轻度污染"],
            [30,52,24,60,1.03,50,21,"良"],
            [31,46,5,49,0.28,10,6,"优"]
        ];

        var dataGZ = [
            [1,26,37,27,1.163,27,13,"优"],
            [2,85,62,71,1.195,60,8,"良"],
            [3,78,38,74,1.363,37,7,"良"],
            [4,21,21,36,0.634,40,9,"优"],
            [5,41,42,46,0.915,81,13,"优"],
            [6,56,52,69,1.067,92,16,"良"],
            [7,64,30,28,0.924,51,2,"良"],
            [8,55,48,74,1.236,75,26,"良"],
            [9,76,85,113,1.237,114,27,"良"],
            [10,91,81,104,1.041,56,40,"良"],
            [11,84,39,60,0.964,25,11,"良"],
            [12,64,51,101,0.862,58,23,"良"],
            [13,70,69,120,1.198,65,36,"良"],
            [14,77,105,178,2.549,64,16,"良"],
            [15,109,68,87,0.996,74,29,"轻度污染"],
            [16,73,68,97,0.905,51,34,"良"],
            [17,54,27,47,0.592,53,12,"良"],
            [18,51,61,97,0.811,65,19,"良"],
            [19,91,71,121,1.374,43,18,"良"],
            [20,73,102,182,2.787,44,19,"良"],
            [21,73,50,76,0.717,31,20,"良"],
            [22,84,94,140,2.238,68,18,"良"],
            [23,93,77,104,1.165,53,7,"良"],
            [24,99,130,227,3.97,55,15,"良"],
            [25,146,84,139,1.094,40,17,"轻度污染"],
            [26,113,108,137,1.481,48,15,"轻度污染"],
            [27,81,48,62,1.619,26,3,"良"],
            [28,56,48,68,1.336,37,9,"良"],
            [29,82,92,174,3.29,0,13,"良"],
            [30,106,116,188,3.628,101,16,"轻度污染"],
            [31,118,50,0,1.383,76,11,"轻度污染"]
        ];

        var dataSH = [
            [1,91,45,125,0.82,34,23,"良"],
            [2,65,27,78,0.86,45,29,"良"],
            [3,83,60,84,1.09,73,27,"良"],
            [4,109,81,121,1.28,68,51,"轻度污染"],
            [5,106,77,114,1.07,55,51,"轻度污染"],
            [6,109,81,121,1.28,68,51,"轻度污染"],
            [7,106,77,114,1.07,55,51,"轻度污染"],
            [8,89,65,78,0.86,51,26,"良"],
            [9,53,33,47,0.64,50,17,"良"],
            [10,80,55,80,1.01,75,24,"良"],
            [11,117,81,124,1.03,45,24,"轻度污染"],
            [12,99,71,142,1.1,62,42,"良"],
            [13,95,69,130,1.28,74,50,"良"],
            [14,116,87,131,1.47,84,40,"轻度污染"],
            [15,108,80,121,1.3,85,37,"轻度污染"],
            [16,134,83,167,1.16,57,43,"轻度污染"],
            [17,79,43,107,1.05,59,37,"良"],
            [18,71,46,89,0.86,64,25,"良"],
            [19,97,71,113,1.17,88,31,"良"],
            [20,84,57,91,0.85,55,31,"良"],
            [21,87,63,101,0.9,56,41,"良"],
            [22,104,77,119,1.09,73,48,"轻度污染"],
            [23,87,62,100,1,72,28,"良"],
            [24,168,128,172,1.49,97,56,"中度污染"],
            [25,65,45,51,0.74,39,17,"良"],
            [26,39,24,38,0.61,47,17,"优"],
            [27,39,24,39,0.59,50,19,"优"],
            [28,93,68,96,1.05,79,29,"良"],
            [29,188,143,197,1.66,99,51,"中度污染"],
            [30,174,131,174,1.55,108,50,"中度污染"],
            [31,187,143,201,1.39,89,53,"中度污染"]
        ];

        var schema = [
            {name: 'date', index: 0, text: '日'},
            {name: 'AQIindex', index: 1, text: 'AQI指数'},
            {name: 'PM25', index: 2, text: 'PM2.5'},
            {name: 'PM10', index: 3, text: 'PM10'},
            {name: 'CO', index: 4, text: '一氧化碳（CO）'},
            {name: 'NO2', index: 5, text: '二氧化氮（NO2）'},
            {name: 'SO2', index: 6, text: '二氧化硫（SO2）'}
        ];


        var itemStyle = {
            normal: {
                opacity: 0.8,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
        };

        let option={
            color: [
                '#dd4444', '#fec42c', '#80F1BE'
            ],
            legend: {
                show:false,
                y: 'top',
                data: ['北京', '上海', '广州'],
                textStyle: {
                    color: '#fff',
                    fontSize: 16
                }
            },
            grid:{
                top:"6%",
                right:"15%",
                bottom:"15%"
            },
            tooltip: {
                padding: 10,
                backgroundColor: '#222',
                borderColor: '#777',
                borderWidth: 1,
                formatter: function (obj) {
                    var value = obj.value;
                    return '<div style="border-bottom: 1px solid rgba(255,255,255,.3); font-size: 18px;padding-bottom: 7px;margin-bottom: 7px">'
                        + obj.seriesName + ' ' + value[0] + '日：'
                        + value[7]
                        + '</div>'
                        + schema[1].text + '：' + value[1] + '<br>'
                        + schema[2].text + '：' + value[2] + '<br>'
                        + schema[3].text + '：' + value[3] + '<br>'
                        + schema[4].text + '：' + value[4] + '<br>'
                        + schema[5].text + '：' + value[5] + '<br>'
                        + schema[6].text + '：' + value[6] + '<br>';
                }
            },
            xAxis: {
                type: 'value',
                name: '日期',
                nameGap: 16,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 14
                },
                max: 31,
                splitLine: {
                    show: false
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                },
            },
            yAxis: {
                type: 'value',
                nameLocation: 'end',
                nameGap: 20,
                nameTextStyle: {
                    color: '#fff',
                    fontSize: 16
                },
                axisLine: {
                    lineStyle: {
                        color: '#eee'
                    }
                },
                splitLine: {
                    show: false
                },
            },
            series: [
                {
                    name: '北京',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: dataBJ
                },
                {
                    name: '上海',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: dataSH
                },
                {
                    name: '广州',
                    type: 'scatter',
                    itemStyle: itemStyle,
                    data: dataGZ
                }
            ]
        };
        this.setState({option})
    };
    //水土污染总览
    soilWater=()=>{
        let placeHolderStyle = {
            normal: {
                color: '#fff',
                opacity: .1
            },
            emphasis: {
                color: '#fff',
                opacity: .1
            }
        };
        let option={
            tooltip: {
                trigger: 'item',
                formatter: "{a} : {c} ({d}%)"
            },
            legend: {
                show:false,
                orient: 'vertical',
                top: '45%',
                right: '10%',
                data: ['土污染', '水污染'],
                textStyle: {
                    color: '#40E7F4 ',
                    fontSize: 14
                },
                formatter(name) {
                    return name
                },
                itemWidth: 14,
                itemHeight: 14,
                itemGap: 16
            },
            series: [{
                name: '土污染',
                type: 'pie',
                radius: ['70%', '74%'],
                label: false,
                startAngle: 180,
                clockWise: true,
                hoverAnimation: true,
                hoverOffset: 3,
                data: [{
                    value: 877,
                    name: '收货人',
                    itemStyle: {
                        color: { // 完成的圆环的颜色
                            colorStops: [{
                                offset: 0,
                                color: '#FFEA4F' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#F89212' // 100% 处的颜色
                            }]
                        }
                    }
                },
                    {
                        value: 500,
                        hoverAnimation: false,
                        itemStyle: placeHolderStyle
                    }
                ]
            }, {
                name: '水污染',
                type: 'pie',
                radius: ['50%', '54%'],
                label: false,
                startAngle: 0,
                clockWise: true,
                hoverAnimation: true,
                hoverOffset: 3,
                data: [{
                    value: 939,
                    name: '司机',
                    itemStyle: {
                        color: { // 完成的圆环的颜色
                            colorStops: [{
                                offset: 0,
                                color: '#FF7671' // 0% 处的颜色
                            }, {
                                offset: 1,
                                color: '#A14AFF' // 100% 处的颜色
                            }]
                        }
                    }
                },
                    {
                        value: 200,
                        hoverAnimation: false,
                        itemStyle: placeHolderStyle
                    }
                ]
            }]
        };
        this.setState({option})
    };
    //土地损毁与复垦总览
    destruction=()=>{
        let option={
            tooltip: {
                trigger: 'item',
                formatter: "{a} <br/>{b}: {c} ({d}%)"
            },
            legend: {
                show:false,
                orient: 'vertical',
                x: 'left',
                data:['土地损毁','土地未损毁']
            },
            color: ['#66CC00', '#FFCC33',"#33CCCC","#33CCCC"],
            series: [
                {
                    name:'土地',
                    type:'pie',
                    selectedMode: 'single',
                    radius: [0, '40%'],

                    label: {
                        normal: {
                            position: 'inner'
                        }
                    },
                    labelLine: {
                        normal: {
                            show: false
                        }
                    },
                    data:[
                        {value:135, name:'土地损毁',selected:true},
                        {value:200, name:'土地复垦', selected:true},
                        {value:679, name:'未损毁土地'},

                    ]
                },
                {
                    name:'访问来源',
                    type:'pie',
                    radius: ['55%', '75%'],
                    label:{
                        show:false
                    },
                    data:[
                        {value:335, name:'土地损毁',selected:true},
                        {value:679, name:'土地未损毁'},
                    ]
                },

            ]
        };
        this.setState({option})
    };
    render() {
        return (
            <ReactEcharts
                option={this.state.option}
                style={{width:"100%",height:this.props.dataHeight+"px"}}
            />
        );
    }
}
export default mineEcharts