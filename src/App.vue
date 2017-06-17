<template>
  <div id="app">
    <button @click="showViewer = true">显示图片查看器</button>
    <button @click="pushImg">动态增加图片</button>
    <v-pviewer :list="list" v-model="showViewer">
      <ul class="gallery">
        <li>
          <img desc="可以让一部分浏览器的窗体不能滚动，但不包括Safari等浏览器，怎么办呢？" class="pic" src="https://p.qpic.cn/qqconadmin/0/e4a67754b2d1485aa186a4d38dbf07e1/0">
        </li>
        <li>
          <img desc="我们可以在浮层touchmove的时候，阻止默认事件达到避免滚动的问题，例如：" class="pic" src="https://gpic.qpic.cn/gbar_pic/2aqluyraXicEfqicaK3aV4iaib5icib78qF0eFxokIEKSewIg8hQW0kiavCQg/1000">
        </li>
        <li>
          <img desc="这种处理兼容性强，效果最好，但是有一个问题，就是如果浮层自己也有滚动，那么这种处理会让浮层里面自己的滚动行为也无法触发，因此，我们的处理要更进一步，如下：" class="pic" src="https://gpic.qpic.cn/gbar_pic/3MSgRdnPzZAQnkIModguuoU1PXSKZUup1B67V82b3KicfhjAVwh19BRFia4DgWfxgg/1000">
        </li>
        <li>
          <img desc="根据上述原理，我自己抽象了一个简单的方法，方法名和语法如下，完整代码见这里：" class="pic" src="https://gpic.qpic.cn/gbar_pic/2aqluyraXicEfqicaK3aV4iazVolQTREmcvaEG92Hy9oibhyDJHNzu1s3w/1000">
        </li>
        <li>
          <img desc="" class="pic" src="https://gpic.qpic.cn/gbar_pic/emH5YQz0vOJ2E0L6ZljlcW9nFgQzMXtpN240iaeB7PFUhZSWvvpbtLA/1000">
        </li>
        <li>
          <img desc="" class="pic" src="https://gpic.qpic.cn/gbar_pic/hVlQlSGMCtYlKrqpM5xwdmJrbh4iaawOgY6lFT1eNWTib7qv2Z2QuJWXmchPUqBriay/1000">
        </li>
        <li>
          <img desc="" class="pic" src="https://gpic.qpic.cn/gbar_pic/lDVAjxOVicMnyU4OWLShicffM3TvZYFia4ywL0B5oC3BLPDCoIkgdkJLA/0">
        </li>
        <li>
          <img desc="" class="pic" src="https://gpic.qpic.cn/gbar_pic/2aqluyraXicEfqicaK3aV4ia3YQE3mKcibH02jibympJ4gzCUEjk2Iz5BwQ/1000">
        </li>
        <li>
          <img desc="" class="pic" src="https://gpic.qpic.cn/gbar_pic/rqlh3lfegUYAvWGGNA8wyC5kly2PwLzONQsSatcxicqJOw0gz9MGmZg/1000">
        </li>
        <li>
          <img desc="" class="pic" src="https://gpic.qpic.cn/gbar_pic/PR0vBBjLNC7PpwKQ5YmKjo9ricr8EqAZFQVzXJG96SKCr4hVoWiaT4OQ/0">
        </li>
      </ul>
    </v-pviewer>
  </div>
</template>

<script>
// import VPviewer from './components/VPviewer'
import VPviewer from '../dist/pviewer.js';
import '../dist/pviewer.css';

export default {
  name: 'app',
  components: {
    VPviewer
  },
  data() {
    return {
      showViewer: false,
      list: [{
        img: 'https://gpic.qpic.cn/gbar_pic/PR0vBBjLNC7PpwKQ5YmKjo9ricr8EqAZFQVzXJG96SKCr4hVoWiaT4OQ/0',
        title: '随便什么标题都可能，非必须',
        desc: '随便什么描述都可以，非必须'
      }, {
        img: 'https://gpic.qpic.cn/gbar_pic/hVlQlSGMCtYlKrqpM5xwdmJrbh4iaawOgY6lFT1eNWTib7qv2Z2QuJWXmchPUqBriay/1000'
      }]
    }
  },
  methods: {
    pushImg() {
      this.list.push({
        img: 'https://gpic.qpic.cn/gbar_pic/hVlQlSGMCtYlKrqpM5xwdmJrbh4iaawOgY6lFT1eNWTib7qv2Z2QuJWXmchPUqBriay/1000'
      })
    }
  }
}

</script>

<style>
html,
body {
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

.gallery img {
  width: 100%;
}
</style>
