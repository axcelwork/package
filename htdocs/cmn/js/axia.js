/*
axia.js
version 0.1

Creates handy events for your responsive design breakpoints

Copyright (c) 2016 axcelwork
axcelwork@gmail.com

Documentation for this plugin lives here:
https://github.com/axcelwork/axia.js

Released under the MIT license
http://www.opensource.org/licenses/mit-license.php
*/
var Axia = function( options ) {
	var _ = this;
	_.listeners = [];
	_.settings = {};

	this.defaults = {
		breakpoints: [ 600, 960 ]
	};

	_.settings.breakpoints = options.breakpoints || this.defaults.breakpoints;
	_.settings.breakpoints.unshift(1);

	var break_point_change_event = new Event( 'break-point-change' );

	this.dispatchEvent = function( e, data ){
		var observers = _.listeners[ e.type ] || '';
		if( observers != '' ){
			for( var i = 0; i < observers.length; ++i ){
				observers[ i ]( data );
			}
		}
	};

	this.check_breakpoints = function(){
		_.settings.breakpoints.some( function( val, index ){
			if ( index == _.settings.breakpoints.length - 1 ) {
				if ( window.matchMedia( '(min-width:' + _.settings.breakpoints[_.settings.breakpoints.length - 1] + 'px)' ).matches ) {
					_.dispatchEvent( break_point_change_event, { width: window.innerWidth, size: 'large', breakpoint: _.settings.breakpoints[_.settings.breakpoints.length - 1] } );
				}

			}
			else if( index == 0 ) {
				if ( window.matchMedia( '(max-width:' + _.settings.breakpoints[1] + 'px)' ).matches ) {
					_.dispatchEvent( break_point_change_event, { width: window.innerWidth, size: 'small', breakpoint: _.settings.breakpoints[1] } );
				}

			}
			else {
				if ( window.matchMedia( '(min-width:' + ( _.settings.breakpoints[index] ) + 'px) and (max-width:' + ( _.settings.breakpoints[index + 1 ] - 1 ) + 'px)' ).matches ) {
					_.dispatchEvent( break_point_change_event, { width: window.innerWidth, size: 'small', breakpoint: _.settings.breakpoints[index + 1] } );
				}
			}

		});
	};

	var tmp = window.innerWidth;
	var staus_size = '';

	_.settings.breakpoints.some( function( val, index ){
		window.matchMedia( '(min-width:' + val + 'px)' ).addListener( function(){
			// compar
			if( window.innerWidth <= tmp ){
				staus_size = 'small'
			}
			else if( window.innerWidth >= tmp ) {
				staus_size = 'large';
			}

			// width update
			tmp = window.innerWidth;

			// fire
			_.dispatchEvent( break_point_change_event, { width: window.innerWidth, size: staus_size, breakpoint: val } );
		});
	});

	window.addEventListener( 'load', this.check_breakpoints );
};


Axia.prototype.addEventListener = function( state, callback, isCapture ) {
	if( !this.listeners[ state ] ) this.listeners[ state ] = [];
	this.listeners[ state ].push( callback );
};
Axia.prototype.removeEventListener = function( state ){
	if( !this.listeners[ state ] ) return;
	this.listeners[ state ] = null;
}
