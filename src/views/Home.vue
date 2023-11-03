<template>
  <div class="home">
    <Myheader/>
    <Carousel/>
    <div id="teaArticle">
        <div class="container">
          <div class="title">
            <h1>茶文章</h1>
            <span class="engName">TeaArticle</span>
          </div>
          <div class="article-bodys">
            <router-link v-for="item in this.teaArticleData" :to="'/articlecontent/'+item.articleId" class="article-body">
              <div class="article-img">
                <img :src="item.cover" alt="暂无图片">
              </div>
              <h2 class="article-title">{{ item.articleTitle }}</h2>
              <div class="article-info">
                <span class="article-date">{{ item.rtime.slice(0,10) }}</span>
                <span class="article-author">{{ item.userName }}</span>
              </div>
              <div class="txt">
                <p>{{item.articleText}}</p>
              </div>
            </router-link>
          </div>
          
          <button class="more" @click="targetArticle">获取更多</button>
        </div>
    </div>
    <div id="teaClass">
        <div class="container">
          <div class="title">
            <h1>茶分类</h1>
            <span class="engName">ClassTea</span>
          </div>
          <div class="teaclass-imgs">
            <router-link :to="'/teaclass/'+item.teaId" class="item" v-for="item in teaClassData">
              <img :class="index===1?'imgbor':''" :src="item.teaPhoto" alt="暂无图片">
              <div class="teaclaname">| {{item.teaName}} |</div>
            </router-link>
          </div>
        </div>
    </div>
    <div id="teaFinished">
      <div class="container">
        <div class="title">
            <h1>成品茶</h1>
            <span class="engName">FinishedTea</span>
          </div>
        <div class="step-imgs">
          <router-link :to="'/finishedtea/'+item.finishTeaId" class="item" v-for="item in teaFinishedData">
            <img :src="item.img" alt="暂无图片">
            <p class="tea-info"><span class="tea-class">{{ item.teaName }}</span><span class="tea-title">{{ item.finishTeaName }}</span></p>
          </router-link>
        </div>
        <button class="more" @click="targetFinishTea">获取更多</button>
      </div>
    </div>
    <div id="teaGeographic">
        <div class="container">
          <div class="title">
            <h1>茶地理标志</h1>
            <span class="engName">GeographicTea</span>
          </div>
          <div class="teainfo-items">
            <router-link :to="'/geographic/'+item.geoId" class="item" v-for="item in targetGeographicData.slice(0,4)">
              <h2>{{item.geoName}}</h2>
              <div class="address">{{item.address}}</div>
              <div class="txt">
                <img :src="item.img" alt="暂无图片">
              </div>
            </router-link>
          </div>
          <button class="more" @click="targetGeographic">获取更多</button>
        </div>
    </div>
    <Myfooter/>
  </div>
</template>

<script>
import Myheader from '../components/header/Myheader.vue';
import Carousel from '../components/carousel/Carousel.vue';
import Myfooter from '../components/footer/Myfooter.vue';
import axios from 'axios';
export default {
  name: 'Home',
  components: {
    Myheader,
    Myfooter,
    Carousel
  },
  data() {
    return {
      teaArticleData:[],
      teaFinishedData:[],
      teaClassData:[],
      targetGeographicData:[],

    }
  },
  methods:{
    targetGeographic(){
      this.$router.push("./GeographicList")
    },
    targetFinishTea(){
      this.$router.push("./FinishedTeaList")
    },
    targetArticle(){
      this.$router.push("./ArticleList")
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
              "itemSize": 6
        }).then(resv => {
          let len =  resv.data.data.Value.length
            for (let i = 0; i < len; i++) {
              this.teaArticleData.push(resv.data.data.Value[i])
            }
            // console.log(resv.data.data.Value); 
        }).catch(err=>{
            console.log(err);
        })
        //茶分类
        instance1.get('/tea/class/list',{
              "page": 1,
              "itemSize": 6
        }).then(resv => {
          let len =  resv.data.data.Value.length
            for (let i = 0; i < len; i++) {
              this.teaClassData.push(resv.data.data.Value[i])
            }
            // console.log(resv.data.data.Value); 
        }).catch(err=>{
            console.log(err);
        })
        //成品茶
        instance1.post('/tea/product/get/list',{
              "page": 1,
              "itemSize": 6
        }).then(resv => {
          let len =  resv.data.data.Value.length
            for (let i = 0; i < len; i++) {
              this.teaFinishedData.push(resv.data.data.Value[i])
            }
            // console.log(resv.data.data.Value); 
        }).catch(err=>{
            console.log(err);
        })
        //茶地理标志
        instance1.post('/geo/list',{
              "page": 1,
              "itemSize": 6
        }).then(resv => {
          let len =  resv.data.data.Value.length
            for (let i = 0; i < len; i++) {
              this.targetGeographicData.push(resv.data.data.Value[i])
            }
            // console.log(resv.data.data.Value); 
        }).catch(err=>{
            console.log(err);
        })
    
      }
    
  
  },
  mounted(){
    this.getData();
  }
}
</script>
<style scoped lang="scss">
/* 茶文章*/
#teaArticle{
  background: #fff;
  padding: 50px 0;
  .more{
    display: block;
    background: #31987a;
    border: 1px solid rgb(88, 80, 80);
    color: #fff;
    padding: 10px 30px;
    border-radius: 10px;
    box-shadow: 1px 3px 2px rgb(88, 80, 80);
    margin: 20px auto;
    width: 120px;
    cursor: pointer;
    transition: .35s;
    &:hover{
      box-shadow: 5px 5px 5px #367;
      background: #fff;
      color: #31987a;
      border: 1px solid #31987a;
    }
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
    width: 400px;
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
  .article-bodys{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
   
    .article-body{
      width: 28%;
      text-align: center;
      margin: 20px 10px;
      background: linear-gradient(to right bottom,rgb(236, 239, 237)rgb(255, 255, 255));
      backdrop-filter: blur(1rem);
      z-index: 1;
      border-radius: 1rem;
      box-shadow: 0 0 0.5rem rgba(72, 222, 160, 0.6);
      padding: 10px;
      transition: .6s;
      &:hover{
        transform: scale(1.05);
      }
    .article-img{
      img{
        width: 100%;
        height: 250px;
        border-top-left-radius: 1rem;
        border-top-right-radius: 1rem;
      }
    }
    .article-info{
      span{
        margin: 10px;
        color: #666;  
      }
    }
    .article-title{
      margin: 10px;
      overflow: hidden;
      text-overflow: ellipsis;
      display:-webkit-box;
      -webkit-box-orient:vertical; 
      -webkit-line-clamp:1;
    }
    
    .txt{
      padding: 20px 0;
      margin: 0 auto;
      line-height: 30px;
      font-size: 16px;
      p{
        overflow: hidden;
      text-overflow: ellipsis;
      display:-webkit-box;
      -webkit-box-orient:vertical;
      -webkit-line-clamp:3;
      }
    }
  }
  }
  
}
/* 茶分类 */
#teaClass{
  background: #31987a;
  padding: 50px 0;
  color: #fff;
  .title::after{
    content: '';
    display: block;
    width: 400px;
    position: absolute;
    left: 105%;
    bottom: 50%;
    border-bottom: 2px solid #fff;

  }
  .title::before{
    content: '';
    display: block;
    width: 400px;
    position: absolute;
    right: 105%;
    bottom: 50%;
    border-bottom: 2px solid #fff;

  }
  .title{
    position: relative;
    text-align: center;
    padding-bottom: 5px;
    width: 200px;
    height: 60px;
    margin: 0 auto;
    padding: 30px 0;
    color: #fff;
  }
  .teaclass-imgs{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;
    margin: 20px 0;
    transition: .75s;
    .item{
      margin: 20px 30px;
      &:hover{
        transform: rotateY(180deg);
      }
    }
  }
  .teaclass-imgs img{
    width: 280px;
    height: 280px;
    border-radius: 50%;
  }
  .teaclass-imgs>a{
    margin:0 30px;
    box-shadow: 0 0 0.5rem rgba(251, 251, 251, 0.6);
    border-radius: .5rem;
    padding: 10px;
    transition: .6s;

  }
  .teaclass-imgs>a:nth-child(2n) img{
    border: 10px solid rgba(68, 158, 98, 0.75);
    box-shadow: 1px 1px 2px #31987a;
  }

  .teaclaname{
    text-align: center;
    font-size: 20px;
    margin: 20px;
    color: #fff;
  }
}

// 茶成品
#teaFinished{
  padding: 50px 0;
  color: #fff;
  background: #367d65;
  .title::after{
    content: '';
    display: block;
    width: 400px;
    position: absolute;
    left: 105%;
    bottom: 50%;
    border-bottom: 2px solid #fff;

  }
  .title::before{
    content: '';
    display: block;
    width: 400px;
    position: absolute;
    right: 105%;
    bottom: 50%;
    border-bottom: 2px solid #fff;

  }
  .title{
    position: relative;
    text-align: center;
    padding-bottom: 5px;
    width: 200px;
    height: 60px;
    margin: 0 auto;
    padding: 30px 0;
    color: #fff;
  }
  .step-imgs{
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    margin-right: 10px;
    img{
      border: 15px solid #33896d;
      width: 300px;
      height: 250px;
      transition: .55s;
      &:hover{
        border: 15px solid #36ba88;
        box-shadow: 3px 3px 5px #36ba88;
      }
    }
  }
  
  .tea-info{
    display: flex;
    justify-content: center;
    margin: 20px auto;
    color: #fff;
    .tea-class{
      padding: 5px;
      border: 1px solid #fff;
      color: #fff;
      margin-right: 20px;
    }
    .tea-title{
      padding: 5px;
    }
  }
  .more{
    display: block;
    background: #367d65;
    color: #fff;
    padding: 10px 30px;
    border-radius: 30px;
    border: 2px solid #fff;
    margin: 20px auto;
    width: 120px;
    cursor: pointer;
    transition: 1s;
    transition: .65s;
    &:hover{
      background: #fff;
      color: #367d65;
    }
  }
  
}

/* 茶地理标志 */
#teaGeographic {
  padding: 50px 0;
  background: #fff;
  color: #31987a;
  .more{
    display: block;
    background: #31987a;
    border: 1px solid rgb(88, 80, 80);
    color: #fff;
    padding: 10px 30px;
    border-radius: 10px;
    box-shadow: 1px 3px 2px rgb(88, 80, 80);
    margin: 20px auto;
    width: 120px;
    cursor: pointer;
    transition: .35s;
    &:hover{
      box-shadow: 5px 5px 5px #367;
      background: #fff;
      color: #31987a;
      border: 1px solid #31987a;
    }
  }

  .title::after{
    content: '';
    display: block;
    width: 400px;
    position: absolute;
    left: 105%;
    bottom: 50%;
    border-bottom: 2px solid #40c09b;

  }
  .title::before{
    content: '';
    display: block;
    width: 400px;
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
  
  .teainfo-items{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
    align-items: center;
    a{
      color: #31987a;
    }
    img{
      width: 100%;
      height: 200px;
      border: 15px solid #31987a;
      border-radius: 10px;
      margin: 10px 0 20px;
      transition: .55s;
      &:hover{
        transform: scale(1.1);
      }
    }
    .item{
      width: 20%;
      margin: 0 20px;
      .address{
        margin: 20px 0;
        text-align: center;
      }
    }
    h2{
      text-align: center;
    }
  }
  
}



</style>