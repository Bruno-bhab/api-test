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

### Passos para Deploy

1. **Faça login na Vercel**
   ```bash
   vercel login
   ```

2. **Deploy o projeto**
   ```bash
   vercel
   ```

3. **Configure as variáveis de ambiente**
   No painel da Vercel, vá em Settings > Environment Variables e adicione:
   - `JWT_SECRET`: seu-jwt-secret-muito-seguro-aqui

4. **Redeploy após configurar as variáveis**
   ```bash
   vercel --prod
   ```

### Estrutura na Vercel
O projeto está configurado para funcionar tanto como aplicação tradicional quanto como funções serverless da Vercel:
- Arquivo `vercel.json` configurado
- Pasta `/api` com estrutura serverless alternativa

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