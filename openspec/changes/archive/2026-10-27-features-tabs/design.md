# Design

## Context

- `index.html`의 `#features` 섹션 안에 `<nav aria-label="Features">` > `<ul>` > `<li class="c-feature-divider">` > `<a class="c-feature-link" href="#simple-bookmarking">` 구조가 있다. 첫 링크만 `aria-current="location"`을 가진다.
- 세 패널은 `#features` 섹션 뒤의 형제 `<section class="c-feature-panel">`(`#simple-bookmarking`, `#speedy-searching`, `#easy-sharing`)이고, 각자 h3 제목으로 `aria-labelledby`가 걸려 있으며 두 번째·세 번째는 `hidden`이다.
- `src/main.js`는 링크 클릭 시 `preventDefault()` 후 `hash`로 패널을 찾아 `hidden`과 `aria-current`를 토글한다. 포커스 이동이나 키보드 처리는 없다.
- `src/style.css`: `.c-feature-link`(밑줄 의사요소)와 `.c-feature-link[aria-current="location"]::after`로 선택 밑줄을 그린다. 구분선은 `li.c-feature-divider`의 `::before`/`::after`와 `:nth-of-type`, `:last-child`에 의존한다. 패널은 `.c-feature-panel`의 페이드 애니메이션(감소된 동작 설정 시 없음)을 쓴다.
- 요구 동작은 `specs/feature-tabs/spec.md` 참조.

## Goals / Non-Goals

**Goals:**

- WAI-ARIA Authoring Practices의 탭 패턴(자동 활성화)을 기존 마크업 구조와 시각 디자인을 최대한 유지하며 적용한다.

**Non-Goals:**

- 패널 내용, 이미지, 레이아웃, 애니메이션 변경.
- 선택 탭을 URL 해시에 반영하거나 해시로 초기 탭을 고르는 기능.
- JavaScript 비활성 환경 대체 동작(현재도 숨겨진 패널은 JS 없이 볼 수 없다).

## Decisions

### 1. `nav` 제거, `ul`을 탭 목록으로

`<nav>`를 제거하고 `<ul>`에 `role="tablist"`와 `aria-label="Features"`를 둔다. `<li>`에는 `role="none"`을 주어 목록 의미를 걷어내고 탭이 탭 목록에 직접 속하게 한다. `li.c-feature-divider` 구조를 유지하므로 구분선 CSS(`:nth-of-type`, `:last-child`)를 바꿀 필요가 없다.

- 대안: `div` 래퍼로 전부 교체 → 구분선 선택자는 동작하지만 마크업 변경이 커져 기각.
- 이름은 `aria-label="Features"`로 둔다. 바로 위 h2도 "Features"지만 `aria-labelledby="features-title"`로 연결해도 결과가 같아 어느 쪽이든 무방하며, 기존 문구를 유지한다.

### 2. 링크 → `<button role="tab">`

각 탭은 `<button type="button" role="tab" id="tab-…" aria-controls="<패널 id>" aria-selected="true|false" tabindex="0|-1">`로 바꾼다. 링크가 아니므로 기본 이동 취소가 필요 없고 Enter/Space 활성화가 기본 제공된다. 클래스 `c-feature-link`는 유지하고, 링크였을 때의 포인터 커서를 유지하려고 `cursor-pointer`를 더한다(Tailwind preflight는 버튼 커서를 기본값으로 둔다).

### 3. 패널은 탭 이름으로

세 패널 `<section>`에 `role="tabpanel"`을 주고 `aria-labelledby`를 h3 대신 해당 탭 id로 바꾼다. 패널에 포커스 가능한 More Info 링크가 있으므로 APG 권고대로 패널 자체에는 `tabindex`를 주지 않는다. `hidden` 토글과 애니메이션은 그대로 쓴다.

### 4. 자동 활성화와 키보드 처리

패널 전환은 지연이 없으므로 포커스 이동과 동시에 선택하는 자동 활성화를 쓴다. 탭 목록의 `keydown`에서:

- ArrowRight/ArrowDown: 다음 탭(순환), ArrowLeft/ArrowUp: 이전 탭(순환), Home/End: 처음/마지막 탭. 처리한 키는 `preventDefault()`로 페이지 스크롤을 막는다.
- 모바일에서는 탭이 세로로 쌓이므로 가로·세로 화살표를 모두 받는다. `aria-orientation`은 지정하지 않는다(기본 horizontal). 화면 폭에 따라 바꾸는 것보다 두 방향을 모두 받는 편이 단순하고 사용자 기대와도 맞는다.

선택 함수 하나(`selectTab(tab, { focus })`)가 모든 탭의 `aria-selected`, `tabindex`, 패널 `hidden`을 갱신하고, 키보드 경로에서만 포커스를 옮긴다.

### 5. 선택 밑줄 CSS

`.c-feature-link[aria-current="location"]::after`를 `.c-feature-link[aria-selected="true"]::after`로 바꾼다. 다른 스타일은 그대로다.

## Risks / Trade-offs

- [버튼 기본 스타일 차이로 탭 글자 정렬·크기가 달라질 수 있음] → preflight가 버튼 글꼴·배경을 초기화하고 `block w-full`, 부모 `text-center`가 유지되므로 동일할 것으로 보지만, 모바일·데스크톱 폭에서 변경 전과 비교 확인한다.
- [hover 색(`hover:text-red-400`)과 포커스 표시가 버튼에서 다르게 보일 수 있음] → 확인 항목에 포함한다.
- [기존 `#simple-bookmarking` 등 해시로 들어오는 외부 링크가 있다면 동작이 그대로 아님] → 현재도 해시로 탭이 바뀌지 않으므로 회귀는 아니다.
