import React from 'react';
import {
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend
} from 'recharts';
import type { CMSVendor } from '../types/cms';

interface ScoreChartProps {
  vendors: CMSVendor[];
  chartType?: 'radar' | 'bar';
  selectedVendors?: string[];
}

export const ScoreChart: React.FC<ScoreChartProps> = ({
  vendors,
  chartType = 'radar',
  selectedVendors = []
}) => {
  const topVendors = vendors
    .filter(v => selectedVendors.length === 0 || selectedVendors.includes(v.id))
    .sort((a, b) => a.priority - b.priority)
    .slice(0, 5);

  if (chartType === 'radar') {
    const radarData = [
      {
        category: 'Editor UX',
        ...topVendors.reduce((acc, vendor) => ({
          ...acc,
          [vendor.name]: vendor.features.editorUx
        }), {})
      },
      {
        category: 'Visual Editing',
        ...topVendors.reduce((acc, vendor) => ({
          ...acc,
          [vendor.name]: vendor.features.visualEditing
        }), {})
      },
      {
        category: 'Preview Speed',
        ...topVendors.reduce((acc, vendor) => ({
          ...acc,
          [vendor.name]: vendor.features.previewSpeed
        }), {})
      },
      {
        category: 'Modeling Flex',
        ...topVendors.reduce((acc, vendor) => ({
          ...acc,
          [vendor.name]: vendor.features.modelingFlex
        }), {})
      },
      {
        category: 'API Power',
        ...topVendors.reduce((acc, vendor) => ({
          ...acc,
          [vendor.name]: vendor.features.apiPower
        }), {})
      },
      {
        category: 'Security',
        ...topVendors.reduce((acc, vendor) => ({
          ...acc,
          [vendor.name]: vendor.features.compliance
        }), {})
      },
      {
        category: 'Extensibility',
        ...topVendors.reduce((acc, vendor) => ({
          ...acc,
          [vendor.name]: vendor.features.extensibility
        }), {})
      }
    ];

    const colors = ['#3B82F6', '#EF4444', '#10B981', '#F59E0B', '#8B5CF6'];

    return (
      <div className="w-full h-96">
        <ResponsiveContainer width="100%" height="100%">
          <RadarChart data={radarData}>
            <PolarGrid />
            <PolarAngleAxis dataKey="category" className="text-sm" />
            <PolarRadiusAxis
              angle={90}
              domain={[0, 5]}
              className="text-xs"
            />
            {topVendors.map((vendor, index) => (
              <Radar
                key={vendor.id}
                name={vendor.name}
                dataKey={vendor.name}
                stroke={colors[index]}
                fill={colors[index]}
                fillOpacity={0.1}
                strokeWidth={2}
              />
            ))}
            <Tooltip />
            <Legend />
          </RadarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  // Bar chart for overall scores
  const barData = topVendors.map(vendor => ({
    name: vendor.name,
    'Total Score': vendor.totalScore,
    'Editor UX': vendor.weightedScores.editorUx * 20,
    'Visual Editing': vendor.weightedScores.visualEditingPreview * 20,
    'Modeling': vendor.weightedScores.modelingFlexibility * 20,
    'Security': vendor.weightedScores.governanceSecurity * 20,
  }));

  return (
    <div className="w-full h-96">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={barData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis domain={[0, 100]} />
          <Tooltip />
          <Legend />
          <Bar dataKey="Total Score" fill="#3B82F6" />
          <Bar dataKey="Editor UX" fill="#EF4444" />
          <Bar dataKey="Visual Editing" fill="#10B981" />
          <Bar dataKey="Modeling" fill="#F59E0B" />
          <Bar dataKey="Security" fill="#8B5CF6" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};