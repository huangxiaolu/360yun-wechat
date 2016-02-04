'use strict';

import Base from './base.js';
let crypto = require('crypto');
export default class extends Base {
  /**
   * index action
   * @return {Promise} []
   */
  indexAction() {
    this.display();
  }
}
