const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');

class Database {
  constructor() {
    // Usando banco em memória para simplicidade
    this.db = new sqlite3.Database(':memory:', (err) => {
      if (err) {
        console.error('Erro ao abrir banco de dados:', err.message);
      } else {
        console.log('Conectado ao banco SQLite em memória');
        this.init();
      }
    });
  }

  init() {
    // Criar tabela de usuários
    this.db.run(`
      CREATE TABLE IF NOT EXISTS users (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        username TEXT UNIQUE NOT NULL,
        password TEXT NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar tabela users:', err.message);
        return;
      }
      console.log('Tabela users criada com sucesso');
      
      // Inserir usuário padrão após criar a tabela
      const hashedPassword = bcrypt.hashSync('admin123', 10);
      this.db.run(
        'INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)',
        ['admin', hashedPassword],
        (err) => {
          if (err) {
            console.log('Erro ao criar usuário admin:', err.message);
          } else {
            console.log('Usuário admin criado com sucesso');
          }
        }
      );
    });

    // Criar tabela de produtos
    this.db.run(`
      CREATE TABLE IF NOT EXISTS products (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        price REAL NOT NULL,
        stock INTEGER DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Erro ao criar tabela products:', err.message);
      } else {
        console.log('Tabela products criada com sucesso');
      }
    });
  }

  getDB() {
    return this.db;
  }

  close() {
    this.db.close((err) => {
      if (err) {
        console.error('Erro ao fechar banco:', err.message);
      } else {
        console.log('Conexão com banco fechada');
      }
    });
  }
}

module.exports = new Database();