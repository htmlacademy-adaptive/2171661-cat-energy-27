import gulp from 'gulp';
import plumber from 'gulp-plumber';
import less from 'gulp-less';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import htmlmin from 'gulp-htmlmin';
import terser from 'gulp-terser';
import squoosh from 'gulp-squoosh';
import svgo from 'gulp-svgo';
import svgstore from 'gulp-svgstore';
import rename from 'gulp-rename';
import del from 'del';


//css

export const styles = () => {
  return gulp.src('source/less/style.less', { sourcemaps: true })
    .pipe(plumber())
    .pipe(less())
    .pipe(postcss([
      autoprefixer(),
      csso()
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}


// html

export const html = () => {
  return gulp.src('source/*.html')
  .pipe(htmlmin({collapseWhitespace: true}))
  .pipe(gulp.dest('build'));
}

//scripts

export const script = () => {
  return gulp.src('source/js/*.js')
  .pipe(terser())
  .pipe(gulp.dest('build/js'))
}

//images

export const optimizeImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(squoosh())
  .pipe(gulp.dest('build/img'))
}

export const copyImages = () => {
  return gulp.src('source/img/**/*.{jpg,png}')
  .pipe(gulp.dest('build/img'))
}

//webp

export const createWebp = () => {
  return gulp.src('source/img/**/*.{png.jpg}')
  .pipe(squoosh({webp: {}}))
  .pipe(gulp.dest('build/img'))
}

//svg

export const svg = () => {
  return gulp.src(['source/img/**/*.svg', '!source/img/favicons/*.svg'])
  .pipe(svgo())
  .pipe(gulp.dest('build/img'))
}

export const sprite = () => {
  return gulp.src('source/img/*.svg')
  .pipe(svgo())
  .pipe(svgstore({inlinesvg: true}))
  .pipe(rename('sprite.svg'))
  .pipe(gulp.dest('build/img'))
}

//copy

export const copy = (done) => {
  gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/img/favicons/*.ico',
    'source/manifest.webmanifest'
  ], {
    base: 'source'
  })
  .pipe(gulp.dest('build'))
  done();
}

//clean

export const clean = () => {
  return del('build');
};

// Server

function server(done) {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

//reload

const reload = () => {
  browser.reload();
  done();
}

// Watcher

const watcher = () => {
  gulp.watch('source/less/**/*.less', gulp.series(styles));
  gulp.watch('source/*.html').on('change', browser.reload);
  gulp.watch('source/*.html', gulp.series(html, reload));
}


export default gulp.series(
  html, styles, server, watcher
);
