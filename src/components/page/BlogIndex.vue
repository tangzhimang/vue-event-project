<template>
<div>
<div class="banner">
  <section class="box">
    <ul class="texts">
      <p>打了死结的青春，捆死一颗苍白绝望的灵魂。</p>
      <p>为自己掘一个坟墓来葬心，红尘一梦，不再追寻。</p>
      <p>加了锁的青春，不会再因谁而推开心门。</p>
    </ul>
    <div class="avatar"><a href="#"><span>杨青</span></a> </div>
  </section>
</div>
<article style="padding-bottom:40px;">
    <el-container>
    <el-header style="margin:20px 0px 0px;height:20px;padding:0px;">
        <h2 class="title_tj">
            <p>文章<span>推荐</span></p>
        </h2>
    </el-header>
     <el-container style="margin:0px;padding:0px;">
        <el-main style="margin:0px;padding:0px;" width="760px">
             <div class="bloglist" v-for="article in articles" :key="article.articleId">
                <h3>{{article.title}}</h3>
                <figure><img :src="article.imgurl"></figure>
                <ul>
                <p>{{article.overLookContent}}</p>
                <a title="/" href="/" target="_blank" class="readmore">阅读全文>></a>
                </ul>
                <p class="dateview"><span>{{article.articleDateString}}</span><span>作者：{{article.author}}</span><span>{{article.source}}</span></p>
            </div>
             <el-pagination
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage"
                :page-sizes="[2, 3, 5, 10]"
                :page-size="pageSize"
                layout="total, sizes, prev, pager, next, jumper"
                :total="totalNum">
                </el-pagination>
            <div id="test">
                <p>{{ count }}</p>
                <p>
                    <button @click="increment">+</button>
                    <button @click="decrement">-</button>
                </p>
            </div>
        </el-main>
        <el-aside style="margin:0px;padding:0px;overflow-x:hidden" width="250px">
                <div class="weather">
                    <iframe width="250" scrolling="no" height="60" frameborder="0" allowtransparency="true" src="http://i.tianqi.com/index.php?c=code&id=12&icon=1&num=1">
                    </iframe>
                </div>
                <div class="news">
                <h3>
                <p>最新<span>文章</span></p>
                </h3>
                <ul class="rank">
                <li><a href="/" title="Column 三栏布局 个人网站模板" target="_blank">Column 三栏布局 个人网站模板</a></li>
                <li><a href="/" title="with love for you 个人网站模板" target="_blank">with love for you 个人网站模板</a></li>
                <li><a href="/" title="免费收录网站搜索引擎登录口大全" target="_blank">免费收录网站搜索引擎登录口大全</a></li>
                <li><a href="/" title="做网站到底需要什么?" target="_blank">做网站到底需要什么?</a></li>
                <li><a href="/" title="企业做网站具体流程步骤" target="_blank">企业做网站具体流程步骤</a></li>
                <li><a href="/" title="建站流程篇――教你如何快速学会做网站" target="_blank">建站流程篇――教你如何快速学会做网站</a></li>
                <li><a href="/" title="box-shadow 阴影右下脚折边效果" target="_blank">box-shadow 阴影右下脚折边效果</a></li>
                <li><a href="/" title="打雷时室内、户外应该需要注意什么" target="_blank">打雷时室内、户外应该需要注意什么</a></li>
                </ul>
                <h3 class="ph">
                <p>点击<span>排行</span></p>
                </h3>
                <ul class="paih">
                <li><a href="/" title="Column 三栏布局 个人网站模板" target="_blank">Column 三栏布局 个人网站模板</a></li>
                <li><a href="/" title="withlove for you 个人网站模板" target="_blank">with love for you 个人网站模板</a></li>
                <li><a href="/" title="免费收录网站搜索引擎登录口大全" target="_blank">免费收录网站搜索引擎登录口大全</a></li>
                <li><a href="/" title="做网站到底需要什么?" target="_blank">做网站到底需要什么?</a></li>
                <li><a href="/" title="企业做网站具体流程步骤" target="_blank">企业做网站具体流程步骤</a></li>
                </ul>
                <h3 class="links">
                <p>友情<span>链接</span></p>
                </h3>
                <ul class="website">
                <li><a href="/">个人博客</a></li>
                <li><a href="/">谢泽文个人博客</a></li>
                <li><a href="/">3DST技术网</a></li>
                <li><a href="/">思衡网络</a></li>
                </ul> 
                </div>  
        </el-aside>
     </el-container>
</el-container>
</article>
</div>
</template>

<script>
import axios from "axios";
import loginByusername from '@/api/login'
import store from '@/store'

export default {
    name:"blogIndex",
    data() {
        return {
            getArticlesUrl: "/articles/getArticles",
            articles : [],
            currentPage: 1,
            totalNum : 0,
            pageSize : 3,
            username : 'tom',
            password : '123456'
        }
    },
    computed: {
        count() {
            return store.state.count
        }
    },
    methods: {
        async getArticles (page,size) {
            this.getArticlesUrl = '/articles/getArticles' + '?page=' + page + '&size=' + size;
            console.log("article url:" + this.getArticlesUrl);
            try {
                const response = await axios.get(this.getArticlesUrl);
                if (response.status == 200) {
                console.log(response.data);
                let statusCode = response.data.code;
                    if (statusCode == "200" ) {
                        this.articles = response.data.data.list;
                        this.totalNum = response.data.data.total
                        console.log(this.articles)
                    } else {
                        throw "Login failed!";
                    }
                } else {
                throw response.status;
                }
            } catch (error) {
                console.log(error);
            }
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
            this.pageSize = val,
             this.getArticles(1,this.pageSize)
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage = val,
            this.getArticles(this.currentPage,this.pageSize)
        },
        showMockJs(){
            // 使用 Mock
            var Mock = require('mockjs')
            var data = Mock.mock({
                // 属性 list 的值是一个数组，其中含有 1 到 10 个元素
                'list|1-10': [{
                    // 属性 id 是一个自增数，起始值为 1，每次增 1
                    'id|+1': 1
                }],
                name: {
                        first: '@FIRST',
                        middle: '@FIRST',
                        last: '@LAST',
                        full: '@first @middle @last'
                }
            })
            // 输出结果
            console.log(JSON.stringify(data,null,4))
        },
        login() {
            loginByusername(this.username,this.password).then(
                response => {
                    const data = response.data;
                    console.log(JSON.stringify(data))
                }
            ).catch(
                error => {
                    console.log(error)
                }
            )
        },
        increment () {
            store.commit('increment')
        },
        decrement () {
            store.commit('decrement')
        }

    },
    created: function() {
        //this.getArticles(1,3);
        //this.showMockJs();
        this.login()
    }
    
}
</script>

<style scoped>
@import "../../assets/blogcss/index.css";
</style>
