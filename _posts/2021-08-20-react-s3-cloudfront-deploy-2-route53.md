---
layout: post
title: S3, CloudFront에 React 앱 배포 및 가비아 구매 도메인 연결하기(2):Route53
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

# goal 구입한 도메인을 Route53으로 연결하여 S3 프로젝트 접속 하기

- 웹사이트 엔드포인트가 너무나 길며 원하는 url 이 아닙니다.
- 가비아 에 도메인을 구매 했다고 하지만 다른 모든 서비스는 AWS를 사용합니다.
- 그래서 DNS 관리를 Route53 에서 진행하기 위하여 호스팅 생성 및 가비아에 네임서버 등록을 진행해 봅시다.
<br>

### AWS Route 53 에 접속 및 호스팅 생성 페이지 접근

```
AWS Route 53 서비스에 접속합니다.
Route 53 은 S3 와 다르게 글로벌할 서비스 입니다. 지역 설정은 크게 신경 안쓰셔도 됩니다.
그리고 호스팅 영역을 클릭합니다.
위에 페이지를 업데이트 할 수 없습니다 는 무시해주세요
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-route53/image1.png" class="col-12" />
<br>

### 호스팅 영역 생성

```
접근된 페이지에서 호스팅 영역 버튼을 클릭 호스팅 영역 생성 페이지 로 접근합니다.
저는 기존 회사에서 사용 하던 호스팅 영역들이 있었기 때문에 화면이 처음 생성하시는분들에게는 다를수 있지만 호스팅 영역 생성으로 접근하시면 됩니다.
도메인 이름에 구매했던 도메인을 입력, 유형을 퍼블릭 호스팅 영역으로 설정하고 생성을 진행합니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-route53/image2.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-route53/image3.png" class="col-12" />
<br>

### 생성된 호스팅 영역에서 NS (네임서버) 값 확인

```
생성된 호스팅을 보면 NS, SOA 레코드 값이 생성되어있는걸 볼수있습니다.
생성 된 NS 값은 .을 포함하여 4개가 주어졌고 이 값을 가비아 (도메인 구입 처)에 등록하여 Route 53으로 전황해주는 설정을 통해 Route 53 에서 DNS 를 관리할수있게 됩니다.
이제 저 네임 서버 값을 사용해야 되니 다른곳에 복사를 하거나 새로운 탭을 켜서 가비아 (도메인 구입처)로 들어가 봅시다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-route53/image4.png" class="col-12" />
<br>

### 가비아 도메인 관리툴 접속하기

```
도메인을 구입했던 계정으로 로그인 합니다.
My 가비아로 접속합니다.
이용중인 서비스 전체보기로 접속합니다.
구입했던 도메인의 관리툴로 접속합니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-route53/image5.png" class="col-12" />

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-route53/image6.png" class="col-12" />

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-route53/image7.png" class="col-12" />
<br>

### 가비아 네임 서버에 AWS Route53 네임서버 값 적용하기

```
네임서버 설정 으로 접속합니다.
Route53 에 호스팅 영역에 있던 NS 값을 입력해 줍니다.
꼭! . 을 포함하여 4가지를 다 입력해 주셔야 됩니다.
또한 공백도 유의하여 작성해 주셔야 됩니다!
적용을 눌러 저장하고 NS 가 적용되는데는 시간이 다소 걸릴수 있으니 이점 유의해 주시면 됩니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-route53/image8.png" class="col-12" />

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-route53/image9.png" class="col-12" />
<br>

### Route 53 단순 레코드 정의로 접속해봅시다.

```
다시 Route 53 서비스로 돌아와 레코드 생성 으로 접속합니다.
저희가 할것은 단순라우팅 연결이므로 단순라우팅으로 접속
추가 레코드를 정의 하기 위해 단순 레코드 정의쪽으로 접속합니다.
기존 레코드가 있거나 하시면 화면이 다를 수있으나 단순 레코드 정의 버튼으로 접속하시면 됩니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-route53/image10.png" class="col-12" />

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-route53/image11.png" class="col-12" />

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-route53/image12.png" class="col-12" />
<br>

### 만들었던 S3 레코드 추가 하여 저장하기

```
생성했던 S3 Url 에 맞추기 위해 서브 도메인을 작성합니다.
레코드 유형을 A 로 설정한뒤 연결하기 위한 S3 및 리전을 설정하면 맨 밑 select 박스가 맞춰서 검색되고 설정할수 있게 됩니다.
꼭 설정했던 S3 및 리전을 맞추셔야 AWS 가 조회해 주어 편하게 설정할수 있습니다.
추가된 레코드 이름, 유형, 트래픽 대상을 확인한뒤 레코드 생성을 진행합니다.
진행하게 되면 Route53 에 값이 저장된걸 확인하실수있습니다.
해당 과정이 가비아 에서 했던 도메인 관리 레코드 한줄 생성과 똑같습니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-route53/image13.png" class="col-12" />

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-route53/image14.png" class="col-12" />
<br>


### url 로 접속하기

```
이제 설정이 다 끝났습니다.
브라우저 를 실행하여 설정된 URL 을 입력하여 접속한뒤 업로드하였던 프로젝트로 접속되는지 확인해 봅시다
접속이 되지 않으신다면 NS 설정이 잘못되었는지 확인 다시 한번해주시고
NS 설정이 적용되도 최대 1일 정도 시간이 걸릴수있습니다.
```

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-route53/image15.png" class="col-12" />
<br>


### 간단한 다이어그램

정확하게 표현했다고 보긴 어렵지만 간단하게 해당 과정을 통하여 완료된 다이어그램입니다.
Client 와 Route 53 사이에 가비아의 연결 과정이 추가적으로 있다고 생각하시면 됩니다.

<img src="{{ site.url }}/assets/image/2021-08-20-react-s3-cloudfront-deploy-2-route53/image16.png" class="col-12" />
<br>

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
