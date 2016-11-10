/**
 * @fileoverview 所有页面全局js
 * @version 1.0 | 2016-05-22 版本信息
 * @author Zhang Mingrui | 592044573@qq.com
 * */

/**
 * requirejs配置
 */

requirejs.config({
    baseUrl: '../js',
    paths: {
        'jquery': 'widget/lib/jquery-1.11.3.min',
        'libio': 'widget/io',
        'libjson': 'widget/util/json',
        'libchannel': 'widget/util/channel',
        'liblayers': 'widget/ui/layer',
        'libinherit': 'widget/util/inherit',
        'libevt': 'widget/util/evt',
        'libdom': 'widget/util/dom',
        'libcompatible': 'widget/util/compatible',
        'libload': 'widget/util/load',
        'libbase': 'widget/util/base',
        'libstr': 'widget/util/str',
        'libclassdesign': 'widget/util/classdesign',
        'libtpl': 'widget/util/tpl',
        'libpage': 'widget/ui/page',
        'libtab': 'widget/ui/tab'
    },
    map: {
        '*': {
            'text': 'widget/lib/require.text'
        }
    }
});

define('$',['jquery'],function($){
    return $;
});
