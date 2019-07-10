<template>
  <div id="tab">
    <mt-header fixed :title="title"></mt-header>

    <div class="tab">
        <div class="tab_item" v-for="(item,index) in tabArray" :key="index" @click="tabClick(index)" >
          <span :class="item.isSelected ? 'tab_text':'tab_text_unselect'">{{item.name}}</span>
          <div :class="item.isSelected?'indicator_select':'indicator_unselect'"></div>
        </div>
    </div>
    

    <hr style="margin-top:0px;border:none;background:#ccc">

    <div v-infinite-scroll="loadMore"
      infinite-scroll-disabled="loading"
      infinite-scroll-distance="10">
    <mt-loadmore
      :top-method="loadTop"
      ref="loadmore">
      <router-link :to="{name:'content', params:{title:item.ArticleTitle,item:item}}" v-for="(item,index) in artilceList" :key="index">
        <div class="item" >
          <img :src="item.ArticleCoverImageUrl" alt class="image" />
          <label>{{item.ArticleTitle}}</label>
      </div>
      </router-link>
     
      <div v-show="loading" class="loading">
        <mt-spinner type="fading-circle"/>
        <span style="margin-left:10px">加载中...</span>
      </div>
    </mt-loadmore>

    </div>
  
  </div>
</template>

<script>
import { Indicator } from 'mint-ui';

export default {
  data() {
    return {
      title: "首页",
      selected: "0",
      page: 1,
      type:"HOT",
      loading:false,
      activated:true,
      artilceList: [],
      tabArray: [
        {
          type: "HOT",
          name: "热门",
          isSelected:true,
        },
        {
          type: "FUNNY",
          name: "搞笑",
          isSelected:false,
        },
        {
          type: "TECH",
          name: "科技",
          isSelected:false,
        },
        {
          type: "LIFE",
          name: "生活",
          isSelected:false,
        },
        {
          type: "GAME",
          name: "游戏",
          isSelected:false,
        }
      ]
    };
  },
  methods: {
    tabClick(position) {
      console.log(position);

      for (let index = 0; index < this.tabArray.length; index++) {
          this.tabArray[index].isSelected = index == position  
      }

      this.type = this.tabArray[position].type
      
      this.showLoading()
      this.page = 1
      this.loadData()
    },

    loadTop() {
      console.log(this.type)
        this.page = 1
        this.loadData()
    },

    loadMore(){
      if(!this.loading && this.artilceList.length != 0 && this.activated){
        console.log("Load more")
        this.loading = true
        this.page ++;
        this.loadData()
      }
    },

    showLoading(){
      Indicator.open({
        text: '加载中...',
        spinnerType: 'fading-circle'
      });
    },

    loadData() {
      let url ="https://api.gugudata.com/news/wxarticle?appkey=LS6BMHJVX8BF&type=" +this.type + "&pageindex=" +this.page +"&pagesize=10";
      this.$http.get(url).then(
        response => {
          //console.log(response);
          if (response.body.DataStatus.StatusCode == 100) {
            this.loading = false
            this.$refs.loadmore.onTopLoaded();

            if(this.page ==1){
              this.artilceList = []
            }

            this.artilceList = this.artilceList.concat(response.body.Data);
            if(response.body.Data.length < 10){
              this.loading = false
            }
          }
        },
        error => {}
      ).finally(()=>{
        Indicator.close();

      });
    }
  },
  mounted() {
    console.log("mouted");
    
    //this.loadData();
  },
  created(){
    this.showLoading()
    this.loadData()
  },

  activated(){
        this.activated = true

   console.log("activated");
   
  },

  deactivated(){
    console.log("deactivated");
    this.activated = false
  }
  
};
</script>

<style  scoped>
hr {
  background-color: #cccccc;
  border: none;
  height: 1px;
}

.tab{
  margin-top: 40px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.tab_item{
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  align-items: center;
}

.tab_text{
  padding-bottom: 10px;
  font-size: 16px;
  color: #0097fe;
}

.tab_text_unselect{
   padding-bottom: 10px;
  font-size: 16px;
  color: #333;
}


.indicator_select{
  background-color: #0097fe;
  height:3px;
  width: 50%;
}

.indicator_unselect{
   background-color: transparent;
  height:3px;
  width: 50%;
}

.navBar {
  margin-top: 40px;
}

.mint-cell {
  margin-top: 10px;
}

.item {
  padding: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.image {
  height: 50px;
  width: 50px;
  border-radius: 3px;
  border: 1px solid #ccc;
}

label {
  flex: 1;
  margin-left: 7px;
  font-size: 15px;
  color: #333;
}

.loading{
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-left: 40%;
}

a{
  text-decoration: none;
}
</style>
