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
              baseURL:window.g.cuiURL,
              method: 'get',
              url: '/api/getProjectList',
              data: {pagesize:200}
            }).then((res)=>{
                resolve(res) 
            })  
        })
    }
    static thresholdDotlist(projectid,cid) { //监测点列表
        return new Promise((resolve, reject) => {
            axios.ajax({
                baseURL:window.g.cuiURL,
                method: 'get',
                url: '/api/getProjectList',
                data: {
                    pagesize:200,
                    projectid,
                    cid
                }
            }).then((res)=>{
                resolve(res)
            })
        })
    }
    static montinetlist(value) { //监测网列表
        return new Promise((resolve, reject) => {
            axios.ajax({
                baseURL:window.g.easyURL,
                method: 'get',
                url: '/montinet',
                data: {
                    pagesize:200,
                    projectid:value,
                }
            }).then((res)=>{
                resolve(res)
            })
        })
    }
    static equiptypelist(projectid,montinetid) { //设备类型列表
        return new Promise((resolve, reject) => {
            axios.ajax({
                baseURL:window.g.easyURL,
                method: 'get',
                url: '/montinet',
                data: {
                    pagesize:200,
                    projectid,
                    montinetid
                }
            }).then((res)=>{
                resolve(res)
            })
        })
    }



}