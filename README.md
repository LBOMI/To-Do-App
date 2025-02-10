## ✨ To-Do App
* 할 일과 마감 기한을 입력하면 남은 시간이 자동으로 표시되는 To-Do App입니다.
* 완료 여부 체크, 수정, 삭제 기능을 제공하며, 사용자 친화적인 UI로 간편하게 일정 관리를 할 수 있습니다.

---
### 🎥 UI

---

### 🤍 주요 기능
* **할 일 추가**: 타이틀과 마감 기한 을 입력하여 새로운 할 일을 등록
* **남은 시간 표시**: 마감 기한까지의 남은 시간이 실시간으로 표시
* **완료 체크**: 체크박스를 통해 할 일을 완료 처리
* **수정 & 삭제**: 추가한 할 일 수정 및 삭제 가능
* **반응형 디자인**: 다양한 화면 크기에서 최적화된 UI 제공

---

### 🛠 사용 기술
* **Frontend**: React
* **Styling**: Styled-Components

---

### 소스 빌드 및 실행 방법 메뉴얼 
#### 시스템 요구 사항
- Node.js
- npm (또는 yarn)
- Git
- Web Browser

#### 소스 코드 다운로드
```bash
git clone https://github.com/your-username/todo-app.git
cd todo-app
```

#### 패키지 설치
```bash
npm install
```
(또는 `yarn install`)

#### 개발 서버 실행
```bash
npm start
```
* 브라우저에서 `http://localhost:3000` 접속

#### 프로덕션 빌드
```bash
npm run build
```

#### 빌드 결과 실행
```bash
npm install -g serve
serve -s build
```
* 브라우저에서 `http://localhost:5000` 접속

---
### 주력으로 사용한 컴포넌트
#### 'TaskList' 컴포넌트
* 할 일 목록을 관리하는 *핵심 컴포넌트*
* 'TaskInput'에서 전달받은 할 일 데이터를 기반으로 'TaskItem'들을 렌더링
* 할 일이 추가되거나 삭제될 때 상태를 업데이트하여 전체 목록이 즉시 반영되도록 구현

---
### 향후 업데이트
* 로컬 스토리지 저장 기능 추가
* Drag & Drop을 활용한 할 일 정렬
* 다크 모드 지원


