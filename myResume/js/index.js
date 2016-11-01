require('../css/reset.min.css');
require('../swiper/swiper-3.3.1.min.css');
require('../css/index.css');
require('../css/animate.css');
require('../swiper/swiper-3.3.1.min.js');
require('../image/bg.png');
require('../image/avatar.jpeg');
require('../image/music.svg');
require('../image/page1-bottom-left.png');
require('../image/page1-bottom-left-big.png');
require('../image/page1-bottom-middle.png');
require('../image/page1-bottom-middle-big.png');
require('../image/page1-bottom-right.png');
require('../image/page1-middle.png');
require('../image/page1-middle-left.png');
require('../image/page1-middle-right.png');
require('../image/page1-top.png');
require('../image/page1-top1.png');
require('../image/page1-top2.png');
require('../image/page2-info-bottom.png');
require('../image/page2-info-right1.png');
require('../image/page2-info-right2.png');
require('../image/page3-black-point.png');
require('../image/page3-bottom.png');
require('../image/page3-bottom-big.png');
require('../image/page3-cloud.png');
require('../image/page3-cloud1.png');
require('../image/page3-cloud2.png');
require('../image/page4-bottom.png');
require('../image/page4-bottom-big.png');
require('../image/page4-cloud.png');
require('../image/page5-bottom.png');
require('../image/page5-bottom-big.png');
require('../image/page5-bottom-middle.png');
require('../image/page5-middle.png');
require('../image/page5-middle-right.png');
require('../image/page5-top.png');
require('../image/page6-bottom-big-left.png');
require('../image/page6-bottom-left.png');
require('../image/page6-bottom-middle.png');
require('../image/page6-bottom-right.png');
require('../image/page6-middle.png');
require('../image/page6-point.png');
require('../image/page6-qq.png');
require('../image/page6-top.png');
require('../image/page-black-line.png');
require('../image/page-info.png');
require('../image/web-swipe-tip.png');
require('../image/WechatIMG1.jpeg');
//响应式布局
~function () {
    var desW = 640,
        winW = document.documentElement.clientWidth;
    var n = winW / desW;
    var oMain = document.querySelector('.main');
    if (winW > desW) {
        oMain.style.margin = '0 auto';
        oMain.style.width = desW + 'px';
        return
    }
    document.documentElement.style.fontSize = n * 100 + 'px';
}();
//init swiper
new Swiper('.swiper-container', {
    direction: 'vertical',
    loop: true,
    /*切换结束后，给当前展示的区域添加对应的ID，由此实现对应的动画效果*/
    onSlideChangeEnd: function (swiper) {
        var slideAry = swiper.slides;//获取当前一共有多少个slide,包含loop模式下前后追加的
        var curIn = swiper.activeIndex;//当前展示这个区域的索引;

        var total = slideAry.length;//具体个数
        var targetId = 'page';
        switch (curIn) {
            case 0:
                targetId += (total - 2);
                break;
            case (total - 1):
                targetId += 1;
                break;
            default :
                targetId += curIn;
        }
        //给当前的活动块设置ID
        [].slice.call(slideAry).forEach(function (item, index) {
            if (curIn === index) {
                item.id = targetId;
                return;
            }
            item.id = null;
        });
    }
});

//music 音频处理
~function () {
    var musicMenu = document.getElementById('musicMenu'),
        musicAudio = document.getElementById('musicAudio');
    musicMenu.addEventListener('click',function () {
        if(musicAudio.paused){//处于暂停状态
            musicAudio.play();
            musicMenu.className = 'music move';
            return
        }
        musicAudio.pause();
        musicMenu.className = 'music';
    },false);
    //控制音乐播放
    function ctrlMusic() {
        musicAudio.volume = .3;
        musicAudio.play();
        musicAudio.addEventListener('canplay', function () {
            musicMenu.style.display = 'block';
            musicMenu.className = 'music move';
        },false)
    }
    //防止页面加载时就播放
    window.setTimeout(ctrlMusic, 1000)
}();
