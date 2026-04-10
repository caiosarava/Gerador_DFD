# 🚀 Guia Completo de Deploy no Vercel

Este guia explica passo a passo como fazer deploy do Sistema DFD no Vercel.

## 📋 Índice

1. [Preparação](#1-preparação)
2. [Deploy via Interface Web (Recomendado)](#2-deploy-via-interface-web-recomendado)
3. [Deploy via CLI](#3-deploy-via-cli)
4. [Deploy Automático com GitHub](#4-deploy-automático-com-github)
5. [Configuração de Domínio](#5-configuração-de-domínio)
6. [Solução de Problemas](#6-solução-de-problemas)

---

## 1. Preparação

### 1.1 Criar Conta no Vercel

1. Acesse: https://vercel.com/signup
2. Escolha a opção **"Continue with GitHub"**
3. Autorize o Vercel a acessar sua conta GitHub

### 1.2 Verificar o Projeto Local

Certifique-se de que o projeto está funcionando localmente:

```bash
# Navegue até a pasta do projeto
cd /mnt/okcomputer/output/app

# Instale as dependências
npm install

# Rode o projeto
npm run dev
```

Acesse http://localhost:5173 para verificar se está funcionando.

---

## 2. Deploy via Interface Web (Recomendado)

Este é o método mais simples e rápido.

### Passo 1: Enviar para o GitHub

Se ainda não enviou o código para o GitHub:

```bash
# Inicializar git
git init

# Adicionar todos os arquivos
git add .

# Fazer commit
git commit -m "Sistema DFD v1.0 - Documento de Formalização de Demanda"

# Criar repositório no GitHub e conectar
git remote add origin https://github.com/SEU_USUARIO/nome-do-repositorio.git

# Enviar código
git push -u origin main
```

### Passo 2: Importar no Vercel

1. Acesse: https://vercel.com/new

2. Clique em **"Import Git Repository"**

3. Selecione seu repositório `sistema-dfd`

4. Configure o projeto:

   | Campo | Valor |
   |-------|-------|
   | **Project Name** | `sistema-dfd` (ou o nome que preferir) |
   | **Framework Preset** | `Vite` |
   | **Root Directory** | `./` (padrão) |
   | **Build Command** | `npm run build` |
   | **Output Directory** | `dist` |

5. Clique em **"Deploy"**

6. Aguarde o build (geralmente 1-2 minutos)

7. 🎉 **Pronto!** Seu site está online!

---

## 3. Deploy via CLI

### 3.1 Instalar o CLI do Vercel

```bash
npm install -g vercel
```

### 3.2 Fazer Login

```bash
vercel login
```

Isso abrirá uma janela do navegador para autenticação.

### 3.3 Fazer Deploy

```bash
# Navegue até a pasta do projeto
cd /mnt/okcomputer/output/app

# Deploy de preview (ambiente de teste)
vercel

# Ou deploy de produção
vercel --prod
```

### 3.4 Usar o Script Automático

Também disponibilizamos um script de deploy:

```bash
./deploy.sh
```

---

## 4. Deploy Automático com GitHub

Configure para que todo push no GitHub faça deploy automático:

### 4.1 Conectar Repositório

1. No dashboard do Vercel, clique no seu projeto
2. Vá em **"Settings"** → **"Git"**
3. Verifique se o repositório está conectado

### 4.2 Configurar Branches

1. Em **"Settings"** → **"Git"**
2. Configure:
   - **Production Branch**: `main` (deploy automático em produção)
   - **Preview Branches**: `develop`, `feature/*` (deploy de preview)

### 4.3 Configurar Ações

O Vercel já configura automaticamente, mas você pode personalizar em:
**"Settings"** → **"Git"** → **"Deploy Hooks"**

---

## 5. Configuração de Domínio

### 5.1 Domínio Gratuito do Vercel

Seu site já tem um domínio gratuito:
- `https://sistema-dfd.vercel.app`

### 5.2 Domínio Personalizado

Para usar um domínio próprio (ex: `dfd.saocarlos.sp.gov.br`):

1. No dashboard do Vercel, clique no projeto
2. Vá em **"Settings"** → **"Domains"**
3. Clique em **"Add"**
4. Digite seu domínio: `dfd.saocarlos.sp.gov.br`
5. Siga as instruções para configurar o DNS

### Configuração DNS

No seu provedor de DNS, adicione:

```
Tipo: CNAME
Nome: dfd
Valor: cname.vercel-dns.com
```

Ou para domínio raiz (apex):

```
Tipo: A
Nome: @
Valor: 76.76.21.21
```

---

## 6. Solução de Problemas

### ❌ Erro: "Build Failed"

**Causa**: Geralmente problema de dependência ou TypeScript

**Solução**:
```bash
# Limpar cache
rm -rf node_modules package-lock.json

# Reinstalar
npm install

# Testar build local
npm run build
```

### ❌ Erro: "404 Not Found" ao acessar rotas

**Causa**: Problema de configuração do SPA (Single Page Application)

**Solução**: O arquivo `vercel.json` já está configurado. Verifique se está na raiz do projeto.

### ❌ Erro: "Module not found"

**Causa**: Dependência não instalada

**Solução**:
```bash
# Verifique se está no package.json
npm install nome-do-pacote

# Ou reinstale tudo
npm install
```

### ❌ PDF não gera no deploy

**Causa**: html2pdf.js pode ter problemas em alguns ambientes

**Solução**: 
- Teste a geração de DOCX (mais estável)
- Verifique se há erros no console do navegador

### ❌ Estilos não carregam

**Causa**: Problema com Tailwind CSS

**Solução**:
```bash
# Verifique se o build gerou o CSS
ls -la dist/assets/

# Deve haver arquivos .css
```

---

## 📊 Monitoramento

### Logs do Vercel

Acesse os logs em tempo real:
1. Dashboard do Vercel → Seu projeto
2. Aba **"Logs"**
3. Filtre por: Build, Serverless, Edge

### Analytics

Ative o Analytics gratuito:
1. Dashboard → **"Analytics"**
2. Clique em **"Enable"**

---

## 🔒 Configurações de Segurança

### Headers de Segurança

O arquivo `vercel.json` já inclui headers de segurança:
- X-Content-Type-Options
- X-Frame-Options
- X-XSS-Protection

### HTTPS

O Vercel fornece HTTPS automaticamente para todos os domínios.

---

## 💡 Dicas

1. **Sempre teste localmente antes de fazer deploy**
   ```bash
   npm run build
   npm run preview
   ```

2. **Use branches para diferentes ambientes**
   - `main` → Produção
   - `develop` → Desenvolvimento

3. **Monitore o uso**
   - O plano gratuito do Vercel inclui:
     - 100GB de banda/mês
     - 1000 builds/mês
     - Funções serverless

4. **Configure variáveis de ambiente se necessário**
   - Dashboard → **"Settings"** → **"Environment Variables"**

---

## 📞 Suporte

Se encontrar problemas:

1. Verifique os logs no dashboard do Vercel
2. Consulte a documentação: https://vercel.com/docs
3. Verifique o status do Vercel: https://vercel-status.com

---

**Pronto!** Seu Sistema DFD está no ar! 🎉
