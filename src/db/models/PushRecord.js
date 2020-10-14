/**
 * Created by colinhan on 17/02/2017..
 */
import Sequelize from 'sequelize';
import Model from '../sequelize';

const PushRecord = Model.define('PushRecord', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  isDelivered: {
    comment: '是否已经发送',
    type: Sequelize.BOOLEAN,
  }

}, {
  comment: '一个PushRecord是一次发送请求对一个设备的一次推送。'
});

PushRecord.associations = (models) => {
  PushRecord.belongsTo(models.SendRecord)
  PushRecord.belongsTo(models.Device)
}

export default PushRecord;