# Design

## Context

- `index.html`의 `#email` 입력란에는 `aria-describedby="email-error"`가 고정되어 있고, `#email-error` 단락은 `role="alert"`와 `hidden`으로 시작한다.
- `src/main.js`의 `updateEmailError()`는 `validity.valid`에 따라 `emailError.hidden`과 `aria-invalid`를 함께 갱신한다. 제출 시 호출되고, `aria-invalid="true"`인 동안에는 `input` 이벤트마다 호출된다.
- 접근 가능한 설명 계산은 `aria-describedby`가 가리키는 요소가 숨겨져 있어도 그 텍스트를 사용하므로, 현재는 오류가 없을 때도 설명이 노출된다(proposal.md - Why).
- 오류 스타일은 `style.css`의 `[aria-invalid="true"]` 선택자에만 의존하며 `aria-describedby`와 무관하다.

## Goals / Non-Goals

**Goals:**

- 오류 메시지가 보일 때만 설명 연결이 존재하도록 표시 상태와 설명 연결을 한 곳에서 함께 갱신한다.

**Non-Goals:**

- 오류 문구, 시각 디자인, 검증 규칙(`type="email"` + `required`) 변경.
- `role="alert"` 안내 방식 재설계나 실제 제출 처리 추가.

## Decisions

### 1. `updateEmailError()`에서 `aria-describedby`를 토글

유효하지 않으면 `aria-describedby="email-error"`를 설정하고, 유효하면 속성을 제거한다. `hidden`과 `aria-invalid`를 갱신하는 같은 함수에서 처리하므로 제출, 입력 중 재검증 등 모든 경로에서 세 상태가 항상 일치한다. 마크업의 정적 속성은 제거해 초기 상태에서 연결이 없게 한다.

- 대안: `aria-errormessage` 사용 → `aria-invalid="true"`일 때만 노출되도록 정의되어 의미상 적합하지만 화면 읽기 지원이 고르지 않아 기각.
- 대안: 연결은 유지하고 오류 단락 텍스트를 비웠다가 채우기 → 문구가 JS로 옮겨가고 `role="alert"` 안내와 얽혀 기각.
- 대안: 숨김 시 `display: none` 외의 방식(`aria-hidden`) 사용 → ID 참조 설명 계산은 숨김 여부와 무관하므로 효과 없음.

### 2. `role="alert"`와 단락은 그대로 둔다

오류 단락의 마크업, `hidden` 초기값, `role="alert"`는 유지한다. 표시될 때의 즉시 안내는 기존 동작이다.

## Risks / Trade-offs

- [제출 실패 시 `role="alert"` 안내와 입력란 포커스의 설명 안내로 오류가 두 번 읽힐 수 있음(현재도 동일)] → 이번 범위에서는 유지하고, 확인 중 중복이 거슬리면 별도 변경으로 다룬다.
- [이미 오류가 보이는 상태에서 다시 잘못 제출하면 alert가 재안내되지 않을 수 있음(현재도 동일)] → 포커스 이동 시 설명으로 오류가 안내되므로 정보 손실은 없다.
- [실제 화면 읽기 검증이 이 환경에서 어려움] → Chrome 접근성 트리의 description 값으로 확인하고, 실제 화면 읽기 미실행 여부를 기록한다.
