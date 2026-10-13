# memoria.md — Histórico da Sessão (HospedaSync CRM)

Documento de continuidade. Descreve o estado do projeto, o que foi corrigido e
como publicar/rodar.

## 1. Visão geral do projeto

- Nome: **HospedaSync CRM - Arquitetura & Gestão Hoteleira**
- Tipo: SPA estática (React 19 + Vite 8 + Tailwind CSS 4), template do Google AI Studio.
- Conteúdo: relatório/simulador de arquitetura para um CRM hoteleiro (integração
  HQbeds + WhatsApp + gestão de 28k contatos). Tela única com 7 abas controladas
  por state (`activeTab`), sem router.
- Arquivos principais:
  - `src/App.tsx` — toda a aplicação (~1113 linhas).
  - `src/main.tsx` — bootstrap do React.
  - `src/index.css` — `@import "tailwindcss";`.
  - `vite.config.ts` — plugins react + tailwind, alias `@`, `base`, server HMR.
  - `index.html`, `metadata.json`, `tsconfig.json`, `package.json`.

## 2. Ambiente

- SO: Windows (win32), shell PowerShell (pwsh).
- Node: v24.16.0. npm disponível. `bun.lock` vazio (resíduo do template).
- Nesta máquina não havia git config global nem `gh` CLI; existe
  `credential.helper=manager` (Git Credential Manager).
- Observação: a ferramenta de busca (ripgrep) não está instalada nesta máquina.

## 3. Problema raiz encontrado e corrigido

**Sintoma:** app não rodava; `npm install` falhava e `node_modules` não existia.

**Causa:** conflito de peer dependency.
`package.json` fixava `esbuild@^0.25.0` em devDependencies, mas `vite@8.3.4`
requer peerOptional `esbuild@^0.27.0 || ^0.28.0`. Isso abortava o `npm install`
(o log apontava `ERESOLVE`).

**Correção:** removida a linha `"esbuild": "^0.25.0"` de `devDependencies`
(o esbuild não é importado em nenhum lugar do código; o Vite já traz o seu).

**Correção secundária:** em `vite.config.ts`, trocado `__dirname` por
`import.meta.dirname` (aviso de compatibilidade futura do Vite:
`configLoader: 'native'`).

## 4. Alteração de conteúdo

Em `src/App.tsx`, aba **"1. Arquitetura da Solução" → bloco "Diagnóstico do
Especialista"**, o texto foi reescrito em segunda pessoa (fala direto com o
cliente):

- "O cliente está enfrentando..." → "Você está enfrentando..."
- "ele tem uma mina de ouro em mãos" → "você tem uma mina de ouro em mãos"

## 5. Verificações executadas (todas OK)

- `npm install` → 180 pacotes, 0 vulnerabilidades.
- `npm run lint` (= `tsc --noEmit`) → sem erros.
- `npm run build` → gera `dist/` (index + assets) sem avisos.
- Dev server (`node node_modules/vite/bin/vite.js --port=3000`) → HTTP 200.

## 6. Git e GitHub

- Repositório remoto: https://github.com/AdaoElias/hotelaria
- Branch principal: `main` (tracking `origin/main`).
- Identidade configurada localmente (não havia global):
  - `user.name = AdaoElias`
  - `user.email = AdaoElias@users.noreply.github.com`
  - Ajustar com `git config user.name/user.email` se desejado.
- Commits desta sessão:
  - `b4f11f2` Fix dependency conflict and update specialist diagnosis copy
  - `44dad4f` Add GitHub Pages deployment (base path + Actions workflow)
  - `9788f22` Trigger GitHub Pages deploy (commit vazio)
  - `b6fc6ff` Redeploy after Pages source change (commit vazio)

## 7. Deploy — GitHub Pages

**URL publicada:** https://adaoelias.github.io/hotelaria/

Mudanças feitas para habilitar:
- `vite.config.ts`: adicionado `base: '/hotelaria/'` (necessário por ser
  project page, servida em subdiretório).
- `.github/workflows/deploy.yml`: workflow que roda em push na `main` e em
  `workflow_dispatch`. Passos: checkout → setup-node 22 → `npm ci` →
  `npm run build` → `actions/configure-pages@v5` (com `enablement: true`) →
  `upload-pages-artifact@v3` (`path: dist`) → `deploy-pages@v4`.

**Configuração obrigatória no painel (feita pelo usuário):**
Settings → Pages → Build and deployment → Source = **GitHub Actions**.
Sem isso, o Pages publicava o código-fonte (servia `/src/main.tsx`) e a página
ficava **em branco**. Após a troca, verificado: HTML/JS/CSS servidos com HTTP
200 e apontando para `/hotelaria/assets/...`.

**Fluxo de deploy:** qualquer `git push` na `main` republica o site
automaticamente. Para forçar sem mudança de código:
`git commit --allow-empty -m "msg" && git push`.

## 8. Pendências / itens secundários (não bloqueiam)

- Script `clean` em `package.json` referencia `server.js`, que não existe
  (resíduo do template AI Studio). Pode remover ou ajustar.
- Dependências não usadas herdadas do template: `express`, `@google/genai`,
  `dotenv`, `tsx`, `@types/express`, `autoprefixer`. Inofensivas; podem ser
  removidas para enxugar.
- `bun.lock` está vazio (0 bytes). Pode apagar se não for usar Bun.
- Nenhuma suíte de testes existe no projeto.

## 9. Como rodar localmente

```powershell
npm install
npm run dev     # http://localhost:3000
npm run build
npm run lint
```

## 10. Estrutura de deploy (referência)

```
.github/workflows/deploy.yml   -> build + deploy para GitHub Pages
vite.config.ts                 -> base '/hotelaria/'
```

Para continuar o projeto: editar `src/App.tsx`, rodar `npm run lint` e
`npm run build` antes de commitar; o push na `main` publica automaticamente.
