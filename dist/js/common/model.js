define(["libio/ioconfig","libio/interio","common/config"],function(e,t,n){function i(e,t,n){var r=/\{([a-zA-A]+)\}/g;return e.replace(r,function(e,r){return n?encodeURIComponent(t[r]):t[r]})}e.login.filter=function(e){return e.code=="A0002"},e.login.url=n.loginurl,e.error.filter=function(e){return e.code!="A0001"},e.ioargs.fail=function(e){alert(e.errmsg||"网络错误")},e.ioargs.crossDomain=!0;var r=n.modelorgin;return e.setTrans([{name:"main",args:{url:r+"/tracer/main/trace/{id}",method:"GET"}},{name:"userinfo",args:{url:r+"/userinfo",method:"GET"}}]),{main:function(n,r){n.url=i(e.getTrans("main").url,r,!0),t.transRequest("main",n)},userinfo:function(e){t.transRequest("userinfo",e)}}});