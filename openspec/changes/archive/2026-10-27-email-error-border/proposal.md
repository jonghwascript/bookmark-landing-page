# Proposal

## Why

이메일 검증에 실패하면 디자인(`design/desktop-active-states.jpg`)처럼 입력란에 빨간 테두리가 보여야 하지만, 실제로는 테두리가 투명한 채로 남는다. 오류 아이콘과 아래쪽 빨간 메시지 띠는 표시되므로, 사용자가 입력란 자체의 오류 상태를 놓치기 쉽다. 같은 원인으로 오류 아이콘 자리를 비우는 오른쪽 여백(48px)도 적용되지 않아 긴 입력값이 아이콘 아래로 겹칠 수 있다.

원인은 Tailwind v4의 cascade layer 순서다. 오류 규칙은 `@layer components`에 있고, 입력란의 `border-transparent`·`px-4` 유틸리티는 그보다 뒤인 `@layer utilities`에 있어 선택자 우선순위와 관계없이 유틸리티가 이긴다.

## What Changes

- 오류 상태(`aria-invalid="true"`)에서 이메일 입력란에 빨간색(red-400) 2px 테두리를 표시한다.
- 오류 상태에서 입력란 오른쪽 여백을 48px로 넓혀 입력값이 오류 아이콘과 겹치지 않게 한다.
- 정상 상태의 모양(투명 테두리, 좌우 16px 여백, 흰 배경)과 오류 아이콘, 빨간 메시지 띠, 크기·위치는 그대로 둔다.

## Capabilities

### New Capabilities

없음.

### Modified Capabilities

- `contact-form`: 검증 오류 시 입력란의 시각적 오류 표시(빨간 테두리, 아이콘과 겹치지 않는 입력 영역) 요구를 추가한다.

## Impact

- `index.html`: 이메일 입력란의 `border-transparent`, `px-4` 유틸리티 정리.
- `src/style.css`: `.c-email-field` 컴포넌트 규칙에 정상 상태의 테두리 색과 좌우 여백을 옮겨 오류 규칙과 같은 layer에서 겨루게 한다.
- 스크립트, 다른 버튼·섹션은 변경 없음.
