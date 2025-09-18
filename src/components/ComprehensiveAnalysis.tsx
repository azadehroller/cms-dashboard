import React from 'react';
import { TrendingUp, Shield, Code, Users, Zap, Globe } from 'lucide-react';
import type { CMSVendor } from '../types/cms';

interface ComprehensiveAnalysisProps {
  vendors: CMSVendor[];
}

export const ComprehensiveAnalysis: React.FC<ComprehensiveAnalysisProps> = ({ vendors }) => {
  const architectureGroups = {
    'Headless SaaS': vendors.filter(v => v.type === 'Headless SaaS'),
    'Hybrid': vendors.filter(v => v.type === 'Hybrid'),
    'Headless OSS': vendors.filter(v => v.type === 'Headless OSS'),
    'Monolithic': vendors.filter(v => v.type.includes('Monolithic') || v.type.includes('Coupled')),
    'Blog-first': vendors.filter(v => v.type === 'Blog-first'),
  };

  const hostingGroups = {
    'SaaS Managed': vendors.filter(v => v.hosting === 'SaaS'),
    'Self-Hosted': vendors.filter(v => v.hosting.includes('Self-host')),
    'Hybrid Hosting': vendors.filter(v => v.hosting.includes('/')),
  };

  const getArchitectureIcon = (type: string) => {
    if (type.includes('Headless')) return <Globe className="w-5 h-5 text-blue-600" />;
    if (type.includes('Hybrid')) return <Zap className="w-5 h-5 text-purple-600" />;
    if (type.includes('Monolithic')) return <Code className="w-5 h-5 text-orange-600" />;
    return <Shield className="w-5 h-5 text-green-600" />;
  };

  const getScoreDistribution = () => {
    const ranges = {
      'Excellent (90-100)': vendors.filter(v => v.totalScore >= 90).length,
      'Very Good (80-89)': vendors.filter(v => v.totalScore >= 80 && v.totalScore < 90).length,
      'Good (70-79)': vendors.filter(v => v.totalScore >= 70 && v.totalScore < 80).length,
      'Fair (60-69)': vendors.filter(v => v.totalScore >= 60 && v.totalScore < 70).length,
      'Needs Improvement (<60)': vendors.filter(v => v.totalScore < 60).length,
    };
    return ranges;
  };

  const topPerformers = vendors
    .sort((a, b) => b.totalScore - a.totalScore)
    .slice(0, 5);

  const scoreRanges = getScoreDistribution();

  return (
    <div className="space-y-8">
      {/* Executive Summary */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200 p-6">
        <div className="flex items-start gap-4">
          <TrendingUp className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Comprehensive CMS Analysis: {vendors.length} Platforms Evaluated
            </h3>
            <p className="text-gray-700 leading-relaxed">
              This analysis covers the complete spectrum of modern Content Management Systems, from the 
              monolithic veteran WordPress to cutting-edge headless platforms like Sanity and Contentful. 
              Our evaluation prioritizes <strong>developer-built, marketer-operated</strong> platforms 
              that balance technical flexibility with editorial usability.
            </p>
          </div>
        </div>
      </div>

      {/* Top Performers Ranking */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Overall Performance Ranking</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {topPerformers.map((vendor, index) => (
              <div key={vendor.id} className="flex items-center gap-4 p-4 rounded-lg border border-gray-100 hover:bg-gray-50 transition-colors">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                  index === 0 ? 'bg-yellow-500' : 
                  index === 1 ? 'bg-gray-500' : 
                  index === 2 ? 'bg-orange-500' : 
                  'bg-blue-500'
                }`}>
                  {index + 1}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h4 className="font-semibold text-gray-900">{vendor.name}</h4>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl font-bold text-gray-900">{vendor.totalScore}</span>
                      <span className="text-sm text-gray-500">/100</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-4 mt-1 text-sm text-gray-600">
                    <span>{vendor.type}</span>
                    <span>•</span>
                    <span>{vendor.migration.timeWeeks}w migration</span>
                    <span>•</span>
                    <span className={
                      vendor.priority <= 3 ? 'text-blue-600 font-medium' : 'text-gray-600'
                    }>
                      {vendor.priority <= 3 ? '⭐ Priority Choice' : 'Additional Option'}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Score Distribution */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Score Distribution</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
            {Object.entries(scoreRanges).map(([range, count]) => (
              <div key={range} className="text-center p-4 rounded-lg border border-gray-100">
                <div className="text-2xl font-bold text-gray-900 mb-1">{count}</div>
                <div className="text-xs text-gray-600">{range}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Architecture Analysis */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Architecture Groups */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Architecture Distribution</h3>
          </div>
          <div className="p-6 space-y-4">
            {Object.entries(architectureGroups).map(([type, vendorList]) => (
              vendorList.length > 0 && (
                <div key={type} className="flex items-start gap-3">
                  {getArchitectureIcon(type)}
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{type}</h4>
                      <span className="text-sm text-gray-500">{vendorList.length} platform{vendorList.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {vendorList.map(v => v.name).join(', ')}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>

        {/* Hosting Models */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="px-6 py-4 border-b border-gray-200">
            <h3 className="text-lg font-semibold text-gray-900">Hosting Models</h3>
          </div>
          <div className="p-6 space-y-4">
            {Object.entries(hostingGroups).map(([type, vendorList]) => (
              vendorList.length > 0 && (
                <div key={type} className="flex items-start gap-3">
                  <Shield className="w-5 h-5 text-gray-500 flex-shrink-0 mt-0.5" />
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h4 className="font-medium text-gray-900">{type}</h4>
                      <span className="text-sm text-gray-500">{vendorList.length} platform{vendorList.length !== 1 ? 's' : ''}</span>
                    </div>
                    <div className="text-sm text-gray-600 mt-1">
                      {vendorList.map(v => v.name).join(', ')}
                    </div>
                  </div>
                </div>
              )
            ))}
          </div>
        </div>
      </div>

      {/* Strategic Insights */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Strategic Insights & Recommendations</h3>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-blue-600" />
                <h4 className="font-medium text-gray-900">For Marketing Teams</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>Sanity & Craft:</strong> Best editor experiences</li>
                <li>• <strong>Storyblok:</strong> Visual editing focus</li>
                <li>• <strong>Webflow:</strong> Design-first approach</li>
                <li>• <strong>Ghost:</strong> Publishing simplicity</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Code className="w-5 h-5 text-green-600" />
                <h4 className="font-medium text-gray-900">For Developer Teams</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>Sanity:</strong> Maximum customization</li>
                <li>• <strong>Payload:</strong> TypeScript-first control</li>
                <li>• <strong>Directus:</strong> Database integration</li>
                <li>• <strong>Strapi:</strong> Node.js ecosystem</li>
              </ul>
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <Shield className="w-5 h-5 text-purple-600" />
                <h4 className="font-medium text-gray-900">Enterprise Ready</h4>
              </div>
              <ul className="text-sm text-gray-600 space-y-1">
                <li>• <strong>Contentful:</strong> Enterprise SaaS leader</li>
                <li>• <strong>Sanity:</strong> SOC2 + customization</li>
                <li>• <strong>Strapi Cloud:</strong> SOC2 + open source</li>
                <li>• <strong>Directus:</strong> Strong permissions</li>
              </ul>
            </div>
          </div>
        </div>
      </div>

      {/* Migration Complexity Overview */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="px-6 py-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Migration Complexity & Timeline</h3>
        </div>
        <div className="p-6">
          <div className="space-y-4">
            {vendors
              .sort((a, b) => a.migration.timeWeeks - b.migration.timeWeeks)
              .slice(0, 8)
              .map((vendor) => (
                <div key={vendor.id} className="flex items-center gap-4 p-3 rounded border border-gray-100">
                  <div className={`px-3 py-1 rounded-full text-xs font-medium ${
                    vendor.priority <= 3 ? 'bg-blue-100 text-blue-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {vendor.priority <= 3 ? `#${vendor.priority} Priority` : 'Additional'}
                  </div>
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900">{vendor.name}</h4>
                    <p className="text-sm text-gray-600">{vendor.migration.complexity}</p>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-gray-900">{vendor.migration.timeWeeks}w</div>
                    <div className={`text-xs px-2 py-1 rounded ${
                      vendor.migration.effort === 'Low' ? 'bg-green-100 text-green-800' :
                      vendor.migration.effort === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-red-100 text-red-800'
                    }`}>
                      {vendor.migration.effort}
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
};