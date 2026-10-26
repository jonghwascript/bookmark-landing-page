# Proposal

## Why

히어로의 큰 인라인 SVG에는 접근 가능한 이름이나 장식 이미지 표시가 없다. 인접한 제목과 설명이 이미 제품 정보를 전달하므로 SVG를 장식으로 명시하여 화면 읽기 사용자의 불필요한 탐색을 줄인다.

## What Changes

- 히어로 SVG에 `aria-hidden="true"`와 `focusable="false"`를 지정한다.
- 인라인 도형, 크기, 스타일 및 반응형 배치를 유지한다.
- 접근성 트리에서 SVG가 제외되고 히어로 제목·설명·다운로드 링크는 유지되는지 검증한다.

## Capabilities

### New Capabilities

- `hero-content`: 히어로의 의미 있는 텍스트와 컨트롤을 제공하고 장식 일러스트레이션은 보조 기술 탐색에서 제외한다.

### Modified Capabilities

없음. 기존 `mobile-navigation` 명세의 요구사항에는 영향이 없다.

## Impact

- `index.html`: 히어로 SVG의 접근성 속성만 변경한다.
- `doc/a11y-checklist.md`: 검증 결과를 기록한다.
- JavaScript, CSS, 이미지 파일 및 외부 의존성 변경은 필요하지 않다.
