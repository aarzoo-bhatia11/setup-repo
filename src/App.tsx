import React, { useState } from 'react';
import { 
  CheckCircle, 
  GitBranch, 
  Users, 
  Building2, 
  Settings, 
  Ticket, 
  MessageSquare, 
  UserCheck, 
  Phone, 
  Mail, 
  MessageCircle, 
  Globe, 
  Headphones,
  ChevronLeft,
  ChevronRight,
  Upload,
  Star,
  Clock,
  BarChart3,
  Zap,
  Shield,
  Eye,
  Bot,
  Plus,
  X,
  ArrowRight,
  FileText,
  Calendar,
  Target,
  Workflow,
  Code
} from 'lucide-react';

interface StepProps {
  currentStep: number;
  completedSteps: number[];
  onStepComplete: (step: number) => void;
}

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [showTrailsExplanation, setShowTrailsExplanation] = useState(false);
  const [showSetupComplete, setShowSetupComplete] = useState(false);

  const handleSetupTrails = () => {
    setShowTrailsExplanation(true);
    setTimeout(() => {
      setCompletedSteps([1]);
      setCurrentStep(2);
      setShowTrailsExplanation(false);
    }, 3000);
  };

  const handleStepComplete = (step: number) => {
    if (!completedSteps.includes(step)) {
      setCompletedSteps([...completedSteps, step]);
    }
    
    if (step < 7) {
      setCurrentStep(step + 1);
    } else {
      setShowSetupComplete(true);
    }
  };

  const isStepVisible = (step: number) => {
    return currentStep === step && !completedSteps.includes(step);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
              <span className="text-white font-bold text-sm">D</span>
            </div>
            <span className="font-semibold text-gray-900">DevRev</span>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1">
          {/* Product Section */}
          <div className="mb-6">
            <div className="flex items-center space-x-2 px-2 py-1 text-sm font-medium text-gray-700">
              <GitBranch className="w-4 h-4" />
              <span>Product</span>
            </div>
            <div className="ml-6 mt-2 space-y-1">
              <div className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Trails</div>
            </div>
          </div>

          {/* Work Section - appears after step 2 */}
          {(completedSteps.includes(2) || currentStep > 2) && (
            <div className="mb-6 pt-8">
              <div className="flex items-center space-x-2 px-2 py-1 text-sm font-medium text-gray-700">
                <Ticket className="w-4 h-4" />
                <span>Work</span>
              </div>
              <div className="ml-6 mt-2 space-y-1">
                <div className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Tickets</div>
                <div className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Conversations</div>
              </div>
            </div>
          )}

          {/* Customers Section - appears after step 2 */}
          {(completedSteps.includes(2) || currentStep > 2) && (
            <div className="mb-6 pt-8">
              <div className="flex items-center space-x-2 px-2 py-1 text-sm font-medium text-gray-700">
                <Users className="w-4 h-4" />
                <span>Customers</span>
              </div>
              <div className="ml-6 mt-2 space-y-1">
                <div className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Contacts</div>
                <div className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Accounts</div>
              </div>
            </div>
          )}

          {/* Customization Section - appears after step 3 */}
          {(completedSteps.includes(3) || currentStep > 3) && (
            <div className="mb-6 pt-8">
              <div className="flex items-center space-x-2 px-2 py-1 text-sm font-medium text-gray-700">
                <Settings className="w-4 h-4" />
                <span>Customization</span>
              </div>
              <div className="ml-6 mt-2 space-y-1">
                <div className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Object Customization</div>
                <div className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer flex items-center">
                  Stage Customization
                  <span className="ml-2 px-2 py-0.5 text-xs bg-black text-white rounded">BETA</span>
                </div>
                <div className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Tags</div>
                <div className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Templates</div>
              </div>
            </div>
          )}

          {/* Channels Section - appears after step 4 */}
          {(completedSteps.includes(4) || currentStep > 4) && (
            <div className="mb-6 pt-8">
              <div className="flex items-center space-x-2 px-2 py-1 text-sm font-medium text-gray-700">
                <MessageSquare className="w-4 h-4" />
                <span>Channels</span>
              </div>
              <div className="ml-6 mt-2 space-y-1">
                <div className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Email</div>
                <div className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Slack</div>
                <div className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">WhatsApp</div>
                <div className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Live Chat Widget</div>
                <div className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Customer Portal</div>
                <div className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Telephony</div>
              </div>
            </div>
          )}

          {/* Workflows & Routing Section - appears after step 5 */}
          {(completedSteps.includes(5) || currentStep > 5) && (
            <div className="mb-6 pt-8">
              <div className="flex items-center space-x-2 px-2 py-1 text-sm font-medium text-gray-700">
                <Workflow className="w-4 h-4" />
                <span>Workflows</span>
              </div>
              <div className="ml-6 mt-2 space-y-1">
                <div className="px-2 py-1 text-sm text-gray-600 hover:text-gray-900 cursor-pointer">Routing</div>
              </div>
            </div>
          )}

          {/* Snap-ins Section - appears after step 7 */}
          {completedSteps.includes(7) && (
            <div className="mb-6 pt-8">
              <div className="flex items-center space-x-2 px-2 py-1 text-sm font-medium text-gray-700">
                <Code className="w-4 h-4" />
                <span>Snap-ins</span>
              </div>
            </div>
          )}
        </nav>

        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center text-white text-xs">
              {completedSteps.length}
            </div>
            <span>Setup {completedSteps.length} / 7</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 overflow-auto">
        {showSetupComplete ? (
          <TicketsView />
        ) : (
          <div className="p-8">
            {showTrailsExplanation && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-lg p-8 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 bg-black rounded-full flex items-center justify-center">
                    <GitBranch className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Setting up your Trails</h2>
                  <p className="text-gray-600 mb-6">
                    Trails are your personalized pathways through DevRev. We're creating custom workflows, 
                    views, and automations based on your team's needs and industry best practices.
                  </p>
                  <div className="flex items-center justify-center space-x-2">
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                    <div className="w-2 h-2 bg-black rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                  </div>
                </div>
              </div>
            )}

            {isStepVisible(1) && <Step1 currentStep={currentStep} completedSteps={completedSteps} onStepComplete={handleStepComplete} />}
            {isStepVisible(2) && <Step2 currentStep={currentStep} completedSteps={completedSteps} onStepComplete={handleStepComplete} />}
            {isStepVisible(3) && <Step3 currentStep={currentStep} completedSteps={completedSteps} onStepComplete={handleStepComplete} />}
            {isStepVisible(4) && <Step4 currentStep={currentStep} completedSteps={completedSteps} onStepComplete={handleStepComplete} />}
            {isStepVisible(5) && <Step5 currentStep={currentStep} completedSteps={completedSteps} onStepComplete={handleStepComplete} />}
            {isStepVisible(6) && <Step6 currentStep={currentStep} completedSteps={completedSteps} onStepComplete={handleStepComplete} />}
            {isStepVisible(7) && <Step7 currentStep={currentStep} completedSteps={completedSteps} onStepComplete={handleStepComplete} />}
          </div>
        )}
      </div>
    </div>
  );
};

// Step 1: Setup Trails (unchanged)
const Step1: React.FC<StepProps> = ({ onStepComplete }) => {
  const [websiteUrl, setWebsiteUrl] = useState('');

  const handleSubmit = () => {
    if (websiteUrl.trim()) {
      onStepComplete(1);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Setup Trails</h1>
        <p className="text-lg text-gray-600">Let's start by connecting your website to create a comprehensive support experience.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Website URL
          </label>
          <input
            type="url"
            value={websiteUrl}
            onChange={(e) => setWebsiteUrl(e.target.value)}
            placeholder="https://your-website.com"
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent"
          />
        </div>

        <button
          onClick={handleSubmit}
          disabled={!websiteUrl.trim()}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Continue Setup
        </button>
      </div>
    </div>
  );
};

// Step 2: Import Data
const Step2: React.FC<StepProps> = ({ onStepComplete }) => {
  const [selectedPlatform, setSelectedPlatform] = useState<string | null>(null);
  const [showAirsyncModal, setShowAirsyncModal] = useState(false);
  const [showCustomConnector, setShowCustomConnector] = useState(false);
  const [airsyncProgress, setAirsyncProgress] = useState(0);
  const [showProgress, setShowProgress] = useState(false);

  const platforms = [
    { id: 'zendesk', name: 'Zendesk' },
    { id: 'salesforce', name: 'Salesforce' },
    { id: 'hubspot', name: 'HubSpot' },
    { id: 'custom', name: 'Create own airsync connector' }
  ];

  const handlePlatformSelect = (platformId: string) => {
    setSelectedPlatform(platformId);
    if (platformId === 'zendesk') {
      setShowAirsyncModal(true);
    } else if (platformId === 'custom') {
      setShowCustomConnector(true);
    }
  };

  const startAirsync = () => {
    setShowAirsyncModal(false);
    setShowProgress(true);
    
    // Simulate progress
    const interval = setInterval(() => {
      setAirsyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => onStepComplete(2), 1000);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  if (showCustomConnector) {
    return (
      <div className="max-w-4xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Create Custom Airsync Connector</h1>
          <p className="text-lg text-gray-600">Tell us about your current support system and we'll create a custom connector for you.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What support platform are you currently using?
              </label>
              <input
                type="text"
                placeholder="e.g., Custom CRM, Freshdesk, ServiceNow..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                What data do you want to import?
              </label>
              <textarea
                rows={4}
                placeholder="Describe the tickets, customers, conversations, or other data you'd like to sync..."
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Do you have API documentation or endpoints?
              </label>
              <input
                type="url"
                placeholder="https://api.yourplatform.com/docs"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="font-medium text-green-800">Connector Created Successfully!</span>
              </div>
              <p className="text-green-700 text-sm">
                We've created a custom airsync connector for your platform. Clone the project in your code editor to review and publish as your DevRev snap-in.
              </p>
            </div>

            <button
              onClick={() => onStepComplete(2)}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
            >
              Continue to Next Step
            </button>
          </div>
        </div>
      </div>
    );
  }

  if (showProgress) {
    return (
      <div className="max-w-2xl">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">Airsync in Progress</h1>
          <p className="text-lg text-gray-600">We're importing your data from Zendesk and transforming it for DevRev.</p>
        </div>

        <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
          <div className="mb-6">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>Progress</span>
              <span>{airsyncProgress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-black h-2 rounded-full transition-all duration-500"
                style={{ width: `${airsyncProgress}%` }}
              />
            </div>
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Connected to Zendesk</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Importing tickets and conversations</span>
            </div>
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-4 h-4 text-green-600" />
              <span>Creating new vistas</span>
            </div>
            {airsyncProgress === 100 && (
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-green-600" />
                <span>Transformation complete!</span>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Import Data from Existing Support Applications</h1>
        <p className="text-lg text-gray-600">Connect your existing support platform to import tickets, customers, and conversations.</p>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {platforms.map((platform) => (
          <div
            key={platform.id}
            onClick={() => handlePlatformSelect(platform.id)}
            className={`bg-white rounded-lg shadow-sm border-2 p-6 cursor-pointer transition-all hover:shadow-md ${
              selectedPlatform === platform.id ? 'border-black' : 'border-gray-200 hover:border-gray-300'
            }`}
          >
            <div className="text-center">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">{platform.name}</h3>
              {platform.id === 'custom' && (
                <p className="text-sm text-gray-600">Create a custom connector for your platform</p>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Airsync Modal */}
      {showAirsyncModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-900">Configure Zendesk Airsync</h2>
                <button
                  onClick={() => setShowAirsyncModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Objects to Airsync</h3>
                <div className="space-y-3">
                  {['Tickets', 'Users', 'Organizations', 'Groups', 'Custom Fields'].map((object) => (
                    <label key={object} className="flex items-center space-x-3">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300 text-black focus:ring-black" />
                      <span className="text-gray-700">{object}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-gray-900 mb-4">Data Mapping Preview</h3>
                <div className="bg-gray-50 rounded-lg p-4">
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">Zendesk</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Tickets → DevRev Tickets</li>
                        <li>• Users → DevRev Contacts</li>
                        <li>• Organizations → DevRev Accounts</li>
                      </ul>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">DevRev</h4>
                      <ul className="space-y-1 text-gray-600">
                        <li>• Subtype: Zendesk</li>
                        <li>• Custom fields preserved</li>
                        <li>• Relationships maintained</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={startAirsync}
                className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
              >
                Start Airsync
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// Step 3: Customize Objects
const Step3: React.FC<StepProps> = ({ onStepComplete }) => {
  const [selectedObject, setSelectedObject] = useState('tickets');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);

  const objectTypes = [
    { id: 'tickets', name: 'Tickets', icon: Ticket },
    { id: 'conversations', name: 'Conversations', icon: MessageSquare },
    { id: 'contacts', name: 'Contacts', icon: UserCheck },
    { id: 'accounts', name: 'Accounts', icon: Building2 }
  ];

  const recommendedFields = {
    tickets: [
      { id: 'payment_method', name: 'Payment Method', type: 'Single Select', visibility: 'Public', actionable: true, description: 'Customer payment method used' },
      { id: 'transaction_id', name: 'Transaction ID', type: 'Text', visibility: 'Internal', actionable: false, description: 'Unique transaction identifier' },
      { id: 'account_type', name: 'Account Type', type: 'Single Select', visibility: 'Public', actionable: true, description: 'Type of customer account' },
      { id: 'kyc_status', name: 'KYC Status', type: 'Single Select', visibility: 'Internal', actionable: true, description: 'Know Your Customer verification status' },
      { id: 'dispute_amount', name: 'Dispute Amount', type: 'Number', visibility: 'Internal', actionable: false, description: 'Amount in dispute if applicable' }
    ],
    conversations: [
      { id: 'channel_source', name: 'Channel Source', type: 'Single Select', visibility: 'Public', actionable: false, description: 'Origin channel of conversation' },
      { id: 'sentiment_score', name: 'Sentiment Score', type: 'Number', visibility: 'Internal', actionable: false, description: 'AI-analyzed customer sentiment' },
      { id: 'escalation_level', name: 'Escalation Level', type: 'Single Select', visibility: 'Public', actionable: true, description: 'Current escalation status' }
    ],
    contacts: [
      { id: 'customer_tier', name: 'Customer Tier', type: 'Single Select', visibility: 'Public', actionable: true, description: 'Customer value tier' },
      { id: 'verification_status', name: 'Verification Status', type: 'Single Select', visibility: 'Internal', actionable: true, description: 'Account verification status' },
      { id: 'preferred_language', name: 'Preferred Language', type: 'Single Select', visibility: 'Public', actionable: false, description: 'Customer communication preference' }
    ],
    accounts: [
      { id: 'business_type', name: 'Business Type', type: 'Single Select', visibility: 'Public', actionable: false, description: 'Type of business entity' },
      { id: 'compliance_status', name: 'Compliance Status', type: 'Single Select', visibility: 'Internal', actionable: true, description: 'Regulatory compliance status' },
      { id: 'risk_score', name: 'Risk Score', type: 'Number', visibility: 'Internal', actionable: true, description: 'Calculated risk assessment' }
    ]
  };

  const handleFieldToggle = (fieldId: string) => {
    setSelectedFields(prev => 
      prev.includes(fieldId) 
        ? prev.filter(id => id !== fieldId)
        : [...prev, fieldId]
    );
  };

  const handleContinue = () => {
    onStepComplete(3);
  };

  return (
    <div className="max-w-6xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Customize Tickets and Conversations</h1>
        <p className="text-lg text-gray-600">
          Based on your industry (Financial Services), we recommend adding these fields to enhance your support workflow.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="border-b border-gray-200">
          <nav className="flex space-x-8 px-6">
            {objectTypes.map((type) => {
              const Icon = type.icon;
              return (
                <button
                  key={type.id}
                  onClick={() => setSelectedObject(type.id)}
                  className={`flex items-center space-x-2 py-4 px-2 border-b-2 font-medium text-sm ${
                    selectedObject === type.id
                      ? 'border-black text-black'
                      : 'border-transparent text-gray-500 hover:text-gray-700'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{type.name}</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-6">
          <div className="mb-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="text-lg font-medium text-gray-900">
                Recommended Fields for {objectTypes.find(t => t.id === selectedObject)?.name}
              </h3>
              <label className="flex items-center space-x-2">
                <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black" />
                <span className="text-sm text-gray-600">Copy from airsynced {selectedObject}</span>
              </label>
            </div>
            
            <div className="space-y-4">
              {recommendedFields[selectedObject as keyof typeof recommendedFields]?.map((field) => (
                <div key={field.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedFields.includes(field.id)}
                        onChange={() => handleFieldToggle(field.id)}
                        className="mt-1 rounded border-gray-300 text-black focus:ring-black"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-gray-900">{field.name}</h4>
                        <p className="text-sm text-gray-600 mt-1">{field.description}</p>
                        <div className="flex items-center space-x-4 mt-2 text-xs text-gray-500">
                          <span className="flex items-center space-x-1">
                            <FileText className="w-3 h-3" />
                            <span>Type: {field.type}</span>
                          </span>
                          <span className="flex items-center space-x-1">
                            <Eye className="w-3 h-3" />
                            <span>Visibility: {field.visibility}</span>
                          </span>
                          {field.actionable && (
                            <span className="flex items-center space-x-1">
                              <Zap className="w-3 h-3" />
                              <span>Actionable</span>
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            onClick={handleContinue}
            className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors"
          >
            Continue to Channel Setup
          </button>
        </div>
      </div>
    </div>
  );
};

// Step 4: Select Channels (Multi-step carousel)
const Step4: React.FC<StepProps> = ({ onStepComplete }) => {
  const [carouselStep, setCarouselStep] = useState(1);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [selectedProvider, setSelectedProvider] = useState<string | null>(null);

  const channels = [
    { id: 'email', name: 'Email', icon: Mail },
    { id: 'slack', name: 'Slack', icon: MessageCircle },
    { id: 'whatsapp', name: 'WhatsApp', icon: Phone },
    { id: 'livechat', name: 'Live Chat Widget', icon: MessageSquare },
    { id: 'portal', name: 'Customer Portal', icon: Globe },
    { id: 'telephony', name: 'Telephony', icon: Headphones }
  ];

  const handleChannelToggle = (channelId: string) => {
    setSelectedChannels(prev => 
      prev.includes(channelId) 
        ? prev.filter(id => id !== channelId)
        : [...prev, channelId]
    );
  };

  const handleNextCarousel = () => {
    if (carouselStep < 4) {
      setCarouselStep(carouselStep + 1);
    } else {
      onStepComplete(4);
    }
  };

  const handlePrevCarousel = () => {
    if (carouselStep > 1) {
      setCarouselStep(carouselStep - 1);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Setup Communication Channels</h1>
            <p className="text-lg text-gray-600">Configure how customers can reach your support team.</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Step {carouselStep} of 4</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* Carousel Step 1: Channel Selection */}
        {carouselStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Select Communication Channels</h2>
            <div className="grid grid-cols-2 gap-4 mb-6">
              {channels.map((channel) => {
                const Icon = channel.icon;
                return (
                  <div
                    key={channel.id}
                    onClick={() => handleChannelToggle(channel.id)}
                    className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                      selectedChannels.includes(channel.id)
                        ? 'border-black bg-gray-50'
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <input
                        type="checkbox"
                        checked={selectedChannels.includes(channel.id)}
                        onChange={() => {}}
                        className="rounded border-gray-300 text-black focus:ring-black"
                      />
                      <Icon className="w-5 h-5 text-gray-600" />
                      <span className="font-medium text-gray-900">{channel.name}</span>
                    </div>
                  </div>
                );
              })}
            </div>
            <button
              onClick={handleNextCarousel}
              disabled={selectedChannels.length === 0}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* Carousel Step 2: Provider Selection */}
        {carouselStep === 2 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Select Email Provider</h2>
              <button onClick={handlePrevCarousel} className="text-gray-500 hover:text-gray-700">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div
                onClick={() => setSelectedProvider('gmail')}
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                  selectedProvider === 'gmail' ? 'border-black' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <Mail className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900">Gmail</h3>
                  <p className="text-sm text-gray-600 mt-2">Connect your Gmail account</p>
                </div>
              </div>
              <div
                onClick={() => setSelectedProvider('other')}
                className={`border-2 rounded-lg p-6 cursor-pointer transition-all ${
                  selectedProvider === 'other' ? 'border-black' : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="text-center">
                  <Settings className="w-12 h-12 text-gray-600 mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-gray-900">Other Connectors</h3>
                  <p className="text-sm text-gray-600 mt-2">Custom email configuration</p>
                </div>
              </div>
            </div>
            <button
              onClick={handleNextCarousel}
              disabled={!selectedProvider}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
            >
              Continue
            </button>
          </div>
        )}

        {/* Carousel Step 3: Email Setup */}
        {carouselStep === 3 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Email Account Connected</h2>
              <button onClick={handlePrevCarousel} className="text-gray-500 hover:text-gray-700">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>
            
            <div className="space-y-6">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <Mail className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Email Forwarding Required</span>
                </div>
                <p className="text-blue-700 text-sm">
                  Please set up email forwarding in your email server to: support@devrev.ai
                </p>
              </div>

              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Email Account Connected Successfully</span>
                </div>
                <p className="text-green-700 text-sm mb-3">
                  We've connected your email account and set up default templates for you:
                </p>
                <ul className="text-green-700 text-sm space-y-1 ml-4">
                  <li>• Default email signature created</li>
                  <li>• Auto-reply message configured</li>
                  <li>• Test message sent successfully</li>
                </ul>
              </div>

              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-2">Sample Email Template</h3>
                <div className="text-sm text-gray-600 space-y-2">
                  <p>Hi [Customer Name],</p>
                  <p>Thank you for contacting our support team. We've received your request and will respond within 24 hours.</p>
                  <p>Best regards,<br />Support Team<br />Paytm Customer Support</p>
                </div>
              </div>
            </div>

            <button
              onClick={handleNextCarousel}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors mt-6"
            >
              Continue to Portal Setup
            </button>
          </div>
        )}

        {/* Carousel Step 4: Portal Setup */}
        {carouselStep === 4 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Customer Portal Setup</h2>
              <button onClick={handlePrevCarousel} className="text-gray-500 hover:text-gray-700">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Portal Created Successfully</span>
                </div>
                <p className="text-green-700 text-sm">
                  Your customer portal has been set up according to your website theme with airsynced knowledge base articles.
                </p>
              </div>

              <div>
                <h3 className="font-medium text-gray-900 mb-3">Portal Preview</h3>
                <div className="border border-gray-200 rounded-lg overflow-hidden">
                  <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <span className="font-bold text-lg">Paytm</span>
                      <span className="text-blue-200 text-sm">24x7 Help</span>
                    </div>
                    <h1 className="text-2xl font-bold mb-2">Help & Support</h1>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Search questions, keywords, topics"
                        className="w-full px-4 py-2 rounded-lg text-gray-900"
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="p-6 bg-white">
                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Browse Support Articles</h2>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center p-4">
                        <Shield className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h3 className="font-medium text-gray-900">Privacy & Security</h3>
                        <p className="text-sm text-gray-600 mt-1">How to ensure safe and secure money transfer?</p>
                      </div>
                      <div className="text-center p-4">
                        <BarChart3 className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h3 className="font-medium text-gray-900">Recharges & Bill Payments</h3>
                        <p className="text-sm text-gray-600 mt-1">Mobile recharge initiated but order still under process</p>
                      </div>
                      <div className="text-center p-4">
                        <Globe className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                        <h3 className="font-medium text-gray-900">Travel</h3>
                        <p className="text-sm text-gray-600 mt-1">Want to cancel your flight ticket? Follow these steps</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-gray-600 mb-2">Drag and drop to customize portal design</p>
                <p className="text-sm text-gray-500">Upload screenshots of your previous portal for color theme and logos</p>
              </div>

              <p className="text-sm text-gray-600">
                You can further customize your portal through the portal settings after setup completion.
              </p>
            </div>

            <button
              onClick={handleNextCarousel}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors mt-6"
            >
              Complete Channel Setup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Step 5: Assignment Rules
const Step5: React.FC<StepProps> = ({ onStepComplete }) => {
  const [selectedRule, setSelectedRule] = useState<string | null>(null);

  const rules = [
    { id: 'round-robin', name: 'Round Robin', description: 'Distribute tickets evenly among team members' },
    { id: 'load-balancing', name: 'Load Balancing', description: 'Assign based on current workload' },
    { id: 'random', name: 'Random Distribution', description: 'Randomly assign tickets to available agents' },
    { id: 'capacity', name: 'Capacity-based Allocation', description: 'Assign based on agent capacity and skills' }
  ];

  const handleContinue = () => {
    onStepComplete(5);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Add Assignment Rules for Tickets and Conversations</h1>
        <p className="text-lg text-gray-600">Choose how tickets and conversations should be automatically assigned to your team members.</p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="space-y-4 mb-6">
          {rules.map((rule) => (
            <div
              key={rule.id}
              onClick={() => setSelectedRule(rule.id)}
              className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                selectedRule === rule.id ? 'border-black bg-gray-50' : 'border-gray-200 hover:border-gray-300'
              }`}
            >
              <div className="flex items-start space-x-3">
                <input
                  type="radio"
                  checked={selectedRule === rule.id}
                  onChange={() => {}}
                  className="mt-1 text-black focus:ring-black"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{rule.name}</h3>
                  <p className="text-sm text-gray-600 mt-1">{rule.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {selectedRule && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-2">
              <Bot className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">AI Configuration Complete</span>
            </div>
            <p className="text-green-700 text-sm">
              AI has automatically configured the snap-in and workflow for {rules.find(r => r.id === selectedRule)?.name.toLowerCase()} assignment.
            </p>
          </div>
        )}

        <button
          onClick={handleContinue}
          disabled={!selectedRule}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
        >
          Continue to Support Metrics
        </button>
      </div>
    </div>
  );
};

// Step 6: Support Metrics
const Step6: React.FC<StepProps> = ({ onStepComplete }) => {
  const [carouselStep, setCarouselStep] = useState(1);

  const handleNextCarousel = () => {
    if (carouselStep < 3) {
      setCarouselStep(carouselStep + 1);
    } else {
      onStepComplete(6);
    }
  };

  const handlePrevCarousel = () => {
    if (carouselStep > 1) {
      setCarouselStep(carouselStep - 1);
    }
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Setup Support Metrics</h1>
            <p className="text-lg text-gray-600">Configure SLA, CSAT surveys, and ticket insights for your support team.</p>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-gray-500">Step {carouselStep} of 3</span>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        {/* SLA Setup */}
        {carouselStep === 1 && (
          <div>
            <h2 className="text-xl font-semibold text-gray-900 mb-6">SLA Configuration</h2>
            
            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">Default SLA Created</span>
                </div>
                <p className="text-green-700 text-sm">
                  We've created default SLA metrics and schedules based on industry best practices.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">SLA Metrics</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">First Response:</span>
                      <span className="font-medium">2 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Resolution Time:</span>
                      <span className="font-medium">24 hours</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">High Priority:</span>
                      <span className="font-medium">1 hour</span>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Organization Schedule</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Business Hours:</span>
                      <span className="font-medium">9 AM - 6 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Time Zone:</span>
                      <span className="font-medium">IST</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Working Days:</span>
                      <span className="font-medium">Mon - Fri</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-medium text-gray-900 mb-3">SLA Policies</h3>
                <div className="space-y-3">
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-black focus:ring-black" />
                    <span className="text-sm text-gray-700">Auto-escalate overdue tickets</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" defaultChecked className="rounded border-gray-300 text-black focus:ring-black" />
                    <span className="text-sm text-gray-700">Send SLA breach notifications</span>
                  </label>
                  <label className="flex items-center space-x-3">
                    <input type="checkbox" className="rounded border-gray-300 text-black focus:ring-black" />
                    <span className="text-sm text-gray-700">Pause SLA during customer response</span>
                  </label>
                </div>
              </div>
            </div>

            <button
              onClick={handleNextCarousel}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors mt-6"
            >
              Continue to CSAT Setup
            </button>
          </div>
        )}

        {/* CSAT Setup */}
        {carouselStep === 2 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">CSAT Survey Configuration</h2>
              <button onClick={handlePrevCarousel} className="text-gray-500 hover:text-gray-700">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  <span className="font-medium text-green-800">CSAT Survey Deployed</span>
                </div>
                <p className="text-green-700 text-sm">
                  Customer satisfaction survey has been deployed with standard settings.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-6">
                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Survey Settings</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Trigger</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black">
                        <option>After ticket resolution</option>
                        <option>24 hours after resolution</option>
                        <option>Manual trigger</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm text-gray-600 mb-1">Rating Scale</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-black">
                        <option>5-star rating</option>
                        <option>1-10 scale</option>
                        <option>Thumbs up/down</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="border border-gray-200 rounded-lg p-4">
                  <h3 className="font-medium text-gray-900 mb-3">Survey Preview</h3>
                  <div className="bg-gray-50 rounded-lg p-4">
                    <h4 className="font-medium text-gray-900 mb-2">How was your support experience?</h4>
                    <div className="flex space-x-2 mb-3">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <Star key={star} className="w-5 h-5 text-yellow-400 fill-current" />
                      ))}
                    </div>
                    <textarea
                      placeholder="Tell us more about your experience..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
                      rows={2}
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={handleNextCarousel}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors mt-6"
            >
              Continue to Ticket Insights
            </button>
          </div>
        )}

        {/* Ticket Insights */}
        {carouselStep === 3 && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-900">Ticket Insights Configuration</h2>
              <button onClick={handlePrevCarousel} className="text-gray-500 hover:text-gray-700">
                <ChevronLeft className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Previous Support Desk Report URL
                </label>
                <input
                  type="url"
                  placeholder="https://your-previous-support-desk.com/reports"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Credentials (Optional)
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <input
                    type="text"
                    placeholder="Username"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                  <input
                    type="password"
                    placeholder="Password"
                    className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
                  />
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center space-x-2 mb-2">
                  <BarChart3 className="w-5 h-5 text-blue-600" />
                  <span className="font-medium text-blue-800">Auto-Generated Reports</span>
                </div>
                <p className="text-blue-700 text-sm mb-3">
                  DevRev will automatically analyze your previous support data and create corresponding custom reports:
                </p>
                <ul className="text-blue-700 text-sm space-y-1 ml-4">
                  <li>• Ticket volume trends</li>
                  <li>• Response time analytics</li>
                  <li>• Customer satisfaction metrics</li>
                  <li>• Agent performance insights</li>
                </ul>
              </div>
            </div>

            <button
              onClick={handleNextCarousel}
              className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors mt-6"
            >
              Complete Metrics Setup
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

// Step 7: Custom Workflows
const Step7: React.FC<StepProps> = ({ onStepComplete }) => {
  const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);

  const workflows = [
    { 
      id: 'severity-detector', 
      name: 'Auto-ticket severity detector',
      description: 'Automatically categorize ticket severity based on content and customer tier'
    },
    { 
      id: 'spam-detector', 
      name: 'Spam detector',
      description: 'Identify and filter spam tickets using AI-powered detection'
    },
    { 
      id: 'redact-sensitive', 
      name: 'Auto-redact sensitive information in tickets and logs',
      description: 'Automatically detect and redact PII, payment info, and sensitive data'
    }
  ];

  const handleWorkflowToggle = (workflowId: string) => {
    setSelectedWorkflows(prev => 
      prev.includes(workflowId) 
        ? prev.filter(id => id !== workflowId)
        : [...prev, workflowId]
    );
  };

  const handleComplete = () => {
    onStepComplete(7);
  };

  return (
    <div className="max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Custom Workflows</h1>
        <p className="text-lg text-gray-600">
          Have a custom use-case? Let AI create workflows or make changes for you.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Recommended Workflows</h2>
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div
                key={workflow.id}
                onClick={() => handleWorkflowToggle(workflow.id)}
                className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                  selectedWorkflows.includes(workflow.id)
                    ? 'border-black bg-gray-50'
                    : 'border-gray-200 hover:border-gray-300'
                }`}
              >
                <div className="flex items-start space-x-3">
                  <input
                    type="checkbox"
                    checked={selectedWorkflows.includes(workflow.id)}
                    onChange={() => {}}
                    className="mt-1 rounded border-gray-300 text-black focus:ring-black"
                  />
                  <div>
                    <h3 className="font-medium text-gray-900">{workflow.name}</h3>
                    <p className="text-sm text-gray-600 mt-1">{workflow.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="font-medium text-gray-900 mb-3">Custom Workflow Request</h3>
          <textarea
            placeholder="Describe your custom workflow requirements..."
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-black"
            rows={3}
          />
        </div>

        {selectedWorkflows.length > 0 && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
            <div className="flex items-center space-x-2 mb-2">
              <Bot className="w-5 h-5 text-green-600" />
              <span className="font-medium text-green-800">AI Workflows Created</span>
            </div>
            <p className="text-green-700 text-sm">
              {selectedWorkflows.length} workflow{selectedWorkflows.length > 1 ? 's' : ''} have been automatically created and configured.
            </p>
          </div>
        )}

        <button
          onClick={handleComplete}
          className="w-full bg-black text-white py-2 px-4 rounded-md hover:bg-gray-800 transition-colors mt-6"
        >
          Complete Setup
        </button>
      </div>
    </div>
  );
};

// Tickets View (Final Screen)
const TicketsView: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-semibold text-gray-900">DevRev</span>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors">
              Set up
            </button>
            <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
              Contact us
            </button>
          </div>
        </div>
      </div>

      {/* Welcome Banner */}
      <div className="bg-blue-50 border-b border-blue-200 px-6 py-3">
        <div className="flex items-center space-x-2">
          <span className="text-2xl">👋</span>
          <div>
            <span className="font-medium text-gray-900">Welcome to DevRev!</span>
            <span className="text-gray-600 ml-2">Let's begin with the tasks that will help you start using DevRev effectively.</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="px-6 py-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-semibold text-gray-900">Tickets</h1>
            <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">5</span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Zap className="w-5 h-5" />
            </button>
            <button className="bg-black text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition-colors flex items-center space-x-2">
              <Plus className="w-4 h-4" />
              <span>Ticket</span>
            </button>
          </div>
        </div>

        {/* New View Banner */}
        <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Zap className="w-5 h-5 text-orange-500" />
            <span className="font-medium text-gray-900">New view headers are here! We have made it more compact and consistent across all our views</span>
          </div>
          <button className="text-black font-medium text-sm hover:underline">
            Try it now
          </button>
        </div>

        {/* Tickets List */}
        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Zap className="w-4 h-4 text-orange-500" />
              <span>List of all tickets for customer support</span>
              <button className="ml-auto text-gray-400 hover:text-gray-600">
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Work type</span>
                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded">Ticket</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Created date</span>
                <span className="text-gray-700">Last 90 days</span>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-gray-500">Stage</span>
                <span className="bg-gray-100 text-gray-700 px-2 py-1 rounded flex items-center space-x-1">
                  <Clock className="w-3 h-3" />
                  <span>Queued +5</span>
                </span>
              </div>
              <button className="text-gray-500 hover:text-gray-700">
                <Plus className="w-4 h-4" />
              </button>
              <button className="text-gray-500 hover:text-gray-700 ml-auto">
                Clear
              </button>
            </div>
          </div>

          {/* Table Header */}
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wide">
              <div className="col-span-1">Items</div>
              <div className="col-span-4">Customer Work</div>
              <div className="col-span-2">Stage</div>
              <div className="col-span-2">Part</div>
              <div className="col-span-2">Owner</div>
              <div className="col-span-1"></div>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-gray-200">
            {[
              { id: 'TKT-5', title: 'Issue with Adding New Users to Account', customer: 'dummy...', stage: 'Queued', part: 'Default Product 1', owner: 'Unas...' },
              { id: 'TKT-4', title: 'Reply to your first Ticket in DevRev', customer: '-', stage: 'Awaiting...', part: 'Default Feature 1', owner: 'DevR...' },
              { id: 'TKT-3', title: 'When Tickets link to Issues', customer: '-', stage: 'In De...', part: 'Default Feature 1', owner: 'DevR...' },
              { id: 'TKT-2', title: 'Complete DevRev setup ?', customer: '-', stage: 'Awaiting...', part: 'Default Feature 1', owner: 'DevR...' },
              { id: 'TKT-1', title: 'Respond on-the-go from DevRev Mobile', customer: '-', stage: 'Awaiting...', part: 'Default Feature 1', owner: 'DevR...' }
            ].map((ticket, index) => (
              <div key={ticket.id} className="px-4 py-3 hover:bg-gray-50">
                <div className="grid grid-cols-12 gap-4 items-center text-sm">
                  <div className="col-span-1">
                    <div className="flex items-center space-x-2">
                      {index < 2 && <div className="w-2 h-2 bg-blue-500 rounded-full"></div>}
                      <span className="text-gray-500">{ticket.id}</span>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <span className="text-gray-900 font-medium">{ticket.title}</span>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-3 h-3 text-gray-400" />
                      <span className="text-gray-600">{ticket.stage}</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-blue-600 hover:underline cursor-pointer">{ticket.part}</span>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-orange-500 rounded text-white text-xs flex items-center justify-center">
                        {ticket.owner.substring(0, 2)}
                      </div>
                      <span className="text-gray-600">{ticket.owner}</span>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <button className="text-gray-400 hover:text-gray-600">
                      <Settings className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;