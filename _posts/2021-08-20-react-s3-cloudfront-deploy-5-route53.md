---
layout: post
title: S3, CloudFront에 React 앱 배포 및 가비아 구매 도메인 연결하기(5):Route53
description: ""
date: 2021-08-20
categories:
  - AWS
tags: [React, AWS S3, AWS CloudFront, AWS Route53, AWS ACM, SPA Deploy, Gabia]
---

# S3, CloudFront에 React 앱 배포 및 가비아 구매 도메인 연결하기(5):Route53
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

# goal - S3 버킷에 올린 React 프로젝트를 Route53 연결을 통하여 Cloudfront 를 통해 https 접속하기

- 긴 여정의 마지막 단계 입니다.
- 전 스텝에서 진행된 Route53 을 통해 S3 프로젝트로 연결 되고있습니다.
- 해당 서브도메인을 S3 가 아닌 Cloudfront 로 연결하여 원하는 도메인 으로 https 접속을 진행해보겠습니다.
<br>

### AWS Route53 접속

```
기존 S3 도메인 연결 과정과 똑같습니다. AWS Console 을 로그인하여 Route53 서비스에 접속합니다.
설정하였던 호스팅영역으로 접속합니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-5-route53/image1.png" class="col-12" />
<br>


### 기존 도메인 S3 연결을 Cloudfront 연결로 수정하기

```
기존 S3 버킷으로 연결 되었던 레코드 설정을 찾습니다.
레코드 편집을 클릭하여 편집단계를 접속합니다.
기존 트래픽 라우팅 대상을 "CloudFront 배포에 대한 별칭"으로 설정하면 밑에 자동으로 Selectbox Option이 변경됩니다.
Cloudfront 주소로 설정뒤 저장을 하여 마무리 합니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-5-route53/image2.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-5-route53/image3.png" class="col-12" />
<br>


### 설정한 URL로 접속하기

```
설정한 레코드의 URL로 브라우저로 접속해봅시다.
Cloudfront 에 설정한 대로 http 로 접속하여 https 로 리다이렉트 되는지도 확인합니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-5-route53/image4.png" class="col-12" />
<br>


### Finish

```text
모든 과정이 끝이 났습니다.
가비아를 도메인 연동을 통해 Cloudfront 를 연결하여 브라우저 url 입력시 S3 에서 웹호스팅 한 프로젝트에 https 접속을 진행할수있게 되었습니다.
실제 프로젝트 운영중에는 이 과정 말고도 캐시 정책, 에러 정책 등 여러가지 정책이 추가되어야합니다.
프로젝트에 맞게 추가 설정 및 배포 단계에 있어서는 다른 포스트에서 진행해보도록 하겠습니다~
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
