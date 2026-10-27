# Tasks

## 1. 스크롤 고정 규칙

- [x] 1.1 src/style.css에 `:root:has(dialog:modal) { overflow: hidden; }` 규칙을 추가하고, 메뉴를 열었을 때 문서의 계산된 `overflow-y`가 `hidden`, 닫았을 때 `visible`인지 확인한다.

## 2. 검증

- [x] 2.1 375px(마우스·터치 에뮬레이션)와 900px에서 메뉴를 연 뒤 메뉴 위 휠 스크롤 시 `scrollY`가 그대로이고, 닫은 뒤 열기 전 위치에서 다시 스크롤되는지 확인한다.
- [x] 2.2 짧은 화면(375×400)에서 열린 메뉴를 스크롤해 아래쪽 소셜 링크까지 도달하고 배경 `scrollY`는 바뀌지 않는지 확인한다.
- [x] 2.3 메뉴의 Features·Pricing·Contact 링크 선택 시 메뉴가 닫히고 해당 섹션으로 이동하는지, Escape·닫기 버튼·데스크톱 전환 후 스크롤이 풀리는지 확인한다.
- [x] 2.4 `npm run build`와 `npm run format:check`가 통과하는지 확인한다.

## Workflow follow-up

- 검토 후 변경을 아카이브하고 `openspec/specs/mobile-navigation/spec.md`에 배경 스크롤 고정 요구가 추가되었는지 확인한다.
