---
layout: post
title: S3, CloudFront에 React 앱 배포 및 가비아 구매 도메인 연결하기(2):Gabia
description: ""
date: 2021-08-20
categories:
  - AWS
tags: [React, AWS S3, AWS CloudFront, AWS Route53, AWS ACM, SPA Deploy, Gabia]
---

# S3, CloudFront에 React 앱 배포 및 가비아 구매 도메인 연결하기(2):Gabia
<div class="gap-15"></div>
> 회사 퇴직을 하기 전 배포중인 프로젝트의 인수인계를 위하여 문서작업을 진행하게되었습니다. 그래서 블로그 포스팅도 남겨봅니다.

<div class="gap-15"></div>

# 참고사항 (모든 스텝 동일 합니다. 스탭별 추가 유의사항은 goal 에 작성하겠습니다)
```text
- 회사 에서 임시로 qa 라는 배포 환경을 만들면서 진행을 하였고, 현재는 제거 된 설정으로 알고있습니다.
- 회사 정보가 나올수 있는 부분은 블라인드 처리를 진행할 것이며 포스트 의 설정과 무난한 정보들이거나 기존 설정 데이터 입니다.
- 이미지에 보시면 노란색 박스 로 표시된 부분들을 집중해서 보시면 됩니다.
- 도메인은 가비아에서 구매를 하였기 때문에 도메인 연결은 가비아를 통한 연동과 route53 을 통한 연동 2가지로 구성되어있으며 상황에 맞게 스탭 진행하시면 됩니다.
- 가비아를 통한 도메인 연결은 qa.eneryx.co.kr, route53을 통한 도메인 연결은 qa.stfinc.kr 이렇게 2가지 url 로 진행됩니다
- 포스트를 1 부터 차근차근 나눴기에 연결되게 보시는것을 추천합니다.
- 모든 정보는 2021년 8월을 기준으로 하며 aws 및 가비아 측 업데이트로 인하여 변경된 부분은 정확하지 않을수 있습니다.
```
<div class="gap-15"></div>

# goal 구입한 도메인을 가비아로 연동하여 S3 프로젝트 접속 하기

- 웹사이트 엔드포인트가 너무나 길며 원하는 url 이 아닙니다.
- 가비아에서 도메인을 구입하는것은 해당 포스트에서 포함하지 않습니다. 따로 포스팅 해보도록 하겠습니다.
- 가비아에서 도메인을 설정하고 업로드한 S3 프로젝트를 접속해보겠습니다.

### 가비아 DNS 설정 접속

```
도메인을 구입한 가비아 계정으로 로그인 합니다.
My 가비아를 클릭하여 My 페이지로 접속합니다.
DNS 관리툴을 클릭하여 DNS 설정단게로 접속합니다.
구입한 도메인 옆 체크박스를 클릭한뒤 DNS 설정 버튼을 클릭해 DNS 설정 화면으로 접속합니다. 
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-gabia/image1.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-gabia/image2.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-gabia/image3.png" class="col-12" />
<br>

### DNS 레코드 생성전 확인

```
도메인에서 서브 도메인을 레코드라고 단위가 되어있습니다.
생성하려는 레코드의 속성들을 확인합니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-gabia/image4.png" class="col-12" />
<br>

### 레코드 생성하기

```
레코드 추가하기를 클릭해 원하는 url 로 설정하여 프로젝트에 접속할수있게 해보겠습니다.
레코드 타입은 CNAME 으로 설정합니다.
도메인은 버킷에서 잡았던 서브도메인으로 작성하고 버킷 웹사이트 엔드포인트를 작성한뒤 확인 및 저장을 진행해줍니다.
꼭 엔드포인트 뒤에 "." 을 찍어주셔야됩니다! (가비아 레코드 저장 필수사항)
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-gabia/image5.png" class="col-12" />
<br>

### 설정된 url 로 접속하여 업로드 한 프로젝트로 접속되는 지 확인

```
추가한 레코드 url 로 브라우저에서 접속하여 S3 에 업로드 했던 프로젝트가 맞는지 확인합시다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-gabia/image6.png" class="col-12" />
<br>

### 간단한 다이어그램

정확하게 표현했다고 보긴 어렵지만 간단하게 해당 과정을 통하여 완료된 다이어그램입니다.

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-gabia/image7.png" class="col-12" />

### 가비아 고객센터

[해당 포스트 과정 Document](https://customer.gabia.com/manual/dns/3041/3040)

### Finish

```text
지금까지 진행한 설정을 통하여 구입한 도메인으로 프로젝트를 접속할수있게 되었습니다.
하지만 https 설정도 되지 않은 프로젝트 이며 AWS 에서 Cloudfront 를 통하여 글로벌하게 또한, 정적 호스팅에 도움이 될수 있도록 설정해봅시다.
다음 스텝은 cloudfront 설정 하기전에 필요한 과정인 https 를 위한 ACM 인증서를 생성해 보겠습니다.
```
<br>

# 모든 스텝
<div class="gap-15"></div>

> [Step(1) > S3 정적 웹 호스팅]({{ site.url }}/articles/2021-08/react-s3-cloudfront-deploy-1)

> [Step(2) > S3 도메인 연결: 가비아]({{ site.url }}/articles/2021-08/react-s3-cloudfront-deploy-2-gabia)

> [Step(2) > S3 도메인 연결: Route53]({{ site.url }}/articles/2021-08/react-s3-cloudfront-deploy-2-route53)

> [Step(3) > ACM 설정]({{ site.url }}/articles/2021-08/react-s3-cloudfront-deploy-3)

> [Step(4) > Cloudfront 설정]({{ site.url }}/articles/2021-08/react-s3-cloudfront-deploy-4)

> [Step(5) > Cloudfront 도메인 연결: 가비아]({{ site.url }}/articles/2021-08/react-s3-cloudfront-deploy-5-gabia)

> [Step(5) > Cloudfront 도메인 연결: Route53]({{ site.url }}/articles/2021-08/react-s3-cloudfront-deploy-5-route53)
