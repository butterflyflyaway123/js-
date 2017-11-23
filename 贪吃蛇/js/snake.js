/**
 * Created by admin on 2017/9/27.
 */
//2.自调用函数---小蛇
(function(){
    var elements=[];  //存放小蛇身体的每一部分
//2.1自定义构造函数
    function Snake(width,height,direction){  //direction====================
        this.width=width||20;  //this指Snake的实例化对象snake
        this.height=height||20;
        //身体的组成====================
        this.body=[
            {x:3,y:2,color:"yellow"}, //蛇头
            {x:2,y:2,color:"yellowGreen"}, //身体
            {x:1,y:2,color:"yellowGreen"}   //身体
        ];
        this.direction=direction||"right";
    }
    //2.2给原型添加初始化方法，作用是在地图上显示小蛇
    Snake.prototype.init=function(map){
        remove();  //x先删除之前的小蛇
        //循环遍历创建div,即创建小蛇  =================================
        for(var i=0;i<this.body.length;i++){
            //数组中的么欸个元素都是一个对象
            var obj=this.body[i]; //================================
            var div=document.createElement("div");
            map.appendChild(div);
            //设置div的样式
            //让小蛇脱标
            div.style.position="absolute"; //=======================
            div.style.width=this.width+"px";
            div.style.height=this.height+"px";
            div.style.backgroundColor=obj.color;
            div.style.borderRadius="30%";
            //设置小蛇的坐标
            div.style.left=obj.x*this.width+"px";  //=============
            div.style.top=obj.y*this.height+"px";
            elements.push(div);  //将小蛇的身体加入到数组中======================
        }
    };

    //2.3给原型添加方法--让小蛇移动
    Snake.prototype.move= function (food,map) {
        //2.3.1改变小蛇身体的坐标位置  ==================================
        var i=this.body.length-1; //i为小蛇的第一个身体   2
        for(;i>0;i--){  ///改变小蛇的第一节身体和第二节身体的坐标  1
            this.body[i].x=this.body[i-1].x;  //不加单位
            this.body[i].y=this.body[i-1].y;
        }
        //2.3.2判断方向，-----改变小蛇蛇的头部坐标
        switch (this.direction){   //括号里的写法=================================
            case "right":this.body[0].x+=1;break;
            case "left":this.body[0].x-=1;break;
            case "top" :this.body[0].y-=1;break;
            case "bottom":this.body[0].y+=1;break;
        }

        //2.3.3 判断有没有迟到食物
        var headX=this.body[0].x*this.width;
        var headY=this.body[0].y*this.height;
        if(headX==food.x&&headY==food.y){
            //获取小蛇尾巴
            var last=this.body[this.body.length-1];
            //复制蛇尾巴，添加到小蛇身体的最后，
            this.body.push({   //=========================
                x:last.x,
                y:last.y,
                color:last.color
            });
            //删除map上的食物并重新画一个 ---即初始化
            food.init(map);
        }
    };

    //删除小蛇的私有食物
    function remove(){
        var i=elements.length-1;
        for(;i>=0;i--){
            var ele=elements[i];
            ele.parentNode.removeChild(ele);
            elements.splice(i,1);
        }
    }

    //将对象暴露给window ,
    window.Snake=Snake;
}());
//var snake=new Snake;
//snake.init(document.querySelector(".map"));
//console.log(snake.x+"====="+snake.y);

