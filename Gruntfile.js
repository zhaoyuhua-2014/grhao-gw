module.exports = function (grunt) {

    var encoding = { encoding : 'utf-8' };

    grunt.initConfig({
        uglify: {
            my_target: {
                files: [{
                    expand: true,
                    cwd: 'lib',
                    src: '**/*.js',
                    dest: 'dest'
                }]
            }
        },
        cssmin : {
            css : {
                src : 'css/base.css',
                dest : 'css/base.min.css'
            }
        },
        clean : {
            js : {
                src : ['dest']
            },
            css : ['css/base.min.css']
        },
        watch:{
            js:{
                files:['lib/*.js'],
                tasks:['uglify'],
            },
            options: {  
                debounceDelay: 1000  
            },
            css : {
                files:['css/base.css'],
                tasks:['cssmin'],
            }
        },
    });
    var recive = function recive( pathname, reg, pattern ){
        return grunt.file.read( pathname, encoding ).replace( reg, pattern )
    }
    grunt.registerTask( 'path', 'switch jsvascript catalog', function(sym){
        var pathname = 'seajs-config.js';
        var reg = /base\s*\:\s*\'(.+)\'/g;

        // recive( pathname, reg, "base : 'lib\/'");
		var seajsConfig;

        switch( sym ){
            case 'lib' : seajsConfig = recive( pathname, reg, "base : 'lib\/'"); break;
            case 'dest' : seajsConfig = recive( pathname, reg, "base : 'dest\/'"); break;
            default : grunt.log.write( seajsConfig.match( reg ) );
        }
        grunt.file.write( pathname, seajsConfig, encoding );
    });
    grunt.registerTask('tip','tip',function(){
        grunt.log.write('自定义命令 : \n  api: 切换接口地址 \n     参数列表\n\tdev -> 测试\n\tloc -> 本地 \n\tpro -> 正式');
    });

    grunt.registerTask('api','adress , type',function( address ,type ){
        var pathname = ['dest/join_us_from.html','dest/join.html','mobile/join_us_from.html','mobile/join.html'];
        //var reg = /[\'|\"](http\:\/\/.+(\/server\/api\.do)[\'|\"]\,.*)/g;
        var reg = /(API).*[\:].*[\,].*/g;
        
        var json = {
            dev : ['API:'+'"http://61.164.118.194:8090/grh_api/server/api.do"',' 测试'],
            loc : ['API:'+'"http://192.168.1.8:8080/grh_api/server/api.do"',' 本地'],
            // loc : ["http://192.168.0.135:8080/grh_api/server/api.do",' 本地'],
            // loc : ["http://192.168.1.12:8080/server/api.do",' 本地'],
            pro : ['API:'+'"http://api.grhao.com/server/api.do"',' 正式']
        };
        if (!type) {
        	var commonJs = grunt.file.read( pathname[0], encoding );
	            !address ? grunt.log.write( commonJs.match( reg ) ) : grunt.file.write(
	                   pathname[0], 
	                   commonJs.replace( reg, json[address][0] + '\, \/\/' + json[address][1])
	               ); 
	        var commonJs1 = grunt.file.read( pathname[1], encoding );
	            !address ? grunt.log.write( commonJs1.match( reg ) ) : grunt.file.write(
	                   pathname[1], 
	                   commonJs1.replace( reg, json[address][0] + '\, \/\/' + json[address][1])
	               );
	        var commonJs2 = grunt.file.read( pathname[2], encoding );
	            !address ? grunt.log.write( commonJs2.match( reg ) ) : grunt.file.write(
	                   pathname[2], 
	                   commonJs2.replace( reg, json[address][0] + '\, \/\/' + json[address][1])
	               );
	        var commonJs3 = grunt.file.read( pathname[3], encoding );
	            !address ? grunt.log.write( commonJs3.match( reg ) ) : grunt.file.write(
	                   pathname[3], 
	                   commonJs3.replace( reg, json[address][0] + '\, \/\/' + json[address][1])
	               ); 
        }
        if (type == "web") {
        	var commonJs = grunt.file.read( pathname[0], encoding );
	            !address ? grunt.log.write( commonJs.match( reg ) ) : grunt.file.write(
	                   pathname[0], 
	                   commonJs.replace( reg, json[address][0] + '\, \/\/' + json[address][1])
	               ); 
	        var commonJs1 = grunt.file.read( pathname[1], encoding );
	            !address ? grunt.log.write( commonJs1.match( reg ) ) : grunt.file.write(
	                   pathname[1], 
	                   commonJs1.replace( reg, json[address][0] + '\, \/\/' + json[address][1])
	               );
        }
        if (type == "mobile") {
        	 var commonJs2 = grunt.file.read( pathname[2], encoding );
	            !address ? grunt.log.write( commonJs2.match( reg ) ) : grunt.file.write(
	                   pathname[2], 
	                   commonJs2.replace( reg, json[address][0] + '\, \/\/' + json[address][1])
	               );
	        var commonJs3 = grunt.file.read( pathname[3], encoding );
	            !address ? grunt.log.write( commonJs3.match( reg ) ) : grunt.file.write(
	                   pathname[3], 
	                   commonJs3.replace( reg, json[address][0] + '\, \/\/' + json[address][1])
	               ); 
        }
        
         
    });
	//更新每个HTML下面的seajs保证微信下清除缓存
	grunt.registerTask('html','html time',function( time ){
		var pathdir = 'html/';
		//var reg = /<script.*?(src=\".*?seajs-config\.js).*?<\/script>/g;
		var reg = /seajs-config\.js.*?\"/g
		var filebody = '';
		//首页
		filebody = grunt.file.read( 'index.html', encoding ).replace(reg,'seajs-config\.js?v='+time+'\"');
		grunt.file.write( 'index.html', filebody, encoding );
		
		grunt.file.recurse(pathdir, function(abspath){
			filebody = recive(abspath,reg,'seajs-config\.js?v='+time+'\"');
			grunt.file.write( abspath, filebody, encoding );
		})
	});
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
}