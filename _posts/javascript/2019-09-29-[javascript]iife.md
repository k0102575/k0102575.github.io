---
layout: post
title: "즉시 실행 함수(IIFE)"
description:
headline:
modified: 2019-09-29
category: javascript
tags: [javascript]
imagefeature: ""
mathjax:
chart:
comments: true
featured: true
---

### 즉시 실행함수?

- 즉시 실행 함수 표현(IIFE, Immediately Invoked Function Expression)은 정의되자마자 즉시 실행되는 Javascript Function 를 말한다.
- Self-Executing Anonymous Function로 알려진 디자인 패턴이다.

### example

```javascript
(function () {
    statements
})();
```

### 즉시 실행 함수의 구성
- 첫번째 부분 - 익명 함수를 감싸는 괄호
- 두번째 부분 - 즉시 실행 함수를 생성하는 괄호
- 이를 통해 자바스크립트 엔진은 함수를 즉시 해석해서 실행한다.

### 장점
- 전역 스코프에 불필요한 변수를 추가 해서 오염시키는것을 방지한다.
- IIFE 내부 안으로 다른 변수들이 접근하는것을 막을수 있다.

### 즉시 실행함수를 만들어 보자

```javascript
(function () {
    var aName = "Barry";
})();

// IIFE 내부에서 정의된 변수는 외부 범위에서 접근이 불가능하다.
aName // throws "Uncaught ReferenceError: aName is not defined"
```

### 즉시 실행 함수의 변수 할당

```javascript
var result = (function () {
    var name = "Barry"; 
    return name; 
})(); 

// 즉시 결과를 생성한다.
result; // "Barry"
```

### 참고 URL
- [https://developer.mozilla.org/ko/docs/Glossary/IIFE](https://developer.mozilla.org/ko/docs/Glossary/IIFE)
- [https://ssben.tistory.com/18](https://ssben.tistory.com/18)
- [https://webclub.tistory.com/78?category=501048](https://webclub.tistory.com/78?category=501048)
