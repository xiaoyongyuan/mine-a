import axios from './index'


export default class homeSystemMonitoring {
    // 修改密码
    static changepwd(netid) {
        return new Promise((resolve, reject) => {
            axios.ajax({
                method:'put',
                baseURL: window.g.sysURL,
                url: '/sys/api/companyUserUpdatePassword',
                data:netid
            }).then((res)=>{
                resolve(res) 
            },(res)=>reject(res))  
        })
    }
    
    // 修改密码——验证旧密码
    static change(netid) {
        return new Promise((resolve, reject) => {
            axios.ajax({
                method:'post',
                baseURL: window.g.sysURL,
                url: '/sys/api/verifyOldPassword',
                data:netid
            }).then((res)=>{
                resolve(res) 
            },(res)=>reject(res))  
        })
    }

    // 获取首页 系统总览——基础数据-----监测网列表
    static basedatalist() {
        return new Promise((resolve, reject) => {
            axios.ajax({
              baseURL: window.g.sysURL,
                url: '/bizservice/api/indexNetList',
            }).then((res)=>{
                resolve(res) 
            },(res)=>reject(res))  
        })
    }

    // 地裂缝监测网
    static groundFissure(netid) {
        return new Promise((resolve, reject) => {
            axios.ajax({
                method:'post',
                baseURL: window.g.sysURL,
                url: '/bizservice/api/indexNetDeviceList',
                data:netid
            }).then((res)=>{
                resolve(res) 
            },(res)=>reject(res))  
        })
    }

    // 监测设备

    // 根据当前登录用户企业id查询监测网下监测点数量
    static monitoring() {
        return new Promise((resolve, reject) => {
            axios.ajax({
                baseURL: window.g.sysURL,
                url: '/bizservice/api/findMonitorDeviceNum',
            }).then((res)=>{
                resolve(res) 
            },(res)=>reject(res))  
        })
    }
    
    // 获取监测点列表(全部)
    static MonitoringOne(netid) {
        return new Promise((resolve, reject) => {
            axios.ajax({
                method:'post',
                baseURL: window.g.sysURL,
                url: '/bizservice/api/getMonitordeviceAllList',
                data:netid
            }).then((res)=>{
                resolve(res) 
            },(res)=>reject(res))  
        })
    }

    // 查询首页遥感监测下遥感监测图层数量
    static remotesensing() {
        return new Promise((resolve, reject) => {
            axios.ajax({
                baseURL: window.g.sysURL,
                url: '/device/api/layerRemoteType',
            }).then((res)=>{
                resolve(res) 
            },(res)=>reject(res))  
        })
    }

    // 查询首页空间分析下空间分析图层数量
    static spatialan() {
        return new Promise((resolve, reject) => {
            axios.ajax({
                baseURL: window.g.sysURL,
                url: '/device/api/spatialAnalysisList',
            }).then((res)=>{
                resolve(res)
            },(res)=>reject(res))  
        })
    }
    // 查询首页矿区导航
    static miniNavigationlist(page) {
        return new Promise((resolve, reject) => {
            axios.ajax({
                method:'get',
                baseURL: window.g.sysURL,
                url: '/device/api/layer',
                data:page
            }).then((res)=>{
                resolve(res)
            },(res)=>reject(res))  
        })
    }
    // 首页监测数据——监测网列表
    static monitoringdata(page) {
        return new Promise((resolve, reject) => {
            axios.ajax({
                method:'get',
                baseURL: window.g.sysURL,
                // baseURL: 'http://192.168.10.15:9001',
                url: '/device/api/layer',
                data:page
            }).then((res)=>{
                resolve(res)
            },(res)=>reject(res))  
        })
    }
}

