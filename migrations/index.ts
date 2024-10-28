import { createInitialTables } from './001.initial';
import { insertCategories } from './002.insert-categories';
import { insertTransactions } from './003.insert-transactions';

export default [createInitialTables, insertCategories, insertTransactions];
