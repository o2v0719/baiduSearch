<template>
  <div class="container">
    <div class="search">
      <div class="left">
        <img src="../assets/baiduLogo.svg" alt="" class="logo" />
      </div>
      <input type="text" class="input" @keyup="getContent()" v-model="inputVal" />
      <div class="right">
        <span class="clear iconfont icon-chahao" @click="clear"></span>
        |
        <span class="baidu"> 百度搜索</span>
      </div>
    </div>
    <div v-show="isShow" class="content" ref="isShow">
      <ul>
        <li class="item" v-for="item in list" :key="item.sa" @click="replaceInput(item.q)">
          <i class="iconfont icon-soushuo"></i>
          <span v-if="item.pre" class="item-pre">{{ item.pre }}</span>
          <span v-else>{{ item.q }}</span>
          <span v-if="item.last">{{ item.last }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: "Search",
  props: {},
  data () {
    return {
      inputVal: "",
      list: [],
      isShow: false,
    };
  },
  methods: {
    getContent () {
      if (this.inputVal) {
        this.$jsonp(
          `http://www.baidu.com/sugrec?pre=1&p=3&ie=utf-8&json=1&prod=pc&from=pc_web&wd=${this.inputVal}`,
          this.handleCallback
        );
      } else {
        this.isShow = false;
      }
    },
    handleCallback (err, res) {
      if (!err && res.g) {
        // console.log(res);
        this.list = res.g;
        this.isShow = true;
        // 剥离关键字
        this.list.map((item) => {
          if (item.q.startsWith(this.inputVal)) {
            item.pre = item.q.substr(0, this.inputVal.length);
            item.last = item.q.substr(this.inputVal.length);
          }
          return item;
        });
      }
    },
    clear () {
      this.inputVal = "";
      this.isShow = false;
    },
    replaceInput (v) {
      this.inputVal = v;
      this.isShow = false;
    },
  },
};
</script>

<style scoped>
@import '../assets/font/iconfont.css';
.container {
  width: 500px;
  margin: 0 auto;
}
.search {
  display: flex;
  justify-content: space-between;
  width: 500px;
  margin: 0 auto;
}
.left {
  z-index: 1;
  margin: 4px -120px 0 4px;
}
.logo {
  display: block;
  width: 28px;
  height: 28px;
  padding-left: 24px;
}
.input {
  display: block;
  width: 300px;
  height: 30px;
  padding: 0 110px 0 42px;
  font-size: 18px;
}
.right {
  margin: 0 0 0 -220px;
  width: 160px;
  line-height: 33px;
}
.clear {
  display: inline-block;
  margin: 0 3px 0 0;
  z-index: 1;
}
.baidu {
  font-size: 17px;
  width: 100px;
  font-weight: 600;
  cursor: pointer;
  color: #415ee0;
  padding-right: 8px;
}
.baidu:hover {
  color: #1f328a;
}
.content {
  width: 350px;
}
ul {
  list-style: none;
  text-align: left;
  margin: 0 auto;
}
ul li {
  padding: 3px 0;
  border-bottom: 1px solid #ddd;
  font-size: 18px;
}

ul li:hover {
  color: #415ee0;
  cursor: pointer;
}
.icon-soushuo {
  padding-right: 10px;
  color: rgb(177, 175, 175);
}
.icon-chahao {
  cursor: pointer;
}
.icon-chahao:hover,
ul li:hover .icon-soushuo {
  color: #415ee0;
}
.item-pre {
  opacity: 0.6;
}
/* ! */
ul li:hover .item-pre {
  opacity: 1;
}
</style>
