---
layout: post
title: Localhost 외부 공개 (2) - localtunnel
description: ""
date: 2021-10-10
categories:
  - localtunnel
tags: [localhost 외부 공개, localtunnel]
---

# Localhost 를 공개해보자! (2)
```
https://www.youtube.com/watch?v=0lUJvVqSEkY

5분 만에 로컬 PC를 외부에 공유하는 방법!
의 영상을 보고 작성한 포스트로 대부분의 내용이 일치합니다.

이메일로 블로그 작성에 대해서 승인을 받았습니다.
```

### localhost 외부 공개시 장점
```
장점을 알아보기 위해 localhost 외부 공개 하게 되면 해결되는 이슈들을 정리해 보자
```

#### 1. localhost 를 모바일에서 접속 가능

- 외부 공개를 하지 않았을때는 서버와 모바일 이 같은 wifi 네트워크를 사용하고 wifi 를 공유기가 다른포트의 접속을 허용할때만 가능하다.

#### 2. 배포를 하지 않고 미팅시나 간단한 로컬 서버를 다른 사람에게 테스트 용도로 보여주고 싶을때
- 배포 라는건 IDC, 클라우드를 사용해야 한다. 또한, 배포를 하기 위해 라우팅, 호스팅 , DNS spa - 빌드 등등 여러 가지 신경을 쓰고 고려해야될 점이 많다. (간단하게 하기 힘들다)

#### 3. 외부? 서드파티 API 들을 연동 하고 싶을때
- 본인인증, SNS, SDK API 들은 API 요청을 하는 웹사이트 URL을 요구한다.
    - API 요청 후 리턴을 해야하기 때문에 어디로 리턴을 해야할지 설정을 하거나 API 요청시에 포함 해야한다.
- 배포를 하지 않고 서드파티 API을 연동하기 위해서 PC 에서 호스트 파일을 변경하여서 테스트를 진행하였었다.

## 공식 설명
```
localtunnel exposes your localhost to the world for easy testing and sharing! 
No need to mess with DNS or deploy just to have others test out your changes.

Great for working with browser testing tools 
like browserling or external api callback services like twilio 
which require a public url for callbacks.

Localtunnel은 간편한 테스트 및 공유를 위해 당신의 로컬호스트를 외부에 노출시켜줍니다!
DNS 설정을 다루거나 배포할 필요 없이 다른 사람들이 당신의 변경사항을 테스트할 수 있습니다.

브라우저 테스트 도구(예: Browserling)나 외부 API 콜백 서비스(예: Twilio)와 함께 작업할 때 유용합니다. 이들은 콜백을 위해 공용 URL을 필요로 합니다.
```


## Localtunnel 오픈소스 기반의 무료 Node 패키지 이다.
- 그말인 즉슨 사용하는데 있어서 회원가입등 절차 없이 node.js, npm 만 있으면 사용이 가능하다

## 바로 사용해보자

#### 1. 설치
- npm 으로 설치 
<img src="{{ site.url }}/assets/image/2021-10-10-local-deploy/install.png" class="col-12">

#### 2. 실행
- --port 의 경우 로컬에서 실행중인 프로젝트의 포트
- --subdomain 의 경우는 사용하고자 하는 URL 을 작성한다
<img src="{{ site.url }}/assets/image/2021-10-10-local-deploy/start.png" class="col-12">

#### 3. public 확인
<img src="{{ site.url }}/assets/image/2021-10-10-local-deploy/local.png" class="col-12">
<img src="{{ site.url }}/assets/image/2021-10-10-local-deploy/public.png" class="col-12">

