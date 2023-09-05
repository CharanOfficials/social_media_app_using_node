import gulp from 'gulp'
import cssnano from 'gulp-cssnano'
import rev from 'gulp-rev'
import { createRequire } from 'module';

// Create a 'require' function to load 'sass'
const require = createRequire(import.meta.url);

const gulpSass = require('gulp-sass')(require('sass'));
const uglify = require('gulp-uglify-es').default

// minifying the CSS
gulp.task('css', function (done) {
    console.log("Minifying css..")
    gulp.src('./assets/sass/**/*.scss')
        .pipe(gulpSass())
        .pipe(cssnano())
        .pipe(gulp.dest('./assets/css'))
    gulp.src('./assets/**/*.css')
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: "public",
            merge:true
        }))
        .pipe(gulp.dest('./public/assets'))
        done()
})

gulp.task('js', function (done) {
    console.log("Minifying js..")
    gulp.src('./assets/**/*.js')
        .pipe(uglify())
        .pipe(rev())
        .pipe(gulp.dest('./public/assets'))
        .pipe(rev.manifest({
            cwd: "public",
            merge:true
        }))
        .pipe(gulp.dest('./public/assets'))
        done()
})

const minify = require('gulp-minify');
gulp.task('images', function(done){
    console.log('compressing images...');
    gulp.src('./assets/images/**/*.+(PNG|JPG|GIF|SVG|JPEG|png|jpg|gif|svg|jpeg)')
    .pipe(minify())
    .pipe(rev())
    .pipe(gulp.dest('./public/assets/images'))
    .pipe(rev.manifest({
        cwd: 'public',
        merge: true
    }))
    .pipe(gulp.dest('./public/assets/images'));
    done();
});

import {deleteAsync} from 'del';
gulp.task('clean:assets', async function () {
    await deleteAsync('./public/assets')
})

gulp.task('build', gulp.series('clean:assets', 'css', 'js', 'images'), function () {
    console.log("Building assets")
})