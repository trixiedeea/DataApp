// AI Insights Module for Research Data Tracker
// Local data analysis and insight generation

export function initInsightsModule(config) {
  console.log('Initializing AI Insights module');
  
  // Store config for later use
  window.aiInsightsConfig = config;
  
  return {
    renderInsights: renderInsightsTab
  };
}

function renderInsightsTab(config) {
  console.log('renderInsightsTab called with config:', config);
  
  // Use passed config or stored config
  const configData = config || window.aiInsightsConfig || {};
  const communities = configData.communities || window.communities || {};
  const investments = configData.investments || window.investments || [];
  const expenses = configData.expenses || window.expenses || [];
  
  console.log('Data available:', { communities, investments, expenses });
  console.log('Checking hasData...');

  const hasData = communities && Object.keys(communities).length > 0;
  console.log('hasData:', hasData);
  
  if (!hasData) {
    console.log('No data, returning no-data message');
    return `<div class="ai-insights-container">
      <div class="ai-header">
        <h2>AI-Powered Data Analysis</h2>
        <p>No community data available. Please add communities to enable AI analysis.</p>
      </div>
    </div>`;
  }
  
  console.log('Has data, returning full HTML');
  const html = `<div class="ai-insights-container">
    <div class="ai-header">
      <h2>AI-Powered Data Analysis</h2>
      <p>Discover insights, trends, and patterns in your research data</p>
    </div>
    
    <div class="ai-controls">
      <button id="analyze-all" class="th-button th-button-primary">Run Complete Analysis</button>
      <button id="analyze-outcomes" class="th-button">Analyze Outcomes</button>
      <button id="analyze-funding" class="th-button">Analyze Funding Impact</button>
      <button id="analyze-trends" class="th-button">Trend Analysis</button>
    </div>
    
    <div id="ai-loading" class="ai-loading" style="display: none;">
      <div class="loading-spinner"></div>
      <p>Analyzing data...</p>
    </div>
    
    <div id="ai-results" class="ai-results"></div>
  </div>`;
  
  console.log('renderInsightsTab returning HTML');
  return html;
}

// AI Analysis Functions
window.showAILoading = function(show) {
  const loadingEl = document.getElementById('ai-loading');
  if (loadingEl) {
    loadingEl.style.display = show ? 'block' : 'none';
  }
}

window.showAIError = function(message) {
  const container = document.getElementById('ai-results');
  if (container) {
    container.innerHTML = `<div class="ai-error">❌ ${message}</div>`;
  }
}

window.preprocessAIData = function() {
  const configData = window.aiInsightsConfig || {};
  const communities = configData.communities || window.communities || {};
  const investments = configData.investments || window.investments || [];
  const expenses = configData.expenses || window.expenses || [];
  
  console.log('preprocessAIData - communities object:', communities);
  console.log('preprocessAIData - communities keys:', Object.keys(communities));
  
  const communitiesArray = Object.values(communities).map(community => {
    console.log('Processing community:', community);
    
    const flattened = {
      communityId: community.communityId,
      communityName: community.geography?.communityName || '',
      bookEcosystem: community.geography?.bookEcosystem || '',
      region: community.geography?.region || '',
      ruralUrban: community.population?.ruralUrban || '',
      population: community.population?.population || 0,
      participantsServed: community.population?.participantsServed || 0,
      estimatedFootTraffic: community.population?.estimatedFootTraffic || 0,
      programStatus: community.program?.status || '',
      stewardName: community.program?.stewardName || ''
    };
    
    console.log('Community outcomes structure:', community.outcomes);
    
    // Handle outcomes 
    const outcomesArray = Array.isArray(community.outcomes) ? community.outcomes : 
                         (community.outcomes?.items && Array.isArray(community.outcomes.items) ? community.outcomes.items : []);
    
    console.log('Outcomes array:', outcomesArray);
    
    if (outcomesArray.length > 0) {
      outcomesArray.forEach(outcome => {
        const point = outcome.assessmentPoint || 'unknown';
        const pointKey = point.replace(/\s+/g, '_'); 
        flattened[`outcome_${pointKey}_literacyScore`] = outcome.literacyScore || 0;
        flattened[`outcome_${pointKey}_kindergartenReadiness`] = outcome.kindergartenReadinessScore || 0;
        flattened[`outcome_${pointKey}_grade4Reading`] = outcome.grade4ReadingScore || 0;
        flattened[`outcome_${pointKey}_grade8Reading`] = outcome.grade8ReadingScore || 0;
        flattened[`outcome_${pointKey}_graduationRate`] = outcome.highSchoolGraduationRate || 0;
      });
    }
    
    // Add library metrics
    if (community.library && community.library.items && Array.isArray(community.library.items)) {
      community.library.items.forEach(item => {
        const point = item.assessmentPoint || 'unknown';
        const pointKey = point.replace(/\s+/g, '_');
        flattened[`lib_${pointKey}_collectionQuality`] = item.collectionQuality || '';
        flattened[`lib_${pointKey}_booksDeliveredQuantity`] = item.booksDeliveredQuantity || 0;
        flattened[`lib_${pointKey}_physicalVisitsPerMonth`] = item.physicalVisitsPerMonth || 0;
        flattened[`lib_${pointKey}_restockRate`] = item.restockRate || 0;
      });
    }
    
    return flattened;
  });
  
  console.log('Processed communities array:', communitiesArray);
  
  return {
    communities: communitiesArray,
    investments: investments,
    expenses: expenses
  };
}

window.calculateAIMean = function(values) {
  const validValues = values.filter(v => v !== null && v !== undefined && !isNaN(v));
  if (validValues.length === 0) return 0;
  return validValues.reduce((a, b) => a + b, 0) / validValues.length;
}

window.calculateAICorrelation = function(x, y) {
  const n = x.length;
  if (n !== y.length || n === 0) return 0;
  
  const sumX = x.reduce((a, b) => a + b, 0);
  const sumY = y.reduce((a, b) => a + b, 0);
  const sumXY = x.reduce((sum, xi, i) => sum + xi * y[i], 0);
  const sumX2 = x.reduce((sum, xi) => sum + xi * xi, 0);
  const sumY2 = y.reduce((sum, yi) => sum + yi * yi, 0);
  
  const numerator = n * sumXY - sumX * sumY;
  const denominator = Math.sqrt((n * sumX2 - sumX * sumX) * (n * sumY2 - sumY * sumY));
  
  if (denominator === 0) return 0;
  return numerator / denominator;
}

// Spearman rank correlation
window.calculateSpearman = function(x, y) {
  const n = x.length;
  if (n !== y.length || n === 0) return 0;
  
  // Rank the values
  const rank = (arr) => {
    const sorted = arr.map((val, i) => ({ val, i })).sort((a, b) => a.val - b.val);
    const ranks = new Array(n);
    sorted.forEach((item, rank) => ranks[item.i] = rank);
    return ranks;
  };
  
  const rankX = rank(x);
  const rankY = rank(y);
  
  // Calculate Pearson on ranks
  return calculateAICorrelation(rankX, rankY);
}

// Kendall's Tau correlation
window.calculateKendall = function(x, y) {
  const n = x.length;
  if (n !== y.length || n === 0) return 0;
  
  let concordant = 0;
  let discordant = 0;
  
  for (let i = 0; i < n; i++) {
    for (let j = i + 1; j < n; j++) {
      const dx = x[i] - x[j];
      const dy = y[i] - y[j];
      
      if (dx * dy > 0) concordant++;
      else if (dx * dy < 0) discordant++;
    }
  }
  
  const total = concordant + discordant;
  if (total === 0) return 0;
  
  return (concordant - discordant) / total;
}

// Distance correlation 
window.calculateDistanceCorrelation = function(x, y) {
  const n = x.length;
  if (n !== y.length || n < 4) return 0;

  const a = [], b = [];
  for (let i = 0; i < n; i++) {
    a[i] = []; b[i] = [];
    for (let j = 0; j < n; j++) {
      a[i][j] = Math.abs(x[i] - x[j]);
      b[i][j] = Math.abs(y[i] - y[j]);
    }
  }
  const rowSum = m => m.map(row => row.reduce((s, v) => s + v, 0));
  const aRow = rowSum(a), bRow = rowSum(b);
  const aTot = aRow.reduce((s, v) => s + v, 0);
  const bTot = bRow.reduce((s, v) => s + v, 0);

  const U = (m, rowSums, total) => m.map((row, i) => row.map((v, j) => {
    if (i === j) return 0;
    return v - rowSums[i] / (n - 2) - rowSums[j] / (n - 2) + total / ((n - 1) * (n - 2));
  }));
  const A = U(a, aRow, aTot);
  const B = U(b, bRow, bTot);

  let dcov2 = 0, dvarX2 = 0, dvarY2 = 0;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n; j++) {
      if (i === j) continue;
      dcov2 += A[i][j] * B[i][j];
      dvarX2 += A[i][j] * A[i][j];
      dvarY2 += B[i][j] * B[i][j];
    }
  }
  const denom = n * (n - 3);
  if (denom <= 0) return 0;
  dcov2 /= denom; dvarX2 /= denom; dvarY2 /= denom;
  if (dvarX2 <= 0 || dvarY2 <= 0) return 0;

  const r2 = dcov2 / Math.sqrt(dvarX2 * dvarY2);

  return r2 < 0 ? 0 : Math.sqrt(r2);
}

// Mutual information (using histogram-based estimation)
window.calculateMutualInfo = function(x, y, bins) {
  const n = x.length;
  if (n !== y.length || n < 6) return 0;

  if (!bins) bins = Math.max(2, Math.min(10, Math.floor(Math.sqrt(n))));

  // Discretize data into bins
  const discretize = (arr, numBins) => {
    const min = Math.min(...arr);
    const max = Math.max(...arr);
    const binSize = (max - min) / numBins || 1;
    return arr.map(v => Math.min(Math.floor((v - min) / binSize), numBins - 1));
  };
  
  const xBins = discretize(x, bins);
  const yBins = discretize(y, bins);
  
  // Calculate joint and marginal probabilities
  const joint = new Array(bins).fill(0).map(() => new Array(bins).fill(0));
  const px = new Array(bins).fill(0);
  const py = new Array(bins).fill(0);
  
  for (let i = 0; i < n; i++) {
    joint[xBins[i]][yBins[i]]++;
    px[xBins[i]]++;
    py[yBins[i]]++;
  }
  
  // Normalize to probabilities
  for (let i = 0; i < bins; i++) {
    for (let j = 0; j < bins; j++) {
      joint[i][j] /= n;
    }
    px[i] /= n;
    py[i] /= n;
  }
  
  // Calculate mutual information
  let mi = 0;
  for (let i = 0; i < bins; i++) {
    for (let j = 0; j < bins; j++) {
      if (joint[i][j] > 0 && px[i] > 0 && py[j] > 0) {
        mi += joint[i][j] * Math.log2(joint[i][j] / (px[i] * py[j]));
      }
    }
  }
  
  return mi;
}

window.runCompleteAnalysis = function() {
  showAILoading(true);
  
  try {
    const data = preprocessAIData();
    const results = {
      summary: generateAISummary(data),
      outcomes: analyzeOutcomesData(data),
      funding: analyzeFundingData(data),
      trends: analyzeTrendData(data),
      correlations: analyzeCorrelations(data)
    };
    
    displayAIResults(results);
  } catch (error) {
    console.error('Analysis error:', error);
    showAIError('Analysis failed: ' + error.message);
  } finally {
    showAILoading(false);
  }
}

window.analyzeOutcomes = function() {
  showAILoading(true);
  
  try {
    const data = preprocessAIData();
    const results = analyzeOutcomesData(data);
    displayAIResults({ outcomes: results });
  } catch (error) {
    console.error('Analysis error:', error);
    showAIError('Analysis failed: ' + error.message);
  } finally {
    showAILoading(false);
  }
}

window.analyzeFundingImpact = function() {
  showAILoading(true);
  
  try {
    const data = preprocessAIData();
    const results = analyzeFundingData(data);
    displayAIResults({ funding: results });
  } catch (error) {
    console.error('Analysis error:', error);
    showAIError('Analysis failed: ' + error.message);
  } finally {
    showAILoading(false);
  }
}

window.analyzeTrends = function() {
  showAILoading(true);
  
  try {
    const data = preprocessAIData();
    const results = analyzeTrendData(data);
    displayAIResults({ trends: results });
  } catch (error) {
    console.error('Analysis error:', error);
    showAIError('Analysis failed: ' + error.message);
  } finally {
    showAILoading(false);
  }
}

function generateAISummary(data) {
  const communities = data.communities;
  const investments = data.investments;
  
  const totalCommunities = communities.length;
  const totalPopulation = communities.reduce((sum, c) => sum + (c.population || 0), 0);
  const totalParticipants = communities.reduce((sum, c) => sum + (c.participantsServed || 0), 0);
  const totalFunding = investments.reduce((sum, i) => sum + (i.fundingAmount || 0), 0);
  
  const ecosystems = {};
  communities.forEach(c => {
    const eco = c.bookEcosystem || 'Unknown';
    ecosystems[eco] = (ecosystems[eco] || 0) + 1;
  });
  
  return {
    totalCommunities,
    totalPopulation,
    totalParticipants,
    totalFunding,
    ecosystemDistribution: ecosystems,
    averageFundingPerCommunity: totalCommunities > 0 ? totalFunding / totalCommunities : 0
  };
}

function analyzeOutcomesData(data) {
  const communities = data.communities;
  const baselineLiteracy = communities
    .map(c => c.outcome_Baseline_literacyScore)
    .filter(v => v !== null && v !== undefined && !isNaN(v));
  
  const latestLiteracy = communities
    .map(c => {
      const points = ['Baseline', '6 Months', '12 Months', '24 Months'];
      for (const point of points.reverse()) {
        const pointKey = point.replace(/\s+/g, '_');
        const value = c[`outcome_${pointKey}_literacyScore`];
        if (value !== null && value !== undefined && !isNaN(value)) {
          return value;
        }
      }
      return null;
    })
    .filter(v => v !== null && v !== undefined && !isNaN(v));
  
  const baselineMean = calculateAIMean(baselineLiteracy);
  const latestMean = calculateAIMean(latestLiteracy);
  const improvement = latestMean - baselineMean;
  
  return {
    baselineLiteracy: {
      mean: baselineMean,
      count: baselineLiteracy.length
    },
    latestLiteracy: {
      mean: latestMean,
      count: latestLiteracy.length
    },
    averageImprovement: improvement,
    communitiesWithImprovement: communities.filter(c => {
      const baseline = c.outcome_Baseline_literacyScore;
      const latest = c.outcome_24_Months_literacyScore || c.outcome_12_Months_literacyScore || c.outcome_6_Months_literacyScore || c.outcome_Baseline_literacyScore;
      return baseline && latest && latest > baseline;
    }).length
  };
}

function analyzeFundingData(data) {
  const communities = data.communities;
  const investments = data.investments;
  
  const fundingBySource = {};
  investments.forEach(inv => {
    const source = inv.fundingSourceType || 'Unknown';
    fundingBySource[source] = (fundingBySource[source] || 0) + (inv.fundingAmount || 0);
  });
  
  return {
    totalInvestments: investments.length,
    totalFunding: investments.reduce((sum, i) => sum + (i.fundingAmount || 0), 0),
    fundingBySource,
    averageFundingPerInvestment: investments.length > 0 ? 
      investments.reduce((sum, i) => sum + (i.fundingAmount || 0), 0) / investments.length : 0
  };
}

function analyzeTrendData(data) {
  const communities = data.communities;
  
  const ruralCommunities = communities.filter(c => c.ruralUrban === 'Rural');
  const urbanCommunities = communities.filter(c => c.ruralUrban === 'Urban');
  
  const ruralLiteracy = ruralCommunities
    .map(c => c.outcome_12_Months_literacyScore || c.outcome_6_Months_literacyScore || c.outcome_24_Months_literacyScore || c.outcome_Baseline_literacyScore)
    .filter(v => v !== null && v !== undefined && !isNaN(v));
  
  const urbanLiteracy = urbanCommunities
    .map(c => c.outcome_12_Months_literacyScore || c.outcome_6_Months_literacyScore || c.outcome_24_Months_literacyScore || c.outcome_Baseline_literacyScore)
    .filter(v => v !== null && v !== undefined && !isNaN(v));
  
  return {
    ruralVsUrban: {
      rural: {
        count: ruralCommunities.length,
        averageLiteracy: calculateAIMean(ruralLiteracy)
      },
      urban: {
        count: urbanCommunities.length,
        averageLiteracy: calculateAIMean(urbanLiteracy)
      }
    },
    programStatusDistribution: {
      planning: communities.filter(c => c.programStatus === 'Planning').length,
      active: communities.filter(c => c.programStatus === 'Active').length,
      paused: communities.filter(c => c.programStatus === 'Paused').length,
      completed: communities.filter(c => c.programStatus === 'Completed').length
    }
  };
}

window.analyzeCorrelations = function(data) {
  const communities = data.communities;
  const investments = data.investments;
  const expenses = data.expenses;
  const correlations = [];
  
  console.log('analyzeCorrelations - communities:', communities);
  console.log('analyzeCorrelations - first community keys:', Object.keys(communities[0] || {}));
  
  // Helper to convert ordinal strings to numbers
  const qualityRank = { 'Poor': 1, 'Fair': 2, 'Good': 3, 'Excellent': 4 };
  const toQualityRank = (val) => {
    if (typeof val === 'string') return qualityRank[val] || 0;
    return val || 0;
  };
  
  // Helper to check if a value is numeric
  const isNumeric = (val) => {
    if (val === null || val === undefined) return false;
    return !isNaN(parseFloat(val));
  };

  // Minimum paired sample sizes. Below MIN_N_FOR_CORRELATION 
  const MIN_N_FOR_CORRELATION = 6;
  const MIN_N_FOR_DISTANCE = 8;


  const allCommunityFields = new Set();
  const ordinalFields = new Set();
  communities.forEach(c => {
    Object.keys(c).forEach(key => {
      const val = c[key];
      if (isNumeric(val) || (typeof val === 'string' && qualityRank[val])) {
        allCommunityFields.add(key);
      }
      if (typeof val === 'string' && qualityRank[val]) {
        ordinalFields.add(key);
      }
    });
  });
  
  const communityFieldArray = Array.from(allCommunityFields);
  console.log('All numeric community fields:', communityFieldArray);
  console.log('Ordinal (quality-rank) fields, excluded from distance correlation:', Array.from(ordinalFields));

  // Builds one correlation record, or null if there isn't enough data / signal
  // to say anything. 
  function buildCorrelationRecord(field1, field2, xValues, yValues, allowDistance) {
    const n = xValues.length;
    if (n !== yValues.length || n < MIN_N_FOR_CORRELATION) return null;

    const pearson = calculateAICorrelation(xValues, yValues);
    const spearman = calculateSpearman(xValues, yValues);
    const kendall = calculateKendall(xValues, yValues);
    const distance = (allowDistance && n >= MIN_N_FOR_DISTANCE) ? calculateDistanceCorrelation(xValues, yValues) : null;
    const mutualInfo = calculateMutualInfo(xValues, yValues);

    const candidates = [
      { name: 'Pearson', value: Math.abs(pearson) },
      { name: 'Spearman', value: Math.abs(spearman) },
      { name: 'Kendall', value: Math.abs(kendall) },
    ];
    if (distance !== null) candidates.push({ name: 'Distance Correlation', value: distance });
    candidates.sort((a, b) => b.value - a.value);
    const maxCorr = candidates[0].value;
    const runnerUp = candidates[1] ? candidates[1].value : 0;

    if (maxCorr <= 0.3 && mutualInfo <= 0.1) return null;

    return {
      field1, field2, pearson, spearman, kendall, distance, mutualInfo, n,
      strongestMetric: candidates[0].name,
      strongestValue: maxCorr,
      strongestIsClear: (maxCorr - runnerUp) >= 0.1,
      strength: maxCorr > 0.7 ? 'Strong' : maxCorr > 0.5 ? 'Moderate' : 'Weak',
      direction: pearson >= 0 ? 'Positive' : 'Negative',
    };
  }
  
  // Collect all numeric fields from investments
  const investmentFields = new Set();
  investments.forEach(inv => {
    Object.keys(inv).forEach(key => {
      if (isNumeric(inv[key])) {
        investmentFields.add(key);
      }
    });
  });
  
  const investmentFieldArray = Array.from(investmentFields);
  console.log('All numeric investment fields:', investmentFieldArray);
  
  // Collect all numeric fields from expenses
  const expenseFields = new Set();
  expenses.forEach(exp => {
    Object.keys(exp).forEach(key => {
      if (isNumeric(exp[key])) {
        expenseFields.add(key);
      }
    });
  });
  
  const expenseFieldArray = Array.from(expenseFields);
  console.log('All numeric expense fields:', expenseFieldArray);
  
  // Analyze community field correlations
  for (let i = 0; i < communityFieldArray.length; i++) {
    for (let j = i + 1; j < communityFieldArray.length; j++) {
      const field1 = communityFieldArray[i];
      const field2 = communityFieldArray[j];
      
      const xValues = communities.map(c => toQualityRank(c[field1])).filter(v => v !== null && v !== undefined && !isNaN(v));
      const yValues = communities.map(c => toQualityRank(c[field2])).filter(v => v !== null && v !== undefined && !isNaN(v));

      const allowDistance = !ordinalFields.has(field1) && !ordinalFields.has(field2);
      const rec = buildCorrelationRecord(field1, field2, xValues, yValues, allowDistance);
      if (rec) correlations.push(rec);
    }
  }
  
  // Analyze investment field correlations
  for (let i = 0; i < investmentFieldArray.length; i++) {
    for (let j = i + 1; j < investmentFieldArray.length; j++) {
      const field1 = investmentFieldArray[i];
      const field2 = investmentFieldArray[j];
      
      const xValues = investments.map(inv => inv[field1] || 0).filter(v => v !== null && v !== undefined && !isNaN(v));
      const yValues = investments.map(inv => inv[field2] || 0).filter(v => v !== null && v !== undefined && !isNaN(v));

      const rec = buildCorrelationRecord(field1, field2, xValues, yValues, true);
      if (rec) correlations.push(rec);
    }
  }
  
  // Analyze expense field correlations
  for (let i = 0; i < expenseFieldArray.length; i++) {
    for (let j = i + 1; j < expenseFieldArray.length; j++) {
      const field1 = expenseFieldArray[i];
      const field2 = expenseFieldArray[j];
      
      const xValues = expenses.map(exp => exp[field1] || 0).filter(v => v !== null && v !== undefined && !isNaN(v));
      const yValues = expenses.map(exp => exp[field2] || 0).filter(v => v !== null && v !== undefined && !isNaN(v));

      const rec = buildCorrelationRecord(field1, field2, xValues, yValues, true);
      if (rec) correlations.push(rec);
    }
  }
  
  // Cross-dataset correlations 
  if (investments.length > 0 && expenses.length > 0) {
    const expensesByInvestment = {};
    expenses.forEach(exp => {
      const key = exp.expensePaymentSource;
      if (!key) return;
      if (!expensesByInvestment[key]) expensesByInvestment[key] = [];
      expensesByInvestment[key].push(exp);
    });

    for (const invField of investmentFieldArray) {
      for (const expField of expenseFieldArray) {
        const xValues = [];
        const yValues = [];
        investments.forEach(inv => {
          const linked = expensesByInvestment[inv.investmentId];
          if (!linked || linked.length === 0) return;
          const xv = inv[invField];
          if (xv === null || xv === undefined || isNaN(xv)) return;
          const total = linked.reduce((sum, e) => sum + (Number(e[expField]) || 0), 0);
          xValues.push(xv);
          yValues.push(total);
        });

        const rec = buildCorrelationRecord(`INV_${invField}`, `EXP_${expField}`, xValues, yValues, true);
        if (rec) correlations.push(rec);
      }
    }
  }
  
  console.log('Final correlations found:', correlations);
  return correlations;
}

function displayAIResults(results) {
  const container = document.getElementById('ai-results');
  if (!container) return;
  
  let html = '';
  
  if (results.summary) {
    html += renderAISummary(results.summary);
  }
  
  if (results.outcomes) {
    html += renderAIOutcomes(results.outcomes);
  }
  
  if (results.funding) {
    html += renderAIFunding(results.funding);
  }
  
  if (results.trends) {
    html += renderAITrends(results.trends);
  }
  
  if (results.correlations) {
    html += renderAICorrelations(results.correlations);
  }
  
  container.innerHTML = html;
}

function renderAISummary(summary) {
  return `
    <div class="ai-section">
      <h3> Data Summary</h3>
      <div class="ai-stats-grid">
        <div class="ai-stat-card">
          <div class="ai-stat-value">${summary.totalCommunities}</div>
          <div class="ai-stat-label">Total Communities</div>
        </div>
        <div class="ai-stat-card">
          <div class="ai-stat-value">${summary.totalPopulation.toLocaleString()}</div>
          <div class="ai-stat-label">Total Population</div>
        </div>
        <div class="ai-stat-card">
          <div class="ai-stat-value">${summary.totalParticipants.toLocaleString()}</div>
          <div class="ai-stat-label">Participants Served</div>
        </div>
        <div class="ai-stat-card">
          <div class="ai-stat-value">$${summary.totalFunding.toLocaleString()}</div>
          <div class="ai-stat-label">Total Funding</div>
        </div>
        <div class="ai-stat-card">
          <div class="ai-stat-label">Ecosystem Distribution</div>
          <ul>
            ${Object.entries(summary.ecosystemDistribution).map(([eco, count]) => 
              `<li>${eco}: ${count} communities</li>`
            ).join('')}
          </ul>
        </div>
      </div>
    </div>
  `;
}

function renderAIOutcomes(outcomes) {
  const improvementPercent = outcomes.baselineLiteracy.mean > 0 
    ? ((outcomes.averageImprovement / outcomes.baselineLiteracy.mean) * 100).toFixed(1)
    : 0;
  
  return `
    <div class="ai-section">
      <h3> Educational Outcomes Analysis</h3>
      <div class="ai-outcome-card">
        <h4>Literacy Score Progress</h4>
        <p><strong>Baseline Average:</strong> ${outcomes.baselineLiteracy.mean.toFixed(1)}%</p>
        <p><strong>Latest Average:</strong> ${outcomes.latestLiteracy.mean.toFixed(1)}%</p>
        <p><strong>Average Improvement:</strong> ${outcomes.averageImprovement.toFixed(1)}% (${improvementPercent}%)</p>
        <p><strong>Communities Showing Improvement:</strong> ${outcomes.communitiesWithImprovement}</p>
      </div>
    </div>
  `;
}

function renderAIFunding(funding) {
  return `
    <div class="ai-section">
      <h3> Funding Analysis</h3>
      <div class="ai-funding-card">
        <p><strong>Total Investments:</strong> ${funding.totalInvestments}</p>
        <p><strong>Total Funding:</strong> $${funding.totalFunding.toLocaleString()}</p>
        <p><strong>Average per Investment:</strong> $${funding.averageFundingPerInvestment.toLocaleString()}</p>
        <h4>Funding by Source</h4>
        <ul>
          ${Object.entries(funding.fundingBySource).map(([source, amount]) => 
            `<li>${source}: $${amount.toLocaleString()}</li>`
          ).join('')}
        </ul>
      </div>
    </div>
  `;
}

function renderAITrends(trends) {
  return `
    <div class="ai-section">
      <h3> Trend Analysis</h3>
      <div class="ai-trend-card">
        <h4>Rural vs Urban Communities</h4>
        <p><strong>Rural Communities:</strong> ${trends.ruralVsUrban.rural.count} (Avg Literacy: ${trends.ruralVsUrban.rural.averageLiteracy.toFixed(1)}%)</p>
        <p><strong>Urban Communities:</strong> ${trends.ruralVsUrban.urban.count} (Avg Literacy: ${trends.ruralVsUrban.urban.averageLiteracy.toFixed(1)}%)</p>
        <h4>Program Status Distribution</h4>
        <ul>
          <li>Planning: ${trends.programStatusDistribution.planning}</li>
          <li>Active: ${trends.programStatusDistribution.active}</li>
          <li>Paused: ${trends.programStatusDistribution.paused}</li>
          <li>Completed: ${trends.programStatusDistribution.completed}</li>
        </ul>
      </div>
    </div>
  `;
}

window.renderAICorrelations = function(correlations) {
  if (correlations.length === 0) {
    return `
      <div class="ai-section">
        <h3> Correlation Analysis</h3>
        <p>No significant correlations found in the current data (or too few paired records to say anything reliable).</p>
      </div>
    `;
  }
  

  const METRIC_LABELS = {
    literacyScore: 'Literacy Score',
    kindergartenReadiness: 'Kindergarten Readiness Score',
    grade4Reading: 'Grade 4 Reading Score',
    grade8Reading: 'Grade 8 Reading Score',
    graduationRate: 'Graduation Rate',
    collectionQuality: 'Collection Quality',
    booksDeliveredQuantity: 'Books Delivered',
    physicalVisitsPerMonth: 'Physical Visits Per Month',
    restockRate: 'Restock Rate',
  };
  const SIMPLE_FIELD_LABELS = {
    population: 'Population Count',
    participantsServed: 'Participants Served',
    estimatedFootTraffic: 'Estimated Foot Traffic',
    fundingAmount: 'Funding Amount',
    overheadExpenseAmount: 'Overhead Expense Amount',
  };
  const humanizeSimpleField = (key) => {
    const spaced = String(key).replace(/([a-z0-9])([A-Z])/g, '$1 $2');
    return spaced.charAt(0).toUpperCase() + spaced.slice(1);
  };
  const formatAssessmentPointLabel = (pointKey) => {
    if (/^baseline$/i.test(pointKey)) return 'Baseline';
    const m = /^(\d+)_Months?$/.exec(pointKey);
    if (m) return `${m[1]}-Month`;
    return pointKey.replace(/_/g, ' ');
  };
  const getFieldLabel = (fieldId) => {
    // Cross-dataset comparisons 
    if (fieldId.startsWith('INV_')) return 'Investment \u2014 ' + (SIMPLE_FIELD_LABELS[fieldId.slice(4)] || humanizeSimpleField(fieldId.slice(4)));
    if (fieldId.startsWith('EXP_')) return 'Expense \u2014 ' + (SIMPLE_FIELD_LABELS[fieldId.slice(4)] || humanizeSimpleField(fieldId.slice(4)));

    const assessMatch = /^(outcome|lib)_(.+)$/.exec(fieldId);
    if (assessMatch) {
      const rest = assessMatch[2]; // "<Point>_<metric>"
      const metricKey = Object.keys(METRIC_LABELS)
        .sort((a, b) => b.length - a.length)
        .find(m => rest.endsWith(m));
      if (metricKey) {
        const pointKey = rest.slice(0, rest.length - metricKey.length).replace(/_$/, '');
        return `${formatAssessmentPointLabel(pointKey)} Assessment ${METRIC_LABELS[metricKey]}`;
      }
    }

    return SIMPLE_FIELD_LABELS[fieldId] || humanizeSimpleField(fieldId);
  };
  
  // Function to get correlation strength class
  const getCorrelationStrengthClass = (corr) => {
    const strength = corr.strength.toLowerCase();
    const direction = corr.direction.toLowerCase();

    if (strength === 'strong') {
      return `ai-correlation-strength strong-${direction}`;
    } else if (strength === 'moderate') {
      return `ai-correlation-strength moderate-${direction}`;
    } else {
      return `ai-correlation-strength weak-${direction}`;
    }
  };

  // Function to generate correlation explanation
  const explainCorrelation = (corr) => {
    let explanation = '';

    if (corr.strength === 'Strong') {
      explanation = `Strong ${corr.direction.toLowerCase()} relationship detected `;
    } else if (corr.strength === 'Moderate') {
      explanation = `Moderate ${corr.direction.toLowerCase()} relationship detected `;
    } else {
      explanation = `Weak ${corr.direction.toLowerCase()} relationship detected `;
    }
    explanation += `(based on ${corr.n} paired records). `;

    if (corr.strongestIsClear) {
      explanation += `Best represented by ${corr.strongestMetric} (${corr.strongestValue.toFixed(3)}). `;
    } else {
      explanation += `No single method clearly leads here \u2014 the closest is ${corr.strongestMetric} at ${corr.strongestValue.toFixed(3)}, with others close behind. `;
    }

    if (corr.strongestMetric === 'Distance Correlation' && corr.distance > 0.5) {
      explanation += `Distance correlation flags these as dependent in a possibly non-linear way \u2014 treat this as a lead to check further, not a confirmed pattern. `;
    } else if (corr.strongestMetric === 'Kendall' && Math.abs(corr.kendall) > 0.5) {
      explanation += `Kendall's Tau suggests the rankings move together consistently. `;
    } else if (corr.strongestMetric === 'Spearman' && Math.abs(corr.spearman) > 0.5) {
      explanation += `Spearman indicates a monotonic relationship \u2014 as one goes up, the other tends to move in one consistent direction. `;
    } else if (corr.strongestMetric === 'Pearson' && Math.abs(corr.pearson) > 0.5) {
      explanation += `Pearson suggests a roughly linear relationship between the variables. `;
    }

    if (corr.mutualInfo > 1.5) {
      explanation += `High mutual information suggests these variables share meaningful information. `;
    }

    if (corr.n < 15) {
      explanation += `Small sample (n=${corr.n}) \u2014 treat this as suggestive, not conclusive.`;
    }

    return explanation;
  };

  const glossaryHtml = `
    <div class="ai-correlation-glossary">
      <h4>What these numbers mean</h4>
      <p> A positive 1 (+1) is a Perfect Positive and the corrolation shows that as one number goes up or down, the other goes up or down in tandem. (Example: More Web page views = Higher number of sales).<br>
      0 is No Corrolation. The numbers have no pattern or connection at all.<br>
      A negative 1 (-1) is a Perfect Negative and the corrolation shows that as one number goes up or down, the other goes down or up in opposition. (Example: Higher merchandise prices = Fewer number of sales).<br>
      <ul>
        <li><strong>Pearson:</strong> measures a straight-line relationship. Ranges -1 to 1. Works best when both fields are genuinely continuous numbers.</li>
        <li><strong>Spearman:</strong> measures whether two fields rise and fall together in rank order, even if not in a straight line. Ranges -1 to 1. Appropriate for ordinal fields like Collection Quality.</li>
        <li><strong>Kendall's Tau:</strong> similar to Spearman \u2014 compares pairs of records directly and is more conservative. Also appropriate for ordinal/ranked fields. Ranges -1 to 1.</li>
        <li><strong>Distance Correlation:</strong> not a physical distance \u2014 it detects any kind of dependence, including non-linear/curved relationships the other three can miss. Unlike them, it's always 0 or positive and has no direction (it can't tell you "positive" vs "negative," only "related somehow"). It needs more data to be trustworthy, so it's only shown with at least 8 paired records, and never for fields converted from a category label (like Collection Quality).</li>
        <li><strong>Mutual Information:</strong> how much knowing one field tells you about the other, in bits. Sensitive to sample size, so treat it as a supporting signal rather than primary evidence.</li>
        <li><strong>n:</strong> the number of paired records a given comparison is based on. The lower it is, the less weight any single number here deserves \u2014 comparisons under 15 records are flagged as suggestive, not conclusive.</li>
      </ul>
      </p>
    </div>
  `;

  return `
    <div class="ai-section">
      <h3> Correlation Analysis</h3>
      ${glossaryHtml}
      <div class="ai-correlation-card">
        ${correlations.map(corr => `
          <div class="ai-correlation-item">
            <span class="${getCorrelationStrengthClass(corr)}">${corr.strength} ${corr.direction}</span><br><br>
            <strong>${getFieldLabel(corr.field1)}</strong> ↔ <strong>${getFieldLabel(corr.field2)}</strong><br>
            <div class="ai-correlation-explanation">
              ${explainCorrelation(corr)}
            </div>
          </div>
        `).join('')}
      </div>
    </div>
  `;
}