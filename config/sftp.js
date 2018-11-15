module.exports = {
	//部署服务器上,sftp
	devDist: {
		//部署到服务器的路径
		remotePath: '/usr/local/java/apache-tomcat-8.0.47/webapps/ROOT/demo',
		//ip地址
		host: 'xxx.xxx.xxx.xx',
		//帐号
		user: 'root',
		//密码
		pass: 'xxx',
		//端口
		port: 22
	},
	//程序编译好路径
	publicPath: '/dist/'
}
