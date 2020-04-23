---
layout: post
title: 템플릿 메서드 패턴(Template Method Pattern)
description: ""
date: 2020-03-02
categories:
 - Design Pattern
tags: [Design Pattern, Template Method Pattern]
---

## 템플릿 메서드 패턴 (Template Method Pattern)


## 정의
- 템플릿 메소드 패턴(template method pattern)은 소프트웨어 공학에서 동작 상의 알고리즘의 프로그램 뼈대를 정의하는 행위 디자인 패턴이다.
- 알고리즘의 구조를 변경하지 않고 알고리즘의 특정 단계들을 다시 정의할 수 있게 해준다


## 특징
- 상위 클래스에 구조를, 하위 클래스에 처리를 구현하는 패턴.
- 공통 사항은 추상클래스에서 구현, 처리는 각각의 서브 클래스에서 구현.
- 코드 중복을 줄이고, 리펙토리에 유용, 확장에 용의.


## 다이어그램

<img src="{{ site.url }}/assets/image/2020-03-02-template-method-pattern/diagram.png" class="col-12">


## 템플릿 메서드 패턴 사용전

```text
와플가게에서 와플을 2가지 종류를 판매하고 있다.
사과잼 와플, 딸기잼 와플을 판매하고 있다고 생각을 하면
와플을 만드는 단계인 2가지 빵을 굽는 단계, 잼을 바르는 단계는
밑에 보이는 다이어 그램 및 코드처럼 이루어져 있을것이다.
```

> Code

```javascript
public Class AppleWaffle {
    public void bakeWaffle() {
        System.out.println("와플을 구워요");
    }

    public void spreadJam() {
        System.out.println("사과잼을 발라요");
    }
}

public Class StrawBerryWaffle {
    public void bakeWaffle() {
        System.out.println("와플을 구워요");
    }

    public void spreadJam() {
        System.out.println("딸기잼을 발라요");
    }
}
```

<img src="{{ site.url }}/assets/image/2020-03-02-template-method-pattern/diagram1.png" class="col-12">


## 패턴 사용전 문제점

```text
만약 이 와플 가게 에서 바닐라 시나몬 와플을 만든다고 했을때
클래스 가 늘어나는것은 어쩔수 없으나 중복되는 와플을 구워요에 해당하는 메서드 bakeWaffle()을 계속 생성을 한다.
그러면 이 문제를 템플릿 메서드 패턴을 적용하여 유지보수성을 늘려보자.
```


## 템플릿 메서드 패턴을 사용해 보자

- 1) 공통적인 부분을 모아 추상클래스를 만들자

> Code

```javascript
public abstract Waffle {
    public void bakeWaffle() {}
    public void spreadJam() {}
}
```

- 2) 알고리즘의 세부 항목에서 차이가 있는 곳은 추상 메소드로 정의한다.

> Code

```javascript
public abstract Waffle {
    public void bakeWaffle() {}
    abstract void spreadJam();
}
```

- 3) 하위 클래스에서 오버라이딩 되지 않아야 할 메서드는 final을 선언한다.

> Code

```javascript
public abstract Waffle {
    final void bakeWaffle() {
        System.out.println("와플을 구워요");
    }

    abstract void spreadJam();
}
```

- 4) 서브클래스 구현시 융통성을 발휘하기 위해 Hook 메서드를 구현한다.

> Code

```javascript
public abstract Waffle {
    final void bakeWaffle() {
        System.out.println("와플을 구워요");
    }

    abstract void spreadJam();

    // 후크 메서드
    public void addMaterial();
}
```

<img src="{{ site.url }}/assets/image/2020-03-02-template-method-pattern/diagram3.png" class="col-12">

## 후크 메서드
- abstract 키워드를 붙이면 상속 받은 클래스는 반드시 해당 메소드를 구현해야 하지만 <br>
abstract 키워드를 붙이지 않고 훅 메소드로 만들면 반드시 구현할 필요가 없습니다. <br>
상속 받은 클래스에서는 선택적으로 오버라이드할 수 있다는 얘기가 됩니다.


## Reference

- [템플릿 메소드 패턴 위키](https://ko.wikipedia.org/wiki/%ED%85%9C%ED%94%8C%EB%A6%BF_%EB%A9%94%EC%86%8C%EB%93%9C_%ED%8C%A8%ED%84%B4)
- [https://mjdeeplearning.tistory.com/11](https://mjdeeplearning.tistory.com/11)