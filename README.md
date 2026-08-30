# DINO Performance

DINO 퍼포먼스 웨어 브랜드 사이트입니다. Next.js 정적 사이트로 구성되어 GitHub Pages에서 서버 없이 실행됩니다.

## 로컬 실행

Node.js 22 이상이 필요합니다.

```bash
pnpm install
pnpm dev
```

브라우저에서 `http://localhost:3000`을 엽니다.

## GitHub Pages 배포

1. 이 폴더 전체를 GitHub 저장소의 `main` 브랜치에 올립니다.
2. 저장소의 **Settings → Pages**에서 Source를 **GitHub Actions**로 선택합니다.
3. `main` 브랜치에 푸시할 때마다 `.github/workflows/deploy-pages.yml`이 사이트를 자동 배포합니다.

사용자·조직 페이지 저장소(`계정명.github.io`)와 일반 프로젝트 저장소를 모두 지원하며, 일반 저장소에서는 저장소 이름을 URL 경로에 자동 반영합니다.

## 제작 빌드 확인

```bash
pnpm install --frozen-lockfile
pnpm build
```

배포 파일은 `out/`에 생성됩니다.
