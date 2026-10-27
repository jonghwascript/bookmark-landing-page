# Tasks

## 1. 설명 연결을 오류 표시와 동기화

- [x] 1.1 index.html의 `#email` 입력란에서 `aria-describedby="email-error"`를 제거하고, 페이지 로드 직후 Chrome 접근성 트리에서 입력란의 description이 비어 있는지 확인한다.
- [x] 1.2 src/main.js의 `updateEmailError()`에서 유효하지 않으면 `aria-describedby="email-error"`를 설정하고 유효하면 제거하도록 바꾸고, 잘못된 값 제출 시 description이 오류 문구이며 유효한 값으로 고친 뒤에는 속성이 없는지 확인한다.

## 2. 통합 검증과 기록

- [x] 2.1 빈 값·잘못된 형식·유효한 값 제출, 오류 상태에서 입력 수정 시 오류 표시, aria-invalid, 오류 스타일, 입력란 포커스가 기존과 같은지 브라우저에서 확인한다.
- [x] 2.2 화면 읽기 프로그램으로 빈 필드 포커스 시 오류가 읽히지 않는지 확인하고, 실행하지 못하면 접근성 트리 결과와 미실행 사유를 doc/a11y-checklist.md에 기록한다.
- [x] 2.3 `npm run build`와 `npm run format:check`가 통과하는지 확인한다.

## Workflow follow-up

- 검토 후 변경을 아카이브하고 `openspec/specs/contact-form/spec.md`가 생성되었는지 확인한다.
