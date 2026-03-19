// ============================================================================
// WORKFORCE PATHWAYS — DATA LAYER
// Occupations, state regulatory rules, barrier definitions, Fair Chance policies
// ============================================================================

const DATA = {

  // -------------------------------------------------------------------------
  // OCCUPATION CATALOG
  // -------------------------------------------------------------------------
  occupations: [
    // === SKILLED TRADES ===
    {
      id: "electrician",
      name: "Electrician",
      category: "skilled_trade",
      description: "Install, maintain, and repair electrical systems in buildings and structures.",
      demandLevel: "very_high",
      medianSalary: "$61,500",
      trainingPath: "Apprenticeship (4–5 yrs) → Journeyman License → Master Electrician",
      typicalDuration: "4–5 years",
      educationMin: "ged",
      physicalRequirements: ["lifting_50lb", "climbing", "standing_long"],
      drugScreenRequired: true,
      workContexts: ["residential", "commercial", "industrial", "government"],
      licensureRequired: true,
      relatedOccupations: ["solar_installer", "hvac_tech"],
      keywords: ["wiring", "circuits", "electrical panels", "conduit"],
      officialLinks: [
        { label: "Apprenticeship Finder (DOL)", url: "https://www.apprenticeship.gov/apprenticeship-job-finder", gov: true },
        { label: "IBEW Apprenticeships", url: "https://www.ibew.org/IBEW/Your-IBEW/Apprenticeship", gov: false, note: "International Brotherhood of Electrical Workers — union apprenticeship programs" },
        { label: "O*NET: Electricians", url: "https://www.onetonline.org/link/summary/47-2111.00", gov: true },
        { label: "BLS Occupational Outlook: Electricians", url: "https://www.bls.gov/ooh/construction-and-extraction/electricians.htm", gov: true },
        { label: "OSHA Electrical Safety Standards", url: "https://www.osha.gov/electrical", gov: true }
      ]
    },
    {
      id: "plumber",
      name: "Plumber",
      category: "skilled_trade",
      description: "Install and repair piping systems for water, gas, and drainage.",
      demandLevel: "very_high",
      medianSalary: "$60,000",
      trainingPath: "Apprenticeship (4–5 yrs) → Journeyman License → Master Plumber",
      typicalDuration: "4–5 years",
      educationMin: "ged",
      physicalRequirements: ["lifting_50lb", "crawling", "standing_long"],
      drugScreenRequired: true,
      workContexts: ["residential", "commercial", "industrial", "government"],
      licensureRequired: true,
      relatedOccupations: ["pipefitter", "hvac_tech"],
      keywords: ["pipes", "fixtures", "drainage", "water systems"],
      officialLinks: [
        { label: "Apprenticeship Finder (DOL)", url: "https://www.apprenticeship.gov/apprenticeship-job-finder", gov: true },
        { label: "UA Apprenticeships", url: "https://www.ua.org/apprenticeship", gov: false, note: "United Association of Plumbers & Pipefitters — union apprenticeship programs" },
        { label: "O*NET: Plumbers", url: "https://www.onetonline.org/link/summary/47-2152.00", gov: true },
        { label: "BLS Occupational Outlook: Plumbers", url: "https://www.bls.gov/ooh/construction-and-extraction/plumbers-pipefitters-and-steamfitters.htm", gov: true }
      ]
    },
    {
      id: "hvac_tech",
      name: "HVAC Technician",
      category: "skilled_trade",
      description: "Install, maintain, and repair heating, ventilation, air conditioning, and refrigeration systems.",
      demandLevel: "very_high",
      medianSalary: "$55,000",
      trainingPath: "Trade school or apprenticeship (2–4 yrs) → EPA 608 Certification → State license",
      typicalDuration: "2–4 years",
      educationMin: "ged",
      physicalRequirements: ["lifting_50lb", "climbing", "standing_long"],
      drugScreenRequired: true,
      workContexts: ["residential", "commercial", "industrial"],
      licensureRequired: true,
      relatedOccupations: ["electrician", "refrigeration_tech"],
      keywords: ["heating", "cooling", "refrigerant", "ductwork"],
      officialLinks: [
        { label: "EPA Section 608 Certification", url: "https://www.epa.gov/section608", gov: true },
        { label: "Apprenticeship Finder (DOL)", url: "https://www.apprenticeship.gov/apprenticeship-job-finder", gov: true },
        { label: "O*NET: HVAC Mechanics", url: "https://www.onetonline.org/link/summary/49-9021.00", gov: true },
        { label: "BLS Occupational Outlook: HVAC", url: "https://www.bls.gov/ooh/installation-maintenance-and-repair/heating-air-conditioning-and-refrigeration-mechanics-and-installers.htm", gov: true },
        { label: "HVAC Excellence Certification", url: "https://www.escogroup.org/", gov: false, note: "Industry certification body — not a .gov site" }
      ]
    },
    {
      id: "welder",
      name: "Welder",
      category: "skilled_trade",
      description: "Join metal parts using heat and filler materials. Specializations include MIG, TIG, stick, and pipe welding.",
      demandLevel: "high",
      medianSalary: "$48,000",
      trainingPath: "Trade school (6–18 months) → AWS Certification → Specialty certs",
      typicalDuration: "6–18 months",
      educationMin: "ged",
      physicalRequirements: ["lifting_50lb", "standing_long", "heat_tolerance"],
      drugScreenRequired: true,
      workContexts: ["commercial", "industrial", "government"],
      licensureRequired: false,
      certificationRequired: true,
      relatedOccupations: ["pipefitter", "ironworker"],
      keywords: ["welding", "fabrication", "metal", "MIG", "TIG"],
      officialLinks: [
        { label: "AWS Certification (American Welding Society)", url: "https://www.aws.org/certification", gov: false, note: "Industry standard certification body — not a .gov site" },
        { label: "O*NET: Welders", url: "https://www.onetonline.org/link/summary/51-4121.00", gov: true },
        { label: "BLS Occupational Outlook: Welders", url: "https://www.bls.gov/ooh/production/welders-cutters-solderers-and-brazers.htm", gov: true },
        { label: "Apprenticeship Finder (DOL)", url: "https://www.apprenticeship.gov/apprenticeship-job-finder", gov: true },
        { label: "OSHA Welding Safety", url: "https://www.osha.gov/welding-cutting-brazing", gov: true }
      ]
    },
    {
      id: "carpenter",
      name: "Carpenter",
      category: "skilled_trade",
      description: "Build, install, and repair structures and fixtures made of wood and other materials.",
      demandLevel: "high",
      medianSalary: "$52,000",
      trainingPath: "Apprenticeship (3–4 yrs) or trade school → Journeyman status",
      typicalDuration: "3–4 years",
      educationMin: "ged",
      physicalRequirements: ["lifting_50lb", "climbing", "standing_long"],
      drugScreenRequired: true,
      workContexts: ["residential", "commercial", "industrial"],
      licensureRequired: false,
      certificationRequired: false,
      relatedOccupations: ["cabinet_maker", "construction_manager"],
      keywords: ["framing", "trim", "woodwork", "construction"],
      officialLinks: [
        { label: "UBC Apprenticeships", url: "https://www.carpenters.org/apprenticeship-and-training/", gov: false, note: "United Brotherhood of Carpenters — union training programs" },
        { label: "Apprenticeship Finder (DOL)", url: "https://www.apprenticeship.gov/apprenticeship-job-finder", gov: true },
        { label: "O*NET: Carpenters", url: "https://www.onetonline.org/link/summary/47-2031.00", gov: true },
        { label: "BLS Occupational Outlook: Carpenters", url: "https://www.bls.gov/ooh/construction-and-extraction/carpenters.htm", gov: true }
      ]
    },
    {
      id: "heavy_equipment_operator",
      name: "Heavy Equipment Operator",
      category: "skilled_trade",
      description: "Operate bulldozers, excavators, cranes, and other heavy machinery for construction and earthmoving.",
      demandLevel: "high",
      medianSalary: "$53,000",
      trainingPath: "Training program (3–6 months) → NCCCO or state certification → CDL if needed",
      typicalDuration: "3–6 months",
      educationMin: "ged",
      physicalRequirements: ["lifting_30lb", "sitting_long", "good_vision"],
      drugScreenRequired: true,
      workContexts: ["commercial", "industrial", "government"],
      licensureRequired: false,
      certificationRequired: true,
      cdlRequired: "often",
      relatedOccupations: ["diesel_mechanic", "construction_laborer"],
      keywords: ["excavator", "bulldozer", "crane", "earthmoving"],
      officialLinks: [
        { label: "NCCCO Certification", url: "https://www.nccco.org/", gov: false, note: "National Commission for the Certification of Crane Operators — industry standard" },
        { label: "FMCSA CDL Requirements", url: "https://www.fmcsa.dot.gov/registration/commercial-drivers-license", gov: true },
        { label: "O*NET: Operating Engineers", url: "https://www.onetonline.org/link/summary/47-2073.00", gov: true },
        { label: "BLS Occupational Outlook: Construction Equipment Operators", url: "https://www.bls.gov/ooh/construction-and-extraction/construction-equipment-operators.htm", gov: true },
        { label: "IUOE Training Programs", url: "https://www.iuoe.org/training", gov: false, note: "International Union of Operating Engineers — union training" }
      ]
    },
    {
      id: "diesel_mechanic",
      name: "Diesel Mechanic / Technician",
      category: "skilled_trade",
      description: "Diagnose, repair, and maintain diesel engines in trucks, buses, heavy equipment, and generators.",
      demandLevel: "high",
      medianSalary: "$55,000",
      trainingPath: "Trade school (1–2 yrs) → ASE Diesel Certification → Specializations",
      typicalDuration: "1–2 years",
      educationMin: "ged",
      physicalRequirements: ["lifting_50lb", "standing_long", "manual_dexterity"],
      drugScreenRequired: true,
      workContexts: ["commercial", "industrial"],
      licensureRequired: false,
      certificationRequired: true,
      relatedOccupations: ["heavy_equipment_operator", "auto_mechanic"],
      keywords: ["diesel", "trucks", "engines", "diagnostics"],
      officialLinks: [
        { label: "ASE Certification", url: "https://www.ase.com/getting-ase-certified", gov: false, note: "National Institute for Automotive Service Excellence — industry standard certification" },
        { label: "O*NET: Diesel Mechanics", url: "https://www.onetonline.org/link/summary/49-3031.00", gov: true },
        { label: "BLS Occupational Outlook: Diesel Technicians", url: "https://www.bls.gov/ooh/installation-maintenance-and-repair/diesel-service-technicians-and-mechanics.htm", gov: true },
        { label: "Apprenticeship Finder (DOL)", url: "https://www.apprenticeship.gov/apprenticeship-job-finder", gov: true }
      ]
    },
    {
      id: "solar_installer",
      name: "Solar Panel Installer",
      category: "skilled_trade",
      description: "Install, maintain, and repair photovoltaic solar energy systems on rooftops and ground mounts.",
      demandLevel: "very_high",
      medianSalary: "$47,000",
      trainingPath: "Training program (3–12 months) → NABCEP Certification → State electrical license (some states)",
      typicalDuration: "3–12 months",
      educationMin: "ged",
      physicalRequirements: ["lifting_50lb", "climbing", "heights", "standing_long"],
      drugScreenRequired: true,
      workContexts: ["residential", "commercial", "industrial"],
      licensureRequired: false,
      certificationRequired: true,
      relatedOccupations: ["electrician", "roofer"],
      keywords: ["solar", "photovoltaic", "renewable", "panels"],
      officialLinks: [
        { label: "NABCEP Certification", url: "https://www.nabcep.org/certifications/", gov: false, note: "North American Board of Certified Energy Practitioners — industry standard" },
        { label: "DOE Solar Energy Technologies Office", url: "https://www.energy.gov/eere/solar/solar-energy-technologies-office", gov: true },
        { label: "O*NET: Solar PV Installers", url: "https://www.onetonline.org/link/summary/47-2231.00", gov: true },
        { label: "BLS Occupational Outlook: Solar Installers", url: "https://www.bls.gov/ooh/construction-and-extraction/solar-photovoltaic-installers.htm", gov: true },
        { label: "Interstate Renewable Energy Council", url: "https://irecusa.org/workforce-development/", gov: false, note: "Workforce development resources for clean energy — nonprofit" }
      ]
    },

    // === HEALTHCARE ===
    {
      id: "cna",
      name: "Certified Nursing Assistant (CNA)",
      category: "healthcare",
      description: "Provide basic patient care under the supervision of nursing staff in hospitals, nursing homes, and clinics.",
      demandLevel: "very_high",
      medianSalary: "$35,000",
      trainingPath: "State-approved CNA program (4–12 weeks) → State certification exam",
      typicalDuration: "4–12 weeks",
      educationMin: "ged",
      physicalRequirements: ["lifting_50lb", "standing_long", "bending"],
      drugScreenRequired: true,
      backgroundCheckLevel: "enhanced",
      workContexts: ["hospital", "nursing_home", "home_health", "clinic"],
      licensureRequired: true,
      vulnerablePopulationContact: true,
      relatedOccupations: ["lpn", "medical_assistant", "home_health_aide"],
      keywords: ["patient care", "nursing", "vitals", "bathing"],
      officialLinks: [
        { label: "CMS Nurse Aide Training Requirements", url: "https://www.cms.gov/medicare/health-safety-standards/quality-safety-oversight-general-information/nursing-homes/nurse-aide-training", gov: true },
        { label: "O*NET: Nursing Assistants", url: "https://www.onetonline.org/link/summary/31-1131.00", gov: true },
        { label: "BLS Occupational Outlook: Nursing Assistants", url: "https://www.bls.gov/ooh/healthcare/nursing-assistants.htm", gov: true },
        { label: "National Nurse Aide Assessment Program", url: "https://www.nnaap.com/", gov: false, note: "Certification exam — not a .gov site" },
        { label: "Find Training Programs (CareerOneStop)", url: "https://www.careeronestop.org/Toolkit/Training/find-training.aspx", gov: true }
      ]
    },
    {
      id: "lpn",
      name: "Licensed Practical Nurse (LPN / LVN)",
      category: "healthcare",
      description: "Provide basic nursing care including wound care, medication administration, and patient monitoring.",
      demandLevel: "very_high",
      medianSalary: "$54,000",
      trainingPath: "LPN program (12–18 months) → NCLEX-PN exam → State license",
      typicalDuration: "12–18 months",
      educationMin: "diploma",
      physicalRequirements: ["lifting_50lb", "standing_long", "manual_dexterity"],
      drugScreenRequired: true,
      backgroundCheckLevel: "enhanced",
      workContexts: ["hospital", "nursing_home", "home_health", "clinic", "school"],
      licensureRequired: true,
      vulnerablePopulationContact: true,
      relatedOccupations: ["cna", "rn"],
      keywords: ["nursing", "medications", "wound care", "patient care"],
      officialLinks: [
        { label: "NCSBN NCLEX-PN Exam Info", url: "https://www.ncsbn.org/nclex.page", gov: false, note: "National Council of State Boards of Nursing — manages the licensing exam" },
        { label: "Find Your State Board of Nursing", url: "https://www.ncsbn.org/contact/boards-of-nursing.page", gov: false, note: "Directory of all state nursing boards — links to .gov sites per state" },
        { label: "O*NET: Licensed Practical Nurses", url: "https://www.onetonline.org/link/summary/29-2061.00", gov: true },
        { label: "BLS Occupational Outlook: LPNs", url: "https://www.bls.gov/ooh/healthcare/licensed-practical-and-licensed-vocational-nurses.htm", gov: true },
        { label: "HRSA Nursing Workforce Programs", url: "https://www.hrsa.gov/grants/find-funding?status=All&bureau=702", gov: true }
      ]
    },
    {
      id: "phlebotomist",
      name: "Phlebotomist",
      category: "healthcare",
      description: "Draw blood samples from patients for lab testing, transfusions, donations, and research.",
      demandLevel: "high",
      medianSalary: "$40,000",
      trainingPath: "Phlebotomy program (4–8 months) → National certification (NHA or ASCP)",
      typicalDuration: "4–8 months",
      educationMin: "ged",
      physicalRequirements: ["standing_long", "manual_dexterity"],
      drugScreenRequired: true,
      backgroundCheckLevel: "standard",
      workContexts: ["hospital", "clinic", "lab", "blood_bank"],
      licensureRequired: false,
      certificationRequired: true,
      vulnerablePopulationContact: true,
      relatedOccupations: ["medical_assistant", "lab_tech"],
      keywords: ["blood draw", "venipuncture", "specimens", "lab"],
      officialLinks: [
        { label: "NHA Phlebotomy Certification (CPT)", url: "https://www.nhanow.com/certifications/phlebotomy-technician", gov: false, note: "National Healthcareer Association — industry certification" },
        { label: "ASCP Phlebotomy Certification", url: "https://www.ascp.org/content/board-of-certification/get-credentialed", gov: false, note: "American Society for Clinical Pathology — gold-standard certification" },
        { label: "O*NET: Phlebotomists", url: "https://www.onetonline.org/link/summary/31-9097.00", gov: true },
        { label: "BLS Occupational Outlook: Phlebotomists", url: "https://www.bls.gov/ooh/healthcare/phlebotomists.htm", gov: true },
        { label: "Find Training Programs (CareerOneStop)", url: "https://www.careeronestop.org/Toolkit/Training/find-training.aspx", gov: true }
      ]
    },
    {
      id: "medical_assistant",
      name: "Medical Assistant",
      category: "healthcare",
      description: "Perform clinical and administrative tasks in physician offices, clinics, and outpatient facilities.",
      demandLevel: "very_high",
      medianSalary: "$42,000",
      trainingPath: "MA program (9–12 months) → CMA or RMA certification",
      typicalDuration: "9–12 months",
      educationMin: "ged",
      physicalRequirements: ["standing_long", "manual_dexterity"],
      drugScreenRequired: true,
      backgroundCheckLevel: "standard",
      workContexts: ["clinic", "hospital", "urgent_care"],
      licensureRequired: false,
      certificationRequired: true,
      vulnerablePopulationContact: true,
      relatedOccupations: ["phlebotomist", "lpn"],
      keywords: ["clinical", "administrative", "EHR", "vitals"],
      officialLinks: [
        { label: "AAMA CMA Certification", url: "https://www.aama-ntl.org/cma-aama-exam/about", gov: false, note: "American Association of Medical Assistants — CMA exam" },
        { label: "AMT RMA Certification", url: "https://www.americanmedtech.org/Get-Certified/RMA", gov: false, note: "American Medical Technologists — RMA exam" },
        { label: "O*NET: Medical Assistants", url: "https://www.onetonline.org/link/summary/31-9092.00", gov: true },
        { label: "BLS Occupational Outlook: Medical Assistants", url: "https://www.bls.gov/ooh/healthcare/medical-assistants.htm", gov: true },
        { label: "Find Training Programs (CareerOneStop)", url: "https://www.careeronestop.org/Toolkit/Training/find-training.aspx", gov: true }
      ]
    },
    {
      id: "emt",
      name: "EMT / Paramedic",
      category: "healthcare",
      description: "Provide emergency medical care and transport patients. EMT-Basic → Advanced EMT → Paramedic progression.",
      demandLevel: "high",
      medianSalary: "$38,000 (EMT) / $52,000 (Paramedic)",
      trainingPath: "EMT-B (3–6 months) → AEMT (6 months) → Paramedic (1–2 yrs) → NREMT certification",
      typicalDuration: "3 months – 2 years",
      educationMin: "ged",
      physicalRequirements: ["lifting_100lb", "standing_long", "stress_tolerance"],
      drugScreenRequired: true,
      backgroundCheckLevel: "enhanced",
      drivingRecordRequired: true,
      workContexts: ["ambulance", "fire_dept", "hospital_er", "industrial"],
      licensureRequired: true,
      vulnerablePopulationContact: true,
      relatedOccupations: ["firefighter", "lpn"],
      keywords: ["emergency", "ambulance", "trauma", "first responder"],
      officialLinks: [
        { label: "NREMT Certification", url: "https://www.nremt.org/", gov: false, note: "National Registry of Emergency Medical Technicians — national certification" },
        { label: "NHTSA EMS Resources", url: "https://www.ems.gov/education-and-workforce-development", gov: true },
        { label: "O*NET: EMTs and Paramedics", url: "https://www.onetonline.org/link/summary/29-2040.00", gov: true },
        { label: "BLS Occupational Outlook: EMTs", url: "https://www.bls.gov/ooh/healthcare/emts-and-paramedics.htm", gov: true },
        { label: "Find Training Programs (CareerOneStop)", url: "https://www.careeronestop.org/Toolkit/Training/find-training.aspx", gov: true }
      ]
    },
    {
      id: "surgical_tech",
      name: "Surgical Technologist",
      category: "healthcare",
      description: "Assist in surgical operations by preparing operating rooms, sterilizing equipment, and passing instruments.",
      demandLevel: "high",
      medianSalary: "$57,000",
      trainingPath: "Surgical tech program (12–24 months) → CST certification",
      typicalDuration: "12–24 months",
      educationMin: "diploma",
      physicalRequirements: ["standing_long", "manual_dexterity", "stress_tolerance"],
      drugScreenRequired: true,
      backgroundCheckLevel: "enhanced",
      workContexts: ["hospital", "surgery_center"],
      licensureRequired: false,
      certificationRequired: true,
      vulnerablePopulationContact: true,
      relatedOccupations: ["cna", "medical_assistant"],
      keywords: ["surgery", "operating room", "sterile", "instruments"],
      officialLinks: [
        { label: "NBSTSA CST Certification", url: "https://www.nbstsa.org/", gov: false, note: "National Board of Surgical Technology and Surgical Assisting — certification body" },
        { label: "CAAHEP Accredited Programs", url: "https://www.caahep.org/students/find-a-program.aspx", gov: false, note: "Commission on Accreditation of Allied Health Education Programs — find accredited programs" },
        { label: "O*NET: Surgical Technologists", url: "https://www.onetonline.org/link/summary/29-2055.00", gov: true },
        { label: "BLS Occupational Outlook: Surgical Technologists", url: "https://www.bls.gov/ooh/healthcare/surgical-technologists.htm", gov: true }
      ]
    },
    {
      id: "home_health_aide",
      name: "Home Health Aide (HHA)",
      category: "healthcare",
      description: "Provide personal care and basic health services to patients in their homes.",
      demandLevel: "very_high",
      medianSalary: "$33,000",
      trainingPath: "HHA training program (75+ hrs) → State certification or registration",
      typicalDuration: "2–4 weeks",
      educationMin: "none",
      physicalRequirements: ["lifting_50lb", "standing_long", "bending"],
      drugScreenRequired: true,
      backgroundCheckLevel: "enhanced",
      workContexts: ["home_health"],
      licensureRequired: false,
      certificationRequired: true,
      vulnerablePopulationContact: true,
      drivingRequired: true,
      relatedOccupations: ["cna", "personal_care_aide"],
      keywords: ["home care", "personal care", "elderly", "disabled"],
      officialLinks: [
        { label: "CMS Home Health Aide Requirements", url: "https://www.cms.gov/medicare/health-safety-standards/quality-safety-oversight-general-information/home-health-agencies", gov: true },
        { label: "O*NET: Home Health Aides", url: "https://www.onetonline.org/link/summary/31-1121.00", gov: true },
        { label: "BLS Occupational Outlook: Home Health Aides", url: "https://www.bls.gov/ooh/healthcare/home-health-aides-and-personal-care-aides.htm", gov: true },
        { label: "PHI National (Workforce Solutions)", url: "https://www.phinational.org/", gov: false, note: "Leading nonprofit for direct care workforce — training resources and policy advocacy" },
        { label: "Find Training Programs (CareerOneStop)", url: "https://www.careeronestop.org/Toolkit/Training/find-training.aspx", gov: true }
      ]
    },
    {
      id: "dental_assistant",
      name: "Dental Assistant",
      category: "healthcare",
      description: "Assist dentists during procedures, take X-rays, manage patient records, and prepare treatment areas.",
      demandLevel: "high",
      medianSalary: "$44,000",
      trainingPath: "Dental assistant program (9–12 months) → CDA certification (optional in some states) → X-ray license",
      typicalDuration: "9–12 months",
      educationMin: "ged",
      physicalRequirements: ["manual_dexterity", "standing_long"],
      drugScreenRequired: true,
      backgroundCheckLevel: "standard",
      workContexts: ["dental_office", "clinic", "hospital"],
      licensureRequired: false,
      certificationRequired: true,
      vulnerablePopulationContact: true,
      relatedOccupations: ["medical_assistant", "dental_hygienist"],
      keywords: ["dental", "x-ray", "chairside", "oral health"],
      officialLinks: [
        { label: "DANB CDA Certification", url: "https://www.danb.org/become-certified/exams-and-certifications/cda.aspx", gov: false, note: "Dental Assisting National Board — national certification" },
        { label: "CODA Accredited Programs", url: "https://www.ada.org/resources/education/accreditation/find-a-program", gov: false, note: "Commission on Dental Accreditation (American Dental Association) — find accredited programs" },
        { label: "O*NET: Dental Assistants", url: "https://www.onetonline.org/link/summary/31-9091.00", gov: true },
        { label: "BLS Occupational Outlook: Dental Assistants", url: "https://www.bls.gov/ooh/healthcare/dental-assistants.htm", gov: true },
        { label: "Find Training Programs (CareerOneStop)", url: "https://www.careeronestop.org/Toolkit/Training/find-training.aspx", gov: true }
      ]
    },

    // === CONSTRUCTION & MANUFACTURING ===
    {
      id: "ironworker",
      name: "Ironworker (Structural Steel)",
      category: "skilled_trade",
      description: "Position and secure steel beams, columns, and other structural components in buildings, bridges, and infrastructure projects.",
      demandLevel: "very_high",
      medianSalary: "$64,200",
      trainingPath: "Apprenticeship (4 yrs) → Ironworkers union membership (optional)",
      typicalDuration: "4 years",
      educationMin: "ged",
      physicalRequirements: ["lifting_100lb", "climbing", "heights", "standing_long"],
      drugScreenRequired: true,
      workContexts: ["commercial", "industrial", "infrastructure"],
      licensureRequired: false,
      relatedOccupations: ["carpenter", "welder", "heavy_equipment_operator"],
      keywords: ["structural steel", "reinforcement", "ironwork", "rigging"],
      officialLinks: [
        { label: "Ironworkers Union Local Directory", url: "https://www.ironworkers.org/", gov: false, note: "International Association of Bridge, Structural, Ornamental and Reinforcing Iron Workers" },
        { label: "Apprenticeship Finder (DOL)", url: "https://www.apprenticeship.gov/apprenticeship-job-finder", gov: true },
        { label: "O*NET: Ironworkers", url: "https://www.onetonline.org/link/summary/47-2171.00", gov: true },
        { label: "BLS Occupational Outlook: Ironworkers", url: "https://www.bls.gov/ooh/construction-and-extraction/ironworkers.htm", gov: true },
        { label: "OSHA Fall Protection Standards", url: "https://www.osha.gov/fall-protection", gov: true }
      ]
    },
    {
      id: "sheet_metal_worker",
      name: "Sheet Metal Worker",
      category: "skilled_trade",
      description: "Fabricate, assemble, and install sheet metal parts and products used in heating, cooling, ventilation, air conditioning, and construction.",
      demandLevel: "high",
      medianSalary: "$57,400",
      trainingPath: "Apprenticeship (4–5 yrs) → Sheet Metal Workers union (optional)",
      typicalDuration: "4–5 years",
      educationMin: "ged",
      physicalRequirements: ["manual_dexterity", "lifting_50lb", "standing_long"],
      drugScreenRequired: true,
      workContexts: ["commercial", "industrial", "residential"],
      licensureRequired: false,
      relatedOccupations: ["hvac_tech", "welder"],
      keywords: ["sheet metal", "fabrication", "HVAC ductwork", "installation"],
      officialLinks: [
        { label: "Sheet Metal Workers International Association", url: "https://www.smwia.org/", gov: false, note: "Union apprenticeships and training" },
        { label: "Apprenticeship Finder (DOL)", url: "https://www.apprenticeship.gov/apprenticeship-job-finder", gov: true },
        { label: "O*NET: Sheet Metal Workers", url: "https://www.onetonline.org/link/summary/51-2121.00", gov: true },
        { label: "BLS Occupational Outlook", url: "https://www.bls.gov/ooh/production/sheet-metal-workers.htm", gov: true }
      ]
    },

    // === HOSPITALITY & LEISURE SERVICES ===
    {
      id: "executive_chef",
      name: "Executive Chef / Head Chef",
      category: "hospitality",
      description: "Plan and prepare menus, supervise kitchen staff, manage food costs and inventory, and ensure quality and safety in food preparation.",
      demandLevel: "high",
      medianSalary: "$58,700",
      trainingPath: "Culinary school (2–4 yrs) + on-the-job experience (3–5 yrs) → Executive Chef role",
      typicalDuration: "5–9 years total",
      educationMin: "diploma",
      physicalRequirements: ["standing_long", "heat_exposure", "fast_paced"],
      drugScreenRequired: true,
      backgroundCheckLevel: "standard",
      workContexts: ["fine_dining", "casual_restaurant", "institutional", "corporate"],
      licensureRequired: false,
      certificationRequired: false,
      relatedOccupations: ["line_cook", "food_service_manager"],
      keywords: ["culinary", "menu planning", "kitchen management", "food safety"],
      officialLinks: [
        { label: "Culinary Institute of America", url: "https://www.ciachef.edu/", gov: false, note: "Premier culinary education and apprenticeships" },
        { label: "SerSafe Food Handler Certification", url: "https://www.servsafe.com/", gov: false, note: "Food safety certification (most states require for food handlers)" },
        { label: "O*NET: Executive Chefs", url: "https://www.onetonline.org/link/summary/35-1011.00", gov: true },
        { label: "BLS Occupational Outlook: Chefs & Head Cooks", url: "https://www.bls.gov/ooh/food-preparation-and-serving/chefs-and-head-cooks.htm", gov: true }
      ]
    },
    {
      id: "security_officer",
      name: "Security Officer (Unarmed / Armed)",
      category: "service",
      description: "Monitor premises to prevent theft, unauthorized entry, or other violations. Enforce rules and detain violators. Armed security requires federal firearms permit.",
      demandLevel: "high",
      medianSalary: "$36,400",
      trainingPath: "Security training course (varies: 20–120 hrs) → State security license → Armed permit (if applicable)",
      typicalDuration: "2–6 weeks + ongoing renewal",
      educationMin: "ged",
      physicalRequirements: ["standing_long", "walking"],
      drugScreenRequired: true,
      backgroundCheckLevel: "extensive",
      workContexts: ["unarmed_security", "armed_security"],
      licensureRequired: true,
      relatedOccupations: ["police_officer", "loss_prevention"],
      keywords: ["security license", "armed security", "facility monitoring", "loss prevention"],
      officialLinks: [
        { label: "ASIS International Certifications", url: "https://www.asisonline.org/professional-certifications/", gov: false, note: "Professional security certifications (CPP, PSP)" },
        { label: "DHS Security Awareness Training", url: "https://www.dhs.gov/cisa/safecom-security-awareness", gov: true },
        { label: "Find Your State Security License Requirements", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Security+Officer", gov: true, note: "CareerOneStop — search by state" },
        { label: "O*NET: Security Guards & Patrol Officers", url: "https://www.onetonline.org/link/summary/33-9032.00", gov: true },
        { label: "BLS Occupational Outlook: Security Guards", url: "https://www.bls.gov/ooh/protective-service/security-guards.htm", gov: true }
      ]
    },

    // === CHILDCARE ===
    {
      id: "childcare_director",
      name: "Childcare Center Director",
      category: "childcare",
      description: "Manage daily operations, staff supervision, family communication, regulatory compliance, and educational programming of licensed childcare facilities.",
      demandLevel: "high",
      medianSalary: "$42,200",
      trainingPath: "Associate's or Bachelor's in Early Childhood Education + 2+ years experience → Director certification (varies by state)",
      typicalDuration: "2–4 years",
      educationMin: "associates",
      physicalRequirements: ["standing_moderate"],
      drugScreenRequired: true,
      backgroundCheckLevel: "extensive",
      vulnerablePopulationContact: true,
      workContexts: ["childcare_center"],
      licensureRequired: true,
      relatedOccupations: ["preschool_teacher", "family_childcare_provider"],
      keywords: ["childcare management", "early childhood education", "licensing compliance", "staff supervision"],
      officialLinks: [
        { label: "National Association for the Education of Young Children (NAEYC)", url: "https://www.naeyc.org/our-work/leadership/standards-credentialing", gov: false, note: "Professional standards and credential information" },
        { label: "Find Your State Childcare Licensing Board", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Childcare+Director", gov: true, note: "CareerOneStop — state licensing requirements vary significantly" },
        { label: "O*NET: Childcare Center Directors", url: "https://www.onetonline.org/link/summary/25-2012.00", gov: true },
        { label: "BLS Occupational Outlook: Childcare Center Directors", url: "https://www.bls.gov/ooh/personal-care-and-service/childcare-directors.htm", gov: true }
      ]
    },
    {
      id: "preschool_teacher",
      name: "Preschool Teacher",
      category: "childcare",
      description: "Educate and care for children ages 3–5 in group settings, plan curriculum activities, foster development, and communicate with families.",
      demandLevel: "high",
      medianSalary: "$36,800",
      trainingPath: "High school diploma + early childhood program (sometimes), or Associate's/Bachelor's in Early Childhood Education",
      typicalDuration: "1–4 years",
      educationMin: "diploma",
      physicalRequirements: ["standing_long", "lifting_children"],
      drugScreenRequired: true,
      backgroundCheckLevel: "extensive",
      vulnerablePopulationContact: true,
      workContexts: ["childcare_center", "school_based_prek"],
      licensureRequired: false,
      certificationRequired: false,
      relatedOccupations: ["childcare_director", "elementary_teacher"],
      keywords: ["early childhood education", "preschool", "child development", "classroom management"],
      officialLinks: [
        { label: "NAEYC Early Childhood Credentials", url: "https://www.naeyc.org/our-work/leadership/standards-credentialing/candidacy", gov: false, note: "Guidance on professional credentials" },
        { label: "Find Your State Preschool Teacher Qualifications", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Preschool+Teacher", gov: true, note: "Requirements vary significantly by state and program type" },
        { label: "O*NET: Preschool Teachers", url: "https://www.onetonline.org/link/summary/25-2011.00", gov: true },
        { label: "BLS Occupational Outlook: Preschool Teachers", url: "https://www.bls.gov/ooh/education-and-training/preschool-teachers.htm", gov: true }
      ]
    },

    // === AGRICULTURE ===
    {
      id: "farm_manager",
      name: "Farm Manager",
      category: "agriculture",
      description: "Plan, organize, and direct crop and/or livestock production on farms. Manage budgets, equipment, labor, and regulatory compliance.",
      demandLevel: "moderate",
      medianSalary: "$73,400",
      trainingPath: "Associate's or Bachelor's in Agriculture/Farm Business + on-the-job experience, or family farm succession planning",
      typicalDuration: "2–4 years formal + years of experience",
      educationMin: "associates",
      physicalRequirements: ["outdoor_work", "lifting_50lb", "seasonal_variation"],
      drugScreenRequired: false,
      workContexts: ["crop_farming", "livestock", "specialty_crops", "organic"],
      licensureRequired: false,
      relatedOccupations: ["agricultural_specialist", "equipment_operator"],
      keywords: ["agriculture", "farming", "crop management", "livestock management", "farm business"],
      officialLinks: [
        { label: "USDA Farm Service Agency", url: "https://www.fsa.usda.gov/", gov: true, note: "Loans, grants, and technical assistance for farmers" },
        { label: "Agricultural Education Resources (NIFA)", url: "https://nifa.usda.gov/", gov: true, note: "USDA National Institute of Food & Agriculture — educational programs" },
        { label: "O*NET: Farm Managers & Supervisors", url: "https://www.onetonline.org/link/summary/11-9051.00", gov: true },
        { label: "BLS Occupational Outlook: Farm, Ranch, and Other Agricultural Managers", url: "https://www.bls.gov/ooh/management/farmers-ranchers-and-other-agricultural-managers.htm", gov: true },
        { label: "Small Business Administration (SBA) Farming Resources", url: "https://www.sba.gov/", gov: true, note: "Business planning, loans, and resources for farm entrepreneurs" }
      ]
    },
    {
      id: "landscaping_supervisor",
      name: "Landscape Supervisor / Grounds Manager",
      category: "outdoor_services",
      description: "Supervise and coordinate landscaping staff. Plan grounds design projects, manage equipment and budgets, maintain outdoor spaces for beauty and safety.",
      demandLevel: "high",
      medianSalary: "$52,300",
      trainingPath: "High school diploma + landscaping/horticulture experience, or Associate's in Horticulture/Landscape Design → Supervisor role",
      typicalDuration: "3–5 years field experience + optional degree",
      educationMin: "diploma",
      physicalRequirements: ["outdoor_work", "lifting_50lb", "weather_exposure"],
      drugScreenRequired: true,
      backgroundCheckLevel: "standard",
      workContexts: ["residential", "commercial", "municipal", "institutional"],
      licensureRequired: false,
      certificationRequired: false,
      relatedOccupations: ["landscaper", "horticulturist", "turf_manager"],
      keywords: ["landscaping", "grounds maintenance", "horticulture", "outdoor design", "vegetation management"],
      officialLinks: [
        { label: "Professional Landcare Network (PLANET)", url: "https://www.landcarenetwork.org/", gov: false, note: "Industry association with training and certification programs" },
        { label: "National Association of Landscape Professionals", url: "https://www.nalprofessionals.org/", gov: false, note: "Certifications and professional development" },
        { label: "EPA Pesticide Applicator Certification", url: "https://www.epa.gov/pesticide-worker-protection/pesticide-applicator-certification", gov: true, note: "Required in many states for pesticide/herbicide application" },
        { label: "O*NET: Landscape Supervisors", url: "https://www.onetonline.org/link/summary/45-1011.00", gov: true },
        { label: "BLS Occupational Outlook: Landscape Supervisors", url: "https://www.bls.gov/ooh/management/landscaping-and-groundskeeping-managers.htm", gov: true }
      ]
    }
  ],

  // -------------------------------------------------------------------------
  // WORK CONTEXT DEFINITIONS
  // -------------------------------------------------------------------------
  workContexts: {
    // Trades
    residential:  { label: "Residential", description: "Private homes and apartments", minorContact: "likely", publicAccess: true },
    commercial:   { label: "Commercial", description: "Offices, retail, restaurants", minorContact: "possible", publicAccess: true },
    industrial:   { label: "Industrial", description: "Factories, plants, warehouses", minorContact: "unlikely", publicAccess: false },
    government:   { label: "Government / Institutional", description: "Schools, government buildings, military", minorContact: "likely", publicAccess: true, clearanceRequired: true },
    // Healthcare
    hospital:     { label: "Hospital", description: "Inpatient and outpatient hospital settings", minorContact: "likely", publicAccess: true },
    nursing_home: { label: "Nursing Home / Long-term Care", description: "Elderly and disabled care facilities", minorContact: "unlikely", publicAccess: false, vulnerablePop: true },
    home_health:  { label: "Home Health", description: "Patient's private home", minorContact: "possible", publicAccess: false, vulnerablePop: true, unsupervised: true },
    clinic:       { label: "Clinic / Outpatient", description: "Doctor's offices and outpatient facilities", minorContact: "possible", publicAccess: true },
    lab:          { label: "Laboratory", description: "Clinical or research laboratory", minorContact: "unlikely", publicAccess: false },
    blood_bank:   { label: "Blood Bank / Donation Center", description: "Blood collection and processing", minorContact: "unlikely", publicAccess: true },
    dental_office:{ label: "Dental Office", description: "Private dental practice", minorContact: "possible", publicAccess: true },
    surgery_center:{ label: "Ambulatory Surgery Center", description: "Outpatient surgery facility", minorContact: "possible", publicAccess: false },
    ambulance:    { label: "Ambulance / EMS", description: "Emergency medical services", minorContact: "likely", publicAccess: true },
    fire_dept:    { label: "Fire Department", description: "Fire and rescue services", minorContact: "likely", publicAccess: true, clearanceRequired: true },
    hospital_er:  { label: "Hospital ER", description: "Emergency department", minorContact: "likely", publicAccess: true },
    urgent_care:  { label: "Urgent Care", description: "Walk-in medical clinic", minorContact: "possible", publicAccess: true },
    school:       { label: "School / Educational", description: "K-12 schools and universities", minorContact: "certain", publicAccess: true, clearanceRequired: true },
    // Childcare
    childcare_center: { label: "Licensed Childcare Center", description: "Group childcare facility (ages 0-5)", minorContact: "certain", publicAccess: false, vulnerablePop: true, backgroundCheckRequired: true },
    school_based_prek: { label: "School-Based PreK Program", description: "Preschool program in school setting", minorContact: "certain", publicAccess: false, vulnerablePop: true, backgroundCheckRequired: true },
    // Security
    armed_security: { label: "Armed Security", description: "Armed security officer with firearms", minorContact: "possible", publicAccess: true, licensureRequired: true },
    unarmed_security: { label: "Unarmed Security", description: "Unarmed security guard, facility monitoring", minorContact: "possible", publicAccess: true, licensureRequired: true },
    // Hospitality
    fine_dining: { label: "Fine Dining Restaurant", description: "Upscale dining establishments", minorContact: "unlikely", publicAccess: true },
    casual_restaurant: { label: "Casual Dining / QSR", description: "Casual restaurants and quick-service", minorContact: "possible", publicAccess: true },
    institutional_food: { label: "Institutional Food Service", description: "Schools, hospitals, corporate cafeterias", minorContact: "possible", publicAccess: false },
    corporate_chef: { label: "Corporate / Executive Food Service", description: "Corporate catering and executive dining", minorContact: "unlikely", publicAccess: false },
    // Agriculture
    crop_farming: { label: "Crop Farming", description: "Field crops, grains, specialty crops", minorContact: "unlikely", publicAccess: false },
    livestock: { label: "Livestock Production", description: "Cattle, poultry, swine, dairy operations", minorContact: "unlikely", publicAccess: false },
    specialty_crops: { label: "Specialty Crops", description: "Fruits, vegetables, nursery crops", minorContact: "unlikely", publicAccess: false },
    organic_farming: { label: "Organic Farming", description: "USDA certified organic production", minorContact: "unlikely", publicAccess: false }
  },

  // -------------------------------------------------------------------------
  // BARRIER DEFINITIONS
  // -------------------------------------------------------------------------
  barriers: {
    conviction: {
      label: "Conviction History",
      types: [
        { id: "none", label: "No conviction history" },
        { id: "misdemeanor_nonviolent", label: "Misdemeanor — non-violent" },
        { id: "misdemeanor_violent", label: "Misdemeanor — violent" },
        { id: "misdemeanor_drug", label: "Misdemeanor — drug-related" },
        { id: "misdemeanor_theft", label: "Misdemeanor — theft/fraud" },
        { id: "felony_nonviolent", label: "Felony — non-violent" },
        { id: "felony_violent", label: "Felony — violent" },
        { id: "felony_drug", label: "Felony — drug-related" },
        { id: "felony_theft", label: "Felony — theft/fraud/financial" },
        { id: "felony_sex", label: "Felony — sex offense" },
        { id: "felony_dui", label: "Felony — DUI/DWI" }
      ]
    },
    registry: {
      label: "Registry Status",
      types: [
        { id: "none", label: "Not on any registry" },
        { id: "sex_offender_tier1", label: "Sex offender registry — Tier I (low risk)" },
        { id: "sex_offender_tier2", label: "Sex offender registry — Tier II (moderate risk)" },
        { id: "sex_offender_tier3", label: "Sex offender registry — Tier III (high risk)" }
      ]
    },
    immigration: {
      label: "Immigration / Work Authorization",
      types: [
        { id: "citizen", label: "U.S. Citizen" },
        { id: "permanent_resident", label: "Lawful Permanent Resident (Green Card)" },
        { id: "work_visa", label: "Work visa (H-1B, H-2B, etc.)" },
        { id: "daca", label: "DACA recipient" },
        { id: "asylum_refugee", label: "Asylee or Refugee" },
        { id: "ead_other", label: "Employment Authorization Document (other)" },
        { id: "undocumented", label: "No work authorization" }
      ]
    },
    transportation: {
      label: "Transportation",
      types: [
        { id: "own_vehicle", label: "Own vehicle with valid license" },
        { id: "own_vehicle_restricted", label: "Own vehicle — restricted/hardship license" },
        { id: "public_transit", label: "Public transit only" },
        { id: "rideshare_carpool", label: "Rideshare or carpool" },
        { id: "no_transport", label: "No reliable transportation" },
        { id: "no_license", label: "No driver's license" }
      ]
    },
    education: {
      label: "Education Level",
      levels: [
        { id: "none", label: "No diploma or GED", rank: 0 },
        { id: "ged", label: "GED or equivalent", rank: 1 },
        { id: "diploma", label: "High school diploma", rank: 2 },
        { id: "some_college", label: "Some college / trade school", rank: 3 },
        { id: "associates", label: "Associate degree", rank: 4 },
        { id: "bachelors", label: "Bachelor's degree or higher", rank: 5 }
      ]
    },
    drugScreen: {
      label: "Drug Screening",
      types: [
        { id: "can_pass", label: "Can pass a standard drug screening" },
        { id: "marijuana_only", label: "May test positive for marijuana only" },
        { id: "cannot_pass", label: "Cannot currently pass a drug screening" }
      ]
    },
    financial: {
      label: "Financial Resources for Training",
      types: [
        { id: "self_fund", label: "Can self-fund training and licensing fees" },
        { id: "need_aid", label: "Need financial aid or scholarships" },
        { id: "no_resources", label: "No financial resources — need fully funded programs" }
      ]
    },
    physical: {
      label: "Physical Capabilities",
      types: [
        { id: "no_limitations", label: "No physical limitations" },
        { id: "light_duty", label: "Can do light physical work (lifting up to 25 lbs)" },
        { id: "sedentary", label: "Sedentary work only" },
        { id: "no_heights", label: "Cannot work at heights" },
        { id: "no_prolonged_standing", label: "Cannot stand for prolonged periods" }
      ]
    },
    timeSinceConviction: {
      label: "Time Since Most Recent Conviction",
      types: [
        { id: "na", label: "Not applicable" },
        { id: "less_1", label: "Less than 1 year" },
        { id: "1_3", label: "1–3 years" },
        { id: "3_5", label: "3–5 years" },
        { id: "5_7", label: "5–7 years" },
        { id: "7_10", label: "7–10 years" },
        { id: "over_10", label: "Over 10 years" }
      ]
    }
  },

  // -------------------------------------------------------------------------
  // STATE POLICY DATA
  // Each state categorized by its Fair Chance / licensing policies
  // -------------------------------------------------------------------------
  statePolicies: {
    AL: { name: "Alabama", banTheBox: false, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "south" },
    AK: { name: "Alaska", banTheBox: false, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "west" },
    AZ: { name: "Arizona", banTheBox: false, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: true, expungementAvailable: true, marijuanaLegal: true, region: "west" },
    AR: { name: "Arkansas", banTheBox: false, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "south" },
    CA: { name: "California", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: true, expungementAvailable: true, marijuanaLegal: true, region: "west" },
    CO: { name: "Colorado", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "west" },
    CT: { name: "Connecticut", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: true, expungementAvailable: true, marijuanaLegal: true, region: "northeast" },
    DE: { name: "Delaware", banTheBox: true, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "northeast" },
    FL: { name: "Florida", banTheBox: false, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "south" },
    GA: { name: "Georgia", banTheBox: false, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "south" },
    HI: { name: "Hawaii", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "west" },
    ID: { name: "Idaho", banTheBox: false, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "west" },
    IL: { name: "Illinois", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "midwest" },
    IN: { name: "Indiana", banTheBox: true, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "midwest" },
    IA: { name: "Iowa", banTheBox: false, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "midwest" },
    KS: { name: "Kansas", banTheBox: false, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "midwest" },
    KY: { name: "Kentucky", banTheBox: true, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "south" },
    LA: { name: "Louisiana", banTheBox: true, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "south" },
    ME: { name: "Maine", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "northeast" },
    MD: { name: "Maryland", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "northeast" },
    MA: { name: "Massachusetts", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "northeast" },
    MI: { name: "Michigan", banTheBox: true, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "midwest" },
    MN: { name: "Minnesota", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "midwest" },
    MS: { name: "Mississippi", banTheBox: false, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "south" },
    MO: { name: "Missouri", banTheBox: true, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "midwest" },
    MT: { name: "Montana", banTheBox: false, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "west" },
    NE: { name: "Nebraska", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "midwest" },
    NV: { name: "Nevada", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "west" },
    NH: { name: "New Hampshire", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: true, expungementAvailable: true, marijuanaLegal: false, region: "northeast" },
    NJ: { name: "New Jersey", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "northeast" },
    NM: { name: "New Mexico", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "west" },
    NY: { name: "New York", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: true, expungementAvailable: true, marijuanaLegal: true, region: "northeast" },
    NC: { name: "North Carolina", banTheBox: false, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "south" },
    ND: { name: "North Dakota", banTheBox: true, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "midwest" },
    OH: { name: "Ohio", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: true, expungementAvailable: true, marijuanaLegal: true, region: "midwest" },
    OK: { name: "Oklahoma", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "south" },
    OR: { name: "Oregon", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "west" },
    PA: { name: "Pennsylvania", banTheBox: false, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "northeast" },
    RI: { name: "Rhode Island", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "northeast" },
    SC: { name: "South Carolina", banTheBox: false, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "south" },
    SD: { name: "South Dakota", banTheBox: false, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "midwest" },
    TN: { name: "Tennessee", banTheBox: true, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "south" },
    TX: { name: "Texas", banTheBox: false, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "south" },
    UT: { name: "Utah", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "west" },
    VT: { name: "Vermont", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "northeast" },
    VA: { name: "Virginia", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "south" },
    WA: { name: "Washington", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: true, expungementAvailable: true, marijuanaLegal: true, region: "west" },
    WV: { name: "West Virginia", banTheBox: false, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "south" },
    WI: { name: "Wisconsin", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "midwest" },
    WY: { name: "Wyoming", banTheBox: false, fairChanceLicensing: false, individualAssessment: false, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: false, region: "west" },
    DC: { name: "District of Columbia", banTheBox: true, fairChanceLicensing: true, individualAssessment: true, certificateOfRehab: false, expungementAvailable: true, marijuanaLegal: true, region: "northeast" }
  },

  // -------------------------------------------------------------------------
  // CONVICTION → OCCUPATION RESTRICTION RULES
  // Defines which conviction types block or restrict which occupations / contexts
  // severity: "block" = hard disqualifier, "restrict" = limits contexts,
  //           "review" = may be approved with individual assessment,
  //           "conditional" = eligible after waiting period
  // -------------------------------------------------------------------------
  convictionRules: [
    // Sex offenses — most restrictive
    {
      convictionTypes: ["felony_sex"],
      registryTiers: ["sex_offender_tier1", "sex_offender_tier2", "sex_offender_tier3"],
      affects: "all",
      blockedContexts: ["residential", "home_health", "school", "hospital", "nursing_home", "clinic", "dental_office", "ambulance", "fire_dept", "hospital_er", "urgent_care", "government"],
      allowedContexts: ["industrial", "lab", "commercial"],
      severity: "restrict",
      note: "Sex offender registry significantly limits client-facing and vulnerable-population roles. Industrial, commercial (non-public-facing), and laboratory settings may be available depending on state law and individual assessment.",
      waitingPeriodYears: null
    },
    // Violent felony
    {
      convictionTypes: ["felony_violent"],
      registryTiers: [],
      affects: "all",
      blockedContexts: ["home_health", "school", "government"],
      restrictedContexts: ["residential", "nursing_home", "hospital"],
      severity: "restrict",
      note: "Violent felony convictions restrict unsupervised access to vulnerable populations. Commercial and industrial contexts are generally more accessible. Time since conviction and rehabilitation evidence are key factors.",
      waitingPeriodYears: 5
    },
    // Drug felony
    {
      convictionTypes: ["felony_drug"],
      registryTiers: [],
      affects: "healthcare",
      blockedContexts: [],
      restrictedContexts: ["hospital", "clinic", "nursing_home", "home_health"],
      severity: "review",
      note: "Drug felonies may complicate healthcare licensing due to medication access concerns. Many states allow licensure after demonstrated recovery and a waiting period. Skilled trades are generally less affected.",
      waitingPeriodYears: 3
    },
    // Theft / fraud felony
    {
      convictionTypes: ["felony_theft"],
      registryTiers: [],
      affects: "all",
      blockedContexts: [],
      restrictedContexts: ["home_health", "nursing_home"],
      severity: "review",
      note: "Theft/fraud convictions raise concerns for roles with unsupervised access to patient property or client homes. Most roles remain accessible, especially in supervised settings.",
      waitingPeriodYears: 3
    },
    // Non-violent felony
    {
      convictionTypes: ["felony_nonviolent"],
      registryTiers: [],
      affects: "all",
      blockedContexts: [],
      restrictedContexts: ["government"],
      severity: "conditional",
      note: "Non-violent felonies generally have the least impact on occupational licensing. Most states allow licensure with individual assessment. Government/cleared positions may require additional review.",
      waitingPeriodYears: 2
    },
    // DUI felony
    {
      convictionTypes: ["felony_dui"],
      registryTiers: [],
      affects: "driving_required",
      blockedContexts: [],
      restrictedContexts: ["ambulance", "home_health"],
      severity: "restrict",
      note: "DUI felonies primarily impact roles requiring driving (EMT, home health, heavy equipment with CDL). Non-driving roles are generally unaffected. Check DMV reinstatement requirements.",
      waitingPeriodYears: 3
    },
    // Misdemeanors — generally less restrictive
    {
      convictionTypes: ["misdemeanor_violent"],
      registryTiers: [],
      affects: "all",
      blockedContexts: [],
      restrictedContexts: ["school", "home_health"],
      severity: "review",
      note: "Violent misdemeanors may require individual assessment for roles with vulnerable populations. Most occupations remain accessible.",
      waitingPeriodYears: 2
    },
    {
      convictionTypes: ["misdemeanor_drug", "misdemeanor_theft", "misdemeanor_nonviolent"],
      registryTiers: [],
      affects: "all",
      blockedContexts: [],
      restrictedContexts: [],
      severity: "conditional",
      note: "Non-violent misdemeanors rarely impact occupational licensing. Most states do not consider these disqualifying.",
      waitingPeriodYears: 1
    },

    // ========== NEW OCCUPATION-SPECIFIC RULES ==========
    // Childcare-specific rules
    {
      convictionTypes: ["felony_sex"],
      registryTiers: ["sex_offender_tier1", "sex_offender_tier2", "sex_offender_tier3"],
      affects: "childcare",
      blockedContexts: ["childcare_center", "school_based_prek"],
      severity: "block",
      note: "Sex offender registry is an absolute disqualifier for childcare positions in all states. This occupation is not accessible.",
      waitingPeriodYears: null
    },
    {
      convictionTypes: ["felony_violent"],
      registryTiers: [],
      affects: "childcare",
      blockedContexts: ["childcare_center", "school_based_prek"],
      severity: "block",
      note: "Violent felony convictions are typically disqualifying for childcare positions. All states prohibit licensing of individuals with violent crime convictions involving children.",
      waitingPeriodYears: null
    },

    // Security officer-specific rules (armed vs. unarmed distinction)
    {
      convictionTypes: ["felony_violent", "felony_sex", "felony_drug"],
      registryTiers: [],
      affects: "security",
      blockedContexts: ["armed_security"],
      restrictedContexts: ["unarmed_security"],
      severity: "restrict",
      note: "Armed security licenses are typically unavailable to individuals with felony convictions. Unarmed security may be possible with individual state assessment and time.",
      waitingPeriodYears: 5
    },
    {
      convictionTypes: ["felony_sex"],
      registryTiers: ["sex_offender_tier1", "sex_offender_tier2", "sex_offender_tier3"],
      affects: "security",
      blockedContexts: ["unarmed_security", "armed_security"],
      severity: "block",
      note: "Sex offender registry disqualifies individuals from security positions (both armed and unarmed) in most states due to access to secure facilities and identification systems.",
      waitingPeriodYears: null
    },

    // Executive Chef / Hospitality-specific rules
    {
      convictionTypes: ["felony_theft"],
      registryTiers: [],
      affects: "hospitality",
      restrictedContexts: ["fine_dining", "corporate", "upscale"],
      severity: "review",
      note: "Theft/fraud convictions may impact hiring in upscale/fine dining establishments where customer trust is paramount. Casual dining and institutional food service are generally more accessible.",
      waitingPeriodYears: 3
    },
    {
      convictionTypes: ["felony_drug"],
      registryTiers: [],
      affects: "hospitality",
      restrictedContexts: ["fine_dining", "corporate"],
      severity: "review",
      note: "Drug-related convictions may impact hiring in premium establishments. Recovery documentation strengthens applications. Casual dining more accessible.",
      waitingPeriodYears: 3
    }
  ],

  // -------------------------------------------------------------------------
  // IMMIGRATION → WORK ELIGIBILITY RULES
  // -------------------------------------------------------------------------
  immigrationRules: {
    citizen:            { canWork: true, canGetLicense: true, canGetFederalJob: true, note: "Full eligibility for all occupations and contexts." },
    permanent_resident: { canWork: true, canGetLicense: true, canGetFederalJob: false, note: "Eligible for most occupations. Some government positions may require citizenship." },
    work_visa:          { canWork: true, canGetLicense: "varies", canGetFederalJob: false, note: "Work authorization is employer/visa-specific. Some states restrict professional licensing for visa holders. Check with state licensing board." },
    daca:               { canWork: true, canGetLicense: "varies", canGetFederalJob: false, note: "DACA recipients have work authorization but some states restrict professional licensing. Check your state's specific policies. Federal financial aid (Pell Grants) not available in most states." },
    asylum_refugee:     { canWork: true, canGetLicense: true, canGetFederalJob: false, note: "Asylees and refugees have work authorization and generally qualify for professional licensing and public benefits including training assistance." },
    ead_other:          { canWork: true, canGetLicense: "varies", canGetFederalJob: false, note: "Employment Authorization Document provides work authorization. Licensing eligibility varies by state and EAD category." },
    undocumented:       { canWork: false, canGetLicense: false, canGetFederalJob: false, note: "Cannot legally work or obtain professional licenses. Explore pathways to legal status. Some community organizations offer workforce readiness programs." }
  },

  // -------------------------------------------------------------------------
  // EDUCATION MINIMUM REQUIREMENTS MAPPING
  // -------------------------------------------------------------------------
  educationRank: {
    none: 0,
    ged: 1,
    diploma: 2,
    some_college: 3,
    associates: 4,
    bachelors: 5
  },

  // -------------------------------------------------------------------------
  // FINANCIAL AID & TRAINING RESOURCES (by type)
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // STATE LICENSING BOARD DIRECTORIES
  // Links to find your specific state's licensing board
  // -------------------------------------------------------------------------
  licensingDirectories: {
    electrician: { label: "Find Your State Electrical Licensing Board", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Electrician", gov: true, note: "CareerOneStop (.gov) — search by state" },
    plumber: { label: "Find Your State Plumbing Licensing Board", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Plumber", gov: true, note: "CareerOneStop (.gov) — search by state" },
    hvac_tech: { label: "Find Your State HVAC Licensing Board", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=HVAC", gov: true, note: "CareerOneStop (.gov) — search by state" },
    welder: { label: "Find Welding Certification Requirements by State", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Welder", gov: true, note: "CareerOneStop (.gov) — search by state" },
    carpenter: { label: "Find Carpentry License Requirements by State", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Carpenter", gov: true, note: "CareerOneStop (.gov) — search by state" },
    heavy_equipment_operator: { label: "Find Equipment Operator Certifications by State", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Equipment+Operator", gov: true, note: "CareerOneStop (.gov) — search by state" },
    diesel_mechanic: { label: "Find Diesel Mechanic Certifications by State", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Diesel+Mechanic", gov: true, note: "CareerOneStop (.gov) — search by state" },
    solar_installer: { label: "Find Solar Installer License Requirements by State", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Solar+Installer", gov: true, note: "CareerOneStop (.gov) — search by state" },
    cna: { label: "Find Your State Nurse Aide Registry", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Nurse+Aide", gov: true, note: "CareerOneStop (.gov) — search by state" },
    lpn: { label: "Find Your State Board of Nursing", url: "https://www.ncsbn.org/contact/boards-of-nursing.page", gov: false, note: "NCSBN directory — links to each state's board of nursing (.gov)" },
    phlebotomist: { label: "Find Phlebotomy Certification Requirements by State", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Phlebotomist", gov: true, note: "CareerOneStop (.gov) — search by state" },
    medical_assistant: { label: "Find Medical Assistant Certification Requirements by State", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Medical+Assistant", gov: true, note: "CareerOneStop (.gov) — search by state" },
    emt: { label: "Find Your State EMS Office", url: "https://www.ems.gov/education-and-workforce-development", gov: true, note: "NHTSA EMS.gov — links to state EMS offices" },
    surgical_tech: { label: "Find Surgical Tech Certification Requirements by State", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Surgical+Technologist", gov: true, note: "CareerOneStop (.gov) — search by state" },
    home_health_aide: { label: "Find Home Health Aide Requirements by State", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Home+Health+Aide", gov: true, note: "CareerOneStop (.gov) — search by state" },
    dental_assistant: { label: "Find Dental Assistant License Requirements by State", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Dental+Assistant", gov: true, note: "CareerOneStop (.gov) — search by state" },
    ironworker: { label: "Ironworker Apprenticeship & Training", url: "https://www.apprenticeship.gov/apprenticeship-job-finder", gov: true, note: "DOL Apprenticeship Finder — registered apprenticeships" },
    sheet_metal_worker: { label: "Sheet Metal Worker Training & Apprenticeships", url: "https://www.apprenticeship.gov/apprenticeship-job-finder", gov: true, note: "DOL Apprenticeship Finder — registered apprenticeships" },
    executive_chef: { label: "Culinary Education & Training Programs", url: "https://www.careeronestop.org/Toolkit/Training/find-training.aspx", gov: true, note: "CareerOneStop — find culinary schools and training" },
    security_officer: { label: "Find Your State Security Officer License Requirements", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Security+Officer", gov: true, note: "CareerOneStop (.gov) — state requirements vary significantly" },
    childcare_director: { label: "Find Your State Childcare Licensing Board", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Childcare+Director", gov: true, note: "CareerOneStop (.gov) — state licensing requirements vary" },
    preschool_teacher: { label: "Find Your State Preschool Teacher Requirements", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Preschool+Teacher", gov: true, note: "CareerOneStop (.gov) — requirements vary by state and setting" },
    farm_manager: { label: "USDA Farm Management Resources", url: "https://www.fsa.usda.gov/", gov: true, note: "USDA FSA — loans, grants, and business resources" },
    landscaping_supervisor: { label: "Landscaping Training & Certification", url: "https://www.careeronestop.org/Toolkit/Training/find-licenses.aspx?keyword=Landscaping", gov: true, note: "CareerOneStop (.gov) — certifications and requirements" }
  },

  // -------------------------------------------------------------------------
  // FINANCIAL AID & TRAINING RESOURCES (by type)
  // -------------------------------------------------------------------------
  financialResources: [
    { id: "wioa", name: "WIOA (Workforce Innovation and Opportunity Act)", description: "Federal job training funds administered through local American Job Centers. Covers tuition, books, tools, and support services.", eligibility: "Low-income adults, dislocated workers, youth. Conviction history does not disqualify.", url: "https://www.careeronestop.org/LocalHelp/AmericanJobCenters/find-american-job-centers.aspx", gov: true },
    { id: "pell", name: "Federal Pell Grants", description: "Federal grants for post-secondary education. Up to $7,395/year (2024-25). Does not need to be repaid.", eligibility: "U.S. citizens and eligible non-citizens with financial need. Most drug convictions no longer disqualify (as of 2023).", url: "https://studentaid.gov/understand-aid/types/grants/pell", gov: true },
    { id: "tap", name: "Trade Adjustment Assistance (TAA)", description: "Training and support for workers who lost jobs due to foreign trade.", eligibility: "Workers in TAA-certified firms. Must be enrolled in approved training.", url: "https://www.dol.gov/agencies/eta/tradeact", gov: true },
    { id: "apprenticeship", name: "Registered Apprenticeships", description: "Earn-while-you-learn programs. Apprentices are paid employees from day one.", eligibility: "Varies by program. Many unions and employers accept applicants with conviction histories.", url: "https://www.apprenticeship.gov/apprenticeship-job-finder", gov: true },
    { id: "voc_rehab", name: "Vocational Rehabilitation", description: "State-funded training and support for individuals with disabilities.", eligibility: "Must have a documented disability that affects employment.", url: "https://rsa.ed.gov/about/states", gov: true },
    { id: "reentry", name: "Federal Bonding Program", description: "Free fidelity bonds for employers hiring justice-involved individuals. Reduces employer risk.", eligibility: "Individuals with conviction histories. Bonds issued through state workforce agencies.", url: "https://bonds4jobs.com/", gov: false, note: "Administered by the DOL but hosted by a contractor" },
    { id: "community", name: "Community-Based Organizations", description: "Local nonprofits often provide free or low-cost training, mentorship, and job placement.", eligibility: "Varies. Many specifically serve justice-involved and minority communities.", url: "https://www.careeronestop.org/LocalHelp/service-locator.aspx", gov: true, note: "Use CareerOneStop's service locator to find local organizations" }
  ],

  // -------------------------------------------------------------------------
  // OCCUPATION WAGE DATA (BLS OES, May 2024 estimates)
  // SOC codes, national medians, wage ranges, and 5-year CAGR
  // Source: Bureau of Labor Statistics Occupational Employment & Wage Statistics
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // OCCUPATION WAGE DATA + ANTHROPIC ECONOMIC INDEX AI EXPOSURE METRICS
  //
  // aiTaskCoverage: Share of O*NET tasks with OBSERVED AI usage, per the
  //   "observed exposure" framework from Massenkoff & McCrory (2026),
  //   "The Anthropic Economic Index: Measuring AI's Labor Market Impacts"
  //   https://www.anthropic.com/research/labor-market-impacts
  //   Lower = more AI-resilient. ~30% of occupations have zero coverage.
  //   Benchmark: Computer Programmers ~75%, Financial Analysts ~45%.
  //
  // theoreticalExposure: Share of tasks rated as theoretically automatable
  //   by LLMs (Eloundou et al. 2023 beta metric, used in the Anthropic
  //   framework). The gap between this and aiTaskCoverage shows how far
  //   real-world adoption lags behind theoretical capability.
  //
  // dominantTaskTypes: O*NET task categories that keep observed AI usage
  //   near zero — i.e. why this occupation is AI-resilient.
  //
  // blsJobGrowth10yr: BLS Employment Projections 2022–2032 (10-year %).
  //   Finding from Anthropic: every 10pp increase in observed AI coverage
  //   → BLS growth projections drop by 0.6 percentage points.
  // -------------------------------------------------------------------------
  occupationWages: {
    electrician: {
      soc: "47-2111", nationalMedian: 61590, p10: 37020, p25: 46300, p75: 82180, p90: 104180,
      cagr5yr: 0.042, blsJobGrowth10yr: 0.11,
      aiTaskCoverage: 0.02, theoreticalExposure: 0.12,
      dominantTaskTypes: ["Physical installation in variable environments", "On-site systems diagnosis"],
      onetUrl: "https://www.onetonline.org/link/summary/47-2111.00"
    },
    plumber: {
      soc: "47-2152", nationalMedian: 61550, p10: 36700, p25: 46200, p75: 82530, p90: 102700,
      cagr5yr: 0.041, blsJobGrowth10yr: 0.02,
      aiTaskCoverage: 0.02, theoreticalExposure: 0.10,
      dominantTaskTypes: ["Physical installation in variable environments", "On-site systems diagnosis"],
      onetUrl: "https://www.onetonline.org/link/summary/47-2152.00"
    },
    hvac_tech: {
      soc: "49-9021", nationalMedian: 57300, p10: 34180, p25: 42710, p75: 75800, p90: 90800,
      cagr5yr: 0.039, blsJobGrowth10yr: 0.06,
      aiTaskCoverage: 0.03, theoreticalExposure: 0.15,
      dominantTaskTypes: ["Physical installation in variable environments", "On-site systems diagnosis"],
      onetUrl: "https://www.onetonline.org/link/summary/49-9021.00"
    },
    welder: {
      soc: "51-4121", nationalMedian: 48000, p10: 33120, p25: 39360, p75: 60110, p90: 72970,
      cagr5yr: 0.038, blsJobGrowth10yr: 0.03,
      aiTaskCoverage: 0.01, theoreticalExposure: 0.08,
      dominantTaskTypes: ["Precision manual execution", "Physical work in variable environments"],
      onetUrl: "https://www.onetonline.org/link/summary/51-4121.00"
    },
    carpenter: {
      soc: "47-2031", nationalMedian: 52850, p10: 33210, p25: 40080, p75: 69200, p90: 84690,
      cagr5yr: 0.035, blsJobGrowth10yr: 0.02,
      aiTaskCoverage: 0.01, theoreticalExposure: 0.09,
      dominantTaskTypes: ["Physical construction in variable environments", "Precision manual execution"],
      onetUrl: "https://www.onetonline.org/link/summary/47-2031.00"
    },
    heavy_equipment_operator: {
      soc: "47-2073", nationalMedian: 53160, p10: 34340, p25: 41480, p75: 69600, p90: 85910,
      cagr5yr: 0.037, blsJobGrowth10yr: 0.04,
      aiTaskCoverage: 0.01, theoreticalExposure: 0.06,
      dominantTaskTypes: ["Physical operation in unpredictable environments", "Real-time spatial judgment"],
      onetUrl: "https://www.onetonline.org/link/summary/47-2073.00"
    },
    diesel_mechanic: {
      soc: "49-3031", nationalMedian: 56600, p10: 35810, p25: 44090, p75: 72160, p90: 82600,
      cagr5yr: 0.040, blsJobGrowth10yr: 0.02,
      aiTaskCoverage: 0.03, theoreticalExposure: 0.14,
      dominantTaskTypes: ["Hands-on mechanical diagnosis", "Precision manual repair"],
      onetUrl: "https://www.onetonline.org/link/summary/49-3031.00"
    },
    solar_installer: {
      soc: "47-2231", nationalMedian: 48800, p10: 34500, p25: 39620, p75: 60220, p90: 71420,
      cagr5yr: 0.053, blsJobGrowth10yr: 0.22,
      aiTaskCoverage: 0.02, theoreticalExposure: 0.10,
      dominantTaskTypes: ["Rooftop physical installation", "Electrical wiring in variable conditions"],
      onetUrl: "https://www.onetonline.org/link/summary/47-2231.00"
    },
    cna: {
      soc: "31-1131", nationalMedian: 36220, p10: 27470, p25: 30570, p75: 42200, p90: 48780,
      cagr5yr: 0.047, blsJobGrowth10yr: 0.04,
      aiTaskCoverage: 0.04, theoreticalExposure: 0.18,
      dominantTaskTypes: ["Hands-on patient care", "Interpersonal emotional support"],
      onetUrl: "https://www.onetonline.org/link/summary/31-1131.00"
    },
    lpn: {
      soc: "29-2061", nationalMedian: 55860, p10: 40080, p25: 46610, p75: 64070, p90: 69300,
      cagr5yr: 0.044, blsJobGrowth10yr: 0.05,
      aiTaskCoverage: 0.06, theoreticalExposure: 0.22,
      dominantTaskTypes: ["Clinical bedside judgment", "Hands-on patient care"],
      onetUrl: "https://www.onetonline.org/link/summary/29-2061.00"
    },
    phlebotomist: {
      soc: "31-9097", nationalMedian: 40580, p10: 30720, p25: 34450, p75: 47670, p90: 54610,
      cagr5yr: 0.043, blsJobGrowth10yr: 0.10,
      aiTaskCoverage: 0.03, theoreticalExposure: 0.12,
      dominantTaskTypes: ["Fine-motor venipuncture", "Direct patient interaction"],
      onetUrl: "https://www.onetonline.org/link/summary/31-9097.00"
    },
    medical_assistant: {
      soc: "31-9092", nationalMedian: 42000, p10: 31280, p25: 35440, p75: 49170, p90: 55910,
      cagr5yr: 0.041, blsJobGrowth10yr: 0.16,
      aiTaskCoverage: 0.08, theoreticalExposure: 0.30,
      dominantTaskTypes: ["Hands-on clinical tasks", "In-person patient interaction"],
      onetUrl: "https://www.onetonline.org/link/summary/31-9092.00"
    },
    emt: {
      soc: "29-2040", nationalMedian: 38930, p10: 27260, p25: 31470, p75: 52500, p90: 68420,
      cagr5yr: 0.046, blsJobGrowth10yr: 0.05,
      aiTaskCoverage: 0.03, theoreticalExposure: 0.11,
      dominantTaskTypes: ["Emergency field response", "Physical patient stabilisation"],
      onetUrl: "https://www.onetonline.org/link/summary/29-2040.00"
    },
    surgical_tech: {
      soc: "29-2055", nationalMedian: 60610, p10: 39770, p25: 47380, p75: 73000, p90: 81920,
      cagr5yr: 0.042, blsJobGrowth10yr: 0.05,
      aiTaskCoverage: 0.02, theoreticalExposure: 0.09,
      dominantTaskTypes: ["Sterile-field precision handling", "Real-time OR coordination"],
      onetUrl: "https://www.onetonline.org/link/summary/29-2055.00"
    },
    home_health_aide: {
      soc: "31-1121", nationalMedian: 33530, p10: 24680, p25: 28050, p75: 39230, p90: 44600,
      cagr5yr: 0.050, blsJobGrowth10yr: 0.22,
      aiTaskCoverage: 0.02, theoreticalExposure: 0.08,
      dominantTaskTypes: ["In-home physical patient care", "Interpersonal emotional support"],
      onetUrl: "https://www.onetonline.org/link/summary/31-1121.00"
    },
    dental_assistant: {
      soc: "31-9091", nationalMedian: 44820, p10: 31090, p25: 36200, p75: 53710, p90: 62100,
      cagr5yr: 0.039, blsJobGrowth10yr: 0.07,
      aiTaskCoverage: 0.04, theoreticalExposure: 0.16,
      dominantTaskTypes: ["Chairside clinical assistance", "Direct patient interaction"],
      onetUrl: "https://www.onetonline.org/link/summary/31-9091.00"
    },
    ironworker: {
      soc: "47-2171", nationalMedian: 64240, p10: 38980, p25: 48200, p75: 84320, p90: 102140,
      cagr5yr: 0.038, blsJobGrowth10yr: 0.03,
      aiTaskCoverage: 0.00, theoreticalExposure: 0.04,
      dominantTaskTypes: ["Structural steel work at height", "Physical rigging in variable conditions"],
      onetUrl: "https://www.onetonline.org/link/summary/47-2171.00"
    },
    sheet_metal_worker: {
      soc: "51-2121", nationalMedian: 57420, p10: 34510, p25: 43980, p75: 73150, p90: 89620,
      cagr5yr: 0.035, blsJobGrowth10yr: 0.05,
      aiTaskCoverage: 0.01, theoreticalExposure: 0.11,
      dominantTaskTypes: ["Precision metal fabrication", "Physical installation on-site"],
      onetUrl: "https://www.onetonline.org/link/summary/51-2121.00"
    },
    executive_chef: {
      soc: "35-1011", nationalMedian: 58660, p10: 29800, p25: 40520, p75: 81240, p90: 112650,
      cagr5yr: 0.028, blsJobGrowth10yr: 0.08,
      aiTaskCoverage: 0.03, theoreticalExposure: 0.14,
      dominantTaskTypes: ["Sensory & creative judgment (taste, presentation)", "Real-time kitchen supervision"],
      onetUrl: "https://www.onetonline.org/link/summary/35-1011.00"
    },
    security_officer: {
      soc: "33-9032", nationalMedian: 36360, p10: 23840, p25: 28420, p75: 47180, p90: 62540,
      cagr5yr: 0.022, blsJobGrowth10yr: 0.03,
      aiTaskCoverage: 0.04, theoreticalExposure: 0.15,
      dominantTaskTypes: ["Physical presence & deterrence", "Real-time situational judgment"],
      onetUrl: "https://www.onetonline.org/link/summary/33-9032.00"
    },
    childcare_director: {
      soc: "25-2012", nationalMedian: 42170, p10: 27840, p25: 32980, p75: 53290, p90: 67420,
      cagr5yr: 0.031, blsJobGrowth10yr: 0.02,
      aiTaskCoverage: 0.07, theoreticalExposure: 0.25,
      dominantTaskTypes: ["Child development & social interaction", "In-person program supervision"],
      onetUrl: "https://www.onetonline.org/link/summary/25-2012.00"
    },
    preschool_teacher: {
      soc: "25-2011", nationalMedian: 36800, p10: 24460, p25: 28780, p75: 46720, p90: 57880,
      cagr5yr: 0.032, blsJobGrowth10yr: 0.02,
      aiTaskCoverage: 0.05, theoreticalExposure: 0.20,
      dominantTaskTypes: ["Child development & social bonding", "Hands-on classroom engagement"],
      onetUrl: "https://www.onetonline.org/link/summary/25-2011.00"
    },
    farm_manager: {
      soc: "11-9051", nationalMedian: 73420, p10: 40620, p25: 52840, p75: 101180, p90: 134920,
      cagr5yr: 0.018, blsJobGrowth10yr: -0.03,
      aiTaskCoverage: 0.05, theoreticalExposure: 0.22,
      dominantTaskTypes: ["Agricultural field management", "Weather & biology-dependent decision-making"],
      onetUrl: "https://www.onetonline.org/link/summary/11-9051.00"
    },
    landscaping_supervisor: {
      soc: "45-1011", nationalMedian: 52330, p10: 31850, p25: 39480, p75: 68270, p90: 85630,
      cagr5yr: 0.025, blsJobGrowth10yr: 0.05,
      aiTaskCoverage: 0.03, theoreticalExposure: 0.12,
      dominantTaskTypes: ["Outdoor physical site management", "Crew supervision in variable conditions"],
      onetUrl: "https://www.onetonline.org/link/summary/45-1011.00"
    }
  },

  // -------------------------------------------------------------------------
  // STATE WAGE MULTIPLIERS
  // Based on BEA Regional Price Parities (RPP) for goods & services
  // Multiplier applied to national median to estimate state-level wages
  // Source: Bureau of Economic Analysis, 2023 RPP data
  // -------------------------------------------------------------------------
  stateWageMultipliers: {
    AL: 0.87, AK: 1.12, AZ: 1.00, AR: 0.86, CA: 1.22, CO: 1.10, CT: 1.15,
    DE: 1.04, FL: 1.02, GA: 0.95, HI: 1.25, ID: 0.93, IL: 1.05, IN: 0.92,
    IA: 0.91, KS: 0.91, KY: 0.89, LA: 0.90, ME: 0.97, MD: 1.13, MA: 1.18,
    MI: 0.94, MN: 1.04, MS: 0.84, MO: 0.90, MT: 0.95, NE: 0.92, NV: 1.03,
    NH: 1.08, NJ: 1.16, NM: 0.93, NY: 1.20, NC: 0.95, ND: 0.94, OH: 0.93,
    OK: 0.88, OR: 1.07, PA: 1.00, RI: 1.06, SC: 0.91, SD: 0.90, TN: 0.92,
    TX: 0.98, UT: 1.01, VT: 1.03, VA: 1.08, WA: 1.17, WV: 0.85, WI: 0.94,
    WY: 0.95, DC: 1.30
  }
};

// DEBUG: Store occupations count for inspection
if (typeof window !== 'undefined') {
  window._DATA_DEBUG = {
    occupations_count: DATA.occupations.length,
    occupation_ids: DATA.occupations.map(o => o.id),
    categories: DATA.occupations.reduce((acc, o) => { acc[o.category] = (acc[o.category] || 0) + 1; return acc; }, {})
  };
}

// Make available globally
if (typeof module !== 'undefined' && module.exports) {
  module.exports = DATA;
}
