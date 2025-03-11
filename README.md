# Automação de Testes com Playwright

Este é um projeto para prática de automação com Playwright e TypeScript em uma aplicação simples com cenários simples de criação, atualização e exclusão de massa de dados.

Pré-requisitos
Antes de começar, verifique se você tem os seguintes itens instalados:

Node.js (v18)
npm
Playwright para automação de navegador
Configuração

## 1. Clone o Repositório

```bash
    Primeiro, clone o repositório para a sua máquina local
```

## 2. Instale as Dependências

```bash
 Navegue até o diretório raiz do projeto e instale as dependências necessárias.
 npm install
```

## 3. Suba a API e a Aplicação Web

Este projeto exige que tanto a API quanto a aplicação Web estejam rodando localmente antes de executar os testes.

### Subir a API:

Navegue até o diretório da API e inicie o servidor:

```bash
cd playwright-mark/apps/api
npm install
npm run dev
```

### Subir a Aplicação Web:

Navegue até o diretório da aplicação Web e inicie o servidor:

```bash
cd playwright-mark/apps/web
npm install
npm run dev
```

## 4. Rodar os Testes

Após garantir que as duas aplicações estão funcionando, você pode executar os testes do Playwright. No diretório raiz do projeto, rode o seguinte comando:

```bash
npx playwright test
```

Configuração
Este projeto usa variáveis de ambiente definidas no arquivo .env. Você pode precisar ajustar a configuração de acordo com o seu ambiente local.
