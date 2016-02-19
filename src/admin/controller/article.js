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
    listAction() {
      let model = this.model("article");
    
      try{
        model.getList().then((data) => {
          this.success({list: data});
        });
      }catch(e){
        
      }
    }
    * addAction() {
      let http = this.http;
      let content = http.post('content');
      let model = this.model("article");
      try{
        yield model.startTrans();
        model.add({
          author_id: 2,
          content: content
        });
        yield model.commit();
        this.success();
      }catch(e){
        yield model.rollback();
      }
    }
    deleteAction() {

    }
    * updateAction() {
      let http = this.http;
      let content = http.post('content');
      let id = http.post('id');

      let model = this.model("article");
      try{
        yield model.startTrans();
        model.where({id: id}).update({
          content: content
        });
        yield model.commit();
        this.success();
      }catch(e){
        yield model.rollback();
      }
    }
    detailAction() {
      let model = this.model("article");
      let id = this.http.get('id');
      try{
        model.getDetail(id).then((data) => {
          this.success(data[0]);
        });
      }catch(e){
      }
    }
    uploadFile() {
      
    }
}
