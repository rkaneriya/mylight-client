module.exports = function(grunt) { 
    grunt.initConfig({
        concat: {
            css: { 
                src: ['app/css/main.css', 'app/css/dashboard.css', 'app/css/sign-in.css'], 
                dest: 'dist/css/styles.css'
            }
        },
        watch: { 
            css: {
                files: ['app/css/*.css'],
                tasks: ['concat:css'] 
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.registerTask('default', ['concat', 'watch']); 
}; 