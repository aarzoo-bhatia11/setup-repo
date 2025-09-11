import React, { useState } from 'react';
import { 
  User, 
  Play, 
  GitBranch, 
  Ticket, 
  BookOpen, 
  BarChart3, 
  Settings, 
  CheckCircle, 
  ArrowRight,
  Target,
  Users,
  Zap,
  TrendingUp,
  X
} from 'lucide-react';

interface ToastMessage {
  id: number;
  message: string;
  type: 'success' | 'info';
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState<string>('primary-goal');
  const [activeView, setActiveView] = useState<string>('primary-goal');
  const [primaryGoalComplete, setPrimaryGoalComplete] = useState(false);
  const [step1Complete, setStep1Complete] = useState(false);
  const [step2Complete, setStep2Complete] = useState(false);
  const [step3Complete, setStep3Complete] = useState(false);
  const [airsyncComplete, setAirsyncComplete] = useState(false);
  const [primaryGoal, setPrimaryGoal] = useState('');
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const newToast = {
      id: Date.now(),
      message,
      type
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const handlePrimaryGoalSubmit = () => {
    if (primaryGoal.trim()) {
      setPrimaryGoalComplete(true);
      setCurrentPage('get-started');
      setActiveView('setup');
      addToast('Primary goal saved! Setting up your optimal support path...', 'info');
    }
  };

  const handleStep1Complete = () => {
    setStep1Complete(true);
    addToast('Step 1 completed successfully!', 'success');
  };

  const handleStep2Complete = () => {
    setStep2Complete(true);
    addToast('Trails configuration completed!', 'success');
  };

  const handleStep3Complete = () => {
    setStep3Complete(true);
    addToast('Tickets setup completed!', 'success');
  };

  const handleAirsyncComplete = () => {
    setAirsyncComplete(true);
    addToast('AirSync from Zendesk completed! We have brought the records from the last 1 week and set up the same in the left nav bar. AirSync will continue in the background and can be accessed from the AirSyncs settings section.', 'info');
  };

  const renderPrimaryGoalSelection = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Target className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          What's your primary goal for DevRev Support?
        </h1>
        <p className="text-sm text-gray-600">
          This will help us determine the optimal and fastest support setup path for you.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-3">
          Describe your main objective:
        </label>
        <textarea
          value={primaryGoal}
          onChange={(e) => setPrimaryGoal(e.target.value)}
          placeholder="e.g., Scale support without hiring more agents, Self-Service Expansion"
          className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
          rows={3}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div 
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            primaryGoal.includes('Scale support') ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setPrimaryGoal('Scale support without hiring more agents')}
        >
          <Users className="w-6 h-6 text-blue-600 mb-2" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">Scale Support</h3>
          <p className="text-xs text-gray-600">Handle more tickets without growing team size</p>
        </div>

        <div 
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            primaryGoal.includes('Self-Service') ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setPrimaryGoal('Self-Service Expansion')}
        >
          <Zap className="w-6 h-6 text-blue-600 mb-2" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">Self-Service</h3>
          <p className="text-xs text-gray-600">Enable customers to find answers independently</p>
        </div>

        <div 
          className={`p-4 border rounded-lg cursor-pointer transition-colors ${
            primaryGoal.includes('Improve efficiency') ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
          }`}
          onClick={() => setPrimaryGoal('Improve efficiency and response times')}
        >
          <TrendingUp className="w-6 h-6 text-blue-600 mb-2" />
          <h3 className="text-sm font-medium text-gray-900 mb-1">Efficiency</h3>
          <p className="text-xs text-gray-600">Faster response times and better workflows</p>
        </div>
      </div>

      <button
        onClick={handlePrimaryGoalSubmit}
        disabled={!primaryGoal.trim()}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        Continue to Setup
      </button>
    </div>
  );

  const renderSetupStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Play className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Welcome to DevRev AI-Native Support
        </h1>
        <p className="text-sm text-gray-600">
          Let's get your support system configured based on your goal: "{primaryGoal}"
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Initial Configuration</h2>
        <p className="text-sm text-gray-600 mb-4">
          We'll set up your DevRev environment with AI-powered features tailored to your needs.
        </p>
        
        {step1Complete && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm text-green-800">Initial setup completed successfully!</span>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleStep1Complete}
        disabled={step1Complete}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {step1Complete ? 'Setup Complete' : 'Start Setup'}
      </button>
    </div>
  );

  const renderTrailsView = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <GitBranch className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Trails Configuration</h1>
        <p className="text-sm text-gray-600">
          Set up conversation trails to track customer interactions and support workflows.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Trail Settings</h2>
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">Auto-create trails for new conversations</span>
            <div className="w-10 h-6 bg-blue-600 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
            </div>
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <span className="text-sm text-gray-700">Enable trail analytics</span>
            <div className="w-10 h-6 bg-blue-600 rounded-full relative">
              <div className="w-4 h-4 bg-white rounded-full absolute top-1 right-1"></div>
            </div>
          </div>
        </div>

        {step2Complete && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm text-green-800">Trails configured successfully!</span>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleStep2Complete}
        disabled={step2Complete}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {step2Complete ? 'Configuration Complete' : 'Configure Trails'}
      </button>
    </div>
  );

  const renderTicketsView = () => (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Ticket className="w-6 h-6 text-blue-600" />
          <h1 className="text-xl font-semibold text-gray-900">Tickets</h1>
          <span className="text-sm text-gray-500">2798</span>
        </div>
        <button className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700">
          + Ticket
        </button>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Work type</span>
              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Ticket</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Created date</span>
              <span className="text-xs text-gray-700">Last 90 days</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-xs text-gray-500">Stage</span>
              <span className="px-2 py-1 bg-gray-100 text-gray-800 text-xs rounded">New +23</span>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Items</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Customer Work</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Stage</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Part</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase">Owner</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="text-sm text-blue-600 font-medium">TKT-30471</div>
                  <div className="text-xs text-gray-600">Limitations on Returning Custom Responses in Skills</div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">-</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-yellow-100 text-yellow-800 text-xs rounded">Queued</span>
                </td>
                <td className="px-4 py-3 text-xs text-blue-600">Agent and Workflow</td>
                <td className="px-4 py-3 text-xs text-gray-600">Pran...</td>
              </tr>
              <tr className="hover:bg-gray-50">
                <td className="px-4 py-3">
                  <div className="text-sm text-blue-600 font-medium">TKT-30470</div>
                  <div className="text-xs text-gray-600">UMP Ticket Issues</div>
                </td>
                <td className="px-4 py-3 text-sm text-gray-600">paytm-...</td>
                <td className="px-4 py-3">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">Awaiting...</span>
                </td>
                <td className="px-4 py-3 text-xs text-blue-600">Support App</td>
                <td className="px-4 py-3 text-xs text-gray-600">R Su...</td>
              </tr>
            </tbody>
          </table>
        </div>

        {step3Complete && (
          <div className="p-4 bg-green-50 border-t border-green-200">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm text-green-800">Tickets system configured successfully!</span>
            </div>
          </div>
        )}
      </div>

      {!step3Complete && (
        <button
          onClick={handleStep3Complete}
          className="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
        >
          Complete Tickets Setup
        </button>
      )}
    </div>
  );

  const renderAirsyncView = () => (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <Settings className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">AirSync from Zendesk</h1>
        <p className="text-sm text-gray-600">
          Sync your existing Zendesk data with DevRev to maintain continuity.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6 mb-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Zendesk Integration</h2>
        <div className="space-y-4">
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Tickets</span>
              <span className="text-xs text-green-600">Ready to sync</span>
            </div>
            <p className="text-xs text-gray-600">1,247 tickets from the last week</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Users</span>
              <span className="text-xs text-green-600">Ready to sync</span>
            </div>
            <p className="text-xs text-gray-600">892 customer profiles</p>
          </div>
          <div className="p-3 bg-gray-50 rounded-md">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium text-gray-700">Articles</span>
              <span className="text-xs text-green-600">Ready to sync</span>
            </div>
            <p className="text-xs text-gray-600">156 knowledge base articles</p>
          </div>
        </div>

        {airsyncComplete && (
          <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-md">
            <div className="flex items-center">
              <CheckCircle className="w-5 h-5 text-green-600 mr-2" />
              <span className="text-sm text-green-800">AirSync completed! Data successfully imported.</span>
            </div>
          </div>
        )}
      </div>

      <button
        onClick={handleAirsyncComplete}
        disabled={airsyncComplete}
        className="w-full bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
      >
        {airsyncComplete ? 'Sync Complete' : 'Start AirSync'}
      </button>
    </div>
  );

  const renderKnowledgeBaseView = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <BookOpen className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Knowledge Base</h1>
        <p className="text-sm text-gray-600">
          Manage your support articles and documentation.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-medium text-gray-900">Articles</h2>
          <button className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-sm font-medium hover:bg-blue-700">
            + New Article
          </button>
        </div>

        <div className="space-y-4">
          <div className="p-4 border border-gray-200 rounded-md hover:bg-gray-50">
            <h3 className="text-sm font-medium text-gray-900 mb-1">Getting Started with DevRev</h3>
            <p className="text-xs text-gray-600 mb-2">A comprehensive guide to setting up your DevRev account...</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>Updated 2 days ago</span>
              <span>156 views</span>
              <span className="text-green-600">Published</span>
            </div>
          </div>

          <div className="p-4 border border-gray-200 rounded-md hover:bg-gray-50">
            <h3 className="text-sm font-medium text-gray-900 mb-1">Troubleshooting Common Issues</h3>
            <p className="text-xs text-gray-600 mb-2">Solutions to frequently encountered problems...</p>
            <div className="flex items-center space-x-4 text-xs text-gray-500">
              <span>Updated 1 week ago</span>
              <span>89 views</span>
              <span className="text-green-600">Published</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderArticleAnalyticsView = () => (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <BarChart3 className="w-12 h-12 text-blue-600 mx-auto mb-4" />
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">Article Analytics</h1>
        <p className="text-sm text-gray-600">
          Track performance and engagement of your knowledge base articles.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Total Views</p>
              <p className="text-2xl font-semibold text-gray-900">12,456</p>
            </div>
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <BarChart3 className="w-4 h-4 text-blue-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">+12% from last month</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Articles</p>
              <p className="text-2xl font-semibold text-gray-900">156</p>
            </div>
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <BookOpen className="w-4 h-4 text-green-600" />
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">+8 new this month</p>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-600">Avg. Rating</p>
              <p className="text-2xl font-semibold text-gray-900">4.7</p>
            </div>
            <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
              <span className="text-yellow-600 text-sm">★</span>
            </div>
          </div>
          <p className="text-xs text-green-600 mt-2">+0.2 from last month</p>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-4">Top Performing Articles</h2>
        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div>
              <h3 className="text-sm font-medium text-gray-900">Getting Started with DevRev</h3>
              <p className="text-xs text-gray-600">2,456 views • 4.8 rating</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
            <div>
              <h3 className="text-sm font-medium text-gray-900">API Integration Guide</h3>
              <p className="text-xs text-gray-600">1,892 views • 4.6 rating</p>
            </div>
            <ArrowRight className="w-4 h-4 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );

  const renderCurrentView = () => {
    switch (currentPage) {
      case 'primary-goal':
        return renderPrimaryGoalSelection();
      case 'get-started':
        return renderSetupStep();
      case 'trails':
        return renderTrailsView();
      case 'tickets':
        return renderTicketsView();
      case 'airsync':
        return renderAirsyncView();
      case 'knowledge-base':
        return renderKnowledgeBaseView();
      case 'article-analytics':
        return renderArticleAnalyticsView();
      default:
        return renderPrimaryGoalSelection();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Toast Messages */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-gray-800 text-white px-4 py-3 rounded-md shadow-lg max-w-md flex items-start justify-between"
          >
            <span className="text-sm">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-3 text-gray-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Left Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-lg font-semibold text-gray-900">DevRev Support</h2>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            {/* General Section */}
            <button
              onClick={() => {
                setCurrentPage('general');
                setActiveView('general');
              }}
              className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                activeView === 'general' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <User className="w-4 h-4 mr-3" />
              <span>General</span>
            </button>

            <button
              onClick={() => {
                setCurrentPage('account');
                setActiveView('account');
              }}
              className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                activeView === 'account' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <User className="w-4 h-4 mr-3" />
              <span>Account</span>
            </button>

            {/* Primary Goal */}
            <button
              onClick={() => {
                setCurrentPage('primary-goal');
                setActiveView('primary-goal');
              }}
              className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                activeView === 'primary-goal' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
              }`}
            >
              <Target className="w-4 h-4 mr-3" />
              <span>Primary Goal</span>
            </button>

            {/* Get Started */}
            {primaryGoalComplete && (
              <button
                onClick={() => {
                  setCurrentPage('get-started');
                  setActiveView('setup');
                }}
                className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                  activeView === 'setup' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
                }`}
              >
                <Play className="w-4 h-4 mr-3" />
                <span>{step1Complete ? 'Continue Setup' : 'Get Started'}</span>
              </button>
            )}
          </div>

          {/* Product Section */}
          {step1Complete && (
            <div className="mt-6">
              <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                PRODUCT
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setCurrentPage('trails');
                    setActiveView('trails');
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                    activeView === 'trails' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <GitBranch className="w-4 h-4 mr-3" />
                  <span>Trails</span>
                </button>

                {step2Complete && (
                  <button
                    onClick={() => {
                      setCurrentPage('tickets');
                      setActiveView('tickets');
                    }}
                    className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                      activeView === 'tickets' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Ticket className="w-4 h-4 mr-3" />
                    <span>Tickets</span>
                  </button>
                )}

                {step3Complete && (
                  <button
                    onClick={() => {
                      setCurrentPage('airsync');
                      setActiveView('airsync');
                    }}
                    className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                      activeView === 'airsync' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
                    }`}
                  >
                    <Settings className="w-4 h-4 mr-3" />
                    <span>AirSync</span>
                  </button>
                )}
              </div>
            </div>
          )}

          {/* Knowledge Management Section */}
          {airsyncComplete && (
            <div className="mt-6">
              <h3 className="px-3 text-xs font-medium text-gray-500 uppercase tracking-wider mb-3">
                KNOWLEDGE MANAGEMENT
              </h3>
              <div className="space-y-1">
                <button
                  onClick={() => {
                    setCurrentPage('knowledge-base');
                    setActiveView('knowledge-base');
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                    activeView === 'knowledge-base' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <BookOpen className="w-4 h-4 mr-3" />
                  <span>Knowledge Base</span>
                </button>

                <button
                  onClick={() => {
                    setCurrentPage('article-analytics');
                    setActiveView('article-analytics');
                  }}
                  className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                    activeView === 'article-analytics' ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600' : 'text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  <BarChart3 className="w-4 h-4 mr-3" />
                  <span>Article Analytics</span>
                </button>
              </div>
            </div>
          )}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {renderCurrentView()}
      </div>
    </div>
  );
};

export default App;