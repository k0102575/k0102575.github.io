---
layout: post
title: "Module Pattern"
description:
headline:
modified: 2019-09-30
category: javascript
tags: [Design Pattern, javascript]
imagefeature:
mathjax:
chart:
comments: true
featured: true
---

# 모듈 패턴 (Module Pattern)<br><br>

## 정의
- javascript의 코드 관리 기법중 하나로 객체 핸들링을 위한 방법론 중 하나이다.<br><br>
- 로직과 변수 및 함수를 캡슐화 할때 사용하는 패턴이다.<br><br>
- 전역 스코프의 함수 및 변수를 남용 하는걸 방지 하는 패턴이다.

### example
```javascript
// 대표적인 예제인 jQuery

$.get("/api/test").done(function (result) {
    ...
});
```

## 모듈 패턴을 구성 하는 4가지

1. 네임스페이스 패턴
2. 즉시 실행 함수
3. 비공개 멤버와 특권멤버
4. 의존 관계 선언
<br>

#### 1. 네임 스페이스 패턴
- [네임스페이스 패턴]({{ site.url }}/javascript/javascript-nameSpace)

#### 2. 즉시 실행 함수
- [즉시 실행 함수]({{ site.url }}/javascript/javascript-iife)

#### 3. 비공개 멤버와 특권멤버

- 비공개 멤버 : 모듈 패턴안에서만 사용 할수 있는 private 변수 및 함수를 비공개 멤버
- 특권 멤버 : 모듈 패턴 안에서 정의된 후 모듈 에서 공개 하여 모듈 스코프 밖에서 사용할 수있게 하는 멤버
- **밑에 모듈 패턴에서 코드를 보면서 알아 보자**

#### 4. 의존 관계 선언

- 의존 관계 선언 : 함수나 모듈내의 최상단의 의존 관계가 있는 모듈을 내부 스코프에 선언하여 사용하는 패턴
- example

```javascript
var myFunction = function () {
    var dom = window.document,
        his = window.history;
};
```
- 장점
    * 의존관계가 명시적으로 선언 되어 있어 코드를 사용하는 사람이 페이지에 포함 시켜야 하는 파일이 무엇인지 알수있다.
    * 함수의 첫머리에 의존관계가 선언되어 있어 코드 분석이 쉽다.
    * dom 과 같은 지역 변수는 window.document 전역변수 보다 객체 판별을 한번만 하기 때문에 훨씬 빠르다.
    
<br><br>

## 모듈패턴을 만들어 보자<br><br>

#### 가장 기본적인 모듈을 만들어 보자
- code<br>

```javascript
var testModule = { 
    key : 'value', 
    pulicMethod : function () { 
        console.log("Hello Module")
        ...
    } 
}
```

#### IIFE를 이용하여 모듈 패턴의 기본을 구현해보자
- code<br>

```javascript
var sampleModule = (function() {
    console.log("sample Module")
})();

console.log(sampleModule)
```

#### 변수 접근 제한을 해보자
- code<br>

```javascript
var sampleModule = (function () {
    console.log("sample Module")

    // 비공개 멤버
    var privateVar = 0;

    // 특권멤버
    return {
        setVar: function (value) {
            console.log("setVar " + privateVar + " => " + value);
            privateVar = value;
        },
        getVar: function () {
            console.log("getVar return " + privateVar);
            return privateVar;
        }
    }
})();
 
sampleModule.setVar(5);
sampleModule.getVar();
 
console.log("sampleModule => ", sampleModule);
console.log("sampleModule.privateVar => ", sampleModule.privateVar);
console.log("sampleModule.setVar() => ", sampleModule.setVar);
console.log("sampleModule.getVar() => ", sampleModule.getVar);
```

- 결과화면

<img src="{{ site.url }}/images/javascript/modulePattern/example2.png" width="900"><br>

#### 함수 접근 제한을 해보자

- code<br>

```javascript
var sampleModule = (function () {
  console.log("sample Module")

  // 비공개 멤버
  var privateVar = 0;
 
  function changeVar(value) {
    console.log("changeVar " + privateVar + " => " + value);
    privateVar = value;
  }
 
  var setPrivateFunc = function (value) {
    changeVar(value);
  };
 
  var getPrivateFunc = function () {
    console.log("getVar return " + privateVar);
    return privateVar;
  };
 
  // 특권멤버
  return {
    setVar: setPrivateFunc,
    getVar: getPrivateFunc
  }
})();
 
sampleModule.setVar(5);
sampleModule.getVar();
 
console.log("sampleModule => ", sampleModule);
console.log("sampleModule.privateVar => ", sampleModule.privateVar);
console.log(sampleModule.setVar);
```

- 결과화면

<img src="{{ site.url }}/images/javascript/modulePattern/example3.png" width="900"><br>

#### 네임 스페이스 패턴 과 의존관계 패턴을 써보자
- code<br>

```javascript
// 범용 네임 스페이스
var sampleAPP = sampleAPP || {};
 
sampleAPP.sampleModule = (function () {
  
  // 의존 관계 패턴
  var dom = window.document

  console.log("sample Module")
  var privateVar = 0;
 
  function changeVar(value) {
    console.log("changeVar " + privateVar + " => " + value);
    privateVar = value;
  }
 
  var setPrivateFunc = function (value) {
    changeVar(value);
  };
 
  var getPrivateFunc = function () {
    console.log("getVar return " + privateVar);
    return privateVar;
  };
 
  return {
    setVar: setPrivateFunc,
    getVar: getPrivateFunc
  }
})();
 
sampleAPP.sampleModule.setVar(5);
sampleAPP.sampleModule.getVar();
 
console.log("sampleAPP.sampleModule => ", sampleAPP.sampleModule);
console.log("sampleAPP.sampleModule.privateVar => ", sampleAPP.sampleModule.privateVar);
console.log("sampleAPP.sampleModule.setVar => ", sampleAPP.sampleModule.setVar);
```

- 결과화면
<img src="{{ site.url }}/images/javascript/modulePattern/example4.png" width="900"><br>

### 참고 URL
- [https://developer.mozilla.org/ko/docs/Glossary/IIFE](https://developer.mozilla.org/ko/docs/Glossary/IIFE)
- [https://ssben.tistory.com/18](https://ssben.tistory.com/18)
- [https://webclub.tistory.com/78?category=501048](https://webclub.tistory.com/78?category=501048)
