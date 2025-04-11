// 全局挂载时间格式化的方法
export function formatter(thistime, fmt) {
	var $this = new Date(thistime)
	var o = {
		'M+': $this.getMonth() + 1,
		'd+': $this.getDate(),
		'h+': $this.getHours(),
		'm+': $this.getMinutes(),
		's+': $this.getSeconds(),
		'q+': Math.floor(($this.getMonth() + 3) / 3),
	}
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(
			RegExp.$1,
			($this.getFullYear() + '').substr(4 - RegExp.$1.length)
		)
	}
	for (var k in o) {
		if (new RegExp('(' + k + ')').test(fmt)) {
			fmt = fmt.replace(
				RegExp.$1,
				RegExp.$1.length === 1 ? o[k] : ('00' + o[k]).substr(('' + o[k]).length)
			)
		}
	}
	return fmt
}


export function us_date_format(_date, fmt) {
	// 创建一个新的Date对象，使用输入的时间字符串作为参数  
	let date = new Date(_date);

	// 获取日期和时间的各个部分  
	let year = date.getFullYear();
	let month = date.getMonth() + 1; // getMonth()返回的是0-11的值  
	let day = date.getDate();
	let hours = date.getHours();
	let minutes = date.getMinutes();
	let seconds = date.getSeconds();

	// 如果某一部分的值小于10，前面添加一个'0'以便格式化输出  
	month = (month < 10 ? "0" : "") + month;
	day = (day < 10 ? "0" : "") + day;
	hours = (hours < 10 ? "0" : "") + hours;
	minutes = (minutes < 10 ? "0" : "") + minutes;
	seconds = (seconds < 10 ? "0" : "") + seconds;

	// 返回格式化的日期时间字符串  
	return month + "-" + day + "-" + year;
}