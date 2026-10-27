# Proposal

## Why

Features 섹션의 전환기는 실제로는 탭이지만 `<nav aria-label="Features">` 안의 해시 링크로 만들어져 있다. 스크립트가 링크의 기본 이동을 취소하고 `aria-current="location"`과 패널의 `hidden`만 바꾸므로, 포커스는 그대로이고 화면 읽기 사용자는 항목을 활성화해도 아무 안내를 듣지 못한다. 또한 어디로도 이동하지 않는 내비게이션 랜드마크가 페이지에 추가되어 랜드마크 탐색을 어지럽힌다.

## What Changes

- Features 전환기를 `nav`/링크 대신 탭 목록, 탭, 탭 패널 의미로 바꾼다. 페이지에서 "Features" 내비게이션 랜드마크가 사라진다.
- 각 탭은 선택 상태를 노출하고 자신이 제어하는 패널과 연결되며, 각 패널은 해당 탭으로 이름이 붙는다.
- 탭 목록은 Tab 순서에서 한 번만 멈추고, 화살표 키와 Home/End로 탭 사이를 이동하며 이동과 동시에 해당 패널을 표시한다.
- 선택 표시(빨간 밑줄)는 `aria-current` 대신 선택 상태를 기준으로 그리며, 기존 시각 디자인과 패널 전환 애니메이션은 유지한다.

## Capabilities

### New Capabilities

- `feature-tabs`: Features 섹션의 탭 전환기 의미, 선택 상태 안내, 키보드 조작과 패널 표시 동작.

### Modified Capabilities

없음.

## Impact

- `index.html`: Features `nav`/목록/링크를 탭 목록과 탭 버튼으로 교체하고 세 패널에 탭 패널 의미와 연결을 추가.
- `src/main.js`: `aria-current` 토글을 탭 선택, 로빙 tabindex, 키보드 처리로 교체.
- `src/style.css`: `.c-feature-link[aria-current="location"]` 선택자를 선택 상태 기준으로 변경.
- 헤더·모바일 메뉴·푸터의 `#features` 링크는 섹션 ID를 그대로 가리키므로 영향 없음. 외부 의존성 없음.
