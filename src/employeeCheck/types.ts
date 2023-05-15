export type WeeklyHours = {
  sunday?: number;
  monday?: number;
  tuesday?: number;
  wednesday?: number;
  thursday?: number;
  friday?: number;
  saturday?: number;
};

export type PayTypeHours = {
  payRate?: number;
  hours: WeeklyHours;
};

export type ProjectHours = {
  straightTime: PayTypeHours;
  timeAndAHalf: PayTypeHours;
  doubleTime: PayTypeHours;
};

export type FringeBenefit = {
  description: string;
  amount: number;
};

export type Deduction = {
  code: string;
  description: string;
  amount?: number;
};

export type Reimbursement = {
  code: string;
  description: string;
  amount?: number;
};

export type EmployeeCheck = {
  payClass: string;
  payRate: string;
  employee: {
    firstName: string;
    lastName: string;
    middleInitial?: string;
    address: {
      streetAddress: string;
      city: string;
      state: string;
      zip: string;
    };
    ssn: string;
    gender: string;
    race: string;
  };
  hoursWorked: {
    thisProject: ProjectHours;
    otherProjects?: ProjectHours;
  };
  projectWage: number;
  totalGross: number;
  taxes: {
    federal: {
      federalIncomeTax?: number;
      fica?: number;
      medicare?: number;
      federalExemptions?: number;
    };
    state?: number;
    local?: number;
  };
  sdiSuiOther?: number;
  totalDeductions: number;
  net: number;
  fringeDetail: FringeBenefit[];
  deductions: Deduction[];
  reimbursements: Reimbursement[];
};

export type ParseParams = {
  allLines: string[];
  columnStart: number;
  columnEnd: number;
};
