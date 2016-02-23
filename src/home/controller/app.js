'use strict';

import Base from './base.js';

export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */

  indexAction() {
    this.display();
  }

  async getdetailAction() {
  	let model = this.model("article");
    let data = await model.select();
    this.success(data);
  }
}
