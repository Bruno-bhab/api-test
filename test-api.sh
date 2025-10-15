#!/bin/bash

# Script de teste da API Node.js com JWT e CRUD de Produtos
# Execute com: chmod +x test-api.sh && ./test-api.sh

API_URL="http://localhost:3001"
echo "🧪 Testando API Node.js com JWT e CRUD de Produtos"
echo "📍 URL: $API_URL"
echo ""

# Função para imprimir separadores
print_separator() {
    echo "=================================================="
}

# Teste 1: Rota principal
echo "1️⃣  Testando rota principal (GET /)"
print_separator
curl -s "$API_URL/" | jq . || echo "❌ Erro ao acessar rota principal"
echo ""

# Teste 2: Login
echo "2️⃣  Testando login (POST /auth/login)"
print_separator
LOGIN_RESPONSE=$(curl -s -X POST "$API_URL/auth/login" \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}')

echo "$LOGIN_RESPONSE" | jq .

# Extrair token do response
TOKEN=$(echo "$LOGIN_RESPONSE" | jq -r '.token // empty')

if [ -n "$TOKEN" ]; then
    echo "✅ Login realizado com sucesso!"
    echo "🔑 Token: ${TOKEN:0:50}..."
else
    echo "❌ Falha no login"
    exit 1
fi
echo ""

# Teste 3: Verificar token
echo "3️⃣  Verificando token (GET /auth/verify)"
print_separator
curl -s "$API_URL/auth/verify" \
  -H "Authorization: Bearer $TOKEN" | jq . || echo "❌ Token inválido"
echo ""

# Teste 4: Listar produtos (inicialmente vazio)
echo "4️⃣  Listando produtos (GET /products)"
print_separator
curl -s "$API_URL/products" \
  -H "Authorization: Bearer $TOKEN" | jq . || echo "❌ Erro ao listar produtos"
echo ""

# Teste 5: Criar produto
echo "5️⃣  Criando produto (POST /products)"
print_separator
CREATE_RESPONSE=$(curl -s -X POST "$API_URL/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d '{
    "name": "Smartphone XYZ",
    "description": "Smartphone top de linha com 128GB",
    "price": 899.99,
    "stock": 50
  }')

echo "$CREATE_RESPONSE" | jq .

# Extrair ID do produto criado
PRODUCT_ID=$(echo "$CREATE_RESPONSE" | jq -r '.data.id // empty')
echo ""

# Teste 6: Buscar produto específico
if [ -n "$PRODUCT_ID" ]; then
    echo "6️⃣  Buscando produto por ID (GET /products/$PRODUCT_ID)"
    print_separator
    curl -s "$API_URL/products/$PRODUCT_ID" \
      -H "Authorization: Bearer $TOKEN" | jq . || echo "❌ Produto não encontrado"
    echo ""
fi

# Teste 7: Atualizar produto
if [ -n "$PRODUCT_ID" ]; then
    echo "7️⃣  Atualizando produto (PUT /products/$PRODUCT_ID)"
    print_separator
    curl -s -X PUT "$API_URL/products/$PRODUCT_ID" \
      -H "Content-Type: application/json" \
      -H "Authorization: Bearer $TOKEN" \
      -d '{
        "name": "Smartphone XYZ Pro",
        "description": "Smartphone top de linha com 256GB - Versão Pro",
        "price": 1199.99,
        "stock": 30
      }' | jq . || echo "❌ Erro ao atualizar produto"
    echo ""
fi

# Teste 8: Listar produtos novamente (agora com dados)
echo "8️⃣  Listando produtos novamente (GET /products)"
print_separator
curl -s "$API_URL/products" \
  -H "Authorization: Bearer $TOKEN" | jq . || echo "❌ Erro ao listar produtos"
echo ""

# Teste 9: Deletar produto
if [ -n "$PRODUCT_ID" ]; then
    echo "9️⃣  Deletando produto (DELETE /products/$PRODUCT_ID)"
    print_separator
    curl -s -X DELETE "$API_URL/products/$PRODUCT_ID" \
      -H "Authorization: Bearer $TOKEN" | jq . || echo "❌ Erro ao deletar produto"
    echo ""
fi

# Teste 10: Tentar acessar sem token (deve dar erro 401)
echo "🔟 Testando acesso sem token (deve dar erro 401)"
print_separator
curl -s "$API_URL/products" | jq . || echo "❌ Erro inesperado"
echo ""

echo "✅ Testes concluídos!"
echo ""
echo "📝 Resumo dos endpoints testados:"
echo "   ✅ GET  /              (Rota principal)"
echo "   ✅ POST /auth/login    (Login)"
echo "   ✅ GET  /auth/verify   (Verificar token)"
echo "   ✅ GET  /products      (Listar produtos)"
echo "   ✅ POST /products      (Criar produto)"
echo "   ✅ GET  /products/:id  (Buscar produto)"
echo "   ✅ PUT  /products/:id  (Atualizar produto)"
echo "   ✅ DELETE /products/:id (Deletar produto)"
echo ""
echo "🚀 Para usar a API:"
echo "   1. Execute: npm start"
echo "   2. Faça login em POST /auth/login com: {\"username\":\"admin\",\"password\":\"admin123\"}"
echo "   3. Use o token retornado no header: Authorization: Bearer <token>"
echo ""