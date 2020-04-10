<template>
    <div class="alert_box">
        <div class="alert">
            <p>{{title}}</p>
            <button @click="close" >确定</button>
        </div>
    </div>
</template>
<script>
export default {
    data () {
        return {
            
        }
    },
    props:['title'],
    created(){
        document.onkeydown=(e)=>{
            let key=window.event.keyCode;
            if(key==27){
                this.close()
            }
        }
    },
    methods:{
        close(){
            this.$emit('tipShow')
        },
        keyCode(){

        }
    },
}
</script>
<style lang="less" scoped>
.alert_box{
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    width: 100%;
    height: 100%;
    z-index: 1000;
    background-color: rgba(0, 0, 0, 0.49);
    .alert{
        width:30%;
        overflow: hidden;
        background-color: #ffffff;
        border-radius: 5px;/*no*/;
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%,-50%);
        p{
            color: #606266;
            font-size: 16px;/*no*/
            word-break: break-all;
            padding: 30px 30px;
        }
        button{
            float: right;
            color: #fff;
            background-color: #409eff;
            border-color: #409eff;
            line-height: 1;/*no*/
            white-space: nowrap;
            cursor: pointer;
            border: 1px solid #dcdfe6;/*no*/
            -webkit-appearance: none;
            text-align: center;
            box-sizing: border-box;
            outline: none;
            margin: 0;
            padding: 12px 20px;/*no*/
            font-size: 14px;/*no*/
            border-radius: 4px;/*no*/
            margin: 20px;
        }
    }
}
</style>


