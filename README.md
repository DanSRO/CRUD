# Instruções para uso do projeto
## Requisitos (baseados em ambiente Windows)

- **Editor**: Utilize um editor de sua preferência. No projeto, foi usada a IDE VSCODE.
- **Docker**: Certifique-se de ter o Docker instalado em sua máquina.
- **Postgres**: Certifique-se de ter o Postgres instalado.


## Passo a Passo

### 1. Baixar o projeto

- Faça o download do projeto a partir do repositório GitHub:
  - **URL**: [https://github.com/DanSRO/CRUD](https://github.com/DanSRO/CRUD)
  - ![Baixar projeto](/backend/public/img/gitBaixar.png)

### 2. Navegar para a raiz do projeto

#### 2.1. Crie um arquivo com extensão .yml na raiz do projeto, caso seja necessário, de acordo com a figura abaixo:
  ![docker-compose](/backend/public/img/doker-compose.png)
#### 2.2. Caso seja necessário, aqui está o arquivo Dockerfile para ser criado dentro do projeto isolado, backend:
  ![dockerfile-back](/backend/public/img/dockerfileback.png)
##### 2.2.1. Caso seja necessário, aqui está o arquivo Dockerfile para ser criado dentro do projeto isolado, frontend:
  ![dockerfile-front](/backend/public/img/dockerfileFront.png)

#### 2.3. Dentro do projeto use "docker exec -it backend sh" para entrar no container;

#### 2.4. Dentro do container use 'php artisan key:generate' e 'php artisan migrate' para gerar a nova chave e as migrates;

#### 2.5. Caso seja necessário use um 'composer install' para instalar dependências;

#### 2.6. Da mesma forma, caso necessário use 'npm ou yarn install' dentro do frontend para instalar dependências;

#### 2.7. Use o comando na raiz CRUD para subir o ambiente do projeto (sem aspas): ' docker-compose up --build -d';

#### 2.8. Para refazer as migrations use o comando dentro do container backend: 'php artisan migrate:fresh'( Atenção:'Esse comando irá apagar dados das tabelas');

#### 2.9. Detalhe: Use o comando 'docker ps' para verificar os nomes dos containers, caso haja necessidade;

#### 2.10. Para usar comandos artisan no terminal primeiro inicie entre no container "backend"; 

#### 2.11. O projeto estará rodando na **URL**: 'http://localhost:3000 ;

#### 2.12. Na página inicial há links para listar vagas ou candidatos;

#### 2.13. Caso não haja dados há opções de criar vagas ou criar candidatos.

  ### $${\color{green}END.}$$
