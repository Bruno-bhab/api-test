# 🔧 Correção do Erro JWT_SECRET na Vercel

## ❌ Problema
```
Environment Variable "JWT_SECRET" references Secret "jwt_secret", which does not exist.
```

## ✅ Solução

### Passo 1: Arquivo vercel.json Corrigido
O arquivo `vercel.json` já foi corrigido e não referencia mais o secret inexistente.

### Passo 2: Configurar Variável de Ambiente na Vercel

#### Opção A: Via Painel Web (Mais Fácil)
1. **Acesse o projeto na Vercel**
   - Vá para [vercel.com/dashboard](https://vercel.com/dashboard)
   - Clique no seu projeto `api-test`

2. **Vá para Settings**
   - Clique na aba "Settings"
   - No menu lateral, clique em "Environment Variables"

3. **Adicione a variável JWT_SECRET**
   - **Name:** `JWT_SECRET`
   - **Value:** `meu-jwt-secret-super-seguro-123456789-2025`
   - **Environments:** Marque todas (Production, Preview, Development)
   - Clique em "Save"

4. **Redeploy o projeto**
   - Vá para a aba "Deployments"
   - Clique nos 3 pontinhos (...) do último deployment
   - Clique em "Redeploy"
   - Aguarde o deploy completar

#### Opção B: Via CLI
```bash
# Faça login na Vercel (se ainda não fez)
vercel login

# Navegue para o diretório do projeto
cd /home/bruno/Projetos/api-test

# Adicione a variável de ambiente
vercel env add JWT_SECRET

# Quando solicitado, digite o valor:
# meu-jwt-secret-super-seguro-123456789-2025

# Selecione os ambientes: Production, Preview, Development
# (use espaço para marcar, enter para confirmar)

# Redeploy
vercel --prod
```

### Passo 3: Verificar se Funcionou

#### Teste 1: Rota Principal
```bash
curl https://SEU_PROJETO.vercel.app/
```

**Resposta esperada:**
```json
{
  "message": "API Node.js com JWT e CRUD de Produtos",
  "version": "1.0.0",
  ...
}
```

#### Teste 2: Login
```bash
curl -X POST https://SEU_PROJETO.vercel.app/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"admin","password":"admin123"}'
```

**Resposta esperada:**
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

## 🔍 Diagnóstico de Problemas

### Erro: "JWT_SECRET is not defined"
- A variável não foi configurada corretamente
- Refaça o processo de configuração da variável

### Erro: "Cannot connect to database"
- Normal no ambiente serverless da Vercel
- O SQLite em memória é recriado a cada requisição

### Erro 500: "Internal Server Error"
- Verifique os logs na aba "Functions" do painel da Vercel
- Pode ser problema com dependências ou código

## 🎯 Valores Recomendados para JWT_SECRET

### Para Produção (use um destes):
```bash
# Opção 1: String complexa
meu-jwt-secret-super-seguro-123456789-2025-producao

# Opção 2: Gerado aleatoriamente
$(node -e "console.log(require('crypto').randomBytes(64).toString('hex'))")

# Opção 3: Online (https://generate-secret.now.sh/64)
```

### ⚠️ NUNCA use estes em produção:
- `123456`
- `secret` 
- `jwt-secret`
- `admin123`

## 🚀 Próximos Passos

1. ✅ Configure a variável `JWT_SECRET`
2. ✅ Redeploy o projeto
3. ✅ Teste os endpoints
4. ✅ Importe a coleção do Postman
5. ✅ Atualize a URL base no Postman para sua URL da Vercel

## 📞 Se ainda não funcionar:

1. **Verifique os logs:**
   - Painel Vercel > Projeto > Functions > View Function Logs

2. **Recrie o deployment:**
   ```bash
   vercel --prod --force
   ```

3. **Verifique as variáveis:**
   ```bash
   vercel env ls
   ```

4. **Teste localmente:**
   ```bash
   npm start
   # Se funcionar local, é problema de configuração da Vercel
   ```

---

**✅ Após seguir esses passos, sua API estará funcionando perfeitamente na Vercel!**