# Proposal

## Why

데스크톱(lg 이상)에서 히어로 제목은 헤더 로고와 같은 왼쪽 선에서 시작해야 한다. 그런데 히어로 왼쪽 여백의 안쪽 간격은 고정값 `80px`이고 헤더 여백은 `md:px-20`(5rem)이라, 브라우저 기본 글꼴을 키우면 두 선이 어긋난다. 측정 결과 1024·1280·1440·1600px 모두에서 루트 글꼴 20px일 때 히어로 제목이 로고보다 20px, 24px일 때 40px 왼쪽에서 시작한다. 기본 글꼴 크기를 키우는 사용자에게 레이아웃이 틀어져 보인다.

## What Changes

- 히어로 왼쪽 여백 계산의 안쪽 간격을 `80px`에서 헤더와 같은 단위인 `5rem`으로 바꾼다.
- 기본 글꼴(16px)에서는 5rem = 80px이라 화면은 그대로다.
- README의 해당 계산 설명(코드 예시와 Breaks when)을 바뀐 값에 맞게 고친다.

## Capabilities

### New Capabilities

없음.

### Modified Capabilities

- `hero-content`: 데스크톱에서 히어로 제목이 브라우저 기본 글꼴 크기와 관계없이 헤더 로고와 같은 왼쪽 선에서 시작한다는 요구를 추가한다.

## Impact

- `index.html`: 히어로 섹션의 `lg:pl-[...]` 클래스 한 개.
- `README.md`: "Container limits and desktop alignment" 절.
- 스크립트·다른 섹션 변경 없음.
