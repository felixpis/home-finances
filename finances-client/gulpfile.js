/**
 * Created by Osito on 14/09/2016.
 */

var config = {
    templates: './app/**/*.html',
    styles: './app/**/*.css',
    scripts: './app/**/.js',
    templatesRoot: '/app/',
    tmpDest: './.tmp'
};

gulp.task('default', function (cb) {
    runSequence('templates', 'server', ['watch:templates'], cb)
});

gulp.task('server', function() {
    connect.server({
        livereload: true
    });
});

gulp.task('scripts', function () {
    gulp.src(config.scripts)
        .pipe(connect.reload());
});

gulp.task('styles', function () {
    gulp.src(config.styles)
        .pipe(connect.reload());
});

gulp.task('templates', function () {
    gulp.src(config.tmpDest)
        .pipe(connect.reload());
});

gulp.task('templates-compile', function () {
    return gulp.src(config.templates)
        .pipe(templateCache({standalone: true, moduleSystem: 'IIFE', root: config.templatesRoot}))
        .pipe(gulp.dest(config.tmpDest))
});

gulp.task('templates', function () {
    gulp.watch(config.templates, ['templates-compile']);
    gulp.watch(config.scripts, ['scripts']);
    gulp.watch(config.styles, ['styles']);
    gulp.watch(config.scripts, ['scripts']);
});