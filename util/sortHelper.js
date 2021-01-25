/**
 * 对arr的里对象ele进行排序
 * [{order:1},{order:2}]
 * @param {*} arr  
 */
exports.sortObj = function(arr){
  arr.sort(function(a,b){
    if (!a.order){
      a.order = 9999999999
    }
    if (!b.order){
      b.order = 9999999999
    }
    return a.order -  b.order
  })
  return arr
}