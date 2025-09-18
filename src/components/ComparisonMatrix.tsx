import React, { useState } from 'react';
import { Check, X, Minus, Star, AlertCircle } from 'lucide-react';
import type { CMSVendor } from '../types/cms';

interface ComparisonMatrixProps {
  vendors: CMSVendor[];
  selectedVendors: string[];
  onVendorToggle: (vendorId: string) => void;
}

export const ComparisonMatrix: React.FC<ComparisonMatrixProps> = ({
  vendors,
  selectedVendors,
  onVendorToggle
}) => {
  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['features']));
  
  const compareVendors = vendors.filter(v => selectedVendors.includes(v.id));
  
  if (compareVendors.length === 0) {
    return (
      <div className="bg-white rounded-lg border border-gray-200 p-8 text-center">
        <div className="text-gray-400 mb-4">
          <AlertCircle size={48} className="mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No CMS Selected for Comparison</h3>
        <p className="text-gray-600">
          Select 2-3 CMS options from the table to see a detailed side-by-side comparison.
        </p>
      </div>
    );
  }

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const getValueIcon = (value: any, type: 'boolean' | 'score' | 'text' = 'text') => {
    if (type === 'boolean') {
      return value ? (
        <Check className="w-5 h-5 text-green-600" />
      ) : (
        <X className="w-5 h-5 text-red-400" />
      );
    }
    
    if (type === 'score') {
      const score = typeof value === 'number' ? value : 0;
      if (score >= 4) return <div className="w-2 h-2 bg-green-500 rounded-full" />;
      if (score >= 3) return <div className="w-2 h-2 bg-yellow-500 rounded-full" />;
      if (score >= 2) return <div className="w-2 h-2 bg-orange-500 rounded-full" />;
      return <div className="w-2 h-2 bg-red-500 rounded-full" />;
    }
    
    return null;
  };

  const getCostColor = (cost: string) => {
    if (cost.includes('Low')) return 'text-green-600 bg-green-50';
    if (cost.includes('Mid')) return 'text-yellow-600 bg-yellow-50';
    if (cost.includes('High')) return 'text-red-600 bg-red-50';
    return 'text-gray-600 bg-gray-50';
  };

  const sections = [
    {
      id: 'overview',
      title: 'Overview',
      rows: [
        { label: 'Priority Ranking', key: 'priority', render: (vendor: CMSVendor) => (
          <div className="flex items-center gap-2">
            <Star className={`w-4 h-4 ${vendor.priority <= 3 ? 'text-yellow-500 fill-current' : 'text-gray-400'}`} />
            <span className="font-medium">#{vendor.priority}</span>
          </div>
        )},
        { label: 'Type', key: 'type' },
        { label: 'Hosting', key: 'hosting' },
        { label: 'API Model', key: 'apiModel' },
        { label: 'Overall Score', key: 'totalScore', render: (vendor: CMSVendor) => (
          <div className="flex items-center gap-2">
            <span className="font-semibold text-lg">{vendor.totalScore}</span>
            <span className="text-sm text-gray-500">/100</span>
          </div>
        )}
      ]
    },
    {
      id: 'features',
      title: 'Feature Scores (0-5)',
      rows: [
        { label: 'Editor UX', key: 'features.editorUx', type: 'score' },
        { label: 'Visual Editing', key: 'features.visualEditing', type: 'score' },
        { label: 'Preview Speed', key: 'features.previewSpeed', type: 'score' },
        { label: 'Modeling Flexibility', key: 'features.modelingFlex', type: 'score' },
        { label: 'API Power', key: 'features.apiPower', type: 'score' },
        { label: 'Roles & RBAC', key: 'features.rolesRbac', type: 'score' },
        { label: 'SSO', key: 'features.sso', type: 'score' },
        { label: 'Compliance', key: 'features.compliance', type: 'score' },
        { label: 'Extensibility', key: 'features.extensibility', type: 'score' }
      ]
    },
    {
      id: 'capabilities',
      title: 'Key Capabilities',
      rows: [
        { label: 'SOC 2 Compliant', key: 'metadata.soc2', type: 'boolean' },
        { label: 'SSO Available', key: 'metadata.ssoAvailable', type: 'boolean' },
        { label: 'Live Preview', key: 'metadata.livePreview', type: 'boolean' },
        { label: 'Plugin Marketplace', key: 'metadata.pluginMarket', type: 'boolean' }
      ]
    },
    {
      id: 'migration',
      title: 'Migration & Costs',
      rows: [
        { label: 'Migration Effort', key: 'migration.effort', render: (vendor: CMSVendor) => (
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            vendor.migration.effort === 'Low' ? 'bg-green-100 text-green-800' :
            vendor.migration.effort === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
            'bg-red-100 text-red-800'
          }`}>
            {vendor.migration.effort}
          </span>
        )},
        { label: 'Time Estimate', key: 'migration.timeWeeks', render: (vendor: CMSVendor) => (
          <span className="font-medium">{vendor.migration.timeWeeks} weeks</span>
        )},
        { label: 'Total Cost Est.', key: 'cost.estimatedTotal', render: (vendor: CMSVendor) => (
          <span className={`px-2 py-1 rounded text-sm font-medium ${getCostColor(vendor.cost.estimatedTotal)}`}>
            {vendor.cost.estimatedTotal}
          </span>
        )},
        { label: 'Ops Time', key: 'cost.opsTime', render: (vendor: CMSVendor) => (
          <span className={`px-2 py-1 rounded text-sm font-medium ${getCostColor(vendor.cost.opsTime)}`}>
            {vendor.cost.opsTime}
          </span>
        )}
      ]
    }
  ];

  const getValue = (vendor: CMSVendor, key: string) => {
    const keys = key.split('.');
    let value: any = vendor;
    for (const k of keys) {
      value = value?.[k];
    }
    return value;
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
      {/* Header */}
      <div className="px-4 sm:px-6 py-4 border-b border-gray-200 bg-gray-50">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <h3 className="text-lg font-semibold text-gray-900">Side-by-Side Comparison</h3>
          <div className="text-sm text-gray-600">
            Comparing {compareVendors.length} CMS{compareVendors.length !== 1 ? 'es' : ''}
          </div>
        </div>
      </div>

      {/* Vendor Headers */}
      <div className="overflow-x-auto">
        <div className="grid grid-cols-1 border-b border-gray-200 min-w-max" style={{ 
          gridTemplateColumns: `minmax(150px, 200px) repeat(${compareVendors.length}, minmax(150px, 180px))` 
        }}>
          <div className="px-4 sm:px-6 py-4 bg-gray-50 border-r border-gray-200">
            <span className="font-medium text-gray-900 text-sm sm:text-base">Feature</span>
          </div>
          {compareVendors.map(vendor => (
            <div key={vendor.id} className="px-3 sm:px-4 py-4 bg-gray-50 border-r border-gray-200 last:border-r-0">
              <div className="text-center">
                <div className="flex items-center justify-center gap-1 sm:gap-2 mb-1">
                  {vendor.priority <= 3 && (
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current flex-shrink-0" />
                  )}
                  <h4 className="font-semibold text-gray-900 text-sm sm:text-base truncate">{vendor.name}</h4>
                </div>
                <div className="text-xs text-gray-500 truncate">{vendor.type}</div>
                <button
                  onClick={() => onVendorToggle(vendor.id)}
                  className="mt-2 text-xs text-red-600 hover:text-red-800 px-2 py-1 rounded hover:bg-red-50 transition-colors"
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Content Sections */}
      <div className="divide-y divide-gray-200">
        {sections.map(section => (
          <div key={section.id}>
            {/* Section Header */}
            <button
              onClick={() => toggleSection(section.id)}
              className="w-full px-6 py-3 text-left bg-gray-50 hover:bg-gray-100 transition-colors flex items-center justify-between"
            >
              <span className="font-medium text-gray-900">{section.title}</span>
              <span className="text-gray-400">
                {expandedSections.has(section.id) ? '−' : '+'}
              </span>
            </button>

            {/* Section Rows */}
            {expandedSections.has(section.id) && (
              <div className="overflow-x-auto">
                <div className="divide-y divide-gray-100">
                  {section.rows.map(row => (
                    <div key={row.label} className="grid grid-cols-1 min-w-max" style={{ 
                      gridTemplateColumns: `minmax(150px, 200px) repeat(${compareVendors.length}, minmax(150px, 180px))` 
                    }}>
                      <div className="px-4 sm:px-6 py-3 bg-gray-25 border-r border-gray-200 text-xs sm:text-sm font-medium text-gray-700">
                        {row.label}
                      </div>
                      {compareVendors.map(vendor => {
                        const value = getValue(vendor, row.key);
                        return (
                          <div key={vendor.id} className="px-3 sm:px-4 py-3 border-r border-gray-200 last:border-r-0">
                            <div className="flex items-center gap-1 sm:gap-2 justify-center text-xs sm:text-sm">
                              {row.render ? (
                                row.render(vendor)
                              ) : (
                                <>
                                  {getValueIcon(value, row.type as any)}
                                  <span className={row.type === 'score' ? 'font-medium' : ''}>
                                    {typeof value === 'boolean' ? '' : value}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Highlights Section */}
      <div className="px-4 sm:px-6 py-4 bg-gray-50 border-t border-gray-200">
        <h4 className="font-medium text-gray-900 mb-3">Key Highlights</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4" style={compareVendors.length > 3 ? {} : { 
          gridTemplateColumns: `repeat(${compareVendors.length}, 1fr)` 
        }}>
          {compareVendors.map(vendor => (
            <div key={vendor.id} className="space-y-2 min-w-0">
              <h5 className="font-medium text-gray-800 text-sm sm:text-base truncate">{vendor.name}</h5>
              <ul className="space-y-1">
                {vendor.metadata.highlights.slice(0, 3).map((highlight, index) => (
                  <li key={index} className="text-xs text-gray-600 flex items-start gap-1">
                    <span className="text-blue-500 flex-shrink-0 mt-0.5">•</span>
                    <span className="break-words">{highlight}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-2 pt-2 border-t border-gray-200">
                <p className="text-xs text-gray-500 break-words">
                  <strong>Best for:</strong> {vendor.metadata.bestFor}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};