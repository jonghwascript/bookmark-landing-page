# Tasks

## 1. 장식 SVG 접근성 처리

- [x] 1.1 index.html의 히어로 SVG 루트에 aria-hidden=true와 focusable=false를 추가하고, 텍스트·링크 및 다른 SVG에는 변경이 없는지 diff로 확인한다.
- [x] 1.2 모바일과 데스크톱 브라우저에서 접근성 트리의 SVG 하위 트리 제외 및 제목·설명·링크 유지를 확인하고, Tab·Shift+Tab으로 다운로드 링크 접근과 SVG 포커스 제외를 검증한다.
- [x] 1.3 모바일과 데스크톱에서 일러스트레이션 표시·크기·배치를 변경 전과 비교하고 검증 환경, 결과 및 실제 화면 읽기 검증 여부를 doc/a11y-checklist.md에 기록한다.

## 2. 통합 검증

- [x] 2.1 npm run build, npm run format:check 및 openspec validate hero-illustration-accessibility --strict가 통과하는지 확인한다.
