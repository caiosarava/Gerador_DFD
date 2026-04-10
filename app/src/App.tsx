import { useState } from 'react';
import { DFDForm } from '@/components/DFDForm';
import { DFDPreview } from '@/components/DFDPreview';
import type { DFDFormData } from '@/types/dfd';
import { Toaster } from '@/components/ui/sonner';
import { 
  Building2, 
  FileText, 
  HelpCircle,
  ExternalLink
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

function App() {
  const [previewData, setPreviewData] = useState<DFDFormData | null>(null);
  const [isPreviewOpen, setIsPreviewOpen] = useState(false);

  const handlePreview = (data: DFDFormData) => {
    setPreviewData(data);
    setIsPreviewOpen(true);
  };

  const handleClosePreview = () => {
    setIsPreviewOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Toaster position="top-right" richColors />
      
      {/* Header */}
      <header className="bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              {/* Logo */}
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                <svg viewBox="0 0 100 100" className="w-12 h-12">
                  <circle cx="50" cy="50" r="45" fill="none" stroke="#1e40af" strokeWidth="2"/>
                  <text x="50" y="35" textAnchor="middle" fontSize="10" fill="#1e40af" fontWeight="bold">PREFEITURA</text>
                  <text x="50" y="50" textAnchor="middle" fontSize="12" fill="#1e40af" fontWeight="bold">SÃO</text>
                  <text x="50" y="65" textAnchor="middle" fontSize="12" fill="#1e40af" fontWeight="bold">CARLOS</text>
                </svg>
              </div>
              <div>
                <h1 className="text-xl md:text-2xl font-bold">Prefeitura Municipal de São Carlos</h1>
                <p className="text-blue-100 text-sm">Estado de São Paulo</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20">
                    <HelpCircle className="h-4 w-4" />
                    Ajuda
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-lg">
                  <DialogHeader>
                    <DialogTitle className="flex items-center gap-2">
                      <HelpCircle className="h-5 w-5 text-blue-600" />
                      Como usar o sistema
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 text-sm text-slate-600">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-800">1. Preencha o formulário</h4>
                      <p>Preencha todos os campos obrigatórios (marcados com *). Passe o mouse sobre o ícone de ajuda para ver dicas sobre cada campo.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-800">2. Use os exemplos</h4>
                      <p>Clique em "Usar Exemplo" para carregar dados de exemplo que você pode editar conforme sua necessidade.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-800">3. Pré-visualize</h4>
                      <p>Clique em "Pré-visualizar" para ver como o documento ficará antes de exportar.</p>
                    </div>
                    <div className="space-y-2">
                      <h4 className="font-semibold text-slate-800">4. Exporte o documento</h4>
                      <p>Escolha entre exportar como DOCX (Microsoft Word) ou PDF. O download será feito automaticamente.</p>
                    </div>
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-blue-800">
                        <strong>Dica:</strong> A barra de progresso no topo mostra quanto do formulário já foi preenchido. 
                        Você precisa preencher pelo menos 50% para poder exportar.
                      </p>
                    </div>
                  </div>
                </DialogContent>
              </Dialog>
              <a 
                href="https://www.saocarlos.sp.gov.br" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2 bg-white/10 border-white/30 text-white hover:bg-white/20">
                  <ExternalLink className="h-4 w-4" />
                  Site da Prefeitura
                </Button>
              </a>
            </div>
          </div>
        </div>
      </header>

      {/* Subheader */}
      <div className="bg-white border-b border-slate-200 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-100 rounded-lg">
              <FileText className="h-6 w-6 text-blue-700" />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">Documento de Formalização de Demanda (DFD)</h2>
              <p className="text-sm text-slate-500">Sistema de preenchimento e geração de documentos</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          {/* Alerta Informativo */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 mb-6">
            <div className="flex items-start gap-3">
              <Building2 className="h-5 w-5 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="text-sm text-amber-800">
                <p className="font-semibold mb-1">Bem-vindo ao Sistema DFD</p>
                <p>
                  Este sistema permite preencher e gerar o Documento de Formalização de Demanda (DFD) 
                  conforme o modelo oficial da Prefeitura de São Carlos. Preencha todos os campos 
                  obrigatórios e exporte o documento em formato DOCX ou PDF.
                </p>
              </div>
            </div>
          </div>

          {/* Formulário */}
          <DFDForm onPreview={handlePreview} />
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-slate-800 text-slate-300 py-6 mt-12">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <p className="text-sm font-semibold">Prefeitura Municipal de São Carlos</p>
              <p className="text-xs text-slate-400">Rua Episcopal, 1575 - Centro - São Carlos/SP - CEP: 13560-570</p>
            </div>
            <div className="text-center md:text-right text-xs text-slate-400">
              <p>Sistema DFD - Documento de Formalização de Demanda</p>
              <p>© {new Date().getFullYear()} - Todos os direitos reservados</p>
              <p className="text-slate-500 mt-2">Desenvolvido por Caio Yamazaki Saravalle</p>
            </div>
          </div>
        </div>
      </footer>

      {/* Preview Modal */}
      {previewData && (
        <DFDPreview
          data={previewData}
          isOpen={isPreviewOpen}
          onClose={handleClosePreview}
        />
      )}
    </div>
  );
}

export default App;
