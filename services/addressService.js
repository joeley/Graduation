const Product = require("../models/moudules/Product");
const RCart = require("../models/moudules/RCart");
const User = require("../models/moudules/User");
const Address = require("../models/moudules/Address");
const sequelize = require("../models/db");
const moment = require("moment");
const { pick } = require("../util/propertyHelper");
const { unnest } = require("../util/unnestHelper");
const { sortObj } = require("../util/sortHelper");


exports.getAddress = async (UserId)=>{
  let list = await Address.findAll({
    where: {
      UserId
    },
    raw: true
  })
  list = list.sort((crr,next)=>{
    return (+moment(crr.createdAt)) - (+moment(next.createdAt))
  })
  return list.map((address)=>{
    return pick(address,
      "id",
      "receiverName",
      "receiverMobile",
      "receiverProvince",
      "receiverCity",
      "receiverDistrict",
      "receiverAddress",
      "receiverZip"
      )
  })
}

exports.addAddress = async (UserId, {
  receiverName,
  receiverMobile,
  receiverProvince,
  receiverCity,
  receiverDistrict,
  receiverAddress,
  receiverZip
}) => {
  if(!(receiverName && receiverMobile && receiverProvince && receiverCity && receiverDistrict && receiverAddress && receiverZip)){
    return null
  }
  return Address.create({
    receiverName,
    receiverMobile,
    receiverProvince,
    receiverCity,
    receiverDistrict,
    receiverAddress,
    receiverZip,
    UserId
  }).then(()=>{
    return exports.getAddress(UserId)
  })
}

exports.updateAddress = async (UserId, AddressId, {
  receiverName,
  receiverMobile,
  receiverProvince,
  receiverCity,
  receiverDistrict,
  receiverAddress,
  receiverZip
}) => {
  // 软删除 此处不可用update

  let up = {}
  if(!AddressId){
    return null
  }
  if(UserId){
    up = {...up,UserId}
  }
  if(receiverName){
    up = {...up,receiverName}
  }
  if(receiverMobile){
    up = {...up,receiverMobile}
  }
  if(receiverProvince){
    up = {...up,receiverProvince}
  }
  if(receiverCity){
    up = {...up,receiverCity}
  }
  if(receiverDistrict){
    up = {...up,receiverDistrict}
  }
  if(receiverAddress){
    up = {...up,receiverAddress}
  }
  if(receiverZip){
    up = {...up,receiverZip}
  }
  return sequelize.transaction(async t => {
    const oldAddressEntity =  await Address.findOne({
      where: {
        UserId:UserId,
        id:AddressId
      }
    })
    if(addressEntity = null){
      return Promise.reject(null)
    }
    const oldAddressJson =  oldAddressEntity.toJSON()
    delete oldAddressJson.id
    const newAddressEntity = await Address.create({
      ...oldAddressJson,
      ...up
    },{ transaction: t })
    await oldAddressEntity.destroy({});
    return newAddressEntity.get()
  }).then(() => exports.getAddress(UserId) )
  
  // return Address.update(up,{
  //   where: {
  //     id: AddressId
  //   }
  // }).then(() => {
  //   return exports.getAddress(UserId)
  // })
}

exports.deleteAddress = async (UserId, AddressId) => {
  return Address.destroy({
    where: {
      UserId,
      id:AddressId
    }
  }).then(() => {
    return exports.getAddress(UserId)
  }).catch(() => {
    return null
  })
}