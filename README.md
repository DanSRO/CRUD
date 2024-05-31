#Instruções para uso do projeto:

#Comandos baseados em ambiente Windows;

#Primeiro passo:

#Tenha um editor de sua preferência, no projeto usei a IDE VSCODE;

#É necessário ter em sua máquina já instalado o Docker e o postgres; 

#Após baixar o projeto em https://github.com/DanSRO/CRUD;

![baixar projeto](/backend/public/img/gitBaixar.png);

#Entre na raiz do projeto com cd CRUD;

#Crie um arquivo com extensão .yml na raiz do projeto, caso seja necessário, de acordo com a figura abaixo:

![docker-compose](/backend/public/img/doker-compose.png);

#caso seja necessário, aqui estão os arquivos Dockerfile para serem criados dentro de cada projeto isolado, frontend e backend:

![dockerfile-back](/backend/public/img/dockerfileback.png);

![dockerfile-front](/backend/public/img/dockerfileFront.png);

#Dentro do projeto use "docker exec -it backend sh" para entrar no container;

#Dentro do container use 'php artisan key:generate' e 'php artisan migrate' para gerar a nova chave e as migrates;

#Caso seja necessário use um 'composer install' para instalar dependências;

#Da mesma forma, caso necessário use 'npm ou yarn install' dentro do frontend para instalar dependências;

#Use o comando na raiz CRUD para subir o ambiente do projeto (sem aspas): ' docker-compose up --build -d';

#Para refazer as migrations use o comando dentro do container backend: 'php artisan migrate:fresh'( Atenção:'Esse comando irá apagar dados das tabelas');

#Detalhe: Use o comando 'docker ps' para verificar os nomes dos containers, caso haja necessidade;

#Para usar comandos artisan no terminal primeiro inicie entre no container "backend"; 

#O projeto estará rodando em: 'http://localhost:3000 ;

#Na página inicial há links para listar vagas ou candidatos;

#Caso não haja dados há opções de criar vagas ou criar candidatos.
