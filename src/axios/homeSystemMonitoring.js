import axios from './index'


export default class homeSystemMonitoring {
    // 基础数据
    // 获取首页基础数据-----监测网列表
    static basedatalist() {
        return new Promise((resolve, reject) => {
            axios.ajax({
              baseURL: window.g.sysURL,
                // baseURL: 'http://192.168.10.15:8001',
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
                // baseURL: 'http://192.168.10.15:8001',
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
                // baseURL: 'http://192.168.10.15:8001',
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
                // baseURL: 'http://192.168.10.15:8001',
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
}

