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
    static plantype() {
        return new Promise((resolve, reject) => {
           axios.ajax({
              baseURL:window.g.mockURL,
              method: 'get',
              url: '/plantype',
            }).then((res)=>{
                resolve(res) 
            })  
        })
    }  



}