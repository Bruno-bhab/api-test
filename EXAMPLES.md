# Exemplos de Uso da API

Este arquivo contém exemplos práticos de como usar a API Node.js com JWT e CRUD de Produtos.

## Base URL
- **Local:** http://localhost:3000
- **Vercel:** https://seu-projeto.vercel.app

## 1. Rota Principal

### GET /
Informações gerais da API.

```bash
curl http://localhost:3000/
```

**Resposta:**
```json
{
  "message": "API Node.js com JWT e CRUD de Produtos",
  "version": "1.0.0",
  "endpoints": {
    "auth": {
      "login": "POST /auth/login",
      "verify": "GET /auth/verify"
    },
    "products": {
      "list": "GET /products",
      "get": "GET /products/:id",
      "create": "POST /products",
      "update": "PUT /products/:id",
      "delete": "DELETE /products/:id"
    }
  },
  "example": {
    "login": {
      "username": "admin",
      "password": "admin123"
    }
  }
}
```

## 2. Autenticação

### POST /auth/login
Realizar login e obter token JWT.

```bash
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "admin123"
  }'
```

**Resposta de sucesso:**
```json
{
  "message": "Login realizado com sucesso",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "username": "admin"
  }
}
```

### GET /auth/verify
Verificar se o token é válido.

```bash
curl http://localhost:3000/auth/verify \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 3. CRUD de Produtos

> **Nota:** Todas as rotas de produtos requerem autenticação via token JWT no header `Authorization: Bearer <token>`

### GET /products
Listar todos os produtos.

```bash
curl http://localhost:3000/products \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### GET /products/:id
Buscar um produto específico.

```bash
curl http://localhost:3000/products/1 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

### POST /products
Criar um novo produto.

```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "name": "Smartphone XYZ",
    "description": "Smartphone top de linha com 128GB",
    "price": 899.99,
    "stock": 50
  }'
```

### PUT /products/:id
Atualizar um produto existente.

```bash
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer SEU_TOKEN_AQUI" \
  -d '{
    "name": "Smartphone XYZ Pro",
    "description": "Smartphone top de linha com 256GB - Versão Pro",
    "price": 1199.99,
    "stock": 30
  }'
```

### DELETE /products/:id
Deletar um produto.

```bash
curl -X DELETE http://localhost:3000/products/1 \
  -H "Authorization: Bearer SEU_TOKEN_AQUI"
```

## 4. Workflow Completo

### Passo a passo para usar a API:

1. **Fazer login e obter token:**
```bash
TOKEN=$(curl -s -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}' \
  | jq -r '.token')
```

2. **Criar um produto:**
```bash
curl -X POST http://localhost:3000/products \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Notebook Gamer",
    "description": "Notebook para jogos com RTX 4060",
    "price": 2499.99,
    "stock": 10
  }'
```

3. **Listar produtos:**
```bash
curl http://localhost:3000/products \
  -H "Authorization: Bearer $TOKEN"
```

4. **Atualizar produto (ID 1):**
```bash
curl -X PUT http://localhost:3000/products/1 \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Notebook Gamer Pro",
    "description": "Notebook para jogos com RTX 4070",
    "price": 2999.99,
    "stock": 15
  }'
```

## 5. Códigos de Status HTTP

- **200 OK** - Sucesso na requisição
- **201 Created** - Recurso criado com sucesso
- **400 Bad Request** - Dados inválidos
- **401 Unauthorized** - Token não fornecido
- **403 Forbidden** - Token inválido
- **404 Not Found** - Recurso não encontrado
- **500 Internal Server Error** - Erro do servidor

## 6. Exemplos com JavaScript (fetch)

### Login:
```javascript
const login = async () => {
  const response = await fetch('http://localhost:3000/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      username: 'admin',
      password: 'admin123'
    })
  });
  
  const data = await response.json();
  const token = data.token;
  
  // Armazenar token para uso posterior
  localStorage.setItem('token', token);
  return token;
};
```

### Criar produto:
```javascript
const createProduct = async (productData) => {
  const token = localStorage.getItem('token');
  
  const response = await fetch('http://localhost:3000/products', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify(productData)
  });
  
  return await response.json();
};
```

## 7. Deploy na Vercel

Para fazer deploy na Vercel:

1. **Instalar Vercel CLI:**
```bash
npm i -g vercel
```

2. **Login na Vercel:**
```bash
vercel login
```

3. **Deploy:**
```bash
vercel
```

4. **Configurar variável de ambiente:**
   - Acesse o painel da Vercel
   - Vá em Settings > Environment Variables
   - Adicione: `JWT_SECRET` com um valor seguro

5. **Redeploy:**
```bash
vercel --prod
```

Após o deploy, substitua `http://localhost:3000` pela URL da Vercel nos exemplos acima.