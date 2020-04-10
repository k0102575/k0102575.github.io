---
layout: post
title: "VS Code - 설정 동기화(Settings Sync)"
description: ""
date: 2020-04-09
categories:
 - IDE
tags: [VSCode, VSCode Extensions, Settings Sync, VSCode 설정 공유]
---

# VS Code - 설정 동기화

집 과 회사 에서 자꾸만 설정 및 키바인딩 Extension 등이 맞지 않아서 찾아보던중
Setting Sync 를 발견하고 포스트를 남긴다.


# Setting Sync

- [market Place Url](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)


# 주요 특징들

```text
1. Use your GitHub account token and Gist.
2. Easy to Upload and Download on one click.
3. Show a summary page at the end with details about config and extensions effected.
4. Auto download Latest Settings on Startup.
5. Auto upload Settings on file change.
6. Share the Gist with other users and let them download your settings.
7. Supports GitHub Enterprise
8. Support pragmas with @sync keywords: host, os and env are supported.
9. GUI for changing settings / logging in
10. Allows you to Sync any file across your machines.
```


# 동기화 항목
  ```text
All extensions and complete User Folder that Contains
1. Settings File
2. Keybinding File
3. Launch File
4. Snippets Folder
5. VSCode Extensions & Extensions Configurations
6. Workspaces Folder
```


# 단축키
```text
1. Upload Key : Shift + Alt + U
2. Download Key : Shift + Alt + D

(on macOS: Shift + Option + U / Shift + Option + D)
```


# 사용법


### 1. Github에서 새로운 토큰을 생성하자.

> Github 로그인 > Settings > Developer settings > Personal access tokens

<img src="{{ site.url }}/assets/image/2020-04-09-settings-sync/image1.png">


> Personal access tokens > Generate new token > Note 작성 & gist 체크 > Generate token

<img src="{{ site.url }}/assets/image/2020-04-09-settings-sync/image2.png">


> 생성된 토큰 저장
> 주의!! : 생성된 토큰은 2번다시 볼수없습니다. 꼭 어딘가에 저장해 놓으세요

<img src="{{ site.url }}/assets/image/2020-04-09-settings-sync/image3.png">


### 2. VS Code 에서 Settings Sync 익스텐션 설치

> 익스텐션 에서 Settings Sync 검색후 설치


### 3. 업로드 설정 하기 및 업로드

> OS 에 맞게 Upload Key 타이핑 하거나
> Command Palette 에서 Sync 검색후 업데이트/업로드 설정

<img src="{{ site.url }}/assets/image/2020-04-09-settings-sync/image4.png">


> Edit Configuration > 발급받은 토큰 입력 > Gist ID 저장

<img src="{{ site.url }}/assets/image/2020-04-09-settings-sync/image5.png">


### 4. https://gist.github.com/본인 github 아이디 에서 업로드된 세팅 확인

<img src="{{ site.url }}/assets/image/2020-04-09-settings-sync/image6.png">


### 5. 설정 동기화 설정

> 설정 동기화 할곳에서 Settings Sync 설치하기
> Command Palette > sync 검색 > Sync:고급옵션 > Sync:설정열기 > 저장했던 Gist ID & 엑세스 토큰 입력

<img src="{{ site.url }}/assets/image/2020-04-09-settings-sync/image7.png">


### 6. 설정 다운로드

> OS 에 맞게 Upload Key 타이핑 하거나
> Command Palette 에서 Sync 검색후 다운로드 설정

<img src="{{ site.url }}/assets/image/2020-04-09-settings-sync/image8.png">


# 알아 두면 좋을것 같은 기능들

- 설정 및 키바인딩을 동기화 하지 않기 위해 sync-ignore를 설정할수있다.<br>
  장비에 host명을 입력하여 host마다 혹은 OS 마다 설정을 동기화 하거나 안할수있다. <br>
  [Sync Pragmas](https://github.com/shanalikhan/code-settings-sync/wiki/Sync-Pragmas)
- extensions ingnore 를 설정하여 동기화 하지 않을 익스텐션을 설정할수있었다.
- 세팅 변경시에 자동 업로드 vscode 실행시에 자동 다운로드 등을 설정하여 동기화 설정만 하면 크게 신경 쓰지 않아도 될것같았다.


# 마무리
- 한국어 설정 등 vscode를 재부팅 해야되는것들은 한번에 다운로드 및 설정이 되지 않는 경우도 있었다. 하지만
- gist에 업로드된 파일을 보면 내가 작성한 keybindings 및 settings, extensions.json 파일이 그대로 올라가잇었다. 주석 까지도
- 되게 생각해 보면 간단하고 기본적인 플러그인인데 왜 이제서야 설정했는지 모르겠다.


# Reference

* [market Place Url](https://marketplace.visualstudio.com/items?itemName=Shan.code-settings-sync)