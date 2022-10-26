---
layout: post
title: React 프로젝트 AWS S3, CloudFront에 배포 및 가비아 구매 도메인 연결하기 - 4
description: "CloudFront 생성하기"
date: 2021-08-20
categories:
  - CD
tags: [React, AWS S3, AWS CloudFront, CD, Gabia, AWS Route53, AWS ACM]
---

# React 프로젝트 AWS S3, CloudFront에 배포 및 가비아 구매 도메인 연결하기 - 4

```text
회사 퇴직을 하기 전 배포중인 프로젝트의 인수인계를 위하여 문서작업을 진행하게되었습니다.
그래서 겸사겸사 블로그 포스팅도 남겨봅니다.
```

## 참고사항 (모든 스텝 동일 합니다. 스탭별 추가 유의사항은 goal 에 작성하겠습니다)
- 회사 에서 임시로 qa 라는 배포 환경을 만들면서 진행을 하였고, 현재는 제거 된 구성으로 알고있습니다.
   - 회사 정보가 나올수 있는 부분은 블라인드 처리를 진행할 것이며 설정과 무난한 정보들입니다. (기존 설정 데이터)
- 이미지에 보시면 노란색 박스 로 표시된 부분들을 집중해서 보시면 됩니다.
- 도메인은 가비아에서 구매를 하였기 때문에 도메인 연결은 가비아를 통한 연동과 route53 을 통한 연동 2가지로 구성되어있습니다.
   - 상황에 맞게 설정하셔서 스탭 진행해주시면 됩니다 :)
   - 가비아를 통한 도메인 연결은 qa.eneryx.co.kr
   - route53을 통한 도메인 연결은 qa.stfinc.kr
   - 이렇게 2가지 url 로 진행됩니다
- 포스트를 1 부터 차근차근 나눴기에 연결되게 보시는것을 추천합니다.
- 모든 정보는 2021년 8월을 기준으로 하며 aws 및 가비아 측 업데이트로 인하여 바뀐부분은 정확하지 않을수 있습니다.
<br>


## goal - CloudFront를 사용하여 S3 에 올린 프로젝트를 연결해봅시다.

- 실제 배포에 사용할 서비스인 CloudFront 를 생성하고 프로젝트를 연결해 봅시다.
- CloudFront 및 ssl 의 장점 은 다른 포스트에서 설명해 보도록 하겠습니다.
- CloudFront 는 글로벌 리전 입니다. 
  - 실제 서비스는 버지니아 북부에서 진행되어 SSL 이 버지니아 북부에서 생성된것만 연결 가능한것으로 알고있습니다.
- CloudFront 는 설정 할게 다른 서비스 와 달리 많이 있습니다. 각각 설명을 최대한 자세히 작성해 놓도록 하겠습니다.
<br>

### 1. CloudFront 접속

- AWS Console 에서 CloudFront 로 접속합니다.
- 기존CloudFront을 처음 들어오게 되면 설명 화면이 나오며 조금 차이가 있을수 있습니다.
- Create distribution 을 눌러 생성을 진행해 봅시다.

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-4/image1.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-4/image2.png" class="col-12" />
<br>

### 2. CloudFront 생성 : 이름 입력 및 S3 버킷 접근 권한

- Origin domain 에 S3 프로젝트 버킷 웹 호스팅 URL을 작성합니다.
- 그리고 Name 에도 똑같이 작성을 해줍니다.
- S3 bucket access 는 Cloudfront 만으로 프로젝트를 접속하게 되면 현재까지 설정되어있는 S3 버킷 직접 접근 권한이 사라져도 됩니다.
  - 그 권한 설정을 도와주는 옵션이며 저희는 이 포스트 마지막에서 그 과정을 직접 작성하면서 진행할 예정이라 Don't use OAI 를 선택하였습니다.

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-4/image3.png" class="col-12" />
<br>

### 3. CloudFront 생성 : 캐시 설정 및 HTTP & HTTPS 설정

- Viewer 에 보면 3가지 옵션이 있습니다.
  - HTTP ans HTTPS (Http, Https 같이 사용)
  - Redirect HTTP to HTTPS (Http 요청을 Https 로 리다이렉트)
  - HTTPS only (Https 만 사용)
- 저희는 Https 설정만을 사용하고 Http 요청으로 들어온 사람도 Https 로 사용시키기 위해 Redirect HTTP to HTTPS 로 설정하겠습니다.
- 캐시 정책은 여러 가지의 캐시 정책을 설정할수있지만 우선은 추천으로 설정하겠습니다.

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-4/image5.png" class="col-12" />
<br>

### 4. CloudFront 생성 : 지역 선택 및 CNAME 추가, SSL 설정

- CloudFront 지역 설정을 진행해 봅시다.
  - 해당 설정에 따라 사용 금액 차이가 있을수 있으며 포스트에서는 best performance 인 all edge location 으로 설정합니다.
- CNAME 은 실제 배포 url 을 작성해 줍시다.
- SSL 인증서는 select box를 클릭하면 입력된 url 에 맞게 인증서가 로딩됩니다.
  - 사용하려는 인증서에 맞게 설정하시면 됩니다.
  - 인증서가 뜨지 않는다면 ACM 이 버지니아 북부에 생성되었는지 검증이 완료 되었느지 확인해 보셔야됩니다.

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-4/image7.png" class="col-12" />
<br>

### 5. CloudFront 생성 : 루트 object 설정

- CloudFront 접속시 root object 를 설정해 줍시다. S3 버킷에 있는 root object 를 설정하시면 됩니다.
- 포스트에서는 cra 를 통하여 설정 그대로 build 를 하였기 떄문에 index.html 로 설정합니다.
- 프로젝트 환경에 맞게 설정을 진행해 주시면 됩니다.

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-4/image8.png" class="col-12" />
<br>

### 6. 생성된 CloudFront 확인 및 URL 접속하기

- 생성 버튼을 클릭하면 CloudFront 가 생성됨을 확인할수있습니다.
- 그리고 생성 및 배포 단계를 위해 조금의 시간이 필요하며 Status 가 Enabled 상태 까지 기다려 줍시다.
- Status 가 Enabled 가 되면 Domain name 을 복사하여 브라우저에서 접속을 해봅시다.
- 실제 업로드한 프로젝트가 접속됨을 확인할수 있습니다.

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-4/image9.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-4/image10.png" class="col-12" />
<br>

### 7. S3 버킷 호스팅 주소로 접속하기

- 버킷 웹 호스팅 주소로 접근을 해봅시다. 접근이 가능함을 확인할수 있습니다.
- 이렇게 되면 저희가 원하는 Https 접근이 아닙니다.
- 그렇기 때문에 Cloudfront 생성 시에 확인하였던 Don't use OAI 를 버킷 권한에 추가하여 Cloudfront 로만 접근할수 있게 설정해봅시다.

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-4/image11.png" class="col-12" />
<br>

### 8. S3 버킷 권한 수정하기

- 다시 S3로 접속하여 버킷 정책 편집으로 접속합니다.
- 기존에 설정되어있던 "PublicReadGetObject" 이 설정 떄문에 버킷 직접 접근이 가능합니다.
  - 해당 설정을 지워줍시다.
- 그리고 이번엔 Cloudfront 로 해당 버킷을 접근할수 있는 설정을 추가합니다.
  - 생성된 CloudFront ID 와 도메인 이름을 맞게 설정합니다.

```json
{
  "Sid": "1",
  "Effect": "Allow",
  "Principal": {
      "AWS": "arn:aws:iam::cloudfront:user/CloudFront Origin Access Identity 클라우드프론트ID"
  },
  "Action": "s3:GetObject",
  "Resource": "arn:aws:s3:::도메인이름/*"
},
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-4/image12.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-4/image13.png" class="col-12" />
<br>

### 9. 다시 S3 버킷 호스팅 주소로 접속하기

- 다시 S3 버킷 호스팅 주소로 접속해 봅시다.
- 접근 권한이 없다는 화면이 노출됩니다.
- 그러면 이제 S3 버킷은 Cloudfront 를 통하여만 접근이 가능하고 Cloudfront 설정에 맞춰 https로만 접근이 가능해집니다.

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-4/image14.png" class="col-12" />
<br>

### 간단한 다이어그램

- 정확하게 표현했다고 보긴 어렵지만 간단하게 해당 과정을 통하여 완료된 다이어그램입니다.
- S3 와 CloudFront 선이 빠졌네요 참고해주세요.

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-4/image15.png" class="col-12">
<br>

### 다음 스탭

- 이제 모든 준비가 완료 되었습니다.
- 기존에 S3 로 도메인 연결 하던 사항을 Cloudfront 로 바꾸어 원하는 URL 로 프로젝트를 https 로 접근할수 있게 해봅시다.
- 다음 스텝도 가비아, Route53 으로 나누어 진행됩니다.

## [cloudfront 생성]({{ site.url }}/articles/2021-08/react-s3-cloudfront-deploy-4)