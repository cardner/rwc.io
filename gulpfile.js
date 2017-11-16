const cssnano = require('cssnano')
const gulp = require('gulp')
const htmlmin = require('gulp-htmlmin')
const sass = require('gulp-sass')
const postcss = require('gulp-postcss')
const jsmin = require('gulp-jsmin')
const rename = require('gulp-rename')
const stylelint = require('gulp-stylelint')
const autoprefixer = require('gulp-autoprefixer')

const autoprefixerOptions = {
    browsers: ['last 2 versions', '> 5%', 'Firefox ESR']
};

gulp.task('styles', () => (
    gulp.src('styles/**/*.scss')
        .pipe(sass({
            // loadPath: '/styles/global',
            outputStyle: 'compressed'
        }).on('error', sass.logError))
        .pipe(autoprefixer(autoprefixerOptions))
        .pipe(postcss([
            require('postcss-nested'),
            cssnano()
            ],
            { syntax: require('postcss-scss') }))
        .pipe(gulp.dest('public/styles'))
))

gulp.task('scripts', () => (
    gulp.src('assets/js/*.js')
        .pipe(jsmin())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('public/assets/js'))
))

gulp.task('images', () => (
    gulp.src('assets/images/*.*')
        .pipe(gulp.dest('public/assets/images'))
))

gulp.task('pages', () => (
    gulp.src('*.html')
        .pipe(htmlmin({
            collapseWhitespace: true,
            conservativeCollapse: true,
        }))
        .pipe(gulp.dest('public'))
))

gulp.task('build', ['pages', 'styles', 'scripts', 'images'])

gulp.task('refresh', ['pages', 'styles', 'scripts'])

gulp.task('watch', ['refresh'], () => {
    gulp.watch('*.html', ['pages'])
    gulp.watch('styles/**/*.scss', ['styles'])
    gulp.watch('assets/js/*.js', ['scripts'])

})