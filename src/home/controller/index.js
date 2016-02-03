'use strict';

import Base from './base.js';
let crypto = require('crypto');
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction(){
    //auto render template file index_index.html
    let allParams = this.get();
    let allPost = this.post();
    console.log(allPost);
    let signature = allParams.signature;
    let timestamp = allParams.timestamp;
    let nonce = allParams.nonce;
    let echostr = allParams.echostr;
    let token = 'sgy789wd'
    let tmpArr = [token,timestamp,nonce];
    let tmpStr = tmpArr.sort().join(''); 
    let hasher = crypto.createHash('sha1');
    hasher.update(tmpStr);
    tmpStr = hasher.digest('hex');
    if( tmpStr == signature ) {
        return this.end(echostr);
    } else {
    }
  }
}
