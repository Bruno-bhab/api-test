const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const database = require('../models/database');

const router = express.Router();
const db = database.getDB();

// Rota de login
router.post('/login', (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      error: 'Username e password são obrigatórios'
    });
  }

  // Buscar usuário no banco
  db.get(
    'SELECT * FROM users WHERE username = ?',
    [username],
    (err, user) => {
      if (err) {
        console.error('Erro ao buscar usuário:', err);
        return res.status(500).json({
          error: 'Erro interno do servidor'
        });
      }

      if (!user) {
        return res.status(401).json({
          error: 'Credenciais inválidas'
        });
      }

      // Verificar senha
      const isValidPassword = bcrypt.compareSync(password, user.password);
      
      if (!isValidPassword) {
        return res.status(401).json({
          error: 'Credenciais inválidas'
        });
      }

      // Gerar JWT token
      const token = jwt.sign(
        { 
          id: user.id, 
          username: user.username 
        },
        process.env.JWT_SECRET,
        { expiresIn: '24h' }
      );

      res.json({
        message: 'Login realizado com sucesso',
        token: token,
        user: {
          id: user.id,
          username: user.username
        }
      });
    }
  );
});

// Rota para verificar se o token é válido
router.get('/verify', (req, res) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (!token) {
    return res.status(401).json({ error: 'Token não fornecido' });
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(403).json({ error: 'Token inválido' });
    }

    res.json({
      message: 'Token válido',
      user: decoded
    });
  });
});

module.exports = router;