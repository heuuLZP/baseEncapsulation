# baseEncapsulation
js基础封装库

## 示例

```
 animate(elem,{width: 400,backgroundColor:'rgb(255, 192, 203)',opacity: 1,zIndex: 2},function (){
        console.log('动画完成');
    })
```

设置滚动高度scrollTop

```
 animate(document.documentElement || document.body,{scrollTop: 400},function (){
        console.log('动画完成');
    })
```

注意事项：此时要注意是否有定位，body应该有自己的高度。


## 参考

[css进阶 原生js getComputedStyle等方法解析](http://web.jobbole.com/85324/)
