window.onload = function () {
  var Div1 = document.getElementById("div1");
  var Ball = document.getElementById("ball");
  var Bat = document.getElementById("bat");
  var oBrick = document.getElementById("brick");
  var oBricks = oBrick.getElementsByTagName("div");
  drapX(Bat);
  createBrick(54);
  //小球运动

  //随机速度
  var speedX = parseInt(Math.random() * 4) + 4;
  //垂直方向的随机速度
  var speedY = -(parseInt(Math.random() * 3) + 4);
  setInterval(function () {
    Ball.style.left = Ball.offsetLeft + speedX + "px";
    Ball.style.top = Ball.offsetTop + speedY + "px";
    if (Ball.offsetLeft >= 580 || Ball.offsetLeft <= 0) {
      speedX *= -1;
    }
    if (Ball.offsetTop <= 0) {
      speedY *= -1;
    }
    if (Ball.offsetTop >= 580) {
      console.log("Game Over!");
      window.location.reload();
    }

    /**
     * 碰撞检测
     * 1.小球和拍子的碰撞检测
     */
    if (knock(Ball, Bat)) {
      speedY *= -1;
    }
    //2.小球和砖块碰撞
    for (var i = 0; i < oBricks.length; i++) {
      if (knock(oBricks[i], Ball)) {
        speedY *= -1;
        //消除砖块 --> 因为砖块浮动，相对定位，所以前一个消除后一个就会替代前一个 --> 相对定位转绝对定位{文档流转换}
        oBrick.removeChild(oBricks[i]);
        break;
      }
    }
  }, 30);
};

function drapX(node) {
  node.onmousedown = function (ev) {
    var e = ev || window.event;
    var offsetX = e.clientX - node.offsetLeft;

    document.onmousemove = function (ev) {
      var e = ev || window.event;
      //滑块位置 --> 限制出界
      var l = e.clientX - offsetX;

      if (l >= 530) {
        l = 530;
      }
      if (l <= 0) {
        l = 0;
      }
      node.style.left = l + "px";
    };
  };
  document.onmouseup = function (ev) {
    var e = ev || window.event;

    document.onmousemove = null;
  };
}
//函数创建砖块
function createBrick(n) {
  var Brick = document.getElementById("brick");
  for (var i = 0; i < n; i++) {
    var node = document.createElement("div");
    node.style.backgroundColor = color();
    Brick.appendChild(node);
  }
  var oBrick = document.getElementById("brick");
  var oBricks = oBrick.getElementsByTagName("div");
  for (var i = 0; i < oBricks.length; i++) {
    oBricks[i].style.left = oBricks[i].offsetLeft + "px";
    oBricks[i].style.top = oBricks[i].offsetTop + "px";

    //设置 相对定位 转 绝对定位   如果在这个循环里写，砖块都会几种在第一个左上角的一点 ==> 原因 前一个至第一个砖块脱离层级，后一个就会顶在前一个，以此类推直到所有砖块都集中在一点
    //所以 ==> 给砖块设置坐标的同时不能设置绝对定位
  }
  for (var i = 0; i < oBricks.length; i++) {
    oBricks[i].style.position = "absolute";
  }
}
//随机颜色
function color() {
  var str =
    "rgba(" +
    parseInt(Math.random() * 256) +
    "," +
    parseInt(Math.random() * 256) +
    "," +
    parseInt(Math.random() * 256) +
    "," +
    parseInt(Math.random() * 10) +
    ")";
  return str;
}
//碰撞：--> 先考虑绝对碰不到
function knock(node1, node2) {
  var l1 = node1.offsetLeft;
  var r1 = node1.offsetLeft + node1.offsetWidth;
  var t1 = node1.offsetTop;
  var b1 = node1.offsetTop + node1.offsetHeight;

  var l2 = node2.offsetLeft;
  var r2 = node2.offsetLeft + node2.offsetWidth;
  var t2 = node2.offsetTop;
  var b2 = node2.offsetTop + node2.offsetHeight;

  if (l2 > r1 || l1 > r2 || t2 > b1 || b2 < t1) {
    return false;
  } else {
    return true;
  }
}
