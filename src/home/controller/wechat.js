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

    async textAction(){
         var message = this.post();
         var msg = message.Content.trim();
         let socketlist = await thinkCache(thinkCache.WEBSOCKET);
         console.log(socketlist);
         socketlist.forEach((item)=>{
           item.emit("messages", msg);
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
