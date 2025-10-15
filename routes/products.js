const express = require('express');
const database = require('../models/database');
const { authenticateToken } = require('../middleware/auth');

const router = express.Router();
const db = database.getDB();

// Aplicar middleware de autenticação a todas as rotas
router.use(authenticateToken);

// GET /products - Listar todos os produtos
router.get('/', (req, res) => {
  db.all('SELECT * FROM products ORDER BY created_at DESC', (err, products) => {
    if (err) {
      console.error('Erro ao buscar produtos:', err);
      return res.status(500).json({
        error: 'Erro ao buscar produtos'
      });
    }

    res.json({
      message: 'Produtos encontrados',
      data: products
    });
  });
});

// GET /products/:id - Buscar produto por ID
router.get('/:id', (req, res) => {
  const { id } = req.params;

  db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
    if (err) {
      console.error('Erro ao buscar produto:', err);
      return res.status(500).json({
        error: 'Erro ao buscar produto'
      });
    }

    if (!product) {
      return res.status(404).json({
        error: 'Produto não encontrado'
      });
    }

    res.json({
      message: 'Produto encontrado',
      data: product
    });
  });
});

// POST /products - Criar novo produto
router.post('/', (req, res) => {
  const { name, description, price, stock } = req.body;

  // Validações
  if (!name || !price) {
    return res.status(400).json({
      error: 'Nome e preço são obrigatórios'
    });
  }

  if (isNaN(price) || price < 0) {
    return res.status(400).json({
      error: 'Preço deve ser um número válido e positivo'
    });
  }

  const productData = {
    name: name.trim(),
    description: description ? description.trim() : null,
    price: parseFloat(price),
    stock: stock ? parseInt(stock) : 0
  };

  db.run(
    'INSERT INTO products (name, description, price, stock) VALUES (?, ?, ?, ?)',
    [productData.name, productData.description, productData.price, productData.stock],
    function(err) {
      if (err) {
        console.error('Erro ao criar produto:', err);
        return res.status(500).json({
          error: 'Erro ao criar produto'
        });
      }

      // Buscar o produto criado
      db.get('SELECT * FROM products WHERE id = ?', [this.lastID], (err, product) => {
        if (err) {
          console.error('Erro ao buscar produto criado:', err);
          return res.status(500).json({
            error: 'Produto criado mas erro ao recuperar dados'
          });
        }

        res.status(201).json({
          message: 'Produto criado com sucesso',
          data: product
        });
      });
    }
  );
});

// PUT /products/:id - Atualizar produto
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { name, description, price, stock } = req.body;

  // Validações
  if (!name || !price) {
    return res.status(400).json({
      error: 'Nome e preço são obrigatórios'
    });
  }

  if (isNaN(price) || price < 0) {
    return res.status(400).json({
      error: 'Preço deve ser um número válido e positivo'
    });
  }

  const productData = {
    name: name.trim(),
    description: description ? description.trim() : null,
    price: parseFloat(price),
    stock: stock ? parseInt(stock) : 0
  };

  db.run(
    'UPDATE products SET name = ?, description = ?, price = ?, stock = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
    [productData.name, productData.description, productData.price, productData.stock, id],
    function(err) {
      if (err) {
        console.error('Erro ao atualizar produto:', err);
        return res.status(500).json({
          error: 'Erro ao atualizar produto'
        });
      }

      if (this.changes === 0) {
        return res.status(404).json({
          error: 'Produto não encontrado'
        });
      }

      // Buscar o produto atualizado
      db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
        if (err) {
          console.error('Erro ao buscar produto atualizado:', err);
          return res.status(500).json({
            error: 'Produto atualizado mas erro ao recuperar dados'
          });
        }

        res.json({
          message: 'Produto atualizado com sucesso',
          data: product
        });
      });
    }
  );
});

// DELETE /products/:id - Deletar produto
router.delete('/:id', (req, res) => {
  const { id } = req.params;

  // Primeiro verificar se o produto existe
  db.get('SELECT * FROM products WHERE id = ?', [id], (err, product) => {
    if (err) {
      console.error('Erro ao buscar produto:', err);
      return res.status(500).json({
        error: 'Erro ao buscar produto'
      });
    }

    if (!product) {
      return res.status(404).json({
        error: 'Produto não encontrado'
      });
    }

    // Deletar o produto
    db.run('DELETE FROM products WHERE id = ?', [id], function(err) {
      if (err) {
        console.error('Erro ao deletar produto:', err);
        return res.status(500).json({
          error: 'Erro ao deletar produto'
        });
      }

      res.json({
        message: 'Produto deletado com sucesso',
        data: product
      });
    });
  });
});

module.exports = router;