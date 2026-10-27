# Proposal

## Why

이메일 입력란은 페이지 로드 시부터 `aria-describedby="email-error"`로 오류 단락을 가리킨다. `hidden` 요소라도 ID로 참조되면 접근 가능한 설명은 그 콘텐츠로 계산되므로, 아무것도 입력하지 않은 빈 필드에 포커스만 맞춰도 화면 읽기가 "Whoops, make sure it’s an email"을 읽는다. 오류가 생기기 전부터 오류를 안내해 사용자를 혼란스럽게 하고, 실제 오류 안내의 의미도 약해진다.

## What Changes

- 이메일 입력란의 정적 `aria-describedby`를 마크업에서 제거한다.
- 검증 실패로 오류 메시지가 표시될 때만 입력란이 오류 메시지를 설명으로 참조하고, 값이 유효해져 메시지가 숨겨지면 참조를 제거한다.
- 기존 동작(제출 시 검증, 실패 시 입력란 포커스, 오류 상태에서 입력 중 재검증, `aria-invalid` 및 오류 스타일)은 유지한다.

## Capabilities

### New Capabilities

- `contact-form`: 페이지 하단 이메일 연락 양식의 검증, 오류 표시 및 보조 기술 안내 동작.

### Modified Capabilities

없음.

## Impact

- `index.html`: 이메일 입력란의 `aria-describedby` 속성 제거.
- `src/main.js`: `updateEmailError()`에서 오류 표시와 함께 `aria-describedby`를 추가·제거.
- 시각적 표시, CSS(`aria-invalid` 기반 스타일), 외부 의존성은 변경 없음.
