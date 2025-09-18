import React, { useState } from 'react';
import { Edit3, Star, TrendingUp, Shield, Zap, Eye } from 'lucide-react';
import type { CMSVendor } from '../types/cms';

interface CMSTableProps {
  vendors: CMSVendor[];
  onEdit: (vendor: CMSVendor) => void;
  onSelect?: (vendorId: string) => void;
  selectedVendor?: string;
}

export const CMSTable: React.FC<CMSTableProps> = ({
  vendors,
  onEdit,
  onSelect,
  selectedVendor
}) => {
  const [sortBy, setSortBy] = useState<'priority' | 'totalScore' | 'name'>('priority');
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('asc');

  const sortedVendors = [...vendors].sort((a, b) => {
    const multiplier = sortDirection === 'asc' ? 1 : -1;
    switch (sortBy) {
      case 'priority':
        return (a.priority - b.priority) * multiplier;
      case 'totalScore':
        return (a.totalScore - b.totalScore) * multiplier;
      case 'name':
        return a.name.localeCompare(b.name) * multiplier;
      default:
        return 0;
    }
  });

  const handleSort = (field: 'priority' | 'totalScore' | 'name') => {
    if (sortBy === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  const getPriorityIcon = (priority: number) => {
    if (priority === 1) return <Star className="w-4 h-4 text-yellow-500 fill-current" />;
    if (priority === 2) return <Star className="w-4 h-4 text-gray-400 fill-current" />;
    if (priority === 3) return <Star className="w-4 h-4 text-orange-500 fill-current" />;
    return <span className="text-gray-400 text-sm">#{priority}</span>;
  };

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-100';
    if (score >= 80) return 'text-blue-600 bg-blue-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-gray-600 bg-gray-100';
  };

  const getEffortColor = (effort: string) => {
    switch (effort) {
      case 'Low': return 'text-green-600 bg-green-100';
      case 'Medium': return 'text-yellow-600 bg-yellow-100';
      case 'High': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('priority')}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  Priority
                  {sortBy === 'priority' && (
                    <span className="text-blue-500">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  CMS
                  {sortBy === 'name' && (
                    <span className="text-blue-500">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                <button
                  onClick={() => handleSort('totalScore')}
                  className="flex items-center gap-1 hover:text-gray-700"
                >
                  Score
                  {sortBy === 'totalScore' && (
                    <span className="text-blue-500">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                  )}
                </button>
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Key Strengths
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Migration
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Cost Est.
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {sortedVendors.map((vendor) => (
              <tr
                key={vendor.id}
                className={`hover:bg-gray-50 transition-colors ${
                  selectedVendor === vendor.id ? 'bg-blue-50 border-blue-200' : ''
                } ${vendor.priority <= 3 ? 'border-l-4 border-l-blue-500' : ''}`}
                onClick={() => onSelect && onSelect(vendor.id)}
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    {getPriorityIcon(vendor.priority)}
                    <span className="text-sm font-medium text-gray-900">
                      {vendor.priority <= 3 ? ['Top Choice', '2nd Choice', '3rd Choice'][vendor.priority - 1] : `#${vendor.priority}`}
                    </span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{vendor.name}</div>
                  <div className="text-sm text-gray-500">{vendor.apiModel}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{vendor.type}</div>
                  <div className="text-sm text-gray-500">{vendor.hosting}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getScoreColor(vendor.totalScore)}`}>
                    {vendor.totalScore}/100
                  </div>
                  <div className="mt-1">
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      {vendor.features.visualEditing >= 4 && <Eye className="w-3 h-3" title="Strong Visual Editing" />}
                      {vendor.features.compliance >= 4 && <Shield className="w-3 h-3" title="Enterprise Security" />}
                      {vendor.features.apiPower >= 4 && <Zap className="w-3 h-3" title="Powerful APIs" />}
                      {vendor.features.editorUx >= 4 && <TrendingUp className="w-3 h-3" title="Great Editor UX" />}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-sm text-gray-900 max-w-xs">
                    <div className="space-y-1">
                      {vendor.metadata.highlights.slice(0, 2).map((highlight, i) => (
                        <div key={i} className="text-xs text-gray-600 flex items-start gap-1">
                          <span className="text-blue-500 flex-shrink-0">•</span>
                          <span className="truncate">{highlight}</span>
                        </div>
                      ))}
                      {vendor.metadata.highlights.length > 2 && (
                        <div className="text-xs text-gray-400">
                          +{vendor.metadata.highlights.length - 2} more
                        </div>
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEffortColor(vendor.migration.effort)}`}>
                    {vendor.migration.effort}
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {vendor.migration.timeWeeks} weeks
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">
                    {vendor.cost.estimatedTotal}
                  </div>
                  <div className="text-xs text-gray-500">
                    Ops: {vendor.cost.opsTime}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(vendor);
                    }}
                    className="text-blue-600 hover:text-blue-900 flex items-center gap-1 px-2 py-1 rounded hover:bg-blue-50 transition-colors"
                  >
                    <Edit3 size={14} />
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Summary Statistics */}
      <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          <div>
            <div className="text-lg font-semibold text-gray-900">{vendors.length}</div>
            <div className="text-sm text-gray-500">Total CMS Options</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-blue-600">3</div>
            <div className="text-sm text-gray-500">Priority Choices</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-green-600">
              {Math.round(vendors.reduce((sum, v) => sum + v.totalScore, 0) / vendors.length)}
            </div>
            <div className="text-sm text-gray-500">Avg Score</div>
          </div>
          <div>
            <div className="text-lg font-semibold text-yellow-600">
              {Math.round(vendors.reduce((sum, v) => sum + v.migration.timeWeeks, 0) / vendors.length)}
            </div>
            <div className="text-sm text-gray-500">Avg Migration (weeks)</div>
          </div>
        </div>
      </div>
    </div>
  );
};