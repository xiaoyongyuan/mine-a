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
        return new Promise((resolve,reject)=>{

            console.log('options.params',options.params)
            // axios.get(baseURL+options.url, {
            //     params: options.params
            // })
            axios({
                method: options.method || 'get',
                url: options.url,
                baseURL: baseURL,
                data: options.params,
                params:options.params,
            }).then((response)=>{
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