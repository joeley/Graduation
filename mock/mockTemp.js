
const User = require("../models/moudules/User");
const Category = require("../models/moudules/Category");
const Product = require("../models/moudules/Product")
const Display = require("../models/moudules/Display")
const Navigation = require("../models/moudules/Navigation")
const RMenu = require("../models/moudules/RMenu")
const Address = require("../models/moudules/Address")
const RCart = require("../models/moudules/RCart")
const Order = require("../models/moudules/Order")
const RList = require("../models/moudules/RList")

const user = []
user.push(
  {
    id:1,
    username:"joe",
    phone:'15318118513',
    role:"admin", 
    password:"123",
    vip:6
  },
  {
    id:2,
    username:"admin",
    phone:'15318118513',
    role:"admin", 
    password:"123",
    vip:6
  }
)


const categories = [];
categories.push(
  {
    id:1,
    describe:"手机 电话卡",
    order:1,    
  },
  {
    id:2,
    describe:"电视 盒子",
    order:2,    
  },
  {
    id:3,
    describe:"笔记本 平板",
    order:3,    
  },
  {
    id:4,
    describe:"家电 插电板",
    order:4,    
  },
  {
    id:5,
    describe:"出行 穿戴",
    order:5,    
  },
  {
    id:6,
    describe:"智能 路由器",
    order:6,    
  },
  {
    id:7,
    describe:"电源 配件",
    order:7,    
  },
  {
    id:8,
    describe:"生活 箱包",
    order:8,    
  }
);



const product = [];
product.push(
  {
    id:1,
    productMainImage:"/upload/productMainImage/mi11.webp",
    productName:"小米11",
    productPrice:3999.01,
    productStock:10000,
    productStatus:0,
    productSubtitle:"骁龙888 2K曲面屏",
    tag:"新品",
    tagColor:"#7ecf68",
    productFlag:true,
    productDescribe1:"小米11",
    productDescribe2:"轻装上阵",
    productDescribe3:"2k超晰曲面",
    productDescribe4:"超薄超轻",
    productBg1:"/upload/product/bg/mi11bg.png",
    productBg2:"/upload/product/bg/mi11.jpg",
    productBg3:"/upload/product/bg/product-bg-3.png",
    productBg4:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/upload/product/gallery/mi111.jpg",
    galleryImg2:"/upload/product/gallery/mi112.jpg",
    galleryImg3:"/upload/product/gallery/mi113.jpg",
    galleryImg4:"/upload/product/gallery/gallery-4.png",
    galleryImg5:"/upload/product/gallery/gallery-3.png",
    videoFlag:true,
    videoSrc:"/upload/product/video/mi11.mp4",
    videoCover:"/upload/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText2:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    detailImg1:"/upload/detail/mi111.jpg",
    detailImg2:"/upload/detail/mi112.jpg",
    detailImg3:"",
    detailImg4:"",
    order:1,
    CategoryId:1
  },
  {
    id:2,
    productMainImage:"/upload/productMainImage/mi10.webp",
    productName:"小米10",
    productPrice:3399.00,
    productStock:10000,
    productStatus:0,
    productSubtitle:"骁龙865 1亿像素相机",
    tag:"热卖",
    tagColor:"orange",
    productFlag:true,
    productDescribe1:"这个手机很厉害",
    productDescribe2:"1亿像素相机",
    productDescribe3:"2k超晰曲面",
    productDescribe4:"真的很厉害",
    productBg1:"/upload/product/bg/product-bg-1.png",
    productBg2:"/upload/product/bg/mi10.jpg",
    productBg3:"/upload/product/bg/mi102.jpg",
    productBg4:"/upload/product/bg/mi103.jpg",
    galleryFlag:true,
    galleryText:"小米10  厉害",
    galleryImg1:"/upload/product/gallery/gallery-2.png",
    galleryImg2:"/upload/product/gallery/gallery-3.png",
    galleryImg3:"/upload/product/gallery/gallery-5.jpg",
    galleryImg4:"/upload/product/gallery/gallery-4.png",
    galleryImg5:"",
    videoFlag:true,
    videoSrc:"/upload/product/video/video.mp4",
    videoCover:"/upload/product/video/videoCover.png",
    videoMainTitleText1:"文体测试测试",
    videoMainTitleText1:"在测试一下",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    detailImg1:"/upload/detail/mi101.jpg",
    detailImg2:"/upload/detail/mi102.jpg",
    detailImg3:"/upload/detail/mi103.jpg",
    detailImg4:"/upload/detail/mi104.jpg",
    order:2,
    CategoryId:1
  },
  {
    id:3,
    productMainImage:"/upload/productMainImage/note9pro.webp",
    productName:"Note 9 Pro",
    productPrice:1599.00,
    productStock:10000,
    productStatus:0,
    productSubtitle:"一亿像素夜景相机 120Hz六档变速",
    tag:"秒杀",
    tagColor:"#e82626",
    productFlag:true,
    productDescribe1:"note9旗舰",
    productDescribe2:"1亿像素相机",
    productDescribe3:"超强AI算法",
    productDescribe4:"红外人脸识别",
    productBg1:"/upload/product/bg/note9pro2.jpg",
    productBg2:"/upload/product/bg/no9bg.jpg",
    productBg3:"/upload/product/bg/note9pro3.jpg",
    productBg4:"",
    galleryFlag:true,
    galleryText:"Note 9 Pro 拍照更美",
    galleryImg1:"/upload/product/gallery/no91.jpg",
    galleryImg2:"/upload/product/gallery/no92.jpg",
    galleryImg3:"/upload/product/gallery/no93.jpg",
    galleryImg4:"/upload/product/gallery/no94.jpg",
    galleryImg5:"",
    videoFlag:true,
    videoSrc:"/upload/product/video/no9.mp4",
    videoCover:"/upload/product/video/videoCover.png",
    videoMainTitleText1:"note9pro经典",
    videoMainTitleText2:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    detailImg1:"/upload/detail/no9p1.jpg",
    detailImg2:"",
    detailImg3:"",
    detailImg4:"",
    order:3,
    CategoryId:1
  },
  {
    id:4,
    productMainImage:"/upload/productMainImage/note9.webp",
    productName:"Note 9",
    productPrice:1299.00,
    productStock:10000,
    productStatus:0,
    productSubtitle:"80OU处理器 5000mAh电池",
    tag:"热卖",
    tagColor:"orange",
    productFlag:true,
    productDescribe1:"骁龙888性能",
    productDescribe2:"1亿像素相机",
    productDescribe3:"2k超晰曲面",
    productDescribe4:"红外人脸识别",
    productBg1:"/upload/product/bg/product-bg-1.png",
    productBg2:"/upload/product/bg/product-bg-2.png",
    productBg3:"/upload/product/bg/product-bg-3.png",
    productBg4:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/upload/product/gallery/gallery-2.png",
    galleryImg2:"/upload/product/gallery/gallery-3.png",
    galleryImg3:"/upload/product/gallery/gallery-5.jpg",
    galleryImg4:"/upload/product/gallery/gallery-4.png",
    galleryImg5:"",
    videoFlag:true,
    videoSrc:"/upload/product/video/mi11.mp4",
    videoCover:"/upload/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText2:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    detailImg1:"/upload/detail/n9.jpg",
    detailImg2:"",
    detailImg3:"",
    detailImg4:"",
    order:4,
    CategoryId:1
  },
  {
    id:5,
    productMainImage:"/upload/productMainImage/redmi9a.webp",
    productName:"Redmi 9A",
    productPrice:599.00,
    productStock:10000,
    productStatus:0,
    productSubtitle:`5000mAh大电量 6.53"超大护眼屏`,
    tag:"新品",
    tagColor:"#7ecf68",
    productFlag:true,
    productDescribe1:"骁龙888性能",
    productDescribe2:"1亿像素相机",
    productDescribe3:"2k超晰曲面",
    productDescribe4:"红外人脸识别",
    productBg1:"/upload/product/bg/mi11bg1.jpg",
    productBg2:"/upload/product/bg/product-bg-2.png",
    productBg3:"/upload/product/bg/product-bg-3.png",
    productBg4:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/upload/product/gallery/gallery-2.png",
    galleryImg2:"/upload/product/gallery/gallery-3.png",
    galleryImg3:"/upload/product/gallery/gallery-5.jpg",
    galleryImg4:"/upload/product/gallery/gallery-4.png",
    galleryImg5:"",
    videoFlag:true,
    videoSrc:"/upload/product/video/mi11.mp4",
    videoCover:"/upload/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText2:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    detailImg1:"/upload/detail/red9a.jpg",
    detailImg2:"",
    detailImg3:"",
    detailImg4:"",
    order:5,
    CategoryId:1
  },
  {
    id:6,
    productMainImage:"/upload/productMainImage/k30zhizun.webp",
    productName:"Redmi K30S 至尊版",
    productPrice:2599.99,
    productStock:10000,
    productStatus:0,
    productSubtitle:"144Hz[7档]变速局刷屏",
    tag:"标签",
    tagColor:"brown",
    productFlag:false,
    detailImg1:"/upload/detail/k3.jpg",
    detailImg2:"",
    detailImg3:"",
    detailImg4:"",
    order:6,
    CategoryId:1
  },
  {
    id:7,
    productMainImage:"/upload/productMainImage/1.webp",
    productName:"大米12",
    productPrice:1234.561,
    productStock:10000,
    productStatus:0,
    productSubtitle:"不赚钱  交个朋友",
    tag:"新品",
    tagColor:"#7ecf68",
    productFlag:false,
    detailImg1:"/upload/detail/phone-1.jpg",
    detailImg2:"/upload/detail/phone-2.jpg",
    detailImg3:"/upload/detail/phone-3.jpg",
    detailImg4:"/upload/detail/phone-4.jpg",
    order:10,
    CategoryId:1
  },
  {
    id:8,
    productMainImage:"/upload/productMainImage/2.webp",
    productName:"小米6",
    productPrice:9999.99,
    productStock:10000,
    productStatus:0,
    productSubtitle:"别看 你买不起",
    tag:"新品",
    tagColor:"#7ecf68",
    productFlag:false,
    detailImg1:"/upload/detail/phone-1.jpg",
    detailImg2:"/upload/detail/phone-2.jpg",
    detailImg3:"/upload/detail/phone-3.jpg",
    detailImg4:"/upload/detail/phone-4.jpg",
    order:11,
    CategoryId:1
  },
  {
    id:9,
    productMainImage:"/upload/productMainImage/3.webp",
    productName:`HUAWEI Mate 40 Pro`,
    productPrice:6499.00,
    productStock:10000,
    productStatus:0,
    productSubtitle:"跃见非凡",
    productFlag:true,
    tag:"秒杀",
    tagColor:"#e82626",
    productFlag:true,
    productDescribe1:"5 nm麒麟9000",
    productDescribe2:"5G SoC旗舰芯片",
    productDescribe3:"超感知徕卡电影影像",
    productDescribe4:"EMUI 11",
    productBg1:"",
    productBg2:"/upload/product/bg/matebj1.jpg",
    productBg3:"/upload/product/bg/matebj2.jpg",
    productBg4:"",
    galleryFlag:true,
    galleryText:"mate40 超感知徕卡",
    galleryImg1:"/upload/product/gallery/mate401.jpg",
    galleryImg2:"/upload/product/gallery/mate402.jpg",
    galleryImg3:"/upload/product/gallery/mate403.jpg",
    galleryImg4:"/upload/product/gallery/gallery-4.png",
    galleryImg5:"/upload/product/gallery/gallery-3.png",
    videoFlag:false,
    detailImg1:"/upload/detail/mate401.png",
    detailImg2:"/upload/detail/mate402.png",
    detailImg3:"/upload/detail/mate403.png",
    detailImg4:"/upload/detail/mate404.png",
    order:12,
    CategoryId:1
  },
  // 电视
  {
    id:21,
    productMainImage:"/upload/productMainImage/d1.webp",
    productName:"电视大师82英寸纪念版",
    productPrice:9999.00,
    productStock:10000,
    productStatus:0,
    productSubtitle:"大屏幕 真好看 真好看",
    tag:"秒杀",
    tagColor:"#e82626",
    productFlag:false,
    detailImg1:"/upload/detail/c11.jpg",
    detailImg2:"/upload/detail/c12.jpg",
    detailImg3:"/upload/detail/c13.jpg",
    detailImg4:"/upload/detail/c14.jpg",
    order:1,
    CategoryId:2
  },
  {
    id:22,
    productMainImage:"/upload/productMainImage/d2.webp",
    productName:"小米透明电视",
    productPrice:9999.00,
    productStock:10000,
    productStatus:0,
    productSubtitle:"透明电视 看见未来",
    tag:"秒杀",
    tagColor:"#e82626",
    productFlag:false,
    detailImg1:"/upload/detail/c21.jpg",
    detailImg2:"/upload/detail/c22.jpg",
    detailImg3:"/upload/detail/c23.jpg",
    detailImg4:"/upload/detail/c24.jpg",
    order:1,
    CategoryId:2
  },
  {
    id:23,
    productMainImage:"/upload/productMainImage/d3.webp",
    productName:`Redmi MAX 98"`,
    productPrice:999.00,
    productStock:10000,
    productStatus:0,
    productSubtitle:"客厅里的巨幕影院 大视野",
    tag:"秒杀",
    tagColor:"#e82626",
    productFlag:false,
    detailImg1:"/upload/detail/c31.jpg",
    detailImg2:"/upload/detail/c32.jpg",
    detailImg3:"/upload/detail/c33.jpg",
    detailImg4:"/upload/detail/c34.jpg",
    order:1,
    CategoryId:2
  },
  {
    id:31,
    productMainImage:"/upload/productMainImage/c1.webp",
    productName:`Air 13.3" 2019款`,
    productPrice:5399.00,
    productStock:10000,
    productStatus:0,
    productSubtitle:"新—代独立显卡",
    tag:"秒杀",
    tagColor:"#e82626",
    productFlag:true,
    productDescribe1:"Air 13.3",
    productDescribe2:"超强处理器",
    productDescribe3:"智能优化",
    productDescribe4:"超薄超轻",
    productBg1:"/upload/product/bg/dn11.jpg",
    productBg2:"/upload/product/bg/dn12.png",
    productBg3:"/upload/product/bg/dn13.png",
    detailImg1:"/upload/detail/n1.jpg",
    detailImg2:"/upload/detail/n2.jpg",
    detailImg3:"/upload/detail/n3.jpg",
    detailImg4:"/upload/detail/n4.jpg",
    order:1,
    CategoryId:3
  },
  {
    id:32,
    productMainImage:"/upload/productMainImage/c1.webp",
    productName:`Pro 15.6" 2020款`,
    productPrice:6799.00,
    productStock:10000,
    productStatus:0,
    productSubtitle:"全新第十代英特尔酷睿处理器",
    tag:"秒杀",
    tagColor:"#e82626",
    productFlag:false,
    detailImg1:"/upload/detail/bjpro10.jpg",
    detailImg2:"/upload/detail/bjpro11.jpg",
    detailImg3:"/upload/detail/bjpro12.jpg",
    detailImg4:"/upload/detail/bjpro13.jpg",
    order:1,
    CategoryId:3
  },
  {
    id:41,
    productMainImage:"/upload/productMainImage/x1.webp",
    productName:`米家互联网洗烘一体机`,
    productPrice:2899.00,
    productStock:10000,
    productStatus:0,
    productSubtitle:"国标双A+级洗烘能力",
    tag:"秒杀",
    tagColor:"#e82626",
    productFlag:false,
    detailImg1:"/upload/detail/x11.jpg",
    detailImg2:"/upload/detail/x12.jpg",
    detailImg3:"/upload/detail/x13.jpg",
    detailImg4:"/upload/detail/x14.jpg",
    order:1,
    CategoryId:4
  },
  {
    id:51,
    productMainImage:"/upload/productMainImage/p1.jpg",
    productName:`九号平衡车`,
    productPrice:2899.00,
    productStock:10000,
    productStatus:0,
    productSubtitle:"年轻人的酷玩具",
    tag:"秒杀",
    tagColor:"#e82626",
    productFlag:true,
    productDescribe1:" 骑行遥控两种玩法",
    productDescribe2:"22公里超长续航",
    productDescribe3:"轻、小、便携",
    productDescribe4:"重心驱动",
    productBg1:"/upload/product/bg/pbg1.jpg",
    productBg2:"/upload/product/bg/pbg2.jpg",
    productBg3:"/upload/product/bg/pbg3.jpg",
    productBg4:"",
    galleryFlag:false,
    videoFlag:false,
    detailImg1:"/upload/detail/p11.jpg",
    detailImg2:"",
    detailpmg3:"",
    detailImg4:"",
    order:1,
    CategoryId:5
  },
  {
    id:52,
    productMainImage:"/upload/productMainImage/sh.webp",
    productName:`小米手表Color 运动版`,
    productPrice:699.00,
    productStock:10000,
    productStatus:0,
    productSubtitle:"⾼分辨率AMOLED显示屏",
    tag:"秒杀",
    tagColor:"#e82626",
    productFlag:false,
    galleryFlag:false,
    videoFlag:false,
    detailImg1:"/upload/detail/sb1.jpg",
    detailImg2:"/upload/detail/sb2.jpg",
    detailImg3:"/upload/detail/sb3.jpg",
    detailImg4:"/upload/detail/sb4.jpg",
    order:1,
    CategoryId:5
  },
)


const display = [];
display.push(
  {
    id:1,
    type:"ads",
    displaySrc:"/upload/display/ads/ad.jpg",
    ProductId:52,
    order:1
  },
  {
    id:2,
    type:"ads",
    displaySrc:"/upload/display/ads/ad2.jpg",
    ProductId:2,
    order:2

  },
  {
    id:3,
    type:"ads",
    displaySrc:"/upload/display/ads/ad3.jpg",
    ProductId:5,
    order:3
  },
  {
    id:4,
    type:"ads",
    displaySrc:"/upload/display/ads/ad4.png",
    ProductId:1,
    order:4
  },
  {
    id:5,
    type:"new",
    displaySrc:"/upload/display/new/note9.webp",
    ProductId:3,
    order:1
  },
  {
    id:7,
    type:"swiper",
    displaySrc:"/upload/display/swiper/mi10.webp",
    ProductId:2,
    order:1
  },
  {
    id:8,
    type:"swiper",
    displaySrc:"/upload/display/swiper/note9.jpg",
    ProductId:4,
    order:2
  },
  {
    id:9,
    type:"swiper",
    displaySrc:"/upload/display/swiper/max98.webp",
    ProductId:23,
    order:3
  },
  {
    id:10,
    type:"swiper",
    displaySrc:"/upload/display/swiper/dashi82.webp",
    ProductId:4,
    order:4
  },
  {
    id:11,
    type:"swiper",
    displaySrc:"/upload/display/swiper/max98.webp",
    ProductId:4,
    order:99
  },
  {
    id:12,
    type:"main",
    displaySrc:"/upload/display/main/mi11.webp",
    ProductId:4,
    order:1
  }
)


const navigation = [];
navigation.push(
  {
    id:1,
    navName:"小米手机",
    order:1
  },
  {
    id:2,
    navName:"RedMi红米",
    order:2
  },
  {
    id:3,
    navName:"电脑",
    order:3
  },
  {
    id:4,
    navName:"电视",
    order:3
  },
  {
    id:5,
    navName:"友商HUAWEI",
    order:4
  }
)


const rMenu = [];
rMenu.push(
  {
    NavigationId:1,
    ProductId:1,
    order:1,
  },
  {
    NavigationId:1,
    ProductId:2,
    order:2,
  },
  {
    NavigationId:1,
    ProductId:3,
    order:3,
  },
  {
    NavigationId:1,
    ProductId:4,
    order:4,
  },
  {
    NavigationId:1,
    ProductId:5,
    order:5,
  },
  {
    NavigationId:1,
    ProductId:6,
    order:6,
  },
  {
    NavigationId:2,
    ProductId:7,
    order:1,
  },
  {
    NavigationId:2,
    ProductId:8,
    order:2
  },
  {
    NavigationId:3,
    ProductId:31,
    order:1,
  },
  {
    NavigationId:3,
    ProductId:32,
    order:2,
  },
  {
    NavigationId:4,
    ProductId:21,
    order:1
  },
  {
    NavigationId:4,
    ProductId:22,
    order:2
  },
  {
    NavigationId:4,
    ProductId:23,
    order:3
  },
  {
    NavigationId:5,
    ProductId:9,
    order:1
  }
)

const address = [];
address.push(
  {
    id:1,
    receiverName:"李哈哈",
    receiverMobile:"15318118513",
    receiverProvince:"山东",
    receiverCity:"烟台市",
    receiverDistrict:"莱山区",
    receiverAddress:"滨海中路山东工商学院26号楼335宿舍",
    receiverZip:"264003",
    createdAt:1612262420000,
    UserId:1
  },
  {
    id:2,
    receiverName:"joe",
    receiverMobile:"15318118513",
    receiverProvince:"山东",
    receiverCity:"泰安市",
    receiverDistrict:"岱岳区",
    receiverAddress:"良庄镇",
    receiverZip:"264003",
    createdAt:1612272420000,
    UserId:1
  }
)


const rCart = [];
rCart.push(
  { 
    UserId:1,
    ProductId:1,
    quantity:2,
    selected:true,
  },{ 
    UserId:1,
    ProductId:2,
    quantity:1,
    selected:false,
  },{ 
    UserId:1,
    ProductId:3,
    quantity:6,
    selected:true,
  }
)


const order = [];
order.push(
  {
    id:"161207355272980048",
    UserId:1,
    AddressId:1,
    payType: 0,
    payTypeDesc:"未支付",
    payStatus:0,
    payStatusDesc:"未支付",
  }
) 

const rList = [];
rList.push(
  {
    OrderId:"161207355272980048",
    ProductId:1,
    quantity:1
  },
  {
    OrderId:"161207355272980048",
    ProductId:2,
    quantity:2
  },
  {
    OrderId:"161207355272980048",
    ProductId:4,
    quantity:4
  }
)


// 生成
const Arr = [];
Arr.push(                          // 没有外键的先执行
  User.bulkCreate(user),
  Category.bulkCreate(categories)
);

Promise.all(Arr).then(() => {    // 有外键的 等外键所在表完事之后再执行
  return Navigation.bulkCreate(navigation)
}).then(()=>{
  return Product.bulkCreate(product)
}).then(()=>{
  return Display.bulkCreate(display)
}).then(()=>{
  return RMenu.bulkCreate(rMenu)
}).then(()=>{
  return Address.bulkCreate(address)
}).then(()=>{
  return RCart.bulkCreate(rCart)
}).then(()=>{
  return Order.bulkCreate(order)
}).then(()=>{
  return RList.bulkCreate(rList)
}).catch((err)=>{
  console.log("【数据同步时出错】")
  console.log(err);
}).then(()=>{
  console.log("假数据模拟就绪")
})







