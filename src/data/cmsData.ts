import type { CMSVendor, DashboardData, MigrationScenario, RiskAssessment } from '../types/cms';

export const cmsVendors: CMSVendor[] = [
  // Priority 1: Sanity (Most loved)
  {
    id: 'sanity',
    name: 'Sanity',
    type: 'Headless SaaS',
    hosting: 'SaaS/Self',
    apiModel: 'GROQ/GraphQL',
    priority: 1,
    features: {
      editorUx: 5,
      visualEditing: 5,
      previewSpeed: 5,
      modelingFlex: 5,
      apiPower: 5,
      rolesRbac: 4,
      sso: 5,
      compliance: 5,
      localization: 4,
      releasesScheduling: 4,
      seoTooling: 4,
      perfCdn: 5,
      extensibility: 5
    },
    weightedScores: {
      editorUx: 5,
      visualEditingPreview: 5,
      modelingFlexibility: 5,
      developerExperience: 5,
      apiPower: 5,
      governanceSecurity: 4,
      opsTco: 4,
      ecosystemIntegrations: 5,
      localizationScheduling: 4
    },
    totalScore: 95,
    cost: {
      licenseSaas: 'Low',
      hosting: 'Low',
      pluginsApps: 'Low',
      opsTime: 'Low',
      estimatedTotal: 'Low-Mid'
    },
    migration: {
      effort: 'Medium',
      timeWeeks: 6,
      complexity: 'Content modeling workshop, Next.js setup, Visual Editing configuration',
      risks: ['Custom Studio work drift', 'Learning curve for GROQ'],
      steps: [
        'Content modeling workshop → schemas + routing + SEO fields',
        'Next.js app + Presentation/Overlays for Visual Editing',
        'Migration scripts (blog/pages/assets) + redirects map',
        'Governance (roles, SSO), observability, performance',
        'Launch; train editors (1–2 hours hands‑on)'
      ]
    },
    metadata: {
      soc2: true,
      ssoAvailable: true,
      livePreview: true,
      pluginMarket: true,
      notes: 'Unmatched customizability with Studio + Visual Editing',
      bestFor: 'Rapid marketing experiments with real‑time approvals',
      highlights: [
        'Visual Editing with click‑to‑edit overlays',
        'Schemas‑as‑code (TS/JS), Portable Text',
        'Real‑time collaboration',
        'Usage‑based pricing'
      ]
    }
  },
  
  // Priority 2: Craft CMS (Second choice)
  {
    id: 'craft',
    name: 'Craft CMS',
    type: 'Hybrid',
    hosting: 'Self-host/Cloud',
    apiModel: 'Twig + GraphQL',
    priority: 2,
    features: {
      editorUx: 5,
      visualEditing: 3,
      previewSpeed: 5,
      modelingFlex: 4,
      apiPower: 4,
      rolesRbac: 4,
      sso: 4,
      compliance: 3,
      localization: 4,
      releasesScheduling: 4,
      seoTooling: 5,
      perfCdn: 4,
      extensibility: 4
    },
    weightedScores: {
      editorUx: 5,
      visualEditingPreview: 5,
      modelingFlexibility: 4,
      developerExperience: 4,
      apiPower: 4,
      governanceSecurity: 4,
      opsTco: 4,
      ecosystemIntegrations: 4,
      localizationScheduling: 4
    },
    totalScore: 86,
    cost: {
      licenseSaas: 'Low',
      hosting: 'Mid',
      pluginsApps: 'Low',
      opsTime: 'Mid',
      estimatedTotal: 'Mid'
    },
    migration: {
      effort: 'Medium',
      timeWeeks: 8,
      complexity: 'Sections/Fields design, template setup, hosting configuration',
      risks: ['Ops overhead', 'Plugin dependency'],
      steps: [
        'Sections/Fields + Matrix design; enable Live Preview',
        'Templates (Twig) or headless (GraphQL)',
        'Feed Me import, Retour redirects, SEOmatic SEO',
        'Hosting (Craft Cloud or VPS) + CI/CD + caching',
        'Editor training & launch'
      ]
    },
    metadata: {
      soc2: false,
      ssoAvailable: true,
      livePreview: true,
      pluginMarket: true,
      notes: 'Editor‑friendly with polished authoring experience',
      bestFor: 'Editorially rich website with strong guardrails',
      highlights: [
        'Matrix blocks (Craft 5 makes blocks into entries)',
        'Split‑screen Live Preview',
        'Strong plugin ecosystem (SEOmatic, Feed Me)',
        'Predictable licensing costs'
      ]
    }
  },
  
  // Priority 3: Strapi (Third choice)
  {
    id: 'strapi',
    name: 'Strapi',
    type: 'Headless OSS',
    hosting: 'Self-host/Cloud',
    apiModel: 'REST/GraphQL',
    priority: 3,
    features: {
      editorUx: 4,
      visualEditing: 3,
      previewSpeed: 4,
      modelingFlex: 4,
      apiPower: 4,
      rolesRbac: 4,
      sso: 5,
      compliance: 5,
      localization: 4,
      releasesScheduling: 5,
      seoTooling: 3,
      perfCdn: 4,
      extensibility: 4
    },
    weightedScores: {
      editorUx: 4,
      visualEditingPreview: 3,
      modelingFlexibility: 4,
      developerExperience: 4,
      apiPower: 4,
      governanceSecurity: 5,
      opsTco: 4,
      ecosystemIntegrations: 4,
      localizationScheduling: 5
    },
    totalScore: 78,
    cost: {
      licenseSaas: 'Low',
      hosting: 'Low',
      pluginsApps: 'Low',
      opsTime: 'Low',
      estimatedTotal: 'Low-Mid'
    },
    migration: {
      effort: 'Medium',
      timeWeeks: 7,
      complexity: 'Node/TS setup, Components configuration, Cloud deployment',
      risks: ['Preview UX gaps', 'Self-hosting complexity'],
      steps: [
        'Types & Components (+ Dynamic Zones)',
        'Next.js preview endpoints; role policies',
        'Import scripts; enable Releases/Scheduling',
        'Self‑host or Strapi Cloud; monitoring',
        'Training & go‑live'
      ]
    },
    metadata: {
      soc2: true,
      ssoAvailable: true,
      livePreview: false,
      pluginMarket: true,
      notes: 'Node/TS alignment with strong scheduling features',
      bestFor: 'JS/TypeScript shop wanting OSS control',
      highlights: [
        'Components & Dynamic Zones',
        'SOC 2 Type II on Strapi Cloud',
        'Releases & Scheduling',
        'Node/TS stack alignment'
      ]
    }
  },
  
  // Additional vendors (lower priority)
  {
    id: 'contentful',
    name: 'Contentful',
    type: 'Headless SaaS',
    hosting: 'SaaS',
    apiModel: 'REST/GraphQL',
    priority: 4,
    features: {
      editorUx: 3,
      visualEditing: 2,
      previewSpeed: 4,
      modelingFlex: 4,
      apiPower: 4,
      rolesRbac: 4,
      sso: 5,
      compliance: 5,
      localization: 4,
      releasesScheduling: 4,
      seoTooling: 3,
      perfCdn: 5,
      extensibility: 4
    },
    weightedScores: {
      editorUx: 3,
      visualEditingPreview: 2,
      modelingFlexibility: 4,
      developerExperience: 4,
      apiPower: 4,
      governanceSecurity: 4,
      opsTco: 3,
      ecosystemIntegrations: 4,
      localizationScheduling: 4
    },
    totalScore: 68,
    cost: {
      licenseSaas: 'Mid',
      hosting: 'Low',
      pluginsApps: 'Mid',
      opsTime: 'Low',
      estimatedTotal: 'Mid-High'
    },
    migration: {
      effort: 'Low',
      timeWeeks: 4,
      complexity: 'Standard SaaS setup, content types configuration',
      risks: ['Cost sprawl', 'Limited customization'],
      steps: [
        'Content Types setup',
        'API integration',
        'Content migration',
        'Preview configuration',
        'Go-live'
      ]
    },
    metadata: {
      soc2: true,
      ssoAvailable: true,
      livePreview: false,
      pluginMarket: true,
      notes: 'Mature SaaS with strong APIs but cost growth concerns',
      bestFor: 'Teams wanting established SaaS with minimal setup',
      highlights: [
        'Mature SaaS platform',
        'Strong API ecosystem',
        'App marketplace',
        'Enterprise compliance'
      ]
    }
  },
  
  {
    id: 'storyblok',
    name: 'Storyblok',
    type: 'Headless SaaS',
    hosting: 'SaaS',
    apiModel: 'REST/GraphQL',
    priority: 5,
    features: {
      editorUx: 4,
      visualEditing: 4,
      previewSpeed: 4,
      modelingFlex: 3,
      apiPower: 3,
      rolesRbac: 4,
      sso: 5,
      compliance: 5,
      localization: 4,
      releasesScheduling: 4,
      seoTooling: 3,
      perfCdn: 5,
      extensibility: 4
    },
    weightedScores: {
      editorUx: 4,
      visualEditingPreview: 4,
      modelingFlexibility: 3,
      developerExperience: 3,
      apiPower: 3,
      governanceSecurity: 4,
      opsTco: 3,
      ecosystemIntegrations: 4,
      localizationScheduling: 4
    },
    totalScore: 72,
    cost: {
      licenseSaas: 'Mid',
      hosting: 'Low',
      pluginsApps: 'Low',
      opsTime: 'Low',
      estimatedTotal: 'Mid'
    },
    migration: {
      effort: 'Low',
      timeWeeks: 5,
      complexity: 'Visual editor setup, block-based content structure',
      risks: ['Limited modeling flexibility'],
      steps: [
        'Block-based content modeling',
        'Visual editor configuration',
        'Content migration',
        'Frontend integration',
        'Launch'
      ]
    },
    metadata: {
      soc2: true,
      ssoAvailable: true,
      livePreview: true,
      pluginMarket: true,
      notes: 'Marketer‑friendly visual editing with blocks',
      bestFor: 'Marketing teams prioritizing visual editing',
      highlights: [
        'In‑context visual editor',
        'Block‑based modeling',
        'Marketer‑friendly interface',
        'Strong localization'
      ]
    }
  }
];

export const migrationScenarios: MigrationScenario[] = [
  {
    id: 'rapid-marketing',
    name: 'Rapid Marketing Experiments',
    description: 'Fast iteration with real‑time approvals and instant previews',
    bestCms: 'Sanity',
    rationale: 'Visual Editing with click‑to‑edit overlays; instant, accurate previews inside Studio'
  },
  {
    id: 'editorial-rich',
    name: 'Editorially Rich Website',
    description: 'Complex content structures with strong editorial guardrails',
    bestCms: 'Craft CMS',
    rationale: 'Matrix + Live Preview; predictable costs; excellent authoring experience'
  },
  {
    id: 'js-typescript-shop',
    name: 'JS/TypeScript Development Team',
    description: 'Node.js aligned team wanting OSS control and flexibility',
    bestCms: 'Strapi',
    rationale: 'Node/TS stack; Releases & Scheduling; Cloud/SOC2 available when needed'
  },
  {
    id: 'enterprise-compliance',
    name: 'Enterprise Compliance Focus',
    description: 'Strong governance, security, and compliance requirements',
    bestCms: 'Strapi',
    rationale: 'SOC 2 Type II on Cloud; comprehensive RBAC; enterprise-grade features'
  }
];

export const riskAssessments: RiskAssessment[] = [
  {
    risk: 'Custom Studio work drifts (Sanity)',
    vendor: 'Sanity',
    likelihood: 'Medium',
    impact: 'Medium',
    mitigation: 'Use starter/templates; codify Studio as package; PR rules'
  },
  {
    risk: 'Ops overhead (Craft)',
    vendor: 'Craft CMS',
    likelihood: 'Medium',
    impact: 'Medium',
    mitigation: 'Prefer Craft Cloud; standardize infra; automate patches'
  },
  {
    risk: 'Preview UX gaps (Strapi)',
    vendor: 'Strapi',
    likelihood: 'Medium',
    impact: 'Medium',
    mitigation: 'Invest in Next.js preview, add editorial overlays/components'
  },
  {
    risk: 'Cost sprawl (SaaS tiers)',
    vendor: 'All SaaS',
    likelihood: 'Medium',
    impact: 'Medium',
    mitigation: 'Set usage budgets/alerts; quarterly review'
  }
];

export const dashboardWeights = {
  editorUx: 0.25,
  visualEditingPreview: 0.15,
  modelingFlexibility: 0.15,
  developerExperience: 0.10,
  apiPower: 0.05,
  governanceSecurity: 0.10,
  opsTco: 0.10,
  ecosystemIntegrations: 0.05,
  localizationScheduling: 0.05
};

export const dashboardData: DashboardData = {
  vendors: cmsVendors,
  weights: dashboardWeights,
  lastUpdated: new Date().toISOString()
};