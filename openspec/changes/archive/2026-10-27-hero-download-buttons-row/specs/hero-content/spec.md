# Spec Delta

## ADDED Requirements

### Requirement: 다운로드 버튼 배치

히어로의 Get it on Chrome과 Get it on Firefox 버튼은 SHALL 375px 이상 화면 폭에서 한 줄에 나란히 표시되고, 두 버튼이 한 줄에 들어가지 않는 더 좁은 화면에서는 가로 넘침 없이 다음 줄로 넘어간다.

#### Scenario: 모바일 디자인 폭

- **WHEN** 375px 화면 폭에서 히어로를 표시한다.
- **THEN** 두 다운로드 버튼이 같은 줄에 가운데 정렬로 나란히 놓인다.
- **THEN** 버튼의 글자 크기, 높이, 색은 변경 전과 같다.

#### Scenario: 더 좁은 화면

- **WHEN** 320px 화면 폭에서 히어로를 표시한다.
- **THEN** 두 버튼은 줄바꿈되어 표시되고 페이지에 가로 스크롤이 생기지 않는다.

#### Scenario: 태블릿과 데스크톱

- **WHEN** md 이상 화면 폭에서 히어로를 표시한다.
- **THEN** 두 버튼의 크기와 위치는 변경 전과 같다.
