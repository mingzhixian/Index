window.onload = function () {
	getDate(); //调用第一个函数，顺序调用
	//setTimeout("location.reload();", 10000);
}

//获取网站用户名称
function getName() {
	return "kic";
}

//获取时间
function getDate() {
	var html = "<span id=\"usr\">root@"+getName()+"</span> <span id=\"root\">~</span> date\n";
	var date = new Date();
	html += "" + date.getMonth() + "月 " + date.getDate() + "日 周" + '日一二三四五六'.charAt(date.getDay()) + "\n";
	$("#terminal_body").append(html);
	getWeather();
}

//获取天气
function getWeather() {
	$.ajax({
		type: "GET",
		url: "https://api.vore.top/api/Weather",
		timeout: 3000
	}).done(function (data) {
		//尝试解析
		try {
			data = JSON.parse(data);
		} catch {}
		//获取地区信息
		var html = "<span id=\"usr\">root@"+getName()+"</span> <span id=\"root\">~</span> ./weather.sh\n";
		html += "ip：" + data.data.ipdata.addr + "  地区：" + data.data.ipdata.area + "\n";
		//获取天气信息
		try {
			html += "天气：" + data.data.tianqi.weather + " 温度：" + data.data.tianqi.temperature + "°" + " " + data.data.tianqi.winddirection + "风" + data.data.tianqi.windpower + "级\n";
		} catch {
			html += "天气获取失败！可能使用了代理或地区较偏远。\n";
		}
		$("#terminal_body").append(html);
		getHello();
	}).fail(function () {
		var html = "<span id=\"usr\">root@"+getName()+"</span> <span id=\"root\">~</span> ./weather.sh\n";
		html += "天气获取失败！俺正在抓紧时间修。\n";
		$("#terminal_body").append(html);
		getHello();
	})
}

//获取网站介绍
function getHello() {
	var html = "<span id=\"usr\">root@"+getName()+"</span> <span id=\"root\">~</span> cat ./me.txt\n";
	html += "你好，此处是鸣之弦的首页！\n";
	$("#terminal_body").append(html);
	getUrl();
}

//获取模块链接
function getUrl() {
	var html = "<span id=\"usr\">root@"+getName()+"</span> <span id=\"root\"></span> ./links.sh\n";
	html += "我的其他站点：\n";
	html += "<a href=\"https://blog.mingzhixian.top\">博客</a>\n";
	html += "<a href=\"http://150.158.81.132:8585\">FileShare</a>\n";
	html += "<a href=\"https://github.com/mingzhixian\">Github</a>\n";
	html += "<a href=\"https://gitee.com/mingzhixianweb\">Gitee</a>\n";
	$("#terminal_body").append(html);
	getDown();
}

//结束
function getDown(){
	var html = "<span id=\"usr\">root@"+getName()+"</span> <span id=\"root\"></span>\n";
	$("#terminal_body").append(html);
}