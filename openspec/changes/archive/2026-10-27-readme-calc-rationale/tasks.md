# Tasks

## 1. 계산별 Why / Breaks when 추가

- [x] 1.1 "Container limits and desktop alignment"에 Why(히어로 텍스트를 1275px 컨테이너 + 80px 안쪽 선에 맞추기 위함)와 Breaks when(`1275px`가 `page-container`와 두 곳에 중복되어 한쪽만 바꾸면 어긋남, 루트 글꼴 20px에서 헤더 rem 여백과 고정 `80px`가 20px 어긋남)을 쓰고, 측정값(1440px에서 175px 대 155px)과 일치하는지 확인한다.
- [x] 1.2 "Mobile menu padding"에 Why(화면 폭에 비례하는 좌우 여백)와 Breaks when(9vw는 320px에서 28.8px로 줄어 디자인의 32px보다 좁아짐, 메뉴가 열린 동안은 스크롤 고정으로 스크롤바가 없어 vw와 실제 폭이 같음)을 쓴다.
- [x] 1.3 "Feature image proportions and spacing"에 Why(절대 위치 장식 배경이 이미지 아래로 116%까지 내려오므로 다음 내용과 겹치지 않게 공간 확보)와 Breaks when(768~1023px에서 이미지가 536px로 제한되면 여백이 85.5px로 실제 높이의 16%인 66.6px보다 큼)을 쓴다.
- [x] 1.4 "Decorative backgrounds"의 음수 여백 설명에 Why(배경을 화면 왼쪽 끝까지 붙이기)와 Breaks when(`100vw`가 일반 스크롤바 폭을 포함해 왼쪽으로 7.5px 더 나가지만 왼쪽 넘침은 스크롤을 만들지 않아 무해, 같은 기법을 오른쪽에 쓰면 가로 스크롤이 생김)을 쓴다.
- [x] 1.5 "Feature underline sizing and centering"에 Why(모바일 디자인의 163px 비율 유지, `min()`으로 탭보다 넓어지지 않게 함)와 FAQ 화살표의 Breaks when(첫 질문의 위쪽 여백 1rem을 바꾸면 `0.5rem` 보정값도 함께 바꿔야 함)을 쓴다.
- [x] 1.6 "What I learned"의 `18.75rem` 단락에 루트 글꼴 20px의 768px 화면에서는 래퍼가 375px가 되어 양식이 두 줄로 내려간다는 한계를 덧붙인다.
- [x] 1.7 "Layout calculations and percentages"에 "Hero download buttons" 하위 절을 추가해 375px에서의 계산(가용 313px, 버튼 147.4 + 141.4 + 간격 16 = 304.8px), Why(디자인처럼 한 줄 배치), Breaks when(약 368px 미만에서 줄바꿈, 글꼴이 늦게 로드되거나 대체 글꼴이 더 넓으면 375px에서도 줄바꿈될 수 있음)을 쓰고, 목차에는 하위 절(####)이 없으므로 목차는 바꾸지 않는다.

## 2. 검증

- [x] 2.1 추가한 Breaks when 문장의 수치가 제안서의 측정값과 일치하는지 대조하고, 측정하지 않은 주장이 없는지 확인한다.
- [x] 2.2 목차 앵커가 모두 해당 제목으로 연결되는지, `npm run format:check`가 통과하는지 확인한다.

## Workflow follow-up

- 검토 후 변경을 아카이브한다. 명세 변경이 없으므로 명세 동기화는 필요 없다.
