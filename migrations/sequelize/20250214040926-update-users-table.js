'use strict';
 /** @type {import('sequelize-cli').Migration} */
 module.exports = {
 async up (queryInterface, Sequelize) {
     await queryInterface.addColumn('users', 'nidn_number', {
     type: Sequelize.STRING,
     allowNull: true,
     unique: true,
     });
     await queryInterface.addColumn('users', 'phone_number', {
     type: Sequelize.STRING,
     allowNull: true,
     });
     await queryInterface.addColumn('users', 'position', {
     type: Sequelize.STRING,
     allowNull: true,
     });
     await queryInterface.addColumn('users', 'photo_profile', {
       type: Sequelize.STRING,
       allowNull: true
     })
     await queryInterface.addColumn('users', 'status', {
       type: Sequelize.STRING,
       allowNull: true
     })

     // Tambahkan ini *hanya jika* createdAt dan updatedAt belum ada
     await queryInterface.addColumn('users', 'created_at', { // Perhatikan snake_case
         type: Sequelize.DATE,
         allowNull: false,
     });
     await queryInterface.addColumn('users', 'updated_at', { // Perhatikan snake_case
         type: Sequelize.DATE,
         allowNull: false,
     });
 },

 async down (queryInterface, Sequelize) {
     // Rollback (kebalikan dari up) - Hapus kolom-kolom yang ditambahkan
     await queryInterface.removeColumn('users', 'nidn_number');
     await queryInterface.removeColumn('users', 'phone_number');
     await queryInterface.removeColumn('users', 'position');
     await queryInterface.removeColumn('users', 'photo_profile');
     await queryInterface.removeColumn('users', 'status')
     // Hapus createdAt dan updatedAt *jika* Anda menambahkannya di `up`
     await queryInterface.removeColumn('users', 'created_at');
     await queryInterface.removeColumn('users', 'updated_at');
 }
 };