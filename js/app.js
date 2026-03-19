// ============================================================================
// WORKFORCE PATHWAYS — APP / UI CONTROLLER
// Multi-step wizard, results rendering, and user interaction logic
// ============================================================================

const App = {
  currentStep: 0,
  totalSteps: 6,
  profile: {},
  results: null,

  // Step definitions
  steps: [
    { id: "welcome",        title: "Welcome",                icon: "bi-house-heart" },
    { id: "location",       title: "Location & Education",   icon: "bi-geo-alt" },
    { id: "credentials",    title: "Existing Skills",        icon: "bi-award" },
    { id: "background",     title: "Background",             icon: "bi-shield-check" },
    { id: "circumstances",  title: "Current Circumstances",  icon: "bi-person-gear" },
    { id: "results",        title: "Your Pathways",          icon: "bi-signpost-2" }
  ],

  // -----------------------------------------------------------------------
  // INITIALIZATION
  // -----------------------------------------------------------------------
  init() {
    this.renderProgressBar();
    this.renderStep(0);
    this.bindNavigation();
  },

  // -----------------------------------------------------------------------
  // PROGRESS BAR
  // -----------------------------------------------------------------------
  renderProgressBar() {
    const bar = document.getElementById("progress-bar");
    bar.innerHTML = this.steps.map((step, i) => `
      <div class="progress-step ${i === 0 ? 'active' : ''}" data-step="${i}">
        <div class="step-circle">
          <i class="bi ${step.icon}"></i>
        </div>
        <div class="step-label">${step.title}</div>
      </div>
    `).join('<div class="progress-line"></div>');
  },

  updateProgressBar() {
    document.querySelectorAll(".progress-step").forEach((el, i) => {
      el.classList.toggle("active", i === this.currentStep);
      el.classList.toggle("completed", i < this.currentStep);
    });
    // Update progress fill
    const pct = (this.currentStep / (this.totalSteps - 1)) * 100;
    document.getElementById("progress-fill").style.width = pct + "%";
  },

  // -----------------------------------------------------------------------
  // NAVIGATION
  // -----------------------------------------------------------------------
  bindNavigation() {
    document.getElementById("btn-next").addEventListener("click", () => this.nextStep());
    document.getElementById("btn-prev").addEventListener("click", () => this.prevStep());
    document.getElementById("btn-start").addEventListener("click", () => this.nextStep());
  },

  nextStep() {
    if (!this.validateCurrentStep()) return;
    this.saveCurrentStep();
    if (this.currentStep < this.totalSteps - 1) {
      this.currentStep++;
      this.renderStep(this.currentStep);
      this.updateProgressBar();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  prevStep() {
    if (this.currentStep > 0) {
      this.currentStep--;
      this.renderStep(this.currentStep);
      this.updateProgressBar();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  },

  goToStep(step) {
    if (step >= 0 && step < this.totalSteps) {
      this.saveCurrentStep();
      this.currentStep = step;
      this.renderStep(this.currentStep);
      this.updateProgressBar();
    }
  },

  // -----------------------------------------------------------------------
  // STEP RENDERING
  // -----------------------------------------------------------------------
  renderStep(stepIdx) {
    const container = document.getElementById("step-content");
    const btnNext = document.getElementById("btn-next");
    const btnPrev = document.getElementById("btn-prev");
    const btnStart = document.getElementById("btn-start");
    const navButtons = document.getElementById("nav-buttons");

    // Show/hide buttons
    btnPrev.style.display = stepIdx > 0 && stepIdx < this.totalSteps - 1 ? "inline-flex" : "none";
    btnNext.style.display = stepIdx > 0 && stepIdx < this.totalSteps - 1 ? "inline-flex" : "none";
    btnStart.style.display = stepIdx === 0 ? "inline-flex" : "none";
    navButtons.style.display = stepIdx === this.totalSteps - 1 ? "none" : "flex";

    if (stepIdx === this.totalSteps - 1) {
      btnNext.textContent = "";
    } else if (stepIdx === this.totalSteps - 2) {
      btnNext.innerHTML = 'See My Pathways <i class="bi bi-arrow-right"></i>';
    } else {
      btnNext.innerHTML = 'Continue <i class="bi bi-arrow-right"></i>';
    }

    const renderers = {
      0: () => this.renderWelcome(),
      1: () => this.renderLocationEducation(),
      2: () => this.renderCredentials(),
      3: () => this.renderBackground(),
      4: () => this.renderCircumstances(),
      5: () => this.renderResults()
    };

    container.innerHTML = renderers[stepIdx]();

    // Post-render hooks
    if (stepIdx === 5) this.postRenderResults();
  },

  // -----------------------------------------------------------------------
  // STEP 0: WELCOME
  // -----------------------------------------------------------------------
  renderWelcome() {
    return `
      <div class="welcome-section">
        <div class="welcome-icon">
          <i class="bi bi-signpost-split"></i>
        </div>
        <h2>AI-Resilient Workforce Pathways Navigator</h2>
        <p class="lead">Discover career paths that won't be automated away — matched to your real-world circumstances, credentials, and barriers.</p>

        <div class="sector-tagline">
          <i class="bi bi-cpu"></i>
          <span>All 24 occupations are high-demand, hands-on, and <strong>resistant to AI displacement</strong> — chosen because they require human judgment, physical presence, or licensed care.</span>
        </div>

        <div class="feature-cards">
          <div class="feature-card">
            <i class="bi bi-tools"></i>
            <h5>Skilled Trades &amp; Construction</h5>
            <p>Electrician, plumber, HVAC, welder, carpenter, ironworker, sheet metal, heavy equipment, diesel mechanic, solar</p>
          </div>
          <div class="feature-card">
            <i class="bi bi-heart-pulse"></i>
            <h5>Healthcare &amp; Home Care</h5>
            <p>CNA, LPN, phlebotomist, medical assistant, EMT, surgical tech, home health aide, dental assistant</p>
          </div>
          <div class="feature-card">
            <i class="bi bi-egg-fried"></i>
            <h5>Hospitality &amp; Services</h5>
            <p>Executive chef, security officer — roles built on real-time human interaction and trust</p>
          </div>
          <div class="feature-card">
            <i class="bi bi-balloon-heart"></i>
            <h5>Childcare &amp; Education</h5>
            <p>Childcare center director, preschool teacher — essential early-childhood roles that demand human presence</p>
          </div>
          <div class="feature-card">
            <i class="bi bi-tree"></i>
            <h5>Agriculture &amp; Outdoor Services</h5>
            <p>Farm manager, landscape supervisor — land-based work with lower licensing barriers</p>
          </div>
          <div class="feature-card">
            <i class="bi bi-shield-check"></i>
            <h5>Barrier-Aware &amp; State-Specific</h5>
            <p>Accounts for conviction history, Fair Chance laws, registry status, immigration, transportation, and more</p>
          </div>
        </div>

        <div class="privacy-note">
          <i class="bi bi-lock"></i>
          <span>Your information stays in your browser. Nothing is sent to any server or stored anywhere.</span>
        </div>
      </div>
    `;
  },

  // -----------------------------------------------------------------------
  // STEP 1: LOCATION & EDUCATION
  // -----------------------------------------------------------------------
  renderLocationEducation() {
    const stateOptions = Object.entries(DATA.statePolicies)
      .sort((a, b) => a[1].name.localeCompare(b[1].name))
      .map(([code, s]) => `<option value="${code}" ${this.profile.state === code ? 'selected' : ''}>${s.name}</option>`)
      .join("");

    const eduOptions = DATA.barriers.education.levels
      .map(l => `<option value="${l.id}" ${this.profile.education === l.id ? 'selected' : ''}>${l.label}</option>`)
      .join("");

    return `
      <h3><i class="bi bi-geo-alt"></i> Where are you located?</h3>
      <p class="step-description">Your state determines which licensing laws and Fair Chance policies apply to you.</p>

      <div class="form-group">
        <label for="state" class="form-label">State <span class="required">*</span></label>
        <select id="state" class="form-select" required>
          <option value="">Select your state...</option>
          ${stateOptions}
        </select>
        <div id="state-summary" class="state-summary"></div>
      </div>

      <div class="form-group">
        <label for="education" class="form-label">Highest Education Level <span class="required">*</span></label>
        <select id="education" class="form-select" required>
          <option value="">Select your education level...</option>
          ${eduOptions}
        </select>
      </div>
    `;
  },

  // -----------------------------------------------------------------------
  // STEP 2: EXISTING CREDENTIALS
  // -----------------------------------------------------------------------
  renderCredentials() {
    const byCategory = {
      skilled_trade:    { icon: "bi-tools",          label: "Skilled Trades & Construction" },
      healthcare:       { icon: "bi-heart-pulse",     label: "Healthcare & Home Care" },
      hospitality:      { icon: "bi-egg-fried",       label: "Hospitality & Services" },
      service:          { icon: "bi-shield-check",    label: "Security & Protective Services" },
      childcare:        { icon: "bi-balloon-heart",   label: "Childcare & Education" },
      agriculture:      { icon: "bi-tree",            label: "Agriculture" },
      outdoor_services: { icon: "bi-flower1",         label: "Outdoor & Landscape Services" }
    };
    const selected = this.profile.existingCredentials || [];

    const makeCheckbox = (occ) => `
      <label class="credential-check">
        <input type="checkbox" name="credentials" value="${occ.id}"
          ${selected.includes(occ.id) ? 'checked' : ''}>
        <span class="credential-label">
          <strong>${occ.name}</strong>
          <small>${occ.description}</small>
        </span>
      </label>
    `;

    const sectorSections = Object.entries(byCategory).map(([cat, cfg]) => {
      const occs = DATA.occupations.filter(o => o.category === cat);
      if (!occs.length) return '';
      return `
        <div class="credentials-section">
          <h5><i class="bi ${cfg.icon}"></i> ${cfg.label}</h5>
          <div class="credential-grid">
            ${occs.map(makeCheckbox).join("")}
          </div>
        </div>
      `;
    }).join("");

    return `
      <h3><i class="bi bi-award"></i> What credentials or training do you have?</h3>
      <p class="step-description">Select any licenses, certifications, or significant training you already hold. This helps us preserve your existing investment and find the best-fit pathways.</p>

      ${sectorSections}

      <div class="form-group" style="margin-top: 1.5rem;">
        <label for="other-credentials" class="form-label">Other credentials, licenses, or skills (optional)</label>
        <textarea id="other-credentials" class="form-control" rows="2"
          placeholder="e.g., CDL, forklift certification, CPR/First Aid, OSHA 10...">${this.profile.otherCredentials || ""}</textarea>
      </div>
    `;
  },

  // -----------------------------------------------------------------------
  // STEP 3: BACKGROUND
  // -----------------------------------------------------------------------
  renderBackground() {
    const convictionOptions = DATA.barriers.conviction.types
      .map(t => `<option value="${t.id}" ${this.profile.conviction === t.id ? 'selected' : ''}>${t.label}</option>`)
      .join("");

    const registryOptions = DATA.barriers.registry.types
      .map(t => `<option value="${t.id}" ${this.profile.registry === t.id ? 'selected' : ''}>${t.label}</option>`)
      .join("");

    const timeOptions = DATA.barriers.timeSinceConviction.types
      .map(t => `<option value="${t.id}" ${this.profile.timeSinceConviction === t.id ? 'selected' : ''}>${t.label}</option>`)
      .join("");

    const showTimeField = this.profile.conviction && this.profile.conviction !== "none";

    return `
      <h3><i class="bi bi-shield-check"></i> Background Information</h3>
      <p class="step-description">This information is used only to identify which pathways are accessible to you and what steps might be needed. It is not stored or shared.</p>

      <div class="form-group">
        <label for="conviction" class="form-label">Conviction History</label>
        <select id="conviction" class="form-select" onchange="App.onConvictionChange()">
          ${convictionOptions}
        </select>
      </div>

      <div class="form-group" id="time-since-group" style="display: ${showTimeField ? 'block' : 'none'}">
        <label for="timeSinceConviction" class="form-label">Time Since Most Recent Conviction</label>
        <select id="timeSinceConviction" class="form-select">
          ${timeOptions}
        </select>
      </div>

      <div class="form-group">
        <label for="registry" class="form-label">Registry Status</label>
        <select id="registry" class="form-select">
          ${registryOptions}
        </select>
      </div>

      <div class="form-group">
        <label for="immigration" class="form-label">Immigration / Work Authorization <span class="required">*</span></label>
        <select id="immigration" class="form-select" required>
          <option value="">Select...</option>
          ${DATA.barriers.immigration.types.map(t =>
            `<option value="${t.id}" ${this.profile.immigration === t.id ? 'selected' : ''}>${t.label}</option>`
          ).join("")}
        </select>
      </div>
    `;
  },

  onConvictionChange() {
    const val = document.getElementById("conviction").value;
    document.getElementById("time-since-group").style.display = val !== "none" ? "block" : "none";
  },

  // -----------------------------------------------------------------------
  // STEP 4: CURRENT CIRCUMSTANCES
  // -----------------------------------------------------------------------
  renderCircumstances() {
    const makeSelect = (id, label, options, current) => `
      <div class="form-group">
        <label for="${id}" class="form-label">${label}</label>
        <select id="${id}" class="form-select">
          ${options.map(t => `<option value="${t.id}" ${current === t.id ? 'selected' : ''}>${t.label}</option>`).join("")}
        </select>
      </div>
    `;

    return `
      <h3><i class="bi bi-person-gear"></i> Current Circumstances</h3>
      <p class="step-description">These practical factors help us identify which pathways are realistic for you right now, and what support you might need.</p>

      ${makeSelect("transportation", "Transportation", DATA.barriers.transportation.types, this.profile.transportation)}
      ${makeSelect("drugScreen", "Drug Screening", DATA.barriers.drugScreen.types, this.profile.drugScreen)}
      ${makeSelect("physical", "Physical Capabilities", DATA.barriers.physical.types, this.profile.physical)}
      ${makeSelect("financial", "Financial Resources for Training", DATA.barriers.financial.types, this.profile.financial)}
    `;
  },

  // -----------------------------------------------------------------------
  // STEP 5: RESULTS
  // -----------------------------------------------------------------------
  renderResults() {
    this.results = Engine.evaluate(this.profile);
    const stateSummary = this.profile.state ? Engine.getStateSummary(this.profile.state) : null;

    const eligible = this.results.filter(r => r.status === "eligible");
    const conditional = this.results.filter(r => r.status === "conditional");
    const restricted = this.results.filter(r => r.status === "restricted");
    const ineligible = this.results.filter(r => r.status === "ineligible");

    return `
      <div class="results-header">
        <h3><i class="bi bi-signpost-2"></i> Your Personalized Pathways</h3>
        <p class="step-description">Based on your profile, here are your career pathways ranked by accessibility. Click any occupation for detailed information.</p>

        ${stateSummary ? `
          <div class="state-policy-banner ${stateSummary.favorability}">
            <div class="state-policy-header">
              <i class="bi bi-building"></i>
              <strong>${stateSummary.name} Policy Environment: ${stateSummary.favorability === 'favorable' ? 'Favorable' : stateSummary.favorability === 'moderate' ? 'Moderate' : 'Limited'}</strong>
            </div>
            <p>${stateSummary.summary}</p>
            <div class="state-policies-list">
              ${stateSummary.policies.map(p => `<span class="policy-tag"><i class="bi bi-check-circle"></i> ${p}</span>`).join("")}
            </div>
          </div>
        ` : ""}
      </div>

      <div class="results-summary-bar">
        <div class="summary-chip eligible"><i class="bi bi-check-circle-fill"></i> ${eligible.length} Eligible</div>
        <div class="summary-chip conditional"><i class="bi bi-exclamation-circle-fill"></i> ${conditional.length} Conditional</div>
        <div class="summary-chip restricted"><i class="bi bi-exclamation-triangle-fill"></i> ${restricted.length} Restricted</div>
        <div class="summary-chip ineligible"><i class="bi bi-x-circle-fill"></i> ${ineligible.length} Not Eligible</div>
      </div>

      <div class="filter-tabs">
        <button class="filter-tab active" data-filter="all">All (${this.results.length})</button>
        <button class="filter-tab" data-filter="eligible">Eligible (${eligible.length})</button>
        <button class="filter-tab" data-filter="conditional">Conditional (${conditional.length})</button>
        <button class="filter-tab" data-filter="restricted">Restricted (${restricted.length})</button>
        <button class="filter-tab" data-filter="ineligible">Not Eligible (${ineligible.length})</button>
      </div>

      <div id="results-list" class="results-list">
        ${this.results.map((r, i) => this.renderResultCard(r, i)).join("")}
      </div>

      <div class="results-footer">
        <div class="disclaimer">
          <i class="bi bi-info-circle"></i>
          <div>
            <strong>Important Disclaimer:</strong> This tool provides general guidance based on common regulations and policies. It is not legal advice.
            Actual eligibility depends on specific circumstances, employer policies, and current state regulations.
            Always verify with your state's licensing board and consult with a workforce development professional or legal aid attorney for personalized guidance.
          </div>
        </div>
        <button class="btn btn-outline-primary mt-3" onclick="App.startOver()">
          <i class="bi bi-arrow-counterclockwise"></i> Start Over
        </button>
        <button class="btn btn-primary mt-3 ms-2" onclick="App.printResults()">
          <i class="bi bi-printer"></i> Print Results
        </button>
      </div>
    `;
  },

  renderResultCard(result, index) {
    const occ = result.occupation;
    const statusConfig = {
      eligible:    { icon: "bi-check-circle-fill", label: "Eligible", colorClass: "status-eligible" },
      conditional: { icon: "bi-exclamation-circle-fill", label: "Conditional", colorClass: "status-conditional" },
      restricted:  { icon: "bi-exclamation-triangle-fill", label: "Restricted", colorClass: "status-restricted" },
      ineligible:  { icon: "bi-x-circle-fill", label: "Not Eligible", colorClass: "status-ineligible" }
    };
    const cfg = statusConfig[result.status];
    const categoryIcon = occ.category === "skilled_trade" ? "bi-tools" : "bi-heart-pulse";

    return `
      <div class="result-card ${cfg.colorClass}" data-status="${result.status}" data-index="${index}">
        <div class="result-card-header" onclick="App.toggleCardDetail(${index})">
          <div class="result-card-left">
            <div class="result-status-badge ${cfg.colorClass}">
              <i class="bi ${cfg.icon}"></i> ${cfg.label}
            </div>
            <div class="result-occupation">
              <i class="bi ${categoryIcon} category-icon"></i>
              <div>
                <h4>${occ.name}</h4>
                <span class="occ-meta">${result.wageData ? this.formatCurrency(result.wageData.stateMedian) : occ.medianSalary} median${result.wageData ? ` in ${result.wageData.stateName}` : ''} | ${occ.typicalDuration} training | Demand: ${this.formatDemand(occ.demandLevel)}</span>
              </div>
            </div>
          </div>
          <div class="result-card-right">
            <div class="score-ring ${cfg.colorClass}">
              <span class="score-value">${result.score}</span>
            </div>
            <i class="bi bi-chevron-down expand-icon"></i>
          </div>
        </div>

        <div class="result-card-detail" id="detail-${index}" style="display:none;">
          ${this.renderCardDetail(result)}
        </div>
      </div>
    `;
  },

  renderCardDetail(result) {
    const occ = result.occupation;
    let html = "";

    // Description & training
    html += `
      <div class="detail-section">
        <p>${occ.description}</p>
        <div class="training-path"><i class="bi bi-mortarboard"></i> <strong>Training Path:</strong> ${occ.trainingPath}</div>
      </div>
    `;

    // Wage data
    if (result.wageData) {
      const w = result.wageData;
      html += `
        <div class="detail-section wage-section">
          <h5><i class="bi bi-currency-dollar"></i> Earnings in ${w.stateName || 'Your State'}</h5>
          <div class="wage-cards">
            <div class="wage-card wage-card-primary">
              <div class="wage-card-label">Median Annual Salary</div>
              <div class="wage-card-value">${this.formatCurrency(w.stateMedian)}</div>
              <div class="wage-card-sub">${w.hourlyMedian}/hr</div>
            </div>
            <div class="wage-card wage-card-projected">
              <div class="wage-card-label">Projected in 2 Years</div>
              <div class="wage-card-value">${this.formatCurrency(w.projectedMedian)}</div>
              <div class="wage-card-sub">+${this.formatCurrency(w.projectedIncrease)} (+${w.projectedPctIncrease}%)</div>
            </div>
          </div>
          <div class="wage-range">
            <div class="wage-range-bar">
              <div class="wage-range-labels">
                <span>Entry Level</span>
                <span>Mid-Career</span>
                <span>Experienced</span>
              </div>
              <div class="wage-range-track">
                <div class="wage-range-fill" style="left: 0; width: 100%;"></div>
                <div class="wage-range-marker" style="left: 50%;" title="Median: ${this.formatCurrency(w.stateMedian)}"></div>
              </div>
              <div class="wage-range-values">
                <span>${this.formatCurrency(w.stateP10)}</span>
                <span>${this.formatCurrency(w.stateP25)}</span>
                <span>${this.formatCurrency(w.stateMedian)}</span>
                <span>${this.formatCurrency(w.stateP75)}</span>
                <span>${this.formatCurrency(w.stateP90)}</span>
              </div>
              <div class="wage-range-percentiles">
                <span>10th</span>
                <span>25th</span>
                <span>50th</span>
                <span>75th</span>
                <span>90th</span>
              </div>
            </div>
          </div>
          <div class="wage-trend-note">
            <i class="bi bi-graph-up-arrow"></i>
            <span>5-year annual wage growth: <strong>${w.cagrPct}%</strong> per year (national trend).
            ${w.isEstimate ? 'State figures estimated using BEA Regional Price Parities.' : ''}
            </span>
          </div>
          <div class="wage-source">
            <a href="${w.blsOesUrl}" target="_blank" rel="noopener">
              <i class="bi bi-box-arrow-up-right"></i> BLS OES Data (SOC ${w.soc})
            </a>
            <span class="gov-badge">.gov</span>
            <a href="${w.onetUrl}" target="_blank" rel="noopener" style="margin-left: 0.75rem;">
              <i class="bi bi-box-arrow-up-right"></i> O*NET Wage Details
            </a>
            <span class="gov-badge">.gov</span>
          </div>
        </div>
      `;
    }

    // AI Resilience Panel — Anthropic Economic Index
    if (result.wageData?.aiExposure) {
      const a = result.wageData.aiExposure;

      // BLS growth label
      const blsGrowthLabel = a.blsGrowthPct !== null
        ? (Number(a.blsGrowthPct) >= 0
            ? `+${a.blsGrowthPct}%`
            : `${a.blsGrowthPct}%`)
        : "N/A";
      const blsGrowthClass = Number(a.blsGrowthPct) > 5
        ? "ai-stat-positive"
        : Number(a.blsGrowthPct) < 0
          ? "ai-stat-negative"
          : "ai-stat-neutral";

      // Task type chips
      const taskChips = a.dominantTaskTypes
        .map(t => `<span class="task-chip">${t}</span>`)
        .join("");

      // Bars: scale to 80% max so visuals are readable
      const coverageBarPct   = Math.max(Math.round(a.coverage * 100 * (100/80)), 1);
      const benchmarkBarPct  = Math.round(a.benchmarkCoverage * 100 * (100/80));
      const theoreticalBarPct = a.theoreticalPct ? Math.round(a.theoretical * 100 * (100/80)) : 0;

      html += `
        <div class="detail-section ai-resilience-section">
          <h5><i class="bi bi-robot"></i> AI Exposure Analysis</h5>
          <div class="ai-resilience-citation">
            Based on the <strong>observed exposure</strong> framework from:
            <strong>Massenkoff &amp; McCrory (2026)</strong>
            <em>"The Anthropic Economic Index: Measuring AI's Labor Market Impacts"</em>
            — <a href="https://www.anthropic.com/research/labor-market-impacts" target="_blank" rel="noopener">anthropic.com/research</a>.
            Uses O*NET task data cross-referenced with real-world AI usage patterns.
          </div>

          <div class="ai-stat-grid">
            <div class="ai-stat-card">
              <div class="ai-stat-label">Observed AI Task Coverage</div>
              <div class="ai-stat-value ai-risk-${a.riskColor}">${a.coveragePct}%</div>
              <div class="ai-risk-badge ai-risk-${a.riskColor}">${a.riskTier} Exposure</div>
            </div>
            <div class="ai-stat-card">
              <div class="ai-stat-label">Theoretical AI Capability</div>
              <div class="ai-stat-value">${a.theoreticalPct || '—'}%</div>
              <div class="ai-stat-sub">${a.adoptionGapPct ? `${a.adoptionGapPct}pp adoption gap` : 'Eloundou et al. beta'}</div>
            </div>
            <div class="ai-stat-card">
              <div class="ai-stat-label">BLS Growth Advantage</div>
              <div class="ai-stat-value ai-stat-positive">+${a.blsGrowthAdvPp}pp</div>
              <div class="ai-stat-sub">vs. customer service benchmark</div>
            </div>
            <div class="ai-stat-card">
              <div class="ai-stat-label">BLS Job Growth (2022–2032)</div>
              <div class="ai-stat-value ${blsGrowthClass}">${blsGrowthLabel}</div>
              <div class="ai-stat-sub">10-year official projection</div>
            </div>
          </div>

          <div class="ai-exposure-comparison">
            <div class="ai-exp-label">Observed AI task coverage comparison</div>
            <div class="ai-exp-row">
              <span class="ai-exp-name">This occupation</span>
              <div class="ai-exp-track">
                <div class="ai-exp-bar ai-risk-bar-${a.riskColor}" style="width: ${coverageBarPct}%"></div>
              </div>
              <span class="ai-exp-pct">${a.coveragePct}%</span>
            </div>
            ${a.theoreticalPct ? `
            <div class="ai-exp-row">
              <span class="ai-exp-name">Theoretical capability</span>
              <div class="ai-exp-track">
                <div class="ai-exp-bar ai-exp-bar-theoretical" style="width: ${theoreticalBarPct}%"></div>
              </div>
              <span class="ai-exp-pct">${a.theoreticalPct}%</span>
            </div>` : ''}
            <div class="ai-exp-row">
              <span class="ai-exp-name">Customer service reps</span>
              <div class="ai-exp-track">
                <div class="ai-exp-bar ai-exp-bar-benchmark" style="width: ${benchmarkBarPct}%"></div>
              </div>
              <span class="ai-exp-pct">${a.benchmarkPct}%</span>
            </div>
          </div>

          <div class="ai-task-types">
            <div class="ai-task-label">Why observed AI usage is near zero for this occupation:</div>
            <div class="ai-task-chips">${taskChips}</div>
          </div>

          <div class="ai-methodology-note">
            <i class="bi bi-info-circle"></i>
            <span>
              The Anthropic Economic Index measures <em>actual</em> AI usage mapped to O*NET tasks —
              not just what AI <em>could</em> theoretically do. Massenkoff &amp; McCrory (2026) found
              that for every 10-percentage-point increase in observed AI task coverage, BLS employment
              growth projections drop by <strong>0.6 percentage points</strong>. This occupation has
              only <strong>${a.coveragePct}%</strong> observed coverage, yielding a
              <strong>+${a.blsGrowthAdvPp}pp</strong> growth advantage vs. the ${a.benchmarkPct}%-coverage benchmark.
              The gap between theoretical (${a.theoreticalPct || '—'}%) and observed (${a.coveragePct}%) reflects
              how far real-world AI adoption lags behind technical capability.
            </span>
          </div>

          <div class="wage-source" style="margin-top:0.5rem;">
            <a href="https://www.anthropic.com/research/labor-market-impacts" target="_blank" rel="noopener">
              <i class="bi bi-box-arrow-up-right"></i> Anthropic Economic Index (2026)
            </a>
            &nbsp;·&nbsp;
            <a href="https://www.bls.gov/emp/tables/occupational-projections-and-characteristics.htm" target="_blank" rel="noopener">
              <i class="bi bi-box-arrow-up-right"></i> BLS Employment Projections
            </a>
            <span class="gov-badge">.gov</span>
          </div>
        </div>
      `;
    }

    // Official links & certification resources
    if ((result.officialLinks && result.officialLinks.length > 0) || result.stateLicensingLink) {
      html += `
        <div class="detail-section official-links-section">
          <h5><i class="bi bi-link-45deg"></i> Official Certification & Licensing Resources</h5>
          ${result.stateLicensingLink ? `
            <div class="state-license-link">
              <a href="${result.stateLicensingLink.url}" target="_blank" rel="noopener">
                <i class="bi bi-geo-alt-fill"></i> ${result.stateLicensingLink.label}
              </a>
              ${result.stateLicensingLink.gov ? '<span class="gov-badge">.gov</span>' : `<span class="non-gov-note">${result.stateLicensingLink.note || ''}</span>`}
            </div>
          ` : ''}
          <div class="official-links-grid">
            ${(result.officialLinks || []).map(link => `
              <a href="${link.url}" target="_blank" rel="noopener" class="official-link">
                <span class="official-link-label">${link.label}</span>
                ${link.gov ? '<span class="gov-badge">.gov</span>' : `<span class="non-gov-note">${link.note || 'Non-government resource'}</span>`}
              </a>
            `).join("")}
          </div>
        </div>
      `;
    }

    // Positives
    if (result.positives.length > 0) {
      html += `
        <div class="detail-section positives-section">
          <h5><i class="bi bi-hand-thumbs-up"></i> In Your Favor</h5>
          <ul>${result.positives.map(p => `<li>${p}</li>`).join("")}</ul>
        </div>
      `;
    }

    // Available contexts
    if (result.availableContexts.length > 0) {
      html += `
        <div class="detail-section">
          <h5><i class="bi bi-building"></i> Available Work Settings</h5>
          <div class="context-tags">
            ${result.availableContexts.map(c => `<span class="context-tag available"><i class="bi bi-check"></i> ${Engine.getContextLabel(c)}</span>`).join("")}
          </div>
        </div>
      `;
    }

    // Blocked contexts
    if (result.blockedContexts.length > 0) {
      html += `
        <div class="detail-section">
          <h5><i class="bi bi-slash-circle"></i> Restricted Work Settings</h5>
          <div class="context-tags">
            ${result.blockedContexts.map(c => `<span class="context-tag blocked"><i class="bi bi-x"></i> ${Engine.getContextLabel(c)}</span>`).join("")}
          </div>
        </div>
      `;
    }

    // Barriers
    if (result.barriers.length > 0) {
      html += `
        <div class="detail-section barriers-section">
          <h5><i class="bi bi-exclamation-diamond"></i> Barriers & Considerations</h5>
          ${result.barriers.map(b => `
            <div class="barrier-item ${b.severity}">
              <div class="barrier-header">
                <span class="barrier-severity-badge ${b.severity}">${this.formatSeverity(b.severity)}</span>
                <strong>${b.title}</strong>
              </div>
              <p>${b.detail}</p>
              ${b.remediation ? `<div class="barrier-remediation"><i class="bi bi-lightbulb"></i> <strong>Next Steps:</strong> ${b.remediation}</div>` : ""}
            </div>
          `).join("")}
        </div>
      `;
    }

    // Recommendations
    if (result.recommendations.length > 0) {
      html += `
        <div class="detail-section recommendations-section">
          <h5><i class="bi bi-compass"></i> Recommendations</h5>
          <ul>${result.recommendations.map(r => `<li>${r}</li>`).join("")}</ul>
        </div>
      `;
    }

    // Warnings
    if (result.warnings.length > 0) {
      html += `
        <div class="detail-section warnings-section">
          <h5><i class="bi bi-info-circle"></i> Things to Know</h5>
          <ul>${result.warnings.map(w => `<li>${w}</li>`).join("")}</ul>
        </div>
      `;
    }

    // Financial resources
    if (result.financialResources.length > 0) {
      html += `
        <div class="detail-section financial-section">
          <h5><i class="bi bi-cash-stack"></i> Financial Resources & Training Assistance</h5>
          <div class="resource-cards">
            ${result.financialResources.map(r => `
              <div class="resource-card">
                <strong>${r.name}</strong>
                <p>${r.description}</p>
                <small><i class="bi bi-person-check"></i> ${r.eligibility}</small>
                ${r.url ? `<a href="${r.url}" target="_blank" rel="noopener" class="resource-link"><i class="bi bi-box-arrow-up-right"></i> Visit ${r.gov ? '' : ''}${r.name.split('(')[0].trim()}</a>${r.gov ? ' <span class="gov-badge">.gov</span>' : (r.note ? ` <span class="non-gov-note">${r.note}</span>` : '')}` : ''}
              </div>
            `).join("")}
          </div>
        </div>
      `;
    }

    return html;
  },

  // -----------------------------------------------------------------------
  // POST-RENDER HOOKS
  // -----------------------------------------------------------------------
  postRenderResults() {
    // Filter tabs
    document.querySelectorAll(".filter-tab").forEach(tab => {
      tab.addEventListener("click", (e) => {
        document.querySelectorAll(".filter-tab").forEach(t => t.classList.remove("active"));
        e.target.classList.add("active");
        const filter = e.target.dataset.filter;
        document.querySelectorAll(".result-card").forEach(card => {
          if (filter === "all" || card.dataset.status === filter) {
            card.style.display = "block";
          } else {
            card.style.display = "none";
          }
        });
      });
    });

    // Auto-expand first eligible result
    const firstCard = document.querySelector('.result-card[data-status="eligible"], .result-card[data-status="conditional"]');
    if (firstCard) {
      const idx = firstCard.dataset.index;
      this.toggleCardDetail(parseInt(idx));
    }
  },

  toggleCardDetail(index) {
    const detail = document.getElementById(`detail-${index}`);
    const card = detail.closest(".result-card");
    const icon = card.querySelector(".expand-icon");

    if (detail.style.display === "none") {
      detail.style.display = "block";
      icon.classList.replace("bi-chevron-down", "bi-chevron-up");
      card.classList.add("expanded");
    } else {
      detail.style.display = "none";
      icon.classList.replace("bi-chevron-up", "bi-chevron-down");
      card.classList.remove("expanded");
    }
  },

  // -----------------------------------------------------------------------
  // VALIDATION
  // -----------------------------------------------------------------------
  validateCurrentStep() {
    if (this.currentStep === 1) {
      const state = document.getElementById("state")?.value;
      const edu = document.getElementById("education")?.value;
      if (!state) { this.showValidationError("state", "Please select your state."); return false; }
      if (!edu) { this.showValidationError("education", "Please select your education level."); return false; }
    }
    if (this.currentStep === 3) {
      const immigration = document.getElementById("immigration")?.value;
      if (!immigration) { this.showValidationError("immigration", "Please select your work authorization status."); return false; }
    }
    this.clearValidationErrors();
    return true;
  },

  showValidationError(fieldId, message) {
    this.clearValidationErrors();
    const field = document.getElementById(fieldId);
    if (field) {
      field.classList.add("is-invalid");
      const errorDiv = document.createElement("div");
      errorDiv.className = "invalid-feedback";
      errorDiv.textContent = message;
      field.parentNode.appendChild(errorDiv);
      field.focus();
    }
  },

  clearValidationErrors() {
    document.querySelectorAll(".is-invalid").forEach(el => el.classList.remove("is-invalid"));
    document.querySelectorAll(".invalid-feedback").forEach(el => el.remove());
  },

  // -----------------------------------------------------------------------
  // SAVE STEP DATA
  // -----------------------------------------------------------------------
  saveCurrentStep() {
    switch (this.currentStep) {
      case 1:
        this.profile.state = document.getElementById("state")?.value;
        this.profile.education = document.getElementById("education")?.value;
        // Show state summary
        if (this.profile.state) {
          const summary = Engine.getStateSummary(this.profile.state);
          const el = document.getElementById("state-summary");
          if (el && summary) {
            el.innerHTML = `<div class="mini-state-summary ${summary.favorability}">${summary.summary}</div>`;
          }
        }
        break;
      case 2:
        const checked = document.querySelectorAll('input[name="credentials"]:checked');
        this.profile.existingCredentials = Array.from(checked).map(c => c.value);
        this.profile.otherCredentials = document.getElementById("other-credentials")?.value || "";
        break;
      case 3:
        this.profile.conviction = document.getElementById("conviction")?.value || "none";
        this.profile.timeSinceConviction = document.getElementById("timeSinceConviction")?.value || "na";
        this.profile.registry = document.getElementById("registry")?.value || "none";
        this.profile.immigration = document.getElementById("immigration")?.value;
        break;
      case 4:
        this.profile.transportation = document.getElementById("transportation")?.value || "own_vehicle";
        this.profile.drugScreen = document.getElementById("drugScreen")?.value || "can_pass";
        this.profile.physical = document.getElementById("physical")?.value || "no_limitations";
        this.profile.financial = document.getElementById("financial")?.value || "self_fund";
        break;
    }
  },

  // -----------------------------------------------------------------------
  // UTILITY
  // -----------------------------------------------------------------------
  formatCurrency(amount) {
    if (!amount && amount !== 0) return "N/A";
    return "$" + Math.round(amount).toLocaleString("en-US");
  },

  formatDemand(level) {
    const map = { very_high: "Very High", high: "High", moderate: "Moderate" };
    return map[level] || level;
  },

  formatSeverity(sev) {
    const map = { blocker: "Blocker", major: "Major", moderate: "Moderate", minor: "Minor", actionable: "Action Needed", warning: "Note" };
    return map[sev] || sev;
  },

  startOver() {
    this.profile = {};
    this.results = null;
    this.currentStep = 0;
    this.renderStep(0);
    this.updateProgressBar();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  },

  printResults() {
    window.print();
  }
};

// Initialize on DOM ready
document.addEventListener("DOMContentLoaded", () => App.init());
