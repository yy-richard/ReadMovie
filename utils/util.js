//stars在接口中是数字,[1,1,1,0,0],1代表实心,0代表空心,该评分为3星
function convertToStarsArray(stars){
  var num = stars.toString().substring(0,1);//只要第一个数字
  var array=[];
  for(var i=1;i<=5;i++){
    if(i<=num){
      array.push(1);
    }else{
      array.push(0);
    }
  }
  return array;
}
//将postList模拟数据库输出
module.exports = {
  convertToStarsArray: convertToStarsArray
}