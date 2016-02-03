var wechat = require('think-wechat');
think.middleware('parse_wechat', wechat({
    wechat : {
      token: 'sgy789wd',
      appid: 'wx21e8b69e0d131599',
   }
}));
