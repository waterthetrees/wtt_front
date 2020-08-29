// import faker from 'faker';
const faker = require('faker');

function generateEmail() {
  const values = 'abcdefgh123456789';
  let email ='';
  let temp;
  for (let i = 0; i < 10; i++) {
    temp = values.charAt(Math.round(values.length * Math.random()));
    email += temp;
  }
  temp = '';
  email += '@';
  for (let i = 0; i < 8; i++) {
    temp = values.charAt(Math.round(values.length * Math.random()));
    email += temp;
  }
  email += '.com'
  return email;
}

function generatePassword() {
  const values = 'abcdefgh123456789!@#';
  let password ='';
  let temp;
  for (let i = 0; i < 8; i++) {
    temp = values.charAt(Math.round(values.length * Math.random()));
    password += temp;
  }
  temp = '';
  password += '';
  
  return password;
}

function generateNumbers() {
  const numbers = Math.floor(Math.random() * 9000000000) + 100000000
  return numbers.toString()
};



const user = {
  email: faker.internet.email(),
  password: generatePassword(),
  firstName: faker.name.firstName(),
  lastName: faker.name.lastName(),
  phone: faker.phone.phoneNumber(),
  companyName: faker.company.companyName(),
  zip: faker.address.zipCode(),
}

module.exports = { generateEmail, generatePassword, user };