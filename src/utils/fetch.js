import router from '../router'
import axios from 'axios'
import qs from 'qs'
import cache from './cache'


axios.defaults.timeout = 30000
process.env.NODE_ENV == 'production' && (axios.defaults.baseURL = '/')


axios.interceptors.response.use(
    response => {
        if(response.data.code === 80007 || response.data.code === 80006 || response.data.code === 80001) {
            router.push('/login')
        }
        return response
    },
    error => {
        console.log(error)
        return Promise.reject(error.response.data)
    }
)


const http = {
	post (setting) {
        setting.data = setting.data || {}
        setting.data.companyId = sessionStorage.getItem('companyId') || ''
		return  axios({
		            method: 'post',
		            url: setting.url,
		            data: qs.stringify(setting.data || {}),
		            headers: {
		            	'X-Requested-With': 'XMLHttpRequest',
		                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		                'adminToken' : cache.readToken('adminToken') || ''
		            }
		        })
				.then(function(res){
                    console.log(res.data)
					typeof setting.success === 'function' && setting.success(res.data)
				})
				.catch(function(res){
                    console.log(res)
					typeof setting.error === 'function' && setting.error(res)
				})
		
	},
    upload (setting) {
        return  axios({
                    method: 'post',
                    url: setting.url,
                    data: setting.data || {},
                    headers: {
                        'X-Requested-With': 'XMLHttpRequest',
                        'Content-Type': 'multipart/form-data',
                        'adminToken' : cache.readToken('adminToken') || ''
                    }
                })
                .then(function(res){
                    console.log(res.data)
                    typeof setting.success == 'function' && setting.success(res.data)
                })
                .catch(function(res){
                    console.log(res)
                    typeof setting.error == 'function' && setting.error(res)
                })
        
    },
	get (setting) {
        setting.data = setting.data || {}
        setting.data.companyId = sessionStorage.getItem('companyId') || ''
		return  axios({
		            method: 'get',
		            url: setting.url,
		            params: setting.data || {},
		            headers: {
		                'X-Requested-With': 'XMLHttpRequest',
		                'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
		                'adminToken' : cache.readToken('adminToken') || ''
		            }
		        })
				.then(function(res){
                    console.log(res.data)
					typeof setting.success == 'function' && setting.success(res.data)
				})
				.catch(function(res){
                    console.log(res)
					typeof setting.error == 'function' && setting.error(res)
				})
	},
	ajax (setting) {
		$.ajax({
	            type: 'post',
	            url: eee + setting.url,
	            data: setting.data || {},
	            beforeSend: function (request) {
                    request.setRequestHeader("adminToken", cache.readToken('adminToken') || '');
                },
                success: function (res) {
                    typeof setting.success == 'function' && setting.success(res)
                    
                },
                error: function (res) {
                    typeof setting.success == 'function' && setting.success(res)
                }
            })
		
	},
}
export default {
    install: function (Vue, options) { 
        Vue.prototype.$http = http
    }
}