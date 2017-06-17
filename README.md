# vue-photo-viewer

>一个vuejs的手机图片查看器

![image](https://git.oschina.net/liupan520/vue-photo-viewer/raw/master/photo-viewer.jpg)

![image](https://git.oschina.net/liupan520/vue-photo-viewer/raw/master/photo-viewer-2.jpg)

## 演示地址 [DOME](http://liu-pan.cc/production)

## 使用

``` html

<meta name="viewport" content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=0">

```

#### 安装

``` bash

//需要vue.js 2.1.5 以上版本
npm install vue-photo-viewer

```

### 用于 *.vue 组件化开发模式中

#### 方式一

直接用`vie-photo-viewer`包住需要查看的dom即可。 `vie-photo-viewer` 会自动查找自己所包含的所有图片，并初始化查看功能。如果需要显示图片描述，请在`img`标签上加入 `desc` 属性。

``` html

<template>
  <div id="app">
    <v-pviewer>
      <ul class="gallery">
        <li>
          <img desc="可以让一部分浏览器的窗体不能滚动，但不包括Safari等浏览器，怎么办呢？" src="https://p.qpic.cn/qqconadmin/0/e4a67754b2d1485aa186a4d38dbf07e1/0">
        </li>
        <li>
          <img desc="" src="https://gpic.qpic.cn/gbar_pic/2aqluyraXicEfqicaK3aV4iaib5icib78qF0eFxokIEKSewIg8hQW0kiavCQg/1000">
        </li>
        <li>
          <img src="https://gpic.qpic.cn/gbar_pic/emH5YQz0vOJ2E0L6ZljlcW9nFgQzMXtpN240iaeB7PFUhZSWvvpbtLA/1000">
        </li>
      </ul>
    </v-pviewer>
  </div>
</template>

<script>
import VPviewer from 'vue-photo-viewer';
import 'vue-photo-viewer/dist/pviewer.css';

export default {
  components: {
    VPviewer
  }
}
</script>

```

#### 方式二

使用imglist传递数据，自己控制显示和隐藏

``` html

<template>
  <div id="app">
    <button @click="showViewer = true">显示图片查看器</button>
    <button @click="pushImg">动态增加图片</button>
    <v-pviewer :lis="imglist" v-model="show" @zoom="zoom" @slide-end="slide" @slide-next="slide" @slide-pre="slide"></v-pviewer>
  </div>
</template>
<script>
import VPviewer from 'vue-photo-viewer';
import 'vue-photo-viewer/dist/pviewer.css';

export default {
  components: {
    VPviewer
  },
  data(){
      return {
          show:false,
          imglist:[{
              img:'https://p.qpic.cn/qqconadmin/0/e4a67754b2d1485aa186a4d38dbf07e1/0',
              desc:'可以让一部分浏览器的窗体不能滚动，但不包括Safari等浏览器，怎么办呢？'
          },{
              img:'https://p.qpic.cn/qqconadmin/0/e4a67754b2d1485aa186a4d38dbf07e1/0'
          }]
      }
  },
  methods:{
      pushImg(){
          this.list.push({img:'src.jpg'});
        },
        zoom(val) {
            console.log(val);
        },
        slide(val) {
            console.log(val);
        }
    }
}
</script>

```

#### 方式三

前面两种方法混合使用，但需要注意的几点：
1、方式一的查找机制会在自定义imglist之前运行。这意为着dom内的图片排序会在`imglist`之前；
2、混合使用时，暂不支持动态添加图片或对`imglist`进行任何修改。


### script 引入 

``` html

<script src="vue/dist/vue.js"></script>
<script src="vue-phone-model/dist/pviewer.js"></script>

```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
