<template>
    <!-- header -->
	<header class="header"> 
    <div class="container">

	  <div class="row">
	    <div class="col-md-3">
		  <div class="logo">
		    <p>WTT EMS</p>
		  </div>
		</div>
		
		<div class="col-md-6">
                  <div class="menu" >
                    <div id="dl-menu" class="dl-menuwrapper" >
                    <button class="dl-trigger">Open Menu</button>
                      <ul class="dl-menu">
                        <li class="current"><a href="index.html">Event</a></li>
                        <li><a href="#">Admin</a>
                            <ul class="dl-submenu">
                            	<li><a href="portfolio2.html">Edit Request Details</a></li>
                                <li><a href="portfolio3.html">Create New Event</a></li>
                                <li><a href="portfolio4.html">Portfolio 4</a></li>
                            </ul>
                        </li>
                        <li><a href="blog.html">On-Site</a></li>
                      </ul>
                    </div> 
                  </div><!-- /.menu --> 
		</div>

		<div class="col-md-3 user-info">
				<el-dropdown trigger="click" @command="loginout">
					<span class="el-dropdown-link">
						<img class="user-logo" src="@/assets/images/user_logo.jpg">&nbsp;&nbsp;
						{{username}}
					</span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="loginout">退出登录</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
				&nbsp;&nbsp;&nbsp;
				<el-dropdown trigger="click" @command="selectI18" style="color:#fff;" >
					<span >en<i class="el-icon-arrow-down"></i></span>
					<el-dropdown-menu slot="dropdown">
						<el-dropdown-item command="loginout">en</el-dropdown-item>
						<el-dropdown-item command="loginout">zh</el-dropdown-item>
					</el-dropdown-menu>
				</el-dropdown>
		</div>
		
	  </div>

	</div>
  </header>	
<!-- header -->
</template>

<script>
export default {
    data() {
		return {
			name : 'Tourist'
		}
	},
	computed:{
            username(){
                let username = sessionStorage.getItem('username');
                return username ? username : this.name;
            }
	},
	methods:{
            loginout(command) {
                if(command == 'loginout'){
                    sessionStorage.removeItem('username')
                    this.$router.push('/login');
                }
			},
			selectI18(command) {
				 if(command == 'loginout'){
                    sessionStorage.removeItem('username')
                    this.$router.push('/login');
                }
			}
	}
}
</script>

<style scoped>
	.user-info {
        float: right;
        display: block;
		padding: 10px 22px;
		color: #fff;
		text-decoration: none;
		text-transform: uppercase;
		font-size: 13px;
		font-family: "Open Sans",sans-serif;
		transition: all 0.4s ease-out 0s;
		border-bottom: 2px solid transparent;
    }
    .user-info .el-dropdown-link{
        position: relative;
        display: inline-block;
        padding-left: 80px;
        color: #fff;
        cursor: pointer;
        vertical-align: middle;
    }
    .user-info .user-logo{
        left:0;
        width:40px;
        height:40px;
        border-radius: 50%;
    }
</style>
