require('dotenv').config();
const express = require('express');
const cors = require('cors');

const authRoutes = require('./routes/auth');
const productRoutes = require('./routes/products');

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rota de teste
app.get('/', (req, res) => {
  res.json({
    message: 'API Node.js com JWT e CRUD de Produtos',
    version: '1.0.0',
    endpoints: {
      auth: {
        login: 'POST /auth/login',
        verify: 'GET /auth/verify'
      },
      products: {
        list: 'GET /products',
        get: 'GET /products/:id',
        create: 'POST /products',
        update: 'PUT /products/:id',
        delete: 'DELETE /products/:id'
      }
    },
    example: {
      login: {
        username: 'admin',
        password: 'admin123'
      }
    }
  });
});

// Rotas
app.use('/auth', authRoutes);
app.use('/products', productRoutes);

// Middleware para rotas não encontradas
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Rota não encontrada',
    method: req.method,
    url: req.originalUrl
  });
});

// Middleware para tratamento de erros
app.use((err, req, res, next) => {
  console.error('Erro não tratado:', err);
  res.status(500).json({
    error: 'Erro interno do servidor',
    message: process.env.NODE_ENV === 'development' ? err.message : 'Algo deu errado'
  });
});

// Iniciar servidor apenas se não estiver sendo executado pela Vercel
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor rodando na porta ${PORT}`);
    console.log(`📍 URL: http://localhost:${PORT}`);
    console.log(`🔐 Usuário de teste: admin / admin123`);
  });
}

module.exports = app;