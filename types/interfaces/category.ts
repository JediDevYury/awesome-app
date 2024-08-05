export enum CategoryType {
  Income = 'Income',
  Expense = 'Expense',
}

export interface Category {
  id: string;
  name: string;
  type: keyof typeof CategoryType;
}
