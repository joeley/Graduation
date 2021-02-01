
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
    productMainImage:"/imgs/productMainImage/mi11.webp",
    productName:"小米11",
    productPrice:4299.01,
    productStock:10000,
    productStatus:0,
    productStatus:true,
    productSubtitle:"骁龙888 2K曲面屏",
    tag:"新品",
    tagColor:"#7ecf68",
    productFlag:true,
    productDescribe1:"骁龙888性能",
    productDescribe2:"1亿像素相机",
    productDescribe3:"2k超晰曲面",
    productDescribe4:"红外人脸识别",
    productBg1:"/imgs/product/bg/mi11bg1.jpg",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-5.jpg",
    galleryImg4:"/imgs/product/gallery/gallery-4.png",
    galleryImg5:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/mi11.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText2:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    detailImg1:"/imgs/detail/mi11-1.jpg",
    detailImg2:"/imgs/detail/mi11-2.jpg",
    detailImg3:"",
    detailImg4:"",
    order:1,
    CategoryId:1
  },
  {
    id:2,
    productMainImage:"/imgs/productMainImage/1.webp",
    productName:"Note 9 Pro",
    productPrice:1599.00,
    productStock:10000,
    productStatus:0,
    productStatus:true,
    productSubtitle:"一亿像素夜景相机 液冷散热",
    tag:"热卖",
    tagColor:"orange",
    productFlag:true,
    productDescribe1:"这个手机很厉害",
    productDescribe2:"1亿像素相机",
    productDescribe3:"2k超晰曲面",
    productDescribe4:"真的很厉害",
    productBg1:"/imgs/product/bg/product-bg-1.png",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    galleryFlag:true,
    galleryText:"Note 9 Pro 厉害",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-5.jpg",
    galleryImg4:"/imgs/product/gallery/gallery-4.png",
    galleryImg5:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/video.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"文体测试测试",
    videoMainTitleText1:"在测试一下",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    detailImg1:"/imgs/detail/phone-1.jpg",
    detailImg2:"/imgs/detail/phone-2.jpg",
    detailImg3:"/imgs/detail/phone-3.jpg",
    detailImg4:"/imgs/detail/phone-4.jpg",
    order:1,
    CategoryId:1
  },
  {
    id:3,
    productMainImage:"/imgs/productMainImage/2.webp",
    productName:"Redmi K30 至尊纪念版",
    productPrice:1999.00,
    productStock:10000,
    productStatus:0,
    productStatus:true,
    productSubtitle:"120Hz AMOLED 弹出式全面屏",
    tag:"秒杀",
    tagColor:"#e82626",
    productFlag:true,
    productDescribe1:"骁龙888性能",
    productDescribe2:"1亿像素相机",
    productDescribe3:"2k超晰曲面",
    productDescribe4:"红外人脸识别",
    productBg1:"/imgs/product/bg/mi11bg1.jpg",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-5.jpg",
    galleryImg4:"/imgs/product/gallery/gallery-4.png",
    galleryImg5:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/mi11.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText2:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    detailImg1:"/imgs/detail/mi11-1.jpg",
    detailImg2:"/imgs/detail/mi11-2.jpg",
    detailImg3:"",
    detailImg4:"",
    order:1,
    CategoryId:1
  },
  {
    id:4,
    productMainImage:"/imgs/productMainImage/heisha3s.webp",
    productName:"黑鲨3S",
    productPrice:3999.09,
    productStock:10000,
    productStatus:0,
    productStatus:true,
    productSubtitle:"天玑1000 性能强悍",
    tag:"热卖",
    tagColor:"orange",
    productFlag:true,
    productDescribe1:"骁龙888性能",
    productDescribe2:"1亿像素相机",
    productDescribe3:"2k超晰曲面",
    productDescribe4:"红外人脸识别",
    productBg1:"/imgs/product/bg/mi11bg1.jpg",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-5.jpg",
    galleryImg4:"/imgs/product/gallery/gallery-4.png",
    galleryImg5:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/mi11.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText2:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    detailImg1:"/imgs/detail/mi11-1.jpg",
    detailImg2:"/imgs/detail/mi11-2.jpg",
    detailImg3:"",
    detailImg4:"",
    order:1,
    CategoryId:1
  },
  {
    id:5,
    productMainImage:"/imgs/productMainImage/mi10zhizun.webp",
    productName:"小米10 至尊至尊版",
    productPrice:99999.99,
    productStock:10000,
    productStatus:0,
    productStatus:true,
    productSubtitle:"别看 你真买不起",
    tag:"新品",
    tagColor:"#7ecf68",
    productFlag:true,
    productDescribe1:"骁龙888性能",
    productDescribe2:"1亿像素相机",
    productDescribe3:"2k超晰曲面",
    productDescribe4:"红外人脸识别",
    productBg1:"/imgs/product/bg/mi11bg1.jpg",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-5.jpg",
    galleryImg4:"/imgs/product/gallery/gallery-4.png",
    galleryImg5:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/mi11.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText2:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    detailImg1:"/imgs/detail/mi11-1.jpg",
    detailImg2:"/imgs/detail/mi11-2.jpg",
    detailImg3:"",
    detailImg4:"",
    order:1,
    CategoryId:1
  },
  {
    id:6,
    productMainImage:"/imgs/productMainImage/redmik30s.webp",
    productName:"大米12",
    productPrice:1234.56,
    productStock:10000,
    productStatus:0,
    productStatus:true,
    productSubtitle:"这里是商品简介",
    tag:"标签",
    tagColor:"brown",
    productFlag:true,
    productDescribe1:"商品描述1",
    productDescribe2:"商品描述2",
    productDescribe3:"商品描述3",
    productDescribe4:"商品描述4",
    productBg1:"/imgs/product/bg/mi11bg1.jpg",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    galleryFlag:true,
    galleryText:"相册描述",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-5.jpg",
    galleryImg4:"/imgs/product/gallery/gallery-4.png",
    galleryImg5:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/mi11.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"视频主介绍1",
    videoMainTitleText1:"视频主介绍2",
    videoSubheadText1:"视频次介绍1",
    videoSubheadText2:"视频次介绍2",
    detailImg1:"/imgs/detail/mi11-1.jpg",
    detailImg2:"/imgs/detail/mi11-2.jpg",
    detailImg3:"",
    detailImg4:"",
    order:1,
    CategoryId:1
  },
  {
    id:7,
    productMainImage:"/imgs/productMainImage/mi11.webp",
    productName:"小米11",
    productPrice:4299.01,
    productStock:10000,
    productStatus:0,
    productStatus:true,
    productSubtitle:"骁龙888|2K曲面屏",
    tag:"新品",
    tagColor:"#7ecf68",
    productFlag:true,
    productDescribe1:"骁龙888性能",
    productDescribe2:"1亿像素相机",
    productDescribe3:"2k超晰曲面",
    productDescribe4:"红外人脸识别",
    productBg1:"/imgs/product/bg/mi11bg1.jpg",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-5.jpg",
    galleryImg4:"/imgs/product/gallery/gallery-4.png",
    galleryImg5:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/mi11.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText2:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    detailImg1:"/imgs/detail/mi11-1.jpg",
    detailImg2:"/imgs/detail/mi11-2.jpg",
    detailImg3:"",
    detailImg4:"",
    order:1,
    CategoryId:1
  },
  {
    id:8,
    productMainImage:"/imgs/productMainImage/mi11.webp",
    productName:"小米11",
    productPrice:4299.01,
    productStock:10000,
    productStatus:0,
    productStatus:true,
    productSubtitle:"骁龙888|2K曲面屏",
    tag:"新品",
    tagColor:"#7ecf68",
    productFlag:true,
    productDescribe1:"骁龙888性能",
    productDescribe2:"1亿像素相机",
    productDescribe3:"2k超晰曲面",
    productDescribe4:"红外人脸识别",
    productBg1:"/imgs/product/bg/mi11bg1.jpg",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-5.jpg",
    galleryImg4:"/imgs/product/gallery/gallery-4.png",
    galleryImg5:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/mi11.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText2:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    detailImg1:"/imgs/detail/mi11-1.jpg",
    detailImg2:"/imgs/detail/mi11-2.jpg",
    detailImg3:"",
    detailImg4:"",
    order:1,
    CategoryId:1
  },
  {
    id:9,
    productMainImage:"/imgs/productMainImage/mi11.webp",
    productName:"小米11",
    productPrice:4299.01,
    productStock:10000,
    productStatus:0,
    productStatus:true,
    productSubtitle:"骁龙888|2K曲面屏",
    tag:"秒杀",
    tagColor:"#e82626",
    productFlag:true,
    productDescribe1:"骁龙888性能",
    productDescribe2:"1亿像素相机",
    productDescribe3:"2k超晰曲面",
    productDescribe4:"红外人脸识别",
    productBg1:"/imgs/product/bg/mi11bg1.jpg",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-5.jpg",
    galleryImg4:"/imgs/product/gallery/gallery-4.png",
    galleryImg5:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/mi11.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText2:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    detailImg1:"/imgs/detail/mi11-1.jpg",
    detailImg2:"/imgs/detail/mi11-2.jpg",
    detailImg3:"",
    detailImg4:"",
    order:1,
    CategoryId:1
  },
  {
    id:10,
    productMainImage:"/imgs/productMainImage/nav-3-1.jpg",
    productName:"电视大师82英寸纪念版",
    productPrice:2000.00,
    productStock:10000,
    productStatus:0,
    productStatus:true,
    productSubtitle:"真好看 真好看",
    tag:"秒杀",
    tagColor:"#e82626",
    productFlag:false,
    productDescribe1:"骁龙888性能",
    productDescribe2:"1亿像素相机",
    productDescribe3:"2k超晰曲面",
    productDescribe4:"红外人脸识别",
    productBg1:"/imgs/product/bg/mi11bg1.jpg",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-5.jpg",
    galleryImg4:"/imgs/product/gallery/gallery-4.png",
    galleryImg5:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/mi11.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText2:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    detailImg1:"/imgs/detail/mi11-1.jpg",
    detailImg2:"/imgs/detail/mi11-2.jpg",
    detailImg3:"",
    detailImg4:"",
    order:1,
    CategoryId:2
  },
)


const display = [];
display.push(
  {
    id:1,
    type:"ads",
    displaySrc:"/imgs/display/ads/ads-1.png",
    ProductId:1,
    order:1
  },
  {
    id:2,
    type:"ads",
    displaySrc:"/imgs/display/ads/ads-2.jpg",
    ProductId:2,
    order:2

  },
  {
    id:3,
    type:"ads",
    displaySrc:"/imgs/display/ads/ads-3.png",
    ProductId:3,
    order:3
  },
  {
    id:4,
    type:"ads",
    displaySrc:"/imgs/display/ads/ads-4.jpg",
    ProductId:4,
    order:4
  },
  {
    id:5,
    type:"new",
    displaySrc:"/imgs/display/new/banner-1.png",
    ProductId:5,
    order:1
  },
  {
    id:7,
    type:"swiper",
    displaySrc:"/imgs/display/swiper/slide-1.jpg",
    ProductId:6,
    order:1
  },
  {
    id:8,
    type:"swiper",
    displaySrc:"/imgs/display/swiper/slide-2.jpg",
    ProductId:7,
    order:2
  },
  {
    id:9,
    type:"swiper",
    displaySrc:"/imgs/display/swiper/slide-3.jpg",
    ProductId:4,
    order:3
  },
  {
    id:10,
    type:"swiper",
    displaySrc:"/imgs/display/swiper/slide-4.jpg",
    ProductId:4,
    order:4
  },
  {
    id:11,
    type:"swiper",
    displaySrc:"/imgs/display/swiper/slide-5.jpg",
    ProductId:4,
    order:99
  },
  {
    id:12,
    type:"main",
    displaySrc:"/imgs/display/main/mi11.webp",
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
    navName:"友商HUAWEI",
    order:4
  },
  {
    id:4,
    navName:"电脑",
    order:3
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
    order:3,
  },
  {
    NavigationId:1,
    ProductId:3,
    order:2,
  },
  {
    NavigationId:1,
    ProductId:4,
    order:6,
  },
  {
    NavigationId:1,
    ProductId:5,
    order:7,
  },
  {
    NavigationId:1,
    ProductId:6,
    order:4,
  },
  {
    NavigationId:3,
    ProductId:1,
    order:2,
  },
  {
    NavigationId:3,
    ProductId:2,
    order:1
  },
  {
    NavigationId:3,
    ProductId:3,
    order:3,
  },
  {
    NavigationId:3,
    ProductId:4,
    order:4,
  },
  {
    NavigationId:4,
    ProductId:2,
    order:8
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







