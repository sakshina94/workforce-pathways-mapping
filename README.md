# Workforce Pathways Navigator

An interactive career navigation tool designed for people facing employment barriers — justice involvement, limited education, immigration status, transportation challenges — to discover realistic pathways into AI-resilient occupations.

## Live Demo

**[Launch the Workforce Pathways Navigator](https://sakshina94.github.io/workforce-pathways-mapping/)**

## How to Use

### Step 1: Immigration & Work Authorization
Select your current work authorization status (U.S. citizen, green card holder, DACA, asylee/refugee, work visa, or undocumented). The tool uses this to filter occupations based on licensing and employment eligibility requirements.

### Step 2: Criminal History
Indicate whether you have a criminal conviction and, if so, the type of offense and how many years ago it occurred. The tool cross-references your history against state-specific Fair Chance licensing rules, Ban the Box laws, and occupation-specific restrictions.

### Step 3: Education
Select your highest level of education. The tool identifies which occupations you're already eligible for and which require additional credentials — along with remediation steps (GED programs, prerequisite courses) to get there.

### Step 4: Transportation & Physical Capabilities
Share your transportation options and any physical limitations. Some occupations require specific physical demands (lifting, standing, climbing) or reliable access to a vehicle.

### Step 5: Drug Screening
Indicate whether you can pass a drug screening. The tool accounts for state-level marijuana legalization when evaluating occupations that require drug tests.

### Step 6: Financial Resources
Describe your financial situation for training costs. The tool matches you with relevant funding sources — WIOA grants, Pell Grants, registered apprenticeships, Federal Bonding for justice-involved individuals — based on your eligibility.

### Results
After completing all six steps, you receive:
- **Ranked occupation recommendations** (24+ occupations across skilled trades, healthcare, and high-demand fields) with a fit score (0–100)
- **Clear eligibility status** for each occupation: eligible, conditional, restricted, or ineligible
- **Specific barrier explanations** — e.g., "Home Health Care setting blocked due to conviction history, but Commercial setting available"
- **Personalized remediation steps** — e.g., "Wait 3 more years for eligibility," "Pursue Certificate of Rehabilitation"
- **State-specific guidance** — licensing board links, Fair Chance policies, expungement availability
- **AI resilience scores** — how resistant each occupation is to automation, benchmarked against the Anthropic Economic Index
- **Funding sources** — matched to your profile (WIOA, Pell, apprenticeships, Federal Bonding)

## Occupations Covered

**Skilled Trades (8):** Electrician, Plumber, HVAC Technician, Welder, Carpenter, Heavy Equipment Operator, Diesel Mechanic, Solar Installer

**Healthcare (8):** CNA, LPN, Phlebotomist, Medical Assistant, EMT, Surgical Technician, Home Health Aide, Dental Assistant

**Other High-Demand (8+):** Security Officer, Childcare Director, Preschool Teacher, Executive Chef, Farm Manager, Landscaping Supervisor, Ironworker, Sheet Metal Worker

## Tech Stack

- Vanilla JavaScript (no frameworks)
- Bootstrap 5 + custom CSS
- Client-side only — no server, no data stored
- State policy data for all 50 U.S. states

## Run Locally

1. Clone the repo: `git clone https://github.com/sakshina94/workforce-pathways-mapping.git`
2. Open `index.html` in your browser — no build step or server needed

## Privacy

All data stays in your browser. Nothing is sent to a server or stored anywhere.
