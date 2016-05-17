/*
 * Created with Sublime Text 3.
 * license: http://www.lovewebgames.com/jsmodule/index.html
 * User: 田想兵
 * Date: 2016-05-17
 * Time: 10:15:51
 * Contact: 55342775@qq.com
 */
;
(function(root, factory) {
	//amd
	if (typeof define === 'function' && define.amd) {
		define([], factory);
	} else if (typeof exports === 'object') { //umd
		module.exports = factory();
	} else {
		root.Notifications = factory();
	}
})(this, function() {
	var Notifications = {
		check: function() {
			if (window.webkitNotifications) {
				webkitNotifications.requestPermission();
			} else
			if (window.Notification) {
				Notification.requestPermission(function(status) { //status值有三种：default/granted/denied
					if (Notification.permission !== status) {
						Notification.permission = status;
					}
				});
			}
		},
		show: function(settings) {
			var _this = this;
			//判断浏览器是否支持notification
			if (window.webkitNotifications) {
				//判断当前页面是否被允许发出通知
				if (webkitNotifications.checkPermission == 0) {
					var icon_url = settings.icon_url || "";
					var title = settings.title;
					var body = settings.desc || "";
					var WebkitNotification = webkitNotifications.createNotification(icon_url, title, body);
					WebkitNotification.show();
				} else {
					webkitNotifications.requestPermission();
				}
			} else
			if (window.Notification) {
				console.log(Notification.permission)
				if (Notification.permission === 'granted') {
					var notification = new Notification(settings.title, {
						"icon": settings.icon_url || "",
						body: settings.desc || ""
					});
				}
				//如果没权限，则请求权限
				else if (Notification.permission !== 'denied') {
					Notification.requestPermission(function(permission) {
						// Whatever the user answers, we make sure we store the
						// information
						if (!('permission' in Notification)) {
							Notification.permission = permission;
						}
						//如果接受请求
						if (permission === "granted") {
							_this.show(settings);
						}
					});
				} 
			} else alert('你的浏览器不支持此特性，请下载谷歌浏览器试用该功能');
		}
	}
	return Notifications;
});