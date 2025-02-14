// models/User.js
const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const User = sequelize.define('User', {
  full_name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Nama lengkap tidak boleh kosong." },
    },
  },
  nidn_number: {
    type: DataTypes.STRING,
    allowNull: true,
    unique: true, // Jika NIDN harus unik
  },
  phone_number: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  position: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  role: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'mahasiswa',
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: { msg: "Format email tidak valid." },
      notEmpty: { msg: "Email tidak boleh kosong" },
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      notEmpty: { msg: "Password tidak boleh kosong" },
    },
  },
  photo_profile: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  status: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'aktif',
  },
  // JANGAN definisikan createdAt dan updatedAt di sini!
}, {
  tableName: 'users',
  timestamps: true,       // PENTING! Biarkan Sequelize mengelola timestamps
  paranoid: true,         // Soft deletes
  deletedAt: 'deleted_at', // Nama kolom untuk soft deletes
});

module.exports = User;