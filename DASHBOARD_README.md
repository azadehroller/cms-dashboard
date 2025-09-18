# CMS Evaluation Dashboard

A comprehensive, interactive dashboard for evaluating Content Management Systems (CMS) and planning migration from HubSpot. Built with modern web technologies including Astro, React, TypeScript, and Tailwind CSS.

## 🌟 Features

### 📊 Interactive Dashboards
- **Overview Dashboard**: Key metrics, priority rankings, and visual summaries
- **Comparison Matrix**: Side-by-side feature comparison with customizable selections  
- **Migration Planning**: Detailed roadmaps, timelines, and effort estimates
- **Risk Assessment**: Comprehensive risk analysis with mitigation strategies
- **Data Management**: Fully editable CMS information with real-time updates

### 🔧 Technical Highlights
- **Modern Stack**: Astro + React + TypeScript + Tailwind CSS
- **Interactive Charts**: Radar charts, bar charts, and visual comparisons using Recharts
- **Responsive Design**: Mobile-first, accessible design with WCAG compliance
- **Real-time Editing**: Live data editing with localStorage persistence
- **Export Capabilities**: JSON data export for external analysis

### 🎯 CMS Focus Areas
- **Top 3 Priorities**: Sanity (1st), Craft CMS (2nd), Strapi (3rd)
- **Comprehensive Coverage**: 5+ major CMS platforms evaluated
- **HubSpot Migration**: Specific migration paths and effort analysis

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation
```bash
# Clone or navigate to the project directory
cd cms-dashboard

# Install dependencies
npm install

# Start development server
npm run dev
```

The dashboard will be available at `http://localhost:4321`

### Build for Production
```bash
npm run build
npm run preview
```

## 🏗️ Architecture

### Component Structure
```
src/
├── components/           # React components
│   ├── Dashboard.tsx     # Main dashboard container
│   ├── CMSEditor.tsx     # Editable CMS data forms
│   ├── CMSTable.tsx      # Sortable data table
│   ├── ScoreChart.tsx    # Radar/bar chart visualizations
│   ├── MigrationTimeline.tsx  # Migration planning
│   ├── ComparisonMatrix.tsx   # Side-by-side comparison
│   └── RiskMatrix.tsx    # Risk assessment grid
├── data/
│   └── cmsData.ts        # CMS data and configuration
├── types/
│   └── cms.ts            # TypeScript interfaces
└── styles/
    └── global.css        # Global styles and utilities
```

### Data Structure
All CMS data is fully editable and includes:
- **Basic Info**: Name, type, hosting, API model, priority ranking
- **Feature Scores**: 13 dimensions rated 0-5 (Editor UX, Visual Editing, etc.)
- **Migration Details**: Effort level, timeline, steps, and risks
- **Cost Analysis**: Licensing, hosting, ops time, and total estimates
- **Metadata**: Security compliance, highlights, and best-use scenarios

## 📈 Dashboard Sections

### 1. Overview
- **Key Metrics**: Average scores, migration times, enterprise readiness
- **Priority Cards**: Detailed cards for top 3 CMS choices
- **Quick Comparison**: Visual feature comparison charts

### 2. Compare
- **Vendor Selection**: Toggle any CMS for comparison
- **Side-by-Side Matrix**: Detailed feature breakdowns
- **Visual Charts**: Radar and bar chart views
- **Expandable Sections**: Organized by feature categories

### 3. Migration
- **Timeline View**: Step-by-step migration plans
- **Effort Analysis**: Color-coded complexity levels
- **Risk Assessment**: Migration-specific risks and mitigations
- **Cost Breakdown**: Detailed TCO analysis

### 4. Risks
- **Risk Matrix**: Likelihood vs Impact analysis
- **Vendor-Specific**: Focused risk profiles per CMS
- **Mitigation Strategies**: Detailed action plans
- **Risk Categories**: Low/Medium/High classification

### 5. Data Table
- **Full Dataset**: Sortable, searchable CMS database
- **Inline Editing**: Click to edit any CMS entry
- **Filtering**: Priority-based and custom filters
- **Summary Stats**: Aggregate metrics display

## 🎨 Design System

### Priority Ranking
- **🥇 Gold Badge**: #1 Priority (Sanity)
- **🥈 Silver Badge**: #2 Priority (Craft CMS)  
- **🥉 Bronze Badge**: #3 Priority (Strapi)
- **Standard**: Lower priority options

### Color Coding
- **Green**: Low risk, high scores, cost-effective
- **Yellow**: Medium risk/scores, moderate costs
- **Red**: High risk, lower scores, expensive
- **Blue**: Primary actions and highlights

### Accessibility
- WCAG 2.1 AA compliance
- Keyboard navigation support
- Screen reader optimized
- High contrast color schemes
- Responsive breakpoints

## 📊 Data Management

### Editing Features
- **Live Updates**: Changes reflected immediately
- **Form Validation**: Prevents invalid data entry
- **Auto-Save**: localStorage persistence
- **Export/Import**: JSON data portability
- **Add/Delete**: Create new CMS entries

### Scoring System
- **0-5 Scale**: Standardized feature scoring
- **Weighted Totals**: Configurable importance weights
- **Auto-Calculation**: Real-time score updates
- **Visual Indicators**: Color-coded performance levels

## 🔧 Customization

### Modifying Weights
Edit `src/data/cmsData.ts` to adjust feature importance:
```typescript
export const dashboardWeights = {
  editorUx: 0.25,              // 25% weight
  visualEditingPreview: 0.15,   // 15% weight
  modelingFlexibility: 0.15,    // 15% weight
  // ... customize as needed
};
```

### Adding New CMS
Use the "Add CMS" button in the dashboard or manually edit the data file to include new vendors.

### Theme Customization
Modify `tailwind.config.mjs` and `src/styles/global.css` for custom styling.

## 📋 Migration Insights

### Recommended Path: Sanity
- **Score**: 95/100
- **Timeline**: 6 weeks
- **Strengths**: Visual Editing, real-time collaboration, developer flexibility
- **Best For**: Rapid marketing experiments with real-time approvals

### Alternative: Craft CMS
- **Score**: 86/100  
- **Timeline**: 8 weeks
- **Strengths**: Editor experience, predictable costs, strong plugins
- **Best For**: Editorially rich websites with content guardrails

### Pragmatic Option: Strapi
- **Score**: 78/100
- **Timeline**: 7 weeks
- **Strengths**: Node/TS alignment, scheduling features, open source
- **Best For**: Development teams wanting OSS control and flexibility

## 🛠️ Development

### Tech Stack
- **Astro 5**: Static site generation with islands architecture
- **React 19**: Component library with hooks
- **TypeScript**: Type safety and developer experience
- **Tailwind CSS 3**: Utility-first styling
- **Recharts**: Data visualization library
- **Lucide React**: Icon library

### Code Quality
- Strict TypeScript configuration
- ESLint and Prettier integration
- Component-based architecture
- Responsive design patterns
- Accessible markup (ARIA labels, semantic HTML)

### Performance
- Static generation for fast loading
- Islands architecture for minimal JavaScript
- Optimized bundle splitting
- Lazy loading for charts and heavy components

## 🤝 Contributing

This dashboard is designed to be easily extensible:

1. **Add New Metrics**: Update the TypeScript interfaces and data structure
2. **Create Custom Views**: Add new components and tab sections
3. **Enhance Visualizations**: Integrate additional chart types
4. **Improve Accessibility**: Add more ARIA labels and keyboard shortcuts
5. **Extend Export Options**: Add CSV, PDF, or other export formats

## 📄 License

This project is created for CMS evaluation and migration planning. Feel free to adapt and extend for your organization's needs.

---

**Built with ❤️ for effective CMS decision making**