/**
 * ServicesController
 * GET /api/services — returns list of offered services
 */

const services = [
  {
    id: 1,
    slug: 'revisao',
    name: 'Revisão Automotiva',
    description: 'Revisão completa seguindo as especificações do fabricante, garantindo desempenho e segurança máximos.',
    icon: 'fa-rotate',
    items: ['Revisão de 30.000 km', 'Revisão de 60.000 km', 'Revisão anual completa'],
    priceFrom: 'R$ 350',
  },
  {
    id: 2,
    slug: 'oleo',
    name: 'Troca de Óleo',
    description: 'Utilizamos apenas óleos sintéticos e semissintéticos de primeira linha para prolongar a vida do motor.',
    icon: 'fa-oil-can',
    items: ['Óleos 5W-30, 5W-40, 0W-20', 'Filtros originais', 'Descarte ecológico certificado'],
    priceFrom: 'R$ 150',
  },
  {
    id: 3,
    slug: 'freios',
    name: 'Sistema de Freios',
    description: 'Diagnóstico e manutenção completa do sistema de freios para garantir sua segurança.',
    icon: 'fa-circle-stop',
    items: ['Pastilhas e discos', 'Fluido de freio', 'ABS e freio a cabo'],
    priceFrom: 'R$ 280',
  },
  {
    id: 4,
    slug: 'suspensao',
    name: 'Suspensão',
    description: 'Alinhamento, balanceamento e reparo completo da suspensão para um direcionamento preciso.',
    icon: 'fa-car-burst',
    items: ['Amortecedores', 'Alinhamento 3D computadorizado', 'Balanceamento digital'],
    priceFrom: 'R$ 200',
  },
  {
    id: 5,
    slug: 'diagnostico',
    name: 'Diagnóstico Eletrônico',
    description: 'Scanner de última geração para identificar falhas eletrônicas com precisão em todas as centrais.',
    icon: 'fa-microchip',
    items: ['Scanner OBD-II avançado', 'Análise de centralinas', 'Programação de módulos'],
    priceFrom: 'R$ 120',
  },
  {
    id: 6,
    slug: 'arcondicionado',
    name: 'Ar-condicionado',
    description: 'Higienização, recarga e manutenção completa do sistema de ar-condicionado automotivo.',
    icon: 'fa-snowflake',
    items: ['Recarga R134a/R1234yf', 'Higienização e ozonização', 'Compressor e evaporador'],
    priceFrom: 'R$ 180',
  },
];

const getServices = (_req, res) => {
  try {
    console.log('[ServicesController] Retornando lista de serviços');
    res.status(200).json({
      status: 'success',
      count: services.length,
      data: services,
    });
  } catch (error) {
    console.error('[ServicesController] Erro:', error);
    res.status(500).json({ status: 'error', message: 'Erro ao buscar serviços.' });
  }
};

module.exports = { getServices };