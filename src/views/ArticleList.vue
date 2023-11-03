<template>
    <Myheader/>
    <Carousel/>
    <div id="articleList">
        <div class="container">
            <div class="title">
                <h1>文章列表页</h1>
                <span class="engName">ArticleTea</span>
            </div>
            <div class="nav-top">您当前的位置：<router-link to="/">首页</router-link>>>文章列表页</div>
            <div class="page-block">
                <div class="search-wrapper">
                    <input type="text" v-model="search" placeholder="请搜索文章" />
                    <el-select class="select-tea" clearable v-model="val" @change="searchSelect" filterable placeholder="请选择类型">
                        <el-option
                        v-for="item in classList"
                        :key="item"
                        :labeloptions="item"
                        :value="item"
                        />
                    </el-select>
                </div>
                <div class="wrapper">
                    <div class="news-item" v-for="post in filteredList.slice((currentPage - 1) * pageSize, currentPage * pageSize)">
                        <router-link :to="'/articlecontent/'+post.articleId">
                            <img :src="post.cover" alt="暂无图片" />
                            <div class="item-txt">
                                <p class="item-title">{{ post.articleTitle }}</p>
                                <div class="item-info">
                                    <span class="item-class">类别：{{ post.articleClassName }}</span>
                                    <span class="item-date">时间：{{ post.rtime.slice(0,10) }}</span>
                                    <span class="item-author">用户名：{{ post.userName }}</span>
                                </div>
                                
                                <p class="item-paragraph">{{ post.articleText }}</p>
                            </div>
                        
                        </router-link>
                    </div>
                </div>
                <el-pagination class="page-btn"
                    :current-page="currentPage"
                    :page-sizes="[5,10,15,20]"
                    :page-size="pageSize"
                    layout="sizes, prev, pager, next, jumper"
                    :total="axList.length"
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange">
                </el-pagination>
            </div>
        </div>
    </div>
    <Myfooter/>
</template>
<script>
import Myheader from '../components/header/Myheader.vue';
import Carousel from '../components/carousel/Carousel.vue';
import Myfooter from '../components/footer/Myfooter.vue';
import axios from "axios";

export default {
    name: "ArticleList",

    components:{
        Myheader,
        Myfooter,
        Carousel
    },
   
    data() {
        return {
            search: "",
            currentPage:1,
            pageSize:5,
            val: '',
            axList:[],
            classList:[],
        }
    },
    methods:{
        handleSizeChange(val) {
            this.pageSize = val
        },
        handleCurrentChange(val) {
            this.currentPage = val
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
                "itemSize": 200
            }).then(resv => {
            let len =  resv.data.data.Value.length
                for (let i = 0; i < len; i++) {
                    this.axList.push(resv.data.data.Value[i])
                }
                // console.log(resv.data.data.Value); 
            }).catch(err=>{
                console.log(err);
            })
            //茶文章分类列表
            instance1.post('/article/class/list',{
                "articleStatus":1,
                "page": 1,
                "itemSize": 50
            }).then(resv => {
            let len =  resv.data.data.Value.length
                for (let i = 0; i < len; i++) {
                    this.classList.push(resv.data.data.Value[i].articleClassName)
                }
                // console.log(resv.data.data.Value); 
            }).catch(err=>{
                console.log(err);
            })
        },
        
        searchSelect(val){
            this.val =val
            return val;
        },
    },  
    computed: {
        filteredList() {
            let arr = this.axList.filter(item => item.articleTitle.includes(this.search))
            return arr.filter(item=>item.articleClassName.includes(this.val))
        },
    },
    mounted(){
        this.getData();

    }
}
</script>
<style lang="scss" scoped>
    #articleList{
        text-align: center;
        padding: 50px 0;
        .title::after{
            content: '';
            display: block;
            width: 300px;
            position: absolute;
            left: 105%;
            bottom: 50%;
            border-bottom: 2px solid #40c09b;
        }
        .page-btn{
            display: flex;
            justify-content: center;
            margin: 30px auto 0;
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
        .page-block{
            width: 800px;
            margin: 0 auto;
            .select-tea{
                padding: 10px 20px;
            }
            .search-wrapper input{
                margin: 40px 0;
                width: 400px;
                padding: 10px 20px;
                border: 2px solid #40c09b;
                outline: none;
            }
            .news-item{
                margin: 20px 0;
                border: 5px solid #40c09b;
                border-radius: 10px;
                transition: .65s;
                &:hover{
                    transform: scale(1.1);
                }
            }
            .news-item a{
                display: flex;
                align-items: center;
                
                img{
                    width: 300px;
                    height: 200px;
                    border-radius: 5px;
                }
                .item-txt{
                    width: 450px;
                    font-size: 16px;
                    margin-left: 20px;
                    word-break:normal;
                    white-space: pre-wrap;
                    word-wrap:break-word;
                    .item-info{
                        margin: 10px;
                        word-break:normal;
                        white-space: pre-wrap;
                        word-wrap:break-word;
                        span{
                            margin: 10px;
                            color: #666;  
                            word-break:normal;
                            white-space: pre-wrap;
                            word-wrap:break-word;
                        }
                    }
                    .item-title{
                        font-size: 20px;
                        font-weight: 700;
                        margin: 10px;
                        
                    }
                    .item-date{
                        font-size: 14px;
                        color: #666;
                        margin: 10px;
                        word-break:normal;
                        white-space: pre-wrap;
                        word-wrap:break-word;
                    }
                    .item-paragraph{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display:-webkit-box;
                        -webkit-box-orient:vertical;
                        -webkit-line-clamp:3;
                        font-size: 16px;
                        line-height: 20px;
                        margin: 20px;
                    }
                }
                
            }
            
        }
        
    }
</style>