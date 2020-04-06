---
layout: post
title: 프록시 패턴(Proxy Pattern)
description: ""
date: 2019-11-16
categories:
 - Design Pattern
tags: [Design Pattern, Proxy Pattern]
---

## 프록시란?

- proxy 를 한글로 번역 하면 대리, 대변인이다. 즉 다른 사람을 대신하여 무엇인가를 하는 것<br>
    * 쉽게 말하면 중개자라는 의미로 사용이 된다.

> 이미지
<img src="{{ site.url }}/assets/image/2019-11-16-proxy-pattern/image.png" class="col-12">
- 에 이미지는 웹 서버 환경에서의 프록시 서버를 나타내는 이미지이다.

- 프록시의 위치
    * 요청을 하는 객체와 응답을 하는 객체 사이에 존재한다.
    * 위 이미지 에서의 요청을 하는 객체 (Client)
    * 위 이미지 에서의 응답을 하는 객체 (Server)


- 요청 하는 객체가 직접적으로 응답 하는 객체에 접근하는 것이 아니라 프록시를 통하여 간접적으로 접근할수 있게 한다.
    * 응답하는 객체의 기능을 요청 하는 객체에 직접 노출 시키지 않으면서 캡슐화, 가상화를 이룰수 잇게 한다.
    * 프록시를 통할때 프록시 의 여러 기능 등을 사용할수 있다. (코드 관리, 사이드 이펙트 방지, 캐시 등등)

## 프록시 패턴을 만들어보며 프록시 패턴의 장점을 알아보자

#### 1. 코드 관리

- 델리게이션 패턴으로 이루 어진 코드에 프록시 패턴을 적용 하여 코드 유지보수 측면에 있어서 어떠한 장점이 있는지 알아보자.


> **프록시 패턴 적용전**
- [소스코드]({{ site.url }}/assets/html/2019-11-16-proxy-pattern/1_notProxy.html)

```javascript
var divControlPanel = document.getElementById("wrapper")

divControlPanel.addEventListener("click",function(e){
    var target = e.target || e.srcElement;

    if(target.id == "copy") {
        console.log("copy Event")
    } else if(target.id == "paste") {
        console.log("paste Event")
    } else if(target.id == "delete") {
        console.log("delete Event")
    } else if(target.id == "insert") {
        console.log("insert Event")
    }

    e.stopPropagation();
},true);
```

- 만약 wrapper 밑에 엘리먼트 항목이 늘어날 경우 그 추가 된 엘리먼트에 대해서 이벤트 를 추가 하거나 기존의 소스 코드를 유지 보수 하기 위해서는
    클릭 이벤트 핸들러에서 모든 것을 처리 하여야 한다.
- 그러면 프록시 패턴을 적용하기 위해 proxyClickEventHandler 클릭 이벤트 변수를 하나 추가 하여 클릭이벤트에서 해당 객체의 프로퍼티를 접근 하게 해보자.


> **프록시 패턴 적용후**
- [소스코드]({{ site.url }}/assets/html/2019-11-16-proxy-pattern/1_proxy.html)

```javascript
var divControlPanel = document.getElementById("wrapper"),
    proxyClickEventHandler = {
        "copy" : function(){
            console.log("copy")
        },
        "paste" : function(){
            console.log("paste")
        },
        "delete" : function(){
            console.log("delete")
        },
        "insert" : function(){
            console.log("insert")
        }
    };

divControlPanel.addEventListener("click",function(e){
    var target = e.target || e.srcElement;
    if(proxyClickEventHandler.hasOwnProperty(target.id)){
        proxyClickEventHandler[target.id].call();
    }
},true);
```

- 프록시 패턴을 적용 한뒤는 클릭 이벤트 핸들러를 따라가는 것이 아니라, 로직이 포함된 프록시 변수만 보면 되기 때문에 소스 코드 관리가 유용해 진다.


#### 2. 사이드 이펙트 방지

> **프록시 패턴 적용전**
- 기본적인 자바 스크립트 에서의 유저 데이터 객체를 만들어보자
- [소스코드]({{ site.url }}/assets/html/2019-11-16-proxy-pattern/2_notProxy.html)

```javascript
function User() {
    this.data = {
        'id1': 'A이름',
        'id2': 'B이름',
        'id3': 'C이름'
    };
}

User.prototype.get = function(id, callback) {
    var self = this;
    setTimeout(function() {
        callback(self.data[id]);
    }, 1000);   
}

var divControlPanel = document.getElementById("wrapper"),
    user = new User()

divControlPanel.addEventListener("click",function(e){
    var target = e.target || e.srcElement;
    user.get(target.id, (name) => console.log(name))
},true);
```

- 위의 코드는 div를 클릭했을때 해당 아이디의 유저 객체의 이름값을 가져 오는 예제 이다.<br>
(정보를 가져오는 시간은 예시로 1초를 설정하였다.)
- 만약 이 코드에 조회수라는 기능을 추가 하게 되었을때 User 클래스의 코드를 고치는 것은 예상치 못한 사이드 이펙트를 발생시킬수 있다.
- 이런 경우에 프록시 패턴을 적용하여 사이드 이펙트를 방지해 보자.


> **프록시 패턴 적용후**
- [소스코드]({{ site.url }}/assets/html/2019-11-16-proxy-pattern/2_proxy.html)

```javascript
function User() {
    this.data = {
        'id1': 'A이름',
        'id2': 'B이름',
        'id3': 'C이름'
    };
}
User.prototype.get = function(id, callback) {
    var self = this;
    setTimeout(function() {
        callback(self.data[id]);
    }, 500);
}
function UserProxy() {
    var user = new User();
    var viewCount = 0;
    return {
        get: function(id, callback) {
            viewCount++;
            user.get(id, callback);
        },
        getViewCount: function() {
            return viewCount;
        }
    };
}

var divControlPanel = document.getElementById("wrapper"),
    userProxy = new UserProxy();

divControlPanel.addEventListener("click",function(e){
    var target = e.target || e.srcElement;
    if(target.id == "count") {
        console.log(userProxy.getViewCount())
    } else {
        userProxy.get(target.id, (name) => console.log(name))
    }
},true);
```

- 구현 방법
    * 1.처음으로 클릭 이벤트 와 유저 클래스사이에서 사용한 프록시 객체인 UserProxy를 구현한다.
    * 2.기존의 User 클래스에서 사용되던 get() 함수는 그대로 구현을 해놓고 추가된 함수인 조회수를 조회하는 함수를 추가한다.
    * 3.클릭이벤트에서 직접적으로 호출되던 User 클래스에서 UserProxy 객체를 접근하게 함으로써 프록시 패턴을 완성한다.
- 기존에 존재하던 User 클래스는 유지 하면서 추가적으로 생성된 UserProxy 함수를 사용하게 됨으로써 기존의 코드의 사이드 이펙트를 방지 할수 있다.


#### 3. 캐시 기능

- 데이터를 받아 온다고 가정한 1초의 시간은 상당히 길다. 또한 이렇게 서버 혹은 API에 관란 잦은 요청은 지향하여야 한다.
- 캐시 기능을 이용하기 위해 프록시 패턴에 추가해 보자
- [소스코드]({{ site.url }}/html/designPattern/proxypattern/3_proxy.html)

```javascript

function User() {
    this.data = {
        'id1': 'A이름',
        'id2': 'B이름',
        'id3': 'C이름'
    };
}
User.prototype.get = function(id, callback) {
    var self = this;
    setTimeout(function() {
        callback(self.data[id]);
    }, 500);
}
function UserProxy() {
    var user = new User();
    var viewCount = 0;
    var cache = {};
    return {
        get: function(id, callback) {
            viewCount++;

            if (cache[id]) {

                // 캐쉬가 되어있는 그냥객체의 정보를 가져오는 과정
                callback(cache[id]);
            } else {

                // 서버에서 받아오는 과정
                user.get(id, function(name) {
                    cache[id] = name;
                    callback(name);
                });
            }
        },
        getViewCount: function() {
            return viewCount;
        }
    };
}

var divControlPanel = document.getElementById("wrapper"),
    userProxy = new UserProxy();

divControlPanel.addEventListener("click",function(e){
    var target = e.target || e.srcElement;
    if(target.id == "count") {
        console.log(userProxy.getViewCount())
    } else {
        userProxy.get(target.id, (name) => console.log(name))
    }
},true);
```

- 구현 방법
    * 1. UserProxy 객체에 내부 변수로 cache 객체를 선언한다.
    * 2. 기존의 UserProxy get 함수에서 분기 처리를 하여 캐시 객체에 프로퍼티를 확인후 있으면 그 값을 바로 리턴하고, 아니면 데이터를 받아오는 기존의 함수를 호출한다.
    * 3. 데이터를 받아오는 기존의 함수에서 응답이 되면 cache 객체에 저장을 하는 로직을 추가 한다.
- 이렇게 캐시 기능을 프록시에 추가 함으로써 2번째 요청 부터는 바로 응답이 되는 프로세스를 만들수 있다.

## 정리
- 위의 3가지 말고도 프록시 객체에 기능을 추가함으로써 좀더 강력한 프록시를 만들수 있다.
- 상황에 맞게 서비스에 맞게 프록시 객체에 기능을 추가 하면서 좀더 좋은 서비스를 개발할수 있는 기회가 되었으면 좋겠다.

## Reference

- [Proxy 이미지](https://www.expressvpn.com/kr/what-is-vpn/proxy-vs-vpn)
- [https://hyunseob.github.io/2016/08/17/javascript-proxy/](https://hyunseob.github.io/2016/08/17/javascript-proxy/)
- [속 깊은 JavaScript (저자: 양성익, 출판사: 루비페이퍼)](http://book.naver.com/bookdb/book_detail.nhn?bid=11282182)
