# Design

## Context

- 버튼 줄은 `div.flex.flex-wrap.justify-center.gap-4.lg:justify-start`이며, 부모 `.page-container`의 좌우 패딩(31px)으로 375px 화면에서 가용 폭은 313px이다.
- 측정값(Chromium, 375px): Chrome 버튼 152.4px(`px-[14.5px]`), Firefox 버튼 147.4px(`px-[15px]`), 간격 16px, 합계 315.8px. 2.8px 초과로 두 번째 버튼이 다음 줄로 내려간다. 414px에서는 한 줄, 320px(가용 258px)에서는 두 줄이다.
- 모바일 디자인(`design/mobile-design.jpg`)에서 두 버튼은 약 147px, 142px, 간격 약 16px로 한 줄에 있다. 글자 크기와 높이는 현재 구현과 비슷하다.
- 요구 동작은 `specs/hero-content/spec.md` 참조.

## Goals / Non-Goals

**Goals:**

- 375px에서 디자인처럼 한 줄 배치, md 이상은 현재 모양 그대로.

**Non-Goals:**

- 320~367px 화면에서 한 줄 강제(글자 축소나 버튼 안 줄바꿈이 필요해 디자인을 해친다).
- 버튼 글꼴·색·높이·호버 상태 변경, 다른 섹션 버튼 정리.

## Decisions

### 1. 모바일 좌우 여백 축소, md부터 기존 값

두 버튼의 기본 좌우 여백을 `px-3`(12px)로 줄이고, `md:px-[14.5px]`, `md:px-[15px]`로 현재 값을 복원한다. 폭은 각각 약 5px 줄어 147.4px, 142.4px가 되어 디자인 측정값과 맞고, 합계 305.8px로 313px 안에 들어간다. 한 줄이 되는 최소 화면 폭은 약 368px이다.

- 대안: 간격을 `gap-3`(12px)로 축소 → 합계 311.8px로 맞지만 여유가 1.2px뿐이고 디자인 간격(약 16px)과 멀어져 기각.
- 대안: `flex-nowrap` → 320px에서 가로 넘침이 생겨 기각.
- 대안: 글자 크기 축소 → 디자인과 달라져 기각.

### 2. 줄바꿈은 유지

`flex-wrap`과 `max-w-full min-w-0`, `wrap-anywhere`는 그대로 두어 좁은 화면에서 넘침 없이 다음 줄로 내려가게 한다.

## Risks / Trade-offs

- [글꼴 로딩 전후나 다른 브라우저의 글자 폭 차이로 375px에서 다시 줄바꿈될 수 있음] → 여유 7.2px를 확보했다. Chromium 측정으로 확인하고, Firefox에서도 가능하면 확인한다.
- [호버 시 1px 테두리가 생겨도 폭이 바뀌지 않는지] → 테두리는 원래 투명 1px로 항상 있으므로 폭 변화가 없다. 확인 항목에 포함한다.
