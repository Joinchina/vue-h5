

class signLogin {
    constructor(){
        this.session=null;//初始化session类
        this.channel=null;//初始化channel类
    };
    //信令登录函数
    login(options){
        let _this=this;
        let signal = Signal(options.appId); // 这里填注册完后的APPID
        // 登录返回 Session对象
        let session = signal.login(options.name, '_no_need_token'); // 用户标识id,可以自己定义。唯一就可以
        _this.session=session;
        session.onLoginSuccess = function(uid) {
           console.log(uid);
           let channel= session.channelJoin(options.roomCode);//频道号
           channel.onChannelJoined = function(){
                console.log("假如频道成功");
                _this.channel=channel;
                _this.getMsg();//启动信令接收
                _this.controlLogin();//监控信令错误
          }
          channel.onChannelJoinFailed=function(ecode){
            console.log(ecode)
          }
        }    
    };
    //发送频道消息data为聊天内容
    sendMsg(data){
        this.channel.messageChannelSend(JSON.stringify(data),()=>{
            console.log("发送的频道消息~",data)
        })
    };
    //得到信令发送的消息
    getMsg(){
        this.channel.onMessageChannelReceive=(account, uid, msg)=>{
            this.getMsginfo(account, uid, msg)                    
        }
    };
    getMsginfo(callback){
        this.getMsginfo=callback
    };
    //信令退出
    loginOut(){
        if(this.channel){
            this.channel.channelLeave(function(){
              console.log("退出成功")
            });
        }    
    };
    //信令报错
    controlLogin(){
        if(this.session){
            this.session.onLogout=(reason)=>{
              console.log("信令错误~",reason)
              if(reason){
                this.signcontrolLogin(reason)
              }
            };
        }   
    };
    signcontrolLogin(callback){
        this.signcontrolLogin=callback
    }

}

export default signLogin;