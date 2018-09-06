<template>
    <div class="maincontent">
    <h1 class="b_nav"><span>这一切，都不能挽回了吗？</span><span class="left_nav">文章管理</span></h1>
    <el-tabs type="border-card">
        <el-tab-pane label="新增文章">
            <div class="tabcontent">
             <!-- <h2>新增文章</h2> -->
                <!-- quill-editor -->
                <el-form ref="form" :rules="rules" :model="form" label-width="80px" :label-position="labelPosition" size="mini">
                     <el-form-item label="文章标题" prop="title">
                        <el-input v-model="form.title"></el-input>
                    </el-form-item>
                    <el-form-item label="作者" prop="author">
                        <el-input v-model="form.author"></el-input>
                    </el-form-item>
                    <el-form-item label="文章图片">
                        <el-upload
                        class="avatar-uploader"
                        action="/articles/uploadImgForArticleTitle"
                        :show-file-list="false"
                        :on-success="handleAvatarSuccess"
                        :before-upload="beforeAvatarUpload"
                        >
                        <img v-if="imageUrl" :src="imageUrl" class="avatar"  style="border:dashed 1px #d9d9d9">
                        <i v-else class="el-icon-plus avatar-uploader-icon"  style="border:dashed 1px #d9d9d9"></i>
                        </el-upload>
                    </el-form-item>
                    <el-form-item label="文章内容" >
                        <quill-editor 
                        ref="myTextEditor"
                        v-model="content" 
                        :options="editorOption" style="height:400px;padding-top:20px;">
                        </quill-editor>
                    </el-form-item>
                    <el-form-item label="">
                        <div class="quill-code">
                            <code class="hljs" v-html="contentCode"></code>
                        </div>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form')">Save</el-button>
                        <el-button>取消</el-button>
                    </el-form-item>
                </el-form>
                
            </div>
        </el-tab-pane>
        <el-tab-pane label="编辑文章">配置管理</el-tab-pane>
        <el-tab-pane label="文章管理">角色管理</el-tab-pane>
    </el-tabs>
    </div>
</template>

<script>
import 'quill/dist/quill.core.css';
import 'quill/dist/quill.snow.css';
import 'quill/dist/quill.bubble.css';
import { quillEditor } from 'vue-quill-editor';
import hljs from 'highlight.js'
import axios from "axios";
export default {
    name: "Manage-Article",
    data() {
        return {
            labelPosition: 'top',
            imageUrl: '',
            content: `<h2 class="ql-align-center"><span class="ql-font-serif">Text content loading..</span></h2>`,
            editorOption: {
                placeholder: 'Hello World'
            },
            form: {
                title: '',
                author: ''
            },
            rules: { 
                title : [
                     { required: true, message: '请输入文章标题', trigger: 'blur' }
                ],
                author : [
                     { required: true, message: '请输入你的名字', trigger: 'blur' }
                ]
            }


        }
    },
    components: {
        quillEditor
    },
    computed: {
      editor() {
        return this.$refs.myTextEditor.quill
      },
      contentCode() {
        return hljs.highlightAuto(this.content).value
      }
    },
    methods: {
        onSubmit() {
            console.log('提交成功！');
        },
        submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('title:'+this.form.title);
            console.log('author:' + this.form.author);
            console.log('content:' + this.content);
            this.saveArticle();
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
       handleAvatarSuccess(res, file) {
        this.imageUrl = URL.createObjectURL(file.raw);
         },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      async saveArticle() {
         const response = await axios.post('/articles/addArticle', {
                title: this.form.title,
                content: this.content,
                author: this.form.author
            })
            .then( response => response
            )
            .catch(function (error) {
                console.log(error);
            });
            console.log(response);
            if(response.status == 200 & response.data.code ==200 & response.data.message == 'SUCCESS') {
                     this.$alert('新增文章成功', '消息', {
                        confirmButtonText: '确定',
                        });
                } else {
                      this.$alert('新增文章失败', '消息', {
                        confirmButtonText: '确定',
                        });
                }
        }
    }
   
}
</script>

<style scoped>
.maincontent{
    margin: 20px auto;
    width: 1000px;
}
.tabcontent {
    margin: 10px 20px;
    height: auto;
    
}
.quill-code {
    border: none;
    height: auto;
    padding-top: 50px;
}
 .avatar-uploader.el-upload {
    border: solid 1px #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader.el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
    h1.b_nav { border-bottom: #F1F1F1 1px solid; font-size: 12px; font-weight: normal; line-height: 40px; height: 40px; }
    h1.b_nav span{float:right; color:#999}
    h1.b_nav .left_nav {
        float:left;
        font-size:20px;
    }
</style>
