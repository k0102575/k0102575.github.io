---
layout: post
title: S3, CloudFront에 React 앱 배포 및 가비아 구매 도메인 연결하기(3)
description: ""
date: 2021-08-20
categories:
  - AWS
tags: [React, AWS S3, AWS CloudFront, AWS Route53, AWS ACM, SPA Deploy, Gabia]
---

# S3, CloudFront에 React 앱 배포 및 가비아 구매 도메인 연결하기(3)
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

## goal - Cloudfront로 https 배포 환경을 위하여 ACM (AWS Certificate Manager) 을 설정해 SSL 인증서를 발급하기

- AWS CloudFront 는 https 배포가 필수적입니다.
- 그 과정을 위해 CloudFront 생성 전 ACM 을 진행해 봅시다.
- 주의 : 다른 서비스 와 다르게 꼭 지역을 버지니아 북부로 설정해야됩니다. 
  - cloudfront 에서는 버지니아 북부에서 생성된 ssl 인증서만을 사용할수있습니다.
<br>

### ACM 접속

```
AWS Console 에서 ACM (Certificate Manager) 로 접속합니다.
버니지아 북부 리전 설정을 꼭! 확인합니다.
기존 ACM을 처음 들어오게 되면 조금 차이가 있을수 있습니다.
인증서 요청 버튼을 눌러 인증서를 발급해 봅시다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-3/image1.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-3/image2.png" class="col-12" />
<br>

### ACM 인증서 유형 선택

```
인증서 요청으로 접속하면 인증서 유형을 선택해야됩니다.
저희는 당연히 공인 인증서로 요청합니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-3/image3.png" class="col-12" />
<br>

### 도메인 이름 추가

```
해당 인증서에서 사용 할수있는 도메인 이름을 추가 합시다.
상황에 맞게 이 인증서에 다른 이름을 추가하여 배포 하려는 SSL 에 맞게 인증서를 요청할수있습니다.
저는 * 와일드 카드로 모든 도메인에 설정할수 있게 진행하였습니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-3/image4.png" class="col-12" />
<br>

### 검증 방법 선택

```
SSL 인증서 요청을 검증하는 방법을 선택해야 됩니다.
DNS, 이메일 검증 2가지 방식이 있으며 이메일 검증은 가입된 이메일을 통하여 검증하는 방식이기에 간단합니다.
저희는 Route53 을 통한 DNS 검증을 진행하기 위해 DNS 검증을 선택후 다음을 단계로 넘어갑니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-3/image5.png" class="col-12" />
<br>

### 태그 추가

```
다른 여타 AWS 서비스에서 처럼 인증서도 태그를 추가 할수있습니다.
각 상황에 맞게 태그 이름 및 값을 작성하여 관리 하면 됩니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-3/image6.png" class="col-12" />
<br>

### SSL 인증서 요청전 검토 진행

```
지금 까지 설정한 상황이 맞는지 검토해 봅시다.
도메인 이름, 검증방법이 맞게 설정되었는지 검토 하고 확인 및 요청을 눌러 다음 단계로 넘어갑니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-3/image7.png" class="col-12" />
<br>

### 검증 요청

```
이메일 검증과 DNS 검증이 다를수 있습니다.
사용자 도메인 구성에 다음 CNAME 으로 값을 추가 하여 검증을 진행하면 됩니다.
저희는 Route53 이 구성되어있기 때문에 Route 53 에서 레코드 생성 버튼을 클릭하여 자동으로 AWS 가 생성해주는기능을 사용해봅시다.
레코드 생성 모달이 뜨면 값을 확인후 생성버튼을 클릭합니다.
생성 성공을 확인 하고 실제 Route53 서비스 로 접속하면 해당 레코드로 추가되어있는것을 확인할수있습니다.
검증은 30분까지 소요 될수 있다고 적혀있고 실제 설정시 조금의 시간이 필요하였습니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-3/image8.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-3/image9.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-3/image10.png" class="col-12" />
<br>

### 검증 확인

```
조금의 시간이 지난뒤 ACM 서비스를 다시 접속하여 생성한 SSL 인증서 검증이 성공 하였는지 확인해봅시다!
검증이 성공 되었으면 인증서 발급이 완료된것입니다~
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-3/image11.png" class="col-12" />
<br>

### 간단한 다이어그램

- 정확하게 표현했다고 보긴 어렵지만 간단하게 해당 과정을 통하여 완료된 다이어그램입니다.


<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-3/image12.png" class="col-12">
<br>

### Finish

```
생성된 인증서를 사용하여 cloudfront 생성을 진행해 봅시다.
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
