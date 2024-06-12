# API de Inventário de Ativos de TI

Esta é uma API desenvolvida em Node.js e MySQL para gerenciar um inventário de ativos de TI. A API permite realizar operações de CRUD (Criar, Ler, Atualizar, Deletar) para os ativos de funcionários.

## Pré-requisitos

Antes de começar, certifique-se de ter instalado em sua máquina:
- [Node.js](https://nodejs.org/)
- [MySQL](https://www.mysql.com/)

## Instalação

1. Navegue até o diretório do projeto:
    ```
    cd APIBD
    ```
2. Instale as dependências do projeto:
    ```
    npm install
    ```
3. Configure o banco de dados:
   - Crie um banco de dados no MySQL:
     ```
     CREATE DATABASE dbApiInventario;
     ```
   - Crie a tabela `inventario` no banco de dados:
     ```
     CREATE TABLE inventario (
         CPF CHAR(14) NOT NULL,
         Nome VARCHAR(255) NOT NULL,
         Notebook ENUM('SIM', 'NÃO') NOT NULL,
         Notebook_Tag CHAR(7),
         Notebook_Modelo VARCHAR(255),
         Notebook_NumeroSerie VARCHAR(255),
         Notebook_Versao VARCHAR(255),
         Notebook_Caracteristicas VARCHAR(255),
         Notebook_Observacao VARCHAR(255),
         Monitor1 ENUM('SIM', 'NÃO') NOT NULL,
         Monitor1_Modelo VARCHAR(255),
         Monitor1_NumeroSerie VARCHAR(255),
         Monitor1_Observacao VARCHAR(255),
         Monitor2 ENUM('SIM', 'NÃO') NOT NULL,
         Monitor2_Modelo VARCHAR(255),
         Monitor2_NumeroSerie VARCHAR(255),
         Monitor2_Observacao VARCHAR(255),
         Teclado ENUM('SIM', 'NÃO') NOT NULL,
         Teclado_Modelo VARCHAR(255),
         Teclado_NumeroSerie VARCHAR(255),
         Teclado_Observacao VARCHAR(255),
         Mouse ENUM('SIM', 'NÃO') NOT NULL,
         Mouse_Modelo VARCHAR(255),
         Mouse_NumeroSerie VARCHAR(255),
         Mouse_Observacao VARCHAR(255),
         Desktop ENUM('SIM', 'NÃO') NOT NULL,
         Desktop_Tag CHAR(7),
         Desktop_Modelo VARCHAR(255),
         Desktop_NumeroSerie VARCHAR(255),
         Desktop_Versao VARCHAR(255),
         Desktop_Caracteristicas VARCHAR(255),
         Desktop_Observacao VARCHAR(255),
         Acessorios ENUM('SIM', 'NÃO') NOT NULL,
         SuporteNotebook ENUM('SIM', 'NÃO'),
         MousePad ENUM('SIM', 'NÃO'),
         Nobreak ENUM('SIM', 'NÃO') NOT NULL,
         Nobreak_Modelo VARCHAR(255),
         Nobreak_NumeroSerie VARCHAR(255),
         Nobreak_Observacao VARCHAR(255),
         Headset ENUM('SIM', 'NÃO') NOT NULL,
         Headset_Modelo VARCHAR(255),
         Headset_NumeroSerie VARCHAR(255),
         Headset_Observacao VARCHAR(255),
         Celular ENUM('SIM', 'NÃO') NOT NULL,
         Celular_Modelo VARCHAR(255),
         Celular_IMEI1 VARCHAR(255),
         Celular_Numero CHAR(11),
         Celular_Observacao VARCHAR(255)
     );
     ```
4. Crie um arquivo `.env` na raiz do projeto e configure as variáveis de ambiente:
    ```
    DB_HOST=localhost
    DB_USER=seu_usuario
    DB_PASS=sua_senha
    DB_NAME=dbApiInventario
    ```

5. Inicie o servidor:
    ```
    npm start
    ```
