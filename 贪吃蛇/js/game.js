/**
 * Created by admin on 2017/9/27.
 */
//3.自调用函数---游戏
(function () {
     var that=null;  //该变量的目的是存储游戏的实例对象
    //3.1游戏的自定义构造函数
    function Game(map){
        this.food=new Food();
        this.snake=new Snake();
        this.map=map;
        that=this;   //保存游戏的实例对象gm到that变量中
    }
    //3.2添加原型的方法初始化游戏
    Game.prototype.init= function () {
        //食物初始化
        this.food.init(this.map); //=================
        //小蛇初始化
        this.snake.init(this.map);
        //调用小蛇自由移动的函数
        this.runSnake(this.food,this.map);
        //调用按键的方法
        this.bindkey();
    };
    //3.3添加原型方法--设置小蛇可以自由移动
    Game.prototype.runSnake= function (food,map) {
        //原型方法中this指实例对象
        var timeId=setInterval(function(){
            //定时器中的this指window;
            this.snake.move(food,map);  //移动小蛇=========================
            this.snake.init(map);  //初始化小蛇
            //横坐标的最大值
            var maxX=map.offsetWidth/this.snake.width;
            var maxY=map.offsetHeight/this.snake.height;
            //小蛇头的坐标
            var headX=this.snake.body[0].x;  //===================
            var headY=this.snake.body[0].y;

            //判断横坐标
            if(headX<=0||headX>=maxX){
                //清理定时器
                clearInterval(timeId);
                alert("游戏结束");
            }
            if(headY<=0||headY>=maxY){
                clearInterval(timeId);
                alert("游戏结束");
            }
        }.bind(that),260); //bind改变this的指向，此时this指gm实例对象
    };
    //添加原型方法 --设置用户按键，改变小蛇的移动方向
    Game.prototype.bindkey= function () {
        //获取用户按键
        document.addEventListener("keydown",function(e){
      switch (e.keyCode){
          case 37:this.snake.direction="left";break;
          case 38:this.snake.direction="top";break;
          case 39:this.snake.direction="right";break;
          case 40:this.snake.direction="bottom";break;
      }
        }.bind(that),false);
    };
    window.Game=Game;
}());