'use strict';

import Base from './base.js';

export default class extends Base {
   /**
   * index action
   * @return {Promise} []
   */

  async indexAction() {
  	let score = this.model("score");
  	let scoreData  = await score.where({current:"1"}).select();
  	this.assign("scoreData", scoreData[0]);
    console.log(thinkCache(thinkCache.WEBSOCKET));
    this.display();
  }

  async adminAction() {
  	let user = this.model("user");
  	let score = this.model("score");
  	let userData  = await user.order('rank ASC').select();
  	let scoreDate  = await score.where({number:1}).select();

  	userData.forEach((useritem)=>{
  		scoreDate.forEach((scoreitem)=>{
			if(useritem.name ==  scoreitem.name) {
				useritem.score = scoreitem.score;
	  		}
  		})
  	})

  	this.assign("userData", userData);
  	this.display();
  }

  async makescoreAction() {
  	let params = this.post();
  	let cookie = this.cookie("score");
  	if(cookie) {
  		this.fail(1000, "你已经打过分了，能不能不点了，调皮！！");
  	} else {
  		let score = this.model("score");
  		let oldData = await score.where({current:"1"}).select();
  		oldData = oldData[0];
  		oldData.peoplenumber++;
  		oldData.count += Number(params.score);
  		if(params.remark) {
  			oldData.remark += '，';
  			oldData.remark += params.remark;
  		}
  		oldData.score = oldData.count/oldData.peoplenumber;
	  	let row = await score.where({current:"1"}).update(oldData);
	  	this.cookie("score",params.score, {
	      timeout: 6 * 24 * 3600 //设置 cookie 有效期为 7 天
	    }); //将 cookie theme 值设置为 default
	  	this.success({average:oldData.score,score:params.score});
  	}
  	
  }

  async currentshareAction() {
  	let params = this.post();
  	let score = this.model("score");
  	let data = await score.where({name: params.name,number: params.number}).select();

  	if(data.length == 0) {
  		let oldscore = await score.where({current:"1"}).select();
  		oldscore.current = 0;
  		await score.where({current:"1"}).update(oldscore);
  		score.add({
	  		name : params.name,
	  		number: params.number,
	  		current: 1
	  	});

	  	this.success();
  	} else {
  		this.fail(1000, "分享着已存在数据库中");
  	}
  	
  	
  }
}
