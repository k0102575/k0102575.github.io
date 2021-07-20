---
layout: post
title: HTML 시맨틱
description: ""
date: 2021-06-28
categories:
  - HTML5
tags: [HTML5, HTML Semantic]
---

# HTML 시맨틱 (의미론적인 태그)

<br/>

- 현재 HTML 코드가 전체적으로 **div** 로만 이루어져 있습니다. 이 마크업을 시맨틱한 방법으로 변경해야 합니다.

```text
  프론트 엔드 개발을 시작하기전 프로그래머스 챌린지에 나왔던 요구사항중 하나 였다.
  퍼블리싱을 한다. 퍼블리싱을 할줄 안다. 했지만 모든걸 non-semantic tag 로만 퍼블리싱을 해왔었고
  프론트 엔드 개발 1년동안 section, article, footer, header 정도만 쓰다가 코드 리펙토링 기회가 와서
  퍼블리싱도 점검 할겸 스터디를 하고 포스트도 남겨본다.
```

<br/>

### 시맨틱 마크업?

- 시맨틱(Semantic)은 "의미의, 의미론적인" 이라는 뜻, 즉 시맨틱 태그란 의미를 가지는 태그이다.

- 우리가 흔히 쓰고 있는 **div**, **span** 은 Non Semantic Tag 라 하며 의미가 없는 태그를 말한다.

- 말 그대로 무조건 **div**, **span**을 써서 코딩 하지 말고 페이지, 어플리케이션 구역 및 의미에 맞게 태그를 붙여서 마크업을 하자 는 뜻이다.

<br/>

### 그래서 왜 시맨틱하게 마크업을 해야되는데?

**1. 검색 엔진 최적화에 좋다.**

- SEO 가 사이트를 검색 노출 시킬때 그냥 **div**로만 마크업을 하는것보다 태그에 의미를 부여 함으로써 검색 노출에 영향을 줄수있는 키워드라고 알릴수있다.

- ex) image 를 **div**에 background-image 로 붙이는것과 **img** 태그를 쓰는것중 **img** 태그를 쓰는것이 SEO 에게 의미적으로 이미지 라는것을 알수있어서 효율적이다.

<br/>

**2. 웹 접근성**

- 시각 장애가 있는 사용자가 스크린 리더 및 화면 판독기로 페이지를 탐색할 때 의미론적 마크업을 푯말로 사용할 수 있다.

<br/>

**3. 가독성이 좋아진다.**

- 다 필요없다. 시맨틱 마크업 과 논 시맨틱 마크업을 비교해 보자.

  - 이미지:

    <img src="{{ site.url }}/assets/image/2021-06-28-html5-semantic/div-soup-vs-semantic-html.jpeg" class="col-12">

- 이미지 처럼 단순히 **div** 에 클래스 혹은 id 값으로 구역을 나눌때와 달리 의미적 마크업을 하게되면 유지 보수 및 사이트 분석에 편함을 느낄수있다.

<br/>

### 시맨틱 태그에 대해서 알아보자

- MDN HTML 요소 참고서 리스트에 따르면 의미적 태그는 100여개가 넘는다.

- [HTML 요소 참고서](https://developer.mozilla.org/ko/docs/Web/HTML/Element)

- 전부다 알아보기는 어렵고 많이 쓰는것 위주나 내가 봤던 태그들 몇개만 설명하겠다.

<br/>

### 시맨틱 태그들

<br/>

#### <header> 태그

- **<header>** 태그는 문서나 특정 섹션(section)의 헤더(header)를 정의할 때 사용한다.

- 보통 도입부에 해당하는 콘텐츠나 네비게이션 링크의 집합 등과 같은 정보를 포함하게 된된다.

  - 제목 요소
  - 로고
  - **<nav>**

- HTML 문서는 여러 개의 **<header>** 요소를 포함할 수 있다.

<br/>

#### <footer> 태그

- 문서나 특정 섹션(section)의 푸터(footer)를 정의할 때 사용한다다.

- 푸터(footer)는 보통 **<footer>** 요소가 포함되어 있는 문서나 섹션에 대한 아래와 같은 정보를 포함한다다.

  - 저자(author) 정보
  - 저작권 정보
  - 연락처
  - 사이트맵(sitemap)
  - 페이지 맨 위로 되돌아갈 수 있는 Top 버튼
  - 연관 페이지 등

- 하나의 HTML 문서에는 여러 개의 **<footer>** 요소가 포함될 수 있다.

<br/>

#### <main> 태그

- **<main>** 태그는 해당 문서의 **<body>** 요소의 주 콘텐츠(main content)를 정의할 때 사용한다다.

- **<main>** 요소의 콘텐츠는 해당 문서의 중심 주제 또는 주요 기능과 직접적으로 관련되어 있거나 확장되는 콘텐츠로 구성되어야 하며, 문서 전반에 걸쳐 반복되는 내용을 포함해서는 안 된된다.

- 따라서 하나의 문서에는 단 하나의 **<main>** 요소만이 존재해야 하며, **<main>** 요소는 **<article>**, **<aside>**, **<footer>**, **<header>**, **<nav>** 등등의 요소의 자손 요소가 되어서는 안 된된다.

<br/>

#### <nav> 태그

- **<nav>** 태그는 다른 페이지 또는 현재 페이지의 다른 부분과 연결되는 네비게이션 링크(navigation links)들의 집합을 정의할 때 사용한다.

- a 태그의 모음이나 문서 헤더에 메뉴트리? 등을 정의할때 사용하면 된다.

<br/>

#### <section> 태그

- **<section>** 태그는 HTML 문서에 포함된 독립적인 섹션(section)을 정의할 때 사용합니다. 또한, 더 적합한 의미를 가진 요소가 없을 때 사용한다.

- **<section>** 요소는 보통 제목 요소(h1~h6)를 자식 요소로 포함하고 있는 경우가 많다.

- 어떤 포스트 들은 제목 요소가 필수라고 되어있는 경우도 있지만 항상 그렇지는 않다.

<br/>

#### article

- 문서, 페이지, 애플리케이션, 또는 사이트 안에서 독립적으로 구분해 배포하거나 재사용할 수 있는 구획을 나타낸다.

- Article 요소는 문서, 페이지, 애플리케이션에 포함되며, 그 자체로도 독자적으로 완성된 내용을 담고 있다.

- 원칙적으로 Article 요소에 담긴 내용은 기사 통합 서비스 등을 통해서 따로 배포되거나 재사용할 수 있다.

  - 예를 들어 youtube 화면에서 동영상 하나당 article 로 마크업이 되어있을떄, 이 article 컨텐츠 만으로도 다른 페이지 or 다른 어플리리케이션에서 사용 할수있다.

- Article 요소의 내용은 게시판 글이 될 수도 있고, 잡지나 뉴스의 기사, 블로그에 올린 글, 사용자가 올린 댓글, 상호작용할 수 있는 기능 모듈을 비롯해서 다른 어떤 종류의 독립적인 콘텐츠도 될 수 있다.

<br/>

#### section 과 article 의 차이점

- **<div>** 대신 seciton or article 로 구획을 나눠야 된다는것을 알게되었다.

- **<section>** 은 목차를 나누는 보편 적인 컨테이너 라고 볼수있고

- **<article>** 은 하나의 컨텐츠를 구분짓는 컨테이너 라고 볼수있다.

- 그렇다고 해서 꼭 여러개의 article 을 section으로 감싸야 하는것은 아니며 section in article , article in section 아무런 상관이 없다.

- 구획을 잡기 어렵거나 재사용 을 하게 된다면 article을 선언을 하고 그 article 들의 페이지를 section 으로 목차 짓는 식으로 들어 가면 될것 같다.

<br/>

### 오래된 브라우저에서의 시맨틱 태그

- 시맨틱 태그는 HTML5 에서 추가된 태그이다.

- IE8 이하의 오래된 브라우저 에서는 지원을 하지 않는다.

- 예를 들어 reset.css 에서는 해당 태그들을 위한 block 처리가 들어간다.

  - [reset css](https://abcdqbbq.tistory.com/9)

- 그러면 어떻게 시맨틱 태그를 오래된 브라우저에서 사용할수있는가?

<br/>

#### 1. document 가상태그 선언

- <img src="{{ site.url }}/assets/image/2021-06-28-html5-semantic/older.png" class="col-12">

<br/>

#### 2. html5shiv 라이브러리 를 사용하자

- [https://github.com/aFarkas/html5shiv](https://github.com/aFarkas/html5shiv)

<br/>

#### 두 가지 방법 다 **<head>** 안에서 선언되어야 한다.

### Reference

- [www.w3schools.com/html/html5_semantic_elements.asp](https://www.w3schools.com/html/html5_semantic_elements.asp)

- [MDN Semantics](https://developer.mozilla.org/ko/docs/Glossary/Semantics)

- [http://www.tcpschool.com/html-tags/intro](http://www.tcpschool.com/html-tags/intro)

- [시맨틱을 써야하는 이유 3번째 이미지 출처](https://www.youtube.com/watch?v=dMAdBe4_2u4)
