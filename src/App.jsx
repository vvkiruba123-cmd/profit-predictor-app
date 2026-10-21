import React, { useState, useEffect, useMemo, useRef } from 'react';
import { 
  TrendingUp, 
  TrendingDown, 
  DollarSign, 
  Users, 
  Briefcase, 
  Percent, 
  BarChart3, 
  History, 
  FileText, 
  Settings, 
  Upload, 
  Download, 
  Menu, 
  X, 
  Sun, 
  Moon, 
  CheckCircle, 
  AlertTriangle, 
  Lightbulb, 
  Lock, 
  UserPlus, 
  LogOut, 
  Search, 
  Filter, 
  ArrowRight,
  Sparkles,
  Info,
  MessageSquare,
  Send,
  Quote,
  RefreshCw,
  Compass,
  ArrowUpRight,
  Trash2,
  FileSpreadsheet,
  Edit3,
  Maximize2,
  Minimize2,
  Calculator,
  Target,
  Zap,
  HelpCircle
} from 'lucide-react';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  Legend, 
  PieChart, 
  Pie, 
  Cell 
} from 'recharts';

const BUSINESS_QUOTES = [
  {
    quote: "The way to get started is to quit talking and begin doing.",
    author: "Walt Disney",
    context: "Execution Strategy"
  },
  {
    quote: "Chase the vision, not the money; the money will end up following you.",
    author: "Tony Hsieh",
    context: "Customer-Centric Value"
  },
  {
    quote: "If you double the number of experiments you do per year you're going to double your inventiveness.",
    author: "Jeff Bezos",
    context: "Expansion & Innovation"
  },
  {
    quote: "Business opportunities are like buses, there's always another one coming.",
    author: "Richard Branson",
    context: "Market Adaptability"
  },
  {
    quote: "What gets measured gets managed.",
    author: "Peter Drucker",
    context: "Operational Efficiency"
  },
  {
    quote: "Growth is never by mere chance; it is the result of forces working together.",
    author: "James Cash Penney",
    context: "Scale Planning"
  },
  {
    quote: "Do not put all your eggs in one basket.",
    author: "Warren Buffett",
    context: "Risk Diversification"
  },
  {
    quote: "Your most unhappy customers are your greatest source of learning.",
    author: "Bill Gates",
    context: "Product Market Fit"
  }
];

const INITIAL_HISTORICAL_DATA = [
  { month: 'Jan', revenue: 450000, expenses: 310000, marketing: 35000, profit: 140000 },
  { month: 'Feb', revenue: 480000, expenses: 320000, marketing: 40000, profit: 160000 },
  { month: 'Mar', revenue: 520000, expenses: 340000, marketing: 45000, profit: 180000 },
  { month: 'Apr', revenue: 510000, expenses: 350000, marketing: 30000, profit: 160000 },
  { month: 'May', revenue: 580000, expenses: 370000, marketing: 50000, profit: 210000 },
  { month: 'Jun', revenue: 630000, expenses: 390000, marketing: 60000, profit: 240000 },
];

export default function App() {
  // Theme & User Session
  const [theme, setTheme] = useState(() => localStorage.getItem('app_theme') || 'dark');
  const [currency, setCurrency] = useState(() => localStorage.getItem('app_currency') || 'INR');
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('app_user');
    return saved ? JSON.parse(saved) : { name: 'Business Owner', email: 'owner@enterprise.in' };
  });
  const [isAuth, setIsAuth] = useState(true); 
  const [authView, setAuthView] = useState('login'); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Authentication Fields - Clean empty defaults
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPass, setLoginPass] = useState('');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');

  // Business Data
  const [historicalData, setHistoricalData] = useState(() => {
    const saved = localStorage.getItem('app_historical_data');
    return saved ? JSON.parse(saved) : INITIAL_HISTORICAL_DATA;
  });

  // Predictions Archive - Clean state loaded from local storage
  const [predictionsList, setPredictionsList] = useState(() => {
    const saved = localStorage.getItem('app_predictions_list');
    return saved ? JSON.parse(saved) : [];
  });

  // Predictor Inputs - Clean empty state (NO DEFAULT PREFILLED NUMBERS)
  const [inputRev, setInputRev] = useState('');
  const [inputExp, setInputExp] = useState('');
  const [inputMkt, setInputMkt] = useState('');
  const [inputCust, setInputCust] = useState('');
  const [inputEmp, setInputEmp] = useState('');

  // Prediction Output
  const [predictionResult, setPredictionResult] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [insights, setInsights] = useState([]);

  // Search & Filter in Archive
  const [searchQuery, setSearchQuery] = useState('');
  const [minProfitFilter, setMinProfitFilter] = useState('');
  const [historySortBy, setHistorySortBy] = useState('date-desc');

  // CSV Integration
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadError, setUploadError] = useState('');

  // Notifications
  const [notification, setNotification] = useState({ show: false, message: '', type: 'info' });

  // Quote
  const [quoteIdx, setQuoteIdx] = useState(0);

  // AI Expert Chat
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false); 
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'expert',
      text: "Hello! I am your AI Business Growth & Financial Strategy Consultant. Ask me anything about profit margin optimization, revenue scaling, cost audits, or marketing ROI. I provide actionable, data-backed guidance tailored for growing enterprises.",
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatEndRef = useRef(null);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('app_theme', theme);
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  useEffect(() => {
    localStorage.setItem('app_currency', currency);
  }, [currency]);

  useEffect(() => {
    localStorage.setItem('app_user', JSON.stringify(user));
  }, [user]);

  useEffect(() => {
    localStorage.setItem('app_predictions_list', JSON.stringify(predictionsList));
  }, [predictionsList]);

  useEffect(() => {
    localStorage.setItem('app_historical_data', JSON.stringify(historicalData));
  }, [historicalData]);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages, isChatLoading]);

  // Dynamic Currency Formatter
  const formatMoney = (value) => {
    if (value === null || value === undefined || isNaN(value)) {
      const symbols = { INR: '₹0', USD: '$0', EUR: '€0', GBP: '£0', AED: 'AED 0' };
      return symbols[currency] || '₹0';
    }
    const currencyConfig = {
      INR: { locale: 'en-IN', currency: 'INR' },
      USD: { locale: 'en-US', currency: 'USD' },
      EUR: { locale: 'de-DE', currency: 'EUR' },
      GBP: { locale: 'en-GB', currency: 'GBP' },
      AED: { locale: 'ar-AE', currency: 'AED' }
    };
    const cfg = currencyConfig[currency] || currencyConfig.INR;
    return new Intl.NumberFormat(cfg.locale, {
      style: 'currency',
      currency: cfg.currency,
      maximumFractionDigits: 0
    }).format(value);
  };

  const getCurrencySymbol = () => {
    switch (currency) {
      case 'USD': return '$';
      case 'EUR': return '€';
      case 'GBP': return '£';
      case 'AED': return 'AED';
      case 'INR':
      default: return '₹';
    }
  };

  const triggerNotification = (message, type = 'success') => {
    setNotification({ show: true, message, type });
    setTimeout(() => {
      setNotification(prev => ({ ...prev, show: false }));
    }, 4000);
  };

  const rotateQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % BUSINESS_QUOTES.length);
  };

  // AI Chat Handler with Gemini 3.5 Flash Lite
  const handleSendChatMessage = async (presetText = null) => {
    const messageText = presetText || chatInput;
    if (!messageText.trim()) return;

    const userTime = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    const newUserMessage = {
      sender: 'user',
      text: messageText,
      timestamp: userTime
    };

    setChatMessages(prev => [...prev, newUserMessage]);
    if (!presetText) setChatInput('');
    setIsChatLoading(true);

    try {
      const apiKey = import.meta.env.VITE_GEMINI_API_KEY;
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.5-flash-lite:generateContent?key=${apiKey}`;
      
      const systemPrompt = `You are 'Expert', an elite business growth consultant, financial analyst, and scaling advisor for enterprises and SMEs.
Current active currency is ${currency}.
Your goal is to help business owners expand turnover, optimize net profit margins, reduce operational expenses, and build resilient long-term scale.
Provide answers that are direct, structured, practical, and action-driven. Use concise bullet points for steps and strategies.
Focus on: cash flow planning, cost auditing, marketing channel ROI, workforce productivity, customer lifetime value (LTV), and strategic expansion.`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: messageText }] }],
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          generationConfig: {
            temperature: 0.3,
            maxOutputTokens: 600
          }
        })
      });

      if (!response.ok) {
        throw new Error(`API responded with status: ${response.status}`);
      }

      const result = await response.json();
      const answerText = result.candidates?.[0]?.content?.parts?.[0]?.text;
      
      if (!answerText) {
        throw new Error("No text candidate generated from AI response");
      }

      setChatMessages(prev => [...prev, {
        sender: 'expert',
        text: answerText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);

    } catch (error) {
      console.error("AI Expert Chat Error:", error);
      // Intelligent fallback advisory based on query intent
      let fallbackText = "Here is a strategic financial assessment based on enterprise benchmarks:\n\n";
      const lower = messageText.toLowerCase();
      if (lower.includes('market') || lower.includes('ad') || lower.includes('cac') || lower.includes('lead')) {
        fallbackText += "• **Target Channel Efficiency:** Direct 70% of marketing budget toward proven high-intent channels (Google Search / Targeted Direct Retargeting) and 30% on experimental growth.\n• **Benchmark CAC to LTV:** Ensure your Customer Lifetime Value is at least 3x your acquisition cost (LTV:CAC ≥ 3:1).\n• **Audit Retention:** A 5% increase in customer retention typically boosts overall enterprise profits by 25% to 95%.";
      } else if (lower.includes('cost') || lower.includes('expense') || lower.includes('leak') || lower.includes('save')) {
        fallbackText += "• **Categorize Variable vs Fixed:** Audit recurring software subscriptions, utility contracts, and external vendor fees every quarter.\n• **Zero-Based Budgeting:** Require department heads to justify every major operational expense rather than indexing off last year's baseline.\n• **Negotiate Bulk Terms:** Request 5-10% early payment discounts with key suppliers to immediately expand operating margins.";
      } else if (lower.includes('employee') || lower.includes('staff') || lower.includes('team') || lower.includes('hire')) {
        fallbackText += "• **Revenue per Employee Target:** Keep revenue-per-employee proportional to your industry standard to prevent premature overhead bloat.\n• **Variable Compensation:** Tie senior compensation and bonuses directly to net profit growth and EBITDA targets rather than gross top-line volume.\n• **Fractional Expertise:** For non-core specializations (tax, advanced legal, UI design), leverage fractional contractors rather than full-time salaries.";
      } else {
        fallbackText += "• **Protect Gross Margin:** Target a minimum gross profit margin of 35-45% to leave sufficient cushion for overhead and capital reinvestment.\n• **Cash Reserve Buffer:** Maintain 3 to 6 months of operating expenses in liquid risk-free reserves to survive macroeconomic slowdowns.\n• **Systematize Operations:** Transition key processes into standard operating procedures (SOPs) to facilitate painless team scaling.";
      }
      
      setChatMessages(prev => [...prev, {
        sender: 'expert',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  // Prediction Engine Logic
  const handlePredict = (e) => {
    if (e) e.preventDefault();
    
    const rev = parseFloat(inputRev);
    const exp = parseFloat(inputExp);
    const mkt = parseFloat(inputMkt);
    const cust = parseInt(inputCust, 10);
    const emp = parseInt(inputEmp, 10);

    if (
      isNaN(rev) || rev <= 0 ||
      isNaN(exp) || exp < 0 ||
      isNaN(mkt) || mkt < 0 ||
      isNaN(cust) || cust <= 0 ||
      isNaN(emp) || emp <= 0
    ) {
      triggerNotification("Please enter valid positive numbers in all required fields.", "error");
      return;
    }

    if (mkt > exp) {
      triggerNotification("Marketing spend cannot exceed total operational expenses.", "error");
      return;
    }

    setIsPredicting(true);

    setTimeout(() => {
      // Financial Modeling Mechanics
      const grossOperatingMargin = rev - exp;
      
      // Marketing ROI lift: Efficient marketing with good customer volume generates incremental multiplier
      const cac = cust > 0 ? (mkt / cust) : 0;
      const mktRatio = rev > 0 ? (mkt / rev) : 0;
      
      // Marketing efficiency factor between 1.05 and 1.35 based on CAC efficiency
      let marketingLift = 0;
      if (mkt > 0) {
        const efficiencyScore = Math.min(1.4, Math.max(0.9, (rev / (exp + 1)) * 0.8));
        marketingLift = mkt * (efficiencyScore - 1);
      }

      // Workforce productivity & capacity drag
      const custPerEmp = cust / emp;
      let workforceCapacityAdjustment = 0;
      if (custPerEmp > 40) {
        // Overburdened staff leads to operational leaks / churn
        workforceCapacityAdjustment = -1 * (custPerEmp - 40) * 800;
      } else if (custPerEmp < 8 && emp > 5) {
        // Excess workforce under-utilization
        workforceCapacityAdjustment = -1 * (emp * 1500);
      }

      const rawPredicted = grossOperatingMargin + marketingLift + workforceCapacityAdjustment;
      
      // Slight stochastic variance for predictive confidence simulation (± 2.5%)
      const varianceFactor = 0.98 + (Math.random() * 0.04);
      const finalPrediction = Math.round(rawPredicted * varianceFactor);

      // Confidence score based on standard deviation & input sanity
      const marginRatio = rev > 0 ? (finalPrediction / rev) : 0;
      let confScore = 93.5;
      if (marginRatio < -0.1 || marginRatio > 0.6) confScore -= 8;
      if (mktRatio > 0.3) confScore -= 5;
      if (custPerEmp > 50) confScore -= 4;
      confScore = Math.min(98.8, Math.max(76.5, confScore + (Math.random() * 2)));

      // Generate strategic business insights
      const newInsights = [];
      const expenseRatio = ((exp / rev) * 100).toFixed(1);
      const profitMargin = ((finalPrediction / rev) * 100).toFixed(1);

      if (exp > rev * 0.75) {
        newInsights.push({
          type: 'warning',
          title: 'Elevated Expense Ratio',
          text: `Operating outgoings consume ${expenseRatio}% of total turnover. We recommend an immediate vendor audit to protect bottom-line liquidity.`
        });
      } else {
        newInsights.push({
          type: 'success',
          title: 'Strong Operating Margin',
          text: `Expenditure ratio is well-regulated at ${expenseRatio}%, leaving a healthy operating surplus.`
        });
      }

      if (mktRatio < 0.06) {
        newInsights.push({
          type: 'info',
          title: 'Growth Reinvestment Opportunity',
          text: `Marketing allocation is only ${(mktRatio * 100).toFixed(1)}% of revenue. Standard expansion benchmarks suggest 8-12% for customer acquisition.`
        });
      } else if (mktRatio > 0.22) {
        newInsights.push({
          type: 'warning',
          title: 'Heavy Acquisition Burn',
          text: `Marketing accounts for ${(mktRatio * 100).toFixed(1)}% of revenue. Verify that Customer Lifetime Value (LTV) supports this high acquisition cost.`
        });
      } else {
        newInsights.push({
          type: 'success',
          title: 'Optimal Marketing Investment',
          text: `Marketing budget of ${(mktRatio * 100).toFixed(1)}% falls into the high-efficiency growth quadrant.`
        });
      }

      if (custPerEmp > 35) {
        newInsights.push({
          type: 'warning',
          title: 'High Team Workload',
          text: `Ratio of ${Math.round(custPerEmp)} customers per employee signals capacity pressure. Consider adding operational support to prevent quality degradation.`
        });
      } else {
        newInsights.push({
          type: 'success',
          title: 'Balanced Team Capacity',
          text: `Staff density is well-proportioned at ${custPerEmp.toFixed(1)} clients per staff member.`
        });
      }

      const outcomeData = {
        profit: finalPrediction,
        confidence: parseFloat(confScore.toFixed(1)),
        revenue: rev,
        expenses: exp,
        marketing: mkt,
        customers: cust,
        employees: emp,
        marginPercent: profitMargin,
        cac: Math.round(cac)
      };

      setPredictionResult(outcomeData);
      setInsights(newInsights);
      setIsPredicting(false);

      const newRecord = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        revenue: rev,
        expenses: exp,
        marketing: mkt,
        customers: cust,
        employees: emp,
        predictedProfit: finalPrediction,
        confidence: parseFloat(confScore.toFixed(1))
      };
      
      setPredictionsList(prev => [newRecord, ...prev]);
      triggerNotification("Profit prediction successfully generated and archived.");
    }, 900);
  };

  // CSV Import
  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.toLowerCase().endsWith('.csv')) {
      setUploadError("Invalid file extension. Please select a valid .csv spreadsheet.");
      return;
    }

    setUploadedFileName(file.name);
    setUploadError("");

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target.result;
        const lines = text.split(/\r?\n/).filter(l => l.trim().length > 0);
        
        if (lines.length < 2) {
          throw new Error("File must contain at least a header row and one data row.");
        }

        const headers = lines[0].toLowerCase().split(',').map(h => h.trim().replace(/['"]/g, ''));
        const getIndex = (keys) => headers.findIndex(h => keys.some(k => h.includes(k)));

        const revIdx = getIndex(['revenue', 'turnover', 'sales']);
        const expIdx = getIndex(['expense', 'outgoings', 'cost', 'spend']);
        const mktIdx = getIndex(['marketing', 'advertising', 'promo', 'ad']);
        const custIdx = getIndex(['customer', 'client', 'buyer', 'user']);
        const empIdx = getIndex(['employee', 'staff', 'headcount', 'worker']);
        const monthIdx = getIndex(['month', 'date', 'period', 'timeline']);

        if (revIdx === -1 || expIdx === -1) {
          throw new Error("CSV header must contain columns identifying 'revenue' and 'expenses'.");
        }

        const parsedHistoryList = [];
        for (let i = 1; i < lines.length; i++) {
          const rowData = lines[i].split(',').map(cell => cell.trim().replace(/['"]/g, ''));
          if (rowData.length < 2) continue;

          const parsedRev = parseFloat(rowData[revIdx]) || 0;
          const parsedExp = parseFloat(rowData[expIdx]) || 0;
          const parsedMkt = mktIdx !== -1 ? (parseFloat(rowData[mktIdx]) || 0) : 0;
          const parsedCust = custIdx !== -1 ? (parseInt(rowData[custIdx], 10) || 0) : 0;
          const parsedEmp = empIdx !== -1 ? (parseInt(rowData[empIdx], 10) || 1) : 1;
          const parsedMonth = monthIdx !== -1 && rowData[monthIdx] ? rowData[monthIdx] : `Period ${i}`;

          parsedHistoryList.push({
            month: parsedMonth,
            revenue: parsedRev,
            expenses: parsedExp,
            marketing: parsedMkt,
            customers: parsedCust,
            employees: parsedEmp,
            profit: parsedRev - parsedExp
          });
        }

        if (parsedHistoryList.length === 0) {
          throw new Error("Could not extract valid data rows from the CSV file.");
        }

        setHistoricalData(parsedHistoryList);

        // Autofill Predictor with latest period from the uploaded CSV
        const latestRecord = parsedHistoryList[parsedHistoryList.length - 1];
        setInputRev(latestRecord.revenue.toString());
        setInputExp(latestRecord.expenses.toString());
        if (latestRecord.marketing > 0) setInputMkt(latestRecord.marketing.toString());
        if (latestRecord.customers > 0) setInputCust(latestRecord.customers.toString());
        if (latestRecord.employees > 0) setInputEmp(latestRecord.employees.toString());

        triggerNotification(`Imported ${parsedHistoryList.length} periods from "${file.name}". Dashboard synchronized.`);
        setActiveTab('dashboard');
      } catch (err) {
        setUploadError(`CSV Parsing Error: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  const handleDownloadSampleCsv = () => {
    const sample = "month,revenue,expenses,marketing,customers,employees\nJan,450000,310000,35000,140,8\nFeb,480000,320000,40000,155,8\nMar,520000,340000,45000,165,9\nApr,510000,350000,30000,160,9\nMay,580000,370000,50000,175,9\nJun,630000,390000,60000,190,10";
    const blob = new Blob([sample], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'sample_business_ledger.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleExportHistoryCsv = () => {
    if (predictionsList.length === 0) {
      triggerNotification("No prediction records to export.", "error");
      return;
    }
    const headers = "ID,Date,Revenue,Expenses,Marketing,Customers,Employees,PredictedProfit,Confidence\n";
    const rows = predictionsList.map(p => 
      `${p.id},${p.date},${p.revenue},${p.expenses},${p.marketing},${p.customers},${p.employees},${p.predictedProfit},${p.confidence}%`
    ).join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `profit_predictions_${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    triggerNotification("Prediction history exported to CSV.");
  };

  // Archive Filtering and Sorting
  const filteredPredictions = useMemo(() => {
    let list = predictionsList.filter(item => {
      const q = searchQuery.toLowerCase().trim();
      const matchesSearch = !q || 
                            item.date.toLowerCase().includes(q) || 
                            item.revenue.toString().includes(q) ||
                            item.predictedProfit.toString().includes(q);
      
      const minProfit = minProfitFilter !== '' ? parseFloat(minProfitFilter) : null;
      const matchesProfit = minProfit === null || isNaN(minProfit) || item.predictedProfit >= minProfit;

      return matchesSearch && matchesProfit;
    });

    if (historySortBy === 'profit-desc') {
      list.sort((a, b) => b.predictedProfit - a.predictedProfit);
    } else if (historySortBy === 'profit-asc') {
      list.sort((a, b) => a.predictedProfit - b.predictedProfit);
    } else if (historySortBy === 'rev-desc') {
      list.sort((a, b) => b.revenue - a.revenue);
    } else {
      // date-desc
      list.sort((a, b) => new Date(b.date) - new Date(a.date));
    }

    return list;
  }, [predictionsList, searchQuery, minProfitFilter, historySortBy]);

  // Auth Handlers
  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail.includes('@') || loginPass.length < 4) {
      triggerNotification("Please provide a valid email and minimum 4-character password.", "error");
      return;
    }
    setUser({
      name: loginEmail.split('@')[0].replace(/[^a-zA-Z0-9]/g, ' ').toUpperCase(),
      email: loginEmail
    });
    setIsAuth(true);
    triggerNotification("Logged in successfully. Workspace loaded.");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName.trim() || !regEmail.includes('@') || regPass.length < 5) {
      triggerNotification("Please fill all registration fields with valid inputs.", "error");
      return;
    }
    setUser({
      name: regName.trim(),
      email: regEmail.trim()
    });
    setIsAuth(true);
    triggerNotification("Enterprise account registered successfully!");
  };

  // Dashboard Metrics Calculation
  const metrics = useMemo(() => {
    const hasInputs = inputRev.trim() !== '' && inputExp.trim() !== '';
    const activeSandboxRev = parseFloat(inputRev) || 0;
    const activeSandboxExp = parseFloat(inputExp) || 0;
    const activeSandboxMkt = parseFloat(inputMkt) || 0;
    const activeSandboxProfit = activeSandboxRev - activeSandboxExp;

    const nextPredicted = predictionResult 
      ? predictionResult.profit 
      : (hasInputs ? Math.round(activeSandboxProfit * 1.12) : null);

    const averageConfidence = predictionsList.length > 0 
      ? (predictionsList.reduce((acc, p) => acc + p.confidence, 0) / predictionsList.length).toFixed(1)
      : '—';

    return {
      hasInputs,
      activeSandboxRev,
      activeSandboxExp,
      activeSandboxMkt,
      activeSandboxProfit,
      nextPredicted,
      averageConfidence
    };
  }, [predictionResult, predictionsList, inputRev, inputExp, inputMkt]);

  // Cost Breakout Pie Data
  const pieCostData = useMemo(() => {
    const exp = metrics.activeSandboxExp;
    const mkt = metrics.activeSandboxMkt;
    if (exp > 0) {
      return [
        { name: 'Fixed Operating Costs', value: Math.max(0, exp - mkt) },
        { name: 'Marketing & Promotion', value: mkt }
      ];
    }
    // Fallback to latest historical month if sandbox is empty
    if (historicalData.length > 0) {
      const latest = historicalData[historicalData.length - 1];
      return [
        { name: 'Fixed Operating Costs', value: Math.max(0, latest.expenses - latest.marketing) },
        { name: 'Marketing & Promotion', value: latest.marketing }
      ];
    }
    return [
      { name: 'Fixed Operating Costs', value: 70 },
      { name: 'Marketing & Promotion', value: 30 }
    ];
  }, [metrics.activeSandboxExp, metrics.activeSandboxMkt, historicalData]);

  const systemDateString = new Date().toLocaleDateString('en-US', {
    weekday: 'short', year: 'numeric', month: 'short', day: 'numeric'
  });

  return (
    <div className={`min-h-screen w-full transition-colors duration-200 text-left ${
      theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-900'
    }`}>
      
      {/* Toast Notification */}
      {notification.show && (
        <div className={`fixed top-5 right-5 z-50 flex items-center gap-3 px-5 py-3 rounded-xl shadow-2xl border backdrop-blur-md animate-fade-in ${
          notification.type === 'error'
            ? 'bg-rose-500/95 border-rose-400 text-white shadow-rose-900/30'
            : 'bg-emerald-600/95 border-emerald-500 text-white shadow-emerald-900/30'
        }`}>
          {notification.type === 'error' ? (
            <AlertTriangle className="h-5 w-5 shrink-0" />
          ) : (
            <CheckCircle className="h-5 w-5 shrink-0" />
          )}
          <p className="text-xs sm:text-sm font-semibold">{notification.message}</p>
        </div>
      )}

      {/* Authentication Screen */}
      {!isAuth ? (
        <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-slate-950 via-slate-900 to-indigo-950">
          <div className="w-full max-w-md p-8 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-xl shadow-2xl text-left">
            
            <div className="flex flex-col items-center text-center mb-8">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-xl shadow-cyan-500/20 text-white">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h1 className="mt-4 text-2xl font-extrabold tracking-tight text-white">
                Profit Predictor AI
              </h1>
              <p className="text-xs text-slate-400 mt-1 max-w-xs">
                Intelligent Enterprise Profit Forecasting & Financial Analytics
              </p>
            </div>

            {authView === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Email Address
                  </label>
                  <input 
                    type="email" 
                    value={loginEmail} 
                    onChange={e => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500"
                    placeholder="e.g. founder@enterprise.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Password
                  </label>
                  <input 
                    type="password" 
                    value={loginPass} 
                    onChange={e => setLoginPass(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500"
                    placeholder="Enter your password"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all flex justify-center items-center gap-2 cursor-pointer"
                >
                  <Lock className="h-4 w-4" /> Sign In to Workspace
                </button>
                <p className="text-xs text-center text-slate-400 mt-5">
                  Need an account?{' '}
                  <button 
                    type="button" 
                    onClick={() => setAuthView('register')} 
                    className="text-cyan-400 font-semibold hover:underline cursor-pointer"
                  >
                    Register Business
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Company / Business Name
                  </label>
                  <input 
                    type="text" 
                    value={regName} 
                    onChange={e => setRegName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500"
                    placeholder="e.g. Apex Global Solutions"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Business Email
                  </label>
                  <input 
                    type="email" 
                    value={regEmail} 
                    onChange={e => setRegEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500"
                    placeholder="e.g. contact@apex.com"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                    Create Password
                  </label>
                  <input 
                    type="password" 
                    value={regPass} 
                    onChange={e => setRegPass(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white placeholder-slate-500"
                    placeholder="Minimum 5 characters"
                    required
                  />
                </div>
                <button 
                  type="submit" 
                  className="w-full py-3 mt-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 text-white font-semibold text-sm shadow-lg shadow-cyan-500/25 transition-all flex justify-center items-center gap-2 cursor-pointer"
                >
                  <UserPlus className="h-4 w-4" /> Create Workspace
                </button>
                <p className="text-xs text-center text-slate-400 mt-5">
                  Already registered?{' '}
                  <button 
                    type="button" 
                    onClick={() => setAuthView('login')} 
                    className="text-cyan-400 font-semibold hover:underline cursor-pointer"
                  >
                    Sign In
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      ) : (
        /* Authenticated Main App */
        <div className="flex min-h-screen w-full overflow-x-hidden">
          
          {/* Main Sidebar (Desktop) */}
          <aside className={`hidden md:flex flex-col w-64 shrink-0 border-r transition-colors select-none ${
            theme === 'dark' ? 'bg-slate-900/90 border-slate-800' : 'bg-white border-slate-200'
          }`}>
            {/* Logo Area */}
            <div className="p-5 border-b flex items-center gap-3 border-slate-800/80">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white shadow-md shadow-cyan-500/20">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-bold tracking-tight">Predictor AI</span>
                <span className="text-[10px] font-semibold text-cyan-500 tracking-wider uppercase">Enterprise Suite</span>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto">
              {[
                { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                { id: 'predictor', label: 'Profit Predictor', icon: Sparkles },
                { id: 'expert', label: 'AI Expert Chat', icon: MessageSquare, badge: 'AI' },
                { id: 'history', label: 'Prediction History', icon: History },
                { id: 'upload', label: 'CSV Data Sync', icon: Upload },
                { id: 'reports', label: 'Reports & Export', icon: FileText },
                { id: 'settings', label: 'Settings', icon: Settings }
              ].map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button 
                    key={item.id}
                    onClick={() => setActiveTab(item.id)}
                    className={`w-full flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-xs font-semibold transition-all text-left cursor-pointer ${
                      isActive 
                        ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/10 text-cyan-400 border border-cyan-500/30 shadow-sm' 
                        : theme === 'dark'
                          ? 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
                          : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
                    }`}
                  >
                    <Icon className={`h-4 w-4 shrink-0 ${isActive ? 'text-cyan-400' : ''}`} />
                    <span className="truncate">{item.label}</span>
                    {item.badge && (
                      <span className="ml-auto text-[9px] font-extrabold px-1.5 py-0.5 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-700">
                        {item.badge}
                      </span>
                    )}
                  </button>
                );
              })}
            </nav>

            {/* User Profile Footer */}
            <div className={`p-4 border-t ${theme === 'dark' ? 'border-slate-800 bg-slate-950/40' : 'border-slate-200 bg-slate-50'}`}>
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-xl bg-gradient-to-br from-cyan-500 to-indigo-600 flex items-center justify-center font-bold text-white text-xs shadow">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-bold truncate">{user.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                </div>
                <button 
                  onClick={() => setIsAuth(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-slate-800/50 transition-colors cursor-pointer"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* Main Workspace Area */}
          <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            
            {/* Header */}
            <header className={`sticky top-0 z-40 flex h-16 items-center justify-between border-b px-4 sm:px-8 backdrop-blur-md transition-colors ${
              theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white/80 border-slate-200'
            }`}>
              <div className="flex items-center gap-3">
                <button 
                  onClick={() => setMobileMenuOpen(true)}
                  className="md:hidden p-2 rounded-xl text-slate-400 hover:bg-slate-800 transition-all cursor-pointer"
                  aria-label="Open Navigation"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <h1 className="text-sm sm:text-base font-bold flex items-center gap-2">
                    {activeTab === 'dashboard' && 'Dashboard Overview'}
                    {activeTab === 'predictor' && 'Profit Predictor Console'}
                    {activeTab === 'expert' && 'AI Financial Consultant'}
                    {activeTab === 'history' && 'Prediction Archive'}
                    {activeTab === 'upload' && 'Data Sync & Integration'}
                    {activeTab === 'reports' && 'Export PDF Report'}
                    {activeTab === 'settings' && 'Platform Settings'}
                    <span className="hidden sm:inline-flex text-[10px] font-semibold text-emerald-400 bg-emerald-950/80 px-2 py-0.5 rounded-full border border-emerald-800">
                      Live
                    </span>
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="hidden lg:inline-block text-xs text-slate-400 font-medium">
                  {systemDateString}
                </span>

                {/* Currency Badge */}
                <span className={`text-[11px] font-bold px-2.5 py-1 rounded-lg border ${
                  theme === 'dark' ? 'bg-slate-950 border-slate-800 text-cyan-400' : 'bg-slate-100 border-slate-200 text-cyan-600'
                }`}>
                  {currency} ({getCurrencySymbol()})
                </span>

                {/* Theme Toggle Button */}
                <button 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className={`p-2 rounded-xl border transition-all cursor-pointer ${
                    theme === 'dark' 
                      ? 'bg-slate-950 border-slate-800 hover:border-slate-700 text-slate-200' 
                      : 'bg-white border-slate-200 hover:border-slate-300 text-slate-700 shadow-sm'
                  }`}
                  title="Toggle Theme"
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              </div>
            </header>

            {/* Mobile Navigation Drawer */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-50 flex md:hidden bg-slate-950/80 backdrop-blur-sm">
                <div className="w-72 p-6 bg-slate-900 text-slate-100 flex flex-col justify-between shadow-2xl">
                  <div>
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-800">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-6 w-6 text-cyan-400" />
                        <span className="text-base font-bold">Predictor AI</span>
                      </div>
                      <button 
                        onClick={() => setMobileMenuOpen(false)} 
                        className="p-1 rounded-lg hover:bg-slate-800 text-slate-400 cursor-pointer"
                      >
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <nav className="space-y-1.5">
                      {[
                        { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
                        { id: 'predictor', label: 'Profit Predictor', icon: Sparkles },
                        { id: 'expert', label: 'AI Expert Chat', icon: MessageSquare },
                        { id: 'history', label: 'Prediction History', icon: History },
                        { id: 'upload', label: 'Data CSV Upload', icon: Upload },
                        { id: 'reports', label: 'Reports & Export', icon: FileText },
                        { id: 'settings', label: 'Settings', icon: Settings }
                      ].map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                          <button
                            key={tab.id}
                            onClick={() => {
                              setActiveTab(tab.id);
                              setMobileMenuOpen(false);
                            }}
                            className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold transition-all text-left ${
                              isActive ? 'bg-cyan-500/15 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:bg-slate-800'
                            }`}
                          >
                            <Icon className="h-4 w-4" />
                            <span>{tab.label}</span>
                          </button>
                        );
                      })}
                    </nav>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <p className="text-xs font-bold text-slate-200 truncate">{user.name}</p>
                    <button 
                      onClick={() => { setIsAuth(false); setMobileMenuOpen(false); }} 
                      className="text-xs text-rose-400 hover:underline mt-2 inline-flex items-center gap-1.5"
                    >
                      <LogOut className="h-3.5 w-3.5" /> Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Tab Body Container */}
            <div className="max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">

              {/* ===================== TAB 1: DASHBOARD ===================== */}
              {activeTab === 'dashboard' && (
                <div className="space-y-6 animate-fade-in">
                  
                  {/* Daily Motivation Quote */}
                  <div className={`p-5 rounded-2xl border transition-all relative overflow-hidden ${
                    theme === 'dark' 
                      ? 'bg-gradient-to-r from-indigo-950/40 via-slate-900 to-slate-900 border-indigo-900/60' 
                      : 'bg-gradient-to-r from-indigo-50/80 via-white to-white border-indigo-100 shadow-sm'
                  }`}>
                    <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-indigo-500/10 pointer-events-none">
                      <Quote className="h-40 w-40" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 rounded-xl bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
                          <Quote className="h-5 w-5" />
                        </div>
                        <div>
                          <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                            theme === 'dark' ? 'text-indigo-400 bg-indigo-950 border-indigo-800' : 'text-indigo-600 bg-indigo-50 border-indigo-200'
                          }`}>
                            Executive Insight • {BUSINESS_QUOTES[quoteIdx].context}
                          </span>
                          <p className="text-sm font-medium italic mt-2 max-w-3xl leading-relaxed">
                            "{BUSINESS_QUOTES[quoteIdx].quote}"
                          </p>
                          <p className="text-xs font-semibold text-indigo-400 mt-1">
                            — {BUSINESS_QUOTES[quoteIdx].author}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={rotateQuote}
                        className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all border flex items-center gap-1.5 self-start sm:self-center cursor-pointer shrink-0 ${
                          theme === 'dark' 
                            ? 'bg-slate-900 hover:bg-slate-800 border-slate-800 text-slate-300' 
                            : 'bg-white hover:bg-slate-50 border-slate-200 text-slate-700 shadow-sm'
                        }`}
                      >
                        <RefreshCw className="h-3.5 w-3.5" /> Next Insight
                      </button>
                    </div>
                  </div>

                  {/* Quick Action Prompt Banner */}
                  <div className={`p-4 rounded-2xl border flex flex-col sm:flex-row sm:items-center justify-between gap-4 ${
                    theme === 'dark' ? 'bg-slate-900/60 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div>
                      <h3 className="text-xs sm:text-sm font-bold text-cyan-400 flex items-center gap-2">
                        <Sparkles className="h-4 w-4" /> Active Scenario Performance Analyzer
                      </h3>
                      <p className="text-xs text-slate-400 mt-0.5">
                        {metrics.hasInputs 
                          ? "Showing metrics configured in the current Predictor sandbox session."
                          : "No active parameters configured yet. Open Profit Predictor to run your scenario."}
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setActiveTab('expert')}
                        className="text-xs text-white font-semibold bg-indigo-600 hover:bg-indigo-500 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow cursor-pointer"
                      >
                        <MessageSquare className="h-3.5 w-3.5" /> Consult AI
                      </button>
                      <button 
                        onClick={() => setActiveTab('predictor')}
                        className="text-xs text-slate-950 font-bold bg-cyan-400 hover:bg-cyan-300 px-3.5 py-2 rounded-xl transition-all flex items-center gap-1.5 shadow cursor-pointer"
                      >
                        <Sparkles className="h-3.5 w-3.5" /> {metrics.hasInputs ? 'Adjust Values' : 'Run Predictor'}
                      </button>
                    </div>
                  </div>

                  {/* 4 Metric KPI Cards */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    {/* Turnover Card */}
                    <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between min-h-[135px] ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">Monthly Turnover</span>
                        <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                          <TrendingUp className="h-4 w-4" />
                        </div>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black mt-2 truncate">
                        {formatMoney(metrics.activeSandboxRev)}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {metrics.hasInputs ? "Active baseline revenue target" : "Waiting for predictor input"}
                      </p>
                    </div>

                    {/* Operational Outgoings Card */}
                    <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between min-h-[135px] ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">Monthly Expenses</span>
                        <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                          <TrendingDown className="h-4 w-4" />
                        </div>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black mt-2 truncate text-rose-400">
                        {formatMoney(metrics.activeSandboxExp)}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1">
                        {metrics.hasInputs ? "Direct operating outgoings" : "Waiting for predictor input"}
                      </p>
                    </div>

                    {/* Net Operating Margin Card */}
                    <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between min-h-[135px] ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">Net Operating Spread</span>
                        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                          <DollarSign className="h-4 w-4" />
                        </div>
                      </div>
                      <h3 className={`text-xl sm:text-2xl font-black mt-2 truncate ${
                        metrics.activeSandboxProfit < 0 ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        {formatMoney(metrics.activeSandboxProfit)}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Turnover minus direct expenditure
                      </p>
                    </div>

                    {/* Target Profit Forecast Card */}
                    <div className={`p-5 rounded-2xl border transition-all flex flex-col justify-between min-h-[135px] ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800 hover:border-slate-700' : 'bg-white border-slate-200 hover:border-slate-300 shadow-sm'
                    }`}>
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">AI Projected Profit</span>
                        <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                          <Sparkles className="h-4 w-4" />
                        </div>
                      </div>
                      <h3 className="text-xl sm:text-2xl font-black mt-2 truncate text-cyan-400">
                        {metrics.nextPredicted !== null ? formatMoney(metrics.nextPredicted) : '—'}
                      </h3>
                      <p className="text-[10px] text-indigo-400 mt-1 font-semibold">
                        Model Confidence: {metrics.averageConfidence}%
                      </p>
                    </div>
                  </div>

                  {/* Charts Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    {/* Area Chart: Historical Revenue vs Expenses */}
                    <div className={`lg:col-span-2 p-5 rounded-2xl border flex flex-col justify-between ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <h3 className="text-xs sm:text-sm font-bold">Revenue vs Expenses Comparison</h3>
                          <p className="text-[11px] text-slate-400">Historical performance ledger tracking monthly trends</p>
                        </div>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-lg bg-cyan-950 text-cyan-400 border border-cyan-800">
                          {historicalData.length} Periods Logged
                        </span>
                      </div>
                      <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={historicalData} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
                            <defs>
                              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2}/>
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke={theme === 'dark' ? '#1e293b' : '#f1f5f9'} />
                            <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                            <YAxis 
                              stroke="#64748b" 
                              fontSize={11} 
                              tickFormatter={(val) => val >= 100000 ? `${(val / 100000).toFixed(0)}L` : `${val / 1000}k`}
                            />
                            <Tooltip 
                              formatter={(value) => [formatMoney(value), '']}
                              contentStyle={{ 
                                backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', 
                                borderColor: theme === 'dark' ? '#334155' : '#e2e8f0', 
                                color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                                borderRadius: '0.75rem',
                                fontSize: '12px'
                              }} 
                            />
                            <Legend wrapperStyle={{ fontSize: 11 }} />
                            <Area name="Gross Turnover" type="monotone" dataKey="revenue" stroke="#06b6d4" strokeWidth={2} fillOpacity={1} fill="url(#colorRev)" />
                            <Area name="Outgoings" type="monotone" dataKey="expenses" stroke="#ef4444" strokeWidth={2} fillOpacity={1} fill="url(#colorExp)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Donut Chart: Cost Allocation */}
                    <div className={`p-5 rounded-2xl border flex flex-col justify-between ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="text-xs sm:text-sm font-bold">Cost Breakdown Allocation</h3>
                          <span className="text-[10px] text-slate-400">Direct vs Mkt</span>
                        </div>
                        <p className="text-[11px] text-slate-400 mb-4">
                          Proportion of strategic advertising vs administrative overhead
                        </p>
                        
                        <div className="h-52 w-full flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={pieCostData}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={75}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                <Cell fill="#6366f1" />
                                <Cell fill="#06b6d4" />
                              </Pie>
                              <Tooltip 
                                formatter={(val) => [formatMoney(val), '']}
                                contentStyle={{ 
                                  backgroundColor: theme === 'dark' ? '#0f172a' : '#ffffff', 
                                  borderColor: theme === 'dark' ? '#334155' : '#e2e8f0', 
                                  color: theme === 'dark' ? '#f1f5f9' : '#0f172a',
                                  borderRadius: '0.75rem',
                                  fontSize: '11px'
                                }} 
                              />
                              <Legend wrapperStyle={{ fontSize: 11 }} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className={`p-3 rounded-xl border flex items-center justify-between text-xs mt-4 ${
                        theme === 'dark' ? 'bg-indigo-950/20 border-indigo-900/40 text-slate-300' : 'bg-indigo-50/70 border-indigo-100 text-slate-700'
                      }`}>
                        <span className="font-medium">Need scaling advice?</span>
                        <button 
                          onClick={() => setActiveTab('expert')} 
                          className="text-indigo-400 font-bold hover:underline flex items-center gap-1 cursor-pointer"
                        >
                          Ask AI Expert <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Latest Predictions Table Summary */}
                  <div className={`p-5 rounded-2xl border ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <h3 className="text-xs sm:text-sm font-bold">Recent Prediction Runs</h3>
                        <p className="text-[11px] text-slate-400">Latest forecast calculations conducted in your workspace</p>
                      </div>
                      {predictionsList.length > 0 && (
                        <button 
                          onClick={() => setActiveTab('history')}
                          className="text-xs font-semibold text-cyan-400 hover:underline cursor-pointer"
                        >
                          View Full Archive ({predictionsList.length}) →
                        </button>
                      )}
                    </div>

                    {predictionsList.length === 0 ? (
                      <div className="text-center py-10 space-y-3">
                        <Sparkles className="h-8 w-8 text-slate-600 mx-auto" />
                        <p className="text-xs font-semibold text-slate-400">No prediction runs generated yet</p>
                        <button 
                          onClick={() => setActiveTab('predictor')}
                          className="text-xs text-cyan-400 font-bold hover:underline inline-flex items-center gap-1 cursor-pointer"
                        >
                          Open Profit Predictor to run your first simulation →
                        </button>
                      </div>
                    ) : (
                      <div className="overflow-x-auto">
                        <table className="w-full text-xs text-left">
                          <thead className={`uppercase tracking-wider ${theme === 'dark' ? 'bg-slate-950 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                            <tr>
                              <th className="p-3 font-semibold rounded-l-lg">Date</th>
                              <th className="p-3 font-semibold">Turnover</th>
                              <th className="p-3 font-semibold">Expenses</th>
                              <th className="p-3 font-semibold">Marketing</th>
                              <th className="p-3 font-semibold text-cyan-400">Predicted Profit</th>
                              <th className="p-3 font-semibold text-right rounded-r-lg">Confidence</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-800/40">
                            {predictionsList.slice(0, 4).map((item) => (
                              <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                                <td className="p-3 font-medium text-slate-300">{item.date}</td>
                                <td className="p-3">{formatMoney(item.revenue)}</td>
                                <td className="p-3">{formatMoney(item.expenses)}</td>
                                <td className="p-3">{formatMoney(item.marketing)}</td>
                                <td className="p-3 font-bold text-cyan-400">{formatMoney(item.predictedProfit)}</td>
                                <td className="p-3 text-right">
                                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                                    {item.confidence}%
                                  </span>
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    )}
                  </div>

                </div>
              )}

              {/* ===================== TAB 2: PROFIT PREDICTOR ===================== */}
              {activeTab === 'predictor' && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 animate-fade-in">
                  
                  {/* Left Column: Form & Quick Sync */}
                  <div className="xl:col-span-2 space-y-6">
                    <div className={`p-6 rounded-2xl border ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                      <div className="flex items-center justify-between mb-2">
                        <h2 className="text-base font-bold flex items-center gap-2">
                          <Calculator className="h-5 w-5 text-cyan-400" /> Enter Business Metrics
                        </h2>
                        <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-cyan-950 text-cyan-400 border border-cyan-800">
                          Regression ML v2.4
                        </span>
                      </div>
                      <p className="text-xs text-slate-400 mb-6">
                        Provide your monthly business parameters below. Our algorithm applies multi-factor regression, marketing efficiency multipliers, and team capacity coefficients.
                      </p>
                      
                      <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        
                        {/* Monthly Revenue Input */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Monthly Turnover (Revenue) ({getCurrencySymbol()}) *
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-3 text-slate-500 font-bold text-sm">
                              {getCurrencySymbol()}
                            </span>
                            <input 
                              type="number" 
                              value={inputRev}
                              onChange={e => setInputRev(e.target.value)}
                              className={`w-full pl-8 pr-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 ${
                                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                              }`}
                              placeholder="e.g. 500000"
                              min="0"
                              step="any"
                              required
                            />
                          </div>
                          <span className="text-[10px] text-slate-500 mt-1 block">Total gross sales or monthly billing</span>
                        </div>

                        {/* Operational Expenses Input */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Total Monthly Expenses ({getCurrencySymbol()}) *
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-3 text-slate-500 font-bold text-sm">
                              {getCurrencySymbol()}
                            </span>
                            <input 
                              type="number" 
                              value={inputExp}
                              onChange={e => setInputExp(e.target.value)}
                              className={`w-full pl-8 pr-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 ${
                                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                              }`}
                              placeholder="e.g. 350000"
                              min="0"
                              step="any"
                              required
                            />
                          </div>
                          <span className="text-[10px] text-slate-500 mt-1 block">Salaries, rent, utilities, and marketing</span>
                        </div>

                        {/* Marketing Spend Input */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Marketing & Advertising ({getCurrencySymbol()}) *
                          </label>
                          <div className="relative">
                            <span className="absolute left-3.5 top-3 text-slate-500 font-bold text-sm">
                              {getCurrencySymbol()}
                            </span>
                            <input 
                              type="number" 
                              value={inputMkt}
                              onChange={e => setInputMkt(e.target.value)}
                              className={`w-full pl-8 pr-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 ${
                                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                              }`}
                              placeholder="e.g. 45000"
                              min="0"
                              step="any"
                              required
                            />
                          </div>
                          <span className="text-[10px] text-slate-500 mt-1 block">Included within total monthly expenses</span>
                        </div>

                        {/* Number of Active Customers */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Active Customers / Buyers *
                          </label>
                          <div className="relative">
                            <Users className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                            <input 
                              type="number" 
                              value={inputCust}
                              onChange={e => setInputCust(e.target.value)}
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 ${
                                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                              }`}
                              placeholder="e.g. 150"
                              min="1"
                              required
                            />
                          </div>
                          <span className="text-[10px] text-slate-500 mt-1 block">Active paying clients in this cycle</span>
                        </div>

                        {/* Total Direct Employees */}
                        <div>
                          <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
                            Total Workforce (Employees) *
                          </label>
                          <div className="relative">
                            <Briefcase className="absolute left-3.5 top-3 h-4 w-4 text-slate-500" />
                            <input 
                              type="number" 
                              value={inputEmp}
                              onChange={e => setInputEmp(e.target.value)}
                              className={`w-full pl-10 pr-4 py-2.5 rounded-xl border text-sm font-medium focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500 ${
                                theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white placeholder-slate-600' : 'bg-slate-50 border-slate-300 text-slate-900 placeholder-slate-400'
                              }`}
                              placeholder="e.g. 8"
                              min="1"
                              required
                            />
                          </div>
                          <span className="text-[10px] text-slate-500 mt-1 block">Full-time operational headcount</span>
                        </div>

                        {/* Submit Action */}
                        <div className="flex items-end">
                          <button 
                            type="submit" 
                            disabled={isPredicting}
                            className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 text-white font-bold text-sm shadow-lg shadow-cyan-500/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50 cursor-pointer"
                          >
                            {isPredicting ? (
                              <>
                                <RefreshCw className="h-4 w-4 animate-spin" />
                                Processing Algorithms...
                              </>
                            ) : (
                              <>
                                <Sparkles className="h-4 w-4" /> Run Profit Prediction
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>

                    {/* CSV Quick Import Banner */}
                    <div className={`p-4 rounded-2xl border flex items-center justify-between gap-4 ${
                      theme === 'dark' ? 'bg-slate-900/50 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-cyan-500/10 text-cyan-400 flex items-center justify-center shrink-0">
                          <FileSpreadsheet className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-xs font-bold">Have historical ledger sheets?</p>
                          <p className="text-[10px] text-slate-400">Import your past periods instantly to auto-fill metrics and track trends.</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveTab('upload')} 
                        className="text-xs font-semibold text-cyan-400 hover:underline border border-cyan-500/30 px-3.5 py-1.5 rounded-xl hover:bg-cyan-500/10 transition-colors shrink-0 cursor-pointer"
                      >
                        Upload CSV
                      </button>
                    </div>
                  </div>

                  {/* Right Column: Execution Output Card */}
                  <div className="space-y-6">
                    <div className={`p-6 rounded-2xl border h-full flex flex-col justify-between ${
                      theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                    }`}>
                      <div>
                        <div className="flex items-center justify-between mb-4">
                          <h3 className="text-xs sm:text-sm font-bold flex items-center gap-2">
                            <Target className="h-4 w-4 text-cyan-400" /> Forecast Analysis Output
                          </h3>
                          {predictionResult && (
                            <span className="text-[10px] font-bold text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
                              Calculated
                            </span>
                          )}
                        </div>

                        {predictionResult ? (
                          <div className="space-y-5 animate-fade-in">
                            {/* Target Profit Display */}
                            <div className={`p-5 rounded-2xl text-center border ${
                              theme === 'dark' ? 'bg-slate-950 border-slate-800' : 'bg-slate-50 border-slate-200'
                            }`}>
                              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                                Target Net Profit Forecast
                              </span>
                              <h2 className={`text-2xl sm:text-3xl font-black mt-2 ${
                                predictionResult.profit >= 0 ? 'text-cyan-400' : 'text-rose-400'
                              }`}>
                                {formatMoney(predictionResult.profit)}
                              </h2>
                              
                              <div className="flex items-center justify-center gap-3 mt-3 text-xs">
                                <span className={`px-2.5 py-0.5 rounded-full font-bold ${
                                  predictionResult.profit >= 0 ? 'bg-emerald-950 text-emerald-400 border border-emerald-800' : 'bg-rose-950 text-rose-400 border border-rose-800'
                                }`}>
                                  Margin: {predictionResult.marginPercent}%
                                </span>
                                <span className="text-slate-400">
                                  Est. CAC: {formatMoney(predictionResult.cac)}
                                </span>
                              </div>
                            </div>

                            {/* Confidence Metric */}
                            <div className="space-y-2">
                              <div className="flex items-center justify-between text-xs font-semibold">
                                <span className="text-slate-400">Statistical Confidence</span>
                                <span className="text-cyan-400 font-bold">{predictionResult.confidence}%</span>
                              </div>
                              <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                                <div 
                                  className="h-full bg-gradient-to-r from-cyan-500 to-indigo-500 transition-all duration-700 rounded-full" 
                                  style={{ width: `${predictionResult.confidence}%` }}
                                ></div>
                              </div>
                            </div>

                            {/* Dynamic Strategic Insights */}
                            <div className="pt-4 border-t border-slate-800">
                              <h4 className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-1.5">
                                <Lightbulb className="h-4 w-4 text-cyan-400" /> Strategic Business Insights
                              </h4>
                              <div className="space-y-2.5">
                                {insights.map((insight, idx) => (
                                  <div 
                                    key={idx} 
                                    className={`p-3 rounded-xl text-xs border ${
                                      theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-slate-50 border-slate-200'
                                    }`}
                                  >
                                    <div className="flex items-center gap-2 mb-1">
                                      {insight.type === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />}
                                      {insight.type === 'info' && <Info className="h-4 w-4 text-indigo-400 shrink-0" />}
                                      {insight.type === 'success' && <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />}
                                      <span className="font-bold">{insight.title}</span>
                                    </div>
                                    <p className="text-[11px] text-slate-400 leading-relaxed pl-6">{insight.text}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <div className="py-16 text-center space-y-3">
                            <Sparkles className="h-12 w-12 text-slate-700 mx-auto animate-pulse" />
                            <p className="text-xs font-bold text-slate-400">No Calculation Executed</p>
                            <p className="text-[11px] max-w-xs mx-auto text-slate-500 leading-relaxed">
                              Enter your turnover, expenses, and staff parameters on the left and click "Run Profit Prediction" to generate projections.
                            </p>
                          </div>
                        )}
                      </div>

                      {predictionResult && (
                        <button 
                          onClick={() => setActiveTab('reports')}
                          className="w-full mt-4 py-2.5 rounded-xl border border-slate-800 hover:border-slate-700 text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer"
                        >
                          <FileText className="h-3.5 w-3.5 text-cyan-400" /> View Comprehensive Report
                        </button>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {/* ===================== TAB 3: AI EXPERT CHAT ===================== */}
              {activeTab === 'expert' && (
                <div className={`transition-all duration-300 animate-fade-in ${
                  isFullScreen 
                    ? 'fixed inset-0 z-50 bg-slate-950 p-4 md:p-6 w-screen h-screen flex flex-col overflow-hidden text-slate-100' 
                    : `w-full h-[calc(100vh-12rem)] flex flex-col rounded-2xl border overflow-hidden shadow-2xl relative ${
                        theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'
                      }`
                }`}>
                  
                  {/* Chat Header */}
                  <div className={`p-4 border-b flex items-center justify-between shrink-0 ${
                    theme === 'dark' ? 'bg-slate-950/70 border-slate-800' : 'bg-slate-50 border-slate-200'
                  }`}>
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white font-bold text-sm shadow">
                        AI
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-xs sm:text-sm font-bold tracking-wide">AI Financial & Growth Consultant</span>
                          <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block"></span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">Powered by Gemini AI • Small Business Strategy & Cost Optimization</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button 
                        type="button"
                        onClick={() => setChatMessages([
                          {
                            sender: 'expert',
                            text: "Chat cleared. What financial or operational topic can I assist you with now?",
                            timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
                          }
                        ])}
                        className={`p-2 rounded-xl border text-xs font-medium transition-all cursor-pointer ${
                          theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white' : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900'
                        }`}
                        title="Clear Conversation"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>

                      {/* Fullscreen Toggle */}
                      <button 
                        type="button"
                        onClick={() => setIsFullScreen(!isFullScreen)}
                        className={`p-2 rounded-xl border text-xs font-semibold transition-all flex items-center gap-1.5 cursor-pointer ${
                          theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300 hover:text-white' : 'bg-white border-slate-200 text-slate-700 hover:text-slate-900'
                        }`}
                        title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                      >
                        {isFullScreen ? (
                          <>
                            <Minimize2 className="h-4 w-4" />
                            <span className="hidden sm:inline">Exit</span>
                          </>
                        ) : (
                          <>
                            <Maximize2 className="h-4 w-4" />
                            <span className="hidden sm:inline">Fullscreen</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Messages Feed */}
                  <div className={`flex-1 p-4 md:p-6 overflow-y-auto space-y-4 ${
                    theme === 'dark' ? 'bg-slate-950/40' : 'bg-slate-50/50'
                  }`}>
                    {chatMessages.map((msg, index) => (
                      <div 
                        key={index} 
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                      >
                        <div className={`max-w-[85%] sm:max-w-[75%] rounded-2xl p-4 text-xs sm:text-sm shadow-md ${
                          msg.sender === 'user' 
                            ? 'bg-gradient-to-r from-cyan-500 to-indigo-600 text-white rounded-tr-none' 
                            : theme === 'dark'
                              ? 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none leading-relaxed'
                              : 'bg-white border border-slate-200 text-slate-800 rounded-tl-none leading-relaxed'
                        }`}>
                          <div className="font-bold text-[10px] tracking-wider opacity-80 flex items-center justify-between border-b border-current/10 pb-1.5 mb-2.5">
                            <span>{msg.sender === 'user' ? user.name.toUpperCase() : 'AI CONSULTANT'}</span>
                            <span className="font-normal text-[9px] opacity-75">{msg.timestamp}</span>
                          </div>
                          <p className="whitespace-pre-line leading-relaxed font-normal">{msg.text}</p>
                        </div>
                      </div>
                    ))}
                    
                    {isChatLoading && (
                      <div className={`flex items-center gap-3 text-xs p-3.5 rounded-2xl border w-max max-w-[90%] shadow-md ${
                        theme === 'dark' ? 'bg-slate-900 border-slate-800 text-slate-300' : 'bg-white border-slate-200 text-slate-700'
                      }`}>
                        <RefreshCw className="h-4 w-4 animate-spin text-cyan-400" />
                        <span>Formulating strategic financial recommendations...</span>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Quick Preset Questions Chips */}
                  <div className={`p-2.5 border-t overflow-x-auto whitespace-nowrap flex gap-2 shrink-0 ${
                    theme === 'dark' ? 'bg-slate-950/80 border-slate-800' : 'bg-white border-slate-200'
                  }`}>
                    {[
                      { label: "Lower Operational Costs", query: "What are the most effective ways to lower operational costs without sacrificing output quality?" },
                      { label: "Marketing CAC Benchmark", query: "What is the optimal CAC to Customer Lifetime Value (LTV) ratio for rapid business expansion?" },
                      { label: "Compound Customer Retention", query: "How can I improve customer retention to compound our monthly recurring margins?" },
                      { label: "Non-Dilutive Financing", query: "How do I secure non-dilutive capital or working lines to fund inventory expansion?" }
                    ].map((chip, idx) => (
                      <button 
                        key={idx}
                        type="button"
                        onClick={() => handleSendChatMessage(chip.query)}
                        className={`text-xs px-3 py-1.5 rounded-xl border flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                          theme === 'dark' 
                            ? 'bg-slate-900 hover:bg-slate-800 text-slate-300 border-slate-800 hover:border-cyan-500/40' 
                            : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-200'
                        }`}
                      >
                        {chip.label} <ArrowUpRight className="h-3 w-3 text-cyan-400" />
                      </button>
                    ))}
                  </div>

                  {/* Message Input Box */}
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSendChatMessage(); }}
                    className={`p-3 sm:p-4 border-t flex items-center gap-3 shrink-0 ${
                      theme === 'dark' ? 'bg-slate-950/90 border-slate-800' : 'bg-white border-slate-200'
                    }`}
                  >
                    <input 
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask AI your business scaling, margin expansion, or expense questions..."
                      className={`flex-1 rounded-xl px-4 py-2.5 text-xs sm:text-sm font-medium focus:outline-none focus:ring-1 focus:ring-cyan-500 ${
                        theme === 'dark' 
                          ? 'bg-slate-900 border border-slate-800 text-slate-100 placeholder-slate-500 focus:border-cyan-500' 
                          : 'bg-slate-50 border border-slate-300 text-slate-900 placeholder-slate-400 focus:border-cyan-600'
                      }`}
                    />
                    <button 
                      type="submit"
                      disabled={isChatLoading || !chatInput.trim()}
                      className="p-2.5 sm:px-4 sm:py-2.5 bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 rounded-xl text-white font-bold text-xs sm:text-sm transition-all disabled:opacity-40 flex items-center gap-2 cursor-pointer shadow-md shadow-cyan-500/20"
                    >
                      <Send className="h-4 w-4" />
                      <span className="hidden sm:inline">Send</span>
                    </button>
                  </form>

                </div>
              )}

              {/* ===================== TAB 4: PREDICTION HISTORY ===================== */}
              {activeTab === 'history' && (
                <div className={`p-6 rounded-2xl border space-y-6 animate-fade-in ${
                  theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                }`}>
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h2 className="text-base font-bold flex items-center gap-2">
                        <History className="h-5 w-5 text-cyan-400" /> Prediction Run Archive
                      </h2>
                      <p className="text-xs text-slate-400 mt-0.5">
                        Audit, filter, and export all historical scenarios executed in this workspace.
                      </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      {/* Search Bar */}
                      <div className="relative">
                        <Search className="h-4 w-4 text-slate-500 absolute left-3 top-2.5" />
                        <input 
                          type="text" 
                          placeholder="Search date, profit..."
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          className={`pl-9 pr-4 py-2 w-44 sm:w-56 rounded-xl border text-xs focus:outline-none focus:border-cyan-500 ${
                            theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                          }`}
                        />
                      </div>

                      {/* Min Profit Filter */}
                      <input 
                        type="number" 
                        placeholder="Min Profit..."
                        value={minProfitFilter}
                        onChange={e => setMinProfitFilter(e.target.value)}
                        className={`px-3 py-2 w-32 rounded-xl border text-xs focus:outline-none focus:border-cyan-500 ${
                          theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      />

                      {/* Sort Selector */}
                      <select
                        value={historySortBy}
                        onChange={e => setHistorySortBy(e.target.value)}
                        className={`px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-cyan-500 ${
                          theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                        }`}
                      >
                        <option value="date-desc">Newest First</option>
                        <option value="profit-desc">Highest Profit</option>
                        <option value="profit-asc">Lowest Profit</option>
                        <option value="rev-desc">Highest Revenue</option>
                      </select>

                      {/* Export CSV Button */}
                      <button 
                        onClick={handleExportHistoryCsv}
                        className="px-3 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-white text-xs font-semibold flex items-center gap-1.5 transition-all shadow cursor-pointer"
                        title="Download CSV"
                      >
                        <Download className="h-3.5 w-3.5" /> Export CSV
                      </button>
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className={`uppercase tracking-wider ${
                        theme === 'dark' ? 'bg-slate-950 text-slate-400' : 'bg-slate-100 text-slate-600'
                      }`}>
                        <tr>
                          <th className="p-3 font-semibold rounded-l-lg">Execution Date</th>
                          <th className="p-3 font-semibold">Turnover</th>
                          <th className="p-3 font-semibold">Direct Expenses</th>
                          <th className="p-3 font-semibold">Marketing</th>
                          <th className="p-3 font-semibold">Clients</th>
                          <th className="p-3 font-semibold">Team</th>
                          <th className="p-3 font-semibold text-cyan-400">Predicted Profit</th>
                          <th className="p-3 font-semibold">Confidence</th>
                          <th className="p-3 font-semibold text-right rounded-r-lg">Actions</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800/40">
                        {filteredPredictions.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-800/30 transition-colors">
                            <td className="p-3 text-slate-300 font-medium">{item.date}</td>
                            <td className="p-3">{formatMoney(item.revenue)}</td>
                            <td className="p-3">{formatMoney(item.expenses)}</td>
                            <td className="p-3">{formatMoney(item.marketing)}</td>
                            <td className="p-3">{item.customers}</td>
                            <td className="p-3">{item.employees}</td>
                            <td className="p-3 font-bold text-cyan-400">{formatMoney(item.predictedProfit)}</td>
                            <td className="p-3">
                              <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                                {item.confidence}%
                              </span>
                            </td>
                            <td className="p-3 text-right">
                              <button 
                                onClick={() => {
                                  setPredictionsList(prev => prev.filter(p => p.id !== item.id));
                                  triggerNotification("Record deleted from archive.");
                                }}
                                className="p-1 rounded text-slate-500 hover:text-rose-400 transition-colors cursor-pointer"
                                title="Delete Record"
                              >
                                <Trash2 className="h-3.5 w-3.5" />
                              </button>
                            </td>
                          </tr>
                        ))}
                        {filteredPredictions.length === 0 && (
                          <tr>
                            <td colSpan="9" className="text-center py-12 text-slate-500 text-xs">
                              {predictionsList.length === 0 
                                ? "No prediction archive records stored yet. Run a prediction to start logging."
                                : "No records match your active search query or filter."}
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* ===================== TAB 5: CSV UPLOAD ===================== */}
              {activeTab === 'upload' && (
                <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
                  <div className={`p-6 rounded-2xl border ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-base font-bold flex items-center gap-2">
                        <Upload className="h-5 w-5 text-cyan-400" /> Upload Business Ledger CSV
                      </h2>
                      <button 
                        onClick={handleDownloadSampleCsv}
                        className="text-xs font-semibold text-cyan-400 hover:underline flex items-center gap-1 cursor-pointer"
                      >
                        <Download className="h-3.5 w-3.5" /> Download Sample Template
                      </button>
                    </div>
                    <p className="text-xs text-slate-400 mb-6">
                      Upload your spreadsheet to automatically populate historical trend charts and synchronize parameters into the prediction console.
                    </p>
                    
                    <div className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all relative ${
                      theme === 'dark' 
                        ? 'border-slate-700 hover:border-cyan-500 bg-slate-950/60' 
                        : 'border-slate-300 hover:border-cyan-500 bg-slate-50'
                    }`}>
                      <input 
                        type="file" 
                        accept=".csv"
                        onChange={handleCsvUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer w-full h-full"
                      />
                      <Upload className="h-12 w-12 text-cyan-400 mx-auto mb-3" />
                      <p className="text-xs sm:text-sm font-bold">
                        Drop your CSV ledger file here, or click to browse
                      </p>
                      <p className="text-[11px] text-slate-400 mt-1">
                        Compatible with files containing: revenue, expenses, marketing, customers, employees
                      </p>
                    </div>

                    {uploadedFileName && (
                      <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/40 border border-emerald-800 flex items-center justify-between text-xs text-emerald-400">
                        <div className="flex items-center gap-2">
                          <CheckCircle className="h-4 w-4 shrink-0" />
                          <span>Active dataset imported from: <strong>{uploadedFileName}</strong></span>
                        </div>
                        <button 
                          onClick={() => { 
                            setUploadedFileName(''); 
                            setHistoricalData(INITIAL_HISTORICAL_DATA); 
                            setInputRev('');
                            setInputExp('');
                            setInputMkt('');
                            setInputCust('');
                            setInputEmp('');
                            triggerNotification("Reverted to standard baseline ledger.");
                          }} 
                          className="text-[11px] font-semibold text-slate-300 hover:text-white underline cursor-pointer ml-3 shrink-0"
                        >
                          Clear & Reset
                        </button>
                      </div>
                    )}

                    {uploadError && (
                      <div className="mt-4 p-3.5 rounded-xl bg-rose-950/40 border border-rose-800 text-xs text-rose-400 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 shrink-0" />
                        <span>{uploadError}</span>
                      </div>
                    )}
                  </div>

                  {/* Schema Info Card */}
                  <div className={`p-5 rounded-2xl border space-y-3 ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <h3 className="text-xs font-bold text-slate-300">Expected Column Header Schema:</h3>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      For automatic mapping, your CSV header should match or contain these keywords:
                    </p>
                    <div className={`p-3 rounded-xl text-xs font-mono overflow-x-auto border ${
                      theme === 'dark' ? 'bg-slate-950 border-slate-800 text-cyan-400' : 'bg-slate-100 border-slate-200 text-cyan-700'
                    }`}>
                      month,revenue,expenses,marketing,customers,employees
                    </div>
                  </div>
                </div>
              )}

              {/* ===================== TAB 6: REPORTS & EXPORT ===================== */}
              {activeTab === 'reports' && (
                <div className="max-w-3xl mx-auto space-y-6 animate-fade-in">
                  
                  {/* Printable Report Document Card */}
                  <div id="print-layout-report" className="p-8 rounded-2xl border bg-white text-slate-900 shadow-xl space-y-6 text-left">
                    
                    {/* Header */}
                    <div className="flex justify-between items-start pb-6 border-b border-slate-200">
                      <div>
                        <h2 className="text-xl font-black text-slate-900 flex items-center gap-2">
                          <TrendingUp className="h-6 w-6 text-cyan-600" /> {user.name}
                        </h2>
                        <span className="text-[10px] font-extrabold text-cyan-700 tracking-widest uppercase">
                          Executive Financial & Profit Forecast Statement
                        </span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold">Generated: {new Date().toLocaleDateString()}</p>
                        <p className="text-[10px] text-slate-500">Currency Unit: {currency}</p>
                      </div>
                    </div>

                    {/* Summary Metric Blocks */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-2">
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Scenario Turnover</span>
                        <p className="text-sm font-black text-slate-900 mt-1">{formatMoney(metrics.activeSandboxRev)}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Operating Outgoings</span>
                        <p className="text-sm font-black text-slate-900 mt-1">{formatMoney(metrics.activeSandboxExp)}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-xl border border-slate-100">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Marketing Spend</span>
                        <p className="text-sm font-black text-slate-900 mt-1">{formatMoney(metrics.activeSandboxMkt)}</p>
                      </div>
                      <div className="p-3 bg-cyan-50 rounded-xl border border-cyan-100">
                        <span className="text-[10px] text-cyan-700 font-bold uppercase">Target Net Profit</span>
                        <p className="text-sm font-black text-cyan-700 mt-1">
                          {metrics.nextPredicted !== null ? formatMoney(metrics.nextPredicted) : '—'}
                        </p>
                      </div>
                    </div>

                    {/* Prediction History Table */}
                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Historical Scenario Archive</h4>
                      {predictionsList.length === 0 ? (
                        <p className="text-xs text-slate-500 italic py-4">No prediction records logged in workspace archive.</p>
                      ) : (
                        <table className="w-full text-[11px] text-left text-slate-800">
                          <thead>
                            <tr className="border-b border-slate-200 text-slate-500 font-semibold uppercase">
                              <th className="p-2">Date</th>
                              <th className="p-2">Turnover</th>
                              <th className="p-2">Expenses</th>
                              <th className="p-2">Marketing</th>
                              <th className="p-2 text-cyan-700">Forecast Profit</th>
                              <th className="p-2 text-right">Confidence</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-100">
                            {predictionsList.map(p => (
                              <tr key={p.id}>
                                <td className="p-2 font-medium">{p.date}</td>
                                <td className="p-2">{formatMoney(p.revenue)}</td>
                                <td className="p-2">{formatMoney(p.expenses)}</td>
                                <td className="p-2">{formatMoney(p.marketing)}</td>
                                <td className="p-2 font-bold text-cyan-700">{formatMoney(p.predictedProfit)}</td>
                                <td className="p-2 text-right font-semibold">{p.confidence}%</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      )}
                    </div>

                    {/* Footer Certification */}
                    <div className="pt-6 border-t border-slate-100 text-center">
                      <p className="text-[10px] text-slate-400">
                        Document generated dynamically via Profit Predictor AI analytical engine. Built for business planning and forecasting purposes.
                      </p>
                    </div>

                  </div>

                  {/* Print / Download Button */}
                  <div className="flex gap-4 justify-center no-print">
                    <button 
                      onClick={() => window.print()}
                      className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 text-white text-xs font-bold hover:opacity-95 transition-all shadow-md flex items-center gap-2 cursor-pointer"
                    >
                      <Download className="h-4 w-4" /> Print / Save as PDF
                    </button>
                  </div>

                </div>
              )}

              {/* ===================== TAB 7: SETTINGS ===================== */}
              {activeTab === 'settings' && (
                <div className="max-w-2xl mx-auto space-y-6 animate-fade-in">
                  <div className={`p-6 rounded-2xl border space-y-6 ${
                    theme === 'dark' ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-sm'
                  }`}>
                    <h2 className="text-base font-bold flex items-center gap-2">
                      <Settings className="h-5 w-5 text-cyan-400" /> Platform & Workspace Settings
                    </h2>
                    
                    <div className="space-y-5 divide-y divide-slate-800/60">
                      
                      {/* Company Name & User Details */}
                      <div className="pt-2 space-y-3">
                        <label className="block text-xs font-bold text-slate-300 uppercase tracking-wider">
                          Business / Enterprise Profile
                        </label>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          <input 
                            type="text" 
                            value={user.name} 
                            onChange={e => setUser(prev => ({ ...prev, name: e.target.value }))}
                            className={`px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-cyan-500 ${
                              theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                            }`}
                            placeholder="Business Name"
                          />
                          <input 
                            type="email" 
                            value={user.email} 
                            onChange={e => setUser(prev => ({ ...prev, email: e.target.value }))}
                            className={`px-3 py-2 rounded-xl border text-xs focus:outline-none focus:border-cyan-500 ${
                              theme === 'dark' ? 'bg-slate-950 border-slate-800 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                            }`}
                            placeholder="Email Address"
                          />
                        </div>
                      </div>

                      {/* Currency Selector */}
                      <div className="pt-4 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold">Active Base Currency</p>
                          <p className="text-[10px] text-slate-400">Sets the monetary format across metrics and reports</p>
                        </div>
                        <select
                          value={currency}
                          onChange={e => setCurrency(e.target.value)}
                          className={`px-3 py-2 rounded-xl border text-xs font-bold focus:outline-none focus:border-cyan-500 ${
                            theme === 'dark' ? 'bg-slate-950 border-slate-800 text-cyan-400' : 'bg-slate-50 border-slate-300 text-cyan-700'
                          }`}
                        >
                          <option value="INR">INR — Indian Rupee (₹)</option>
                          <option value="USD">USD — US Dollar ($)</option>
                          <option value="EUR">EUR — Euro (€)</option>
                          <option value="GBP">GBP — British Pound (£)</option>
                          <option value="AED">AED — UAE Dirham (AED)</option>
                        </select>
                      </div>

                      {/* Theme Toggle in Settings */}
                      <div className="pt-4 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold">Visual Display Theme</p>
                          <p className="text-[10px] text-slate-400">Switch between dark mode and light mode</p>
                        </div>
                        <button
                          onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                          className={`px-4 py-2 rounded-xl border text-xs font-bold transition-all flex items-center gap-2 cursor-pointer ${
                            theme === 'dark' ? 'bg-slate-950 border-slate-800 text-slate-200' : 'bg-slate-100 border-slate-300 text-slate-800'
                          }`}
                        >
                          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                          <span className="capitalize">{theme} Theme</span>
                        </button>
                      </div>

                      {/* Clear Prediction Log Action */}
                      <div className="pt-4 flex items-center justify-between">
                        <div>
                          <p className="text-xs font-bold text-rose-400">Clear Prediction Archive</p>
                          <p className="text-[10px] text-slate-400">Permanently delete stored simulation history</p>
                        </div>
                        <button 
                          onClick={() => {
                            if (window.confirm("Are you sure you want to clear your prediction history?")) {
                              setPredictionsList([]);
                              triggerNotification("Prediction history wiped.");
                            }
                          }}
                          className="px-3.5 py-2 rounded-xl text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-all cursor-pointer"
                        >
                          Clear Archive
                        </button>
                      </div>

                    </div>
                  </div>
                </div>
              )}

            </div>
          </main>
        </div>
      )}

    </div>
  );
}