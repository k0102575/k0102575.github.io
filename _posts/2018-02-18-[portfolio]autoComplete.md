---
layout: post
title: "주소 자동 완성"
description:
headline:
modified: 2018-02-18
category: portfilo
tags: [practice]
imagefeature:
mathjax:
chart:
comments: true
featured: true
---

입사지원을 한 회사에서 주었던 과제인 주소 자동완성 기능입니다.<br>
Jquery UI의 autocomplete를 사용하지 않고 제한된 라이브러리사용으로 구현이 목적이었습니다.<br>

<h3>사용기술</h3>
Json, Jquery, FontAwesome, http-server<br>

<h3>개발 요구사항</h3>
주소 입력 박스에 입력되는 키워드를 이용하여 자동완성 기능을 구현하는 문제입니다.<br>
사용자는 주소 입력 박스에 키워드를 입력하고 해당 키워드에 매칭되는 주소 리스트를 입력 박스 하단에 노출 시킵니다.<br>
사용자는 노출된 리스트 중 하나를 선택해서 주소를 자동 완성 시킬 수 있습니다. 주소 리스트는 제공되는 json형식의 데이터 혹은 csv 를 사용하시면 됩니다.<br>

* 사용자가 입력할 수 있는 키워드의 예는 다음과 같습니다.<br>

시, 도, 구, 군 단위의 지역 키워드. (예, 성북구, 부산시, 고성군)<br>
시, 도, 구, 군 단위의 지역 키워드 조합. (예, 성북구 안암동, 강원도 고성군)<br>br>

* 필수적으로 구현해야 할 기능리스트는 다음과 같습니다.<br>

1. 사용자가 키워드 입력시 자동 완성 가능한 주소 리스트를 노출. (노출 개수는 자유)<br>

2. 자동 완성 리스트를 마우스로 클릭시, 입력 박스에 자동 완성된 주소를 적용해줌.<br>

3. 입력 박스가 포커스된 상태에서 키보드 상하 방향키를 이용해서 자동 완성 리스트를 선택할 수 있게 하기.<br>

4. 키워드가 입력되어 있고, 자동 완성 리스트가 노출되어 있는 상태에서 엔터키를 입력하면 자동 완성 리스트의 가장 상단에 노출된 항목을 자동을 선택할 수 있도록 구현.<br>

5. 입력 박스가 포커스를 잃을 때, 노출되어 있던 자동 완성 리스트가 보이지 않도록 구현.<br><br>

[결과화면]({{ site.url }}/portfolio/autocomplete/index.html)<br>
[소스코드](https://github.com/k0102575/k0102575.github.io/blob/master/portfolio/autocomplete/index.html)<br>

![typing]({{ site.url }}/images/autocomplete.png)
