---
layout: post
title: 책임 연쇄 패턴(chain-of-responsibility pattern)
description: ""
date: 2020-02-23
categories:
 - Design Pattern
tags: [Design Pattern, Chain-of-responsibility Pattern]
---

## 연쇄책임패턴 (Chain-of-responsibility pattern)

## 정의
- 명령 객체와 일련의 처리 객체를 포함하는 디자인 패턴이다.
각각의 처리 객체는 명령 객체를 처리할 수 있는 연산의 집합이고, 체인 안의 처리 객체가 핸들할 수 없는 명령은 다음 처리 객체로 넘겨진다.
- 이 작동방식은 새로운 처리 객체부터 체인의 끝까지 다시 반복된다.

> 쉽게 설명하면
- 어떤 요청이 그 요청을 담당하는 객체에 들어오면 각각의 요청에 대해서 특정한 객체가 담당하는 것이 일반적이지만
객체를 연결리스트와 같은 사슬 방식으로 연결한 후에 요청을 수행하지 못하는 객체라면
다음 객체에 넘기며 책임을 넘기는 형태의 패턴을 말한다.


## 목적

- 이 패턴은 결합을 느슨하게 하기 위해 고안되었으며 가장 좋은 프로그래밍 사례로 꼽힌다.
요청을 보내는 객체와 이를 처리하는 객체간의 결합도를 느슨하게 하기 위한 방법이며 여러 객체에 처리 기회를 준다.


## 다이어그램

<img src="{{ site.url }}/assets/image/2020-02-23-chain-of-responsibility-pattern/diagram.jpeg" class="col-12">


## 대표적인 예

- 가장 대표적인 연쇄 책임 패턴의 예는 Java 에서의 try catch 문의 있다.

>Code

```javascript
    try {
        ...     
    } catch (IllegalArgumentException e) {
        someCode();
    } catch (SecurityException e) {
        someCode();
    } catch (IllegalAccessException e) {
        someCode();
    } catch (NoSuchFieldException e) {
        someCode();
    } finally {
        ...
    }
```

## 코드를 만들어보자

- 동전을 거슬러주는 프로그램을 만든다고 해보자.
- 그리고 동전은 100원, 10원, 1원 으로만 거슬러줄수 있다고 가정해보자.
- 이경우는 100원 -> 10원 -> 1원으로 넘겨주는 방식으로 연쇄책임패턴을 구현할수있다.

>Code

```javascript
interface DispenseChain{
    void setNextChain(DispenseChain nextChain);
    void dispense(Currency cur);
}

class Currency{
    private int amount;
    
    public Currency(int amt) {
        this.amount=amt;
    }
    
    public int getAmount() {
        return this.amount;
    }
}

class Won100Dispenser implements DispenseChain{
    private DispenseChain chain;
    
    @Override
    public void setNextChain(DispenseChain nextChain) {
        this.chain=nextChain;
    }
    
    @Override
    public void dispense(Currency cur) {
        if(cur.getAmount()>=100){
            int num=cur.getAmount()/100;
            int remainder=cur.getAmount()%100;
            
            System.out.println("Dispensing " +num+" 100₩ note");
            
            if(remainder!=0) this.chain.dispense(new Currency(remainder));    
        }
        else this.chain.dispense(cur);
    }
}

class Won10Dispenser implements DispenseChain{
private DispenseChain chain;
    
    @Override
    public void setNextChain(DispenseChain nextChain) {
        this.chain=nextChain;
    }
    
    @Override
    public void dispense(Currency cur) {
        if(cur.getAmount()>=10){
            int num=cur.getAmount()/10;
            int remainder=cur.getAmount()%10;
            
            System.out.println("Dispensing " +num+" 10₩ note");
            
            if(remainder!=0) this.chain.dispense(new Currency(remainder));    
        }
        else this.chain.dispense(cur);
    }
}
 
class Won1Dispenser implements DispenseChain{
private DispenseChain chain;
    
    @Override
    public void setNextChain(DispenseChain nextChain) {
        this.chain=nextChain;
    }
    
    @Override
    public void dispense(Currency cur) {
        int num=cur.getAmount()/1;
        System.out.println("Dispensing " +num+" 1₩ note");
    }
}

public class ChainOfResponsibilityPattern {
    private DispenseChain c1;
    
    public ChainOfResponsibilityPattern(){
        this.c1=new Won100Dispenser();
        DispenseChain c2=new Won10Dispenser();
        DispenseChain c3=new Won1Dispenser();
        
        c1.setNextChain(c2);
        c2.setNextChain(c3);
    }
    
    public static void main(String[] args) {
        ChainOfResponsibilityPattern atmDispenser = new ChainOfResponsibilityPattern();
        atmDispenser.c1.dispense(new Currency(378));
    }
}
```

> Result
```html
Dispensing 3 * 100₩ note
Dispensing 7 * 10₩ note
Dispensing 8 * 1₩ note
```

## Reference

- [책임 연쇄 패턴 위키](https://ko.wikipedia.org/wiki/%EC%B1%85%EC%9E%84_%EC%97%B0%EC%87%84_%ED%8C%A8%ED%84%B4)
- [https://sexycoder.tistory.com/105](https://sexycoder.tistory.com/105)