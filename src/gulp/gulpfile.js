var gulp = require( "gulp" ),
    requireDir = require( "require-dir" );

requireDir( "./tasks", { recursive : true } );

gulp.task('default', ['watch','connect-sync']);
