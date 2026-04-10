// Tipos para o Documento de Formalização de Demanda (DFD)

export interface DFDFormData {
  // Informações básicas
  numeroDFD: string;
  data: string;
  secretaria: string;
  departamento: string;
  responsavel: string;
  telefone: string;
  email: string;

  // Seção 1: Descrição do Objeto
  descricaoObjeto: string;

  // Seção 2: Justificativa da Demanda
  justificativaDemanda: string;

  // Seção 3: Fundamentação da Quantidade
  fundamentacaoQuantidade: string;

  // Seção 4: Requisitos Essenciais da Contratação
  requisitosEssenciais: string;

  // Seção 5: Grau de Prioridade
  grauPrioridade: 'Alta' | 'Média' | 'Baixa' | '';

  // Seção 6: Prazo Necessário
  prazoNecessario: string;
  prazoObservacao: string;

  // Seção 7: Dotação Orçamentária
  dotacaoOrcamentaria: string;
  valorEstimado: string;
  fonteRecurso: string;
}

export interface FormSection {
  id: keyof DFDFormData;
  label: string;
  placeholder: string;
  helpText: string;
  example: string;
  required: boolean;
  type: 'text' | 'textarea' | 'select' | 'date' | 'email' | 'tel';
  options?: string[];
  rows?: number;
}

export const formSections: FormSection[] = [
  {
    id: 'numeroDFD',
    label: 'Número do DFD',
    placeholder: 'Ex: 001/2024',
    helpText: 'Número de identificação do documento',
    example: '001/2024',
    required: true,
    type: 'text'
  },
  {
    id: 'data',
    label: 'Data',
    placeholder: 'Selecione a data',
    helpText: 'Data de preenchimento do DFD',
    example: '',
    required: true,
    type: 'date'
  },
  {
    id: 'secretaria',
    label: 'Secretaria/Órgão',
    placeholder: 'Ex: Secretaria de Educação',
    helpText: 'Nome da secretaria ou órgão solicitante',
    example: 'Secretaria Municipal de Educação',
    required: true,
    type: 'text'
  },
  {
    id: 'departamento',
    label: 'Departamento/Setor',
    placeholder: 'Ex: Departamento de Compras',
    helpText: 'Departamento ou setor responsável pela demanda',
    example: 'Departamento de Material e Patrimônio',
    required: true,
    type: 'text'
  },
  {
    id: 'responsavel',
    label: 'Responsável pelo Preenchimento',
    placeholder: 'Ex: João da Silva',
    helpText: 'Nome completo do responsável pelo preenchimento',
    example: 'Maria Santos Oliveira',
    required: true,
    type: 'text'
  },
  {
    id: 'telefone',
    label: 'Telefone de Contato',
    placeholder: 'Ex: (16) 3371-0000',
    helpText: 'Telefone para contato com o responsável',
    example: '(16) 3371-1234',
    required: true,
    type: 'tel'
  },
  {
    id: 'email',
    label: 'E-mail',
    placeholder: 'Ex: nome@saocarlos.sp.gov.br',
    helpText: 'E-mail institucional do responsável',
    example: 'maria.oliveira@saocarlos.sp.gov.br',
    required: true,
    type: 'email'
  },
  {
    id: 'descricaoObjeto',
    label: '1. Descrição do Objeto',
    placeholder: 'Descreva detalhadamente o objeto da contratação...',
    helpText: 'Descreva o que será contratado, incluindo especificações técnicas, características e finalidade do objeto.',
    example: 'Aquisição de 50 (cinquenta) computadores desktop, com processador Intel Core i5 ou equivalente, 8GB de memória RAM, SSD de 256GB, monitor de 21 polegadas, teclado e mouse, para atender às necessidades de informatização dos postos de atendimento da Secretaria de Saúde.',
    required: true,
    type: 'textarea',
    rows: 6
  },
  {
    id: 'justificativaDemanda',
    label: '2. Justificativa da Demanda',
    placeholder: 'Justifique a necessidade desta contratação...',
    helpText: 'Explique por que esta contratação é necessária, qual problema ela resolve ou qual benefício trará para o órgão.',
    example: 'A Secretaria de Saúde possui atualmente 30 computadores em uso, dos quais 20 estão com mais de 8 anos de uso, apresentando falhas constantes e impossibilitando o atendimento adequado à população. A aquisição de novos equipamentos visa modernizar a infraestrutura tecnológica, reduzir o tempo de espera dos cidadãos e melhorar a qualidade do atendimento.',
    required: true,
    type: 'textarea',
    rows: 6
  },
  {
    id: 'fundamentacaoQuantidade',
    label: '3. Fundamentação da Quantidade',
    placeholder: 'Justifique a quantidade solicitada...',
    helpText: 'Explique como foi calculada a quantidade solicitada, com base em necessidades reais e dimensionamento adequado.',
    example: 'A quantidade de 50 computadores foi calculada com base no número de postos de atendimento (45 unidades) mais 5 unidades para reserva técnica de substituição imediata em caso de falhas. Cada posto de atendimento necessita de 1 computador para atendimento ao público, totalizando a quantidade solicitada.',
    required: true,
    type: 'textarea',
    rows: 6
  },
  {
    id: 'requisitosEssenciais',
    label: '4. Requisitos Essenciais da Contratação',
    placeholder: 'Liste os requisitos essenciais...',
    helpText: 'Descreva os requisitos mínimos que o fornecedor e/ou o objeto devem atender para garantir a adequação da contratação.',
    example: '4.1. Requisitos Técnicos:\n- Processador Intel Core i5 (9ª geração ou superior) ou AMD Ryzen 5 equivalente\n- Memória RAM: mínimo 8GB DDR4\n- Armazenamento: SSD de 256GB\n- Monitor: LED 21 polegadas Full HD\n\n4.2. Requisitos do Fornecedor:\n- Experiência comprovada em fornecimento de equipamentos de informática para órgãos públicos\n- Assistência técnica autorizada no município de São Carlos\n- Garantia mínima de 12 meses para todos os componentes',
    required: true,
    type: 'textarea',
    rows: 8
  },
  {
    id: 'grauPrioridade',
    label: '5. Grau de Prioridade',
    placeholder: 'Selecione o grau de prioridade',
    helpText: 'Indique o nível de urgência desta contratação.',
    example: '',
    required: true,
    type: 'select',
    options: ['Alta', 'Média', 'Baixa']
  },
  {
    id: 'prazoNecessario',
    label: '6. Prazo Necessário para Entrega',
    placeholder: 'Selecione a data limite',
    helpText: 'Data máxima para entrega/execução do objeto.',
    example: '',
    required: true,
    type: 'date'
  },
  {
    id: 'prazoObservacao',
    label: 'Observações sobre o Prazo',
    placeholder: 'Observações adicionais sobre o prazo...',
    helpText: 'Informações complementares sobre o prazo, se necessário.',
    example: 'A entrega deve ser realizada em até 30 dias úteis após a formalização do contrato, sendo imprescindível para atender às metas do planejamento estratégico do órgão para o exercício de 2024.',
    required: false,
    type: 'textarea',
    rows: 3
  },
  {
    id: 'dotacaoOrcamentaria',
    label: '7. Dotação Orçamentária',
    placeholder: 'Ex: 12.01.01.122.0001.2.001.3.3.90.30',
    helpText: 'Informe a dotação orçamentária que custeará a despesa.',
    example: '12.01.01.122.0001.2.001.3.3.90.30',
    required: true,
    type: 'text'
  },
  {
    id: 'valorEstimado',
    label: 'Valor Estimado (R$)',
    placeholder: 'Ex: 150.000,00',
    helpText: 'Valor total estimado da contratação em Reais.',
    example: '150.000,00',
    required: true,
    type: 'text'
  },
  {
    id: 'fonteRecurso',
    label: 'Fonte de Recurso',
    placeholder: 'Ex: Recursos Ordinários, Emenda Parlamentar...',
    helpText: 'Origem dos recursos financeiros.',
    example: 'Recursos Ordinários do Município',
    required: true,
    type: 'text'
  }
];

export const initialFormData: DFDFormData = {
  numeroDFD: '',
  data: '',
  secretaria: '',
  departamento: '',
  responsavel: '',
  telefone: '',
  email: '',
  descricaoObjeto: '',
  justificativaDemanda: '',
  fundamentacaoQuantidade: '',
  requisitosEssenciais: '',
  grauPrioridade: '',
  prazoNecessario: '',
  prazoObservacao: '',
  dotacaoOrcamentaria: '',
  valorEstimado: '',
  fonteRecurso: ''
};

export const exampleData: DFDFormData = {
  numeroDFD: '001/2024',
  data: '2024-03-15',
  secretaria: 'Secretaria Municipal de Educação',
  departamento: 'Departamento de Material e Patrimônio',
  responsavel: 'Maria Santos Oliveira',
  telefone: '(16) 3371-1234',
  email: 'maria.oliveira@saocarlos.sp.gov.br',
  descricaoObjeto: 'Aquisição de 50 (cinquenta) computadores desktop, com processador Intel Core i5 ou equivalente, 8GB de memória RAM, SSD de 256GB, monitor de 21 polegadas, teclado e mouse, para atender às necessidades de informatização dos postos de atendimento da Secretaria de Saúde.',
  justificativaDemanda: 'A Secretaria de Saúde possui atualmente 30 computadores em uso, dos quais 20 estão com mais de 8 anos de uso, apresentando falhas constantes e impossibilitando o atendimento adequado à população. A aquisição de novos equipamentos visa modernizar a infraestrutura tecnológica, reduzir o tempo de espera dos cidadãos e melhorar a qualidade do atendimento.',
  fundamentacaoQuantidade: 'A quantidade de 50 computadores foi calculada com base no número de postos de atendimento (45 unidades) mais 5 unidades para reserva técnica de substituição imediata em caso de falhas. Cada posto de atendimento necessita de 1 computador para atendimento ao público, totalizando a quantidade solicitada.',
  requisitosEssenciais: '4.1. Requisitos Técnicos:\n- Processador Intel Core i5 (9ª geração ou superior) ou AMD Ryzen 5 equivalente\n- Memória RAM: mínimo 8GB DDR4\n- Armazenamento: SSD de 256GB\n- Monitor: LED 21 polegadas Full HD\n\n4.2. Requisitos do Fornecedor:\n- Experiência comprovada em fornecimento de equipamentos de informática para órgãos públicos\n- Assistência técnica autorizada no município de São Carlos\n- Garantia mínima de 12 meses para todos os componentes',
  grauPrioridade: 'Alta',
  prazoNecessario: '2024-06-30',
  prazoObservacao: 'A entrega deve ser realizada em até 30 dias úteis após a formalização do contrato, sendo imprescindível para atender às metas do planejamento estratégico do órgão para o exercício de 2024.',
  dotacaoOrcamentaria: '12.01.01.122.0001.2.001.3.3.90.30',
  valorEstimado: '150.000,00',
  fonteRecurso: 'Recursos Ordinários do Município'
};
