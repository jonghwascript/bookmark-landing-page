# Design

## Context

- 현재 모바일 메뉴는 `index.html`의 `<body>` 직계 자식인 `<aside id="mobile-menu" role="dialog" aria-modal="true" tabindex="-1" hidden>`이다. 클래스에 `fixed inset-y-0 right-0 z-50 flex h-[100dvh] w-screen ... lg:hidden`이 있다.
- `src/main.js`의 메뉴 코드는 `hidden` 토글, `body` 자식들의 `inert` 저장·복원(`backgroundStates`), `getMenuControls()` 기반 Tab 순환, `focusin` 되돌리기, 문서 전체 `keydown`의 Escape 처리, 링크 클릭 후 `setTimeout` 닫기, `matchMedia("(min-width: 64rem)")` 전환 처리로 구성된다.
- 이 직접 구현은 `checkVisibility()` 같은 비교적 새 API와 이벤트 순서에 의존한다. 브라우저나 보조기기에 따라 Tab/Shift+Tab과 가상 커서가 배경으로 새는 현상이 보고되었다. 개발 중 데스크톱 Chromium 399px 폭에서는 순환이 동작했으므로, 누출은 환경에 따라 다르게 나타난다.
- 동작 요구는 `specs/mobile-navigation/spec.md`(이 변경의 delta 포함)를 따른다.

## Goals / Non-Goals

**Goals:**

- 모달 격리(배경 비활성화, 상단 레이어 표시, 화면 읽기 범위 제한)를 브라우저 기본 `<dialog>`에 맡긴다.
- 메뉴 JavaScript를 트리거 열기, 상태 동기화, 링크/데스크톱 전환 닫기 정도로 줄인다.
- 기존 시각 레이아웃(전체 화면, 반투명 남색 배경, 여백)을 유지한다.

**Non-Goals:**

- 메뉴가 열린 동안의 배경 스크롤 잠금, 열기/닫기 애니메이션.
- 포커스 표시 스타일 변경이나 메뉴 링크 구성 변경.
- `<dialog>`를 지원하지 않는 브라우저용 대체 구현.

## Decisions

### 1. `<aside>` → `<dialog>` + `showModal()`

`<dialog id="mobile-menu" aria-label="Menu">`로 바꾸고 `role`, `aria-modal`, `tabindex`, `hidden`을 제거한다. `showModal()`은 요소를 상단 레이어로 올리고 나머지 문서를 inert로 만들며, Escape(`cancel`)로 닫고, 닫힐 때 이전 포커스 요소(햄버거 트리거)로 포커스를 돌려준다.

- 대안: 기존 `inert` 방식을 고치거나 포커스 트랩 라이브러리를 추가 → 직접 관리하는 상태가 남고 의존성이 늘어 기각.
- 대안: `popover` → 비모달이라 배경이 inert가 되지 않아 기각.
- 접근 가능한 이름은 `aria-label="Menu"`로 둔다(기존 "Mobile navigation"에서 변경). 내부 `<nav aria-label="Secondary">`는 유지한다.

### 2. 표시와 크기 클래스

- 항상 적용되던 `flex`는 작성자 스타일이라 브라우저의 `dialog:not([open]) { display: none }`을 덮어써 닫힌 메뉴가 보이게 된다. `open:flex`로 바꿔 열렸을 때만 flex 레이아웃을 적용한다.
- 모달 대화상자의 기본 `max-width`/`max-height`(`calc(100% - 2em - 6px)`)가 전체 화면 크기를 줄이므로 `max-h-none max-w-none`을 추가한다. 여백과 테두리는 Tailwind preflight가 이미 0으로 만든다.
- `z-50`은 상단 레이어에서 의미가 없으므로 제거할 수 있다. `fixed inset-y-0 right-0`, `h-[100dvh]`, `bg-blue-950/98`, 패딩 클래스는 유지한다.
- `lg:hidden`은 `open:flex`보다 우선순위가 낮다. 데스크톱에서는 스크립트가 열기를 막고 전환 시 닫으므로 그대로 두어도 되지만, 의도를 분명히 하려고 유지한다.
- 기본 `::backdrop`은 메뉴가 화면을 덮어 거의 보이지 않으므로 별도 스타일을 두지 않는다.

### 3. 초기 포커스는 `autofocus`

닫기 버튼에 `autofocus`를 지정한다. 지정하지 않으면 `showModal()`이 첫 포커스 가능 요소인 로고 링크에 포커스를 준다. 이로써 `focusMenu()`가 필요 없어진다.

### 4. 남기는 스크립트

- 트리거 클릭: 데스크톱 폭이거나 이미 열려 있으면 무시하고, 아니면 `showModal()` 후 `aria-expanded="true"`.
- 닫기 버튼 클릭: `close()`.
- 대화상자 `close` 이벤트: `aria-expanded="false"`. Escape, 닫기 버튼, 링크, 화면 폭 전환 등 모든 닫기 경로를 이 한 곳에서 처리한다. 데스크톱 폭이면 기본 포커스 복귀 대상(숨겨진 햄버거) 대신 첫 헤더 링크에 포커스를 둔다.
- 메뉴 내 링크 클릭: 기존처럼 기본 이동이 끝난 뒤 `setTimeout(..., 0)`으로 `close()`해 이동 후 트리거로 포커스가 돌아오게 한다.
- `matchMedia` 전환: lg 진입 시 열려 있으면 `close()`.
- 제거: `backgroundStates`, `getMenuControls()`, `focusMenu()`, Tab/Escape `keydown`, `focusin` 리스너.

Tab 순환 코드는 다시 만들지 않는다. 모달 대화상자에서 메뉴 끝을 넘는 Tab은 브라우저가 처리하며(Chromium은 브라우저 UI로 이동 후 다시 메뉴로 돌아옴), 배경 페이지에는 닿지 않는다. delta spec이 이 동작을 허용하도록 요구를 완화했다.

## Risks / Trade-offs

- [브라우저마다 메뉴 끝 Tab 동작이 다름(순환 vs 브라우저 UI)] → spec은 "배경에 닿지 않음"만 요구한다. 엄격한 순환이 필요해지면 작은 `keydown` 처리만 다시 추가한다.
- [`dialog:modal` 기본 스타일(`inset`, `margin: auto`, `color`, `background`)이 레이아웃을 바꿀 수 있음] → 모바일 폭에서 열린 메뉴의 위치·크기·배경을 기존 화면과 비교 확인한다. 필요하면 `m-0`/`inset` 클래스를 명시한다.
- [`w-screen`은 스크롤바 폭만큼 넓어 메뉴가 왼쪽으로 약 15px 벗어남(현재도 동일)] → 이번 범위에서는 유지하되, 확인 중 문제가 보이면 `w-full`로 바꾸는 것을 검토한다.
- [닫힌 뒤 포커스 복귀를 브라우저에 의존] → 주요 브라우저는 `showModal()` 이전 포커스 요소로 복귀시킨다. 모바일 폭 수동 확인 항목에 포함한다.
- [모달이 열린 동안 배경이 휠/터치로 스크롤될 수 있음] → 보이지 않는 영역이라 이번 범위에서 제외한다(Non-Goals).
