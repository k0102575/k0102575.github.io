---
layout: post
title: React concurrent features
description: ""
date: 2021-11-26
categories:
  - React
tags: [React, Concurrent features]
---
# React concurrent features

## React 의 concurrent 는?

- reactDom.createRoot 실행시 내부적으로 mode 활성화 되며
- concurrent features 를 사용하면 concurrent reding 수행
- 2017년 9월에 React v16.0 에 Async rendering 이라는 이름으로 처음 공개 되었으며 Concurrent Mode 라는 네이밍을 거쳐 2022년 3월에 React 18 에서 Concurrent Features 라는 네이밍으로 정식 릴리즈 되었다.
- React Hooks 가 릴리즈 되기도 전에 16 에서 Hooks 와 같이 공개 되었으나 정식 릴리즈 까지는 5년이나 뒤에 릴리즈 되게 되었다. (정말 길다)

<div class="gap-15"></div>

## 동시성 (Concurrency)  vs 병렬성 (Parallelism)

<div class="gap-5"></div>

<img src="{{ site.url }}/assets/image/2021-11-26-react-concurrent-features/image1.png" class="col-12" />

```jsx
동시성에 관한 추가 설명
동시성이란 마음의 상태이다
실제로는 여러 개의 스레드가 사용되지는 않지만,
겉으로 보기에는 "마치 여러 개의 스레드가 사용되고 있는 것처럼 보이게 만드는 것"을 의미한다.
이것이 바로 협동적인 멀티태스킹을 의미한다
```

<div class="gap-15"></div>

## 글로 보니 어렵다. 그림으로 쉽게 이해해 보자

<img src="{{ site.url }}/assets/image/2021-11-26-react-concurrent-features/image2.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2021-11-26-react-concurrent-features/image3.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2021-11-26-react-concurrent-features/image4.png" class="col-12" />

<div class="gap-15"></div>

## 동시성이 뭐야??

- 2개 이상의 독립적인 작업을 잘게 나누어 동시에 실행되는 것처럼 보이도록 프로그램을 구조화 하는 방법

## Blocking Rendering

```jsx
javascript 는 싱글 스레드 이다.
HTML parsing -> Run Javascript -> Rendering 을 할때 한번에 하나씩 처리 했다.

메인스레드가 렌더링 연산을 돌입하면 멈출수 없었다.
그래서 렌더링 연산을 하기 시작하였을때 유저의 이벤트가 일어난다면 렌더링중인 계산이 끝나고 유저의 이벤트가 렌더링 되었다.
이걸 Blocking Rendering 이라고 부른다.

지금 까지는 매우 빨라서 Blocking 이라고 느껴지지 않았다.
매우 렌더링 계산이 오래걸린다면?
React 는 이부분에 초점을 두고 Concurrent Features 를 추구하기 시작했다.
```

- blocking rendering 관련 코드 및 프로세스 이미지
<img src="{{ site.url }}/assets/image/2021-11-26-react-concurrent-features/image6.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2021-11-26-react-concurrent-features/image5.png" class="col-12" />

- 지금까지는 Blocking rendering 을 방지하기 위해서 다음과 같은 방법들을 활용했었다. 
- 입력하는 동안 화면을 그리지 않도록 하는 방법
    - [https://lodash.com/docs/#debounce](https://lodash.com/docs/#debounce)
- 입력하는 동안 일정한 주기로 화면을 그리도록 하는 방법
    - [https://lodash.com/docs/#throttle](https://lodash.com/docs/#throttle)
    

>위와 같은 방법도 Blocking Rendering 을 방지를 해주기는 하지만 사용성이 저하 되는 문제가 있었다.
>그래서 react 팀은 Blocking Rendering 을 동시성 모드로 해결하려 하였다.

<div class="gap-15"></div>

## React 코어 팀이 추구 하고 싶었던 동시성

>무거운 렌더링 동작이 일어나고 있을 때 유저 인터랙션이 일어난다면, 
>이 때 렌더링은 메인 스레드를 점령하고 있기 때문에 진행 중인 작업이 다 완료된 이후가 되어서야 
>유저는 user event 동작에 따른 인터렉션 반응을 목도할 수 있을 것이다.

>리엑트 코어팀이 원한 것은 렌더링 도중 유저 인터렉션이 일어났을 때 유연하게 렌더링 우선순위를 바꿔 사용자에게 최상의 인터렉션 경험을 제공하는 것이었다.

<img src="{{ site.url }}/assets/image/2021-11-26-react-concurrent-features/image7.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2021-11-26-react-concurrent-features/image8.png" class="col-12" />

<div class="gap-15"></div>

## 동시성 렌더링으로 Blocking Rendering 을 해결해보자

<img src="{{ site.url }}/assets/image/2021-11-26-react-concurrent-features/image9.png" class="col-12" />

- 기존 Blocking Rendering 을 1차선 도로로 비유했다.
- 해당 컴포넌트가 입력된 사항이 적으면 문제없이 렌더링이 표시된다.
- 하지만 입력사항이 많으면 Blocking Rendering 이 발생한다.

<div class="gap-15"></div>

## React Concurrent Features 를 통하여 Blocking Rendering 을 해소하는 방법

#### 1.
<img src="{{ site.url }}/assets/image/2021-11-26-react-concurrent-features/image10.png" class="col-12" />

- 우선 1차선 도로로 되어있던 작업을 2개로 나눈다.
- 급한 작업인 빨간색 (레인) 과 덜 급한 작업인 파란색 (레인) 으로 우선 순위를 제어 한다.

#### 2.
<img src="{{ site.url }}/assets/image/2021-11-26-react-concurrent-features/image11.png" class="col-12" />

- 1개의 렌더링 작업이 끝나면 메인 스레드에 일정 시간을 양보한다.
- 이렇게 함으로써 브라우저 이벤트를 처리하고 응답성을 향상시킨다.
    

#### 3.
<img src="{{ site.url }}/assets/image/2021-11-26-react-concurrent-features/image12.png" class="col-12" />

- 낮은 순위 컴포넌트 렌더링을 잘게 분해해서 렌더링을 실행한다.

<div class="gap-15"></div>


## 만약에 C (덜 급한 작업인) 를 입력하여 렌더링중 D( 급한작업)가 입력 되면 React 는 어떻게 처리할까?

#### 1.
<img src="{{ site.url }}/assets/image/2021-11-26-react-concurrent-features/image13.png" class="col-12" />

- C 를 렌더링 하는 도중에 급한작업인 D 가 입력이 된다면 C 를 잠시 멈추고 D를 우선적으로 렌더링 한다.

#### 2.
<img src="{{ site.url }}/assets/image/2021-11-26-react-concurrent-features/image14.png" class="col-12" />

- Pending 상태의 낮은 순위 렌더링을 리베이스 한다.
- 이렇게 처리 함으로써 C 입력 중에도 텍스트등의 화면을 표시하고 D를 렌더링 한뒤 나머지를 렌더링 함으로써 사용성의 저하를 낮춘다.

<div class="gap-15"></div>

## React Concurrent Features 를 실제로 도와주는 코드를 보자!

- startTransition
- useDeferredValue

<img src="{{ site.url }}/assets/image/2021-11-26-react-concurrent-features/image15.png" class="col-12" />

- 이렇게 낮은 업데이트의 우선순위를 정하게 되면 높은 우선순위의 업데이트에 CPU 를 양보하게된다.
- 대규모 화면 업데이트 중 응답성 을 유지할수있다.
- 상태 전환 중에 시각적 피드백을 제공한다.

<img src="{{ site.url }}/assets/image/2021-11-26-react-concurrent-features/image16.png" class="col-12" />

<div class="gap-15"></div>

## 어떻게 작동하는가

- Yielding : 렌더링 과정을 작게 분할하고 일시 중지 할수 있음
- Interrupting : 동시성 모드에서 업데이트에 대한 우선순위가 있음
- 이전결과 건너뛰기 : 현재 상태만 반영하도록 중간 상태 반영을 건너 뜀

<div class="gap-15"></div>

## 기존 코드를 setTimeout 으로도 구현할수 있다. 하지만!

- setTimeout 으로 Task Queue에 들어간 작업은 들어간 순서대로 처리되고 취소될수가 없다.

<div class="gap-15"></div>

## **구현 상세가 꽁꽁 감춰진 concurrent feature.**

- [https://reactjs.org/blog/2022/03/29/react-v18.html](https://reactjs.org/blog/2022/03/29/react-v18.html)

<div class="gap-15"></div>

## 구현 방법이 모두 Hooks 기반인데?

- 개선안이나 개선 코드나 개선된 라이브러리 모두 훅 기반을 위주로 작업이 되기 때문에 이제 훅 사용은 선택이 아니라 필수가 되었다.
- React 클래스기반 프로그래밍 안버린다고 했는데, 이정도면은 거의 킹리적갓심 인거 같다.

<div class="gap-15"></div>

## Reference

- [https://jenkov.com/tutorials/java-concurrency/concurrency-vs-parallelism.html](https://jenkov.com/tutorials/java-concurrency/concurrency-vs-parallelism.html)
- [https://velog.io/@jay/Concurrent-React](https://velog.io/@jay/Concurrent-React)
- [https://reactjs.org/blog/2022/03/29/react-v18.html](https://reactjs.org/blog/2022/03/29/react-v18.html)
- [https://deview.kr/data/deview/session/attach/1_Inside React (동시성을 구현하는 기술).pdf](https://deview.kr/data/deview/session/attach/1_Inside%20React%20(%E1%84%83%E1%85%A9%E1%86%BC%E1%84%89%E1%85%B5%E1%84%89%E1%85%A5%E1%86%BC%E1%84%8B%E1%85%B3%E1%86%AF%20%E1%84%80%E1%85%AE%E1%84%92%E1%85%A7%E1%86%AB%E1%84%92%E1%85%A1%E1%84%82%E1%85%B3%E1%86%AB%20%E1%84%80%E1%85%B5%E1%84%89%E1%85%AE%E1%86%AF).pdf)