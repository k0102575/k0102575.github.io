---
layout: post
title: 리액트 디자인 시스템을 NPM에 배포하는 방법
description: "이 글에서는 리액트 디자인 시스템 모듈을 NPM에 배포하는 과정을 자세히 다룹니다. 초기 설정부터 최종 배포까지의 모든 단계를 단계별로 설명하여 쉽게 따라할 수 있습니다."
date: 2023-07-19
categories:
  - React
tags: [React, Rollup, Npm, Emotion, Storybook, svg]
---

# 리액트 디자인 시스템을 NPM에 배포하는 방법

```text
회사에서 디자인 시스템 모듈 라이브러리, 리엑트 유틸 라이브러리를 개발계획이 잡혔고 NPM 에 배포 하는법을 진행하게 되어 해당 내용을 포스팅 합니다.
```

<div class="gap-15"></div>

## 1. 프로젝트 세팅

- 먼저, Npm 패키지 세팅을 위해 npm init 또는 yarn init 설정을 진행해야 합니다.
```text
npm init 
yarn init
```
<img src="{{ site.url }}/assets/image/2023-07-19-react-module-npm-deploy/image1.png" class="col-12" />

> 세부 설정은 후에 진행할 예정으로 버전정보만 초기 버전이라는 뜻으로 0.0.1 로 진행하였습니다.

<div class="gap-15"></div>

## 2. Storybook 설치 및 React 설치

- Storybook을 설치하기 위해 npx를 사용합니다.
    - Storybook 설정은 한 번만 진행하므로 npx를 사용합니다.
    - npx에 대한 설명은 다른 시간에 하겠습니다.
- React 관련 프로젝트이므로, React와 React-DOM을 설치합니다.
```text
npx sb init --type react
yarn add --peer react@^17.0.2 react-dom@^17.0.2
```

<div class="gap-15"></div>

## 3. Typescript 설치 및 Button Component 개발

- 현재 위에 설정으로도 `yarn storybook`을 실행하면 스토리북에서 기본 컴포넌트들이 나옵니다.
- 그러나 우리가 만든 컴포넌트가 아니므로 모두 제거합니다.
- 그리고 TypeScript를 설치한 후, 테스트 컴포넌트를 개발하겠습니다.

#### 1. Typescript 설치
```text
yarn add --dev typescript @types/react
```

#### 2. Typescript 세팅
- 루트 디렉터리에 tsconfig.json 을 생성하고 저장합니다.
```json
===== tsconfig.json =====
{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "jsx": "react-jsxdev",
    "module": "esnext",
    "moduleResolution": "node",
    "baseUrl": "." ,
    "allowJs": false ,
    "declaration": true,
    "outDir": "./dist",
    "noEmit": false,
    "declarationDir": "types",
    "isolatedModules": false,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true ,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src"]
}
```
- tsc —init 로 typescript 세팅을 초기부터 세팅할수도있습니다.

#### 3. stories 폴더를 제거 하고 src 폴더 및 Button 컴포넌트를 생성합니다.

<img src="{{ site.url }}/assets/image/2023-07-19-react-module-npm-deploy/image2.png" class="col-4" />
<img src="{{ site.url }}/assets/image/2023-07-19-react-module-npm-deploy/image3.png" class="col-12" />

```javascript
===== src/Button/Button.tsx =====

import { ReactNode } from 'react';

/*
  Interface
*/
export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
}

const Button = ({ children = "Button", onClick }: ButtonProps) => {
  return <div onClick={onClick}>{children}</div>;
};

export default Button;

===== src/Button/Button.stories.tsx =====

import Button from './Button';
import { ComponentStory, ComponentMeta } from '@storybook/react';

export default {
  title: 'components|Button',
  component: Button,
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = () => (
  <Button
    onClick={() => {
      console.log('onClick');
    }}
  >
    버튼
  </Button>
);

export const button = Template.bind({});
```

#### 4. 스토리북 stories 파일 경로 세팅
- init 로 스토리북을 생성하면 초기 세팅이 stories 로 되어있습니다. 해당 값을 src 로 수정합니다.

```javascript
===== .storybook/main.js =====

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
};
```

#### 5. storybook을 실행하여 Button 컴포넌트가 storybook에 표시되는지 확인합니다.

- yarn storybook 명령어를 실행후 브라우저에서 로컬로 접속합시다.

<img src="{{ site.url }}/assets/image/2023-07-19-react-module-npm-deploy/image4.png" class="col-4" />
<img src="{{ site.url }}/assets/image/2023-07-19-react-module-npm-deploy/image5.png" class="col-12" />

<div class="gap-15"></div>

## 4. emotion 설치 및 스타일 적용
- 컴포넌트 스타일링을 위해 emotion 을 설치 하고 Button 을 스타일링 해봅시다.

```text
yarn add --dev @emotion/react @emotion/styled
```

- emotion 을 설정한뒤 css atribute 방식으로 스타일링을 추가합니다.
- 그리고 해당 컴포넌트 위에 /** @jsxImportSource @emotion/react */ 을 추가합니다.

```javascript
===== src/Button/Button.tsx =====

/** @jsxImportSource @emotion/react */
import { ReactNode } from 'react';
import { css } from '@emotion/react';

/*
  Interface
*/
export interface ButtonProps {
  className?: string;
  children?: ReactNode;
  onClick?: () => void;
}

/*
  Style
*/
const ButtonStyle = () => css`
  width: 500px;
  height: 50px;
  background-color: lightblue;
`;

/*
  Component
*/
const Button = ({ className, children = 'Button', onClick }: ButtonProps) => {
  return (
    <button className={className} css={ButtonStyle} onClick={onClick}>
      {children}
    </button>
  );
};

export default Button;
```

- 다시 yarn storybook 을 실행해 성공적으로 스타일링이 되었는지 확인합니다.
<img src="{{ site.url }}/assets/image/2023-07-19-react-module-npm-deploy/image6.png" class="col-4" />

<div class="gap-15"></div>

## 5. Icon 개발

- 디자인 시스템에서의 Icon 을 사용하기 위해 SVG 관련 사용 세팅을 진행해봅시다.
- SVG 관련은 다른포스트에서 설명하겠습니다.

#### 1. 관련 라이브러리 설치
```text
yarn add --dev babel-plugin-named-asset-import tsconfig-paths-webpack-plugin @svgr/webpack @storybook/builder-webpack5 @storybook/manager-webpack5
```

- 관련 라이브러리 설명
> babel-plugin-named-asset-import : import 구문을 사용하여 이미지, 폰트 및 기타 리소스와 같은 정적 asset을 처리하는 바벨 플러그인 입니다.

> tsconfig-paths-webpack-plugin : TypeScript의 baseUrl 및 paths 옵션을 사용하여 모듈 경로를 해석하는 데 도움을 주는 라이브러리입니다.

> @svgr/webpack : Webpack 에서 svg를 로더할때 도와주는 라이브러리 입니다.

> @storybook/builder-webpack5, @storybook/manager-webpack5 : sb init 설정은 webpack4가 설치되어있지만 스토리북 버전 문제로 인하여 5 추가 설치필요한 라이브러리

#### 2. svg 관련 스토리북 설정 수정

```javascript
===== .storybook/main.js =====

const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

module.exports = {
  stories: ['../src/**/*.stories.mdx', '../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: [
    '@storybook/addon-links',
    '@storybook/addon-essentials',
    '@storybook/addon-interactions',
  ],
  framework: '@storybook/react',
  core: {
    builder: 'webpack5',
  },
  webpackFinal: async (config) => {
    // configure for absolute imports
    config.resolve.plugins = [
      ...(config.resolve.plugins || []),
      new TsconfigPathsPlugin({
        extensions: config.resolve.extensions,
      }),
    ];

    // disable whatever is already set to load SVGs
    config.module.rules
      .filter((rule) => rule.test.test('.svg'))
      .forEach((rule) => (rule.exclude = /\.svg$/i));

    // add SVGR instead
    config.module.rules.push({
      test: /\.svg$/,
      use: [
        {
          loader: '@svgr/webpack',
          options: {
            svgoConfig: {
              plugins: [
                {
                  name: 'removeViewBox',
                  active: false,
                },
              ],
            },
          },
        },
        {
          loader: 'file-loader',
          options: {
            name: 'static/media/[path][name].[ext]',
          },
        },
      ],
      type: 'javascript/auto',
      issuer: {
        and: [/\.(ts|tsx|js|jsx|md|mdx)$/],
      },
    });
    return config;
  },
};
```

#### 3. 루트 프로젝트에 type.d.ts 파일을 작성하여 SVG 컴포넌트 관련 타입 설정을 해주고, tsconfig.json 파일에서 해당 파일을 include 해줍니다.

```json
===== type.d.ts =====

declare module '*.mdx';

declare module '*.svg' {
  import * as React from 'react';

  export const ReactComponent: React.FunctionComponent<React.SVGProps<
    SVGSVGElement
  >>;

  const src: string;
  export default src;
}

===== tsconfig.json =====

{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "jsx": "react-jsxdev",
    "module": "esnext",
    "moduleResolution": "node",
    "baseUrl": "." ,
    "allowJs": false ,
    "declaration": true,
    "outDir": "./dist",
    "noEmit": false,
    "declarationDir": "types",
    "isolatedModules": false,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true ,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src", "type.d.ts"]
}
```

#### 4. 테스트용 Icon svg를 추가하고 컴포넌트처럼 사용할수있게 export 해줍니다.

```javascript
===== src/Icon/svg/ic-chevron.svg ===== 

<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M5 15L12 7.5L19 15" stroke="black" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
</svg>

===== src/Icon/svg/index.ts =====

export { ReactComponent as icChevron } from "./ic-chevron.svg";
```

#### 5. Icon을 만들어 name 값으로 편하게 사용할 수 있도록 만들어 봅시다. 그리고 스토리북에서 확인할 수 있도록 stories 파일도 생성해봅시다.

```javascript
===== src/Icon/Icon.tsx =====


/** @jsxImportSource @emotion/react */
import { createElement } from 'react';
import { css } from '@emotion/react';
import * as svg from './svg';

export interface IconBoxProps {
  name: keyof typeof svg;
  fixStroke?: boolean;
  strokeWidth?: number;
  rotate?: number;
  width?: string;
  height?: string;
  color?: string;
  fillColor?: string;
  className?: string;
}

const iconStyle = (
  fixStroke: boolean,
  strokeWidth: number,
  rotate: number,
  width?: string,
  height?: string,
  color?: string,
  fillColor?: string,
) => css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: fit-content;

  svg {
    transform: rotate(${rotate}deg);
    width: ${width};
    height: ${height};

    path,
    circle {
      stroke: ${color};
      fill: ${fillColor};

      ${fixStroke &&
      css`
        stroke-width: ${strokeWidth || 1};
        vector-effect: non-scaling-stroke;
      `}
    }
  }
`;

const Icon = ({
  name,
  width,
  height,
  color,
  className,
  fixStroke = true,
  strokeWidth = 1,
  rotate = 0,
  fillColor,
}: IconBoxProps) => (
  <div
    css={iconStyle(fixStroke, strokeWidth, rotate, width, height, color, fillColor)}
    className={className}
  >
    {createElement(svg[name])}
  </div>
);

export default Icon;
```

<div class="gap-15"></div>

## 6. Rollup 세팅

- Rollup 설정을 하기전에 유명한 3가지 번들러를 비교해보자

```
Rollup:
Rollup은 작은 라이브러리와 패키지를 빌드하기 위해 설계된 모듈 번들러입니다. 
ES6 모듈을 사용하는 애플리케이션에 가장 적합하며, 
트리 쉐이킹에 중점을 둬서 사용되지 않는 코드를 제거하여 크기를 줄입니다.

Webpack:
Webpack은 모듈 번들러로, 다양한 유형의 모듈을 번들링할 수 있습니다. 
코드 분할, 로더, 플러그인 등 다양한 기능을 제공하여 유연하게 사용할 수 있습니다. 
주로 대형 애플리케이션의 번들링에 사용됩니다.

Parcel:
Parcel은 빠르고 간단한 모듈 번들러로, 설정 없이도 사용할 수 있습니다. 
자동으로 파일을 분석하여 최적의 번들을 생성합니다. 
프로젝트 설정이 적은 애플리케이션을 빌드할 때 유용합니다.

요약하면, Rollup은 작은 패키지를 빌드할 때, 
Webpack은 대형 애플리케이션을 빌드할 때, 
Parcel은 프로젝트 설정이 적은 애플리케이션을 빌드할 때 가장 적합합니다.

해당 프로젝트는 작은 패키지를 빌드하기 떄문에 Rollup 으로 진행합니다.
```

#### 1. 관련 라이브러리 설치

```text
yarn add --dev @babel/plugin-transform-runtime @rollup/plugin-babel @rollup/plugin-commonjs @rollup/plugin-node-resolve @rollup/plugin-typescript @rollup/plugin-url @svgr/rollup rollup rollup-plugin-peer-deps-external
```

- 라이브러리 설명

> @babel/plugin-transform-runtime : Babel 트랜스파일링 시, 코드를 변환하면서 필요한 런타임 함수들을 별도의 모듈로 분리하여 번들 파일의 크기를 줄이는 플러그인입니다.

> @rollup/plugin-babel : Rollup에서 Babel을 사용하여 ES6+ 코드를 ES5 코드로 변환하는 플러그인입니다.

> @rollup/plugin-commonjs : CommonJS 형식의 모듈을 Rollup 번들에 포함시키기 위한 플러그인입니다.

> @rollup/plugin-node-resolve : Rollup 번들링 시, 모듈 경로를 해결하기 위한 플러그인입니다.

> @rollup/plugin-typescript : Rollup에서 TypeScript 파일(.ts)을 번들링하기 위한 플러그인입니다.

> @rollup/plugin-url : Rollup 번들링 시, 파일을 URL로 참조할 수 있는 형식으로 번들링하기 위한 플러그인입니다.

> @svgr/rollup : SVG 파일을 React 컴포넌트로 변환해주는 라이브러리인 SVGR을 Rollup 번들러와 함께 사용하기 위한 Rollup 플러그인입니다.

> rollup-plugin-peer-deps-external: Peer dependencies로 설치된 모듈들을 Rollup 번들에 포함시키지 않고, 외부에서 불러와 사용할 수 있도록 해주는 플러그인입니다.

#### 2. rollup 설정

```javascript
===== rollup.config.mjs =====

import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';

import svgr from '@svgr/rollup';
import url from '@rollup/plugin-url';
import peerDepsExternal from 'rollup-plugin-peer-deps-external';
const extensions = ['.js', '.jsx', '.ts', '.tsx'];

export default {
  input: './src/index.ts',

  output: [
    {
      file: 'dist/index.js',
      format: 'es',
      sourcemap: true,
    },
  ],
  external: [/@babel\/runtime/],
  plugins: [
    url(),
    svgr(),
    peerDepsExternal(),
    resolve({ extensions }),
    commonjs({
      include: 'node_modules/**',
    }),
    babel({
      babelHelpers: 'runtime',
      presets: [
        '@babel/env',
        ['@babel/react', { runtime: 'automatic' }],
        '@babel/typescript',
      ],
      plugins: ['@babel/plugin-transform-runtime'],
      extensions,
    }),
    typescript(),
  ],
};
```

#### 3. package json 에 module 과 types 를 추가하고 rollup, tsc script 를 추가하자

```json
===== package.json =====

{
  "name": "react-library-template",
  "version": "0.0.1",
  "main": "index.js",
  "module": "dist/index.js",
  "types": "dist/types/index.d.ts",
  "repository": "https://github.com/k0102575/react-library-template.git",
  "author": "k0102575 <k0102575@gmail.com>",
  "license": "MIT",
  "devDependencies": {
    "@babel/core": "^7.21.0",
    "@babel/plugin-transform-runtime": "^7.21.0",
    "@emotion/react": "^11.10.6",
    "@emotion/styled": "^11.10.6",
    "@rollup/plugin-babel": "^6.0.3",
    "@rollup/plugin-commonjs": "^24.0.1",
    "@rollup/plugin-node-resolve": "^15.0.1",
    "@rollup/plugin-typescript": "^11.0.0",
    "@rollup/plugin-url": "^8.0.1",
    "@storybook/addon-actions": "^6.5.16",
    "@storybook/addon-essentials": "^6.5.16",
    "@storybook/addon-interactions": "^6.5.16",
    "@storybook/addon-links": "^6.5.16",
    "@storybook/builder-webpack4": "^6.5.16",
    "@storybook/builder-webpack5": "^6.5.16",
    "@storybook/manager-webpack4": "^6.5.16",
    "@storybook/manager-webpack5": "^6.5.16",
    "@storybook/react": "^6.5.16",
    "@storybook/testing-library": "0.0.13",
    "@svgr/rollup": "^6.5.1",
    "@svgr/webpack": "^6.5.1",
    "@types/react": "^18.0.28",
    "babel-loader": "^8.3.0",
    "babel-plugin-named-asset-import": "^0.3.8",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "rollup": "^3.18.0",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "tsconfig-paths-webpack-plugin": "^4.0.1",
    "typescript": "^4.9.5"
  },
  "dependencies": {},
  "scripts": {
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
    "build": "rollup -c",
    "build:types": "tsc --emitDeclarationOnly"
  },
  "peerDependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
}
```

#### 4. rollup 번들링에는 storybook 은 제외 하여야하기 때문에 tsconfig 를 수정하자.

```json
===== tsconfig.json =====

{
  "compilerOptions": {
    "target": "es5",
    "lib": [
      "dom",
      "dom.iterable",
      "esnext"
    ],
    "jsx": "react-jsxdev",
    "module": "esnext",
    "moduleResolution": "node",
    "baseUrl": "." ,
    "allowJs": false ,
    "declaration": true,
    "outDir": "./dist",
    "noEmit": false,
    "declarationDir": "types",
    "isolatedModules": false,
    "allowSyntheticDefaultImports": true,
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true ,
    "strict": true,
    "skipLibCheck": true
  },
  "include": ["src", "type.d.ts"],
	"exclude": ["**/*.stories.tsx"]
}
```

#### 5. src/index.ts 를 수정하여 번들링 패키지에 포함될 파일을 export 하자.

```javascript
===== src/index.ts =====

export { default as Button } from './Button/Button';
export { default as Icon } from './Icon/Icon';
```

#### 6. 번들링을 확인해보자
```text
yarn build
```

<img src="{{ site.url }}/assets/image/2023-07-19-react-module-npm-deploy/image6.png" class="col-4" />

<div class="gap-15"></div>

## 7. npm publish

- [npmjs.com](http://npmjs.com) 에 들어가 회원가입 후 이메일 인증을 진행합니다.
- npm 을 로그인 합니다.
```text
npm login
```

#### 1. package.json 의 name 및 files 값을 수정합시다.
- 그리고 npm library 는 name 값이 중복되면 안되기 때문에 검색을 꼭 하고 name 을 설정합니다.
- 또한 npm 에만 사용하려는 파일을 지정하기 위해 files 를 추가합니다.

```json
===== package.json =====



{
  "name": "theo-react-library-template",
  "version": "0.0.1",
  "module": "dist/index.js",
  "types": "dist/types/index.d.ts",
  "files": [
    "/dist"
  ],
  "repository": "https://github.com/k0102575/react-library-template.git",
  "author": "k0102575 <k0102575@gmail.com>",
  "license": "MIT",
  "devDependencies": {
    "@babel/core": "^7.21.0",
    "@babel/plugin-transform-runtime": "^7.21.0",
    "@emotion/react": "^11.10.6",
    "@emotion/styled": "^11.10.6",
    "@rollup/plugin-babel": "^6.0.3",
    "@rollup/plugin-commonjs": "^24.0.1",
    "@rollup/plugin-node-resolve": "^15.0.1",
    "@rollup/plugin-typescript": "^11.0.0",
    "@rollup/plugin-url": "^8.0.1",
    "@storybook/addon-actions": "^6.5.16",
    "@storybook/addon-essentials": "^6.5.16",
    "@storybook/addon-interactions": "^6.5.16",
    "@storybook/addon-links": "^6.5.16",
    "@storybook/builder-webpack4": "^6.5.16",
    "@storybook/builder-webpack5": "^6.5.16",
    "@storybook/manager-webpack4": "^6.5.16",
    "@storybook/manager-webpack5": "^6.5.16",
    "@storybook/react": "^6.5.16",
    "@storybook/testing-library": "0.0.13",
    "@svgr/rollup": "^6.5.1",
    "@svgr/webpack": "^6.5.1",
    "@types/react": "^18.0.28",
    "babel-loader": "^8.3.0",
    "babel-plugin-named-asset-import": "^0.3.8",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "rollup": "^3.18.0",
    "rollup-plugin-peer-deps-external": "^2.2.4",
    "tsconfig-paths-webpack-plugin": "^4.0.1",
    "typescript": "^4.9.5"
  },
  "dependencies": {},
  "scripts": {
    "storybook": "start-storybook -p 6006",
    "build-storybook": "build-storybook",
    "build": "rollup -c"
  },
  "peerDependencies": {
    "react": "^17.0.2",
    "react-dom": "^17.0.2"
  }
}
```

#### 2. npm publish 명령어로 패키지를 배포해봅시다.
```text
npm publish
```

#### 3. 패키지 배포를 확인해 봅시다. 
<img src="{{ site.url }}/assets/image/2023-07-19-react-module-npm-deploy/image7.png" class="col-12" />
<img src="{{ site.url }}/assets/image/2023-07-19-react-module-npm-deploy/image8.png" class="col-12" />

<div class="gap-15"></div>

## 8. 다른 프로젝트에서 설치후 사용해보자

#### 1. cra 로 프로젝트를 생성 및 library-template 프로젝트를 설치하자

```text
npx create-react-app library-project --template typescript
cd library-project
yarn add theo-react-library-template
```

```json
===== package.json =====

{
  "name": "library-project",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.16.5",
    "@testing-library/react": "^13.4.0",
    "@testing-library/user-event": "^13.5.0",
    "@types/jest": "^27.5.2",
    "@types/node": "^16.18.14",
    "@types/react": "^18.0.28",
    "@types/react-dom": "^18.0.11",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-scripts": "5.0.1",
    "theo-react-library-template": "^0.0.1",
    "typescript": "^4.9.5",
    "web-vitals": "^2.1.4"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  }
}
```

#### 2. App.tsx 를 수정하고 실행하여 잘 표시되는지 확인하자

```javascript
===== src/App.tsx =====
import React from 'react';
import { Button, Icon } from 'theo-react-library-template';
import './App.css';

function App() {
  return (
    <div className="App">
      <Button></Button>
      <Icon name='icChevron'></Icon>
    </div>
  );
}

export default App;
```

```text
yarn start
```

<img src="{{ site.url }}/assets/image/2023-07-19-react-module-npm-deploy/image9.png" class="col-12" />

### 끝!

- 포스트 완성 repository 및 npm

- [완성 github](https://github.com/k0102575/react-library-boilerplate)
- [테스트 npm](https://www.npmjs.com/package/theo-react-library-template)

<div class="gap-15"></div>

## 출처

[https://velog.io/@velopert/design-system-using-typescript-and-storybook](https://velog.io/@velopert/design-system-using-typescript-and-storybook)