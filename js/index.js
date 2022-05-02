window.onload = function () {
	getBack();
	terminal();
	setUp();
}

//获取背景
function getBack() {
	$("body").css("background-image", "url(\"https://res.abeim.cn/api-bing_img?idx=sj\")");
}

//初始化
function setUp() {
	var items = ["date", "./onething.sh", "./weather.sh", "./me.sh", "./links.sh"];
	for (i = 0; i < items.length; i++) {
		$("#terminal #code").last().html(items[i]);
		handerCode();
	}
}

//终端
function terminal() {
	//监听键盘
	$("body").on('keydown', function (event) {
		var code = $("#terminal #code").last();
		//获取keyCode
		var keyCode = event.which || event.keyCode;
		if (keyCode === 13) {
			handerCode();
			return false;
		} else if (keyCode === 8) {
			var l = code.html().length - 1;
			if (l >= 0) {
				code.html(code.html().substring(0, l));
			}
			return false;
		}
	});
	$("body").on('keypress', function (event) {
		var code = $("#terminal #code").last();
		code.append(String.fromCharCode(event.which || event.keyCode));
	});
}

//处理命令
function handerCode() {
	var terminal = $("#terminal_body");
	var code = $("#terminal #code").last();
	var html = "";
	switch (code.text()) {
		case "date":
			html = getDate();
			break;
		case "./onething.sh":
			html = getOneThing();
			break;
		case "./weather.sh":
			html = getWeather();
			break;
		case "./me.sh":
			html = getHello();
			break;
		case "./links.sh":
			html = getLinks();
			break;
		case "ls":
			html = getLs();
			break;
		case "l" || "ls -l":
			html = getL();
			break;
		case "sudo":
			sudo();
			return;
		default:
			html = getError(code.text());
			break;
	}
	terminal.append("\n" + html + "\n");
	terminal.append("<span id='usr'>root@web</span><span id='root'> ~ </span><span id='code'></span>");
}

//获取时间
function getDate() {
	var date = new Date();
	return date.getMonth() + "月 " + date.getDate() + "日 周" + '日一二三四五六'.charAt(date.getDay());
}

//一言
function getOneThing() {
	var html = "";
	$.ajax({
		type: "GET",
		url: "https://api.iyk0.com/gsyy/",
		timeout: 2000,
		async: false
	}).done(function (data) {
		html = data.substring(0, data.length - 1);
	}).fail(function () {
		html = "每日一言获取失败！俺正在抢修中。";
	})
	return html;
}

//获取天气
function getWeather() {
	var html = "";
	$.ajax({
		type: "GET",
		url: "https://api.vore.top/api/Weather",
		timeout: 3000,
		async: false
	}).done(function (data) {
		//尝试解析
		try {
			data = JSON.parse(data);
		} catch {}
		//获取地区信息
		html = "ip：" + data.data.ipdata.addr + "  地区：" + data.data.ipdata.area + "\n";
		//获取天气信息
		try {
			html += "天气：" + data.data.tianqi.weather + " 温度：" + data.data.tianqi.temperature + "°" + " " + data.data.tianqi.winddirection + "风" + data.data.tianqi.windpower + "级";
		} catch {
			html += "天气获取失败！可能使用了代理或地区较偏远。";
		}
	}).fail(function () {
		html = "天气获取失败！俺正在抓紧时间修。";
	})
	return html;
}

//获取网站介绍
function getHello() {
	return "你好，此处是鸣之弦的首页！";
}

//获取模块链接
function getLinks() {
	var html = "我的其他站点：\n";
	html += "<a href=\"https://blog.mingzhixian.top\">博客</a>\n";
	html += "<a href=\"http://150.158.81.132:8585\">FileShare</a>\n";
	html += "<a href=\"https://github.com/mingzhixian\">Github</a>\n";
	html += "<a href=\"https://gitee.com/mingzhixianweb\">Gitee</a>\n";
	html += "<a href=\"http://150.158.81.132:8787\">WebIDE</a>";
	return html;
}

//获取文件列表
function getLs() {
	return "links.sh  me.sh  onething.sh  weather.sh";
}

//获取详细信息
function getL() {
	return "总计 22K" +
		"-rw-r--r-- 1 web web 4.0K  4月23日 19:09 links.sh\n" +
		"-rw-r--r-- 1 web web 5.0K  4月23日 19:09 me.sh\n" +
		"-rw-r--r-- 1 web web 1.0K  4月23日 19:08 onething.sh\n" +
		"-rw-r--r-- 1 web web 12.0K  4月23日 19:08 weather.sh\n"
}

//错误命令
function getError(code) {
	return "zsh: command not found: " + code;
}

//sudo
function sudo() {
	var terminal = $("#terminal_body");
	html = "输入密码：<span id=\"password\"></span>"
	terminal.append("\n" + html);
	//关闭原有监听
	$("body").off('keydown');
	$("body").off('keypress');
	//监听键盘
	$("body").on('keydown', function (event) {
		var password = $("#terminal #password").last();
		//获取keyCode
		var keyCode = event.which || event.keyCode;
		if (keyCode === 13) {
			window.open("http://150.158.81.132:8686/?hostname=150.158.81.132&username=root&password=" + btoa(password.text()));
			$("body").off('keydown');
			$("body").off('keypress');
			terminal();
			return false;
		} else if (keyCode === 8) {
			var l = password.html().length - 1;
			if (l >= 0) {
				password.html(password.html().substring(0, l));
			}
			return false;
		}
	});
	$("body").on('keypress', function (event) {
		var password = $("#terminal #password").last();
		password.append(String.fromCharCode(event.which || event.keyCode));
	});
	//terminal.append("<span id='usr'>root@web</span><span id='root'> ~ </span><span id='code'></span>");
}
