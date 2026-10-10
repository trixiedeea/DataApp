// Custom Chart Builder Module
// ============================================================

import { ASSESSMENT_POINTS } from './schema.js';

// ============================================================
// Render Custom Builder HTML (outside IIFE so it can be exported)
// ============================================================
function renderCustomBuilderHTML() {
  return `
<header>
  <div>Chart Wizard</div>
  <h1>Build a chart from source data</h1>
  <p>Start By Picking A Data Series</p>
</header>
<div id="loadBanner"></div>
  <main>
  <div class="th-contentTwo">
    <div class="workbench">
      <!-- LEFT: CONTROLS -->
      <div class="controls">
        <div class="section-label">Data Source</div>
        <div class="field-block">
          <label>Source</label>
          <select id="thselectTwo"></select>
          <div class="hint" id="srcHint"></div>
        </div>

        <div id="seriesBuilder"></div>

        <div class="section-label">Chart Type</div>
        <div class="field-block" style="padding-bottom:6px;">
          <div class="hint" id="typeConstraintNote" style="margin-bottom:10px;"></div>
          <div class="chart-type-grid" id="chartTypeGrid"></div>
        </div>

        <details class="opt-details">
          <summary>Chart Style &amp; Layout Options</summary>
          <div class="opt-group">
            <h4>Root Configuration</h4>
            <div class="opt-row">
              <label>Maintain Aspect Ratio</label>
              <label class="switch">
                <input type="checkbox" id="opt-maintainAspectRatio">
                <span class="slider">
                </span>
              </label>
            </div>
            <div class="opt-row">
              <label>Aspect Ratio</label>
              <input type="number" id="opt-aspectRatio" step="0.1" value="2">
            </div>
            <div class="opt-row">
              <label>Resize Delay (ms)</label>
              <input type="number" id="opt-resizeDelay" value="0" min="0">
            </div>
          </div>
          <div class="opt-group">
            <h4>Scales &amp; Axes</h4>
            <div class="opt-row">
              <label>Show Axes</label>
              <label class="switch">
                <input type="checkbox" id="opt-scalesDisplay" checked>
                <span class="slider">
                </span>
              </label>
            </div>
            <div class="opt-row">
              <label>Y Min</label>
              <input type="number" id="opt-yMin" placeholder="auto">
            </div>
            <div class="opt-row">
              <label>Y Max</label>
              <input type="number" id="opt-yMax" placeholder="auto">
            </div>
            <div class="opt-row">
              <label>Stacked</label>
              <label class="switch">
                <input type="checkbox" id="opt-stacked">
                <span class="slider">
                </span>
              </label>
            </div>
            <div class="opt-row">
              <label>Line Fill (area)</label>
              <label class="switch">
                <input type="checkbox" id="opt-fill">
                <span class="slider">
                </span>
              </label>
            </div>
            <div class="opt-row">
              <label>Grid Lines</label>
              <label class="switch">
                <input type="checkbox" id="opt-gridDisplay" checked>
                <span class="slider">
                </span>
              </label>
            </div>
            <div class="opt-row">
              <label>Grid Color</label>
              <input type="color" id="opt-gridColor" value="#ffffff">
            </div>
          </div>
          <div class="opt-group">
            <h4>Plugins</h4>
            <div class="opt-row">
              <label>Legend</label>
              <label class="switch">
                <input type="checkbox" id="opt-legendDisplay" checked>
                <span class="slider">
                </span>
              </label>
            </div>
            <div class="opt-row">
              <label>Legend Position</label>
              <select id="opt-legendPosition">
                <option value="top">Top</option>
                <option value="bottom" selected>Bottom</option>
                <option value="left">Left</option>
                <option value="right">Right</option>
              </select>
            </div>
            <div class="opt-row">
              <label>Title</label>
              <label class="switch">
                <input type="checkbox" id="opt-titleDisplay" checked>
                <span class="slider">
                </span>
              </label>
            </div>
              <input type="text" id="opt-titleText" style="width:100%;margin-bottom:9px;" placeholder="Chart title (auto if blank)">
            <div class="opt-row">
              <label>Tooltips</label>
              <label class="switch">
                <input type="checkbox" id="opt-tooltipEnabled" checked>
                <span class="slider">
                </span>
              </label>
            </div>
            <div class="opt-row"><label>Tooltip Mode</label>
              <select id="opt-tooltipMode"><option value="index">Index</option>
                <option value="dataset">Dataset</option>
                <option value="nearest">Nearest</option>
                <option value="point">Point</option>
              </select>
            </div>
          </div>
        </details>
      </div>

      <!-- RIGHT: LIVE PREVIEW + CODE -->
      <div class="preview-col">
        <div class="summary-strip" id="summaryStrip"></div>
        <div class="preview-wrap">
          <div class="chart-box"><canvas id="liveChart"></canvas></div>
        </div>
      </div>
    </div>
  </div>
</main>
  `;
}

export function getCustomBuilderHTML() {
  return renderCustomBuilderHTML();
}

let initCustomBuilderDOMRef = null;

export function initCustomBuilderDOM() {
  if (initCustomBuilderDOMRef) {
    initCustomBuilderDOMRef();
  }
}

(async function initCustomBuilder() {

  // ============================================================
  // 0. Load data dynamically (no hard-coded records)
  // ============================================================
const { Chart } = window;

  let RAW = { communities: {}, expenses: [], investments: [] };
  const loadErrors = [];

  async function loadJSON(path) {
    const res = await fetch(path, { cache: 'no-store' });
    if (!res.ok) throw new Error('HTTP ' + res.status);
    return res.json();
  }
  async function loadAll() {
    const [dRes, eRes, iRes] = await Promise.allSettled([
      loadJSON('./data.json'), loadJSON('./expenses.json'), loadJSON('./investments.json')
    ]);
    if (dRes.status === 'fulfilled') RAW.communities = dRes.value.communities || {};
    else loadErrors.push('data.json failed to load (' + dRes.reason + ') — Community Profile and Assessment &amp; Outcomes sources are unavailable.');
    if (eRes.status === 'fulfilled') RAW.expenses = Array.isArray(eRes.value) ? eRes.value : [];
    else loadErrors.push('expenses.json failed to load (' + eRes.reason + ') — Sponsor Spending source is unavailable.');
    if (iRes.status === 'fulfilled') RAW.investments = Array.isArray(iRes.value) ? iRes.value : [];
    else loadErrors.push('investments.json failed to load (' + iRes.reason + ') — Investments and Sponsor Spending sources are unavailable.');
  }
  function renderLoadBanner() {
    const el = document.getElementById('loadBanner');
    if (loadErrors.length) {
      el.classList.add('show');
      el.innerHTML = '<b>Data load warning —</b> ' + loadErrors.join(' ');
    }
  }

  await loadAll();
  renderLoadBanner();

  // ============================================================
  // 1. Helpers
  // ============================================================
  function numOrNull(v) { return (v === undefined || v === null || v === '') ? null : (isNaN(Number(v)) ? null : Number(v)); }
  function humanize(key) {
    const spaced = String(key).replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  }
  function humanizeAssessmentField(key) {
    let prefix = '', rest = key;
    if (/^nationalStateAverage/.test(key)) { prefix = 'National/State Avg \u2014 '; rest = key.slice('nationalStateAverage'.length); }
    else if (/^nationalState/.test(key)) { prefix = 'National/State \u2014 '; rest = key.slice('nationalState'.length); }
    const spaced = rest.replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    const label = spaced.charAt(0).toUpperCase() + spaced.slice(1);
    return prefix + label;
  }
  function communityList() { return Object.values(RAW.communities); }
  function programIdOf(inv) {
    const m = /\(([^)]+)\)\s*$/.exec(inv.fundsOutcome || '');
    return m ? m[1] : null;
  }
  function communityByProgramIdMap() {
    const m = {};
    communityList().forEach(c => { if (c.program && c.program.programId) m[c.program.programId] = c; });
    return m;
  }
  const PALETTE = [    
    '#0488b5',
    '#5a04b5',
    '#04b59d',
    '#c084fc',
    '#0b64e0',
    '#20618d',
    '#38026c',
    '#b504ac',
    '#019504',
    '#182d78',
    '#b51904',
    '#20808d'];
  const colorMap = {};
  function colorFor(key) { const k = String(key); if (!(k in colorMap)) colorMap[k] = PALETTE[Object.keys(colorMap).length % PALETTE.length]; return colorMap[k]; }
  function hexToRgba(hex, alpha) {
    const h = hex.replace('#', '');
    const r = parseInt(h.substring(0, 2), 16), g = parseInt(h.substring(2, 4), 16), b = parseInt(h.substring(4, 6), 16);
    return 'rgba(' + r + ',' + g + ',' + b + ',' + alpha + ')';
  }
  function aggregate(values, fn) {
    if (fn === 'count') return values.length;
    const nums = values.filter(v => v !== null && v !== undefined && !isNaN(v));
    if (nums.length === 0) return null;
    switch (fn) {
      case 'sum': return nums.reduce((a, b) => a + b, 0);
      case 'avg': return nums.reduce((a, b) => a + b, 0) / nums.length;
      case 'min': return Math.min(...nums);
      case 'max': return Math.max(...nums);
      default: return null;
    }
  }
  function sortedUniqueGeneric(rows, field, timeLike) {
    const vals = [...new Set(rows.map(r => r[field]).filter(v => v !== null && v !== undefined && v !== ''))];
    if (timeLike) return vals.sort((a, b) => new Date(a) - new Date(b));
    return vals.sort();
  }

  // ============================================================
  // 2. Derived row builders (recomputed once after load)
  // ============================================================
  function buildCommunityRows() {
    return communityList().map(c => ({
      communityName: c.geography.communityName,
      bookEcosystem: c.geography.bookEcosystem,
      region: c.geography.region,
      reportingYear: c.population.reportingYear,
      ruralUrban: c.population.ruralUrban,
      status: c.program.status || 'Unknown',
      startDate: c.program.startDate || null,
      publicSchoolLibrary: (c.library && c.library.publicSchoolLibrary) || 'Unknown',
      population: numOrNull(c.population.population),
      participantsServed: numOrNull(c.population.participantsServed),
      estimatedFootTraffic: numOrNull(c.population.estimatedFootTraffic),
      reachPercent: (c.population.population && c.population.participantsServed != null) ? (100 * c.population.participantsServed / c.population.population) : null,
    }));
  }
  function buildInvestmentRows() {
    const cbp = communityByProgramIdMap();
    return RAW.investments.map(inv => {
      const pid = programIdOf(inv);
      const c = pid ? cbp[pid] : null;
      return {
        fundingBody: inv.fundingBody,
        fundingSourceType: inv.fundingSourceType,
        sponsorId: inv.Sponsor_ID,
        matchedCommunity: c ? c.geography.communityName : 'Unmatched',
        matchedEcosystem: c ? c.geography.bookEcosystem : 'Unmatched',
        dateReceived: inv.dateReceived,
        dateDisbursed: inv.dateDisbursed,
        fundingAmount: numOrNull(inv.fundingAmount),
      };
    });
  }
  function buildSponsorSpendingRows() {
    const cbp = communityByProgramIdMap();
    const invById = {}; RAW.investments.forEach(inv => invById[inv.investmentId] = inv);
    return RAW.expenses.map(e => {
      const inv = invById[e.expensePaymentSource] || null;
      const pid = inv ? programIdOf(inv) : null;
      const c = pid ? cbp[pid] : null;
      return {
        overheadExpenseCategory: e.overheadExpenseCategory,
        overheadExpenseAmount: numOrNull(e.overheadExpenseAmount),
        dateIncurred: e.dateIncurred,
        fundingBody: inv ? inv.fundingBody : 'Unmatched',
        sponsorId: inv ? inv.Sponsor_ID : 'Unmatched',
        fundingSourceType: inv ? inv.fundingSourceType : 'Unmatched',
        fundingAmount: inv ? numOrNull(inv.fundingAmount) : null,
        dateReceived: inv ? inv.dateReceived : null,
        dateDisbursed: inv ? inv.dateDisbursed : null,
        matchedCommunity: c ? c.geography.communityName : 'Unmatched',
        matchedEcosystem: c ? c.geography.bookEcosystem : 'Unmatched',
      };
    });
  }

  function buildLibraryRows() {
    const rows = [];
    communityList().forEach(c => {
      ((c.library && c.library.items) || []).forEach(it => {
        rows.push({
          communityName: c.geography.communityName,
          bookEcosystem: c.geography.bookEcosystem,
          region: c.geography.region,
          ruralUrban: c.population.ruralUrban,
          status: c.program.status || 'Unknown',
          assessmentPoint: it.assessmentPoint,
          collectionQuality: it.collectionQuality || 'Unknown',
          physicalVisitsPerMonth: numOrNull(it.physicalVisitsPerMonth),
          restockRate: numOrNull(it.restockRate),
          booksDeliveredQuantity: numOrNull(it.booksDeliveredQuantity),
        });
      });
    });
    return rows;
  }

  const ASSESSMENT_META = { fieldTypes: {}, numericFields: [], categoryFields: [], pointsOrder: [], benchmarkPairs: {} };
  function discoverAssessmentFields() {
    const fieldTypes = {};
    const pointsSet = new Set();
    communityList().forEach(c => {
      const libItems = (c.library && c.library.items) || [];
      const outItems = (c.outcomes && c.outcomes.items) || [];
      [...libItems, ...outItems].forEach(item => {
        if (item.assessmentPoint) pointsSet.add(item.assessmentPoint);
        Object.keys(item).forEach(k => {
          if (k === 'assessmentPoint' || fieldTypes[k]) return;
          const v = item[k];
          if (v === null || v === undefined) return;
          fieldTypes[k] = (typeof v === 'number') ? 'numeric' : 'category';
        });
      });
    });
    function pointRank(p) {
      if (/^baseline$/i.test(p)) return -1;
      const m = /(\d+)/.exec(p);
      return m ? Number(m[1]) : 9999;
    }
    const points = [...pointsSet].sort((a, b) => pointRank(a) - pointRank(b) || String(a).localeCompare(String(b)));
    const pairs = {};
    Object.keys(fieldTypes).filter(k => fieldTypes[k] === 'numeric' && /^nationalState/.test(k)).forEach(bk => {
      let rest = bk.replace(/^nationalStateAverage/, '');
      if (rest === bk) rest = bk.replace(/^nationalState/, '');
      if (rest === bk) return;
      const candidate = rest.charAt(0).toLowerCase() + rest.slice(1);
      if (fieldTypes[candidate] === 'numeric') pairs[candidate] = bk;
    });
    ASSESSMENT_META.fieldTypes = fieldTypes;
    ASSESSMENT_META.numericFields = Object.keys(fieldTypes).filter(k => fieldTypes[k] === 'numeric');
    ASSESSMENT_META.categoryFields = Object.keys(fieldTypes).filter(k => fieldTypes[k] === 'category');
    ASSESSMENT_META.pointsOrder = points;
    ASSESSMENT_META.benchmarkPairs = pairs;
  }
  function buildAssessmentRows() {
    const rows = [];
    communityList().forEach(c => {
      const libByPoint = {}; ((c.library && c.library.items) || []).forEach(it => libByPoint[it.assessmentPoint] = it);
      const outByPoint = {}; ((c.outcomes && c.outcomes.items) || []).forEach(it => outByPoint[it.assessmentPoint] = it);
      const points = new Set([...Object.keys(libByPoint), ...Object.keys(outByPoint)]);
      points.forEach(p => {
        const row = {
          communityName: c.geography.communityName,
          bookEcosystem: c.geography.bookEcosystem,
          region: c.geography.region,
          ruralUrban: c.population.ruralUrban,
          status: c.program.status || 'Unknown',
          assessmentPoint: p,
        };
        const li = libByPoint[p] || {}; const oi = outByPoint[p] || {};
        ASSESSMENT_META.numericFields.concat(ASSESSMENT_META.categoryFields).forEach(f => {
          row[f] = (f in li) ? li[f] : ((f in oi) ? oi[f] : null);
        });
        rows.push(row);
      });
    });
    return rows;
  }
  function assessmentContextFields() {
    const base = [
      { key: 'communityName', label: 'Community', role: 'category' },
      { key: 'bookEcosystem', label: 'Book Ecosystem', role: 'category' },
      { key: 'region', label: 'Region', role: 'category' },
      { key: 'ruralUrban', label: 'Rural / Urban', role: 'category' },
      { key: 'status', label: 'Program Status', role: 'category' },
    ];
    const dyn = ASSESSMENT_META.categoryFields.map(k => ({ key: k, label: humanizeAssessmentField(k), role: 'category' }));
    return base.concat(dyn);
  }
  function assessmentMetricFields() {
    return ASSESSMENT_META.numericFields.map(k => ({ key: k, label: humanizeAssessmentField(k), role: 'numeric', isBenchmark: /^nationalState/.test(k) }));
  }
  function assessGroupLabel(key) {
    const f = assessmentContextFields().find(f => f.key === key);
    return f ? f.label : humanize(key);
  }

  let SOURCES = {};
  let ASSESSMENT_ROWS = [];
  function buildSources() {
    discoverAssessmentFields();
    ASSESSMENT_ROWS = buildAssessmentRows();
    SOURCES = {
      communityProfile: {
        label: 'Community Profile',
        rows: buildCommunityRows(),
        fields: [
          { key: 'communityName', label: 'Community', role: 'category' },
          { key: 'bookEcosystem', label: 'Book Ecosystem', role: 'category' },
          { key: 'region', label: 'Region', role: 'category' },
          { key: 'ruralUrban', label: 'Rural / Urban', role: 'category' },
          { key: 'status', label: 'Program Status', role: 'category' },
          { key: 'publicSchoolLibrary', label: 'Public / School Library', role: 'category' },
          { key: 'reportingYear', label: 'Reporting Year', role: 'category' },
          { key: 'startDate', label: 'Ecosystem Start Date', role: 'time' },
          { key: 'population', label: 'Community Population', role: 'numeric' },
          { key: 'participantsServed', label: 'Participants Served', role: 'numeric' },
          { key: 'estimatedFootTraffic', label: 'Estimated Foot Traffic', role: 'numeric' },
          { key: 'reachPercent', label: 'Reach (% of Population)', role: 'numeric' },
        ],
      },
      investments: {
        label: 'Investments (funding received)',
        rows: buildInvestmentRows(),
        fields: [
          { key: 'fundingBody', label: 'Funding Body', role: 'category' },
          { key: 'fundingSourceType', label: 'Funding Source Type', role: 'category' },
          { key: 'sponsorId', label: 'Sponsor ID', role: 'category' },
          { key: 'matchedCommunity', label: 'Matched Community', role: 'category' },
          { key: 'matchedEcosystem', label: 'Matched Book Ecosystem', role: 'category' },
          { key: 'dateReceived', label: 'Date Received', role: 'time' },
          { key: 'dateDisbursed', label: 'Date Disbursed', role: 'time' },
          { key: 'fundingAmount', label: 'Funding Amount (USD)', role: 'numeric' },
        ],
      },
      libraryMetrics: {
        label: 'Library Metrics (visits, restock, deliveries)',
        rows: buildLibraryRows(),
        fields: [
          { key: 'communityName', label: 'Community', role: 'category' },
          { key: 'bookEcosystem', label: 'Book Ecosystem', role: 'category' },
          { key: 'region', label: 'Region', role: 'category' },
          { key: 'ruralUrban', label: 'Rural / Urban', role: 'category' },
          { key: 'status', label: 'Program Status', role: 'category' },
          { key: 'assessmentPoint', label: 'Assessment Point', role: 'category' },
          { key: 'collectionQuality', label: 'Collection Quality', role: 'category' },
          { key: 'physicalVisitsPerMonth', label: 'Physical Visits / Month', role: 'numeric' },
          { key: 'restockRate', label: 'Restock Rate', role: 'numeric' },
          { key: 'booksDeliveredQuantity', label: 'Books Delivered (Qty)', role: 'numeric' },
        ],
      },
      sponsorSpending: {
        label: 'Sponsor Spending (expenses \u2194 investments)',
        rows: buildSponsorSpendingRows(),
        fields: [
          { key: 'overheadExpenseCategory', label: 'Expense Category', role: 'category' },
          { key: 'fundingBody', label: 'Funding Body', role: 'category' },
          { key: 'sponsorId', label: 'Sponsor ID', role: 'category' },
          { key: 'fundingSourceType', label: 'Funding Source Type', role: 'category' },
          { key: 'matchedCommunity', label: 'Matched Community', role: 'category' },
          { key: 'matchedEcosystem', label: 'Matched Book Ecosystem', role: 'category' },
          { key: 'dateIncurred', label: 'Date Incurred', role: 'time' },
          { key: 'dateReceived', label: 'Investment Date Received', role: 'time' },
          { key: 'dateDisbursed', label: 'Investment Date Disbursed', role: 'time' },
          { key: 'overheadExpenseAmount', label: 'Expense Amount (USD)', role: 'numeric' },
          { key: 'fundingAmount', label: 'Parent Investment Amount (USD)', role: 'numeric' },
        ],
      },
    };
  }
  buildSources();

  function fieldsOf(sourceKey) { return SOURCES[sourceKey].fields; }
  function fieldMeta(sourceKey, key) { return fieldsOf(sourceKey).find(f => f.key === key); }

  // ============================================================
  // 3. Wizard state
  // ============================================================
  const state = {
    source: 'assessment',
    // flat sources (communityProfile / investments / sponsorSpending)
    x: null, y: null, z: '', groupBy: 'NONE', agg: 'avg',
    // assessment source
    metric: null, compareBenchmark: false, mode: 'trend',
    assessGroupBy: 'NONE', assessAgg: 'avg', assessPoints: [],
    chartType: null,
    options: {},
  };

  // ============================================================
  // 4. Chart type catalog + availability
  // ============================================================
  const CHART_TYPES = [
    { key: 'bar', name: 'Bar', icon: '\u25a4 bar', desc: 'Compares discrete values across categories or time. Supports stacking.' },
    { key: 'line', name: 'Line', icon: '\u27cb line', desc: 'Trend across a continuous or time-ordered axis. Toggle fill for an area chart.' },
    { key: 'pie', name: 'Pie', icon: '\u25d4 pie', desc: 'Share of the whole. Needs exactly one series.' },
    { key: 'doughnut', name: 'Doughnut', icon: '\u25ef ring', desc: 'Same as pie, with a cutout center. Needs exactly one series.' },
    { key: 'radar', name: 'Radar', icon: '\u2726 radar', desc: 'Multivariate comparison on axes from a shared center point.' },
    { key: 'polarArea', name: 'Polar Area', icon: '\u273a polar', desc: 'Like pie, but value maps to radius. Needs exactly one series.' },
    { key: 'bubble', name: 'Bubble', icon: '\u25cb bubble', desc: 'X, Y, and a Z field sized as bubble radius.' },
    { key: 'scatter', name: 'Scatter', icon: '\u2234 scatter', desc: 'Plots X vs Y points to look for correlation.' },
  ];

  function availableChartTypes() {
    if (state.source === 'assessment') {
      if (state.mode === 'trend') return ['line', 'bar'];
      const grouped = state.assessAgg === 'raw' || state.assessGroupBy !== 'NONE';
      const numSeries = Math.max(state.assessPoints.length, 1) * (state.compareBenchmark ? 2 : 1);
      if (numSeries === 1) return grouped ? ['bar', 'radar', 'pie', 'doughnut', 'polarArea'] : ['bar'];
      return grouped ? ['bar', 'radar'] : ['bar'];
    }
    const xMeta = fieldMeta(state.source, state.x);
    if (!xMeta) return ['bar'];
    const grouped = state.groupBy !== 'NONE';
    if (xMeta.role === 'numeric') {
      const avail = ['scatter']; if (state.z) avail.push('bubble'); return avail;
    }
    if (xMeta.role === 'time') return ['line', 'bar'];
    const avail = ['bar', 'radar']; if (!grouped) avail.push('pie', 'doughnut', 'polarArea');
    return avail;
  }
  function chartTypeConstraintNote() {
    if (state.source === 'assessment') {
      if (state.mode === 'trend') return 'Assessment points form a time axis \u2014 only Line and Bar can plot a trend across them.';
      const n = Math.max(state.assessPoints.length, 1) * (state.compareBenchmark ? 2 : 1);
      return n === 1
        ? 'One series selected \u2014 all shapes are available.'
        : 'Multiple assessment points (and/or the benchmark overlay) selected \u2014 that\u2019s ' + n + ' series, so Pie / Doughnut / Polar Area are locked.';
    }
    const xMeta = fieldMeta(state.source, state.x);
    if (!xMeta) return '';
    return 'X axis is ' + xMeta.role + ' (' + xMeta.label + ') \u2014 only chart types that plot this shape logically are enabled.';
  }
  function renderChartTypeGrid() {
    const avail = availableChartTypes();
    document.getElementById('typeConstraintNote').textContent = chartTypeConstraintNote();
    if (!avail.includes(state.chartType)) state.chartType = avail[0];
    const grid = document.getElementById('chartTypeGrid');
    grid.innerHTML = CHART_TYPES.map(ct => {
      const locked = !avail.includes(ct.key);
      const selected = state.chartType === ct.key;
      return '<div class="chart-type-card' + (locked ? ' locked' : '') + (selected && !locked ? ' selected' : '') + '" data-key="' + ct.key + '">'
        + '<span class="icon">' + ct.icon + '</span><h3>' + ct.name + '</h3><p>' + ct.desc + '</p></div>';
    }).join('');
    grid.querySelectorAll('.chart-type-card:not(.locked)').forEach(card => {
      card.addEventListener('click', () => { state.chartType = card.dataset.key; renderChartTypeGrid(); renderOutput(); });
    });
  }

  // ============================================================
  // 5. Options panel
  // ============================================================
  function readOptionsFromForm() {
    state.options = {
      maintainAspectRatio: document.getElementById('opt-maintainAspectRatio').checked,
      aspectRatio: document.getElementById('opt-aspectRatio').value,
      resizeDelay: document.getElementById('opt-resizeDelay').value,
      scalesDisplay: document.getElementById('opt-scalesDisplay').checked,
      yMin: document.getElementById('opt-yMin').value,
      yMax: document.getElementById('opt-yMax').value,
      stacked: document.getElementById('opt-stacked').checked,
      fill: document.getElementById('opt-fill').checked,
      gridDisplay: document.getElementById('opt-gridDisplay').checked,
      gridColor: document.getElementById('opt-gridColor').value,
      legendDisplay: document.getElementById('opt-legendDisplay').checked,
      legendPosition: document.getElementById('opt-legendPosition').value,
      titleDisplay: document.getElementById('opt-titleDisplay').checked,
      titleText: document.getElementById('opt-titleText').value,
      tooltipEnabled: document.getElementById('opt-tooltipEnabled').checked,
      tooltipMode: document.getElementById('opt-tooltipMode').value,
    };
  }
  
  function wireOptionsListeners() {
    ['opt-maintainAspectRatio', 'opt-aspectRatio', 'opt-resizeDelay', 'opt-scalesDisplay', 'opt-yMin', 'opt-yMax', 'opt-stacked', 'opt-fill',
      'opt-gridDisplay', 'opt-gridColor', 'opt-legendDisplay', 'opt-legendPosition', 'opt-titleDisplay', 'opt-titleText',
      'opt-tooltipEnabled', 'opt-tooltipMode'].forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => { readOptionsFromForm(); renderOutput(); });
        el.addEventListener('change', () => { readOptionsFromForm(); renderOutput(); });
      }
    });
  }

  // ============================================================
  // 6. Chart config builders
  // ============================================================
  function buildCommonOptions(xLabel, yLabel, cfgType) {
    const opts = state.options;
    const isXY = ['bar', 'line', 'scatter', 'bubble'].includes(cfgType);
    const options = {
      responsive: true,
      maintainAspectRatio: !!opts.maintainAspectRatio,
      aspectRatio: Number(opts.aspectRatio) || 2,
      resizeDelay: Number(opts.resizeDelay) || 0,
      plugins: {
        legend: { display: opts.legendDisplay !== false, position: opts.legendPosition || 'bottom' },
        title: { display: !!opts.titleDisplay, text: opts.titleText || (yLabel + ' by ' + xLabel) },
        tooltip: { enabled: opts.tooltipEnabled !== false, mode: opts.tooltipMode || 'index' },
      },
    };
    if (isXY) {
      options.scales = {
        x: { display: opts.scalesDisplay !== false, stacked: !!opts.stacked, grid: { display: opts.gridDisplay !== false, color: opts.gridColor || '#ffffff' }, title: { display: true, text: xLabel } },
        y: {
          display: opts.scalesDisplay !== false, stacked: !!opts.stacked, grid: { display: opts.gridDisplay !== false, color: opts.gridColor || '#ffffff' },
          min: (opts.yMin && opts.yMin.trim() !== '') ? Number(opts.yMin) : undefined,
          max: (opts.yMax && opts.yMax.trim() !== '') ? Number(opts.yMax) : undefined,
          title: { display: true, text: yLabel }
        },
      };
    }
    return options;
  }

  // ---- 6a. Flat sources (Community Profile / Investments / Sponsor Spending)
  function buildFlatChartConfig() {
    const rows = SOURCES[state.source].rows;
    const xMeta = fieldMeta(state.source, state.x);
    const yMeta = fieldMeta(state.source, state.y);
    const grouped = state.groupBy !== 'NONE';
    const type = state.chartType;
    let data;

    if (xMeta.role === 'numeric') {
      const groupsList = grouped ? sortedUniqueGeneric(rows, state.groupBy) : ['All'];
      const validRows = rows.filter(r => r[state.x] !== null && r[state.y] !== null && r[state.x] !== undefined && r[state.y] !== undefined);
      let zMin = 0, zMax = 1;
      if (type === 'bubble' && state.z) {
        const zVals = validRows.map(r => r[state.z]).filter(v => v !== null && v !== undefined && !isNaN(v));
        zMin = zVals.length ? Math.min(...zVals) : 0; zMax = zVals.length ? Math.max(...zVals) : 1;
      }
      const RMIN = 4, RMAX = 28;
      function scaleR(v) { if (v === null || v === undefined || isNaN(v)) return RMIN; if (zMax === zMin) return (RMIN + RMAX) / 2; return RMIN + (RMAX - RMIN) * (v - zMin) / (zMax - zMin); }
      const datasets = groupsList.map(g => {
        const subset = grouped ? validRows.filter(r => r[state.groupBy] === g) : validRows;
        const pts = subset.map(r => { const p = { x: r[state.x], y: r[state.y] }; if (type === 'bubble' && state.z) p.r = scaleR(r[state.z]); return p; });
        return { label: String(g), data: pts, backgroundColor: colorFor(g) + '99', borderColor: colorFor(g) };
      });
      data = { datasets };
    } else {
      const isRaw = state.agg === 'raw';
      const isPie = ['pie', 'doughnut', 'polarArea'].includes(type);
      let catLabels, groupsList, datasets;
      if (isRaw) {
        // Raw mode: one data point per record, no collapsing of records that
        // share an X value. Records are sorted by X so lines/bars read left-to-right.
        const sortedRows = rows.slice().sort((a, b) => xMeta.role === 'time'
          ? new Date(a[state.x]) - new Date(b[state.x])
          : String(a[state.x]).localeCompare(String(b[state.x])));
        catLabels = sortedRows.map(r => r[state.x]);
        groupsList = grouped ? sortedUniqueGeneric(rows, state.groupBy) : ['All'];
        datasets = groupsList.map(g => ({
          label: String(g),
          data: sortedRows.map(r => (!grouped || r[state.groupBy] === g) ? r[state.y] : null),
          backgroundColor: isPie ? catLabels.map((_, i) => PALETTE[i % PALETTE.length]) : colorFor(g),
          borderColor: type === 'radar' || type === 'line' ? colorFor(g) : undefined,
          fill: type === 'line' ? !!state.options.fill : undefined,
          tension: type === 'line' ? 0.3 : undefined,
          spanGaps: false,
        }));
      } else {
        catLabels = sortedUniqueGeneric(rows, state.x, xMeta.role === 'time');
        groupsList = grouped ? sortedUniqueGeneric(rows, state.groupBy) : ['All'];
        datasets = groupsList.map(g => {
          const values = catLabels.map(xc => {
            const subset = rows.filter(r => r[state.x] === xc && (!grouped || r[state.groupBy] === g));
            return aggregate(subset.map(r => r[state.y]), state.agg);
          });
          return {
            label: String(g), data: values,
            backgroundColor: isPie ? catLabels.map((_, i) => PALETTE[i % PALETTE.length]) : colorFor(g),
            borderColor: type === 'radar' || type === 'line' ? colorFor(g) : undefined,
            fill: type === 'line' ? !!state.options.fill : undefined,
            tension: type === 'line' ? 0.3 : undefined,
          };
        });
      }
      data = { labels: catLabels, datasets };
    }
    const type_ = type;
    return { type: type_, data, options: buildCommonOptions(xMeta.label, yMeta ? yMeta.label : '', type_) };
  }

  // ---- 6b. Assessment source: trend mode (assessment point = time axis)
  function buildAssessmentTrendSeries() {
    const rows = ASSESSMENT_ROWS;
    const points = ASSESSMENT_META.pointsOrder.filter(p => rows.some(r => r.assessmentPoint === p));
    const isRaw = state.assessAgg === 'raw';
    // Raw mode always breaks out to the finest available grain (community),
    // regardless of what's picked in "Split Into Series" \u2014 that's what makes it "raw".
    const effectiveGroupBy = isRaw ? 'communityName' : state.assessGroupBy;
    const grouped = effectiveGroupBy !== 'NONE';
    const groupsList = grouped ? sortedUniqueGeneric(rows, effectiveGroupBy) : ['All Communities'];
    const metric = state.metric;
    const aggFn = isRaw ? 'avg' : state.assessAgg;
    const benchmarkField = state.compareBenchmark ? ASSESSMENT_META.benchmarkPairs[metric] : null;
    const datasets = [];
    groupsList.forEach(g => {
      const filt = r => (!grouped || r[effectiveGroupBy] === g);
      const values = points.map(p => aggregate(rows.filter(r => r.assessmentPoint === p && filt(r)).map(r => r[metric]), aggFn));
      datasets.push({
        label: String(g), data: values,
        backgroundColor: colorFor(g), borderColor: colorFor(g),
        fill: state.chartType === 'line' ? !!state.options.fill : undefined,
        tension: state.chartType === 'line' ? 0.3 : undefined,
      });
      if (benchmarkField) {
        const bvalues = points.map(p => aggregate(rows.filter(r => r.assessmentPoint === p && filt(r)).map(r => r[benchmarkField]), aggFn));
        datasets.push({ label: g + ' \u2014 National/State Avg', data: bvalues, type: 'line', borderColor: colorFor(g), borderDash: [5, 4], pointRadius: 0, fill: false, backgroundColor: 'transparent' });
      }
    });
    return { labels: points, datasets };
  }

  // ---- 6c. Assessment source: point-comparison mode (community/ecosystem = category axis)
  function buildAssessmentPointCompareSeries() {
    const rows = ASSESSMENT_ROWS;
    const isRaw = state.assessAgg === 'raw';
    const effectiveGroupBy = isRaw ? 'communityName' : state.assessGroupBy;
    const aggFn = isRaw ? 'avg' : state.assessAgg;
    const grouped = effectiveGroupBy !== 'NONE';
    const categories = grouped ? sortedUniqueGeneric(rows, effectiveGroupBy) : ['All Communities'];
    const metric = state.metric;
    const benchmarkField = state.compareBenchmark ? ASSESSMENT_META.benchmarkPairs[metric] : null;
    const selPoints = state.assessPoints.length ? state.assessPoints : ASSESSMENT_META.pointsOrder.slice(0, 1);
    const isPie = ['pie', 'doughnut', 'polarArea'].includes(state.chartType);
    const datasets = [];
    selPoints.forEach((p, i) => {
      const values = categories.map(cat => {
        const subset = rows.filter(r => r.assessmentPoint === p && (!grouped || r[effectiveGroupBy] === cat));
        return aggregate(subset.map(r => r[metric]), aggFn);
      });
      datasets.push({
        label: p, data: values,
        backgroundColor: isPie ? categories.map((_, j) => PALETTE[j % PALETTE.length]) : PALETTE[i % PALETTE.length],
        borderColor: PALETTE[i % PALETTE.length],
      });
      if (benchmarkField) {
        const bvalues = categories.map(cat => {
          const subset = rows.filter(r => r.assessmentPoint === p && (!grouped || r[effectiveGroupBy] === cat));
          return aggregate(subset.map(r => r[benchmarkField]), aggFn);
        });
        datasets.push({
          label: p + ' \u2014 National/State Avg', data: bvalues,
          backgroundColor: hexToRgba(PALETTE[i % PALETTE.length], 0.35), borderColor: PALETTE[i % PALETTE.length],
          borderDash: state.chartType === 'radar' ? [5, 4] : undefined,
        });
      }
    });
    return { labels: categories, datasets };
  }

  function buildAssessmentChartConfig() {
    const type = state.chartType;
    const data = state.mode === 'trend' ? buildAssessmentTrendSeries() : buildAssessmentPointCompareSeries();
    const metricLabel = humanizeAssessmentField(state.metric);
    const xLabel = state.mode === 'trend' ? 'Assessment Point' : (state.assessGroupBy === 'NONE' ? 'All Communities' : assessGroupLabel(state.assessGroupBy));
    return { type, data, options: buildCommonOptions(xLabel, metricLabel, type) };
  }

  function buildChartConfig() {
    return state.source === 'assessment' ? buildAssessmentChartConfig() : buildFlatChartConfig();
  }

  // ============================================================
  // 7. Series Builder UI (swaps content based on source)
  // ============================================================
  function populateSourceSelect() {
    const thselectTwo = document.getElementById('thselectTwo');
    if (!thselectTwo) return;
    const opts = ['<option value="assessment">Assessment &amp; Outcomes (per community, over time)</option>']
      .concat(Object.keys(SOURCES).map(k => '<option value="' + k + '">' + SOURCES[k].label + '</option>'));
    thselectTwo.innerHTML = opts.join('');
    thselectTwo.value = state.source;
  }
  
  function wireSourceSelectListener() {
    const thselectTwo = document.getElementById('thselectTwo');
    if (thselectTwo) {
      thselectTwo.addEventListener('change', () => {
        state.source = thselectTwo.value;
        state.chartType = null;
        onSourceChange();
      });
    }
  }

  function wireOptionsListeners() {
    const optionIds = [
      'opt-maintainAspectRatio',
      'opt-aspectRatio',
      'opt-resizeDelay',
      'opt-scalesDisplay',
      'opt-yMin',
      'opt-yMax',
      'opt-stacked',
      'opt-fill',
      'opt-gridDisplay',
      'opt-gridColor',
      'opt-legendDisplay',
      'opt-legendPosition',
      'opt-titleDisplay',
      'opt-titleText',
      'opt-tooltipEnabled',
      'opt-tooltipMode'
    ];

    optionIds.forEach(id => {
      const el = document.getElementById(id);
      if (el) {
        el.addEventListener('input', () => { readOptionsFromForm(); renderOutput(); });
        el.addEventListener('change', () => { readOptionsFromForm(); renderOutput(); });
      }
    });
  }

  function onSourceChange() {
    if (state.source === 'assessment') {
      document.getElementById('srcHint').textContent = ASSESSMENT_ROWS.length + ' community \u00d7 assessment-point records available.';
      renderAssessmentBuilder();
    } else {
      document.getElementById('srcHint').textContent = SOURCES[state.source].rows.length + ' records available in this source.';
      renderFlatBuilder();
    }
    renderChartTypeGrid();
    renderOutput();
  }


  // ---- Flat builder (Community Profile / Investments / Sponsor Spending)
  function renderFlatBuilder() {
    const fields = fieldsOf(state.source);
    const html = `
       <div class="section-label">Series</div>
      <div class="field-block">
        <label>X Axis</label>
        <select id="xSelect"></select>
        <div class="hint">Any field \u2014 category, time, or numeric. Decides what Y and chart types are legal.</div>
      </div>
      <div class="field-block" id="yBlock">
        <label>Y Axis</label>
        <select id="ySelect"></select>
        <div class="hint">Numeric measures that make sense against your X axis.</div>
      </div>
      <div class="field-block" id="zBlock">
        <label>Z Axis <span class="mono" style="font-weight:400;text-transform:none;">(optional, bubble size)</span></label>
        <select id="zSelect"></select>
        <div class="hint" id="zHint"></div>
      </div>
      <div class="section-label">Breakdown</div>
      <div class="field-block">
        <label>Split Into Series</label>
        <select id="groupSelect"></select>
        <div class="hint">"All together" collapses everything into one series. Pick a field to split into multiple series \u2014 e.g. one line per community.</div>
      </div>
      <div class="field-block" id="aggBlock">
        <label>Aggregation</label>
        <select id="aggSelect">
          <option value="avg">Average</option><option value="sum">Sum</option><option value="count">Count</option><option value="min">Min</option><option value="max">Max</option><option value="raw">Raw (no aggregation \u2014 one point per record)</option>
        </select>
        <div class="hint" id="aggHint">Applied when multiple records land on the same X value within a series. Choose Raw to plot every record individually instead of collapsing them.</div>
      </div>`;
  
    document.getElementById('seriesBuilder').innerHTML = html;

    const xSelect = document.getElementById('xSelect');
    const ySelect = document.getElementById('ySelect');
    const zSelect = document.getElementById('zSelect');
    const groupSelect = document.getElementById('groupSelect');
    const aggSelect = document.getElementById('aggSelect');

    function fillOptgroups(select, flds, excludeKey) {
      const groups = { category: 'Category', time: 'Time', numeric: 'Numeric' };
      select.innerHTML = '';
      ['category', 'time', 'numeric'].forEach(role => {
        const opts = flds.filter(f => f.role === role && f.key !== excludeKey);
        if (!opts.length) return;
        const og = document.createElement('optgroup'); og.label = groups[role];
        opts.forEach(f => { const o = document.createElement('option'); o.value = f.key; o.textContent = f.label; og.appendChild(o); });
        select.appendChild(og);
      });
    }

    function onX() {
      state.x = xSelect.value;
      const xMeta = fieldMeta(state.source, state.x);
      const numericFields = fields.filter(f => f.role === 'numeric' && f.key !== state.x);
      ySelect.innerHTML = numericFields.map(f => '<option value="' + f.key + '">' + f.label + '</option>').join('');
      state.y = numericFields.length ? numericFields[0].key : null;
      ySelect.value = state.y;

      const zBlock = document.getElementById('zBlock');
      if (xMeta.role === 'numeric') {
        zBlock.classList.remove('disabled'); zSelect.disabled = false;
        const zFields = fields.filter(f => f.role === 'numeric' && f.key !== state.x && f.key !== state.y);
        zSelect.innerHTML = '<option value="">None</option>' + zFields.map(f => '<option value="' + f.key + '">' + f.label + '</option>').join('');
        state.z = '';
        document.getElementById('zHint').textContent = 'X is numeric \u2014 optionally size bubbles by a Z field (enables Bubble Chart).';
      } else {
        zBlock.classList.add('disabled'); zSelect.disabled = true;
        zSelect.innerHTML = '<option value="">\u2014</option>';
        state.z = '';
        document.getElementById('zHint').textContent = 'Only available when X is numeric.';
      }
      onY();
      refreshGroup();
    }
    function onY() { state.y = ySelect.value; }
    function onZ() { state.z = zSelect.value; renderChartTypeGrid(); renderOutput(); }
    function refreshGroup() {
      const candidates = fields.filter(f => f.key !== state.x && f.role !== 'numeric');
      groupSelect.innerHTML = '<option value="NONE">All together</option>' + candidates.map(f => '<option value="' + f.key + '">By ' + f.label + '</option>').join('');
      state.groupBy = 'NONE'; groupSelect.value = 'NONE';
      updateAgg();
    }
    function updateAgg() {
      const xMeta = fieldMeta(state.source, state.x);
      const aggBlock = document.getElementById('aggBlock');
      if (xMeta && xMeta.role === 'numeric') {
        aggBlock.classList.add('disabled'); aggSelect.disabled = true;
        document.getElementById('aggHint').textContent = 'X is numeric (scatter/bubble) \u2014 points are plotted individually.';
      } else {
        aggBlock.classList.remove('disabled'); aggSelect.disabled = false;
        document.getElementById('aggHint').textContent = 'Applied when multiple records land on the same X value within a series.';
      }
    }

    // Scatter/Bubble need two distinct numeric fields (X and Y). If this
    // source only has one numeric field, offering it as X would leave no
    // legal Y and break the chart — so numeric fields are only offered as
    // X when there are at least two of them.
    const numericCount = fields.filter(f => f.role === 'numeric').length;
    const xFieldPool = numericCount >= 2 ? fields : fields.filter(f => f.role !== 'numeric');
    fillOptgroups(xSelect, xFieldPool, null);
    state.x = xSelect.value = (xFieldPool[0] || fields[0] || {}).key || null;
    onX();

    xSelect.addEventListener('change', () => { onX(); renderChartTypeGrid(); renderOutput(); });
    ySelect.addEventListener('change', () => { onY(); renderOutput(); });
    zSelect.addEventListener('change', onZ);
    groupSelect.addEventListener('change', () => { state.groupBy = groupSelect.value; renderChartTypeGrid(); renderOutput(); });
    aggSelect.addEventListener('change', () => { state.agg = aggSelect.value; renderOutput(); });
  }

  // ---- Assessment builder
  function renderAssessmentBuilder() {
    const metricFields = assessmentMetricFields();
    const contextFields = assessmentContextFields();
    const html = `
      <div class="section-label">Series</div>
      <div class="field-block">
        <label>Metric</label>
        <select id="thselectFour"></select>
        <div class="hint">Every field the assessments track. Benchmarks are listed too, in case you want to chart a national/state average on its own.</div>
      </div>
      <div class="field-block" id="benchBlock">
        <div class="toggle-row"><label class="txt">Also plot national/state average</label><label class="switch"><input type="checkbox" id="benchToggle"><span class="slider"></span></label></div>
        <div class="hint" id="benchHint"></div>
      </div>
      <div class="field-block">
        <label>Shape</label>
        <div class="mode-toggle">
          <button data-mode="trend" id="modeTrendBtn">Trend over time</button>
          <button data-mode="pointCompare" id="modePointBtn">Compare specific points</button>
        </div>
        <div class="hint" id="modeHint" style="margin-top:8px;"></div>
      </div>
      <div id="modeSpecific"></div>
      <div class="section-label">Breakdown</div>
      <div class="field-block">
        <label>Split Into Series</label>
        <select id="thselectFive"></select>
        <div class="hint" id="assessGroupHint"></div>
      </div>
      <div class="field-block">
        <label>Aggregation</label>
        <select id="thselectThree">
          <option value="avg">Average</option><option value="sum">Sum</option><option value="count">Count</option><option value="min">Min</option><option value="max">Max</option><option value="raw">Raw (no aggregation \u2014 one line/bar per community)</option>
        </select>
        <div class="hint" id="assessAggHint">Applied whenever more than one community lands in the same cell. Raw always breaks out by individual community, overriding the Split selection above.</div>
      </div>`;
    document.getElementById('seriesBuilder').innerHTML = html;

    const thselectFour = document.getElementById('thselectFour');
    const nonBench = metricFields.filter(f => !f.isBenchmark);
    const bench = metricFields.filter(f => f.isBenchmark);
    thselectFour.innerHTML =
      (nonBench.length ? '<optgroup label="Outcome &amp; Program Metrics">' + nonBench.map(f => '<option value="' + f.key + '">' + f.label + '</option>').join('') + '</optgroup>' : '') +
      (bench.length ? '<optgroup label="Benchmarks">' + bench.map(f => '<option value="' + f.key + '">' + f.label + '</option>').join('') + '</optgroup>' : '');
    state.metric = (nonBench[0] || bench[0] || {}).key || null;
    thselectFour.value = state.metric;

    const benchToggle = document.getElementById('benchToggle');
    function refreshBenchBlock() {
      const pair = ASSESSMENT_META.benchmarkPairs[state.metric];
      const block = document.getElementById('benchBlock');
      if (pair) {
        block.classList.remove('disabled'); benchToggle.disabled = false;
        document.getElementById('benchHint').textContent = 'Overlays ' + humanizeAssessmentField(pair) + ' alongside ' + humanizeAssessmentField(state.metric) + '.';
      } else {
        block.classList.add('disabled'); benchToggle.disabled = true;
        benchToggle.checked = false;
        state.compareBenchmark = false;
        document.getElementById('benchHint').textContent = 'No matching national/state benchmark field found for this metric.';
      }
    }
    thselectFour.addEventListener('change', () => {
      state.metric = thselectFour.value;
      refreshBenchBlock();
      renderChartTypeGrid(); renderOutput();
    });
    benchToggle.addEventListener('change', () => { state.compareBenchmark = benchToggle.checked; renderChartTypeGrid(); renderOutput(); });

    const modeTrendBtn = document.getElementById('modeTrendBtn');
    const modePointBtn = document.getElementById('modePointBtn');
    function setMode(m) {
      state.mode = m; state.chartType = null;
      modeTrendBtn.classList.toggle('active', m === 'trend');
      modePointBtn.classList.toggle('active', m === 'pointCompare');
      document.getElementById('modeHint').textContent = m === 'trend'
        ? 'X axis is every assessment point in order (Baseline \u2192 latest) \u2014 good for seeing progress over time.'
        : 'X axis becomes community / ecosystem / region \u2014 pick which assessment points to compare side by side (e.g. Baseline vs. 24 Months).';
      renderModeSpecific();
      renderChartTypeGrid(); renderOutput();
    }
    modeTrendBtn.addEventListener('click', () => setMode('trend'));
    modePointBtn.addEventListener('click', () => setMode('pointCompare'));

    function renderModeSpecific() {
      const el = document.getElementById('modeSpecific');
      if (state.mode === 'pointCompare') {
        const pts = ASSESSMENT_META.pointsOrder;
        if (!state.assessPoints.length) state.assessPoints = pts.length > 1 ? [pts[0], pts[pts.length - 1]] : pts.slice(0, 1);
        el.innerHTML = '<div class="field-block"><label>Assessment Points to Compare</label><div class="checklist" id="pointChips"></div><div class="hint">Tap to toggle. Pick one point for a straight per-community comparison, or several (e.g. Baseline &amp; 24 Months) for a before/after view.</div></div>';
        const chipWrap = document.getElementById('pointChips');
        chipWrap.innerHTML = pts.map(p => '<div class="chip' + (state.assessPoints.includes(p) ? ' on' : '') + '" data-p="' + p + '">' + p + '</div>').join('');
        chipWrap.querySelectorAll('.chip').forEach(chip => {
          chip.addEventListener('click', () => {
            const p = chip.dataset.p;
            const idx = state.assessPoints.indexOf(p);
            if (idx > -1) { if (state.assessPoints.length > 1) state.assessPoints.splice(idx, 1); }
            else state.assessPoints.push(p);
            renderModeSpecific(); renderChartTypeGrid(); renderOutput();
          });
        });
      } else {
        el.innerHTML = '';
      }
    }
    renderModeSpecific();
    modeTrendBtn.classList.toggle('active', state.mode === 'trend');
    modePointBtn.classList.toggle('active', state.mode === 'pointCompare');
    document.getElementById('modeHint').textContent = state.mode === 'trend'
      ? 'X axis is every assessment point in order (Baseline \u2192 latest) \u2014 good for seeing progress over time.'
      : 'X axis becomes community / ecosystem / region \u2014 pick which assessment points to compare side by side (e.g. Baseline vs. 24 Months).';

    const thselectFive = document.getElementById('thselectFive');
    thselectFive.innerHTML = '<option value="NONE">All communities, aggregated</option>' + contextFields.map(f => '<option value="' + f.key + '">By ' + f.label + '</option>').join('');
    state.assessGroupBy = 'NONE'; thselectFive.value = 'NONE';
    function refreshGroupHint() {
      const isRaw = state.assessAgg === 'raw';
      thselectFive.disabled = isRaw;
      document.getElementById('assessGroupHint').textContent = isRaw
        ? 'Raw is selected \u2014 always broken out by individual community, regardless of this dropdown.'
        : (state.mode === 'trend'
          ? 'Aggregate all communities into one line, or split into one line per community / ecosystem / region.'
          : 'This becomes the X axis \u2014 aggregate into a single bar per point, or break it out by community / ecosystem / region.');
    }
    refreshGroupHint();
    thselectFive.addEventListener('change', () => {
      state.assessGroupBy = thselectFive.value;
      refreshGroupHint();
      renderChartTypeGrid(); renderOutput();
    });

    document.getElementById('thselectThree').addEventListener('change', (e) => {
      state.assessAgg = e.target.value;
      refreshGroupHint();
      renderChartTypeGrid(); renderOutput();
    });

    refreshBenchBlock();
  }

  // ============================================================
  // 8. Output: live chart + summary pills + copyable config
  // ============================================================
  let liveChart = null;
  function currentLabels() {
    if (state.source === 'assessment') {
      const metricLabel = state.metric ? humanizeAssessmentField(state.metric) : '';
      const shape = state.mode === 'trend' ? 'over time' : 'by ' + (state.assessGroupBy === 'NONE' ? 'all communities' : assessGroupLabel(state.assessGroupBy));
      return { title: metricLabel + ' ' + shape, source: 'Assessment & Outcomes' };
    }
    const xMeta = fieldMeta(state.source, state.x), yMeta = fieldMeta(state.source, state.y);
    return { title: (yMeta ? yMeta.label : '') + ' by ' + (xMeta ? xMeta.label : ''), source: SOURCES[state.source].label };
  }
  function renderOutput() {
    readOptionsFromForm();
    if (state.source === 'assessment' && !state.metric) return;
    if (state.source !== 'assessment' && (!state.x || !state.y)) return;
    const cfg = buildChartConfig();
    const labels = currentLabels();

    const pills = [['Source', labels.source]];
    if (state.source === 'assessment') {
      pills.push(['Metric', humanizeAssessmentField(state.metric)]);
      if (state.compareBenchmark && ASSESSMENT_META.benchmarkPairs[state.metric]) pills.push(['+ Benchmark', 'on']);
      pills.push(['Shape', state.mode === 'trend' ? 'Trend over time' : 'Point comparison']);
      if (state.mode === 'pointCompare') pills.push(['Points', state.assessPoints.join(', ')]);
      pills.push(['Split', state.assessAgg === 'raw' ? 'By Community (raw)' : (state.assessGroupBy === 'NONE' ? 'All together' : assessGroupLabel(state.assessGroupBy))]);
      pills.push(['Aggregation', state.assessAgg]);
    } else {
      const xMeta = fieldMeta(state.source, state.x), yMeta = fieldMeta(state.source, state.y);
      pills.push(['X', xMeta.label], ['Y', yMeta.label]);
      if (state.z) pills.push(['Z', fieldMeta(state.source, state.z).label]);
      pills.push(['Split', state.groupBy === 'NONE' ? 'All together' : fieldMeta(state.source, state.groupBy).label]);
      if (xMeta.role !== 'numeric') pills.push(['Aggregation', state.agg]);
    }
    pills.push(['Chart Type', state.chartType]);
    document.getElementById('summaryStrip').innerHTML = pills.map(([k, v]) => '<span class="pill">' + k + ': <b>' + v + '</b></span>').join('');

    if (liveChart) liveChart.destroy();
    liveChart = new Chart(document.getElementById('liveChart').getContext('2d'), JSON.parse(JSON.stringify(cfg)));
  }

  // ============================================================
  // Init
  // ============================================================
  // Store the init function for export
  initCustomBuilderDOMRef = function() {
    populateSourceSelect();
    wireSourceSelectListener();
    onSourceChange();
    wireOptionsListeners();
  };
})();