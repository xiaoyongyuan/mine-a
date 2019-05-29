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
                console.log('response',response)
                if (response&&response.status == 'success') {
                    resolve(response);
                } else {
                    reject(response.messsage);
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
        console.log('options.params',options.params)
        return new Promise((resolve,reject)=>{
            axios({
                method: options.method || 'get',
                url: options.url,
                baseURL: baseURL,
                headers:{ContentType:'application/json;charset=UTF-8'},
                params: options.method === 'get' || options.method === 'delete' ? options.params : null,
                data: options.method === 'post' || options.method === 'put' ? options.params: null,
            })
            .then((response)=>{
                if (options.isShowLoading !== false) {
                    loading = document.getElementById('ajaxLoading');
                    loading.style.display = 'none';
                }
                if(response&&response.status=='200'){
                    const res=response.data;
                    if(res.success===1){
                        resolve(res)
                    }else if(res.success===2){
                        window.href='#/login'
                    }else message.error(res.message)
                }else reject(response.messsage);
            });

        })
    }


    



}