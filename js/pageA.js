/**
 * Created by james on 2016/11/8.
 */

function pageA (callback) {
    //模拟执行时间
    setTimeout(function() {
        callback()
    }, 2000)
}