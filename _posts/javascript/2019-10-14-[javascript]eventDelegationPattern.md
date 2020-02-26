---
layout: post
title: "이벤트 델리게이션 패턴(event Delegation Pattern)"
description:
headline:
modified: 2019-10-14
category: javascript
tags: [javascript, Design Pattern]
imagefeature: ""
mathjax:
chart:
comments: true
featured: true
---
## 이벤트 델리게이션 패턴 (Event Delegation Pattern)

### 정의

- 다수의 DOM 엘리먼트에 이벤트를 거는것이 아니라 대표 DOM 에 이벤트를 걸어서 처리하는 패턴

### 작동원리

- HTML 에서 이벤트 버블링을 통해 이벤트를 상위 DOM 에 전달하는것에서 위임함

### 이벤트 전달과 DOM 이벤트 처리
- [이벤트 전달과 DOM 이벤트 처리]({{ site.url }}/javascript/javascript-eventDelegation)

### 이벤트 델리게이션 패턴을 사용하는 예

1. 다수의 DOM에 한꺼번에 이벤트리스너를 할당해야 할 때
2. 동적인 DOM에 이벤트리스너를 그때그때 할당해야 할 때

***

## 이벤트 델리게이션 패턴을 만들어보자

### 이벤트 델리게이션 적용전

- 엑셀을 만든다고 가정하고 cell을 2064개 생성후 각각에 cell 에 이벤트를 설정해보자
- 그리고 생성된 페이지의 메모리의 Event 리스너 메모리 사이즈를 확인해보자
- [소스코드]({{ site.url }}/html/javascript/eventDelegationPattern/notDelegation.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<style>
    body {margin:0px;}
    #wrapper {height: 100vh;width: 100vw;padding: 30px;box-sizing: border-box;}
    #wrapper div {border: 1px solid black;width: 30px;height: 30px;float: left;}
</style>
<body>
    <div id="wrapper">
        <div id='cell-1'><span>1</span></div>
        <div id='cell-2'><span>2</span></div>
            ...
        <div id='cell-2064'><span>2064</span></div>
    </div>
<script>
for(var i = 1; i < 2065; i++) {
    var cell = document.getElementById("cell-" + i)
    cell.onmouseover = function () {
        this.style.backgroundColor = "#DDDDDD"
    }
    cell.onmouseout = function () {
        this.style.backgroundColor = "#FFFFFF"
    }
    cell.onclick = function () {
        this.style.backgroundColor = "red"
    }
}
</script>
</body>
</html>
```

- 결과 화면<br>
<img src="{{ site.url }}/images/javascript/eventDelegationPattern/notDelegation2.png" width="900"><br><br>

### 이벤트 델리게이션 적용후

- cell에 각각 설정된 이벤트를 지우고 wrapper DIV에 이벤트를 설정해보자 이것이 이벤트 델리게이션 패턴이다.
- 생성된 페이지의 메모리의 Event 리스터 메모리 사이즈를 확인해보자
- [소스코드]({{ site.url }}/html/javascript/eventDelegationPattern/delegation.html)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Document</title>
</head>
<style>
    body {margin:0px;}
    #wrapper {height: 100vh;width: 100vw;padding: 30px;box-sizing: border-box;}
    #wrapper div {border: 1px solid black;width: 30px;height: 30px;float: left;}
</style>
<body>
    <div id="wrapper">
        <div id='cell-1'><span>1</span></div>
        <div id='cell-2'><span>2</span></div>
        ...
        <div id='cell-2064'><span>2064</span></div>
    </div>
<script>
    var wrapper = document.getElementById("wrapper")

    wrapper.addEventListener("mouseover", function (event) {
        var target = event.target || event.srcElement

        if(target.id && target.id.indexOf("cell") > -1) {
            target.style.backgroundColor = "#DDDDDD"
        }
    })

    wrapper.addEventListener("mouseout", function (event) {
        var target = event.target || event.srcElement

        if(target.id && target.id.indexOf("cell") > -1) {
            target.style.backgroundColor = "#FFFFFF"
        }
    })

    wrapper.addEventListener("click", function (event) {
        var target = event.target || event.srcElement

        if(target.id && target.id.indexOf("cell") > -1) {
            target.style.backgroundColor = "red"
        }
    })
</script>
</body>
</html>
```

- 결과 화면<br>
<img src="{{ site.url }}/images/javascript/eventDelegationPattern/delegation2.png" width="900"><br><br>

### 참고

- [속 깊은 JavaScript (저자: 양성익, 출판사: 루비페이퍼)](http://book.naver.com/bookdb/book_detail.nhn?bid=11282182)