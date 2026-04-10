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
          children: [
            new TextRun({
              text: 'PREFEITURA MUNICIPAL DE SÃO CARLOS',
              bold: true,
              size: 28, // 14pt = 28 half-points
              font: 'Arial',
              color: '000000',
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'São Carlos, capital da tecnologia',
              size: 24, // 12pt
              font: 'Arial',
              color: '000000',
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: `Secretaria Municipal de ${data.nomeSecretariaCabecalho || ''}`,
              size: 24, // 12pt
              font: 'Arial',
              color: '000000',
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 240 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'DOCUMENTO DE FORMALIZAÇÃO DE DEMANDA (DFD)',
              bold: true,
              size: 26, // 13pt
              font: 'Arial',
              color: '000000',
            }),
          ],
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
            new TextRun({ text: 'Nº DFD: ', bold: true, font: 'Arial', color: '000000' }),
            new TextRun({ text: data.numeroDFD || '__________', font: 'Arial', color: '000000' }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Data: ', bold: true, font: 'Arial', color: '000000' }),
            new TextRun({ text: formatDateBR(data.data) || '__________', font: 'Arial', color: '000000' }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Secretaria/Órgão: ', bold: true, font: 'Arial', color: '000000' }),
            new TextRun({ text: data.secretaria || '__________', font: 'Arial', color: '000000' }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Departamento/Setor: ', bold: true, font: 'Arial', color: '000000' }),
            new TextRun({ text: data.departamento || '__________', font: 'Arial', color: '000000' }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Responsável: ', bold: true, font: 'Arial', color: '000000' }),
            new TextRun({ text: data.responsavel || '__________', font: 'Arial', color: '000000' }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Telefone: ', bold: true, font: 'Arial', color: '000000' }),
            new TextRun({ text: data.telefone || '__________', font: 'Arial', color: '000000' }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'E-mail: ', bold: true, font: 'Arial', color: '000000' }),
            new TextRun({ text: data.email || '__________', font: 'Arial', color: '000000' }),
          ],
          spacing: { after: 240 },
        }),

        // Seção 1
        new Paragraph({
          children: [
            new TextRun({ text: '1. DESCRIÇÃO DO OBJETO', bold: true, font: 'Arial', color: '000000' }),
          ],
          spacing: { before: 240, after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: data.descricaoObjeto || 'Não informado', font: 'Arial', color: '000000' }),
          ],
          spacing: { after: 240 },
        }),

        // Seção 2
        new Paragraph({
          children: [
            new TextRun({ text: '2. JUSTIFICATIVA DA DEMANDA', bold: true, font: 'Arial', color: '000000' }),
          ],
          spacing: { before: 240, after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: data.justificativaDemanda || 'Não informado', font: 'Arial', color: '000000' }),
          ],
          spacing: { after: 240 },
        }),

        // Seção 3
        new Paragraph({
          children: [
            new TextRun({ text: '3. FUNDAMENTAÇÃO DA QUANTIDADE', bold: true, font: 'Arial', color: '000000' }),
          ],
          spacing: { before: 240, after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: data.fundamentacaoQuantidade || 'Não informado', font: 'Arial', color: '000000' }),
          ],
          spacing: { after: 240 },
        }),

        // Seção 4
        new Paragraph({
          children: [
            new TextRun({ text: '4. REQUISITOS ESSENCIAIS DA CONTRATAÇÃO', bold: true, font: 'Arial', color: '000000' }),
          ],
          spacing: { before: 240, after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: data.requisitosEssenciais || 'Não informado', font: 'Arial', color: '000000' }),
          ],
          spacing: { after: 240 },
        }),

        // Seção 5
        new Paragraph({
          children: [
            new TextRun({ text: '5. GRAU DE PRIORIDADE', bold: true, font: 'Arial', color: '000000' }),
          ],
          spacing: { before: 240, after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: data.grauPrioridade || 'Não informado', font: 'Arial', color: '000000' }),
          ],
          spacing: { after: 240 },
        }),

        // Seção 6
        new Paragraph({
          children: [
            new TextRun({ text: '6. PRAZO NECESSÁRIO PARA ENTREGA', bold: true, font: 'Arial', color: '000000' }),
          ],
          spacing: { before: 240, after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Data Limite: ', bold: true, font: 'Arial', color: '000000' }),
            new TextRun({ text: formatDateBR(data.prazoNecessario) || 'Não informado', font: 'Arial', color: '000000' }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Observações: ', bold: true, font: 'Arial', color: '000000' }),
            new TextRun({ text: data.prazoObservacao || 'Não informado', font: 'Arial', color: '000000' }),
          ],
          spacing: { after: 240 },
        }),

        // Seção 7
        new Paragraph({
          children: [
            new TextRun({ text: '7. DOTAÇÃO ORÇAMENTÁRIA', bold: true, font: 'Arial', color: '000000' }),
          ],
          spacing: { before: 240, after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Dotação: ', bold: true, font: 'Arial', color: '000000' }),
            new TextRun({ text: data.dotacaoOrcamentaria || 'Não informado', font: 'Arial', color: '000000' }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Valor Estimado: R$ ', bold: true, font: 'Arial', color: '000000' }),
            new TextRun({ text: data.valorEstimado || 'Não informado', font: 'Arial', color: '000000' }),
          ],
          spacing: { after: 120 },
        }),
        new Paragraph({
          children: [
            new TextRun({ text: 'Fonte de Recurso: ', bold: true, font: 'Arial', color: '000000' }),
            new TextRun({ text: data.fonteRecurso || 'Não informado', font: 'Arial', color: '000000' }),
          ],
          spacing: { after: 480 },
        }),

        // Assinatura
        new Paragraph({
          children: [
            new TextRun({
              text: '___________________________________________',
              font: 'Arial',
              color: '000000',
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { before: 480, after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: data.nomeOrdenadorDespesa || 'Ordenador de Despesa',
              font: 'Arial',
              color: '000000',
              bold: true,
            }),
          ],
          alignment: AlignmentType.CENTER,
          spacing: { after: 60 },
        }),
        new Paragraph({
          children: [
            new TextRun({
              text: 'Ordenador de Despesa',
              font: 'Arial',
              color: '000000',
            }),
          ],
          alignment: AlignmentType.CENTER,
        }),
      ],
    }],
  });

  return await Packer.toBlob(doc);
}

// Gerar HTML do documento
function generateDocumentHTML(data: DFDFormData): string {
  const logoImg = '<img src="/logo_sao_carlos_transp.png" alt="Logo" style="height: 100px; width: auto;" />';
  
  return `
    <div style="padding: 40px; font-family: Arial, sans-serif; line-height: 1.5;">
      <!-- Cabeçalho -->
      <div style="display: flex; gap: 20px; align-items: flex-start; border-bottom: 2px solid #000; padding-bottom: 30px; margin-bottom: 30px;">
        <div style="flex-shrink: 0;">
          ${logoImg}
        </div>
        <div style="flex: 1; text-align: center;">
          <h1 style="font-size: 18px; font-weight: bold; margin: 0 0 10px 0;">PREFEITURA MUNICIPAL DE SÃO CARLOS</h1>
          <p style="font-size: 12px; color: #333; margin: 0 0 10px 0;">São Carlos, capital da tecnologia</p>
          <p style="font-size: 12px; font-weight: bold; margin: 0;">Secretaria Municipal de ${data.nomeSecretariaCabecalho || ''}</p>
        </div>
      </div>

      <h2 style="text-align: center; font-size: 16px; margin: 0 0 30px 0; border-top: 1px solid #ccc; padding-top: 15px;">DOCUMENTO DE FORMALIZAÇÃO DE DEMANDA (DFD)</h2>

      <!-- Informações Básicas -->
      <div style="margin-bottom: 20px; font-size: 12px;">
        <div style="display: flex; margin-bottom: 8px;"><span style="font-weight: bold; width: 150px;">Nº DFD:</span><span style="flex: 1; border-bottom: 1px solid #000;">${data.numeroDFD || '__________'}</span></div>
        <div style="display: flex; margin-bottom: 8px;"><span style="font-weight: bold; width: 150px;">Data:</span><span style="flex: 1; border-bottom: 1px solid #000;">${formatDateBR(data.data)}</span></div>
        <div style="display: flex; margin-bottom: 8px;"><span style="font-weight: bold; width: 150px;">Secretaria/Órgão:</span><span style="flex: 1; border-bottom: 1px solid #000;">${data.secretaria || '__________'}</span></div>
        <div style="display: flex; margin-bottom: 8px;"><span style="font-weight: bold; width: 150px;">Departamento:</span><span style="flex: 1; border-bottom: 1px solid #000;">${data.departamento || '__________'}</span></div>
        <div style="display: flex; margin-bottom: 8px;"><span style="font-weight: bold; width: 150px;">Responsável:</span><span style="flex: 1; border-bottom: 1px solid #000;">${data.responsavel || '__________'}</span></div>
        <div style="display: flex; margin-bottom: 8px;"><span style="font-weight: bold; width: 150px;">Telefone:</span><span style="flex: 1; border-bottom: 1px solid #000;">${data.telefone || '__________'}</span></div>
        <div style="display: flex;"><span style="font-weight: bold; width: 150px;">E-mail:</span><span style="flex: 1; border-bottom: 1px solid #000;">${data.email || '__________'}</span></div>
      </div>

      <!-- Seção 1 -->
      <h3 style="background-color: #f0f0f0; padding: 8px; margin: 20px 0 10px 0; border-left: 4px solid #2563eb; font-size: 12px;">1. DESCRIÇÃO DO OBJETO</h3>
      <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 20px; font-size: 12px; min-height: 60px; white-space: pre-wrap;">${data.descricaoObjeto || '<span style="color: #999;">Não informado</span>'}</div>

      <!-- Seção 2 -->
      <h3 style="background-color: #f0f0f0; padding: 8px; margin: 20px 0 10px 0; border-left: 4px solid #9333ea; font-size: 12px;">2. JUSTIFICATIVA DA DEMANDA</h3>
      <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 20px; font-size: 12px; min-height: 60px; white-space: pre-wrap;">${data.justificativaDemanda || '<span style="color: #999;">Não informado</span>'}</div>

      <!-- Seção 3 -->
      <h3 style="background-color: #f0f0f0; padding: 8px; margin: 20px 0 10px 0; border-left: 4px solid #ea580c; font-size: 12px;">3. FUNDAMENTAÇÃO DA QUANTIDADE</h3>
      <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 20px; font-size: 12px; min-height: 60px; white-space: pre-wrap;">${data.fundamentacaoQuantidade || '<span style="color: #999;">Não informado</span>'}</div>

      <!-- Seção 4 -->
      <h3 style="background-color: #f0f0f0; padding: 8px; margin: 20px 0 10px 0; border-left: 4px solid #4f46e5; font-size: 12px;">4. REQUISITOS ESSENCIAIS DA CONTRATAÇÃO</h3>
      <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 20px; font-size: 12px; min-height: 60px; white-space: pre-wrap;">${data.requisitosEssenciais || '<span style="color: #999;">Não informado</span>'}</div>

      <!-- Seção 5 -->
      <h3 style="background-color: #f0f0f0; padding: 8px; margin: 20px 0 10px 0; border-left: 4px solid #dc2626; font-size: 12px;">5. GRAU DE PRIORIDADE</h3>
      <div style="border: 1px solid #ddd; padding: 10px; margin-bottom: 20px; font-size: 12px;">
        ${data.grauPrioridade ? `<span style="display: inline-block; padding: 4px 12px; border-radius: 4px; font-weight: bold; ${
          data.grauPrioridade === 'Alta' ? 'background-color: #fee2e2; color: #991b1b;' :
          data.grauPrioridade === 'Média' ? 'background-color: #fef3c7; color: #92400e;' :
          'background-color: #dcfce7; color: #166534;'
        }">${data.grauPrioridade}</span>` : '<span style="color: #999;">Não informado</span>'}
      </div>

      <!-- Seção 6 -->
      <h3 style="background-color: #f0f0f0; padding: 8px; margin: 20px 0 10px 0; border-left: 4px solid #b45309; font-size: 12px;">6. PRAZO NECESSÁRIO PARA ENTREGA</h3>
      <div style="margin-bottom: 20px; font-size: 12px;">
        <div style="display: flex; margin-bottom: 8px;"><span style="font-weight: bold; width: 150px;">Data Limite:</span><span style="flex: 1; border-bottom: 1px solid #000;">${formatDateBR(data.prazoNecessario)}</span></div>
        <div style="border: 1px solid #ddd; padding: 10px; min-height: 40px; white-space: pre-wrap;">${data.prazoObservacao || '<span style="color: #999;">Não informado</span>'}</div>
      </div>

      <!-- Seção 7 -->
      <h3 style="background-color: #f0f0f0; padding: 8px; margin: 20px 0 10px 0; border-left: 4px solid #059669; font-size: 12px;">7. DOTAÇÃO ORÇAMENTÁRIA</h3>
      <div style="margin-bottom: 30px; font-size: 12px;">
        <div style="display: flex; margin-bottom: 8px;"><span style="font-weight: bold; width: 150px;">Dotação:</span><span style="flex: 1; border-bottom: 1px solid #000; font-family: monospace;">${data.dotacaoOrcamentaria || '__________'}</span></div>
        <div style="display: flex; margin-bottom: 8px;"><span style="font-weight: bold; width: 150px;">Valor Estimado:</span><span style="flex: 1; border-bottom: 1px solid #000;">R$ ${data.valorEstimado || '__________'}</span></div>
        <div style="display: flex;"><span style="font-weight: bold; width: 150px;">Fonte de Recurso:</span><span style="flex: 1; border-bottom: 1px solid #000;">${data.fonteRecurso || '__________'}</span></div>
      </div>

      <!-- Assinatura -->
      <div style="text-align: center; margin-top: 60px;">
        <div style="border-top: 1px solid #000; width: 300px; margin: 0 auto; padding-top: 20px;">
          <p style="font-weight: bold; margin: 0; font-size: 12px;">${data.nomeOrdenadorDespesa || '_________________________________'}</p>
          <p style="color: #666; margin: 0; font-size: 11px;">Ordenador de Despesa</p>
        </div>
      </div>

      <!-- Rodapé -->
      <div style="text-align: center; margin-top: 40px; padding-top: 20px; border-top: 1px solid #ddd; font-size: 10px; color: #666;">
        <p style="margin: 0;">Documento de Formalização de Demanda - Prefeitura Municipal de São Carlos/SP</p>
        <p style="margin: 0;">Gerado em: ${new Date().toLocaleDateString('pt-BR')}</p>
      </div>
    </div>
  `;
}

// Gerar PDF a partir do HTML
export async function generatePDF(data: DFDFormData): Promise<void> {
  // Tentar usar o elemento do preview se existir, senão gerar HTML
  let element = document.getElementById('dfd-preview-content');
  
  if (!element) {
    // Criar um elemento temporário com o HTML gerado
    const tempDiv = document.createElement('div');
    tempDiv.innerHTML = generateDocumentHTML(data);
    tempDiv.id = 'temp-pdf-content';
    tempDiv.style.display = 'none';
    document.body.appendChild(tempDiv);
    element = tempDiv;
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

  try {
    await html2pdf().set(opt).from(element).save();
  } finally {
    // Limpar elemento temporário se foi criado
    if (element.id === 'temp-pdf-content') {
      document.body.removeChild(element);
    }
  }
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
