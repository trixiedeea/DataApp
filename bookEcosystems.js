// ================================================================
// The markup below injects itself into the page the first
// time it's needed. 
// ================================================================

import { getCustomAssessmentPoints, addCustomAssessmentPoint, removeCustomAssessmentPoint, getAllAssessmentPoints } from './schema.js';

export const TEMPLATES_HTML = `
<template id="tpl-msg"><div data-slot="msg"></div></template>

<template id="tpl-field-row">
  <div class="th-field">
    <label class="th-flabel">
      <span data-slot="label-text"></span>
      <span class="th-req" hidden>*</span>
      <span class="rt-help" data-slot="note" hidden></span>
    </label>
    <div data-slot="input"></div>
  </div>
</template>

<template id="tpl-progress-chip"><span class="subchipFour"></span></template>
<template id="tpl-assessment-chip"><button class="subchipSix" data-action="select-assessment-point"></button></template>

<template id="tpl-wizard">
  <div class="th-cardTop th-card-green">
    <p class="th-section-label" data-slot="heading"></p>
    <div data-slot="msg-wrap"></div>
    <div class="th-row th-row-gap-top" data-slot="progress"></div>
    <p class="th-section-label" data-slot="step-label"></p>
    <div data-slot="fields"></div>
    <div class="th-row">
      <button class="th-button th-button-ghost" data-action="wizard-back" data-slot="back-btn" hidden>Back</button>
      <button class="th-button-invest" data-action="wizard-next" data-slot="next-btn" hidden>Save &amp; Continue</button>
      <button class="th-button-invest" data-action="wizard-finish" data-slot="finish-btn" hidden>Finish &amp; Add Community</button>
      <button class="th-button-invest th-button-ghost-invest" data-action="wizard-cancel">Cancel</button>
    </div>
  </div>
</template>

<template id="tpl-community-info-edit">
  <div class="th-card-red2">
    <div data-slot="fields"></div>
    <div class="th-row">
      <button class="th-button-invest" data-action="save-community-info">Save</button>
      <button class="th-button th-button-ghost-invest" data-action="cancel-community-info">Cancel</button>
    </div>
  </div>
</template>

<template id="tpl-community-info-display">
  <div class="th-card-green2">
    <div data-slot="fields"></div>
    <div class="th-row">
      <button class="th-button" data-action="edit-community-info">Edit</button>
      <button class="th-button th-button-small th-button-ghost" data-action="delete-community" data-slot="delete-btn">Delete Community</button>
    </div>
  </div>
</template>

<template id="tpl-partner-overview-empty">
  <div class="th-cardTop th-card-orange">
    <p class="th-section-label">Book Ecosystem Partner Communities</p>
    <div class="th-card-blue2">
      <div data-slot="msg-wrap"></div>
      <div data-slot="body"></div>
    </div>
  </div>
</template>

<template id="tpl-partner-overview-active">
  <div class="th-cardTopTwo">
    <p class="th-section-labelTop">Book Ecosystem Partner Communities</p>
    <div class="th-card grid-item">
      <div data-slot="msg-wrap"></div>
      <div data-slot="body"></div>
    </div>
  </div>
</template>

<template id="tpl-select-community-prompt"><div class="th-empty">Select a community to view details, or add a new one.</div></template>
<template id="tpl-unknown-subentity"><div class="th-empty">Unknown sub-entity type.</div></template>

<template id="tpl-add-field-collapsed">
  <div class="th-row th-row-top">
    <button class="th-button th-button-small th-button-ghost" data-action="start-add-field" data-slot="btn"></button>
  </div>
</template>

<template id="tpl-add-field-form">
  <div class="th-card-orange2">
    <p class="th-section-label" data-slot="heading"></p>
    <div class="rt-grid3">
      <div class="th-field">
        <label class="th-flabel">Field Key</label>
        <input class="th-input" id="th-newfield-key" data-slot="key-input" placeholder="e.g., newMetric">
      </div>
      <div class="th-field">
        <label class="th-flabel">Label</label>
        <input class="th-input" id="th-newfield-label" data-slot="label-input" placeholder="e.g., New Metric">
      </div>
      <div class="th-field">
        <label class="th-flabel">Type</label>
        <select class="th-select" id="th-newfield-type" data-slot="type-select">
          <option value="string">String</option>
          <option value="number">Number</option>
          <option value="integer">Integer</option>
          <option value="boolean">Boolean</option>
        </select>
    </div>
      <div class="th-field">
        <label class="th-flabel">
          <input type="checkbox" id="th-newfield-required" data-slot="required-checkbox">
          Required field
        </label>
      </div>
    </div>
    <div class="th-row">
      <button class="th-button" data-action="add-field" data-slot="add-btn">Add Field</button>
      <button class="th-button th-button-ghost" data-action="cancel-add-field">Cancel</button>
    </div>
  </div>
</template>



<template id="tpl-assessment-empty">
<div data-slot="nav"></div>
   <div class="th-card-yellow">
      <p class="th-section-label" data-slot="heading"></p>
      <div data-slot="fields"></div>
      <div class="th-row">
        <div data-slot="view-actions">
          <div class="th-empty" data-slot="empty-text"></div>
  <button class="th-button" data-action="add-assessment-record" data-slot="add-btn"></button>
          <button class="th-button th-button-small" data-action="edit-sub-entity" data-slot="edit-btn">Edit</button>
          <div data-slot="empty-actions"></div>
        </div>
      </div>
    </div>
</div>
</template>

<template id="tpl-assessment-display">
  <div data-slot="nav-outer"></div>
   <div class="th-card-yellow">
    <p class="th-section-label" data-slot="heading"></p>
    <div data-slot="fields"></div>
    <div class="th-row">
      <div data-slot="view-actions">
        <button class="th-button th-button-small" data-action="edit-sub-entity" data-slot="edit-btn">Edit</button>
        <div data-slot="view-extra-actions"></div>
      </div>
      <div data-slot="edit-actions" hidden>
        <button class="th-button th-button-small" data-action="save-sub-entity" data-slot="save-btn">Save</button>
        <button class="th-button th-button-small th-button-ghost" data-action="cancel-edit">Cancel</button>
        <div data-slot="edit-extra-actions"></div>
      </div>
    </div>
  </div>
</template>

<template id="tpl-array-edit">
  <div class="th-card-cyan2">
    <p class="th-section-label" data-slot="heading"></p>
    <div data-slot="fields"></div>
    <div class="th-row">
      <button class="th-button" data-action="save-sub-entity" data-slot="save-btn">Save</button>
      <button class="th-button th-button-ghost" data-action="cancel-edit">Cancel</button>
    </div>
  </div>
</template>

<template id="tpl-array-empty">
  <div class="th-card-yellow2">
    <p class="th-section-label" data-slot="heading"></p>
    <div class="th-empty">No records yet.</div>
    <button class="th-button" data-action="add-sub-entity-record" data-slot="add-btn">Add Record</button>
  </div>
</template>

<template id="tpl-array-record">
  <div class="th-card-black">
    <div data-slot="nav"></div>
    <p class="th-section-label" data-slot="heading"></p>
    <div data-slot="fields"></div>
    <div class="th-row">
      <button class="th-button th-button-small" data-action="edit-sub-entity-record" data-slot="edit-btn">Edit</button>
      <button class="th-button th-button-small th-button-ghost" data-action="delete-sub-entity-record" data-slot="delete-btn">Delete</button>
    </div>
  </div>
</template>

<template id="tpl-assessment-edit">
    <div data-slot="nav"></div>
    <p class="th-section-label" data-slot="heading"></p>
    <div data-slot="fields"></div>
    <div class="th-row">
      <button class="th-button" data-action="save-assessment-record" data-slot="save-btn">Save</button>
      <button class="th-button th-button-ghost" data-action="cancel-edit">Cancel</button>
      <div data-slot="edit-extra-actions"></div>
    </div>
  </div>
</template>

<template id="tpl-array-list-wrapper">
  <div>
    <div data-slot="nav"></div>
    <div data-slot="records"></div>
    <button class="th-button" data-action="add-sub-entity-record" data-slot="add-btn">Add Record</button>
  </div>
</template>

<template id="tpl-single-subentity">
  <div class="th-card-yellow">
    <p class="th-section-label" data-slot="heading"></p>
    <div data-slot="fields"></div>
    <div class="th-row">
      <div data-slot="view-actions">
        <button class="th-button th-button-small" data-action="edit-sub-entity" data-slot="edit-btn">Edit</button>
      </div>
      <div data-slot="edit-actions" hidden>
        <button class="th-button th-button-small" data-action="save-sub-entity" data-slot="save-btn">Save</button>
        <button class="th-button th-button-small th-button-ghost" data-action="cancel-edit">Cancel</button>
      </div>
    </div>
  </div>
</template>
`;

let templatesInjected = false;
function ensureTemplates() {
  if (templatesInjected) return;
  const container = document.createElement('div');
  container.style.display = 'none';
  // INNER HTML: <template id="tpl-msg"><div data-slot="msg"></div></template>... (all template definitions)
  container.innerHTML = TEMPLATES_HTML;
  document.body.appendChild(container);
  templatesInjected = true;
}

export function clone(tplId) {
  ensureTemplates();
  const tpl = document.getElementById(tplId);
  if (!tpl) throw new Error(`Missing template #${tplId}`);
  return tpl.content.cloneNode(true);
}

export function fragToString(frag) {
  const wrapper = document.createElement('div');
  wrapper.appendChild(frag);
  return wrapper.innerHTML;
}

export function buildMsgHtml(toast) {
 
  if (!toast) return '';
  const frag = clone('tpl-msg');
  const el = frag.querySelector('[data-slot="msg"]');
  el.className = `th-msg th-msg-${toast.type}`;
  el.textContent = toast.text;
  return fragToString(frag);
}

export function renderAddAssessmentPointModal() {
  const custom = getCustomAssessmentPoints();
  const html = `
    <div class="th-modal-overlay" id="assessment-point-modal">
      <div class="th-modal th-card-greenThree">
        <h3>Add Custom Assessment Point</h3>
        <div class="th-field">
          <label class="th-flabel">Assessment Point Name</label>
          <input class="th-input" id="ap-name" placeholder="e.g., 36 Months, 3 Years, Post-Intervention">
        </div>
        <div class="th-field">
          <label class="th-flabel">Months from Baseline</label>
          <input class="th-input" type="number" id="ap-months" placeholder="e.g., 36">
        </div>
        <div class="th-row">
          <button class="th-button" data-action="save-assessment-point">Add Assessment Point</button>
          <button class="th-button th-button-ghost" data-action="cancel-assessment-point">Cancel</button>
        </div>
        ${custom.length > 0 ? `
          <div style="margin-top: 1rem; border-top: 1px solid #ccc; padding-top: 1rem;">
            <h4>Custom Assessment Points</h4>
            ${custom.map(c => `
              <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 0.5rem;">
                <span>${c.name} (${c.months} months)</span>
                <button class="th-button th-button-ghost" data-action="remove-assessment-point" data-id="${c.id}" style="padding: 0.25rem 0.5rem; font-size: 0.8rem;">Remove</button>
              </div>
            `).join('')}
          </div>
        ` : ''}
      </div>
    </div>
  `;
  return html;
}


export function buildFieldRow(fieldLabelFn, isReqFn, fieldDef, key, innerHtml, opts) {
  opts = opts || {};
  const row = clone('tpl-field-row');
  row.querySelector('[data-slot="label-text"]').textContent = fieldLabelFn(fieldDef, key);
  const reqEl = row.querySelector('.th-req');
  if (opts.showReq && isReqFn(fieldDef)) reqEl.removeAttribute('hidden');
  else reqEl.remove();
  const noteEl = row.querySelector('[data-slot="note"]');
  if (opts.note) {
    noteEl.removeAttribute('hidden');
    noteEl.textContent = opts.note;
  } else {
    noteEl.remove();
  }

  row.querySelector('[data-slot="input"]').innerHTML = innerHtml;
  return row;
}

export function initbookEcosystemsTab(helpers) {
  const {
    communities, findCommunity, SUB_ENTITY_FIELDS,
    SINGLE_ENTITY_TYPES, ASSESSMENT_POINT_TYPES, ASSESSMENT_POINTS,
    SUB_ENTITY_TABS, STICKY_FIELDS, esc, fieldLabel, isReq, renderEditField, renderDisplayValue
  } = helpers;

  // Use dynamic assessment points including custom ones
  const getAllPoints = () => {
    const custom = getCustomAssessmentPoints();
    return [...ASSESSMENT_POINTS, ...custom.map(c => c.name)];
  };

  function renderbookEcosystemsTab(state){
    // INNER HTML: <div class="th-cardTop th-card-green">...community overview...</div>
    const { activeCommunityId, toast, activeSubEntityTab,
      activeAssessmentPoint, isEditing, editValues, newFieldDraft
    } = state;
    const msgHtml = buildMsgHtml(toast);

    if(!activeCommunityId){
      const root = clone('tpl-partner-overview-empty');
      // INNER HTML: (toast message HTML)
      root.querySelector('[data-slot="msg-wrap"]').innerHTML = msgHtml;
      // INNER HTML: <div class="th-empty">Select a community to view details, or add a new one.</div>
      root.querySelector('[data-slot="body"]').innerHTML = fragToString(clone('tpl-select-community-prompt'));
      return fragToString(root);
    }

    // Access communities from window object (set by index.html)
    const communities = window.communities || {};
    const community = communities[activeCommunityId] || Object.values(communities).find(c => c.communityId === activeCommunityId);
    
    if(!community){
      const root = clone('tpl-partner-overview-empty');
      root.querySelector('[data-slot="msg-wrap"]').innerHTML = msgHtml;
      root.querySelector('[data-slot="body"]').innerHTML = `<div class="th-empty">Community not found: ${activeCommunityId}</div>`;
      return fragToString(root);
    }

    const subEntityContent = renderSubEntityContent(community, activeSubEntityTab, state);

    const root = clone('tpl-partner-overview-active');
    
    root.querySelector('[data-slot="msg-wrap"]').innerHTML = msgHtml;
    
    root.querySelector('[data-slot="body"]').innerHTML = subEntityContent;
    return fragToString(root);
  }

  function renderSubEntityContent(community, subEntityType, state){

    const { isEditing, editValues, activeAssessmentPoint } = state;
    const fieldDef = SUB_ENTITY_FIELDS.communities[subEntityType];
    
    // Handle new items structure for arrays (library, outcomes)
    const fields = fieldDef && fieldDef.items ? fieldDef.items : fieldDef;
    if(!fields) return fragToString(clone('tpl-unknown-subentity'));

    const data = community[subEntityType];
    const isSingle = SINGLE_ENTITY_TYPES.includes(subEntityType);
    const isAssessmentPoint = ASSESSMENT_POINT_TYPES.includes(subEntityType);

    console.log('renderSubEntityContent:', { subEntityType, isAssessmentPoint, isSingle, data, fieldDef, fields });

    const body = isAssessmentPoint
      ? renderAssessmentPointSubEntity(community, subEntityType, fields, data, state)
      : (isSingle
        ? renderSingleSubEntity(community, subEntityType, fields, data, state)
        : renderArraySubEntity(community, subEntityType, fields, data, state));

    return body + renderAddFieldWidget(subEntityType, state);
  }

  function renderAddFieldWidget(entityType, state){
    // INNER HTML: <div class="th-card th-card-blue">...add field form (collapsed or expanded)...</div>
    const { newFieldDraft } = state;
    if(newFieldDraft.__context !== entityType){
      const root = clone('tpl-add-field-collapsed');
      const btn = root.querySelector('[data-slot="btn"]');
      btn.textContent = `+ Add Field to ${fieldLabel({}, entityType)}`;
      btn.setAttribute('data-entity', entityType);
      return fragToString(root);
    }

    const root = clone('tpl-add-field-form');
    root.querySelector('[data-slot="heading"]').textContent = `Add Field to ${fieldLabel({}, entityType)}`;

    root.querySelector('[data-slot="key-input"]').setAttribute('value', newFieldDraft.key || '');
    root.querySelector('[data-slot="label-input"]').setAttribute('value', newFieldDraft.label || '');

    const typeSelect = root.querySelector('[data-slot="type-select"]');
    typeSelect.querySelectorAll('option').forEach(opt => {
      if(opt.value === newFieldDraft.type) opt.setAttribute('selected', '');
      else opt.removeAttribute('selected');
    });

    if(newFieldDraft.required) root.querySelector('[data-slot="required-checkbox"]').setAttribute('checked', '');

    root.querySelector('[data-slot="add-btn"]').setAttribute('data-entity', entityType);

    return fragToString(root);
  }

  function renderSingleSubEntity(community, type, fields, data, state){
    
    const { isEditing, editValues } = state;

    const root = clone('tpl-single-subentity');
    root.querySelector('[data-slot="heading"]').textContent = type.charAt(0).toUpperCase() + type.slice(1);

    const fieldsSlot = root.querySelector('[data-slot="fields"]');
    Object.keys(fields).forEach(key => {
      const fieldDef = fields[key];
      const value = isEditing ? editValues[key] : data[key];
      const displayValue = isEditing ? renderEditField(fieldDef, key, value) : renderDisplayValue(fieldDef, value);
      const row = buildFieldRow(fieldLabel, isReq, fieldDef, key, displayValue, { showReq: true });
      fieldsSlot.appendChild(row);
    });

    if(isEditing){
      root.querySelector('[data-slot="view-actions"]').remove();
      const editActions = root.querySelector('[data-slot="edit-actions"]');
      editActions.removeAttribute('hidden');
      editActions.querySelector('[data-slot="save-btn"]').setAttribute('data-type', type);
    } else {
      root.querySelector('[data-slot="edit-actions"]').remove();
      const viewActions = root.querySelector('[data-slot="view-actions"]');
      viewActions.removeAttribute('hidden');
      viewActions.querySelector('[data-slot="edit-btn"]').setAttribute('data-type', type);
    }

    return fragToString(root);
  }

  function renderAssessmentPointSubEntity(community, type, fields, data, state){
    
    const { activeAssessmentPoint, isEditing, editValues } = state;
    
    const dataArray = data && data.items ? data.items : (Array.isArray(data) ? data : []);
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);
    
   
    const parentFields = {};
    const parentFieldDefs = {};
    
    if (data && typeof data === 'object' && !Array.isArray(data) && data.items) {
     
      Object.keys(data).forEach(key => {
        if (key !== 'items' && key !== 'type') {
          parentFields[key] = data[key];
          parentFieldDefs[key] = { type: 'string', label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) };
        }
      });
    } else if (dataArray.length > 0) {
      // Old structure - get from first record (baseline)
      const baselineRecord = dataArray.find(r => r.assessmentPoint === 'Baseline') || dataArray[0];
      if (baselineRecord) {
        ['libraryId', 'publicSchoolLibrary'].forEach(key => {
          if (baselineRecord[key] !== undefined) {
            parentFields[key] = baselineRecord[key];
            parentFieldDefs[key] = { type: 'string', label: key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase()) };
          }
        });
      }
    }

    function buildNav(){
      const wrap = document.createElement('div');
      wrap.className = 'th-subnav th-subnav-lvl6';
      const allPoints = getAllPoints();
      allPoints.forEach(p => {
        const chipFrag = clone('tpl-assessment-chip');
        const chip = chipFrag.querySelector('.subchipSix');
        chip.textContent = p;
        chip.setAttribute('data-point', p);
        if(activeAssessmentPoint === p) chip.classList.add('active');
        wrap.appendChild(chipFrag);
      });
      
      return wrap;
    }

    const record = dataArray.find(r => r.assessmentPoint === activeAssessmentPoint);
    const editableKeys = Object.keys(fields).filter(k => k !== 'assessmentPoint');

    if(isEditing && editValues.__type === type && editValues.__point === activeAssessmentPoint){
      const root = clone('tpl-assessment-edit');
      root.querySelector('[data-slot="nav"]').appendChild(buildNav());
      root.querySelector('[data-slot="heading"]').textContent = `${typeLabel} — ${activeAssessmentPoint}`;
      const fieldsSlot = root.querySelector('[data-slot="fields"]');
      
      // Render parent-level fields first (read-only)
      Object.keys(parentFields).forEach(key => {
        const value = parentFields[key];
        const fieldDef = parentFieldDefs[key] || { type: 'string', label: key };
        const row = buildFieldRow(() => fieldLabel(fieldDef), false, fieldDef, key, renderDisplayValue(fieldDef, value), { note: '(carried from baseline)' });
        fieldsSlot.appendChild(row);
      });
      
      // Render item-level fields
      editableKeys.forEach(key => {
        const fieldDef = fields[key];
        const isSticky = (STICKY_FIELDS[type]||[]).includes(key);
        const row = buildFieldRow(fieldLabel, isReq, fieldDef, key,
          renderEditField(fieldDef, key, editValues[key]),
          { showReq: true, note: isSticky ? '(same for every assessment point)' : null }
        );
        fieldsSlot.appendChild(row);
      });
      root.querySelector('[data-slot="save-btn"]').setAttribute('data-type', type);
      
     
      const editExtraActions = root.querySelector('[data-slot="edit-extra-actions"]');
      const addApBtn = document.createElement('button');
      addApBtn.className = 'th-button th-button-ghost';
      addApBtn.textContent = '+ Add Assessment Point';
      addApBtn.setAttribute('data-action', 'add-assessment-point');
      addApBtn.style.marginLeft = '0.5rem';
      editExtraActions.appendChild(addApBtn);
      
      return fragToString(root);
    }

    if(!record){
      const root = clone('tpl-assessment-empty');
      root.querySelector('[data-slot="nav"]').appendChild(buildNav());
      root.querySelector('[data-slot="heading"]').textContent = `${typeLabel} — ${activeAssessmentPoint}`;
      root.querySelector('[data-slot="empty-text"]').textContent = `No ${activeAssessmentPoint} record yet.`;
      const addBtn = root.querySelector('[data-slot="add-btn"]');
      addBtn.textContent = `Add ${activeAssessmentPoint} Record`;
      addBtn.setAttribute('data-type', type);
      
     
      const emptyActions = root.querySelector('[data-slot="empty-actions"]');
      const addApBtn = document.createElement('button');
      addApBtn.className = 'th-button th-button-ghost';
      addApBtn.textContent = '+ Add Assessment Point';
      addApBtn.setAttribute('data-action', 'add-assessment-point');
      addApBtn.style.marginLeft = '0.5rem';
      emptyActions.appendChild(addApBtn);
      
      return fragToString(root);
    }

    const root = clone('tpl-assessment-display');
    root.querySelector('[data-slot="nav-outer"]').appendChild(buildNav());
    root.querySelector('[data-slot="heading"]').textContent = `${typeLabel} — ${activeAssessmentPoint}`;
    const fieldsSlot = root.querySelector('[data-slot="fields"]');
    
    // Render parent-level fields first (read-only)
    Object.keys(parentFields).forEach(key => {
      const value = parentFields[key];
      const fieldDef = parentFieldDefs[key] || { type: 'string', label: key };
      const row = buildFieldRow(() => fieldLabel(fieldDef), false, fieldDef, key, renderDisplayValue(fieldDef, value), { note: '(carried from baseline)' });
      fieldsSlot.appendChild(row);
    });
    
    // Render item-level fields
    editableKeys.forEach(key => {
      const fieldDef = fields[key];
      const isSticky = (STICKY_FIELDS[type]||[]).includes(key);
      const row = buildFieldRow(fieldLabel, isReq, fieldDef, key,
        renderDisplayValue(fieldDef, record[key]),
        { note: isSticky ? '(same for every assessment point)' : null }
      );
      fieldsSlot.appendChild(row);
    });
    root.querySelector('[data-slot="edit-btn"]').setAttribute('data-type', type);
    
    // Add "Add Assessment Point" button to view actions
    const viewActions = root.querySelector('[data-slot="view-actions"]');
    const addApBtn = document.createElement('button');
    addApBtn.className = 'th-button th-button-ghost';
    addApBtn.textContent = '+ Add Assessment Point';
    addApBtn.setAttribute('data-action', 'add-assessment-point');
    addApBtn.style.marginLeft = '0.5rem';
    viewActions.appendChild(addApBtn);
    
    return fragToString(root);
  }

  function renderArraySubEntity(community, type, fields, dataArray, state){
   
    const { isEditing, editValues } = state;
    dataArray = Array.isArray(dataArray) ? dataArray : [];
    const typeLabel = type.charAt(0).toUpperCase() + type.slice(1);

    if(isEditing && editValues.__type === type && editValues.__index !== undefined){
      const root = clone('tpl-array-edit');
      root.querySelector('[data-slot="heading"]').textContent = `Edit Record #${editValues.__index + 1}`;
      const fieldsSlot = root.querySelector('[data-slot="fields"]');
      Object.keys(fields).forEach(key => {
        const fieldDef = fields[key];
        const row = buildFieldRow(fieldLabel, isReq, fieldDef, key,
          renderEditField(fieldDef, key, editValues[key]),
          { showReq: true }
        );
        fieldsSlot.appendChild(row);
      });
      root.querySelector('[data-slot="save-btn"]').setAttribute('data-type', type);
      return fragToString(root);
    }

    if(!dataArray || dataArray.length === 0){
      const root = clone('tpl-array-empty');
      root.querySelector('[data-slot="heading"]').textContent = typeLabel;
      root.querySelector('[data-slot="add-btn"]').setAttribute('data-type', type);
      return fragToString(root);
    }

    const wrapper = clone('tpl-array-list-wrapper');
    const recordsSlot = wrapper.querySelector('[data-slot="records"]');
    dataArray.forEach((record, idx) => {
      const recRoot = clone('tpl-array-record');
      recRoot.querySelector('[data-slot="heading"]').textContent = `Record #${idx + 1}`;
      const fieldsSlot = recRoot.querySelector('[data-slot="fields"]');
      Object.keys(fields).forEach(key => {
        const fieldDef = fields[key];
        const row = buildFieldRow(fieldLabel, isReq, fieldDef, key,
          renderDisplayValue(fieldDef, record[key])
        );
        fieldsSlot.appendChild(row);
      });
      recRoot.querySelector('[data-slot="edit-btn"]').setAttribute('data-type', type);
      recRoot.querySelector('[data-slot="edit-btn"]').setAttribute('data-index', idx);
      recRoot.querySelector('[data-slot="delete-btn"]').setAttribute('data-type', type);
      recRoot.querySelector('[data-slot="delete-btn"]').setAttribute('data-index', idx);
      recordsSlot.appendChild(recRoot);
    });
    wrapper.querySelector('[data-slot="add-btn"]').setAttribute('data-type', type);
    return fragToString(wrapper);
  }

    function formatCustomDate(dateObj) {
    const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN", "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"];
    
    const year = dateObj.getFullYear();
    const monthStr = months[dateObj.getMonth()];
    
    const day = String(dateObj.getDate()).padStart(2, '0'); 
    
    return `${year}-${monthStr}-${day}`;
  }

  function autoPopulateAssessmentDates() {
    const baselineInput = document.querySelector('[name="baselineDate"]') || document.getElementById('baselineDate');
    if (!baselineInput || !baselineInput.value) return;

   
    const baseDate = new Date(baselineInput.value + 'T00:00:00');

    const dateProjections = {
      'sixMonthDate': 6,
      'twelveMonthDate': 12,
      'twentyFourMonthDate': 24
    };

    Object.keys(dateProjections).forEach(schemaKey => {
      const monthsToAdd = dateProjections[schemaKey];
      const futureDate = new Date(baseDate.getTime());
      
      // Add the programmatic months
      futureDate.setMonth(futureDate.getMonth() + monthsToAdd);

      // Format the final string into "YYYY-JUN-01" style
      const customFormattedString = formatCustomDate(futureDate);

      const targetInput = document.querySelector(`[name="${schemaKey}"]`) || document.getElementById(schemaKey);
      
      if (targetInput) {
        
        if (targetInput.tagName === 'INPUT') {
          targetInput.value = customFormattedString;
        } else {
          targetInput.textContent = customFormattedString;
        }
        
        targetInput.dispatchEvent(new Event('change', { bubbles: true }));
      }
    });
  }

  return {
    renderbookEcosystemsTab,
    renderAddAssessmentPointModal,
    clone,
    fragToString
  };

}