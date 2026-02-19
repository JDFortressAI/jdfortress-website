# JD Fortress — Cost Reduction Potential Calculator

## Web Implementation Specification

**Purpose:** An interactive sub-page of [jdfortress.com](https://jdfortress.com) that lets law firm decision-makers (CEO, CTO) input their firm's details and instantly see the financial case for adopting JDFortVault — an on-premises AI solution for legal workflows.

**Tagline:** *"Your Data. Your AI. Your Fortress."*

---

## 1. USER INPUTS

Three inputs drive every calculation. Present these as prominent, interactive controls (sliders with numeric readout, or stepper inputs).

| # | Input Label | Variable Name | Type | Default | Constraints | Notes |
|---|---|---|---|---|---|---|
| 1 | **Number of Lawyers** | `numLawyers` | Integer slider / stepper | 5 | Min: 1, Max: 100 | How many users will interact with the AI system |
| 2 | **Number of JDF Vaults** | `numVaults` | Integer slider / stepper | 3 | Min: 1, Max: 20 | Hardware units to be deployed |
| 3 | **Time Horizon (years)** | `timeHorizon` | Integer slider / stepper | 2 | Min: 1, Max: 10 | Period over which to evaluate costs vs. benefits |

Optional text field (non-computational): **Customer Name** (default: "Your Firm") — used to personalise the proposal output.

---

## 2. ASSUMPTIONS (Constants)

These are **not** user-editable in the calculator UI (but should be displayed in a collapsible "Assumptions & Methodology" panel so decision-makers can inspect the basis). All monetary values in GBP (£).

### 2.1 Cost Assumptions

| Parameter | Variable Name | Value | Description |
|---|---|---|---|
| Hardware cost per Vault | `hardwareCostPerVault` | £8,000 | 2025 Mac Studio (M3 Ultra, 256GB RAM, 2TB SSD) with custom security enhancements for air-gapped deployment |
| Setup cost (first vault) | `setupCostFirst` | £6,000 | Professional installation, RAG pipeline config, data source integration, security audits |
| Setup cost (each additional vault) | `setupCostAdditional` | £2,000 | Incremental setup for additional units |
| Training cost (one-off) | `trainingCost` | £2,000 | On-site or virtual training for up to 10 users |
| VAT rate | `vatRate` | 20% | UK standard VAT |
| Electricity cost per vault/month | `electricityCostPerVaultMonth` | £11.20 | Based on 200W avg load × 160 hrs/month × £0.35/kWh |
| Maintenance/support per vault/month | `supportCostPerVaultMonth` | £900 | Monthly model monitoring, updates, evaluation, priority support |
| Discount rate (for NPV) | `discountRate` | 5% | Used to calculate net present value of total costs |

### 2.2 Benefit Assumptions

| Parameter | Variable Name | Value | Description |
|---|---|---|---|
| Productivity multiplier | `productivityMultiplier` | 1.2 | AI makes lawyers 1.2× more productive (e.g., research time drops from 10 hours to ~4 hours per task) |
| Working hours per month | `hoursPerMonth` | 160 | 8 hours/day × 20 working days |
| Freed-up hour recoup rate | `recoupRate` | 0.5 (50%) | Proportion of freed-up time that converts to billable hours (the rest is admin, breaks, etc.) |
| Average lawyer salary (per year) | `avgSalaryYear` | £85,000 | Mid-level UK solicitor; includes benefits & overheads at 1.5× base |
| Hiring cost per FTE | `hiringCostPerFTE` | £10,000 | Recruitment fees + onboarding cost |
| Billing rate per hour | `billingRate` | £300 | Client-facing hourly rate |

### 2.3 Other Assumptions (informational, used in NPV only)

| Parameter | Variable Name | Value |
|---|---|---|
| Inflation rate | `inflationRate` | 3% |
| Lease term | `leaseTerm` | 3 years |
| Lease interest rate | `leaseInterestRate` | 5% |
| End-of-lease buyout | `leaseBuyout` | 10% |

---

## 3. CALCULATIONS — TOTAL COSTS

### 3.1 Initial Costs (One-Off)

```
hardware       = numVaults × hardwareCostPerVault
setup          = (1 × setupCostFirst) + ((numVaults - 1) × setupCostAdditional)
training       = trainingCost                          // fixed, regardless of vault count
subtotal       = hardware + setup + training
vat            = 0.20 × subtotal
totalInitial   = subtotal + vat
```

**Example (3 vaults):**
- Hardware: 3 × £8,000 = £24,000
- Setup: £6,000 + 2 × £2,000 = £10,000
- Training: £2,000
- Subtotal: £36,000
- VAT: £7,200
- **Total Initial: £43,200**

### 3.2 Running Costs (Recurring)

```
electricityPerMonth  = electricityCostPerVaultMonth × numVaults
electricityPerYear   = electricityPerMonth × 12

supportPerMonth      = supportCostPerVaultMonth × numVaults
supportPerYear       = supportPerMonth × 12

totalRunningPerMonth = electricityPerMonth + supportPerMonth
totalRunningPerYear  = totalRunningPerMonth × 12
```

**Example (3 vaults):**
- Electricity: £11.20 × 3 = £33.60/month → £403.20/year
- Support: £900 × 3 = £2,700/month → £32,400/year
- **Total Running: £2,733.60/month → £32,803.20/year**

### 3.3 Total Cost — NPV (Net Present Value)

The NPV calculation discounts the running costs over the time horizon and adds the initial outlay:

```
NPV = totalInitial + Σ (totalRunningPerYear / (1 + discountRate)^t)  for t = 1 to timeHorizon
```

Simplified implementation (matching the spreadsheet's NPV formula which passes `timeHorizon` years of annual running costs):

```javascript
function calculateNPV(discountRate, annualCost, years, initialCost) {
    let npv = 0;
    for (let t = 1; t <= years; t++) {
        npv += annualCost / Math.pow(1 + discountRate, t);
    }
    return npv + initialCost;
}

totalCostNPV = calculateNPV(discountRate, totalRunningPerYear, timeHorizon, totalInitial)
```

**Example (3 vaults, 2 years):**
- NPV ≈ £43,200 + £32,803.20/1.05 + £32,803.20/1.05² ≈ £132,531

---

## 4. CALCULATIONS — TOTAL SAVINGS & REVENUE UPLIFT

### 4.1 Productivity Gains

```
timeSavedPerLawyerPerMonth = hoursPerMonth × (1 - 1/productivityMultiplier)
totalTimeSavedPerMonth     = timeSavedPerLawyerPerMonth × numLawyers
equivalentFTESaved         = totalTimeSavedPerMonth / hoursPerMonth
```

**Example (5 lawyers, 1.2× multiplier):**
- Time saved per lawyer: 160 × (1 - 1/1.2) = 160 × 0.1667 = **26.67 hrs/month**
- Total time saved: 26.67 × 5 = **133.33 hrs/month**
- Equivalent FTE: 133.33 / 160 = **0.83 FTE**

### 4.2 Cost Reductions (Direct Salary Savings)

```
avoidedHiringCosts        = equivalentFTESaved × hiringCostPerFTE
salarySavingsPerYear      = avgSalaryYear × equivalentFTESaved
salarySavingsPerMonth     = salarySavingsPerYear / 12
totalCostSavingsOverHorizon = (salarySavingsPerYear × timeHorizon) + avoidedHiringCosts
```

**Example (0.83 FTE, 2 years):**
- Avoided hiring: 0.833 × £10,000 = **£8,333**
- Salary savings/year: £85,000 × 0.833 = **£70,833/year**
- Total cost savings: (£70,833 × 2) + £8,333 = **£150,000**

### 4.3 Revenue Uplift (Additional Billable Hours)

```
additionalBillableHoursPerMonth = totalTimeSavedPerMonth × recoupRate
additionalRevenuePerMonth       = additionalBillableHoursPerMonth × billingRate
additionalRevenuePerYear        = additionalRevenuePerMonth × 12
additionalRevenueOverHorizon    = additionalRevenuePerYear × timeHorizon
```

**Example (5 lawyers, 2 years):**
- Billable hours: 133.33 × 0.5 = **66.67 hrs/month**
- Revenue: 66.67 × £300 = **£20,000/month → £240,000/year**
- Over horizon: £240,000 × 2 = **£480,000**

### 4.4 Total Money Saved Over Time Horizon

```
totalMoneySaved = additionalRevenueOverHorizon + totalCostSavingsOverHorizon
```

**Example:** £480,000 + £150,000 = **£630,000**

### 4.5 ROI Payback Period (months)

```
roiMonths = ROUNDUP( (totalCostNPV / totalMoneySaved) × 12 × timeHorizon )
```

**Example:** ROUNDUP(£132,531 / £630,000 × 12 × 2) = ROUNDUP(5.05) = **6 months**

---

## 5. PROPOSAL OUTPUT (Dynamic Text)

The calculator generates a personalised proposal letter. Render this as a styled card/panel below the calculator. All `{{placeholders}}` are computed values.

### Structure:

> **PROPOSAL**
>
> At JD Fortress AI Ltd, we empower businesses like yours with "Your Data. Your AI. Your Fortress" – secure, on-premises solutions that give your employees superpowers without risking data leaks.
>
> Our JDFortVault, a tailored 2025 Mac Studio powerhouse with 256GB RAM and custom RAG pipelines, transforms legal workflows by accelerating case research, compliance, and decision-making by up to **{{productivityMultiplier}}x**.
>
> Based on your inputs, **{{numLawyers}}** lawyers at **£{{avgSalaryYear formatted}}/year**, billing **£{{billingRate}}/hour**), significant cost reduction is possible. We strongly recommend immediately considering adoption. Here is the impact breakdown:
>
> **Total Costs ({{numVaults}}x JDF Vaults + total running costs)**
> £{{totalInitial formatted}} initial + £{{totalRunningPerMonth formatted}}/month running.
>
> **Savings & Revenue Boost**
> Save **£{{salarySavingsPerYear formatted}}** per year on salaries by avoiding **{{equivalentFTESaved rounded to 1 decimal}}** FTE hires, plus generate **£{{additionalRevenuePerYear formatted}}** in extra billable revenue annually. Over **{{timeHorizon}}** years, that is **£{{totalMoneySaved formatted}}**, with ROI in under **{{roiMonths}}** months.
>
> Let's schedule a pilot: Contact us at **contact@jdfortress.com** or **07401-059732**. Secure your fortress today and watch your team soar.
>
> Best Regards,
>
> **Joseph Bae & Dev Chellappa**
> Founders, JD Fortress AI Ltd
> *"Give Your Employees Superpowers"*

---

## 6. UI LAYOUT & COMPONENT SPECIFICATION

### 6.1 Page Structure

```
┌─────────────────────────────────────────────────────────┐
│  HERO SECTION                                           │
│  "See How Much Your Firm Could Save with JDFortVault"   │
│  Tagline: Your Data. Your AI. Your Fortress.            │
├─────────────────────────────────────────────────────────┤
│  INPUT PANEL (sticky or top-section)                    │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐    │
│  │ Lawyers: [5] │ │ Vaults:  [3] │ │ Years:   [2] │    │
│  │ ◄━━━━━●━━━━► │ │ ◄━━●━━━━━━► │ │ ◄━━●━━━━━━► │    │
│  └──────────────┘ └──────────────┘ └──────────────┘    │
├─────────────────────────────────────────────────────────┤
│  RESULTS DASHBOARD (updates in real-time)               │
│                                                         │
│  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐    │
│  │ TOTAL COST  │  │ TOTAL       │  │ ROI          │    │
│  │ (NPV)       │  │ SAVINGS     │  │ PAYBACK      │    │
│  │ £132,531    │  │ £630,000    │  │ 6 months     │    │
│  └─────────────┘  └─────────────┘  └─────────────┘    │
│                                                         │
│  ┌─────────────────────────────────────────────────┐   │
│  │  COST BREAKDOWN          │  SAVINGS BREAKDOWN    │   │
│  │  ● Initial: £43,200      │  ● Salary: £70,833/yr │   │
│  │  ● Running: £2,734/mo    │  ● Revenue: £240K/yr  │   │
│  │  ● Electricity: £34/mo   │  ● FTE Avoided: 0.8   │   │
│  │  ● Support: £2,700/mo    │  ● Billable: 67hrs/mo │   │
│  └─────────────────────────────────────────────────┘   │
├─────────────────────────────────────────────────────────┤
│  GENERATED PROPOSAL (styled letter/card)                │
│  [Full dynamic proposal text as described in §5]        │
│                                                         │
│  [ 📄 Download as PDF ]  [ 📧 Email This Proposal ]    │
├─────────────────────────────────────────────────────────┤
│  ▸ Assumptions & Methodology (collapsible accordion)    │
│    Shows all assumption values from §2 in a table       │
├─────────────────────────────────────────────────────────┤
│  CTA SECTION                                            │
│  "Ready to secure your fortress?"                       │
│  [ Schedule a Pilot ]  [ Contact Us ]                   │
└─────────────────────────────────────────────────────────┘
```

### 6.2 Key UI Components

| Component | Type | Behaviour |
|---|---|---|
| **Lawyer slider** | Range slider + number input | Updates all calculations in real-time on change |
| **Vault slider** | Range slider + number input | Updates all calculations in real-time on change |
| **Year slider** | Range slider + number input | Updates all calculations in real-time on change |
| **KPI cards** (3) | Stat cards with large numbers | Total Cost NPV, Total Savings, ROI Payback — animated number transitions |
| **Cost breakdown** | Two-column detail panel | Left: costs itemised; Right: savings itemised |
| **Proposal card** | Styled letter format | White card with professional typography, dynamically populated |
| **Assumptions accordion** | Collapsible panel | Shows all constants from §2 in a readable table |
| **CTA buttons** | Primary action buttons | Link to contact form / email |

### 6.3 Number Formatting

- All GBP values: `£` prefix, comma-separated thousands, no decimals for whole numbers, up to 2 decimals otherwise
- FTE: 1 decimal place (e.g., "0.8 FTE")
- Months: whole number, rounded up (ROUNDUP)
- Hours: whole number or 1 decimal
- Multiplier: 1 decimal (e.g., "1.2x")

---

## 7. COMPLETE FORMULA REFERENCE (JavaScript-ready)

```javascript
// === INPUTS ===
const numLawyers   = 5;   // user input
const numVaults    = 3;   // user input
const timeHorizon  = 2;   // user input

// === ASSUMPTIONS (constants) ===
const HARDWARE_COST_PER_VAULT   = 8000;
const SETUP_COST_FIRST          = 6000;
const SETUP_COST_ADDITIONAL     = 2000;
const TRAINING_COST             = 2000;
const VAT_RATE                  = 0.20;
const ELECTRICITY_PER_VAULT_MO  = 11.20;
const SUPPORT_PER_VAULT_MO      = 900;
const DISCOUNT_RATE             = 0.05;
const PRODUCTIVITY_MULTIPLIER   = 1.2;
const HOURS_PER_MONTH           = 160;
const RECOUP_RATE               = 0.50;
const AVG_SALARY_YEAR           = 85000;
const HIRING_COST_PER_FTE       = 10000;
const BILLING_RATE              = 300;

// === TOTAL COSTS ===
const hardware     = numVaults * HARDWARE_COST_PER_VAULT;
const setup        = SETUP_COST_FIRST + (numVaults - 1) * SETUP_COST_ADDITIONAL;
const training     = TRAINING_COST;
const subtotal     = hardware + setup + training;
const vat          = VAT_RATE * subtotal;
const totalInitial = subtotal + vat;

const electricityMo  = ELECTRICITY_PER_VAULT_MO * numVaults;
const electricityYr  = electricityMo * 12;
const supportMo      = SUPPORT_PER_VAULT_MO * numVaults;
const supportYr      = supportMo * 12;
const totalRunningMo = electricityMo + supportMo;
const totalRunningYr = totalRunningMo * 12;

// NPV of total costs
let npvRunning = 0;
for (let t = 1; t <= timeHorizon; t++) {
    npvRunning += totalRunningYr / Math.pow(1 + DISCOUNT_RATE, t);
}
const totalCostNPV = totalInitial + npvRunning;

// === TOTAL SAVINGS ===
const timeSavedPerLawyerMo   = HOURS_PER_MONTH * (1 - 1 / PRODUCTIVITY_MULTIPLIER);
const totalTimeSavedMo       = timeSavedPerLawyerMo * numLawyers;
const equivalentFTE          = totalTimeSavedMo / HOURS_PER_MONTH;

const avoidedHiringCosts     = equivalentFTE * HIRING_COST_PER_FTE;
const salarySavingsYr        = AVG_SALARY_YEAR * equivalentFTE;
const salarySavingsMo        = salarySavingsYr / 12;
const totalCostSavings       = (salarySavingsYr * timeHorizon) + avoidedHiringCosts;

const additionalBillableHrsMo = totalTimeSavedMo * RECOUP_RATE;
const additionalRevenueMo     = additionalBillableHrsMo * BILLING_RATE;
const additionalRevenueYr     = additionalRevenueMo * 12;
const additionalRevenueHorizon = additionalRevenueYr * timeHorizon;

const totalMoneySaved = additionalRevenueHorizon + totalCostSavings;

// ROI payback in months
const roiMonths = Math.ceil((totalCostNPV / totalMoneySaved) * 12 * timeHorizon);
```

---

## 8. PRODUCT COMPARISON TABLE (Optional Section)

Display as a comparison grid if the page should showcase the full JDF product line:

| | JDF9X | JDFSpan | **JDFVault** | JDFTower |
|---|---|---|---|---|
| Hardware | £0 | £0 | £9,000 | £50,000 |
| Software Setup | £20,000 | £30,000 | £30,000 | £30,000 |
| Evaluation Framework | £10,000 | £10,000 | £10,000 | £10,000 |
| **Total Initial** | **£30,000** | **£40,000** | **£49,000** | **£90,000** |

*Note: The calculator above models JDFVault specifically. The comparison table uses slightly different cost breakdowns from a separate product catalogue sheet. Display this as supplementary context only.*

---

## 9. DESIGN & BRAND NOTES

- **Brand colours:** Use JD Fortress brand palette from jdfortress.com (dark/fortress theme — navy, charcoal, gold accents)
- **Tone:** Authoritative, secure, professional — targeting C-suite legal decision-makers
- **Key selling emotion:** Confidence that this is a sound financial investment, not just a tech purchase
- **Must-have visual:** The three KPI cards (Cost, Savings, ROI) should be the visual centrepiece — large, bold, impossible to miss
- **Animations:** Numbers should animate/count up when inputs change; smooth transitions
- **Mobile:** Sliders should stack vertically; results cards should be scrollable
- **Accessibility:** All interactive elements keyboard-navigable; contrast ratios WCAG AA minimum
