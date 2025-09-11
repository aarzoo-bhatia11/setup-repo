import React, { useState } from 'react';
import { 
  CheckCircle, 
  Circle, 
  ArrowRight, 
  Settings, 
  Users, 
  MessageSquare, 
  Database, 
  BookOpen, 
  Target,
  X,
  ExternalLink,
  Zap,
  Shield,
  Globe
} from 'lucide-react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info';
}

const App: React.FC = () => {
  const [currentPage, setCurrentPage] = useState('get-started');
  const [completedSteps, setCompletedSteps] = useState<string[]>([]);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [showZendeskModal, setShowZendeskModal] = useState(false);

  const addToast = (message: string, type: 'success' | 'info' = 'success') => {
    const newToast: Toast = {
      id: Date.now(),
      message,
      type
    };
    setToasts(prev => [...prev, newToast]);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  const completeStep = (stepId: string, message: string) => {
    if (!completedSteps.includes(stepId)) {
      setCompletedSteps(prev => [...prev, stepId]);
      addToast(message);
    }
  };

  const isStepCompleted = (stepId: string) => completedSteps.includes(stepId);
  const isStepAccessible = (stepId: string, dependencies: string[] = []) => {
    return dependencies.every(dep => completedSteps.includes(dep));
  };

  const navigationItems = [
    { id: 'get-started', label: 'Get Started', icon: Target, accessible: true },
    { id: 'step-1', label: 'Step 1', icon: Circle, dependencies: ['get-started'] },
    { id: 'trails', label: 'Trails', icon: Circle, dependencies: ['step-1'] },
    { id: 'tickets', label: 'Tickets', icon: MessageSquare, dependencies: ['trails'] },
    { id: 'airsync', label: 'AirSync', icon: Database, dependencies: ['tickets'] },
    { id: 'knowledge', label: 'Knowledge', icon: BookOpen, dependencies: ['airsync'] }
  ];

  const renderGetStarted = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">
          Provide us your primary goal for using DevRev support
        </h1>
        <p className="text-xs text-gray-600">
          This would help us determine the optimal and fastest support setup path for you.
        </p>
      </div>

      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="mb-4">
          <label className="block text-xs font-medium text-gray-700 mb-2">
            Primary Goal
          </label>
          <textarea
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            rows={4}
            placeholder="e.g., Scale support without hiring more agents, Self-Service Expansion"
          />
        </div>
        
        <button
          onClick={() => completeStep('get-started', 'Primary goal defined successfully!')}
          className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors"
        >
          Continue Setup
        </button>
      </div>
    </div>
  );

  const renderStep1 = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Step 2: Setting up Trails</h1>
        <p className="text-xs text-gray-600">Configure your support trails to organize and route tickets effectively.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Trail Configuration</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Trail Name</label>
              <input
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Customer Support"
              />
            </div>
            
            <div>
              <label className="block text-xs font-medium text-gray-700 mb-2">Priority Level</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500">
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-xs font-medium text-gray-700 mb-2">Description</label>
            <textarea
              className="w-full px-3 py-2 border border-gray-300 rounded-md text-xs focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
              placeholder="Describe the purpose and scope of this trail"
            />
          </div>

          <div className="mt-6 flex space-x-3">
            <button
              onClick={() => completeStep('step-1', 'Trail configuration completed!')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors"
            >
              Save Trail
            </button>
            <button className="border border-gray-300 text-gray-700 px-4 py-2 rounded-md text-xs font-medium hover:bg-gray-50 transition-colors">
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTrails = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Step 3: Trails Management</h1>
        <p className="text-xs text-gray-600">Manage and configure your support trails.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-gray-900">Active Trails</h2>
            <button className="bg-blue-600 text-white px-3 py-1.5 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors">
              Add Trail
            </button>
          </div>
          
          <div className="space-y-3">
            {['Customer Support', 'Technical Issues', 'Billing Inquiries'].map((trail, index) => (
              <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-xs font-medium text-gray-900">{trail}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-xs text-gray-500">Active</span>
                  <button className="text-blue-600 hover:text-blue-800 text-xs">Edit</button>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <button
              onClick={() => completeStep('trails', 'Trails configured successfully!')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors"
            >
              Complete Trails Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderTickets = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Step 4: Tickets Configuration</h1>
        <p className="text-xs text-gray-600">Set up ticket management and routing rules.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Ticket Settings</h2>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <h3 className="text-xs font-medium text-gray-900">Auto-assignment</h3>
                <p className="text-xs text-gray-500">Automatically assign tickets to available agents</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <h3 className="text-xs font-medium text-gray-900">Priority Escalation</h3>
                <p className="text-xs text-gray-500">Automatically escalate high-priority tickets</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>

            <div className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
              <div>
                <h3 className="text-xs font-medium text-gray-900">SLA Monitoring</h3>
                <p className="text-xs text-gray-500">Track and monitor service level agreements</p>
              </div>
              <label className="relative inline-flex items-center cursor-pointer">
                <input type="checkbox" className="sr-only peer" defaultChecked />
                <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-blue-600"></div>
              </label>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => completeStep('tickets', 'Ticket configuration completed!')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors"
            >
              Save Ticket Settings
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderAirSync = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Step 5: AirSync Integration</h1>
        <p className="text-xs text-gray-600">Connect and sync with external platforms.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Available Integrations</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <button
              onClick={() => setShowZendeskModal(true)}
              className="p-4 border border-gray-200 rounded-lg hover:border-blue-300 hover:bg-blue-50 transition-colors text-left"
            >
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-green-600" />
                </div>
                <span className="text-xs font-medium text-gray-900">Zendesk</span>
              </div>
              <p className="text-xs text-gray-500">Sync tickets and customer data</p>
            </button>

            <div className="p-4 border border-gray-200 rounded-lg opacity-50">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Shield className="w-4 h-4 text-blue-600" />
                </div>
                <span className="text-xs font-medium text-gray-900">Salesforce</span>
              </div>
              <p className="text-xs text-gray-500">Coming soon</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg opacity-50">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Globe className="w-4 h-4 text-purple-600" />
                </div>
                <span className="text-xs font-medium text-gray-900">Slack</span>
              </div>
              <p className="text-xs text-gray-500">Coming soon</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => completeStep('airsync', 'AirSync integration configured!')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors"
            >
              Complete Integration Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderKnowledge = () => (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8">
        <h1 className="text-xl font-semibold text-gray-900 mb-2">Step 6: Knowledge Management</h1>
        <p className="text-xs text-gray-600">Set up your knowledge base and documentation.</p>
      </div>

      <div className="space-y-6">
        <div className="bg-white rounded-lg border border-gray-200 p-6">
          <h2 className="text-lg font-medium text-gray-900 mb-4">Knowledge Base Setup</h2>
          
          <div className="space-y-4">
            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-medium text-gray-900">FAQ Articles</h3>
                <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">Ready</span>
              </div>
              <p className="text-xs text-gray-500">Common questions and answers for customers</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-medium text-gray-900">Troubleshooting Guides</h3>
                <span className="text-xs text-yellow-600 bg-yellow-100 px-2 py-1 rounded-full">In Progress</span>
              </div>
              <p className="text-xs text-gray-500">Step-by-step problem resolution guides</p>
            </div>

            <div className="p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-xs font-medium text-gray-900">Product Documentation</h3>
                <span className="text-xs text-gray-600 bg-gray-100 px-2 py-1 rounded-full">Pending</span>
              </div>
              <p className="text-xs text-gray-500">Comprehensive product documentation</p>
            </div>
          </div>

          <div className="mt-6">
            <button
              onClick={() => completeStep('knowledge', 'Knowledge management setup completed!')}
              className="bg-blue-600 text-white px-4 py-2 rounded-md text-xs font-medium hover:bg-blue-700 transition-colors"
            >
              Complete Knowledge Setup
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const renderZendeskModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-medium text-gray-900">Zendesk Integration</h3>
          <button
            onClick={() => setShowZendeskModal(false)}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="mb-4">
          <div className="flex items-center space-x-2 text-green-600 mb-2">
            <CheckCircle className="w-4 h-4" />
            <span className="text-sm">Successfully logged into Zendesk</span>
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700">Accounts</span>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700">Contacts</span>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <span className="text-sm text-gray-700">Tickets</span>
            <CheckCircle className="w-4 h-4 text-green-600" />
          </div>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowZendeskModal(false)}
            className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'get-started':
        return renderGetStarted();
      case 'step-1':
        return renderStep1();
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
          <h1 className="text-lg font-semibold text-gray-900">DevRev</h1>
        </div>
        
        <nav className="flex-1 p-4">
          <div className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isCompleted = isStepCompleted(item.id);
              const isAccessible = isStepAccessible(item.id, item.dependencies);
              const isActive = currentPage === item.id;
              
              return (
                <button
                  key={item.id}
                  onClick={() => isAccessible && setCurrentPage(item.id)}
                  disabled={!isAccessible}
                  className={`w-full text-left px-3 py-2 text-xs rounded-md transition-colors ${
                    isActive
                      ? 'bg-blue-50 text-blue-600 font-medium'
                      : isAccessible
                      ? 'text-gray-700 hover:bg-gray-50'
                      : 'text-gray-400 cursor-not-allowed'
                  }`}
                >
                  <div className="flex items-center space-x-3">
                    {isCompleted ? (
                      <CheckCircle className="w-4 h-4 text-green-600" />
                    ) : (
                      <Icon className="w-4 h-4" />
                    )}
                    <span>{item.label}</span>
                  </div>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3">
            <Settings className="w-4 h-4 text-gray-400" />
            <span className="text-xs text-gray-600">Setup Progress: {completedSteps.length}/6</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <main className="flex-1 p-8">
          {renderCurrentPage()}
        </main>
      </div>

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 space-y-2 z-40">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="bg-gray-100 text-gray-800 px-4 py-3 rounded-lg shadow-lg flex items-center justify-between min-w-80"
          >
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-gray-600" />
              <span className="text-xs">{toast.message}</span>
            </div>
            <button
              onClick={() => removeToast(toast.id)}
              className="text-gray-400 hover:text-gray-600 ml-4"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>

      {/* Zendesk Modal */}
      {showZendeskModal && renderZendeskModal()}
    </div>
  );
};

export default App;