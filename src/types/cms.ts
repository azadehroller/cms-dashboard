export interface CMSVendor {
  id: string;
  name: string;
  type: 'Headless SaaS' | 'Hybrid' | 'Enterprise DXP' | 'Blog-first' | 'Coupled/Headless' | 'Headless OSS';
  hosting: 'SaaS' | 'Self-host' | 'SaaS/Self' | 'SaaS/Managed' | 'Self-host/Cloud';
  apiModel: string;
  priority: number; // 1 = highest (Sanity), 2 = second (Craft), 3 = third (Strapi), 4+ = others
  
  // Feature scores (0-5)
  features: {
    editorUx: number;
    visualEditing: number;
    previewSpeed: number;
    modelingFlex: number;
    apiPower: number;
    rolesRbac: number;
    sso: number;
    compliance: number;
    localization: number;
    releasesScheduling: number;
    seoTooling: number;
    perfCdn: number;
    extensibility: number;
  };
  
  // Weighted scoring
  weightedScores: {
    editorUx: number; // weight: 0.25
    visualEditingPreview: number; // weight: 0.15
    modelingFlexibility: number; // weight: 0.15
    developerExperience: number; // weight: 0.10
    apiPower: number; // weight: 0.05
    governanceSecurity: number; // weight: 0.10
    opsTco: number; // weight: 0.10
    ecosystemIntegrations: number; // weight: 0.05
    localizationScheduling: number; // weight: 0.05
  };
  
  totalScore: number; // Weighted total out of 100
  
  // Cost structure
  cost: {
    licenseSaas: 'Low' | 'Mid' | 'High' | 'Very High';
    hosting: 'Low' | 'Mid' | 'High' | 'Very High';
    pluginsApps: 'Low' | 'Mid' | 'High' | 'Very High';
    opsTime: 'Low' | 'Mid' | 'High' | 'Very High';
    estimatedTotal: 'Low' | 'Low-Mid' | 'Mid' | 'Mid-High' | 'High' | 'Very High';
  };
  
  // Migration details
  migration: {
    effort: 'Low' | 'Medium' | 'High';
    timeWeeks: number;
    complexity: string;
    risks: string[];
    steps: string[];
  };
  
  // Additional metadata
  metadata: {
    soc2: boolean;
    ssoAvailable: boolean;
    livePreview: boolean;
    pluginMarket: boolean;
    notes: string;
    bestFor: string;
    highlights: string[];
  };
}

export interface DashboardData {
  vendors: CMSVendor[];
  weights: {
    editorUx: number;
    visualEditingPreview: number;
    modelingFlexibility: number;
    developerExperience: number;
    apiPower: number;
    governanceSecurity: number;
    opsTco: number;
    ecosystemIntegrations: number;
    localizationScheduling: number;
  };
  lastUpdated: string;
}

export interface MigrationScenario {
  id: string;
  name: string;
  description: string;
  bestCms: string;
  rationale: string;
}

export interface RiskAssessment {
  risk: string;
  vendor: string;
  likelihood: 'Low' | 'Medium' | 'High';
  impact: 'Low' | 'Medium' | 'High';
  mitigation: string;
}