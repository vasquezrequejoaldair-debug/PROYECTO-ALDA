export type CauseKey = 'A' | 'B' | 'C' | 'D';

export interface FodaItem {
  id: string;
  code: string;
  type: 'FO' | 'DO' | 'FA' | 'DA';
  title: string;
  description: string;
  objective: string;
  priority: 'Alta' | 'Media' | 'Baja';
}

export interface OperationalMatrixItem {
  id: string;
  code: string;
  fodaRef: string;
  strategy: string;
  funnelStage: 'Atracción' | 'Interacción' | 'Conversión' | 'Cierre' | 'Fidelización';
  channel: string;
  responsible: string;
  deadline: string;
  status: 'Planificada' | 'En Progreso' | 'Ejecutada' | 'Cancelada';
  deliverable: string;
  budget: number;
}

export interface FunnelStageData {
  id: string;
  stage: 'Atracción' | 'Interacción' | 'Conversión' | 'Cierre' | 'Fidelización';
  description: string;
  targetLeads: number;
  currentLeads: number;
  conversionRate: number;
  tactics: string[];
  keyMilestone: string;
  milestoneDate: string;
  milestoneResponsible: string;
  milestoneStatus: 'Pendiente' | 'En Proceso' | 'Completada';
}

export interface TrainingProgramItem {
  id: string;
  code: string;
  moduleName: string;
  topics: string[];
  scheduledDate: string;
  durationHours: number;
  instructor: string;
  enrolledAttendees: number;
  attendedCount: number;
  status: 'Programada' | 'Ejecutada' | 'Reprogramada';
}

export interface WorkshopItem {
  id: string;
  title: string;
  objective: string;
  modality: 'Presencial en Terreno' | 'Virtual Interactivo' | 'Híbrido';
  deliverableType: 'Video Recorrido Dron' | 'Guion Objeciones' | 'WhatsApp Flow' | 'Copy Persuasivo Lote';
  deliverablesSubmitted: number;
  targetDeliverables: number;
  reviewStatus: 'Pendiente' | 'Aprobado' | 'En Corrección';
  samplePreviewText?: string;
}

export interface EvaluationItem {
  id: string;
  staffName: string;
  role: string;
  testTopic: string;
  score: number;
  maxScore: number;
  date: string;
  feedback: string;
  passed: boolean;
}

export interface DigitalToolManualItem {
  id: string;
  toolName: string;
  category: 'CRM Inmobiliario' | 'Diseño & Creativos' | 'Meta & Pautas' | 'WhatsApp Business' | 'Geo, Mapas & Dron' | 'Almacenamiento Cloud';
  description: string;
  manualUrlOrGuide: string;
  version: string;
  isRequired: boolean;
  isUsedInDailyOps: boolean;
  releaseDate: string;
  responsible: string;
  status: 'Borrador' | 'En Revisión' | 'Publicado';
}

export interface LotPostTemplate {
  id: string;
  name: string;
  lotType: string;
  hook: string;
  benefits: string[];
  dimensionsM2: number;
  priceUSD: number;
  initialDepositUSD: number;
  directFinancingMonths: number;
  location: string;
  legalStatus: string;
  cta: string;
  hashtags: string[];
}

export interface ToolControlAuditItem {
  id: string;
  advisorName: string;
  toolName: string;
  category: string;
  requiredWeeklyHours: number;
  actualWeeklyHours: number;
  adoptionPercentage: number;
  complianceStatus: 'Óptimo' | 'Regular' | 'Deficiente';
  lastAuditDate: string;
}

export interface SocialMediaActionPlanItem {
  id: string;
  code: string;
  objective: string;
  targetAudience: 'Inversionistas de Lotes' | 'Familias para Primera Vivienda' | 'Jóvenes Emprendedores';
  contentPillar: 'Legal & Títulos Independizados' | 'Recorridos de Terreno & Dron' | 'Testimonios de Propietarios' | 'Promociones & Facilidades';
  deadline: string;
  responsible: string;
  status: 'Planificada' | 'En Ejecución' | 'Ejecutada';
}

export interface EditorialCalendarItem {
  id: string;
  scheduledDate: string;
  platform: 'Facebook' | 'Instagram' | 'TikTok' | 'YouTube' | 'WhatsApp Status';
  postType: 'Reel con Dron' | 'Carrusel de Planos' | 'Video Testimonio' | 'Infografía Legal' | 'Historia En Vivo';
  title: string;
  copy: string;
  responsible: string;
  status: 'Programada' | 'Realizada' | 'Cancelada';
  interactions: number;
  leadsGenerated: number;
}

export interface ABTestItem {
  id: string;
  testName: string;
  variableTested: 'Gancho Visual (Hook)' | 'Formato (Dron vs Carrusel)' | 'Enfoque de Precio vs Ubicación' | 'Audiencia Segmentada';
  variantA: {
    label: string;
    description: string;
    spendUSD: number;
    leads: number;
    ctrPercent: number;
    cplUSD: number;
  };
  variantB: {
    label: string;
    description: string;
    spendUSD: number;
    leads: number;
    ctrPercent: number;
    cplUSD: number;
  };
  winner: 'A' | 'B' | 'En Curso';
  conclusion: string;
}

export interface AlertNotification {
  id: string;
  taskId: string;
  taskTitle: string;
  sourceTool: 'A.3' | 'B.1' | 'C.1' | 'D.1';
  sourceToolName: string;
  dueDate: string;
  responsible: string;
  alertTriggerDate: string;
  hoursRemaining: number;
  is24hAlert: boolean;
  status: 'Pendiente' | 'Enviada' | 'Atendida';
  recipientEmail: string;
  sentAt?: string;
}

export interface EmailLog {
  id: string;
  alertId: string;
  recipientEmail: string;
  subject: string;
  sourceTool: string;
  taskTitle: string;
  dueDate: string;
  sentAt: string;
  status: 'Entregado' | 'Simulado' | 'Programado';
  htmlPreview: string;
}

export interface DocumentItem {
  id: string;
  name: string;
  sizeFormatted: string;
  category: 'Causa A' | 'Causa B' | 'Causa C' | 'Causa D' | 'General';
  toolRef: string;
  fileType: 'pdf' | 'docx' | 'xlsx' | 'image' | 'archive';
  uploadedAt: string;
  uploadedBy: string;
  description: string;
  fileDataUrl?: string;
  downloadName?: string;
}

export interface RealEstateMarketingState {
  companyName: string;
  projectName: string;
  problemStatement: string;
  userEmail: string;
  autoEmailEnabled: boolean;
  fodaItems: FodaItem[];
  operationalMatrix: OperationalMatrixItem[];
  funnelStages: FunnelStageData[];
  trainingPrograms: TrainingProgramItem[];
  workshops: WorkshopItem[];
  evaluations: EvaluationItem[];
  digitalTools: DigitalToolManualItem[];
  postTemplates: LotPostTemplate[];
  toolAudits: ToolControlAuditItem[];
  actionPlans: SocialMediaActionPlanItem[];
  editorialCalendar: EditorialCalendarItem[];
  abTests: ABTestItem[];
  alerts: AlertNotification[];
  emailLogs: EmailLog[];
  documents: DocumentItem[];
  cloudIntegration: {
    provider: 'local' | 'firebase' | 'supabase';
    connected: boolean;
    lastSyncedAt?: string;
    supabaseUrl?: string;
    supabaseKey?: string;
    firebaseProject?: string;
  };
}

export interface KPICalculation {
  // Problemática
  ieem: number; // Estrategias ejecutadas / Estrategias planificadas
  totalPlannedStrategies: number;
  totalExecutedStrategies: number;
  // Causa A
  peeep: number; // Causa A ejecutadas / Causa A planificadas
  plannedA: number;
  executedA: number;
  // Causa B
  cp: number; // Capacitaciones ejecutadas / Capacitaciones programadas
  scheduledTrainings: number;
  executedTrainings: number;
  // Causa C
  iuhd: number; // Herramientas utilizadas / Herramientas requeridas
  requiredTools: number;
  usedTools: number;
  // Causa D
  pcp: number; // Publicaciones realizadas / Publicaciones programadas
  scheduledPosts: number;
  completedPosts: number;
}
