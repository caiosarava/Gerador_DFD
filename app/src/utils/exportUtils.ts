import { Document, Packer, Paragraph, TextRun, AlignmentType, HeadingLevel, BorderStyle } from 'docx';
import type { DFDFormData } from '@/types/dfd';
import html2pdf from 'html2pdf.js';

// Função para formatar data no padrão brasileiro
function formatDateBR(dateString: string): string {
  if (!dateString) return '';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

// Gerar documento DOCX
export async function generateDOCX(data: DFDFormData): Promise<Blob> {
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
        // Cabeçalho
        new Paragraph({
          text: 'PREFEITURA MUNICIPAL DE SÃO CARLOS',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
        }),
        new Paragraph({
          text: 'ESTADO DE SÃO PAULO',
          alignment: AlignmentType.CENTER,
          spacing: { after: 240 },
        }),
        new Paragraph({
          text: 'DOCUMENTO DE FORMALIZAÇÃO DE DEMANDA (DFD)',
          heading: HeadingLevel.HEADING_1,
          alignment: AlignmentType.CENTER,
          spacing: { after: 240 },
          border: {
            bottom: {
              color: '000000',
              space: 1,
              style: BorderStyle.SINGLE,
              size: 6,
            },
          },
        }),

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
          text: data.responsavel || 'Responsável',
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
        }),
        new Paragraph({
          text: data.departamento || 'Departamento',
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
    'numeroDFD', 'data', 'secretaria', 'departamento', 'responsavel',
    'telefone', 'email', 'descricaoObjeto', 'justificativaDemanda',
    'fundamentacaoQuantidade', 'requisitosEssenciais', 'grauPrioridade',
    'prazoNecessario', 'dotacaoOrcamentaria', 'valorEstimado', 'fonteRecurso'
  ];

  const filledFields = requiredFields.filter(field => {
    const value = data[field];
    return value && value.toString().trim() !== '';
  });

  return Math.round((filledFields.length / requiredFields.length) * 100);
}
