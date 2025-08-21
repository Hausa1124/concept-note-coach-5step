// Sector-based objective suggestions
export const SECTOR_OBJECTIVES = {
  Health: [
    { type: "Outcome", text: "Improve maternal and child health outcomes", example: true },
    { type: "Output", text: "Strengthen health system capacity", example: true },
    { type: "Output", text: "Increase access to essential health services", example: true },
  ],
  Education: [
    { type: "Outcome", text: "Improve learning outcomes for primary school children", example: true },
    { type: "Output", text: "Train teachers in modern pedagogical methods", example: true },
    { type: "Output", text: "Provide educational materials and infrastructure", example: true },
  ],
  WASH: [
    { type: "Outcome", text: "Increase access to safe water and sanitation", example: true },
    { type: "Output", text: "Construct water points and sanitation facilities", example: true },
    { type: "Output", text: "Promote hygiene behavior change", example: true },
  ],
  Agriculture: [
    { type: "Outcome", text: "Increase agricultural productivity and income", example: true },
    { type: "Output", text: "Provide training on improved farming techniques", example: true },
    { type: "Output", text: "Facilitate access to quality inputs and markets", example: true },
  ],
  "Economic Development": [
    { type: "Outcome", text: "Increase employment and income opportunities", example: true },
    { type: "Output", text: "Provide vocational training and business skills", example: true },
    { type: "Output", text: "Support micro and small enterprise development", example: true },
  ],
  Other: [
    { type: "Outcome", text: "Achieve measurable positive change", example: true },
    { type: "Output", text: "Deliver key project activities", example: true },
  ],
} as const;

// Donor-specific guidance
export const DONOR_GUIDANCE = {
  EU: "Focus on sustainability, local ownership, and alignment with EU development priorities.",
  USAID: "Emphasize capacity building, measurable results, and alignment with USAID's development objectives.",
  FAO: "Highlight food security, agricultural innovation, and rural development outcomes.",
  WHO: "Focus on health system strengthening, evidence-based interventions, and health equity.",
  "World Bank": "Emphasize poverty reduction, economic growth, and institutional strengthening.",
  Other: "Ensure objectives are specific, measurable, achievable, relevant, and time-bound.",
} as const;