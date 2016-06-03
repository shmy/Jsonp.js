function $getJSONP(url, callback) {
    var isTempFunction, callbackName;
    if (typeof(callback) === 'function') {
        // 如果回调是函数类型
        isTempFunction = true;
        // 取得随机函数名
        callbackName = getRandomName(12);
        // 挂载于window对象下
        window[callbackName] = callback;
    } else if (typeof(callback) === 'string') {
        // 如果回调是字符串类型
        isTempFunction = false;
        // 取得函数名
        callbackName = callback;
    } else {
        // 否则滚蛋
        return;
    }
    // 取得节点容器对象
    var head = document.head || document.body;
    // 创建srcipt标签
    var script = document.createElement('script');
    // 指定src
    script.src = url.replace('=?', '=' + callbackName);
    // 当加载完成，失败
    script.onload = script.onerror = function() {
        // 删除在window下面挂载的函数
        if (isTempFunction) {
            try {
                //Chrome Firefox如果失败返回false，IE9以下不支持delete，会直接抛出异常！
                if (!delete window[callbackName]) {
                    //手动抛出异常
                    throw new Error();
                }
            } catch (e) {
                //异常时设置函数为null
                window[callbackName] = null;
            }
        }
        //从head里删除script标签
        try {
            head.removeChild(script);
        } catch (e) {
            console.log(e);
        }
    };
    // 装载进head
    head.appendChild(script);
    // 产生指定长度的随机并符合JavaScript命名规范的字符串
    function getRandomName(length) {
        // 定义字符串
        var chars = 'abcdefghijklmnopqrxtuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        // 临时字符串
        var result = '';
        // 循环添加
        while (length--) {
            result += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        // 返回字符串
        return result;
    }
}