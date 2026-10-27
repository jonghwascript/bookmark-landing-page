# Tasks

## 1. 히어로 여백 단위 맞추기

- [x] 1.1 index.html 히어로 섹션의 `lg:pl-[calc(max(0px,(100%_-_1275px)/2)_+_80px)]`를 `lg:pl-[calc(max(0px,(100%_-_1275px)/2)_+_5rem)]`로 바꾸고 `npm run lint`가 통과하는지 확인한다.

## 2. 검증과 문서

- [x] 2.1 루트 글꼴 16·20·24px과 1024·1280·1440·1600px 조합 12개에서 히어로 제목과 헤더 로고의 왼쪽 위치 차이가 0인지, 16px에서 위치가 변경 전 측정값(80·80·155·235px)과 같은지 확인한다.
- [x] 2.2 1023px 이하(모바일·태블릿)에서 히어로 레이아웃이 변경 전과 같은지 확인한다(이 규칙은 lg에서만 적용되므로 차이가 없어야 한다).
- [x] 2.3 README "Container limits and desktop alignment"의 코드 예시와 설명을 `5rem`으로 고치고, Breaks when에서 글꼴 크기 어긋남 문장을 해결된 내용(헤더와 같은 rem 단위라 함께 커짐)으로 바꾸되 `1275px` 중복 경고는 유지한다.
- [x] 2.4 `npm run build`와 `npm run format:check`가 통과하는지 확인한다.

## Workflow follow-up

- 검토 후 변경을 아카이브하고 `openspec/specs/hero-content/spec.md`에 데스크톱 히어로 정렬 요구가 추가되었는지 확인한다.
