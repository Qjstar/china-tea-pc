<template>
    <Myheader/>
    <Carousel/>
    <div id="gerographicList">
        <div class="container">
            <div class="title">
                <h1>地标列表页</h1>
                <span class="engName">GerographicTea</span>
            </div>
            <div class="nav-top">您当前的位置：<router-link to="/">首页</router-link>>>地理标志列表页</div>
            <div class="page-block">
                <div class="search-wrapper">
                    <input type="text" v-model="search" placeholder="请搜索地理标志" />
                </div>
                <div class="wrapper">
                    <div class="news-item" v-for="post in filteredList.slice((currentPage - 1) * pageSize, currentPage * pageSize)">
                        <router-link :to="'/geographic/'+post.geoId">
                            <img :src="post.img" alt="暂无图片" />
                            <div class="item-txt">
                                <p class="item-title">{{ post.geoName }}</p>
                                <p class="item-address">{{ post.address }}</p>
                                <p class="item-paragraph" v-html="post.introduce"></p>
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
    name: "GerographicList",

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
            axList:[],
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
            //茶地理标志
            instance1.post('/geo/list',{
                "page": 1,
                "itemSize": 500
            }).then(resv => {
            let len =  resv.data.data.Value.length
                for (let i = 0; i < len; i++) {
                this.axList.push(resv.data.data.Value[i])
                }
                // console.log(resv.data.data.Value); 
            }).catch(err=>{
                console.log(err);
            })
        }
    },
    computed: {
        filteredList() {
            return this.axList.filter(item => item.geoName.includes(this.search))
        },
    },
    mounted(){
        this.getData();
    }
}
</script>
<style lang="scss" scoped>
    #gerographicList{
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
                    margin-left: 20px;
                    .item-title{
                        font-size: 20px;
                        font-weight: 700;
                        margin: 10px;
                    }
                    .item-address{
                        font-size: 12px;
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