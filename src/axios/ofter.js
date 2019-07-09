import axios from './index'


export default class ofterajax {
    static dot() {
        return new Promise((resolve, reject) => {
           axios.ajax({
              method: 'get',
              url: '/dot',
              data: {pagesize:200}
            }).then((res)=>{
                resolve(res.data) 
            },(res)=>reject(res))  
        })
    }

    static plantype() { //预案类型
        return new Promise((resolve, reject) => {
           axios.ajax({
              baseURL:window.g.easyURL,
              method: 'get',
              url: '/plantype',
            }).then((res)=>{
                resolve(res) 
            },(res)=>reject(res))  
        })
    }
    static projectlist() { //项目方案列表
        return new Promise((resolve, reject) => {
           axios.ajax({
            baseURL:window.g.bizserviceURL,
              method: 'get',
               url: '/api/getProjectListAll',
            }).then((res)=>{
                resolve(res) 
            })  
        })
    }
    static monitorprolist() { //监测规划列表
        return new Promise((resolve, reject) => {
            axios.ajax({
                baseURL:window.g.bizserviceURL,
                method: 'get',
                url: '/api/findMonitorPlanAll',
            }).then((res)=>{
                resolve(res)
            })
        })
    }

    static montinetlist(value) { //监测网列表
        return new Promise((resolve, reject) => {
            axios.ajax({
                baseURL:window.g.deviceURL,
                method: 'get',
                url: '/api/monitorNetAll',
                data: {
                    pagesize:200,
                    itemid:value
                }
            }).then((res)=>{
                resolve(res)
            },(res)=>reject(res))
        })
    }
    static equiptypelist(value) { //获取监测网设备类型列表
        return new Promise((resolve, reject) => {
            axios.ajax({
                baseURL:window.g.deviceURL,
                method: 'get',
                url: '/api/monitorDeviceTypeAll',
                data: {
                    netid:value,
                }
            }).then((res)=>{
                resolve(res)
            },(res)=>reject(res))
        })
    }

    static equiptypelistquery() { //设备类型
        return new Promise((resolve, reject) => {
            axios.ajax({
                baseURL:window.g.fileURL,
                method: 'get',
                url: '/api/dictionary',
                data: {
                    dtype:'DEVICETYPE'
                }
            }).then((res)=>{
                resolve(res)
            })
        })
    }


}