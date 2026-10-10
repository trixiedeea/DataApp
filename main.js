// ================================================================
// Dynamic Field Population and ID Generation Functions
// ================================================================

import { MAIN_TABS, SUB_ENTITY_TABS, FUNDING_TABS, CHART_CATEGORIES } from './schema.js';
console.log('starting main.js')


// ================================================================
// Dynamic Book Ecosystems Population
// ================================================================

export function getDynamicBookEcosystems() {
  const ecosystems = new Set();
  
  // Try to access communities from window scope (set by index.html)
  let communitiesData = null;
  if (typeof window !== 'undefined' && window.communities) {
    communitiesData = window.communities;
  } else if (typeof communities !== 'undefined') {
    communitiesData = communities;
  }
  
  console.log('getDynamicBookEcosystems - communitiesData:', communitiesData);
  
  // Extract unique book ecosystems from communities
  if (communitiesData) {
    const communitiesArray = Array.isArray(communitiesData) ? communitiesData : Object.values(communitiesData);
    console.log('getDynamicBookEcosystems - communitiesArray:', communitiesArray);
    communitiesArray.forEach(community => {
      if (community.geography && community.geography.bookEcosystem) {
        ecosystems.add(community.geography.bookEcosystem);
      }
    });
  }
  
  const result = Array.from(ecosystems).sort();
  console.log('getDynamicBookEcosystems - result:', result);
  return result;
}

export function populateBookEcosystemField(selectElement) {
  const ecosystems = getDynamicBookEcosystems();
  
  // Clear existing options
  selectElement.innerHTML = '';
  
  // Add placeholder and dynamic options
  const placeholder = document.createElement('option');
  placeholder.value = '';
  placeholder.textContent = '-- Select Book Ecosystem --';
  selectElement.appendChild(placeholder);
  
  ecosystems.forEach(ecosystem => {
    const option = document.createElement('option');
    option.value = ecosystem;
    option.textContent = ecosystem;
    selectElement.appendChild(option);
  });
  
  // Add "Create New Ecosystem" option
  const newOption = document.createElement('option');
  newOption.value = 'NEW';
  newOption.textContent = '-- Create New Ecosystem --';
  selectElement.appendChild(newOption);
}

// ================================================================
// Dynamic Funding IDs Population
// ================================================================

export function getDynamicFundingIDs() {
  const fundingIDs = new Set();

  let investmentsArray = [];
  if (typeof window !== 'undefined' && window.investments) {
    investmentsArray = window.investments;
  } else if (typeof investments !== 'undefined' && Array.isArray(investments)) {
    investmentsArray = investments;
  }
  
  // Extract unique investment IDs from investments
  if (Array.isArray(investmentsArray)) {
    investmentsArray.forEach(investment => {
      if (investment.investmentId) {
        fundingIDs.add(investment.investmentId);
      }
    });
  }
  
  // Convert to array and sort
  return Array.from(fundingIDs).sort();
}

export function populateFundingIDField(selectElement) {
  const fundingIDs = getDynamicFundingIDs();
  
  // Clear existing options except placeholder
  selectElement.innerHTML = '<option value="">-- Select Funding Source --</option>';
  
  // Add dynamic options
  fundingIDs.forEach(id => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = id;
    selectElement.appendChild(option);
  });
}

// ================================================================
// App Data Update for dynamic field population
// ================================================================

export function updateAppData(data) {
  if (typeof window !== 'undefined') {
    window.communities = data.communities || {};
    window.investments = data.investments || [];
    window.expenses = data.expenses || [];
  }
}

// ================================================================
// Dynamic Sponsor IDs Population
// ================================================================

export function getDynamicSponsorIDs() {
  const sponsorIDs = new Set();
  

  let investmentsArray = [];
  if (typeof window !== 'undefined' && window.investments) {
    investmentsArray = window.investments;
  } else if (typeof investments !== 'undefined' && Array.isArray(investments)) {
    investmentsArray = investments;
  }
  
  // Extract unique sponsor IDs from investments
  if (Array.isArray(investmentsArray)) {
    investmentsArray.forEach(investment => {
      if (investment.sponsorId) {
        sponsorIDs.add(investment.sponsorId);
      }
    });
  }
  
  // Convert to array and sort
  return Array.from(sponsorIDs).sort();
}

export function populateSponsorIDField(selectElement) {
  const sponsorIDs = getDynamicSponsorIDs();
  

  selectElement.innerHTML = '<option value="">-- Select Sponsor --</option>';
  
  // Add dynamic options
  sponsorIDs.forEach(id => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = id;
    selectElement.appendChild(option);
  });
}

// ================================================================
// Auto-ID Generation Functions
// ================================================================

// Get current month and year in MMYY format
function getCurrentMonthYear() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2);
  return month + year;
}

// Global sequential counter for IDs (shared across all communities)
let globalSequentialNumber = 1;

function getNextSequentialNumber() {
  return globalSequentialNumber.toString().padStart(2, '0');
}

export function incrementSequentialNumber() {
  globalSequentialNumber++;
}

export function generateCommunityID(communityName = '') {
  const prefix = communityName 
    ? communityName.substring(0, 5).toUpperCase().replace(/[^A-Z]/g, '')
    : 'COMM';
  const sequentialNum = getNextSequentialNumber();
  const monthYear = getCurrentMonthYear();
  return `${prefix}${monthYear}${sequentialNum}`;
}

export function generateLibraryID(communityName = '') {
  const prefix = communityName 
    ? communityName.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, '')
    : 'COM';
  const sequentialNum = getNextSequentialNumber();
  const monthYear = getCurrentMonthYear();
  return `LIB${prefix}${monthYear}${sequentialNum}`;
}

export function generateProgramID(bookEcosystem = '', communityName = '') {
  const ecoPrefix = bookEcosystem 
    ? bookEcosystem.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, '')
    : 'ECO';
  const commPrefix = communityName 
    ? communityName.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, '')
    : 'SYS';
  const sequentialNum = getNextSequentialNumber();
  const monthYear = getCurrentMonthYear();
  return `${ecoPrefix}${commPrefix}${monthYear}${sequentialNum}`;
}

export function generateLocationID(communityID = '', gisCoordinates = '') {
  const commPrefix = communityID 
    ? communityID.substring(0, 3).toUpperCase()
    : 'LOC';
  const gis = gisCoordinates 
    ? gisCoordinates.substring(0, 3).replace(/[^0-9]/g, '')
    : '000';
  const sequentialNum = getNextSequentialNumber();
  const monthYear = getCurrentMonthYear();
  return `${commPrefix}${gis}${monthYear}${sequentialNum}`;
}

export function generateExpenseID(expenseDescription) {
  const expenseCode = (expenseDescription || '')
    .replace(/[^a-zA-Z]/g, '')  
    .substring(0, 3)
    .toUpperCase()          
  const monthYear = getCurrentMonthYear();
  const sequentialNum = getNextSequentialNumber();
  return `EXP-${expenseCode}${monthYear}${sequentialNum}`;
}

export function generateSponsorID(fundingBody) {
  const namePart = (fundingBody || '')
    .replace(/[^a-zA-Z]/g, '')   
    .substring(0, 5)
    .toUpperCase()
    .padEnd(5, 'ABC');             
  const monthYear = getCurrentMonthYear();
  return `SP${namePart}${monthYear}${sequentialNum}`;
}


export function generateInvestmentID(fundingSourceType) {
  const source = (fundingSourceType || '')
    .replace(/[^a-zA-Z]/g, '')  
    .substring(0, 3)
    .toUpperCase()             
  const monthYear = getCurrentMonthYear();
  const sequentialNum = getNextSequentialNumber();
  return `INV-${source}${monthYear}${sequentialNum}`;
}

// ================================================================
// Auto-Populate Functions for Add Forms
// ================================================================

export function autoPopulateCommunityForm() {
  // Generate and populate IDs
  const communityIdField = document.getElementById('new-community-id');
  const libraryIdField = document.getElementById('new-library-id');
  const programIdField = document.getElementById('new-program-id');
  
  // Community ID - generated from community name
  if (communityIdField && !communityIdField.value) {
    const communityName = document.getElementById('new-community-name')?.value || '';
    communityIdField.value = generateCommunityID(communityName);
  }
  
  // Library ID - generated from community name
  if (libraryIdField && !libraryIdField.value) {
    const communityName = document.getElementById('new-community-name')?.value || '';
    libraryIdField.value = generateLibraryID(communityName);
  }
  
  // Program ID - generated from book ecosystem and community name
  if (programIdField && !programIdField.value) {
    const bookEcosystem = document.getElementById('new-community-ecosystem')?.value || '';
    const communityName = document.getElementById('new-community-name')?.value || '';
    programIdField.value = generateProgramID(bookEcosystem, communityName);
  }
  
  // Populate book ecosystems dropdown
  const ecosystemSelect = document.getElementById('new-community-ecosystem');
  if (ecosystemSelect) {
    populateBookEcosystemField(ecosystemSelect);
  }
}

export function autoPopulateInvestmentForm() {
  // Generate and populate investment ID
  const investmentIdField = document.getElementById('new-investment-id');
  if (investmentIdField && !investmentIdField.value) {
    investmentIdField.value = generateInvestmentID();
  }
  
  // Generate and populate sponsor ID
  const sponsorIdField = document.getElementById('new-sponsor-id');
  if (sponsorIdField && !sponsorIdField.value) {
    sponsorIdField.value = generateSponsorID();
  }
  
  // Populate funding source dropdown
  const fundingSelect = document.getElementById('th-expense-investment') || document.getElementById('investment-funding-source');
  if (fundingSelect) {
    populateFundingIDField(fundingSelect);
  }
}

export function autoPopulateExpenseForm() {
  // Generate and populate expense ID
  const expenseIdField = document.getElementById('new-expense-id');
  if (expenseIdField && !expenseIdField.value) {
    expenseIdField.value = generateExpenseID();
  }
  
  // Populate funding source dropdown
  const fundingSelect = document.getElementById('th-expense-investment');
  if (fundingSelect) {
    populateFundingIDField(fundingSelect);
  }
}

