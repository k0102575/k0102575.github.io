---
layout: post
title: React 프로젝트 AWS S3, CloudFront에 배포 및 가비아 구매 도메인 연결하기 - 3
description: ""
date: 2021-08-20
categories:
  - CD
tags: [React, AWS S3, AWS CloudFront, CD, Gabia, AWS Route53, AWS ACM]
---

# React 프로젝트 AWS S3, CloudFront에 배포 및 가비아 구매 도메인 연결하기 - 3

```text
회사 퇴직을 하기 전 배포중인 프로젝트의 인수인계를 위하여 문서작업을 진행하게되었습니다.
그래서 겸사겸사 블로그 포스팅도 남겨봅니다.
회사 에서 임시로 qa 라는 배포 환경을 만들면서 진행을 하였고, 현재는 제거 된 구성으로 알고있습니다.
회사 정보가 나올수 있는 부분들은 블라인드 처리를 진행할 것입니다.
도메인은 가비아에서 구매를 하셨기 때문에 가비아를 통한 연동과 route53을 통한 연동 2가지로 구성되어있습니다.
포스트를 1 부터 차근차근 나눴기에 연결되게 보시는것을 추천합니다.
모든 정보는 2021년 8월을 기준으로 하며 aws 및 가비아 측 업데이트로 인하여 바뀐부분은 정확하지 않을수 있습니다.
글로벌한 서비스 말고는 전부 서울 리전을 선택하여 진행하였습니다. 
원하시는 리전 포인트를 설정 하시면 모든 서비스 같이 맞춰주셔야됩니다.
```


### goal - Cloudfront로 https 배포 환경을 위하여 ACM (AWS Certificate Manager) 을 통하여 SSL 인증서를 발급해 봅시다.

- AWS CloudFront 는 https 배포가 필수적입니다.
- 그 과정을 위해 CloudFront 생성 전 ACM 을 진행해 봅시다.
- 주의 : 다른 서비스 와 다르게 꼭 지역을 버지니아 북부로 설정해야됩니다. 
  - cloudfront 에서는 버지니아 북부에서 생성된 ssl 인증서만을 사용할수있습니다.
<br>


#### 간단한 다이어그램

- 정확하게 표현했다고 보긴 어렵지만 간단하게 해당 과정을 통하여 완료된 다이어그램입니다.


<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-1/image14.png" class="col-12">


#### 8. 다음 스탭

- 웹사이트 엔드포인트가 너무나 길며 원하는 url 이 아닙니다.
- 회사에서는 가비아로 도메인을 구입하였기 때문에 가비아를 거쳐 url 접속시 버킷에 접속할수 있게 진행해 보겠습니다.
- 가비아를 통한 설정, 가비아 dns 를 route53에 등록하여 route53을 통한 설정 2가지 스탭으로 포스트를 나눠 2가지 방식을 작성하겠습니다.


## [가비아를 통한 도메인 연결]({{ site.url }}/articles/2021-08/react-s3-cloudfront-deploy-2-gabia)
## [route53을 통한 도메인 연결]({{ site.url }}/articles/2021-08/react-s3-cloudfront-deploy-2-route53)