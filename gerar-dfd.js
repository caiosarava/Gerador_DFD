#!/usr/bin/env node
// Gerador de DFD - Prefeitura de São Carlos
// Uso: node gerar-dfd.js <dados.json>

const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell,
  AlignmentType, BorderStyle, WidthType, ShadingType, VerticalAlign,
  HeadingLevel, UnderlineType, PageNumber, NumberFormat
} = require('/home/claude/.npm-global/lib/node_modules/docx');
const fs = require('fs');

// ─── Dados padrão (substituídos pelo formulário) ─────────────────────────────
const dadosPadrao = {
  orgao: "Secretaria Municipal de Educação",
  data_elaboracao: "09/04/2026",
  descricao_objeto: "Pretende-se a contratação de empresa especializada para prestação de serviços de limpeza e conservação, com a finalidade de atender às necessidades da Secretaria Municipal de Educação, garantindo a continuidade das atividades relacionadas à higienização das unidades escolares.",
  justificativa: "A contratação é necessária para garantir a continuidade dos serviços de limpeza e conservação dos prédios públicos, uma vez que o contrato vigente encontra-se próximo do término.",
  fundamentacao_quantidade: "A quantidade foi estimada com base no consumo médio mensal registrado no exercício anterior, correspondente à área total de 8.000 m² dos prédios atendidos.",
  requisitos: "A empresa deverá disponibilizar equipe suficiente para execução diária dos serviços, fornecer todos os materiais necessários e garantir substituição imediata de profissionais em caso de ausência.",
  prioridade: "Alta",
  prazo_data: "01/07/2026",
  prazo_observacoes: "O prazo corresponde à data imediatamente posterior ao término do contrato vigente, previsto para 30/06/2026.",
  ficha_orcamentaria: "001/2026",
  fonte_recurso: "Tesouro Municipal",
  nome_responsavel: "FULANO DE TAL",
  secretaria: "Secretaria Municipal de Educação"
};

// ─── Helpers de estilo ────────────────────────────────────────────────────────
const FONTE = "Arial";
const AZUL_PMC = "1F3864"; // azul institucional
const CINZA_BORDA = "CCCCCC";
const LARGURA_PAGINA = 11906; // A4 em DXA
const MARGEM = 1134; // ~2cm
const LARGURA_CONTEUDO = LARGURA_PAGINA - (MARGEM * 2);

const bordaTabela = (cor = CINZA_BORDA, tamanho = 4) => ({
  top: { style: BorderStyle.SINGLE, size: tamanho, color: cor },
  bottom: { style: BorderStyle.SINGLE, size: tamanho, color: cor },
  left: { style: BorderStyle.SINGLE, size: tamanho, color: cor },
  right: { style: BorderStyle.SINGLE, size: tamanho, color: cor }
});

const semBorda = () => ({
  top: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  bottom: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  left: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" },
  right: { style: BorderStyle.NONE, size: 0, color: "FFFFFF" }
});

function paragrafo(texto, opcoes = {}) {
  return new Paragraph({
    alignment: opcoes.centralizado ? AlignmentType.CENTER : AlignmentType.JUSTIFIED,
    spacing: { before: opcoes.antes || 0, after: opcoes.depois || 120 },
    children: [
      new TextRun({
        text: texto,
        font: FONTE,
        size: opcoes.tamanho || 22,
        bold: opcoes.negrito || false,
        underline: opcoes.sublinhado ? { type: UnderlineType.SINGLE } : undefined,
        color: opcoes.cor || "000000"
      })
    ]
  });
}

function tituloSecao(numero, titulo) {
  return new Paragraph({
    spacing: { before: 240, after: 120 },
    children: [
      new TextRun({
        text: `${numero} – ${titulo}`,
        font: FONTE,
        size: 24,
        bold: true,
        color: AZUL_PMC
      })
    ]
  });
}

function celula(children, opcoes = {}) {
  return new TableCell({
    borders: opcoes.semBorda ? semBorda() : bordaTabela(),
    width: { size: opcoes.largura || LARGURA_CONTEUDO, type: WidthType.DXA },
    shading: opcoes.fundo ? { fill: opcoes.fundo, type: ShadingType.CLEAR } : undefined,
    margins: { top: 100, bottom: 100, left: 150, right: 150 },
    verticalAlign: VerticalAlign.CENTER,
    columnSpan: opcoes.colspan || 1,
    children: Array.isArray(children) ? children : [children]
  });
}

// ─── Gerador principal ────────────────────────────────────────────────────────
function gerarDFD(dados) {
  const d = { ...dadosPadrao, ...dados };

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          size: { width: LARGURA_PAGINA, height: 16838 },
          margin: { top: MARGEM, right: MARGEM, bottom: MARGEM, left: MARGEM }
        }
      },
      children: [

        // ── CABEÇALHO ──────────────────────────────────────────────────────────

        // Tabela de cabeçalho (linha do órgão)
        new Table({
          width: { size: LARGURA_CONTEUDO, type: WidthType.DXA },
          columnWidths: [LARGURA_CONTEUDO],
          rows: [
            new TableRow({
              children: [
                celula(
                  new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 60, after: 60 },
                    children: [
                      new TextRun({ text: "ÓRGÃO: ", font: FONTE, size: 22, bold: true }),
                      new TextRun({ text: d.orgao.toUpperCase(), font: FONTE, size: 22, bold: true, italics: true })
                    ]
                  }),
                  { fundo: "E8EDF5" }
                )
              ]
            })
          ]
        }),

        // Título do documento
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 200, after: 80 },
          children: [
            new TextRun({
              text: "DOCUMENTO DE FORMALIZAÇÃO DE DEMANDA",
              font: FONTE, size: 28, bold: true,
              underline: { type: UnderlineType.SINGLE }
            })
          ]
        }),

        // Data de elaboração
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 240 },
          children: [
            new TextRun({
              text: `DATA DE ELABORAÇÃO: ${d.data_elaboracao}`,
              font: FONTE, size: 22, bold: true,
              underline: { type: UnderlineType.SINGLE }
            })
          ]
        }),

        // Fundamentação legal
        paragrafo(
          "Conforme disposto no Art. 12, inciso VII, da Lei Federal nº. 14.133/2021, e no Art. 7º do Decreto Municipal nº. 872/2024, as contratações públicas devem ser precedidas de Documento de Formalização da Demanda (DFD).",
          { depois: 300 }
        ),

        // ── 1. DESCRIÇÃO DO OBJETO ─────────────────────────────────────────────
        tituloSecao("1", "DESCRIÇÃO DO OBJETO"),
        paragrafo(d.descricao_objeto, { depois: 300 }),

        // ── 2. JUSTIFICATIVA DA DEMANDA ────────────────────────────────────────
        tituloSecao("2", "JUSTIFICATIVA DA DEMANDA"),
        paragrafo(d.justificativa, { depois: 300 }),

        // ── 3. FUNDAMENTAÇÃO DA QUANTIDADE ────────────────────────────────────
        tituloSecao("3", "FUNDAMENTAÇÃO DA QUANTIDADE"),
        paragrafo(d.fundamentacao_quantidade, { depois: 300 }),

        // ── 4. REQUISITOS ESSENCIAIS ───────────────────────────────────────────
        tituloSecao("4", "REQUISITOS ESSENCIAIS DA CONTRATAÇÃO"),
        paragrafo(d.requisitos, { depois: 300 }),

        // ── 5. GRAU DE PRIORIDADE ──────────────────────────────────────────────
        tituloSecao("5", "GRAU DE PRIORIDADE DA CONTRATAÇÃO"),
        paragrafo(d.prioridade, { depois: 300 }),

        // ── 6. PRAZO NECESSÁRIO ────────────────────────────────────────────────
        tituloSecao("6", "PRAZO NECESSÁRIO PARA ATENDIMENTO"),

        new Paragraph({
          spacing: { before: 0, after: 80 },
          children: [
            new TextRun({ text: "Prazo necessário: ", font: FONTE, size: 22, bold: true }),
            new TextRun({ text: d.prazo_data, font: FONTE, size: 22 })
          ]
        }),

        new Paragraph({
          spacing: { before: 0, after: 300 },
          children: [
            new TextRun({ text: "Observações: ", font: FONTE, size: 22, bold: true }),
            new TextRun({ text: d.prazo_observacoes, font: FONTE, size: 22 })
          ]
        }),

        // ── 7. DOTAÇÃO ORÇAMENTÁRIA ────────────────────────────────────────────
        tituloSecao("7", "DOTAÇÃO ORÇAMENTÁRIA"),

        new Paragraph({
          spacing: { before: 0, after: 80 },
          children: [
            new TextRun({ text: "Ficha orçamentária: ", font: FONTE, size: 22, bold: true }),
            new TextRun({ text: d.ficha_orcamentaria, font: FONTE, size: 22 })
          ]
        }),

        new Paragraph({
          spacing: { before: 0, after: 500 },
          children: [
            new TextRun({ text: "Fonte de recurso: ", font: FONTE, size: 22, bold: true }),
            new TextRun({ text: d.fonte_recurso, font: FONTE, size: 22 })
          ]
        }),

        // ── ASSINATURA ─────────────────────────────────────────────────────────
        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 400, after: 80 },
          border: {
            top: { style: BorderStyle.SINGLE, size: 6, color: CINZA_BORDA, space: 1 }
          },
          children: [
            new TextRun({ text: "(assinatura do ordenador de despesas)", font: FONTE, size: 20, italics: true, color: "888888" })
          ]
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 80, after: 40 },
          children: [
            new TextRun({ text: d.nome_responsavel.toUpperCase(), font: FONTE, size: 22, bold: true })
          ]
        }),

        new Paragraph({
          alignment: AlignmentType.CENTER,
          spacing: { before: 0, after: 0 },
          children: [
            new TextRun({ text: d.secretaria, font: FONTE, size: 22 })
          ]
        }),

      ]
    }]
  });

  return doc;
}

// ─── CLI entrypoint ───────────────────────────────────────────────────────────
async function main() {
  let dados = {};
  const jsonFile = process.argv[2];
  if (jsonFile && fs.existsSync(jsonFile)) {
    dados = JSON.parse(fs.readFileSync(jsonFile, 'utf-8'));
  }

  const saida = process.argv[3] || '/mnt/user-data/outputs/DFD_gerado.docx';
  const doc = gerarDFD(dados);
  const buffer = await Packer.toBuffer(doc);
  fs.writeFileSync(saida, buffer);
  console.log(`DFD gerado: ${saida}`);
}

main().catch(console.error);
