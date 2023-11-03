<template>
    <div id="myheader">
        <div class="container">
            <div class="head-body">
                <div class="logo">
                    <img src="../../assets/logo.png" alt="logo">
                </div>
                <div class="list">
                    <ul>
                        <li v-for="(item,index) of navlist" :key="item.id" @click="clickCur(item.id)" :class="item.id===currentId?'active':''"><router-link :to="item.name">{{item.txt}}</router-link></li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: "myheader",   
    data(){
        return{
            navlist:[
                {
                    id:0,
                    txt:'首页',
                    name:'/'
                },{
                    id:1,
                    txt:'文章列表页',
                    name:'/ArticleList'
                },{
                    id:2,
                    txt:'成品茶列表页',
                    name:'/FinishedTeaList'
                },{
                    id:3,
                    txt:'地理标志列表页',
                    name:'/GeographicList'
                },{
                    id:4,
                    txt:'可视化页',
                    name:'/chinaMap'
                },
            ],
            currentId:0
        }
    },
    methods:{
        clickCur(val){
            this.currentId = val;
        }

    },
    watch:{
        
    }
}
</script>
<style scoped>
  
    #myheader{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: 999;
        background: rgba(49,152,122, .95);
        height: 70px;
        color: #FFf;
    }
    #myheader img{
        height: 70px;
    }
    #myheader .head-body{
        display: flex;
        justify-content: space-between;
    }
    #myheader ul li{
        float: left;
        line-height: 70px;
        margin-right: 20px;
    }
    #myheader a{
        color: #Fff;
        padding: 10px;

    }
    #myheader a:hover{
        border-radius: 10px;
        background: #fff;
        color: #31987a;

    }
</style>