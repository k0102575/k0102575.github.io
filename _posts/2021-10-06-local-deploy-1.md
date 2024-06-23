---
layout: post
title: Localhost 외부 공개 (1) - ngrok
description: ""
date: 2021-10-06
categories:
  - Ngrok
tags: [localhost 외부 공개, Ngrok]
---

# Localhost 를 공개해보자! (1)
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

### Ngrok 의 구동원리?
```
Ngrok 을 사용하기 전에 사이트를 보며 구동원리에 대해서 정리해보자
https://ngrok.com/
```

- 처음에 나는 Localhost에 있는 서버 정보를 Ngrok에 자동적으로 배포 하고 그거를 호스팅을 진행해주는 원리로 느껴졌었다.
  - deploy x portforwarding 개념
- 하지만 그런 개념이 아니었다. ngrok 사이트에서 프로그램에 대한 설명을 보자
  - **secure introspectable tunnels to localhost**
  - Spend more time programming. One command for an instant, secure URL to your localhost server through any NAT or firewall.
- 방화벽및 NAT를 넘어서 보안 터널을 통해서 외부에서 나의 localhost를 접속할수 있게 해주는 프로그램이다.

<img src="{{ site.url }}/assets/image/2021-10-06-local-deploy/ngork.jpg" class="col-12">

### Ngrok 을 사용해보자
```
Ngrok 은 유료 / 무료 플랜이 있는 서비스 이다.
무료 로 사용은 가능하지만 당연히도 기능 제한이 있다.
또한 Ngrok 은 콘솔 커맨드 명령어가 아닌 응용 프로그램이다.
영상은 ngrok 을 다운로드 하고 응용프로그램을 그대로 실행하지만 
homebrew 를 이용해서도 사용할수있다.

응용프로그램이기 때문에 NPM 이나 brew를 통하여 다운로드 및 CLI 에서 실행하지 못하고
실제 ngrok 사이트에서 다운로드하고 그 폴더의 프로그램을 실행 하여야 한다.
```

#### 1. https://ngrok.com 을 접속하여 회원가입 및 로그인을 진행하자

- 유료 / 무료 플랜이 있는 서비스 이기 때문에 다운로드를 하기 위해서는 회원가입이 필수적이다.
- 회원가입 & 로그인을 진행하자.
- 로그인을 하게 되면 [https://dashboard.ngrok.com/get-started/setup](https://dashboard.ngrok.com/get-started/setup) 로 이동하고 해당 페이지에 2번부터의 모든 과정이 나와있다.
- 하나씩 차근차근 진행 해보자

#### 2. 다운로드 및 압축을 풀자

- 각 OS 에 맞는 다운로드를 진행하고 해당 폴더로 이동해 압축을 풀자

<img src="{{ site.url }}/assets/image/2021-10-06-local-deploy/unzip.png" class="col-12">

#### 3. authtoken 을 설정하자

- ngork 에 토큰을 설정해야된다.
- [https://dashboard.ngrok.com/get-started/your-authtoken](https://dashboard.ngrok.com/get-started/your-authtoken) 에서 확인가능하며 위의 setup 페이지에서도 확인 가능하다.

<img src="{{ site.url }}/assets/image/2021-10-06-local-deploy/authtoken.png" class="col-12">

#### 4. ngrok 을 실행하여 localhost 를 외부로 공개하자

- localhost 를 외부로 공개하여야 하기 떄문에 localhost 에 서버가 실행중이어야한다.
- 이 포스트에서는 간단하게 create-react-app 을 진행한뒤 실행을 하겠다.
- 위에 설명처럼 응용 프로그램으로 실행하기 때문에 해당 폴더 로 이동하여 실행중인 port 를 입력한다.

<img src="{{ site.url }}/assets/image/2021-10-06-local-deploy/run.png" class="col-12">

#### 5. 실행된 사이트를 접속하여 외부 공개중인지 확인하자

<img src="{{ site.url }}/assets/image/2021-10-06-local-deploy/ngrok-interface.png" class="col-12">

<img src="{{ site.url }}/assets/image/2021-10-06-local-deploy/local.png" class="col-12">

<img src="{{ site.url }}/assets/image/2021-10-06-local-deploy/public.png" class="col-12">


### Ngrok 추가 설명
- Ngrok은 유료 서비스 이다. [https://ngrok.com/pricing](https://ngrok.com/pricing)
  - Free 플랜을 사용하면 1분당 40번의 연결만 가능하다.
  - url 도메인을 커스텀하게 사용할수가 없다.
  - 1개의 ngork 프로세스만 가능하다.
  - 사용하고 싶은 서비스 플랜이 있다면 결제를 하고 사용을 하면 된다.

### Ngrok 은 회원가입도 해야대고 다운로드 해야되고 유료다. Localtunnel 로 요런 불편함을 없애보자!

> [localhost 외부 공개(2) localtunnel]({{ site.url }}/articles/2021-10/local-deploy-2)
