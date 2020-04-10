<template>
    <div :class="{differnceBox:true, pcDevice:pcDevice}" v-loading="lodingF">
        <div class="head">
            <h1 class="title">VIP版和免费版有什么区别？</h1>
            <p class="subText">为了向各机构提供更优质的服务，师训宝推出VIP会员功能，成为师训宝VIP客户，可享用更多高级功能。</p>
            <!-- <p class="subText">免费用户仍可使用师训宝的基础功能，部分高级功能（详见下表）将会收到限制。</p> -->
        </div>
        <article class="modileArticle">
            <p class="text">师训宝VIP版&免费版功能对比表</p>
            <div class="detailText">
                <el-table
                    :data="tableData"
                    :span-method="objectSpanMethod"
                    :cell-style="cellStyle"
                    border
                    style="width: 100%;margin-bottom: 20px;">
                    <el-table-column
                        prop="func"
                        label="功能">
                    </el-table-column>
                    <el-table-column
                        prop="funcItem"
                        label="具体功能点">
                    </el-table-column>
                    <el-table-column
                        prop="vip"
                        label="VIP机构">
                    </el-table-column>
                    <el-table-column
                        prop="free"
                        label="免费机构">
                    </el-table-column>
                </el-table>
            </div>
        </article>
        <footer>
            <form action="">
                <p class="attchText">如有疑问，请留下联系方式，我们会尽快跟您进行联系。</p>
                <el-input v-model="ajaxData.contact" placeholder="请输入姓名" class="inputWrite"></el-input>
                <el-input v-model="ajaxData.phone" placeholder="请输入联系电话" class="inputWrite"></el-input>
                <el-input v-model="ajaxData.job" placeholder="请输入职位" class="inputWrite"></el-input>
                <el-button type="info" class="connectBtn" plain @click="submit" style="background: #7687A7;color:#fff">提交</el-button>
            </form>
        </footer>
        <!-- pc端弹窗 -->
         <transition name="fade">
            <alertTip :title="passtitle" @tipShow="tipShow" v-if="showTip"></alertTip>
         </transition>
    </div>
</template>

<script>
    import api from "../../axios/api.js"
    import alertTip from '@/components/base/alertTip'
    export default {
        data () {
            return {
                tableData : [],
                ajaxData : {
                    contact : "",
                    phone : "",
                    job : ""
                },
                pcDevice : false,
                lodingF : false,
                screenWidth:false,//判断屏幕宽度
                passtitle:'',
                showTip:false,
            }
        },
        created(){
            this.pcDevice=document.documentElement.clientWidth>650;
            this.$get('../../../static/tableData.json',{}).then(res=>{
                this.tableData=res.data
            })
            document.title="师训宝VIP版和免费版的区别"
            this.getscreenWidth()
        },
        mounted(){
            document.querySelector('.differnceBox').setAttribute('style',"height: "+(document.documentElement.clientHeight)+"px");
        },
        computed:{
            orgId(){
                return this.$route.query.orgId
            },
            isVip(){
                return Boolean(Number(this.$route.query.isVip))
            }
        },
        methods:{
            tipShow () {
                this.showTip=false
            },
            submit(){
                
                if(this.ajaxData.contact.trim()==""){
                    if(this.screenWidth==false){
                        alert('姓名不能为空')
                    }else{
                        this.passtitle="姓名不能为空"
                        this.showTip=true
                    }
                    // alert('姓名不能为空')
                    // this.$alert('姓名不能为空', {
                    //     confirmButtonText: '确定',
                    //     type: 'error',
                    // });
                    return
                }
                if(this.ajaxData.contact.trim().length>12){
                    if(this.screenWidth==false){
                        alert('姓名不得超过十二个字')
                    }else{
                        this.passtitle="姓名不得超过十二个字"
                        this.showTip=true
                    }
                    // alert('姓名不得超过十二个字')
                    // this.$alert('姓名不得超过十二个字', {
                    //     confirmButtonText: '确定',
                    //     type: 'error',
                    // });
                    return
                }
                if(this.ajaxData.phone.trim()==""){
                    if(this.screenWidth==false){
                        alert('联系电话不能为空')
                    }else{
                        this.passtitle="联系电话不能为空"
                        this.showTip=true
                    }
                    // alert('联系电话不能为空')
                    // this.$alert('联系电话不能为空', {
                    //     confirmButtonText: '确定',
                    //     type: 'error',
                    // });
                    return
                }
                if(!(/^1\d{10}$/.test(this.ajaxData.phone.trim()))) {
                    // alert('请输入正确的手机号');
                    // this.$alert('请输入正确的手机号', {
                    //     confirmButtonText: '确定',
                    //     type: 'error',
                    // });
                    if(this.screenWidth==false){
                        alert('请输入正确的手机号')
                    }else{
                        this.passtitle="请输入正确的手机号"
                        this.showTip=true
                    }
                    return
                }
                if(this.ajaxData.job.trim()==""){
                    if(this.screenWidth==false){
                        alert('职位不能为空')
                    }else{
                        this.passtitle="职位不能为空"
                        this.showTip=true
                    }
                    // alert('职位不能为空');
                    // this.$alert('职位不能为空', {
                    //     confirmButtonText: '确定',
                    //     type: 'error',
                    // });
                    return
                }
                if(this.ajaxData.job.trim().length>30){
                    if(this.screenWidth==false){
                        alert('职位不得超过30个字')
                    }else{
                        this.passtitle="职位不得超过30个字"
                        this.showTip=true
                    }
                    // alert('职位不得超过30个字');
                    // this.$alert('职位不得超过30个字', {
                    //     confirmButtonText: '确定',
                    //     type: 'error',
                    // });
                    return
                }
                this.lodingF=true;
                let data = {
                    // contact,       // 联系人
                    // phone,         // 手机号
                    // job,          // 职位
                    organizationId : this.orgId ,     // 机构id
                    type : this.isVip ? "CONTINUE" : "NEW",               //申请类型：CONTINUE（续约）；NEW（开通）
                    content: this.isVip ? "续约vip" : "申请vip",
                    ...this.ajaxData
                }
                this.$jsonPost(api.urls.saveVipApply,data).then(res=>{
                    console.log(res.data)
                    this.lodingF=false;
                    if(res.data.status==200){
                        if(this.screenWidth==false){
                            alert('提交成功')
                        }else{
                            this.passtitle="提交成功"
                            this.showTip=true
                        }
                        this.ajaxData.contact="";
                        this.ajaxData.phone="";
                        this.ajaxData.job="";
                    }else{
                        if(this.screenWidth==false){
                            alert(res.data.message)
                        }else{
                            this.passtitle=res.data.message
                            this.showTip=true
                        }
                    }
                }).catch(err=>{
                    this.lodingF=false;
                    if(this.screenWidth==false){
                            alert(err)
                        }else{
                            this.passtitle=err
                            this.showTip=true
                        }
                })
            },
            //获取当前的屏幕宽度
            getscreenWidth () {
                let screenWidth=$(window).width();
                if(screenWidth>640){
                    this.screenWidth=true
                }else{
                    this.screenWidth=false
                }
            },
            objectSpanMethod({ row, column, rowIndex, columnIndex }) {
                let returnObj = {}
                if (columnIndex === 0) {
                    if (row.colspan >0) {
                        returnObj.rowspan= row.colspan;
                        returnObj.colspan= 1;
                        return returnObj
                    }else{
                        returnObj.rowspan= 0;
                        returnObj.colspan= 0;
                        return returnObj
                    }
                }
                
            },
            cellStyle({ row, column, rowIndex, columnIndex }){
                let returnObj = {
                    borderColor:"#DFE6EC",
                    color: row.vip==row.free?"#333333":"#BF5A00",
                    backgroundColor:columnIndex === 0?"rgba(238,241,246,0.45)":"#fff",
                }
                return returnObj
            },
        },
        components:{
            alertTip,
        }
    }
</script>

<style lang="less" scoped>
    .fade-enter-active {
    transition: all .3s ease;
    }
    .fade-leave-active {
    transition: all .3s ease;
    }
    .fade-enter
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(-20px);
    opacity: 0;
    }
    .fade-leave-to
    /* .slide-fade-leave-active for below version 2.1.8 */ {
    transform: translateY(20px);
    opacity: 0;
    }
    .differnceBox{
        // overflow-y: scroll;
        position: relative;
        display: flex;
        flex-direction: column;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color:transparent;
        -webkit-overflow-scrolling:touch;
        background: url("../../assets/img/differenceBg.png") center top no-repeat;
        background-size: 100% 60%;
    }
    .head{
        .title{
            font-size: 46px;
            color: #F3D9AB;
            text-align: center;
            margin: 20px 0;
        }
        .subText{
            font-size: 32px;
            color: #FFFFFF;
            padding: 0 20px;
        }
    }
    article{
        overflow-y: scroll;
        flex:7;
    }
    .modileArticle{
        user-select: none;
        background: #FFFFFF;
        border-radius: 10px;
        margin-top: 20px;
        .hintText{
            margin: 20px 0; 
        }
        .text{
            font-size: 40px;
            color: #333333;
            font-weight: bold;
            text-align: center;
            margin: 20px 0;
        }
        img{
            width: 100%;
            // height:200px
        }
        .detailText{
            padding: 0 30px;
        }
        .infoText{
            text-indent: 70px;
            font-size: 32px;
            color: #666666;
            letter-spacing: 0.04px;
            line-height: 52px;
            margin-bottom: 20px;
        }
        .teamText{
            font-size: 34px;
            color: #666666;
            letter-spacing: 0.04px;
            line-height: 52px;
            text-align: right;
            display: grid;
            margin-bottom: 16px;
        }
        .connectText{
            display: grid;
            margin-bottom: 30px;
            span{
                display: inline-block;
                font-family: PingFangSC-Regular;
                font-size: 32px;
                color: #51607C;
                letter-spacing: 0.04px;
                margin-bottom: 10px;
                padding-left: 60px;
                height: 40px;
                line-height: 40px;
            }
            span:first-child{
                font-size: 34px;
                color: #333333;
                background: url(../../assets/img/phoneIcon.png) left center no-repeat;
                background-size: 40px 40px;
            }
            i{
                font-size: 30px;
                color: #666666;
                letter-spacing: 0.04px;
                font-style: normal;
            }
        }
        .boldSize{
            text-align: left;
            font-family: PingFangSC-Medium;
            font-size: 36px;
            color: #4F5374;
        }
    }
    footer{
        padding: 0px 60px;
        padding-top: 20px;
        padding-bottom: 20px;
        // flex:1.5;
        box-shadow: 0 2px 16px 0 rgba(0,0,0,0.14); /*no*/
        z-index: 10;
        .attchText{
            font-size: 24px;
            color: #666666;
            // margin-bottom: 20px;
        }
        background: #fff;
    }
    .pcDevice{
        .modileArticle{
            width: 1000px; /*no*/
            margin: 0 auto;
            margin-top: 20px; /*no*/
            .text{
                font-size: 20px; /*no*/
            }
        }
        .head{
            margin-top: 20px;
            .title{
                font-size: 27px; /*no*/
                color: #F0B456;
                text-align: center;
                margin-bottom: 20px; /*no*/
            }
            .subText{
                width: 800px; /*no*/
                margin : 0 auto;
                font-size: 16px; /*no*/
                color: #FFFFFF;
                padding: 0 20px; /*no*/
                margin-bottom: 10px;
            }
        }
        footer{
            width: 1000px; /*no*/
            margin: 0 auto;
        }
        .connectBtn{
            margin-left: 30px;/*no*/
        }
        header p{
            font-size: 24px;/*no*/
        }
        article .hintText{
            font-size: 16px;/*no*/
        }
        article .el-table .cell{
            font-size: 14px;/*no*/
        }
        .attchText{
            font-size: 14px;/*no*/
        }
    }
</style>

<style lang="less">
    html{
        max-width: 100%;
        background-color: #eee;
    }
    #app{
        width: 100%;
        max-width: none;
    }
    article .el-table__body{
        border-collapse: collapse;
    }
    article .el-table .cell{
        font-size: 30px;
        line-height: 38px;
        white-space: normal;
    }
    article .el-table thead th{
        background: #eef1f6;
        border: 1px solid #DFE6EC; /*no*/
        text-align: center;
        font-weight: normal;
    }
    article .el-table tbody td{
        border: 1px solid #DFE6EC; /*no*/
        border-collapse: collapse;
    }
    .pcDevice{
        article .el-table .cell{
            font-size: 14px;/*no*/
        }
        .inputWrite{
            width: 160px;/*no*/
            height: 34px;/*no*/
            input{
                font-size: 14px;/*no*/
            }
            margin-right: 10px;/*no*/
        }
        .connectBtn{
            height: 32px;/*no*/
            width: 75px;/*no*/
            font-size: 14px;/*no*/
        }
        .el-button--info.is-plain{
            background: #7687A7;
            font-size: 14px !important; /* no */
        }
        .attchText{
            margin-bottom: 20px;
        }
    }
    footer{
        .el-input{
            width: 200px;
            height: 68px;
            max-width: 160px;/*no*/
            max-height: 34px; /*no*/
            input{
                border-width: 1px;/*no*/
                border-radius: 6px; /*no*/
                height:100%;
                font-size: 26px;
            }
            
        }
        .inputWrite.el-input{
            width: 240px;
            margin-bottom: 10px;
        }
    }
    
    .connectBtn{
        height: 60px;
        width: 110px;
        border-width: 0px;
        border-radius: 6px; /*no*/
        font-size: 26px !important;
    }
    .el-button--info.is-plain{
        background:  #7687A7;
        color: #fff;
        border: 0 none;
    }
    .el-message-box__message{
        p{
            font-size: 20px;
        }
    }
    .el-table__row{
        // td:first-child{
        //     background: #eef1f6;
        // }
    }
</style>

