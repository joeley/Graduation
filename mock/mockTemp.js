
const User = require("../models/moudules/User");
const Category = require("../models/moudules/Category");
const Product = require("../models/moudules/Product")
const Display = require("../models/moudules/Display")
const Navigation = require("../models/moudules/Navigation")
const RMenu = require("../models/moudules/RMenu")



const user =[];
user.push(
  {
    username:"joe",
    phone:'15318118513',
    role:"admin", 
    password:"123",
    vip:6
  },
  {
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
    describe:"手机 电话卡",
    order:1,    
  },
  {
    describe:"电视 盒子",
    order:2,    
  },
  {
    describe:"笔记本 平板",
    order:3,    
  },
  {
    describe:"家电 插电板",
    order:4,    
  },
  {
    describe:"出行 穿戴",
    order:5,    
  },
  {
    describe:"智能 路由器",
    order:6,    
  },
  {
    describe:"电源 配件",
    order:7,    
  },
  {
    describe:"生活 箱包",
    order:8,    
  }
);



const product = [];
product.push(
  {
    productMainImage:"/imgs/productMainImage/nav-3.png",
    productName:"小米12",
    productPrice:1999.99,
    productStock:10000,
    productStatus:0,
    productStatus:true,
    productSubtitle:"交个朋友 不赚钱",
    productFlag:true,
    productBg1:"/imgs/product/bg/product-bg-1.png",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    productBg5:"",
    productBg6:"",
    productBg7:"",
    productBg8:"",
    productBg9:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-5.png",
    galleryImg4:"/imgs/product/gallery/gallery-1.png",
    galleryImg5:"",
    galleryImg6:"",
    galleryImg7:"",
    galleryImg8:"",
    galleryImg9:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/video.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText1:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    order:1,
    tag:"新品",
    tagColor:"#7ecf68",
    CategoryId:1
  },
  {
    productMainImage:"/imgs/productMainImage/nav-2.png",
    productName:"小米13",
    productPrice:1999,
    productStock:10000,
    productStatus:0,
    productStatus:true,
    productSubtitle:"小米13 骁龙999",
    productFlag:true,
    productBg1:"/imgs/product/bg/product-bg-1.png",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    productBg5:"",
    productBg6:"",
    productBg7:"",
    productBg8:"",
    productBg9:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-4.png",
    galleryImg4:"/imgs/product/gallery/gallery-5.png",
    galleryImg5:"/imgs/product/gallery/gallery-6.png",
    galleryImg6:"/imgs/product/gallery/gallery-1.png",
    galleryImg7:"",
    galleryImg8:"",
    galleryImg9:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/video.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText1:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    order:2,
    tag:"秒杀",
    tagColor:"#e82626",
    CategoryId:1
  },
  {
    productMainImage:"/imgs/productMainImage/nav-2.png",
    productName:"小米14",
    productPrice:2000.01,
    productStock:10000,
    productStatus:0,
    productStatus:false,
    productSubtitle:"小米13 骁龙999",
    productFlag:true,
    productBg1:"/imgs/product/bg/product-bg-1.png",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    productBg5:"",
    productBg6:"",
    productBg7:"",
    productBg8:"",
    productBg9:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-4.png",
    galleryImg4:"/imgs/product/gallery/gallery-5.png",
    galleryImg5:"/imgs/product/gallery/gallery-6.png",
    galleryImg6:"/imgs/product/gallery/gallery-1.png",
    galleryImg7:"",
    galleryImg8:"",
    galleryImg9:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/video.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText1:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    order:3,
    tag:"新品",
    tagColor:"#7ecf68",
    CategoryId:1
  },
  {
    productMainImage:"/imgs/productMainImage/nav-2.png",
    productName:"华为mate 30",
    productPrice:2000.01,
    productStock:10000,
    productStatus:0,
    productStatus:false,
    productSubtitle:" 骁龙999",
    productFlag:true,
    productBg1:"/imgs/product/bg/product-bg-1.png",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    productBg5:"",
    productBg6:"",
    productBg7:"",
    productBg8:"",
    productBg9:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-4.png",
    galleryImg4:"/imgs/product/gallery/gallery-5.png",
    galleryImg5:"/imgs/product/gallery/gallery-6.png",
    galleryImg6:"/imgs/product/gallery/gallery-1.png",
    galleryImg7:"",
    galleryImg8:"",
    galleryImg9:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/video.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText1:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    order:3,
    tag:"热门",
    tagColor:"red",
    CategoryId:1
  },
  {
    productMainImage:"/imgs/productMainImage/nav-2.png",
    productName:"小米14",
    productPrice:2000.01,
    productStock:10000,
    productStatus:0,
    productStatus:false,
    productSubtitle:"小米13 骁龙999",
    productFlag:true,
    productBg1:"/imgs/product/bg/product-bg-1.png",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    productBg5:"",
    productBg6:"",
    productBg7:"",
    productBg8:"",
    productBg9:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-4.png",
    galleryImg4:"/imgs/product/gallery/gallery-5.png",
    galleryImg5:"/imgs/product/gallery/gallery-6.png",
    galleryImg6:"/imgs/product/gallery/gallery-1.png",
    galleryImg7:"",
    galleryImg8:"",
    galleryImg9:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/video.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText1:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    order:3,
    tag:"新品",
    tagColor:"#7ecf68",
    CategoryId:1
  },
  {
    productMainImage:"/imgs/productMainImage/nav-2.png",
    productName:"小米14",
    productPrice:2000.01,
    productStock:10000,
    productStatus:0,
    productStatus:false,
    productSubtitle:"小米13 骁龙999",
    productFlag:true,
    productBg1:"/imgs/product/bg/product-bg-1.png",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    productBg5:"",
    productBg6:"",
    productBg7:"",
    productBg8:"",
    productBg9:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-4.png",
    galleryImg4:"/imgs/product/gallery/gallery-5.png",
    galleryImg5:"/imgs/product/gallery/gallery-6.png",
    galleryImg6:"/imgs/product/gallery/gallery-1.png",
    galleryImg7:"",
    galleryImg8:"",
    galleryImg9:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/video.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText1:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    order:3,
    tag:"新品",
    tagColor:"#7ecf68",
    CategoryId:1
  },
  {
    productMainImage:"/imgs/productMainImage/nav-2.png",
    productName:"小米14",
    productPrice:2000.01,
    productStock:10000,
    productStatus:0,
    productStatus:false,
    productSubtitle:"小米13 骁龙999",
    productFlag:true,
    productBg1:"/imgs/product/bg/product-bg-1.png",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    productBg5:"",
    productBg6:"",
    productBg7:"",
    productBg8:"",
    productBg9:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-4.png",
    galleryImg4:"/imgs/product/gallery/gallery-5.png",
    galleryImg5:"/imgs/product/gallery/gallery-6.png",
    galleryImg6:"/imgs/product/gallery/gallery-1.png",
    galleryImg7:"",
    galleryImg8:"",
    galleryImg9:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/video.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText1:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    order:3,
    tag:"新品",
    tagColor:"#7ecf68",
    CategoryId:1
  },
  {
    productMainImage:"/imgs/productMainImage/nav-2.png",
    productName:"小米14",
    productPrice:2000.01,
    productStock:10000,
    productStatus:0,
    productStatus:false,
    productSubtitle:"小米13 骁龙999",
    productFlag:true,
    productBg1:"/imgs/product/bg/product-bg-1.png",
    productBg2:"/imgs/product/bg/product-bg-2.png",
    productBg3:"/imgs/product/bg/product-bg-3.png",
    productBg4:"",
    productBg5:"",
    productBg6:"",
    productBg7:"",
    productBg8:"",
    productBg9:"",
    galleryFlag:true,
    galleryText:"小米11 AI变焦双摄拍摄",
    galleryImg1:"/imgs/product/gallery/gallery-2.png",
    galleryImg2:"/imgs/product/gallery/gallery-3.png",
    galleryImg3:"/imgs/product/gallery/gallery-4.png",
    galleryImg4:"/imgs/product/gallery/gallery-5.png",
    galleryImg5:"/imgs/product/gallery/gallery-6.png",
    galleryImg6:"/imgs/product/gallery/gallery-1.png",
    galleryImg7:"",
    galleryImg8:"",
    galleryImg9:"",
    videoFlag:true,
    videoSrc:"/imgs/product/video/video.mp4",
    videoCover:"/imgs/product/video/videoCover.png",
    videoMainTitleText1:"60帧超慢动作摄影",
    videoMainTitleText1:"慢慢回味每一瞬间的精彩",
    videoSubheadText1:"后置960帧电影般超慢动作视频，将眨眼间的美妙展现得淋漓尽致！",
    videoSubheadText2:"更能AI 精准分析视频内容，15个场景智能匹配背景音效。",
    order:3,
    tag:"新品",
    tagColor:"#7ecf68",
    CategoryId:1
  }
)


const display = [];
display.push(
  {
    type:"ads",
    displaySrc:"/imgs/display/ads/ads-1.png",
    ProductId:1,
    order:1
  },
  {
    type:"ads",
    displaySrc:"/imgs/display/ads/ads-2.jpg",
    ProductId:2,
    order:2

  },
  {
    type:"ads",
    displaySrc:"/imgs/display/ads/ads-3.png",
    ProductId:3,
    order:3
  },
  {
    type:"ads",
    displaySrc:"/imgs/display/ads/ads-4.jpg",
    ProductId:4,
    order:4
  },
  {
    type:"new",
    displaySrc:"/imgs/display/new/banner-1.png",
    ProductId:5,
    order:1
  },
  {
    type:"swiper",
    displaySrc:"/imgs/display/swiper/slide-1.jpg",
    ProductId:6,
    order:1
  },
  {
    type:"swiper",
    displaySrc:"/imgs/display/swiper/slide-2.jpg",
    ProductId:7,
    order:2
  },
  {
    type:"swiper",
    displaySrc:"/imgs/display/swiper/slide-3.jpg",
    ProductId:4,
    order:3
  },
  {
    type:"swiper",
    displaySrc:"/imgs/display/swiper/slide-4.jpg",
    ProductId:4,
    order:4
  },
  {
    type:"swiper",
    displaySrc:"/imgs/display/swiper/slide-5.jpg",
    ProductId:4,
    order:99
  },
  {
    type:"main",
    displaySrc:"/imgs/display/main/mi11.webp",
    ProductId:4,
    order:1
  }
)


const navigation = [];
navigation.push(
  {
    navName:"小米手机",
    order:1
  },
  {
    navName:"RedMi红米",
    order:2
  },
  {
    navName:"友商HUAWEI",
    order:4
  },
  {
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
}).finally(()=>{
  console.log("假数据模拟就绪")
})
.catch(()=>{
  console.log("【数据同步时出错】")
})






