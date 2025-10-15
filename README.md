# API Node.js com JWT e CRUD de Produtos

Uma API REST desenvolvida com Node.js e Express.js que inclui autenticação JWT e CRUD completo para produtos, utilizando SQLite em memória e pronta para deploy na Vercel.

## 🚀 Funcionalidades

- ✅ Autenticação JWT com rota de login
- ✅ CRUD completo para produtos (Create, Read, Update, Delete)
- ✅ Armazenamento em SQLite (em memória)
- ✅ Middleware de autenticação
- ✅ Validação de dados
- ✅ Tratamento de erros
- ✅ Configurado para deploy na Vercel

## 🛠️ Tecnologias

- **Node.js** + **Express.js** - Framework web
- **SQLite3** - Banco de dados em memória
- **JWT** - Autenticação com tokens
- **bcryptjs** - Hash de senhas
- **CORS** - Compartilhamento de recursos entre origens
- **dotenv** - Variáveis de ambiente
- **Vercel** - Deploy serverless

## 📁 Estrutura do Projeto

```
api-test/
├── api/                    # Rotas para Vercel serverless
│   └── index.js
├── middleware/             # Middlewares de autenticação
│   └── auth.js
├── models/                 # Modelos e configuração do banco
│   └── database.js
├── routes/                 # Rotas da API
│   ├── auth.js            # Rotas de autenticação
│   └── products.js        # Rotas do CRUD de produtos
├── .env                    # Variáveis de ambiente
├── .gitignore
├── index.js               # Arquivo principal da aplicação
├── package.json
├── vercel.json            # Configuração da Vercel
└── README.md
```

## 🔧 Instalação e Uso Local

1. **Clone o repositório**
   ```bash
   git clone <url-do-repositorio>
   cd api-test
   ```

2. **Instale as dependências**
   ```bash
   npm install
   ```

3. **Configure as variáveis de ambiente**
   - O arquivo `.env` já está configurado com valores padrão
   - Para produção, altere `JWT_SECRET` para um valor mais seguro

4. **Execute o projeto**
   ```bash
   # Desenvolvimento
   npm run dev

   # Ou simplesmente
   npm start
   ```

5. **Acesse a API**
   - URL: http://localhost:3000
   - A API estará rodando e pronta para uso

## 📡 Endpoints da API

### 🔐 Autenticação

#### POST /auth/login
Realiza login e retorna token JWT.

**Body:**
```json
{
  "username": "admin",
  "password": "admin123"
}
```

**Resposta de sucesso:**
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIs...",
  "user": {
    "id": 1,
    "username": "admin"
  }
}
```

#### GET /auth/verify
Verifica se um token JWT é válido.

**Headers:**
```
Authorization: Bearer <seu-token-jwt>
```

### 🛍️ Produtos (Requer Autenticação)

Todas as rotas de produtos requerem o header de autorização:
```
Authorization: Bearer <seu-token-jwt>
```

#### GET /products
Lista todos os produtos.

**Resposta:**
```json
{
  "message": "Produtos encontrados",
  "data": [
    {
      "id": 1,
      "name": "Produto Exemplo",
      "description": "Descrição do produto",
      "price": 29.99,
      "stock": 100,
      "created_at": "2023-12-01 10:00:00",
      "updated_at": "2023-12-01 10:00:00"
    }
  ]
}
```

#### GET /products/:id
Busca um produto específico por ID.

#### POST /products
Cria um novo produto.

**Body:**
```json
{
  "name": "Nome do Produto",
  "description": "Descrição do produto",
  "price": 29.99,
  "stock": 50
}
```

#### PUT /products/:id
Atualiza um produto existente.

**Body:**
```json
{
  "name": "Nome Atualizado",
  "description": "Nova descrição",
  "price": 35.99,
  "stock": 75
}
```

#### DELETE /products/:id
Remove um produto.

## 🌐 Deploy na Vercel

### Pré-requisitos
- Conta na [Vercel](https://vercel.com/)
- Vercel CLI instalado: `npm i -g vercel`
- Projeto no GitHub (recomendado)

### Método 1: Deploy via GitHub (Recomendado)

1. **Suba o projeto para o GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/seu-usuario/api-test.git
   git push -u origin main
   ```

2. **Conecte no painel da Vercel**
   - Acesse [vercel.com](https://vercel.com) e faça login
   - Clique em "New Project"
   - Selecione seu repositório `api-test`
   - Clique em "Deploy"

3. **Configure as variáveis de ambiente**
   - Após o primeiro deploy, vá em "Settings" > "Environment Variables"
   - Adicione: `JWT_SECRET` com valor: `seu-jwt-secret-muito-seguro-aqui-123456789`
   - Marque para: "Production", "Preview" e "Development"
   - Clique em "Save"

4. **Redeploy**
   - Vá em "Deployments"
   - Clique nos 3 pontinhos do último deploy
   - Clique em "Redeploy"

### Método 2: Deploy via CLI

1. **Faça login na Vercel**
   ```bash
   vercel login
   ```

2. **Deploy o projeto**
   ```bash
   vercel
   ```

3. **Configure a variável de ambiente via CLI**
   ```bash
   vercel env add JWT_SECRET
   # Digite o valor quando solicitado: seu-jwt-secret-muito-seguro-aqui-123456789
   # Selecione: Production, Preview, Development
   ```

4. **Redeploy para produção**
   ```bash
   vercel --prod
   ```

### ⚠️ Importante: Configuração da Variável JWT_SECRET

**A variável `JWT_SECRET` DEVE ser configurada no painel da Vercel**, não no código. Use um valor seguro como:
```
seu-jwt-secret-muito-seguro-aqui-123456789-$(date +%s)
```

### ✅ Verificação do Deploy

Após o deploy, teste se está funcionando:
```bash
# Substitua YOUR_VERCEL_URL pela URL do seu deploy
curl https://YOUR_VERCEL_URL.vercel.app/

# Teste o login
curl -X POST https://YOUR_VERCEL_URL.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

### 🔧 Estrutura na Vercel
O projeto está configurado para funcionar como aplicação serverless:
- `vercel.json` configurado para Node.js
- Roteamento automático para `index.js`
- Compatível com funções serverless da Vercel

## 🧪 Testando a API

### Usando curl

1. **Login**
   ```bash
   curl -X POST https://sua-api.vercel.app/auth/login \
     -H "Content-Type: application/json" \
     -d '{"username":"admin","password":"admin123"}'
   ```

2. **Listar produtos** (substitua `<TOKEN>` pelo token recebido)
   ```bash
   curl -X GET https://sua-api.vercel.app/products \
     -H "Authorization: Bearer <TOKEN>"
   ```

3. **Criar produto**
   ```bash
   curl -X POST https://sua-api.vercel.app/products \
     -H "Content-Type: application/json" \
     -H "Authorization: Bearer <TOKEN>" \
     -d '{"name":"Produto Teste","description":"Descrição","price":19.99,"stock":30}'
   ```

### Usando Postman/Insomnia

1. Importe a coleção ou configure manualmente os endpoints
2. Faça login para obter o token
3. Use o token no header `Authorization: Bearer <token>` para as demais rotas

## 📋 Dados de Teste

A API já vem com um usuário padrão configurado:
- **Username:** `admin`
- **Password:** `admin123`

## 🔒 Segurança

- Senhas são hasheadas com bcrypt
- JWT tokens com expiração de 24 horas
- Middleware de autenticação em todas as rotas protegidas
- Validação de dados de entrada
- Tratamento de erros adequado

## 🤝 Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está sob a licença MIT. Veja o arquivo LICENSE para mais detalhes.

---

**Desenvolvido com ❤️ para demonstrar uma API completa Node.js pronta para produção.**
