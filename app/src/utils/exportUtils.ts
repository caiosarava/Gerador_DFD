import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, BorderStyle, Table, TableCell, TableRow, Image as DocxImage } from 'docx';
import type { DFDFormData } from '@/types/dfd';
import html2pdf from 'html2pdf.js';

// Função para formatar data no padrão brasileiro
function formatDateBR(dateString: string): string {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

// Função para carregar a logo como base64
async function getLogoAsBase64(): Promise<string> {
  try {
    const response = await fetch('/logo_sao_carlos_transp.png');
    const blob = await response.blob();
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64 = reader.result as string;
        resolve(base64.split(',')[1]); // Remove o prefixo "data:image/png;base64,"
      };
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error('Erro ao carregar logo:', error);
    return '';
  }
}

// Gerar documento DOCX
export async function generateDOCX(data: DFDFormData): Promise<Blob> {
  // Tentar carregar a logo
  let logoElement = null;
  try {
    const logoBase64 = await getLogoAsBase64();
    if (logoBase64) {
      logoElement = new DocxImage({
        data: logoBase64,
        transformation: {
          width: 150,
          height: 150,
        },
      });
    }
  } catch (error) {
    console.error('Erro ao carregar logo:', error);
  }

  const headerElements: any[] = [];
  
  if (logoElement) {
    // Cabeçalho com logo à esquerda e texto à direita
    headerElements.push(
      new Table({
        width: { size: 100, type: 'pct' },
        rows: [
          new TableRow({
            cells: [
              new TableCell({
                width: { size: 20, type: 'pct' },
                margins: { top: 0, bottom: 0, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    children: [logoElement],
                    alignment: AlignmentType.CENTER,
                  }),
                ],
              }),
              new TableCell({
                width: { size: 80, type: 'pct' },
                margins: { top: 0, bottom: 0, left: 100, right: 100 },
                children: [
                  new Paragraph({
                    text: 'PREFEITURA MUNICIPAL DE SÃO CARLOS',
                    heading: HeadingLevel.HEADING_1,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 60 },
                  }),
                  new Paragraph({
                    text: 'São Carlos, capital da tecnologia',
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 60 },
                  }),
                  new Paragraph({
                    text: `Secretaria Municipal de ${data.nomeSecretariaCabecalho || ''}`,
                    alignment: AlignmentType.CENTER,
                    spacing: { after: 0 },
                  }),
                ],
              }),
            ],
          }),
        ],
      })
    );
  } else {
    // Cabeçalho sem logo (fallback)
    headerElements.push(
      new Paragraph({
        text: 'PREFEITURA MUNICIPAL DE SÃO CARLOS',
        heading: HeadingLevel.HEADING_1,
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
      }),
      new Paragraph({
        text: 'São Carlos, capital da tecnologia',
        alignment: AlignmentType.CENTER,
        spacing: { after: 120 },
      }),
      new Paragraph({
        text: `Secretaria Municipal de ${data.nomeSecretariaCabecalho || ''}`,
        alignment: AlignmentType.CENTER,
        spacing: { after: 240 },
      })
    );
  }

  headerElements.push(
    new Paragraph({
      text: 'DOCUMENTO DE FORMALIZAÇÃO DE DEMANDA (DFD)',
      heading: HeadingLevel.HEADING_1,
      alignment: AlignmentType.CENTER,
      spacing: { after: 240, before: 120 },
      border: {
        bottom: {
          color: '000000',
          space: 1,
          style: BorderStyle.SINGLE,
          size: 6,
        },
      },
    })
  );

  const doc = new Document({
    sections: [{
      properties: {
        page: {
          margin: {
            top: 1440, // 1 polegada
            right: 1440,
            bottom: 1440,
            left: 1440,
          },
        },
      },
      children: [
        ...headerElements,

        // Informações básicas
        new Paragraph({
          children: [
            new TextRun({ text: 'Nº DFD: ', bold: true }),
            new TextRun(data.numeroDFD || '__________'),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Data: ', bold: true }),
            new TextRun(formatDateBR(data.data) || '__________'),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Secretaria/Órgão: ', bold: true }),
            new TextRun(data.secretaria || '__________'),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Departamento/Setor: ', bold: true }),
            new TextRun(data.departamento || '__________'),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Responsável: ', bold: true }),
            new TextRun(data.responsavel || '__________'),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Telefone: ', bold: true }),
            new TextRun(data.telefone || '__________'),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'E-mail: ', bold: true }),
            new TextRun(data.email || '__________'),
          ],
          spacing: { after: 240 },
        }),

        // Seção 1
        new Paragraph({
          text: '1. DESCRIÇÃO DO OBJETO',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
        }),
        new Paragraph({
          text: data.descricaoObjeto || 'Não informado',
          spacing: { after: 240 },
        }),

        // Seção 2
        new Paragraph({
          text: '2. JUSTIFICATIVA DA DEMANDA',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
        }),
        new Paragraph({
          text: data.justificativaDemanda || 'Não informado',
          spacing: { after: 240 },
        }),

        // Seção 3
        new Paragraph({
          text: '3. FUNDAMENTAÇÃO DA QUANTIDADE',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
        }),
        new Paragraph({
          text: data.fundamentacaoQuantidade || 'Não informado',
          spacing: { after: 240 },
        }),

        // Seção 4
        new Paragraph({
          text: '4. REQUISITOS ESSENCIAIS DA CONTRATAÇÃO',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
        }),
        new Paragraph({
          text: data.requisitosEssenciais || 'Não informado',
          spacing: { after: 240 },
        }),

        // Seção 5
        new Paragraph({
          text: '5. GRAU DE PRIORIDADE',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
        }),
        new Paragraph({
          text: data.grauPrioridade || 'Não informado',
          spacing: { after: 240 },
        }),

        // Seção 6
        new Paragraph({
          text: '6. PRAZO NECESSÁRIO PARA ENTREGA',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Data Limite: ', bold: true }),
            new TextRun(formatDateBR(data.prazoNecessario) || 'Não informado'),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Observações: ', bold: true }),
            new TextRun(data.prazoObservacao || 'Não informado'),
          ],
          spacing: { after: 240 },
        }),

        // Seção 7
        new Paragraph({
          text: '7. DOTAÇÃO ORÇAMENTÁRIA',
          heading: HeadingLevel.HEADING_2,
          spacing: { before: 240, after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Dotação: ', bold: true }),
            new TextRun(data.dotacaoOrcamentaria || 'Não informado'),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Valor Estimado: R$ ', bold: true }),
            new TextRun(data.valorEstimado || 'Não informado'),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Fonte de Recurso: ', bold: true }),
            new TextRun(data.fonteRecurso || 'Não informado'),
          ],
          spacing: { after: 480 },
        }),

        // Assinatura
        new Paragraph({
          text: '___________________________________________',
          alignment: AlignmentType.CENTER,
          spacing: { before: 480, after: 60 },
        }),
        new Paragraph({
          text: data.nomeOrdenadorDespesa || 'Ordenador de Despesa',
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
        }),
        new Paragraph({
          text: 'Ordenador de Despesa',
          alignment: AlignmentType.CENTER,
        }),
      ],
    }],
  });

  return await Packer.toBlob(doc);
}

// Gerar PDF a partir do HTML
export async function generatePDF(data: DFDFormData): Promise<void> {
  const element = document.getElementById('dfd-preview-content');
  if (!element) {
    throw new Error('Elemento de preview não encontrado');
  }

  const opt = {
    margin: [15, 15, 15, 15] as [number, number, number, number],
    filename: `DFD_${data.numeroDFD || 'documento'}.pdf`,
    image: { type: 'jpeg' as const, quality: 0.98 },
    html2canvas: { 
      scale: 2,
      useCORS: true,
      logging: false
    },
    jsPDF: { 
      unit: 'mm' as const, 
      format: 'a4' as const, 
      orientation: 'portrait' as const
    }
  };

  await html2pdf().set(opt).from(element).save();
}

// Download do arquivo DOCX
export function downloadDOCX(blob: Blob, filename: string): void {
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

// Calcular progresso do formulário
export function calculateProgress(data: DFDFormData): number {
  const requiredFields: (keyof DFDFormData)[] = [
    'nomeSecretariaCabecalho', 'numeroDFD', 'data', 'secretaria', 'departamento', 'responsavel',
    'telefone', 'email', 'descricaoObjeto', 'justificativaDemanda',
    'fundamentacaoQuantidade', 'requisitosEssenciais', 'grauPrioridade',
    'prazoNecessario', 'dotacaoOrcamentaria', 'valorEstimado', 'nomeOrdenadorDespesa', 'fonteRecurso'
  ];

  const filledFields = requiredFields.filter(field => {
    const value = data[field];
    return value && value.toString().trim() !== '';
  });

  return Math.round((filledFields.length / requiredFields.length) * 100);
}
