<template>
    <div :class="{chargeBox:true, pcDevice:pcDevice}" v-loading="lodingF">
        <!-- <header>
            <p>致用户的一封信</br>——关于师训宝收费相关信息</p>
        </header> -->
        <article class="modileArticle">
            <img src="../../assets/img/chargeHeader.png" alt="">
            <div class="detailText">
                <p class="hintText boldSize">尊敬的用户,您好!</p>
                <p class="infoText">
                    <span class="boldSize"> 由于研发及运营成本的不断上升，为了能够向您提供稳定的服务，师训宝将于近期开始向培训机构收取使用费。</span>
                    师训宝将划分免费版和VIP版，免费用户仍可使用师训宝的基础功能，部分高级功能（详见下表）将会受到限制。
                </p>
                <p class="infoText">感谢您一直以来对师训宝的支持与喜爱，由于此次调整给您带来的不便，我们深感歉意。</p>
                <p class="teamText">
                    <span>师训宝团队</span>
                    <span>2019年3月</span>
                </p>
                <p class="connectText">
                    <span>致电咨询如何升级为VIP客户</span>
                    <span>高老师：13301068776</span>
                    <span>刘老师：18601250775</span>
                    <i>附：师训宝版本功能区分表</i>
                </p>
                <!-- :span-method="objectSpanMethod" -->
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
                        label="VIP版">
                    </el-table-column>
                    <el-table-column
                        prop="free"
                        label="免费版">
                    </el-table-column>
                </el-table>
            </div>
        </article>
        <footer>
            <form action="">
                <p class="attchText">如有疑问，请留下联系方式，我们会尽快跟您进行联系。</p>
                <el-input v-model="ajaxData.userName" placeholder="请输入姓名"></el-input>
                <el-input v-model="ajaxData.telephone" placeholder="请输入联系电话" class="inputWrite"></el-input>
                <el-button type="info" class="connectBtn" plain @click="submit" style="background: #7687A7;color:#fff">提交</el-button>
            </form>
        </footer>
    </div>
</template>

<script>
    import api from "../../axios/api.js"
    export default {
        data () {
            return {
                tableData: [],
                ajaxData:{
                    userName:"",
                    telephone:""
                },
                pcDevice:false,
                lodingF:false,
            }
        },
        created(){
            this.pcDevice=document.documentElement.clientWidth>650;
            this.$get('../../../static/tableData.json',{}).then(res=>{
                this.tableData=res.data
            })
            document.title="师训宝收费公告"
        },
        mounted(){
            document.querySelector('.chargeBox').setAttribute('style',"height: "+document.documentElement.clientHeight+"px");
        },
        methods:{
            submit(){
                if(this.ajaxData.userName.trim()==""){
                    this.$alert('姓名不能为空', {
                        confirmButtonText: '确定',
                        type: 'error',
                    });
                    return
                }
                if(this.ajaxData.userName.trim().length>12){
                    this.$alert('姓名不得超过十二个字', {
                        confirmButtonText: '确定',
                        type: 'error',
                    });
                    return
                }
                if(this.ajaxData.telephone.trim()==""){
                    this.$alert('联系电话不能为空', {
                        confirmButtonText: '确定',
                        type: 'error',
                    });
                    return
                }
                if(!(/^1[0345789]\d{9}$/.test(this.ajaxData.telephone.trim()))) {
                    this.$alert('请输入正确的手机号', {
                        confirmButtonText: '确定',
                        type: 'error',
                    });
                    return
                }
                this.lodingF=true;
                console.log(this.ajaxData);
                let data = {telephone:this.ajaxData.telephone,userName:this.ajaxData.userName}
                this.$filePost(api.urls.saveBusiness,data).then(res=>{
                    console.log(res);
                    this.lodingF=false;
                    if(res.data.status==200){
                        this.$message.success("提交成功");
                        this.ajaxData.userName="";
                        this.ajaxData.telephone="";
                    }else{
                        this.$message.error(res.data.message);
                    }
                }).catch(err=>{
                    this.lodingF=false;
                    alert(err);
                })
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
            }
        }
    }
</script>

<style lang="less" scoped>
    .chargeBox{
        // overflow-y: scroll;
        position: relative;
        display: flex;
        flex-direction: column;
        -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
        -webkit-tap-highlight-color:transparent;
        -webkit-overflow-scrolling:touch;
    }
    header{
        text-align: center;
        flex:1;
        p{
            text-align: center;
            margin: 0 auto;
            width: 100%;
            font-size: 48px;
            color: #333333;
            font-family: PingFangSC-Regular;
            padding: 30px 0;
            text-indent: -270px;
        }
        border-bottom: 1px solid #F0F0F0;
    }
    article{
        overflow-y: scroll;
        flex:7;
    }
    .modileArticle{
        user-select: none;
        .hintText{
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
        padding: 0 60px;
        padding-top: 20px;
        flex:1;
        box-shadow: 0 2px 16px 0 rgba(0,0,0,0.14); /*no*/
        z-index: 10;
        .attchText{
            font-size: 24px;
            color: #666666;
            margin-bottom: 20px;
        }
        background: #fff;
    }
    .pcDevice{
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
            height: 34px;/*no*/
            width: 75px;/*no*/
            font-size: 14px;/*no*/
        }
        .el-button--info.is-plain{
            background: #7687A7;
        }
    }
    footer{
        .el-input{
            width: 200px;
            height: 68px;
            max-width: 160px;/*no*/
            input{
                border-width: 1px;/*no*/
                border-radius: 6px; /*no*/
                height:100%;
                font-size: 26px;
            }
            
        }
        .inputWrite.el-input{
            width: 240px;
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

