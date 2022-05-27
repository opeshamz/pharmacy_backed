/* eslint-disable no-plusplus */
/* eslint-disable eqeqeq */
/* eslint-disable camelcase */
const jwt = require('jsonwebtoken');
// const axios = require('axios');
const { isEmpty } = require('lodash');
/**
 * Generate A random string of any length
 * Excludes some special characters
 *
 * @author Yusuff Mustapha
 * @returns {String} - random string
 */
const randomStringGen = (length) => {
  const pass = 'qwertyuopasdfghjklzxcvbnmQWERTYUOPASDFGHJKLZXCVBNM234567890';
  return Array(length)
    .fill(pass)
    .map((x) => x[Math.floor(Math.random() * x.length)])
    .join('');
};

/**
 * Generate UNIX-time string
 *
 * @author Yusuff Mustapha
 * @returns {String} - UNIX-time string as string
 */
const dateTimeString = () => new Date().getTime().toString();

function formatDate(date) {
  const d = new Date(date);
  let month = `${d.getMonth() + 1}`;
  let day = `${d.getDate()}`;
  const year = d.getFullYear();

  if (month.length < 2) {
    month = `0${month}`;
  }
  if (day.length < 2) {
    day = `0${day}`;
  }

  return [year, month, day].join('-');
}

const GetDate = () => {
  const utc = new Date(new Date().toUTCString());
  return utc.setTime(utc.getTime() + 1 * 60 * 60 * 1000);
};

function base64tostr(base64str) {
  return Buffer.from(base64str, 'base64').toString('ascii');
}

// eslint-disable-next-line consistent-return
function getOrderCurrentPosition(order_status, ORDER_STATUS) {
  const i = 0;
  for (i; i < ORDER_STATUS.length; i + 1) {
    if (order_status === ORDER_STATUS[i]) {
      return i;
    }
  }
  return null;
}

function validateNextStatus(orderStatus, currentStatus, nextStatus) {
  const indexOfCurrentStatus = orderStatus.indexOf(currentStatus);
  const indexOfNextStatus = orderStatus.indexOf(nextStatus);

  if (indexOfCurrentStatus >= indexOfNextStatus) {
    return {
      isValidUpdate: false,
      msg: `Your order is already ${currentStatus.split('_')[1].toLowerCase()}`,
    };
  }

  if (indexOfCurrentStatus < indexOfNextStatus - 1) {
    return {
      isValidUpdate: false,
      msg: `Your order needs to be ${orderStatus[indexOfCurrentStatus + 1]
        .split('_')[1]
        .toLowerCase()}`,
    };
  }

  return { isValidUpdate: true, msg: '' };
}

function generateCode(length = 4) {
  const numbers = '0123456789';
  return Array(length)
    .fill(numbers)
    .map((x) => x[Math.floor(Math.random() * x.length)])
    .join('');
}
function uniqueID() {
  return Math.floor(Math.random() * Date.now());
}

// eslint-disable-next-line no-restricted-syntax
function remove_duplicates_safe(arr) {
  const ret_arr = [];
  for (let i = 0; i < arr.length; i++) {
    if (typeof arr[i].category === 'object') {
      const is_Exist = ret_arr.find((x) => x.category._id == arr[i].category._id);
      if (isEmpty(is_Exist)) {
        ret_arr.push(arr[i]);
      }
    }
  }
  return ret_arr;
}

function convertUTCDateToLocalDate(date) {
  const newDate = new Date(date.getTime() + date.getTimezoneOffset() * 60 * 1000);

  const offset = date.getTimezoneOffset() / 60;
  const hours = date.getHours();

  newDate.setHours(hours - offset);
  return newDate;
}

const generateJwtToken = async (payload, secret, expiresIn = process.env.EXPIRES_IN || '14d') => {
  const token = await jwt.sign(payload, secret, { expiresIn });
  return token;
};

function deleteEmptyObj(obj) {
  // eslint-disable-next-line no-restricted-syntax
  for (const propName in obj) {
    if (obj[propName] === null || obj[propName] === undefined || obj[propName].length < 1) {
      // eslint-disable-next-line no-param-reassign
      delete obj[propName];
    }
  }
  return obj;
}
module.exports = {
  randomStringGen,
  getOrderCurrentPosition,
  convertUTCDateToLocalDate,

  dateTimeString,
  base64tostr,
  generateCode,
  uniqueID,
  formatDate,
  GetDate,

  validateNextStatus,
  remove_duplicates_safe,
  generateJwtToken,
  deleteEmptyObj,

};
