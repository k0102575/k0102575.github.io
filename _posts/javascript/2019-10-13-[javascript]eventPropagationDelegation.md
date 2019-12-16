---
layout: post
title: "이벤트 전파 중단"
description:
headline:
modified: 2019-10-13
category: javascript
tags: [javascript]
imagefeature: 
mathjax:
chart:
comments: true
featured: true
---

## 이벤트 전파를 중단해보자
<br>

### 이벤트 전파 중단
- javscript 에서 이벤트의 전파를 막는 방법을 알아보자
<br>

### 이벤트 중단하는 4가지 방법
```javascript
event.preventDefault()
// 현재 이벤트의 기본 동작을 중단한다

event.stopPropagation()
// 현재 이벤트가 다음 단계로 전파되지 않도록 중단한다

event.stopImmediatePropagation()
//현재 이벤트가 다음단계가 아니라 현재 레벨에 걸린 다른 이벤트도 동작하지 않도록 중단한다

return false
// jQuery를 사용할 때는 위의 두개 모두를 실행할것과 같고,
// jQuery를 사용하지 않을 때는 preventDefault() 와 같다.
```

### event.preventDefault()

- 먼저 기존의 코드의 span 을 a 태그로 변경하고 a 태그의 href 에 javascript 함수 이벤트를 설정해 놓는다.
- preventDefault() 를 설정하지 않는 태그와 설정 한 태그의 차례로 눌러 결과를 확인해 본다.
- [소스코드]({{ site.url }}/html/javascript/eventPropagationDelegation/preventDefault.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>preventDefault</title>
</head>
<body>
<style>
    div {position: relative;display: flex;justify-content: center;align-items: center;}
    span, a {position: absolute;top: 0;}
    #top {width: 500px;height: 500px;background-color: lightcoral;}
    #middle {width: 250px;height: 250px;background-color: lightsalmon;}
    #low {width: 125px;height: 125px;background-color: lightgoldenrodyellow;}
</style>
<div id="top">
    <span>top</span>
    <div id="middle">
        <a href="javascript:elementEvent()" id="dontSetPrevent">middle</span>
        <div id="low">
            <a href="javascript:elementEvent()" id="setPrevent">low</a>
        </div>
    </div>
</div>
<script>
function elementEvent() {
    console.log("a 태그 기본 이벤트 실행")
}
document.getElementById("dontSetPrevent").addEventListener("click", function () {
    console.log("prevent Default 설정 하지 않은 A 태그")
})
document.getElementById("setPrevent").addEventListener("click", function (event) {
    event.preventDefault()
    console.log("prevent Default 설정 한 A 태그")
})
</script>
</body>
</html>
```

- 결과 화면<br>
<img src="{{ site.url }}/images/javascript/eventPropagationDelegation/preventDefault2.png" width="450"><br><br>
- preventDefault 를 설정한 이벤트와 설정하지 않은 이벤트의 차이를 보면서 preventDefault 를 확인할수 있다.

### event.stopPropagation()

#### 1) 이벤트 버블링 에서의 stopPropagation를 확인해 보자 
- event 전파 단계의 코드 마지막 low 에 stopPropation()을 설정하고  low DIV를 클릭해 다음단계인 버블링이 전파 되는지 확인해보자.
- [소스코드]({{ site.url }}/html/javascript/eventPropagationDelegation/stopPropagation.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>stopPropagation</title>
</head>
<body>
<style>
    div {position: relative;display: flex;justify-content: center;align-items: center;}
    span {position: absolute;top: 0;}
    #top {width: 500px;height: 500px;background-color: lightcoral;}
    #middle {width: 250px;height: 250px;background-color: lightsalmon;}
    #low {width: 125px;height: 125px;background-color: lightgoldenrodyellow;}
</style>
<div id="top">
    <span>top</span>
    <div id="middle">
        <span>middle</span>
        <div id="low">
            <span>low</span>
        </div>
    </div>
</div>
<script>
document.getElementById("top").addEventListener("click", function () {
    console.log("Capturing ==> top")
}, true)
document.getElementById("middle").addEventListener("click", function () {
    console.log("Capturing ==> middle")
}, true)
document.getElementById("low").addEventListener("click", function (event) {
    event.stopPropagation();
    console.log("low")
}, true)
document.getElementById("top").addEventListener("click", function () {
    console.log("Bubbling ==> top")
}, false)
document.getElementById("middle").addEventListener("click", function () {
    console.log("Bubbling ==> middle")
}, false)
</script>
</body>
</html>
```

- 결과 화면<br>
<img src="{{ site.url }}/images/javascript/eventPropagationDelegation/stopPropagation2.png" width="450"><br><br>

#### 2) 버블링의 전파 중지를 알아보았으니 캡처링도 전파가 중단 되는것을 알아보자

- 기존의 event 전파 단계의 코드 최상위 top 에 stopPropagation()을 설정하고 low DIV를 클릭해 다음단계인 캡처링이 전파되는지 확인해보자
- [소스코드]({{ site.url }}/html/javascript/eventPropagationDelegation/stopPropagation2.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>stopPropagation</title>
</head>
<body>
<style>
    div {position: relative;display: flex;justify-content: center;align-items: center;}
    span {position: absolute;top: 0;}
    #top {width: 500px;height: 500px;background-color: lightcoral;}
    #middle {width: 250px;height: 250px;background-color: lightsalmon;}
    #low {width: 125px;height: 125px;background-color: lightgoldenrodyellow;}
</style>
<div id="top">
    <span>top</span>
    <div id="middle">
        <span>middle</span>
        <div id="low">
            <span>low</span>
        </div>
    </div>
</div>
<script>
document.getElementById("top").addEventListener("click", function (event) {
    event.stopPropagation();
    console.log("Capturing ==> top")
}, true)
document.getElementById("middle").addEventListener("click", function () {
    console.log("Capturing ==> middle")
}, true)
document.getElementById("low").addEventListener("click", function () {
    console.log("low")
}, true)
document.getElementById("top").addEventListener("click", function () {
    console.log("Bubbling ==> top")
}, false)
document.getElementById("middle").addEventListener("click", function () {
    console.log("Bubbling ==> middle")
}, false)
</script>
</body>
</html>
```

- 결과 화면<br>
<img src="{{ site.url }}/images/javascript/eventPropagationDelegation/stopPropagation4.png" width="450"><br><br>

### event.stopImmediatePropagation()

- 우선 기존의 event 전파 단계에서 캡처링 단계를 지우고 low를 2개를 만든다.
- 그리고 각각의 low에 2개씩의 이벤트를 설정하고 low1은 stopPropagation을 low2는 stopImmediatepropagation을 설정해보자
- low1을 클릭하고 low2를 클릭했을때 차이점을 확인해 보자.
- [소스코드]({{ site.url }}/html/javascript/eventPropagationDelegation/stopImmediatePropagation.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>stopImmediatePropagation</title>
</head>
<body>
<style>
    div {position: relative;display: flex;justify-content: center;align-items: center;}
    span {position: absolute;top: 0;}
    #top {width: 500px;height: 500px;background-color: lightcoral;}
    #middle {width: 250px;height: 250px;background-color: lightsalmon;}
    #low1 {width: 125px;height: 125px;background-color: lightgoldenrodyellow;}
    #low2 {width: 125px;height: 125px;background-color: lightskyblue;}
</style>
<div id="top">
    <span>top</span>
    <div id="middle">
        <span>middle</span>
        <div id="low1">
            <span>low1</span>
        </div>
        <div id="low2">
            <span>low2</span>
        </div>
    </div>
</div>
<script>
document.getElementById("top").addEventListener("click", function () {
    console.log("top")
})
document.getElementById("middle").addEventListener("click", function () {
    console.log("middle")
})
document.getElementById("low1").addEventListener("click", function (event) {
    event.stopPropagation();
    console.log("low1-event1")
})
document.getElementById("low1").addEventListener("click", function (event) {
    event.stopPropagation();
    console.log("low1-event2")
})
document.getElementById("low2").addEventListener("click", function (event) {
    event.stopImmediatePropagation();
    console.log("low2-event1")
})
document.getElementById("low2").addEventListener("click", function (event) {
    event.stopImmediatePropagation();
    console.log("low2-event2")
})
</script>
</body>
</html>
```

- 결과 화면<br>
<img src="{{ site.url }}/images/javascript/eventPropagationDelegation/stopPropagation2.png" width="450"><br><br>

### 참고 및 출처
- [https://programmingsummaries.tistory.com/313]https://programmingsummaries.tistory.com/313