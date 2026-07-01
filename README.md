# 🍔 Totem de Atendimento

Sistema de autoatendimento para restaurantes fast-food, inspirado nos totens do Burger King e McDonald's. Desenvolvido como projeto de portfólio com potencial de produto comercial real.

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![React](https://img.shields.io/badge/React-18-blue)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4)
![Node.js](https://img.shields.io/badge/Node.js-20-green)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-336791)

---

## 📋 Sumário

- [Sobre o Projeto](#sobre-o-projeto)
- [Funcionalidades](#funcionalidades)
- [Stack Tecnológica](#stack-tecnológica)
- [Arquitetura](#arquitetura)
- [Estrutura de Pastas](#estrutura-de-pastas)
- [Como Rodar](#como-rodar)
- [Variáveis de Ambiente](#variáveis-de-ambiente)
- [Rotas da API](#rotas-da-api)
- [Roadmap](#roadmap)
- [Contribuindo](#contribuindo)

---

## 📖 Sobre o Projeto

O **BurgerFast Kiosk** é um sistema completo de pedidos em formato de totem touchscreen. O cliente realiza todo o pedido de forma autônoma — escolhe produtos, personaliza, paga e recebe o número do pedido — sem precisar de atendente.

O sistema é dividido em duas interfaces:

- **Totem (Kiosk)** — interface pública usada pelo cliente no restaurante
- **Painel Admin** — interface interna para gerenciar produtos, categorias e pedidos

---

## ✅ Funcionalidades

### Totem (Cliente)
- [x] Tela inicial com banner promocional
- [x] Seleção entre comer no local ou retirada
- [x] Cardápio com navegação por categorias (sidebar)
- [x] Cards de produto com imagem, nome e preço
- [x] Carrinho de compras com cálculo automático
- [ ] Personalização de ingredientes por produto
- [ ] Tela de pagamento simulada (PIX, Cartão, Dinheiro)
- [ ] Geração de número do pedido
- [ ] Tela de confirmação animada
- [ ] Auto-reset após inatividade

### Admin
- [ ] Login com JWT
- [ ] Dashboard com estatísticas do dia
- [ ] CRUD de categorias
- [ ] CRUD de produtos com upload de imagem
- [ ] Listagem e filtro de pedidos
- [ ] Alteração de status do pedido
- [ ] Relatórios simples

---

## 🛠️ Stack Tecnológica

### Frontend
| Tecnologia | Versão | Uso |
|---|---|---|
| React | 18 | UI |
| TypeScript | 5 | Tipagem estática |
| Vite | 5 | Bundler |
| TailwindCSS | 4 | Estilização |
| React Router DOM | 6 | Roteamento SPA |
| Zustand | 4 | Estado global |
| Framer Motion | 11 | Animações |
| Lucide React | — | Ícones |
| Axios | — | Requisições HTTP |

### Backend
| Tecnologia | Versão | Uso |
|---|---|---|
| Node.js | 20 | Runtime |
| Express | 4 | Framework HTTP |
| TypeScript | 5 | Tipagem estática |
| Prisma | 5 | ORM |
| PostgreSQL | 16 | Banco de dados |
| JWT | — | Autenticação |
| Bcrypt | — | Hash de senhas |
| Multer | — | Upload de imagens |

### Deploy (Futuro)
| Serviço | Uso |
|---|---|
| Vercel | Frontend |
| Railway | Backend + PostgreSQL |

---

## 🏗️ Arquitetura

```
┌─────────────────────────────────────────────────────┐
│                    MONOREPO                         │
│                                                     │
│  ┌──────────────────┐    ┌──────────────────────┐  │
│  │   FRONTEND       │    │      BACKEND         │  │
│  │  React + Vite    │◄──►│  Node.js + Express   │  │
│  │  TypeScript      │    │  Prisma + PostgreSQL  │  │
│  │  TailwindCSS     │    │  JWT Auth            │  │
│  └──────────────────┘    └──────────────────────┘  │
│                                                     │
│  ┌──────────────────┐    ┌──────────────────────┐  │
│  │  TOTEM /kiosk    │    │   ADMIN /admin        │  │
│  │  Interface pública    │  Painel interno       │  │
│  └──────────────────┘    └──────────────────────┘  │
└─────────────────────────────────────────────────────┘
```

### Fluxo do pedido

```
Welcome → Seleciona tipo → Cardápio → Carrinho → Pagamento → Confirmação
```

### Padrão de camadas (Backend)

```
Route → Controller → Service → Prisma (DB)
```

---

## 📁 Estrutura de Pastas

```
burgerfast-kiosk/
├── apps/
│   ├── web/                        ← Frontend
│   │   └── src/
│   │       ├── pages/
│   │       │   ├── kiosk/          ← Telas do totem
│   │       │   └── admin/          ← Telas do admin
│   │       ├── components/
│   │       │   ├── kiosk/          ← Componentes do totem
│   │       │   ├── admin/          ← Componentes do admin
│   │       │   └── ui/             ← Componentes genéricos
│   │       ├── stores/             ← Zustand (estado global)
│   │       ├── services/           ← Chamadas à API
│   │       ├── hooks/              ← Custom hooks
│   │       ├── types/              ← Interfaces TypeScript
│   │       ├── utils/              ← Funções utilitárias
│   │       ├── mocks/              ← Dados mock para dev
│   │       └── router/             ← React Router
│   │
│   └── api/                        ← Backend
│       ├── src/
│       │   ├── routes/             ← Definição de rotas
│       │   ├── controllers/        ← Lógica HTTP
│       │   ├── services/           ← Regras de negócio
│       │   ├── middlewares/        ← Auth, erros, upload
│       │   └── utils/              ← Helpers
│       └── prisma/
│           ├── schema.prisma       ← Schema do banco
│           └── seed.ts             ← Dados iniciais
└── README.md
```

---

## 🚀 Como Rodar

### Pré-requisitos

- Node.js 20+
- npm 10+
- PostgreSQL 16+

### Frontend

```bash
# Entrar na pasta
cd apps/web

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev
```

Acesse: `http://localhost:5173`

### Backend

```bash
# Entrar na pasta
cd apps/api

# Instalar dependências
npm install

# Rodar migrations
npx prisma migrate dev

# Popular banco com dados iniciais
npx prisma db seed

# Rodar em desenvolvimento
npm run dev
```

API disponível em: `http://localhost:3333`

---

## 🔐 Variáveis de Ambiente

### Frontend — `apps/web/.env`

```env
VITE_API_URL=http://localhost:3333
```

### Backend — `apps/api/.env`

```env
DATABASE_URL="postgresql://user:password@localhost:5432/burgerfast"
JWT_SECRET="sua-chave-secreta-aqui"
JWT_EXPIRES_IN="7d"
PORT=3333
```

---

## 📡 Rotas da API

### Públicas (Totem)

| Método | Rota | Descrição |
|---|---|---|
| GET | `/categories` | Lista categorias |
| GET | `/products` | Lista produtos |
| GET | `/products/:id` | Detalhe do produto |
| POST | `/orders` | Cria pedido |
| GET | `/orders/:id` | Status do pedido |

### Protegidas (Admin — requer JWT)

| Método | Rota | Descrição |
|---|---|---|
| POST | `/auth/login` | Login admin |
| POST | `/categories` | Cria categoria |
| PUT | `/categories/:id` | Edita categoria |
| DELETE | `/categories/:id` | Remove categoria |
| POST | `/products` | Cria produto |
| PUT | `/products/:id` | Edita produto |
| DELETE | `/products/:id` | Remove produto |
| GET | `/orders` | Lista todos os pedidos |
| PATCH | `/orders/:id/status` | Altera status |

---

## 🗺️ Roadmap

### v1.0 — MVP ✳️ Em andamento
- [x] Setup do projeto
- [x] WelcomePage
- [x] MenuPage com categorias e produtos
- [x] CartStore (Zustand)
- [ ] CartPage
- [ ] Personalização de produto
- [ ] PaymentPage simulada
- [ ] ConfirmationPage
- [ ] Backend completo
- [ ] Admin básico

### v2.0 — Futuro
- [ ] Integração com pagamento real (Stripe / Mercado Pago)
- [ ] Impressão de cupom (impressora térmica)
- [ ] Programa de fidelidade / pontos
- [ ] Multi-tenant (SaaS para outros restaurantes)
- [ ] App mobile para acompanhar pedido
- [ ] Painel de cozinha (Kitchen Display System)
- [ ] Integração com iFood / Rappi

---

## 💡 Diferenciais do Projeto

- Interface idêntica aos totens reais de fast-food
- Arquitetura escalável pronta para SaaS
- TypeScript end-to-end (front + back)
- Design system próprio com tokens de cor
- Animações fluidas com Framer Motion
- Estado global eficiente com Zustand

---

## 👨‍💻 Autor

Feito com 🍔 por **Arthur Victor**

[![GitHub](https://img.shields.io/badge/GitHub-arthurdev-black?logo=github)](https://github.com/arthurdev)

---

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.
