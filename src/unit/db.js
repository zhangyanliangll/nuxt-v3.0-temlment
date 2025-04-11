
import config from '@/config';
const MyProto = (function () {
  let instance = void 0;
  return class MyProto {
    constructor() {
      if (Object.prototype.toString.call(window.localStorage) !== '[object Storage]') {
        throw new TypeError('当前运行环境不支持 localStorage');
      }
      if (!instance) {
        instance = this;
      }
      return instance;
    }
    //统一加上前缀
    static addPrefix(key) {
      return config.prefix + '-' + key;
    }

    static setValue(key, value, expires) {
      let c_time = new Date().getTime();
      expires = c_time + expires;
      const obj = {
        value,
        ctime: c_time,
        expires
      };
      localStorage.setItem(MyProto.addPrefix(key), JSON.stringify(obj));
    }

    static getValue(key) {
      let obj = JSON.parse(localStorage.getItem(MyProto.addPrefix(key)));
      if (obj) {
        let c_time = new Date().getTime();
        if (obj.expires && c_time > obj.expires) {
          MyProto.removeValue(key);
        } else {
          return obj.value;
        }

      }
    }

    static removeValue(key) {
      localStorage.removeItem(MyProto.addPrefix(key));
    }
    //获取localstorge
    get(key) {
      return MyProto.getValue(key);
    }
    //设置localstorge
    set(key, value, expires) {
      if (expires > 0) {
        MyProto.setValue(key, value, expires);
      } else {
        MyProto.setValue(key, value, config.expires);
      }
    }
    //清除localstorge
    remove(key) {
      MyProto.removeValue(key);
    }
    //清除与该系统有关的所有localstorge
    clear() {
      Object.keys(localStorage).forEach(key => {
        if (key.includes(config.prefix)) {
          this.remove(key.replace(config.prefix + '-', ''));
        }
      });
    }
  };
})();
export default new MyProto;