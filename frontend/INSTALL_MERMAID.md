# Mermaid 패키지 설치 가이드

## 📦 필수 패키지 설치

교육 게시판의 Mermaid 다이어그램을 표시하려면 다음 패키지를 설치해야 합니다:

```bash
cd frontend
npm install mermaid
```

## 🎯 설치 확인

```bash
# package.json에 추가되었는지 확인
cat package.json | grep mermaid

# 출력 예시:
# "mermaid": "^10.6.1"
```

## 🚀 서버 재시작

```bash
npm run dev
```

## ✅ 기능 확인

1. 브라우저에서 `http://localhost:3000/docs` 접속
2. 문서 중 하나 클릭 (예: "글로벌 휴머노이드 로봇 산업 벤치마킹 리포트")
3. Mermaid 다이어그램이 제대로 렌더링되는지 확인

## 🎨 지원되는 Mermaid 다이어그램

- ✅ Flowchart (플로우차트)
- ✅ Sequence Diagram (시퀀스 다이어그램)
- ✅ Gantt Chart (간트 차트)
- ✅ Pie Chart (파이 차트)
- ✅ Mind Map (마인드맵)
- ✅ Timeline (타임라인)
- ✅ ER Diagram (ERD)

## 🐛 문제 해결

### 문제: npm 권한 에러
```bash
# 해결: nvm을 사용하는 경우
nvm use node

# 또는 sudo 사용 (권장하지 않음)
sudo npm install mermaid
```

### 문제: 다이어그램이 표시되지 않음
```bash
# 캐시 삭제 후 재시작
rm -rf .next
npm run dev
```

## 📚 완료!

이제 교육 게시판에서 Mermaid 다이어그램이 정상적으로 표시됩니다! 🎉

