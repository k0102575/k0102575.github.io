---
layout: post
title: React 프로젝트 AWS S3, CloudFront에 배포 및 가비아 구매 도메인 연결하기 - 5 (gabia)
description: "CloudFront 생성하기"
date: 2021-08-20
categories:
  - SPA 배포
tags: [React, AWS S3, AWS CloudFront, SPA 배포, Gabia, AWS Route53, AWS ACM]
---

# React 프로젝트 AWS S3, CloudFront에 배포 및 가비아 구매 도메인 연결하기 - 5

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


## goal - S3 버킷에 올린 React 프로젝트를 가비아 DNS 연결을 통하여 Cloudfront 를 통해 https 접속하기

- 긴 여정의 마지막 단계 입니다.
- 전 스텝에서 진행된 가비아 서브 도메인은 S3 로 연결 되고있습니다.
- 해당 서브도메인을 S3 가 아닌 Cloudfront 로 연결하여 원하는 도메인 으로 https 접속을 진행해보겠습니다.
<br>

### 1. 가비아 DNS 관리툴 접속

- 기존 S3 도메인 연결 과정과 똑같습니다.
- 도메인을 구매한 계정으로 로그인하여 연결 하려는 도메인의 DNS 관리툴로 접속합시다.

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-5-gabia/image1.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-5-gabia/image2.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-5-gabia/image3.png" class="col-12" />
<br>

### 2. 기존 도메인 S3 연결을 Cloudfront 연결로 수정하기

- 기존 S3 버킷으로 연결 되었던 CNAME 설정을 찾습니다.
- 수정 버튼을 눌러 기존에 작성 되었던 S3 버킷 웹 호스팅 URL을 Cloudfront ID 로 변경합니다.
- 꼭 ID 값 뒤에 "."을 찍어주셔야됩니다! (가비아 레코드 저장 필수사항)

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-5-gabia/image4.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-5-gabia/image6.png" class="col-12" />
<br>

### 3. 설정한 URL로 접속하기

- 설정한 레코드의 URL로 브라우저로 접속해봅시다.
- Cloudfront 에 설정한 대로 http 로 접속하여 https 로 리다이렉트 되는지도 확인합니다.

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-5-gabia/image7.png" class="col-12" />
<br>

### 4. Finish

- 모든 과정이 끝이 났습니다.
- 가비아를 통하여 Cloudfront 를 연결하여 브라우저 url 입력시 S3 에서 웹호스팅 한 프로젝트에 https 접속을 진행할수있게 되었습니다.
- 실제 프로젝트 운영중에는 이 과정 말고도 캐시 정책, 에러 정책 등 여러가지 정책이 추가되어야합니다.
- 프로젝트에 맞게 추가 설정 및 배포 단계에 있어서는 다른 포스트에서 진행해보도록 하겠습니다~

## 모든 스텝

## [ACM 생성]({{ site.url }}/articles/2021-08/react-s3-cloudfront-deploy-3)
<h2>테스트트트트</h2>
## [ACM 생성]({{ site.url }}/articles/2021-08/react-s3-cloudfront-deploy-3)
## [ACM 생성]({{ site.url }}/articles/2021-08/react-s3-cloudfront-deploy-3)
