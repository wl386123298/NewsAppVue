<template>
  <div>
    <mt-header :title="title" fixed>
      <router-link to="/" slot="left">
        <mt-button icon="back"></mt-button>
      </router-link>
    </mt-header>

    <div class="content">
      <h3>{{title}}</h3>

      <p :title="title"/>
      <div class="desc">
        <span>{{this.$route.params.item.ArticlePublishDateTime}}</span>
        <span>{{this.$route.params.item.AuthorName}}</span>

      </div>

      <div v-html="content" class="v-content"></div>

      <a :href="this.$route.params.item.ArticleUrl" target="_blank" class="see">查看原文</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title:"contentTitle",
      contentUrl:"",
      content:""
    };
  },
  methods: {},
  mounted(){
    let params = this.$route.params
    this.content= params.item.ArticleContent.replace("\r","<br/>")
    .replace("\n","<br/>")
    console.log(params);
    
    this.title = params.title
  }
};
</script>

<style scoped>
.content{
  margin-top: 50px;
}

h3{
  font-size: 20px;
  color: #333;
  text-align: center;
  margin: 0
}

span{
  font-size: 14px;
  color: #999;
  margin-right: 10px;
}

.desc{
  margin-bottom: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.v-content{
  color: #333;
  font-size: 16px;
}

.see{
  margin-left: 80%;
  font-size: 16px;
  margin-top: 10px;
  margin-bottom: 10px;
  text-decoration: none;
}

</style>