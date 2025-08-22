# Desafio Spotify 🎵

[![Node.js](https://img.shields.io/badge/Node.js-18+-green?logo=node.js)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue?logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-4-yellow?logo=vite)](https://vitejs.dev/)
[![License](https://img.shields.io/badge/License-MIT-blue)](LICENSE)

> Aplicação web que consome a API do Spotify para exibir informações sobre artistas, álbuns e músicas.

---

## 🌐 Demo

O projeto está publicado no GitHub Pages:  
[https://andersonpensephp.github.io/desafio-spotify/](https://andersonpensephp.github.io/desafio-spotify/)

---

## 🚀 Funcionalidades

- 🔍 Busca de artistas e álbuns  
- 📱 Layout responsivo para mobile e desktop  
- 🎨 Interface moderna e intuitiva  
- 🔄 Gerenciamento de estado com **React Query**  
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
- GitHub Pages  

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
📄 Licença

Este projeto está sob a licença MIT.
Veja o arquivo LICENSE para mais detalhes.

👤 Autor

Anderson Reis

[Linkedin](https://www.linkedin.com/in/andersonfront/)


