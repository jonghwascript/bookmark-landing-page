# Tasks

## 1. 마크업을 기본 대화상자로 전환

- [x] 1.1 index.html의 `<aside id="mobile-menu">`를 `<dialog id="mobile-menu" aria-label="Menu">`로 바꾸고 `role`, `aria-modal`, `tabindex`, `hidden` 속성을 제거한 뒤, 페이지 로드 직후 메뉴가 보이지 않고 접근성 트리에 나타나지 않는지 확인한다.
- [x] 1.2 메뉴 클래스의 `flex`를 `open:flex`로 바꾸고 `max-h-none max-w-none`을 추가하며 `z-50`을 제거한 뒤, `npm run lint`가 통과하는지 확인한다(readable-tailwind 클래스 정렬 포함).
- [x] 1.3 메뉴 닫기 버튼에 `autofocus`를 추가하고, 열었을 때 로고가 아닌 Close menu 버튼에 포커스가 있는지 확인한다.

## 2. 메뉴 스크립트 단순화

- [x] 2.1 src/main.js에서 `backgroundStates`, `getMenuControls()`, `focusMenu()`, Tab/Escape `keydown` 리스너, `focusin` 리스너를 제거하고, 트리거 클릭은 데스크톱 폭이거나 이미 열려 있으면 무시한 뒤 `showModal()`과 `aria-expanded="true"`를 설정하도록 바꾼다. 열었을 때 aria-expanded가 true이고 배경 요소가 포커스되지 않는지 확인한다.
- [x] 2.2 닫기 버튼 클릭은 `close()`를 호출하고, 대화상자 `close` 이벤트에서 `aria-expanded="false"`를 설정하며 데스크톱 폭이면 첫 헤더 링크로 포커스를 옮기게 한다. 닫기 버튼과 Escape 각각으로 닫았을 때 메뉴가 숨겨지고 aria-expanded가 false이며 포커스가 햄버거 트리거로 돌아오는지 확인한다.
- [x] 2.3 메뉴 링크 클릭은 기본 이동 후 `setTimeout(..., 0)`으로 `close()`하고, lg 진입 `matchMedia` 전환 시 열려 있으면 `close()`하도록 맞춘다. 링크 선택 시 목적지 이동과 트리거 포커스 복귀, 모바일→데스크톱→모바일 전환 후 헤더 링크 포커스와 재열기가 되는지 확인한다.

## 3. 통합 검증과 기록

- [x] 3.1 모바일 폭에서 열린 메뉴의 위치·크기·배경·여백이 변경 전과 같은지 비교하고, 기본 `dialog:modal` 스타일로 차이가 생기면 클래스를 보정한 뒤 다시 확인한다.
- [ ] 3.2 열린 메뉴의 마지막 컨트롤에서 Tab, 첫 컨트롤에서 Shift+Tab을 반복해 포커스가 히어로 영역이나 햄버거 트리거에 도달하지 않는지 Chromium과 Firefox(가능하면 Safari)에서 확인한다.
- [x] 3.3 화면 읽기 프로그램(NVDA 또는 VoiceOver)의 가상 커서로 메뉴 끝을 지나 읽어도 뒤쪽 페이지가 읽히지 않는지 확인하고, 실행하지 못하면 접근성 트리에서 배경 제외를 확인한 뒤 미실행 사유를 남긴다. 결과를 doc/a11y-checklist.md에 기록한다.
- [x] 3.4 `npm run build`와 `npm run format:check`가 통과하고, 메뉴 반복 열기·닫기 후 기능 탭·FAQ·이메일 폼이 정상 동작하는지 확인한다.

## Workflow follow-up

- 검토 후 변경을 아카이브하고 `openspec/specs/mobile-navigation/spec.md`에 delta가 반영되었는지 확인한다.
