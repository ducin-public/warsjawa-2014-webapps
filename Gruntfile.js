/*global module:false*/
module.exports = function(grunt) {

  grunt.initConfig({
    clean: ['build'],
    replace: {
      example: {
        src: ['sources/*.md'],
        dest: 'build/',
        replacements: [{
          from: '../images',
          to: 'images'
        }]
      }
    },
    concat: {
      options: {
        separator: '\n\n----\n\n'
      },
      dist: {
        src: ['build/*.md'],
        dest: 'README.md'
      }
    },
    watch: {
      gruntfile: {
        files: '<%= concat.dist.src %>',
        tasks: ['build']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-text-replace');

  grunt.registerTask('build', ['clean', 'replace', 'concat']);
  grunt.registerTask('default', ['build', 'watch']);
};
