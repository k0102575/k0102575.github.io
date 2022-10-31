---
layout: post
title: S3, CloudFront에 React 앱 배포 및 가비아 구매 도메인 연결하기(1)
description: ""
date: 2021-08-20
categories:
  - AWS
tags: [React, AWS S3, AWS CloudFront, AWS Route53, AWS ACM, SPA Deploy, Gabia]
---

# S3, CloudFront에 React 앱 배포 및 가비아 구매 도메인 연결하기(1)
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

# goal S3 에 react 프로젝트 정적 웹 호스팅 하기

우선 react 프로젝트를 CloudFront 를 통하여 배포를 하기전 첫번째 단계인 S3 에 react 프로젝트 정적 웹호스팅을 진행해보도록 하겠습니다.
S3 버킷은 서울리전을 선택하였습니다.
<br>

### AWS console에 로그인하여 S3 서비스에 접속

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-1/image0.png" class="col-12">
<br>

### S3 버킷 생성 및 버킷 확인

```
배포할 프로젝트를 업로드할 버킷을 생성해 봅시다.
버킷만들기를 클릭하여 버킷이름을 배포하려는 url 이름으로 작성하시고 리전을 선택한뒤 버킷 만들기를 진행하여 버킷을 생성합니다.
이 단계에서 퍼블릭 엑세스 설정등을 같이 진행해도 되지만 생성후에 따로 진행하겠습니다.
생성된 버킷을 확인하고 버킷을 클릭해 버킷에 접속합니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-1/image1.png" class="col-12">
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-1/image2.png" class="col-12">
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-1/image3.png" class="col-12">
<br>

### S3 정적 웹 사이트 호스팅 설정

```
생성된 버킷에서 프로젝트를 업로드 하고 배포를 진행하기 위해 정적 웹 사이트 호스팅 설정을 해보겠습니다.
접속된 버킷은 객체, 속성, 권한, 지표, 관리, 엑세스 지점이 있으며 속성 탭을 클릭합니다.
그리고 속성탭 맨밑에 있는 정적 웹 사이트 호스팅 편집을 클릭해 웹 사이트 호스팅 설정을 바꿔봅시다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-1/image4.png" class="col-12">
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-1/image5.png" class="col-12">

```
정적 웹 사이트 호스팅을 활성화로 설정하고 호스팅 유형도 정적 웹 사이트 호스팅으로 설정합니다.
우선은 cra 로 빌드된 프로젝트를 업로드 할 예정이기에 인덱스 문서와 오류 문서를 index.html 로 설정하고 변경사항을 저장합니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-1/image6.png" class="col-12">
<br>

### 퍼블릭 엑세스 차단 비활성화

```
버킷을 정적 웹 사이트 호스팅만 설정한다고 해서는 끝이 아닙니다. 버킷에 대한 권한을 수정하여 버킷에 접근할수있게 해보겠습니다.
버킷에 권한 탭을 클릭합니다.
퍼블릭 엑세스 차단 편집을 클릭하여 차단을 해제한뒤 속성을 저장하겠습니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-1/image7.png" class="col-12">
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-1/image8.png" class="col-12">
<br>

### 버킷 정책 변경

```
버킷에 권한 탭에서 버킷정책을 설정해보겠습니다.
버킷 정책은 json 으로 작성된 정책을 넣어 해당 버킷에 관한 권한 등을 설정할수있으며 해당 정책을 변경함으로써 많은 설정등이 가능합니다.
자세한 설명은 다른 포스트에서 진행? 할지 모르겠지만 우선 정책을 변경해봅시다.
버킷 정책에서 편집을 클릭합니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-1/image9.png" class="col-12">

```
S3 에 모든 object 를 읽을수 있게 정책을 설정합니다.
정책 생성기를 통하여 다른 정책들을 확인하고 생성을 할수있습니다.
정책을 입력후 변경사항을 저장합니다. 이제 프로젝트를 정적 웹사이트 호스팅을 통하여 배포할수 있는 준비가 완료되었습니다.
```
```json
{
   "Version":"2012-10-17",
   "Statement":[
      {
         "Sid":"PublicReadGetObject",
         "Effect":"Allow",
         "Principal":"*",
         "Action":"s3:GetObject",
         "Resource": ["arn:aws:s3:::버킷이름", "arn:aws:s3:::버킷이름/*"]
      }
   ]
}
```
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-1/image10.png" class="col-12">
<br>

### 프로젝트 업로드

```
저는 cra로 만든 프로젝트에 Hello World 라고 타이핑 하여 진행하겠습니다.
react build를 하여 정적 빌드를 하는 과정은 생략하겠습니다.
업로드는 간단합니다. 업로드 버튼을 클릭하여 폴더를 선택하여도 되고 드래그 엔 드롭으로 버킷에 업로드를 진행해도 됩니다.
아까 호스팅 설정을 하면서 진행했던 index.html 파일이 있는지 유의하고 진행합시다
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-1/image11.png" class="col-12">
<br>

### 정적 웹 호스팅 url로 프로젝트를 접속해 봅시다.

```
버킷 속성 탭 정적 웹 호스팅 을 가보면 버킷 웹 사이트 엔드포인트가 표시됩니다.
해당 url 을 복사하여 사이트를 접속하면 업로드 했던 프로젝트로 접속되는걸 확인할수있습니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-1/image12.png" class="col-12">
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-1/image13.png" class="col-12">
<br>

### 간단한 다이어그램

정확하게 표현했다고 보긴 어렵지만 간단하게 해당 과정을 통하여 완료된 다이어그램입니다.

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-1/image14.png" class="col-12">


### Finish

```text
웹사이트 엔드포인트가 너무나 길며 원하는 url 이 아닙니다.
회사에서는 가비아로 도메인을 구입하였기 때문에 가비아를 거쳐 url 접속시 버킷에 접속할수 있게 진행해 보겠습니다.
가비아를 통한 설정, 가비아 dns 를 route53에 등록하여 route53을 통한 설정 2가지 스탭으로 포스트를 나눠 2가지 방식을 작성하겠습니다.
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
