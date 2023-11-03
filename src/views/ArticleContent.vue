<template>
    <Myheader/>
    <Carousel/>
    <div id="articleContent">
        <div class="container">
            <div class="title">
                <h1>文章内容页</h1>
                <span class="engName">ArticleTea</span>
            </div>
            <div class="nav-top">您当前的位置：<router-link to="/">首页</router-link>>>文章内容页</div>
            <v-md-preview  :text="text" class="introduce-body">
                <div id="tea-product">
                    <div class="items">
                        <img :src="'../'+content.cover" alt="暂无图片">
                        <div class="item">
                            <div class="item-title">{{content.articleTitle}}</div>
                            <div class="item-info">
                                <span class="item-class">{{ content.articleClassName }}</span>
                                <span class="item-class">{{ content.userName }}</span>
                                <span class="item-date">{{ content.rtime }}</span>
                            </div>
                            <div class="item-txt">{{ content.articleText }}</div>
                            <div class="original">
                                <span>原作者：{{ content.originalAuthor }}</span>
                                <span><a :href=" content.articleLink ">转载于：{{ content.articleLink }}</a></span>
                            </div>
                            <div class="item-link">
                                <div class="links">
                                    <div class="link-item" v-for="iteminfo of this.axList.slice(1,7)">
                                        <router-link :to="'/articlecontent/'+iteminfo.articleId" @click="refresh()">
                                            <img :src="'../'+iteminfo.cover" alt="暂无图片">
                                            <div class="teaname">{{ iteminfo.articleTitle }}</div>
                                            <div class="teainfo">
                                                <span>{{ iteminfo.articleClassName }}</span>
                                                <span>{{ iteminfo.userName }}</span>
                                                <span>{{ iteminfo.rtime.slice(0,10) }}</span>
                                            </div>
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
    name:"ArticleContent",

    components:{
        Myheader,
        Carousel,
        Myfooter
    },
    props:{
        
    },
    data() {
        return {
            text: '',
            axList:[],
            content:{},
            id: 0,
            
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
            //茶文章
            instance1.post('/article/get/list',{
                "articleStatus":1,
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
            instance1.get(`/article/get/${this.id}`).then(res => {
                this.content = res.data.data.Value; 
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    mounted(){
        this.id = this.$route.params.id
        this.getData()

    }
}
</script>
<style lang="scss" scoped>
     #articleContent{
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
        .original{
            display: flex;
            margin: 20px 0;
            span{
                margin-right: 20px;
            }
            a:hover{
                color: #40c09b;
            }
        }
        #tea-product{
            width: 1000px;
            .items{
                border: 1px solid #ccc;
                padding: 2%;
                img{
                    width: 100%;
                    height: 500px;
                }
            }
            .item{
                margin-right: 20px;
                margin-bottom: 30px;
                width: 96%;
                padding: 2%;
                .item-info{
                    margin: 20px;
                    display: flex;
                    justify-content: center;
                    span{
                        padding: 5px;
                        margin-right: 10px;
                        border: 1px solid #40c09b;
                        color: #40c09b;
                    }
                  
                }
               
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
                    word-break:normal;
                    white-space: pre-wrap;
                    word-wrap:break-word;
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
                            width: 200px;
                            height: 200px;
                        }
                        .teaname{
                            font-size: 18px;
                            font-weight: 500;
                            margin: 10px;
                        }
                        .teainfo{
                            display: flex;
                            justify-content: space-between;
                            word-break:normal;
                            white-space: pre-wrap;
                            word-wrap:break-word;
                        }
                        span{
                            color: #fff;
                            background: #40c09b;
                            font-size: 14px;
                            padding: 5px;
                            border-radius: 15px;
                            word-break:normal;
                            white-space: pre-wrap;
                            word-wrap:break-word;
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