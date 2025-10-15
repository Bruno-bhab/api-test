# 📡 Documentação da API para Postman

Este diretório contém arquivos de documentação prontos para importar no Postman e testar a API Node.js com JWT e CRUD de Produtos.

## 📁 Arquivos Disponíveis

### 1. **api-documentation.json** 
📋 Documentação OpenAPI/Swagger completa
- **Formato:** OpenAPI 3.0.3
- **Uso:** Importar no Postman via "Import" → "Link/File" → selecionar arquivo
- **Inclui:** Esquemas, validações, exemplos e documentação completa de todos os endpoints

### 2. **postman-collection.json**
🔧 Coleção do Postman otimizada para testes
- **Formato:** Postman Collection v2.1
- **Uso:** Importar via "Import" no Postman
- **Recursos:** 
  - Scripts automáticos para capturar tokens
  - Variáveis dinâmicas
  - Testes de validação
  - Exemplos prontos para usar

### 3. **postman-environment.json**
🌍 Environment com variáveis pré-configuradas
- **Formato:** Postman Environment
- **Uso:** Importar via "Import" → "Environments" no Postman
- **Inclui:** URLs, credenciais padrão e variáveis automáticas

## 🚀 Como Importar no Postman

### Método 1: Importação Completa (Recomendado)

1. **Abra o Postman**

2. **Importe a Coleção:**
   - Clique em "Import"
   - Arraste ou selecione `postman-collection.json`
   - Clique em "Import"

3. **Importe o Environment:**
   - Clique em "Import" 
   - Arraste ou selecione `postman-environment.json`
   - Clique em "Import"

4. **Ative o Environment:**
   - No canto superior direito, selecione "API Test Environment"

### Método 2: Via OpenAPI/Swagger

1. **Importe a Documentação:**
   - Clique em "Import"
   - Selecione `api-documentation.json`
   - O Postman criará automaticamente a coleção com base no Swagger

## 🎯 Como Usar

### 1. **Configurar URL Base:**
- **Local:** `http://localhost:3000` (padrão)
- **Produção:** `https://seu-projeto.vercel.app`

### 2. **Workflow de Teste:**

#### Passo 1: Login
- Execute a requisição **"🔐 Login"**
- O token será salvo automaticamente na variável `{{authToken}}`
- ✅ Status esperado: 200 OK

#### Passo 2: Testar Endpoints
- Todas as requisições já incluem `Authorization: Bearer {{authToken}}`
- Execute qualquer endpoint de produtos
- ✅ Tokens são reutilizados automaticamente

#### Passo 3: Workflow Completo
```
1. Login                    → Token salvo
2. Criar Produto           → ID salvo em {{lastProductId}}
3. Listar Produtos         → Ver produto criado
4. Buscar por ID           → Usar {{lastProductId}}
5. Atualizar Produto       → Modificar dados
6. Deletar Produto         → Remover produto
```

## 🧪 Testes Automáticos Incluídos

### Scripts de Teste Automático:
- **Login:** Salva token automaticamente
- **Criar Produto:** Salva ID do produto criado
- **Validação:** Verifica códigos de status HTTP
- **Tokens:** Gerenciamento automático de autenticação

### Exemplos de Validação:
```javascript
// Verifica se login foi bem-sucedido
pm.test("Login successful", function () {
    pm.response.to.have.status(200);
    pm.expect(pm.response.json().token).to.be.a('string');
});

// Verifica se produto foi criado
pm.test("Product created", function () {
    pm.response.to.have.status(201);
    pm.expect(pm.response.json().data.id).to.be.a('number');
});
```

## 📊 Endpoints Disponíveis

### 🏠 Geral
- `GET /` - Informações da API

### 🔐 Autenticação
- `POST /auth/login` - Login (admin/admin123)
- `GET /auth/verify` - Verificar token

### 📦 Produtos (Requer Token)
- `GET /products` - Listar todos
- `GET /products/:id` - Buscar por ID
- `POST /products` - Criar novo
- `PUT /products/:id` - Atualizar
- `DELETE /products/:id` - Deletar

### 🧪 Testes
- Acesso sem token (401)
- Token inválido (403)
- Workflow completo

## 🔧 Variáveis Disponíveis

| Variável | Descrição | Valor Padrão |
|----------|-----------|--------------|
| `{{baseUrl}}` | URL base da API | `http://localhost:3000` |
| `{{authToken}}` | Token JWT (auto) | - |
| `{{username}}` | Usuário padrão | `admin` |
| `{{password}}` | Senha padrão | `admin123` |
| `{{lastProductId}}` | Último ID criado (auto) | - |

## 🎨 Personalização

### Alternar Entre Ambientes:
```json
// Local
"baseUrl": "http://localhost:3000"

// Produção
"baseUrl": "https://seu-projeto.vercel.app"
```

### Adicionar Novos Testes:
```javascript
// No tab "Tests" de qualquer requisição
pm.test("Seu teste aqui", function () {
    pm.response.to.have.status(200);
});
```

## 🚨 Solução de Problemas

### ❌ Erro 401 - Unauthorized
- Execute o login primeiro
- Verifique se o token está sendo enviado
- Token pode ter expirado (24h)

### ❌ Erro 403 - Forbidden  
- Token inválido ou malformado
- Execute o login novamente

### ❌ Erro de Conexão
- Verifique se a API está rodando (`npm start`)
- Confirme a URL no environment
- Verifique a porta (padrão: 3000)

### ❌ Variáveis não funcionam
- Confirme que o environment está selecionado
- Verifique os scripts nos tabs "Pre-request" e "Tests"

## 📝 Dicas Extras

1. **Runner do Postman:** Execute toda a coleção de uma vez
2. **Monitor:** Configure monitoramento automático da API
3. **Newman:** Execute testes via linha de comando
4. **Documentation:** Gere documentação HTML automática
5. **Mock Server:** Crie mock da API para desenvolvimento

---

**🎉 Pronto! Sua API está documentada e pronta para testes no Postman!**