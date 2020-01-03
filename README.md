<a name="desafio"/>
# Desafio final GoStack 9.0 - Rocketseat
Aplicação GymPoint completa: Backend - Frontend - Mobile

## Table of Contents  
[Desafio final GoStack 9.0 - Rocketseat](#desafio)  
[Instruções necessárias para executar app](#instrucoes)  
[Backend](#backend)  
[Frontend](#frontend) 
[Mobile](#mobile) 
[Adicional](#adicional) 

<a name="instrucoes"/>
##Instruções necessárias para executar app

<a name="backend"/>
### Backend
- Baixar as imagens do docker: **redis:alpine** e **postgres:11**
- Baixar dependências usando comando **yarn** no terminal
- Preencher variáves ambiente com arquivo **.env.example**
- Executar migrations com comando  **yarn sequelize-cli db:migrate**
- Executar seed com comando **yarn sequelize-cli db:seed:all**
- Executar **yarn dev** para iniciar api
- Executar **yarn queue** para iniciar filas de email

<a name="frontend"/>
### Frontend
- Baixar dependências usando comando **yarn** no terminal
- Executar **yarn start** para iniciar app

<a name="mobile"/>
### Mobile
- App desenvolvido na plataforma **Android**
- Baixar dependências usando comando **yarn** no terminal
- Nas configurações do **[Reactotron](https://github.com/netohelvecio/GymPoint_App/blob/master/mobile/src/config/ReactotronConfig.js)** e da **[Api](https://github.com/netohelvecio/GymPoint_App/blob/master/mobile/src/services/api.js)** é necessário mudar o IP, pois app foi emulado no meu celular
- Executar **react-native run-android** para instalar app

<a name="adicional"/>
### Adicional
- Arquivo do insomnia está na raiz do arquivo

