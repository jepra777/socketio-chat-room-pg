'use strict';

const { hashPassword } = require("../helpers/passwordHandler")

module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert("Users", [
      {
        Username: "administrator",
        Email: "admin@cakap.com",
        Password: hashPassword("administrator"),
        Role: "superAdmin",
        Delete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        Username: "jeremiah",
        Email: "jeremiah@cakap.com",
        Password: hashPassword("jeremiah"),
        Role: "admin",
        Delete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        Username: "caca",
        Email: "caca@cakap.com",
        Password: hashPassword("caca"),
        Role: "user",
        Delete: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    // down dipake buat revert alias kalau jalanin db:seed:undo:all
    await queryInterface.bulkDelete("Users", null, {})
  }
};