# Desafio Spotify 🎵

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4-yellow?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

> Aplicação web que consome a API do Spotify para exibir informações sobre artistas, álbuns e músicas.

---
## * Limitações de Acesso (Spotify API)

Este projeto utiliza a API do Spotify
 para autenticação e acesso a dados. Atualmente, a aplicação está em modo Development, o que implica:

Apenas usuários previamente autorizados (allowlisted) podem realizar login.

O limite atual é de até 25 usuários de teste.

Para que você possa testar a aplicação, forneça seu e-mail do Spotify para ser adicionado como usuário de teste no Dashboard do Spotify for Developers
.

Se você tentar autenticar sem estar na lista de usuários de teste, a autenticação será recusada.

---

## 🌐 Demo

O projeto está publicado na Vercel:  
[https://desafio-spotify.vercel.app/](https://desafio-spotify.vercel.app/)

---

## 🚀 Funcionalidades

- 🔍 Busca de artistas e álbuns  
- 📱 Layout responsivo para mobile e desktop  
- 🎨 Interface moderna e intuitiva  
- 🔄 **React Query**  
- 🔒 Autenticação com **OAuth 2.0 do Spotify (PKCE)**  
- 🎨 Animações suaves com **Framer Motion**  

---

## 🛠️ Tecnologias Utilizadas

**Frontend:**

- React 18  
- TypeScript  
- Vite  
- TailwindCSS  
- React Router  
- React Query  
- Framer Motion  
- Phosphor Icons  
- date-fns  

**Autenticação:**

- OAuth 2.0 com PKCE  
- Gerenciamento de tokens JWT  

**Ferramentas:**

- ESLint  
- Prettier  
- Vitest 

---
## 📂 Estrutura do Projeto


```bash
src/
├── assets/        # Arquivos estáticos (imagens, ícones, etc.)
├── components/    # Componentes reutilizáveis
│   ├── common/    # Componentes comuns (botões, inputs, etc.)
│   └── ui/        # Componentes de UI estilizados
├── context/       # Contextos do React
├── hooks/         # Custom hooks
├── libs/          # Bibliotecas e utilitários
│   └── auth/      # Lógica de autenticação
├── pages/         # Componentes de página
│   ├── Artist/    # Página do artista
│   ├── Artists/   # Página de busca de artistas
│   ├── Album/     # Página do álbum
│   └── Home/      # Página inicial
├── styles/        # Estilos globais e temas
└── utils/         # Funções utilitárias
```

---

## 🔧 Pré-requisitos

- Node.js (versão 18 ou superior)  
- npm ou yarn  
- Conta de desenvolvedor no Spotify (para obter credenciais da API)

[Dashboard spotify](https://developer.spotify.com/dashboard)

---

## ⚡ Como executar localmente

```bash
# Clone o repositório
git clone https://github.com/andersonpensephp/desafio-spotify.git
cd desafio-spotify

# Instale as dependências
npm install
# ou
yarn

# Inicie o servidor de desenvolvimento
npm run dev
# ou
yarn dev

# Abra no navegador
http://localhost:5173

```

## Enviroment
```bash
VITE_SPOTIFY_API=https://api.spotify.com/v1
VITE_SPOTIFY_AUTHORIZED="https://accounts.spotify.com"

VITE_CLIENT_ID=XXX
VITE_REDIRECT_URI="http://sua-uri-spotify-callback/callback"

VITE_LIMIT_PER_PAGE=20

```

🧪 Testes

```bash
npm run test
# ou
yarn test
```
🚀 Deploy

```bash
npm run build
npm run deploy
# ou
yarn build
yarn deploy
```

👤 Autor

Anderson Reis

[Linkedin](https://www.linkedin.com/in/andersonfront/)
