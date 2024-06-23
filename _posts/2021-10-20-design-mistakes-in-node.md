---
layout: post
title: Design Mistakes in Node
description: ""
date: 2021-10-20
categories:
  - Node
tags: [Node, deno]
---

```text
Deno를 알아 보기전 라이언 달이 jsconf 에서 남긴 유명한 영상을 찾아보게 되었다.
왜 Deno 를 만들었고 Node 를 만들었을때 후회되는 점들에 대한 영상이었다.
```
[Node.js에 관해 후회하는 10가지 - Ryan Dahl - JSConf EU](https://www.youtube.com/watch?v=M3BM9TB-8yA)

<div class="gap-10"></div>

# Node.js와 라이언 달의 후회

자바스크립트로 **이벤트 주도 IO Http Server** 를 만드는데 상당히 많은 심혈을 기울였습니다. **2009**년 당시 저는 이 목표가 매우 중요하다고 생각했습니다. **서버사이드 자바스크립트를** 제대로 만드려면 말이죠

- 여기서 말하는 점은 클라이언트 x, 서버 express 서버, javascript 런타임 엔진 이다

<div class="gap-20"></div>

### 2012년 라이언 달이 Node를 떠나면서 Node의 장점으로 뽑은 것들

- HTTP, HTTPS와 같은 프로토콜 지원
- IOCP(Input/output completion port) 라는 시스템 콜을 사용하여 windows에 노드를 porting 가능
- Linux와 Mac에서도 무리 없이 작동
- API도 안정적이면서 NPM의 등장으로 사람들이 자유롭게 모듈도 추가 가능

### 프로젝트 완료… 완전 틀렸죠!

> 누가 봐도 모든 장비에서 노드가 돌아가게끔 만들려고 엄청나게 노력했다는 것이 보여요.
> 하물며 본인이 만들었음에도 불구하고 *Node보다 Go Language가 더 좋으니 Go를 사용* 하라고 말합니다. 왜냐면 Nodejs 보다 Go 가 더 빠른 서버를 만들기에 적합하기 때문입니다.

> 뭔가 버그를 만든 게 보이는 데 지금 당장은 그게 버그 같지 않게 동작하여 큰 문제처럼 보이지 않습니다. 하지만 버그는 버그인거죠. 그리고 설계상의 결함이 있는 걸 알면서도 지금은 그것을 고칠 수가 없습니다. 왜냐면 이미 너무 많은 소프트웨어에서 사용하고 있기 때문입니다.

<div class="gap-10"></div>

# 후회: 정확하게 10가지는 아니다

### ① Promises를 고집하지 않은 것(Not sticking with Promises)

>Node.js를 작업하는 대부분의 사람들은 이 말에 100% 공감할 겁니다. Node.js의 비동기 호출은 여전히 콜백 API를 기준으로 되어 있습니다. Promises는 Async, Await을 제공하기 위해서 필수였죠. 라이언 달은 2009년에 Promises를 추가했다가 2010년에 삭제한 것을 언급하면서 자신이 Promises를 계속 고집했다면 커뮤니티 소스가 더 빨리 Async Await으로 진보했을 것이라며 후회했습니다.

### ② 보안 문제에 더 신경 쓰지 못한 것(Security)

>Node는 모든 걸 그대로 보여주기 때문에 ***보안이라고는 1도 없습니다.*** Node 응용 프로그램을 실행하면 모든 시스템 콜에 접근 또한 가능해집니다. Node 응용 프로그램이 어떻게 유지되고 발전하는지를 고려했었으면 다른 언어들이 갖지 못할 보안을 가질 수 있었을 텐데 그러지 못하여 아쉬움을 토로했습니다.

### ③ 빌드 시스템(GYP) 1

>처음 노드를 만들 때 크롬 브라우저가 GYP라는 메타 빌드 시스템을 사용하다가 GN으로 업그레이드한 반면, Node.js는 GN으로 변경하지 않아 이를 후회했습니다.

[위키백과: GYP](https://ko.wikipedia.org/wiki/GYP_(%EC%86%8C%ED%94%84%ED%8A%B8%EC%9B%A8%EC%96%B4))

[위키백과: GN](https://ko.wikipedia.org/wiki/GN_(%EB%B9%8C%EB%93%9C_%EC%8B%9C%EC%8A%A4%ED%85%9C))

### ④ 빌드 시스템(GYP) 2

>GYP를 이용해 빌드 시스템을 만들면서 네이티브 콜을 하기 위해서 사용자가 필수적으로 C++ 바인딩을 하도록 했는데, FFI(Foreign Function Interface)를 제공했어야 했다는 아쉬움을 토로했습니다.

[위키백과: 외부 함수 인터페이스](https://ko.wikipedia.org/wiki/%EC%99%B8%EB%B6%80_%ED%95%A8%EC%88%98_%EC%9D%B8%ED%84%B0%ED%8E%98%EC%9D%B4%EC%8A%A4)

### ⑤ 패키지 매니저 파일(package.json) 1

>Node.js는 모듈 시스템을 가지고 있습니다. 이 모듈 시스템을 관리하는 프로그램은 3rd 파티 프로젝트로 떼어 놓는 것이 일반적이죠. 그런데 노드는 npm이라는 패키지 매니저가 관리하는 package.json 파일이 main() 함수에서 찾도록 되어있어 npm에 의존적인 커뮤니티로 만들었다는 점을 스스로 비판했습니다.

>또한, 최근 facebook에서 만든 yarn이라는 패키지 매니저가 npm을 대체하고 있지만 package.json은 그대로 사용하고 있습니다. 의도하진 않았지만 defacto(사실상의 표준)가 된 셈이죠. 또한, 이 package.json 파일은 모듈을 찾을 때 명시적이지 않다는 단점도 있습니다.

<img src="{{ site.url }}/assets/image/2021-10-20-design-mistakes-in-node/package.png" class="col-12">
<br>

### ⑥ 패키지 매니저 파일(package.json) 2

>package.json 파일의 모듈 시스템이 파일 디렉터리를 기준으로 잡히도록 만들어서 라이선스, 리포지터리, 설명 등 모듈 시스템 자체만으로는 **필요 없는 정보까지 다 포함시켜 너무 무거워졌다고** 합니다.

### ⑦ 모듈 시스템(node_modules)

>위에서 언급한 파일 디렉터리 기반 모듈 시스템의 약점과 마찬가지로 모듈을 가져오는 알고리즘이 복잡해졌습니다. 그 중 하나가 resolving 알고리즘인데 이 알고리즘은 미친 듯이 복잡합니다. node_modules 폴더 뒤에 깔린 개념인 vendored-by-default(서드 파티 라이브러리를 디폴트로 같이 설치하는 것)는 연결하는 상대가 어떤 것인지에 대해 정확히 알 수 있도록 한 의도였지만(환경변수처럼), 지금 방식은 브라우저 작동 방식에서 크게 벗어났고, 이는 본인의 실수라고 말합니다. 그리고 이를 되돌릴 수 없다고 합니다.

<img src="{{ site.url }}/assets/image/2021-10-20-design-mistakes-in-node/node_modules.png" class="col-12">
<br>

### ⑧ Require 문법을 쓸 때 js 확장자를 안 써도 되게 한 것

>브라우저 내 자바스크립트가 작동하는 것과 표준이 달라서 모듈 로더가 사용자의 의도를 파악하기 위해 많은 고민을 해야 한다는 점을 언급했습니다.

```javascript
Require("poo") // .js .ts .asd .js .js .as 
Require("poo")
```

### ⑨ index.js
>index.html index.js

>그냥 귀여워서 default를 index.js로 했다고 합니다. 디렉토리를 include할 때 index.js를 살펴보면 귀여울 것 같았다고 합니다. 하지만 이는 불필요한 도입이였습니다. 결과적으로 모듈 로딩 시스템을 더욱 복잡하게 만들었다고 합니다.

### ⑩ Deno
>라이언 달이 Node에 관한 후회에 대해 발표를 한 후 새로 만들고 있는 프로젝트를 공개했는데 그것이 바로 Deno였습니다.

>최소한 프로토타입 같이 뭐라도 대안을 만들어서 내놓지 않고서 사람들 앞에 서서 불평을 늘어놓는 건 형편없는 일이라 생각해요.

<div class="gap-10"></div>
```
최소한 프로토타입 같이 뭐라도 대안을 만들어서 내놓지 않고서 사람들 앞에 서서 불평을 늘어놓는 건 형편없는 일이라 생각해요.

뭔가 버그를 만든 게 보이는 데 지금 당장은 그게 버그 같지 않게 동작하여 큰 문제처럼 보이지 않습니다. 
하지만 버그는 버그인거죠. 
그리고 설계상의 결함이 있는 걸 알면서도 지금은 그것을 고칠 수가 없습니다. 
왜냐면 이미 너무 많은 소프트웨어에서 사용하고 있기 때문입니다.

같은 명언? 아닌 공감가는 말들도 많은 훌륭한 영상이었다고 생각합니다.

다른 포스트에서는 Deno 를 알아보고 어떤 부분들이 Node 와 다른지 알아보겠습니다.
```