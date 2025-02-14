// 'use strict';
// const {
//   Model
// } = require('sequelize');
// module.exports = (sequelize, DataTypes) => {
//   class Buku extends Model {
//     /**
//      * Helper method for defining associations.
//      * This method is not a part of Sequelize lifecycle.
//      * The `models/index` file will call this method automatically.
//      */
//     static associate(models) {
//       // define association here
//     }
//   }
//   Buku.init({
//     judul: DataTypes.STRING,
//     penulis: DataTypes.STRING,
//     tahun: DataTypes.INTEGER
//   }, {
//     sequelize,
//     modelName: 'Buku',
//   });
//   return Buku;
// };

// ====
const { DataTypes } = require('sequelize')
const { sequelize } = require('../config/database')

const Book = sequelize.define('Book', {
    judul: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    penulis: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    tahun: {
      allowNull: false,
      type: DataTypes.INTEGER,
    },
  }, {
    sequelize,
    paranoid: true,
    tableName: 'Book',
    freezeTableName: true,
  },
)

module.exports = Book