export const SUB_ENTITY_FIELDS = {
  communities: { 
    communityId: {type: 'string', required: true, label: 'Community ID'},
      geography: {
        locationId:        { type: 'string', required: true, label: 'Location ID' },
        communityName:     { type: 'string', label: 'Community Name' },
        bookEcosystem:     { type: 'string', label: 'Book Ecosystem' },
        gisCoordinates:    { type: 'string', label: 'GIS Coordinates' },
        region:            { type: 'string', label: 'Country' }
      },
      population: {
        reportingYear:           { type: 'date', minimum: 2000, maximum: 2100, label: 'Reporting Year' },
        ruralUrban:              { type: 'string', enum: ['Rural', 'Urban', 'Suburban'], required: true, label: 'Rural/Urban' },
        population:              { type: 'integer', minimum: 0, label: 'Population' },
        participantsServed:      { type: 'integer', minimum: 0, label: 'Number of Participants in Program' },
        estimatedFootTraffic:    { type: 'integer', minimum: 0, label: 'Estimated Monthly Foot Traffic' }
      },
      program: {
        programId:               { type: 'string', required: true, label: 'Program ID' },
        stewardName:             { type: 'string', label: 'Steward Name' },
        startDate:               { type: 'string', format: 'date', label: 'Start Date' },
        status:                  { type: 'string', enum: ['Planning', 'Active', 'Paused', 'Completed'], required: true, label: 'Status' },
        baselineDate:            { type: 'string', format: 'date', label: 'Baseline Assessment Date' },
        sixMonthDate:            { type: 'string', format: 'date', label: '6-Month Update Date' },
        twelveMonthDate:         { type: 'string', format: 'date', label: '12-Month Update Date' },
        twentyFourMonthDate:     { type: 'string', format: 'date', label: '24-Month Update Date' }
      },
      library: {
        type: 'array',
        libraryId:              { type: 'string', label: 'Location ID' },          // carried across all points
        publicSchoolLibrary:     { type: 'string', enum: ['Public', 'School', 'Both'], label: 'Available Library' }, // carried across       
          items: {
            assessmentPoint:         { type: 'string', enum: ['Baseline', '6 Months', '12 Months', '24 Months'], required: true, label: 'Assessment Point' },
            collectionQuality:       { type: 'string', enum: ['Poor', 'Fair', 'Good', 'Excellent'], label: 'Collection Quality' },
            physicalVisitsPerMonth:  { type: 'integer', minimum: 0, label: 'Physical Visits/Month' },
            restockRate:             { type: 'number', label: 'Restock Rate per 6 Months' },
            booksDeliveredQuantity:       { type: 'number', label: 'Books Delivered By Community' }
          }
      },
      outcomes: {
        type: 'array',
        items: {
          assessmentPoint:                                 { type: 'string', enum: ['Baseline', '6 Months', '12 Months', '24 Months'], required: true, label: 'Assessment Point' },
          kindergartenReadinessScore:                      { type: 'number', minimum: 0, maximum: 100, label: 'Kindergarten Readiness Average Scale Score (%)' },
          grade4ReadingScore:                              { type: 'number', minimum: 0, maximum: 100, label: 'Grade 4 Average Scale Reading Score (%)' },
          grade8ReadingScore:                              { type: 'number', minimum: 0, maximum: 100, label: 'Grade 8 Average Scale Reading Score (%)' },
          literacyScore:                                   { type: 'number', minimum: 0, maximum: 100, label: 'Local Literacy Score (%)' },
          highSchoolGraduationRate:                        { type: 'number', minimum: 0, maximum: 100, label: 'High School Graduation Rate (%)' },
          nationalStateAverageKindergartenReadinessScore:  { type: 'number', minimum: 0, maximum: 100, label: 'National or State Average Kindergarten Readiness Score (%)' },
          nationalStateAverageGrade4ReadingScore:          { type: 'number', minimum: 0, maximum: 100, label: 'National or State Average Grade 4 Reading Score (%)' },
          nationalStateAverageGrade8ReadingScore:          { type: 'number', minimum: 0, maximum: 100, label: 'National or State Average Grade 8 Reading Score (%)' },
          nationalStateLiteracyScore:                      { type: 'number', minimum: 0, maximum: 100, label: 'National or State Average Literacy Score (%)' },
          nationalStateHighSchoolGraduationRate:           { type: 'number', minimum: 0, maximum: 100, label: 'National or State Average High School Graduation Rate (%)' },
          assessmentTool:                                  { type: 'string', enum: ['DIBELS', 'MAP Growth', 'NAEP', 'PIRLS', 'PISA', 'EGRA', 'IDELA', 'other'], label: 'Assessment Tool' },
          percentageBenchmark:                             { type: 'number', minimum: 0, maximum: 100, label: 'Percentage at or above Benchmark (%)' }
        }
      }
    },
  
  investments : {
    investmentId:{ type:'string', required:true, label:'Investment Id' },
    sponsor_ID: {type: 'string' , label: 'Sponsorhsip Id'},
    fundingAmount:{ type:'number', minimum:0, required:true, label:'Funding Amount ($)' },
    partnerCommunity: {type: 'string', label: 'Partner Community Reciving Funds (If Applicable)'},
    expenseId: {type: 'string', label: 'Expense Id'},
    dateReceived:{ type:'string', format:'date', label:'Date Funds Received' },
    fundingSourceType:{ type:'string', enum:['Grant','Donation','Fundraiser','Corporate Sponsor','Other'], required:true, label:'Source of Funding' },
    fundingSourceOther:{ type:'string', label:'Please Specify Source' },
    fundingBody:{ type:'string', required:true, label:'Funding Received From (Name of Organization or Person)' },
    dateDisbursed:{ type:'string', format:'date', label:'Date Disbursed' },
    fundsOutcome:{ type:'string', label:'Funds Dispersed To (Partner Communities or Expense IDs)' },
    fundsResults:{ type:'string', label:'Funds Provided/Purchased' }
  },

  expenses : {
    expenseId:{ type:'string', required:true, label:'Expense Id' },
    overheadExpenseAmount:{ type:'number', minimum:0, label:'Overhead Expense Amount' },
    overheadExpenseCategory:{ type:'string', enum:['Books','Shipping','Software','Administration','Salaries','Marketing','Legal','Travel','Other'], label:'Expense Category' },
    expenseDescription:{ type:'string', label:'Expense Description' },
    expensePaymentSource:{ type:'lookup', label:'Payment Source' },
    dateIncurred:{ type:'string', format:'date', label:'Date Incurred' },
}};

// Community structure
export const COMMUNITY_FIELDS = {
  communityId:{ type:'string', required:true, label:'Community ID' },
  communityName:{ type:'string', required:true, label:'Community Name' },
  tribeNation:{ type:'string', label:'Tribe/Nation' },
  bookEcosystem:{ type:'string', required:true, label:'Book Ecosystem' }
};
export const ASSESSMENT_POINTS = ['Baseline','6 Months','12 Months','24 Months'];

// Custom assessment points (stored in localStorage for persistence)
export function getCustomAssessmentPoints() {
  try {
    const stored = localStorage.getItem('customAssessmentPoints');
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    return [];
  }
}

export function addCustomAssessmentPoint(name, months) {
  const custom = getCustomAssessmentPoints();
  const existing = custom.find(c => c.name === name);
  if (existing) return false;
  
  custom.push({ name, months, id: `custom-${Date.now()}` });
  localStorage.setItem('customAssessmentPoints', JSON.stringify(custom));
  return true;
}

export function removeCustomAssessmentPoint(id) {
  const custom = getCustomAssessmentPoints();
  const filtered = custom.filter(c => c.id !== id);
  localStorage.setItem('customAssessmentPoints', JSON.stringify(filtered));
}
export function getAllAssessmentPoints() {
  return [...ASSESSMENT_POINTS, ...getCustomAssessmentPoints().map(c => c.name)];
}

export const BENCHMARK_PAIRS = {
  outcomes: [
    { local: 'literacyScore', benchmark: 'nationalStateLiteracyScore', label: 'Literacy Score' },
    { local: 'kindergartenReadinessScore', benchmark: 'nationalStateAverageKindergartenReadinessScore', label: 'Kindergarten Readiness' },
    { local: 'grade4ReadingScore', benchmark: 'nationalStateAverageGrade4ReadingScore', label: 'Grade 4 Reading Score' },
    { local: 'grade8ReadingScore', benchmark: 'nationalStateAverageGrade8ReadingScore', label: 'Grade 8 Reading Score' },
    { local: 'highSchoolGraduationRate', benchmark: 'nationalStateHighSchoolGraduationRate', label: 'High School Graduation Rate' }
  ]
};

// --- Shared pieces ---

const GeographySchema = {
  locationId:          { type: String },                    // auto-generated
  communityName:       { type: String, required: true },
  bookEcosystem:       { type: String, required: true },
  gisCoordinates:      { type: String, required: true },
  region:              { type: String, required: true }
};

const PopulationSchema = {
  reportingYear:         { type: String, required: true },
  ruralUrban:            { type: String, enum: ['Rural', 'Urban', 'Suburban'] },
  population:            { type: Number, required: true },
  participantsServed:    { type: Number },
  estimatedFootTraffic:  { type: Number }
};

const ProgramSchema = {
  programId:             { type: String },                  // auto-generated
  stewardName:           { type: String, default: '' },
  startDate:             { type: String, required: true },
  status:                { type: String, enum: ['Active', 'Inactive', 'Completed'], default: 'Active' },
  baselineDate:          { type: String },
  sixMonthDate:          { type: String },
  twelveMonthDate:       { type: String },
  twentyFourMonthDate:   { type: String }
};

// One record per assessment point
const LibraryAssessmentSchema = {
  libraryId:   { type: String },               
  assessmentPoint:       { 
    type: String, 
    required: true, 
    enum: ASSESSMENT_POINTS 
  },
  locationId:            { type: String },                 
  publicSchoolLibrary:   { type: String, enum: ['Public', 'School', 'Both'], required: true },
  
  // Metrics – null until measured
  collectionQuality:     { type: String, enum: ['Poor', 'Fair', 'Good', 'Excellent', null], default: null },
  physicalVisitsPerMonth:{ type: Number, default: null },
  restockRate:           { type: Number, default: null },
  booksDeliveredQuantity:     { type: Number, default: null }
};


const CommunitySchema = {
  communityId:   { type: String },                         

  geography:     { type: GeographySchema, required: true },
  population:    { type: PopulationSchema, required: true },
  program:       { type: ProgramSchema, required: true },

  library: {
    type: [LibraryAssessmentSchema],
    required: true,
    validate: {
      validator: function (arr) {
        const points = arr.map(r => r.assessmentPoint);
        return new Set(points).size === points.length;
      },
      message: 'Duplicate assessmentPoint found in library array'
    }
  }
};

export const ENTITY_SCOPE = {
  population:  { scope: 'community', collapse: 'single' },
  program:     { scope: 'community', collapse: 'single' }, 
  community:   { scope: 'community', collapse: 'single' },
  geography:   { scope: 'community', collapse: 'single' },
  library:     { scope: 'community', collapse: 'latest' },     
  outcomes:    { scope: 'community', collapse: 'latest' },   
  investments: { scope: 'standalone' },                        
  expenses:    { scope: 'standalone' }                         
};  

export const MAIN_TABS = [
  { key:'overview', label:'Overview' },
  { key:'bookEcosystems', label:'Book Ecosystems' },
  { key:'funding', label:'Funding Information' },
  { key:'aiInsights', label: 'AI Insights'},
  { key:'charts', label:'Charts' },
  { key:'importExport', label:'Import/Export' },
  { key:'addCommunity', label:'Add New Community' },
  { key:'editTable', label:'Edit Table Design' }
];

export const FUNDING_TABS = [
  { key:'investments', label:'Investments' },
  { key:'expenses', label:'Expenses' },
  { key:'programCosts', label:'Program Costs' }
];

export const SUB_ENTITY_TABS = [
  { key:'geography', label:'Geography' },
  { key:'population', label:'Population' },
  { key:'program', label:'Program' },
  { key:'library', label:'Library' },
  { key:'outcomes', label:'Outcomes' },
];

export const SINGLE_ENTITY_TYPES = ['geography','population','program'];

export const ASSESSMENT_POINT_TYPES = ['library','outcomes'];

export const STICKY_FIELDS = {
  library: ['libraryId', 'infrastructure', 'publicSchoolLibrary', 'locationID', 'programId', 'libraryId' ],
};

export const CHART_CATEGORIES = [
  { key: 'sponsorship', label: 'Sponsorship Metrics' },
  { key: 'partner', label: 'Partner Metrics' },
  { key: 'customBuilder', label: 'Build Your Own Chart' }
]; 

// Flattened Metric-to-Metric Builder Config
export const DYNAMIC_CUSTOM_BUILDER = {
  label: 'Direct Metric Correlation Engine',
  description: 'Select any field in the database for the xaxis and pair it directly with any field for the yaxis.',
};
  // Supported non-grouped visualizers
export const  supportedChartTypes = [
    { id: 'scatter', label: 'Scatter Plot' }, 
    { id: 'line', label: 'Line Chart' },
    { id: 'bubble', label: 'Bubble Chart' },
    { id: 'bar', label: 'Bar Chart' },
    { id: 'pie', label: 'Pie Chart' },
    { id: 'radar', label: 'Radar Chart' },
    { id: 'polar', label: 'Polar Chart' },
    { id: 'area', label: 'Area Chart' },
    { id: 'kpi', label: 'KPI Cards' }
  ];

export const GROUP_PALETTE = ['#0488b5','#b51904','#5a04b5','#04b59d','#c084fc','#b504ac','#019504','#182d78'];


export const DATABASE_FIELDS = [
  {
    "id": "communityName",
    "label": "Community Name",
    "type": "ID"
  },
  {
    "id": "bookEcosystem",
    "label": "Book Ecosystem Name",
    "type": "ID"
  },
  {
    "id": "region",
    "label": "Region",
    "type": "GRP"
  },
  {
    "id": "reportingYear",
    "label": "Reporting Year",
    "type": "DATE"
  },
  {
    "id": "ruralUrban",
    "label": "Rural or Urban",
    "type": "GRP"
  },
  {
    "id": "population",
    "label": "Population Size",
    "type": "CNT"
  },
  {
    "id": "participantsServed",
    "label": "Participants Served",
    "type": "CNT"
  },
  {
    "id": "estimatedFootTraffic",
    "label": "Estimated Foot Traffic",
    "type": "CNT"
  },
  {
    "id": "startDate",
    "label": "Start Date of Program",
    "type": "DATE"
  },
  {
    "id": "publicSchoolLibrary",
    "label": "Public School Library (Y/N)",
    "type": "GRP"
  },
  {
    "id": "assessmentPoint",
    "label": "Assessment Point",
    "type": "ORD"
  },
  {
    "id": "collectionQuality",
    "label": "Collection Quality",
    "type": "SCR"
  },
  {
    "id": "physicalVisitsPerMonth",
    "label": "Physical Visits Per Month",
    "type": "CNT"
  },
  {
    "id": "restockRate",
    "label": "Restock Rate",
    "type": "SCR"
  },
  {
    "id": "booksDeliveredQuantity",
    "label": "Books Delivered Quantity",
    "type": "CNT"
  },
  {
    "id": "kindergartenReadinessScore",
    "label": "Kindergarten Readiness Score",
    "type": "SCR"
  },
  {
    "id": "grade4ReadingScore",
    "label": "Grade 4 Reading Score",
    "type": "SCR"
  },
  {
    "id": "grade8ReadingScore",
    "label": "Grade 8 Reading Score",
    "type": "SCR"
  },
  {
    "id": "literacyScore",
    "label": "Literacy Score",
    "type": "SCR"
  },
  {
    "id": "highSchoolGraduationRate",
    "label": "High School Graduation Rate",
    "type": "SCR"
  },
  {
    "id": "nationalStateAverageKindergartenReadinessScore",
    "label": "National/State Avg Kindergarten Readiness Score",
    "type": "SCR"
  },
  {
    "id": "nationalStateAverageGrade4ReadingScore",
    "label": "National/State Avg Grade 4 Reading Score",
    "type": "SCR"
  },
  {
    "id": "nationalStateAverageGrade8ReadingScore",
    "label": "National/State Avg Grade 8 Reading Score",
    "type": "SCR"
  },
  {
    "id": "naionalStateLiteracyScore",
    "label": "National/State Literacy Score",
    "type": "SCR"
  },
  {
    "id": "nationalStateHighSchoolGraduationRate",
    "label": "National/State Avg High School Graduation Rate",
    "type": "SCR"
  },
  {
    "id": "assessmentTool",
    "label": "Assessment Tool",
    "type": "GRP"
  },
  {
    "id": "baselineDate",
    "label": "Baseline Assessment",
    "type": "SCR"
  },
  {
    "id": "sixMonthDate",
    "label": "6-Month Assessment",
    "type": "SCR"
  },
  {
    "id": "twelveMonthDate",
    "label": "12-Month Assessment",
    "type": "SCR"
  },
  {
    "id": "twentyFourMonthDate",
    "label": "24-Month Assessment",
    "type": "SCR"
  },
  {
    "id": "percentageBenchmark",
    "label": "Percentage Benchmark",
    "type": "SCR"
  },
  {
    "id": "fundingAmount",
    "label": "Funding Amount",
    "type": "CNT"
  },
  {
    "id": "dateReceived",
    "label": "Date Received",
    "type": "DATE"
  },
  {
    "id": "fundingSourceType",
    "label": "Funding Source Type",
    "type": "GRP"
  },
  {
    "id": "fundingBody",
    "label": "Funding Body",
    "type": "GRP"
  },
  {
    "id": "dateDisbursed",
    "label": "Date Disbursed",
    "type": "DATE"
  },
  {
    "id": "fundsOutcome",
    "label": "Funds Purchased (Items)",
    "type": "GRP"
  },
  {
    "id": "fundsResults",
    "label": "Funds Dispersed To (Ecosystem)",
    "type": "GRP"
  },
  {
    "id": "overheadExpenseAmount",
    "label": "Overhead Expense Amount",
    "type": "CNT"
  },
  {
    "id": "overheadExpenseCategory",
    "label": "Overhead Expense Category",
    "type": "GRP"
  },
  {
    "id": "expensePaymentSource",
    "label": "Expense Payment Source",
    "type": "GRP"
  },
  {
    "id": "dateIncurred",
    "label": "Date Expense Was Incurred",
    "type": "DATE"
  }
];



/**
 * 2. CHART-TYPE MATRIX*/
export const CHART_CONFIG = [
{xaxis:"Book Ecosystem", yaxis:"Country",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Country",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Book Ecosystem", yaxis:"Reporting Year",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"No",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Book Ecosystem", yaxis:"Population",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"Populationisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"Number of Participants in Program",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"ParticipantsServedisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"Estimated Monthly Foot Traffic",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"EstimatedFootTrafficisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"Start Date",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"No",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Book Ecosystem", yaxis:"Assessment Point",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Assessment Point",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Book Ecosystem", yaxis:"Physical Visits/Month",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"PhysicalVisitsPerMonthisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"Restock Rate per 6 Months",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"RestockRateisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"Books Delivered By Community",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"BooksDeliveredQuantityisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"Kindergarten Readiness Average Scale Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"KindergartenReadinessScoreisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"Grade 4 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"Grade4ReadingScoreisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"Grade 8 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"Grade8ReadingScoreisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"Local Literacy Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"LiteracyScoreisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"HighSchoolGraduationRateisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"National or State Average Kindergarten Readiness Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"National/StateAvgKindergartenReadinessScoreisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"National or State Average Grade 4 Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade4ReadingScoreisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"National or State Average Grade 8 Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade8ReadingScoreisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"National or State Average Literacy Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"National/StateAvgLiteracyScoreisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"National/StateAvgHighSchoolGraduationRateisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"baselineAssessmentisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"6-Month Update Date",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"sixMonthDateisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"12-Month Update Date",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"twelveMonthScoreisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"24-Month Update Date",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"twentyFourMonthDateisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"FundingAmountisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"Date Received",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"No",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Book Ecosystem", yaxis:"Source of Funding",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Source of Funding",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Book Ecosystem", yaxis:"Funding Received From",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Funding Received From",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Book Ecosystem", yaxis:"Funds Dispersed To",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Funds Dispersed To",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Book Ecosystem", yaxis:"Funds Provided",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Funds Provided",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Book Ecosystem", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Reporting Year",notes:"OverheadExpenseAmountisanaturalmeasure;BookEcosystemisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Book Ecosystem", yaxis:"Overhead Expense Category",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem"],dataSeries:"Overhead Expense Category",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Country", yaxis:"Reporting Year",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"No",groupBy:["Country"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Country", yaxis:"Population",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"Populationisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"Number of Participants in Program",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"ParticipantsServedisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"Estimated Monthly Foot Traffic",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"EstimatedFootTrafficisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"Start Date",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"No",groupBy:["Country"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Country", yaxis:"Assessment Point",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Assessment Point",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Country", yaxis:"Physical Visits/Month",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"PhysicalVisitsPerMonthisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"Restock Rate per 6 Months",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"RestockRateisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"Books Delivered By Community",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"BooksDeliveredQuantityisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"Kindergarten Readiness Average Scale Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"KindergartenReadinessScoreisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"Grade 4 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"Grade4ReadingScoreisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"Grade 8 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"Grade8ReadingScoreisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"Local Literacy Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"LiteracyScoreisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"HighSchoolGraduationRateisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"National or State Average Kindergarten Readiness Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"National/StateAvgKindergartenReadinessScoreisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"National or State Average Grade 4 Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade4ReadingScoreisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"National or State Average Grade 8 Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade8ReadingScoreisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"National or State Average Literacy Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"National/StateAvgLiteracyScoreisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"National/StateAvgHighSchoolGraduationRateisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"baselineAssessmentisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"6-Month Update Date",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"sixMonthDateisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"12-Month Update Date",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"twelveMonthScoreisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"24-Month Update Date",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"twentyFourMonthDateisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"FundingAmountisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"Date Received",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"No",groupBy:["Country"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Country", yaxis:"Source of Funding",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Source of Funding",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Country", yaxis:"Funding Received From",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Funding Received From",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Country", yaxis:"Funds Dispersed To",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Funds Dispersed To",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Country", yaxis:"Funds Provided",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Funds Provided",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Country", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"OverheadExpenseAmountisanaturalmeasure;Countryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Country", yaxis:"Overhead Expense Category",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Overhead Expense Category",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Reporting Year", yaxis:"Population",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"PopulationoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"Number of Participants in Program",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"ParticipantsServedoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"Estimated Monthly Foot Traffic",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"EstimatedFootTrafficoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"Start Date",matrixCode:"FILTER/DERIVE",chartType:["timeline","table"],datasetFilter:["Book Ecosystem","Country"],zaxis:"Yes",groupBy:["Reporting Year"],dataSeries:"None",notes:"Rawdate-vs-dateisusuallyweak.Deriveprogramdurationordays-to-fundingwhenappropriate."},
{xaxis:"Reporting Year", yaxis:"Assessment Point",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"No",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Reporting Year", yaxis:"Physical Visits/Month",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"PhysicalVisitsPerMonthoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"Restock Rate per 6 Months",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"RestockRateoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"Books Delivered By Community",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"BooksDeliveredQuantityoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"Kindergarten Readiness Average Scale Score (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"KindergartenReadinessScoreoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"Grade 4 Average Scale Reading Score (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"Grade4ReadingScoreoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"Grade 8 Average Scale Reading Score (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"Grade8ReadingScoreoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"Local Literacy Score (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"LiteracyScoreoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"High School Graduation Rate (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"HighSchoolGraduationRateoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"National or State Average Kindergarten Readiness Score (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"National/StateAvgKindergartenReadinessScoreoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"National or State Average Grade 4 Reading Score (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"National/StateAvgGrade4ReadingScoreoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"National or State Average Grade 8 Reading Score (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"National/StateAvgGrade8ReadingScoreoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"National or State Average Literacy Score (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"National/StateAvgLiteracyScoreoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"National/StateAvgHighSchoolGraduationRateoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"baselineAssessmentoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"6-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"sixMonthDateoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"12-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"twelveMonthScoreoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"24-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"twentyFourMonthDateoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"Funding Amount ($)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"FundingAmountoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"Date Received",matrixCode:"FILTER/DERIVE",chartType:["timeline","table"],datasetFilter:["Book Ecosystem","Country"],zaxis:"Yes",groupBy:["Reporting Year"],dataSeries:"None",notes:"Rawdate-vs-dateisusuallyweak.Deriveprogramdurationordays-to-fundingwhenappropriate."},
{xaxis:"Reporting Year", yaxis:"Source of Funding",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"No",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Reporting Year", yaxis:"Funding Received From",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"No",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Reporting Year", yaxis:"Funds Dispersed To",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"No",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Reporting Year", yaxis:"Funds Provided",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"No",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Reporting Year", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Country",notes:"OverheadExpenseAmountoverReportingYearismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Reporting Year", yaxis:"Overhead Expense Category",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"No",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"population", yaxis:"participantsServed",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"estimatedFootTraffic",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"startDate",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["bookEcosystem","region","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"populationoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"population", yaxis:"assessmentPoint",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["reportingYear","region","bookEcosystem"],zaxis:"Yes",groupBy:["assessmentPoint"],dataSeries:"reportingYear",notes:"populationisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"population", yaxis:"physicalVisitsPerMonth",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"restockRate",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"booksDeliveredQuantity",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"kindergartenReadinessScore",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"grade4ReadingScore",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"grade8ReadingScore",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"literacyScore",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"highSchoolGraduationRate",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"nationalStateAverageKindergartenReadinessScore",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"nationalStateAverageGrade4ReadingScore",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"nationalStateAverageGrade8ReadingScore",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"nationalStateLiteracyScore",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"nationalStateHighSchoolGraduationRate",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"baselineDate",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"sixMonthDate",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"twelveMonthDate",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"twentyFourMonthDate",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"fundingAmount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"dateReceived",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["bookEcosystem","region","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"populationoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"population", yaxis:"fundingSourceType",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["reportingYear","region","bookEcosystem"],zaxis:"Yes",groupBy:["fundingSourceType"],dataSeries:"reportingYear",notes:"populationisanaturalmeasure;FundingSourceTypeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"population", yaxis:"fundingBody",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["reportingYear","region","bookEcosystem"],zaxis:"Yes",groupBy:["fundingBody"],dataSeries:"reportingYear",notes:"populationisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"population", yaxis:"fundsOutcome",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["reportingYear","region","bookEcosystem"],zaxis:"Yes",groupBy:["fundsResults"],dataSeries:"reportingYear",notes:"populationisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"population", yaxis:"fundsResults",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["reportingYear","region","bookEcosystem"],zaxis:"Yes",groupBy:["FundsResults"],dataSeries:"reportingYear",notes:"populationisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"population", yaxis:"overheadExpenseAmount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["bookEcosystem","region","reportingYear","fundingSourceType"],zaxis:"Yes",groupBy:["bookEcosystem","region"],dataSeries:"reportingYear",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"population", yaxis:"overheadExpenseCategory",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["reportingYear","region","bookEcosystem"],zaxis:"Yes",groupBy:["overheadExpenseCategory"],dataSeries:"reportingYear",notes:"populationisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Number of Participants in Program", yaxis:"Estimated Monthly Foot Traffic",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"Start Date",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"ParticipantsServedoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Number of Participants in Program", yaxis:"Assessment Point",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"ParticipantsServedisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Number of Participants in Program", yaxis:"Physical Visits/Month",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"Restock Rate per 6 Months",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"Books Delivered By Community",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"Kindergarten Readiness Average Scale Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"Grade 4 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"Grade 8 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"Local Literacy Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"National or State Average Kindergarten Readiness Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"National or State Average Grade 4 Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"National or State Average Grade 8 Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"National or State Average Literacy Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"6-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"12-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"24-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Number of Participants in Program", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"ParticipantsServedoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Number of Participants in Program", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"ParticipantsServedisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Number of Participants in Program", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"estimatedFootTrafficisanaturalmeasure;Funding Bodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Estimated Monthly Foot Traffic",yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"estimatedFootTrafficisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"estimatedFootTrafficisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"estimatedFootTrafficisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Start Date",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"EstimatedFootTrafficoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Assessment Point",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"EstimatedFootTrafficisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Physical Visits/Month",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Restock Rate per 6 Months",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Books Delivered By Community",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Kindergarten Readiness Average Scale Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Grade 4 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Grade 8 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Local Literacy Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"National or State Average Kindergarten Readiness Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"National or State Average Grade 4 Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"National or State Average Grade 8 Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"National or State Average Literacy Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"6-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"12-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"24-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"EstimatedFootTrafficoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"EstimatedFootTrafficisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"EstimatedFootTrafficisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"EstimatedFootTrafficisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"EstimatedFootTrafficisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Estimated Monthly Foot Traffic", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"EstimatedFootTrafficisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Start Date", yaxis:"Assessment Point",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"No",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Start Date", yaxis:"Physical Visits/Month",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"PhysicalVisitsPerMonthoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"Restock Rate per 6 Months",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"RestockRateoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"Books Delivered By Community",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"BooksDeliveredQuantityoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"Kindergarten Readiness Average Scale Score (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"KindergartenReadinessScoreoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"Grade 4 Average Scale Reading Score (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Grade4ReadingScoreoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"Grade 8 Average Scale Reading Score (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Grade8ReadingScoreoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"Local Literacy Score (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"LiteracyScoreoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"High School Graduation Rate (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"HighSchoolGraduationRateoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"National or State Average Kindergarten Readiness Score (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"National/StateAvgKindergartenReadinessScoreoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"National or State Average Grade 4 Reading Score (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade4ReadingScoreoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"National or State Average Grade 8 Reading Score (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade8ReadingScoreoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"National or State Average Literacy Score (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"National/StateAvgLiteracyScoreoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"National/StateAvgHighSchoolGraduationRateoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"baselineAssessmentoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"6-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"sixMonthDateoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"12-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"twelveMonthScoreoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"24-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"twentyFourMonthDateoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"Funding Amount ($)",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"FundingAmountoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"Date Received",matrixCode:"FILTER/DERIVE",chartType:["timeline","table"],datasetFilter:["Book Ecosystem","Country"],zaxis:"Yes",groupBy:["Reporting Year"],dataSeries:"None",notes:"Rawdate-vs-dateisusuallyweak.Deriveprogramdurationordays-to-fundingwhenappropriate."},
{xaxis:"Start Date", yaxis:"Source of Funding",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Start Date", yaxis:"Funding Received From",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Start Date", yaxis:"Funds Dispersed To",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Start Date", yaxis:"Funds Provided",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Start Date", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"OverheadExpenseAmountoverStartDateofProgramismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Start Date", yaxis:"Overhead Expense Category",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Assessment Point", yaxis:"Physical Visits/Month",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"PhysicalVisitsPerMonthisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"Restock Rate per 6 Months",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"RestockRateisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"Books Delivered By Community",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"BooksDeliveredQuantityisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"Kindergarten Readiness Average Scale Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"KindergartenReadinessScoreisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"Grade 4 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"Grade4ReadingScoreisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"Grade 8 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"Grade8ReadingScoreisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"Local Literacy Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"LiteracyScoreisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"HighSchoolGraduationRateisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"National or State Average Kindergarten Readiness Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"National/StateAvgKindergartenReadinessScoreisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"National or State Average Grade 4 Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade4ReadingScoreisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"National or State Average Grade 8 Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade8ReadingScoreisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"National or State Average Literacy Score (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"National/StateAvgLiteracyScoreisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"National/StateAvgHighSchoolGraduationRateisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"baselineAssessmentisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"6-Month Update Date",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"sixMonthDateisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"12-Month Update Date",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"twelveMonthScoreisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"24-Month Update Date",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"twentyFourMonthDateisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"FundingAmountisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"Date Received",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Assessment Point", yaxis:"Source of Funding",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Source of Funding",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Assessment Point", yaxis:"Funding Received From",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Funding Received From",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Assessment Point", yaxis:"Funds Dispersed To",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Funds Dispersed To",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Assessment Point", yaxis:"Funds Provided",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Funds Provided",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Assessment Point", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Reporting Year",notes:"OverheadExpenseAmountisanaturalmeasure;AssessmentPointisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Assessment Point", yaxis:"Overhead Expense Category",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Assessment Point"],dataSeries:"Overhead Expense Category",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Physical Visits/Month", yaxis:"Restock Rate per 6 Months",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"Books Delivered By Community",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"Kindergarten Readiness Average Scale Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"Grade 4 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"Grade 8 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"Local Literacy Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"National or State Average Kindergarten Readiness Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"National or State Average Grade 4 Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"National or State Average Grade 8 Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"National or State Average Literacy Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"6-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"12-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"24-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"PhysicalVisitsPerMonthoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Physical Visits/Month", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"PhysicalVisitsPerMonthisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Physical Visits/Month", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"PhysicalVisitsPerMonthisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Physical Visits/Month", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"PhysicalVisitsPerMonthisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Physical Visits/Month", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"PhysicalVisitsPerMonthisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Physical Visits/Month", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Physical Visits/Month", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"PhysicalVisitsPerMonthisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Restock Rate per 6 Months", yaxis:"Books Delivered By Community",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Restock Rate per 6 Months", yaxis:"Kindergarten Readiness Average Scale Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Restock Rate per 6 Months", yaxis:"Grade 4 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Restock Rate per 6 Months", yaxis:"Grade 8 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Restock Rate per 6 Months", yaxis:"Local Literacy Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Restock Rate per 6 Months", yaxis:"High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Restock Rate per 6 Months", yaxis:"National or State Average Kindergarten Readiness Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Restock Rate per 6 Months", yaxis:"National or State Average Grade 4 Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Restock Rate per 6 Months", yaxis:"National or State Average Grade 8 Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Restock Rate per 6 Months", yaxis:"National or State Average Literacy Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Restock Rate per 6 Months", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Restock Rate per 6 Months", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Restock Rate per 6 Months", yaxis:"6-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Restock Rate per 6 Months", yaxis:"12-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Restock Rate per 6 Months", yaxis:"24-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Restock Rate per 6 Months", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Restock Rate per 6 Months", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"RestockRateoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Restock Rate per 6 Months", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"RestockRateisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Restock Rate per 6 Months", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"RestockRateisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Restock Rate per 6 Months", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"RestockRateisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Restock Rate per 6 Months", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"RestockRateisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Restock Rate per 6 Months", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Restock Rate per 6 Months", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"RestockRateisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Books Delivered By Community", yaxis:"Kindergarten Readiness Average Scale Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Books Delivered By Community", yaxis:"Grade 4 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Books Delivered By Community", yaxis:"Grade 8 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Books Delivered By Community", yaxis:"Local Literacy Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Books Delivered By Community", yaxis:"High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Books Delivered By Community", yaxis:"National or State Average Kindergarten Readiness Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Books Delivered By Community", yaxis:"National or State Average Grade 4 Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Books Delivered By Community", yaxis:"National or State Average Grade 8 Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Books Delivered By Community", yaxis:"National or State Average Literacy Score (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Books Delivered By Community", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Books Delivered By Community", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Books Delivered By Community", yaxis:"6-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Books Delivered By Community", yaxis:"12-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Books Delivered By Community", yaxis:"24-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Books Delivered By Community", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Books Delivered By Community", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"BooksDeliveredQuantityoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Books Delivered By Community", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"BooksDeliveredQuantityisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Books Delivered By Community", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"BooksDeliveredQuantityisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Books Delivered By Community", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"BooksDeliveredQuantityisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Books Delivered By Community", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"BooksDeliveredQuantityisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Books Delivered By Community", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Books Delivered By Community", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"BooksDeliveredQuantityisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"Grade 4 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bar"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Bothareoutcomemeasures;testassociationratherthanimplyingcausation."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"Grade 8 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bar"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Bothareoutcomemeasures;testassociationratherthanimplyingcausation."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"Local Literacy Score (%)",matrixCode:"DIRECT",chartType:["scatter","bar"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Bothareoutcomemeasures;testassociationratherthanimplyingcausation."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["scatter","bar"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Bothareoutcomemeasures;testassociationratherthanimplyingcausation."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"National or State Average Kindergarten Readiness Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"National or State Average Grade 4 Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"National or State Average Grade 8 Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"National or State Average Literacy Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"6-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"12-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"24-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"KindergartenReadinessScoreoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"KindergartenReadinessScoreisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"KindergartenReadinessScoreisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"KindergartenReadinessScoreisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"KindergartenReadinessScoreisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Kindergarten Readiness Average Scale Score (%)", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"KindergartenReadinessScoreisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"Grade 8 Average Scale Reading Score (%)",matrixCode:"DIRECT",chartType:["scatter","bar"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Bothareoutcomemeasures;testassociationratherthanimplyingcausation."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"Local Literacy Score (%)",matrixCode:"DIRECT",chartType:["scatter","bar"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Bothareoutcomemeasures;testassociationratherthanimplyingcausation."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["scatter","bar"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Bothareoutcomemeasures;testassociationratherthanimplyingcausation."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"National or State Average Kindergarten Readiness Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"National or State Average Grade 4 Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"National or State Average Grade 8 Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"National or State Average Literacy Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"6-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"12-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"24-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Grade4ReadingScoreoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"Grade4ReadingScoreisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"Grade4ReadingScoreisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"Grade4ReadingScoreisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"Grade4ReadingScoreisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Grade 4 Average Scale Reading Score (%)", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"Grade4ReadingScoreisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"Local Literacy Score (%)",matrixCode:"DIRECT",chartType:["scatter","bar"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Bothareoutcomemeasures;testassociationratherthanimplyingcausation."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["scatter","bar"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Bothareoutcomemeasures;testassociationratherthanimplyingcausation."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"National or State Average Kindergarten Readiness Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"National or State Average Grade 4 Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"National or State Average Grade 8 Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"National or State Average Literacy Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"6-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"12-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"24-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Grade8ReadingScoreoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"Grade8ReadingScoreisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"Grade8ReadingScoreisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"Grade8ReadingScoreisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"Grade8ReadingScoreisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Grade 8 Average Scale Reading Score (%)", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"Grade8ReadingScoreisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Local Literacy Score (%)", yaxis:"High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["scatter","bar"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Bothareoutcomemeasures;testassociationratherthanimplyingcausation."},
{xaxis:"Local Literacy Score (%)", yaxis:"National or State Average Kindergarten Readiness Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Local Literacy Score (%)", yaxis:"National or State Average Grade 4 Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Local Literacy Score (%)", yaxis:"National or State Average Grade 8 Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Local Literacy Score (%)", yaxis:"National or State Average Literacy Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Local Literacy Score (%)", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"Local Literacy Score (%)", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"Local Literacy Score (%)", yaxis:"6-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"Local Literacy Score (%)", yaxis:"12-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"Local Literacy Score (%)", yaxis:"24-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"Local Literacy Score (%)", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Local Literacy Score (%)", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"LiteracyScoreoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Local Literacy Score (%)", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"LiteracyScoreisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Local Literacy Score (%)", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"LiteracyScoreisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Local Literacy Score (%)", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"LiteracyScoreisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Local Literacy Score (%)", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"LiteracyScoreisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Local Literacy Score (%)", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Local Literacy Score (%)", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"LiteracyScoreisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"High School Graduation Rate (%)", yaxis:"National or State Average Kindergarten Readiness Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"High School Graduation Rate (%)", yaxis:"National or State Average Grade 4 Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"High School Graduation Rate (%)", yaxis:"National or State Average Grade 8 Reading Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"High School Graduation Rate (%)", yaxis:"National or State Average Literacy Score (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"High School Graduation Rate (%)", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"DIRECT",chartType:["bar","scatter"],datasetFilter:["Country","Reporting Year","Book Ecosystem"],zaxis:"Yes",groupBy:["Country","Book Ecosystem"],dataSeries:"Reporting Year",notes:"Bestforactual-vs-benchmarkgap;deriveGap=actual-benchmark."},
{xaxis:"High School Graduation Rate (%)", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"High School Graduation Rate (%)", yaxis:"6-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"High School Graduation Rate (%)", yaxis:"12-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"High School Graduation Rate (%)", yaxis:"24-Month Update Date",matrixCode:"DIRECT+FILTER",chartType:["Line","radar"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Population"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Stronglongitudinaloutcomerelationship;comparebaseline/6/12/24monthstooutcomemetriccarefully."},
{xaxis:"High School Graduation Rate (%)", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"High School Graduation Rate (%)", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"HighSchoolGraduationRateoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"High School Graduation Rate (%)", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"HighSchoolGraduationRateisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"High School Graduation Rate (%)", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"HighSchoolGraduationRateisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"High School Graduation Rate (%)", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"HighSchoolGraduationRateisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"High School Graduation Rate (%)", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"HighSchoolGraduationRateisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"High School Graduation Rate (%)", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"High School Graduation Rate (%)", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"HighSchoolGraduationRateisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Kindergarten Readiness Score (%)", yaxis:"National or State Average Grade 4 Reading Score (%)",matrixCode:"FILTER/GROUP",chartType:["bar"],datasetFilter:["Country","Reporting Year"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"Benchmarksarereferencevalues;usefulmainlytocontextualizeactualoutcomes."},
{xaxis:"National or State Average Kindergarten Readiness Score (%)", yaxis:"National or State Average Grade 8 Reading Score (%)",matrixCode:"FILTER/GROUP",chartType:["bar"],datasetFilter:["Country","Reporting Year"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"Benchmarksarereferencevalues;usefulmainlytocontextualizeactualoutcomes."},
{xaxis:"National or State Average Kindergarten Readiness Score (%)", yaxis:"National or State Average Literacy Score (%)",matrixCode:"FILTER/GROUP",chartType:["bar"],datasetFilter:["Country","Reporting Year"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"Benchmarksarereferencevalues;usefulmainlytocontextualizeactualoutcomes."},
{xaxis:"National or State Average Kindergarten Readiness Score (%)", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"FILTER/GROUP",chartType:["bar"],datasetFilter:["Country","Reporting Year"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"Benchmarksarereferencevalues;usefulmainlytocontextualizeactualoutcomes."},
{xaxis:"National or State Average Kindergarten Readiness Score (%)", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Kindergarten Readiness Score (%)", yaxis:"6-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Kindergarten Readiness Score (%)", yaxis:"12-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Kindergarten Readiness Score (%)", yaxis:"24-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Kindergarten Readiness Score (%)", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Kindergarten Readiness Score (%)", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"National/StateAvgKindergartenReadinessScoreoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"National or State Average Kindergarten Readiness Score (%)", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"National/StateAvgKindergartenReadinessScoreisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Kindergarten Readiness Score (%)", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"National/StateAvgKindergartenReadinessScoreisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Kindergarten Readiness Score (%)", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"National/StateAvgKindergartenReadinessScoreisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Kindergarten Readiness Score (%)", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"National/StateAvgKindergartenReadinessScoreisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Kindergarten Readiness Score (%)", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Kindergarten Readiness Score (%)", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"National/StateAvgKindergartenReadinessScoreisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Grade 4 Reading Score (%)", yaxis:"National or State Average Grade 8 Reading Score (%)",matrixCode:"FILTER/GROUP",chartType:["bar"],datasetFilter:["Country","Reporting Year"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"Benchmarksarereferencevalues;usefulmainlytocontextualizeactualoutcomes."},
{xaxis:"National or State Average Grade 4 Reading Score (%)", yaxis:"National or State Average Literacy Score (%)",matrixCode:"FILTER/GROUP",chartType:["bar"],datasetFilter:["Country","Reporting Year"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"Benchmarksarereferencevalues;usefulmainlytocontextualizeactualoutcomes."},
{xaxis:"National or State Average Grade 4 Reading Score (%)", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"FILTER/GROUP",chartType:["bar"],datasetFilter:["Country","Reporting Year"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"Benchmarksarereferencevalues;usefulmainlytocontextualizeactualoutcomes."},
{xaxis:"National or State Average Grade 4 Reading Score (%)", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Grade 4 Reading Score (%)", yaxis:"6-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Grade 4 Reading Score (%)", yaxis:"12-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Grade 4 Reading Score (%)", yaxis:"24-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Grade 4 Reading Score (%)", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Grade 4 Reading Score (%)", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade4ReadingScoreoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"National or State Average Grade 4 Reading Score (%)", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade4ReadingScoreisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Grade 4 Reading Score (%)", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade4ReadingScoreisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Grade 4 Reading Score (%)", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade4ReadingScoreisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Grade 4 Reading Score (%)", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade4ReadingScoreisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Grade 4 Reading Score (%)", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Grade 4 Reading Score (%)", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade4ReadingScoreisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Grade 8 Reading Score (%)", yaxis:"National or State Average Literacy Score (%)",matrixCode:"FILTER/GROUP",chartType:["bar"],datasetFilter:["Country","Reporting Year"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"Benchmarksarereferencevalues;usefulmainlytocontextualizeactualoutcomes."},
{xaxis:"National or State Average Grade 8 Reading Score (%)", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"FILTER/GROUP",chartType:["bar"],datasetFilter:["Country","Reporting Year"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"Benchmarksarereferencevalues;usefulmainlytocontextualizeactualoutcomes."},
{xaxis:"National or State Average Grade 8 Reading Score (%)", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Grade 8 Reading Score (%)", yaxis:"6-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Grade 8 Reading Score (%)", yaxis:"12-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Grade 8 Reading Score (%)", yaxis:"24-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Grade 8 Reading Score (%)", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Grade 8 Reading Score (%)", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade8ReadingScoreoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"National or State Average Grade 8 Reading Score (%)", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade8ReadingScoreisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Grade 8 Reading Score (%)", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade8ReadingScoreisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Grade 8 Reading Score (%)", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade8ReadingScoreisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Grade 8 Reading Score (%)", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade8ReadingScoreisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Grade 8 Reading Score (%)", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Grade 8 Reading Score (%)", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"National/StateAvgGrade8ReadingScoreisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Literacy Score (%)", yaxis:"National or State Average High School Graduation Rate (%)",matrixCode:"FILTER/GROUP",chartType:["bar"],datasetFilter:["Country","Reporting Year"],zaxis:"Yes",groupBy:["Country"],dataSeries:"Reporting Year",notes:"Benchmarksarereferencevalues;usefulmainlytocontextualizeactualoutcomes."},
{xaxis:"National or State Average Literacy Score (%)", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Literacy Score (%)", yaxis:"6-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Literacy Score (%)", yaxis:"12-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Literacy Score (%)", yaxis:"24-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Literacy Score (%)", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Literacy Score (%)", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"National/StateAvgLiteracyScoreoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"National or State Average Literacy Score (%)", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"National/StateAvgLiteracyScoreisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Literacy Score (%)", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"National/StateAvgLiteracyScoreisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Literacy Score (%)", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"National/StateAvgLiteracyScoreisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Literacy Score (%)", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"National/StateAvgLiteracyScoreisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average Literacy Score (%)", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average Literacy Score (%)", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"National/StateAvgLiteracyScoreisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average High School Graduation Rate (%)", yaxis:"Baseline Assessment Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average High School Graduation Rate (%)", yaxis:"6-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average High School Graduation Rate (%)", yaxis:"12-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average High School Graduation Rate (%)", yaxis:"24-Month Update Date",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average High School Graduation Rate (%)", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average High School Graduation Rate (%)", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"National/StateAvgHighSchoolGraduationRateoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"National or State Average High School Graduation Rate (%)", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"National/StateAvgHighSchoolGraduationRateisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average High School Graduation Rate (%)", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"National/StateAvgHighSchoolGraduationRateisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average High School Graduation Rate (%)", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"National/StateAvgHighSchoolGraduationRateisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average High School Graduation Rate (%)", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"National/StateAvgHighSchoolGraduationRateisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"National or State Average High School Graduation Rate (%)", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"National or State Average High School Graduation Rate (%)", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"National/StateAvgHighSchoolGraduationRateisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Baseline Assessment Date", yaxis:"6-Month Update Date",matrixCode:"FILTER/GROUP",chartType:["line","bar"],datasetFilter:["Reporting Year","Book Ecosystem","Country"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Thesearerepeatedtimepoints;donotusefourscorefieldsasfourunrelatedaxes."},
{xaxis:"Baseline Assessment Date", yaxis:"12-Month Update Date",matrixCode:"FILTER/GROUP",chartType:["line","bar"],datasetFilter:["Reporting Year","Book Ecosystem","Country"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Thesearerepeatedtimepoints;donotusefourscorefieldsasfourunrelatedaxes."},
{xaxis:"Baseline Assessment Date", yaxis:"24-Month Update Date",matrixCode:"FILTER/GROUP",chartType:["line","bar"],datasetFilter:["Reporting Year","Book Ecosystem","Country"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Thesearerepeatedtimepoints;donotusefourscorefieldsasfourunrelatedaxes."},
{xaxis:"Baseline Assessment Date", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Baseline Assessment Date", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"baselineAssessmentoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Baseline Assessment Date", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"baselineAssessmentisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Baseline Assessment Date", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"baselineAssessmentisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Baseline Assessment Date", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"baselineAssessmentisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Baseline Assessment Date", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"baselineAssessmentisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Baseline Assessment Date", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Baseline Assessment Date", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"baselineAssessmentisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"6-Month Update Date", yaxis:"12-Month Update Date",matrixCode:"FILTER/GROUP",chartType:["line","bar"],datasetFilter:["Reporting Year","Book Ecosystem","Country"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Thesearerepeatedtimepoints;donotusefourscorefieldsasfourunrelatedaxes."},
{xaxis:"6-Month Update Date", yaxis:"24-Month Update Date",matrixCode:"FILTER/GROUP",chartType:["line","bar"],datasetFilter:["Reporting Year","Book Ecosystem","Country"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Thesearerepeatedtimepoints;donotusefourscorefieldsasfourunrelatedaxes."},
{xaxis:"6-Month Update Date", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"6-Month Update Date", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"sixMonthDateoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"6-Month Update Date", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"sixMonthDateisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"6-Month Update Date", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"sixMonthDateisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"6-Month Update Date", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"sixMonthDateisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"6-Month Update Date", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"sixMonthDateisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"6-Month Update Date", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"6-Month Update Date", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"sixMonthDateisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"12-Month Update Date", yaxis:"24-Month Update Date",matrixCode:"FILTER/GROUP",chartType:["line","bar"],datasetFilter:["Reporting Year","Book Ecosystem","Country"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Thesearerepeatedtimepoints;donotusefourscorefieldsasfourunrelatedaxes."},
{xaxis:"12-Month Update Date", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"12-Month Update Date", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"twelveMonthScoreoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"12-Month Update Date", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"twelveMonthScoreisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"12-Month Update Date", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"twelveMonthScoreisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"12-Month Update Date", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"twelveMonthScoreisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"12-Month Update Date", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"twelveMonthScoreisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"12-Month Update Date", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"12-Month Update Date", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"twelveMonthScoreisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"24-Month Update Date", yaxis:"Funding Amount ($)",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"24-Month Update Date", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"twentyFourMonthDateoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"24-Month Update Date", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"twentyFourMonthDateisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"24-Month Update Date", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"twentyFourMonthDateisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"24-Month Update Date", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"twentyFourMonthDateisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"24-Month Update Date", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"twentyFourMonthDateisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"24-Month Update Date", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"24-Month Update Date", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"twentyFourMonthDateisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Funding Amount ($)", yaxis:"Date Received",matrixCode:"DIRECT+FILTER",chartType:["line","area"],datasetFilter:["Book Ecosystem","Country","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"FundingAmountoverDateReceivedismeaningful.PreferatruedateaxisforStartDate/dateReceived;ReportingYearisdiscrete."},
{xaxis:"Funding Amount ($)", yaxis:"Source of Funding",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"FundingAmountisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Funding Amount ($)", yaxis:"Funding Received From",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"FundingAmountisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Funding Amount ($)", yaxis:"Funds Dispersed To",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"FundingAmountisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Funding Amount ($)", yaxis:"Funds Provided",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"FundingAmountisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Funding Amount ($)", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["scatter","bubble","line"],datasetFilter:["Book Ecosystem","Country","Reporting Year","Source of Funding"],zaxis:"Yes",groupBy:["Book Ecosystem","Country"],dataSeries:"Reporting Year",notes:"Botharequantitative.Avoidlinechartsunlessonevariableistime."},
{xaxis:"Funding Amount ($)", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"FundingAmountisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Sponsor ID", yaxis:"Source of Funding",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"No",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Sponsor ID", yaxis: "Funds Results", matrixCode: "DIRECT", chartType: ["bar","line"], datasetFilter: ["Reporting Year","Country","Book Ecosystem"], zaxis: "Yes", groupBy: ["Sponsor_ID", "fundingType", "communityName", "bookEcosystem"], dataSeries: "FundingType", notes: "Sponsor_ID is a categorical dimension; Funds Results is the measure. Use aggregation (sum/avg/median) appropriate to the metric."},
{xaxis:"Sponsor ID", yaxis:"Funds Dispersed To",matrixCode:"FILTER/GROUP",datasetFilter:["Country","Book Ecosystem","Reporting Year"],zaxis:"No",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"Usefulforwhenprograms/fundingstartedorwerereceived,especiallywithcountsordurations."},
{xaxis:"Sponsor ID", yaxis: "Funds Outcome", matrixCode: "DIRECT", chartType: ["bar","line"], datasetFilter: ["Reporting Year","Country","Book Ecosystem"], zaxis: "Yes", groupBy: ["Sponsor_ID", "fundingType", "communityName", "bookEcosystem"], dataSeries: "FundingType", notes: "Sponsor_ID is a categorical dimension; Funds Outcome is the measure. Use aggregation (sum/avg/median) appropriate to the metric."},
{xaxis:"Sponsor ID", yaxis: "Funds Provided", matrixCode: "DIRECT", chartType: ["bar","line"], datasetFilter: ["Reporting Year","Country","Book Ecosystem"], zaxis: "Yes", groupBy: ["Sponsor_ID", "fundingType", "communityName", "bookEcosystem"], dataSeries: "FundingType", notes: "Sponsor_ID is a categorical dimension; Funds Provided is the measure. Use aggregation (sum/avg/median) appropriate to the metric."},
{xaxis:"Source of Funding", yaxis:"Funding Received From",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Funding Received From",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Source of Funding", yaxis:"Funds Dispersed To",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Funds Dispersed To",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Source of Funding", yaxis:"Funds Provided",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Funds Provided",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Source of Funding", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Reporting Year",notes:"OverheadExpenseAmountisanaturalmeasure;Source of Fundingisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Source of Funding", yaxis:"Overhead Expense Category",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Source of Funding"],dataSeries:"Overhead Expense Category",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Funding Received From", yaxis:"Funds Dispersed To",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Funds Dispersed To",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Funding Received From", yaxis:"Funds Provided",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Funds Provided",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Funding Received From", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Reporting Year",notes:"OverheadExpenseAmountisanaturalmeasure;FundingBodyisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Funding Received From", yaxis:"Overhead Expense Category",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funding Received From"],dataSeries:"Overhead Expense Category",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Funds Dispersed To", yaxis:"Funds Provided",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Funds Provided",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Funds Dispersed To", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"OverheadExpenseAmountisanaturalmeasure;fundsOutcomeisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Funds Dispersed To", yaxis:"Overhead Expense Category",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Overhead Expense Category",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Funds Provided", yaxis:"Overhead Expense Amount",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Reporting Year",notes:"OverheadExpenseAmountisanaturalmeasure;fundsResultsisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
{xaxis:"Funds Provided", yaxis:"Overhead Expense Category",matrixCode:"TABLE/GROUP",chartType:["scatter","bar"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Funds Provided"],dataSeries:"Overhead Expense Category",notes:"Useonecategoricalfieldasrows/Xandtheotherasgrouping/series.Filterhigh-cardinalitydimensions."},
{xaxis:"Overhead Expense Amount", yaxis:"Overhead Expense Category",matrixCode:"DIRECT",chartType:["bar","line"],datasetFilter:["Reporting Year","Country","Book Ecosystem"],zaxis:"Yes",groupBy:["Overhead Expense Category"],dataSeries:"Reporting Year",notes:"OverheadExpenseAmountisanaturalmeasure;OverheadExpenseCategoryisthedimension.Useaggregation(sum/avg/median)appropriatetothemetric."},
]


console.log('start helper function');
export function normalizeLabel(label) {
  if (!label) return '';

  return String(label)
    .trim()
    .replace(/\s+/g, ' ')          
    .replace(/[:;,]+$/g, '')       
    .toLowerCase();               
}



const CONFIG_BY_X = {};    
const CONFIG_BY_PAIR = {};

console.log('start indices');
(function buildIndices() {
  CHART_CONFIG.forEach(row => {
    const nx = normalizeLabel(row.xaxis);
    const ny = normalizeLabel(row.yaxis);
    if (!CONFIG_BY_X[nx]) CONFIG_BY_X[nx] = [];
    CONFIG_BY_X[nx].push(row);
    CONFIG_BY_PAIR[`${nx}||${ny}`] = row;
  });
})();


export function getRowsForX(xLabel) {
  return CONFIG_BY_X[normalizeLabel(xLabel)] || [];
}


export function getConfigForPair(xLabel, yLabel) {
  return CONFIG_BY_PAIR[`${normalizeLabel(xLabel)}||${normalizeLabel(yLabel)}`] || null;
}

console.log('start getValidLabels');
export function getValidYLabels(xLabel) {
  const seen = [];
  getRowsForX(xLabel).forEach(r => { if (!seen.includes(r.yaxis)) seen.push(r.yaxis); });
  return seen;
}


console.log('start getAllowedChartTypes');
export function getAllowedChartTypes(xLabel, yLabel) {
  const row = getConfigForPair(xLabel, yLabel);
  if (!row) return null;
  if (Array.isArray(row.chartType) && row.chartType.length) return row.chartType;
  if (row.matrixCode === 'FILTER/GROUP') return ['table'];
  return ['table'];
}


export function getPrescribedGroupField(xLabel, yLabel) {
  const row = getConfigForPair(xLabel, yLabel);
  if (!row) return null;
  return row.dataSeries || (Array.isArray(row.groupBy) ? row.groupBy[0] : null) || null;
}

console.log('allow ZAxis');
export function allowsZAxis(xLabel, yLabel) {
  const row = getConfigForPair(xLabel, yLabel);
  return !!row && row.zaxis === 'Yes';
}


export function getDatasetFilters(xLabel, yLabel) {
  const row = getConfigForPair(xLabel, yLabel);
  return (row && row.datasetFilter) || [];
}

console.log('get Matrix code');
export function getMatrixCode(xLabel, yLabel) {
  const row = getConfigForPair(xLabel, yLabel);
  return row ? row.matrixCode : null;
}

export function getNotes(xLabel, yLabel) {
  const row = getConfigForPair(xLabel, yLabel);
  return row ? row.notes : '';
}

export const SOURCE_PATHS = {
  data: './data.json',
  investments: './investments.json',
  expenses: './expenses.json',
};