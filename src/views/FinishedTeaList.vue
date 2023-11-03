<template>
    <Myheader/>
    <Carousel/>
    <div id="FinishedTeaList">
        <div class="container">
            <div class="title">
                <h1>成品茶列表页</h1>
                <span class="engName">FinishedTea</span>
            </div>
            <div class="nav-top">您当前的位置：<router-link to="/">首页</router-link>>>成品茶列表页</div>
            <div class="page-block">
                <div class="search-wrapper">
                    <input type="text" v-model="search" placeholder="请搜索成品茶" />
                    <el-select class="select-tea" clearable v-model="val" @change="searchSelect" filterable placeholder="请选择茶类">
                        <el-option 
                        v-for="item in classList"
                        :key="item"
                        :label="item"
                        :value="item"
                        />
                    </el-select>
                </div>
                <div class="wrapper">
                    <div class="news-item" v-for="post in filteredList.slice((currentPage - 1) * pageSize, currentPage * pageSize)">
                        <router-link :to="'/finishedtea/'+post.finishTeaId">
                            <img :src="post.img" alt="暂无图片" />
                            <div class="item-txt">
                                <p class="item-title"><span>{{ post.teaName }}</span>{{ post.finishTeaName }}</p>
                                <p class="item-paragraph">{{ post.introduction }}</p>
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
    name: "FinishedTeaList",

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
        searchSelect(val){
            // console.log("val",val)
            this.val =val
            return val;
        },
        getData(){
            const instance1 = axios.create({
                baseURL: "/chain-api",
                timeout: 3000,
                headers: {}
            })
            //成品茶
            instance1.post('/tea/product/get/list',{
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
            //获取茶类
			instance1.get('/tea/class/list',{
			    "page": 1,
			    "itemSize": 10
			}).then(resv => {
			let len =  resv.data.data.Value.length
			    for (let i = 0; i < len; i++) {
			        this.classList.push(resv.data.data.Value[i].teaName)
			    }
			    // console.log(resv.data.data.Value); 
			}).catch(err=>{
			    console.log(err);
			})
        }
    },
    computed: {
        filteredList() {
            let arr = this.axList.filter(item => item.finishTeaName.includes(this.search))
            return arr.filter(item=>item.teaName.includes(this.val))
        }, 
    },
    mounted(){
        this.getData();
    }
}
</script>
<style lang="scss" scoped>
    #FinishedTeaList{
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
                    margin-left: 20px;
                    span{
                        color: #fff;
                        background: #40c09b;
                        font-size: 16px;
                        padding: 5px;
                        margin: 10px;
                    }
                    .item-title{
                        font-size: 20px;
                        font-weight: 700;
                        margin: 10px;
                    }
                    .item-date{
                        font-size: 12px;
                        color: #666;
                        margin: 10px;
                    }
                    .item-paragraph{
                        overflow: hidden;
                        text-overflow: ellipsis;
                        display:-webkit-box;
                        -webkit-box-orient:vertical;
                        -webkit-line-clamp:3;
                        font-size: 16px;
                        line-height: 20px;
                        margin: 20px 0;
                    }
                }
                
            }
            
        }
        
    }
</style>