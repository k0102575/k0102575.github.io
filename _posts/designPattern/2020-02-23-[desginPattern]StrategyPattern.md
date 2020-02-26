---
layout: post
title: "전략 패턴(Strategy Pattern)"
description:
headline:
modified: 2019-11-16
category: Design Pattern
tags: [Design Pattern]
imagefeature:
mathjax:
chart:
comments: true
featured: true
---
## 전략 패턴 (Strategy pattern)

<br>

### 정의
- 전략 패턴(strategy pattern) 또는 정책 패턴(policy pattern)은 실행 중에  (동적으로)<br>
알고리즘을 선택할 수 있게 하는 행위 소프트웨어 디자인 패턴이다

<br>

### 패턴 특징
- 알고리즘 인터페이스 정의하고, 각각의 알고리즘 클래스 별로 캡슐화 하여 각각의 알고리즘을 교체 사용 할수있게 한다.<br>
즉, 하나의 결과를 만드는 목적(메서드)는 동일하나, 그 목적을 달성할 수 있는 방법(전략, 알고리즘)이 여러가지 존재할 경우<br>
가장 많이 사용하는 패턴이다.

<br>

### 다이어그램

<img src="{{ site.url }}/images/designPattern/strategyPattern/diagram.jpg" width="900">

<br>

### 전략 패턴 사용전
한 10층 건물에 엘리베이터가 2대 있다고 가정해 보자.<br>
왼쪽 엘리베이터는 홀수층을 이동하고, 오른쪽 엘리베이터는 짝수 층을 이동한다고 설정을 해놓았다.

- 코드 

```javascript
public abstract class Elevator {
  public abstract void move();
}

public class LeftElevator extends Elevator {
  public void move() { System.out.println("홀수층 이동하는 엘리베이터"); }
}
public class RightElevator extends Elevator {
  public void move() { System.out.println("짝수층 이동하는 엘리베이터"); }
}

public class Client {
  public static void main(String[] args) {
    Elevator leftE = new LeftElevator();
    Elevator rightE = new RightElevator();

    leftE.move();
    rightE.move();
  }
}

```

- 실행결과 
```html
홀수층 이동하는 엘리베이터
짝수층 이동하는 엘리베이터
```

<br>

### 문제점
어느날 건물 엘리베이터 이용자들이 주말에만 저층용 엘리베이터와 고층용 엘리베이터로 구분해달라고 했을때<br>
평일 & 주말에 왼쪽, 오른쪽에 설정된 알고리즘을 직접 바꾸어야 한다.<br>
OCP 법칙에 위반된다.

<br>

### 전략 패턴 사용후

1. 알고리즘 인터페이스를 정의한다.
2. 구체적인 알고리즘을 클래스로 캡슐화 한다.
3. 알고리즘이 바뀌어야 하는순간에 캡슐화된 전략을 바꾸어서 알고리즘을 교체한다.

- 코드

```javascript
public abstract class Elevator {
    private MovingStrategy movingStrategy;
    public void move() { movingStrategy.move(); }
    public void setMovingStrategy(MovingStrategy movingStrategy) {
        this.movingStrategy = movingStrategy; 
    }
}

public class LeftElevator extends Elevator {}

public class RightElevator extends Elevator {}

interface MovingStrategy { public void move(); }
public class OddLayerStrategy implements MovingStrategy {
  public void move() { System.out.println("홀수 이동하는 엘리베이터"); }
}
public class EvenLayerStrategy implements MovingStrategy {
  public void move() { System.out.println("짝수 이동하는 엘리베이터"); }
}
public class LowLayerStrategy implements MovingStrategy {
  public void move() { System.out.println("저층 이동하는 엘리베이터"); }
}
public class HighLayerStrategy implements MovingStrategy {
  public void move() { System.out.println("고층 이동하는 엘리베이터"); }
}

public class Client {
  public static void main(String[] args) {
    Elevator leftE = new LeftElevator();
    Elevator rightE = new RightElevator();

    leftE.setMovingStrategy(new OddLayerStrategy())
    rightE.setMovingStrategy(new EvenLayerStrategy())

    leftE.move();
    rightE.move();

    // ======= 주말에 되어 저층, 고층 엘리베이터로 설정해보자 
    System.out.println("======");

    leftE.setMovingStrategy(new LowLayerStrategy())
    rightE.setMovingStrategy(new HighLayerStrategy())

    leftE.move();
    rightE.move();

  }
}
```

<br>

- 실행결과

```html
홀수층 이동하는 엘리베이터
짝수층 이동하는 엘리베이터
======
저층 이동하는 엘리베이터
고층 이동하는 엘리베이터
```

### 참고

- [책임 연쇄 패턴 위키](https://ko.wikipedia.org/wiki/%EC%B1%85%EC%9E%84_%EC%97%B0%EC%87%84_%ED%8C%A8%ED%84%B4)
- [https://copynull.tistory.com/125](https://copynull.tistory.com/125)
- [https://gmlwjd9405.github.io/2018/07/06/strategy-pattern.html](https://gmlwjd9405.github.io/2018/07/06/strategy-pattern.html)