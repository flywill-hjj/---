var time;
var iIndex = 1;//记录当前第几步,总共5步
/* 路线图铺建 */
//保存路线一的信息
/**
 * 存储路线的下标
 * 0.路线一
 * 1.路线二
 * 2.路线三
 * 3.路线四
 */
var pathBottom = [[], [], [], []];
var path1 = $('.path1 img');    //路线一
var path2 = $('.path2 img');    //路线二
var path3 = $('.path3 img');    //路线三
var path4 = $('.path4 img');    //路线四

/**
 * 存储小鸽子点位下标，以及方向
 * left 0
 * bottom 1 
 * go(n)  1,11,21,31
 */
var duckling = [['1.85rem', '4.07rem', 11], ['4.37rem', '6.09rem', 11], ['5.9rem', '3.52rem', 21]]
/**
 * 存储小圆点坐标
 * left 0
 * bottom 1
 */
var dot = [['4.27rem', '6.18rem'], ['5.84rem', '3.67rem'], ['3.57rem', '3.2rem']]

/* 电话号码 */
var phone = []
var sPhone = $('.phone img');
toHidden(sPhone, phone);
/* WiFi */
var WiFi = []
var sWiFi = $('.WiFi img');
toHidden(sWiFi, WiFi);
/* 金币 */
var gold = []
var sGold = $('.gold img');
toHidden(sGold, gold);
/* 建筑物 */
var buildings = []
var sBuildings = $('.buildings img');
toHidden(sBuildings, buildings);

/* 大风车转起来 */
pinwheel();
/* 隐藏路线 */
toHidden(path1, pathBottom[0])
toHidden(path2, pathBottom[1])
toHidden(path3, pathBottom[2])
toHidden(path4, pathBottom[3])

/* 显现建筑物 */
function showBuilding(path, arr, a, b) {
  //开启图层蒙版
  $('.mark').css('display', 'block')
  for (let j = 0; j < arr.length; j++) {
    setTimeout(() => {
      var oldBottom = arr[j].bottom;
      $(path[j]).animate({
        bottom: parseFloat(oldBottom)
      }, 2000, function () {
        if (j === arr.length - 1) {
          //关闭图层蒙版
          $('.mark').css('display', 'none');
          //创建第一条路线
          cratePath(a, b);
        }
      })
    }, j * 100);
  }
}
//小鸽子运动路线一
function route1() {
  $(".duckling").animate({
    left: "2.09rem",
    bottom: "1.06rem"
  }, 3000, "linear", function () {
    go(11);
  }).animate({
    left: "3.09rem",
    bottom: "1.63rem"
  }, 2000, "linear", function () {
    go(1);
  }).animate({
    left: "0.84rem",
    bottom: "2.93rem"
  }, 5000, "linear", function () {
    go(11);
  }).animate({
    left: "1.85rem",
    bottom: "4.07rem"
  }, 3000, "linear", function () {
    //停止定时器
    clearInterval(time)
    //暂停声音
    playOrPaused2();
    //创建第二条路线
    showBuilding(sPhone, phone, path2, pathBottom[1]);
    /* 第一个点位点击 */
    $('.z09').click(function () {
      changeDuckling(0);
    })
  })
}
//小鸽子运动路线二
function route2() {
  $(".duckling").animate({
    left: "1.40rem",
    bottom: "4.40rem"
  }, 1000, "linear", function () {
    go(11);
  }).animate({
    left: "4.37rem",
    bottom: "6.09rem"
  }, 7000, "linear", function () {
    //停止定时器
    clearInterval(time)
    playOrPaused2();
    //创建第三条路线
    showBuilding(sWiFi, WiFi, path3, pathBottom[2]);
    /* 第二个点位点击 */
    $('.z30').click(function () {
      changeDuckling(1)
    })
  })
}
//小鸽子运动路线三
function route3() {
  $(".duckling").animate({
    left: "5.34rem",
    bottom: "4.95rem"
  }, 3000, "linear", function () {
    go(31);
  }).animate({
    left: "4.36rem",
    bottom: "4.37rem"
  }, 2500, "linear", function () {
    go(21);
  }).animate({
    left: "5.9rem",
    bottom: "3.52rem"
  }, 3000, "linear", function () {
    //停止定时器
    clearInterval(time)
    playOrPaused2();
    //创建第四条路线
    showBuilding(sGold, gold, path4, pathBottom[3]);
    /* 第三个点位点击 */
    $('.z15').click(function () {
      changeDuckling(2)
    })
  })
}
//小鸽子运动路线四
function route4() {
  $(".duckling").animate({
    left: "4.5rem",
    bottom: "2.26rem"
  }, 4000, "linear", function () {
    go(1);
  }).animate({
    left: "3.62rem",
    bottom: "3.10rem"
  }, 2000, "linear", function () {
    //停止定时器
    go(31);
    clearInterval(time);
    playOrPaused2();
    //关闭小圆点
    $('.dot').css('display', 'none');
    //结束效果
    end();
  })
}

/**
 * 结束效果
 */
var time2 = null;

function end() {
  $('.duckling').animate({
    bottom: parseFloat($('.duckling').css('bottom')) - 20
  }, 999)
  $('.z12').animate({
    bottom: parseFloat($('.z12').css('bottom')) - 20
  }, 1000, function () {
    end2();
    //升天
    var audio3 = document.querySelector('.audio3');
    audio3.play();
  })
}
// end2();
function end2() {
  var all = $('.ladder img').not('.z12');
  var ii = 100;
  time2 = setInterval(function () {
    $.each(all, (index, item) => {
      var oldBottom2 = parseFloat($(item).css("bottom")) - 5;
      $(item).css("bottom", oldBottom2);
      $('.bigBox').css('background-position', `0 ${ii}%`);
      console.log(ii);
      if (ii == 0) {
        //升天结束
        clearInterval(time2);
        $('.div_end').css('display', 'block');
        //星球出没
        $('.star div').css('display', 'block');
        setTimeout(() => {
          $('.star div').addClass('active');
        }, 1000)
      }
    })
    ii--;
  }, 50);
}

/**
 * 1------左上
 * 11-----右上
 * 21-----右下
 * 31-----左下
 * @param {Number} i 控制方向的数字 
 */
function go(i) {
  //开启图层蒙版
  $('.mark').css('display', 'block')
  var _i = i;
  var x = iIndex % 10 != 5 ? iIndex % 10 - 1 : 0;
  i = i + x;
  clearInterval(time)
  $('.img').attr('src', `./image/duckling/gz${i}.png`)
  i++;
  //每次调用函数都清空定时器
  time = setInterval(() => {
    $('.img').attr('src', `./image/duckling/gz${i}.png`)
    if (i < _i + 4) {
      i++
    } else {
      i = _i;
    }
    iIndex = i % 10;
    console.log(i);
  }, 150);
}

//大风车运动
function pinwheel() {
  //大风车的运动
  var arr = ['a', 'b', 'c']
  var k = 0
  setInterval(() => {
    $('.z18').attr('src', `./image/z18-${arr[k == 3 ? k = 0 : k++]}.png`);
  }, 50)
}

//隐藏路线
function toHidden(path, arr) {
  $.each(path, function (index, item) {
    //获取每个路块的高度,和bottom值
    var obj = {};
    obj.height = $(item).css('height');
    obj.bottom = $(item).css('bottom');
    arr.push(obj);

    //让每个路快都往下隐藏------高度加上原先的bottom
    var newBottom = -parseFloat(obj.height + obj.bottom);
    $(item).css('bottom', newBottom);
  })
}

//显现路线
function cratePath(path, arr) {
  //开启声音
  playOrPaused1(1);
  //开启图层蒙版
  $('.mark').css('display', 'block')
  for (let j = 0; j < arr.length; j++) {
    setTimeout(() => {
      var oldBottom = arr[j].bottom;
      var date = 1000 + j * 200;
      $(path[j]).animate({
        bottom: parseFloat(oldBottom) + 20 + j * 2
      }, date).animate({
        bottom: oldBottom
      }, 500, function () {
        if (j === arr.length - 1) {
          //关闭图层蒙版
          //关闭声音
          playOrPaused1(2);
          $('.mark').css('display', 'none')
          $('.dot').css('display', 'block');
        }
      })
    }, j * 150);
  }
}

//鸽子的声音
function playOrPaused2() {
  var audio = document.querySelector('.audio2');
  if (audio.paused) {
    audio.play();
    return;
  }
  audio.pause();
}
//石头的声音
function playOrPaused1(n) {
  var audio = document.querySelector('.audio1');
  if (n === 1) {
    audio.play();
  } else {
    audio.pause();
  }
}
/**
 * 0------第二次位置
 * 1------第三次位置
 * 2------第四次位置
 * @param {Number} n 小圆点显示的位置 
 */
function changeDot(n) {
  var left = dot[n][0];
  var bottom = dot[n][1];
  $('.dot').css('left', left);
  $('.dot').css('bottom', bottom);
}
/**
 * 0-------第一次位置
 * 1-------第二次位置
 * 2-------第三次位置
 * @param {Number} n 小鸽子显示的位置
 */
function changeDuckling(n) {
  var left = duckling[n][0];
  var bottom = duckling[n][1];
  $('.duckling').css('left', left);
  $('.duckling').css('bottom', bottom);
  go(duckling[n][2]);
  clearInterval(time);
  $('.mark').css('display', 'none');
}
/* 小圆点的点击 */
var index = 0;
$('.dot').click(function () {
  playOrPaused2();
  switch (index) {
    case 0:
      //关闭小圆点
      $('.dot').css('display', 'none');
      changeDot(0);
      go(1);
      route1();
      index++
      break;
    case 1:
      $('.dot').css('display', 'none');
      changeDot(1);
      changeDuckling(0)
      go(1);
      route2();
      index++
      break;
    case 2:
      $('.dot').css('display', 'none');
      changeDot(2);
      changeDuckling(1);
      go(21);
      route3();
      index++
      break;
    case 3:
      changeDuckling(2);
      go(31);
      route4();
      index++
      break;
  }
})

console.log(pathBottom);


