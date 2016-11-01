//头部滑出效果
;(function () {//头部滑出效果
    var tabLi = document.getElementsByClassName("tabLi"),
        myJD = document.getElementById("myJD"),
        em = document.getElementsByTagName("em"),
        tabDiv = document.getElementsByClassName("tabDiv");
    for (var i = 0; i < tabLi.length; i++) {
        (function (i) {
            tabLi[i].onmouseover = function () {
                tabDiv[i].style.display = "block";
                // this.className = "myLi";
                console.log(this.className);
                em[i].innerHTML = "∧";
            };
            tabLi[i].onmouseout = function () {
                tabDiv[i].style.display = "none";
                // this.className = "";
                em[i].innerHTML = "∨";
            };
        })(i);
    }
})();
//购物车
(function () {
    var shop = document.getElementById("shop"),
        shopCar = document.getElementById("shopCar"),
        shopCa = document.getElementById("shopCa");
    shop.onmouseover = function () {
        shopCa.style.display = "block";
        shopCar.className = "shopCar";
    };
    shop.onmouseout = function () {
        shopCa.style.display = "none";
        shopCar.className = "";
    };
})();
//横向菜单
(function () {
    var leftNav = document.getElementById("leftNav");
    var oLis = leftNav.getElementsByTagName("li");
    var leftNavDivs = document.getElementsByClassName("leftNavDiv");
    for (var i = 0; i < oLis.length; i++) {
        oLis[i].daha = i;
        oLis[i].onmouseenter = function () {
            this.style.backgroundColor = "#fff";
            utils.addClass(leftNavDivs[this.daha], "select");
            utils.addClass((utils.children(this, "a")[0]), "select");
            var t = utils.offset(leftNavDivs[this.daha]).top;
            var st = document.body.scrollTop;
            leftNavDivs[this.daha].style.top = st < t ? t : st;
        };
        oLis[i].onmouseleave = function () {
            this.style.backgroundColor = "";
            utils.removeClass(leftNavDivs[this.daha], "select");
            utils.removeClass((utils.children(this, "a")[0]), "select");
        }
    }
})();
/*(function () {
 var leftNav = document.getElementById('leftNav'),
 leftNavDiv = document.getElementById('leftNavDiv');
 leftNav.onmouseenter = function (e) {
 e = e || window.event;
 var tar = e.target || e.srcElement,
 tarTag = tar.tagName.toUpperCase();
 if (tarTag === 'LI' && tarTag.parentNode.id === 'parent') {
 leftNavDiv.style.display = 'block';
 }
 };
 leftNav.onmouseout = function () {
 leftNavDiv.style.display = 'none';
 }
 })();*/
//轮播图
(function () {
    var banner = document.getElementsByClassName("banner")[0];
    var bannerInner = banner.getElementsByTagName("div")[0];
    var bannerTip = banner.getElementsByTagName("ul")[0],
        bannerLink = utils.children(banner, "a"),
        bannerLeft = bannerLink[0],
        bannerRight = bannerLink[1];
    var divList = bannerInner.getElementsByTagName("div"),
        imgList = bannerInner.getElementsByTagName("img"),
        oLis = bannerTip.getElementsByTagName("li");

    var jsonData = null;
    var xhr = new XMLHttpRequest();
    xhr.open("get", "json/banner.json", false);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == 4 && /^2\d{2}$/.test(xhr.status)) {
            var jsonStr = xhr.responseText;
            jsonData = utils.formatJSON(jsonStr);
        }
    };
    xhr.send(null);
    var str = "", str2 = "";
    if (jsonData) {
        for (var i = 0, len = jsonData.length; i < len; i++) {
            var curData = jsonData[i];
            str += "<div><img src='' trueImg='" + curData["img"] + "'/></div>";
            i === 0 ? str2 += "<li class='bg'>" + (i + 1) + "</li>" : str2 += "<li>" + (i + 1) + "</li>";
        }
    }
    bannerInner.innerHTML = str;
    bannerTip.innerHTML = str2;
    window.setTimeout(lazyImg, 500);
    function lazyImg() {
        for (var i = 0, len = imgList.length; i < len; i++) {
            ~function (i) {
                var curImg = imgList[i];
                var oImg = new Image;
                oImg.src = curImg.getAttribute("trueImg");
                oImg.onload = function () {
                    curImg.src = this.src;
                    curImg.style.display = "block";
                    //->只对第一张做处理:z-index=1 opacity=1
                    if (i === 0) {
                        var curDiv = curImg.parentNode;
                        curDiv.style.zIndex = 1;
                        animate(curDiv, {opacity: 1}, 200);
                    }
                    oImg = null;
                }
            }(i);
        }
    }

    var interval = 2000, autoTimer = null, step = 0;//->记录当前展示图片的索引
    autoTimer = window.setInterval(autoMove, interval);
    function autoMove() {
        if (step === (jsonData.length - 1)) {
            step = -1;
        }
        step++;
        setBanner();
    }

    function setBanner() {
        for (var i = 0, len = divList.length; i < len; i++) {
            var curDiv = divList[i];
            if (i === step) {
                utils.css(curDiv, "zIndex", 1);
                zhufengAnimate(curDiv, {opacity: 1}, 200, function () {
                    var curDivSib = utils.siblings(this);
                    for (var k = 0, len = curDivSib.length; k < len; k++) {
                        utils.css(curDivSib[k], "opacity", 0);
                    }
                });
                continue;
            }
            utils.css(curDiv, "zIndex", 0);
        }
        for (i = 0, len = oLis.length; i < len; i++) {
            var curLi = oLis[i];
            i === step ? utils.addClass(curLi, "bg") : utils.removeClass(curLi, "bg");
        }
    }

    banner.onmouseover = function () {
        window.clearInterval(autoTimer);
        bannerLeft.style.display = bannerRight.style.display = "block";
    };
    banner.onmouseout = function () {
        autoTimer = window.setInterval(autoMove, interval);
        bannerLeft.style.display = bannerRight.style.display = "none";
    };
    ~function () {
        for (var i = 0, len = oLis.length; i < len; i++) {
            var curLi = oLis[i];
            curLi.index = i;
            curLi.onclick = function () {
                step = this.index;
                setBanner();
            }
        }
    }();
    bannerRight.onclick = autoMove;
    bannerLeft.onclick = function () {
        if (step === 0) {
            step = jsonData.length;
        }
        step--;
        setBanner();
    }
})();
//轮播图右侧选项卡
(function () {
    var big = document.getElementById("big");
    var bigLis = utils.children(big, "li");
    var bigDiv = document.getElementsByClassName("small");
    for (var i = 0; i < bigLis.length; i++) {
        bigLis[i].daha = i;
        bigLis[i].onmouseenter = function () {
            for (var i = 0; i < bigLis.length; i++) {
                utils.removeClass(bigLis[i], "select");
                utils.removeClass(bigDiv[i], "smallSelect");
            }
            utils.addClass(bigLis[this.daha], "select");
            utils.addClass(bigDiv[this.daha], "smallSelect");
        }
    }
})();
//一楼
(function () {
    var clothesTop = document.getElementsByClassName("clothes-top")[0];
    var lis = clothesTop.getElementsByTagName("li");
    for (var i = 0; i < lis.length; i++) {
        lis[i].onmouseenter = function () {
            for (var k = 0; k < lis.length; k++) {
                utils.removeClass(lis[k], "bg");
            }
            var oSpan = this.getElementsByTagName("span")[0];
            utils.addClass(this, "bg");
            oSpan.style.backgroundColor = "transparent";
        };
        lis[i].onmouseleave = function () {
            var oSpan = this.getElementsByTagName("span")[0];
            oSpan.style.backgroundColor = "#ccc";

        }
    }
})();