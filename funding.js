// ================================================================
// FUNDING TAB MODULE
// ================================================================

import { SUB_ENTITY_FIELDS } from './schema.js';

// Helper function to get current month/year in MMYY format
function getCurrentMonthYear() {
  const now = new Date();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const year = String(now.getFullYear()).slice(-2);
  return month + year;
}

// Helper function to get first 4 letters from a string (uppercase, no spaces/special chars)
function getPrefixFromName(name) {
  if (!name) return 'XXXX';
  const cleaned = name.toUpperCase().replace(/[^A-Z]/g, '');
  return cleaned.substring(0, 4).padEnd(4, 'X');
}

// Helper function to get next sequential number from localStorage
function getNextSequentialNumber(key) {
  try {
    const current = parseInt(localStorage.getItem(key) || '0');
    const next = current + 1;
    localStorage.setItem(key, String(next));
    return next;
  } catch (e) {
    console.error('Error accessing localStorage for sequential number:', e);
    return 1;
  }
}
export function updateIdPrefix(existingId, name) {
  if (!existingId) return existingId;
  const dashIndex = existingId.indexOf('-');
  if (dashIndex === -1) return existingId;
  const suffix = existingId.slice(dashIndex + 1);
  return `${getPrefixFromName(name)}-${suffix}`;
}

// Generate Investment ID: PREFIX-MMYY-NNN
export function generateInvestmentId(fundsResults) {
  const prefix = getPrefixFromName(fundsResults);
  const monthYear = getCurrentMonthYear();
  const sequence = getNextSequentialNumber('investmentSequence');
  const sequenceStr = String(sequence).padStart(3, '0');
  return `${prefix}-${monthYear}${sequenceStr}`;
}

// Generate Sponsor ID: PREFIX-MMYY-NNN
export function generateSponsorId(fundingBody) {
  const prefix = getPrefixFromName(fundingBody);
  const monthYear = getCurrentMonthYear();
  const sequence = getNextSequentialNumber('sponsorSequence');
  const sequenceStr = String(sequence).padStart(3, '0');
  return `${prefix}-${monthYear}${sequenceStr}`;
}

// Generate Expense ID: PREFIX-MMYY-NNN
export function generateExpenseId(expenseDescription) {
  const prefix = getPrefixFromName(expenseDescription);
  const monthYear = getCurrentMonthYear();
  const sequence = getNextSequentialNumber('expenseSequence');
  const sequenceStr = String(sequence).padStart(3, '0');
  return `${prefix}-${monthYear}${sequenceStr}`;
}

export function initFundingTab(helpers) {
  const { esc, fieldLabel, isReq, renderEditField, renderDisplayValue, findCommunity } = helpers;

  function renderFundingTab(state){
    const { activeFundingTab } = state;
    if(activeFundingTab === 'investments') return renderFundingReceivedTab(state);
    if(activeFundingTab === 'expenses') return renderExpensesTab(state);
    if(activeFundingTab === 'programCosts') return renderProgramCostsTab(state);
    return renderFundingReceivedTab(state);
  }

  function renderFundingReceivedTab(state){
    const { toast, communities, isAddingInvestment, editingInvestment, investmentDraft, investments, expenses } = state;
    const msgHtml = toast ? `<div class="th-msg th-msg-${toast.type}">${esc(toast.text)}</div>` : '';
    const fields = SUB_ENTITY_FIELDS.investments;

  function investmentFieldRows(draft){
    return Object.keys(fields).filter(key => {
      if (key === 'investmentId' || key === 'sponsor_ID') return false;

      if (key === 'expenseId' && draft.partnerCommunity !== 'INTERNAL EXPENSE') return false;
      if (key === 'fundingSourceOther' && draft.fundingSourceType !== 'Other') return false;
      return true;
  }).map(key => {
        const fieldDef = key === 'partnerCommunity'
          ? { ...fields[key], enum: ['NONE/FUNDS NOT DISPERSED', 'INTERNAL EXPENSE', ...Object.values(communities).map(c => c.communityName || c.communityId).filter(Boolean)] }
          : key === 'expenseId'
          ? { ...fields[key], enum: ['---Select Expense Id---', ...expenses.map(e => e.expenseId).filter(Boolean)] }
          : fields[key];

        return `<div class="th-field">
          <label class="th-flabel">${esc(fieldLabel(fieldDef, key))} ${isReq(fieldDef)?'<span class="th-req">*</span>':''}</label>
          ${renderEditField(fieldDef, key, draft[key], 'edit-investment-field')}
        </div>`;
      }).join('');
    }

    if(editingInvestment){
      return `<div class="th-card-blue">
        <p class="th-section-label">Edit Investment — ${esc(editingInvestment.investmentId || '')}</p>
        ${investmentFieldRows(investmentDraft)}
        <div class="th-row">
          <button class="th-button" data-action="save-investment">Save</button>
          <button class="th-button th-button-ghost" data-action="cancel-investment">Cancel</button>
        </div>
      </div>`;
    }

    if(isAddingInvestment){

      return `<div class="th-card-blue">
        <p class="th-section-label">Add Investment</p>
        <div class="th-field">
          <label class="th-flabel">Investment ID <span class="th-req">*</span></label>
          <input class="th-input" id="new-investment-id" value="${esc(investmentDraft.investmentId || '')}" readonly>
        </div>
        <div class="th-field">
          <label class="th-flabel">Sponsor ID</label>
          <input class="th-input" id="new-sponsor-id" value="${esc(investmentDraft.sponsorId || '')}" readonly>
        </div>
        ${investmentFieldRows(investmentDraft)}
        <div class="th-row">
          <button class="th-button" data-action="save-new-investment">Save</button>
          <button class="th-button th-button-ghost" data-action="cancel-investment">Cancel</button>
        </div>
      </div>`;
    }

    const rows = investments.map((record, idx) => ({ record, idx }));
    rows.sort((a, b) => String(a.record.investmentId||'').localeCompare(String(b.record.investmentId||'')));

    const listHtml = rows.length ? `<div class="th-card-grid">${rows.map(({record, idx}) => {
      const fieldRows = Object.keys(fields)
        .filter(key => key !== 'fundingSourceOther' || record.fundingSourceType === 'Other')
        .filter(key => key !== 'expenseId' || record.partnerCommunity === 'INTERNAL EXPENSE')
        .map(key => {
          const fieldDef = fields[key];
          return `<div class="th-field">
            <label class="th-flabel">${esc(fieldLabel(fieldDef, key))}</label>
            ${renderDisplayValue(fieldDef, record[key])}
          </div>`;
        }).join('');
      return `<div class="th-card-green2">
        <p class="th-section-label">${esc(record.investmentId || 'Funding Record')}</p>
        ${fieldRows}
        <div class="th-row">
          <button class="th-button th-button-small" data-action="edit-investment" data-index="${idx}">Edit</button>
          <button class="th-button th-button-small th-button-ghost" data-action="delete-investment" data-index="${idx}">Delete</button>
        </div>
      </div>`;
    }).join('')}</div>` : `<div class="th-empty">No funding records yet.</div>`;


      return `<div class="th-cardTopTwo">
        <p class="th-section-label">Funding Received</p>
        ${msgHtml}
        ${listHtml}
        <div class="th-row"><button class="th-button-invest" data-action="start-add-investment">+ Add Investment</button></div>
      </div>`;
  }

  function renderExpensesTab(state){
    // INNER HTML: <div class="th-cardTop th-card-pink">...expenses list and add/edit form...</div>
    const { toast, communities, isAddingExpense, editingExpense, expenseDraft, investments, expenses } = state;
    const msgHtml = toast ? `<div class="th-msg th-msg-${toast.type}">${esc(toast.text)}</div>` : '';
    const fields = SUB_ENTITY_FIELDS.expenses;

    function investmentOptionsHtml(selectedInvestmentId){
      const opts = investments.map(inv => {
        const label = `${inv.investmentId || 'Investment'}`;
        return `<option value="${esc(inv.investmentId)}" ${inv.investmentId===selectedInvestmentId?'selected':''}>${esc(label)}</option>`;
      }).join('');
      const placeholder = `<option value="">— Select an investment —</option>`;
      const empty = investments.length ? '' : `<option value="" disabled>No investments yet — add one in the Investments tab</option>`;
      return placeholder + opts + empty;
    }

    function expenseFieldRows(draft){
      return Object.keys(fields).filter(key => {
        if (key === 'expenseId' || key === 'expensePaymentSource') return false;
        return true;
      }).map(key => {
        const fieldDef = fields[key];
        return `<div class="th-field">
          <label class="th-flabel">${esc(fieldLabel(fieldDef, key))}</label>
          ${renderEditField(fieldDef, key, draft[key], 'edit-expense-field')}
        </div>`;
      }).join('');
    }

    if(isAddingExpense){
      // INNER HTML: <div class="th-card th-card-red">...add expense form...</div>
      const investmentOptions = investmentOptionsHtml(expenseDraft.expensePaymentSource);
      return `<div class="th-card-red">
        <p class="th-section-label">Add Expense</p>
        <div class="th-field">
          <label class="th-flabel">Expense ID <span class="th-req">*</span></label>
          <input class="th-input" id="new-expense-id" value="${esc(expenseDraft.expenseId || '')}" readonly>
        </div>
        <div class="th-field">
          <label class="th-flabel">Payment Source <span class="th-req">*</span></label>
          <select class="th-select" id="th-expense-investment" data-role="edit-expense-field" data-field="expensePaymentSource">${investmentOptions}</select>
        </div>
        ${expenseFieldRows(expenseDraft)}
        <div class="th-row">
          <button class="th-button" data-action="save-new-expense">Save</button>
          <button class="th-button th-button-ghost" data-action="cancel-expense">Cancel</button>
        </div>
      </div>`;
    }

    if(editingExpense){

      const investmentOptions = investmentOptionsHtml(expenseDraft.expensePaymentSource);
      return `<div class="th-card-red">
        <p class="th-section-label">Edit Expense</p>
        <div class="th-field">
          <label class="th-flabel">Payment Source <span class="th-req">*</span></label>
          <select class="th-select" id="th-expense-investment" data-role="edit-expense-field" data-field="expensePaymentSource">${investmentOptions}</select>
        </div>
        ${expenseFieldRows(expenseDraft)}
        <div class="th-row">
          <button class="th-button" data-action="save-expense">Save</button>
          <button class="th-button th-button-ghost" data-action="cancel-expense">Cancel</button>
        </div>
      </div>`;
    }

    const rows = expenses.map((record, idx) => ({ record, idx }));
    rows.sort((a, b) => String(a.record.expenseId||'').localeCompare(String(b.record.expenseId||'')));

    const listHtml = rows.length ? `<div class="th-card-grid">${rows.map(({record, idx}) => {
      const fieldRows = Object.keys(fields).map(key => {
        const fieldDef = fields[key];
        return `<div class="th-field">
          <label class="th-flabel">${esc(fieldLabel(fieldDef, key))}</label>
          ${renderDisplayValue(fieldDef, record[key])}
        </div>`;
      }).join('');
      return `<div class="th-card-green2">
        <p class="th-section-label">${esc(record.expenseId || 'Expense Record')}</p>
        ${fieldRows}
        <div class="th-row">
          <button class="th-button th-button-small" data-action="edit-expense" data-index="${idx}">Edit</button>
          <button class="th-button th-button-small th-button-ghost" data-action="delete-expense" data-index="${idx}">Delete</button>
        </div>
      </div>`;
    }).join('')}</div>` : `<div class="th-empty">No expense records yet.</div>`;

    return `<div class="th-cardTopTwo">
      <p class="th-section-label">Expenses</p>
      ${msgHtml}
      ${listHtml}
      <div class="th-row"><button class="th-button" data-action="start-add-expense">+ Add Expense</button></div>
    </div>`;
  }

  function renderProgramCostsTab(state){

    const { programCostInputs } = state;

    return `
 <div class="th-cardTopThree">
    <h1>Program Investment Calculator</h1>
    <div class="th-card-cyan">
        <div class="slider-label">Total Annual Investment</div>
        <div class="slider-value" id="sliderValueDisplay">$3,200</div>
        <div class="slider-row">
            <span class="edge-label">$0</span>
            <input type="range" id="investmentSlider" min="0" max="50000" step="50" value="3200">
            <span class="edge-label">$50,000</span>
        </div>
        <div class="gridContainer">
            <!-- Row 1 -->
            <div class="grid-span-all">
                <div class="impact-main">
                    <p class="headline" id="headline">
                        This buys
                        <span class="gold-num" id="booksHeadline">10.0</span>
                        books per year for
                        <span id="enrolledHeadline">75</span>
                        children.
                    </p>
                    <div class="impact-note" id="impactNote">
                        That's
                        <span id="totalBooksNote">750</span>
                        books delivered across the program this year.
                    </div>
                </div>
            </div>
            <!-- Row 2 Left -->
            <div class="grid-item-stat">
                <div class="label">Cost per Child / Year</div>
                <div class="value" id="costPerChild">$0.00</div>
            </div>
            <!-- Row 2 Right -->
            <div class="grid-item-stat">
                <div class="label">Total Program Cost</div>
                <div class="value" id="totalProgramCost">$0.00</div>
            </div>
            <!-- Row 3 -->
            <div class="overhead-card grid-span-all">
                <h3>Where the money goes</h3>
                <p class="desc">
                    Per child, per year — books vs. shipping &amp; administrative overhead.
                </p>
                <div class="bar">
                    <div class="books" id="barBooks">Books</div>
                    <div class="overhead" id="barOverhead">Overhead</div>
                </div>
                <div class="legend">
                    <span>
                        <span class="dot-books"></span>
                    Books (discounted) —
                    <b id="legendBooksPct">0%</b>
                    </span>
                    <span>
                        <span class="dot-overhead"></span>
                    Shipping + Admin —
                    <b id="legendOverheadPct">0%</b>
                    </span>
                </div>
                <div class="warning" id="warningBox">
                    At this investment level, cost per child doesn't even cover shipping and overhead — no books can be
                    purchased.
                    Increase the investment or reduce fixed per-child costs below.
                </div>
            </div>
        </div>
    </div>
</div>
<div class="th-cardTopTwo">
    <h3>Program Costs</h3>
    <p class="desc">
        Adjust these and the slider above will recalculate books per year automatically.
    </p>
    <div class="th-card-costs">
        <div class="gridCosts">
            <div class="field has-prefix">
                <label for="basePrice">Average Price Per Book (B)</label>
                <div class="input-row">
                    <span class="prefix">$</span>
                    <input type="number" id="basePrice" value="4.00" step="0.10" min="0.01">
                </div>
            </div>
            <div class="field has-suffix">
                <label for="discountRate">Bulk Purchase Discount Rate (d)</label>
                <div class="input-row">
                    <input type="number" id="discountRate" value="5" step="0.5" min="0" max="99">
                    <span class="suffix">%</span>
                </div>
            </div>
            <div class="field has-prefix">
                <label for="shipping">Shipping / Child / Year (S)</label>
                <div class="input-row">
                    <span class="prefix">$</span>
                    <input type="number" id="shipping" value="4.00" step="0.50" min="0">
                </div>
            </div>
            <div class="field has-prefix">
                <label for="admin">Administration / Overhead (A)</label>
                <div class="input-row">
                    <span class="prefix">$</span>
                    <input type="number" id="admin" value="1.00" step="0.50" min="0">
                </div>
            </div>
            <div class="field has-prefix">
                <label for="enrolled">Number of children Enrolled (N)</label>
                <div class="input-row">
                    <input type="number" id="enrolled" value="75" step="1" min="1">
                </div>
            </div>
        </div>
    </div>
</div>
        <footer>Cost per Year = (N × B × (1 − d)) + S + A</footer><br>
    </div>
</div>
  `;
}

  function attachProgramCostsHandlers(){
    const slider = document.getElementById('investmentSlider');
    if(!slider) return; 

    const sliderValueDisplay = document.getElementById('sliderValueDisplay');

    const basePriceInput = document.getElementById('basePrice');
    const discountRateInput = document.getElementById('discountRate');
    const shippingInput = document.getElementById('shipping');
    const adminInput = document.getElementById('admin');
    const enrolledInput = document.getElementById('enrolled');

    const booksHeadline = document.getElementById('booksHeadline');
    const enrolledHeadline = document.getElementById('enrolledHeadline');
    const totalBooksNote = document.getElementById('totalBooksNote');
    const costPerChildEl = document.getElementById('costPerChild');
    const totalProgramCostEl = document.getElementById('totalProgramCost');

    const barBooks = document.getElementById('barBooks');
    const barOverhead = document.getElementById('barOverhead');
    const legendBooksPct = document.getElementById('legendBooksPct');
    const legendOverheadPct = document.getElementById('legendOverheadPct');
    const warningBox = document.getElementById('warningBox');
    const impactNote = document.getElementById('impactNote');

    function fmtMoney(n){
      return n.toLocaleString('en-US', { style:'currency', currency:'USD', minimumFractionDigits:2, maximumFractionDigits:2 });
    }
    function fmtMoneyWhole(n){
      return n.toLocaleString('en-US', { style:'currency', currency:'USD', minimumFractionDigits:0, maximumFractionDigits:0 });
    }

    function recalc(){
      const totalInvestment = parseFloat(slider.value) || 0;
      const B = parseFloat(basePriceInput.value) || 0;
      const d = (parseFloat(discountRateInput.value) || 0) / 100;
      const S = parseFloat(shippingInput.value) || 0;
      const A = parseFloat(adminInput.value) || 0;
      const enrolled = Math.max(parseInt(enrolledInput.value) || 1, 1);

      sliderValueDisplay.textContent = fmtMoneyWhole(totalInvestment);

      const costPerChild = totalInvestment / enrolled;
      const fixedPerChild = S + A;
      const bookBudgetPerChild = costPerChild - fixedPerChild;
      const netBookPrice = B * (1 - d);

      let N = 0;
      let insufficient = false;

      if (bookBudgetPerChild <= 0 || netBookPrice <= 0) {
        insufficient = true;
        N = 0;
      } else {
        N = bookBudgetPerChild / netBookPrice;
      }

      warningBox.classList.toggle('show', insufficient);

      const displayN = insufficient ? 0 : N;
      booksHeadline.textContent = displayN.toFixed(1);
      enrolledHeadline.textContent = enrolled.toLocaleString();
      totalBooksNote.textContent = Math.round(displayN * enrolled).toLocaleString();

      costPerChildEl.textContent = fmtMoney(costPerChild);
      totalProgramCostEl.textContent = fmtMoney(totalInvestment);

      const bookCostPerChild = insufficient ? 0 : displayN * netBookPrice;
      const overheadCostPerChild = insufficient ? costPerChild : fixedPerChild;
      const denom = costPerChild > 0 ? costPerChild : 1;

      const bookPct = Math.max(0, Math.min(100, (bookCostPerChild / denom) * 100));
      const overheadPct = Math.max(0, Math.min(100, (overheadCostPerChild / denom) * 100));

      barBooks.style.flexBasis = bookPct + '%';
      barOverhead.style.flexBasis = overheadPct + '%';
      barBooks.textContent = bookPct > 12 ? fmtMoney(bookCostPerChild) : '';
      barOverhead.textContent = overheadPct > 12 ? fmtMoney(overheadCostPerChild) : '';

      legendBooksPct.textContent = bookPct.toFixed(0) + '%';
      legendOverheadPct.textContent = overheadPct.toFixed(0) + '%';

      impactNote.innerHTML = insufficient
        ? `At this level, the ${fmtMoney(fixedPerChild)} in fixed shipping & admin costs per child already exceeds what's available per child — no books are purchased.`
        : `That's <b>${Math.round(displayN * enrolled).toLocaleString()}</b> books delivered across the program this year.`;
    }

    [slider, basePriceInput, discountRateInput, shippingInput, adminInput, enrolledInput].forEach(el => {
      el.addEventListener('input', recalc);
    });

    recalc();
  }

  return { renderFundingTab, attachProgramCostsHandlers };
}