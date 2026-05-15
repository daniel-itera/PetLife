# 🐾 PetLife — Frontend

Interface React para o sistema PetLife de gestão de pets e vacinas.

## Stack

- **React 18** + **Vite 5**
- **React Router DOM v6** (rotas públicas e privadas)
- **CSS Modules** (sem biblioteca de UI, tudo customizado)
- **Axios** com interceptors JWT automáticos

## Estrutura

```
src/
├── App.jsx                   # Rotas + PrivateRoute + PublicRoute
├── index.css                 # Design tokens globais (CSS variables)
├── contexts/
│   └── AuthContext.jsx       # Estado global de autenticação
├── hooks/
│   └── useAuth.js            # Hook para consumir o AuthContext
├── services/
│   ├── api.js                # Instância Axios com interceptors JWT
│   ├── authService.js        # login, register, logout
│   ├── petService.js         # CRUD de pets + MOCK_PETS
│   └── vaccineService.js     # CRUD de vacinas + MOCK_VACCINES
├── components/
│   ├── layout/               # AppLayout, Sidebar, Header
│   ├── ui/                   # Button, Badge (reutilizáveis)
│   └── pets/                 # PetCard, VaccineTable
└── pages/
    ├── Auth/                 # Login + Cadastro
    ├── Dashboard/            # Visão geral
    ├── MyPets/               # Listagem de pets
    └── PetDetails/           # Detalhes + tabela de vacinas
```

## Começando

```bash
# 1. Instalar dependências
npm install

# 2. Configurar variável de ambiente
cp .env.example .env.local
# Edite VITE_API_URL para apontar para sua API .NET

# 3. Rodar em desenvolvimento
npm run dev
```

## Conectando com a API .NET

Os arquivos em `src/services/` já estão preparados para consumir sua API C#.
Basta garantir que:

1. A API retorna `{ token, user }` no endpoint `POST /auth/login`
2. A API aceita o header `Authorization: Bearer <token>` nas rotas protegidas
3. A URL base está configurada no `.env.local`

Os dados mockados (`MOCK_PETS`, `MOCK_VACCINES`) ficam nos próprios arquivos
de service — é só substituir as chamadas mockadas pelas reais quando a API
estiver integrada.
