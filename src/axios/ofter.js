import JsonP from 'jsonp'
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
            })  
        })
    }
    static equipment(dot) {
        return new Promise((resolve, reject) => {
           axios.ajax({
              method: 'get',
              url: '/equipment',
              data: {pagesize:200,dot:dot}
            }).then((res)=>{
                resolve(res.data) 
            })  
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
            })  
        })
    }
    static projectlist() { //项目方案列表
        return new Promise((resolve, reject) => {
           axios.ajax({
              // baseURL:window.g.cuiURL,
              //  baseURL:window.g.bizserviceURL,
              baseURL:window.g.wangURL,
              method: 'get',
              // url: '/api/getProjectAllItem',
               url: '/api/getProjectAll',
            }).then((res)=>{
                resolve(res) 
            })  
        })
    }
    static montinetlist(value) { //监测网列表
        console.log("hhhwww",value);
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
            })
        })
    }
    static equiptypelist(value) { //设备类型列表
        return new Promise((resolve, reject) => {
            axios.ajax({
                baseURL:window.g.syshongURL,
                method: 'get',
                url: '/api/monitorDeviceTypeAll',
                data: {
                    // pagesize:200,
                    netid:value,
                }
            }).then((res)=>{
                resolve(res)
            })
        })
    }

    static thresholdDotlist(netid) { //监测点列表
        return new Promise((resolve, reject) => {
            axios.ajax({
                baseURL:window.g.hongURL,
                method: 'get',
                url: '/api/findMonitorNetDeviceList',
                data: {
                    netid,
                }
            }).then((res)=>{
                resolve(res)
            })
        })
    }
}