# Proposal

## Why

모바일 메뉴는 화면 전체를 덮지만 `hidden` 속성을 토글하는 `<aside>`이고, 포커스 가두기와 배경 차단을 직접 작성한 JavaScript에 의존한다. 그 결과 사용 환경에 따라 메뉴 끝에서 Tab을 누르면 뒤쪽 히어로 영역으로, 로고에서 Shift+Tab을 누르면 아래에 깔린 햄버거 버튼으로 포커스가 빠져나가고, 화면 읽기의 가상 커서는 여전히 뒤쪽 페이지 전체를 읽는다. 브라우저 기본 모달 `<dialog>`는 배경 비활성화, Escape 닫기, 포커스 복귀를 기본으로 처리하므로, 직접 만든 메뉴 코드 대부분을 제거하면서 이 누출을 근본적으로 막을 수 있다.

## What Changes

- 모바일 메뉴 컨테이너를 `<aside role="dialog" aria-modal="true" hidden>`에서 `<dialog id="mobile-menu" aria-label="Menu">`로 바꾸고 `showModal()`로 연다.
- 닫힌 대화상자를 숨기는 브라우저 기본 규칙이 덮어쓰이지 않도록 항상 적용되던 `flex`를 `open:flex`로 바꾸고, 기본 대화상자 크기 제한으로 메뉴가 줄어들지 않도록 `max-h-none max-w-none`을 추가한다.
- 닫기 버튼에 `autofocus`를 지정해 열 때 로고가 아닌 닫기 버튼이 먼저 포커스를 받게 한다.
- 직접 작성한 열기/닫기 처리, 배경 `inert` 저장·복원, Tab 순환과 `focusin` 처리, Escape `keydown` 리스너를 제거하고 브라우저 기본 동작으로 대체한다.
- 트리거의 `aria-expanded` 동기화, 메뉴 링크 선택 시 닫기, 데스크톱 화면 폭 전환 시 닫기와 포커스 이동은 짧은 스크립트로 유지한다.
- 메뉴 안 Tab 이동에서 직접 구현한 "마지막에서 첫 번째로" 순환 요구를 완화한다. 포커스가 뒤쪽 페이지에 닿지 않는 것을 필수로 하고, 메뉴 끝 이후의 이동은 브라우저 기본 모달 동작(메뉴 내부 순환 또는 브라우저 UI로 이동)을 따른다.

## Capabilities

### New Capabilities

없음.

### Modified Capabilities

- `mobile-navigation`: 메뉴 내부 포커스 유지 요구를 "배경 페이지로 포커스가 빠져나가지 않음" 중심으로 바꾸고, 배경 접근 제한에 Tab/Shift+Tab 누출과 화면 읽기 가상 커서 시나리오를 명시한다.

## Impact

- `index.html`: 모바일 메뉴 요소, 접근 가능한 이름, 표시·크기 클래스, 닫기 버튼 `autofocus`.
- `src/main.js`: 메뉴 관련 코드 대부분 제거, `showModal()`/`close()`와 `close` 이벤트 기반으로 단순화.
- 브라우저 요구: 모달 `<dialog>`(`showModal()`)과 `::backdrop` 지원 브라우저. 외부 의존성 추가는 없다.
- 시각적 레이아웃, 링크 목적지, 데스크톱 헤더 내비게이션은 그대로 유지한다.
