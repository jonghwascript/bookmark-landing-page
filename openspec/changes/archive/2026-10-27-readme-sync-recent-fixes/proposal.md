# Proposal

## Why

2026-10-27에 main에 반영된 7개 커밋(모바일 메뉴 `<dialog>` 전환, 이메일 오류 설명 연결, Features 탭 전환, 히어로 버튼 한 줄 배치, 이메일 오류 테두리, 메뉴 배경 스크롤 고정)이 README.md에 반영되지 않았다. 특히 README는 Features 선택이 `aria-current`를 쓴다고 설명하지만 지금은 탭(`aria-selected`)이며, 밑줄이 "링크" 폭에 맞춰진다고 하지만 지금은 버튼이다. 저장소를 처음 보는 사람이 잘못된 구현을 배우게 된다.

## What Changes

- **The challenge**: Features 탭의 키보드 조작(화살표, Home/End)과 모바일 메뉴의 모달 동작(포커스 유지, 배경 비활성, 스크롤 고정)을 사용자 기능 목록에 반영한다.
- **What I learned**: `aria-current` 설명을 탭 패턴(`aria-selected`, 로빙 tabindex, 자동 활성화)으로 바꾸고, 이메일 오류는 오류가 보일 때만 `aria-describedby`로 연결된다는 점과 Tailwind v4 cascade layer 때문에 오류 테두리가 유틸리티에 밀렸던 원인을 짧게 추가한다.
- **Feature underline sizing**: "link"를 탭 버튼으로 고친다.
- **AI collaboration**: 기존 Codex 문장은 유지하고, Claude Code가 접근성 수정, 히어로 버튼 배치, 스크롤 고정을 도왔다는 문장을 추가한다.
- 배포, 로컬 개발, 레이아웃 계산 설명은 확인 결과 현재 코드와 맞으므로 바꾸지 않는다.

## Capabilities

### New Capabilities

없음.

### Modified Capabilities

없음. 문서만 바뀌고 시스템 동작은 바뀌지 않으므로 `skip_specs: true`로 둔다.

## Impact

- `README.md`만 변경. 코드, 스타일, 명세는 변경 없음.
