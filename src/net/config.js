var server_url = "https://agl.dhgames.cn:8088/";

if (process.env.NODE_ENV == "development") {
    server_url = "http://192.168.102.226:8087/"; //company
    // server_url = "http://192.168.1.10:8088/"; //home
}

var config = {
	server_url : server_url,
};

export default config;