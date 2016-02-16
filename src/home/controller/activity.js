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

  wallAction() {
  	this.display();
  }

  messagesAction(messages) {
  	var socket = this.http.socket;
    this.emit("messages", messages);
  }

  openAction(){
    var socket = this.http.socket;
    this.messagesAction();
    this.emit("messages", "connected");
  }
  openAction(){
    var socket = this.http.socket;
    this.messagesAction();
    this.emit("messages", "closed");
  }

}
