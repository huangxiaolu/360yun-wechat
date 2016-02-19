'use strict';

import Base from './base.js';
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
    indexAction() {
     let echostr = this.get('echostr');
     return this.end(echostr);
    }

    reply(message){
        this.http.res.reply(message);
    }

    textAction(){
         var message = this.post();
         var msg = message.Content.trim();
         //let controllerInstance = this.controller("activity","");
         //this.action(controllerInstance, "messages")
         //controllerInstance.messages(msg);
         let socketlist = thinkCache(thinkCache.WEBSOCKET);
         socketlist.forEach((item)=>{
            item.emit("messages", 11111);
         })  
         this.reply('发送成功');
    }

    voiceAction() { 
         this.reply('我听见你的声音，有种特别的感觉');
    } 
    eventAction(){
         var message = this.post();
         this.reply(JSON.stringify(message));
     }
     __call(){
         this.reply(DEFULT_AUTO_REPLY);
      }
}
