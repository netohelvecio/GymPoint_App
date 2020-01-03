# Desafio final GoStack 9.0 - Rocketseat
Aplicação GymPoint completa: Backend - Frontend - Mobile

[TOC]

##Instruções necessárias para executar app

### Backend
- Baixar as imagens do docker: **redis:alpine** e **postgres:11**
- Baixar dependências usando comando **yarn** no terminal
- Preencher variáves ambiente com arquivo **.env.example**
- Executar migrations com comando  **yarn sequelize-cli db:migrate**
- Executar seed com comando **yarn sequelize-cli db:seed:all**
- Executar **yarn dev** para iniciar api
- Executar **yarn queue** para iniciar filas de email

### Frontend
- Baixar dependências usando comando **yarn** no terminal
- Executar **yarn start** para iniciar app

### Mobile
- App desenvolvido na plataforma **Android**
- Baixar dependências usando comando **yarn** no terminal
- Nas configurações do **[Reactotron](https://github.com/netohelvecio/GymPoint_App/blob/master/mobile/src/config/ReactotronConfig.js)** e da **[Api](https://github.com/netohelvecio/GymPoint_App/blob/master/mobile/src/services/api.js)** necessário mudar o IP, pois app foi emulado no meu celular
- Executar **react-native run-android** para instalar app

### Adicional
- Arquivo do insomnia está na raiz do arquivo

