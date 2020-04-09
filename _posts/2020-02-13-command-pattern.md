---
layout: post
title: 커맨드 패턴(Command pattern)
description: ""
date: 2020-02-13
categories:
 - Design Pattern
tags: [Design Pattern, Command Pattern]
---


# 커맨드 패턴 (Command pattern)


## 정의
- 요청을 객체의 형태로 캡슐화하여(실행될 기능을 캡슐화함으로써) 사용자가 보낸 요청을 나중에 이용할 수 있도록 매서드 이름, 매개변수 등 요청에 필요한 정보를 저장 또는 로깅, 취소할 수 있게 하는 패턴이다
- 커맨드 패턴에는 명령(command), 수신자(receiver), 발동자(invoker), 클라이언트(client)의 네개의 용어가 항상 따른다.


## 다이어 그램
<img src="{{ site.url }}/assets/image/2020-02-13-command-pattern/diagram.png" class="col-12">


## 커맨드 패턴의 4가지 용어

1. 명령(command) : 수신자(Receiver)의 정보 + 행동이 들어 있는 객체

2. 수신자(receiver) : 행동을 하는 객체

3. 발동자(invoker) : 커맨드를 저장함 수신자에게 행동을 전달

4. 클라이언트(client) : 커맨드 객체를 생성, 발동자(Invoker)를 통해 수신자(Receiver)에게 할 행동을 전달함


## 커맨드 패턴의 동작 순서

1. 클라이언트에서 커맨드 객체를 생성

2. 인보커로 커맨드 객체를 저장

3. 클라이언트에서 인보커를 통해 행동 요청을 전송

4. 수신자가 행동을 함.


## 커맨드 패턴 사용전 - 1

- 구글홈이라고 "OK Google 히터 틀어줘" 라고 하면, 히터를 틀어주는 실제 구글 서비스가 있습니다.
- 구글홈을 사용하는 사용자를 Client 클래스
- 구글홈을 OKGoogle 클래스
- 히터를 Heater 클래스로 정의하도록 하겠습니다.

> Code

```java
public class Heater {
    public void powerOn(){
        System.out.println("Heater on");
    }
}

public class OKGoogle {
    private Heater heater;

    public OKGoogle(Heater heater){
        this.heater = heater;
    }

    public void talk(){
        heater.powerOn();
    }
}

public class Client {
    public static void main(String args[]){
        Heater heater = new Heater();
        OKGoogle okGoogle = new OKGoogle(heater);
        okGoogle.talk();
    }
}
```

> Diagram

<img src="{{ site.url }}/assets/image/2020-02-13-command-pattern/diagram1.png" class="col-12">


## 커맨드 패턴 사용전 - 2

- 그런데 OKGoogle에서 히터를 켜는 기능 말고, 램프를 켜는 기능을 추가하고 싶다
- 위와 같이 Lamp 클래스를 정의하고, OKGoogle 클래스에서 Lamp 객체를 참조하도록 해야 합니다.
- 물론 기존의 Heater 기능도 있어야 하구요.

> Code

```java
public class Heater {
    public void powerOn(){
        System.out.println("Heater on");
    }
}

public class Lamp {
    public void turnOn(){
        System.out.println("Lamp on");
    }
}

public class OKGoogle {
    private static String[] modes = {"heater", "lamp"};

    private Heater heater;
    private Lamp lamp;
    private String mode;

    OKGoogle(Heater heater, Lamp lamp){
        this.heater = heater;
        this.lamp = lamp;
    }

    public void setMode(int idx){
        this.mode = modes[idx];
    }

    public void talk(){
        switch(this.mode){
            case "heater":
                this.heater.powerOn();
                break;
            case "lamp":
                this.lamp.turnOn();
                break;
        }

    }
}

public class Client {
    public static void main(String args[]){
        Heater heater = new Heater();
        Lamp lamp = new Lamp();
        OKGoogle okGoogle = new OKGoogle(heater, lamp);

        // 램프 켜짐
        okGoogle.setMode(0);
        okGoogle.talk();

        // 알람 울림
        okGoogle.setMode(1);
        okGoogle.talk();
    }
}
```

> Diagram

<img src="{{ site.url }}/assets/image/2020-02-13-command-pattern/diagram2.png" class="col-12">


> 문제점

- OKGoogle 에 추가적인 장치가 설정되었을때 객체 프로퍼티는 더욱 늘어나게 되고 talk() 메서드의 분기가 추가 된다.
- [OCP](https://ko.wikipedia.org/wiki/%EA%B0%9C%EB%B0%A9-%ED%8F%90%EC%87%84_%EC%9B%90%EC%B9%99) 원칙에 어긋나게 된 코드가 된다.


## 커맨드 패턴을 사용후

1. Command 인터페이스 를 정의한다.

> Code

```java
public interface Command {
    public void run();
}
```


2. Heater를 켜는 명령을 클래스화 하여, HeaterOnCommand 클래스를 정의하고,
Heater 클래스는 그대로 히터를 켜는 powerOn() 메서드를 정의합니다.

> Code

```java
public class HeaterOnCommand implements Command{
    private Heater heater;

    public HeaterOnCommand(Heater heater){
        this.heater = heater;
    }

    public void run(){
        heater.powerOn();
    }
}

public class Heater {
    public void powerOn(){
        System.out.println("Heater on");
    }
}
```


3. 마찬가지로 Lamp를 켜는 명령을 클래스화 하여, LampOnCommand 클래스를 정의하고
Lamp 클래스는 그대로 램프를 켜는 turnOn() 메서드를 정의합니다.

> Code

```java
public class LampOnCommand implements Command{
    private Lamp lamp;

    public LampOnCommand(Lamp lamp){
        this.lamp = lamp;
    }

    public void run(){
        lamp.turnOn();
    }
}

public class Lamp {
    public void turnOn(){
        System.out.println("Lamp on");
    }
}
```


4. OKGoogle 클래스의 talk() 메서드에서는 Command 인터페이스의 run() 메서드를 하여 명령을 실행합니다.

> Code

```java
public class OKGoogle {
    private Command command;

    public void setCommand(Command command){
        this.command = command;
    }

    public void talk(){
        command.run();
    }
}
```


5. 마지막으로 OKGoogle을 사용하는 Client 클래스를 정의합니다.

> Code

```java
public class Client {
    public static void main(String args[]){
        Heater heater = new Heater();
        Lamp lamp = new Lamp();

        Command heaterOnCommand = new HeaterOnCommand(heater);
        Command lampOnCommand = new LampOnCommand(lamp);
        OKGoogle okGoogle = new OKGoogle();

        // 히터를 켠다
        okGoogle.setCommand(heaterOnCommand);
        okGoogle.talk();

        // 램프를 켠다
        okGoogle.setCommand(lampOnCommand);
        okGoogle.talk();

    }
}
```

> Diagram

<img src="{{ site.url }}/assets/image/2020-02-13-command-pattern/diagram3.png" class="col-12">


### 장점과 단점

- 장점 :
    - 커맨드 패턴을 활용하게 요청부와 동작부를 분리시켜주기 때문에 시스템의 결합도를 낮출 수 있으며, 각 객체들이 수정되어도 다른 객체가 영향을 받지 않습니다.
    - 클라이언트와 INVOKER 클래스 간의 의존성이 제거 된다.

- 단점 : 리시버 및 리시버의 동작이 추가된다면 그 동작에 대한 클래스를 만들어야 하기 때문에, 다소 많은 잡다한 클래스들이 추가된다는 단점이 있습니다.


## Reference

- [커맨드 패턴 위키](https://ko.wikipedia.org/wiki/%EC%BB%A4%EB%A7%A8%EB%93%9C_%ED%8C%A8%ED%84%B4)
- [https://gmlwjd9405.github.io/2018/07/07/command-pattern.html](https://gmlwjd9405.github.io/2018/07/07/command-pattern.html)