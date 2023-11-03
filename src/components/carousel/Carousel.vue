<template>
    <div id="carousel">

        <div class="startImg" >
            <!-- 轮播banner -->
            <img  @mouseover="changeInterval(true)" 
                @mouseleave="changeInterval(false)"  
                v-for="(item) of imgArr" 
                :key="item.id"
                :src="item.url"
                alt="暂无图片" 
                v-show="item.id===index" 
                >
            <!-- 左按钮 -->
            <div  @click="clickIcon('up')"  class="btn-fx icon-left1"> 
                <i class="iconfont icon-left"></i>
            </div>
            <!-- 右按钮 -->
            <div  @click="clickIcon('down')" class="btn-fx icon-right1">
                <i class="iconfont icon-right"></i>
            </div>
            <!-- 下方控制按钮 -->
            <div class="banner-circle">
                <ul>
                    <li @click="changeImg(item.id)" 
                        v-for="(item) in imgArr" 
                        :key="item.id"
                        :class="item.id===index?'active':''"
                    ></li>
                </ul>
            </div>
        </div>

    </div>

</template>
<script>
export default {
    name:"Carousel",
    data(){
        return {
            index :0,//当前所在图片下标
            timer:null,//定时轮询
            imgArr:[
                {	id:0,
                    url:require("@/assets/banner/banner1.png")
                },{
                    id:1,
                    url:require("@/assets/banner/banner2.jpg")
                },{
                    id:2,
                    url:require("@/assets/banner/banner3.jpg")
                },{
                    id:3,
                    url:require("@/assets/banner/banner4.jpg")
                },
            ]
        }
    },
    methods:{
        startInterval(){
            clearInterval(this.timer);
            this.timer = setInterval(()=>{
                this.index++;
                if(this.index > this.imgArr.length-1){
                    this.index = 0
                }
            },3000)
        },
        clickIcon(val){
            if(val==='down'){
                this.index++;
                if(this.index===this.imgArr.length){
                    this.index = 0;
                }
            }else{
                if(this.index === 0){
                    this.index = this.imgArr.length;
                }
                this.index--;
            }
        },
        changeImg(index){
            this.index = index
        },
        changeInterval(val){
            if(val){
                clearInterval(this.timer)
            }else{
                this.startInterval()
            }
        }
    },
    mounted(){
        this.startInterval()
    }

}
</script>
<style scoped>
.startImg{
	position: relative;
	margin-top: -70px;
	height: 700px;
	overflow: hidden;
}

.startImg img{
	width: 100%;
	height: 100%;
}

.btn-fx{
	position: absolute;
	top: 50%;
	transform: translateY(-50%);
	width: 50px;
	height: 50px;
	border-radius: 50px;
	line-height: 40px;
	text-align: center;
	font-size: 25px;
	cursor: pointer;
    background: rgba(0, 0, 0, .3);
    color: #fff;
    font-size: 30px;
    font-weight: 700;
}
.btn-fx:hover{
	background-color: #31987a;
    color: #fff;
}
.icon-left1{
	left: 10px;
}
.icon-right1{
	right: 10px;
}

.banner-circle{
	position: absolute;
	bottom: 0;
	width: 100%;
	height: 20px;
}
.banner-circle ul{
	margin: 0 50px;
	height: 100%;
	text-align: center;
}
.banner-circle ul li{
	display: inline-block;
	width: 54px;
	height: 14px;
	margin: 0 5px;
    margin-bottom: 30px;
	border-radius: 7px;
	background-color: rgba(125,125,125,.7);
	cursor: pointer;
}
.active{
	background-color: #31987a !important; 
}

</style>