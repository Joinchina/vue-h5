<template>
    <div :class="{root:true}" v-loading="lodingF">
        <article>
            <span class="headTitle">师训宝各功能上限说明</span>
            <ul class="lists">
                <li v-for="(item,index) in lists" :key="index" :class="{active:item.type&&item.type.indexOf(type)>-1}" :id="item.type">
                    <h2 class="title">
                        <span class="activeDote"><em></em></span>
                        {{item.title}}
                    </h2>
                    <p class="text" v-html="item.detail"></p>
                </li>
            </ul>
        </article>
        <footer>
            <input type="text" class="writeInput" placeholder="请输入姓名" v-model="ajaxData.contact">
            <input type="text" class="writeInput" placeholder="请输入联系电话" v-model="ajaxData.phone">
            <input type="text" class="writeInput" placeholder="请输入职位" v-model="ajaxData.job">
            <span class="submitBtn" @click="submit">提交</span>
        </footer>
    </div>
</template>

<script>
    import api from "../../axios/api.js"
    export default {
        data () {
            return {
                lists:[
                    {
                        title : "学员导入名额上限及升级",
                        detail : "免费机构默认赠送500位学员导入名额，机构累计导入学员数量达到500人，将无法导入新增学员，需单独购买学员导入名额或升级成为VIP客户解锁导入名额限制，具体购买事宜可联系师训宝商务协商交流。<br/>VIP客户无学员导入名额上限。",
                        type : "stuNum"
                    },
                    {
                        title : "直播时长上限及升级",
                        detail : "师训宝免费为平台所有机构开通直播课程体验功能，免费客户默认赠送10小时直播体验，用尽后可升级VIP客户获取更多直播时长；<br/>VIP客户默认赠送100小时直播时长，用尽后可联系师训宝商务单独购买增加。",
                        type : "liveTime"
                    },
                    {
                        title : "网络课程上限及升级",
                        detail : "师训宝平台汇集了奥鹏教育多年研发的各类网络课程资源，平台客户均可添加使用。<br/>免费客户每班可选择1门网络课程添加学习，VIP客户每班可选3门网络课程添加学习，如需选择更多，可联系师训宝商务单独购买增加。",
                        type : "onlineCompulsoryonlineElective"
                    },
                    {
                        title : "存储空间上限及升级",
                        detail : "通过平台产生的培训数据，师训宝会免费帮助机构进行云端数据存储。<br/>免费客户默认拥有10G存储空间，存储时效1年，1年内可查看培训数据，可通过升级为VIP客户提升存储空间。<br/>VIP客户赠送500G存储空间，存储时效5年，5年内支持培训数据随时查阅及下载。VIP客户存储空间达到上限需联系师训宝商务人员单独购买增加。",
                        type : "storage"
                    },
                    {
                        title : "学员作业附件上传上限",
                        detail : "师训宝学员作业提交支持上传附件功能，附件类型支持文档与视频。<br/>免费客户文档类文件上传上限为5M/文件、视频类50 M /文件；付费客户文档类文件上传上限为30 M /文件，视频类300 M /文件。",
                        type : "stuAttachment"
                    },
                    {
                        title : "高级功能申请开通",
                        detail : "为了向各机构提供更优质的服务，师训宝推出VIP会员功能，部分高级功能仅对VIP客户开放。<br/>如您需要使用选修课（包含选项课程设置及网络课程选修）、短信提醒、数据导出、专家库等高级功能，请联系师训宝商务人员交流协商。"
                    },
                ],
                ajaxData : {
                    contact : "",
                    phone : "",
                    job : ""
                },
                lodingF : false,
            }
        },
        created(){
            this.pcDevice = document.documentElement.clientWidth>650;
            document.title = "师训宝各功能上限升级说明";
        },
        computed:{
            orgId(){
                return this.$route.query.orgId
            },
            type(){
                return this.$route.query.type;
            }
        },
        mounted(){
            document.querySelector('.root').setAttribute('style',"height: "+document.documentElement.clientHeight+"px");
            //获取与当前li想匹配的div距离页面顶端的距离
            setTimeout(()=>{
                console.log($('.lists li:last-child'));
                let activeNode = $('.lists .active')[0];
                if(!activeNode){
                    activeNode = $('.lists li:last-child').addClass("active")[0];
                    activeNode.id = "lastLI";
                }
                // let idName = ( this.type == "onlineCompulsory" || this.type == "onlineElective" ) ? "onlineCompulsoryonlineElective" : this.type;
                window.location.href = window.location.href.split("#")[0] + "#" + activeNode.id;
                console.log(window.location.href.split("#")[0] + "#" + activeNode.id)
            },0)
        },
        methods:{
            submit(){
                if(this.ajaxData.contact.trim()==""){
                    this.$alert('姓名不能为空', {
                        confirmButtonText: '确定',
                        type: 'error',
                    });
                    return
                }
                if(this.ajaxData.contact.trim().length>12){
                    this.$alert('姓名不得超过十二个字', {
                        confirmButtonText: '确定',
                        type: 'error',
                    });
                    return
                }
                if(this.ajaxData.phone.trim()==""){
                    this.$alert('联系电话不能为空', {
                        confirmButtonText: '确定',
                        type: 'error',
                    });
                    return
                }
                if(!(/^1\d{10}$/.test(this.ajaxData.phone.trim()))) {
                    this.$alert('请输入正确的手机号', {
                        confirmButtonText: '确定',
                        type: 'error',
                    });
                    return
                }
                if(this.ajaxData.job.trim()==""){
                    this.$alert('职位不能为空', {
                        confirmButtonText: '确定',
                        type: 'error',
                    });
                    return
                }
                if(this.ajaxData.job.trim().length>30){
                    this.$alert('职位不得超过30个字', {
                        confirmButtonText: '确定',
                        type: 'error',
                    });
                    return
                }
                this.lodingF=true;
                let data = {
                    organizationId : this.orgId ,     // 机构id
                    type : "NEW",               //申请类型：CONTINUE（续约）；NEW（开通）
                    content: this.formatType(this.type),
                    ...this.ajaxData
                }
                this.$jsonPost(api.urls.saveVipApply,data).then(res=>{
                    this.lodingF=false;
                    if(res.data.status==200){
                        this.$message.success("提交成功");
                        this.ajaxData.contact="";
                        this.ajaxData.phone="";
                        this.ajaxData.job="";
                    }else{
                        this.$message.error(res.data.message);
                    }
                }).catch(err=>{
                    this.lodingF=false;
                    alert(err);
                })
            },

            formatType(type){
                let value = "";
                switch (type) {
                    case "stuNum":
                        value = '增加用户';
                        break;
                    case "Elective":
                        value = '申请选修课';
                        break;
                    case "liveTime":
                        value = '增加直播时长';
                        break;
                    case "stuAttachment":
                        value = '增加学员附件';
                        break;
                    case "monitorSMS":
                        value = '申请任务督促短信';
                        break;
                    case "onlineCompulsory":
                        value = '增加网络必修课';
                        break;
                    case "onlineElective":
                        value = '申请网络选修课';
                        break;
                    case "storage":
                        value = '增加存储空间';
                        break;
                    case "export":
                        value = '申请导出报告';
                        break;
                    case "expert":
                        value = '申请专家库';
                        break;
                    default:
                        break;
                }
                return value ;
            }
        }
    }
</script>

<style lang="less" scoped>
    .root{
        display: flex;
        flex-direction: column;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color:transparent;
        -webkit-overflow-scrolling:touch;
        background: #fff;
        article{
            overflow-y: auto;
            flex:7;
            .headTitle{
                font-size: 40px;
                font-weight: bold;
                color: #000000;
                background-image: linear-gradient(90deg, #FCE875 0%, #FEC52E 98%);
                width: 500px;
                border-radius: 0 30px 30px 40px;
                display: block;
                text-align: center;
                padding: 10px 0; 
                margin: 30px auto;
            }
            .lists{
                padding: 0 20px;
                margin-bottom: 40px;
                .title{
                    font-size : 40px;
                    color : #333333;
                    text-indent: 30px;
                    margin : 40px 0 20px 0; 
                    font-weight: bold;
                    .activeDote{
                        display: inline-block;
                        visibility: hidden;
                        width: 8px; /*no*/ 
                        height: 8px; /*no*/ 
                        background: #FFD031;
                        top: -4px; /*no*/ 
                        position: relative;
                        margin-right: 8px;
                        em{
                            position: absolute;
                            right: -5px;/*no*/ 
                            bottom: -5px;/*no*/ 
                            width: 8px; /*no*/ 
                            height: 8px; /*no*/ 
                            border-radius: 50%;
                            background: #32D49A;
                        }
                    }
                }
                .text{
                    font-size: 33px;
                    color: #333333;
                    line-height: 50px;
                    background: #FFFFFF;
                    box-shadow: 0 2px 39px 6px rgba(0,0,0,0.10);
                    border-radius: 0 20px 20px 0;
                    border-left: 20px solid  #ACBBCB;
                    padding: 20px;
                }
                .active{
                    .title{
                        color: #BF5A00;
                        .activeDote{
                            visibility: visible
                        }
                    }   
                    .text{
                        border-left: 20px solid   #5ED7B7;
                        background: #F1F3F8;
                    }
                }
            }
        }
        footer{
            padding: 20px 60px 0px;
            flex:1.5;
            box-shadow: 0 2px 16px 0 rgba(0,0,0,0.14); /*no*/
            z-index: 10;
            .writeInput{
                width: 300px;
                height: 70px;
                border: 1px solid #BFCBD9; /*no*/
                transition: border-color .2s cubic-bezier(.645,.045,.355,1);
                text-indent: 10px;
                border-radius: 6px; /*no*/
                margin-bottom: 10px;
                &:focus{
                    outline: none;
                    border-color: #409EFF;
                }
            }
            .submitBtn{
                width: 200px;
                background: #7687A7;
                border-radius: 6px;
                display: inline-block;
                text-align: center;
                padding: 10px 0;
                font-size: 30px;
                color: #fff;
                margin-left: 30px;
                vertical-align: middle;
            }
        }
    }

</style>

<style lang="less">
    * { touch-action: pan-y; } 
    html{
        max-width: 100%;
        background-color: #eee;
    }
    #app{
        width: 100%;
        max-width: none;
    }
</style>


