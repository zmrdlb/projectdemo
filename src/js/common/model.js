/**
 * @fileoverview io接口配置
 * @version 1.0 | 2016-05-22 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * @return 各种接口的io请求方法
 * */
define(['libio/ioconfig','libio/interio','common/config'],function($ioconfig,$interio,Config){
	/**
	 * 统一处理未登录
	 */
	$ioconfig.login.filter = function(result){
		return result.errcode == 1;
	};
	$ioconfig.login.url = Config.loginurl;

	/**
	 * 所有接口的io业务错误统一处理
	 */
	$ioconfig.error.filter = function(result) {
		return result.errcode != 0;
	};
	$ioconfig.ioargs.fail = function(result){
		alert(result.errmsg || '网络错误');
	};

	/**
	 * 数据接口配置
	 */
	var basehost = Config.modelorgin;
	$ioconfig.setTrans([
		//获取项目列表
        {name: 'subjectlist', args: {url: basehost+'/api/spaces',method:'GET'}},
		//获取项目文件结构
		{name: 'subjectfile', args: {url: basehost+'/api/space/{subjectname}',method:'GET'}},
		//新建项目
		{name: 'subjectadd', args: {url: basehost+'/api/space/{subjectname}',method:'POST'}},
		//删除项目
		{name: 'subjectdelete', args: {url: basehost+'/api/space/{subjectname}',method:'DELETE'}},
		//获取文件
		{name: 'fileget', args: {url: basehost+'/api/space/{subjectname}/{filepath}',method:'GET'}},
		//新增文件
		{name: 'fileadd', args: {url: basehost+'/api/space/{subjectname}/{filepath}',method:'POST'}},
		//更改文件
		{name: 'filechange', args: {url: basehost+'/api/space/{subjectname}/{filepath}',method:'PUT'}},
		//删除文件
		{name: 'filedelete', args: {url: basehost+'/api/space/{subjectname}/{filepath}',method:'DELETE'}},
		//获取当前登录用户信息
        {name: 'userinfo', args: {url: basehost+'/api/user',method:'GET'}},
        //获取上传图片所需的token
        {name: 'uptoken', args: {url: basehost+'/api/uptoken',method:'GET'}}
    ]);

    /**
     * url格式化
     * @example buildUrl('/rer/{sex}/fewr/{id}',{sex:'aa',id:'11'})
     *          返回：/rer/aa/fewr/11
     */
    function buildUrl(url,data,isencode){
        var reg = /\{([a-zA-A]+)\}/g;
        return url.replace(reg, function (all, key) {
            return isencode? encodeURIComponent(data[key]): data[key];
        });
    }
    /**
     * 请求数据层model
     * @param {Object} *opt 传入的参数同$ioconfig.ioargs格式一致，一般是：
         * {
         * 	   data: {}
         *     success
         *     //以下已经有统一处理，如果想覆盖则自行传入
         *     error
         *     fail
         * }
       @param {Object} urlData 针对url里面有{替换参数名}的情况，传入的键值对应数据
     */
    return {
        /**
         * 获取项目列表
         */
        subjectlist: function(opt){
            $interio.transRequest('subjectlist',opt);
        },
		/**
         * 获取项目文件目录结构
         * urlData: {
         *     subjectname 项目名称
         * }
         */
        subjectfile: function(opt,urlData){
            opt.url = buildUrl($ioconfig.getTrans('subjectfile').url,urlData,true);
            $interio.transRequest('subjectfile',opt);
        },
		/**
         * 新建项目
         * urlData: {
         *     subjectname 项目名称
         * }
         */
        subjectadd: function(opt,urlData){
            opt.url = buildUrl($ioconfig.getTrans('subjectadd').url,urlData,true);
            $interio.transRequest('subjectadd',opt);
        },
		/**
         * 删除项目
         * urlData: {
         *     subjectname 项目名称
         * }
         */
        subjectdelete: function(opt,urlData){
            opt.url = buildUrl($ioconfig.getTrans('subjectdelete').url,urlData,true);
            $interio.transRequest('subjectdelete',opt);
        },
		/**
         * 获取文件
         * urlData: {
         *     subjectname 项目名称
         *     filepath 文件路径
         * }
         */
        fileget: function(opt,urlData){
            opt.url = buildUrl($ioconfig.getTrans('fileget').url,urlData,true);
            $interio.transRequest('fileget',opt);
        },
		/**
         * 新增文件
         * urlData: {
         *     subjectname 项目名称
         *     filepath 文件路径
         * }
         */
        fileadd: function(opt,urlData){
            opt.url = buildUrl($ioconfig.getTrans('fileadd').url,urlData,true);
            $interio.transRequest('fileadd',opt);
        },
		/**
         * 更改文件
         * urlData: {
         *     subjectname 项目名称
         *     filepath 文件路径
         * }
         */
        filechange: function(opt,urlData){
            opt.url = buildUrl($ioconfig.getTrans('filechange').url,urlData,true);
            $interio.transRequest('filechange',opt);
        },
		/**
         * 删除文件
         * urlData: {
         *     subjectname 项目名称
         *     filepath 文件路径
         * }
         */
        filedelete: function(opt,urlData){
            opt.url = buildUrl($ioconfig.getTrans('filedelete').url,urlData,true);
            $interio.transRequest('filedelete',opt);
        },
		/**
         * 获取当前用户信息
         */
        userinfo: function(opt){
            $interio.transRequest('userinfo',opt);
        },
        /**
         * 获取上传图片所需token
         */
        uptoken: function(opt){
            $interio.transRequest('uptoken',opt);
        }
    };
});
