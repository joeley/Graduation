const sequelize = require("../db");
const { DataTypes } = require("sequelize");
//创建一个模型对象
const Product = sequelize.define(
  "Product",
  {
    productMainImage: {  // 主图地址
      type: DataTypes.STRING,
      allowNull: false
    },
    productName: {       // 商品名
      type: DataTypes.STRING,
      allowNull: false
    },
    productPrice: {        // 单价   
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    productStock: {     // 货物总存量     
      type: DataTypes.INTEGER,
      allowNull: false   
    },
    productStatus: {    // 0 在售，1 下架
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productSubtitle: {  // 商品描述        
      type: DataTypes.STRING,
      allowNull: false
    },
    tag:{                    // 秒杀 新品
      type: DataTypes.STRING,
      allowNull: false
    },
    tagColor:{ 
      type: DataTypes.STRING,
      allowNull: false
    },
    productFlag: {       
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    productDescribe1:{
      type: DataTypes.STRING,
      allowNull: true
    },
    productDescribe2:{
      type: DataTypes.STRING,
      allowNull: true
    },
    productDescribe3:{
      type: DataTypes.STRING,
      allowNull: true
    },
    productDescribe4:{
      type: DataTypes.STRING,
      allowNull: true
    },
    productBg1: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    productBg2: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    productBg3: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    productBg4: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    galleryFlag:{
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    galleryText: {
      type: DataTypes.STRING,
      allowNull: true
    },
    galleryImg1: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    galleryImg2: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    galleryImg3: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    galleryImg4: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    galleryImg5: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    videoFlag: {         
      type: DataTypes.BOOLEAN,
      allowNull: true
    },
    videoSrc: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    videoCover:{
      type: DataTypes.STRING,
      allowNull: true
    },
    videoMainTitleText1: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    videoMainTitleText2: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    videoSubheadText1: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    videoSubheadText2: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    detailImg1:{ 
      type: DataTypes.STRING,
      allowNull: false
    },
    detailImg2:{ 
      type: DataTypes.STRING,
      allowNull: true
    },
    detailImg3:{ 
      type: DataTypes.STRING,
      allowNull: true
    },
    detailImg4:{ 
      type: DataTypes.STRING,
      allowNull: true
    },
    order: {                 // 在分类的排序
      type: DataTypes.INTEGER,
      allowNull: false
    }
  },
  {
    // freezeTableName:true,
    // createdAt: false,
    // updatedAt: false,
    paranoid: true //从此以后，该表的数据不会真正的删除，而是增加一列deletedAt，记录删除的时间
  }
);

module.exports = Product;
