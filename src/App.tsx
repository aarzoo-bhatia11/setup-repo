import React, { useState, useEffect } from 'react';
import { 
  CheckCircle, 
  ArrowRight, 
  GitBranch, 
  Users, 
  Settings, 
  Zap,
  Mail,
  MessageSquare,
  Phone,
  Globe,
  MessageCircle,
  Headphones,
  ChevronLeft,
  ChevronRight,
  X,
  Upload,
  Download,
  Filter,
  Search,
  Plus,
  MoreHorizontal,
  Calendar,
  Clock,
  User,
  Building,
  Tag,
  FileText,
  BarChart3,
  Target,
  TrendingUp,
  Shield,
  Bot,
  Workflow,
  Ticket
} from 'lucide-react';

interface Step {
  id: number;
  title: string;
  description: string;
  completed: boolean;
}

interface SidebarSection {
  title: string;
  items: string[];
  visible: boolean;
}

const App: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [showTrailsModal, setShowTrailsModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAirsyncModal, setShowAirsyncModal] = useState(false);
  const [showCustomConnectorModal, setShowCustomConnectorModal] = useState(false);
  const [airsyncProgress, setAirsyncProgress] = useState(0);
  const [showGoogleSignIn, setShowGoogleSignIn] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<string[]>([]);
  const [channelCarouselStep, setChannelCarouselStep] = useState(1);
  const [showTicketsView, setShowTicketsView] = useState(false);
  const [selectedObjectType, setSelectedObjectType] = useState('tickets');
  const [selectedFields, setSelectedFields] = useState<string[]>([]);
  const [assignmentRuleType, setAssignmentRuleType] = useState('');
  const [slaCarouselStep, setSlaCarouselStep] = useState(1);
  const [selectedWorkflows, setSelectedWorkflows] = useState<string[]>([]);

  const [steps, setSteps] = useState<Step[]>([
    { id: 1, title: 'Setup Trails', description: 'Configure your development workflow', completed: false },
    { id: 2, title: 'Import Data', description: 'Import from existing support applications', completed: false },
    { id: 3, title: 'Customize Objects', description: 'Customize tickets and conversations', completed: false },
    { id: 4, title: 'Select Channels', description: 'Choose your communication channels', completed: false },
    { id: 5, title: 'Assignment Rules', description: 'Setup ticket and conversation routing', completed: false },
    { id: 6, title: 'Support Metrics', description: 'Configure SLA, CSAT, and insights', completed: false },
    { id: 7, title: 'Custom Workflows', description: 'Add custom automation workflows', completed: false }
  ]);

  const [sidebarSections, setSidebarSections] = useState<SidebarSection[]>([
    { title: 'Product', items: ['Features', 'Capabilities', 'Enhancements'], visible: true },
    { title: 'Work', items: ['Tickets', 'Conversations'], visible: false },
    { title: 'Customers', items: ['Contacts', 'Accounts'], visible: false },
    { title: 'Customization', items: ['Object Customization', 'Stage Customization', 'Tags', 'Templates'], visible: false },
    { title: 'Channels', items: ['Email', 'Slack', 'WhatsApp', 'Live Chat', 'Customer Portal', 'Telephony'], visible: false },
    { title: 'Workflows', items: ['Routing'], visible: false },
    { title: 'Snap-ins', items: [], visible: false }
  ]);

  const handleSetupTrails = () => {
    setShowTrailsModal(true);
    setIsLoading(true);
    
    setTimeout(() => {
      setIsLoading(false);
      setTimeout(() => {
        setShowTrailsModal(false);
        completeStep(1);
        setCurrentStep(2);
      }, 2000);
    }, 3000);
  };

  const completeStep = (stepId: number) => {
    setSteps(prev => prev.map(step => 
      step.id === stepId ? { ...step, completed: true } : step
    ));
  };

  const updateSidebarSection = (title: string, visible: boolean) => {
    setSidebarSections(prev => prev.map(section =>
      section.title === title ? { ...section, visible } : section
    ));
  };

  const handleAirsyncStart = () => {
    setShowAirsyncModal(false);
    setAirsyncProgress(0);
    
    const interval = setInterval(() => {
      setAirsyncProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          updateSidebarSection('Work', true);
          updateSidebarSection('Customers', true);
          return 100;
        }
        return prev + 10;
      });
    }, 500);
  };

  const handleStep2Complete = () => {
    completeStep(2);
    setCurrentStep(3);
  };

  const handleStep3Complete = () => {
    completeStep(3);
    updateSidebarSection('Customization', true);
    setCurrentStep(4);
  };

  const handleChannelSelection = (channel: string) => {
    setSelectedChannels(prev => 
      prev.includes(channel) 
        ? prev.filter(c => c !== channel)
        : [...prev, channel]
    );
  };

  const handleStep4Complete = () => {
    completeStep(4);
    updateSidebarSection('Channels', true);
    setCurrentStep(5);
  };

  const handleStep5Complete = () => {
    completeStep(5);
    updateSidebarSection('Workflows', true);
    setCurrentStep(6);
  };

  const handleStep6Complete = () => {
    completeStep(6);
    setCurrentStep(7);
  };

  const handleStep7Complete = () => {
    completeStep(7);
    updateSidebarSection('Snap-ins', true);
    setShowTicketsView(true);
  };

  const fieldProperties = {
    tickets: [
      { name: 'Priority', type: 'Dropdown', visibility: 'Public', actionable: true, description: 'Ticket priority level' },
      { name: 'Category', type: 'Text', visibility: 'Internal', actionable: false, description: 'Issue category' },
      { name: 'Payment Method', type: 'Dropdown', visibility: 'Public', actionable: true, description: 'Customer payment method' },
      { name: 'Transaction ID', type: 'Text', visibility: 'Internal', actionable: false, description: 'Unique transaction identifier' },
      { name: 'Account Balance', type: 'Number', visibility: 'Internal', actionable: true, description: 'Customer account balance' },
      { name: 'KYC Status', type: 'Dropdown', visibility: 'Internal', actionable: true, description: 'Know Your Customer verification status' }
    ],
    conversations: [
      { name: 'Channel', type: 'Dropdown', visibility: 'Public', actionable: false, description: 'Communication channel used' },
      { name: 'Sentiment', type: 'Dropdown', visibility: 'Internal', actionable: true, description: 'Customer sentiment analysis' },
      { name: 'Language', type: 'Text', visibility: 'Public', actionable: false, description: 'Conversation language' },
      { name: 'Resolution Time', type: 'Duration', visibility: 'Internal', actionable: true, description: 'Time to resolve conversation' }
    ],
    contacts: [
      { name: 'Phone Number', type: 'Text', visibility: 'Public', actionable: true, description: 'Primary contact number' },
      { name: 'Email Verified', type: 'Boolean', visibility: 'Internal', actionable: false, description: 'Email verification status' },
      { name: 'Preferred Language', type: 'Dropdown', visibility: 'Public', actionable: true, description: 'Customer preferred language' },
      { name: 'Tier', type: 'Dropdown', visibility: 'Internal', actionable: true, description: 'Customer tier level' }
    ],
    accounts: [
      { name: 'Account Type', type: 'Dropdown', visibility: 'Public', actionable: true, description: 'Type of customer account' },
      { name: 'Registration Date', type: 'Date', visibility: 'Internal', actionable: false, description: 'Account creation date' },
      { name: 'Monthly Volume', type: 'Number', visibility: 'Internal', actionable: true, description: 'Monthly transaction volume' },
      { name: 'Risk Score', type: 'Number', visibility: 'Internal', actionable: true, description: 'Account risk assessment score' }
    ]
  };

  if (showTicketsView) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#000"/>
                  <path d="M2 17L12 22L22 17" stroke="#000" strokeWidth="2" fill="none"/>
                  <path d="M2 12L12 17L22 12" stroke="#000" strokeWidth="2" fill="none"/>
                </svg>
                <span className="text-xl font-bold text-gray-900">DevRev</span>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="bg-black text-white px-4 py-2 rounded-lg text-sm font-medium">
                Set up
              </button>
              <button className="text-gray-600 hover:text-gray-900 text-sm font-medium">
                Contact us
              </button>
            </div>
          </div>
        </div>

        {/* Welcome Banner */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mx-6 mt-4 rounded-r-lg">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-2xl">👋</span>
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">
                <strong>Welcome to DevRev!</strong> Let's begin with the tasks that will help you start using DevRev effectively.
              </p>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="px-6 py-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-gray-900">Tickets</h1>
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded text-sm">5</span>
            </div>
            <div className="flex items-center space-x-3">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <Zap className="w-5 h-5" />
              </button>
              <button className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Ticket</span>
              </button>
            </div>
          </div>

          {/* New View Banner */}
          <div className="bg-white border border-gray-200 rounded-lg p-4 mb-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <span className="text-blue-600 text-sm">✨</span>
                </div>
                <div>
                  <p className="text-gray-900 font-medium">New view headers are here! We have made it more compact and consistent across all our views</p>
                </div>
              </div>
              <button className="text-blue-600 hover:text-blue-700 text-sm font-medium">
                Try it now
              </button>
            </div>
          </div>

          {/* Tickets List */}
          <div className="bg-white border border-gray-200 rounded-lg">
            {/* List Header */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-orange-600">✨</span>
                  <span className="text-gray-900 font-medium">List of all tickets for customer support</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Filters */}
            <div className="border-b border-gray-200 p-4">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <Search className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <User className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                  <Clock className="w-4 h-4" />
                </button>
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded">
                  <span className="text-sm text-gray-600">Work type</span>
                  <span className="bg-orange-100 text-orange-800 px-2 py-0.5 rounded text-xs">Ticket</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded">
                  <span className="text-sm text-gray-600">Created date</span>
                  <span className="text-sm text-gray-900">Last 90 days</span>
                </div>
                <div className="flex items-center space-x-2 bg-gray-100 px-3 py-1 rounded">
                  <span className="text-sm text-gray-600">Stage</span>
                  <span className="text-sm text-gray-900">Queued +5</span>
                </div>
                <button className="text-gray-400 hover:text-gray-600">
                  <Plus className="w-4 h-4" />
                </button>
                <button className="text-blue-600 hover:text-blue-700 text-sm">Clear</button>
              </div>
            </div>

            {/* Table Header */}
            <div className="border-b border-gray-200 bg-gray-50">
              <div className="grid grid-cols-12 gap-4 p-4 text-sm font-medium text-gray-600">
                <div className="col-span-1">Items</div>
                <div className="col-span-3">Customer Work...</div>
                <div className="col-span-2">Stage</div>
                <div className="col-span-2">Part</div>
                <div className="col-span-2">Owner</div>
                <div className="col-span-2 text-right">
                  <div className="flex items-center justify-end space-x-2">
                    <span>Sort</span>
                    <span>Group</span>
                    <span>Customize</span>
                    <span>View type List view</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Ticket Rows */}
            <div className="divide-y divide-gray-200">
              {[
                { id: 'TKT-5', title: 'Issue with Adding New Users to Account', customer: 'dummy...', stage: 'Queued', part: 'Default Product 1', owner: 'Unas...' },
                { id: 'TKT-4', title: 'Reply to your first Ticket in DevRev', customer: '-', stage: 'Awaiti...', part: 'Default Feature 1', owner: 'DevR...' },
                { id: 'TKT-3', title: 'When Tickets link to Issues', customer: '-', stage: 'In De...', part: 'Default Feature 1', owner: 'DevR...' },
                { id: 'TKT-2', title: 'Complete DevRev setup ?', customer: '-', stage: 'Awaiti...', part: 'Default Feature 1', owner: 'DevR...' },
                { id: 'TKT-1', title: 'Respond on-the-go from DevRev Mobile', customer: '-', stage: 'Awaiti...', part: 'Default Feature 1', owner: 'DevR...' }
              ].map((ticket, index) => (
                <div key={ticket.id} className="grid grid-cols-12 gap-4 p-4 hover:bg-gray-50">
                  <div className="col-span-1 flex items-center">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-blue-500' : 'bg-transparent'}`}></div>
                      <span className="text-sm text-gray-600">{ticket.id}</span>
                    </div>
                  </div>
                  <div className="col-span-3">
                    <p className="text-sm text-gray-900">{ticket.title}</p>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-orange-100 rounded-full flex items-center justify-center">
                        <span className="text-orange-600 text-xs">{ticket.customer === '-' ? '' : 'D'}</span>
                      </div>
                      <span className="text-sm text-gray-600">{ticket.customer}</span>
                    </div>
                  </div>
                  <div className="col-span-2 flex items-center">
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 bg-gray-300 rounded-full"></div>
                      <span className="text-sm text-gray-600">{ticket.stage}</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-blue-600">{ticket.part}</span>
                  </div>
                  <div className="col-span-2 flex items-center justify-end">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-orange-600 rounded text-white text-xs flex items-center justify-center">
                        {ticket.owner.substring(0, 2)}
                      </div>
                      <span className="text-sm text-gray-600">{ticket.owner}</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Sidebar */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        {/* Logo */}
        <div className="p-6 border-b border-gray-200">
          <div className="flex items-center space-x-2">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="#000"/>
              <path d="M2 17L12 22L22 17" stroke="#000" strokeWidth="2" fill="none"/>
              <path d="M2 12L12 17L22 12" stroke="#000" strokeWidth="2" fill="none"/>
            </svg>
            <span className="text-xl font-bold text-gray-900">DevRev</span>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 p-4 space-y-6">
          {sidebarSections.map((section, index) => (
            section.visible && (
              <div key={section.title} className={index > 0 ? 'pt-8' : ''}>
                <h3 className="text-sm font-medium text-gray-500 uppercase tracking-wider mb-3">
                  {section.title}
                </h3>
                <ul className="space-y-2">
                  {section.items.map((item) => (
                    <li key={item}>
                      <a href="#" className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm">
                        {section.title === 'Product' && <GitBranch className="w-4 h-4" />}
                        {section.title === 'Work' && <FileText className="w-4 h-4" />}
                        {section.title === 'Customers' && <Users className="w-4 h-4" />}
                        {section.title === 'Customization' && <Settings className="w-4 h-4" />}
                        {section.title === 'Channels' && <MessageSquare className="w-4 h-4" />}
                        {section.title === 'Workflows' && <Workflow className="w-4 h-4" />}
                        {section.title === 'Snap-ins' && <Zap className="w-4 h-4" />}
                        <span>{item}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )
          ))}
        </div>

        {/* Support Settings */}
        <div className="p-4 border-t border-gray-200">
          <div className="flex items-center space-x-3 text-gray-700 hover:text-gray-900 hover:bg-gray-100 px-3 py-2 rounded-md text-sm cursor-pointer">
            <Settings className="w-4 h-4" />
            <span>Support Settings</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="bg-white border-b border-gray-200 px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">DevRev AI-Native Support Setup</h1>
              <p className="text-gray-600 mt-1">Configure your support system in a few simple steps</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                Step {currentStep} of {steps.length}
              </div>
              <div className="w-32 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${(currentStep / steps.length) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-8">
          {/* Step 1: Setup Trails */}
          {currentStep === 1 && (
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Welcome to DevRev</h2>
                <p className="text-lg text-gray-600">Let's get your support system up and running</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <GitBranch className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Setup Trails</h3>
                  <p className="text-gray-600 mb-8">
                    Configure your development workflow and tracking system to get started with DevRev.
                  </p>
                  <button
                    onClick={handleSetupTrails}
                    className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Setup Trails
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Import Data */}
          {currentStep === 2 && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Import Data from Existing Support Applications</h2>
                <p className="text-lg text-gray-600">Connect your existing support tools to migrate your data</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                {[
                  { name: 'Zendesk', onClick: () => setShowAirsyncModal(true) },
                  { name: 'Salesforce', onClick: () => {} },
                  { name: 'Hubspot', onClick: () => {} },
                  { name: 'Create own airsync connector', onClick: () => setShowCustomConnectorModal(true) }
                ].map((platform) => (
                  <div
                    key={platform.name}
                    onClick={platform.onClick}
                    className="bg-white border-2 border-gray-200 rounded-lg p-6 text-center hover:border-blue-500 cursor-pointer transition-colors"
                  >
                    <h3 className="font-semibold text-gray-900 mb-2">{platform.name}</h3>
                  </div>
                ))}
              </div>

              {airsyncProgress > 0 && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-blue-900">Airsync in Progress</h3>
                    <span className="text-blue-700">{airsyncProgress}%</span>
                  </div>
                  <div className="w-full bg-blue-200 rounded-full h-2 mb-4">
                    <div 
                      className="bg-blue-600 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${airsyncProgress}%` }}
                    ></div>
                  </div>
                  <p className="text-blue-700">Transforming and syncing your data...</p>
                  {airsyncProgress === 100 && (
                    <div className="mt-4">
                      <div className="flex items-center space-x-2 text-green-700 mb-2">
                        <CheckCircle className="w-5 h-5" />
                        <span>Data transformation completed</span>
                      </div>
                      <div className="flex items-center space-x-2 text-green-700 mb-4">
                        <CheckCircle className="w-5 h-5" />
                        <span>New vistas have been added</span>
                      </div>
                      <button
                        onClick={handleStep2Complete}
                        className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                      >
                        Continue to Step 3
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {/* Step 3: Customize Objects */}
          {currentStep === 3 && (
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Customize Tickets and Conversations</h2>
                <p className="text-lg text-gray-600">Configure fields and properties for your support objects</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                <div className="flex space-x-4 mb-6">
                  {['tickets', 'conversations', 'contacts', 'accounts'].map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedObjectType(type)}
                      className={`px-4 py-2 rounded-lg font-medium capitalize ${
                        selectedObjectType === type
                          ? 'bg-black text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Recommended Fields for {selectedObjectType.charAt(0).toUpperCase() + selectedObjectType.slice(1)} (Financial Services)
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {fieldProperties[selectedObjectType as keyof typeof fieldProperties]?.map((field) => (
                      <div key={field.name} className="border border-gray-200 rounded-lg p-4">
                        <div className="flex items-center justify-between mb-2">
                          <label className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              checked={selectedFields.includes(field.name)}
                              onChange={(e) => {
                                if (e.target.checked) {
                                  setSelectedFields(prev => [...prev, field.name]);
                                } else {
                                  setSelectedFields(prev => prev.filter(f => f !== field.name));
                                }
                              }}
                              className="rounded border-gray-300"
                            />
                            <span className="font-medium text-gray-900">{field.name}</span>
                          </label>
                          <div className="flex space-x-2">
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">{field.type}</span>
                            <span className={`px-2 py-1 text-xs rounded ${
                              field.visibility === 'Public' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                            }`}>
                              {field.visibility}
                            </span>
                            {field.actionable && (
                              <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs rounded">Actionable</span>
                            )}
                          </div>
                        </div>
                        <p className="text-sm text-gray-600">{field.description}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex justify-between">
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">Copy configuration from airsynced tickets to all ticket subtypes</span>
                    </label>
                  </div>
                  <button
                    onClick={handleStep3Complete}
                    className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Continue to Step 4
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Select Channels */}
          {currentStep === 4 && (
            <div className="max-w-4xl mx-auto">
              {channelCarouselStep === 1 && (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Select Your Communication Channels</h2>
                    <p className="text-lg text-gray-600">Choose the channels you want to set up for customer support</p>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mb-8">
                    {[
                      { name: 'Email', icon: Mail },
                      { name: 'Slack', icon: MessageSquare },
                      { name: 'WhatsApp', icon: MessageCircle },
                      { name: 'Live Chat', icon: MessageSquare },
                      { name: 'Customer Portal', icon: Globe },
                      { name: 'Telephony', icon: Phone }
                    ].map((channel) => {
                      const Icon = channel.icon;
                      return (
                        <div
                          key={channel.name}
                          onClick={() => handleChannelSelection(channel.name)}
                          className={`bg-white border-2 rounded-lg p-6 text-center cursor-pointer transition-colors ${
                            selectedChannels.includes(channel.name)
                              ? 'border-blue-500 bg-blue-50'
                              : 'border-gray-200 hover:border-gray-300'
                          }`}
                        >
                          <Icon className="w-8 h-8 mx-auto mb-3 text-gray-600" />
                          <h3 className="font-semibold text-gray-900">{channel.name}</h3>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-center">
                    <button
                      onClick={() => setChannelCarouselStep(2)}
                      disabled={selectedChannels.length === 0}
                      className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {channelCarouselStep === 2 && selectedChannels.includes('Email') && (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Connect Your Email</h2>
                    <p className="text-lg text-gray-600">Choose your email provider</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                    <div
                      onClick={() => setChannelCarouselStep(3)}
                      className="bg-white border-2 border-gray-200 rounded-lg p-8 text-center hover:border-blue-500 cursor-pointer transition-colors"
                    >
                      <div className="w-16 h-16 bg-red-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Mail className="w-8 h-8 text-red-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Gmail</h3>
                      <p className="text-gray-600">Connect your Gmail account</p>
                    </div>

                    <div className="bg-white border-2 border-gray-200 rounded-lg p-8 text-center hover:border-gray-300 cursor-pointer transition-colors">
                      <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Settings className="w-8 h-8 text-gray-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-900 mb-2">Other Connectors</h3>
                      <p className="text-gray-600">Configure custom email settings</p>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setChannelCarouselStep(1)}
                      className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </button>
                  </div>
                </div>
              )}

              {channelCarouselStep === 3 && (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Email Setup Complete</h2>
                    <p className="text-lg text-gray-600">Your email account has been connected and configured</p>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8 mb-6">
                    <div className="space-y-6">
                      <div className="flex items-center space-x-3 text-green-700">
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-medium">Email account connected successfully</span>
                      </div>
                      
                      <div className="flex items-center space-x-3 text-green-700">
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-medium">Default email template created</span>
                      </div>

                      <div className="flex items-center space-x-3 text-green-700">
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-medium">Auto-reply message configured</span>
                      </div>

                      <div className="flex items-center space-x-3 text-green-700">
                        <CheckCircle className="w-6 h-6" />
                        <span className="font-medium">Test message sent successfully</span>
                      </div>

                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <h4 className="font-semibold text-blue-900 mb-2">Next Step: Email Forwarding</h4>
                        <p className="text-blue-700 text-sm">
                          Please set up email forwarding in your email server to route incoming emails to DevRev. 
                          Forward emails to: support@your-domain.devrev.ai
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setChannelCarouselStep(2)}
                      className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setChannelCarouselStep(4)}
                      className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      Continue
                    </button>
                  </div>
                </div>
              )}

              {channelCarouselStep === 4 && (
                <div>
                  <div className="text-center mb-8">
                    <h2 className="text-3xl font-bold text-gray-900 mb-4">Customer Portal Setup</h2>
                    <p className="text-lg text-gray-600">Your portal has been created based on your website theme</p>
                  </div>

                  <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6 mb-6">
                    <div className="mb-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-4">Portal Preview</h3>
                      <div className="border border-gray-200 rounded-lg overflow-hidden">
                        {/* Paytm Portal Preview */}
                        <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-2xl font-bold">Paytm</span>
                              <span className="text-sm opacity-90">24x7 Help</span>
                            </div>
                          </div>
                          <div className="text-center">
                            <h1 className="text-3xl font-bold mb-4">Help & Support</h1>
                            <div className="max-w-md mx-auto">
                              <div className="relative">
                                <input
                                  type="text"
                                  placeholder="Search questions, keywords, topics"
                                  className="w-full px-4 py-3 rounded-lg text-gray-900 placeholder-gray-500"
                                />
                                <Search className="absolute right-3 top-3 w-5 h-5 text-gray-400" />
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <div className="p-6 bg-gray-50">
                          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Browse Support Articles</h2>
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                              <div className="flex items-center space-x-3 mb-4">
                                <Shield className="w-8 h-8 text-blue-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Privacy & Security</h3>
                              </div>
                              <div className="space-y-2 text-sm text-gray-600">
                                <p>How to ensure safe and secure money transfer?</p>
                                <p>Is your identity safe while using Paytm?</p>
                                <button className="text-blue-600 hover:text-blue-700 font-medium">More →</button>
                              </div>
                            </div>
                            
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                              <div className="flex items-center space-x-3 mb-4">
                                <BarChart3 className="w-8 h-8 text-blue-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Recharges & Bill Payments</h3>
                              </div>
                              <div className="space-y-2 text-sm text-gray-600">
                                <p>Mobile recharge initiated but order still under process</p>
                                <p>Can you cancel a successful recharge? Get details</p>
                                <button className="text-blue-600 hover:text-blue-700 font-medium">More →</button>
                              </div>
                            </div>
                            
                            <div className="bg-white rounded-lg p-6 shadow-sm">
                              <div className="flex items-center space-x-3 mb-4">
                                <Globe className="w-8 h-8 text-blue-600" />
                                <h3 className="text-lg font-semibold text-gray-900">Travel</h3>
                              </div>
                              <div className="space-y-2 text-sm text-gray-600">
                                <p>Want to cancel your flight ticket? Follow these steps</p>
                                <p>Want to cancel your flight ticket? Here's what you should do</p>
                                <button className="text-blue-600 hover:text-blue-700 font-medium">More →</button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 pt-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Customize Portal</h4>
                      <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
                        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 mb-2">Drag and drop your previous portal screenshot here</p>
                        <p className="text-sm text-gray-500">to match colors, logos, and theme</p>
                        <button className="mt-4 bg-gray-100 text-gray-700 px-4 py-2 rounded-lg text-sm hover:bg-gray-200 transition-colors">
                          Browse Files
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center space-x-4">
                    <button
                      onClick={() => setChannelCarouselStep(3)}
                      className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleStep4Complete}
                      className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      Complete Setup
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 5: Assignment Rules */}
          {currentStep === 5 && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Add Assignment Rules for Tickets and Conversations</h2>
                <p className="text-lg text-gray-600">Configure how tickets and conversations are assigned to your team</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  {[
                    { id: 'round-robin', name: 'Round Robin', description: 'Distribute tickets evenly among team members' },
                    { id: 'load-balancing', name: 'Load Balancing', description: 'Assign based on current workload' },
                    { id: 'random', name: 'Random Distribution', description: 'Randomly assign tickets to available agents' },
                    { id: 'capacity', name: 'Capacity-based Allocation', description: 'Assign based on agent capacity and skills' }
                  ].map((rule) => (
                    <div
                      key={rule.id}
                      onClick={() => setAssignmentRuleType(rule.id)}
                      className={`border-2 rounded-lg p-6 cursor-pointer transition-colors ${
                        assignmentRuleType === rule.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <h3 className="font-semibold text-gray-900 mb-2">{rule.name}</h3>
                      <p className="text-sm text-gray-600">{rule.description}</p>
                    </div>
                  ))}
                </div>

                {assignmentRuleType && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mb-6">
                    <div className="flex items-center space-x-3 text-green-700 mb-2">
                      <CheckCircle className="w-6 h-6" />
                      <span className="font-medium">AI has automatically configured your assignment rules</span>
                    </div>
                    <p className="text-green-700 text-sm">
                      Snap-in and workflow have been updated with your selected assignment strategy.
                    </p>
                  </div>
                )}

                <div className="flex justify-center">
                  <button
                    onClick={handleStep5Complete}
                    disabled={!assignmentRuleType}
                    className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
                  >
                    Continue to Step 6
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 6: Support Metrics */}
          {currentStep === 6 && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Setup Support Metrics</h2>
                <p className="text-lg text-gray-600">Configure SLA, CSAT, and reporting for your support system</p>
              </div>

              {slaCarouselStep === 1 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">SLA Configuration</h3>
                  
                  <div className="space-y-6">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                      <h4 className="font-semibold text-blue-900 mb-4">Default SLA Metrics</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">First Response Time</label>
                          <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                            <option>4 hours</option>
                            <option>8 hours</option>
                            <option>24 hours</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Resolution Time</label>
                          <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                            <option>24 hours</option>
                            <option>48 hours</option>
                            <option>72 hours</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                      <h4 className="font-semibold text-gray-900 mb-4">Organization Schedule</h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Working Hours</label>
                          <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                            <option>9 AM - 6 PM</option>
                            <option>24/7</option>
                            <option>Custom</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Time Zone</label>
                          <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                            <option>UTC</option>
                            <option>EST</option>
                            <option>PST</option>
                          </select>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-8">
                    <button
                      onClick={() => setSlaCarouselStep(2)}
                      className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      Continue to CSAT
                    </button>
                  </div>
                </div>
              )}

              {slaCarouselStep === 2 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">CSAT Survey Configuration</h3>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Survey Settings</h4>
                      <div className="space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Survey Trigger</label>
                          <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                            <option>After ticket resolution</option>
                            <option>24 hours after resolution</option>
                            <option>Manual trigger</option>
                          </select>
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">Survey Type</label>
                          <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                            <option>5-star rating</option>
                            <option>Thumbs up/down</option>
                            <option>1-10 scale</option>
                          </select>
                        </div>
                      </div>
                    </div>

                    <div>
                      <h4 className="font-semibold text-gray-900 mb-4">Survey Preview</h4>
                      <div className="border border-gray-200 rounded-lg p-4 bg-gray-50">
                        <h5 className="font-medium text-gray-900 mb-3">How was your support experience?</h5>
                        <div className="flex space-x-2 mb-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button key={star} className="text-yellow-400 hover:text-yellow-500">
                              ⭐
                            </button>
                          ))}
                        </div>
                        <textarea
                          placeholder="Tell us more about your experience..."
                          className="w-full border border-gray-300 rounded px-3 py-2 text-sm"
                          rows={3}
                        />
                        <button className="mt-2 bg-blue-600 text-white px-4 py-2 rounded text-sm">
                          Submit Feedback
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-center mt-8 space-x-4">
                    <button
                      onClick={() => setSlaCarouselStep(1)}
                      className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={() => setSlaCarouselStep(3)}
                      className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      Continue to Insights
                    </button>
                  </div>
                </div>
              )}

              {slaCarouselStep === 3 && (
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                  <h3 className="text-xl font-semibold text-gray-900 mb-6">Ticket Insights</h3>
                  
                  <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                    <h4 className="font-semibold text-blue-900 mb-4">Import Existing Reports</h4>
                    <p className="text-blue-700 mb-4">
                      Provide your previous support system URL and credentials to automatically create corresponding custom reports in DevRev.
                    </p>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-blue-900 mb-2">Previous System URL</label>
                        <input
                          type="url"
                          placeholder="https://your-company.zendesk.com"
                          className="w-full border border-blue-300 rounded-lg px-3 py-2"
                        />
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-blue-900 mb-2">Username</label>
                          <input
                            type="text"
                            placeholder="admin@company.com"
                            className="w-full border border-blue-300 rounded-lg px-3 py-2"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-blue-900 mb-2">API Token</label>
                          <input
                            type="password"
                            placeholder="••••••••••••••••"
                            className="w-full border border-blue-300 rounded-lg px-3 py-2"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 border border-green-200 rounded-lg p-6">
                    <div className="flex items-center space-x-3 text-green-700 mb-2">
                      <CheckCircle className="w-6 h-6" />
                      <span className="font-medium">AI will analyze and recreate your custom reports</span>
                    </div>
                    <p className="text-green-700 text-sm">
                      DevRev will automatically determine report structures and create corresponding dashboards.
                    </p>
                  </div>

                  <div className="flex justify-center mt-8 space-x-4">
                    <button
                      onClick={() => setSlaCarouselStep(2)}
                      className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                    >
                      Back
                    </button>
                    <button
                      onClick={handleStep6Complete}
                      className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                    >
                      Continue to Step 7
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Step 7: Custom Workflows */}
          {currentStep === 7 && (
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-4">Custom Use Cases & Workflows</h2>
                <p className="text-lg text-gray-600">Add custom automation workflows or create your own</p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Recommended Workflows</h3>
                
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                  {[
                    { id: 'severity-detector', name: 'Auto-ticket Severity Detector', description: 'Automatically detect and assign ticket severity based on content', icon: Target },
                    { id: 'spam-detector', name: 'Spam Detector', description: 'Identify and filter spam tickets automatically', icon: Shield },
                    { id: 'sensitive-redactor', name: 'Auto-redact Sensitive Information', description: 'Automatically redact sensitive data in tickets and logs', icon: Bot }
                  ].map((workflow) => {
                    const Icon = workflow.icon;
                    return (
                      <div
                        key={workflow.id}
                        onClick={() => {
                          if (selectedWorkflows.includes(workflow.id)) {
                            setSelectedWorkflows(prev => prev.filter(w => w !== workflow.id));
                          } else {
                            setSelectedWorkflows(prev => [...prev, workflow.id]);
                          }
                        }}
                        className={`border-2 rounded-lg p-6 cursor-pointer transition-colors ${
                          selectedWorkflows.includes(workflow.id)
                            ? 'border-blue-500 bg-blue-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <Icon className="w-8 h-8 text-gray-600 mb-4" />
                        <h4 className="font-semibold text-gray-900 mb-2">{workflow.name}</h4>
                        <p className="text-sm text-gray-600">{workflow.description}</p>
                      </div>
                    );
                  })}
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h4 className="font-semibold text-gray-900 mb-4">Custom Workflow Request</h4>
                  <div className="bg-gray-50 border border-gray-200 rounded-lg p-6">
                    <textarea
                      placeholder="Describe your custom workflow requirements. For example: 'When a ticket contains the word urgent, automatically assign it to the senior support team and set priority to high.'"
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 h-24 resize-none"
                    />
                    <button className="mt-4 bg-blue-600 text-white px-4 py-2 rounded-lg text-sm hover:bg-blue-700 transition-colors">
                      Generate Custom Workflow
                    </button>
                  </div>
                </div>

                {selectedWorkflows.length > 0 && (
                  <div className="bg-green-50 border border-green-200 rounded-lg p-6 mt-6">
                    <div className="flex items-center space-x-3 text-green-700 mb-2">
                      <CheckCircle className="w-6 h-6" />
                      <span className="font-medium">AI has created your selected workflows</span>
                    </div>
                    <p className="text-green-700 text-sm">
                      {selectedWorkflows.length} workflow(s) have been configured and are ready to use.
                    </p>
                  </div>
                )}

                <div className="flex justify-center mt-8">
                  <button
                    onClick={handleStep7Complete}
                    className="bg-black text-white px-8 py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                  >
                    Complete Setup
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Trails Modal */}
      {showTrailsModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <GitBranch className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Setting up Trails</h3>
              {isLoading ? (
                <div className="flex justify-center space-x-1 mb-4">
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce"></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                  <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                </div>
              ) : (
                <div className="space-y-4 text-left">
                  <div className="flex items-center space-x-3 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span>Development workflow configured</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span>Tracking system initialized</span>
                  </div>
                  <div className="flex items-center space-x-3 text-green-700">
                    <CheckCircle className="w-5 h-5" />
                    <span>Integration points established</span>
                  </div>
                </div>
              )}
              <p className="text-gray-600 mt-4">
                {isLoading 
                  ? "Configuring your development trails..."
                  : "Trails help you track development progress and manage your workflow efficiently."
                }
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Airsync Modal */}
      {showAirsyncModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-4xl w-full mx-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Configure Zendesk Airsync</h3>
              <button
                onClick={() => setShowAirsyncModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Objects to Airsync</h4>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {['Tickets', 'Users', 'Organizations', 'Groups'].map((object) => (
                    <label key={object} className="flex items-center space-x-2">
                      <input type="checkbox" defaultChecked className="rounded border-gray-300" />
                      <span className="text-sm text-gray-700">{object}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="text-lg font-semibold text-gray-900 mb-4">Data Mapping Preview</h4>
                <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">Zendesk Fields</h5>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• ticket.subject → DevRev.title</li>
                        <li>• ticket.description → DevRev.body</li>
                        <li>• ticket.priority → DevRev.priority</li>
                        <li>• ticket.status → DevRev.stage</li>
                        <li>• ticket.assignee → DevRev.owner</li>
                      </ul>
                    </div>
                    <div>
                      <h5 className="font-medium text-gray-900 mb-2">DevRev Objects</h5>
                      <ul className="space-y-1 text-sm text-gray-600">
                        <li>• Tickets (subtype: Zendesk)</li>
                        <li>• Conversations</li>
                        <li>• Contacts</li>
                        <li>• Accounts</li>
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowAirsyncModal(false)}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAirsyncStart}
                  className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Start Airsync
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Connector Modal */}
      {showCustomConnectorModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-2xl font-semibold text-gray-900">Create Custom Airsync Connector</h3>
              <button
                onClick={() => setShowCustomConnectorModal(false)}
                className="text-gray-400 hover:text-gray-600"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe your data source and requirements
                </label>
                <textarea
                  className="w-full border border-gray-300 rounded-lg px-3 py-2 h-32 resize-none"
                  placeholder="Example: I have a MySQL database with customer support tickets. The table has columns for ticket_id, customer_email, subject, description, priority, status, and created_date. I want to sync this data to DevRev tickets."
                />
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex items-center space-x-3 text-blue-700 mb-2">
                  <Bot className="w-6 h-6" />
                  <span className="font-medium">AI Connector Generation</span>
                </div>
                <p className="text-blue-700 text-sm">
                  Based on your description, I'll create a custom airsync connector snap-in that you can review and publish.
                </p>
              </div>

              <div className="flex justify-end space-x-4">
                <button
                  onClick={() => setShowCustomConnectorModal(false)}
                  className="bg-gray-100 text-gray-700 px-6 py-2 rounded-lg font-medium hover:bg-gray-200 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowCustomConnectorModal(false);
                    // Show success message
                    setTimeout(() => {
                      alert('Custom airsync connector created! Clone the project in your code editor to review and publish as your DevRev snap-in.');
                    }, 500);
                  }}
                  className="bg-black text-white px-6 py-2 rounded-lg font-medium hover:bg-gray-800 transition-colors"
                >
                  Generate Connector
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;