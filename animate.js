import cssHandle from './css'

/** 
 * 
 * 参数
 *      obj   dom元素
 *      json  样式或属性 如果是数字，需要是number  背景色需要rgb格式   例如 rgb(255, 192, 203)  
 *      fn    回调函数
 **/
export default function animate(obj,json,fn){
    clearInterval(obj.timer); 
    obj.timer=setInterval(function(){
        let flag=true;//假设所有的运动都到达终点
        for(let attr in json){
            //1取当前值
            let icur=0;
            switch (attr) {
                case "opacity":
                    icur=cssHandle.getStyle(obj,attr) <= 1 ? parseFloat(cssHandle.getStyle(obj,attr))*100 : parseFloat(cssHandle.getStyle(obj,attr));
                    json[attr] = json[attr] <= 1 ? json[attr]*100 : json[attr]
                    break;
                case "float":
                    icur = cssHandle.getStyle(obj,attr)
                    break;
                case "backgroundColor":
                    icur = cssHandle.getStyle(obj,'background-color')
                    break;
                case "zIndex":
                    icur = cssHandle.getStyle(obj,'z-index')
                    break;
                case "scrollTop":
                    icur = obj.scrollTop
                    break;
                default:
                icur=parseInt(cssHandle.getStyle(obj,attr));
            }
            //2算速度
            let speed = 0;
            if(typeof icur === 'number') {
                speed=(json[attr]-icur)/8;
                speed=speed>0?Math.ceil(speed):Math.floor(speed);//清除小数
            }
            
            //3检测停止,没有判断所有的都到达终点
            if (icur!=json[attr]){
                flag=false;
            }
            
            if (attr=='opacity') {   
                cssHandle.setStyle(obj, attr, (icur+speed)/100)    
            } else if(attr=='backgroundColor'){
                cssHandle.setStyle(obj, 'background-color', json[attr])
            } else if(attr=='float'){
                cssHandle.setStyle(obj, attr, json[attr])
            } else if(attr=='zIndex'){
                cssHandle.setStyle(obj, 'z-index', json[attr])
            } else if(attr=='scrollTop'){
                obj.scrollTop = icur+speed
                console.log(obj.scrollTop);
                
            } else {
                cssHandle.setStyle(obj, attr, icur+speed+'px')
            } 
        }       
        if(flag){
            clearInterval(obj.timer);
            if (fn) {
                fn();
            } 
        }
    },30);
}
