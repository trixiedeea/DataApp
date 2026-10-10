// Pre-built Charts module (Sponsor Metrics and Impact Metrics)
console.log('>>> prebuilt-charts.js LOADED <<<');
import { 
  SUB_ENTITY_FIELDS, 
  COMMUNITY_FIELDS, 
  ASSESSMENT_POINTS, 
  ENTITY_SCOPE, 
  BENCHMARK_PAIRS, 
  normalizeLabel  }
  from './schema.js';
import { getCustomBuilderHTML, initCustomBuilderDOM } from './charts.js';

// Build FIELD_BY_ID from schema for pre-built chart functions
const FIELD_BY_ID = {};
function buildFieldCatalog() {
  // Build from communities
  const communities = SUB_ENTITY_FIELDS.communities;
  for (const [section, fields] of Object.entries(communities)) {
    if (typeof fields === 'object' && !Array.isArray(fields) && section !== 'items') {
      // Handle array types with items (library, outcomes)
      if (fields.type === 'array' && fields.items) {
        for (const [fieldKey, fieldDef] of Object.entries(fields.items)) {
          if (typeof fieldDef === 'object' && fieldDef.label) {
            const id = `${section}.items.${fieldKey}`;
            FIELD_BY_ID[id] = {
              id,
              source: section,
              field: fieldKey,
              label: fieldDef.label,
              numeric: fieldDef.type === 'number' || fieldDef.type === 'integer',
              collapse: 'latest',
            };
          }
        }
      } else {
        // Handle regular nested objects
        for (const [fieldKey, fieldDef] of Object.entries(fields)) {
          if (typeof fieldDef === 'object' && fieldDef.label) {
            const id = `${section}.${fieldKey}`;
            FIELD_BY_ID[id] = {
              id,
              source: section,
              field: fieldKey,
              label: fieldDef.label,
              numeric: fieldDef.type === 'number' || fieldDef.type === 'integer',
              collapse: section === 'library' || section === 'outcomes' ? 'latest' : null,
            };
          }
        }
      }
    }
  }
  // Build from expenses
  const expenses = SUB_ENTITY_FIELDS.expenses;
  if (expenses) {
    for (const [fieldKey, fieldDef] of Object.entries(expenses)) {
      if (typeof fieldDef === 'object' && fieldDef.label) {
        const id = `expenses.${fieldKey}`;
        FIELD_BY_ID[id] = {
          id,
          source: 'expenses',
          field: fieldKey,
          label: fieldDef.label,
          numeric: fieldDef.type === 'number' || fieldDef.type === 'integer',
          collapse: null,
        };
      }
    }
  }
  // Build from investments
  const investments = SUB_ENTITY_FIELDS.investments;
  if (investments) {
    for (const [fieldKey, fieldDef] of Object.entries(investments)) {
      if (typeof fieldDef === 'object' && fieldDef.label) {
        const id = `investments.${fieldKey}`;
        FIELD_BY_ID[id] = {
          id,
          source: 'investments',
          field: fieldKey,
          label: fieldDef.label,
          numeric: fieldDef.type === 'number' || fieldDef.type === 'integer',
          collapse: null,
        };
      }
    }
  }
}
buildFieldCatalog();

// Default HTML escape function
function defaultEsc(str) {
  if (str === null || str === undefined) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}

// Helper functions for form options
function fieldOptionsHtml(selectedId, fields, escFn) {
  return fields
    .map((f) => `<option value="${escFn(f.id)}" ${f.id === selectedId ? 'selected' : ''}>${escFn(f.label)}</option>`)
    .join('');
}

function numericFieldOptionsHtml(selectedId, fields, escFn) {
  return fields
    .filter((f) => f.numeric)
    .map((f) => `<option value="${escFn(f.id)}" ${f.id === selectedId ? 'selected' : ''}>${escFn(f.label)}</option>`)
    .join('');
}

// Custom chart types
const CUSTOM_CHART_TYPES = [
  { id: 'bar', label: 'Bar Chart' },
  { id: 'line', label: 'Line Chart' },
  { id: 'area', label: 'Area Chart' },
  { id: 'pie', label: 'Pie Chart' },
  { id: 'doughnut', label: 'Doughnut Chart' },
  { id: 'polar', label: 'Polar Area Chart' },
  { id: 'radar', label: 'Radar Chart' },
  { id: 'scatter', label: 'Scatter Plot' },
  { id: 'bubble', label: 'Bubble Chart' },
  { id: 'table', label: 'Table' },
];

// Main Module Initializer
export function initChartsTab(helpers = {}) {
  const esc = helpers.esc || defaultEsc;
  const PALETTE = helpers.GROUP_PALETTE || [
    '#5a04b5',
    '#04b59d',
    '#0b64e0',
    '#b504ac',
    '#20618d',
    '#38026c',
    '#20808d',
    '#182d78',
    '#c084fc',
    '#019504',
    '#0488b5',
    '#b51904',
  ];
  function colorFor(i) {
    return PALETTE[i % PALETTE.length];
  }
  // Cache chart instances
  const chartInstances = {};
  function renderChart(canvasId, config) {
    const canvas = document.getElementById(canvasId);
    if (!canvas) return;
    // Handle table rendering
    if (config.isTable) {
      const container = canvas.parentElement;
      if (!container) return;
      const { categories, groups, agg, xField, yField, groupField } = config.data;
      const tableHtml = `
        <table class="ch-table">
          <thead>
            <tr>
              <th>${xField.label}</th>
              ${groups.map((g) => `<th class="ch-table-num">${g}</th>`).join('')}
            </tr>
          </thead>
          <tbody>
            ${categories
              .map(
                (cat) => `
              <tr>
                <td class="ch-table-cat">${cat}</td>
                ${groups
                  .map((g) => {
                    const hit = agg.find((a) => a.group === g && String(a.x) === String(cat));
                    const val = hit ? hit.y.toFixed(2) : '—';
                    return `<td class="ch-table-num">${val}</td>`;
                  })
                  .join('')}
              </tr>
            `,
              )
              .join('')}
          </tbody>
        </table>
      `;
      container.innerHTML = tableHtml;
      return;
    }
    // Handle Chart.js rendering
    if (typeof Chart === 'undefined') return;
    if (chartInstances[canvasId]) {
      chartInstances[canvasId].destroy();
      delete chartInstances[canvasId];
    }
    chartInstances[canvasId] = new Chart(canvas, config);
  }
  function baseOptions(extra) {
    const options = Object.assign(
      {
        responsive: true,
        maintainAspectRatio: false,
        plugins: { legend: { position: 'bottom', labels: { color: '#013143' } } },
      },
      extra || {},
    );
    // Handle date scales for year fields to prevent Chart.js from treating years as regular numbers
    if (extra && extra.scales && extra.scales.x) {
      const xScale = extra.scales.x;
      // If X-axis is a date/year field, configure it properly
      if (
        xScale.type === 'time' ||
        (xScale.title &&
          xScale.title.text &&
          (xScale.title.text.includes('Year') || xScale.title.text.includes('Date') || xScale.title.text.includes('Assessment')))
      ) {
        xScale.type = 'category'; // Use category for years and assessment points to avoid date parsing issues
        xScale.ticks = xScale.ticks || {};
        xScale.ticks.autoSkip = false;
      }
    }
    return options;
  }

  // --- Helper functions for pre-built charts ---
  function toNum(v) {
    if (v === null || v === undefined || v === '') return null;
    const n = Number(v);
    return isNaN(n) ? null : n;
  }

  function safeDivide(a, b) {
    const na = toNum(a),
      nb = toNum(b);
    if (na === null || nb === null || nb === 0) return null;
    return na / nb;
  }

  function recordsFor(community, source) {
    if (source === 'community') return [community];
    const v = community[source];
    if (Array.isArray(v)) return v;
    if (v && typeof v === 'object' && Array.isArray(v.items)) return v.items;
    if (v && typeof v === 'object') return [v];
    return [];
  }

  function latestRecord(records) {
    for (let i = ASSESSMENT_POINTS.length - 1; i >= 0; i--) {
      const r = records.find((x) => x.assessmentPoint === ASSESSMENT_POINTS[i]);
      if (r) return r;
    }
    return records.length ? records[records.length - 1] : null;
  }

  function containerFor(community, source) {
    const v = community[source];
    if (v && typeof v === 'object' && !Array.isArray(v)) return v;
    return null;
  }

  function resolveScalar(community, fieldDef) {
    if (!fieldDef) return null;
    const parts = fieldDef.id.split('.');
    if (parts.length >= 2) {
      const source = parts[0];
      const fieldPath = parts.slice(1).join('.');
      const sourceObj = community[source];
      if (!sourceObj) return null;
      let value = sourceObj;
      const pathParts = fieldPath.split('.');
      for (const part of pathParts) {
        if (value && typeof value === 'object' && part in value) {
          value = value[part];
        } else {
          return null;
        }
      }
      return fieldDef.numeric ? toNum(value) : value ?? null;
    }
    const records = recordsFor(community, fieldDef.source);
    if (!records.length) return null;
    if (fieldDef.collapse === 'latest') {
      const rec = latestRecord(records);
      return rec ? toNum(rec[fieldDef.field]) : null;
    }
    if (fieldDef.collapse === 'aggregate') {
      if (fieldDef.numeric) {
        let total = 0,
          any = false;
        records.forEach((r) => {
          const v = toNum(r[fieldDef.field]);
          if (v !== null) {
            total += v;
            any = true;
          }
        });
        return any ? total : null;
      }
      const counts = {};
      records.forEach((r) => {
        const v = r[fieldDef.field];
        if (v !== null) counts[v] = (counts[v] || 0) + 1;
      });
      const keys = Object.keys(counts);
      if (!keys.length) return null;
      keys.sort((a, b) => counts[b] - counts[a]);
      return keys[0];
    }
    return toNum(records[0][fieldDef.field]);
  }

  function resolveAtAssessmentPoint(community, fieldDef, assessmentPoint) {
    if (!fieldDef) return null;
    const parts = fieldDef.id.split('.');
    if (parts.length >= 2) {
      const source = parts[0];
      const fieldPath = parts.slice(1).join('.');
      if (source === 'library' || source === 'outcomes') {
        const sourceObj = community[source];
        if (!sourceObj) return null;
        const records = Array.isArray(sourceObj) ? sourceObj : sourceObj.items || [];
        const rec = records.find((r) => r.assessmentPoint === assessmentPoint);
        if (!rec) return null;
        // If fieldPath starts with 'items.', strip it since records are already the items array
        const actualFieldPath = fieldPath.startsWith('items.') ? fieldPath.slice(6) : fieldPath;
        let value = rec;
        const pathParts = actualFieldPath.split('.');
        for (const part of pathParts) {
          if (value && typeof value === 'object' && part in value) {
            value = value[part];
          } else {
            return null;
          }
        }
        return fieldDef.numeric ? toNum(value) : value ?? null;
      }
      return resolveScalar(community, fieldDef);
    }
    if (fieldDef.source === 'library' || fieldDef.source === 'outcomes') {
      const container = containerFor(community, fieldDef.source);
      if (container && Object.prototype.hasOwnProperty.call(container, fieldDef.field)) {
        const v = container[fieldDef.field];
        return fieldDef.numeric ? toNum(v) : v ?? null;
      }
    }
    if (fieldDef.collapse === 'latest' || fieldDef.collapse === 'aggregate') {
      const records = recordsFor(community, fieldDef.source);
      const rec = records.find((r) => r.assessmentPoint === assessmentPoint);
      return rec ? toNum(rec[fieldDef.field]) : null;
    }
    return resolveScalar(community, fieldDef);
  }

  function resolveStandaloneField(record, fieldDef) {
    if (!fieldDef) return null;
    const v = record[fieldDef.field];
    return fieldDef.numeric ? toNum(v) : v ?? null;
  }

  function communityLabel(c) {
    return c.communityName || (c.geography && c.geography.communityName) || c.communityId || c.id || 'Community';
  }

  function avgAtPoint(communities, fieldDef, assessmentPoint) {
    const vals = communities.map((c) => resolveAtAssessmentPoint(c, fieldDef, assessmentPoint)).filter((v) => v !== null && !isNaN(v));
    if (!vals.length) return null;
    return vals.reduce((a, b) => a + b, 0) / vals.length;
  }

  function getLatestLibraryMetrics(communities) {
    return Object.values(communities).map((c) => {
      const libs = recordsFor(c, 'library');
      const latest = latestRecord(libs) || {};
      const container = containerFor(c, 'library') || {};
      return {
        label: communityLabel(c),
        visits: toNum(latest.physicalVisitsPerMonth),
        restock: toNum(latest.restockRate),
        books: toNum(latest.booksDeliveredQuantity),
        libraryId: container.libraryId ?? null,
        publicSchoolLibrary: container.publicSchoolLibrary ?? null,
        population: resolveScalar(c, FIELD_BY_ID['population.population']),
        participants: resolveScalar(c, FIELD_BY_ID['population.participantsServed']),
        footTraffic: resolveScalar(c, FIELD_BY_ID['population.estimatedFootTraffic']),
      };
    });
  }

  // --- Fixed chart renderers ---
  function renderSponsorCharts(investments, communities) {
    investments = investments || [];
    communities = communities || {};
    console.log('Sponsor charts – investments:', investments.length, 'communities:', Object.keys(communities).length);
    const siteMetrics = getLatestLibraryMetrics(communities);
    // 1. Funding Mix by Source Type
    const byType = {};
    investments.forEach((inv) => {
      const type = inv.fundingSourceType || 'Other';
      byType[type] = (byType[type] || 0) + (toNum(inv.fundingAmount) || 0);
    });
    const typeLabels = Object.keys(byType);
    renderChart('ct-sponsor-1', {
      type: 'pie',
      data: {
        labels: typeLabels,
        datasets: [{ data: typeLabels.map((l) => byType[l]), backgroundColor: typeLabels.map((_, i) => colorFor(i)) }],
      },
      options: baseOptions({ plugins: { legend: { position: 'right' }, title: { display: true, text: 'Funding Mix by Source Type', color: '#013143' } } }),
    });
    // 2. Funding Received by Year
    const byYear = {};
    investments.forEach((inv) => {
      const d = inv.dateReceived ? new Date(inv.dateReceived) : null;
      const year = d && !isNaN(d) ? String(d.getFullYear()) : 'Unknown';
      byYear[year] = (byYear[year] || 0) + (toNum(inv.fundingAmount) || 0);
    });
    const yearLabels = Object.keys(byYear).sort();
    renderChart('ct-sponsor-2', {
      type: 'bar',
      data: {
        labels: yearLabels,
        datasets: [{ label: 'Funding Received ($)', data: yearLabels.map((y) => byYear[y]), backgroundColor: colorFor(0) }],
      },
      options: baseOptions({
        plugins: { legend: { display: false }, title: { display: true, text: 'Funding Received by Year', color: '#013143' } },
        scales: { y: { beginAtZero: true } },
      }),
    });
    // 3. Site Exposure
    const trafficLabels = siteMetrics.map((m) => m.label);
    const trafficData = siteMetrics.map((m) => m.footTraffic || 0);
    renderChart('ct-sponsor-3', {
      type: 'bar',
      data: {
        labels: trafficLabels,
        datasets: [{ label: 'Est. Monthly Foot Traffic', data: trafficData, backgroundColor: colorFor(2) }],
      },
      options: baseOptions({
        plugins: { legend: { display: false }, title: { display: true, text: 'Site Exposure — Estimated Monthly Foot Traffic', color: '#013143' } },
        scales: { y: { beginAtZero: true, title: { display: true, text: 'People / Month' } } },
      }),
    });
    // 4. Exposure Relative to Population
    const relLabels = [];
    const relData = [];
    siteMetrics.forEach((m) => {
      const ratio = safeDivide(m.footTraffic, m.population);
      if (ratio !== null) {
        relLabels.push(m.label);
        relData.push(+(ratio * 100).toFixed(1));
      }
    });
    renderChart('ct-sponsor-4', {
      type: 'bar',
      data: {
        labels: relLabels,
        datasets: [{ label: 'Foot Traffic as % of Population', data: relData, backgroundColor: colorFor(3) }],
      },
      options: baseOptions({
        plugins: {
          legend: { display: false },
          title: { display: true, text: 'Exposure Relative to Population (Foot Traffic ÷ Population)', color: '#013143' },
        },
        scales: { y: { beginAtZero: true, title: { display: true, text: '% of Population / Month' } } },
      }),
    });
    // 5. Total Investment vs Books
    const totalFunding = investments.reduce((s, inv) => s + (toNum(inv.fundingAmount) || 0), 0);
    let totalBooks = 0;
    Object.values(communities).forEach((c) => {
      recordsFor(c, 'library').forEach((rec) => {
        totalBooks += toNum(rec.booksDeliveredQuantity) || 0;
      });
    });
    renderChart('ct-sponsor-5', {
      type: 'bar',
      data: {
        labels: ['All Communities Combined'],
        datasets: [
          { label: 'Total Funding Raised ($)', data: [totalFunding], backgroundColor: colorFor(4), yaxisID: 'y' },
          { label: 'Total Books Delivered', data: [totalBooks], backgroundColor: colorFor(5), yaxisID: 'y1' },
        ],
      },
      options: baseOptions({
        plugins: { title: { display: true, text: 'Total Investment vs. Books Delivered — Org-Wide', color: '#013143' } },
        scales: {
          y: { type: 'linear', position: 'left', beginAtZero: true, title: { display: true, text: 'Funding ($)' } },
          y1: { type: 'linear', position: 'right', beginAtZero: true, grid: { drawOnChartArea: false }, title: { display: true, text: 'Books Delivered' } },
        },
      }),
    });
  }
  function renderImpactCharts(communities) {
    console.log('literacyScore field exists?', !!FIELD_BY_ID['outcomes.items.literacyScore']);
    console.log('physicalVisits field exists?', !!FIELD_BY_ID['library.items.physicalVisitsPerMonth']);
    communities = communities || {};
    const siteMetrics = getLatestLibraryMetrics(communities);
    console.log('Impact charts – communities:', Object.keys(communities).length);
    console.log('Sample community data:', Object.values(communities)[0]);
    // A. Benchmark trajectories
    BENCHMARK_PAIRS.outcomes.forEach((pair, i) => {
      const localField = FIELD_BY_ID[`outcomes.items.${pair.local}`];
      const benchField = FIELD_BY_ID[`outcomes.items.${pair.benchmark}`];
      console.log(`Benchmark ${i} (${pair.label}): localField=`, localField, 'benchField=', benchField);
      if (!localField || !benchField) return;
      const localVals = ASSESSMENT_POINTS.map((p) => avgAtPoint(Object.values(communities), localField, p));
      const benchVals = ASSESSMENT_POINTS.map((p) => avgAtPoint(Object.values(communities), benchField, p));
      console.log(`Benchmark ${i} localVals:`, localVals, 'benchVals:', benchVals);
      renderChart(`ct-impact-benchmark-${i}`, {
        type: 'line',
        data: {
          labels: ASSESSMENT_POINTS,
          datasets: [
            { label: `Our ${pair.label}`, data: localVals, borderColor: colorFor(i * 2), backgroundColor: colorFor(i * 2) + '33', fill: true, tension: 0.3 },
            {
              label: 'National/State Average',
              data: benchVals,
              borderColor: colorFor(i * 2 + 1),
              backgroundColor: colorFor(i * 2 + 1) + '33',
              fill: true,
              tension: 0.3,
            },
          ],
        },
        options: baseOptions({ plugins: { title: { display: true, text: `${pair.label} vs. National/State Average`, color: '#013143' } } }),
      });
    });
    // B. Books Delivered per Participant — broken down by community
    const communityLabels = [];
    const communityRatios = [];
    Object.values(communities).forEach((c) => {
      let books = 0;
      recordsFor(c, 'library').forEach((rec) => {
        books += toNum(rec.booksDeliveredQuantity) || 0;
      });
      const participants = resolveScalar(c, FIELD_BY_ID['population.participantsServed']) || 0;
      const ratio = safeDivide(books, participants);
      communityLabels.push(communityLabel(c));
      communityRatios.push(ratio ? +ratio.toFixed(2) : 0);
    });
    renderChart('ct-impact-books-per-participant', {
      type: 'bar',
      data: {
        labels: communityLabels,
        datasets: [{ label: 'Books Delivered per Participant', data: communityRatios, backgroundColor: colorFor(6) }],
      },
      options: baseOptions({
        plugins: { legend: { display: false }, title: { display: true, text: 'Books Delivered per Participant by Community', color: '#013143' } },
        scales: { y: { beginAtZero: true } },
      }),
    });
    // C. Foot Traffic + Restock Rate per site
    const labels = siteMetrics.map((m) => m.label);
    renderChart('ct-impact-traffic-restock', {
      type: 'bar',
      data: {
        labels,
        datasets: [
          { label: 'Physical Visits / Month', data: siteMetrics.map((m) => m.visits || 0), backgroundColor: colorFor(7), yaxisID: 'y' },
          { label: 'Restock Rate (per 6 mo)', data: siteMetrics.map((m) => m.restock || 0), backgroundColor: colorFor(8), yaxisID: 'y1' },
        ],
      },
      options: baseOptions({
        plugins: { title: { display: true, text: 'Foot Traffic & Restock Rate per Site', color: '#013143' } },
        scales: {
          y: { type: 'linear', position: 'left', beginAtZero: true, title: { display: true, text: 'Visits / Month' } },
          y1: { type: 'linear', position: 'right', beginAtZero: true, grid: { drawOnChartArea: false }, title: { display: true, text: 'Restock Rate' } },
        },
      }),
    });
    // D. Library Engagement
    const visits = ASSESSMENT_POINTS.map((p) => avgAtPoint(Object.values(communities), FIELD_BY_ID['library.items.physicalVisitsPerMonth'], p));
    const restock = ASSESSMENT_POINTS.map((p) => avgAtPoint(Object.values(communities), FIELD_BY_ID['library.items.restockRate'], p));
    renderChart('ct-impact-library', {
      type: 'line',
      data: {
        labels: ASSESSMENT_POINTS,
        datasets: [
          { label: 'Avg Physical Visits / Month', data: visits, borderColor: colorFor(9), tension: 0.3 },
          { label: 'Avg Restock Rate', data: restock, borderColor: colorFor(10), tension: 0.3 },
        ],
      },
      options: baseOptions({ plugins: { title: { display: true, text: 'Library Engagement Growth Across Milestones', color: '#013143' } } }),
    });
  }
  function renderExpenseCharts(expenses) {
    if (!expenses || !expenses.length) return;
    const catField = FIELD_BY_ID['expenses.overheadExpenseCategory'];
    const amtField = FIELD_BY_ID['expenses.overheadExpenseAmount'];
    const dateField = FIELD_BY_ID['expenses.dateIncurred'];
    function sumBy(fieldDef) {
      const totals = {};
      expenses.forEach((e) => {
        const amt = amtField ? resolveStandaloneField(e, amtField) || 0 : 0;
        const key = fieldDef ? resolveStandaloneField(e, fieldDef) ?? 'Uncategorized' : 'Uncategorized';
        totals[key] = (totals[key] || 0) + amt;
      });
      return totals;
    }
    const byCategory = sumBy(catField);
    const categoryLabels = Object.keys(byCategory);
    renderChart('ct-expense-1', {
      type: 'pie',
      data: {
        labels: categoryLabels,
        datasets: [{ data: categoryLabels.map((l) => byCategory[l]), backgroundColor: categoryLabels.map((_, i) => colorFor(i)) }],
      },
      options: baseOptions({
        maintainAspectRatio: false,
        plugins: { legend: { position: 'right' }, title: { display: true, text: 'Overhead Spend by Category', color: '#013143' } },
      }),
    });
    // Extract year from dateIncurred field
    const byYear = {};
    expenses.forEach((e) => {
      const amt = amtField ? resolveStandaloneField(e, amtField) || 0 : 0;
      const dateStr = dateField ? resolveStandaloneField(e, dateField) : null;
      const year = dateStr ? new Date(dateStr).getFullYear() : 'Unknown';
      byYear[year] = (byYear[year] || 0) + amt;
    });
    const yearLabels = Object.keys(byYear).sort();
    renderChart('ct-expense-2', {
      type: 'bar',
      data: {
        labels: yearLabels,
        datasets: [{ label: 'Overhead Spend ($)', data: yearLabels.map((y) => byYear[y]), backgroundColor: colorFor(1) }],
      },
      options: baseOptions({
        plugins: { legend: { display: false }, title: { display: true, text: 'Overhead Spend by Year', color: '#013143' } },
        scales: { y: { beginAtZero: true } },
      }),
    });
  }

  // --- Main HTML generator ---
    function renderChartsTab(state = {}) {
      const { communities = [], investments = [], expenses = [], activeChartCategory = 'sponsorship', charts = [], toast } = state;
      const msgHtml = toast ? `<div class="th-msg th-msg-${toast.type}">${esc(toast.text)}</div>` : '';
  
      if (!Object.keys(communities).length && !investments.length && !expenses.length) {
        return `<div class="th-card-orange">${msgHtml}<div class="th-empty">No community, investment, or expense data available yet.</div></div>`;
      }
  
      const categoryCharts = charts.filter(ch =>
        ch.category === activeChartCategory ||
        (activeChartCategory === 'sponsorship' && ch.category === 'sponsor') ||
        (activeChartCategory === 'partner' && ch.category === 'impact')
      );
      const dynamicChartsHtml = categoryCharts.length
        ? `<div class="th-chart-grid">${categoryCharts.map(ch => `
          <div class="ch-card-sm">
            <div style="position:relative; min-height:45vh;"><canvas id="ct-custom-${esc(ch.id)}"></canvas></div>
            <button class="th-button th-button-small th-button-ghost"
              data-action="delete-chart"
              data-chart-id="${esc(ch.id)}"
              data-ct-delete="${esc(ch.id)}">Delete</button>
          </div>`).join('')}</div>`
        : '';

      if (activeChartCategory === 'customBuilder' || activeChartCategory === 'custom') {
        // Render custom builder HTML directly in the tab
        const customBuilderHTML = getCustomBuilderHTML();
        setTimeout(() => initCustomBuilderDOM(), 0);
        return `<div class="th-card-orange">${msgHtml}${customBuilderHTML}</div>`;
      }

      if (activeChartCategory === 'sponsorship' || activeChartCategory === 'sponsor') {
        return `<div class="th-cardTop">
        <div class="th-card-green">
          <p class="th-section-label">Sponsorship Stats</p>
          ${msgHtml}
          <div class="th-chart-grid">
            <div class="ch-card-sm">
              <div style="position:relative; min-height:45vh;"><canvas id="ct-sponsor-1"></canvas></div>
            </div>
            <div class="ch-card-sm">
              <div style="position:relative; min-height:45vh;"><canvas id="ct-sponsor-2"></canvas></div>
            </div>
            <div class="ch-card-sm">
              <div style="position:relative; min-height:45vh;"><canvas id="ct-sponsor-3"></canvas></div>
            </div>
            <div class="ch-card-sm">
              <div style="position:relative; min-height:45vh;"><canvas id="ct-sponsor-4"></canvas></div>
            </div>
            <div class="ch-card-sm">
              <div style="position:relative; min-height:45vh;"><canvas id="ct-sponsor-5"></canvas></div>
            </div>
          </div>
          ${expenses.length ? `
          <div class="th-chart-grid">
            <div class="ch-card-sm">
              <div style="position:relative; min-height:45vh;"><canvas id="ct-expense-1"></canvas></div>
            </div>
            <div class="ch-card-sm">
              <div style="position:relative; min-height:45vh;"><canvas id="ct-expense-2"></canvas></div>
            </div>
          </div>` : ''}
          ${dynamicChartsHtml}
        </div>`;
      }
  
      if (activeChartCategory === 'partner' || activeChartCategory === 'impact') {
        return `<div class="th-cardTop">
        <div class="th-card-green">
          <p class="th-section-label">Impact Measurements</p>
          ${msgHtml}
          <div class="th-chart-grid">
            <div class="ch-card-sm">
              <div style="position:relative; min-height:45vh;"><canvas id="ct-impact-books-per-participant"></canvas></div>
            </div>
            <div class="ch-card-sm">
              <div style="position:relative; min-height:45vh;"><canvas id="ct-impact-traffic-restock"></canvas></div>
            </div>
            ${BENCHMARK_PAIRS.outcomes.map((pair, i) => `
            <div class="ch-card-sm">
              <div style="position:relative; min-height:45vh;"><canvas id="ct-impact-benchmark-${i}"></canvas></div>
            </div>`).join('')}
            <div class="ch-card-sm">
              <div style="position:relative; min-height:45vh;"><canvas id="ct-impact-library"></canvas></div>
            </div>
          </div>
          ${dynamicChartsHtml}
        </div>`;
      }

  
      return `<div class="th-empty">Unknown chart category.</div>`;
    }
    
  // --- Main chart execution ---
  function renderCharts(state = {}) {
    const { communities = [], investments = [], expenses = [], activeChartCategory = 'sponsorship' } = state;

    if (activeChartCategory === 'sponsorship' || activeChartCategory === 'sponsor') {
      if (investments.length || Object.keys(communities).length) {
        renderSponsorCharts(investments, communities);
      }
      if (expenses.length) {
        renderExpenseCharts(expenses);
      }
    } else if (activeChartCategory === 'partner' || activeChartCategory === 'impact') {
      if (Object.keys(communities).length) {
        renderImpactCharts(communities);
      }
    }
  }

  return { renderChartsTab, renderCharts };
}

export { ASSESSMENT_POINTS };
