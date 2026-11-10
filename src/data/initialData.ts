import { RealEstateMarketingState } from '../types';

// Helper to format dates relative to current date (2026-11-10)
const TODAY = '2026-11-10';
const TOMORROW = '2026-11-11'; // 1 day before due date
const IN_2_DAYS = '2026-11-12';
const IN_4_DAYS = '2026-11-14';
const IN_7_DAYS = '2026-11-17';
const PAST_3_DAYS = '2026-11-07';

export const initialData: RealEstateMarketingState = {
  companyName: 'Inmobiliaria Los Robles & Valle Verde',
  projectName: 'Condominio Campestre & Urbano Las Palmeras',
  problemStatement: 'Bajas estrategias de marketing definida para la captación y venta de lotes residenciales',
  userEmail: 'vasquezrequejoaldair@gmail.com',
  autoEmailEnabled: true,

  // A.1 FODA CRUZADO
  fodaItems: [
    {
      id: 'foda-1',
      code: 'FO-1',
      type: 'FO',
      title: 'Campaña Digital de Lotes con Financiamiento Directo',
      description: 'Aprovechar la fortaleza de títulos independizados y alta demanda de lotes campestres para captar familias e inversionistas mediante Meta Ads.',
      objective: 'Incrementar 45% la captación de prospectos calificados en 60 días.',
      priority: 'Alta'
    },
    {
      id: 'foda-2',
      code: 'FO-2',
      type: 'FO',
      title: 'Alianzas con Cooperativas y Colegios Profesionales',
      description: 'Ofrecer precios preferenciales y cuotas iniciales fraccionadas a socios con capacidad de crédito.',
      objective: 'Colocar 15 lotes en venta corporativa.',
      priority: 'Media'
    },
    {
      id: 'foda-3',
      code: 'DO-1',
      type: 'DO',
      title: 'Estandarización de Guiones Comerciales y CRM',
      description: 'Superar la debilidad del seguimiento desordenado implementando HubSpot/Kommo con WhatsApp automatizado.',
      objective: 'Reducir el tiempo de primer contacto a menos de 5 minutos.',
      priority: 'Alta'
    },
    {
      id: 'foda-4',
      code: 'DO-2',
      type: 'DO',
      title: 'Capacitación en Manejo de Objeciones de Lotes',
      description: 'Entrenar al equipo comercial en resolver dudas sobre servicios de luz/agua, habilitación urbana y plazos de entrega.',
      objective: 'Aumentar la tasa de conversión en visitas al terreno del 18% al 32%.',
      priority: 'Alta'
    },
    {
      id: 'foda-5',
      code: 'FA-1',
      type: 'FA',
      title: 'Campañas de Valorización y Plusvalía vs Inflación',
      description: 'Blindar las ventas frente a la recesión promoviendo la tierra como el activo más seguro y rentable frente a la inflación.',
      objective: 'Posicionar el proyecto frente a la competencia con testimonios de compradores antiguos.',
      priority: 'Media'
    },
    {
      id: 'foda-6',
      code: 'DA-1',
      type: 'DA',
      title: 'Auditoría Continua de Canales y Optimización de Pauta',
      description: 'Eliminar fugas presupuestarias en canales no rentables y concentrar el presupuesto en Meta Ads y TikTok Geofencing.',
      objective: 'Bajar el Costo por Lead (CPL) de $8.50 a menos de $3.80.',
      priority: 'Alta'
    }
  ],

  // A.2 MATRIZ OPERATIVA (Jala estrategia de FODA cruzado)
  operationalMatrix: [
    {
      id: 'op-1',
      code: 'OP-01',
      fodaRef: 'FO-1 (Campaña Digital Lotes)',
      strategy: 'Lanzamiento de campaña con video dron destacando vista panorámica y lotes desde 120m²',
      funnelStage: 'Atracción',
      channel: 'Facebook & Instagram Ads',
      responsible: 'Lic. Aldair Vásquez (Marketing)',
      deadline: '2026-11-11', // Vence mañana -> Alerta 24h
      status: 'En Progreso',
      deliverable: 'Set de 4 anuncios en video vertical y carrusel de planos con UTMs',
      budget: 650
    },
    {
      id: 'op-2',
      code: 'OP-02',
      fodaRef: 'DO-1 (CRM y Automatización)',
      strategy: 'Integración de Kommo CRM con WhatsApp Cloud API para asignación rotativa de leads',
      funnelStage: 'Interacción',
      channel: 'CRM + WhatsApp Business API',
      responsible: 'Ing. Carlos Mendoza (Sistemas)',
      deadline: '2026-11-14',
      status: 'Planificada',
      deliverable: 'Flujo de bot interactivo con catálogo de lotes y botón de agendar visita',
      budget: 400
    },
    {
      id: 'op-3',
      code: 'OP-03',
      fodaRef: 'DO-2 (Manejo de Objeciones)',
      strategy: 'Día de Campo "Open Land": Traslado gratuito de prospectos a terreno con refrigerio y asesor legal',
      funnelStage: 'Conversión',
      channel: 'Evento Presencial / Búsqueda guiada',
      responsible: 'Mariana Flores (Jefa de Ventas)',
      deadline: '2026-11-17',
      status: 'Planificada',
      deliverable: 'Padrón de 30 familias asistentes confirmadas con depósito de separación',
      budget: 950
    },
    {
      id: 'op-4',
      code: 'OP-04',
      fodaRef: 'FA-1 (Plusvalía)',
      strategy: 'Dossier financiero de rentabilidad anual del 22% por metro cuadrado para inversionistas',
      funnelStage: 'Cierre',
      channel: 'Email Marketing + Reuniones Zoom',
      responsible: 'Roberto Solís (Closer)',
      deadline: '2026-11-05',
      status: 'Ejecutada',
      deliverable: 'Folleto PDF interactivo de simulación de cuotas y plusvalía a 3 años',
      budget: 300
    },
    {
      id: 'op-5',
      code: 'OP-05',
      fodaRef: 'FO-2 (Alianzas Estratégicas)',
      strategy: 'Convenio con Colegio de Ingenieros y Médicos con descuento de $1,000 en cuota inicial',
      funnelStage: 'Fidelización',
      channel: 'Relaciones Públicas / Mailing',
      responsible: 'Mariana Flores (Jefa de Ventas)',
      deadline: '2026-11-03',
      status: 'Ejecutada',
      deliverable: 'Convenio marco firmado y difusión en boletines gremiales',
      budget: 250
    }
  ],

  // A.3 GESTIÓN DEL EMBUDO (5 etapas con hitos y fechas clave para alertas)
  funnelStages: [
    {
      id: 'funnel-1',
      stage: 'Atracción',
      description: 'Generación de prospectos calificados interesados en comprar lotes campestres o urbanos',
      targetLeads: 500,
      currentLeads: 380,
      conversionRate: 76.0,
      tactics: [
        'Anuncios en Meta Ads segmentados por radio geográfico y nivel socioeconómico',
        'Videos virales en TikTok mostrando cómo verificar títulos en registros públicos (SUNARP)',
        'Vallas publicitarias con código QR en la autopista de acceso al terreno'
      ],
      keyMilestone: 'Entrega de analítica de campaña Meta y optimización de CPL de lotes',
      milestoneDate: TOMORROW, // 2026-11-11 -> VENCE MAÑANA (Alerta 24h)
      milestoneResponsible: 'Lic. Aldair Vásquez (Marketing)',
      milestoneStatus: 'En Proceso'
    },
    {
      id: 'funnel-2',
      stage: 'Interacción',
      description: 'Respuesta rápida en WhatsApp, envío de catálogo de lotes, ubicación GPS y planos',
      targetLeads: 300,
      currentLeads: 215,
      conversionRate: 56.5,
      tactics: [
        'Respuesta automática en menos de 2 minutos vía bot interactivo de WhatsApp',
        'Envío de video tour 360° y mapa satelital del lote asignado',
        'Llamada de perfilamiento para confirmar interés de compra en 30 días'
      ],
      keyMilestone: 'Despliegue del guion de perfilamiento y catálogo interactivo de manzanas en WhatsApp',
      milestoneDate: IN_4_DAYS, // 2026-11-14
      milestoneResponsible: 'Carlos Mendoza (Sistemas)',
      milestoneStatus: 'Pendiente'
    },
    {
      id: 'funnel-3',
      stage: 'Conversión',
      description: 'Agendamiento y asistencia a visita guiada al terreno con promotor comercial',
      targetLeads: 120,
      currentLeads: 78,
      conversionRate: 36.2,
      tactics: [
        'Coordinación de transporte en van privada para clientes los sábados y domingos',
        'Entrega en campo de carpeta legal física con copia literal y plano topográfico',
        'Promoción de bono de descuento de $500 por separación inmediata en terreno'
      ],
      keyMilestone: 'Cierre del padrón de movilidad para la visita guiada al terreno de fin de semana',
      milestoneDate: IN_2_DAYS, // 2026-11-12
      milestoneResponsible: 'Mariana Flores (Ventas)',
      milestoneStatus: 'En Proceso'
    },
    {
      id: 'funnel-4',
      stage: 'Cierre',
      description: 'Firma de contrato de compraventa y pago de la cuota inicial del lote',
      targetLeads: 35,
      currentLeads: 22,
      conversionRate: 28.2,
      tactics: [
        'Financiamiento directo sin intereses hasta 36 meses',
        'Acompañamiento en notaría pública para firma legal de escrituras',
        'Facilidades de pago por transferencias bancarias interbancarias'
      ],
      keyMilestone: 'Revisión final de minutas notariales de 10 lotes separados del Bloque B',
      milestoneDate: PAST_3_DAYS, // 2026-11-07
      milestoneResponsible: 'Roberto Solís (Closer)',
      milestoneStatus: 'Completada'
    },
    {
      id: 'funnel-5',
      stage: 'Fidelización',
      description: 'Programa de referidos de propietarios y entrega formal de hitos de obra',
      targetLeads: 20,
      currentLeads: 14,
      conversionRate: 70.0,
      tactics: [
        'Plan "Recomienda a un amigo y gana $300 por lote vendido"',
        'Envío mensual de video boletín con el avance de electrificación y pistas del proyecto',
        'Invitación a la inauguración de la casa club y áreas verdes'
      ],
      keyMilestone: 'Envío del informe bimestral de avance de obras y habilitación a los 65 propietarios actuales',
      milestoneDate: IN_7_DAYS, // 2026-11-17
      milestoneResponsible: 'Mariana Flores (Ventas)',
      milestoneStatus: 'Pendiente'
    }
  ],

  // B.1 PROGRAMA DE CAPACITACIÓN (Módulos, fechas, horas, estado)
  trainingPrograms: [
    {
      id: 'train-1',
      code: 'MOD-01',
      moduleName: 'Fundamentos Legales y Técnicos en la Venta de Lotes',
      topics: [
        'Diferencias entre acciones y derechos vs título independizado en SUNARP',
        'Interpretación de planos perimétricos y curvas de nivel',
        'Zonificación municipal y certificados de parámetros urbanísticos'
      ],
      scheduledDate: TOMORROW, // 2026-11-11 -> VENCE MAÑANA (Alerta 24h)
      durationHours: 4,
      instructor: 'Abg. Especialista Notarial Dr. Hernán Vega',
      enrolledAttendees: 12,
      attendedCount: 0,
      status: 'Programada'
    },
    {
      id: 'train-2',
      code: 'MOD-02',
      moduleName: 'Técnicas de Cierre en Terreno y Manejo de Objeciones de Lotes',
      topics: [
        'Manejo de objeción: "¿Y cuándo instalan la luz y el agua definitiva?"',
        'Uso del plano de lotización para generar urgencia por lotes esquineros',
        'Simulación de cuotas en vivo frente al cliente indeciso'
      ],
      scheduledDate: '2026-11-04',
      durationHours: 5,
      instructor: 'Coach Comercial Jorge Alva',
      enrolledAttendees: 12,
      attendedCount: 11,
      status: 'Ejecutada'
    },
    {
      id: 'train-3',
      code: 'MOD-03',
      moduleName: 'Manejo de CRM y Calificación de Leads Inmobiliarios',
      topics: [
        'Embudos de venta en Kommo/HubSpot para proyectos de lotes',
        'Etiquetado por capacidad de pago (Contado vs Cuota Inicial)',
        'Secuencias de seguimiento automático por WhatsApp'
      ],
      scheduledDate: IN_4_DAYS, // 2026-11-14
      durationHours: 3,
      instructor: 'Ing. Carlos Mendoza',
      enrolledAttendees: 10,
      attendedCount: 0,
      status: 'Programada'
    },
    {
      id: 'train-4',
      code: 'MOD-04',
      moduleName: 'Prospección Digital y Marca Personal del Asesor en Redes',
      topics: [
        'Grabación de micro-reels en terreno con smartphone y micrófono solapero',
        'Cómo atender mensajes de Marketplace y grupos de Facebook de inversionistas',
        'Normas de seguridad y no dar información errónea en redes'
      ],
      scheduledDate: '2026-10-28',
      durationHours: 4,
      instructor: 'Lic. Aldair Vásquez',
      enrolledAttendees: 12,
      attendedCount: 12,
      status: 'Ejecutada'
    }
  ],

  // B.2 TALLER DE CREACIÓN
  workshops: [
    {
      id: 'wsh-1',
      title: 'Taller Práctico de Creación de Video Recorrido de Terreno',
      objective: 'Cada asesor comercial debe grabar y editar 1 reel vertical mostrando la estaca del lote, la vía de acceso y el paisaje natural.',
      modality: 'Presencial en Terreno',
      deliverableType: 'Video Recorrido Dron',
      deliverablesSubmitted: 9,
      targetDeliverables: 12,
      reviewStatus: 'En Corrección',
      samplePreviewText: 'Estructura: 0-3s "¿Buscas un lote campestre a 30 min de la ciudad?" -> 3-10s Toma aérea del lote 160m² -> 10-18s Precio de cuota $190/mes -> 18-25s "Comenta LOTE para enviarte la ubicación exacta."'
    },
    {
      id: 'wsh-2',
      title: 'Laboratorio de Guiones y Respuestas Rápidas para WhatsApp',
      objective: 'Construir el banco unificado de 8 respuestas rápidas con emojis, fotos de planos y audio explicativo del asesor.',
      modality: 'Virtual Interactivo',
      deliverableType: 'WhatsApp Flow',
      deliverablesSubmitted: 12,
      targetDeliverables: 12,
      reviewStatus: 'Aprobado',
      samplePreviewText: 'Plantilla de saludo: "Hola [Nombre]! Te saluda [Asesor] de Los Robles. Qué alegría que busques tu terreno propio. ¿Te interesa el proyecto campestre con piscina o el urbano para construir tu casa de inmediato?"'
    },
    {
      id: 'wsh-3',
      title: 'Taller de Redacción de Copies Persuasivos para Venta de Lotes',
      objective: 'Redactar 3 copies aplicando fórmulas AIDA y PAS orientados a compradores que buscan resguardar sus ahorros.',
      modality: 'Híbrido',
      deliverableType: 'Copy Persuasivo Lote',
      deliverablesSubmitted: 10,
      targetDeliverables: 12,
      reviewStatus: 'Aprobado',
      samplePreviewText: 'Titular: "Tu dinero en el banco pierde valor cada día; en tierra, se multiplica. Adquiere tu lote campestre con solo $1,500 de inicial y financiamiento directo."'
    }
  ],

  // B.3 EVALUACIÓN (Notas del personal)
  evaluations: [
    {
      id: 'eval-1',
      staffName: 'Mariana Flores',
      role: 'Jefa de Ventas',
      testTopic: 'Aspectos Legales y Cierre Notarial de Lotes',
      score: 19,
      maxScore: 20,
      date: '2026-11-05',
      feedback: 'Excelente dominio de la partida registral y cálculo de alcabala.',
      passed: true
    },
    {
      id: 'eval-2',
      staffName: 'Roberto Solís',
      role: 'Closer Inmobiliario',
      testTopic: 'Simulación de Crédito Directo y Manejo de Objeciones',
      score: 18,
      maxScore: 20,
      date: '2026-11-05',
      feedback: 'Muy buen manejo de urgencia comercial en terreno.',
      passed: true
    },
    {
      id: 'eval-3',
      staffName: 'Lucía Paredes',
      role: 'Asesora Junior',
      testTopic: 'Protocolo de Prospección Digital y CRM',
      score: 16,
      maxScore: 20,
      date: '2026-11-06',
      feedback: 'Conoce el flujo pero debe mejorar la rapidez en actualizar estados en Kommo.',
      passed: true
    },
    {
      id: 'eval-4',
      staffName: 'Diego Ramos',
      role: 'Asesor Comercial',
      testTopic: 'Ficha Técnica del Proyecto y Parámetros de Lote',
      score: 11,
      maxScore: 20,
      date: '2026-11-06',
      feedback: 'Confundió los metros de retiro municipal. Requiere reforzamiento.',
      passed: false
    },
    {
      id: 'eval-5',
      staffName: 'Valeria Cruz',
      role: 'Asesora de Televentas',
      testTopic: 'Guiones Telefónicos y Coordinación de Visitas',
      score: 17,
      maxScore: 20,
      date: '2026-11-07',
      feedback: 'Excelente tono, empática y con alto índice de visitas agendadas.',
      passed: true
    }
  ],

  // C.1 MANUAL DE HERRAMIENTAS DIGITALES (Hitos con fecha límite)
  digitalTools: [
    {
      id: 'tool-1',
      toolName: 'CRM Inmobiliario (Kommo / HubSpot)',
      category: 'CRM Inmobiliario',
      description: 'Centralización de prospectos de Facebook Ads, WhatsApp y llamadas. Asignación inmediata y seguimiento de etapas de compra de lote.',
      manualUrlOrGuide: 'SOP-CRM-V2.1-Lotes.pdf',
      version: 'v2.1',
      isRequired: true,
      isUsedInDailyOps: true,
      releaseDate: TOMORROW, // 2026-11-11 -> VENCE MAÑANA (Alerta 24h)
      responsible: 'Ing. Carlos Mendoza (Sistemas)',
      status: 'En Revisión'
    },
    {
      id: 'tool-2',
      toolName: 'Meta Business Suite & Ads Manager',
      category: 'Meta & Pautas',
      description: 'Configuración de formularios instantáneos, públicos similares basados en compradores de lotes y geolocalización a 25km del terreno.',
      manualUrlOrGuide: 'Guia-MetaAds-Audiencias-Lotes.pdf',
      version: 'v3.0',
      isRequired: true,
      isUsedInDailyOps: true,
      releaseDate: '2026-10-25',
      responsible: 'Lic. Aldair Vásquez (Marketing)',
      status: 'Publicado'
    },
    {
      id: 'tool-3',
      toolName: 'Canva Pro Inmobiliario (Kits de Marca de Lotes)',
      category: 'Diseño & Creativos',
      description: 'Plantillas estandarizadas de testimoniales, fichas de cotización, fotos con dron con marcas de límites de lote y promociones.',
      manualUrlOrGuide: 'Manual-Diseno-Plantillas-Lotes.pdf',
      version: 'v1.4',
      isRequired: true,
      isUsedInDailyOps: true,
      releaseDate: '2026-10-30',
      responsible: 'Diseñadora Carla Peña',
      status: 'Publicado'
    },
    {
      id: 'tool-4',
      toolName: 'Google Earth & QGIS (Mapas Satelitales y Dron)',
      category: 'Geo, Mapas & Dron',
      description: 'Herramienta para mostrar al cliente la topografía, distancias a avenidas principales, hospitales y futuros proyectos de infraestructura.',
      manualUrlOrGuide: 'Manual-Satelital-Lotes-Topografia.pdf',
      version: 'v1.0',
      isRequired: true,
      isUsedInDailyOps: false, // aún en adopción
      releaseDate: IN_4_DAYS, // 2026-11-14
      responsible: 'Topógrafo Arq. Fernando Ríos',
      status: 'En Revisión'
    },
    {
      id: 'tool-5',
      toolName: 'WhatsApp Business API & Catálogo de Lotes',
      category: 'WhatsApp Business',
      description: 'Catálogo con precios actualizados por manzana, etiquetas de color según estado del prospecto y respuestas automáticas fuera de horario.',
      manualUrlOrGuide: 'Manual-WhatsApp-Business-Inmobiliario.pdf',
      version: 'v2.0',
      isRequired: true,
      isUsedInDailyOps: true,
      releaseDate: '2026-10-20',
      responsible: 'Lic. Aldair Vásquez (Marketing)',
      status: 'Publicado'
    },
    {
      id: 'tool-6',
      toolName: 'Google Drive Corporativo (Bóveda Legal de Lotes)',
      category: 'Almacenamiento Cloud',
      description: 'Carpeta en la nube con copia certificada de títulos de propiedad, plano de independización, resoluciones de la municipalidad y modelos de contrato.',
      manualUrlOrGuide: 'Protocolo-Seguridad-Documentos-Lotes.pdf',
      version: 'v1.2',
      isRequired: true,
      isUsedInDailyOps: true,
      releaseDate: '2026-10-18',
      responsible: 'Abg. Hernán Vega',
      status: 'Publicado'
    }
  ],

  // C.2 PLANTILLA DE EDICIÓN (Estructura definida para lote)
  postTemplates: [
    {
      id: 'post-tmpl-1',
      name: 'Lote Campestre Familiar - "Construye tu Refugio"',
      lotType: 'Campestre Residencial',
      hook: '🌿 ¿Cansado del ruido y el estrés de la ciudad? Este fin de semana descubre el paraíso donde tu familia respirará aire puro.',
      benefits: [
        'Lotes independizados inscritos en Registros Públicos (Copia literal disponible)',
        'Puntos de agua y tendido eléctrico listos en el frontis',
        'Áreas comunes: Casa club, piscina, zona de parrillas y circuito de caminatas',
        'Seguridad 24/7 con garita de control y pórtico de ingreso'
      ],
      dimensionsM2: 200,
      priceUSD: 18500,
      initialDepositUSD: 2500,
      directFinancingMonths: 36,
      location: 'Valle Verde, Km 42 - A solo 35 minutos de la ciudad',
      legalStatus: 'Título de Propiedad Independizado en SUNARP (100% Seguro)',
      cta: '👉 Dale clic al botón para enviarte el plano de lotes disponibles y coordinar tu visita guiada con movilidad gratuita este sábado.',
      hashtags: ['#VentaDeLotes', '#LotesCampestres', '#TerrenosEnVenta', '#InversionInmobiliaria', '#LotesConTitulo']
    },
    {
      id: 'post-tmpl-2',
      name: 'Lote Comercial Urbano - "Inversión con Alta Plusvalía"',
      lotType: 'Urbano / Comercial',
      hook: '📈 Multiplica tu capital: Lotes en esquina estratégica con proyección a zona comercial de alto tránsito.',
      benefits: [
        'Ubicación sobre avenida principal de 4 carriles',
        'Plusvalía proyectada del 25% anual por habilitación del nuevo bypass',
        'Habilitación urbana aprobada con pistas y veredas',
        'Financiamiento directo con 0% de interés a sola firma'
      ],
      dimensionsM2: 140,
      priceUSD: 24900,
      initialDepositUSD: 3500,
      directFinancingMonths: 24,
      location: 'Urb. Las Palmeras, Sector Avenida Los Laureles',
      legalStatus: 'Partida Electrónica Independizada',
      cta: '📲 Escríbenos al WhatsApp directo o agenda una videollamada para ver el plano de manzanas comerciales.',
      hashtags: ['#LotesComerciales', '#Inversionistas', '#LotesUrbanos', '#PlusvaliaGarantizada']
    }
  ],

  // C.3 FORMATO DE CONTROL (Auditoría de uso de herramientas)
  toolAudits: [
    {
      id: 'aud-1',
      advisorName: 'Mariana Flores (Ventas)',
      toolName: 'CRM Inmobiliario',
      category: 'CRM',
      requiredWeeklyHours: 15,
      actualWeeklyHours: 14.5,
      adoptionPercentage: 96.6,
      complianceStatus: 'Óptimo',
      lastAuditDate: '2026-11-08'
    },
    {
      id: 'aud-2',
      advisorName: 'Roberto Solís (Closer)',
      toolName: 'CRM Inmobiliario',
      category: 'CRM',
      requiredWeeklyHours: 15,
      actualWeeklyHours: 13.0,
      adoptionPercentage: 86.6,
      complianceStatus: 'Óptimo',
      lastAuditDate: '2026-11-08'
    },
    {
      id: 'aud-3',
      advisorName: 'Diego Ramos (Asesor)',
      toolName: 'WhatsApp Business Catálogo',
      category: 'Mensajería',
      requiredWeeklyHours: 12,
      actualWeeklyHours: 6.5,
      adoptionPercentage: 54.1,
      complianceStatus: 'Deficiente',
      lastAuditDate: '2026-11-08'
    },
    {
      id: 'aud-4',
      advisorName: 'Lucía Paredes (Asesora)',
      toolName: 'Canva Pro / Plantillas Lotes',
      category: 'Diseño',
      requiredWeeklyHours: 8,
      actualWeeklyHours: 7.2,
      adoptionPercentage: 90.0,
      complianceStatus: 'Óptimo',
      lastAuditDate: '2026-11-07'
    },
    {
      id: 'aud-5',
      advisorName: 'Valeria Cruz (Televentas)',
      toolName: 'Google Earth / Mapas Dron',
      category: 'Geo / Satelital',
      requiredWeeklyHours: 6,
      actualWeeklyHours: 4.5,
      adoptionPercentage: 75.0,
      complianceStatus: 'Regular',
      lastAuditDate: '2026-11-08'
    }
  ],

  // D.1 CREAR UN PLAN DE ACCIÓN (Objetivos, pilares, fechas límite para alertas)
  actionPlans: [
    {
      id: 'act-1',
      code: 'ACT-01',
      objective: 'Captar 120 leads de familias interesadas en lotes campestres para casa de campo',
      targetAudience: 'Familias para Primera Vivienda',
      contentPillar: 'Recorridos de Terreno & Dron',
      deadline: TOMORROW, // 2026-11-11 -> VENCE MAÑANA (Alerta 24h)
      responsible: 'Lic. Aldair Vásquez (Marketing)',
      status: 'En Ejecución'
    },
    {
      id: 'act-2',
      code: 'ACT-02',
      objective: 'Demostrar seguridad jurídica y combatir el temor a estafas de terrenos no independizados',
      targetAudience: 'Inversionistas de Lotes',
      contentPillar: 'Legal & Títulos Independizados',
      deadline: IN_4_DAYS, // 2026-11-14
      responsible: 'Abg. Hernán Vega & Marketing',
      status: 'Planificada'
    },
    {
      id: 'act-3',
      code: 'ACT-03',
      objective: 'Campaña de testimonios de 3 familias que ya iniciaron la construcción de su casa de campo',
      targetAudience: 'Familias para Primera Vivienda',
      contentPillar: 'Testimonios de Propietarios',
      deadline: '2026-11-06',
      responsible: 'Carla Peña (Audiovisual)',
      status: 'Ejecutada'
    },
    {
      id: 'act-4',
      code: 'ACT-04',
      objective: 'Lanzamiento de promoción relámpago: "Paga tu inicial fraccionada en 3 partes sin intereses"',
      targetAudience: 'Jóvenes Emprendedores',
      contentPillar: 'Promociones & Facilidades',
      deadline: IN_7_DAYS, // 2026-11-17
      responsible: 'Mariana Flores (Ventas)',
      status: 'Planificada'
    }
  ],

  // D.2 CALENDARIO DE CONTROL (Publicaciones programadas y realizadas)
  editorialCalendar: [
    {
      id: 'cal-1',
      scheduledDate: TODAY,
      platform: 'TikTok',
      postType: 'Reel con Dron',
      title: 'POV: Llegas a tu lote campestre un domingo por la mañana',
      copy: 'La paz mental que no se compra en ningún departamento de la ciudad. Lotes de 160m² listos para construir. Comenta INFO.',
      responsible: 'Lic. Aldair Vásquez',
      status: 'Realizada',
      interactions: 1420,
      leadsGenerated: 28
    },
    {
      id: 'cal-2',
      scheduledDate: TOMORROW,
      platform: 'Facebook',
      postType: 'Carrusel de Planos',
      title: 'Solo quedan 4 lotes frente al parque principal',
      copy: 'Ubicación premium dentro de nuestro condominio campestre. Te financiamos directo a sola firma y sin trámites bancarios.',
      responsible: 'Carla Peña',
      status: 'Programada',
      interactions: 0,
      leadsGenerated: 0
    },
    {
      id: 'cal-3',
      scheduledDate: IN_2_DAYS,
      platform: 'Instagram',
      postType: 'Infografía Legal',
      title: '3 Documentos que SIEMPRE debes pedir antes de comprar un lote',
      copy: 'No arriesgues los ahorros de tu vida. Aprende a revisar la Partida Registral, la HR-PU y el plano visado. ¡Guarda este post!',
      responsible: 'Abg. Hernán Vega',
      status: 'Programada',
      interactions: 0,
      leadsGenerated: 0
    },
    {
      id: 'cal-4',
      scheduledDate: '2026-11-08',
      platform: 'Facebook',
      postType: 'Video Testimonio',
      title: 'La familia Gómez nos cuenta por qué eligieron Los Robles',
      copy: '"Buscamos por 6 meses hasta que encontramos seguridad y título en mano". Mira el testimonio completo.',
      responsible: 'Lic. Aldair Vásquez',
      status: 'Realizada',
      interactions: 2350,
      leadsGenerated: 35
    },
    {
      id: 'cal-5',
      scheduledDate: '2026-11-06',
      platform: 'WhatsApp Status',
      postType: 'Historia En Vivo',
      title: 'Avance de obra: Apertura de calles y tendido de tuberías',
      copy: 'El proyecto avanza a paso firme. Próximo aumento de precio en 15 días.',
      responsible: 'Mariana Flores',
      status: 'Realizada',
      interactions: 680,
      leadsGenerated: 19
    },
    {
      id: 'cal-6',
      scheduledDate: IN_4_DAYS,
      platform: 'YouTube',
      postType: 'Video Testimonio',
      title: 'Recorrido en 4K con dron: Condominio Las Palmeras desde el aire',
      copy: 'Conoce cada manzana, las vías de 12 metros de ancho y la vista a las colinas verdes.',
      responsible: 'Carla Peña',
      status: 'Programada',
      interactions: 0,
      leadsGenerated: 0
    }
  ],

  // D.3 GUÍA DE PRUEBA A/B
  abTests: [
    {
      id: 'ab-1',
      testName: 'Creativo de Terreno: Video Dron vs Carrusel de Planos de Lotes',
      variableTested: 'Formato (Dron vs Carrusel)',
      variantA: {
        label: 'Variante A: Video Dron 4K',
        description: 'Vuelo rasante sobre los lotes con música relajante y texto sobreimpreso "$18,500"',
        spendUSD: 150,
        leads: 48,
        ctrPercent: 3.4,
        cplUSD: 3.12
      },
      variantB: {
        label: 'Variante B: Carrusel de Plano y Ficha',
        description: 'Plano perimétrico con medidas exactas de 8x20 metros y foto del pórtico',
        spendUSD: 150,
        leads: 26,
        ctrPercent: 1.8,
        cplUSD: 5.76
      },
      winner: 'A',
      conclusion: 'El video de dron transmite emoción y confianza visual, reduciendo el Costo por Lead en un 45.8% frente al carrusel estático.'
    },
    {
      id: 'ab-2',
      testName: 'Gancho Publicitario: Enfoque Inversión vs Enfoque Casa de Campo',
      variableTested: 'Gancho Visual (Hook)',
      variantA: {
        label: 'Variante A: "Duplica tu dinero con plusvalía de lotes"',
        description: 'Copy enfocado en resguardar ahorros de la inflación y ganar 25% anual',
        spendUSD: 120,
        leads: 31,
        ctrPercent: 2.2,
        cplUSD: 3.87
      },
      variantB: {
        label: 'Variante B: "El refugio de campo que tus hijos recordarán"',
        description: 'Copy enfocado en domingos familiares, parrillas y piscina privada',
        spendUSD: 120,
        leads: 39,
        ctrPercent: 2.9,
        cplUSD: 3.07
      },
      winner: 'B',
      conclusion: 'La audiencia conectó más fuertemente con la experiencia familiar y bienestar que con el mensaje financiero puramente racional.'
    }
  ],

  // ALERTAS AUTOMATIZADAS (Con items clave que vencen en 24h: A.3, B.1, C.1, D.1)
  alerts: [
    {
      id: 'alert-1',
      taskId: 'funnel-1',
      taskTitle: 'A.3 Gestión del Embudo: Entrega de analítica de campaña Meta y optimización de CPL',
      sourceTool: 'A.3',
      sourceToolName: 'Gestión del Embudo (A.3)',
      dueDate: TOMORROW, // 2026-11-11
      responsible: 'Lic. Aldair Vásquez (Marketing)',
      alertTriggerDate: TODAY,
      hoursRemaining: 24,
      is24hAlert: true,
      status: 'Pendiente',
      recipientEmail: 'vasquezrequejoaldair@gmail.com'
    },
    {
      id: 'alert-2',
      taskId: 'train-1',
      taskTitle: 'B.1 Programa de Capacitación: MOD-01 Fundamentos Legales y Notariales de Lotes',
      sourceTool: 'B.1',
      sourceToolName: 'Programa de Capacitación (B.1)',
      dueDate: TOMORROW, // 2026-11-11
      responsible: 'Abg. Hernán Vega / Coord. Ventas',
      alertTriggerDate: TODAY,
      hoursRemaining: 24,
      is24hAlert: true,
      status: 'Pendiente',
      recipientEmail: 'vasquezrequejoaldair@gmail.com'
    },
    {
      id: 'alert-3',
      taskId: 'tool-1',
      taskTitle: 'C.1 Manual de Herramientas Digitales: Entrega del SOP v2.1 CRM Kommo para Lotes',
      sourceTool: 'C.1',
      sourceToolName: 'Manual de Herramientas Digitales (C.1)',
      dueDate: TOMORROW, // 2026-11-11
      responsible: 'Ing. Carlos Mendoza (Sistemas)',
      alertTriggerDate: TODAY,
      hoursRemaining: 24,
      is24hAlert: true,
      status: 'Pendiente',
      recipientEmail: 'vasquezrequejoaldair@gmail.com'
    },
    {
      id: 'alert-4',
      taskId: 'act-1',
      taskTitle: 'D.1 Plan de Acción RRSS: ACT-01 Captar 120 leads de familias interesadas en campo',
      sourceTool: 'D.1',
      sourceToolName: 'Plan de Acción Redes Sociales (D.1)',
      dueDate: TOMORROW, // 2026-11-11
      responsible: 'Lic. Aldair Vásquez (Marketing)',
      alertTriggerDate: TODAY,
      hoursRemaining: 24,
      is24hAlert: true,
      status: 'Pendiente',
      recipientEmail: 'vasquezrequejoaldair@gmail.com'
    },
    {
      id: 'alert-5',
      taskId: 'funnel-3',
      taskTitle: 'A.3 Gestión del Embudo: Cierre del padrón de movilidad para visita al terreno',
      sourceTool: 'A.3',
      sourceToolName: 'Gestión del Embudo (A.3)',
      dueDate: IN_2_DAYS,
      responsible: 'Mariana Flores (Ventas)',
      alertTriggerDate: TOMORROW,
      hoursRemaining: 48,
      is24hAlert: false,
      status: 'Pendiente',
      recipientEmail: 'vasquezrequejoaldair@gmail.com'
    }
  ],

  // LOG DE CORREOS AUTOMATIZADOS
  emailLogs: [
    {
      id: 'email-1',
      alertId: 'alert-prev-1',
      recipientEmail: 'vasquezrequejoaldair@gmail.com',
      subject: '⚠️ Alerta Preventiva 24h: Entrega de Analítica de Campaña Meta de Lotes (A.3)',
      sourceTool: 'A.3 Gestión del Embudo',
      taskTitle: 'Entrega de analítica de campaña Meta y optimización de CPL de lotes',
      dueDate: TOMORROW,
      sentAt: '2026-11-10 08:00 AM',
      status: 'Entregado',
      htmlPreview: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
          <div style="background: #0f172a; color: white; padding: 20px; text-align: center;">
            <h2 style="margin: 0; font-size: 18px; color: #38bdf8;">INMOBILIARIA LOS ROBLES</h2>
            <p style="margin: 5px 0 0; font-size: 12px; color: #94a3b8;">Sistema Automatizado de Control y Alertas de Marketing</p>
          </div>
          <div style="padding: 24px; background: #ffffff;">
            <div style="display: inline-block; padding: 4px 12px; background: #fef3c7; color: #b45309; font-weight: bold; border-radius: 12px; font-size: 12px; margin-bottom: 12px;">
              ⚠️ VENCE EN 24 HORAS (Mañana 11 de Noviembre)
            </div>
            <h3 style="color: #0f172a; margin-top: 0;">Recordatorio Preventivo de Cumplimiento</h3>
            <p style="color: #475569; font-size: 14px; line-height: 1.6;">
              Estimado(a) <strong>Lic. Aldair Vásquez</strong>,
            </p>
            <p style="color: #475569; font-size: 14px; line-height: 1.6;">
              Le informamos que el hito estratégico correspondiente a la <strong>Gestión del Embudo (Herramienta A.3)</strong> está programado para vencer dentro de 24 horas.
            </p>
            <div style="background: #f8fafc; border-left: 4px solid #0284c7; padding: 12px 16px; margin: 16px 0; border-radius: 4px;">
              <p style="margin: 4px 0; font-size: 13px;"><strong>Hito / Tarea:</strong> Entrega de analítica de campaña Meta y optimización de CPL de lotes</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Módulo:</strong> Causa A - Deficiente Planificación de Marketing</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Fecha Límite:</strong> 2026-11-11 (Mañana)</p>
              <p style="margin: 4px 0; font-size: 13px;"><strong>Entregable esperado:</strong> Reporte de costo por prospecto y balance de leads para la visita a terreno</p>
            </div>
            <p style="color: #64748b; font-size: 12px;">Por favor asegúrese de cargar los entregables en el módulo de Gestión Documental para actualizar los KPIs en tiempo real.</p>
          </div>
        </div>
      `
    }
  ],

  // GESTIÓN DOCUMENTAL
  documents: [
    {
      id: 'doc-1',
      name: 'Manual_SOP_Kommo_CRM_Venta_Lotes_v2.1.pdf',
      sizeFormatted: '2.8 MB',
      category: 'Causa C',
      toolRef: 'C.1 Manual de Herramientas Digitales',
      fileType: 'pdf',
      uploadedAt: '2026-11-08',
      uploadedBy: 'Ing. Carlos Mendoza',
      description: 'Guía paso a paso de configuración de embudos para asesores y supervisores de ventas de lotes.'
    },
    {
      id: 'doc-2',
      name: 'Matriz_Operativa_Marketing_Lotes_2026.xlsx',
      sizeFormatted: '450 KB',
      category: 'Causa A',
      toolRef: 'A.2 Matriz Operativa',
      fileType: 'xlsx',
      uploadedAt: '2026-11-07',
      uploadedBy: 'Lic. Aldair Vásquez',
      description: 'Cronograma detallado con canales, costos asignados y responsables por semana.'
    },
    {
      id: 'doc-3',
      name: 'FODA_Cruzado_Estrategias_Inmobiliaria.pdf',
      sizeFormatted: '1.2 MB',
      category: 'Causa A',
      toolRef: 'A.1 FODA Cruzado',
      fileType: 'pdf',
      uploadedAt: '2026-11-06',
      uploadedBy: 'Lic. Aldair Vásquez',
      description: 'Análisis matricial de factores internos y externos del mercado de lotes campestres.'
    },
    {
      id: 'doc-4',
      name: 'Plantilla_Ficha_Comercial_Lote_Residencial.docx',
      sizeFormatted: '890 KB',
      category: 'Causa C',
      toolRef: 'C.2 Plantilla de Edición',
      fileType: 'docx',
      uploadedAt: '2026-11-05',
      uploadedBy: 'Carla Peña (Diseño)',
      description: 'Estructura editable de publicación con ganchos, ficha técnica y hashtags.'
    },
    {
      id: 'doc-5',
      name: 'Registro_Evaluaciones_Personal_Ventas_Octubre.xlsx',
      sizeFormatted: '320 KB',
      category: 'Causa B',
      toolRef: 'B.3 Evaluación',
      fileType: 'xlsx',
      uploadedAt: '2026-11-07',
      uploadedBy: 'Mariana Flores',
      description: 'Puntajes de conocimientos legales, planos registrales y protocolo comercial en campo.'
    },
    {
      id: 'doc-6',
      name: 'Plano_Lotizacion_General_LasPalmeras_Sector_A.image',
      sizeFormatted: '4.5 MB',
      category: 'General',
      toolRef: 'General Proyecto',
      fileType: 'image',
      uploadedAt: '2026-11-04',
      uploadedBy: 'Arq. Fernando Ríos',
      description: 'Plano perimétrico en alta resolución con numeración de manzanas y lotes esquineros.'
    }
  ],

  cloudIntegration: {
    provider: 'local',
    connected: true,
    lastSyncedAt: '2026-11-10 07:05:00',
    supabaseUrl: 'https://inmobiliaria-lotes.supabase.co',
    firebaseProject: 'lotes-marketing-dashboard'
  }
};
