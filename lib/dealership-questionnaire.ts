export type DealershipFieldType = 'text' | 'email' | 'tel' | 'textarea' | 'checkbox' | 'select';

export type DealershipFieldOption = {
  value: string;
  label: string;
};

export type DealershipFieldDef = {
  key: string;
  label: string;
  required: boolean;
  type?: DealershipFieldType;
  hint?: string;
  half?: boolean;
  options?: DealershipFieldOption[];
  step: number;
};

export const DEALERSHIP_QUESTIONNAIRE_VERSION = '2026-06';

export const DEALERSHIP_QUESTIONNAIRE_STEPS = [
  { id: 1, title: 'Company', description: 'Business identity & contact' },
  { id: 2, title: 'Location', description: 'Address & site details' },
  { id: 3, title: 'Operations', description: 'Fuel volume & program fit' },
  { id: 4, title: 'Review', description: 'Confirm & submit' },
] as const;

export const DEALERSHIP_TYPE_OPTIONS: DealershipFieldOption[] = [
  { value: 'fuel_station', label: 'Fuel station' },
  { value: 'convenience_store', label: 'Convenience store with fuel' },
  { value: 'truck_stop', label: 'Truck stop / travel center' },
  { value: 'fleet_fueling', label: 'Fleet fueling' },
  { value: 'wholesale', label: 'Wholesale / distributor' },
  { value: 'other', label: 'Other' },
];

export const LOCATION_COUNT_OPTIONS: DealershipFieldOption[] = [
  { value: '1', label: '1 location' },
  { value: '2-5', label: '2–5 locations' },
  { value: '6-10', label: '6–10 locations' },
  { value: '11+', label: '11 or more' },
];

export const MONTHLY_VOLUME_OPTIONS: DealershipFieldOption[] = [
  { value: 'under_10k', label: 'Under 10,000 gallons' },
  { value: '10k_25k', label: '10,000 – 25,000 gallons' },
  { value: '25k_50k', label: '25,000 – 50,000 gallons' },
  { value: '50k_100k', label: '50,000 – 100,000 gallons' },
  { value: '100k_plus', label: '100,000+ gallons' },
  { value: 'unsure', label: 'Not sure yet' },
];

export const EMPLOYEE_COUNT_OPTIONS: DealershipFieldOption[] = [
  { value: '1-5', label: '1–5 employees' },
  { value: '6-15', label: '6–15 employees' },
  { value: '16-50', label: '16–50 employees' },
  { value: '51+', label: '51+ employees' },
];

export const US_STATE_OPTIONS: DealershipFieldOption[] = [
  'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA', 'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA',
  'ME', 'MD', 'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ', 'NM', 'NY', 'NC', 'ND', 'OH', 'OK',
  'OR', 'PA', 'RI', 'SC', 'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY', 'DC',
].map((code) => ({ value: code, label: code }));

export const DEALERSHIP_FIELDS: DealershipFieldDef[] = [
  { key: 'companyName', label: 'Company / dealership name', required: true, step: 1 },
  { key: 'legalBusinessName', label: 'Legal business name (if different)', required: false, half: true, step: 1 },
  { key: 'contactName', label: 'Primary contact name', required: true, half: true, step: 1 },
  { key: 'contactTitle', label: 'Contact title / role', required: false, half: true, step: 1, hint: 'e.g. Owner, GM' },
  { key: 'contactEmail', label: 'Contact email', type: 'email', required: true, step: 1, hint: 'Used for application updates.' },
  { key: 'contactPhone', label: 'Contact phone', type: 'tel', required: true, half: true, step: 1 },
  { key: 'website', label: 'Business website', required: false, half: true, step: 1, hint: 'Optional' },

  { key: 'businessAddress', label: 'Street address', required: true, step: 2 },
  { key: 'city', label: 'City', required: true, half: true, step: 2 },
  {
    key: 'state',
    label: 'State',
    type: 'select',
    required: true,
    half: true,
    options: US_STATE_OPTIONS,
    step: 2,
  },
  { key: 'zipCode', label: 'ZIP code', required: true, half: true, step: 2, hint: '5-digit US ZIP' },
  { key: 'yearsInBusiness', label: 'Years in business', required: true, half: true, step: 2 },
  {
    key: 'numberOfLocations',
    label: 'Number of locations',
    type: 'select',
    required: true,
    half: true,
    options: LOCATION_COUNT_OPTIONS,
    step: 2,
  },
  {
    key: 'dealershipType',
    label: 'Primary business type',
    type: 'select',
    required: true,
    half: true,
    options: DEALERSHIP_TYPE_OPTIONS,
    step: 2,
  },
  { key: 'hoursOfOperation', label: 'Hours of operation', required: false, step: 2, hint: 'e.g. Mon–Sat 6am–10pm' },

  {
    key: 'monthlyVolume',
    label: 'Estimated monthly fuel volume',
    type: 'select',
    required: true,
    options: MONTHLY_VOLUME_OPTIONS,
    step: 3,
  },
  { key: 'currentFuelBrands', label: 'Current fuel brands supplied', required: false, half: true, step: 3 },
  {
    key: 'storageCapacity',
    label: 'Fuel storage capacity',
    required: false,
    half: true,
    step: 3,
    hint: 'e.g. 12,000 gal underground',
  },
  {
    key: 'employeeCount',
    label: 'Number of employees',
    type: 'select',
    required: false,
    half: true,
    options: EMPLOYEE_COUNT_OPTIONS,
    step: 3,
  },
  {
    key: 'priorRpRelationship',
    label: 'I have previously worked with R&P Global Energies',
    type: 'checkbox',
    required: false,
    step: 3,
  },
  {
    key: 'additionalInfo',
    label: 'Tell us about your business & partnership goals',
    type: 'textarea',
    required: false,
    step: 3,
  },

  {
    key: 'agreeTerms',
    label: 'I agree to be contacted about the R&P dealership program',
    type: 'checkbox',
    required: true,
    step: 4,
  },
  {
    key: 'agreeAccurate',
    label: 'I confirm the information provided is accurate',
    type: 'checkbox',
    required: true,
    step: 4,
  },
];

const OPTION_LOOKUP = new Map<string, Map<string, string>>();

function registerOptions(key: string, options: DealershipFieldOption[]) {
  OPTION_LOOKUP.set(key, new Map(options.map((option) => [option.value, option.label])));
}

registerOptions('dealershipType', DEALERSHIP_TYPE_OPTIONS);
registerOptions('numberOfLocations', LOCATION_COUNT_OPTIONS);
registerOptions('monthlyVolume', MONTHLY_VOLUME_OPTIONS);
registerOptions('employeeCount', EMPLOYEE_COUNT_OPTIONS);
registerOptions('state', US_STATE_OPTIONS);

export function getDealershipFieldsForStep(step: number) {
  return DEALERSHIP_FIELDS.filter((field) => field.step === step);
}

export function getDealershipReviewFields() {
  return DEALERSHIP_FIELDS.filter((field) => field.type !== 'checkbox' && field.step < 4);
}

export function formatDealershipAnswer(key: string, value: string | boolean | undefined) {
  if (value === undefined || value === null || value === '') return '—';
  if (typeof value === 'boolean') return value ? 'Yes' : 'No';
  const label = OPTION_LOOKUP.get(key)?.get(String(value));
  return label || String(value);
}

export function validateDealershipStep(
  step: number,
  answers: Record<string, string | boolean>
): string | null {
  const fields = getDealershipFieldsForStep(step);

  for (const field of fields) {
    if (field.required && field.type === 'checkbox') {
      if (!answers[field.key]) {
        return `Please confirm: ${field.label}`;
      }
      continue;
    }

    if (!field.required) continue;

    const raw = answers[field.key];
    const value = typeof raw === 'string' ? raw.trim() : raw;
    if (!value) {
      return `${field.label} is required`;
    }

    if (field.key === 'contactEmail' && typeof value === 'string' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      return 'Enter a valid contact email';
    }

    if (field.key === 'zipCode' && typeof value === 'string' && !/^\d{5}$/.test(value)) {
      return 'Enter a valid 5-digit ZIP code';
    }
  }

  return null;
}
