/**
 * Created by colinhan on 17/02/2017..
 */
import Sequelize from 'sequelize';
import Model from '../sequelize';

const Device = Model.define('Device', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },

  deviceId: {
    comment: `设备id，这个id信息来自于具体的推送渠道`,
    type: Sequelize.STRING,
    allowNull: false,
  },

  channel: {
    comment: '设备所属渠道',
    type: Sequelize.STRING,
    allowNull: false,
  },

  userId: {
    comment: '设备所属用户',
    type: Sequelize.UUID,
    allowNull: false,
  },

  isDeleted: {
    comment: '设备已经被删除',
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  }
}, {});

Device.associations = (models) => {
  Device.hasMany(models.PushRecord, {onUpdate: 'cascade', onDelete: 'cascade'})
}

export default Device;