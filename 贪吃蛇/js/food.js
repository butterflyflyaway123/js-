/**
 * Created by admin on 2017/9/27.
 */
//1.自调用函数--食物
(function(){
    var elements=[]; //添加了空数组为了后期删除食物===============================
    //自定义食物构造函数
    function Food(width,height,color,x,y){
        this.width=width||20;
        this.height=height||20;
        this.color=color||"black";
        //横纵坐标需要随机产生
        this.x=x||0;
        this.y=y||0;
    }
    //1.1为原型添加初始化方法，作用是在地图上显示食物
    Food.prototype.init=function(map){
        remove(); //每次初始化的时候删除食物
        //创建食物
        var div=document.createElement("div");
        //将食物追加到map 上
        map.appendChild(div);
        //添加食物的属性，即设置div的样式
        div.style.width=this.width+"px";
        div.style.height=this.height+"px";
        div.style.backgroundColor=this.color;
        div.style.borderRadius="50%";
        //随机产生坐标
        //先脱离标准流
        div.style.position="absolute"; //==============================================
        this.x=parseInt(Math.random()*(map.offsetWidth/this.width))*this.width;  //份数*每份的宽度
        this.y=parseInt(Math.random()*(map.offsetHeight/this.height))*this.height;
        //设置食物的坐标
        div.style.left=this.x+"px";
        div.style.top=this.y+"px";

        //把食物添加到数组中，为了后期删除 //=================================
        elements.push(div);
    };
    //1.3 私有函数--用来删除食物 =========================================
    function remove(){
        for(var i=0;i<elements.length;i++){
            var ele=elements[i]; //要被删除的食物对象
            ele.parentNode.removeChild(ele); //找到这个元素的父级元素，从地图上删除这个元素
            elements.splice(i,1);
        }
    }

    //1.2为原型添加
    //将对象暴露给window,这样外部就可以使用了
    window.Food=Food;
}());

//var fd=new Food();
//fd.init(document.querySelector(".map"));

