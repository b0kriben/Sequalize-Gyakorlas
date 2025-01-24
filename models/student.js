const { DataTypes } = require('sequelize');
const sequelize = require('../sequelize');

const Student = sequelize.define('Student', {
  student_id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: false,
    validate: {
    }
  },
  favorite_class: {
    type: DataTypes.STRING(25),
    defaultValue: 'Computer Science'
  },
  school_year: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  has_language_examination: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  }
}, {
  tableName: 'students', 
  timestamps: false
});

module.exports = Student;