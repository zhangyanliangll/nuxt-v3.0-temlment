import axios from 'axios';
import CONFIG from '@/config/index'
import {
	useUserStore
} from '@/stores/user';
import {
	ElMessage,
	ElNotification
} from 'element-plus';
import db from '@/unit/db'
import {
	useRoute
} from 'vue-router';


// console.log(import.meta.env);

const noShowLoginName = [
	''
]

class AxiosRequest {
	constructor(config) {
		this.defaultConfig = {
			method: 'get',
			...config
		};
	}
	static handleError(ctx) {
		try {
			const error = ctx.response;
			return Promise.reject(error.data);
		} catch {
			throw new Error(ctx);
		}
	}

	interceptors(instance) {
		//拦截请求
		instance.interceptors.request.use(function(config) {
				//在发送请求判断token是否过期否则进入登录页面
				let token = db.get('token') || '';
				if (token) {
					config.headers['ftoken'] = token;
				}
				if (config.type === 'formData') {
					config.headers['Content-Type'] = 'application/x-www-form-urlencoded'
				}
				
				config.headers['languageType'] = localStorage.getItem('localLang')  == 'en'?'en':'zh_cn'
				config.headers['source'] = 1
				return config; //只有return config后，才能成功发送请求
			}, error =>
			//请求错误时做些事
			Promise.reject(error)
		);
		//响应拦截
		instance.interceptors.response.use(function(data) {
			let res = data.data;
			// console.log(res,'响应拦截11')

			if (/submit/.test(data.config.url)) {
				// ai interface
				if (res.code === 1) {
					return res
				} else {
					ElMessage(res?.description)
					return Promise.reject(res?.description);
				}
			}

			if (res.success) {
				return res.data;
			} else if (res.errorCode == '203' && data.config.url.indexOf('/checkIsLogin') == -1 && data
				.config.url.indexOf('/selectAiUserCount') == -1) {
				useUserStore().updateShowLogin(true);
			} else {
				data.config.url.indexOf('/checkIsLogin') == -1 && data.config.url.indexOf(
					'/selectAiUserCount') == -1 && ElMessage(res?.errorInfo)
			}
			return Promise.reject(res?.errorInfo);
		}, error => {
			//请求错误时做些事
			const {
				code,
				message
			} = error;
			ElMessage({
				message: message,
				duration: 2000,
			});
			if (code === 'ECONNABORTED' || message === 'Network Error') { // 请求超时
				return Promise.reject(error);
			}
			return AxiosRequest.handleError(error);
		});
	}

	request(options = {}) {
		const instance = axios.create({
			baseURL: import.meta.env.VITE_APP_ENV == 'test' ? import.meta.env.VUE_APP_BASE_API : 'https://pcapi.homeiliving.com',
			// baseURL: '/',
			withCredentials: true,
		});
		if (!options.url) {
			throw new Error('缺少请求地址');
		}
		this.interceptors(instance);
		// options.url = '/' + options.url;//请求根路径
		options.url = options.url; //请求根路径
		options.timeout = 100000; //请求超时
		return instance.request(options);
	}

}
export default new AxiosRequest;