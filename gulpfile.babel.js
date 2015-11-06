'use strict'

import gulp from 'gulp'
import electron from 'gulp-electron'
import packageJson from './package.json'

gulp.task('default', () => {
  // console.log('hi')
})

gulp.task('electron', () => {
  console.log('Releasing', packageJson.version)
  gulp.src('')
    .pipe(electron({
      src: './dist',
      packageJson,
      release: './release',
      cache: './cache',
      version: 'v0.34.2',
      packaging: true,
      platforms: ['darwin-x64'],
      platformResources: {
        darwin: {
          CFBundleDisplayName: packageJson.name,
          CFBundleIdentifier: packageJson.name,
          CFBundleName: packageJson.name,
          CFBundleVersion: packageJson.version,
          icon: './app/assets/images/appIcon.icns'
        }
      }
    }))
    .pipe(gulp.dest(''))
})