const Sequelize = require("sequelize")
//import your db
const db = require('../db')
//define your model
const Apartment = db.define('apartment',{
  address: {
    type: Sequelize.STRING,
    allowNull: false
  },
  neighborhood:{
    type: Sequelize.STRING
  }
})

//define any class or instance methods

//export your model
module.exports = Apartment;
