# Sistema DFD - Documento de Formalização de Demanda

Sistema web para preenchimento e geração do Documento de Formalização de Demanda (DFD) da Prefeitura Municipal de São Carlos.

![DFD Sistema](https://img.shields.io/badge/DFD-Sistema%20de%20Formalização-blue)
![React](https://img.shields.io/badge/React-18.0+-61DAFB?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-3178C6?logo=typescript)
![Vite](https://img.shields.io/badge/Vite-5.0+-646CFF?logo=vite)

## 🎯 Funcionalidades

- ✅ Formulário completo com todas as 7 seções do DFD
- ✅ Interface amigável para usuários com baixa proficiência técnica
- ✅ Barra de progresso de preenchimento
- ✅ Tooltips de ajuda em cada campo
- ✅ Exemplos pré-preenchidos
- ✅ Pré-visualização do documento
- ✅ Exportação para DOCX (Microsoft Word)
- ✅ Exportação para PDF
- ✅ Design responsivo (desktop e mobile)
- ✅ Validação de campos obrigatórios

## 🚀 Deploy no Vercel

### Opção 1: Deploy Automático (Recomendado)

1. **Fork ou crie um repositório no GitHub** com este código

2. **Acesse o Vercel**: https://vercel.com

3. **Clique em "Add New Project"**

4. **Importe seu repositório do GitHub**

5. **Configure as variáveis de build** (o Vercel detecta automaticamente):
   - Framework Preset: `Vite`
   - Build Command: `npm run build`
   - Output Directory: `dist`

6. **Clique em "Deploy"**

O Vercel irá automaticamente:
- Instalar dependências (`npm install`)
- Fazer o build (`npm run build`)
- Fazer deploy da pasta `dist`
- Fornecer uma URL pública

### Opção 2: Deploy via CLI

```bash
# Instalar o CLI do Vercel
npm install -g vercel

# Fazer login
vercel login

# No diretório do projeto
vercel

# Para deploy em produção
vercel --prod
```

### Opção 3: Deploy Manual

Se preferir fazer upload manual dos arquivos:

```bash
# Fazer build local
npm run build

# Instalar o CLI do Vercel
npm install -g vercel

# Deploy da pasta dist
vercel --prod dist
```

## 🛠️ Configuração do Projeto

### Pré-requisitos
- Node.js 18+ ou 20+
- npm ou yarn

### Instalação Local

```bash
# Clonar o repositório
git clone https://github.com/seu-usuario/sistema-dfd.git

# Entrar na pasta
cd sistema-dfd

# Instalar dependências
npm install

# Rodar em desenvolvimento
npm run dev

# Fazer build
npm run build
```

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto (opcional):

```env
# URL base (para deploy em subdiretório)
VITE_BASE_URL=/
```

## 📁 Estrutura do Projeto

```
├── src/
│   ├── components/
│   │   ├── DFDForm.tsx       # Componente principal do formulário
│   │   └── DFDPreview.tsx    # Componente de pré-visualização
│   ├── types/
│   │   └── dfd.ts            # Tipos TypeScript e configurações
│   ├── utils/
│   │   └── exportUtils.ts    # Funções de exportação DOCX/PDF
│   ├── App.tsx               # Componente raiz
│   ├── index.css             # Estilos globais
│   └── main.tsx              # Ponto de entrada
├── dist/                     # Pasta de build (gerada)
├── index.html
├── package.json
├── tsconfig.json
├── vite.config.ts
├── vercel.json               # Configuração do Vercel
└── README.md
```

## 📦 Dependências Principais

| Pacote | Versão | Descrição |
|--------|--------|-----------|
| `react` | ^18.0 | Framework UI |
| `typescript` | ^5.0 | Tipagem estática |
| `vite` | ^5.0 | Build tool |
| `tailwindcss` | ^3.4 | CSS framework |
| `shadcn/ui` | - | Componentes UI |
| `docx` | ^8.0 | Geração de DOCX |
| `html2pdf.js` | ^0.10 | Geração de PDF |
| `lucide-react` | ^0.300 | Ícones |

## 🎨 Personalização

### Cores do Tema

As cores podem ser personalizadas em `src/index.css`:

```css
:root {
  --primary: 221 83% 53%;      /* Azul principal */
  --secondary: 210 40% 96%;    /* Cinza claro */
  --accent: 37 91% 55%;        /* Âmbar */
}
```

### Logo da Prefeitura

Para substituir o logo, edite o componente `App.tsx` e `DFDPreview.tsx`:

```tsx
// Substitua o SVG pelo seu logo
<img src="/logo-prefeitura.png" alt="Logo Prefeitura" />
```

## 🔒 Segurança

- Todos os dados são processados localmente no navegador
- Nenhuma informação é enviada para servidores externos
- O sistema funciona 100% no cliente (client-side only)

## 🐛 Solução de Problemas

### Erro: "Cannot find module"
```bash
# Limpar cache e reinstalar
rm -rf node_modules package-lock.json
npm install
```

### Erro no build do Vercel
```bash
# Verifique se o Node.js está na versão 18+
node --version

# Atualize o Node.js se necessário
```

### PDF não gera no mobile
- O recurso de geração de PDF funciona melhor em desktop
- Recomendamos usar a exportação DOCX em dispositivos móveis

## 📄 Licença

Este projeto é de uso interno da Prefeitura Municipal de São Carlos.

## 🤝 Contribuição

Para contribuir com o projeto:

1. Faça um fork do repositório
2. Crie uma branch: `git checkout -b minha-feature`
3. Faça commit: `git commit -m 'Adiciona nova feature'`
4. Envie: `git push origin minha-feature`
5. Abra um Pull Request

## 📞 Suporte

Para dúvidas ou suporte, entre em contato com a equipe de TI da Prefeitura de São Carlos.

---

**Desenvolvido para**: Prefeitura Municipal de São Carlos  
**Estado de São Paulo**  
📍 Rua Episcopal, 100 - Centro - CEP: 13560-570
