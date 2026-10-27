# Design

## Context

- 모바일 메뉴는 `index.html`의 `<dialog id="mobile-menu">`이며 `src/main.js`가 `showModal()`/`close()`로 연다. 메뉴는 `fixed inset-y-0 right-0 h-[100dvh] w-screen overflow-y-auto`로 화면 전체를 덮는다.
- 모달 대화상자는 배경을 inert로 만들지만 문서 스크롤은 막지 않는다. `src/style.css`에는 `html`/`body`의 `overflow` 규칙이 없다.
- 측정(Playwright Chromium, 메뉴 열린 상태에서 메뉴 위 휠 1500px): 375px 마우스·터치 에뮬레이션, 900px 모두 `scrollY`가 0 → 1500이 되고, 닫은 뒤에도 1500에 남는다.
- 요구 동작은 `specs/mobile-navigation/spec.md` 참조.

## Goals / Non-Goals

**Goals:**

- 메뉴가 열린 동안 문서 스크롤을 CSS만으로 고정하고, 닫으면 자동으로 풀리게 한다.

**Non-Goals:**

- 스크롤바 폭만큼 넓은 `w-screen` 메뉴 폭 문제(별도 항목).
- 메뉴 열기·닫기 스크립트 변경.

## Decisions

### 1. `:root:has(dialog:modal) { overflow: hidden; }`

`src/style.css`에 이 규칙 하나를 둔다. `showModal()`로 열린 대화상자가 있는 동안에만 문서 스크롤이 막히고, `close()`(닫기 버튼, Escape, 링크, 화면 폭 전환 등 모든 경로)와 함께 자동으로 풀린다. `overflow: hidden`은 `scrollTop`을 바꾸지 않으므로 열기 전 위치가 유지된다.

- 대안: 스크립트에서 열 때 `document.documentElement.style.overflow`를 설정하고 `close` 이벤트에서 해제 → 동작하지만 닫기 경로마다 상태를 맞춰야 해서 지난 변경에서 줄인 메뉴 스크립트가 다시 늘어나 기각.
- 대안: `body { position: fixed; top: -scrollY }` 방식 → iOS 구형 대응용이며 위치 저장·복원 스크립트가 필요해 기각. 대상 브라우저(모달 `<dialog>`와 `:has()` 지원)는 문서 `overflow: hidden`을 존중한다.
- 선택자는 `#mobile-menu` 대신 `dialog:modal`로 둔다. 페이지의 모달 대화상자는 이것 하나이고, 앞으로 모달이 생겨도 같은 동작이 맞다.

### 2. 메뉴 자체 스크롤은 그대로

메뉴는 이미 `overflow-y-auto`라 내용이 넘치면 메뉴 안에서 스크롤된다. 문서가 스크롤할 수 없으므로 스크롤 체이닝이 배경으로 넘어가지 않아 `overscroll-behavior`는 추가하지 않는다.

## Risks / Trade-offs

- [스크롤바가 있는 데스크톱 좁은 창에서 열 때 스크롤바가 사라져 배경 레이아웃이 약 15px 움직임] → 메뉴가 화면 전체를 덮어 보이지 않는다. 오히려 열린 동안에는 `w-screen` 메뉴가 뷰포트와 같은 폭이 된다.
- [대화상자가 열린 상태에서 페이지 내부 링크로 이동할 때 스크롤이 막힐 수 있음] → 메뉴 링크는 기본 이동 뒤 `setTimeout`으로 닫으므로, 이동 시점과 해제 순서를 확인 항목에 넣는다. 막힌다면 `#features` 등으로 실제 이동하는지 검증하고 필요하면 설계를 다시 본다.
