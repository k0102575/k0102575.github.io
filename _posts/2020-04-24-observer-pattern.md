---
layout: post
title: 옵저버 패턴(Template Method Pattern)
description: ""
date: 2020-04-24
categories:
 - Design Pattern
tags: [Design Pattern, Observer Pattern]
---

## 옵저버 패턴 (Observer Pattern)


## 정의
- 뭔가 중요한 일(객체의 상태 변화)이 발생했을 때 객체들한테 새소식을 알려주는 패턴

> Diagram Image

<img src="{{ site.url }}/assets/image/2020-04-24-observer-pattern/image2.png" class="col-12">

> image

<img src="{{ site.url }}/assets/image/2020-04-24-observer-pattern/image1.png" class="col-12">


## 간단한 예

```text
내가 쇼핑몰에 할인 이벤트 메일을 구독 신청을 하게 되면 할인 이벤트 가 시작할때 마다 메일을 받을수있다.
내가 할인 이벤트에 관한 구독 해지 신청을 하기 전까지는 계속해서 메일을 받을수있다.
내가 구독 해지 신청을 하면 할인 이벤트가 시작을 해도 메일을 받지 못한다.

쇼핑몰(Subject) + 구독자(Observer) = 옵저버 패턴
```


## 특징

- Subject 객체와 Observer 객체의 관계는 1 대 다 관계로 정의된다.
- Subject 객체와 Observer 객체는 느슨한 결합을 가지고 있다.
- Subject 객체에 변화가 생기면 객체를 관찰하는 모든 Observer 객체에 연락을 해야한다.
- Subject 객체는 관찰 하는 Observer들의 정보를 가지고 있어야한다.
- Subject 객체는 관찰 하는 Observer들의 정보를 추가, 삭제가 가능해야한다.


## 1 대 다 관계

- 옵저버 패턴은 1 대 다 의존성을 정의 한다.
- 옵저버 패턴에서 상태를 저장하고 지배 하는것은 Subject 객체이다.<br>
    따라서 상태가 들어있는 객체는 하나만 있을 수있습니다.
- 옵저버가 상태를 사용하긴 하지만 반드시 상태를 가지고 있을 필요는 없다.
- 1개의 Subject 객체 여러개의 Observer 객체로 연관되기 때문에 1 대 다 관계가 성립됩니다.


## 느슨한 결합

- 디자인 패턴에서 말하는 느슨한 결합에 관하여 옵저버 패턴을 통하여 정의해보자
- 정의: 두 객체가 상호작용을 하긴 하지만 서로에 대해서 잘 모른다는것을 의미한다.


```text
1. Subject 객체가 Observer 객체에 대해서 아는것은 Observer 객체가 특정 인터페이스로 구현한다는것 뿐이다.
2. Observer 객체는 언제든지 새로 추가할수 있다.
3. 새로운 형식의 Observer 객체를 추가 하려고 할 때도 주제를 전혀 변경할 필요가 없습니다.
4. Subject 객체와 Observer 객체는 서로 독립적으로 재사용할 수 있습니다.
5. Subject 객체나 Observer 객체가 바뀌더라도 서로한테 영향을 미치지는 않습니다.
```

- 느슨하게 결합하는 디자인 패턴을 사용하면 추후에 변경사항이 생겨도 무난히 처리할수있다.


## 옵저버 패턴을 구현해 보자

```java

public interface Subject {
    void registerObserver(Observer observer);
    void unRegisterObserver(Observer observer);
    void notifyObservers();
} 

public interface Observer {
    void update(String eventDate, String eventName);
}

public class ShoppingMall implements Subject{
    private List<Observer> observers;
    private String eventDate;
    private String eventName;

    {
        this.observers = new ArrayList<>();
    }

    public void eventChanged(){ this.notifyObservers(); }
    public void setEventChanged(String date, String name){	//값이 세팅된다고 가정.
        this.eventDate = date;
        this.eventName = name;
        this.eventChanged();
    }

    @Override
    public void notifyObservers() {
        for (Observer observer : observers) {
            observer.update(this.eventDate, this.eventName);
        }
    }

    @Override
    public void registerObserver(Observer observer) {
        this.observers.add(observer);
    }

    @Override
    public void unRegisterObserver(Observer observer) {
        if(observers.contains(observer)) observers.remove(observer);
    }
}


public class ClientA implements Observer{
    private String eventDate;
    private String eventName;

    public ClientA(Subject shoppingMall) {
        this.shoppingMall = shoppingMall;
        this.shoppingMall.registerobserver(this);	//옵저버 등록
    }

    @Override
    public void update(String date, String name) {
        this.eventDate = date;
        this.eventName = name;
        this.action();
    }

    @Override
    public void action() {
        System.out.println("A 고객은 이벤트를 보고 물건을 샀다");
    }
}

public class ClientB implements Observer{
    private String eventDate;
    private String eventName;

    public ClientB(Subject shoppingMall) {
        this.shoppingMall = shoppingMall;
        this.shoppingMall.registerobserver(this);	//옵저버 등록
    }

    @Override
    public void update(String date, String name) {
        this.eventDate = date;
        this.eventName = name;
        this.action();
    }

    @Override
    public void action() {
        System.out.println("B 고객은 이벤트를 보고 친구에게 추천했다");
    }
}

public class ObserverPattern {
	public static void main(String[] args) {
		ShoppingMall shoppingMall = new ShoppingMall();
		ClientA clientA = new ClientA(shoppingMall);
		ClientB clientB = new ClientB(shoppingMall);

        // 이벤트가 생성되었다고 가정하고 데이터 Set
		shoppingMall.setEventChanged("2020-04-25", "테스트 할인 이벤트");
	}
}
```


## Notify를 누가 호출해야할까?

- Notify() 호출을 누가 시켜야 할지 헷갈릴 수 있다.
- GoF는 다음 두 가지 방법 중에서 선택하라고 한다.
    * Subject 에서 변경이 발생할 때, 변경을 저장하는 메소드가 Notify()를 호출하는 방법.
    * 사용자(main 등)가 적절한 시기에 Notify()를 호출하는 방법.


## Reference

- [옵저버 패턴 위키](https://ko.wikipedia.org/wiki/%EC%98%B5%EC%84%9C%EB%B2%84_%ED%8C%A8%ED%84%B4)
- [헤드 퍼스트 디자인 패턴 도서](https://www.google.com/search?q=%ED%97%A4%EB%93%9C+%ED%8D%BC%EC%8A%A4%ED%8A%B8+%EB%94%94%EC%9E%90%EC%9D%B8+%ED%8C%A8%ED%84%B4&oq=%ED%97%A4%EB%93%9C+%ED%8D%BC%EC%8A%A4%ED%8A%B8+%EB%94%94%EC%9E%90%EC%9D%B8+%ED%8C%A8%ED%84%B4&aqs=chrome..69i57j0l5j69i60l2.3516j0j7&sourceid=chrome&ie=UTF-8)
- [옵저버 패턴 이미지](https://hackernoon.com/observer-vs-pub-sub-pattern-50d3b27f838c)