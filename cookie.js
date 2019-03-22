class Cookie {
  constructor() {
    this.cookie = document.cookie;
    this.allCookies = {};

    this.init();
  }

  init() {
    this.allCookies = {};
    const reg = /([^=;\s]+)=([^=;]+);?/g;
    let res = reg.exec(this.cookie);
    while(res !== null) {
      this.allCookies[decodeURIComponent(res[1])] = decodeURIComponent(res[2]);
      res = reg.exec(this.cookie);
    }
  }

  getCookie(name) {
    return this.allCookies[name];
  }

  /**
   * @description: 设置cookie
   * @name {String} 字段名称  
   * @value {String} 字段值
   * @opts {Object} cookie属性值  
   *  @opts {maxAge} cookie 的有效时间 单位 s  
   *  @opts {domain} cookie属性值  
   *  @opts {path} cookie属性值  
   * @return: 
   */
  setCookie(name, value, opts) {
    this.allCookies[name] = value;
    let str = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;
    if (opts) {
      const { maxAge, domain, path } = opts;
      if (maxAge) {
        str += `; max-age=${maxAge}`;
      }
      if (domain) {
        str += `; domain=${domain}`;
      }
      if (path) {
        str += `; path=${path}`;
      }
    }
    document.cookie = str;
  }

  removeCookie(name) {
    document.cookie = `${name}=;expires=Thu, 01-Jan-1970 00:00:01 GMT`;
    delete this.allCookies[name]
  }
}

export default new Cookie();
