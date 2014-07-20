module.exports = function(grunt) {

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        compass: {
            config: 'config.rb'
        }
    });

    grunt.loadNpmTasks('grunt-contrib-compass');
    
    grunt.registerTask('default', ['compass']);

};