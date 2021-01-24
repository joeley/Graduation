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

    // productTotalPrice: {   // 总价       
    //   type: DataTypes.VIRTUAL,
    //   get() {
    //     return this.getDataValue(productPrice) * this.getDataValue(quantity); //得到两个日期的年份的差异
    //   },
    // },

    productSelected: {   // 是否已选择     
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    productStock: {     // 货物总存量     
      type: DataTypes.INTEGER,
      allowNull: true   
    },
    productStatus: {    
      type: DataTypes.INTEGER,
      allowNull: false
    },
    productSubtitle: {  // 商品描述        
      type: DataTypes.STRING,
      allowNull: false
    },
    productFlag: {       
      type: DataTypes.BOOLEAN,
      allowNull: false
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
    productBg5: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    productBg6: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    productBg7: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    productBg8: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    productBg9: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    carouselFlag:{
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    carouselImg1: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    carouselImg2: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    carouselImg3: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    carouselImg4: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    carouselImg5: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    carouselImg6: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    carouselImg7: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    carouselImg8: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    carouselImg9: {         
      type: DataTypes.STRING,
      allowNull: true
    },
    videoFlag: {         
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    videoSrc: {         
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
    order: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    tag:{
      type: DataTypes.STRING,
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
