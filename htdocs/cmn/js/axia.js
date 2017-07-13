/*
axia.js
version 0.2

Creates handy events for your responsive design breakpoints

Copyright (c) 2016 axcelwork
axcelwork@gmail.com

Documentation for this plugin lives here:
https://github.com/axcelwork/axia.js

Released under the MIT license
http://www.opensource.org/licenses/mit-license.php
*/
var Axia = function (options) {
	var _ = this;
	_.listeners = [];

	_.settings = {};

	this.defaults = {
		breakpoints: [600, 960]
	};

	if (options === undefined) {
		options = this.defaults;
	}

	_.settings.breakpoints = options.breakpoints || this.defaults.breakpoints;
	_.settings.breakpoints.unshift(1);

	this.dispatchEvent = function (e, data) {
		var observers = _.listeners[e.type] || '';
		if (observers != '') {
			for (var i = 0; i < observers.length; ++i) {
				observers[i](data);
			}
		}
	};

	if (typeof Event === 'function') {
		var break_point_change_event = new Event('breakpoints');
	} else {
		var break_point_change_event = document.createEvent('Event');
		break_point_change_event.initEvent('breakpoints', true, true);
	}

	var myquery = [];
	var myquery_cl = [];

	// メディアの組み立て
	_.settings.breakpoints.some(function (val, index) {
		if (index == 0) {
			myquery.push('screen and (max-width: ' + (_.settings.breakpoints[index + 1] - 1) + 'px)');
		} else if (index == _.settings.breakpoints.length - 1) {
			myquery.push('screen and (min-width: ' + val + 'px)');
		} else {
			myquery.push('screen and (max-width: ' + (_.settings.breakpoints[index + 1] - 1) + 'px) and (min-width: ' + _.settings.breakpoints[index] + 'px)');
		}
	});

	myquery_cl = [].concat(myquery);

	myquery_cl.some(function (val, index) {
		myquery_cl[index] = myquery_cl[index].replace(/\s+/g, "");
	});

	this.check_breakpoints = function () {
		myquery.some(function (val, index) {
			// init
			if (window.matchMedia(myquery[index]).matches) {
				_.dispatchEvent(break_point_change_event, { width: window.innerWidth, breakpoint: _.settings.breakpoints[index] });
			}

			window.matchMedia(myquery[index]).addListener(function (e) {
				if (e.matches) {
					var tmp = e['media'].replace(/\s+/g, "");

					// fire
					_.dispatchEvent(break_point_change_event, { width: window.innerWidth, breakpoint: _.settings.breakpoints[myquery_cl.indexOf(tmp)] });
				}
			});
		});
	};

	window.addEventListener('load', this.check_breakpoints);
};

Axia.prototype.addEventListener = function (state, callback, isCapture) {
	if (!this.listeners[state]) this.listeners[state] = [];
	this.listeners[state].push(callback);
};
Axia.prototype.removeEventListener = function (state) {
	if (!this.listeners[state]) return;
	this.listeners[state] = null;
};