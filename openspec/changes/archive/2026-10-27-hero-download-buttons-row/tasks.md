# Tasks

## 1. 버튼 여백 조정

- [x] 1.1 index.html의 Get it on Chrome 버튼 `px-[14.5px]`를 `px-3 md:px-[14.5px]`로, Get it on Firefox 버튼 `px-[15px]`를 `px-3 md:px-[15px]`로 바꾸고 `npm run lint`(readable-tailwind 클래스 정렬 포함)가 통과하는지 확인한다.

## 2. 검증과 기록

- [x] 2.1 375px에서 두 버튼이 같은 줄(같은 y)에 있고 줄 안에 들어가며, 호버 상태에서도 줄바꿈되지 않는지 Chromium으로 측정한다.
- [x] 2.2 320px에서 두 버튼이 줄바꿈되고 문서 가로 스크롤 폭이 화면 폭을 넘지 않는지 확인한다.
- [x] 2.3 768px과 1440px에서 두 버튼의 위치·크기가 변경 전 측정값과 같은지 비교한다.
- [x] 2.4 `npm run build`와 `npm run format:check`가 통과하는지 확인한다.

## Workflow follow-up

- 검토 후 변경을 아카이브하고 `openspec/specs/hero-content/spec.md`에 다운로드 버튼 배치 요구가 추가되었는지 확인한다.
