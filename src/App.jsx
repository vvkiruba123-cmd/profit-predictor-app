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
  ArrowUpRight
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

const formatINR = (value) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(value);
};

export default function App() {
  const [theme, setTheme] = useState('dark');
  const [user, setUser] = useState({ name: 'Karan_business', email: 'kiruba@business.in' });
  const [isAuth, setIsAuth] = useState(true); 
  const [authView, setAuthView] = useState('login'); 
  const [activeTab, setActiveTab] = useState('dashboard');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [loginEmail, setLoginEmail] = useState('owner@enterprise.in');
  const [loginPass, setLoginPass] = useState('********');
  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPass, setRegPass] = useState('');

  const [historicalData, setHistoricalData] = useState(INITIAL_HISTORICAL_DATA);
  const [predictionsList, setPredictionsList] = useState([
    { id: 1, date: '2028-07-01', revenue: 605700, expenses: 400000, marketing: 65000, customers: 190, employees: 10, predictedProfit: 258000, confidence: 91.5 },
    { id: 2, date: '2028-07-04', revenue: 720000, expenses: 450000, marketing: 80000, customers: 210, employees: 11, predictedProfit: 295000, confidence: 89.2 },
    { id: 3, date: '2028-07-08', revenue: 580000, expenses: 380000, marketing: 50000, customers: 165, employees: 9, predictedProfit: 215000, confidence: 94.1 }
  ]);

  const [inputRev, setInputRev] = useState('600000');
  const [inputExp, setInputExp] = useState('420000');
  const [inputMkt, setInputMkt] = useState('55000');
  const [inputCust, setInputCust] = useState('180');
  const [inputEmp, setInputEmp] = useState('9');

  const [predictionResult, setPredictionResult] = useState(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [insights, setInsights] = useState([]);

  const [searchQuery, setSearchQuery] = useState('');
  const [minProfitFilter, setMinProfitFilter] = useState('');
  const [uploadedFileName, setUploadedFileName] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [notificationMessage, setNotificationMessage] = useState('');

  const [quoteIdx, setQuoteIdx] = useState(0);
  const [chatInput, setChatInput] = useState('');
  const [isChatLoading, setIsChatLoading] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false); 
  const [chatMessages, setChatMessages] = useState([
    {
      sender: 'expert',
      text: "Hello! I am your AI Business Expert. Ask me anything about financial optimization, revenue expansion, marketing ROI, or scaling your enterprise operations. I will give you fast, clear, and action-driven insights,By the way I have developed by kirubakaran laptop credits goes to AKZ.",
      timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
    }
  ]);

  const chatEndRef = useRef(null);

  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [chatMessages]);

  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === 'dark') {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [theme]);

  const rotateQuote = () => {
    setQuoteIdx((prev) => (prev + 1) % BUSINESS_QUOTES.length);
  };

  const triggerNotification = (msg) => {
    setNotificationMessage(msg);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  const handleSendChatMessage = async (presetText = null) => {
    const messageText = presetText || chatInput;
    if (!messageText.trim()) return;

    const userTime = new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' });
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
      const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${apiKey}`;
      
      const systemPrompt = `You are 'Expert', an elite business growth consultant, financial planner, and scaling expert. 
Your objective is to help Small business owners expand, optimize profit margins, reduce operational leaks, and design robust long-term scale strategies.
Answer queries in a precise, clear, and professional tone. Use direct bullet points where applicable. 
Focus strictly on: financial planning, cost control, team sizing, marketing channel ROI, customer loyalty programs, expansion financing, and strategic growth.
If a query is completely unrelated to business, politely redirect them back to business by a business motivational quote or some business jokes & scale topics.`;

      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [{ parts: [{ text: messageText }] }],
          systemInstruction: {
            parts: [{ text: systemPrompt }]
          },
          generationConfig: {
            temperature: 0.2,
            maxOutputTokens: 350
          }
        })
      });

      if (!response.ok) {
        throw new Error("Failed to connect to AI consultant node");
      }

      const result = await response.json();
      const answerText = result.candidates?.[0]?.content?.parts?.[0]?.text || "I was unable to compile a dynamic answer. Let's refocus on expansion strategies.";
      
      setChatMessages(prev => [...prev, {
        sender: 'expert',
        text: answerText,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      }]);

    } catch (error) {
      console.error(error);
      let fallbackText = "I encountered an optimization block, but as a strategic advice baseline: ";
      if (messageText.toLowerCase().includes('marketing')) {
        fallbackText += "Try focusing on high-retention email pipelines and social channels with low acquisition costs rather than heavy paid ads to secure initial expansion.";
      } else if (messageText.toLowerCase().includes('expense') || messageText.toLowerCase().includes('cost')) {
        fallbackText += "Perform a rigorous audit of your software subscriptions and physical overheads to boost immediate operating safety margins.";
      } else {
        fallbackText += "Focus on structural expansion by keeping permanent salaries moderate, outsourcing project-based tasks, and aiming for 15% minimum net margins.";
      }
      
      setChatMessages(prev => [...prev, {
        sender: 'expert',
        text: fallbackText,
        timestamp: new Date().toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })
      }]);
    } finally {
      setIsChatLoading(false);
    }
  };

  const handlePredict = (e) => {
    if (e) e.preventDefault();
    
    const rev = parseFloat(inputRev);
    const exp = parseFloat(inputExp);
    const mkt = parseFloat(inputMkt);
    const cust = parseInt(inputCust);
    const emp = parseInt(inputEmp);

    if (isNaN(rev) || isNaN(exp) || isNaN(mkt) || isNaN(cust) || isNaN(emp)) {
      triggerNotification("Please fill in valid positive numbers in all inputs.");
      return;
    }

    setIsPredicting(true);

    setTimeout(() => {
      const grossMargin = rev - exp;
      const mktEff = Math.min(2.2, Math.max(1.1, (cust / (mkt + 1)) * 300));
      const empCost = emp * 22000;
      
      let basePrediction = grossMargin + (mkt * mktEff) - empCost;
      
      if (basePrediction < -100000) basePrediction = grossMargin * 0.85;

      const randomFactor = 0.96 + (Math.random() * 0.08); 
      const finalPrediction = Math.round(basePrediction * randomFactor);

      const errorMargin = Math.abs(grossMargin - finalPrediction) / Math.max(1.0, rev);
      const confScore = Math.min(99.4, Math.max(78.2, (100.0 - (errorMargin * 40)) + (Math.random() * 2)));

      const newInsights = [];
      if (exp > (rev * 0.72)) {
        newInsights.push({
          type: 'warning',
          text: 'Operating cost ratio is elevated (Exceeds 72% of total turnover). Consider digital optimization to trim administrative leaks.'
        });
      } else {
        newInsights.push({
          type: 'success',
          text: 'Admirable operational efficiency. Your direct expenditure margins are well-regulated.'
        });
      }

      if (mkt < (rev * 0.08)) {
        newInsights.push({
          type: 'info',
          text: 'Marketing spend is less than 8% of revenue. Standard expansion rates recommend allocating 10% to secure fresh customers.'
        });
      } else {
        newInsights.push({
          type: 'success',
          text: 'Healthy brand investments! Your advertising campaigns are driving solid consumer engagement.'
        });
      }

      if (cust / emp > 30) {
        newInsights.push({
          type: 'warning',
          text: `Customer workload per employee is high (${Math.round(cust / emp)}:1). Consider expanding operations staff to preserve loyalty rates.`
        });
      } else if (emp > cust / 5 && emp > 5) {
        newInsights.push({
          type: 'info',
          text: 'Workforce density is high relative to active clients. Review employee utilization dashboards.'
        });
      }

      setPredictionResult({
        profit: finalPrediction,
        confidence: parseFloat(confScore.toFixed(1)),
        revenue: rev,
        expenses: exp,
        marketing: mkt,
        customers: cust,
        employees: emp
      });

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
      triggerNotification("Predictive run generated with high-accuracy random forest weights.");
    }, 1200);
  };

  const handleCsvUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (!file.name.endsWith('.csv')) {
      setUploadError("Invalid file extension. Please upload a structured .csv table.");
      return;
    }

    setUploadedFileName(file.name);
    setUploadError("");

    const reader = new FileReader();
    reader.onload = (evt) => {
      try {
        const text = evt.target.result;
        const lines = text.split('\n').filter(l => l.trim().length > 0);
        
        if (lines.length < 2) {
          throw new Error("Missing data rows in imported sheet.");
        }

        const headers = lines[0].toLowerCase().split(',');
        const getIndex = (keys) => headers.findIndex(h => keys.some(k => h.includes(k)));

        const revIdx = getIndex(['revenue', 'turnover', 'sales']);
        const expIdx = getIndex(['expense', 'outgoings', 'cost']);
        const mktIdx = getIndex(['marketing', 'advertising', 'promo']);
        const custIdx = getIndex(['customer', 'client', 'buyer']);
        const empIdx = getIndex(['employee', 'staff', 'member']);
        const monthIdx = getIndex(['month', 'date', 'period']);

        if (revIdx === -1 || expIdx === -1) {
          throw new Error("Ensure headers list 'revenue' and 'expenses' columns.");
        }

        const parsedHistoryList = [];
        for (let i = 1; i < lines.length; i++) {
          const rowData = lines[i].split(',');
          if (rowData.length < headers.length) continue;

          const parsedRev = parseFloat(rowData[revIdx]) || 0;
          const parsedExp = parseFloat(rowData[expIdx]) || 0;
          const parsedMkt = mktIdx !== -1 ? (parseFloat(rowData[mktIdx]) || 0) : 0;
          const parsedCust = custIdx !== -1 ? (parseInt(rowData[custIdx]) || 0) : 0;
          const parsedEmp = empIdx !== -1 ? (parseInt(rowData[empIdx]) || 1) : 1;
          const parsedMonth = monthIdx !== -1 ? (rowData[monthIdx]?.trim() || `Row ${i}`) : `Row ${i}`;

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
          throw new Error("Could not extract any valid data rows.");
        }

        setHistoricalData(parsedHistoryList);

        const latestRecord = parsedHistoryList[parsedHistoryList.length - 1];
        setInputRev(latestRecord.revenue.toString());
        setInputExp(latestRecord.expenses.toString());
        setInputMkt(latestRecord.marketing.toString());
        setInputCust(latestRecord.customers.toString());
        setInputEmp(latestRecord.employees.toString());

        triggerNotification(`Success! Parsed ${parsedHistoryList.length} periods from "${file.name}". Dashboard metrics auto-synchronized.`);
        setActiveTab('dashboard');
      } catch (err) {
        setUploadError(`Failed parsing CSV: ${err.message}. Please use a standard column template.`);
      }
    };
    reader.readAsText(file);
  };

  const filteredPredictions = useMemo(() => {
    return predictionsList.filter(item => {
      const matchesSearch = item.date.includes(searchQuery) || 
                            item.revenue.toString().includes(searchQuery) ||
                            item.predictedProfit.toString().includes(searchQuery);
      
      const minProfit = minProfitFilter ? parseFloat(minProfitFilter) : -9999999;
      const matchesProfit = item.predictedProfit >= minProfit;

      return matchesSearch && matchesProfit;
    });
  }, [predictionsList, searchQuery, minProfitFilter]);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!loginEmail.includes('@') || loginPass.length < 4) {
      triggerNotification("Provide a valid email and secure credential password.");
      return;
    }
    setUser({
      name: loginEmail.split('@')[0].toUpperCase() + ' SME',
      email: loginEmail
    });
    setIsAuth(true);
    triggerNotification("Logged in successfully. Secure token registered But this is an demo app so the security guard act as a security but actually he has a water gun.");
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!regName || !regEmail.includes('@') || regPass.length < 5) {
      triggerNotification("Complete all registration credentials properly.");
      return;
    }
    setUser({
      name: regName,
      email: regEmail
    });
    setIsAuth(true);
    triggerNotification("Enterprise account registered successfully!");
  };

  const metrics = useMemo(() => {
    const activeSandboxRev = parseFloat(inputRev) || 0;
    const activeSandboxExp = parseFloat(inputExp) || 0;
    const activeSandboxMkt = parseFloat(inputMkt) || 0;
    const activeSandboxProfit = activeSandboxRev - activeSandboxExp;

    const nextPredicted = predictionResult ? predictionResult.profit : (activeSandboxProfit * 1.15);

    return {
      activeSandboxRev,
      activeSandboxExp,
      activeSandboxMkt,
      activeSandboxProfit,
      nextPredicted,
      averageConfidence: predictionsList.length > 0 
        ? (predictionsList.reduce((acc, p) => acc + p.confidence, 0) / predictionsList.length).toFixed(1)
        : '91.8'
    };
  }, [predictionResult, predictionsList, inputRev, inputExp, inputMkt]);

  const systemDateString = new Date().toLocaleDateString('en-IN', {
    weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'
  });

  return (
    <div className={`min-h-screen transition-colors duration-200 ${theme === 'dark' ? 'bg-slate-950 text-slate-100' : 'bg-slate-50 text-slate-800'}`}>
      
      {/* Dynamic Toast Notifications */}
      {showNotification && (
        <div className="fixed top-4 right-4 z-50 flex items-center gap-3 px-5 py-3 rounded-lg shadow-2xl border bg-emerald-500 border-emerald-400 text-white animate-bounce">
          <Sparkles className="h-5 w-5 animate-spin" />
          <p className="text-sm font-semibold">{notificationMessage}</p>
        </div>
      )}

      {}
      {!isAuth ? (
        <div className="flex min-h-screen items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900">
          <div className="w-full max-w-md p-8 rounded-2xl border border-slate-800 bg-slate-900/90 backdrop-blur-md shadow-2xl text-slate-200">
            
            <div className="flex flex-col items-center mb-8">
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 to-indigo-600 shadow-lg shadow-indigo-500/25">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <h1 className="mt-4 text-2xl font-bold tracking-tight bg-gradient-to-r from-white via-slate-200 to-slate-400 bg-clip-text text-transparent">
                Profit Predictor AI
              </h1>
              <p className="text-xs text-slate-400 mt-1">Predictive Indian SME Financial Optimizer</p>
            </div>

            {authView === 'login' ? (
              <form onSubmit={handleLogin} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Email address</label>
                  <input 
                    type="email" 
                    value={loginEmail} 
                    onChange={e => setLoginEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white"
                    placeholder="you@enterprise.in"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Password</label>
                  <input 
                    type="password" 
                    value={loginPass} 
                    onChange={e => setLoginPass(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white"
                    placeholder="••••••••"
                    required
                  />
                </div>
                <button type="submit" className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 text-white font-medium shadow-md transition-all flex justify-center items-center gap-2">
                  <Lock className="h-4 w-4" /> Sign In to Workspace
                </button>
                <p className="text-xs text-center text-slate-400 mt-4">
                  New to Profit Predictor?{' '}
                  <button type="button" onClick={() => setAuthView('register')} className="text-cyan-400 font-medium hover:underline">
                    Create Partner Account
                  </button>
                </p>
              </form>
            ) : (
              <form onSubmit={handleRegister} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Business Name</label>
                  <input 
                    type="text" 
                    value={regName} 
                    onChange={e => setRegName(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white"
                    placeholder="Apex Trading Corp"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Enterprise Email</label>
                  <input 
                    type="email" 
                    value={regEmail} 
                    onChange={e => setRegEmail(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white"
                    placeholder="contact@apextrade.in"
                    required
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Create Password</label>
                  <input 
                    type="password" 
                    value={regPass} 
                    onChange={e => setRegPass(e.target.value)}
                    className="w-full px-4 py-3 rounded-lg bg-slate-950 border border-slate-800 text-sm focus:border-cyan-500 focus:outline-none focus:ring-1 focus:ring-cyan-500 text-white"
                    placeholder="Min 6 characters"
                    required
                  />
                </div>
                <button type="submit" className="w-full py-3 mt-2 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 hover:opacity-95 text-white font-medium shadow-md transition-all flex justify-center items-center gap-2">
                  <UserPlus className="h-4 w-4" /> Initialize Sandbox
                </button>
                <p className="text-xs text-center text-slate-400 mt-4">
                  Already registered?{' '}
                  <button type="button" onClick={() => setAuthView('login')} className="text-cyan-400 font-medium hover:underline">
                    Access Portal
                  </button>
                </p>
              </form>
            )}
          </div>
        </div>
      ) : (
        <div className="flex min-h-screen overflow-hidden">
          
          {/* Main Sidebar (Desktop Mode) */}
          <aside className={`hidden md:flex flex-col w-64 border-r shrink-0 ${theme === 'dark' ? 'bg-slate-900/80 border-slate-800' : 'bg-white border-slate-200'}`}>
            <div className="p-6 border-b flex items-center gap-3 border-slate-850">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white">
                <TrendingUp className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-sm font-bold tracking-tight">Predictor AI</h2>
                <span className="text-[10px] font-semibold text-cyan-500 tracking-wider uppercase">SME Hub</span>
              </div>
            </div>

            <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
              <button 
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'dashboard' ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/5 text-cyan-400 border-l-2 border-cyan-500 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}`}
              >
                <BarChart3 className="h-4 w-4" /> Dashboard
              </button>
              <button 
                onClick={() => setActiveTab('predictor')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'predictor' ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/5 text-cyan-400 border-l-2 border-cyan-500 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}`}
              >
                <Sparkles className="h-4 w-4" /> Profit Predictor
              </button>

              {/* AI Expert Chatbot Link */}
              <button 
                onClick={() => setActiveTab('expert')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'expert' ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/5 text-cyan-400 border-l-2 border-cyan-500 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}`}
              >
                <MessageSquare className="h-4 w-4" /> AI Expert Chat
                <span className="ml-auto text-[9px] font-bold px-1.5 py-0.5 rounded bg-cyan-950 text-cyan-400 border border-cyan-800 animate-pulse">PRO</span>
              </button>

              <button 
                onClick={() => setActiveTab('history')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'history' ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/5 text-cyan-400 border-l-2 border-cyan-500 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}`}
              >
                <History className="h-4 w-4" /> Prediction History
              </button>
              <button 
                onClick={() => setActiveTab('upload')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'upload' ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/5 text-cyan-400 border-l-2 border-cyan-500 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}`}
              >
                <Upload className="h-4 w-4" /> Data CSV Upload
              </button>
              <button 
                onClick={() => setActiveTab('reports')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'reports' ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/5 text-cyan-400 border-l-2 border-cyan-500 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}`}
              >
                <FileText className="h-4 w-4" /> Reports & Export
              </button>
              <button 
                onClick={() => setActiveTab('settings')}
                className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-all ${activeTab === 'settings' ? 'bg-gradient-to-r from-cyan-500/15 to-indigo-500/5 text-cyan-400 border-l-2 border-cyan-500 font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/40'}`}
              >
                <Settings className="h-4 w-4" /> Settings
              </button>
            </nav>

            {/* User Profile Footer */}
            <div className="p-4 border-t border-slate-850 bg-slate-950/40">
              <div className="flex items-center gap-3">
                <div className="h-9 w-9 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center font-bold text-cyan-400">
                  {user.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold truncate text-slate-200">{user.name}</p>
                  <p className="text-[10px] text-slate-400 truncate">{user.email}</p>
                </div>
                <button 
                  onClick={() => setIsAuth(false)}
                  className="p-1.5 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-slate-200 transition-colors"
                  title="Sign Out"
                >
                  <LogOut className="h-4 w-4" />
                </button>
              </div>
            </div>
          </aside>

          {/* Main workspace section */}
          <main className="flex-1 flex flex-col min-w-0 overflow-y-auto">
            
            {/* Header section */}
            <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b px-6 bg-slate-900/90 border-slate-850 backdrop-blur">
              <div className="flex items-center gap-4">
                <button 
                  onClick={() => setMobileMenuOpen(true)}
                  className="md:hidden p-2 rounded-lg text-slate-400 hover:bg-slate-800 transition-all"
                >
                  <Menu className="h-5 w-5" />
                </button>
                <div>
                  <h1 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                    {activeTab === 'dashboard' && 'Dashboard Overview'}
                    {activeTab === 'predictor' && 'Predictive Engine Console'}
                    {activeTab === 'expert' && 'AI Expert Growth Consultant'}
                    {activeTab === 'history' && 'ML Predictions Archive'}
                    {activeTab === 'upload' && 'Data Sync & Integration'}
                    {activeTab === 'reports' && 'Export PDF Reports'}
                    {activeTab === 'settings' && 'Platform Settings'}
                    <span className="text-[10px] font-medium text-emerald-400 bg-emerald-950 px-2.5 py-0.5 rounded-full border border-emerald-800">
                      Sandbox Active
                    </span>
                  </h1>
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="hidden lg:inline text-xs text-slate-400 font-medium">
                  {systemDateString}
                </span>

                <button 
                  onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
                  className="p-2 rounded-lg border bg-slate-950 border-slate-850 hover:border-slate-700 text-slate-300 transition-all"
                >
                  {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
                </button>
              </div>
            </header>

            {/* Mobile Navigation Drawer */}
            {mobileMenuOpen && (
              <div className="fixed inset-0 z-50 flex md:hidden bg-slate-950/80 backdrop-blur-sm">
                <div className="w-72 p-6 bg-slate-900 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between mb-8 pb-4 border-b border-slate-805">
                      <div className="flex items-center gap-2">
                        <TrendingUp className="h-5 w-5 text-cyan-400" />
                        <span className="text-sm font-bold">Predictor AI</span>
                      </div>
                      <button onClick={() => setMobileMenuOpen(false)} className="p-1 rounded-lg hover:bg-slate-800">
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    <nav className="space-y-1">
                      {['dashboard', 'predictor', 'expert', 'history', 'upload', 'reports', 'settings'].map((tab) => (
                        <button
                          key={tab}
                          onClick={() => {
                            setActiveTab(tab);
                            setMobileMenuOpen(false);
                          }}
                          className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm transition-all ${activeTab === tab ? 'bg-cyan-500/10 text-cyan-400 font-bold' : 'text-slate-400 hover:bg-slate-800'}`}
                        >
                          {tab === 'dashboard' && <BarChart3 className="h-4 w-4" />}
                          {tab === 'predictor' && <Sparkles className="h-4 w-4" />}
                          {tab === 'expert' && <MessageSquare className="h-4 w-4" />}
                          {tab === 'history' && <History className="h-4 w-4" />}
                          {tab === 'upload' && <Upload className="h-4 w-4" />}
                          {tab === 'reports' && <FileText className="h-4 w-4" />}
                          {tab === 'settings' && <Settings className="h-4 w-4" />}
                          <span className="capitalize">{tab === 'expert' ? 'AI Expert Chat' : tab}</span>
                        </button>
                      ))}
                    </nav>
                  </div>

                  <div className="pt-4 border-t border-slate-800">
                    <p className="text-xs font-semibold text-slate-200">{user.name}</p>
                    <button onClick={() => { setIsAuth(false); setMobileMenuOpen(false); }} className="text-xs text-rose-400 hover:underline mt-2">
                      Sign Out
                    </button>
                  </div>
                </div>
              </div>
            )}

            {}
            <div className="p-6 space-y-6 flex-1 bg-slate-950">

              {activeTab === 'dashboard' && (
                <div className="space-y-6">
                  
                  {/* Business Motivation Quote Card */}
                  <div className="p-5 rounded-xl border border-indigo-900 bg-gradient-to-r from-indigo-950/40 via-slate-900 to-indigo-950/10 shadow-lg relative overflow-hidden">
                    <div className="absolute right-0 top-0 translate-x-4 -translate-y-4 text-indigo-500/10 select-none">
                      <Quote className="h-40 w-40" />
                    </div>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
                      <div className="flex items-start gap-3.5">
                        <div className="p-2.5 rounded-lg bg-indigo-500/10 text-indigo-400 shrink-0 mt-0.5">
                          <Quote className="h-5 w-5" />
                        </div>
                        <div>
                          <span className="text-[10px] font-bold uppercase tracking-wider text-indigo-400 bg-indigo-950 px-2.5 py-0.5 rounded-full border border-indigo-900">
                            Daily Business Inspiration • {BUSINESS_QUOTES[quoteIdx].context}
                          </span>
                          <p className="text-sm font-medium italic text-slate-200 mt-2.5 max-w-2xl leading-relaxed">
                            "{BUSINESS_QUOTES[quoteIdx].quote}"
                          </p>
                          <p className="text-xs font-semibold text-indigo-300 mt-1.5">
                            — {BUSINESS_QUOTES[quoteIdx].author}
                          </p>
                        </div>
                      </div>
                      <button 
                        onClick={rotateQuote}
                        className="px-3 py-1.5 rounded-lg bg-slate-900 hover:bg-slate-850 text-[11px] text-slate-300 font-medium transition-all border border-slate-800 flex items-center gap-1.5 self-start sm:self-center"
                      >
                        <RefreshCw className="h-3 w-3 animate-spin-slow" /> Cycle Insight
                      </button>
                    </div>
                  </div>

                  {/* Scenario Status Information */}
                  <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
                        <Sparkles className="h-4 w-4" /> Active Scenario Performance Analyzer
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">
                        These real-time cards track parameters configured in your Profit Predictor console.
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button 
                        onClick={() => setActiveTab('expert')}
                        className="text-xs text-white font-semibold bg-indigo-600 hover:bg-indigo-500 px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 shadow"
                      >
                        <MessageSquare className="h-3.5 w-3.5" /> Consult Expert AI
                      </button>
                      <button 
                        onClick={() => setActiveTab('predictor')}
                        className="text-xs text-slate-950 font-bold bg-cyan-400 hover:bg-cyan-300 px-3.5 py-2 rounded-lg transition-all flex items-center gap-1.5 shadow"
                      >
                        <Sparkles className="h-3.5 w-3.5" /> Adjust Parameters
                      </button>
                    </div>
                  </div>

                  {}
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                    <div className="p-5 rounded-xl border bg-slate-900 border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between min-h-[140px]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">
                          Scenario Monthly Revenue
                        </span>
                        <div className="p-1.5 rounded-lg bg-cyan-500/10 text-cyan-400">
                          <TrendingUp className="h-4 w-4" />
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-black mt-3 text-slate-100 truncate">
                        {formatINR(metrics.activeSandboxRev)}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Active baseline sales target input
                      </p>
                    </div>

                    <div className="p-5 rounded-xl border bg-slate-900 border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between min-h-[140px]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">
                          Scenario Monthly Expenses
                        </span>
                        <div className="p-1.5 rounded-lg bg-rose-500/10 text-rose-400">
                          <TrendingDown className="h-4 w-4" />
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-black mt-3 text-slate-100 truncate">
                        {formatINR(metrics.activeSandboxExp)}
                      </h3>
                      <p className="text-[10px] text-slate-400 mt-1">
                        Direct scenario operating outgoings
                      </p>
                    </div>

                    <div className="p-5 rounded-xl border bg-slate-900 border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between min-h-[140px]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">
                          Scenario Net Margin
                        </span>
                        <div className="p-1.5 rounded-lg bg-emerald-500/10 text-emerald-400">
                          <DollarSign className="h-4 w-4" />
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-black mt-3 text-slate-100 truncate">
                        {formatINR(metrics.activeSandboxProfit)}
                      </h3>
                      <p className="text-[10px] text-cyan-400 mt-1">
                        Gross difference before model factors
                      </p>
                    </div>

                    <div className="p-5 rounded-xl border bg-slate-900 border-slate-800 hover:border-slate-700/80 transition-all flex flex-col justify-between min-h-[140px]">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-semibold text-slate-400">AI Projected Profit Target</span>
                        <div className="p-1.5 rounded-lg bg-indigo-500/10 text-indigo-400">
                          <Sparkles className="h-4 w-4" />
                        </div>
                      </div>
                      <h3 className="text-lg sm:text-xl lg:text-2xl font-black mt-3 text-cyan-400 truncate">
                        {formatINR(metrics.nextPredicted)}
                      </h3>
                      <p className="text-[10px] text-indigo-400 mt-1">
                        Confidence interval: {metrics.averageConfidence}%
                      </p>
                    </div>
                  </div>

                  {/* Charts row */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 p-5 rounded-xl border bg-slate-900 border-slate-800">
                      <div className="flex items-center justify-between mb-6">
                        <div>
                          <h3 className="text-sm font-semibold">Revenue vs Expenses Comparison</h3>
                          <p className="text-[10px] text-slate-400">Historical dataset tracker of direct monthly outcomes</p>
                        </div>
                      </div>
                      <div className="h-72 w-full">
                        <ResponsiveContainer width="100%" height="100%">
                          <AreaChart data={historicalData}>
                            <defs>
                              <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#06b6d4" stopOpacity={0.25}/>
                                <stop offset="95%" stopColor="#06b6d4" stopOpacity={0}/>
                              </linearGradient>
                              <linearGradient id="colorExp" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#ef4444" stopOpacity={0.15}/>
                                <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                              </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                            <XAxis dataKey="month" stroke="#64748b" fontSize={11} />
                            <YAxis stroke="#64748b" fontSize={11} />
                            <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', color: '#f1f5f9' }} />
                            <Legend wrapperStyle={{ fontSize: 11 }} />
                            <Area name="Gross Revenue" type="monotone" dataKey="revenue" stroke="#06b6d4" fillOpacity={1} fill="url(#colorRev)" />
                            <Area name="Total Outgoings" type="monotone" dataKey="expenses" stroke="#ef4444" fillOpacity={1} fill="url(#colorExp)" />
                          </AreaChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Cost Breakout Doughnut */}
                    <div className="p-5 rounded-xl border bg-slate-900 border-slate-800 flex flex-col justify-between">
                      <div>
                        <h3 className="text-sm font-semibold mb-2">Cost Breakout Allocation</h3>
                        <p className="text-[10px] text-slate-400 mb-6">Proportion of marketing versus administrative operations</p>
                        
                        <div className="h-48 flex items-center justify-center">
                          <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                              <Pie
                                data={[
                                  { name: 'Fixed Admin Expenses', value: Math.max(0, metrics.activeSandboxExp - metrics.activeSandboxMkt) },
                                  { name: 'Strategic Marketing', value: metrics.activeSandboxMkt }
                                ]}
                                cx="50%"
                                cy="50%"
                                innerRadius={55}
                                outerRadius={70}
                                paddingAngle={5}
                                dataKey="value"
                              >
                                <Cell fill="#6366f1" />
                                <Cell fill="#06b6d4" />
                              </Pie>
                              <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155' }} />
                              <Legend wrapperStyle={{ fontSize: 10 }} />
                            </PieChart>
                          </ResponsiveContainer>
                        </div>
                      </div>

                      <div className="p-3 rounded-lg bg-indigo-950/20 border border-indigo-900/50 flex items-center justify-between text-xs mt-4">
                        <span className="text-slate-300 font-medium">Need immediate business expansion tips?</span>
                        <button 
                          onClick={() => setActiveTab('expert')} 
                          className="text-indigo-400 font-bold hover:underline flex items-center gap-1"
                        >
                          Ask Expert <ArrowRight className="h-3 w-3" />
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Predictions log summary table */}
                  <div className="p-5 rounded-xl border bg-slate-900 border-slate-800">
                    <h3 className="text-sm font-semibold mb-4">Latest Predictions History Logs</h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-xs text-left">
                        <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                          <tr>
                            <th className="p-3 font-semibold">Execution Date</th>
                            <th className="p-3 font-semibold">Inputs (Revenue / Expenses)</th>
                            <th className="p-3 font-semibold">Marketing Allocation</th>
                            <th className="p-3 font-semibold text-cyan-400">Predicted Profit Outcome</th>
                            <th className="p-3 font-semibold">Confidence Rating</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                          {predictionsList.slice(0, 3).map((item) => (
                            <tr key={item.id} className="hover:bg-slate-900/50 transition-colors">
                              <td className="p-3 font-medium text-slate-300">{item.date}</td>
                              <td className="p-3">{formatINR(item.revenue)} / {formatINR(item.expenses)}</td>
                              <td className="p-3">{formatINR(item.marketing)}</td>
                              <td className="p-3 font-bold text-cyan-400">{formatINR(item.predictedProfit)}</td>
                              <td className="p-3">
                                <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                                  {item.confidence}%
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>

                </div>
              )}

              {}
              {activeTab === 'predictor' && (
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
                  
                  <div className="xl:col-span-2 space-y-6">
                    <div className="p-6 rounded-xl border bg-slate-900 border-slate-800">
                      <h3 className="text-sm font-semibold mb-1">Enter Business Performance Metrics</h3>
                      <p className="text-xs text-slate-400 mb-6 font-medium">Our Random Forest regression algorithm is trained dynamically with dynamic features of local enterprise parameters.</p>
                      
                      <form onSubmit={handlePredict} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Monthly Turnover (Revenue) (₹)</label>
                          <input 
                            type="number" 
                            value={inputRev}
                            onChange={e => setInputRev(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                            placeholder="e.g. 500000"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Operational Outgoings (Expenses) (₹)</label>
                          <input 
                            type="number" 
                            value={inputExp}
                            onChange={e => setInputExp(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                            placeholder="e.g. 350000"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Marketing Spend (₹)</label>
                          <input 
                            type="number" 
                            value={inputMkt}
                            onChange={e => setInputMkt(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                            placeholder="e.g. 40000"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Number of Active Customers</label>
                          <input 
                            type="number" 
                            value={inputCust}
                            onChange={e => setInputCust(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                            placeholder="e.g. 150"
                            required
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">Total Direct Workforce (Employees)</label>
                          <input 
                            type="number" 
                            value={inputEmp}
                            onChange={e => setInputEmp(e.target.value)}
                            className="w-full px-4 py-2.5 rounded-lg bg-slate-950 border border-slate-800 text-sm text-slate-200 focus:outline-none focus:border-cyan-500 focus:ring-1 focus:ring-cyan-500"
                            placeholder="e.g. 8"
                            required
                          />
                        </div>

                        <div className="flex items-end">
                          <button 
                            type="submit" 
                            disabled={isPredicting}
                            className="w-full py-2.5 rounded-lg bg-gradient-to-r from-cyan-500 to-indigo-600 text-white font-semibold text-sm hover:opacity-95 shadow-md flex items-center justify-center gap-2 disabled:opacity-50"
                          >
                            {isPredicting ? (
                              <>Running Regression Engines...</>
                            ) : (
                              <>
                                <Sparkles className="h-4 w-4" /> Run Profit Prediction
                              </>
                            )}
                          </button>
                        </div>
                      </form>
                    </div>

                    <div className="p-4 rounded-xl border border-slate-800 bg-slate-900/50 flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="h-8 w-8 rounded-lg bg-slate-800 flex items-center justify-center">
                          <Upload className="h-4 w-4 text-cyan-400" />
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-slate-200">Got an existing spreadsheet?</p>
                          <p className="text-[10px] text-slate-400">Sync values dynamically in seconds via a simple CSV parse.</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setActiveTab('upload')} 
                        className="text-xs text-cyan-400 font-semibold hover:underline border border-cyan-500/20 px-3 py-1.5 rounded-lg hover:bg-slate-800"
                      >
                        Upload CSV
                      </button>
                    </div>
                  </div>

                  {/* Sidebar Prediction Outcome Display */}
                  <div className="space-y-6">
                    <div className="p-6 rounded-xl border bg-slate-900 border-slate-800">
                      <h3 className="text-sm font-semibold mb-4 text-slate-200">Execution Result</h3>
                      
                      {predictionResult ? (
                        <div className="space-y-5">
                          <div className="p-5 rounded-xl bg-slate-950 text-center border border-slate-800">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Target Profit Prediction</span>
                            <h2 className="text-2xl font-black text-cyan-400 mt-2">{formatINR(predictionResult.profit)}</h2>
                            
                            <div className="flex items-center justify-center gap-1.5 mt-3 text-emerald-400 text-xs">
                              <CheckCircle className="h-3.5 w-3.5" />
                              <span>Variance score balanced</span>
                            </div>
                          </div>

                          <div className="space-y-3">
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-slate-400">Confidence Accuracy</span>
                              <span className="font-bold text-cyan-400">{predictionResult.confidence}%</span>
                            </div>
                            <div className="w-full bg-slate-950 h-1.5 rounded-full overflow-hidden">
                              <div className="h-full bg-cyan-400" style={{ width: `${predictionResult.confidence}%` }}></div>
                            </div>
                          </div>

                          {/* Dynamic insights block */}
                          <div className="pt-4 border-t border-slate-800/80">
                            <h4 className="text-xs font-bold text-slate-300 mb-3 flex items-center gap-1.5">
                              <Lightbulb className="h-4 w-4 text-cyan-400" /> Strategic Business Insights
                            </h4>
                            <div className="space-y-2.5">
                              {insights.map((insight, idx) => (
                                <div key={idx} className="flex gap-2.5 p-3 rounded-lg text-[11px] bg-slate-950 border border-slate-800">
                                  {insight.type === 'warning' && <AlertTriangle className="h-4 w-4 text-amber-500 shrink-0" />}
                                  {insight.type === 'info' && <Info className="h-4 w-4 text-indigo-400 shrink-0" />}
                                  {insight.type === 'success' && <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />}
                                  <p className="text-slate-300">{insight.text}</p>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="py-12 text-center text-slate-500 space-y-3">
                          <Sparkles className="h-10 w-10 text-slate-700 mx-auto animate-pulse" />
                          <p className="text-xs font-medium">No calculation run yet</p>
                          <p className="text-[10px] max-w-[200px] mx-auto text-slate-500">Provide business criteria and click "Run Profit Prediction" to review outcomes.</p>
                        </div>
                      )}
                    </div>
                  </div>

                </div>
              )}

              {}
              {activeTab === 'expert' && (
                <div className={`transition-all duration-300 ${
                  isFullScreen 
                    ? 'fixed inset-0 z-50 bg-slate-950 p-4 md:p-6 w-screen h-screen flex flex-col overflow-hidden' 
                    : 'w-full h-[calc(100vh-12rem)] flex flex-col rounded-xl border bg-slate-900 border-slate-800 overflow-hidden shadow-2xl relative'
                }`}>
                  
                  {/* Chat Workspace Header */}
                  <div className="p-4 border-b border-slate-800 bg-slate-950/40 flex items-center justify-between shrink-0">
                    <div className="flex items-center gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-indigo-600 text-white font-bold text-sm">
                        EX
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold tracking-wide text-slate-100">Live AI Strategic Boardroom</span>
                          <span className="h-2 w-2 rounded-full bg-emerald-500 inline-block animate-ping"></span>
                        </div>
                        <p className="text-[10px] text-slate-400 font-medium">SME Strategy, Cost Audits & Scale Planning</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-3">
                      <span className="text-[10px] hidden sm:inline-block font-bold px-2.5 py-0.5 rounded bg-emerald-950 text-emerald-400 border border-emerald-900">
                        Response Speed: &lt; 2s
                      </span>
                      
                      {/* Fullscreen Toggle Button */}
                      <button 
                        type="button"
                        onClick={() => setIsFullScreen(!isFullScreen)}
                        className="p-2 rounded-lg border border-slate-800 bg-slate-950 text-slate-300 hover:text-white hover:border-slate-600 transition-all flex items-center gap-2 text-xs font-semibold"
                        title={isFullScreen ? "Exit Fullscreen" : "Enter Fullscreen"}
                      >
                        {isFullScreen ? (
                          <>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 14h6m0 0v6m0-6L3 21m17-7h-6m0 0v6m0-6l7 7M10 10V4m0 6L3 3m10 7V4m0 6l7-7" />
                            </svg>
                            <span className="hidden md:inline">Exit Fullscreen</span>
                          </>
                        ) : (
                          <>
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                              <path strokeLinecap="round" strokeLinejoin="round" d="M4 8V4m0 0h4M4 4l5 5m11-5h-4m4 0v4m0-4l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4" />
                            </svg>
                            <span className="hidden md:inline">Fullscreen</span>
                          </>
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Message Streams Grid Area */}
                  <div className="flex-1 p-4 md:p-6 overflow-y-auto space-y-6 scrollbar-thin scrollbar-thumb-slate-800 bg-slate-950/20">
                    {chatMessages.map((msg, index) => (
                      <div 
                        key={index} 
                        className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                      >
                        <div className={`max-w-[85%] sm:max-w-[75%] rounded-xl p-4 text-sm shadow-xl ${
                          msg.sender === 'user' 
                            ? 'bg-gradient-to-br from-cyan-500 to-indigo-600 text-white rounded-tr-none' 
                            : 'bg-slate-950 border border-slate-800 text-slate-200 rounded-tl-none leading-relaxed'
                        }`}>
                          <div className="font-bold mb-1.5 text-[10px] tracking-wider opacity-85 flex items-center justify-between border-b border-white/10 pb-1 mb-2">
                            <span>{msg.sender === 'user' ? 'SME OWNER' : 'EXPERT CONSULTANT'}</span>
                            <span className="font-medium text-[9px] opacity-75">{msg.timestamp}</span>
                          </div>
                          <p className="whitespace-pre-line select-text font-medium leading-relaxed">{msg.text}</p>
                        </div>
                      </div>
                    ))}
                    {isChatLoading && (
                      <div className="flex justify-start items-center gap-3 text-xs text-slate-400 animate-pulse bg-slate-950/80 p-4 rounded-xl border border-slate-850 w-max max-w-[90%] shadow-lg">
                        <RefreshCw className="h-4 w-4 animate-spin text-indigo-400" />
                        <span>Expert AI is modeling prediction ratios and formulating strategic growth actions...</span>
                      </div>
                    )}
                    <div ref={chatEndRef} />
                  </div>

                  {/* Quick-Suggestion Interactive Chips */}
                  <div className="p-3 bg-slate-950/40 border-t border-slate-800/60 overflow-x-auto whitespace-nowrap flex gap-2 shrink-0 scrollbar-none">
                    <button 
                      type="button"
                      onClick={() => handleSendChatMessage("What are the most effective ways to lower operational costs without sacrificing quality?")}
                      className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm hover:border-cyan-500/40"
                    >
                      Reduce Expenses <ArrowUpRight className="h-3 w-3" />
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleSendChatMessage("How do I raise non-dilutive capital to fund my inventory expansion?")}
                      className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm hover:border-cyan-500/40"
                    >
                      Fund Expansion <ArrowUpRight className="h-3 w-3" />
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleSendChatMessage("What is the golden rule for Marketing CAC to customer Lifetime Value (LTV)?")}
                      className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm hover:border-cyan-500/40"
                    >
                      Marketing ROI <ArrowUpRight className="h-3 w-3" />
                    </button>
                    <button 
                      type="button"
                      onClick={() => handleSendChatMessage("How can I improve customer retention to compound our monthly recurring margins?")}
                      className="text-xs bg-slate-950 hover:bg-slate-800 text-slate-200 border border-slate-800 px-3.5 py-1.5 rounded-lg flex items-center gap-1.5 transition-all shadow-sm hover:border-cyan-500/40"
                    >
                      Retention Tactics <ArrowUpRight className="h-3 w-3" />
                    </button>
                  </div>

                  {/* Message Prompt Submission Block */}
                  <form 
                    onSubmit={(e) => { e.preventDefault(); handleSendChatMessage(); }}
                    className="p-4 border-t border-slate-800 bg-slate-950/70 flex items-center gap-3 shrink-0"
                  >
                    <input 
                      type="text"
                      value={chatInput}
                      onChange={(e) => setChatInput(e.target.value)}
                      placeholder="Ask Expert AI your specific business expansion and optimization questions..."
                      className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-4 py-3 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 font-medium shadow-inner"
                    />
                    <button 
                      type="submit"
                      disabled={isChatLoading}
                      className="p-3 bg-indigo-600 hover:bg-indigo-500 rounded-lg text-white font-bold transition-all disabled:opacity-50 hover:scale-[1.02] active:scale-95 shadow-md flex items-center justify-center"
                    >
                      <Send className="h-4 w-4" />
                    </button>
                  </form>

                </div>
              )}

              {}
              {activeTab === 'history' && (
                <div className="p-6 rounded-xl border bg-slate-900 border-slate-800 space-y-6">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                      <h3 className="text-sm font-semibold">Prediction Archives</h3>
                      <p className="text-xs text-slate-400">View and audit all historical scenario parameters ran through the sandbox</p>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3">
                      <div className="relative">
                        <Search className="h-4 w-4 text-slate-500 absolute left-3 top-3" />
                        <input 
                          type="text" 
                          placeholder="Search date or revenue..."
                          value={searchQuery}
                          onChange={e => setSearchQuery(e.target.value)}
                          className="pl-9 pr-4 py-2 w-full sm:w-60 rounded-lg bg-slate-950 border border-slate-800 text-xs focus:outline-none focus:border-cyan-500"
                        />
                      </div>
                      <input 
                        type="number" 
                        placeholder="Min Profit Threshold..."
                        value={minProfitFilter}
                        onChange={e => setMinProfitFilter(e.target.value)}
                        className="px-4 py-2 w-full sm:w-48 rounded-lg bg-slate-950 border border-slate-800 text-xs focus:outline-none focus:border-cyan-500"
                      />
                    </div>
                  </div>

                  <div className="overflow-x-auto">
                    <table className="w-full text-xs text-left">
                      <thead className="bg-slate-950 text-slate-400 uppercase tracking-wider">
                        <tr>
                          <th className="p-3 font-semibold">Execution Date</th>
                          <th className="p-3 font-semibold">Turnover (Revenue)</th>
                          <th className="p-3 font-semibold">Direct Expenses</th>
                          <th className="p-3 font-semibold">Marketing Allocations</th>
                          <th className="p-3 font-semibold">Customers</th>
                          <th className="p-3 font-semibold">Employees</th>
                          <th className="p-3 font-semibold text-cyan-400">Predicted Profit</th>
                          <th className="p-3 font-semibold">Confidence Metric</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-800">
                        {filteredPredictions.map((item) => (
                          <tr key={item.id} className="hover:bg-slate-950/30 transition-colors">
                            <td className="p-3 text-slate-300 font-medium">{item.date}</td>
                            <td className="p-3">{formatINR(item.revenue)}</td>
                            <td className="p-3">{formatINR(item.expenses)}</td>
                            <td className="p-3">{formatINR(item.marketing)}</td>
                            <td className="p-3">{item.customers}</td>
                            <td className="p-3">{item.employees}</td>
                            <td className="p-3 font-bold text-cyan-400">{formatINR(item.predictedProfit)}</td>
                            <td className="p-3">
                              <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-400 border border-cyan-800">
                                {item.confidence}%
                              </span>
                            </td>
                          </tr>
                        ))}
                        {filteredPredictions.length === 0 && (
                          <tr>
                            <td colSpan="8" className="text-center py-12 text-slate-500 text-xs">
                              No archive records found matching filter search parameters.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {}
              {activeTab === 'upload' && (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="p-6 rounded-xl border bg-slate-900 border-slate-800">
                    <h3 className="text-sm font-semibold mb-1">Upload Business Ledger CSV</h3>
                    <p className="text-xs text-slate-400 mb-6 font-medium">Our system auto-parses your column labels and instantly loads them into prediction parameters.</p>
                    
                    <div className="border-2 border-dashed border-slate-700 hover:border-cyan-500 rounded-xl p-8 text-center transition-all bg-slate-950/50 relative">
                      <input 
                        type="file" 
                        accept=".csv"
                        onChange={handleCsvUpload}
                        className="absolute inset-0 opacity-0 cursor-pointer"
                      />
                      <Upload className="h-10 w-10 text-slate-500 mx-auto mb-4" />
                      <p className="text-xs font-semibold text-slate-200">Drag your spreadsheets here or click to browse</p>
                      <p className="text-[10px] text-slate-400 mt-1">Supports standard columns containing: revenue, expenses, marketing, customers</p>
                    </div>

                    {uploadedFileName && (
                      <div className="mt-4 p-3 rounded-lg bg-emerald-950/30 border border-emerald-900 flex items-center justify-between text-xs">
                        <div className="flex items-center gap-2 text-emerald-400">
                          <CheckCircle className="h-4 w-4" />
                          <span>Synced values from: <strong>{uploadedFileName}</strong></span>
                        </div>
                        <button 
                          onClick={() => { setUploadedFileName(''); setHistoricalData(INITIAL_HISTORICAL_DATA); setInputRev('600000'); }} 
                          className="text-[10px] text-slate-400 hover:text-slate-200 underline"
                        >
                          Clear Sync
                        </button>
                      </div>
                    )}

                    {uploadError && (
                      <div className="mt-4 p-3 rounded-lg bg-rose-950/30 border border-rose-950 text-xs text-rose-400 flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4" />
                        <span>{uploadError}</span>
                      </div>
                    )}
                  </div>

                  <div className="p-5 rounded-xl border bg-slate-900 border-slate-800 space-y-3">
                    <h4 className="text-xs font-bold text-slate-300">Expected Column Schema Template:</h4>
                    <p className="text-[11px] text-slate-400">For accurate ML feature alignments, format your ledger CSV header like this:</p>
                    <div className="p-3 bg-slate-950 rounded-lg text-xs font-mono text-cyan-400 overflow-x-auto">
                      revenue,expenses,marketing_spend,customers,employees
                    </div>
                  </div>
                </div>
              )}

              {}
              {activeTab === 'reports' && (
                <div className="max-w-3xl mx-auto space-y-6">
                  
                  <div id="print-layout-report" className="p-8 rounded-xl border bg-white text-slate-900 shadow-xl space-y-6">
                    
                    <div className="flex justify-between items-start pb-6 border-b border-slate-200">
                      <div>
                        <h2 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                          <TrendingUp className="h-5 w-5 text-indigo-600" /> PROFIT PREDICTOR AI
                        </h2>
                        <span className="text-[10px] font-bold text-indigo-600 tracking-widest uppercase">Analytical Forecast Report</span>
                      </div>
                      <div className="text-right">
                        <p className="text-xs font-bold">Report Date: {new Date().toLocaleDateString('en-IN')}</p>
                        <p className="text-[10px] text-slate-500">Confidence Accuracy: {metrics.averageConfidence}%</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-4">
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Scenario Monthly Rev</span>
                        <p className="text-sm font-bold text-slate-900 mt-1">{formatINR(metrics.activeSandboxRev)}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Scenario Outgoings</span>
                        <p className="text-sm font-bold text-slate-900 mt-1">{formatINR(metrics.activeSandboxExp)}</p>
                      </div>
                      <div className="p-3 bg-slate-50 rounded-lg">
                        <span className="text-[10px] text-slate-500 font-bold uppercase">Marketing Total</span>
                        <p className="text-sm font-bold text-slate-900 mt-1">{formatINR(metrics.activeSandboxMkt)}</p>
                      </div>
                      <div className="p-3 bg-indigo-50 rounded-lg">
                        <span className="text-[10px] text-indigo-600 font-bold uppercase">Next Projected Profit</span>
                        <p className="text-sm font-bold text-indigo-600 mt-1">{formatINR(metrics.nextPredicted)}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">Historical Scenario Record Logs</h4>
                      <table className="w-full text-[11px] text-left text-slate-800">
                        <thead>
                          <tr className="border-b border-slate-200">
                            <th className="p-2">Execution Date</th>
                            <th className="p-2">Turnover</th>
                            <th className="p-2">Direct Expenses</th>
                            <th className="p-2 text-indigo-600">Predicted Profit</th>
                            <th className="p-2">Accuracy %</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-100">
                          {predictionsList.map(p => (
                            <tr key={p.id}>
                              <td className="p-2 font-medium text-slate-800">{p.date}</td>
                              <td className="p-2">{formatINR(p.revenue)}</td>
                              <td className="p-2">{formatINR(p.expenses)}</td>
                              <td className="p-2 font-bold text-indigo-600">{formatINR(p.predictedProfit)}</td>
                              <td className="p-2">{p.confidence}%</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>

                    <div className="pt-6 border-t border-slate-100 text-center">
                      <p className="text-[9px] text-slate-400">Report dynamically processed via Profit Predictor AI regression nodes. Underwritten for structural evaluation purposes only.</p>
                    </div>

                  </div>

                  <div className="flex gap-4 justify-center">
                    <button 
                      onClick={() => window.print()}
                      className="px-6 py-2.5 rounded-lg bg-indigo-600 text-white text-xs font-semibold hover:bg-indigo-500 transition-all shadow-md flex items-center gap-2"
                    >
                      <Download className="h-4 w-4" /> Download PDF / Print
                    </button>
                  </div>

                </div>
              )}

              {}
              {activeTab === 'settings' && (
                <div className="max-w-2xl mx-auto space-y-6">
                  <div className="p-6 rounded-xl border bg-slate-900 border-slate-800">
                    <h3 className="text-sm font-semibold mb-6">User Sandbox Settings</h3>
                    
                    <div className="space-y-4">
                      <div className="flex items-center justify-between py-3 border-b border-slate-800">
                        <div>
                          <p className="text-xs font-semibold">Model Confidence Margins</p>
                          <p className="text-[10px] text-slate-400">Strictly filter low-accuracy regression paths from results</p>
                        </div>
                        <span className="px-2.5 py-1 text-[10px] font-bold rounded bg-slate-950 border border-slate-800">
                          &gt; 75.0% Min limit
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-3 border-b border-slate-800">
                        <div>
                          <p className="text-xs font-semibold">Active Base Currency</p>
                          <p className="text-[10px] text-slate-400">Configure formatting indices for monetary visualization</p>
                        </div>
                        <span className="px-2.5 py-1 text-[10px] font-bold rounded bg-cyan-950 text-cyan-400 border border-cyan-800">
                          Indian Rupee (INR - ₹)
                        </span>
                      </div>

                      <div className="flex items-center justify-between py-3">
                        <div>
                          <p className="text-xs font-semibold text-rose-400">Delete Historical Run Log</p>
                          <p className="text-[10px] text-slate-400">This action resets predictions storage indices</p>
                        </div>
                        <button 
                          onClick={() => { setPredictionsList([]); triggerNotification("Historical runs database successfully formatted."); }}
                          className="px-3 py-1.5 rounded text-xs font-bold text-white bg-rose-600 hover:bg-rose-500 transition-all"
                        >
                          Reset DB
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