<template>
    <Myheader/>
    <Carousel/>
    <div id="teaClass">
        <div class="container">
            <div class="title">
                <h1>茶类介绍页</h1>
                <span class="engName">GuangdongTea</span>
            </div>
            <div class="nav-top">您当前的位置：<router-link to="/">首页</router-link>>>茶类介绍页</div>
            <v-md-preview class="introduce-body">
                <div id="tea-product">
                    <div class="items">
                        <img class="tea-img" :src="'../'+content.teaPhoto" alt="暂无图片">
                        <div class="item">
                            <div class="item-title"><span>{{ content.teaName }}</span></div>
                            <div class="item-txt">{{ content.introduction }}</div>
                            <div class="item-link">
                                <div class="links">
                                    <div class="link-item" v-for="iteminfo of finishList.slice(0,6)">
                                        <router-link :to="'/finishedtea/'+iteminfo.finishTeaId" @click="refresh()">
                                            <img :src="'../'+iteminfo.img" alt="暂无图片">
                                            <div class="teaname">{{ iteminfo.finishTeaName }}</div>
                                            <span>{{ iteminfo.teaName }}</span>
                                        </router-link>
                                    </div>
                                    
                                </div>

                            </div>
                        </div>
                    </div>
                    
                </div>
         
            </v-md-preview>

        </div>
    </div>
    <Myfooter/>
</template>
<script>
import Myheader from '../components/header/Myheader.vue';
import Carousel from '../components/carousel/Carousel.vue';
import Myfooter from '../components/footer/Myfooter.vue';
import axios from 'axios';
export default {
    name:"TeaClass",
    components:{
        Myheader,
        Carousel,
        Myfooter
    },

    data() {
        return {
            axList:[],
            finishList:[],
            content: {},
            id: 0,
            name: "",
        }
    },
    methods:{
        refresh(){
            setTimeout(item=>{
                this.$router.go(0)
            },10)
        },
        getData(){
            const instance1 = axios.create({
                baseURL: "/chain-api",
                timeout: 3000,
                headers: {}
            })
            instance1.get('/tea/class/list',{
                "page": 1,
                "itemSize": 7
            }).then(resv => {
            let len =  resv.data.data.Value.length
                for (let i = 0; i < len; i++) {
                this.axList.push(resv.data.data.Value[i])
                }
                // console.log(resv.data.data.Value); 
            }).catch(err=>{
                console.log(err);
            })
            //主体内容
            instance1.get(`/tea/class/get/${this.id}`).then(res => {
                this.content = res.data.data.Value;
				this.name = res.data.data.Value.teaName
				this.getFinsh()
            }).catch(err=>{
                console.log(err);
            })
        },
        getFinsh(){
			const instance1 = axios.create({
			    baseURL: "/chain-api",
			    timeout: 3000,
			    headers: {}
			})
			//成品茶
			instance1.post('/tea/product/get/list',{
			    "page": 1,
			    "itemSize": 20,
				"category": this.name
			}).then(resa => {
                let len =  resa.data.data.Value.length
                for (let i = 0; i < len; i++) {
                    this.finishList.push(resa.data.data.Value[i])
                }
                // console.log(resa.data.data.Value); 
            }).catch(err=>{
                console.log(err);
            })
		}
    },
    mounted(){
        this.id = this.$route.params.id
        this.getData();
    }
}
</script>
<style lang="scss" scoped>
     #teaClass{
        text-align: center;
        padding: 50px 0;
        .page-btn{
            display: flex;
            justify-content: center;
            margin: 30px auto 0;
        }
        .title::after{
            content: '';
            display: block;
            width: 300px;
            position: absolute;
            left: 105%;
            bottom: 50%;
            border-bottom: 2px solid #40c09b;
        }
        .title::before{
            content: '';
            display: block;
            width: 300px;
            position: absolute;
            right: 105%;
            bottom: 50%;
            border-bottom: 2px solid #40c09b;
        }
        .title{
            position: relative;
            text-align: center;
            padding-bottom: 5px;
            width: 200px;
            height: 60px;
            margin: 0 auto;
            padding: 30px 0;
            color: #33876d;
        }
        .introduce-body{
            display: flex;
            justify-content: center;
        }
        #tea-product{
            width: 1000px;
            .items{
                border: 1px solid #ccc;
                padding: 2%;
                .tea-img{
                    width: 100%;
                    height: 500px;
                }
            }
            .item{
                margin-right: 20px;
                margin-bottom: 30px;
                width: 96%;
                padding: 2%;
       
                .item-title{
                    font-size: 24px;
                    margin: 20px ;
                    font-weight: 700;
                    color: #33876d;
                    span{
                        border: 1px solid #40c09b;
                        padding: 5px;
                        color: #40c09b;
                        margin: 0 20px;
                    }
                }
                .item-txt{
                    color: #666;
                    margin: 8px 0;
                    text-indent: 2em;
                    text-align: left;
          
                }
                .item-link{
                    background: #33876d;
                    border: none;
                    padding: 10px;
                    color: #fff;
                    .search-wrapper input{
                        margin: 20px 0;
                        width: 400px;
                        padding: 10px 20px;
                        border: 2px solid #40c09b;
                        outline: none;
                    }
                    .links{
                        display: flex;
                        flex-wrap: wrap;
                    }
                    .links .link-item{
                        width: 250px;
                        padding: 10px;
                        border: 1px solid #fff;
                        color: #40c09b;
                        margin: 0 10px;
                        border-radius: 5px;
                        margin: 14px;
                        img{
                            width: 100%;
                            height: 200px;
                        }
                        .teaname{
                            font-size: 18px;
                            font-weight: 500;
                            margin: 10px;
                        }
                        span{
                            color: #fff;
                            background: #40c09b;
                            font-size: 14px;
                            padding: 5px;
                        }
                    }
                }
                .item-link a{
                    color: #fff;

                }
                .item-link a:hover{
                    color: #40c09b;
                }
            }

        }
        
    }
</style>