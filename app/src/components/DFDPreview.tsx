import type { DFDFormData } from '@/types/dfd';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { FileDown, FileCheck, X } from 'lucide-react';
import { generateDOCX, generatePDF, downloadDOCX } from '@/utils/exportUtils';
import { useState } from 'react';
import { toast } from 'sonner';

interface DFDPreviewProps {
  data: DFDFormData;
  isOpen: boolean;
  onClose: () => void;
}

function formatDateBR(dateString: string): string {
  if (!dateString) return '__________';
  const [year, month, day] = dateString.split('-');
  return `${day}/${month}/${year}`;
}

export function DFDPreview({ data, isOpen, onClose }: DFDPreviewProps) {
  const [isGenerating, setIsGenerating] = useState<'docx' | 'pdf' | null>(null);

  const handleExportDOCX = async () => {
    try {
      setIsGenerating('docx');
      const blob = await generateDOCX(data);
      downloadDOCX(blob, `DFD_${data.numeroDFD || 'documento'}.docx`);
      toast.success('Documento DOCX gerado com sucesso!');
    } catch (error) {
      toast.error('Erro ao gerar documento. Tente novamente.');
    } finally {
      setIsGenerating(null);
    }
  };

  const handleExportPDF = async () => {
    try {
      setIsGenerating('pdf');
      await generatePDF(data);
      toast.success('Documento PDF gerado com sucesso!');
    } catch (error) {
      toast.error('Erro ao gerar PDF. Tente novamente.');
    } finally {
      setIsGenerating(null);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto p-0">
        <DialogHeader className="sticky top-0 bg-white z-10 border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <DialogTitle className="text-xl font-bold text-slate-800">
              Pré-visualização do Documento
            </DialogTitle>
            <div className="flex gap-2">
              <Button
                onClick={handleExportDOCX}
                disabled={isGenerating !== null}
                size="sm"
                className="gap-2 bg-blue-600 hover:bg-blue-700"
              >
                {isGenerating === 'docx' ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FileDown className="h-4 w-4" />
                )}
                DOCX
              </Button>
              <Button
                onClick={handleExportPDF}
                disabled={isGenerating !== null}
                size="sm"
                className="gap-2 bg-red-600 hover:bg-red-700"
              >
                {isGenerating === 'pdf' ? (
                  <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <FileCheck className="h-4 w-4" />
                )}
                PDF
              </Button>
              <Button variant="ghost" size="icon" onClick={onClose}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </DialogHeader>

        {/* Conteúdo do Documento */}
        <div id="dfd-preview-content" className="p-8 bg-white">
          {/* Cabeçalho Institucional */}
          <div className="border-b-2 border-black pb-6 mb-6">
            <div className="flex gap-6 items-start">
              {/* Logo */}
              <div className="flex-shrink-0">
                <img 
                  src="/logo_sao_carlos_transp.png" 
                  alt="Logo Prefeitura de São Carlos" 
                  className="h-24 w-auto"
                />
              </div>
              {/* Texto do Cabeçalho */}
              <div className="flex-1 text-center py-2">
                <h1 className="text-lg font-bold text-slate-900">PREFEITURA MUNICIPAL DE SÃO CARLOS</h1>
                <p className="text-sm text-slate-600">São Carlos, capital da tecnologia</p>
                <p className="text-sm font-semibold text-slate-900 mt-2">
                  Secretaria Municipal de {data.nomeSecretariaCabecalho || '_____________'}
                </p>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-slate-300">
              <h2 className="text-base font-bold text-slate-900 text-center uppercase">
                Documento de Formalização de Demanda (DFD)
              </h2>
            </div>
          </div>

          {/* Informações Básicas */}
          <div className="mb-8 space-y-2 text-sm">
            <div className="flex">
              <span className="font-bold w-40">Nº DFD:</span>
              <span className="flex-1 border-b border-slate-400 pb-1">
                {data.numeroDFD || '__________'}
              </span>
            </div>
            <div className="flex">
              <span className="font-bold w-40">Data:</span>
              <span className="flex-1 border-b border-slate-400 pb-1">
                {formatDateBR(data.data)}
              </span>
            </div>
            <div className="flex">
              <span className="font-bold w-40">Secretaria/Órgão:</span>
              <span className="flex-1 border-b border-slate-400 pb-1">
                {data.secretaria || '__________'}
              </span>
            </div>
            <div className="flex">
              <span className="font-bold w-40">Departamento/Setor:</span>
              <span className="flex-1 border-b border-slate-400 pb-1">
                {data.departamento || '__________'}
              </span>
            </div>
            <div className="flex">
              <span className="font-bold w-40">Responsável:</span>
              <span className="flex-1 border-b border-slate-400 pb-1">
                {data.responsavel || '__________'}
              </span>
            </div>
            <div className="flex">
              <span className="font-bold w-40">Telefone:</span>
              <span className="flex-1 border-b border-slate-400 pb-1">
                {data.telefone || '__________'}
              </span>
            </div>
            <div className="flex">
              <span className="font-bold w-40">E-mail:</span>
              <span className="flex-1 border-b border-slate-400 pb-1">
                {data.email || '__________'}
              </span>
            </div>
          </div>

          {/* Seção 1: Descrição do Objeto */}
          <div className="mb-6">
            <h3 className="text-sm font-bold bg-slate-100 p-2 mb-2 border-l-4 border-blue-600">
              1. DESCRIÇÃO DO OBJETO
            </h3>
            <div className="text-sm text-justify leading-relaxed p-2 border border-slate-200 min-h-[80px]">
              {data.descricaoObjeto || (
                <span className="text-slate-400 italic">Não informado</span>
              )}
            </div>
          </div>

          {/* Seção 2: Justificativa */}
          <div className="mb-6">
            <h3 className="text-sm font-bold bg-slate-100 p-2 mb-2 border-l-4 border-purple-600">
              2. JUSTIFICATIVA DA DEMANDA
            </h3>
            <div className="text-sm text-justify leading-relaxed p-2 border border-slate-200 min-h-[80px]">
              {data.justificativaDemanda || (
                <span className="text-slate-400 italic">Não informado</span>
              )}
            </div>
          </div>

          {/* Seção 3: Fundamentação da Quantidade */}
          <div className="mb-6">
            <h3 className="text-sm font-bold bg-slate-100 p-2 mb-2 border-l-4 border-orange-600">
              3. FUNDAMENTAÇÃO DA QUANTIDADE
            </h3>
            <div className="text-sm text-justify leading-relaxed p-2 border border-slate-200 min-h-[80px]">
              {data.fundamentacaoQuantidade || (
                <span className="text-slate-400 italic">Não informado</span>
              )}
            </div>
          </div>

          {/* Seção 4: Requisitos */}
          <div className="mb-6">
            <h3 className="text-sm font-bold bg-slate-100 p-2 mb-2 border-l-4 border-indigo-600">
              4. REQUISITOS ESSENCIAIS DA CONTRATAÇÃO
            </h3>
            <div className="text-sm text-justify leading-relaxed p-2 border border-slate-200 min-h-[80px] whitespace-pre-line">
              {data.requisitosEssenciais || (
                <span className="text-slate-400 italic">Não informado</span>
              )}
            </div>
          </div>

          {/* Seção 5: Grau de Prioridade */}
          <div className="mb-6">
            <h3 className="text-sm font-bold bg-slate-100 p-2 mb-2 border-l-4 border-red-600">
              5. GRAU DE PRIORIDADE
            </h3>
            <div className="text-sm p-2 border border-slate-200">
              {data.grauPrioridade ? (
                <span className={`inline-block px-3 py-1 rounded font-medium ${
                  data.grauPrioridade === 'Alta' ? 'bg-red-100 text-red-800' :
                  data.grauPrioridade === 'Média' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {data.grauPrioridade}
                </span>
              ) : (
                <span className="text-slate-400 italic">Não informado</span>
              )}
            </div>
          </div>

          {/* Seção 6: Prazo */}
          <div className="mb-6">
            <h3 className="text-sm font-bold bg-slate-100 p-2 mb-2 border-l-4 border-amber-600">
              6. PRAZO NECESSÁRIO PARA ENTREGA
            </h3>
            <div className="space-y-2">
              <div className="flex text-sm">
                <span className="font-bold w-40">Data Limite:</span>
                <span className="flex-1 border-b border-slate-400 pb-1">
                  {formatDateBR(data.prazoNecessario)}
                </span>
              </div>
              <div className="text-sm p-2 border border-slate-200 min-h-[60px]">
                <span className="font-bold">Observações:</span>
                <div className="mt-1">
                  {data.prazoObservacao || (
                    <span className="text-slate-400 italic">Não informado</span>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Seção 7: Dotação Orçamentária */}
          <div className="mb-8">
            <h3 className="text-sm font-bold bg-slate-100 p-2 mb-2 border-l-4 border-emerald-600">
              7. DOTAÇÃO ORÇAMENTÁRIA
            </h3>
            <div className="space-y-2 text-sm">
              <div className="flex">
                <span className="font-bold w-40">Dotação:</span>
                <span className="flex-1 border-b border-slate-400 pb-1 font-mono">
                  {data.dotacaoOrcamentaria || '__________'}
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">Valor Estimado:</span>
                <span className="flex-1 border-b border-slate-400 pb-1">
                  {data.valorEstimado ? `R$ ${data.valorEstimado}` : '__________'}
                </span>
              </div>
              <div className="flex">
                <span className="font-bold w-40">Fonte de Recurso:</span>
                <span className="flex-1 border-b border-slate-400 pb-1">
                  {data.fonteRecurso || '__________'}
                </span>
              </div>
            </div>
          </div>

          {/* Assinatura */}
          <div className="mt-12 pt-8 text-center">
            <div className="border-t border-black w-80 mx-auto pt-4">
              <p className="font-bold text-sm">{data.nomeOrdenadorDespesa || '_________________________________'}</p>
              <p className="text-sm text-slate-600">Ordenador de Despesa</p>
            </div>
          </div>

          {/* Rodapé */}
          <div className="mt-12 pt-4 border-t border-slate-300 text-center text-xs text-slate-500">
            <p>Documento de Formalização de Demanda - Prefeitura Municipal de São Carlos/SP</p>
            <p>Gerado em: {new Date().toLocaleDateString('pt-BR')}</p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
