#!/bin/bash

# Script de Deploy para Vercel
# Sistema DFD - Prefeitura de São Carlos

echo "🚀 Iniciando deploy do Sistema DFD..."
echo ""

# Verificar se o Vercel CLI está instalado
if ! command -v vercel &> /dev/null; then
    echo "📦 Instalando Vercel CLI..."
    npm install -g vercel
fi

# Verificar login no Vercel
echo "🔐 Verificando login no Vercel..."
vercel whoami &> /dev/null
if [ $? -ne 0 ]; then
    echo "❌ Você precisa fazer login no Vercel"
    vercel login
fi

# Fazer build
echo ""
echo "🔨 Fazendo build do projeto..."
npm run build

if [ $? -ne 0 ]; then
    echo "❌ Erro no build! Corrija os erros e tente novamente."
    exit 1
fi

echo ""
echo "✅ Build concluído com sucesso!"
echo ""

# Perguntar tipo de deploy
echo "Escolha o tipo de deploy:"
echo "1) Deploy de preview (ambiente de teste)"
echo "2) Deploy de produção"
echo ""
read -p "Opção (1 ou 2): " opcao

if [ "$opcao" = "2" ]; then
    echo ""
    echo "🚀 Fazendo deploy em PRODUÇÃO..."
    vercel --prod
else
    echo ""
    echo "🚀 Fazendo deploy de PREVIEW..."
    vercel
fi

echo ""
echo "✨ Deploy concluído!"
echo ""
echo "📋 Próximos passos:"
echo "   - Acesse o dashboard do Vercel para gerenciar o projeto"
echo "   - Configure um domínio personalizado se necessário"
echo "   - Ative o CI/CD para deploy automático a partir do GitHub"
echo ""
