import React, { useState } from 'react';
import { Edit3, Save, X, Plus, Trash2 } from 'lucide-react';
import type { CMSVendor } from '../types/cms';

interface CMSEditorProps {
  vendor: CMSVendor;
  onSave: (updatedVendor: CMSVendor) => void;
  onCancel: () => void;
  onDelete?: (vendorId: string) => void;
}

export const CMSEditor: React.FC<CMSEditorProps> = ({ 
  vendor, 
  onSave, 
  onCancel, 
  onDelete 
}) => {
  const [editedVendor, setEditedVendor] = useState<CMSVendor>(vendor);
  const [newHighlight, setNewHighlight] = useState('');
  const [newRisk, setNewRisk] = useState('');
  const [newStep, setNewStep] = useState('');

  const handleFeatureChange = (feature: keyof CMSVendor['features'], value: number) => {
    setEditedVendor(prev => ({
      ...prev,
      features: {
        ...prev.features,
        [feature]: Math.max(0, Math.min(5, value))
      }
    }));
  };

  const handleWeightedScoreChange = (score: keyof CMSVendor['weightedScores'], value: number) => {
    setEditedVendor(prev => ({
      ...prev,
      weightedScores: {
        ...prev.weightedScores,
        [score]: Math.max(0, Math.min(5, value))
      }
    }));
  };

  const addHighlight = () => {
    if (newHighlight.trim()) {
      setEditedVendor(prev => ({
        ...prev,
        metadata: {
          ...prev.metadata,
          highlights: [...prev.metadata.highlights, newHighlight.trim()]
        }
      }));
      setNewHighlight('');
    }
  };

  const removeHighlight = (index: number) => {
    setEditedVendor(prev => ({
      ...prev,
      metadata: {
        ...prev.metadata,
        highlights: prev.metadata.highlights.filter((_, i) => i !== index)
      }
    }));
  };

  const addRisk = () => {
    if (newRisk.trim()) {
      setEditedVendor(prev => ({
        ...prev,
        migration: {
          ...prev.migration,
          risks: [...prev.migration.risks, newRisk.trim()]
        }
      }));
      setNewRisk('');
    }
  };

  const removeRisk = (index: number) => {
    setEditedVendor(prev => ({
      ...prev,
      migration: {
        ...prev.migration,
        risks: prev.migration.risks.filter((_, i) => i !== index)
      }
    }));
  };

  const addStep = () => {
    if (newStep.trim()) {
      setEditedVendor(prev => ({
        ...prev,
        migration: {
          ...prev.migration,
          steps: [...prev.migration.steps, newStep.trim()]
        }
      }));
      setNewStep('');
    }
  };

  const removeStep = (index: number) => {
    setEditedVendor(prev => ({
      ...prev,
      migration: {
        ...prev.migration,
        steps: prev.migration.steps.filter((_, i) => i !== index)
      }
    }));
  };

  const calculateTotalScore = () => {
    const weights = {
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
    
    const total = Object.entries(editedVendor.weightedScores).reduce((sum, [key, score]) => {
      const weight = weights[key as keyof typeof weights] || 0;
      return sum + (score * weight);
    }, 0);
    
    return Math.round(total * 20); // Convert to 100-point scale
  };

  const handleSave = () => {
    const updatedVendor = {
      ...editedVendor,
      totalScore: calculateTotalScore()
    };
    onSave(updatedVendor);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">
            Edit {editedVendor.name}
          </h2>
          <div className="flex items-center gap-2">
            {onDelete && (
              <button
                onClick={() => onDelete(editedVendor.id)}
                className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                title="Delete CMS"
              >
                <Trash2 size={18} />
              </button>
            )}
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              <Save size={18} />
              Save
            </button>
            <button
              onClick={onCancel}
              className="p-2 text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
            >
              <X size={18} />
            </button>
          </div>
        </div>

        <div className="p-6 space-y-8">
          {/* Basic Info */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Basic Information</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  value={editedVendor.name}
                  onChange={(e) => setEditedVendor(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Priority</label>
                <select
                  value={editedVendor.priority}
                  onChange={(e) => setEditedVendor(prev => ({ ...prev, priority: parseInt(e.target.value) }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  {[1,2,3,4,5,6,7,8,9,10].map(n => (
                    <option key={n} value={n}>{n} {n <= 3 ? `(${['Top Choice', '2nd Choice', '3rd Choice'][n-1]})` : ''}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Type</label>
                <input
                  type="text"
                  value={editedVendor.type}
                  onChange={(e) => setEditedVendor(prev => ({ ...prev, type: e.target.value as any }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">API Model</label>
                <input
                  type="text"
                  value={editedVendor.apiModel}
                  onChange={(e) => setEditedVendor(prev => ({ ...prev, apiModel: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          {/* Feature Scores */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Feature Scores (0-5)</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {Object.entries(editedVendor.features).map(([key, value]) => (
                <div key={key}>
                  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </label>
                  <input
                    type="number"
                    min="0"
                    max="5"
                    value={value}
                    onChange={(e) => handleFeatureChange(key as keyof CMSVendor['features'], parseInt(e.target.value) || 0)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
              ))}
            </div>
          </section>

          {/* Migration Details */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Migration Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Effort</label>
                <select
                  value={editedVendor.migration.effort}
                  onChange={(e) => setEditedVendor(prev => ({
                    ...prev,
                    migration: { ...prev.migration, effort: e.target.value as 'Low' | 'Medium' | 'High' }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="Low">Low</option>
                  <option value="Medium">Medium</option>
                  <option value="High">High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Time (Weeks)</label>
                <input
                  type="number"
                  min="1"
                  value={editedVendor.migration.timeWeeks}
                  onChange={(e) => setEditedVendor(prev => ({
                    ...prev,
                    migration: { ...prev.migration, timeWeeks: parseInt(e.target.value) || 1 }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Complexity</label>
                <input
                  type="text"
                  value={editedVendor.migration.complexity}
                  onChange={(e) => setEditedVendor(prev => ({
                    ...prev,
                    migration: { ...prev.migration, complexity: e.target.value }
                  }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Migration Risks */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">Migration Risks</label>
              <div className="space-y-2">
                {editedVendor.migration.risks.map((risk, index) => (
                  <div key={index} className="flex items-center gap-2">
                    <input
                      type="text"
                      value={risk}
                      onChange={(e) => {
                        const newRisks = [...editedVendor.migration.risks];
                        newRisks[index] = e.target.value;
                        setEditedVendor(prev => ({
                          ...prev,
                          migration: { ...prev.migration, risks: newRisks }
                        }));
                      }}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                    <button
                      onClick={() => removeRisk(index)}
                      className="p-2 text-red-600 hover:bg-red-50 rounded"
                    >
                      <X size={16} />
                    </button>
                  </div>
                ))}
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    placeholder="Add new risk..."
                    value={newRisk}
                    onChange={(e) => setNewRisk(e.target.value)}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={addRisk}
                    className="p-2 text-green-600 hover:bg-green-50 rounded"
                  >
                    <Plus size={16} />
                  </button>
                </div>
              </div>
            </div>
          </section>

          {/* Highlights */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Highlights</h3>
            <div className="space-y-2">
              {editedVendor.metadata.highlights.map((highlight, index) => (
                <div key={index} className="flex items-center gap-2">
                  <input
                    type="text"
                    value={highlight}
                    onChange={(e) => {
                      const newHighlights = [...editedVendor.metadata.highlights];
                      newHighlights[index] = e.target.value;
                      setEditedVendor(prev => ({
                        ...prev,
                        metadata: { ...prev.metadata, highlights: newHighlights }
                      }));
                    }}
                    className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  />
                  <button
                    onClick={() => removeHighlight(index)}
                    className="p-2 text-red-600 hover:bg-red-50 rounded"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))}
              <div className="flex items-center gap-2">
                <input
                  type="text"
                  placeholder="Add new highlight..."
                  value={newHighlight}
                  onChange={(e) => setNewHighlight(e.target.value)}
                  className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
                <button
                  onClick={addHighlight}
                  className="p-2 text-green-600 hover:bg-green-50 rounded"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
          </section>

          {/* Notes */}
          <section>
            <h3 className="text-lg font-medium text-gray-900 mb-4">Notes & Best For</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Notes</label>
                <textarea
                  value={editedVendor.metadata.notes}
                  onChange={(e) => setEditedVendor(prev => ({
                    ...prev,
                    metadata: { ...prev.metadata, notes: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Best For</label>
                <textarea
                  value={editedVendor.metadata.bestFor}
                  onChange={(e) => setEditedVendor(prev => ({
                    ...prev,
                    metadata: { ...prev.metadata, bestFor: e.target.value }
                  }))}
                  rows={2}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>
          </section>

          <div className="text-sm text-gray-500 bg-gray-50 p-4 rounded-lg">
            <strong>Calculated Total Score:</strong> {calculateTotalScore()}/100
          </div>
        </div>
      </div>
    </div>
  );
};