import JsonP from 'jsonp'
import axios from 'axios'
import { message } from 'antd'
const baseURL = window.g.baseURL;

export default class Axios {
    static jsonp(options) {
        return new Promise((resolve, reject) => {
            JsonP(options.url, {
                param: 'callback'
            }, function (err, response) {
                console.log('response',response);
                if (response&&response.status === 'success') {
                    resolve(response);
                } else {
                    reject(response.msg);
                }
            })
        })
    }

    static ajax(options){
        let loading;
        if (options.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        const token=localStorage.getItem("token");
        console.log("token",token);
        return new Promise((resolve,reject)=>{
            if(!token){
               window.location.href='#/login';
               reject(false)  
            }
            axios({
                baseURL: options.baseURL||baseURL,
                method: options.method || 'get',
                url: options.url,
                headers:{
                    ContentType:'application/json;charset=UTF-8',
                    AUTHORIZATION: 'Bearer '+localStorage.getItem("token")
                },
                params: options.method === 'get' || options.method === 'delete' ? options.data : null,
                data: options.method === 'post' || options.method === 'put' ? options.data: null,
            })
            .then((response)=>{
                if (options.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if(response&&response.status===200){
                    const res=response.data;
                    if(res.success===0){resolve(res)}
                    if(res.success===1){
                        resolve(res)
                    }else if(res.success=='401' || res.success=='402'){
                        reject(response.msg);
                        window.location.href='#/login';
                    }else{
                        message.error(res.msg);
                    }
                }else{
                    reject(response.msg);
                }
            });

        })
    }

    static login(options){
        let loading;
        if (options.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        return new Promise((resolve,reject)=>{
            axios.post(window.g.loginURL+'/oauth/login/login',options.data)
                .then((response)=>{
                    if (options.isShowLoading !== false) {
                        loading = document.getElementById('ajaxLoading');
                        loading.style.display = 'none';
                    }
                    if(response&&response.status===200){
                        const res=response.data;
                        console.log("wocao",res);
                        resolve(res)
                    }else reject(response.msg);

                })


        })
    }
    static logout(options){
        let loading;
        if (options.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        return new Promise((resolve,reject)=>{
            axios({
                baseURL: window.g.exitURL,
                method:'get',
                url:'/login/exit',
                params:{
                    token:localStorage.getItem("token")
                },
            })
            .then((response)=>{
                if (options.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if(response&&response.status===200){
                    const res=response.data;
                    resolve(res)
                }else reject(response.msg);
            });

        })
    }

    //获取验证码
    static getAuthcode(options){
        let loading;
        if (options.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        return new Promise((resolve,reject)=>{
            axios({
                baseURL: window.g.exitURL,
                method:'post',
                url:'/login/sendCode/'+options.phone,
            })
                .then((response)=>{
                    if (options.isShowLoading !== false) {
                        loading = document.getElementById('ajaxLoading');
                        loading.style.display = 'none';
                    }
                    if(response&&response.status===200){
                        const res=response.data;
                        if(res.success){
                            resolve(res)
                        }else{
                            message.error(res.msg);
                            reject(response)
                        }
                    }else reject(response.msg);
                });

        })
    }

    //验证码登录
    static loginbyAuthcode(options){
        let loading;
        if (options.isShowLoading !== false){
            loading = document.getElementById('ajaxLoading');
            loading.style.display = 'block';
        }
        return new Promise((resolve,reject)=>{
            axios.post(window.g.exitURL+'/login/loginByMobile',options.data)
                .then((response)=>{
                    if (options.isShowLoading !== false) {
                        loading = document.getElementById('ajaxLoading');
                        loading.style.display = 'none';
                    }
                    if(response&&response.status===200){
                        const res=response.data;
                        resolve(res)
                    }else reject(response.msg);

                })


        })
    }
}