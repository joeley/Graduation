

/*
[
  {
    dataValues:{
      data:1
    }
  }
]
[
  {
    data:1
  }
]
 */

exports.unnest = function(arr){
  const copy = arr
  const flag = false
  const newArr = arr.map((ele)=>{
    if(!ele.dataValues){
      console.log("此数组结构不能去嵌套")
      flag = true;
    }
    return ele.dataValues
  })

  if(flag){
    return copy
  }
  return newArr
}