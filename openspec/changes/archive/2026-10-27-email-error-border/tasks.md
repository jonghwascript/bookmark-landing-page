# Tasks

## 1. 충돌 속성 이동

- [x] 1.1 src/style.css의 `@layer components`에 `.c-email-field input { @apply border-transparent px-4; }` 규칙을 오류 규칙 앞에 추가하고, index.html의 `#email`에서 `border-transparent`와 `px-4`를 제거한 뒤 `npm run lint`가 통과하는지 확인한다.

## 2. 검증

- [x] 2.1 375·1440px 오류 상태에서 입력란 테두리가 `2px solid` red-400(rgb(250, 89, 89)), 오른쪽 여백 48px, 왼쪽 여백 16px이고 아이콘·래퍼 빨간 배경이 유지되는지 계산된 스타일로 확인한다.
- [x] 2.2 375·1440px 정상 상태와 오류 해소 후의 테두리·여백·배경·크기가 변경 전 측정값과 같은지 비교한다.
- [x] 2.3 오류 상태에서 긴 값을 입력했을 때 글자가 아이콘과 겹치지 않는지, 포커스 표시가 보이는지 스크린샷으로 확인한다.
- [x] 2.4 `npm run build`와 `npm run format:check`가 통과하는지 확인하고, doc/a11y-checklist.md의 이메일 섹션에 남긴 빨간 테두리 미적용 메모를 해결됨으로 갱신한다.

## Workflow follow-up

- 검토 후 변경을 아카이브하고 `openspec/specs/contact-form/spec.md`에 오류 상태 시각 표시 요구가 추가되었는지 확인한다.
