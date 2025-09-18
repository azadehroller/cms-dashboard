import React from 'react';
import { AlertTriangle, Shield, TrendingUp, DollarSign } from 'lucide-react';
import { riskAssessments } from '../data/cmsData';
import type { CMSVendor, RiskAssessment } from '../types/cms';

interface RiskMatrixProps {
  vendors: CMSVendor[];
  selectedVendor?: string;
}

export const RiskMatrix: React.FC<RiskMatrixProps> = ({ vendors, selectedVendor }) => {
  const filteredVendors = selectedVendor ? 
    vendors.filter(v => v.id === selectedVendor) : 
    vendors.sort((a, b) => a.priority - b.priority).slice(0, 3);

  const getRiskLevel = (likelihood: string, impact: string): number => {
    const likelihoodScore = { 'Low': 1, 'Medium': 2, 'High': 3 }[likelihood] || 1;
    const impactScore = { 'Low': 1, 'Medium': 2, 'High': 3 }[impact] || 1;
    return likelihoodScore * impactScore;
  };

  const getRiskColor = (riskLevel: number) => {
    if (riskLevel <= 2) return 'bg-green-100 text-green-800 border-green-200';
    if (riskLevel <= 4) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    return 'bg-red-100 text-red-800 border-red-200';
  };

  const getRiskIcon = (riskLevel: number) => {
    if (riskLevel <= 2) return <Shield className="w-4 h-4 text-green-600" />;
    if (riskLevel <= 4) return <AlertTriangle className="w-4 h-4 text-yellow-600" />;
    return <AlertTriangle className="w-4 h-4 text-red-600" />;
  };

  return (
    <div className="space-y-6">
      {/* Risk Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="w-5 h-5 text-green-600" />
            <h3 className="font-medium text-gray-900">Low Risk</h3>
          </div>
          <div className="text-2xl font-semibold text-green-600 mb-1">
            {riskAssessments.filter(r => getRiskLevel(r.likelihood, r.impact) <= 2).length}
          </div>
          <p className="text-sm text-gray-600">Manageable issues</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-yellow-600" />
            <h3 className="font-medium text-gray-900">Medium Risk</h3>
          </div>
          <div className="text-2xl font-semibold text-yellow-600 mb-1">
            {riskAssessments.filter(r => getRiskLevel(r.likelihood, r.impact) > 2 && getRiskLevel(r.likelihood, r.impact) <= 4).length}
          </div>
          <p className="text-sm text-gray-600">Requires attention</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <h3 className="font-medium text-gray-900">High Risk</h3>
          </div>
          <div className="text-2xl font-semibold text-red-600 mb-1">
            {riskAssessments.filter(r => getRiskLevel(r.likelihood, r.impact) > 4).length}
          </div>
          <p className="text-sm text-gray-600">Needs mitigation</p>
        </div>
      </div>

      {/* Risk Assessment Table */}
      <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 bg-gray-50 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900">Risk Assessment Matrix</h3>
        </div>
        
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Vendor
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Likelihood
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Impact
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Risk Level
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Mitigation Strategy
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {riskAssessments.map((risk, index) => {
                const riskLevel = getRiskLevel(risk.likelihood, risk.impact);
                return (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{risk.risk}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900">{risk.vendor}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        risk.likelihood === 'Low' ? 'bg-green-100 text-green-800' :
                        risk.likelihood === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {risk.likelihood}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        risk.impact === 'Low' ? 'bg-green-100 text-green-800' :
                        risk.impact === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {risk.impact}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${getRiskColor(riskLevel)}`}>
                        {getRiskIcon(riskLevel)}
                        <span className="text-xs font-medium">
                          {riskLevel <= 2 ? 'Low' : riskLevel <= 4 ? 'Medium' : 'High'}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-900 max-w-xs">
                        {risk.mitigation}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Vendor-Specific Risks */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Vendor-Specific Risk Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVendors.map(vendor => (
            <div key={vendor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white font-semibold ${
                  vendor.priority === 1 ? 'bg-yellow-500' : 
                  vendor.priority === 2 ? 'bg-gray-500' : 
                  vendor.priority === 3 ? 'bg-orange-500' : 'bg-blue-500'
                }`}>
                  {vendor.priority}
                </div>
                <h4 className="text-lg font-semibold text-gray-900">{vendor.name}</h4>
              </div>

              <div className="space-y-3">
                <div>
                  <h5 className="text-sm font-medium text-gray-700 mb-2">Migration Risks</h5>
                  <div className="space-y-2">
                    {vendor.migration.risks.map((risk, index) => (
                      <div key={index} className="flex items-start gap-2 p-2 bg-yellow-50 rounded border border-yellow-200">
                        <AlertTriangle className="w-4 h-4 text-yellow-600 flex-shrink-0 mt-0.5" />
                        <span className="text-sm text-yellow-800">{risk}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="pt-3 border-t border-gray-200">
                  <div className="grid grid-cols-2 gap-4 text-center">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Migration Effort</div>
                      <div className={`text-sm font-medium px-2 py-1 rounded ${
                        vendor.migration.effort === 'Low' ? 'bg-green-100 text-green-800' :
                        vendor.migration.effort === 'Medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {vendor.migration.effort}
                      </div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Cost Risk</div>
                      <div className={`text-sm font-medium px-2 py-1 rounded ${
                        vendor.cost.estimatedTotal.includes('Low') ? 'bg-green-100 text-green-800' :
                        vendor.cost.estimatedTotal.includes('Mid') ? 'bg-yellow-100 text-yellow-800' :
                        'bg-red-100 text-red-800'
                      }`}>
                        {vendor.cost.estimatedTotal}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Risk Mitigation Summary */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
        <div className="flex items-start gap-3">
          <TrendingUp className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
          <div>
            <h4 className="font-medium text-blue-900 mb-2">Risk Mitigation Recommendations</h4>
            <div className="space-y-2 text-sm text-blue-800">
              <p>
                <strong>For all vendors:</strong> Establish clear project governance, set usage budgets with alerts, 
                and conduct quarterly reviews to prevent cost sprawl.
              </p>
              <p>
                <strong>Sanity-specific:</strong> Use starter templates and codify Studio configurations as packages 
                to prevent custom work drift.
              </p>
              <p>
                <strong>Craft CMS-specific:</strong> Consider Craft Cloud to reduce operational overhead, 
                or standardize infrastructure automation.
              </p>
              <p>
                <strong>Strapi-specific:</strong> Invest in Next.js preview integration and editorial overlay components 
                to improve content editor experience.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};