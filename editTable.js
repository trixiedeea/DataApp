    function renderEditTableTab(){
      
      const msgHtml = toast ? `<div class="th-msg th-msg-${toast.type}">${esc(toast.text)}</div>` : '';

      const levelNav = `<div class="th-subnav th-subnav-lvl7">
        <button class="subchipFive${designLevel==='communities'?' active':''}" data-action="set-design-level" data-level="communities">Partner Community Tabs</button>
        <button class="subchipFive${designLevel==='tabs'?' active':''}" data-action="set-design-level" data-level="tabs">Category Tabs</button>
        <button class="subchipFive${designLevel==='fields'?' active':''}" data-action="set-design-level" data-level="fields">Fields</button>
      </div>`;

      let body = '';
      if(designLevel === 'communities'){
        body = renderDesignCommunities();
      } else if(designLevel === 'tabs'){
        body = renderDesignTabs();
      } else {
        body = renderDesignFields();
      }

      return `<div class="th-card-purple">
        <p class="th-section-label">Edit Table Design</p>
        <p class="rt-help">Delete, rearrange, or add fields at any level of tabs — partner communities, category tabs, and the fields within them.</p>
        ${msgHtml}
        ${levelNav}
        ${body}
      </div>`;
    }

    function renderDesignCommunities(){
      
      const rows = communities.map((c, idx) => `
        <div class="th-field th-field-boxed">
          <div class="th-row th-row-between">
            <strong>${esc(c.communityName || c.communityId)}</strong>
            <div class="th-row">
              <button class="th-button th-button-small th-button-ghost" data-action="move-community" data-dir="up" data-community-id="${c.id}" ${idx===0?'disabled':''}>↑</button>
              <button class="th-button th-button-small th-button-ghost" data-action="move-community" data-dir="down" data-community-id="${c.id}" ${idx===communities.length-1?'disabled':''}>↓</button>
              <button class="th-button th-button-small th-button-ghost" data-action="delete-community" data-community-id="${c.id}">Delete</button>
            </div>
          </div>
        </div>
      `).join('');
      return `<div class="th-card-pink">
        <p class="th-section-label">Partner Community Tabs</p>
        ${rows || '<div class="th-empty">No communities yet.</div>'}
        <div class="th-row"><button class="th-button" data-action="add-community">+ Add Community</button></div>
      </div>`;
    }
    function renderDesignTabs(){
      
      const rows = SUB_ENTITY_TABS.map((t, idx) => `
        <div class="th-field th-field-boxed">
          <div class="th-row th-row-between">
            <strong>${esc(t.label)}</strong>
            <div class="th-row">
              <button class="th-button th-button-small th-button-ghost" data-action="move-subentity-tab" data-dir="up" data-key="${t.key}" ${idx===0?'disabled':''}>↑</button>
              <button class="th-button th-button-small th-button-ghost" data-action="move-subentity-tab" data-dir="down" data-key="${t.key}" ${idx===SUB_ENTITY_TABS.length-1?'disabled':''}>↓</button>
            </div>
          </div>
        </div>
      `).join('');
      return `<div class="th-card-yellow">
        <p class="th-section-label">Category Tabs (Geography, Population, etc.)</p>
        <p class="rt-help">Rearrange the order these appear under every partner community.</p>
        ${rows}
      </div>`;
    }

    function renderDesignFields(){
    
      const entitySelector = SUB_ENTITY_TABS.map(t =>
        `<button class="subchipFour${designEntityType===t.key?' active':''}" data-action="set-design-entity" data-entity="${t.key}">${esc(t.label)}</button>`
      ).join('');
      const entityNav = `<div class="th-subnav th-subnav-lvl5">${entitySelector}</div>`;

      const fields = SUB_ENTITY_FIELDS.communities[designEntityType];
      if(!fields) return `<div class="th-empty">Unknown entity type.</div>`;

      const keys = Object.keys(fields);
      const fieldListHtml = keys.map((key, idx) => {
        const f = fields[key];
        return `<div class="th-field th-field-boxed">
          <div class="th-row th-row-between">
            <strong>${esc(f.label || humanize(key))}</strong>
            <div class="th-row">
              <button class="th-button th-button-small th-button-ghost" data-action="move-field" data-dir="up" data-entity="${designEntityType}" data-field="${key}" ${idx===0?'disabled':''}>↑</button>
              <button class="th-button th-button-small th-button-ghost" data-action="move-field" data-dir="down" data-entity="${designEntityType}" data-field="${key}" ${idx===keys.length-1?'disabled':''}>↓</button>
              <button class="th-button th-button-small th-button-ghost" data-action="delete-field" data-entity="${designEntityType}" data-field="${key}">Delete</button>
            </div>
          </div>
          <p class="rt-help">Label: ${esc(f.label || humanize(key))} | Type: ${esc(f.type)} ${f.required?'| Required':''}</p>
        </div>`;
      }).join('');

      const addFieldForm = `<div class="th-card-blue">
        <p class="th-section-label">Add New Field</p>
        <form>
          <div class="formGrid">
            <fieldset class="innerField">
              <legend class="fieldTitle">Field Key</legend>
              <label class="fieldId" for="th-newfield-key">ex: stewardsName</label><br><br>
              <input type="text" class="th-input" id="th-newfield-key" value="${esc(newFieldDraft.key)}" placeholder="e.g., newMetric">
            </fieldset>

            <fieldset class="innerField">
              <legend class="fieldTitle">Field Name</legend>
              <label class="fieldId" for="th-newfield-label">ex: Steward's Name</label><br><br>
              <input type="text" class="th-input" id="th-newfield-label" value="${esc(newFieldDraft.label)}" placeholder="e.g., New Metric">
            </fieldset>

            <fieldset class="innerField">
              <legend class="fieldTitle">Type</legend>
              <label class="fieldId" for="th-newfield-type">Type Of Data Field</label><br><br>
              <select class="th-select" id="th-newfield-type">
                <option value="string" ${newFieldDraft.type==='string'?'selected':''}>String</option>
                <option value="number" ${newFieldDraft.type==='number'?'selected':''}>Number</option>
                <option value="integer" ${newFieldDraft.type==='integer'?'selected':''}>Integer</option>
                <option value="boolean" ${newFieldDraft.type==='boolean'?'selected':''}>Boolean</option>
              </select>
            </fieldset>

            <fieldset class="innerField">
              <legend class="fieldTitle">Required</legend>
              <label class="fieldId">Is This Field Required?</label><br><br>
              <input type="radio" id="th-newfield-required-yes" name="required" value="Yes" ${newFieldDraft.required?'checked':''}>
              <label class="fieldId" for="th-newfield-required-yes">Yes</label>
              <br>
              <input type="radio" id="th-newfield-required-no" name="required" value="No" ${!newFieldDraft.required?'checked':''}>
              <label class="fieldId" for="th-newfield-required-no">No</label>
              <br>
            </fieldset>
          </div>
          <div class="buttonRow">
            <button type="button" class="th-button" data-action="add-field" data-entity="${designEntityType}">Save</button>
            <button type="button" class="th-button th-button-ghost" data-action="cancel-add-field">Cancel</button>
          </div>
        <button class="th-button" data-action="add-field" data-entity="${designEntityType}">Add Field</button>
      </div>`;

      return `<div class="th-card-sm">
        <p class="th-section-label">Fields: ${esc(fieldLabel({}, designEntityType))}</p>
        ${entityNav}
        ${fieldListHtml || '<div class="th-empty">No fields defined yet.</div>'}
        ${addFieldForm}
      </div>`;
    }
    