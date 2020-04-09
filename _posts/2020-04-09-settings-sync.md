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


### 5. 설정 다운로드 (Todo)

> 설정 동기화 할곳에서 Settings Sync 설치하기


> OS 에 맞게 Down Key 타이핑 하거나
> Command Palette 에서 Sync 검색후 다운로드 설정
