# Design

## Context

- `src/style.css`는 `@import "tailwindcss"` 뒤 `@layer components` 안에 두 규칙을 둔다.
  - `.c-email-field:has([aria-invalid="true"])`: 래퍼에 `rounded-[5px] bg-red-400`(아래 메시지 띠).
  - `.c-email-field input[aria-invalid="true"]`: `border-red-400`, 오류 아이콘 배경, `pr-12`.
- `index.html`의 `#email`에는 `border-2 border-transparent bg-white px-4 py-[9px] rounded-[5px]` 등 유틸리티가 있다.
- Tailwind v4는 `theme, base, components, utilities` 순으로 cascade layer를 선언하므로, 뒤 layer의 유틸리티가 components 규칙을 선택자 우선순위와 무관하게 이긴다.
- 측정(Chromium, 375·1440px, 오류 상태): 테두리 `2px solid transparent`, 좌우 여백 16px/16px. 아이콘 배경(20px, 오른쪽 16px)과 래퍼 빨간 배경은 정상 적용. 즉 유틸리티와 겹치는 `border-color`, `padding-right`만 사라진다.
- 요구 동작은 `specs/contact-form/spec.md` 참조.

## Goals / Non-Goals

**Goals:**

- 오류 테두리와 오른쪽 여백이 실제로 적용되게 하되, 정상 상태의 계산된 스타일은 바꾸지 않는다.

**Non-Goals:**

- 오류 문구·아이콘·메시지 띠 디자인 변경, 다른 컴포넌트의 layer 정리.

## Decisions

### 1. 충돌하는 속성을 컴포넌트 규칙으로 옮김

입력란에서 `border-transparent`와 `px-4`를 빼고, `.c-email-field input` 컴포넌트 규칙에 정상 상태 값(`border-transparent px-4`)을 둔다. 정상 규칙과 오류 규칙이 같은 `components` layer에 있으므로 일반 우선순위대로 `[aria-invalid="true"]`가 붙은 오류 규칙이 이긴다. `border-2`(두께), `bg-white`, `py-[9px]` 등 겹치지 않는 유틸리티는 마크업에 남긴다.

- 대안: 오류 규칙을 layer 밖(unlayered)으로 이동 → 모든 유틸리티를 이기므로 동작하지만, 앞으로 입력란에 붙일 유틸리티까지 덮어써 예측하기 어려워 기각.
- 대안: 마크업에 `aria-[invalid=true]:border-red-400 aria-[invalid=true]:pr-12` 변형 사용 → 동작하지만 오류 스타일이 CSS와 마크업 두 곳으로 갈라져 기각.
- 대안: `@apply border-red-400!` 등 important 사용 → 우선순위 문제를 가리기만 해서 기각.

### 2. 래퍼 규칙은 그대로

래퍼의 빨간 배경 규칙은 겹치는 유틸리티가 없어 이미 동작하므로 바꾸지 않는다.

## Risks / Trade-offs

- [마크업에서 유틸리티를 뺀 뒤 정상 상태 값이 달라질 수 있음] → 변경 전후 정상·오류 상태의 계산된 스타일(테두리, 여백, 배경, 크기)을 375·1440px에서 비교한다.
- [입력란 포커스 표시가 빨간 테두리와 겹쳐 보일 수 있음] → 브라우저 기본 포커스 링은 테두리 바깥에 그려지므로 확인 항목에서 눈으로 확인한다.
