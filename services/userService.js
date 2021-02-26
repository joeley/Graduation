const User = require("../models/moudules/User");
const { Op } = require("sequelize");
const validate = require("validate.js");
const moment = require("moment");
const { pick } = require("../util/propertyHelper");
const e = require("express");

exports.userLogin = async function (username, password) {
  const query = await User.findOne({
    where: {
      username: username,
      password: password,
    },
  });
  if (query === null) {
    return null;
  } else {
    return pick(query.dataValues, "id", "username", "phone", "role", "vip");
  }
};

exports.adminLogin = async function (username, password) {
  const query = await User.findOne({
    where: {
      username: username,
      password: password,
    },
  });
  if (query === null) {
    return null;
  } else if (query.get().role !== "admin") {
    return null;
  } else {
    return pick(query.dataValues, "id", "username", "phone", "role", "vip");
  }
};

exports.query = async function (limit = 10, page = 1) {
  const offset = limit * (page - 1);
  const { count, rows } = await User.findAndCountAll({
    where: {},
    offset,
    limit,
    raw: true,
    order: [["createdAt", "ASC"]],
  });
  return {
    limit,
    count,
    page: page,
    userList: rows.map((ele) => {
      return pick(ele, "id", "username", "phone", "vip", "role");
    }),
  };
};

exports.delete = async function (id) {
  const userEntity = await User.findOne({
    where: {
      id: id,
      role: {
        [Op.not]: "admin",
      },
    },
  });
  if (userEntity !== null) {
    const res = await userEntity.destroy();
    return res.get();
  } else {
    return null;
  }
};
