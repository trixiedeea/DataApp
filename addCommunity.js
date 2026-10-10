import { autoPopulateCommunityForm, generateCommunityID, generateLibraryID, generateProgramID, generateLocationID, getDynamicBookEcosystems, incrementSequentialNumber } from './main.js';
import { getCustomAssessmentPoints, getAllAssessmentPoints } from './schema.js';

// Wizard state
let wizardState = {
  step: 0,
  data: {}
};

const WIZARD_STEPS = [
  { id: 'community-info', label: 'Community Info' },
  { id: 'geography', label: 'Geography' },
  { id: 'population', label: 'Population' },
  { id: 'program', label: 'Program' },
  { id: 'library', label: 'Library' },
  { id: 'outcomes', label: 'Outcomes' }
];

// Get all assessment points including custom ones
function getAssessmentPoints() {
  return getAllAssessmentPoints();
}

export function renderAddCommunityTab(){
  console.log("addCommunity.js loaded");
  const esc = window.esc || ((s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'));
  
  if (wizardState.step > 0) {
    return renderWizardStep();
  }
  
  // Use getDynamicBookEcosystems to get ecosystem options
  const ecosystems = getDynamicBookEcosystems();
  console.log('ecosystems from getDynamicBookEcosystems:', ecosystems);
  const ecosystemOptions = ecosystems.map(name =>
    `<option value="${esc(name)}">${esc(name)}</option>`
  ).join('');
  console.log('ecosystemOptions HTML:', ecosystemOptions);

  console.log('starting html for adding community')  
  const html = `<div class="th-cardTop th-card-purple">
  <div class="th-card-green2">
    <p class="th-section-label">Add New Community</p>
    <p class="rt-help">Create a new community and assign it to a book ecosystem.</p>
    
    <div class="th-field">
      <label class="th-flabel">Community ID</label>
      <input class="th-input-auto" id="new-community-id" placeholder="Auto-Generated" readonly>
    </div>
    
    <div class="th-field">
      <label class="th-flabel">Community Name</label>
      <input class="th-input" id="new-community-name" placeholder="e.g., New Reading Community">
    </div>
    
    <div class="th-field">
      <label class="th-flabel">Region</label>
      <input class="th-input" id="new-region" placeholder="e.g., United States">
    </div>
    
    <div class="th-field">
      <label class="th-flabel">Library ID (Auto-generated)</label>
      <input class="th-input-auto" id="new-library-id" placeholder="Auto-Generated" readonly>
    </div>
    
    <div class="th-field">
      <label class="th-flabel">Program ID (Auto-generated)</label>
      <input class="th-input-auto" id="new-program-id" placeholder="Auto-Generated" readonly>
    </div>
    
    <div class="th-field">
      <label class="th-flabel">Tribe/Nation (optional)</label>
      <input class="th-input" id="new-community-tribe" placeholder="e.g., Local Tribe">
    </div>
    
    <div class="th-field">
      <label class="th-flabel">Book Ecosystem</label>
      <select class="th-select" id="new-community-ecosystem">
        <option value="">-- Select Existing Ecosystem --</option>
        ${ecosystemOptions}
        <option value="NEW">-- Create New Ecosystem --</option>
      </select>
    </div>
    
    <div class="th-field" id="new-ecosystem-name-field" style="display:none;">
      <label class="th-flabel">New Ecosystem Name</label>
      <input class="th-input" id="new-ecosystem-name" placeholder="e.g., New Book Ecosystem">
    </div>
    
    <div class="th-row">
      <button class="th-button" data-action="save-and-start-wizard">Create Community</button>
      <button class="th-button th-button-ghost" data-action="cancel-add-community">Cancel</button>
    </div>
  </div>`;
  console.log('html successful for adding community')
  
  
  // Add event listeners for dynamic ID generation and ecosystem selection
  setTimeout(() => {
    const communityNameField = document.getElementById('new-community-name');
    const regionField = document.getElementById('new-region');
    const ecosystemField = document.getElementById('new-community-ecosystem');
    const communityIdField = document.getElementById('new-community-id');
    const libraryIdField = document.getElementById('new-library-id');
    const programIdField = document.getElementById('new-program-id');
    const ecosystemNameField = document.getElementById('new-ecosystem-name-field');
    
    if (communityNameField) {
      communityNameField.addEventListener('input', () => {
        if (communityIdField) communityIdField.value = generateCommunityID(communityNameField.value);
      });
    }
    
    if (regionField) {
      regionField.addEventListener('input', () => {
        if (libraryIdField) libraryIdField.value = generateLibraryID(regionField.value);
      });
    }
    
    if (ecosystemField) {
      ecosystemField.addEventListener('change', () => {
        const nameField = document.getElementById('new-ecosystem-name-field');
        if (ecosystemField.value === 'NEW') {
          nameField.style.display = 'block';
        } else {
          nameField.style.display = 'none';
        }
        if (programIdField) programIdField.value = generateProgramID(ecosystemField.value);
      });
    }
  }, 100);
  
  return html;
}
console.log('start renderwizardstep')
function renderWizardStep() {
  const esc = window.esc || ((s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'));
  const step = WIZARD_STEPS[wizardState.step];
  const isLast = wizardState.step === WIZARD_STEPS.length - 1;
  
  let fieldsHtml = '';
  
  switch(step.id) {
    case 'community-info':
      fieldsHtml = renderCommunityInfoFields(esc);
      break;
    case 'geography':
      fieldsHtml = renderGeographyFields(esc);
      break;
    case 'population':
      fieldsHtml = renderPopulationFields(esc);
      break;
    case 'program':
      fieldsHtml = renderProgramFields(esc);
      break;
    case 'library':
      fieldsHtml = renderLibraryFields(esc);
      break;
    case 'outcomes':
      fieldsHtml = renderOutcomesFields(esc);
      break;
  }
  
  const progressHtml = WIZARD_STEPS.map((s, i) => 
    `<button class="subchipFour${i === wizardState.step ? ' active' : ''}">${s.label}</button>`
  ).join('');
  
  const html = `<div class="th-cardTop th-card-purple">
  <div class="th-card-green2">
    <p class="th-section-label" data-wizard-section="true">Add New Community — Step ${wizardState.step + 1} of ${WIZARD_STEPS.length}</p>
    
    <div class="th-subnav th-subnav-lvl6">
      ${progressHtml}
    </div>
    
    <p class="rt-help">${step.label}</p>
    
    ${fieldsHtml}
    
    <div class="th-row">
      ${wizardState.step > 0 ? '<button class="th-button th-button-ghost" data-action="wizard-back">Back</button>' : ''}
      <button class="th-button" data-action="wizard-save">${isLast ? 'Finish' : 'Save & Continue'}</button>
      <button class="th-button th-button-ghost" data-action="cancel-add-community">Cancel</button>
    </div>
  </div>`;
  
  // Add event listeners after rendering
  setTimeout(() => addWizardEventListeners(), 100);
  
  return html;
}
console.log('start rendercommunityinfofields')
function renderCommunityInfoFields(esc) {
  return `
    <div class="th-field">
      <label class="th-flabel">Community ID</label>
      <input class="th-input-auto" id="wiz-community-id" value="${esc(wizardState.data.communityId || '')}" readonly>
    </div>
    <div class="th-field">
      <label class="th-flabel">Community Name</label>
      <input class="th-input" id="wiz-community-name" value="${esc(wizardState.data.communityName || '')}">
    </div>
    <div class="th-field">
      <label class="th-flabel">Region</label>
      <input class="th-input" id="wiz-region" value="${esc(wizardState.data.region || '')}">
    </div>
    <div class="th-field">
      <label class="th-flabel">Library ID</label>
      <input class="th-input-auto" id="wiz-library-id" value="${esc(wizardState.data.libraryId || '')}" readonly>
    </div>
    <div class="th-field">
      <label class="th-flabel">Program ID</label>
      <input class="th-input-auto" id="wiz-program-id" value="${esc(wizardState.data.programId || '')}" readonly>
    </div>
    <div class="th-field">
      <label class="th-flabel">Tribe/Nation</label>
      <input class="th-input" id="wiz-tribe" value="${esc(wizardState.data.tribeNation || '')}">
    </div>
    <div class="th-field">
      <label class="th-flabel">Book Ecosystem</label>
      <input class="th-input" id="wiz-ecosystem" value="${esc(wizardState.data.bookEcosystem || '')}">
    </div>
  `;
}

function renderGeographyFields(esc) {
  const locationId = wizardState.data.geography?.locationId || '';
  const gisCoordinates = wizardState.data.geography?.gisCoordinates || '';
  
  return `
    <div class="th-field">
      <label class="th-flabel">Location ID (Auto-generated)</label>
      <input class="th-input-auto" id="wiz-location-id" value="${esc(locationId)}" readonly>
    </div>
    <div class="th-field">
      <label class="th-flabel">Community Name</label>
      <input class="th-input" id="wiz-geo-community-name" value="${esc(wizardState.data.geography?.communityName || '')}">
    </div>
    <div class="th-field">
      <label class="th-flabel">Book Ecosystem</label>
      <input class="th-input" id="wiz-geo-ecosystem" value="${esc(wizardState.data.geography?.bookEcosystem || '')}">
    </div>
    <div class="th-field">
      <label class="th-flabel">GIS Coordinates (lat,lon)</label>
      <input class="th-input" id="wiz-gis-coordinates" value="${esc(gisCoordinates)}" placeholder="e.g., 50.67,-120.33">
    </div>
    <div class="th-field">
      <label class="th-flabel">Region</label>
      <input class="th-input" id="wiz-region-geo" value="${esc(wizardState.data.geography?.region || '')}">
    </div>
  `;
}

function renderPopulationFields(esc) {
  return `
    <div class="th-field">
      <label class="th-flabel">Reporting Year</label>
      <input class="th-input" type="date" id="wiz-reporting-year" value="${esc(wizardState.data.population?.reportingYear || '')}">
    </div>
    <div class="th-field">
      <label class="th-flabel">Rural/Urban</label>
      <select class="th-select" id="wiz-rural-urban">
        <option value="">-- Select --</option>
        <option value="Rural" ${wizardState.data.population?.ruralUrban === 'Rural' ? 'selected' : ''}>Rural</option>
        <option value="Urban" ${wizardState.data.population?.ruralUrban === 'Urban' ? 'selected' : ''}>Urban</option>
        <option value="Suburban" ${wizardState.data.population?.ruralUrban === 'Suburban' ? 'selected' : ''}>Suburban</option>
      </select>
    </div>
    <div class="th-field">
      <label class="th-flabel">Population</label>
      <input class="th-input" type="number" id="wiz-population" value="${esc(wizardState.data.population?.population || 0)}">
    </div>
    <div class="th-field">
      <label class="th-flabel">Participants Served</label>
      <input class="th-input" type="number" id="wiz-participants-served" value="${esc(wizardState.data.population?.participantsServed || 0)}">
    </div>
    <div class="th-field">
      <label class="th-flabel">Estimated Monthly Foot Traffic</label>
      <input class="th-input" type="number" id="wiz-foot-traffic" value="${esc(wizardState.data.population?.estimatedFootTraffic || 0)}">
    </div>
  `;
}

function renderProgramFields(esc) {
  return `
    <div class="th-field">
      <label class="th-flabel">Program ID</label>
      <input class="th-input-auto" id="wiz-program-id-prog" value="${esc(wizardState.data.program?.programId || '')}">
    </div>
    <div class="th-field">
      <label class="th-flabel">Steward Name</label>
      <input class="th-input" id="wiz-steward-name" value="${esc(wizardState.data.program?.stewardName || '')}">
    </div>
    <div class="th-field">
      <label class="th-flabel">Start Date</label>
      <input class="th-input" type="date" id="wiz-start-date" value="${esc(wizardState.data.program?.startDate || '')}">
    </div>
    <div class="th-field">
      <label class="th-flabel">Status</label>
      <select class="th-select" id="wiz-status">
        <option value="">-- Select --</option>
        <option value="Planning" ${wizardState.data.program?.status === 'Planning' ? 'selected' : ''}>Planning</option>
        <option value="Active" ${wizardState.data.program?.status === 'Active' ? 'selected' : ''}>Active</option>
        <option value="Paused" ${wizardState.data.program?.status === 'Paused' ? 'selected' : ''}>Paused</option>
        <option value="Completed" ${wizardState.data.program?.status === 'Completed' ? 'selected' : ''}>Completed</option>
      </select>
    </div>
    <div class="th-field">
      <label class="th-flabel">Baseline Date</label>
      <input class="th-input" type="date" id="wiz-baseline-date" value="${esc(wizardState.data.program?.baselineDate || '')}">
    </div>
    <div class="th-field">
      <label class="th-flabel">6-Month Date</label>
      <input class="th-input" type="date" id="wiz-six-month-date" value="${esc(wizardState.data.program?.sixMonthDate || '')}">
    </div>
    <div class="th-field">
      <label class="th-flabel">12-Month Date</label>
      <input class="th-input" type="date" id="wiz-twelve-month-date" value="${esc(wizardState.data.program?.twelveMonthDate || '')}">
    </div>
    <div class="th-field">
      <label class="th-flabel">24-Month Date</label>
      <input class="th-input" type="date" id="wiz-twenty-four-month-date" value="${esc(wizardState.data.program?.twentyFourMonthDate || '')}">
    </div>
  `;
}

function renderLibraryFields(esc) {
  const libraryData = wizardState.data.library || { libraryId: '', publicSchoolLibrary: '', items: [] };
  
  let itemsHtml = getAssessmentPoints().map(point => {
    const item = libraryData.items.find(i => i.assessmentPoint === point) || {};
    return `
      <div class="th-card th-card-yellow" style="margin-bottom: 1rem; padding: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0;">${point}</h4>
        <div class="th-field">
          <label class="th-flabel">Collection Quality</label>
          <select class="th-select" id="wiz-lib-quality-${point}">
            <option value="">-- Select --</option>
            <option value="Poor" ${item.collectionQuality === 'Poor' ? 'selected' : ''}>Poor</option>
            <option value="Fair" ${item.collectionQuality === 'Fair' ? 'selected' : ''}>Fair</option>
            <option value="Good" ${item.collectionQuality === 'Good' ? 'selected' : ''}>Good</option>
            <option value="Excellent" ${item.collectionQuality === 'Excellent' ? 'selected' : ''}>Excellent</option>
          </select>
        </div>
        <div class="th-field">
          <label class="th-flabel">Physical Visits Per Month</label>
          <input class="th-input" type="number" id="wiz-lib-visits-${point}" value="${esc(item.physicalVisitsPerMonth || 0)}">
        </div>
        <div class="th-field">
          <label class="th-flabel">Restock Rate</label>
          <input class="th-input" type="number" id="wiz-lib-restock-${point}" value="${esc(item.restockRate || 0)}">
        </div>
        <div class="th-field">
          <label class="th-flabel">Books Delivered Qty</label>
          <input class="th-input" type="number" id="wiz-lib-books-${point}" value="${esc(item.booksDeliveredQuantity || 0)}">
        </div>
      </div>
    `;
  }).join('');
  
  return `
    <div class="th-field">
      <label class="th-flabel">Library ID</label>
      <input class="th-input-atou" id="wiz-lib-id" value="${esc(libraryData.libraryId || '')}">
    </div>
    <div class="th-field">
      <label class="th-flabel">Public/School Library</label>
      <select class="th-select" id="wiz-lib-type">
        <option value="">-- Select --</option>
        <option value="Public" ${libraryData.publicSchoolLibrary === 'Public' ? 'selected' : ''}>Public</option>
        <option value="School" ${libraryData.publicSchoolLibrary === 'School' ? 'selected' : ''}>School</option>
        <option value="Both" ${libraryData.publicSchoolLibrary === 'Both' ? 'selected' : ''}>Both</option>
      </select>
    </div>
    ${itemsHtml}
  `;
}

function renderOutcomesFields(esc) {
  const outcomesData = wizardState.data.outcomes || { items: [] };
  
  let itemsHtml = getAssessmentPoints().map(point => {
    const item = outcomesData.items.find(i => i.assessmentPoint === point) || {};
    return `
      <div class="th-card th-card-yellow" style="margin-bottom: 1rem; padding: 1rem;">
        <h4 style="margin: 0 0 0.5rem 0;">${point}</h4>
        <div class="th-field">
          <label class="th-flabel">Kindergarten Readiness Score</label>
          <input class="th-input" type="number" id="wiz-out-kindergarten-${point}" value="${esc(item.kindergartenReadinessScore || 0)}">
        </div>
        <div class="th-field">
          <label class="th-flabel">Grade 4 Reading Score</label>
          <input class="th-input" type="number" id="wiz-out-grade4-${point}" value="${esc(item.grade4ReadingScore || 0)}">
        </div>
        <div class="th-field">
          <label class="th-flabel">Grade 8 Reading Score</label>
          <input class="th-input" type="number" id="wiz-out-grade8-${point}" value="${esc(item.grade8ReadingScore || 0)}">
        </div>
        <div class="th-field">
          <label class="th-flabel">Literacy Score</label>
          <input class="th-input" type="number" id="wiz-out-literacy-${point}" value="${esc(item.literacyScore || 0)}">
        </div>
        <div class="th-field">
          <label class="th-flabel">High School Graduation Rate</label>
          <input class="th-input" type="number" id="wiz-out-graduation-${point}" value="${esc(item.highSchoolGraduationRate || 0)}">
        </div>
        <div class="th-field">
          <label class="th-flabel">Assessment Tool</label>
          <select class="th-select" id="wiz-out-tool-${point}">
            <option value="">-- Select --</option>
            <option value="DIBELS" ${item.assessmentTool === 'DIBELS' ? 'selected' : ''}>DIBELS</option>
            <option value="MAP Growth" ${item.assessmentTool === 'MAP Growth' ? 'selected' : ''}>MAP Growth</option>
            <option value="NAEP" ${item.assessmentTool === 'NAEP' ? 'selected' : ''}>NAEP</option>
            <option value="PIRLS" ${item.assessmentTool === 'PIRLS' ? 'selected' : ''}>PIRLS</option>
            <option value="PISA" ${item.assessmentTool === 'PISA' ? 'selected' : ''}>PISA</option>
            <option value="EGRA" ${item.assessmentTool === 'EGRA' ? 'selected' : ''}>EGRA</option>
            <option value="IDELA" ${item.assessmentTool === 'IDELA' ? 'selected' : ''}>IDELA</option>
            <option value="other" ${item.assessmentTool === 'other' ? 'selected' : ''}>Other</option>
          </select>
        </div>
        <div class="th-field">
          <label class="th-flabel">Percentage Benchmark</label>
          <input class="th-input" type="number" id="wiz-out-benchmark-${point}" value="${esc(item.percentageBenchmark || 0)}">
        </div>
      </div>
    `;
  }).join('');
  
  return `
    ${itemsHtml}
  `;
}

function addWizardEventListeners() {
  const communityNameField = document.getElementById('new-community-name');
  const regionField = document.getElementById('new-region');
  const ecosystemField = document.getElementById('new-community-ecosystem');
  const communityIdField = document.getElementById('new-community-id');
  const libraryIdField = document.getElementById('new-library-id');
  const programIdField = document.getElementById('new-program-id');
  const ecosystemNameField = document.getElementById('new-ecosystem-name-field');
  
  // Geography step listeners
  const gisField = document.getElementById('wiz-gis-coordinates');
  const locationIdField = document.getElementById('wiz-location-id');
  
  if (communityNameField) {
    communityNameField.addEventListener('input', () => {
      if (communityIdField) communityIdField.value = generateCommunityID(communityNameField.value);
      if (libraryIdField) libraryIdField.value = generateLibraryID(communityNameField.value);
      if (programIdField) {
        const ecosystem = ecosystemField?.value || '';
        programIdField.value = generateProgramID(ecosystem, communityNameField.value);
      }
    });
  }
  
  if (ecosystemField) {
    ecosystemField.addEventListener('change', () => {
      if (ecosystemField.value === 'NEW') {
        ecosystemNameField.style.display = 'block';
      } else {
        ecosystemNameField.style.display = 'none';
      }
      if (programIdField) {
        const communityName = communityNameField?.value || '';
        programIdField.value = generateProgramID(ecosystemField.value, communityName);
      }
    });
  }
  
  if (gisField && locationIdField) {
    gisField.addEventListener('input', () => {
      const coords = gisField.value.split(',');
      const lat = coords[0]?.trim() || '';
      const lon = coords[1]?.trim() || '';
      const communityId = communityIdField?.value || '';
      locationIdField.value = generateLocationID(communityId, lat, lon);
    });
  }
}

export function saveWizardStep(step, data) {
  wizardState.data = { ...wizardState.data, ...data };
  return wizardState.data;
}

export function wizardNext() {
  if (wizardState.step < WIZARD_STEPS.length - 1) {
    wizardState.step++;
  }
}

export function wizardBack() {
  if (wizardState.step > 0) {
    wizardState.step--;
  }
}

export function resetWizard() {
  wizardState = {
    step: 0,
    data: {}
  };
}

export function getWizardData() {
  return wizardState.data;
}

// Event handlers for wizard actions
export function handleSaveAndStartWizard() {
  const communityId = document.getElementById('new-community-id').value.trim();
  const communityName = document.getElementById('new-community-name').value.trim();
  const region = document.getElementById('new-region').value.trim();
  const libraryId = document.getElementById('new-library-id').value.trim();
  const programId = document.getElementById('new-program-id').value.trim();
  const tribeNation = document.getElementById('new-community-tribe').value.trim();
  const ecosystemSelect = document.getElementById('new-community-ecosystem');
  const ecosystemValue = ecosystemSelect.value;
  let bookEcosystems = '';

  if(ecosystemValue === 'NEW'){
    const newEcosystemName = document.getElementById('new-ecosystem-name').value.trim();
    if(!newEcosystemName){
      window.toast = { type: 'error', text: 'Please enter a name for the new ecosystem.' };
      return;
    }
    bookEcosystems = newEcosystemName;
  } else if(ecosystemValue){
    bookEcosystems = ecosystemValue;
  } else {
    window.toast = { type: 'error', text: 'Please select a book ecosystem.' };
    return;
  }

  if(!communityId || !communityName){
    window.toast = { type: 'error', text: 'Please enter Community ID and Community Name.' };
    return;
  }

  saveWizardStep(0, {
    communityId,
    communityName,
    region,
    libraryId,
    programId,
    tribeNation,
    bookEcosystems,
    geography: { locationId: '', communityName, bookEcosystem: bookEcosystems, gisCoordinates: '', region },
    population: { reportingYear: '', ruralUrban: '', population: 0, participantsServed: 0, estimatedFootTraffic: 0 },
    program: { programId, stewardName: '', startDate: '', status: '', baselineDate: '', sixMonthDate: '', twelveMonthDate: '', twentyFourMonthDate: '' },
    library: { libraryId, publicSchoolLibrary: '', items: [] },
    outcomes: { items: [] }
  });
  wizardNext();
  // Trigger re-render via event
  window.dispatchEvent(new CustomEvent('re-render-add-community'));
}

export function handleStartCommunityWizard() {
  const communityId = document.getElementById('new-community-id').value.trim();
  const communityName = document.getElementById('new-community-name').value.trim();
  const region = document.getElementById('new-region').value.trim();
  const libraryId = document.getElementById('new-library-id').value.trim();
  const programId = document.getElementById('new-program-id').value.trim();
  const tribeNation = document.getElementById('new-community-tribe').value.trim();
  const ecosystemSelect = document.getElementById('new-community-ecosystem');
  const ecosystemValue = ecosystemSelect.value;
  let bookEcosystems = '';

  if(ecosystemValue === 'NEW'){
    const newEcosystemName = document.getElementById('new-ecosystem-name').value.trim();
    if(!newEcosystemName){
      window.toast = { type: 'error', text: 'Please enter a name for the new ecosystem.' };
      return;
    }
    bookEcosystems = newEcosystemName;
  } else if(ecosystemValue){
    bookEcosystems = ecosystemValue;
  } else {
    window.toast = { type: 'error', text: 'Please select a book ecosystem.' };
    return;
  }

  if(!communityId || !communityName){
    window.toast = { type: 'error', text: 'Please enter Community ID and Community Name.' };
    return;
  }

  saveWizardStep(0, {
    communityId,
    communityName,
    region,
    libraryId,
    programId,
    tribeNation,
    bookEcosystems,
    geography: { locationId: '', communityName, bookEcosystem: bookEcosystems, gisCoordinates: '', region },
    population: { reportingYear: '', ruralUrban: '', population: 0, participantsServed: 0, estimatedFootTraffic: 0 },
    program: { programId, stewardName: '', startDate: '', status: '', baselineDate: '', sixMonthDate: '', twelveMonthDate: '', twentyFourMonthDate: '' },
    library: { libraryId, publicSchoolLibrary: '', items: [] },
    outcomes: { items: [] }
  });
  wizardNext();
  // Trigger re-render via event
  window.dispatchEvent(new CustomEvent('re-render-add-community'));
}

export function handleWizardSave() {
  const sectionLabel = document.querySelector('[data-wizard-section="true"]')?.textContent;
  const step = sectionLabel?.match(/Step (\d+)/)?.[1] || '1';
  const stepNum = parseInt(step) - 1;

  const data = getWizardData();

  if(stepNum === 0) { // Community Info
    data.communityId = document.getElementById('wiz-community-id')?.value || data.communityId;
    data.communityName = document.getElementById('wiz-community-name')?.value || data.communityName;
    data.region = document.getElementById('wiz-region')?.value || data.region;
    data.libraryId = document.getElementById('wiz-library-id')?.value || data.libraryId;
    data.programId = document.getElementById('wiz-program-id')?.value || data.programId;
    data.tribeNation = document.getElementById('wiz-tribe')?.value || data.tribeNation;
    data.bookEcosystems = document.getElementById('wiz-ecosystem')?.value || data.bookEcosystems;
    window.toast = { type: 'success', text: 'Community Info saved successfully!' };
  } else if(stepNum === 1) { // Geography
    data.geography = data.geography || {};
    data.geography.locationId = document.getElementById('wiz-location-id')?.value || '';
    data.geography.communityName = document.getElementById('wiz-geo-community-name')?.value || data.communityName;
    data.geography.bookEcosystem = document.getElementById('wiz-geo-ecosystem')?.value || data.bookEcosystems;
    data.geography.gisCoordinates = document.getElementById('wiz-gis-coordinates')?.value || '';
    data.geography.region = document.getElementById('wiz-region-geo')?.value || data.region;
    window.toast = { type: 'success', text: 'Geography saved successfully!' };
  } else if(stepNum === 2) { // Population
    data.population = data.population || {};
    data.population.reportingYear = document.getElementById('wiz-reporting-year')?.value || '';
    data.population.ruralUrban = document.getElementById('wiz-rural-urban')?.value || '';
    data.population.population = parseInt(document.getElementById('wiz-population')?.value) || 0;
    data.population.participantsServed = parseInt(document.getElementById('wiz-participants-served')?.value) || 0;
    data.population.estimatedFootTraffic = parseInt(document.getElementById('wiz-foot-traffic')?.value) || 0;
    window.toast = { type: 'success', text: 'Population data saved successfully!' };
  } else if(stepNum === 3) { // Program
    data.program = data.program || {};
    data.program.programId = document.getElementById('wiz-program-id-prog')?.value || data.programId;
    data.program.stewardName = document.getElementById('wiz-steward-name')?.value || '';
    data.program.startDate = document.getElementById('wiz-start-date')?.value || '';
    data.program.status = document.getElementById('wiz-status')?.value || '';
    data.program.baselineDate = document.getElementById('wiz-baseline-date')?.value || '';
    data.program.sixMonthDate = document.getElementById('wiz-six-month-date')?.value || '';
    data.program.twelveMonthDate = document.getElementById('wiz-twelve-month-date')?.value || '';
    data.program.twentyFourMonthDate = document.getElementById('wiz-twenty-four-month-date')?.value || '';
    window.toast = { type: 'success', text: 'Program details saved successfully!' };
  } else if(stepNum === 4) { // Library
    data.library = data.library || {};
    data.library.libraryId = document.getElementById('wiz-lib-id')?.value || data.libraryId;
    data.library.publicSchoolLibrary = document.getElementById('wiz-lib-type')?.value || '';
    data.library.items = [];
    ['Baseline', '6 Months', '12 Months', '24 Months'].forEach(point => {
      const quality = document.getElementById(`wiz-lib-quality-${point}`)?.value || '';
      const visits = parseInt(document.getElementById(`wiz-lib-visits-${point}`)?.value) || 0;
      const restock = parseFloat(document.getElementById(`wiz-lib-restock-${point}`)?.value) || 0;
      const books = parseInt(document.getElementById(`wiz-lib-books-${point}`)?.value) || 0;
      if(quality || visits || restock || books) {
        data.library.items.push({ assessmentPoint: point, collectionQuality: quality, physicalVisitsPerMonth: visits, restockRate: restock, booksDeliveredQuantity: books });
      }
    });
    window.toast = { type: 'success', text: 'Library data saved successfully!' };
  } else if(stepNum === 5) { // Outcomes
    data.outcomes = data.outcomes || {};
    data.outcomes.items = [];
    ['Baseline', '6 Months', '12 Months', '24 Months'].forEach(point => {
      const kindergarten = parseFloat(document.getElementById(`wiz-out-kindergarten-${point}`)?.value) || 0;
      const grade4 = parseFloat(document.getElementById(`wiz-out-grade4-${point}`)?.value) || 0;
      const grade8 = parseFloat(document.getElementById(`wiz-out-grade8-${point}`)?.value) || 0;
      const literacy = parseFloat(document.getElementById(`wiz-out-literacy-${point}`)?.value) || 0;
      const graduation = parseFloat(document.getElementById(`wiz-out-graduation-${point}`)?.value) || 0;
      const tool = document.getElementById(`wiz-out-tool-${point}`)?.value || '';
      const benchmark = parseFloat(document.getElementById(`wiz-out-benchmark-${point}`)?.value) || 0;
      if(kindergarten || grade4 || grade8 || literacy || graduation || tool || benchmark) {
        data.outcomes.items.push({
          assessmentPoint: point,
          kindergartenReadinessScore: kindergarten,
          grade4ReadingScore: grade4,
          grade8ReadingScore: grade8,
          literacyScore: literacy,
          highSchoolGraduationRate: graduation,
          assessmentTool: tool,
          percentageBenchmark: benchmark
        });
      }
    });
    window.toast = { type: 'success', text: 'Outcomes data saved successfully!' };
  }
  
  saveWizardStep(stepNum, data);
  
  if(stepNum === 5) {
    // This needs to be handled by the main app to access communities and saveAll
    return { finished: true, data };
  } else {
    wizardNext();
    window.renderAddCommunityTab();
    return { finished: false };
  }
}

export function handleWizardBack() {
  wizardBack();
  window.renderAddCommunityTab();
}

export function handleCancelAddCommunity() {
  resetWizard();
  if (window.switchTab) {
    window.switchTab('bookEcosystems');
  }
}

// Setup event listeners for wizard actions
export function setupWizardEventHandlers() {
  document.addEventListener('click', function(e) {
    const actionEl = e.target.closest('[data-action]');
    if (!actionEl) return;
    
    const action = actionEl.dataset.action;
    
    if (action === 'save-and-start-wizard') {
      handleSaveAndStartWizard();
    } else if (action === 'start-community-wizard') {
      handleStartCommunityWizard();
    } else if (action === 'wizard-save') {
      const result = handleWizardSave();
      if (result.finished) {
        // Signal to main app to handle completion
        window.dispatchEvent(new CustomEvent('wizard-finished', { detail: result.data }));
      }
    } else if (action === 'wizard-back') {
      handleWizardBack();
    } else if (action === 'cancel-add-community') {
      handleCancelAddCommunity();
    }
  });
}


