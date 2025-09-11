import React, { useState } from 'react';
import { 
  Settings, 
  User, 
  Play, 
  Ticket, 
  Zap, 
  BookOpen, 
  CheckCircle, 
  X,
  ArrowRight,
  Target,
  Users,
  TrendingUp
} from 'lucide-react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info';
}

export default function App() {
  const [currentPage, setCurrentPage] = useState('get-started');
  const [step1Complete, setStep1Complete] = useState(false);
  const [trailsComplete, setTrailsComplete] = useState(false);
  const [ticketsComplete, setTicketsComplete] = useState(false);
  const [airsyncComplete, setAirsyncComplete] = useState(false);
  const [knowledgeComplete, setKnowledgeComplete] = useState(false);
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const completeStep1 = () => {
    setStep1Complete(true);
    addToast('Step 1 completed! Trails section is now available.');
  };

  const completeTrails = () => {
    setTrailsComplete(true);
    addToast('Trails setup completed! Tickets section is now available.');
  };

  const completeTickets = () => {
    setTicketsComplete(true);
    addToast('Tickets setup completed! AirSync section is now available.');
  };

  const completeAirSync = () => {
    setAirsyncComplete(true);
    addToast('AirSync setup completed! Knowledge Management is now available.');
  };

  const completeKnowledge = () => {
    setKnowledgeComplete(true);
    addToast('Knowledge Management setup completed! Setup is now complete.');
  };

  const renderGetStarted = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Welcome to DevRev Support Setup
        </h1>
        <p className="text-sm text-gray-600">
          Let's get your support system configured. We'll guide you through each step to ensure optimal setup.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start space-x-4">
          <div className="flex-shrink-0">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-sm font-medium text-blue-600">1</span>
            </div>
          </div>
          <div className="flex-1">
            <h3 className="text-base font-medium text-gray-900 mb-2">
              Setting up Trails
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Configure your support trails to organize and route customer inquiries effectively. 
              This foundational step ensures proper categorization and workflow management.
            </p>
            <div className="space-y-3">
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Define trail categories and priorities
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Set up routing rules and assignments
              </div>
              <div className="flex items-center text-sm text-gray-600">
                <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
                Configure escalation workflows
              </div>
            </div>
            <button
              onClick={completeStep1}
              disabled={step1Complete}
              className={`mt-4 px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                step1Complete
                  ? 'bg-green-100 text-green-700 cursor-not-allowed'
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {step1Complete ? 'Completed' : 'Complete Step 1'}
            </button>
          </div>
        </div>
      </div>

      {step1Complete && (
        <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <div className="flex items-center">
            <CheckCircle className="w-5 h-5 text-blue-600 mr-2" />
            <span className="text-sm font-medium text-blue-800">
              Great! Step 1 is complete. You can now access the Trails section to continue setup.
            </span>
          </div>
        </div>
      )}
    </div>
  );

  const renderTrails = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Trails Configuration</h1>
        <p className="text-sm text-gray-600">
          Set up your support trails to organize customer inquiries and automate routing.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Trail Categories</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-sm font-medium">Technical Support</span>
              <span className="text-xs text-gray-500">High Priority</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-sm font-medium">Billing Inquiries</span>
              <span className="text-xs text-gray-500">Medium Priority</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-sm font-medium">General Questions</span>
              <span className="text-xs text-gray-500">Low Priority</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Routing Rules</h3>
          <div className="space-y-3">
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-sm font-medium mb-1">Auto-assign by keyword</div>
              <div className="text-xs text-gray-500">Route based on message content</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-sm font-medium mb-1">Round-robin assignment</div>
              <div className="text-xs text-gray-500">Distribute evenly among agents</div>
            </div>
            <div className="p-3 bg-gray-50 rounded-md">
              <div className="text-sm font-medium mb-1">Skill-based routing</div>
              <div className="text-xs text-gray-500">Match agent expertise</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={completeTrails}
          disabled={trailsComplete}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            trailsComplete
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {trailsComplete ? 'Configuration Saved' : 'Save Configuration'}
        </button>
      </div>
    </div>
  );

  const renderTickets = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Ticket Management</h1>
        <p className="text-sm text-gray-600">
          Configure ticket workflows, statuses, and automation rules.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Ticket Statuses</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">New</span>
              <span className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">In Progress</span>
              <span className="px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Resolved</span>
              <span className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded">Active</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Closed</span>
              <span className="px-2 py-1 text-xs bg-gray-100 text-gray-700 rounded">Active</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Priority Levels</h3>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm">Critical</span>
              <span className="text-xs text-red-600">2h SLA</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">High</span>
              <span className="text-xs text-orange-600">8h SLA</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Medium</span>
              <span className="text-xs text-yellow-600">24h SLA</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Low</span>
              <span className="text-xs text-green-600">72h SLA</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Automation</h3>
          <div className="space-y-3">
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm">Auto-assign new tickets</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" defaultChecked />
              <span className="text-sm">Send acknowledgment emails</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Escalate overdue tickets</span>
            </div>
            <div className="flex items-center">
              <input type="checkbox" className="mr-2" />
              <span className="text-sm">Auto-close resolved tickets</span>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={completeTickets}
          disabled={ticketsComplete}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            ticketsComplete
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {ticketsComplete ? 'Settings Saved' : 'Save Settings'}
        </button>
      </div>
    </div>
  );

  const renderAirSync = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">AirSync Integration</h1>
        <p className="text-sm text-gray-600">
          Connect and synchronize your external tools and data sources.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Available Integrations</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-blue-100 rounded mr-3 flex items-center justify-center">
                  <span className="text-xs font-bold text-blue-600">SL</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Slack</div>
                  <div className="text-xs text-gray-500">Team communication</div>
                </div>
              </div>
              <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                Connect
              </button>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-green-100 rounded mr-3 flex items-center justify-center">
                  <span className="text-xs font-bold text-green-600">ZD</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Zendesk</div>
                  <div className="text-xs text-gray-500">Ticket management</div>
                </div>
              </div>
              <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                Connect
              </button>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-md">
              <div className="flex items-center">
                <div className="w-8 h-8 bg-purple-100 rounded mr-3 flex items-center justify-center">
                  <span className="text-xs font-bold text-purple-600">JR</span>
                </div>
                <div>
                  <div className="text-sm font-medium">Jira</div>
                  <div className="text-xs text-gray-500">Issue tracking</div>
                </div>
              </div>
              <button className="px-3 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700">
                Connect
              </button>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Sync Settings</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Sync Frequency
              </label>
              <select className="w-full p-2 border border-gray-300 rounded-md text-sm">
                <option>Real-time</option>
                <option>Every 5 minutes</option>
                <option>Every 15 minutes</option>
                <option>Hourly</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Data Types
              </label>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm">Tickets</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" defaultChecked />
                  <span className="text-sm">Users</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Comments</span>
                </div>
                <div className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  <span className="text-sm">Attachments</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={completeAirSync}
          disabled={airsyncComplete}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            airsyncComplete
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {airsyncComplete ? 'Integration Configured' : 'Configure Integration'}
        </button>
      </div>
    </div>
  );

  const renderKnowledge = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Knowledge Management</h1>
        <p className="text-sm text-gray-600">
          Set up your knowledge base and self-service resources.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Article Categories</h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-sm font-medium">Getting Started</span>
              <span className="text-xs text-gray-500">12 articles</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-sm font-medium">Troubleshooting</span>
              <span className="text-xs text-gray-500">8 articles</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-sm font-medium">API Documentation</span>
              <span className="text-xs text-gray-500">15 articles</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
              <span className="text-sm font-medium">Billing & Pricing</span>
              <span className="text-xs text-gray-500">6 articles</span>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h3 className="text-base font-medium text-gray-900 mb-4">Search & Discovery</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm">Enable full-text search</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Auto-suggest articles</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Track article views</span>
              <input type="checkbox" defaultChecked />
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm">Enable article ratings</span>
              <input type="checkbox" />
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-200">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Popular Articles</h4>
            <div className="space-y-2">
              <div className="text-xs text-gray-600">1. How to reset your password</div>
              <div className="text-xs text-gray-600">2. API rate limits explained</div>
              <div className="text-xs text-gray-600">3. Setting up webhooks</div>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button
          onClick={completeKnowledge}
          disabled={knowledgeComplete}
          className={`px-4 py-2 text-sm font-medium rounded-md transition-colors ${
            knowledgeComplete
              ? 'bg-green-100 text-green-700 cursor-not-allowed'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {knowledgeComplete ? 'Knowledge Base Configured' : 'Configure Knowledge Base'}
        </button>
      </div>
    </div>
  );

  const renderContent = () => {
    switch (currentPage) {
      case 'get-started':
        return renderGetStarted();
      case 'trails':
        return renderTrails();
      case 'tickets':
        return renderTickets();
      case 'airsync':
        return renderAirSync();
      case 'knowledge':
        return renderKnowledge();
      default:
        return renderGetStarted();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <h2 className="text-base font-semibold text-gray-900">DevRev</h2>
          <p className="text-xs text-gray-500 mt-1">AI-Native Support Setup</p>
        </div>

        <nav className="flex-1 p-4">
          <div className="space-y-1">
            <button
              onClick={() => setCurrentPage('get-started')}
              className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                currentPage === 'get-started'
                  ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
              } rounded-l-md`}
            >
              <User className="w-4 h-4 mr-3" />
              <span>Get Started</span>
            </button>

            {step1Complete && (
              <button
                onClick={() => setCurrentPage('trails')}
                className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                  currentPage === 'trails'
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } rounded-l-md`}
              >
                <Play className="w-4 h-4 mr-3" />
                <span>Trails</span>
                {trailsComplete && <CheckCircle className="w-4 h-4 ml-auto text-green-500" />}
              </button>
            )}

            {trailsComplete && (
              <button
                onClick={() => setCurrentPage('tickets')}
                className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                  currentPage === 'tickets'
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } rounded-l-md`}
              >
                <Ticket className="w-4 h-4 mr-3" />
                <span>Tickets</span>
                {ticketsComplete && <CheckCircle className="w-4 h-4 ml-auto text-green-500" />}
              </button>
            )}

            {ticketsComplete && (
              <button
                onClick={() => setCurrentPage('airsync')}
                className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                  currentPage === 'airsync'
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } rounded-l-md`}
              >
                <Zap className="w-4 h-4 mr-3" />
                <span>AirSync</span>
                {airsyncComplete && <CheckCircle className="w-4 h-4 ml-auto text-green-500" />}
              </button>
            )}

            {airsyncComplete && (
              <button
                onClick={() => setCurrentPage('knowledge')}
                className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                  currentPage === 'knowledge'
                    ? 'bg-blue-50 text-blue-700 border-r-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                } rounded-l-md`}
              >
                <BookOpen className="w-4 h-4 mr-3" />
                <span>Knowledge</span>
                {knowledgeComplete && <CheckCircle className="w-4 h-4 ml-auto text-green-500" />}
              </button>
            )}
          </div>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          {renderContent()}
        </main>
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-gray-800 text-white px-4 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-80"
          >
            <span className="text-sm">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-gray-300 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}