import config from '@/net/config'

let server_url = config.server_url;

let net = {
    urlParam(url, name, value) {
        url += (url.indexOf('?') == -1 ) ? '?' : '&' ;
        url += encodeURIComponent(name) + "=" + encodeURIComponent(value);
        return url;
    },

    postUrlParam(url, name, value) {
        if (url != "") {
            url += "&";
        }
        return url + encodeURIComponent(name) + "=" + encodeURIComponent(value);
    },

    //登入 0:登入成功  -1:用户名不存在 -2:密码错误 -100:网络异常 -101:数据库异常
    login(userName, password, callback) {
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    let data = JSON.parse(xmlhttp.responseText);
                    callback(data.status);
                }
                else {
                    callback(-100);
                }
            }
        };

        let url = server_url + "login";
        url = net.urlParam(url, "userName", userName);
        url = net.urlParam(url, "password", password);

        xmlhttp.open("GET", url, true);
        xmlhttp.send(null);
    },

    // mac_address: {type: String},
    // version: {type: String},
    // to_4g_count: {type: Number},
    // to_eth_count: {type: Number},
    // flow_4g: {type: Number},
    updateRouterStatus(info, callback) {
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    let data = JSON.parse(xmlhttp.responseText);
                    callback(data.status);
                }
                else {
                    callback(-100);
                }
            }
        };
        let url = server_url + "updateRouterStatus";

        let postUrl = "";
        postUrl = net.postUrlParam(postUrl, "mac_address", info.mac_address);
        postUrl = net.postUrlParam(postUrl, "version", info.version);
        postUrl = net.postUrlParam(postUrl, "to_4g_count", info.to_4g_count);
        postUrl = net.postUrlParam(postUrl, "to_eth_count", info.to_eth_count);
        postUrl = net.postUrlParam(postUrl, "flow_4g", info.flow_4g);

        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(postUrl);
    },

    //info: {startDate, endDate}
    getRouterStatus(info, callback) {
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    let data = JSON.parse(xmlhttp.responseText);
                    callback(data.status, data.data);
                }
                else {
                    callback(-100);
                }
            }
        };
        let startDate = new Date(info.startDate).getTime();
        let endDate = new Date(info.endDate).getTime();

        let url = server_url + "getRouterStatus";
        url = net.urlParam(url, "startDate", startDate);
        url = net.urlParam(url, "endDate", endDate);

        xmlhttp.open("GET", url, true);
        xmlhttp.send(null);
    },

    getRouterSetting(callback) {
        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    let data = JSON.parse(xmlhttp.responseText);
                    callback(data.status, data.data);
                }
                else {
                    callback(-100);
                }
            }
        };

        let url = server_url + "getRouterSetting";

        xmlhttp.open("GET", url, true);
        xmlhttp.send(null);
    },

    updateRouterSetting(info, callback) {
        if (info.mac_address == null) {
            callback(-1);
            return;
        }

        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    let data = JSON.parse(xmlhttp.responseText);
                    callback(data.status);
                }
                else {
                    callback(-100);
                }
            }
        };
        let url = server_url + "updateRouterSetting";

        let postUrl = "";
        postUrl = net.postUrlParam(postUrl, "mac_address", info.mac_address);
        if (info.name) {
            postUrl = net.postUrlParam(postUrl, "name", info.name);
        }
        if (info.note) {
            postUrl = net.postUrlParam(postUrl, "note", info.note);
        }
        if (info.flow_4g) {
            postUrl = net.postUrlParam(postUrl, "flow_4g", info.flow_4g);
        }
        if (info._id) {
            postUrl = net.postUrlParam(postUrl, "_id", info._id);
        }

        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(postUrl);
    },

    removeRouterSetting(info, callback) {
        if (info._id == null) {
            callback(-1);
            return;
        }

        let xmlhttp = new XMLHttpRequest();

        xmlhttp.onreadystatechange = function () {
            if (xmlhttp.readyState == 4) {
                if (xmlhttp.status == 200) {
                    let data = JSON.parse(xmlhttp.responseText);
                    callback(data.status);
                }
                else {
                    callback(-100);
                }
            }
        };
        let url = server_url + "removeRouterSetting";

        let postUrl = "";
        postUrl = net.postUrlParam(postUrl, "_id", info._id);

        xmlhttp.open("POST", url, true);
        xmlhttp.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
        xmlhttp.send(postUrl);
    },
};

export default net;