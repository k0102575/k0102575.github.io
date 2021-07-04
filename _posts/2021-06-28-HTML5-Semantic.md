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

- 말 그대로 무조건 **div**, **span**을 써서 코딩 하지 말고 페이지, 어플리케이션 구역 및 의미에 맞게 태그를 붙여서 마크업을 하자 는 뜻이다.

<br/>

### 그래서 왜 시맨틱하게 마크업을 해야되는데?

**1. 검색 엔진 최적화에 좋다.**

- SEO 가 사이트를 검색 노출 시킬때 그냥 **div**로만 마크업을 하는것보다 태그에 의미를 부여 함으로써 검색 노출에 영향을 줄수있는 키워드라고 알릴수있다.

- ex) image 를 **div**에 background-image 로 붙이는것과 **img** 태그를 쓰는것중 **img** 태그를 쓰는것이 SEO 에게 의미적으로 이미지 라는것을 알수있어서 효율적이다.

<br/>

**2. 웹 접근성**

- 시각 장애가 있는 사용자가 스크린 리더 및 화면 판독기로 페이지를 탐색할 때 의미론적 마크업을 푯말로 사용할 수 있습니다.

<br/>

**3. 가독성이 좋아진다.**

- 다 필요없다. 시맨틱 마크업 과 논 시맨틱 마크업을 비교해 보자.

  - 이미지:

    <img src="{{ site.url }}/assets/image/2021-06-28-html5-semantic/div-soup-vs-semantic-html.png" class="col-12">

- 이미지 처럼 단순히 **div** 에 클래스 혹은 id 값으로 구역을 나눌때와 달리 의미적 마크업을 하게되면 유지 보수 및 사이트 분석에 편함을 느낄수있다.

<br/>

### 시맨틱 태그에 대해서 알아보자

- MDN HTML 요소 참고서 리스트에 따르면 의미적 태그는 100여개가 넘는다.

- [HTML 요소 참고서](https://developer.mozilla.org/ko/docs/Web/HTML/Element)

- 전부다 알아보기는 어렵고 많이 쓰는것 위주로 내가 봤던 태그들 몇개만 설명하겠다.

<br/>

### 시맨틱 태그중 콘텐츠 구획의 자주쓰는 태그들

#### <header> 태그

#### <main> 태그

#### <footer> 태그

#### <nav> 태그

#### <aside> 태그

#### <section> 태그

#### <article> 태그

#### section 과 article 의 차이점

### Reference

- [www.w3schools.com/html/html5_semantic_elements.asp](https://www.w3schools.com/html/html5_semantic_elements.asp)

- [MDN Semantics](https://developer.mozilla.org/ko/docs/Glossary/Semantics)

- [시맨틱을 써야하는 이유 3번째 이미지 출처](https://www.jungledisk.com/blog/2017/12/04/should-i-bother-with-semantic-html/)
