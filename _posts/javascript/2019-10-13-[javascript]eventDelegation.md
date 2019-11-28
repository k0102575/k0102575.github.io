---
layout: post
title: "이벤트 전달과 DOM 이벤트 처리"
description:
headline:
modified: 2019-10-13
category: javascript
tags: [javascript]
imagefeature: ""
mathjax:
chart:
comments: true
featured: true
---

## 이벤트 전달과 DOM 이벤트 처리
<br><br>

### 정의

- 특정 DOM 에서 이벤트가 발생하면 해당 DOM의 dispatchEvent() 라는 함수를 통해서 이벤트를 전달한다.
- 이벤트 전달은 propagation path라는 전파 경로에 따라서 수행된다.

<br><br>

### 이벤트 전달에 관한 이미지
<img src="{{ site.url }}/images/javascript/eventDelegation/event1.png" width="450"><br>

### 이벤트 전달 순서
- 1) 이벤트 캡처단계
    * 이벤트 객체가 window 객체로부터 대상의 부모까지 순서대로 전달되는 단계<br><br>
- 2) 이벤트 대상단계
    * 이벤트 객체가 이벤트 대상에 도달하는 단계<br><br>
- 3) 이벤트 버블단계
    * 이벤트 객체가 대상의 부모부터 window 객체까지 역순으로 전파된다

<br><br>

### 캡처링 & 버블링
- 캡처링 : 특정 화면 요소에서 이벤트가 발생했을 때 해당 이벤트가 최 상위 요소에서 이벤트 발생 요소 까지 전달되어 가는 특성을 의미합니다.<br>
<img src="{{ site.url }}/images/javascript/eventDelegation/capturing1.png" width="450"><br>
- 버블링 : 특정 화면 요소에서 이벤트가 발생했을 때 해당 이벤트가 더 상위의 화면 요소들로 전달되어 가는 특성을 의미합니다.<br>
<img src="{{ site.url }}/images/javascript/eventDelegation/bubbling1.png" width="450"><br>

### 이벤트 리스너에서 이벤트 캡처링 버블링 설정 방법
- MDN 이벤트 리스터 설정 법 <img src="{{ site.url }}/images/javascript/eventDelegation/eventListener.png" width="900">
- useCapture 에 default 는 false 이다. 이벤트를 설정할때 true 로 설정하면 버블링이 아닌 캡처링을 설정할수있다.
- example.addEventListener('click', function () {Todo}, true) - 이벤트 캡처링
- example.addEventListener('click', function () {Todo}, false) - 이벤트 버블링

<br><br>

### 이벤트 캡처링을 만들어보자

- top, middle, low Div 에 각각 클릭이벤트를 걸고서 low Div만 클릭을해보자
- 버블링을 테스트 하기 위해서는 이벤트 리스너에 true로 설정한다.
- [소스코드](https://github.com/k0102575/studyPrepare/blob/master/%234_EventDelegationPattern/capturing.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Capturing</title>
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
    console.log("top")
}, true)
document.getElementById("middle").addEventListener("click", function () {
    console.log("middle")
}, true)
document.getElementById("low").addEventListener("click", function () {
    console.log("low")
}, true)
</script>
</body>
</html>
```

- 결과 화면<br>
<img src="{{ site.url }}/images/javascript/eventDelegation/capturing2.png" width="450"><br>
- low Div만 클릭했지만 이벤트 캡처링에 따라 top -> middle -> low 순으로 이벤트가 실행되는거를 알수있다.

<br><br>

### 이벤트 버블링을 만들어보자

- top, middle, low Div 에 각각 클릭이벤트를 걸고서 low Div만 클릭을해보자
- 버블링을 테스트 하기 위해서는 이벤트 리스너에 false로 설정한다.
- [소스코드](https://github.com/k0102575/studyPrepare/blob/master/%234_EventDelegationPattern/bubbling.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Bubbling</title>
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
    console.log("top")
}, false)
document.getElementById("middle").addEventListener("click", function () {
    console.log("middle")
}, false)
document.getElementById("low").addEventListener("click", function () {
    console.log("low")
}, false)
</script>
</body>
</html>
```

- 결과 화면<br>
<img src="{{ site.url }}/images/javascript/eventDelegation/bubbling2.png" width="450"><br>
- low Div만 클릭했지만 이벤트 버블링에 따라 low -> middle -> top 순으로 이벤트가 실행되는거를 알수있다.

<br><br>

### 이벤트 전파 순서를 확인해 보자

- 이벤트 캡처링 과 버블링이 같이 리스너 되어있을때 캡처링이 먼저 인 순서 인가를 확인해 보았다.
- top 과 middle 로 된 DIV 에 이벤트를 설정하고 low DIV 를 클릭해 보았다.
- [소스코드](https://github.com/k0102575/studyPrepare/blob/master/%234_EventDelegationPattern/delegate.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Delegate</title>
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
    console.log("Bubbling ==> top")
}, false)
document.getElementById("middle").addEventListener("click", function () {
    console.log("Bubbling ==> middle")
}, false)
document.getElementById("top").addEventListener("click", function () {
    console.log("Capturing ==> top")
}, true)
document.getElementById("middle").addEventListener("click", function () {
    console.log("Capturing ==> middle")
}, true)
</script>
</body>
</html>
```

- 결과 화면<br>
<img src="{{ site.url }}/images/javascript/eventDelegation/delegate2.png" width="450"><br>
- 캡처링 이벤트가 먼저 실행이 되고 버블링 이벤트가 실행되는것을 확인할수 있다.

<br><br>

### 이벤트 전파중 엘리먼트의 수정이 일어나면 어떻게 될까

- 이벤트를 전파중에 엘리먼트가 삭제 되거나 변경이 되면 이벤트 전파는 어떻게 될까 테스트해 보았다.
- 우선 이벤트 캡처 단계중 middle 로 된 div 를 삭제 하는 코드를 넣고 다시 low DIV 를 클릭해보았다.

- [소스코드](https://github.com/k0102575/studyPrepare/blob/master/%234_EventDelegationPattern/delete.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Delete</title>
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
    console.log("Bubbling ==> top")
}, false)
document.getElementById("middle").addEventListener("click", function () {
    console.log("Bubbling ==> middle")
}, false)
document.getElementById("low").addEventListener("click", function () {
    console.log("low")
}, true)
document.getElementById("top").addEventListener("click", function () {
    console.log("Capturing ==> top")
}, true)
document.getElementById("middle").addEventListener("click", function () {
    // middle 캡처링 이벤트 도중 id 로 middle인 div 를 제거 해 본다.
    document.getElementById("middle").remove()
    console.log("Capturing ==> middle")
}, true)
</script>
</body>
</html>
```

- 결과 화면<br>
<img src="{{ site.url }}/images/javascript/eventDelegation/delete2.png" width="450"><br>
- middle Div 는 제거 되지만 설정된 이벤트는 실행되는것을 확인할수 있다.

<br><br>

### 참고 및 출처

- [캡처링 & 버블링 이미지](www.w3.org)
- [https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener](https://developer.mozilla.org/ko/docs/Web/API/EventTarget/addEventListener)
- [https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/](https://joshua1988.github.io/web-development/javascript/event-propagation-delegation/)