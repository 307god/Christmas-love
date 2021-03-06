/**
 * Created by james on 2016/11/8.
 * 圣诞主题效果
 */

/**
 * 切换页面
 * 模拟镜头效果
 * @param element
 * @param effect
 * @param callback
 */
function changePage(element, effect, callback) {
    element
        .addClass(effect)
        .one("animationend webkitAnimationEnd", function () {
            callback && callback()
        })
}

var Christmas = function() {
    //页面容器元素
    var $pageA = $(".page-a");
    var $pageB = $(".page-b");
    var $pageC = $(".page-c");

    //观察者
    var observer = new Observer();

    var audio1 = $("#audio1")[0];
    var audio2 = $("#audio2")[0];
    audio1.play();

    //A场景页面
    new pageA($pageA, function () {
        observer.publish("completeA");
    });

    //进入B场景
    observer.subscribe("pageB", function () {
        new pageB($pageB, function() {
            observer.publish("completeB");
        })
    });

    //进入C场景
    observer.subscribe("pageC", function () {
        new pageC()
    });

    //页面A-B场景切换
    observer.subscribe("completeA", function() {
        changePage($pageA, "effect-out", function() {
            audio1.pause();
            audio2.play();
            observer.publish("pageB");
        })
    });
    //页面B-C场景切换
    observer.subscribe("completeB", function() {
        changePage($pageC, "effect-in", function() {
            audio2.pause();
            observer.publish("pageC");
        })
    })
};

// function HTML5Audio(url, loop) {
//     var audio = new Audio(url);
//     audio.autoplay = true;
//     audio.loop = loop || false; //是否循环
//     audio.play();
//     return {
//         end: function(callback) {
//             audio.addEventListener('ended', function() {
//                 callback()
//             }, false);
//         }
//     }
// }

// $(function() {
//     $("button:eq(1)").click(function() {
//         //背景音乐
//         var audio1 = HTML5Audio("http://www.sunnylinner.com/Games/Music/Media/407.mp3");
//         audio1.end(function() {
//             alert("音乐结束")
//         })
//     });
//     $("button:eq(2)").click(function() {
//         //循环播放
//         HTML5Audio("http://www.sunnylinner.com/Games/Music/Media/407.mp3", true)
//     })
// });

$(function() {
    var num = 0;
    $(".container").click(function () {
        if (num === 0)
        Christmas();
        num = 1;
    });
    // $(".container").click(function () {
    //     Christmas()
    // });
    // Christmas()
});
