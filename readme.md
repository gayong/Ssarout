# <싸:라웃> - 음성 분석을 통한 AI 보컬 트레이닝🎤🎵
**SSAFY 9기 2학기 공통 프로젝트 - 싸:라웃**
 [UCC 보러가기](https://youtu.be/fpCaXvi1ilU)  
<br/>
## 서비스 소개
### 개요
- 서비스 명 : 싸:라웃
- 뜻 : `SSAFY`에다 영단어 `Shout out`을 결합한 것으로, 자신의 노래 실력을 맘껏 외치고 뽐내라는 의미
- 기획의도 : 노래방에 가지 않고도 노래 연습을 할 수 있고, 실력을 확인할 수 있는 서비스를 제공하자

### 타겟

- 노래 실력을 키우고 싶은 사람들
- 노래별로 음정, 박자 점수를 받고 성장그래프로 확인하고 싶은 사람들
- 틀린 구간만 따로 연습해보고 싶은 사람들
- AI가 내 목소리로 부른 노래를 들어보고 싶은 사람들
<br/>

## 프로젝트 진행 기간

23.07.10(월) ~ 23.08.18(금)  
<br/>

## 개발 환경

<div align=center>

### Back-end
<p align="center" data-align="center">
<img align="center" src="https://img.shields.io/badge/springboot-6DB33F?style=flat-square&logo=springboot&logoColor=white"/>
<img align="center" src="https://img.shields.io/badge/springsecurity-6DB33F?style=flat-square&logo=springsecurity&logoColor=white"/>
<img align="center" src="https://img.shields.io/badge/OAuth-000000?style=flat-square&logo=OAuth&logoColor=white"/>
<img align="center" src="https://img.shields.io/badge/Java-007396?style=flat-square&logo=OpenJDK&logoColor=white"/>
</p>


### Front-end
<p align="center">
<img src="https://img.shields.io/badge/react-339933?style=flat-square&logo=react&logoColor=white">
<img src="https://img.shields.io/badge/reactrouter-CA4245?style=flat-square&logo=reactrouter&logoColor=white">
<img src="https://img.shields.io/badge/node.js-339933?style=flat-square&logo=nodedotjs&logoColor=white">
<img src="https://img.shields.io/badge/Javascript-F7DF1e?style=flat-square&logo=javascript&logoColor=white"/>
<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white"/>
</p>

### DB
<p align="center">
<img src="https://img.shields.io/badge/mysql-4479A1?style=flat-square&logo=mysql&logoColor=white"> 
<img src="https://img.shields.io/badge/amazons3-569A31?style=flat-square&logo=amazons3&logoColor=white">
<img src="https://img.shields.io/badge/redis-DC382D?style=flat-square&logo=redis&logoColor=white">
</p>

### Dev-Ops
<p align="center">
<img src="https://img.shields.io/badge/amazonec2-FF9900?style=flat-square&logo=amazonec2&logoColor=white"/>
<img src="https://img.shields.io/badge/jenkins-D24939?style=flat-square&logo=jenkins&logoColor=white"/>
<img src="https://img.shields.io/badge/docker-2496ED?style=flat-square&logo=docker&logoColor=white"/>
<img src="https://img.shields.io/badge/nginx-009639?style=flat-square&logo=nginx&logoColor=white"/>
</p>

### AI 관련
<p align="center">
<img src="https://img.shields.io/badge/Python-3766AB?style=flat-square&logo=Python&logoColor=white"/>
<img src="https://img.shields.io/badge/googlecloud-4285F4?style=flat-square&logo=googlecloud&logoColor=white"/>
<img src="https://img.shields.io/badge/flask-000000?style=flat-square&logo=flask&logoColor=white"/>
</p>

### 협업 tool
<p align="center">
<img src="https://img.shields.io/badge/figma-F24E1E?style=flat-square&logo=figma&logoColor=white">
<img src="https://img.shields.io/badge/jira-0052CC?style=flat-square&logo=jira&logoColor=white">
<img src="https://img.shields.io/badge/notion-000000?style=flat-square&logo=notion&logoColor=white">
<img src="https://img.shields.io/badge/gitlab-FC6D26?style=flat-square&logo=gitlab&logoColor=white">
</p>  
<br/>
</div>

## 기능 소개

- SNS 로그인
- 노래 부르기
  - 선택한 노래에 대한 MR과 가사 제공
  - 푸리에 변환을 활용해 사용자의 노래 음정 표출
  - MR의 음정을 캔버스 위 퍼펙트 스코어 형태로 제공
  - 재생 버튼과 함께 MR 음성과 캔버스 시작
  - 정지 버튼으로 녹음을 마칠 수 있음
  - 음정, 박자 코칭
    - 음절 별 음정, 박자 정확도를 `good`, `bad`, `perfect` 로 실시간 제공
      - 경우에 따라 다른 색으로 표시해 사용자 편의를 제공
    - 부르는 음절에 따라 캔버스 하단에 `음정이 높아요`, `떨어지고 있어요`, `흔들려요` / `박자가 맞지 않아요` 멘트를 실시간으로 보여줌

- 분석 결과 및 다시 부르기(연습실)
  
  - 녹음 도중 실시간으로 계산된 음정, 박자 점수를 제공
  - 소절 단위로 끊어진 바에 맞은 구간은 파란색, 틀린 구간은 빨간색으로 표시
  - 소절 선택 시 해당 구간의 가사, MR이 재생됨
  - 연습을 끝내고싶다면 `연습끝내기`를 눌러 메인페이지로 이동

- 노래 검색
  
  - 가수, 제목(초성 가능)으로 검색
  - 검색 결과에서 즐겨찾기 등록 가능
  - 사용자는 검색결과의 `부르러가기` 버튼을 통해 녹음 페이지로 이동
  - 아직 가사, MR 싱크가 준비되지 않은 곡은 `추후 제공될 예정입니다.` 와 함께 비활성화

- 마이페이지
  
  - 프로필
    - SNS 로그인을 통해 받아온 프로필 사진, 최초 설정한 닉네임, 회원정보수정 버튼 제공
  - 즐겨찾기
    - 검색 결과에서 즐겨찾기 한 곡들을 앨범아트 목록 형태로 제공
    - 검색 결과와 동일하게 별을 눌러 즐겨찾기 해제 가능
    - 앨범아트 클릭 시 녹음 페이지로 이동
  - 기록된 노래
    - 부른 노래들의 음정, 박자 점수들의 평균인 종합 점수를 `%` 형태로 제공
    - 점수 추이를 확인할 수 있는 성장그래프 제공
  - AI
    - AI 노래 학습을 위한 최소 기준치 `기록된 노래 5개`를 기점으로 분기
      - 5개 미만 : 진행바를 통해 현재 녹음 개수 및 더 필요한 녹음 개수를 시각화하여 제공
      - 5개 이상
        - `AI 노래 생성은 한 시간 정도 소요됩니다` 안내와 함께 `AI 노래 만들어주세요` 버튼 활성화
        - 생성 요청 버튼 클릭 시 POST 요청과 함께 `AI 노래를 생성중입니다` 버튼으로 변경
        - 생성 완료 시 `AI 노래 들으러 가기` 버튼으로 변경, 클릭 시 AI 노래 페이지로 연결

- 히스토리
  
  - 부른 음성 + MR 파일을 동시재생해 사용자는 부른 곡들을 다시 들을 수 있음
  - 날짜, 시간별로 정렬된 목록 제공
  - 뒤로가기나 로고 클릭 시 재생중이던 음성 정지

- 회원정보 수정
  
  - 사용자는 닉네임을 수정할 수 있음
    - 빈 값 입력 비허용
  - 회원탈퇴

- AI가 불러주는 노래
  
  - 사용자에게 앨범아트와 재생 버튼 형태로 제공
  - 싸라웃에서 제공하는 노래들에 대한 합성곡을 들을 수 있음

## 화면구현

<p align="center">
  <img src="readme_assets/96be658f32778beafebf3b597734aaca8624a4a9.gif" align="center" width="32%">
  <img src="readme_assets/06a9da4b3c619b79c2004f176e3a834cb2cc47b5.gif" align="center" width="32%">
  <img src="readme_assets/12205e3e3dc24124ec4cac9f17367f3f44d58d29.gif" align="center" width="32%">
</p>

## 

## 시스템 아키텍처


![image (11).png](readme_assets/52a9e5c563f6ccd1cf5261eac5d5c233703ed8b2.png)

## 

## 

## 프로젝트 구조도


```
📦공통PJT_주석 살린 버전
 ┣ 📂public
 ┃ ┣ 📂dist
 ┃ ┃ ┣ 📜index.css
 ┃ ┃ ┗ 📜index.js
 ┃ ┣ 📜burger.png
 ┃ ┣ 📜close.png
 ┃ ┣ 📜emptystar.png
 ┃ ┣ 📜favicon.ico
 ┃ ┣ 📜fullstar.png
 ┃ ┣ 📜HSSantokki-Regular.ttf
 ┃ ┣ 📜index.html
 ┃ ┣ 📜LINESeedKR-Rg.ttf
 ┃ ┣ 📜LINESeedKR-Th.ttf
 ┃ ┣ 📜manifest.json
 ┃ ┣ 📜NewSlider1.png
 ┃ ┣ 📜NewSlider2.png
 ┃ ┣ 📜pause.png
 ┃ ┣ 📜play.png
 ┃ ┣ 📜questmark.png
 ┃ ┣ 📜robots.txt
 ┃ ┗ 📜search.png
 ┣ 📂src
 ┃ ┣ 📂Api
 ┃ ┃ ┣ 📜Api.js
 ┃ ┃ ┗ 📜backupApi.js
 ┃ ┣ 📂assets
 ┃ ┃ ┣ 📜burger.png
 ┃ ┃ ┣ 📜close.png
 ┃ ┃ ┗ 📜questmark.png
 ┃ ┣ 📂components
 ┃ ┃ ┣ 📂AnalysisPage
 ┃ ┃ ┃ ┗ 📜LyricsBars.js
 ┃ ┃ ┣ 📂commonUse
 ┃ ┃ ┃ ┣ 📜burger.png
 ┃ ┃ ┃ ┣ 📜close.png
 ┃ ┃ ┃ ┣ 📜Footer.js
 ┃ ┃ ┃ ┣ 📜Hamburger.js
 ┃ ┃ ┃ ┣ 📜Hamburger.module.css
 ┃ ┃ ┃ ┣ 📜Header.js
 ┃ ┃ ┃ ┣ 📜Header.module.css
 ┃ ┃ ┃ ┣ 📜Sidebar.js
 ┃ ┃ ┃ ┗ 📜Sidebar.module.css
 ┃ ┃ ┣ 📂history
 ┃ ┃ ┃ ┣ 📜HistoryCom.js
 ┃ ┃ ┃ ┣ 📜HistoryCom.module.css
 ┃ ┃ ┃ ┣ 📜HistoryDetailCom.js
 ┃ ┃ ┃ ┣ 📜HistoryDetailCom.module.css
 ┃ ┃ ┃ ┣ 📜pause.png
 ┃ ┃ ┃ ┗ 📜play.png
 ┃ ┃ ┣ 📂mainpage
 ┃ ┃ ┃ ┣ 📜AIProgress.js
 ┃ ┃ ┃ ┣ 📜AIProgress.module.css
 ┃ ┃ ┃ ┣ 📜NewSlider.js
 ┃ ┃ ┃ ┣ 📜NewSlider.module.css
 ┃ ┃ ┃ ┣ 📜NewSlider1.png
 ┃ ┃ ┃ ┣ 📜NewSlider2.png
 ┃ ┃ ┃ ┗ 📜questmark.png
 ┃ ┃ ┣ 📂mypage
 ┃ ┃ ┃ ┣ 📜Favorite.js
 ┃ ┃ ┃ ┣ 📜Favorite.module.css
 ┃ ┃ ┃ ┣ 📜MakeAI.js
 ┃ ┃ ┃ ┣ 📜MakeAI.module.css
 ┃ ┃ ┃ ┣ 📜RecordedSongs.js
 ┃ ┃ ┃ ┗ 📜RecordedSongs.module.css
 ┃ ┃ ┗ 📂search
 ┃ ┃ ┃ ┣ 📜emptystar.png
 ┃ ┃ ┃ ┣ 📜fullstar.png
 ┃ ┃ ┃ ┣ 📜none.png
 ┃ ┃ ┃ ┣ 📜search.png
 ┃ ┃ ┃ ┣ 📜SearchBar.js
 ┃ ┃ ┃ ┣ 📜SearchBar.module.css
 ┃ ┃ ┃ ┣ 📜SearchResult.js
 ┃ ┃ ┃ ┗ 📜SearchResult.module.css
 ┃ ┣ 📂lib
 ┃ ┃ ┣ 📜PageBlock.js
 ┃ ┃ ┣ 📜PrivateRoute.js
 ┃ ┃ ┗ 📜PublicRoute.js
 ┃ ┣ 📂pages
 ┃ ┃ ┣ 📜Analysis.js
 ┃ ┃ ┣ 📜Analysis.module.css
 ┃ ┃ ┣ 📜Growth.js
 ┃ ┃ ┣ 📜Growth.module.css
 ┃ ┃ ┣ 📜History.js
 ┃ ┃ ┣ 📜History.module.css
 ┃ ┃ ┣ 📜HistoryDetail.js
 ┃ ┃ ┣ 📜HistoryDetail.module.css
 ┃ ┃ ┣ 📜Login.js
 ┃ ┃ ┣ 📜Login.module.css
 ┃ ┃ ┣ 📜MainPage.js
 ┃ ┃ ┣ 📜MainPage.module.css
 ┃ ┃ ┣ 📜MyPage.js
 ┃ ┃ ┣ 📜MyPage.module.css
 ┃ ┃ ┣ 📜NickNamePage.js
 ┃ ┃ ┣ 📜NickNamePage.module.css
 ┃ ┃ ┣ 📜OauthRedirect.js
 ┃ ┃ ┣ 📜RecordLine.js
 ┃ ┃ ┣ 📜Redirection.js
 ┃ ┃ ┣ 📜Redirection.module.css
 ┃ ┃ ┣ 📜SearchResult.js
 ┃ ┃ ┣ 📜SearchResult.module.css
 ┃ ┃ ┣ 📜SingingAI.js
 ┃ ┃ ┣ 📜SingingAI.module.css
 ┃ ┃ ┣ 📜UserUpdate.js
 ┃ ┃ ┗ 📜UserUpdate.module.css
 ┃ ┣ 📂test
 ┃ ┃ ┣ 📜DOMUtil.js
 ┃ ┃ ┣ 📜EventEmitter.js
 ┃ ┃ ┣ 📜index.js
 ┃ ┃ ┣ 📜Model.js
 ┃ ┃ ┣ 📜reportWebVitals.js
 ┃ ┃ ┣ 📜ScoreDrawer.js
 ┃ ┃ ┣ 📜ScoreParser.js
 ┃ ┃ ┣ 📜setupTests.js
 ┃ ┃ ┣ 📜Sharer.js
 ┃ ┃ ┣ 📜SongEditor.css
 ┃ ┃ ┣ 📜SongEditor.js
 ┃ ┃ ┣ 📜SongList.js
 ┃ ┃ ┣ 📜style.css
 ┃ ┃ ┣ 📜test.css
 ┃ ┃ ┣ 📜Test.js
 ┃ ┃ ┣ 📜ToneDetector.js
 ┃ ┃ ┗ 📜ToneGenerator.js
 ┃ ┣ 📜App.css
 ┃ ┣ 📜App.js
 ┃ ┣ 📜App.test.js
 ┃ ┣ 📜index.css
 ┃ ┣ 📜index.js
 ┃ ┣ 📜logo.svg
 ┃ ┣ 📜mr.mp3
 ┃ ┣ 📜reportWebVitals.js
 ┃ ┗ 📜setupTests.js
 ┣ 📜.gitignore
 ┣ 📜default.conf
 ┣ 📜Dockerfile
 ┣ 📜dockerignore
 ┣ 📜package-lock.json
 ┣ 📜package.json
 ┗ 📜README.md
```



## 팀원

<p align="center" data-align="center">
  <img src="readme_assets/e0e19c4c802ee401226ad25930ea6b993ced94b5.png" title="" alt="정민2.png" width="16%">
  <img title="" src="readme_assets/58f9169b96438b77fbde1184108d54e8dc8f35e3.png" alt="창혁2.png" width="16%">
  <img title="" src="readme_assets/e8b66bdba4b2bb21ce1eb4ea6c83ab10df13c467.png" alt="규렬2.png" width="16%">
  <img src="readme_assets/891ec9260ef6577cd2b33f560dd7009e2c3d418a.png" title="" alt="가영2.png" width="16%">
  <img src="readme_assets/e79b53f1c683c2a6553439ac7543f26d8df15989.png" title="" alt="세울2.png" width="16%">
  <img src="readme_assets/sejin.png" title="" alt="세진2.png" width="16%">
</p>
<div style="display:flex; justify-content:space-between" align="center" data-align="center">
  <span>공정민</span>
  <span>김창혁</span>
  <span>심규렬</span>
  <span>이가영</span>
  <span>이세울</span>
  <span>황세진</span>
</div>
