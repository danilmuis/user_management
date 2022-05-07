const userModel = require('../models/user.model');
const bcrypt = require('bcrypt');

async function insertSeeder(data){
  data.forEach(async (item)=>{
    try{
      const newUser = new userModel(item)
      await newUser.save();
    }catch(error){
  
    }
  });
  
}
module.exports = async function () {
  const salt = await bcrypt.genSalt(10);
  const hash1 = await bcrypt.hash("Muis@1234", salt);
  const hash2 = await bcrypt.hash("Danil@1234", salt);
  
  const data = [
    {
      "email" : "admin@gmail.com",
      "name" : "Admin Muis",
      "password" : hash1,
      "admin" : true
    },
    {
      "email" : "user@gmail.com",
      "name" : "Muhammad Danil Muis",
      "password" : hash2,
      "admin" : false
    }
  ];
  await insertSeeder(data);
};
