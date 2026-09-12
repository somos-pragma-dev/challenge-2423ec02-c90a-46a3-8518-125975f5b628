export interface Transaction {
  id: string;
  accountId: string;
  type: TransactionType;
  status: TransactionStatus;
  amount: number;
  currency: string;
  description: string;
  category: TransactionCategory;
  merchant?: MerchantInfo;
  counterparty?: CounterpartyInfo;
  createdAt: Date;
  updatedAt: Date;
  processedAt?: Date;
  settledAt?: Date;
  failedAt?: Date;
  failureReason?: string;
  reference: string;
  externalReference?: string;
  metadata: TransactionMetadata;
  tags: string[];
  attachments: Attachment[];
  isReversed: boolean;
  reversalId?: string;
  recurringRuleId?: string;
  installmentInfo?: InstallmentInfo;
  exchangeRate?: ExchangeRateInfo;
  fees: FeeInfo[];
  balanceAfter?: number;
  balanceBefore?: number;
}

export type TransactionType = 
  | 'credit'
  | 'debit'
  | 'transfer'
  | 'payment'
  | 'withdrawal'
  | 'deposit'
  | 'refund'
  | 'fee'
  | 'interest'
  | 'dividend';

export type TransactionStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'cancelled'
  | 'reversed'
  | 'expired'
  | 'on_hold';

export type TransactionCategory = 
  | 'shopping'
  | 'utilities'
  | 'entertainment'
  | 'food'
  | 'transport'
  | 'health'
  | 'education'
  | 'travel'
  | 'investment'
  | 'salary'
  | 'transfer'
  | 'other';

export interface MerchantInfo {
  id: string;
  name: string;
  category: string;
  location?: string;
  logoUrl?: string;
  website?: string;
  mcc?: string;
}

export interface CounterpartyInfo {
  id: string;
  name: string;
  accountNumber?: string;
  bankName?: string;
  documentType?: string;
  documentNumber?: string;
}

export interface TransactionMetadata {
  ipAddress?: string;
  deviceId?: string;
  channel: 'web' | 'mobile' | 'atm' | 'branch' | 'api';
  location?: string;
  browser?: string;
  os?: string;
  sessionId?: string;
  customFields?: Record<string, unknown>;
}

export interface Attachment {
  id: string;
  fileName: string;
  fileType: string;
  fileSize: number;
  url: string;
  uploadedAt: Date;
}

export interface InstallmentInfo {
  totalInstallments: number;
  currentInstallment: number;
  installmentAmount: number;
  firstDueDate: Date;
  lastDueDate: Date;
  interestRate?: number;
}

export interface ExchangeRateInfo {
  fromCurrency: string;
  toCurrency: string;
  rate: number;
  rateDate: Date;
}

export interface FeeInfo {
  type: FeeType;
  amount: number;
  currency: string;
  description: string;
  taxAmount?: number;
}

export type FeeType = 
  | 'commission'
  | 'processing_fee'
  | 'transfer_fee'
  | 'atm_fee'
  | 'currency_conversion'
  | 'maintenance'
  | 'other';

export interface TransactionSummary {
  totalCredits: number;
  totalDebits: number;
  netAmount: number;
  transactionCount: number;
  averageAmount: number;
  largestTransaction: number;
  smallestTransaction: number;
  byCategory: Record<TransactionCategory, number>;
  byStatus: Record<TransactionStatus, number>;
  byType: Record<TransactionType, number>;
}

export interface TransactionFilter {
  accountId?: string;
  type?: TransactionType[];
  status?: TransactionStatus[];
  category?: TransactionCategory[];
  dateFrom?: Date;
  dateTo?: Date;
  amountMin?: number;
  amountMax?: number;
  merchantId?: string;
  tags?: string[];
  searchQuery?: string;
}

export interface TransactionListResponse {
  transactions: Transaction[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
  hasMore: boolean;
}

export interface TransactionCreateRequest {
  accountId: string;
  type: TransactionType;
  amount: number;
  currency: string;
  description: string;
  category: TransactionCategory;
  counterpartyId?: string;
  metadata?: Partial<TransactionMetadata>;
  scheduledAt?: Date;
  recurringRuleId?: string;
}

export interface TransactionCreateResponse {
  success: boolean;
  transaction: Transaction;
  message: string;
  estimatedCompletionTime?: Date;
}

export interface TransactionExportRequest {
  filter: TransactionFilter;
  format: 'csv' | 'pdf' | 'excel';
  includeAttachments: boolean;
  dateRange: {
    from: Date;
    to: Date;
  };
}

export const TRANSACTION_STATUS_COLORS: Record<TransactionStatus, string> = {
  pending: '#FFA500',
  processing: '#1E90FF',
  completed: '#228B22',
  failed: '#DC143C',
  cancelled: '#808080',
  reversed: '#9370DB',
  expired: '#A9A9A9',
  on_hold: '#FF8C00',
};

export const TRANSACTION_TYPE_ICONS: Record<TransactionType, string> = {
  credit: 'arrow-down-circle',
  debit: 'arrow-up-circle',
  transfer: 'swap-horizontal',
  payment: 'credit-card',
  withdrawal: 'cash',
  deposit: 'bank',
  refund: 'replay',
  fee: 'receipt',
  interest: 'trending-up',
  dividend: 'pie-chart',
};