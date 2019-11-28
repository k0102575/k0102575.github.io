---
layout: post
title: "Name Space"
description:
headline:
modified: 2019-09-29
category: javascript
tags: [javascript]
imagefeature:
mathjax:
chart:
comments: true
featured: true
---

### 모듈 패턴을 구성 하는 4가지

1. **네임스페이스 패턴**
2. 즉시 실행 함수
3. 비공개 멤버와 특권멤버
4. 의존 관계 선언

### 네임 스페이스 패턴
- 네임 스페이스 란?
  * 애플리케이션이나 라이브러리를 위해 전역 스코프에 수많은 함수, 객체, 변수들로 어지럽히지 않도록 하기 위해 전역 객체를 하나 만들고 모든 기능을 이 객체에 추가하는 패턴<br><br>

- example - YAHOO && Google
    * YAHOO.util.Dom, YAHOO.util.Event, google.maps.LatLng 등등<br><br>

- 장점
    * 코드 내의 이름 충돌 뿐 아니라 이 코드와 같은 페이지에 존재하는 자바스크립트 라이브러리나 위젯 등 서드 파티 코드와의 이름 충돌도 방지해 줄 수 있습니다.<br><br>

- 단점
    * 모든 변수와 함수에 접두어를 붙여야 하기 때문에 전체적으로 코드량이 약간 더 많아지고 따라서 다운로드해야 하는 파일 크기도 늘어난다.
    * 전역 인스턴스가 단 하나뿐이기 때문에 코드의 어느 한 부분이 수정되어도 전역 인스턴스를 수정하게 된다. 즉 나머지 기능들도 갱신된 상태를 물려 받는다.<br><br>

- **네임스페이스 패턴 사용전**<br>

```javascript
// 전역 변수 5개

// 함수 2개
function Parent() {} 
function Child() {} 

// 변수 1개 
var some_var = 1; 

// 객체 2개 
var module1 = {}; 
module.data = { 
    a : 1, 
    b : 2 
}; 
var module2 = {};
```

- **네임스페이스 패턴 사용후**<br>

```javascript
// 전역 변수 1개

// 전역 객체
var MYAPP = {};

// 함수 2개 
MYAPP.Parent = function() {}; 
MYAPP.Child = function() {};

// 변수 1개
MYAPP.some_var = 1; 

// 객체 컨테이너 
MYAPP.modules = {}; 

// 객체들을 컨테이너 안에 추가한다. 

MYAPP.modules.module1 = {}; 
MYAPP.modules.module1.data = { a : 1, b : 2 }; 
MYAPP.modules.module2 = {};
```

### 범용 네임스페이스

- 정의
    * 프로그램의 복잡도가 증가하고 코드의 각 부분들이 별개의 파일로 분리되어 선택적으로 포함하게 되면,<br>
    어떤 코드가 특정 네임스페이스나 그 내부의 프로퍼티를 처음으로 정의한다고 가정하기가 위험합니다.<br>
    네임스페이스에 추가하려는 프로퍼티가 이미 존재할 수도 있고 따라서 내용을 덮어쓰게 될 지도 모릅니다.<br>
    그러므로 네임스페이스를 생성하거나 프로퍼티를 추가하기 전에 먼저 이미 존재하는지 여부를 확인하는 것이 최선입니다.<br><br>

- **범용 네임스페이스 사용하기**<br>

```javascript
// 범용 네임 스페이스 사용전
var MYAPP = {}; 

// 범용 네임 스페이스 사용후
if(typeof MYAPP === 'undefined') { 
    var MYAPP = {}; 
} 

// 또는 더 짧게 쓸 수 있다. 
var MYAPP = MYAPP || {}
```

### 네임스페이스 정의시 추가 정보
- 네임 스페이스 객체의 이름은 애플리 케이션 이름이나 회사 이름, 라이브러리 이름등을 정의한다.<br><br>
- 흔히 코드를 읽는 사람 눈에 띄도록 전역 객체 이름은 모두 대문자로 쓰는 명명 규칙을 사용하기도 한다.<br>
    (하지만, 이 규칙은 상수를 사용할때도 사용된다는 점에 주의하자! 필수가 아니다!)<br><br>
- namespace는 자바스크립트 에서 지원해 주지 않는다.<br>
    단, 일반적인 사용을 금지한 예약어에 들어가 있다.<br>
    그러므로 프로퍼티 명으로 사용을 하지말자!<br><br>
- 네임 스페이스 만을 위한 라이브러리도 존재한다!

### 참고 URL
- [https://developer.mozilla.org/ko/docs/Glossary/IIFE](https://developer.mozilla.org/ko/docs/Glossary/IIFE)
- [https://ssben.tistory.com/18](https://ssben.tistory.com/18)
- [https://webclub.tistory.com/78?category=501048](https://webclub.tistory.com/78?category=501048)
