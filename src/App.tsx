import React, { useState } from 'react';
import { 
  User, 
  Play, 
  CheckCircle, 
  ArrowRight, 
  Globe, 
  Users, 
  Ticket, 
  BarChart3,
  FileText,
  HelpCircle,
  Settings
} from 'lucide-react';

const App = () => {
  const [activeTab, setActiveTab] = useState('get-started');
  const [currentStep, setCurrentStep] = useState(1);
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [companyName, setCompanyName] = useState('');
  const [selectedIntegrations, setSelectedIntegrations] = useState<string[]>([]);

  const menuItems = [
    { id: 'general', label: 'General', icon: Settings },
    { id: 'account', label: 'Account', icon: User },
    { id: 'get-started', label: 'Get Started', icon: Play },
    { id: 'trails', label: 'Trails', icon: Users },
    { id: 'tickets', label: 'Tickets', icon: Ticket },
    { id: 'analytics', label: 'Analytics', icon: BarChart3 },
    { id: 'knowledge', label: 'Knowledge Base', icon: FileText },
    { id: 'help', label: 'Help & Support', icon: HelpCircle },
  ];

  const integrations = [
    { id: 'slack', name: 'Slack', description: 'Team communication' },
    { id: 'github', name: 'GitHub', description: 'Code repository' },
    { id: 'jira', name: 'Jira', description: 'Project management' },
    { id: 'zendesk', name: 'Zendesk', description: 'Customer support' },
    { id: 'salesforce', name: 'Salesforce', description: 'CRM platform' },
    { id: 'hubspot', name: 'HubSpot', description: 'Marketing & sales' },
  ];

  const handleIntegrationToggle = (integrationId: string) => {
    setSelectedIntegrations(prev => 
      prev.includes(integrationId) 
        ? prev.filter(id => id !== integrationId)
        : [...prev, integrationId]
    );
  };

  const renderGetStartedContent = () => {
    return (
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome to DevRev AI-Native Support
          </h1>
          <p className="text-lg text-gray-600 mb-8">
            Let's set up your AI-powered customer support system in just a few steps
          </p>
          
          {/* What are trails video section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-8">
            <div className="flex items-center justify-center mb-4">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-md">
                <Play className="w-8 h-8 text-blue-600 ml-1" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">What are trails?</h3>
            <p className="text-gray-600">
              Watch this 2-minute video to understand how DevRev trails work and how they'll transform your support workflow.
            </p>
          </div>
        </div>

        {/* Progress indicator */}
        <div className="flex items-center justify-center mb-8">
          {[1, 2, 3].map((step) => (
            <div key={step} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step <= currentStep 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-200 text-gray-600'
              }`}>
                {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
              </div>
              {step < 3 && (
                <div className={`w-16 h-1 mx-2 ${
                  step < currentStep ? 'bg-blue-600' : 'bg-gray-200'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step content */}
        <div className="bg-white rounded-lg shadow-lg p-8">
          {currentStep === 1 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 1: Basic Information</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your company name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="https://paytm.com"
                  />
                </div>
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 2: Connect Your Tools</h2>
              <p className="text-gray-600 mb-6">
                Select the tools you'd like to integrate with DevRev to streamline your workflow.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {integrations.map((integration) => (
                  <div
                    key={integration.id}
                    className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                      selectedIntegrations.includes(integration.id)
                        ? 'border-blue-500 bg-blue-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                    onClick={() => handleIntegrationToggle(integration.id)}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-gray-900">{integration.name}</h3>
                        <p className="text-sm text-gray-600">{integration.description}</p>
                      </div>
                      {selectedIntegrations.includes(integration.id) && (
                        <CheckCircle className="w-6 h-6 text-blue-600" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {currentStep === 3 && (
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Step 3: Configure AI Settings</h2>
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-blue-900 mb-2">
                    AI-Powered Smart Routing
                  </h3>
                  <p className="text-blue-800 mb-4">
                    Automatically route tickets to the right team members based on content analysis and historical patterns.
                  </p>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-blue-900">Enable Smart Routing</span>
                  </label>
                </div>
                
                <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-green-900 mb-2">
                    Automated Response Suggestions
                  </h3>
                  <p className="text-green-800 mb-4">
                    Get AI-generated response suggestions based on your knowledge base and previous interactions.
                  </p>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-green-900">Enable Response Suggestions</span>
                  </label>
                </div>
                
                <div className="bg-purple-50 border border-purple-200 rounded-lg p-6">
                  <h3 className="text-lg font-semibold text-purple-900 mb-2">
                    Sentiment Analysis
                  </h3>
                  <p className="text-purple-800 mb-4">
                    Automatically detect customer sentiment to prioritize urgent or escalated issues.
                  </p>
                  <label className="flex items-center">
                    <input type="checkbox" className="mr-2" defaultChecked />
                    <span className="text-purple-900">Enable Sentiment Analysis</span>
                  </label>
                </div>
              </div>
            </div>
          )}

          {/* Navigation buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={() => setCurrentStep(Math.max(1, currentStep - 1))}
              disabled={currentStep === 1}
              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <button
              onClick={() => {
                if (currentStep < 3) {
                  setCurrentStep(currentStep + 1);
                } else {
                  alert('Setup complete! Welcome to DevRev.');
                }
              }}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
            >
              {currentStep === 3 ? 'Complete Setup' : 'Next'}
              <ArrowRight className="w-4 h-4 ml-2" />
            </button>
          </div>
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">General Settings</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600">General settings and preferences coming soon...</p>
            </div>
          </div>
        );
      case 'account':
        return (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Account Settings</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600">Account management features coming soon...</p>
            </div>
          </div>
        );
      case 'get-started':
        return renderGetStartedContent();
      case 'trails':
        return (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Trails</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600">Trails management features coming soon...</p>
            </div>
          </div>
        );
      case 'tickets':
        return (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Tickets</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600">Ticket management features coming soon...</p>
            </div>
          </div>
        );
      case 'analytics':
        return (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Analytics</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600">Analytics dashboard coming soon...</p>
            </div>
          </div>
        );
      case 'knowledge':
        return (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Knowledge Base</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600">Knowledge base management coming soon...</p>
            </div>
          </div>
        );
      case 'help':
        return (
          <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-900 mb-8">Help & Support</h1>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <p className="text-gray-600">Help and support resources coming soon...</p>
            </div>
          </div>
        );
      default:
        return renderGetStartedContent();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg">
        <div className="p-6">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">DevRev</h1>
          </div>
        </div>
        
        <nav className="mt-6">
          {menuItems.map((item) => {
            const Icon = item.icon;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center px-6 py-3 text-left hover:bg-gray-50 transition-colors ${
                  activeTab === item.id 
                    ? 'bg-blue-50 text-blue-600 border-r-2 border-blue-600' 
                    : 'text-gray-600'
                }`}
              >
                <Icon className="w-5 h-5 mr-3" />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="flex-1 p-8">
        {renderContent()}
      </div>
    </div>
  );
};

export default App;