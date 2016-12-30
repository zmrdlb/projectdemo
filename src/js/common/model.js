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
		return result.code == 'A0002';
	};
	$ioconfig.login.url = Config.loginurl;

	/**
	 * 所有接口的io业务错误统一处理
	 */
	$ioconfig.fail.filter = function(result) {
		return result.code != 'A0001';
	};
	$ioconfig.iocall.fail = function(result){
		alert(result.errmsg || '网络错误');
	};

	$ioconfig.ioargs.crossDomain = true;
	/**
	 * 数据接口配置
	 */
	var basehost = Config.modelorgin;

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
	 * @param {Object} ioargs 传入的参数同$ioconfig.ioargs格式一致，一般是：
		 * {
		 * 	   data: {}
		 * }
	   @param {JSON} *iocall 传入的参数同$ioconfig.iocall格式一致，一般是：
	   * {
	   *     success
	   *     complete
	   *     //以下已经有统一处理，如果想覆盖则自行传入
	   *     error
	   *     fail
	   * }
	   @param {Object} urlData 针对url里面有{替换参数名}的情况，传入的键值对应数据
	 */
	return {
		/**
		 * 获取项目文件目录结构
		 * urlData: {
		 *     id
		 * }
		 */
		main: function(ioargs,iocall,urlData){
			var _url = buildUrl(basehost+'/tracer/main/trace/{id}',urlData,true);
			$interio.transRequest($.extend({
				url: _url,
				method:'GET'
			},ioargs),iocall);
		},
		/**
		 * 列表数据
		 */
		listdata: function(ioargs,iocall){
			$interio.transRequest($.extend({
				url: basehost+'/listdata',
				method:'POST'
			},ioargs),iocall);
		}
	};
});
