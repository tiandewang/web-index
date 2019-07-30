// window.document.onload=function () {
//
// }
// $(document).ready();

//nav轮播图
var index = 0;
//获取最外面的div
var box = my$("box");
//获取相框
var inner = box.children[0];
//获取去相框的宽度
var imgWidth = inner.offsetWidth;
// 获取ul
var ulObj = inner.children[0];
//获取ul中所有的li
var list = ulObj.children;
//获取ol
var olObj = inner.children[1];
//获取焦点
var arr = my$("arr");

//创建小按钮-----根据ul中li的个数
for (var i = 0; i < list.length; i++) {
    var liObjs = document.createElement("li");
    olObj.appendChild(liObjs);
    // liObjs.innerHTML = (i + 1);
    //在ol中每个li中增加自定义属性，添加索引值
    liObjs.setAttribute("index", i);
    //注册鼠标进入事件
    liObjs.onmouseover = function () {
        //先干掉所有背景颜色
        for (var j = 0; j < olObj.children.length; j++) {
            olObj.children[j].removeAttribute("class");
        }
        //设置当前鼠标进来的类样式
        this.className = "current";
        //获取ol中li的索引值
        index = this.getAttribute("index");
        //移动ul
        animate(ulObj, -index * imgWidth); //移动动画函数
    };
}
//设置第一个ol中li的背景颜色
olObj.children[0].className = "current";
//克隆ol中第一个li放到最后一个
ulObj.appendChild(ulObj.children[0].cloneNode(true));

//点击右边按钮
my$("right").onclick = clickHandle;

// var clickTime = 0;
// var clickTimeInterval=null;
// function done() {
//     if(clickTime==0){
//         clearInterval(clickTimeInterval);
//     }else{
//         clickTime--;
//     }
// }
function clickHandle() {
    // if (clickTime == 0) {
        if (index == ulObj.children.length - 1) {
            ulObj.style.left = 0 + "px";
            index = 0;
        }
        index++;
        animate(ulObj, -index * imgWidth);
        if (index == list.length - 1) {
            olObj.children[0].className = "current";
            olObj.children[olObj.children.length - 1].className = "";
        } else {
            for (var i = 0; i < olObj.children.length; i++) {
                olObj.children[i].className = "";
            }
            olObj.children[index].className = "current";
        }
        // clickTime=Math.ceil(imgWidth/9*0.01);
        // clickTimeInterval=setInterval(done,1000);
    // }
};
//点击左边按钮
my$("left").onclick = function () {
    if (index == 0) {
        index = list.length - 1;
        ulObj.style.left = -index * imgWidth + "px";
    }
    index--;
    animate(ulObj, -index * imgWidth);
    for (var i = 0; i < olObj.children.length; i++) {
        olObj.children[i].className = "";
    }
    olObj.children[index].className = "current";
};

var timeId = setInterval(clickHandle, 3000);

my$("box").onmouseover = function () {
    arr.style.display = "block";
    clearInterval(timeId);
};
my$("box").onmouseout = function () {
    arr.style.display = "none";
    timeId = setInterval(clickHandle, 3000);
};

// 设置一个元素，移动到指定位置
function animate(element, target) {
    clearInterval(element.timeId);
    element.timeId = setInterval(function () {
        var current = element.offsetLeft;
        var step = 9;
        step = current > target ? -step : step;
        current += step;
        if (Math.abs(target - current) > Math.abs(step)) {
            element.style.left = current + "px";
        } else {
            clearInterval(element.timeId);
            element.style.left = target + "px";
        }
    }, 10);
}

function my$(id) {
    return document.getElementById(id);
}


//ELITE honor轮播
var honorIndex = 0;
var honorBox = my$("honorBox");
var honorUlObj = honorBox.children[0];
var honorList = honorUlObj.children;
var honorBoxWidth = honorList[0].offsetWidth;
var lilength=honorList.length;
// honorUlObj.appendChild(honorUlObj.children[0].cloneNode(true));
//复制ul中的li元素
for(i=0;i<lilength;i++){
    honorUlObj.appendChild(honorUlObj.children[i].cloneNode(true));
    // console.log(i);
}
// honor点击向右移动
my$("honorRight").onclick = honorRightClickHandle;
function honorRightClickHandle() {
    if (honorIndex == lilength) {
        honorUlObj.style.left = 0 + "px";
        honorIndex = 0;
    }
    honorIndex++;
    animate(honorUlObj, -honorIndex * honorBoxWidth);
}
//honor点击向左移动
my$("honorLeft").onclick = honorLeftClickHandle;
    function honorLeftClickHandle() {
    if (honorIndex == 0) {
        honorIndex = lilength - 1;
        honorUlObj.style.left = -honorIndex * honorBoxWidth + "px";
    }
        honorIndex--;
    animate(honorUlObj, -honorIndex * honorBoxWidth);
}
//鼠标移动到honnor部分显示移动箭头
my$("honorId").onmouseover=function () {
    document.getElementById("focusFId").style.display="block";
}
//鼠标移动到honnor部分隐藏移动箭头
my$("honorId").onmouseout=function () {
    document.getElementById("focusFId").style.display="none";
}