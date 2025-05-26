// Mock API service for check analysis and SAP integration

export interface AnalysisResult {
  id: string;
  fileName: string;
  status: 'success' | 'error';
  data?: {
    checkNumber: string;
    amount: string;
    date: string;
    payee: string;
    bankName: string;
    accountNumber: string;
    routingNumber: string;
    memo: string;
    signature: boolean;
  };
  error?: string;
  thumbnail?: string;
}

export interface ProgressUpdate {
  progress: number;
  currentFile?: string;
  totalFiles: number;
  processedFiles: number;
}

// Mock function to generate a random check number
const generateCheckNumber = () => {
  return Math.floor(1000 + Math.random() * 9000).toString();
};

// Mock function to generate a random amount between $10 and $10,000
const generateAmount = () => {
  const amount = (10 + Math.random() * 9990).toFixed(2);
  return `$${amount}`;
};

// Mock function to generate a random date within the last 90 days
const generateDate = () => {
  const today = new Date();
  const daysAgo = Math.floor(Math.random() * 90);
  const date = new Date(today);
  date.setDate(today.getDate() - daysAgo);
  return date.toLocaleDateString('en-US');
};

// Mock function to generate a random payee name
const generatePayee = () => {
  const payees = [
    'John Smith',
    'ABC Corporation',
    'Global Enterprises',
    'Tech Solutions Inc.',
    'Sarah Johnson',
    'Medical Center',
    'University of Technology',
    'Insurance Company',
    'Legal Services LLC',
    'Consulting Group'
  ];
  return payees[Math.floor(Math.random() * payees.length)];
};

// Mock function to generate a random bank name
const generateBankName = () => {
  const banks = [
    'First National Bank',
    'Global Financial',
    'City Trust',
    'Metro Credit Union',
    'United Bank',
    'Capital One',
    'Chase',
    'Bank of America',
    'Wells Fargo',
    'Citibank'
  ];
  return banks[Math.floor(Math.random() * banks.length)];
};

// Mock function to generate a random account number
const generateAccountNumber = () => {
  return `XXXX-XXXX-${Math.floor(1000 + Math.random() * 9000)}`;
};

// Mock function to generate a random routing number
const generateRoutingNumber = () => {
  return `${Math.floor(100000000 + Math.random() * 900000000)}`;
};

// Mock function to generate a random memo
const generateMemo = () => {
  const memos = [
    'Invoice payment',
    'Monthly service',
    'Consulting fee',
    'Reimbursement',
    'Contract work',
    'Membership dues',
    'Subscription',
    'Maintenance fee',
    'Rent payment',
    'Miscellaneous'
  ];
  return memos[Math.floor(Math.random() * memos.length)];
};

// Simulate file analysis with progress updates
export const analyzeFiles = async (
  files: File[],
  onProgress?: (update: ProgressUpdate) => void
): Promise<AnalysisResult[]> => {
  const results: AnalysisResult[] = [];
  
  // Simulate API call with progress updates
  for (let i = 0; i < files.length; i++) {
    const file = files[i];
    
    // Update progress at the start of each file
    if (onProgress) {
      onProgress({
        progress: Math.round((i / files.length) * 100),
        currentFile: file.name,
        totalFiles: files.length,
        processedFiles: i
      });
    }
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Simulate intermediate progress for current file
    if (onProgress && i < files.length - 1) {
      for (let progress = 25; progress <= 75; progress += 25) {
        await new Promise(resolve => setTimeout(resolve, 300));
        onProgress({
          progress: Math.round((i / files.length) * 100) + Math.round((progress / 100) * (100 / files.length)),
          currentFile: file.name,
          totalFiles: files.length,
          processedFiles: i
        });
      }
    }
    
    // Randomly determine if analysis is successful (80% success rate)
    const isSuccess = Math.random() > 0.2;
    
    if (isSuccess) {
      // Simulate successful analysis
      results.push({
        id: `check-${Date.now()}-${i}`,
        fileName: file.name,
        status: 'success',
        data: {
          checkNumber: generateCheckNumber(),
          amount: generateAmount(),
          date: generateDate(),
          payee: generatePayee(),
          bankName: generateBankName(),
          accountNumber: generateAccountNumber(),
          routingNumber: generateRoutingNumber(),
          memo: generateMemo(),
          signature: Math.random() > 0.05
        }
      });
    } else {
      // Simulate failed analysis
      const errorMessages = [
        'Could not read check amount',
        'Signature not detected',
        'Poor image quality',
        'Check date not recognized'
      ];
      
      results.push({
        id: `check-${Date.now()}-${i}`,
        fileName: file.name,
        status: 'error',
        error: errorMessages[Math.floor(Math.random() * errorMessages.length)]
      });
    }
    
    // Update progress at the end of each file
    if (onProgress) {
      onProgress({
        progress: Math.round(((i + 1) / files.length) * 100),
        currentFile: i < files.length - 1 ? files[i + 1].name : undefined,
        totalFiles: files.length,
        processedFiles: i + 1
      });
    }
  }
  
  return results;
};

// Simulate exporting results to SAP
export const exportToSAP = async (results: AnalysisResult[]): Promise<{ success: boolean, message: string }> => {
  return new Promise((resolve, reject) => {
    // Validate results
    if (!results || results.length === 0) {
      reject(new Error('No results to export'));
      return;
    }
    
    // Count successful results
    const successfulResults = results.filter(r => r.status === 'success');
    
    if (successfulResults.length === 0) {
      reject(new Error('No valid check data to export'));
      return;
    }
    
    // Simulate API delay
    setTimeout(() => {
      // 95% success rate for the mock export
      const isSuccess = Math.random() > 0.05;
      
      if (isSuccess) {
        resolve({
          success: true,
          message: `Successfully exported ${successfulResults.length} check${successfulResults.length === 1 ? '' : 's'} to SAP`
        });
      } else {
        reject(new Error('SAP connection error. Please try again.'));
      }
    }, 1000 + Math.random() * 1000);
  });
};
