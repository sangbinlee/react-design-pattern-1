# create-vite 를 사용한 weather-app 셋업

## create-vite로 weather-app 만들기

```bash
$ npx create-vite weather-app --template react-ts
$ cd weather-app
$ yarn add cypress jest-fetch-mock -D
$ yarn install
```

## package.json 에 'e2e' 명령어 추가

```json
{
  "scripts": {
    "e2e": "cypress run cypress/e2e/**/*.spec.cy.ts"
  }
}
```

## tsconfig.json 복사

- ch12/weather/tsconfig.json 파일을 복사하여 ch12/weather-app/tsconfig.json 파일을 만든다.

```bash
$ cp ch12/tsconfig.json tsconfig.json
```

## Troubleshooting

### `cypress/e2e/**/*.spec.cy.ts` 파일에서 `cy` 객체에 대해 `TS2304: Cannot find name cy` 가 발생

- spec.cy.ts 파일의 맨 위에 다음 주석을 추가

```ts
/// <reference types="cypress" />
```
