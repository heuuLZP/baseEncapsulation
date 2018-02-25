import cssHandle from './css'

// 封装requestAnimationFrame
if(!window.requestAnimationFrame) {
    window.requestAnimationFrame = (window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        var self = this, start, finish;
        return window.setTimeout(function() {
            start = +new Date();
            callback(start);
            finish = +new Date();
            self.timeout = 1000/60 - (finish - start);
        }, self.timeout);
    });
}

// 封装cancelRequestAnimFrame
window.cancelRequestAnimFrame = ( function() {
    return window.cancelAnimationFrame ||
        window.webkitCancelRequestAnimationFrame ||
        window.mozCancelRequestAnimationFrame ||
        window.oCancelRequestAnimationFrame ||
        window.msCancelRequestAnimationFrame ||
        clearTimeout;
} )();


/**
 *      缓动函数
 *      @param {t}  current time（当前时间）；
 *      @param {b}  beginning value（初始值）；
 *      @param {c}  change in value（变化量）；
 *      @param {d}  duration（持续时间）。
 **/
let Tween = {
    Linear: function(t, b, c, d) { 
        return c * t / d + b; 
    },
    Quad: {
        easeIn: function(t, b, c, d) {
            return c * (t /= d) * t + b;
        },
        easeOut: function(t, b, c, d) {
            return -c *(t /= d)*(t-2) + b;
        },
        easeInOut: function(t, b, c, d) {
            if ((t /= d / 2) < 1) return c / 2 * t * t + b;
            return -c / 2 * ((--t) * (t-2) - 1) + b;
        }
    }
}

/** 
 * 
 *      json  样式或属性 如果是数字，需要是number  背景色需要rgb格式   例如 rgb(255, 192, 203)  
 *      fn    回调函数
 *      @param {obj}         element   运动对象，必选
 *      @param {json}        target    属性：目标值，必选    样式或属性 如果是数字，需要是number  背景色需要rgb格式   例如 rgb(255, 192, 203)  
 *      @param {fn}          callback  可选，回调函数，链式动画
 **/
export default function animate(obj,json,fn){
    cancelRequestAnimFrame(obj.timer); 
    let step = () => {
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
            cancelRequestAnimFrame(obj.timer);
            if (fn) {
                fn();
            } 
        } else {
            obj.timer = requestAnimationFrame(step);
        }
    }
    obj.timer = requestAnimationFrame(step);
}
