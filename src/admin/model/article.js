import moment from 'moment';
export default class extends think.model.base {
  /**
   * 数据表字段定义
   * @type {Object}
   */
  schema = {
    ctime: { //创建时间
      default: () => { //获取当前时间
        return moment().format("YYYY-MM-DD HH:mm:ss")
      },
      readonly: true //只读，添加后不可修改
    },
    mtime: {
      default: () => { //获取当前时间
        return moment().format("YYYY-MM-DD HH:mm:ss")
      },
      update: true,
      readonly: false //只读，添加后不可修改
    }
  }
  async getList() {
  	let data = await this.select();
  	return data;
  }
  async getDetail(id) {
    let data = await this.where({id: id}).select();
    return data;
  }
}