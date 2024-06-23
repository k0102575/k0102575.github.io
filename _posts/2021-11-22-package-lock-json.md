---
layout: post
title: package manager - package-lock.json
description: ""
date: 2021-11-22
categories:
  - package manager
tags: [Npm, package-lock.json]
---

# Package-lock.json

- `package-lock.json`은 npm 또는 yarn으로 패키지를 관리하는 프로젝트의 잠금 파일입니다.
- npm v5부터 도입되었으며 같은 성격의 `yarn.lock`은 yarn v1부터 도입되었습니다.
<div class="gap-15"></div>

## package-lock.json

- `package-lock.json`은 `node_modules` 구조나 `package.json`이 수정되고 생성될 때 당시 의존성에 대한 정확하고 구체적인 정보를 담고 자동으로 생성됩니다.
<div class="gap-15"></div>

## npm v5 이전의 npm-shrinkwrap.json 파일과의 차이점

- `package-lock.json` 파일과 `npm-shrinkwrap.json`은 동일한 형식을 가지고 프로젝트 루트에서 유사한 기능을 수행합니다.
- 기존 npm은 `shrinkwrap`을 통해 수동으로 의존성에 관한 점을 잠궈야 했습니다.
- 하지만 현대적인 npm은 `package-lock.json`이 자동으로 생성되며 의존성을 잠궈줍니다.
- 차이점은 `package-lock.json` 파일은 프로젝트 루트에 있지 않으면 무시된다는 점입니다.
<div class="gap-15"></div>

## 그러면 뭘 잠그면서 뭘 얻을 수 있는데?

- 팀원, 배포 및 지속적인 통합이 정확히 동일한 종속성을 설치하도록 보장하는 종속성 트리의 단일 표현을 제공합니다.
- `node_modules` 디렉토리 자체를 커밋할 필요 없이 이전 상태로 "시간 여행"할 수 있는 기능을 제공합니다.
- 읽을 수 있는 소스 제어 diff를 통해 트리 변경 사항에 대한 가시성을 높일 수 있습니다.
- npm이 이전에 설치된 패키지에 대해 반복되는 메타데이터 확인을 건너뛸 수 있도록 하여 설치 프로세스를 최적화합니다.
- npm v7부터 잠금 파일에는 패키지 트리에 대한 완전한 그림을 얻을 수 있는 충분한 정보가 포함되어 `package.json` 파일을 읽을 필요성이 줄어들고 성능이 크게 향상됩니다.
<div class="gap-15"></div>

## package-lock.json가 없을 때 발생할 수 있는 가장 큰 문제

- A라는 개발자와 B라는 개발자가 같은 프로젝트를 개발 중인데, A 개발자의 PC에서 라이브러리를 사용하여 잘 되던 코드가 B 개발자의 PC에서는 에러가 발생할 수 있습니다.
- 예시:

#### 1. npm 버전이 달라 패키지를 설치하는 알고리즘이 다를 때

```jsx
node 버전이 달랐을 때를 가정한 예시:
(실제로 이렇게 진행될 일은 npm 5버전 이전이나 있었을 것 같습니다.)
A : npm 3을 사용하여 install을 하였을 때 의존성 패키지 정보가 v1.1을 사용
B : npm 4를 사용하여 install을 하였을 때 의존성 패키지 정보가 v1.2를 사용
```

#### 2. 버전 범위 때문에 npm install 시점에서의 의존 패키지 버전이 다를 때

```jsx
package.json: ^16.8.2 이렇게 작성하게 되면 SemVer 규칙에 따라
SemVer 규칙에 따라 16.8.2 이상 17.0.0 미만의 범위로 지정됩니다.

그렇게 되면 npm install을 하는 시점에 따라

개발자 A의 PC: 16.8.2  1월 1일
개발자 B의 PC: 16.8.3  2월 1일
개발자 C의 PC: 16.9.1  3월 1일
개발/상용 서버: 16.10.0 4월 1일

이런 식으로 버전이 형성될 수 있기 때문에 버그가 발생할 확률이 높습니다.
```
<div class="gap-15"></div>

## package-lock.json에서는 어떻게 이 문제를 해결하는가?

- `package-lock.json`에서는 의존성에 대한 버전 정보를 명확하게 작성하며 해당 lock 파일에 작성된 의존성을 토대로 패키지를 설치합니다.
- 따라서 `package-lock.json`을 형상관리 저장소에 올려두면 해당 프로젝트를 다운받는 개발자들은 `package-lock.json`에서의 버전을 명확하게 맞출 수 있게 됩니다.

<div class="gap-15"></div>

## 추가적으로 그러면 version range를 안 하면 되는 거 아닌가?

```jsx
만약 `package.json`에 패키지 버전명을 정확히 명시하게 된다면, 
프로젝트에서 사용하고 있는 패키지의 중요한 버그 수정이 이루어질 때마다 
프로젝트의 `package.json`에 적혀있는 버전도 수정을 해야 하기 때문입니다.

모든 크고 작은 패키지들의 릴리즈에 대해 항상 추적하고 수정해야 하는 엄청난 귀찮음과 수고스러움을 
version range로 명시함으로써 이를 해결해줍니다.
```

<div class="gap-15"></div>

출처
- [npm documentation](https://docs.npmjs.com/cli/v8/configuring-npm/package-lock-json)
- [junwoo45 blog](https://junwoo45.github.io/2019-10-02-package-lock/)
