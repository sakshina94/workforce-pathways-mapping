// ============================================================================
// WORKFORCE PATHWAYS — DECISION ENGINE
// Evaluates eligibility across all barriers and generates pathway recommendations
// ============================================================================

const Engine = {

  /**
   * Main entry point: evaluate all occupations for a given user profile
   * Returns an array of results sorted by fit score
   */
  evaluate(profile) {
    const results = DATA.occupations.map(occ => this.evaluateOccupation(occ, profile));

    // Sort: eligible first (highest score), then restricted, then ineligible
    results.sort((a, b) => {
      const statusOrder = { eligible: 0, restricted: 1, conditional: 2, ineligible: 3 };
      const statusDiff = statusOrder[a.status] - statusOrder[b.status];
      if (statusDiff !== 0) return statusDiff;
      return b.score - a.score;
    });

    return results;
  },

  /**
   * Evaluate a single occupation against the user's profile
   */
  evaluateOccupation(occupation, profile) {
    const result = {
      occupation: occupation,
      status: "eligible",       // eligible | restricted | conditional | ineligible
      score: 100,               // 0-100 fit score
      availableContexts: [...occupation.workContexts],
      blockedContexts: [],
      barriers: [],             // array of barrier assessments
      recommendations: [],      // actionable next steps
      warnings: [],             // things to be aware of
      positives: [],            // favorable factors
      financialResources: [],   // applicable funding sources
      officialLinks: [],        // official certification/licensing links
      stateLicensingLink: null  // state-specific licensing board link
    };

    // Run each barrier check
    this.checkImmigration(result, profile);
    this.checkEducation(result, occupation, profile);
    this.checkConviction(result, occupation, profile);
    this.checkRegistry(result, occupation, profile);
    this.checkDrugScreen(result, occupation, profile);
    this.checkTransportation(result, occupation, profile);
    this.checkPhysical(result, occupation, profile);
    this.checkFinancial(result, occupation, profile);
    this.applyStatePolicy(result, occupation, profile);
    this.checkExistingCredentials(result, occupation, profile);

    // Clamp score
    result.score = Math.max(0, Math.min(100, Math.round(result.score)));

    // Determine final status based on score and barriers
    this.determineFinalStatus(result);

    // Generate financial resource recommendations
    this.matchFinancialResources(result, profile);

    // Compile official links
    this.compileOfficialLinks(result, occupation, profile);

    // Calculate state-specific wages and projections
    this.calculateWageData(result, occupation, profile);

    return result;
  },

  // -----------------------------------------------------------------------
  // IMMIGRATION CHECK
  // -----------------------------------------------------------------------
  checkImmigration(result, profile) {
    const rule = DATA.immigrationRules[profile.immigration];
    if (!rule) return;

    if (!rule.canWork) {
      result.status = "ineligible";
      result.score = 0;
      result.barriers.push({
        type: "immigration",
        severity: "blocker",
        title: "Work Authorization Required",
        detail: rule.note,
        remediation: "Explore pathways to legal work authorization. Contact an immigration attorney or local legal aid organization."
      });
      return;
    }

    if (rule.canGetLicense === "varies") {
      result.score -= 10;
      result.barriers.push({
        type: "immigration",
        severity: "warning",
        title: "Licensing Eligibility Varies by State",
        detail: rule.note,
        remediation: `Check with the ${profile.state ? DATA.statePolicies[profile.state]?.name : 'your state'} licensing board for specific requirements for your immigration status.`
      });
    }

    if (!rule.canGetFederalJob) {
      // Remove government contexts
      const govContexts = ["government", "fire_dept"];
      govContexts.forEach(ctx => {
        const idx = result.availableContexts.indexOf(ctx);
        if (idx > -1) {
          result.availableContexts.splice(idx, 1);
          result.blockedContexts.push(ctx);
        }
      });
      if (result.blockedContexts.length > 0) {
        result.warnings.push("Some government positions may require U.S. citizenship.");
      }
    }
  },

  // -----------------------------------------------------------------------
  // EDUCATION CHECK
  // -----------------------------------------------------------------------
  checkEducation(result, occupation, profile) {
    const userRank = DATA.educationRank[profile.education] ?? 0;
    const requiredRank = DATA.educationRank[occupation.educationMin] ?? 0;

    if (userRank < requiredRank) {
      const requiredLabel = DATA.barriers.education.levels.find(l => l.id === occupation.educationMin)?.label || occupation.educationMin;
      result.score -= 20;
      result.barriers.push({
        type: "education",
        severity: "actionable",
        title: "Education Prerequisite Not Met",
        detail: `This occupation requires a minimum of: ${requiredLabel}. You can work toward this while exploring other options.`,
        remediation: this.getEducationRemediation(profile.education, occupation.educationMin)
      });
    } else {
      result.positives.push("Education requirement met.");
    }
  },

  getEducationRemediation(current, required) {
    if (required === "ged" && (current === "none")) {
      return "Enroll in a GED preparation program. Many community colleges and adult education centers offer free GED classes. Check your local American Job Center for programs.";
    }
    if (required === "diploma") {
      return "A high school diploma or GED is required. If you have a GED, some programs accept it as equivalent. Contact the specific training program to confirm.";
    }
    return "Contact your local community college or workforce development center to discuss educational pathways.";
  },

  // -----------------------------------------------------------------------
  // CONVICTION HISTORY CHECK
  // -----------------------------------------------------------------------
  checkConviction(result, occupation, profile) {
    if (profile.conviction === "none") {
      result.positives.push("No conviction history — no licensing restrictions from this factor.");
      return;
    }

    const timeSince = profile.timeSinceConviction || "na";
    const timeYears = this.timeToYears(timeSince);

    // Find applicable conviction rules
    const applicableRules = DATA.convictionRules.filter(rule => {
      const matchesConviction = rule.convictionTypes.includes(profile.conviction);
      const matchesOccupation = rule.affects === "all" ||
        (rule.affects === "healthcare" && occupation.category === "healthcare") ||
        (rule.affects === "childcare" && occupation.category === "childcare") ||
        (rule.affects === "hospitality" && occupation.category === "hospitality") ||
        (rule.affects === "security" && occupation.id === "security_officer") ||
        (rule.affects === "driving_required" && (occupation.drivingRequired || occupation.drivingRecordRequired));
      return matchesConviction && matchesOccupation;
    });

    if (applicableRules.length === 0) {
      result.positives.push("Your conviction type does not typically restrict this occupation.");
      return;
    }

    applicableRules.forEach(rule => {
      // Check waiting period
      const pastWaiting = rule.waitingPeriodYears && timeYears >= rule.waitingPeriodYears;

      // Process blocked contexts
      if (rule.blockedContexts) {
        rule.blockedContexts.forEach(ctx => {
          const idx = result.availableContexts.indexOf(ctx);
          if (idx > -1) {
            result.availableContexts.splice(idx, 1);
            if (!result.blockedContexts.includes(ctx)) {
              result.blockedContexts.push(ctx);
            }
          }
        });
      }

      // Process restricted contexts (may be available with assessment)
      if (rule.restrictedContexts) {
        rule.restrictedContexts.forEach(ctx => {
          if (result.availableContexts.includes(ctx) && !pastWaiting) {
            // Mark as restricted but don't remove — flag for review
            result.warnings.push(`${this.getContextLabel(ctx)} setting may require individual assessment due to conviction history.`);
          }
        });
      }

      // Build barrier entry
      let severity;
      if (rule.severity === "block") severity = "blocker";
      else if (rule.severity === "restrict" && result.availableContexts.length === 0) severity = "blocker";
      else if (rule.severity === "restrict") severity = "major";
      else if (rule.severity === "review") severity = "moderate";
      else severity = "minor";

      let detail = rule.note;
      if (pastWaiting) {
        detail += ` You have passed the typical ${rule.waitingPeriodYears}-year waiting period, which strengthens your case.`;
        severity = severity === "blocker" ? "major" : severity === "major" ? "moderate" : "minor";
      }

      const scorePenalty = { blocker: 50, major: 30, moderate: 15, minor: 5 }[severity];
      result.score -= scorePenalty;

      result.barriers.push({
        type: "conviction",
        severity: severity,
        title: "Conviction History Impact",
        detail: detail,
        remediation: this.getConvictionRemediation(profile, rule, pastWaiting)
      });
    });

    // If all original contexts are blocked, check if any allowed contexts exist
    if (result.availableContexts.length === 0) {
      const allowedFromRules = applicableRules
        .filter(r => r.allowedContexts)
        .flatMap(r => r.allowedContexts);

      if (allowedFromRules.length > 0) {
        result.availableContexts = [...new Set(allowedFromRules)];
        result.recommendations.push(
          `While some work settings are restricted, you may be eligible to work in: ${result.availableContexts.map(c => this.getContextLabel(c)).join(", ")}. This preserves your existing skills and training investment.`
        );
      }
    }
  },

  getConvictionRemediation(profile, rule, pastWaiting) {
    const parts = [];
    const state = profile.state ? DATA.statePolicies[profile.state] : null;

    if (state?.certificateOfRehab) {
      parts.push(`Your state (${state.name}) offers a Certificate of Rehabilitation, which can help restore licensing eligibility.`);
    }
    if (state?.fairChanceLicensing) {
      parts.push(`${state.name} has Fair Chance Licensing laws that require licensing boards to use individualized assessment rather than blanket bans.`);
    }
    if (state?.expungementAvailable && !pastWaiting) {
      parts.push("Explore whether your conviction is eligible for expungement or sealing, which could remove the barrier entirely.");
    }
    if (!pastWaiting && rule.waitingPeriodYears) {
      parts.push(`The typical waiting period for this type of conviction is ${rule.waitingPeriodYears} years. Continue building your work history and rehabilitation evidence in the meantime.`);
    }
    if (pastWaiting) {
      parts.push("You have exceeded the typical waiting period. Gather documentation of rehabilitation (employment history, community involvement, education, character references) to support your application.");
    }
    parts.push("Consider consulting with a reentry legal services organization for guidance specific to your situation.");

    return parts.join(" ");
  },

  // -----------------------------------------------------------------------
  // SEX OFFENDER REGISTRY CHECK
  // -----------------------------------------------------------------------
  checkRegistry(result, occupation, profile) {
    if (profile.registry === "none") return;

    const tier = profile.registry;
    const tierNum = parseInt(tier.replace("sex_offender_tier", "")) || 0;

    // Registry has the most severe impact
    const applicableRules = DATA.convictionRules.filter(rule =>
      rule.registryTiers && rule.registryTiers.includes(tier)
    );

    applicableRules.forEach(rule => {
      if (rule.blockedContexts) {
        rule.blockedContexts.forEach(ctx => {
          const idx = result.availableContexts.indexOf(ctx);
          if (idx > -1) {
            result.availableContexts.splice(idx, 1);
            if (!result.blockedContexts.includes(ctx)) {
              result.blockedContexts.push(ctx);
            }
          }
        });
      }

      if (rule.allowedContexts) {
        // Ensure allowed contexts are in available list
        rule.allowedContexts.forEach(ctx => {
          if (!result.availableContexts.includes(ctx) && !result.blockedContexts.includes(ctx)) {
            result.availableContexts.push(ctx);
          }
        });
      }
    });

    let severity = "major";
    let scorePenalty = 30;

    if (tierNum >= 3) {
      severity = "blocker";
      scorePenalty = 50;
    }

    // For vulnerable population occupations, registry is more restrictive
    if (occupation.vulnerablePopulationContact) {
      // Remove all contexts that involve vulnerable populations
      const vpContexts = Object.entries(DATA.workContexts)
        .filter(([_, v]) => v.vulnerablePop || v.minorContact === "likely" || v.minorContact === "certain")
        .map(([k, _]) => k);

      vpContexts.forEach(ctx => {
        const idx = result.availableContexts.indexOf(ctx);
        if (idx > -1) {
          result.availableContexts.splice(idx, 1);
          if (!result.blockedContexts.includes(ctx)) {
            result.blockedContexts.push(ctx);
          }
        }
      });

      severity = tierNum >= 2 ? "blocker" : "major";
      scorePenalty = tierNum >= 2 ? 60 : 40;
    }

    result.score -= scorePenalty;

    result.barriers.push({
      type: "registry",
      severity: severity,
      title: "Sex Offender Registry Impact",
      detail: `Registry status (Tier ${tierNum}) significantly restricts roles involving contact with minors and vulnerable populations. ${result.availableContexts.length > 0 ? "However, some work settings remain accessible." : "All typical work contexts for this occupation are restricted."}`,
      remediation: this.getRegistryRemediation(result, occupation, tierNum)
    });

    if (result.availableContexts.length > 0) {
      result.recommendations.push(
        `Focus on ${result.availableContexts.map(c => this.getContextLabel(c)).join(", ")} settings where registry restrictions are less likely to apply. Your existing training and credentials remain valuable in these contexts.`
      );
    }
  },

  getRegistryRemediation(result, occupation, tierNum) {
    const parts = [];

    if (result.availableContexts.length > 0) {
      parts.push(`Pursue opportunities in ${result.availableContexts.map(c => this.getContextLabel(c)).join(", ")} settings.`);
    }

    if (occupation.relatedOccupations?.length > 0) {
      parts.push("Consider related occupations that may have more accessible work contexts.");
    }

    if (tierNum <= 1) {
      parts.push("As a Tier I registrant, you may have additional options. Consult with a legal advocate about your specific restrictions and any pathway to petition for removal from the registry.");
    }

    parts.push("Connect with a reentry specialist who has experience working with registrants on occupational licensing issues.");

    return parts.join(" ");
  },

  // -----------------------------------------------------------------------
  // DRUG SCREENING CHECK
  // -----------------------------------------------------------------------
  checkDrugScreen(result, occupation, profile) {
    if (!occupation.drugScreenRequired || profile.drugScreen === "can_pass") return;

    const state = profile.state ? DATA.statePolicies[profile.state] : null;

    if (profile.drugScreen === "marijuana_only" && state?.marijuanaLegal) {
      result.warnings.push(`Marijuana is legal in ${state.name}, but many employers still test for it. Federal contractors and healthcare employers typically maintain zero-tolerance policies.`);
      result.score -= 5;
      result.barriers.push({
        type: "drug_screen",
        severity: "warning",
        title: "Marijuana & Drug Screening",
        detail: `While marijuana is legal in ${state.name}, many employers in this field still drug-test for it, especially in healthcare and government-funded roles.`,
        remediation: "Consider abstaining before job applications. Some employers are dropping marijuana from panels — ask during the application process. Private-sector commercial and industrial employers may be more flexible."
      });
    } else if (profile.drugScreen === "marijuana_only") {
      result.score -= 15;
      result.barriers.push({
        type: "drug_screen",
        severity: "moderate",
        title: "Drug Screening Required",
        detail: "This occupation typically requires drug screening, and marijuana is not legal in your state.",
        remediation: "You will need to pass a drug screening for most employers in this field. Consider substance use support resources if needed. Contact your local workforce development center for assistance."
      });
    } else {
      result.score -= 25;
      result.barriers.push({
        type: "drug_screen",
        severity: "major",
        title: "Drug Screening Barrier",
        detail: "This occupation requires drug screening. Current substance use may prevent employment.",
        remediation: "Many workforce programs offer substance use support and treatment referrals. Completing a treatment program demonstrates commitment and may be viewed favorably by employers. Contact SAMHSA helpline: 1-800-662-4357."
      });
    }
  },

  // -----------------------------------------------------------------------
  // TRANSPORTATION CHECK
  // -----------------------------------------------------------------------
  checkTransportation(result, occupation, profile) {
    const needsDriving = occupation.drivingRequired || occupation.cdlRequired || occupation.drivingRecordRequired;

    if (profile.transportation === "no_transport") {
      result.score -= 20;
      result.barriers.push({
        type: "transportation",
        severity: "major",
        title: "Transportation Needed",
        detail: "Reliable transportation is essential for most jobs in this field, especially during training.",
        remediation: "Check if your area has workforce transportation programs. Some apprenticeship and training programs provide transportation assistance. Contact your local American Job Center for options."
      });
    } else if (profile.transportation === "no_license" && needsDriving) {
      result.score -= 25;
      result.barriers.push({
        type: "transportation",
        severity: "major",
        title: "Driver's License Required",
        detail: "This occupation requires a valid driver's license. Some roles also require a CDL (Commercial Driver's License).",
        remediation: "Work on obtaining your driver's license as a first step. Some workforce programs offer driver's license assistance. If you have a suspended license, contact legal aid about reinstatement."
      });
      // Remove driving-required contexts
      ["home_health", "ambulance"].forEach(ctx => {
        const idx = result.availableContexts.indexOf(ctx);
        if (idx > -1) {
          result.availableContexts.splice(idx, 1);
          result.blockedContexts.push(ctx);
        }
      });
    } else if (profile.transportation === "public_transit" && needsDriving) {
      result.score -= 10;
      result.warnings.push("This occupation may require driving for some roles. Public transit may limit job site options.");
    } else if (profile.transportation === "own_vehicle_restricted" && needsDriving) {
      result.score -= 10;
      result.warnings.push("A restricted/hardship license may limit your eligibility for roles that require driving as a primary job function.");
    }
  },

  // -----------------------------------------------------------------------
  // PHYSICAL CAPABILITIES CHECK
  // -----------------------------------------------------------------------
  checkPhysical(result, occupation, profile) {
    if (profile.physical === "no_limitations") return;

    const reqs = occupation.physicalRequirements || [];

    let hasConflict = false;
    const conflicts = [];

    if (profile.physical === "sedentary") {
      if (reqs.some(r => ["lifting_50lb", "lifting_100lb", "lifting_30lb", "standing_long", "climbing", "crawling", "heights", "bending"].includes(r))) {
        hasConflict = true;
        conflicts.push("requires physical activity beyond sedentary capacity");
      }
    } else if (profile.physical === "light_duty") {
      if (reqs.some(r => ["lifting_50lb", "lifting_100lb"].includes(r))) {
        hasConflict = true;
        conflicts.push("requires heavy lifting (50+ lbs)");
      }
    } else if (profile.physical === "no_heights") {
      if (reqs.some(r => ["climbing", "heights"].includes(r))) {
        hasConflict = true;
        conflicts.push("involves working at heights");
      }
    } else if (profile.physical === "no_prolonged_standing") {
      if (reqs.includes("standing_long")) {
        hasConflict = true;
        conflicts.push("requires prolonged standing");
      }
    }

    if (hasConflict) {
      result.score -= 25;
      result.barriers.push({
        type: "physical",
        severity: "major",
        title: "Physical Requirements Concern",
        detail: `This occupation ${conflicts.join(" and ")}. This may conflict with your physical capabilities.`,
        remediation: "Discuss accommodations with potential employers — the ADA requires reasonable accommodations. Some roles within this occupation may have lighter physical demands (e.g., inspection, supervision, or training roles). Contact Vocational Rehabilitation for assessment and support."
      });
    }
  },

  // -----------------------------------------------------------------------
  // FINANCIAL CHECK
  // -----------------------------------------------------------------------
  checkFinancial(result, occupation, profile) {
    if (profile.financial === "self_fund") return;

    if (profile.financial === "no_resources") {
      result.score -= 10;
      result.barriers.push({
        type: "financial",
        severity: "actionable",
        title: "Training Funding Needed",
        detail: "This occupation requires training and potentially licensing fees. Fully funded programs are available.",
        remediation: "Apply for WIOA funding through your local American Job Center. Registered apprenticeships pay you while you train. Federal Pell Grants can cover community college programs. Many union apprenticeship programs have no upfront costs."
      });
    } else if (profile.financial === "need_aid") {
      result.score -= 5;
      result.barriers.push({
        type: "financial",
        severity: "minor",
        title: "Financial Aid Available",
        detail: "You may need financial assistance for training and licensing costs.",
        remediation: "Complete the FAFSA for federal aid. Check with your local workforce development board for WIOA funding. Many training programs offer payment plans or scholarships."
      });
    }
  },

  // -----------------------------------------------------------------------
  // STATE POLICY MODIFIERS
  // -----------------------------------------------------------------------
  applyStatePolicy(result, occupation, profile) {
    if (!profile.state) return;
    const state = DATA.statePolicies[profile.state];
    if (!state) return;

    // Fair Chance Licensing benefits
    if (state.fairChanceLicensing && result.barriers.some(b => b.type === "conviction" || b.type === "registry")) {
      result.score += 10;
      result.positives.push(
        `${state.name} has Fair Chance Licensing laws that require licensing boards to conduct individualized assessments rather than applying blanket conviction bans.`
      );
    }

    // Ban the Box benefits
    if (state.banTheBox && profile.conviction !== "none") {
      result.positives.push(
        `${state.name} has Ban the Box laws that delay criminal history inquiries until later in the hiring process, giving you a better chance to be evaluated on your qualifications first.`
      );
    }

    // Certificate of Rehabilitation
    if (state.certificateOfRehab && profile.conviction !== "none") {
      result.recommendations.push(
        `Look into obtaining a Certificate of Rehabilitation in ${state.name}. This can formally demonstrate your rehabilitation and may remove certain licensing barriers.`
      );
    }

    // Expungement
    if (state.expungementAvailable && profile.conviction !== "none") {
      result.recommendations.push(
        "Explore whether your conviction is eligible for expungement or record sealing. This could significantly improve your licensing prospects. Contact a legal aid organization for a free assessment."
      );
    }
  },

  // -----------------------------------------------------------------------
  // EXISTING CREDENTIALS CHECK — reward matching skills
  // -----------------------------------------------------------------------
  checkExistingCredentials(result, occupation, profile) {
    if (!profile.existingCredentials || profile.existingCredentials.length === 0) return;

    const occId = occupation.id;
    const related = occupation.relatedOccupations || [];

    // Direct match
    if (profile.existingCredentials.includes(occId)) {
      result.score += 20;
      result.positives.push(
        "You already have credentials in this field! Your existing training and experience are directly applicable."
      );
      result.recommendations.push(
        "Leverage your existing credentials. Even if some contexts are restricted, your training investment is preserved by focusing on accessible work settings."
      );
    }

    // Related match
    const relatedMatches = profile.existingCredentials.filter(c => related.includes(c));
    if (relatedMatches.length > 0) {
      result.score += 10;
      const matchNames = relatedMatches.map(id => {
        const occ = DATA.occupations.find(o => o.id === id);
        return occ ? occ.name : id;
      });
      result.positives.push(
        `Your credentials in ${matchNames.join(", ")} are related to this occupation. Transferable skills will shorten your training path.`
      );
    }
  },

  // -----------------------------------------------------------------------
  // DETERMINE FINAL STATUS
  // -----------------------------------------------------------------------
  determineFinalStatus(result) {
    const hasBlocker = result.barriers.some(b => b.severity === "blocker");
    const hasMajor = result.barriers.some(b => b.severity === "major");

    if (hasBlocker || result.score <= 10) {
      result.status = "ineligible";
    } else if (result.availableContexts.length === 0) {
      result.status = "ineligible";
    } else if (hasMajor || result.score <= 40) {
      result.status = "restricted";
    } else if (result.barriers.some(b => b.severity === "moderate" || b.severity === "actionable") || result.score <= 65) {
      result.status = "conditional";
    } else {
      result.status = "eligible";
    }
  },

  // -----------------------------------------------------------------------
  // MATCH FINANCIAL RESOURCES
  // -----------------------------------------------------------------------
  matchFinancialResources(result, profile) {
    if (result.status === "ineligible") return;

    const resources = [];

    // WIOA — almost universally available
    resources.push(DATA.financialResources.find(r => r.id === "wioa"));

    // Pell Grants — if citizen or eligible non-citizen
    if (["citizen", "permanent_resident", "asylum_refugee"].includes(profile.immigration)) {
      resources.push(DATA.financialResources.find(r => r.id === "pell"));
    }

    // Apprenticeships — for trades especially
    if (result.occupation.category === "skilled_trade") {
      resources.push(DATA.financialResources.find(r => r.id === "apprenticeship"));
    }

    // Federal Bonding — for justice-involved
    if (profile.conviction !== "none") {
      resources.push(DATA.financialResources.find(r => r.id === "reentry"));
    }

    // Community orgs — always relevant
    resources.push(DATA.financialResources.find(r => r.id === "community"));

    // Financial need specific
    if (profile.financial === "no_resources" || profile.financial === "need_aid") {
      const vr = DATA.financialResources.find(r => r.id === "voc_rehab");
      if (!resources.includes(vr)) resources.push(vr);
    }

    result.financialResources = resources.filter(Boolean);
  },

  // -----------------------------------------------------------------------
  // COMPILE OFFICIAL LINKS
  // -----------------------------------------------------------------------
  compileOfficialLinks(result, occupation, profile) {
    // Add occupation-specific official links
    if (occupation.officialLinks) {
      result.officialLinks = [...occupation.officialLinks];
    }

    // Add state licensing directory link
    if (profile.state && DATA.licensingDirectories[occupation.id]) {
      const dir = DATA.licensingDirectories[occupation.id];
      result.stateLicensingLink = {
        ...dir,
        label: `${dir.label} (${DATA.statePolicies[profile.state]?.name || profile.state})`
      };
    }
  },

  // -----------------------------------------------------------------------
  // WAGE DATA CALCULATION
  // -----------------------------------------------------------------------
  calculateWageData(result, occupation, profile) {
    const wageData = DATA.occupationWages[occupation.id];
    if (!wageData) return;

    const stateMultiplier = profile.state ? (DATA.stateWageMultipliers[profile.state] || 1.0) : 1.0;
    const stateName = profile.state ? DATA.statePolicies[profile.state]?.name : null;

    // State-adjusted wages
    const stateMedian = Math.round(wageData.nationalMedian * stateMultiplier);
    const stateP10   = Math.round(wageData.p10 * stateMultiplier);
    const stateP25   = Math.round(wageData.p25 * stateMultiplier);
    const stateP75   = Math.round(wageData.p75 * stateMultiplier);
    const stateP90   = Math.round(wageData.p90 * stateMultiplier);

    // 2-year wage projection from historical CAGR
    const cagr = wageData.cagr5yr;
    const projectedMedian     = Math.round(stateMedian * Math.pow(1 + cagr, 2));
    const projectedIncrease   = projectedMedian - stateMedian;
    const projectedPctIncrease = ((Math.pow(1 + cagr, 2) - 1) * 100).toFixed(1);

    // Hourly equivalents (2,080 hrs/yr)
    const hourlyMedian    = (stateMedian / 2080).toFixed(2);
    const hourlyProjected = (projectedMedian / 2080).toFixed(2);

    // -----------------------------------------------------------------------
    // ANTHROPIC ECONOMIC INDEX — AI EXPOSURE METRICS
    // Source: Massenkoff & McCrory (2026), "The Anthropic Economic Index:
    //   Measuring AI's Labor Market Impacts"
    //   https://www.anthropic.com/research/labor-market-impacts
    //
    // "Observed exposure" combines O*NET task taxonomy with real-world
    // Claude usage patterns. Key finding: for every 10pp increase in
    // observed AI task coverage, BLS employment growth projections
    // drop by 0.6 percentage points.
    //
    // Benchmarks (high-exposure occupations from the paper):
    //   Computer Programmers: ~75% task coverage
    //   Data Entry Keyers:    ~67%
    //   Financial Analysts:   ~45%
    //   Customer Service:     ~37%
    //   Avg. office/admin:    ~28% (actual) vs ~90% (theoretical)
    //
    // Our occupations: 0–8% observed coverage (most are near zero).
    // -----------------------------------------------------------------------
    const BENCHMARK_COVERAGE = 0.37;   // Customer service reps — a concrete example users can relate to
    const BLS_COEFF_PER_10PP = 0.006;  // 0.6pp BLS growth drop per 10pp coverage increase

    const coverage    = wageData.aiTaskCoverage ?? null;
    const theoretical = wageData.theoreticalExposure ?? null;
    let aiExposure    = null;

    if (coverage !== null) {
      const coverageDiff = BENCHMARK_COVERAGE - coverage;              // >0 = advantage
      const blsGrowthAdv = (coverageDiff / 0.10) * BLS_COEFF_PER_10PP; // pp advantage

      // The gap between theoretical and observed shows adoption lag
      const adoptionGap  = theoretical !== null ? theoretical - coverage : null;

      // Resilience tier based on observed coverage
      let riskTier, riskColor;
      if      (coverage <= 0.02) { riskTier = "Very Low";  riskColor = "very-low"; }
      else if (coverage <= 0.05) { riskTier = "Low";       riskColor = "low"; }
      else if (coverage <= 0.10) { riskTier = "Moderate";  riskColor = "moderate"; }
      else                       { riskTier = "Higher";    riskColor = "higher"; }

      aiExposure = {
        coverage:            coverage,
        coveragePct:         (coverage * 100).toFixed(0),
        theoretical:         theoretical,
        theoreticalPct:      theoretical !== null ? (theoretical * 100).toFixed(0) : null,
        adoptionGap:         adoptionGap,
        adoptionGapPct:      adoptionGap !== null ? (adoptionGap * 100).toFixed(0) : null,
        benchmarkCoverage:   BENCHMARK_COVERAGE,
        benchmarkPct:        (BENCHMARK_COVERAGE * 100).toFixed(0),
        blsGrowthAdvPp:      (blsGrowthAdv * 100).toFixed(1),  // in percentage points
        riskTier:            riskTier,
        riskColor:           riskColor,
        dominantTaskTypes:   wageData.dominantTaskTypes ?? [],
        blsJobGrowth10yr:    wageData.blsJobGrowth10yr ?? null,
        blsGrowthPct:        wageData.blsJobGrowth10yr != null
                               ? (wageData.blsJobGrowth10yr * 100).toFixed(0)
                               : null
      };
    }

    result.wageData = {
      soc: wageData.soc,
      stateName, stateCode: profile.state,
      nationalMedian: wageData.nationalMedian,
      stateMedian, stateP10, stateP25, stateP75, stateP90,
      hourlyMedian, hourlyProjected,
      cagr5yr: cagr,
      cagrPct: (cagr * 100).toFixed(1),
      projectedMedian, projectedIncrease, projectedPctIncrease,
      onetUrl: wageData.onetUrl,
      blsOesUrl: `https://www.bls.gov/oes/current/oes${wageData.soc.replace('-', '')}.htm`,
      dataSource: "BLS Occupational Employment & Wage Statistics (May 2024)",
      isEstimate: stateMultiplier !== 1.0,
      aiExposure
    };
  },

  // -----------------------------------------------------------------------
  // UTILITY FUNCTIONS
  // -----------------------------------------------------------------------
  timeToYears(timeCode) {
    const map = { na: 0, less_1: 0.5, "1_3": 2, "3_5": 4, "5_7": 6, "7_10": 8.5, over_10: 12 };
    return map[timeCode] || 0;
  },

  getContextLabel(contextId) {
    return DATA.workContexts[contextId]?.label || contextId;
  },

  /**
   * Get a summary of state policies relevant to justice-involved individuals
   */
  getStateSummary(stateCode) {
    const state = DATA.statePolicies[stateCode];
    if (!state) return null;

    const policies = [];
    if (state.banTheBox) policies.push("Ban the Box (delays criminal history inquiries)");
    if (state.fairChanceLicensing) policies.push("Fair Chance Licensing (individualized assessment for licenses)");
    if (state.individualAssessment) policies.push("Requires individualized assessment for licensing decisions");
    if (state.certificateOfRehab) policies.push("Certificate of Rehabilitation available");
    if (state.expungementAvailable) policies.push("Expungement/record sealing available for some convictions");
    if (state.marijuanaLegal) policies.push("Recreational marijuana is legal");

    return {
      name: state.name,
      policies: policies,
      favorability: policies.length >= 4 ? "favorable" : policies.length >= 2 ? "moderate" : "limited",
      summary: policies.length >= 4
        ? `${state.name} has strong Fair Chance protections for job seekers with conviction histories.`
        : policies.length >= 2
          ? `${state.name} has some Fair Chance protections. Individual circumstances will matter.`
          : `${state.name} has limited Fair Chance protections. Conviction history may be a larger factor in licensing decisions.`
    };
  }
};

if (typeof module !== 'undefined' && module.exports) {
  module.exports = Engine;
}
