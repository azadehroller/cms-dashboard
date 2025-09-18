import React, { useState, useEffect } from 'react';
import { 
  BarChart, 
  Settings, 
  Download, 
  Plus, 
  Filter,
  TrendingUp,
  Users,
  Clock,
  DollarSign,
  AlertTriangle,
  Upload,
  FileText
} from 'lucide-react';
import { ScoreChart } from './ScoreChart';
import { CMSTable } from './CMSTable';
import { CMSEditor } from './CMSEditor';
import { MigrationTimeline } from './MigrationTimeline';
import { ComparisonMatrix } from './ComparisonMatrix';
import { RiskMatrix } from './RiskMatrix';
import { ComprehensiveAnalysis } from './ComprehensiveAnalysis';
import { dashboardData } from '../data/cmsData';
import type { CMSVendor } from '../types/cms';

export const Dashboard: React.FC = () => {
  const [vendors, setVendors] = useState<CMSVendor[]>(dashboardData.vendors);
  const [editingVendor, setEditingVendor] = useState<CMSVendor | null>(null);
  const [selectedVendor, setSelectedVendor] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'overview' | 'analysis' | 'comparison' | 'migration' | 'risks' | 'table'>('overview');
  const [chartType, setChartType] = useState<'radar' | 'bar'>('radar');
  const [showOnlyTop3, setShowOnlyTop3] = useState(true);
  const [compareVendors, setCompareVendors] = useState<string[]>(['sanity', 'craft', 'strapi']);
  const [notification, setNotification] = useState<{message: string, type: 'success' | 'error'} | null>(null);

  // Notification helper
  const showNotification = (message: string, type: 'success' | 'error') => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  // Auto-save to localStorage with version check
  useEffect(() => {
    const savedData = localStorage.getItem('cms-dashboard-data');
    if (savedData) {
      try {
        const parsed = JSON.parse(savedData);
        // Check if saved data version matches current version
        if (parsed.version === '2.0' && parsed.vendors) {
          setVendors(parsed.vendors);
        } else {
          // Clear old data and use fresh data
          localStorage.removeItem('cms-dashboard-data');
          setVendors(dashboardData.vendors);
        }
      } catch (error) {
        console.error('Failed to load saved data:', error);
        localStorage.removeItem('cms-dashboard-data');
        setVendors(dashboardData.vendors);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('cms-dashboard-data', JSON.stringify({ 
      vendors, 
      lastUpdated: new Date().toISOString(),
      version: '2.0'
    }));
  }, [vendors]);

  const handleSaveVendor = (updatedVendor: CMSVendor) => {
    setVendors(prev => prev.map(v => v.id === updatedVendor.id ? updatedVendor : v));
    setEditingVendor(null);
  };

  const handleDeleteVendor = (vendorId: string) => {
    setVendors(prev => prev.filter(v => v.id !== vendorId));
    setEditingVendor(null);
  };

  const handleAddVendor = () => {
    const newVendor: CMSVendor = {
      id: `new-${Date.now()}`,
      name: 'New CMS',
      type: 'Headless SaaS',
      hosting: 'SaaS',
      apiModel: 'REST/GraphQL',
      priority: vendors.length + 1,
      features: {
        editorUx: 3,
        visualEditing: 3,
        previewSpeed: 3,
        modelingFlex: 3,
        apiPower: 3,
        rolesRbac: 3,
        sso: 3,
        compliance: 3,
        localization: 3,
        releasesScheduling: 3,
        seoTooling: 3,
        perfCdn: 3,
        extensibility: 3
      },
      weightedScores: {
        editorUx: 3,
        visualEditingPreview: 3,
        modelingFlexibility: 3,
        developerExperience: 3,
        apiPower: 3,
        governanceSecurity: 3,
        opsTco: 3,
        ecosystemIntegrations: 3,
        localizationScheduling: 3
      },
      totalScore: 60,
      cost: {
        licenseSaas: 'Mid',
        hosting: 'Mid',
        pluginsApps: 'Mid',
        opsTime: 'Mid',
        estimatedTotal: 'Mid'
      },
      migration: {
        effort: 'Medium',
        timeWeeks: 6,
        complexity: 'Standard setup and configuration',
        risks: ['Integration complexity'],
        steps: ['Planning', 'Setup', 'Migration', 'Testing', 'Launch']
      },
      metadata: {
        soc2: false,
        ssoAvailable: false,
        livePreview: false,
        pluginMarket: false,
        notes: 'New CMS option for evaluation',
        bestFor: 'To be determined',
        highlights: ['Feature 1', 'Feature 2']
      }
    };
    setVendors(prev => [...prev, newVendor]);
    setEditingVendor(newVendor);
  };

  // File-based persistence functions
  const exportDataAsJson = () => {
    const exportData = {
      vendors,
      version: '2.0',
      exported: new Date().toISOString(),
      metadata: {
        totalVendors: vendors.length,
        topChoices: vendors.filter(v => v.priority <= 3).map(v => v.name),
        avgScore: Math.round(vendors.reduce((sum, v) => sum + v.totalScore, 0) / vendors.length)
      }
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cms-evaluation-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification('JSON data exported successfully!', 'success');
  };

  const exportDataAsMarkdown = () => {
    const sortedVendors = [...vendors].sort((a, b) => a.priority - b.priority);
    const date = new Date().toLocaleDateString();
    
    const markdown = `# CMS Evaluation Report

*Generated on ${date}*

## Executive Summary

- **Total CMS Platforms Evaluated**: ${vendors.length}
- **Average Score**: ${Math.round(vendors.reduce((sum, v) => sum + v.totalScore, 0) / vendors.length)}/100
- **Top 3 Choices**: ${sortedVendors.slice(0, 3).map(v => v.name).join(', ')}

## Detailed Analysis

${sortedVendors.map(vendor => `### ${vendor.priority}. ${vendor.name} (${vendor.totalScore}/100)

**Type**: ${vendor.type}  
**Hosting**: ${vendor.hosting}  
**API Model**: ${vendor.apiModel}

**Migration Timeline**: ${vendor.migration.timeWeeks} weeks (${vendor.migration.effort} effort)

**Key Strengths**:
${vendor.metadata.highlights.map(h => `- ${h}`).join('\n')}

**Best For**: ${vendor.metadata.bestFor}

**Migration Steps**:
${vendor.migration.steps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

**Risks**:
${vendor.migration.risks.map(risk => `⚠️ ${risk}`).join('\n')}

**Estimated Cost**: ${vendor.cost.estimatedTotal}

---
`).join('\n')}

## Migration Comparison

| CMS | Score | Migration Time | Effort | Est. Cost |
|-----|-------|----------------|--------|-----------|
${sortedVendors.map(v => `| ${v.name} | ${v.totalScore}/100 | ${v.migration.timeWeeks}w | ${v.migration.effort} | ${v.cost.estimatedTotal} |`).join('\n')}

## Recommendations

Based on this analysis, the recommended priority order is:

${sortedVendors.slice(0, 3).map((v, i) => `${i + 1}. **${v.name}** - ${v.metadata.bestFor}`).join('\n')}
`;

    const dataBlob = new Blob([markdown], { type: 'text/markdown' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `cms-evaluation-report-${new Date().toISOString().split('T')[0]}.md`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    showNotification('Markdown report exported successfully!', 'success');
  };

  const importDataFromJson = () => {
    const input = document.createElement('input');
    input.type = 'file';
    input.accept = '.json';
    input.onchange = (event) => {
      const file = (event.target as HTMLInputElement).files?.[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const importedData = JSON.parse(content);
          
          // Validate the imported data
          if (importedData.vendors && Array.isArray(importedData.vendors)) {
            // Update localStorage with imported data
            const dataToSave = {
              vendors: importedData.vendors,
              version: '2.0',
              lastUpdated: new Date().toISOString()
            };
            localStorage.setItem('cms-dashboard-data', JSON.stringify(dataToSave));
            
            // Update state
            setVendors(importedData.vendors);
            showNotification(`Successfully imported ${importedData.vendors.length} CMS platforms!`, 'success');
          } else {
            showNotification('Invalid file format. Please select a valid CMS dashboard JSON file.', 'error');
          }
        } catch (error) {
          console.error('Import error:', error);
          showNotification('Error reading file. Please check the file format.', 'error');
        }
      };
      reader.readAsText(file);
    };
    document.body.appendChild(input);
    input.click();
    document.body.removeChild(input);
  };

  // Keep the old function name for backward compatibility
  const exportData = exportDataAsJson;

  const filteredVendors = showOnlyTop3 ? 
    vendors.sort((a, b) => a.priority - b.priority).slice(0, 3) :
    vendors;

  const topVendors = vendors.sort((a, b) => a.priority - b.priority).slice(0, 3);
  const avgMigrationTime = Math.round(topVendors.reduce((sum, v) => sum + v.migration.timeWeeks, 0) / topVendors.length);
  const avgScore = Math.round(topVendors.reduce((sum, v) => sum + v.totalScore, 0) / topVendors.length);

  const handleVendorToggle = (vendorId: string) => {
    setCompareVendors(prev => {
      if (prev.includes(vendorId)) {
        return prev.filter(id => id !== vendorId);
      } else {
        return [...prev, vendorId];
      }
    });
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: TrendingUp },
    { id: 'analysis', label: 'Analysis', icon: BarChart },
    { id: 'comparison', label: 'Compare', icon: Filter },
    { id: 'migration', label: 'Migration', icon: Clock },
    { id: 'risks', label: 'Risks', icon: AlertTriangle },
    { id: 'table', label: 'Data Table', icon: Settings }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 min-h-16">
            <div className="flex items-center gap-2 sm:gap-3 min-w-0 flex-1">
              <div className="p-1.5 sm:p-2 bg-blue-600 rounded-lg flex-shrink-0" aria-hidden="true">
                <BarChart className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
              </div>
              <div className="min-w-0 flex-1">
                <h1 className="text-lg sm:text-xl font-semibold text-gray-900 truncate">CMS Evaluation Dashboard</h1>
                <p className="text-xs sm:text-sm text-gray-500 truncate">HubSpot Migration Analysis & Decision Support</p>
              </div>
            </div>
            <div className="flex items-center gap-1 sm:gap-2 flex-shrink-0">
              {/* Export Dropdown */}
              <div className="relative group">
                <button
                  className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                  aria-label="Export options"
                >
                  <Download size={16} aria-hidden="true" />
                  <span className="hidden md:inline">Export</span>
                  <span className="text-xs">▼</span>
                </button>
                <div className="absolute right-0 top-full mt-1 w-48 bg-white border border-gray-200 rounded-lg shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <button
                    onClick={exportDataAsJson}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 rounded-t-lg"
                  >
                    <Download size={14} />
                    Export JSON
                  </button>
                  <button
                    onClick={exportDataAsMarkdown}
                    className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center gap-2 rounded-b-lg"
                  >
                    <FileText size={14} />
                    Export Report (MD)
                  </button>
                </div>
              </div>
              
              {/* Import Button */}
              <button
                onClick={importDataFromJson}
                className="hidden sm:flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Import dashboard data from JSON"
              >
                <Upload size={16} aria-hidden="true" />
                <span className="hidden md:inline">Import</span>
              </button>
              
              {/* Mobile Export/Import */}
              <button
                onClick={exportDataAsJson}
                className="sm:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Export dashboard data as JSON"
              >
                <Download size={16} aria-hidden="true" />
              </button>
              <button
                onClick={importDataFromJson}
                className="sm:hidden p-2 text-gray-700 hover:bg-gray-100 rounded-lg transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Import dashboard data"
              >
                <Upload size={16} aria-hidden="true" />
              </button>
              
              <button
                onClick={handleAddVendor}
                className="flex items-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                aria-label="Add new CMS for evaluation"
              >
                <Plus size={16} aria-hidden="true" />
                <span className="hidden sm:inline">Add CMS</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-2 sm:space-x-4 lg:space-x-8 overflow-x-auto scrollbar-hide">
            {tabs.map(tab => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`flex items-center gap-1 sm:gap-2 py-3 sm:py-4 px-2 sm:px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  <Icon size={14} className="sm:w-4 sm:h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                  <span className="sm:hidden">{tab.label.split(' ')[0]}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Notification Toast */}
      {notification && (
        <div className={`fixed top-4 right-4 z-50 p-4 rounded-lg shadow-lg border-l-4 transition-all duration-300 ${
          notification.type === 'success' 
            ? 'bg-green-50 border-green-500 text-green-800' 
            : 'bg-red-50 border-red-500 text-red-800'
        }`}>
          <div className="flex items-center gap-2">
            {notification.type === 'success' ? (
              <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center">
                <span className="text-white text-xs">✓</span>
              </div>
            ) : (
              <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
                <span className="text-white text-xs">×</span>
              </div>
            )}
            <span className="font-medium">{notification.message}</span>
            <button 
              onClick={() => setNotification(null)}
              className="ml-2 text-gray-400 hover:text-gray-600"
            >
              ×
            </button>
          </div>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-gray-900">{avgScore}</div>
                    <div className="text-sm text-gray-500">Avg Top 3 Score</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-green-100 rounded-lg">
                    <Clock className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-gray-900">{avgMigrationTime}w</div>
                    <div className="text-sm text-gray-500">Avg Migration</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-100 rounded-lg">
                    <Users className="w-5 h-5 text-yellow-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-gray-900">{topVendors.filter(v => v.metadata.ssoAvailable).length}</div>
                    <div className="text-sm text-gray-500">Enterprise Ready</div>
                  </div>
                </div>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-100 rounded-lg">
                    <DollarSign className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-2xl font-semibold text-gray-900">
                      {topVendors.filter(v => v.cost.estimatedTotal.includes('Low')).length}
                    </div>
                    <div className="text-sm text-gray-500">Cost Effective</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Priority CMS Cards */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Top 3 Priority Choices</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {topVendors.map((vendor, index) => (
                  <div key={vendor.id} className={`bg-white rounded-lg shadow-sm border-2 ${
                    index === 0 ? 'border-yellow-400' : index === 1 ? 'border-gray-400' : 'border-orange-400'
                  } p-6`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                        index === 0 ? 'bg-yellow-500' : index === 1 ? 'bg-gray-500' : 'bg-orange-500'
                      }`}>
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900">{vendor.name}</h3>
                    </div>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Overall Score</span>
                        <span className="font-medium text-gray-900">{vendor.totalScore}/100</span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Migration</span>
                        <span className={`px-2 py-1 rounded text-xs font-medium ${
                          vendor.migration.effort === 'Low' ? 'bg-green-100 text-green-800' :
                          vendor.migration.effort === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        }`}>
                          {vendor.migration.effort} ({vendor.migration.timeWeeks}w)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-gray-600">Total Cost</span>
                        <span className="font-medium text-gray-900">{vendor.cost.estimatedTotal}</span>
                      </div>
                    </div>
                    <div className="mt-4 pt-4 border-t border-gray-200">
                      <p className="text-sm text-gray-600 mb-2">Best for:</p>
                      <p className="text-sm text-gray-800">{vendor.metadata.bestFor}</p>
                    </div>
                    <button
                      onClick={() => setEditingVendor(vendor)}
                      className="mt-4 w-full px-3 py-2 text-sm text-blue-600 border border-blue-300 rounded-lg hover:bg-blue-50 transition-colors"
                    >
                      Edit Details
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Chart */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Feature Comparison Overview</h2>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setChartType('radar')}
                    className={`px-3 py-1 text-sm rounded ${
                      chartType === 'radar' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Radar
                  </button>
                  <button
                    onClick={() => setChartType('bar')}
                    className={`px-3 py-1 text-sm rounded ${
                      chartType === 'bar' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Bar
                  </button>
                </div>
              </div>
              <ScoreChart 
                vendors={topVendors} 
                chartType={chartType}
                selectedVendors={topVendors.map(v => v.id)}
              />
            </div>
          </div>
        )}

        {/* Analysis Tab */}
        {activeTab === 'analysis' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Comprehensive CMS Analysis</h2>
              <div className="text-sm text-gray-500">
                Complete evaluation of {vendors.length} platforms with strategic insights
              </div>
            </div>
            <ComprehensiveAnalysis vendors={vendors} />
          </div>
        )}

        {/* Comparison Tab */}
        {activeTab === 'comparison' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">CMS Comparison</h2>
              <div className="flex items-center gap-4">
                <div className="text-sm text-gray-600">
                  Select CMS options to compare side-by-side
                </div>
              </div>
            </div>
            
            {/* Vendor Selection */}
            <div className="bg-white p-4 rounded-lg border border-gray-200">
              <h3 className="text-sm font-medium text-gray-700 mb-3">Select CMS to Compare:</h3>
              <div className="flex flex-wrap gap-2">
                {vendors.sort((a, b) => a.priority - b.priority).map(vendor => (
                  <button
                    key={vendor.id}
                    onClick={() => handleVendorToggle(vendor.id)}
                    className={`px-3 py-1 text-sm rounded-full border transition-colors ${
                      compareVendors.includes(vendor.id)
                        ? 'bg-blue-100 text-blue-800 border-blue-300'
                        : 'bg-gray-100 text-gray-700 border-gray-300 hover:bg-gray-200'
                    }`}
                  >
                    {vendor.name}
                    {vendor.priority <= 3 && <span className="ml-1 text-yellow-500">★</span>}
                  </button>
                ))}
              </div>
            </div>

            <ComparisonMatrix 
              vendors={vendors}
              selectedVendors={compareVendors}
              onVendorToggle={handleVendorToggle}
            />

            {/* Chart View */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Visual Comparison</h3>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setChartType('radar')}
                    className={`px-3 py-1 text-sm rounded ${
                      chartType === 'radar' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Radar
                  </button>
                  <button
                    onClick={() => setChartType('bar')}
                    className={`px-3 py-1 text-sm rounded ${
                      chartType === 'bar' ? 'bg-blue-100 text-blue-700' : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    Bar
                  </button>
                </div>
              </div>
              <ScoreChart 
                vendors={vendors.filter(v => compareVendors.includes(v.id))} 
                chartType={chartType}
                selectedVendors={compareVendors}
              />
            </div>
          </div>
        )}

        {/* Migration Tab */}
        {activeTab === 'migration' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Migration Planning</h2>
              <div className="text-sm text-gray-500">
                Detailed migration roadmaps for top CMS options
              </div>
            </div>
            <MigrationTimeline vendors={vendors} selectedVendor={selectedVendor} />
          </div>
        )}

        {/* Risks Tab */}
        {activeTab === 'risks' && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Risk Assessment</h2>
              <div className="text-sm text-gray-500">
                Migration and operational risk analysis
              </div>
            </div>
            <RiskMatrix vendors={vendors} selectedVendor={selectedVendor} />
          </div>
        )}

        {/* Table Tab */}
        {activeTab === 'table' && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <h2 className="text-lg font-semibold text-gray-900">Detailed CMS Comparison</h2>
              <div className="text-sm text-gray-500">
                Click any row to focus on that CMS
              </div>
            </div>
            
            {/* Data Persistence Info */}
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-start gap-3">
                <div className="p-1 bg-blue-100 rounded">
                  <FileText className="w-4 h-4 text-blue-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-medium text-blue-900 mb-1">Data Persistence & Backup</h3>
                  <p className="text-sm text-blue-700 mb-2">
                    Your edits are automatically saved to browser storage and can be exported for permanent backup.
                  </p>
                  <div className="flex flex-wrap gap-2">
                    <button
                      onClick={exportDataAsJson}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs hover:bg-blue-200 transition-colors"
                    >
                      <Download size={12} />
                      Backup as JSON
                    </button>
                    <button
                      onClick={exportDataAsMarkdown}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs hover:bg-blue-200 transition-colors"
                    >
                      <FileText size={12} />
                      Export Report
                    </button>
                    <button
                      onClick={importDataFromJson}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-700 rounded-md text-xs hover:bg-blue-200 transition-colors"
                    >
                      <Upload size={12} />
                      Restore Backup
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <CMSTable
              vendors={vendors}
              onEdit={setEditingVendor}
              onSelect={setSelectedVendor}
              selectedVendor={selectedVendor}
            />
          </div>
        )}
      </div>

      {/* Editor Modal */}
      {editingVendor && (
        <CMSEditor
          vendor={editingVendor}
          onSave={handleSaveVendor}
          onCancel={() => setEditingVendor(null)}
          onDelete={editingVendor.id.startsWith('new-') ? handleDeleteVendor : undefined}
        />
      )}
    </div>
  );
};

export default Dashboard;