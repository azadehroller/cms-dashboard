import type { CMSVendor, DashboardData, MigrationScenario, RiskAssessment } from '../types/cms';

export const cmsVendors: CMSVendor[] = [
  // Priority 1: Sanity (Most loved)
  {
    id: 'sanity',
    name: 'Sanity',
    type: 'Headless SaaS',
    hosting: 'SaaS/Self',
    apiModel: 'GROQ/GraphQL/REST',
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
  
  // WordPress - The Monolithic Veteran (from comprehensive analysis)
  {
    id: 'wordpress',
    name: 'WordPress',
    type: 'Monolithic (Coupled)',
    hosting: 'Self-host',
    apiModel: 'REST/WPGraphQL',
    priority: 6,
    features: {
      editorUx: 3,
      visualEditing: 2,
      previewSpeed: 3,
      modelingFlex: 3,
      apiPower: 3,
      rolesRbac: 3,
      sso: 4,
      compliance: 3,
      localization: 3,
      releasesScheduling: 3,
      seoTooling: 5,
      perfCdn: 3,
      extensibility: 5
    },
    weightedScores: {
      editorUx: 3,
      visualEditingPreview: 2,
      modelingFlexibility: 3,
      developerExperience: 3,
      apiPower: 3,
      governanceSecurity: 3,
      opsTco: 4,
      ecosystemIntegrations: 5,
      localizationScheduling: 3
    },
    totalScore: 62,
    cost: {
      licenseSaas: 'Low',
      hosting: 'Low',
      pluginsApps: 'Mid',
      opsTime: 'Mid',
      estimatedTotal: 'Low-Mid'
    },
    migration: {
      effort: 'Low',
      timeWeeks: 4,
      complexity: 'Straightforward with numerous importer plugins for CSV/XML blog migration',
      risks: ['Security management overhead', 'Plugin conflicts', 'Performance optimization needed'],
      steps: [
        'Install WordPress and required plugins (ACF, SEO)',
        'Import content via CSV/XML importers', 
        'Configure theme and customize design',
        'Set up security and backup systems',
        'Launch with ongoing maintenance plan'
      ]
    },
    metadata: {
      soc2: false,
      ssoAvailable: true,
      livePreview: false,
      pluginMarket: true,
      notes: 'Monolithic veteran with vast plugin ecosystem but architectural rigidity. Most targeted CMS globally.',
      bestFor: 'Content-heavy websites, blogs, small-to-medium businesses where ease of use and plugin ecosystem are paramount',
      highlights: [
        'Unparalleled plugin ecosystem',
        'Low barrier to entry',
        'Vast community support',
        'Excellent SEO plugins (AIOSEO, Rank Math)'
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
  },

  // Ghost - The Publishing Platform
  {
    id: 'ghost',
    name: 'Ghost',
    type: 'Blog-first',
    hosting: 'Self-host/SaaS',
    apiModel: 'JSON API',
    priority: 7,
    features: {
      editorUx: 4,
      visualEditing: 2,
      previewSpeed: 4,
      modelingFlex: 2,
      apiPower: 2,
      rolesRbac: 3,
      sso: 3,
      compliance: 2,
      localization: 1,
      releasesScheduling: 2,
      seoTooling: 3,
      perfCdn: 4,
      extensibility: 2
    },
    weightedScores: {
      editorUx: 4,
      visualEditingPreview: 2,
      modelingFlexibility: 2,
      developerExperience: 2,
      apiPower: 2,
      governanceSecurity: 2,
      opsTco: 3,
      ecosystemIntegrations: 2,
      localizationScheduling: 2
    },
    totalScore: 48,
    cost: {
      licenseSaas: 'Low',
      hosting: 'Low',
      pluginsApps: 'Low',
      opsTime: 'Low',
      estimatedTotal: 'Low'
    },
    migration: {
      effort: 'Low',
      timeWeeks: 3,
      complexity: 'Simple blog-focused migration with content import tools',
      risks: ['Limited content modeling flexibility'],
      steps: [
        'Set up Ghost installation or Ghost Pro account',
        'Import blog content from HubSpot',
        'Configure theme and basic customizations',
        'Set up newsletter and membership features',
        'Launch and configure SEO settings'
      ]
    },
    metadata: {
      soc2: false,
      ssoAvailable: false,
      livePreview: false,
      pluginMarket: false,
      notes: 'Distraction-free publishing platform with built-in memberships and newsletters',
      bestFor: 'Publishers, newsletters, and content-first teams prioritizing simplicity and monetization',
      highlights: [
        'Distraction-free markdown editor',
        'Built-in membership and subscription features',
        'Strong SEO optimization tools',
        'Focus on publishing and newsletters'
      ]
    }
  },

  // Webflow CMS - The Visual Builder
  {
    id: 'webflow',
    name: 'Webflow CMS',
    type: 'Coupled/Headless-lite',
    hosting: 'SaaS',
    apiModel: 'REST/GraphQL (limited)',
    priority: 8,
    features: {
      editorUx: 4,
      visualEditing: 4,
      previewSpeed: 4,
      modelingFlex: 2,
      apiPower: 2,
      rolesRbac: 3,
      sso: 3,
      compliance: 2,
      localization: 2,
      releasesScheduling: 2,
      seoTooling: 3,
      perfCdn: 4,
      extensibility: 3
    },
    weightedScores: {
      editorUx: 4,
      visualEditingPreview: 4,
      modelingFlexibility: 2,
      developerExperience: 2,
      apiPower: 2,
      governanceSecurity: 3,
      opsTco: 3,
      ecosystemIntegrations: 3,
      localizationScheduling: 2
    },
    totalScore: 56,
    cost: {
      licenseSaas: 'Mid',
      hosting: 'Mid',
      pluginsApps: 'Low',
      opsTime: 'Low',
      estimatedTotal: 'Low-Mid'
    },
    migration: {
      effort: 'Medium',
      timeWeeks: 5,
      complexity: 'Visual design-first approach requires rebuilding site structure in Webflow',
      risks: ['Platform lock-in', 'Limited developer flexibility'],
      steps: [
        'Rebuild site design and structure in Webflow Designer',
        'Set up CMS collections and content structure',
        'Import and format content manually',
        'Configure interactions and responsive design',
        'Launch on Webflow hosting'
      ]
    },
    metadata: {
      soc2: false,
      ssoAvailable: true,
      livePreview: true,
      pluginMarket: true,
      notes: 'Visual no-code builder with CMS collections, design-first approach',
      bestFor: 'Marketing websites, landing pages, design-driven teams without heavy development needs',
      highlights: [
        'WYSIWYG visual design interface',
        'Clean, semantic code generation',
        'Strong visual editor for marketers',
        'Built-in hosting and CDN'
      ]
    }
  },

  // Payload CMS - The TypeScript-First Platform
  {
    id: 'payload',
    name: 'Payload CMS',
    type: 'Headless OSS',
    hosting: 'Self-host',
    apiModel: 'REST/GraphQL',
    priority: 9,
    features: {
      editorUx: 3,
      visualEditing: 2,
      previewSpeed: 3,
      modelingFlex: 5,
      apiPower: 5,
      rolesRbac: 4,
      sso: 3,
      compliance: 4,
      localization: 3,
      releasesScheduling: 3,
      seoTooling: 2,
      perfCdn: 3,
      extensibility: 5
    },
    weightedScores: {
      editorUx: 3,
      visualEditingPreview: 2,
      modelingFlexibility: 5,
      developerExperience: 5,
      apiPower: 5,
      governanceSecurity: 4,
      opsTco: 3,
      ecosystemIntegrations: 4,
      localizationScheduling: 3
    },
    totalScore: 74,
    cost: {
      licenseSaas: 'Low',
      hosting: 'Mid',
      pluginsApps: 'Low',
      opsTime: 'High',
      estimatedTotal: 'Mid'
    },
    migration: {
      effort: 'High',
      timeWeeks: 10,
      complexity: 'Code-first approach requires significant developer involvement and TypeScript knowledge',
      risks: ['High technical complexity', 'Limited non-technical editor experience'],
      steps: [
        'Set up Node.js/TypeScript development environment',
        'Define content schemas and models in TypeScript',
        'Build custom admin UI components as needed',
        'Implement content migration scripts',
        'Deploy and configure production infrastructure'
      ]
    },
    metadata: {
      soc2: false,
      ssoAvailable: false,
      livePreview: false,
      pluginMarket: false,
      notes: 'TypeScript-first headless CMS with code-defined schemas and auto-generated APIs',
      bestFor: 'Developer-heavy teams, compliance-driven projects requiring full control',
      highlights: [
        'TypeScript-first architecture',
        'Code-defined schemas version controlled',
        'Auto-generated REST and GraphQL APIs',
        'Full control over hosting and data'
      ]
    }
  },

  // Directus - The Database-First Platform
  {
    id: 'directus',
    name: 'Directus',
    type: 'Headless OSS',
    hosting: 'Self-host/Cloud',
    apiModel: 'REST/GraphQL',
    priority: 10,
    features: {
      editorUx: 4,
      visualEditing: 2,
      previewSpeed: 3,
      modelingFlex: 4,
      apiPower: 4,
      rolesRbac: 5,
      sso: 4,
      compliance: 4,
      localization: 3,
      releasesScheduling: 3,
      seoTooling: 2,
      perfCdn: 3,
      extensibility: 4
    },
    weightedScores: {
      editorUx: 4,
      visualEditingPreview: 2,
      modelingFlexibility: 4,
      developerExperience: 4,
      apiPower: 4,
      governanceSecurity: 5,
      opsTco: 3,
      ecosystemIntegrations: 4,
      localizationScheduling: 3
    },
    totalScore: 72,
    cost: {
      licenseSaas: 'Low',
      hosting: 'Mid',
      pluginsApps: 'Low',
      opsTime: 'Mid',
      estimatedTotal: 'Mid'
    },
    migration: {
      effort: 'Medium',
      timeWeeks: 7,
      complexity: 'Database-first approach requires SQL schema design and data migration planning',
      risks: ['Database schema complexity', 'SQL knowledge requirements'],
      steps: [
        'Design and create SQL database schema',
        'Install and configure Directus instance',
        'Connect Directus to existing database or migrate data',
        'Configure user roles and permissions',
        'Build frontend applications using generated APIs'
      ]
    },
    metadata: {
      soc2: false,
      ssoAvailable: true,
      livePreview: false,
      pluginMarket: false,
      notes: 'Database-first headless CMS that turns any SQL database into APIs with auto-generated admin UI',
      bestFor: 'Data-driven applications needing SQL-first integration with existing databases',
      highlights: [
        'Works directly with SQL database schema',
        'Auto-generated admin UI from database',
        'Granular role-based permissions',
        'Instant REST and GraphQL APIs'
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
  },
  {
    id: 'blog-publishing',
    name: 'Content Publishing & Newsletters',
    description: 'Blog-focused publishing with membership and newsletter features',
    bestCms: 'Ghost',
    rationale: 'Distraction-free editor; built-in memberships, newsletters, and monetization'
  },
  {
    id: 'visual-design',
    name: 'Visual Design-First Websites',
    description: 'Marketing sites prioritizing visual design and rapid iteration',
    bestCms: 'Webflow CMS',
    rationale: 'WYSIWYG visual builder; clean code generation; designer-friendly workflow'
  },
  {
    id: 'database-integration',
    name: 'Existing Database Integration',
    description: 'Working with existing SQL databases and data-driven applications',
    bestCms: 'Directus',
    rationale: 'Database-first approach; instant APIs from SQL schema; strong permissions'
  },
  {
    id: 'developer-control',
    name: 'Maximum Developer Control',
    description: 'Code-first approach with TypeScript and version-controlled schemas',
    bestCms: 'Payload CMS',
    rationale: 'TypeScript-first; schemas as code; complete customization and control'
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
  },
  {
    risk: 'Security vulnerability management (WordPress)',
    vendor: 'WordPress',
    likelihood: 'High',
    impact: 'High',
    mitigation: 'Implement automated security scanning; maintain regular updates; use security plugins'
  },
  {
    risk: 'Limited content modeling (Ghost)',
    vendor: 'Ghost',
    likelihood: 'High',
    impact: 'Medium',
    mitigation: 'Evaluate content requirements against Ghost\'s blog-focused model before commitment'
  },
  {
    risk: 'Platform lock-in (Webflow)',
    vendor: 'Webflow CMS',
    likelihood: 'High',
    impact: 'High',
    mitigation: 'Plan export strategy; consider hybrid approach with external content management'
  },
  {
    risk: 'Technical complexity (Payload)',
    vendor: 'Payload CMS',
    likelihood: 'Medium',
    impact: 'High',
    mitigation: 'Ensure team has strong TypeScript/Node.js skills; plan for extended development timeline'
  },
  {
    risk: 'Database schema management (Directus)',
    vendor: 'Directus',
    likelihood: 'Medium',
    impact: 'Medium',
    mitigation: 'Establish clear database change management processes; document schema evolution'
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