import JsonP from 'jsonp'
import axios from 'axios'
import { message } from 'antd'
const Httpurl = window.g.url;
const qrcodeurl = window.g.loginurl;
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


    static post = async ({ url, msg = "接口异常", data = {}, type },callback) => {
        const token = localStorage.getItem("token");
        const comid = localStorage.getItem("comid");
        const account = localStorage.getItem("account");
        if (!account || account === "undefined" || !token || !comid || token === "undefined" || comid === "undefined") {
            window.location.href = "#/login";
            return callback(false);
        }
        const head = {
            headers: {
              AUTHORIZATION: token
            }
        };

        return new Promise((resolve,reject) => {
            axios.post(Httpurl + url,Object.assign({ comid: comid, user: account }, data),head)
                .then((response) => {
                    if (res.data.success === 1) {
                        resolve(res);
                    } else if (res.data.success === 2) {
                        window.location.href = "#/login";
                    } else {
                    if (type) {
                      reject(false);
                    }
                    message.warn(res.data.errorinfo);
                    reject(false);
                    }

            })
        })
    };



}