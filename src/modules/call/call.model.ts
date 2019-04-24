import { Sequelize } from 'sequelize';
import db from '../../db/mysql/mysql';

const CallModel: any = db.define('call', {
  id: {
    type: Sequelize.BIGINT(20),
    autoIncrement: true,
    primaryKey: true,
    unique: true,
    allowNull: false,
  },
  called_at: {
    type: Sequelize.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW,
  },
}, {
  underscored: true,
  timestamps: false,
  createAt: false,
  paranoid: true,
});

export default  CallModel;
