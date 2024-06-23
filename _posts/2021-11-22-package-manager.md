---
layout: post
title: package manager - (Npm, Yarn, Pnpm)
description: ""
date: 2021-11-22
categories:
  - package manager
tags: [Npm, Yarn, Pnpm]
---

# package manager - (Npm, Yarn, Pnpm)

<div class="gap-15" ></div>

## Npm 의 탄생 배경 및 간단한 설명

- 2009년에 Node.js 를 발표한 Ryan Dahl
- 그리고 그 Node.js 를 사용하던 Yahoo 의 개발자 Issac 은 Ryan Dahl 에게 패키지 매니저에 대한 제안을 한다.
- [Preview: npm, the node package manager](https://groups.google.com/g/nodejs/c/erDWyS4xPw8?pli=1)
- 이 제안을 받아드려 Ryan Dahl 은 npm 을 2010년 1월에 탄생시켰다.
- 초기 npm 은 이러한 특징을 가졌었다.
1. 여러 버전의 동일한 패키지를 한 프로젝트에서 사용할 수 있게 하자.
2. 설치 방식을 통일하자. (npm install some-package)
3. 패키지 관련정보가 들어있는 메타 데이터를 간소화하자. (package.json)
4. 누구나 배포할 수 있도록 하자.
- Node.js 인기및 npm 자체의 인기를 토대로 엄청난 성장 및 다운로드 수가 증가하였다.
- 하지만! Ryan Dahl 도 node, npm 에 대한 단점을 지적하며 deno를 만들었던것 처럼 Facebook, Google, Exponent, Tilde 는 Npm 의 단점을 보안하기 위해 Yarn 을 개발 및 배포한다.

<div class="gap-15" ></div>

## 우선, Yarn 이 나온 이유를 알아보기 위해 기존 **Npm 의 단점 을 알아보자**

### 1. npm v2 는 모든 종속성 패키지를 중첩방식으로 설치를 하였다.

- [https://npm.github.io/how-npm-works-docs/npm2/how-npm2-works.html](https://npm.github.io/how-npm-works-docs/npm2/how-npm2-works.html)

<img src="{{ site.url }}/assets/image/2021-11-22-package-manger-1/npmv2.png" class="col-4" />

>사용하는 Package 에서 종속된 패키지를 사용하는것이 많으면 많을수록 node_modules 는 깊어졌고  Package 에서 중복으로 사용하는 패키지가 많으면 많을수록 중복성은 높았다. 

> 해당 방식은 중복된 패키지로 인한 용량 및 설치 속도 측면에 문제가 있었고 아래와 같이 긴 경로는 경로 문자 수 제한이 있었던 Windows 에서도 문제가 있었다. 
>./node_modules/package-A/node_modules/package-B/node_modules/package-C

### 2. npm v2 는 유의미적 버전 방식을 도입 node 에서의 node-semver을 사용하여 개발자들의 버전 관리에 대한 방향성을 제공하였다.

- node-semver: **시멘틱 버전 체크를 위한 노드 모듈**
- 유의미적 버전 방식: [https://semver.org/lang/ko/](https://semver.org/lang/ko/)

>하지만 이 방식은 개발자들 간의 패키지가 달라지는 단점이 생성이 되었다.
>단순하게 누구는 업데이트를 하고 누구는 업데이트를 하지 않았기 때문이다.

### 3. npm v5 이전에는 package-lock.json 이 없었다.

>package-lock.json 이 없고 npm-shrinkwrap.json 을 수동으로 생성 및 관리를 하였어야 했다.
>그렇기 때문에 pacakge-lock.json 이 없을때의 문제점이 발생을 하였다.

- [package-lock.json 란?](/articles/2021-11/package-lock-json)

### 4. 보안성이 문제가 되었다.

>npm은 의존 관계를 가지는 다른 패키지들이 즉시 포함되도록 한다. 
>이런 부분이 더 편리하긴 한데 보안 문제에 있어 여러 취약점들을 불러올 수 있다고 한다. 
>이게 커지면 나중에는 더 큰 문제로 발전할 수도 있다는 것. 

## 그러면 npm 은 가만히 있었어? Yarn 나올때 쯤에 뭘했는데? npm v3

>npm v3 가 올라가면서 기존의 중첩방식의 문제를 해결하기 위해 공통 버전의 패키지는 flat(평평) 하게 처리 하는 방식으로 변경되었다.
>그리고 해당 방식은 Yarn 에서도 사용을 한다.

<img src="{{ site.url }}/assets/image/2021-11-22-package-manger-1/npmv3.png" class="col-4" />

[https://npm.github.io/how-npm-works-docs/npm3/how-npm3-works.html](https://npm.github.io/how-npm-works-docs/npm3/duplication.html)

<div class="gap-40"></div>

# Yarn

<div class="gap-10"></div>

## Yarn 이 생각한 npm 의 단점 (v.2)

- lock 파일의 부재, 수동으로 생성해야 함
- 의존성 트리가 다를 수 있음
- 느린 퍼포먼스
- 오프라인 모드가 지원이 되지 않는다.
- 보안성이 떨어진다.

<div class="gap-10"></div>

## Yarn 이 npm 의 문제를 해결한 방법

### 1. lock 파일의 부재

- yarn.lock 을 자동으로 생성하게 함으로써 문제를 해결하였다. v1 자동생성됨

### 2. 의존성 트리가 다를 수 있음

- 자동으로 생성되는 lock 파일은 각 패키지의 버전에 따른 체크섬(checksum) 값을 가졌기 때문에 어떤 환경에서든 해당 프로젝트의 사용자가 동일한 패키지를 설치하는 것이 가능하게 되었다.

### 3. 느린 퍼포먼스

- npm 은 패키지들을 순서대로 설치하는 방식을 사용하는 반면에 yarn은 병렬적으로 패키지를 설치함으로써 느린 속도를 해결하였다.
- 또한 캐시를 둠으로써 캐시를 사용해 퍼포먼스 적인 측면에 도움을 주었다.

### 4. 오프라인 모드

- npm 은 오프라인 미러를 지원하지 않는 방면 yarn 은 오프라인 미러를 둠으로써 오프라인 상황에서도 패키지를 설치할수 있게 하였다.

### 5. 보안성

- yarn은 yarn.lock이나 package.json으로 적혀 패키지를 설치한다.

<div class="gap-10"></div>


## 2016년 당시의 npm vs yarn

<img src="{{ site.url }}/assets/image/2021-11-22-package-manger-1/npm-yarn.png" class="col-12" />

> 하지만 npm 도 v5 에서 package-lock.json 을 자동으로 생성하고 캐시문제를 업데이트 하면서 기존의 문제점들을 해결하고 발전을 해왔다.

> 그렇기 때문에 지금날 npm을 써도 개발자 입장에서는 크게 무방한 프로젝트들이 많다. (개인 의견)

<div class="gap-10"></div>

## tmi) 현재 오늘날의 npm vs yarn

[Package Manager Benchmarks](https://p.datadoghq.eu/sb/d2wdprp9uki7gfks-c562c42f4dfd0ade4885690fa719c818?tpl_var_npm=%2A&tpl_var_pnpm=%2A&tpl_var_yarn-classic=%2A&tpl_var_yarn-modern=%2A&tpl_var_yarn-nm=%2A&tpl_var_yarn-pnpm=no&from_ts=1634959555606&to_ts=1637551555606&live=true)

<div class="gap-10"></div>

## 그러면 yarn 은 단점이 없었어?

- 결론부터 말하자면 아니다. yarn 도 npm도 공통적으로 해결하지 못한 문제점이 있었다.

### 1. **Phantom dependencies (유령 의존성)**

- NPM 및 Yarn v1에서는 중복해서 설치되는 node_modules를 아끼기 위해 끌어올리기(Hoisting) 기법을 사용한다. 패키지들을 flat 하게 만들어 주던 기법

<img src="{{ site.url }}/assets/image/2021-11-22-package-manger-1/yarn-berry-2.png" class="col-12" />

- 그런데 이러한 변경은 해당 프로젝트가 직접 의존하고 있지도 않은 라이브러리를 require 해줄수 있게 된다.
- 위의 그림을 예시로 설명하면 package-1 에서 require(b) 를 사용할수 있게 되는거다.
- 이러한 현상을 유령 의존성이라고 하며 이런 현상은 의존성 관리 시스템을 혼란스럽게 만든다.

### 2. 의존성을 플랫 하게 만드는 알고리즘과 비효율적인 의존성 검색

- npm 과 yarn 은 의존성을 플랫 하게 만들기 위하여 알고리즘을 사용하는데 이 해당 알고리즘이 상당히 복잡하다고 한다. 자세한 설명은 생략한다.
- 또한 npm 과 yarn 은 파일 시스템을 통하여 의존성을 관리하기 때문에 의존성을 검색하기 위해서 상당한 비효율적인 동작이 된다.
- 밑에 toss tech의 예시를 보자

```jsx
예를 들어, /Users/toss/dev/toss-frontend-libraries 폴더에서 
require() 문을 이용하여 react 패키지를 불러오는 상황을 가정합시다.

라이브러리를 찾기 위해 순회하는 디렉토리의 목록을 확인하려고 할 때, 
Node.js에서 제공하는 require.resolve.paths() 함수를 사용할 수 있습니다. 
이 함수는 NPM이 검색하는 디렉토리의 목록을 반환합니다.

Welcome to Node.js v12.16.3.
Type ".help" for more information.
> require.resolve.paths('react')
[
  '/Users/toss/dev/toss-frontend-libraries/repl/node_modules',
  '/Users/toss/dev/toss-frontend-libraries/node_modules',
  '/Users/toss/node_modules',
  '/Users/node_modules',
  '/node_modules',
  '/Users/toss/.node_modules',
  '/Users/toss/.node_libraries',
  '/Users/toss/.nvm/versions/node/v12.16.3/lib/node',
  '/Users/toss/.node_modules',
  '/Users/toss/.node_libraries',
  '/Users/toss/.nvm/versions/node/v12.16.3/lib/node'
]

목록에서 확인할 수 있는 것처럼, 
NPM은 패키지를 찾기 위해서 계속 상위 디렉토리의 node_modules 폴더를 탐색합니다. 
따라서 패키지를 바로 찾지 못할수록 readdir, stat과 같은 느린 I/O 호출이 반복됩니다. 
경우에 따라서는 I/O 호출이 중간에 실패하기도 합니다.

tmi) 
TypeScript 4.0까지는 node_modules를 이용한 패키지 탐색이 너무 비효율적인 나머지, 
패키지를 처음으로 import 하기 전까지는 node_modules 내부의 타입 정보를 찾아보지 않기도 했습니다.
```

### 3. 오프라인 모드 및 캐시를 사용하기 위하여 프로젝트의 node_module 를 복사한다.

- 이로 인하여 무거운 I/O 연산이 일어난다.
- 또한 yarn 같은 경우는 최초의 install 상황에서 캐시를 하기 위해 많은 시간을 소요하게 된다.

<img src="{{ site.url }}/assets/image/2021-11-22-package-manger-1/npm-yarn.png" class="col-12" />

## 위와 같은 단점  때문에 yarn 이 나오고도 실망한 사람들이 있었고

## 이 문제점을 해결하기 위해 또 다른 패키지 매니저가 등장한다.

- pnpm
- yarn berry

<div class="gap-15"></div>

## PNPM

- 2017년 1월 그렇게 pnpm이 세상에 나오게 된다.
- pnpm 은 npm v2에서 사용하던 패키지 처리방식을 차용하기로 하는데, 각 패키지가 각자의 `node_modules` 를 가지는 구조이다. 
- [https://npm.github.io/how-npm-works-docs/npm2/how-npm2-works.html](https://npm.github.io/how-npm-works-docs/npm2/how-npm2-works.html)
    
- 대신, npm 처럼 깊어지진 않고 **symbolic link, hard link (실질적인 주소를 보는것) 를 사용해서 플랫하게 처리** 하여 완전한 플랫형 구조를 가지게 된다.
- [심볼릭 링크 란?](https://qjadud22.tistory.com/22)
    
<div class="gap-10"></div>

### example

- npm

```jsx
node_modules
  - react 16
  - react-16-package
  - react-17-package
    - node_modules
      - react 17
```

- pnpm

```jsx
node_modules
  - .pnpm
    - node_modules
      - react 16
      - react 17
      - react-16-package
        - node_modules/react 16 (symlink → ../../react 16)
      - react-17-package
        - node_modules/react 16 (symlink → ../../react 17)
  - react-16-package (symlink → ../.pnpm/node_modules/react-16-package)
  - react-17-package (symlink → ../.pnpm/node_modules/react-17-package)
```

>먼저 `node_modules` 에는 직접적인 의존성에 해당하는 패키지들만을 가지고 이는 `.pnpm/node_modules` 에 symbolic link 로 연결된다.

>또한 `.pnpm/node_modules` 안에서는 모든 패키지가 플랫하게 설치되며 서로의 의존성을 띄고 있는 경우 이 또한 symbolic link 로 연결된다. 

>더 놀라운 점은 `.pnpm/node_modules` 의 패키지 파일들은 실제 원본 파일이 아닌 `~/.pnpm-store` 에 있는 패키지 파일들의 hard link 라는 점이다. 

### 단점

**그러나 pnpm도 여전히 다른 문제를 가지고 있긴 하다.**

- 동일한 파일 시스템에서만 사용할 수 있는 hard link 의 문제 때문에 C 드라이브에서 되던 패키지 설치가 D 드라이브에선 깨질 수 있다.
- FAT32 와 같은 파일 시스템에선 hard link/symbolic link 지원을 하지 않고 파일 감시 툴인 Watchman 에서 동작을 하지 않는다. (실제로 내부 툴로 Watchman 을 사용하는 Facebook 이 이것 때문에 [Yarn2 에서 이러한 메커니즘 사용하는 것을 포기했다.](https://github.com/yarnpkg/yarn/issues/499#issuecomment-251583225))
- 주변 쓰는 사람이 많이 없다.

<div class="gap-15"></div>

# 출처 

- [http://www.lingulo.com/tutorials/html/how-to-build-a-responsive-website-the-professional-way](http://www.lingulo.com/tutorials/html/how-to-build-a-responsive-website-the-professional-way)
- [https://npm.github.io/how-npm-works-docs/](https://npm.github.io/how-npm-works-docs/)
- [https://toss.tech/article/node-modules-and-yarn-berry](https://toss.tech/article/node-modules-and-yarn-berry)
- [https://github.com/baeharam/cleancoder.dev/blob/main/content/blog/package-manager-history/index.md](https://github.com/baeharam/cleancoder.dev/blob/main/content/blog/package-manager-history/index.md)