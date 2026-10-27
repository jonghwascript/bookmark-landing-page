# Tasks

## 1. 탭 마크업과 스타일

- [x] 1.1 index.html에서 Features `<nav>`를 제거하고 `<ul>`에 `role="tablist"`와 `aria-label="Features"`, 각 `<li>`에 `role="none"`을 추가한 뒤, Chrome 접근성 트리에 "Features" 내비게이션 랜드마크가 없고 tablist가 있는지 확인한다.
- [x] 1.2 세 링크를 `<button type="button" role="tab">`으로 바꾸고 `id`, `aria-controls`, `aria-selected`, 로빙 `tabindex`(첫 탭 0, 나머지 -1)와 `cursor-pointer`를 지정한 뒤, 접근성 트리에서 탭 3개와 선택 상태·제어 대상이 맞는지 확인한다.
- [x] 1.3 세 패널 `<section>`에 `role="tabpanel"`을 추가하고 `aria-labelledby`를 해당 탭 id로 바꾼 뒤, 표시 중인 패널이 선택된 탭 이름으로 노출되는지 확인한다.
- [x] 1.4 src/style.css의 선택 밑줄 선택자를 `.c-feature-link[aria-selected="true"]::after`로 바꾸고, 모바일·데스크톱 폭에서 탭 글자·구분선·밑줄 위치가 변경 전과 같은지 비교한다.

## 2. 선택과 키보드 동작

- [x] 2.1 src/main.js의 `aria-current` 토글 코드를 선택 함수로 교체해 클릭·Enter·Space 시 `aria-selected`, `tabindex`, 패널 `hidden`이 함께 갱신되고 해시·스크롤이 바뀌지 않는지 확인한다.
- [x] 2.2 탭 목록 `keydown`에 화살표(가로·세로, 순환)와 Home/End 이동 및 자동 선택을 추가하고, 각 키에서 포커스·선택·패널이 함께 바뀌며 페이지가 스크롤되지 않는지 확인한다.
- [x] 2.3 선택된 탭에서 Tab 시 다른 탭을 건너 패널의 More Info 링크로 가고, Shift+Tab 시 선택된 탭으로 돌아오는지 확인한다.

## 3. 통합 검증과 기록

- [x] 3.1 패널 전환 애니메이션, 탭 hover 색, 포커스 표시가 유지되고 헤더·모바일 메뉴·푸터의 `#features` 링크가 섹션으로 이동하는지 브라우저에서 확인한다.
- [x] 3.2 화면 읽기 프로그램으로 탭 안내(이름, 선택됨, 3개 중 N번째)를 확인하고, 실행하지 못하면 접근성 트리 결과와 미실행 사유를 doc/a11y-checklist.md에 기록한다.
- [x] 3.3 `npm run build`와 `npm run format:check`가 통과하는지 확인한다.

## Workflow follow-up

- 검토 후 변경을 아카이브하고 `openspec/specs/feature-tabs/spec.md`가 생성되었는지 확인한다.
