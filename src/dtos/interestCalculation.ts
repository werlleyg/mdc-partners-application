export interface IInterestCalculationData {
  initialInvestment?: string;
  interestRate?: string;
  typeOfInterest?: "simple_interest" | "compound_interest";
  investmentMonths?: string;
  showResult?: boolean;
  investmentAmount?: string;
}
