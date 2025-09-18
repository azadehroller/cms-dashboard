import React from 'react';
import { Calendar, Clock, AlertTriangle, CheckCircle } from 'lucide-react';
import type { CMSVendor } from '../types/cms';

interface MigrationTimelineProps {
  vendors: CMSVendor[];
  selectedVendor?: string;
}

export const MigrationTimeline: React.FC<MigrationTimelineProps> = ({
  vendors,
  selectedVendor
}) => {
  const topVendors = vendors
    .filter(v => !selectedVendor || v.id === selectedVendor)
    .sort((a, b) => a.priority - b.priority)
    .slice(0, selectedVendor ? 1 : 3);

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getPriorityBadge = (priority: number) => {
    if (priority === 1) return 'bg-gold-100 text-gold-800 border-gold-200';
    if (priority === 2) return 'bg-silver-100 text-silver-800 border-silver-200';
    if (priority === 3) return 'bg-bronze-100 text-bronze-800 border-bronze-200';
    return 'bg-gray-100 text-gray-800 border-gray-200';
  };

  return (
    <div className="space-y-6">
      {topVendors.map((vendor, index) => (
        <div key={vendor.id} className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getPriorityBadge(vendor.priority)}`}>
                #{vendor.priority} Choice
              </div>
              <h3 className="text-xl font-semibold text-gray-900">{vendor.name}</h3>
              <div className={`px-2 py-1 rounded-full text-xs font-medium ${getEffortColor(vendor.migration.effort)}`}>
                {vendor.migration.effort} Effort
              </div>
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Clock size={16} />
              {vendor.migration.timeWeeks} weeks
            </div>
          </div>

          <div className="mb-4">
            <p className="text-sm text-gray-600 mb-2">Migration Complexity:</p>
            <p className="text-gray-800">{vendor.migration.complexity}</p>
          </div>

          {/* Migration Steps Timeline */}
          <div className="mb-6">
            <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
              <CheckCircle size={16} />
              Migration Steps
            </h4>
            <div className="space-y-3">
              {vendor.migration.steps.map((step, stepIndex) => (
                <div key={stepIndex} className="flex items-start gap-3">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <span className="text-xs font-medium text-blue-600">{stepIndex + 1}</span>
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-800">{step}</p>
                    <div className="mt-1 text-xs text-gray-500">
                      Week {Math.ceil((stepIndex + 1) * vendor.migration.timeWeeks / vendor.migration.steps.length)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Risks */}
          {vendor.migration.risks.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-3 flex items-center gap-2">
                <AlertTriangle size={16} />
                Migration Risks
              </h4>
              <div className="space-y-2">
                {vendor.migration.risks.map((risk, riskIndex) => (
                  <div key={riskIndex} className="flex items-start gap-2 p-3 bg-yellow-50 rounded-lg border border-yellow-200">
                    <AlertTriangle size={14} className="text-yellow-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-yellow-800">{risk}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Cost Estimation Bar */}
          <div className="mt-6 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Cost Breakdown</h4>
            <div className="grid grid-cols-4 gap-4 text-center">
              <div>
                <div className="text-xs text-gray-500 mb-1">License/SaaS</div>
                <div className={`text-sm font-medium ${
                  vendor.cost.licenseSaas === 'Low' ? 'text-green-600' :
                  vendor.cost.licenseSaas === 'Mid' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {vendor.cost.licenseSaas}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Hosting</div>
                <div className={`text-sm font-medium ${
                  vendor.cost.hosting === 'Low' ? 'text-green-600' :
                  vendor.cost.hosting === 'Mid' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {vendor.cost.hosting}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Ops Time</div>
                <div className={`text-sm font-medium ${
                  vendor.cost.opsTime === 'Low' ? 'text-green-600' :
                  vendor.cost.opsTime === 'Mid' ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {vendor.cost.opsTime}
                </div>
              </div>
              <div>
                <div className="text-xs text-gray-500 mb-1">Total Est.</div>
                <div className={`text-sm font-semibold ${
                  vendor.cost.estimatedTotal.includes('Low') ? 'text-green-600' :
                  vendor.cost.estimatedTotal.includes('Mid') ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {vendor.cost.estimatedTotal}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {!selectedVendor && (
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-start gap-3">
            <Calendar size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-medium text-blue-900 mb-1">Migration Comparison Summary</h4>
              <p className="text-sm text-blue-800">
                Based on your priorities, <strong>Sanity</strong> offers the fastest time-to-value with real-time collaboration,
                while <strong>Craft CMS</strong> provides the most predictable costs and <strong>Strapi</strong> aligns with your technical stack.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};