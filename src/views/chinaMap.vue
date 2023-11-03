<template>
  <Myheader/>
  <div id="top-box">
      <div class="search-wrapper">
        请选择数据年份：
        <el-select class="select-tea" clearable v-model="val"  @change="searchSelect" filterable placeholder="请选择年份">
            <el-option 
            v-for="item in years"
            :key="item"
            :label="item"
            :value="item"
            />
        </el-select>
      </div>
      <div id="main" style="width: 100%; height: 700px"></div>
  </div>
  <el-row>
    <el-col :xs="24" :sm="11" :md="8" :lg="8" :xl="12">
        <div id="bar" style="width:100%;height:500px"></div>
    </el-col>
    <el-col :xs="24" :sm="11" :md="8" :lg="8" :xl="12">
        <div id="bar2" style="width: 100%; height: 500px"></div>
    </el-col>
    <el-col :xs="24" :sm="11" :md="8" :lg="8" :xl="12">
        <div id="bar3" style="width: 100%; height: 500px"></div>
    </el-col>
    <el-col :xs="24" :sm="11" :md="8" :lg="8" :xl="12">
        <div id="bar4" style="width:100%;height:500px"></div>
    </el-col>
    <el-col :xs="24" :sm="11" :md="8" :lg="8" :xl="12">
        <div id="bar5" style="width: 100%; height: 500px"></div>
    </el-col>
    <el-col :xs="24" :sm="11" :md="8" :lg="8" :xl="12">
        <div id="bar6" style="width: 100%; height: 500px"></div>
    </el-col>
  </el-row>
    
  <Myfooter/>
</template>
  
<script>
// 组件
import Myheader from '../components/header/Myheader.vue';
import Myfooter from '../components/footer/Myfooter.vue';
import axios from 'axios';
import * as echarts from 'echarts';
import '@/assets/china.js';

export default {
  name: 'ChinaMap',
  components: {
    Myheader,
    Myfooter
  },
  props: {

    },
  data() {
    return {
      nums:[],
      maxTotal:null,
      minTotal:null,
      mydata: [],
      title: '',
      xAxis: [],
      series: [],
      xinxi1S: '',
      xinxi2S: '',
      name1: '',
      name2: '',
      chartsDom: '', //定义全局变量
      chinaName: ['北京市','天津市','上海市','重庆市','河北省',
'河南省',
'云南省',
'辽宁省',
'黑龙江省',
'湖南省',
'安徽省',
'山东省',
'新疆维吾尔自治区',
'江苏省',
'浙江省',
'江西省',
'湖北省',
'广西壮族自治区',
'甘肃省',
'山西省',
'内蒙古自治区',
'陕西省',
'吉林省','福建省',
'贵州省',
'广东省',
'青海省',
'西藏自治区',
'四川省',
'宁夏回族自治区',
'海南省',
'台湾省', 
'香港特别行政区', 
'澳门特别行政区'],
      namelist:['湖南省','江西省','四川省','贵州省','浙江省','广东省'],
      linedata:[],
      chinaData:{},
      years: ['2019','2018','2017','2016','2015','2014','2013','2012','2011','2010'],
      val: '2019',
      city:'广东省',
    };
  },
  methods:{
    searchSelect(val){
      console.log("val",val)
      this.val =val
      this.getChina();
      this.initChina();
      return val;
    },
    initBar() {
     const instance1 = axios.create({
       baseURL: "/chain-api",
       timeout: 3000,
       headers: {}
     })


       instance1.post('/chinatea/production/data', {
         "field":[
             "black_tea","year","total_output"
           ],
           "area": {
               "value": "广东省",
               "strict": false
           },
           "year": {
               "from": 2010,
               "to": 2020
           }
         }).then(res=>{
           let resdata = res.data.data.Value
           let arr = [];
           let arr2 = [];
           for (let i = 0; i < resdata.length; i++) {
             arr.push(resdata[i].year)
             arr2.push(resdata[i].blackTea)
           }
           //去重选8条数据
           let yearList = Array.from(new Set(arr)).slice(0,10)
           let blackTea = Array.from(new Set(arr2)).slice(0,10)

           //看一下数据
          //  console.log(yearList);
          //  console.log(blackTea);
           // echarts 图
           let myChart = echarts.init(document.getElementById('bar'))
           let colorList = ['#a90000']
           let option = {
               title: {
                   text: '2010-2020年广东省红茶产量比较图',
                   left: 'center'
               },
               color: colorList,
               legend: {
                   itemGap: 25,
                   top: 'bottom',
                   data: ['总产量']
               },
               grid: {
                   left: '3%',
                   right: '4%',
                   bottom: '10%',
                   containLabel: true
               },
               xAxis: {
                   type: 'category',
                   data: yearList,
                   axisTick: { show: false }
               },
               yAxis: {
                   type: 'value',
                   max: 50000,
                   min: 0
               },
               toolbox: {
                 show: true,
                 left: 'left',
                 top: 'top',
                 feature: {
                   restore: {},
                   saveAsImage: {
                     show:true
                   }
                 }
               },
               series: [
                   {
                       name: '红茶产量',
                       type: 'bar',
                       barWidth: 35,
                       data: blackTea,
                       itemStyle: {
                           normal: {
                               label: {
                                   show: true, // 是否显示
                                   position: 'top',
                                   color: '#333',
                                   formatter: function(params) {
                                       return params.value
                                   }
                               }
                           }
                       }
                   },
                   
               ]
           }
           myChart.setOption(option)
      
           window.addEventListener('resize', function () {
               myChart.resize()
           })
       
         })
 
    },
    initBar2() {
    const instance1 = axios.create({
       baseURL: "/chain-api",
       timeout: 3000,
       headers: {}
     })

       instance1.post('/chinatea/production/data', {
         "field":[
             "dark_tea","year","total_output"
           ],
           "area": {
               "value": "广东省",
               "strict": false
           },
           "year": {
               "from": 2010,
               "to": 2020
           }
         }).then(res=>{
           let resdata = res.data.data.Value
           let arr = [];
           let arr2 = [];
           for (let i = 0; i < resdata.length; i++) {
             arr.push(resdata[i].year)
             arr2.push(resdata[i].darkTea)
           }
           //去重选8条数据
           let yearList = Array.from(new Set(arr)).slice(0,10)
           let blackTea = Array.from(new Set(arr2)).slice(0,10)

           //看一下数据
          //  console.log(yearList);
          //  console.log(blackTea);
           // echarts 图
           let myChart = echarts.init(document.getElementById('bar2'))
           let colorList = ['#32c092']
           let option = {
               title: {
                   text: '2010-2020年广东省黑茶产量比较图',
                   left: 'center'
               },
               color: colorList,
               legend: {
                   itemGap: 25,
                   top: 'bottom',
                   data: ['总产量']
               },
               grid: {
                   left: '3%',
                   right: '4%',
                   bottom: '10%',
                   containLabel: true
               },
               tooltip: {
                trigger: 'axis'
              },
               xAxis: {
                   type: 'category',
                   data: yearList,
                   axisTick: { show: false }
               },
               yAxis: {
                   type: 'value',
                   max: 100000,
                   min: 0
               },
               toolbox: {
                 show: true,
                 // orient: 'vertical',
                 left: 'left',
                 top: 'top',
                 feature: {
                   // dataView: { readOnly: false },
                   restore: {},
                   saveAsImage: {
                     show:true
                   }
                 }
               },
               series: [
                   {
                       name: '黑茶产量',
                       type: 'line',
                       barWidth: 35,
                       data: blackTea,
                       itemStyle: {
                           normal: {
                               label: {
                                   show: true, // 是否显示
                                   position: 'top',
                                   color: '#333',
                                   formatter: function(params) {
                                       return params.value
                                   }
                               }
                           }
                       }
                   },
                   
               ]
           }
           myChart.setOption(option)
           // 让图表跟随屏幕自动的去适应
           window.addEventListener('resize', function () {
               myChart.resize()
           })
       
         })
 
    },
    initBar3() {
     const instance1 = axios.create({
       baseURL: "/chain-api",
       timeout: 3000,
       headers: {}
     })

       instance1.post('/chinatea/production/data', {
         "field":[
             "green_tea","year","total_output"
           ],
           "area": {
               "value": "广东省",
               "strict": false
           },
           "year": {
               "from": 2010,
               "to": 2020
           }
         }).then(res=>{
           let resdata = res.data.data.Value
           let arr = [];
           let arr2 = [];
           for (let i = 0; i < resdata.length; i++) {
             arr.push(resdata[i].year)
             arr2.push(resdata[i].greenTea)
           }
           //去重选8条数据
           let yearList = Array.from(new Set(arr)).slice(0,10)
           let blackTea = Array.from(new Set(arr2)).slice(0,10)

           //看一下数据
          //  console.log(yearList);
          //  console.log(blackTea);
           // echarts 图
           let myChart = echarts.init(document.getElementById('bar3'))
           let colorList = ['#32c092']
           let option = {
               title: {
                   text: '2010-2020年广东省绿茶产量比较图',
                   left: 'center'
               },
               color: colorList,
               legend: {
                   itemGap: 25,
                   top: 'bottom',
                   data: ['总产量']
               },
               grid: {
                   left: '3%',
                   right: '4%',
                   bottom: '10%',
                   containLabel: true
               },
               xAxis: {
                   type: 'category',
                   data: yearList,
                   axisTick: { show: false }
               },
               yAxis: {
                   type: 'value',
                   max: 100000,
                   min: 0
               },
               toolbox: {
                 show: true,
                 // orient: 'vertical',
                 left: 'left',
                 top: 'top',
                 feature: {
                   // dataView: { readOnly: false },
                   restore: {},
                   saveAsImage: {
                     show:true
                   }
                 }
               },
               series: [
                   {
                       name: '绿茶产量',
                       type: 'bar',
                       barWidth: 35,
                       data: blackTea,
                       itemStyle: {
                           normal: {
                               label: {
                                   show: true, // 是否显示
                                   position: 'top',
                                   color: '#333',
                                   formatter: function(params) {
                                       return params.value
                                   }
                               }
                           }
                       }
                   },
                   
               ]
           }
           myChart.setOption(option)
           // 让图表跟随屏幕自动的去适应
           window.addEventListener('resize', function () {
               myChart.resize()
           })
       
         })
 
    },
    initBar4() {
     const instance1 = axios.create({
       baseURL: "/chain-api",
       timeout: 3000,
       headers: {}
     })

       instance1.post('/chinatea/production/data', {
         "field":[
             "oolong_tea","year","total_output"
           ],
           "area": {
               "value": "广东省",
               "strict": false
           },
           "year": {
               "from": 2010,
               "to": 2020
           }
         }).then(res=>{
           let resdata = res.data.data.Value
           let arr = [];
           let arr2 = [];
           for (let i = 0; i < resdata.length; i++) {
             arr.push(resdata[i].year)
             arr2.push(resdata[i].oolongTea)
           }
           //去重选8条数据
           let yearList = Array.from(new Set(arr)).slice(0,10)
           let blackTea = Array.from(new Set(arr2)).slice(0,10)

           //看一下数据
          //  console.log(yearList);
          //  console.log(blackTea);
           // echarts 图
           let myChart = echarts.init(document.getElementById('bar4'))
           let colorList = ['#32c092']
           let option = {
               title: {
                   text: '2010-2020年广东省乌龙茶产量比较图',
                   left: 'center'
               },
               color: colorList,
               legend: {
                   itemGap: 25,
                   top: 'bottom',
                   data: ['总产量']
               },
               grid: {
                   left: '3%',
                   right: '4%',
                   bottom: '10%',
                   containLabel: true
               },
               xAxis: {
                   type: 'category',
                   data: yearList,
                   axisTick: { show: false }
               },
               yAxis: {
                   type: 'value',
                   max: 5000,
                   min: 0
               },
               toolbox: {
                 show: true,
                 // orient: 'vertical',
                 left: 'left',
                 top: 'top',
                 feature: {
                   // dataView: { readOnly: false },
                   restore: {},
                   saveAsImage: {
                     show:true
                   }
                 }
               },
               series: [
                   {
                       name: '乌龙茶产量',
                       type: 'bar',
                       barWidth: 35,
                       data: blackTea,
                       itemStyle: {
                           normal: {
                               label: {
                                   show: true, // 是否显示
                                   position: 'top',
                                   color: '#333',
                                   formatter: function(params) {
                                       return params.value
                                   }
                               }
                           }
                       },
                       color:['#33a456']
                   },
                   
               ]
           }
           myChart.setOption(option)
           // 让图表跟随屏幕自动的去适应
           window.addEventListener('resize', function () {
               myChart.resize()
           })
       
         })
 
    },
    initBar5() {
     const instance1 = axios.create({
       baseURL: "/chain-api",
       timeout: 3000,
       headers: {}
     })
       instance1.post('/chinatea/production/data', {
         "field":[
             "yellow_tea","year","total_output"
           ],
           "area": {
               "value": "广东省",
               "strict": false
           },
           "year": {
               "from": 2010,
               "to": 2020
           }
         }).then(res=>{
           let resdata = res.data.data.Value
           let arr = [];
           let arr2 = [];
           for (let i = 0; i < resdata.length; i++) {
             arr.push(resdata[i].year)
             arr2.push(resdata[i].yellowTea)
           }
           //去重选8条数据
           let yearList = Array.from(new Set(arr)).slice(0,10)
           let blackTea = Array.from(new Set(arr2)).slice(0,10)

           //看一下数据
          //  console.log(yearList);
          //  console.log(blackTea);
           // echarts 图
           let myChart = echarts.init(document.getElementById('bar5'))
           let colorList = ['#32c092']
           let option = {
               title: {
                   text: '2010-2020年广东省黄茶产量比较图',
                   left: 'center'
               },
               color: colorList,
               legend: {
                   itemGap: 25,
                   top: 'bottom',
                   data: ['总产量']
               },
               grid: {
                   left: '3%',
                   right: '4%',
                   bottom: '10%',
                   containLabel: true
               },
               xAxis: {
                   type: 'category',
                   data: yearList,
                   axisTick: { show: false }
               },
               yAxis: {
                   type: 'value',
                   max: 1000,
                   min: 0
               },
               toolbox: {
                 show: true,
                 // orient: 'vertical',
                 left: 'left',
                 top: 'top',
                 feature: {
                   // dataView: { readOnly: false },
                   restore: {},
                   saveAsImage: {
                     show:true
                   }
                 }
               },
               series: [
                   {
                       name: '黄茶产量',
                       type: 'bar',
                       barWidth: 35,
                       data: blackTea,
                       itemStyle: {
                           normal: {
                               label: {
                                   show: true, // 是否显示
                                   position: 'top',
                                   color: '#333',
                                   formatter: function(params) {
                                       return params.value
                                   }
                               }
                           }
                       },
                       color: "#5ea115"
                   },
                   
               ]
           }
           myChart.setOption(option)
           // 让图表跟随屏幕自动的去适应
           window.addEventListener('resize', function () {
               myChart.resize()
           })
       
         })
 
    },
    initBar6() {
     const instance1 = axios.create({
       baseURL: "/chain-api",
       timeout: 3000,
       headers: {}
     })
       instance1.post('/chinatea/production/data', {
         "field":[
             "white_tea","year","total_output"
           ],
           "area": {
               "value": "广东省",
               "strict": false
           },
           "year": {
               "from": 2010,
               "to": 2020
           }
         }).then(res=>{
           let resdata = res.data.data.Value
           let arr = [];
           let arr2 = [];
           for (let i = 0; i < resdata.length; i++) {
             arr.push(resdata[i].year)
             arr2.push(resdata[i].whiteTea)
           }
           //去重选8条数据
           let yearList = Array.from(new Set(arr)).slice(0,10)
           let blackTea = Array.from(new Set(arr2)).slice(0,10)

           //看一下数据
          //  console.log(yearList);
          //  console.log(blackTea);
           // echarts 图
           let myChart = echarts.init(document.getElementById('bar6'))
           let colorList = ['#32c092']
           let option = {
               title: {
                   text: '2010-2020年广东省白茶产量比较图',
                   left: 'center'
               },
               color: colorList,
               legend: {
                   itemGap: 25,
                   top: 'bottom',
                   data: ['总产量']
               },
               grid: {
                   left: '3%',
                   right: '4%',
                   bottom: '10%',
                   containLabel: true
               },
               xAxis: {
                   type: 'category',
                   data: yearList,
                   axisTick: { show: false }
               },
               yAxis: {
                   type: 'value',
                   max: 5000,
                   min: 0
               },
               toolbox: {
                 show: true,
                 // orient: 'vertical',
                 left: 'left',
                 top: 'top',
                 feature: {
                   // dataView: { readOnly: false },
                   restore: {},
                   saveAsImage: {
                     show:true
                   }
                 }
               },
               series: [
                   {
                       name: '白茶产量',
                       type: 'bar',
                       barWidth: 35,
                       data: blackTea,
                       itemStyle: {
                           normal: {
                               label: {
                                   show: true, // 是否显示
                                   position: 'top',
                                   color: '#333',
                                   formatter: function(params) {
                                       return params.value
                                   }
                               }
                           }
                       }
                   },
                   
               ]
           }
           myChart.setOption(option)
           // 让图表跟随屏幕自动的去适应
           window.addEventListener('resize', function () {
               myChart.resize()
           })
       
         })
 
    },
    getChina(){
      const instance1 = axios.create({
        baseURL: "/chain-api",
        timeout: 5000,
        headers: {}
      })
          let year = this.val
          this.nums=[]
        instance1.get(`/chinatea/production/data/${year}`).then((res)=>{
            let arr=res.data.data.Value
            arr.forEach(item => {
                this.chinaData[item.province] = item
            })
            // console.log(res.data.data.Value);
            for (let i = 0; i < arr.length; i++) {
              this.nums.push(arr[i].totalOutput)
            }
            this.getMax()
            this.getMin()
            this.initChina();
           
          })
    },
    initChina(){    
      this.mydata = [
              { name: '北京市', value: this.chinaData.hasOwnProperty("北京市") ? this.chinaData.北京市.totalOutput:0},
              { name: '天津市', value: this.chinaData.hasOwnProperty("天津市") ? this.chinaData.天津市.totalOutput:0},
              { name: '上海市', value: this.chinaData.hasOwnProperty("上海市") ? this.chinaData.上海市.totalOutput:0},
              { name: '重庆市', value: this.chinaData.hasOwnProperty("重庆市") ? this.chinaData.重庆市.totalOutput:0},
              { name: '河北省', value: this.chinaData.hasOwnProperty("河北省") ? this.chinaData.河北省.totalOutput:0},
              { name: '河南省', value: this.chinaData.hasOwnProperty("河南省") ? this.chinaData.河南省.totalOutput:0},
              { name: '云南省', value: this.chinaData.hasOwnProperty("云南省") ? this.chinaData.云南省.totalOutput:0},
              { name: '辽宁省', value: this.chinaData.hasOwnProperty("辽宁省") ? this.chinaData.辽宁省.totalOutput:0},
              { name: '黑龙江省', value: this.chinaData.hasOwnProperty("黑龙江省") ? this.chinaData.黑龙江省.totalOutput:0},
              { name: '湖南省', value: this.chinaData.hasOwnProperty("湖南省") ? this.chinaData.湖南省.totalOutput:0},
              { name: '安徽省', value:  this.chinaData.hasOwnProperty("安徽省") ? this.chinaData.安徽省.totalOutput:0},
              { name: '山东省', value:  this.chinaData.hasOwnProperty("山东省") ? this.chinaData.山东省.totalOutput:0 },
              { name: '新疆维吾尔自治区', value: this.chinaData.hasOwnProperty("新疆维吾尔自治区") ? this.chinaData.新疆维吾尔自治区.totalOutput:0},
              { name: '江苏省', value: this.chinaData.hasOwnProperty("江苏省") ? this.chinaData.江苏省.totalOutput:0 },
              { name: '浙江省', value: this.chinaData.hasOwnProperty("浙江省") ? this.chinaData.浙江省.totalOutput:0 },
              { name: '江西省', value: this.chinaData.hasOwnProperty("江西省") ? this.chinaData.江西省.totalOutput:0 },
              { name: '湖北省', value: this.chinaData.hasOwnProperty("湖北省") ? this.chinaData.湖北省.totalOutput:0 },
              { name: '广西壮族自治区', value: this.chinaData.hasOwnProperty("广西壮族自治区") ? this.chinaData.广西壮族自治区.totalOutput:0 },
              { name: '甘肃省', value: this.chinaData.hasOwnProperty("甘肃省") ? this.chinaData.甘肃省.totalOutput:0 },
              { name: '山西省', value: this.chinaData.hasOwnProperty("山西省") ? this.chinaData.山西省.totalOutput:0 },
              { name: '内蒙古自治区', value: this.chinaData.hasOwnProperty("内蒙古自治区") ? this.chinaData.内蒙古自治区.totalOutput:0 },
              { name: '陕西省', value: this.chinaData.hasOwnProperty("陕西省") ? this.chinaData.陕西省.totalOutput:0 },
              { name: '吉林省', value: this.chinaData.hasOwnProperty("吉林省") ? this.chinaData.吉林省.totalOutput:0 },
              { name: '福建省', value: this.chinaData.hasOwnProperty("福建省") ? this.chinaData.福建省.totalOutput:0 },
              { name: '贵州省', value: this.chinaData.hasOwnProperty("贵州省") ? this.chinaData.贵州省.totalOutput:0 },
              { name: '广东省', value: this.chinaData.hasOwnProperty("广东省") ? this.chinaData.广东省.totalOutput:0 },
              { name: '青海省', value: this.chinaData.hasOwnProperty("青海省") ? this.chinaData.青海省.totalOutput:0 },
              { name: '西藏自治区', value: this.chinaData.hasOwnProperty("西藏自治区") ? this.chinaData.西藏自治区.totalOutput:0 },
              { name: '四川省', value: this.chinaData.hasOwnProperty("四川省") ? this.chinaData.四川省.totalOutput:0 },
              { name: '宁夏回族自治区', value: this.chinaData.hasOwnProperty("宁夏回族自治区") ? this.chinaData.宁夏回族自治区.totalOutput:0 },
              { name: '海南省', value: this.chinaData.hasOwnProperty("海南省") ? this.chinaData.海南省.totalOutput:0 },
              { name: '台湾省', value: this.chinaData.hasOwnProperty("台湾省") ? this.chinaData.台湾省.totalOutput:0 },
              { name: '香港特别行政区', value: this.chinaData.hasOwnProperty("香港特别行政区") ? this.chinaData.香港特别行政区.totalOutput:0 },
              { name: '澳门特别行政区', value: this.chinaData.hasOwnProperty("澳门特别行政区") ? this.chinaData.澳门特别行政区.totalOutput:0 },
            ];
      this.series = [
          {
            name: '接口数据',
            type: 'map',
            map: 'china',
            roam: true,
            label: { show: false },
            emphasis: { label: { show: true } },
            data: this.mydata,
            itemStyle:{
              normal:{//设置板块颜色
                areaColor:'#42c99b',
                borderColor: '#0692a4'
              }
            },
          },
        ],
        
      this.draw()
    },
    option(){
      var option = {
              backgroundColor: '#ffffff',
              title: { 
                text: `中国${this.val}年总产量/吨`, 
                subtext: '地图来源：高德开放平台 审图号：GS京(2022)1061号',//链接文本
                sublink: '',//链接地址
                left: 'center',
                top: 10
              },
              tooltip: { 
                trigger: 'item',
                showDelay: 0,
                transitionDuration: 0.2
              },
              grid: {
                left: 0,
                right: 0,
                top: 0,
                bottom: 0,
              },
              toolbox: {
                show: true,
                left: 'left',
                top: 'top',
                feature: {
                  dataView: { readOnly: false },
                  // restore: {},
                  saveAsImage: {
                    show:true
                  }
                }
              },
              visualMap: {
                // left: 'right',
                right: "50px",
                bottom: "30%",
                min: this.maxTotal,
                max: this.minTotal,
                calculable: false,
                realtime: false,
                inRange: {
                  color: [
                    '#313695',
                    '#4575b4',
                    '#74add1',
                    '#abd9e9',
                    '#e0f3f8',
                    '#ffffbf',
                    '#fee090',
                    '#fdae61',
                    '#f46d43',
                    '#d73027',
                    '#a50026'
                  ],
                },
                controller: {
                    inRange: {
                        symbolSize: [30, 100]
                    }
                },
                text: ['High', 'Low'],
              },
              series: this.series,
            };
      return option
    },
    draw() {
      if (
        //判断是否存在echarts实例化对象,如果存在则销毁
        this.chartsDom != null &&
        this.chartsDom != '' &&
        this.chartsDom != undefined
      ) {
        this.chartsDom.dispose()
      }
        var chartDom = document.getElementById('main')
        this.chartsDom = echarts.init(chartDom) //创建echarts实例化对象
        this.chartsDom.clear() //清空画布数据
        this.chartsDom.setOption(this.option()) //设置对应的参数,标题,x轴,y轴坐标,以及显示的数据
    },
    getMax(){
      this.maxTotal=Math.max(...this.nums)
    },
    getMin(){
      this.minTotal= Math.min(...this.nums)
    }
  },
  computed:{
  
  },
  mounted(){
    this.$nextTick(() => {
        this.initBar();
        this.initBar2();
        this.initBar3();
        this.initBar4();
        this.initBar5();
        this.initBar6();
        this.getChina();
        this.initChina();
    })
  },
  watch(){
    this.mydata;
    this.chinaData;
  }

}
</script>

<style scoped lang="scss">
  #top-box{
    margin: 70px auto;
    .search-wrapper{
      display:flex;
      justify-content: center;
      align-items: center;
      margin: 100px auto 10px;
    }
  }
  
  #line{
    margin: 80px auto;

  }
</style>
