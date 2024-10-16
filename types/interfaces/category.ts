export enum CategoryType {
  Income = 'Income',
  Expense = 'Expense',
}

export interface Category {
  id: number;
  name: string;
  type: keyof typeof CategoryType;
}
