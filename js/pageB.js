/**
 * Created by james on 2016/11/8.
 */

function pageB (element, pageComplete) {
    //圣诞男孩
    var $boy = element.find(".christmas-boy");
    var $girl = element.find(".girl");

    var animationEnd = "animationend webkitAnimationEnd";

    /*小男孩动作*/
    var boyAction = {
        //走路
        walk: function() {
            var dfd = $.Deferred();
            $boy.transition({
                "right": "4.5rem"
            }, 4000, "linear", function() {
                dfd.resolve()
            });
            return dfd;
        },
        //停止走路
        stopWalk: function() {
            $boy.removeClass("boy-walk");
            $boy.addClass("boy-stand");
        },
        //继续走路
        runWalk: function() {
            $boy.addClass("walk-run");
        },
        //解开包裹
        unwrap: function () {
            var dfd =$.Deferred();
            $boy.addClass("boy-unwrap");
            $boy.removeClass("boy-stand");
            $boy.one(animationEnd, function() {
                dfd.resolve();
            });
            return dfd;
        },
        //脱衣动作
        //1-3
        strip: function(count) {
            $boy.addClass("boy-strip-" + count).removeClass("boy-unwrap");
        },
        //人物拥抱 重叠问题处理
        hug: function() {
            $boy.addClass("boy-hug").one(animationEnd, function() {
                $(".christmas-boy-head").show()
            })
        }
    };

    /*小女孩动作*/
    var girlAction = {
        //小女起立
        standUp: function () {
            var dfd = $.Deferred();
            //起立
            setTimeout(function () {
                $girl.addClass("girl-standUp");
            }, 200);
            //抛书
            setTimeout(function () {
                $girl.addClass("girl-throwBook");
                dfd.resolve()
            }, 500);
            return dfd;
        },

        //走路
        walk: function(callback) {
            var dfd = $.Deferred();
            //小女孩走路
            $girl.addClass("girl-walk");
            $girl.transition({
                "left": "4.5rem"
            }, 4000, "linear", function() {
                dfd.resolve()
            });
            return dfd;
        },
        //停止走路
        stopWalk: function() {
            $girl.addClass("walk-stop")
                .removeClass("girl-standUp")
                .removeClass("girl-walk")
                .removeClass("girl-throwBook")
                .addClass("girl-stand")
        },
        //选择3d
        choose: function(callback) {
            $girl.addClass("girl-choose")
                .removeClass("walk-stop");
            $girl.one(animationEnd, function() {
                callback();
            })
        },
        //泪奔
        weepWalk: function(callback) {
            $girl.addClass("girl-weep");
            $girl.transition({
                "left": "7rem"
            }, 1000, "linear", function() {
                $girl.addClass("walk-stop").removeClass("girl-weep");
                callback();
            })
        },
        //拥抱
        hug: function() {
            $girl.addClass("girl-hug").addClass("walk-run")
        }
    };

    //3d旋转节点
    var $carousel = element.find("#carousel");


    //开始走路
    // boyAction
    //     .walk()
    //     .then(function() {
    //         //停止走路
    //         boyAction.stopWalk()
    //     })
    //     .then(function() {
    //         //解开包裹
    //         return boyAction.unwrap()
    //     })
    //     .then(function() {
    //         //脱衣动作
    //         setTimeout(function() {
    //             boyAction.strip(1)
    //         }, 1000);
    //         setTimeout(function() {
    //             boyAction.strip(2)
    //         }, 2000);
    //         setTimeout(function() {
    //             boyAction.strip(3)
    //         }, 3000);
    //         //人物重叠问题
    //         setTimeout(function() {
    //             boyAction.hug()
    //         }, 4000);
    //     });
    //
    // girlAction
    //     .standUp()
    //     .then(function() {
    //         //女孩停止走路
    //         return girlAction.stopWalk();
    //     })
    //     .then(function() {
    //         //女孩走路
    //         return girlAction.walk();
    //     })
    //     .then(function(){
    //         //选择
    //         girlAction.choose(function() {
    //             //继续走路
    //             girlAction.weepWalk(function() {
    //                 //拥抱
    //                 girlAction.hug();
    //             })
    //         })
    //     })
    //     .then(function () {
    //         setTimeout(function() {
    //             carousel.run(i++)
    //             carousel.run(i++)
    //             carousel.run(i++)
    //         }, 6000);
    //         setTimeout(function() {
    //             pageComplete();
    //         }, 13000);
    //     });

    //开始走路
    boyAction
        .walk()
        .then(function() {
            //停止走路
            boyAction.stopWalk()
        })
        .then(function() {
            //解开包裹
            return boyAction.unwrap()
        })
        .then(function() {
            //脱衣动作
            setTimeout(function() {
                boyAction.strip(1)
            }, 4000);
            setTimeout(function() {
                boyAction.strip(2)
            }, 5000);
            setTimeout(function() {
                boyAction.strip(3)
            }, 6000);
            //人物重叠问题
            setTimeout(function() {
                boyAction.hug()
            }, 7000);
        });

    girlAction
        .standUp()
        .then(function() {
            //女孩停止走路
            return girlAction.stopWalk();
        })
        .then(function() {
            //女孩走路
            return girlAction.walk();
        })
        .then(function(){
            //选择
            return girlAction.choose(function() {
                //旋转木马对象
                var carousel = new Carousel($carousel, {
                    imgUrls: [
                        "http://www.sunnylinner.com/Games/Christmas love//images/b/carousel1.png",
                        "http://www.sunnylinner.com/Games/Christmas love//images/b/carousel2.png",
                        "http://www.sunnylinner.com/Games/Christmas love//images/b/carousel3.png"
                    ]
                });
                //var i = 0;
                var i = 1;
                carousel.run(1, function () {
                    carousel.run(2, function() {
                        carousel.run(3, function() {
                            carousel.displayStyle()
                        })
                    })
                });
            })
        })
        .then(function() {
            setTimeout(function() {
                //继续走路
                girlAction.weepWalk(function() {
                    //拥抱
                    girlAction.hug()
                })
            }, 7000);
            setTimeout(function() {
                pageComplete();
            }, 10000);
        })
}