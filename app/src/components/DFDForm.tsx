import { useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Progress } from '@/components/ui/progress';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import type { DFDFormData } from '@/types/dfd';
import { initialFormData, exampleData, formSections } from '@/types/dfd';
import { generateDOCX, downloadDOCX, calculateProgress } from '@/utils/exportUtils';
import { 
  FileText, 
  Eye, 
  HelpCircle, 
  RotateCcw, 
  CheckCircle2, 
  AlertCircle,
  Lightbulb,
  FileDown,
  FileCheck,
  Building2,
  DollarSign,
  Flag,
  Clock,
  ClipboardList,
  BarChart3,
  ListCheck,
  Settings
} from 'lucide-react';
import { toast } from 'sonner';

interface DFDFormProps {
  onPreview: (data: DFDFormData) => void;
}

export function DFDForm({ onPreview }: DFDFormProps) {
  const [formData, setFormData] = useState<DFDFormData>(initialFormData);
  const [showClearDialog, setShowClearDialog] = useState(false);
  const [isGenerating, setIsGenerating] = useState<'docx' | 'pdf' | null>(null);

  const progress = calculateProgress(formData);

  const handleChange = useCallback((field: keyof DFDFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  }, []);

  const handleClear = () => {
    setFormData(initialFormData);
    setShowClearDialog(false);
    toast.success('Formulário limpo com sucesso!');
  };

  const loadExample = () => {
    setFormData(exampleData);
    toast.success('Exemplo carregado! Você pode editar os campos.');
  };

  const handleExportDOCX = async () => {
    if (progress < 50) {
      toast.error('Preencha pelo menos 50% do formulário antes de exportar.');
      return;
    }
    
    try {
      setIsGenerating('docx');
      const blob = await generateDOCX(formData);
      downloadDOCX(blob, `DFD_${formData.numeroDFD || 'documento'}.docx`);
      toast.success('Documento DOCX gerado com sucesso!');
    } catch (error) {
      toast.error('Erro ao gerar documento. Tente novamente.');
    } finally {
      setIsGenerating(null);
    }
  };

  const getProgressColor = () => {
    if (progress < 30) return 'bg-red-500';
    if (progress < 70) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getProgressStatus = () => {
    if (progress < 30) return { icon: AlertCircle, text: 'Preenchimento inicial', color: 'text-red-500' };
    if (progress < 70) return { icon: Clock, text: 'Em andamento', color: 'text-yellow-500' };
    if (progress < 100) return { icon: CheckCircle2, text: 'Quase pronto!', color: 'text-blue-500' };
    return { icon: CheckCircle2, text: 'Completo!', color: 'text-green-500' };
  };

  const progressStatus = getProgressStatus();
  const StatusIcon = progressStatus.icon;

  // Agrupar campos por seção
  const cabecalhoFields = formSections.slice(0, 1);
  const infoBasicaFields = formSections.slice(1, 8);
  const descricaoFields = formSections.slice(8, 9);
  const justificativaFields = formSections.slice(9, 10);
  const fundamentacaoFields = formSections.slice(10, 11);
  const requisitosFields = formSections.slice(11, 12);
  const prioridadeFields = formSections.slice(12, 15);
  const dotacaoFields = formSections.slice(15, 19);

  const renderField = (section: typeof formSections[0]) => {
    const value = formData[section.id];

    return (
      <div key={section.id} className="space-y-2">
        <div className="flex items-center gap-2">
          <Label htmlFor={section.id} className="text-sm font-semibold text-slate-700">
            {section.label}
            {section.required && <span className="text-red-500 ml-1">*</span>}
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="h-5 w-5 p-0">
                  <HelpCircle className="h-4 w-4 text-slate-400" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="right" className="max-w-xs">
                <p className="text-sm">{section.helpText}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        {section.type === 'textarea' ? (
          <Textarea
            id={section.id}
            value={value}
            onChange={(e) => handleChange(section.id, e.target.value)}
            placeholder={section.placeholder}
            rows={section.rows || 4}
            className="resize-none border-slate-300 focus:border-blue-500 focus:ring-blue-500"
          />
        ) : section.type === 'select' ? (
          <Select value={value} onValueChange={(val) => handleChange(section.id, val)}>
            <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
              <SelectValue placeholder={section.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {section.options?.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        ) : (
          <Input
            id={section.id}
            type={section.type}
            value={value}
            onChange={(e) => handleChange(section.id, e.target.value)}
            placeholder={section.placeholder}
            className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
          />
        )}

        {section.example && (
          <div className="flex items-start gap-2 text-xs text-slate-500 bg-slate-50 p-2 rounded">
            <Lightbulb className="h-4 w-4 text-amber-500 flex-shrink-0 mt-0.5" />
            <div>
              <span className="font-medium">Exemplo:</span> {section.example}
            </div>
          </div>
        )}
      </div>
    );
  };

  return (
    <div className="space-y-6">
      {/* Barra de Progresso */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-white">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <BarChart3 className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-slate-700">Progresso do Preenchimento</span>
            </div>
            <div className={`flex items-center gap-1 ${progressStatus.color}`}>
              <StatusIcon className="h-4 w-4" />
              <span className="text-sm font-medium">{progressStatus.text}</span>
            </div>
          </div>
          <div className="relative">
            <Progress value={progress} className="h-3 bg-slate-200" />
            <div 
              className={`absolute top-0 left-0 h-3 rounded-full transition-all duration-500 ${getProgressColor()}`}
              style={{ width: `${progress}%` }}
            />
          </div>
          <p className="text-sm text-slate-500 mt-2">
            {progress}% preenchido - Complete todos os campos obrigatórios para gerar o documento
          </p>
        </CardContent>
      </Card>

      {/* Botões de Ação */}
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={loadExample}
          className="gap-2 border-amber-300 text-amber-700 hover:bg-amber-50"
        >
          <Lightbulb className="h-4 w-4" />
          Usar Exemplo
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowClearDialog(true)}
          className="gap-2 border-red-300 text-red-700 hover:bg-red-50"
        >
          <RotateCcw className="h-4 w-4" />
          Limpar Formulário
        </Button>
        <Button
          variant="outline"
          onClick={() => onPreview(formData)}
          className="gap-2 border-blue-300 text-blue-700 hover:bg-blue-50"
        >
          <Eye className="h-4 w-4" />
          Pré-visualizar
        </Button>
        <div className="flex-1" />
        <Button
          onClick={handleExportDOCX}
          disabled={isGenerating !== null}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          {isGenerating === 'docx' ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <FileDown className="h-4 w-4" />
              Exportar DOCX
            </>
          )}
        </Button>
        <Button
          onClick={() => onPreview(formData)}
          disabled={isGenerating !== null}
          className="gap-2 bg-red-600 hover:bg-red-700"
        >
          {isGenerating === 'pdf' ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <FileCheck className="h-4 w-4" />
              Exportar PDF
            </>
          )}
        </Button>
      </div>

      {/* Cabeçalho do Documento */}
      <Card className="border-slate-200 bg-gradient-to-r from-slate-50 to-blue-50">
        <CardHeader className="bg-slate-100 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-slate-200 rounded-lg">
              <Building2 className="h-5 w-5 text-slate-700" />
            </div>
            <div>
              <CardTitle className="text-lg text-slate-800">Cabeçalho do Documento</CardTitle>
              <CardDescription>Configure o cabeçalho que aparecerá no documento</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-1 gap-6">
          {cabecalhoFields.map(renderField)}
        </CardContent>
      </Card>

      {/* Seção 1: Informações Básicas */}
      <Card className="border-slate-200">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <Building2 className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-slate-800">Informações Básicas</CardTitle>
              <CardDescription>Dados de identificação do documento</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {infoBasicaFields.map(renderField)}
        </CardContent>
      </Card>

      {/* Seção 2: Descrição do Objeto */}
      <Card className="border-slate-200">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-green-100 rounded-lg">
              <ClipboardList className="h-5 w-5 text-green-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-slate-800">1. Descrição do Objeto</CardTitle>
              <CardDescription>Descreva detalhadamente o que será contratado</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {descricaoFields.map(renderField)}
        </CardContent>
      </Card>

      {/* Seção 3: Justificativa */}
      <Card className="border-slate-200">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-100 rounded-lg">
              <FileText className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-slate-800">2. Justificativa da Demanda</CardTitle>
              <CardDescription>Explique a necessidade desta contratação</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {justificativaFields.map(renderField)}
        </CardContent>
      </Card>

      {/* Seção 4: Fundamentação da Quantidade */}
      <Card className="border-slate-200">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-100 rounded-lg">
              <ListCheck className="h-5 w-5 text-orange-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-slate-800">3. Fundamentação da Quantidade</CardTitle>
              <CardDescription>Justifique a quantidade solicitada</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {fundamentacaoFields.map(renderField)}
        </CardContent>
      </Card>

      {/* Seção 5: Requisitos */}
      <Card className="border-slate-200">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-100 rounded-lg">
              <Settings className="h-5 w-5 text-indigo-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-slate-800">4. Requisitos Essenciais da Contratação</CardTitle>
              <CardDescription>Liste os requisitos mínimos obrigatórios</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6">
          {requisitosFields.map(renderField)}
        </CardContent>
      </Card>

      {/* Seção 6: Prioridade e Prazo */}
      <Card className="border-slate-200">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-red-100 rounded-lg">
              <Flag className="h-5 w-5 text-red-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-slate-800">5. Grau de Prioridade e 6. Prazo</CardTitle>
              <CardDescription>Defina a prioridade e o prazo necessário</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {prioridadeFields.map(renderField)}
        </CardContent>
      </Card>

      {/* Seção 7: Dotação Orçamentária */}
      <Card className="border-slate-200">
        <CardHeader className="bg-slate-50 border-b border-slate-200">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-100 rounded-lg">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <CardTitle className="text-lg text-slate-800">7. Dotação Orçamentária</CardTitle>
              <CardDescription>Informações financeiras da contratação</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {dotacaoFields.map(renderField)}
        </CardContent>
      </Card>

      {/* Botões de Ação no Final */}
      <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
        <Button
          variant="outline"
          onClick={loadExample}
          className="gap-2 border-amber-300 text-amber-700 hover:bg-amber-50"
        >
          <Lightbulb className="h-4 w-4" />
          Usar Exemplo
        </Button>
        <Button
          variant="outline"
          onClick={() => setShowClearDialog(true)}
          className="gap-2 border-red-300 text-red-700 hover:bg-red-50"
        >
          <RotateCcw className="h-4 w-4" />
          Limpar Formulário
        </Button>
        <div className="flex-1" />
        <Button
          onClick={() => onPreview(formData)}
          variant="outline"
          className="gap-2 border-blue-300 text-blue-700 hover:bg-blue-50"
        >
          <Eye className="h-4 w-4" />
          Pré-visualizar
        </Button>
        <Button
          onClick={handleExportDOCX}
          disabled={isGenerating !== null}
          className="gap-2 bg-blue-600 hover:bg-blue-700"
        >
          {isGenerating === 'docx' ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <FileDown className="h-4 w-4" />
              Exportar DOCX
            </>
          )}
        </Button>
        <Button
          onClick={() => onPreview(formData)}
          disabled={isGenerating !== null}
          className="gap-2 bg-red-600 hover:bg-red-700"
        >
          {isGenerating === 'pdf' ? (
            <>
              <div className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Gerando...
            </>
          ) : (
            <>
              <FileCheck className="h-4 w-4" />
              Exportar PDF
            </>
          )}
        </Button>
      </div>

      {/* Diálogo de Confirmação */}
      <AlertDialog open={showClearDialog} onOpenChange={setShowClearDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Limpar formulário?</AlertDialogTitle>
            <AlertDialogDescription>
              Todos os dados preenchidos serão perdidos. Esta ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction onClick={handleClear} className="bg-red-600 hover:bg-red-700">
              Sim, limpar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
