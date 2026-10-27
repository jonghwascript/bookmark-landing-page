# Tasks

## 1. README 내용 갱신

- [x] 1.1 "The challenge"의 Features 항목에 화살표·Home/End 키보드 조작을, 모바일 메뉴 항목에 포커스 유지·배경 비활성·스크롤 고정을 추가하고, 각 문장이 `src/main.js`·`src/style.css`의 현재 동작과 맞는지 대조한다.
- [x] 1.2 "What I learned"의 `aria-current` 설명을 탭 패턴(`aria-selected`, 로빙 tabindex, 자동 활성화)으로 바꾸고, 이메일 오류의 조건부 `aria-describedby`와 cascade layer 때문에 오류 테두리가 밀렸던 원인을 한두 문장으로 추가한 뒤, 코드와 대조한다.
- [x] 1.3 "Feature underline sizing and centering"에서 "link"를 탭 버튼으로 고치고, 밑줄이 `.c-feature-link[aria-selected="true"]::after` 기준임을 `src/style.css`와 대조한다.
- [x] 1.4 "AI collaboration"에 Codex 문장을 유지한 채 Claude Code가 접근성 수정(모바일 메뉴 대화상자, Features 탭, 이메일 오류 안내와 테두리), 히어로 버튼 배치, 메뉴 스크롤 고정을 도왔다는 문장을 추가한다.

## 2. 검증

- [x] 2.1 README에 `aria-current`나 Features "nav"/"link" 같은 옛 설명이 남아 있지 않은지 검색으로 확인하고, 목차 앵커가 그대로 동작하는지 확인한다.
- [x] 2.2 `npm run format:check`가 통과하는지 확인한다.

## Workflow follow-up

- 검토 후 변경을 아카이브한다. 명세 변경이 없으므로 명세 동기화는 필요 없다.
