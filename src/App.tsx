import React, { useEffect, useRef, useState } from 'react';
import { Settings, ChevronLeft, User, Bell, Zap, LifeBuoy, Plug, Users, BookOpen, CheckCircle2, Circle, Play, ExternalLink, ArrowRight, Globe, Loader2, Search, Filter, ChevronDown, MoreHorizontal, Mail, Building, Database, MessageSquare, Ticket, UserCheck, Building2, Plus, X, Check, AlertCircle, Eye, EyeOff, Code, Download, GitBranch, Sliders as Sliders3, Workflow, Route, Clock, Star, BarChart3, Zap as ZapIcon, Shield, FileText, Upload, ChevronRight, Info, Target, Users2, Phone, Smartphone, Bot, Globe2, ArrowLeft } from 'lucide-react';

function App() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [trailsGenerated, setTrailsGenerated] = useState(false);
  const [step2Completed, setStep2Completed] = useState(false);
  const [step3Completed, setStep3Completed] = useState(false);
  const [step4Completed, setStep4Completed] = useState(false);
  const [step5Completed, setStep5Completed] = useState(false);
  const [step6Completed, setStep6Completed] = useState(false);
  const [step7Completed, setStep7Completed] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [currentPage, setCurrentPage] = useState('get-started');
  const [focusedStep, setFocusedStep] = useState<number | null>(null);
  const step2Ref = useRef<HTMLDivElement | null>(null);
  const step3Ref = useRef<HTMLDivElement | null>(null);
  const step4Ref = useRef<HTMLDivElement | null>(null);
  const step5Ref = useRef<HTMLDivElement | null>(null);
  const step6Ref = useRef<HTMLDivElement | null>(null);
  const step7Ref = useRef<HTMLDivElement | null>(null);
  
  // Step 2 states
  const [selectedImportSource, setSelectedImportSource] = useState('');
  const [showAirsyncModal, setShowAirsyncModal] = useState(false);
  const [airsyncInProgress, setAirsyncInProgress] = useState(false);
  const [airsyncCompleted, setAirsyncCompleted] = useState(false);
  const [showCustomConnectorModal, setShowCustomConnectorModal] = useState(false);
  const [connectorGenerated, setConnectorGenerated] = useState(false);
  const [connectorRequirements, setConnectorRequirements] = useState('');
  const [showWorkSections, setShowWorkSections] = useState(false);

  // Step 3 states
  const [selectedObjectType, setSelectedObjectType] = useState('Tickets');
  const [selectedTicketFields, setSelectedTicketFields] = useState<{[k: string]: boolean}>({
    'Payment Method': true,
    'Transaction ID': true,
    'Account Type': true,
    'KYC Status': true,
    'Issue Category': true,
    'Priority Level': true,
  });
  const [selectedConversationFields, setSelectedConversationFields] = useState<{[k: string]: boolean}>({
    'Customer Sentiment': true,
    'Channel Source': true,
    'Response Time': true,
    'Resolution Status': true,
  });
  const [selectedContactFields, setSelectedContactFields] = useState<{[k: string]: boolean}>({
    'Customer Tier': true,
    'Account Balance': true,
    'Verification Status': true,
    'Preferred Language': true,
  });

  // Step 4 states
  const [step4CarouselIndex, setStep4CarouselIndex] = useState(0);
  const [selectedChannels, setSelectedChannels] = useState<{[k: string]: boolean}>({
    Email: false,
    Slack: false,
    Whatsapp: false,
    'Live Chat widget': false,
    'Customer Portal': false,
    Telephony: false,
  });
  const [selectedEmailProvider, setSelectedEmailProvider] = useState('');
  const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false);
  const [showPortalCustomization, setShowPortalCustomization] = useState(false);

  // Step 5 states
  const [selectedAssignmentRule, setSelectedAssignmentRule] = useState('');

  // Step 6 states
  const [step6CarouselIndex, setStep6CarouselIndex] = useState(0);
  const [slaSettings, setSlaSettings] = useState({
    responseTime: '2 hours',
    resolutionTime: '24 hours',
    priority: 'High'
  });
  const [csatSettings, setCsatSettings] = useState({
    enabled: true,
    timing: 'After resolution',
    questions: 3
  });

  // Step 7 states
  const [selectedWorkflows, setSelectedWorkflows] = useState<{[k: string]: boolean}>({
    'Auto-ticket severity detector': false,
    'Spam detector': false,
    'Auto-redact sensitive information': false,
  });
  const [customWorkflowRequest, setCustomWorkflowRequest] = useState('');

  const [setupCompleted, setSetupCompleted] = useState(false);

  const handleGenerateTrails = async () => {
    if (!websiteUrl) return;
    
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
    setTrailsGenerated(true);
    setShowNotification(true);
    setFocusedStep(2);
    setTimeout(() => {
      if (step2Ref.current) {
        step2Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        step2Ref.current.focus();
      }
    }, 50);
    
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  const handleImportSourceSelect = (source: string) => {
    setSelectedImportSource(source);
    if (source === 'custom') {
      setShowCustomConnectorModal(true);
    } else {
      setShowAirsyncModal(true);
    }
  };

  const handleStartAirsync = async () => {
    setShowAirsyncModal(false);
    setAirsyncInProgress(true);
    setShowWorkSections(true);
    
    await new Promise(resolve => setTimeout(resolve, 4000));
    setAirsyncInProgress(false);
    setAirsyncCompleted(true);
    setStep2Completed(true);
    setFocusedStep(3);
    
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const handleGenerateConnector = async () => {
    if (!connectorRequirements) return;
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConnectorGenerated(true);
    setStep2Completed(true);
    setShowWorkSections(true);
    setFocusedStep(3);
  };

  const handleStep3Complete = () => {
    setStep3Completed(true);
    setFocusedStep(4);
    setTimeout(() => {
      if (step4Ref.current) {
        step4Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleChannelSelection = () => {
    const hasSelectedChannels = Object.values(selectedChannels).some(Boolean);
    if (hasSelectedChannels) {
      setStep4CarouselIndex(1);
    }
  };

  const handleStep4Complete = () => {
    setStep4Completed(true);
    setFocusedStep(5);
    setTimeout(() => {
      if (step5Ref.current) {
        step5Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleStep5Complete = () => {
    setStep5Completed(true);
    setFocusedStep(6);
    setTimeout(() => {
      if (step6Ref.current) {
        step6Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleStep6Complete = () => {
    setStep6Completed(true);
    setFocusedStep(7);
    setTimeout(() => {
      if (step7Ref.current) {
        step7Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    }, 100);
  };

  const handleStep7Complete = () => {
    setStep7Completed(true);
    setSetupCompleted(true);
    setCurrentPage('tickets');
  };

  const VideoModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowVideoModal(false)}>
      <div className="bg-white rounded-lg p-4 max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">What are trails?</h3>
          <button 
            onClick={() => setShowVideoModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <div className="aspect-video">
          <iframe
            width="100%"
            height="100%"
            src="https://www.youtube.com/embed/FevhNu0gUyA"
            title="What are trails?"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            className="rounded-lg"
          ></iframe>
        </div>
      </div>
    </div>
  );

  const AirsyncModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowAirsyncModal(false)}>
      <div className="bg-white rounded-lg p-6 max-w-4xl w-full mx-4 max-h-[80vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Configure {selectedImportSource} Airsync</h3>
          <button 
            onClick={() => setShowAirsyncModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="space-y-6">
          <div>
            <h4 className="text-lg font-medium mb-3">Objects to Airsync</h4>
            <p className="text-sm text-gray-600 mb-4">
              The following objects will be airsynced from {selectedImportSource} to DevRev:
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {['Tickets', 'Users', 'Organizations', 'Articles', 'Comments', 'Attachments'].map((object) => (
                <div key={object} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600" />
                  <span className="text-sm font-medium">{object}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-medium mb-3">Data Mapping Preview</h4>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">{selectedImportSource} Fields</h5>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">• ticket.subject</div>
                    <div className="text-sm text-gray-600">• ticket.description</div>
                    <div className="text-sm text-gray-600">• ticket.priority</div>
                    <div className="text-sm text-gray-600">• ticket.status</div>
                    <div className="text-sm text-gray-600">• ticket.assignee</div>
                  </div>
                </div>
                <div>
                  <h5 className="font-medium text-gray-900 mb-2">DevRev Fields</h5>
                  <div className="space-y-2">
                    <div className="text-sm text-gray-600">→ work.title</div>
                    <div className="text-sm text-gray-600">→ work.body</div>
                    <div className="text-sm text-gray-600">→ work.priority</div>
                    <div className="text-sm text-gray-600">→ work.stage</div>
                    <div className="text-sm text-gray-600">→ work.owned_by</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button 
              onClick={() => setShowAirsyncModal(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button 
              onClick={handleStartAirsync}
              className="px-6 py-2 bg-black hover:bg-gray-800 text-white rounded-lg"
            >
              Start Airsync
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const CustomConnectorModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowCustomConnectorModal(false)}>
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold">Create Custom Airsync Connector</h3>
          <button 
            onClick={() => setShowCustomConnectorModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {!connectorGenerated ? (
          <div className="space-y-4">
            
            {!connectorGenerated ? (
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    a) Authorize your tool through Email:
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    b) Type your Password:
                  </label>
                  <input
                    type="password"
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Enter your password"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    c) Provide your API Documentation:
                  </label>
                  <p className="text-sm text-gray-600 mb-2">
                    Obtain the official API documentation of the external system. This is the primary source of information about how to connect and interact with the system.
                  </p>
                  <textarea
                    className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    placeholder="Paste API documentation URL or details..."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    d) Select sync type:
                  </label>
                  <select className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent">
                    <option value="">Choose sync type...</option>
                    <option value="1-time">1-time import: Migrate data from an external source to DevRev.</option>
                    <option value="1-way">1-way sync: Keep data in sync from an external source to DevRev.</option>
                    <option value="2-way">2-way sync: Synchronize data bidirectionally between DevRev and an external source.</option>
                  </select>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <div className="mb-6">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 text-green-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Code Generated Successfully!</h3>
                  <p className="text-gray-600">Your custom connector has been generated and is ready for testing.</p>
                </div>
              </div>
            )}
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowCustomConnectorModal(false)}
                className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button 
                onClick={handleGenerateConnector}
                disabled={!connectorRequirements.trim()}
                className={`px-6 py-2 rounded-lg ${
                  connectorRequirements.trim() 
                    ? 'bg-black hover:bg-gray-800 text-white' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                {connectorGenerated ? 'Test Connector' : 'Generate Connector'}
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
              <div>
                <h4 className="font-medium text-green-900">Connector Generated Successfully!</h4>
                <p className="text-sm text-green-700">Your custom airsync connector has been created.</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-center space-x-3 mb-3">
                <Code className="h-5 w-5 text-gray-600" />
                <span className="font-medium">Generated Snap-in</span>
              </div>
              <p className="text-sm text-gray-600 mb-3">
                Clone the project in your code editor to review and publish as your DevRev snap-in.
              </p>
              <button className="flex items-center space-x-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700">
                <Download className="h-4 w-4" />
                <span>Clone Project</span>
              </button>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowCustomConnectorModal(false)}
                className="px-6 py-2 bg-black hover:bg-gray-800 text-white rounded-lg"
              >
                Continue Setup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const getFieldProperties = (fieldName: string, objectType: string) => {
    const properties = {
      'Payment Method': { type: 'Single Select', visibility: 'Public', actionable: true },
      'Transaction ID': { type: 'Text', visibility: 'Internal', actionable: false },
      'Account Type': { type: 'Single Select', visibility: 'Public', actionable: true },
      'KYC Status': { type: 'Single Select', visibility: 'Internal', actionable: true },
      'Issue Category': { type: 'Single Select', visibility: 'Public', actionable: true },
      'Priority Level': { type: 'Single Select', visibility: 'Public', actionable: true },
      'Customer Sentiment': { type: 'Single Select', visibility: 'Internal', actionable: false },
      'Channel Source': { type: 'Text', visibility: 'Public', actionable: false },
      'Response Time': { type: 'Number', visibility: 'Internal', actionable: false },
      'Resolution Status': { type: 'Single Select', visibility: 'Public', actionable: true },
      'Customer Tier': { type: 'Single Select', visibility: 'Public', actionable: true },
      'Account Balance': { type: 'Number', visibility: 'Internal', actionable: false },
      'Verification Status': { type: 'Single Select', visibility: 'Internal', actionable: true },
      'Preferred Language': { type: 'Single Select', visibility: 'Public', actionable: false },
    };
    return properties[fieldName] || { type: 'Text', visibility: 'Public', actionable: false };
  };

  const TrailsPage = () => (
    <div className="flex-1 p-4">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="flex items-center justify-between px-4 py-3 border-b border-gray-200">
          <div className="flex items-center space-x-3">
            <h1 className="text-base font-medium text-gray-900">Trails</h1>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Type to search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center space-x-2 text-sm text-gray-600">
            <span>Show</span>
            <button className="flex items-center space-x-1 px-2 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
              <span>Owner</span>
              <ChevronDown className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>

        <div className="relative h-[560px] bg-gray-50">
          <div className="absolute left-12 top-16 space-y-7">
            {["DevRev Studio","DevRev AgentOS","DevRevU","The Book of DevRev","DevRev Corp","DevRev Community","DevRev Apps"].map((name, idx) => (
              <div key={idx} className="bg-white rounded-lg p-3 shadow-sm border border-purple-200 w-52">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 bg-purple-100 rounded-lg flex items-center justify-center">
                    <div className="w-3.5 h-3.5 bg-purple-500 rounded" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 truncate">{name}</h3>
                    <p className="text-[10px] text-gray-500">Sample owner +1</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute left-[26rem] top-24 space-y-10">
            {["Agent Platform","Knowledge Graph","Analytics Platform","Agent and Workflow Studio","Observability, performance a..."]
              .map((name, idx) => (
              <div key={idx} className="bg-white rounded-lg p-3 shadow-sm border border-blue-200 w-52">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="w-3.5 h-3.5 bg-blue-500 rounded" />
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-900 truncate">{name}</h3>
                    <p className="text-[10px] text-gray-500">Owner +1</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="absolute right-12 top-16 space-y-7">
            {["Workflows and Skills: Observa...","Agent creation and Personaliz...","Workflow Controls","Workflow Builder UX"]
              .map((name, idx) => (
              <div key={idx} className="bg-white rounded-lg p-2.5 shadow-sm border border-gray-200 w-60">
                <div className="flex items-center space-x-3">
                  <div className="w-6 h-6 bg-gray-100 rounded flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-400 rounded" />
                  </div>
                  <div>
                    <h3 className="text-[13px] font-medium text-gray-900 truncate">{name}</h3>
                    <p className="text-[10px] text-gray-500">Owner</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path d="M 300 130 C 340 130, 350 150, 380 175" stroke="#e6e8ee" strokeWidth="2" fill="none" />
            <path d="M 300 210 C 335 210, 350 215, 380 230" stroke="#e6e8ee" strokeWidth="2" fill="none" />
            <path d="M 300 290 C 330 290, 350 285, 380 285" stroke="#e6e8ee" strokeWidth="2" fill="none" />
            <path d="M 300 370 C 335 370, 350 350, 380 330" stroke="#e6e8ee" strokeWidth="2" fill="none" />

            <path d="M 590 175 C 620 140, 640 140, 680 120" stroke="#e6e8ee" strokeWidth="2" fill="none" />
            <path d="M 590 235 C 620 200, 640 195, 680 175" stroke="#e6e8ee" strokeWidth="2" fill="none" />
            <path d="M 590 295 C 620 260, 640 250, 680 235" stroke="#e6e8ee" strokeWidth="2" fill="none" />
            <path d="M 590 355 C 620 320, 640 305, 680 295" stroke="#e6e8ee" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  );

  const TicketsPage = () => (
    <div className="flex-1 bg-gray-50">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-b border-blue-100 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-yellow-400 rounded-lg flex items-center justify-center">
              <span className="text-lg">👋</span>
            </div>
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Welcome to DevRev!</h2>
              <p className="text-sm text-gray-600">Let's begin with the tasks that will help you start using DevRev effectively.</p>
            </div>
          </div>
          <div className="flex items-center space-x-3">
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
              Set up
            </button>
            <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 text-sm font-medium">
              Contact us
            </button>
          </div>
        </div>
      </div>

      {/* Tickets Header */}
      <div className="px-6 py-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <h1 className="text-xl font-semibold text-gray-900">Tickets</h1>
            <span className="text-sm text-gray-500">5</span>
          </div>
          <div className="flex items-center space-x-3">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <Zap className="h-4 w-4" />
            </button>
            <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              <Plus className="h-4 w-4" />
              <span>Ticket</span>
            </button>
          </div>
        </div>
      </div>

      {/* New View Banner */}
      <div className="px-6 py-3 bg-blue-50 border-b border-blue-100">
        <div className="flex items-center justify-between">
          <p className="text-sm text-blue-800">
            New view headers are here! We have made it more compact and consistent across all our views
          </p>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Try it now
          </button>
        </div>
      </div>

      {/* Tickets List */}
      <div className="p-6">
        <div className="bg-white rounded-lg border border-gray-200">
          {/* List Header */}
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center space-x-3">
              <Zap className="h-4 w-4 text-orange-500" />
              <span className="text-sm font-medium text-gray-900">List of all tickets for customer support</span>
              <button className="ml-auto text-gray-400 hover:text-gray-600">
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="px-4 py-3 border-b border-gray-200">
            <div className="flex items-center space-x-4">
              <button className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Search className="h-4 w-4 text-gray-400" />
              </button>
              <button className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Users className="h-4 w-4 text-gray-400" />
              </button>
              <button className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-50">
                <Clock className="h-4 w-4 text-gray-400" />
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Work type</span>
                <button className="px-3 py-1.5 bg-orange-100 text-orange-800 rounded-lg text-sm font-medium">
                  Ticket
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Created date</span>
                <button className="px-3 py-1.5 border border-gray-300 rounded-lg text-sm">
                  Last 90 days
                </button>
              </div>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-600">Stage</span>
                <button className="flex items-center space-x-1 px-3 py-1.5 border border-gray-300 rounded-lg text-sm">
                  <div className="w-2 h-2 bg-gray-400 rounded-full"></div>
                  <span>Queued</span>
                  <span className="text-gray-500">+5</span>
                </button>
              </div>
              <button className="p-1.5 text-gray-400 hover:text-gray-600">
                <Plus className="h-4 w-4" />
              </button>
              <button className="px-3 py-1.5 text-sm text-gray-600 hover:text-gray-800">
                Clear
              </button>
            </div>
          </div>

          {/* Table Header */}
          <div className="px-4 py-3 border-b border-gray-200 bg-gray-50">
            <div className="grid grid-cols-12 gap-4 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-1">Items</div>
              <div className="col-span-4">Customer Work...</div>
              <div className="col-span-2">Stage</div>
              <div className="col-span-2">Part</div>
              <div className="col-span-2">Owner</div>
              <div className="col-span-1"></div>
            </div>
          </div>

          {/* Ticket Rows */}
          <div className="divide-y divide-gray-200">
            {[
              { id: 'TKT-5', title: 'Issue with Adding New Users to Account', customer: 'dummy...', stage: 'Queued', part: 'Default Product 1', owner: 'Unas...' },
              { id: 'TKT-4', title: 'Reply to your first Ticket in DevRev', customer: '-', stage: 'Awaiting...', part: 'Default Feature 1', owner: 'DevR...' },
              { id: 'TKT-3', title: 'When Tickets link to Issues', customer: '-', stage: 'In De...', part: 'Default Feature 1', owner: 'DevR...' },
              { id: 'TKT-2', title: 'Complete DevRev setup ?', customer: '-', stage: 'Awaiting...', part: 'Default Feature 1', owner: 'DevR...' },
              { id: 'TKT-1', title: 'Respond on-the-go from DevRev Mobile', customer: '-', stage: 'Awaiting...', part: 'Default Feature 1', owner: 'DevR...' },
            ].map((ticket, idx) => (
              <div key={ticket.id} className="px-4 py-3 hover:bg-gray-50">
                <div className="grid grid-cols-12 gap-4 items-center">
                  <div className="col-span-1">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${idx === 0 ? 'bg-blue-500' : 'bg-blue-500'}`}></div>
                      <span className="text-sm font-medium text-gray-900">{ticket.id}</span>
                    </div>
                  </div>
                  <div className="col-span-4">
                    <div className="text-sm font-medium text-gray-900">{ticket.title}</div>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center space-x-2">
                      <div className={`w-2 h-2 rounded-full ${ticket.stage === 'Queued' ? 'bg-gray-400' : 'bg-orange-400'}`}></div>
                      <span className="text-sm text-gray-600">{ticket.stage}</span>
                    </div>
                  </div>
                  <div className="col-span-2">
                    <span className="text-sm text-blue-600">{ticket.part}</span>
                  </div>
                  <div className="col-span-2">
                    <div className="flex items-center space-x-2">
                      <div className="w-6 h-6 bg-orange-500 rounded text-white text-xs flex items-center justify-center font-medium">
                        {ticket.owner.charAt(0)}
                      </div>
                      <span className="text-sm text-gray-600">{ticket.owner}</span>
                    </div>
                  </div>
                  <div className="col-span-1">
                    <button className="text-gray-400 hover:text-gray-600">
                      <MoreHorizontal className="h-4 w-4" />
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

  const GetStartedPage = () => (
    <div className="flex-1 p-8">
      <div className="max-w-6xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center space-x-3 mb-2">
            <span className="text-2xl font-bold tracking-tight text-gray-900">DevRev</span>
          </div>
          <p className="text-gray-800 font-medium">Let us Setup DevRev Support for you</p>
        </div>

        {/* Support Settings Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <h2 className="text-lg font-semibold text-gray-900">Support Settings</h2>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{[trailsGenerated, step2Completed, step3Completed, step4Completed, step5Completed, step6Completed, step7Completed].filter(Boolean).length}/7 completed</span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className={`bg-blue-500 h-2 rounded-full transition-all duration-300`} style={{
                    width: `${([trailsGenerated, step2Completed, step3Completed, step4Completed, step5Completed, step6Completed, step7Completed].filter(Boolean).length / 7) * 100}%`
                  }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Step 1: Setup Trails */}
            {!trailsGenerated && (
              <div className="border rounded-lg p-6 mb-4 border-gray-200 hover:border-blue-300">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Circle className="h-6 w-6 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Start by setting up trails</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Step 1</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Let's start by creating a mind-map of your product to track your support tickets to relevant product parts
                    </p>
                    
                    <div className="mb-6">
                      <div 
                        className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-4 cursor-pointer hover:from-blue-100 hover:to-purple-100 transition-all duration-200 border border-blue-200"
                        onClick={() => setShowVideoModal(true)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex-shrink-0">
                            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
                              <Play className="h-8 w-8 text-white ml-1" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-1">What are trails?</h4>
                            <p className="text-sm text-gray-600">Learn how trails help organize your support workflow</p>
                          </div>
                          <ExternalLink className="h-4 w-4 text-gray-400 ml-auto" />
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <label htmlFor="website-url" className="block text-sm font-medium text-gray-700 mb-2">
                          Website URL
                        </label>
                        <div className="flex space-x-3">
                          <div className="flex-1 relative">
                            <Globe className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              id="website-url"
                              autoFocus
                              value={websiteUrl}
                              onChange={(e) => setWebsiteUrl(e.target.value)}
                              placeholder="https://paytm.com"
                              className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors"
                            />
                          </div>
                          <button
                            onClick={handleGenerateTrails}
                            disabled={websiteUrl.trim().length < 1 || isGenerating}
                            className={`px-6 py-2 rounded-lg font-medium transition-all duration-200 flex items-center space-x-2 ${
                              websiteUrl.trim().length < 1 || isGenerating
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-black hover:bg-gray-800 text-white shadow-lg hover:shadow-xl'
                            }`}
                          >
                            {isGenerating ? (
                              <>
                                <Loader2 className="h-4 w-4 animate-spin" />
                                <span>Generating...</span>
                              </>
                            ) : (
                              <>
                                <span>Auto-generate trails</span>
                                <ArrowRight className="h-4 w-4" />
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-2">
                          DevRev will analyze your website and automatically create relevant trails for your product
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Import Data */}
            {trailsGenerated && !step2Completed && (
              <div
                ref={step2Ref}
                tabIndex={-1}
                className={`border rounded-lg p-6 mb-4 transition-colors ${
                  focusedStep === 2 ? 'border-blue-300 ring-2 ring-blue-400 bg-blue-50/40' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Circle className="h-6 w-6 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Import Data from existing support applications</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Step 2</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Connect your existing support tools to import tickets, customers, and historical data
                    </p>

                    {!airsyncInProgress && (
                      <div className="space-y-4">
                        <p className="text-sm font-medium text-gray-700">Select your current support platform:</p>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { name: 'Zendesk', color: 'border-gray-300' },
                            { name: 'Salesforce', color: 'border-blue-300' },
                            { name: 'Hubspot', color: 'border-orange-300' },
                            { name: 'Create own airsync connector', color: 'border-purple-300' }
                          ].map((platform) => (
                            <button
                              key={platform.name}
                              onClick={() => handleImportSourceSelect(platform.name === 'Create own airsync connector' ? 'custom' : platform.name)}
                              className={`p-4 border-2 rounded-lg hover:bg-gray-50 transition-colors ${platform.color} ${
                                selectedImportSource === platform.name ? 'border-blue-500 bg-blue-50' : ''
                              }`}
                            >
                              <div className="flex items-center justify-center">
                                <span className="font-medium text-gray-900">{platform.name}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {airsyncInProgress && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                          <Loader2 className="h-6 w-6 text-blue-600 animate-spin" />
                          <div>
                            <h4 className="font-medium text-blue-900">Airsync in Progress</h4>
                            <p className="text-sm text-blue-700">Importing data from {selectedImportSource}...</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-sm font-medium">Transformation Progress</span>
                            <span className="text-sm text-gray-600">75%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-2">
                            <div className="bg-blue-500 h-2 rounded-full w-3/4 transition-all duration-300"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Customize tickets and conversations */}
            {step2Completed && !step3Completed && (
              <div
                ref={step3Ref}
                className={`border rounded-lg p-6 mb-4 transition-colors ${
                  focusedStep === 3 ? 'border-blue-300 ring-2 ring-blue-400 bg-blue-50/40' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Circle className="h-6 w-6 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Customize tickets and conversations</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Step 3</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Based on your website (paytm.com), we've detected you're in the <strong>Financial Services</strong> industry. 
                      Customize fields for different object types:
                    </p>

                    <div className="space-y-6">
                      {/* Object Type Selector */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-3">Select object type to customize:</p>
                        <div className="flex space-x-2">
                          {['Tickets', 'Conversations', 'Contacts', 'Accounts'].map((type) => (
                            <button
                              key={type}
                              onClick={() => setSelectedObjectType(type)}
                              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                selectedObjectType === type
                                  ? 'bg-blue-100 text-blue-800 border border-blue-300'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Copy Configuration Option */}
                      <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <input type="checkbox" className="h-4 w-4 text-blue-600" />
                          <div>
                            <p className="text-sm font-medium text-blue-900">
                              Copy configuration from airsynced {selectedObjectType.toLowerCase()} to all {selectedObjectType.toLowerCase()} subtypes
                            </p>
                            <p className="text-xs text-blue-700">
                              All airsynced {selectedObjectType.toLowerCase()} will be stored as subtype 'Zendesk'
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Field Customization */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-3">
                          Recommended fields for {selectedObjectType} in Financial Services:
                        </p>
                        <div className="space-y-3">
                          {(() => {
                            const fields = selectedObjectType === 'Tickets' ? selectedTicketFields :
                                          selectedObjectType === 'Conversations' ? selectedConversationFields :
                                          selectedContactFields;
                            const setFields = selectedObjectType === 'Tickets' ? setSelectedTicketFields :
                                             selectedObjectType === 'Conversations' ? setSelectedConversationFields :
                                             setSelectedContactFields;
                            
                            return Object.entries(fields).map(([field, selected]) => {
                              const properties = getFieldProperties(field, selectedObjectType);
                              return (
                                <div key={field} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                                  <div className="flex items-center space-x-3">
                                    <input
                                      type="checkbox"
                                      checked={selected}
                                      onChange={(e) => setFields({
                                        ...fields,
                                        [field]: e.target.checked
                                      })}
                                      className="h-4 w-4 text-blue-600"
                                    />
                                    <div>
                                      <span className="text-sm font-medium text-gray-900">{field}</span>
                                      <div className="flex items-center space-x-4 mt-1">
                                        <span className="text-xs text-gray-500">Type: {properties.type}</span>
                                        <span className="text-xs text-gray-500">Visibility: {properties.visibility}</span>
                                        <span className={`text-xs ${properties.actionable ? 'text-green-600' : 'text-gray-500'}`}>
                                          {properties.actionable ? 'Actionable' : 'Read-only'}
                                        </span>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              );
                            });
                          })()}
                        </div>
                      </div>

                      {/* Stage Diagram Customization */}
                      {selectedObjectType === 'Tickets' && (
                        <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-900 mb-2">Customize Stage Diagrams</h4>
                          <p className="text-xs text-gray-600 mb-3">Define workflow stages for ticket progression</p>
                          <div className="flex items-center space-x-2">
                            <div className="px-3 py-1 bg-gray-200 rounded-full text-xs">New</div>
                            <ArrowRight className="h-3 w-3 text-gray-400" />
                            <div className="px-3 py-1 bg-blue-100 rounded-full text-xs">In Progress</div>
                            <ArrowRight className="h-3 w-3 text-gray-400" />
                            <div className="px-3 py-1 bg-green-100 rounded-full text-xs">Resolved</div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end">
                        <button
                          onClick={handleStep3Complete}
                          className="px-6 py-2 bg-black hover:bg-gray-800 text-white rounded-lg"
                        >
                          Apply Configuration
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Select channels */}
            {step3Completed && !step4Completed && (
              <div
                ref={step4Ref}
                className={`border rounded-lg p-6 mb-4 transition-colors ${
                  focusedStep === 4 ? 'border-blue-300 ring-2 ring-blue-400 bg-blue-50/40' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Circle className="h-6 w-6 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Select channels to create tickets or conversations</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Step 4</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Choose channels and configure them to get started
                    </p>

                    {/* Carousel Screen 1: Channel Selection */}
                    {step4CarouselIndex === 0 && (
                      <div className="space-y-4">
                        <p className="text-sm font-medium text-gray-700">Select the channels you want to set up:</p>
                        <div className="grid grid-cols-2 gap-4">
                          {Object.entries(selectedChannels).map(([channel, selected]) => {
                            const icons = {
                              'Email': Mail,
                              'Slack': MessageSquare,
                              'Whatsapp': Smartphone,
                              'Live Chat widget': Bot,
                              'Customer Portal': Globe2,
                              'Telephony': Phone
                            };
                            const Icon = icons[channel] || Mail;
                            
                            return (
                              <button
                                key={channel}
                                onClick={() => setSelectedChannels({
                                  ...selectedChannels,
                                  [channel]: !selected
                                })}
                                className={`p-4 border-2 rounded-lg transition-colors ${
                                  selected ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:bg-gray-50'
                                }`}
                              >
                                <div className="flex items-center space-x-3">
                                  <Icon className="h-6 w-6 text-gray-600" />
                                  <span className="font-medium text-gray-900">{channel}</span>
                                  {selected && <Check className="h-4 w-4 text-blue-600 ml-auto" />}
                                </div>
                              </button>
                            );
                          })}
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={handleChannelSelection}
                            disabled={!Object.values(selectedChannels).some(Boolean)}
                            className={`px-6 py-2 rounded-lg ${
                              Object.values(selectedChannels).some(Boolean)
                                ? 'bg-black hover:bg-gray-800 text-white'
                                : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                            }`}
                          >
                            Continue
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Carousel Screen 2: Email Provider Selection */}
                    {step4CarouselIndex === 1 && selectedChannels.Email && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <button
                            onClick={() => setStep4CarouselIndex(0)}
                            className="p-2 text-gray-400 hover:text-gray-600"
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </button>
                          <p className="text-sm font-medium text-gray-700">Select your email provider:</p>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                          <button
                            onClick={() => {
                              setSelectedEmailProvider('gmail');
                              setStep4CarouselIndex(2);
                            }}
                            className="p-6 border-2 rounded-lg hover:bg-gray-50 transition-colors border-gray-300"
                          >
                            <div className="flex flex-col items-center space-y-3">
                              <Mail className="h-8 w-8 text-red-500" />
                              <span className="font-medium text-gray-900">Gmail</span>
                            </div>
                          </button>
                          <button
                            onClick={() => {
                              setSelectedEmailProvider('other');
                              setStep4CarouselIndex(2);
                            }}
                            className="p-6 border-2 rounded-lg hover:bg-gray-50 transition-colors border-gray-300"
                          >
                            <div className="flex flex-col items-center space-y-3">
                              <Building className="h-8 w-8 text-gray-500" />
                              <span className="font-medium text-gray-900">Other Connectors</span>
                            </div>
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Carousel Screen 3: Email Setup */}
                    {step4CarouselIndex === 2 && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <button
                            onClick={() => setStep4CarouselIndex(1)}
                            className="p-2 text-gray-400 hover:text-gray-600"
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </button>
                          <h4 className="text-lg font-medium text-gray-900">Email Account Setup</h4>
                        </div>

                        {/* Forwarding Setup Info */}
                        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                          <div className="flex items-start space-x-3">
                            <Info className="h-5 w-5 text-yellow-600 mt-0.5" />
                            <div>
                              <h5 className="font-medium text-yellow-900">Email Forwarding Setup Required</h5>
                              <p className="text-sm text-yellow-700 mt-1">
                                Please set up email forwarding in your email server to forward incoming emails to DevRev for processing.
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="space-y-4">
                          <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                            <CheckCircle2 className="h-6 w-6 text-green-600" />
                            <div>
                              <h4 className="font-medium text-green-900">Email Account Connected</h4>
                              <p className="text-sm text-green-700">
                                We have connected your {selectedEmailProvider} account and set up a default email template.
                              </p>
                            </div>
                          </div>

                          <div className="bg-gray-50 rounded-lg p-4">
                            <h5 className="font-medium text-gray-900 mb-3">Default Email Template Created</h5>
                            <div className="space-y-2 text-sm text-gray-600">
                              <p>✓ Sample email signature configured</p>
                              <p>✓ Auto-reply message set up</p>
                              <p>✓ Test message sent successfully</p>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <button
                              onClick={() => setStep4CarouselIndex(3)}
                              className="px-6 py-2 bg-black hover:bg-gray-800 text-white rounded-lg"
                            >
                              Continue to Portal Setup
                            </button>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Carousel Screen 4: Portal Setup */}
                    {step4CarouselIndex === 3 && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <button
                            onClick={() => setStep4CarouselIndex(2)}
                            className="p-2 text-gray-400 hover:text-gray-600"
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </button>
                          <h4 className="text-lg font-medium text-gray-900">Customer Portal Setup</h4>
                        </div>

                        <div className="space-y-4">
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <h5 className="font-medium text-blue-900 mb-2">Portal Created Successfully</h5>
                            <p className="text-sm text-blue-700 mb-3">
                              Based on your website theme (paytm.com), we've automatically created a customer portal with airsynced knowledge base.
                            </p>
                          </div>

                          {/* Portal Preview */}
                          <div className="border border-gray-200 rounded-lg overflow-hidden">
                            <div className="bg-gradient-to-r from-blue-600 to-blue-800 text-white p-6">
                              <div className="flex items-center space-x-3 mb-4">
                                <div className="text-2xl font-bold">Paytm</div>
                                <div className="text-sm opacity-90">24x7 Help</div>
                              </div>
                              <h2 className="text-2xl font-bold mb-4">Help & Support</h2>
                              <div className="relative">
                                <Search className="absolute left-3 top-3 h-4 w-4 text-blue-200" />
                                <input
                                  type="text"
                                  placeholder="Search questions, keywords, topics"
                                  placeholder="eg. https://devrev.ai"
                                  readOnly
                                />
                              </div>
                            </div>
                            <div className="p-6 bg-white">
                              <h3 className="text-xl font-semibold text-gray-900 mb-6">Browse Support Articles</h3>
                              <div className="grid grid-cols-3 gap-6">
                                <div className="space-y-3">
                                  <div className="flex items-center space-x-3">
                                    <Shield className="h-8 w-8 text-blue-600" />
                                    <div>
                                      <h4 className="font-semibold">Privacy & Security</h4>
                                      <p className="text-sm text-gray-600">How to ensure safe and secure money transfer?</p>
                                    </div>
                                  </div>
                                  <div className="text-sm text-blue-600 space-y-1">
                                    <p>Is your identity safe while using Paytm?</p>
                                    <p className="text-blue-500">More →</p>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex items-center space-x-3">
                                    <FileText className="h-8 w-8 text-blue-600" />
                                    <div>
                                      <h4 className="font-semibold">Recharges & Bill Payments</h4>
                                      <p className="text-sm text-gray-600">Mobile recharge initiated but order still under process</p>
                                    </div>
                                  </div>
                                  <div className="text-sm text-blue-600 space-y-1">
                                    <p>Can you cancel a successful recharge? Get details</p>
                                    <p className="text-blue-500">More →</p>
                                  </div>
                                </div>
                                <div className="space-y-3">
                                  <div className="flex items-center space-x-3">
                                    <Globe className="h-8 w-8 text-blue-600" />
                                    <div>
                                      <h4 className="font-semibold">Travel</h4>
                                      <p className="text-sm text-gray-600">Want to cancel your flight ticket? Follow these steps</p>
                                    </div>
                                  </div>
                                  <div className="text-sm text-blue-600 space-y-1">
                                    <p>Want to cancel your flight ticket? Here's what you should do</p>
                                    <p className="text-blue-500">More →</p>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* Customization Options */}
                          <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <h5 className="font-medium text-gray-900 mb-3">Customize Portal</h5>
                            <div className="space-y-3">
                              <div className="flex items-center justify-between">
                                <span className="text-sm text-gray-700">Upload logo or screenshot for theme matching</span>
                                <button className="flex items-center space-x-2 px-3 py-1.5 border border-gray-300 rounded-lg hover:bg-gray-100">
                                  <Upload className="h-4 w-4" />
                                  <span className="text-sm">Upload</span>
                                </button>
                              </div>
                              <p className="text-xs text-gray-500">
                                You can further customize the portal through Portal Settings after setup completion.
                              </p>
                            </div>
                          </div>

                          <div className="flex justify-end">
                            <button
                              onClick={handleStep4Complete}
                              className="px-6 py-2 bg-black hover:bg-gray-800 text-white rounded-lg"
                            >
                              Complete Channel Setup
                            </button>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Assignment Rules */}
            {step4Completed && !step5Completed && (
              <div
                ref={step5Ref}
                className={`border rounded-lg p-6 mb-4 transition-colors ${
                  focusedStep === 5 ? 'border-blue-300 ring-2 ring-blue-400 bg-blue-50/40' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Circle className="h-6 w-6 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Add Assignment Rules for Tickets and Conversations</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Step 5</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Configure how tickets and conversations are automatically assigned to team members
                    </p>

                    <div className="space-y-4">
                      <p className="text-sm font-medium text-gray-700">Select assignment method:</p>
                      <div className="grid grid-cols-2 gap-4">
                        {[
                          { name: 'Round Robin', description: 'Distribute evenly across team members', icon: Target },
                          { name: 'Load Balancing', description: 'Assign based on current workload', icon: BarChart3 },
                          { name: 'Random Distribution', description: 'Randomly assign to available agents', icon: ZapIcon },
                          { name: 'Capacity-based Allocation', description: 'Assign based on agent capacity', icon: Users2 }
                        ].map((method) => {
                          const Icon = method.icon;
                          return (
                            <button
                              key={method.name}
                              onClick={() => setSelectedAssignmentRule(method.name)}
                              className={`p-4 border-2 rounded-lg text-left transition-colors ${
                                selectedAssignmentRule === method.name
                                  ? 'border-blue-500 bg-blue-50'
                                  : 'border-gray-300 hover:bg-gray-50'
                              }`}
                            >
                              <div className="flex items-start space-x-3">
                                <Icon className="h-6 w-6 text-gray-600 mt-1" />
                                <div>
                                  <h4 className="font-medium text-gray-900">{method.name}</h4>
                                  <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                                </div>
                              </div>
                            </button>
                          );
                        })}
                      </div>

                      {selectedAssignmentRule && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="text-sm font-medium text-green-900">
                                AI will automatically configure {selectedAssignmentRule} assignment rules
                              </p>
                              <p className="text-xs text-green-700">
                                Workflow and snap-in will be created automatically
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end">
                        <button
                          onClick={handleStep5Complete}
                          disabled={!selectedAssignmentRule}
                          className={`px-6 py-2 rounded-lg ${
                            selectedAssignmentRule
                              ? 'bg-black hover:bg-gray-800 text-white'
                              : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                          }`}
                        >
                          Configure Assignment Rules
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 6: Support Metrics */}
            {step5Completed && !step6Completed && (
              <div
                ref={step6Ref}
                className={`border rounded-lg p-6 mb-4 transition-colors ${
                  focusedStep === 6 ? 'border-blue-300 ring-2 ring-blue-400 bg-blue-50/40' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Circle className="h-6 w-6 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Setup Support Metrics</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Step 6</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Configure SLA, CSAT surveys, and ticket insights for comprehensive support metrics
                    </p>

                    {/* SLA Setup */}
                    {step6CarouselIndex === 0 && (
                      <div className="space-y-4">
                        <h4 className="text-lg font-medium text-gray-900">SLA Configuration</h4>
                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Response Time</label>
                            <select
                              value={slaSettings.responseTime}
                              onChange={(e) => setSlaSettings({...slaSettings, responseTime: e.target.value})}
                              className="w-full p-2 border border-gray-300 rounded-lg"
                            >
                              <option>1 hour</option>
                              <option>2 hours</option>
                              <option>4 hours</option>
                              <option>24 hours</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Resolution Time</label>
                            <select
                              value={slaSettings.resolutionTime}
                              onChange={(e) => setSlaSettings({...slaSettings, resolutionTime: e.target.value})}
                              className="w-full p-2 border border-gray-300 rounded-lg"
                            >
                              <option>4 hours</option>
                              <option>24 hours</option>
                              <option>48 hours</option>
                              <option>72 hours</option>
                            </select>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => setStep6CarouselIndex(1)}
                            className="px-6 py-2 bg-black hover:bg-gray-800 text-white rounded-lg"
                          >
                            Continue to CSAT
                          </button>
                        </div>
                      </div>
                    )}

                    {/* CSAT Setup */}
                    {step6CarouselIndex === 1 && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <button
                            onClick={() => setStep6CarouselIndex(0)}
                            className="p-2 text-gray-400 hover:text-gray-600"
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </button>
                          <h4 className="text-lg font-medium text-gray-900">CSAT Survey Configuration</h4>
                        </div>
                        
                        <div className="grid grid-cols-2 gap-6">
                          <div className="space-y-4">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Survey Timing</label>
                              <select
                                value={csatSettings.timing}
                                onChange={(e) => setCsatSettings({...csatSettings, timing: e.target.value})}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                              >
                                <option>After resolution</option>
                                <option>24 hours after resolution</option>
                                <option>Weekly</option>
                              </select>
                            </div>
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">Number of Questions</label>
                              <select
                                value={csatSettings.questions}
                                onChange={(e) => setCsatSettings({...csatSettings, questions: parseInt(e.target.value)})}
                                className="w-full p-2 border border-gray-300 rounded-lg"
                              >
                                <option value={1}>1 question</option>
                                <option value={3}>3 questions</option>
                                <option value={5}>5 questions</option>
                              </select>
                            </div>
                          </div>
                          <div className="border border-gray-200 rounded-lg p-4">
                            <h5 className="font-medium text-gray-900 mb-3">Survey Preview</h5>
                            <div className="space-y-3">
                              <p className="text-sm text-gray-700">How satisfied were you with our support?</p>
                              <div className="flex space-x-2">
                                {[1,2,3,4,5].map(num => (
                                  <button key={num} className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center hover:bg-yellow-100">
                                    <Star className="h-4 w-4 text-gray-400" />
                                  </button>
                                ))}
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => setStep6CarouselIndex(2)}
                            className="px-6 py-2 bg-black hover:bg-gray-800 text-white rounded-lg"
                          >
                            Continue to Insights
                          </button>
                        </div>
                      </div>
                    )}

                    {/* Ticket Insights */}
                    {step6CarouselIndex === 2 && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <button
                            onClick={() => setStep6CarouselIndex(1)}
                            className="p-2 text-gray-400 hover:text-gray-600"
                          >
                            <ArrowLeft className="h-4 w-4" />
                          </button>
                          <h4 className="text-lg font-medium text-gray-900">Ticket Insights Configuration</h4>
                        </div>
                        
                        <div className="space-y-4">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Previous Support System URL</label>
                            <input
                              type="url"
                              placeholder="https://yourcompany.zendesk.com/reports"
                              className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">Credentials (Optional)</label>
                            <input
                              type="text"
                              placeholder="API key or login credentials"
                              className="w-full p-2 border border-gray-300 rounded-lg"
                            />
                          </div>
                          <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                            <p className="text-sm text-blue-800">
                              DevRev will automatically analyze your existing reports and create corresponding custom reports in your new system.
                            </p>
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={handleStep6Complete}
                            className="px-6 py-2 bg-black hover:bg-gray-800 text-white rounded-lg"
                          >
                            Complete Metrics Setup
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 7: Custom Workflows */}
            {step6Completed && !step7Completed && (
              <div
                ref={step7Ref}
                className={`border rounded-lg p-6 mb-4 transition-colors ${
                  focusedStep === 7 ? 'border-blue-300 ring-2 ring-blue-400 bg-blue-50/40' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    <Circle className="h-6 w-6 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Custom Workflows & Use Cases</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Step 7</span>
                    </div>
                    <p className="text-gray-600 mb-4">
                      Select recommended workflows or describe a custom use case for AI to create
                    </p>

                    <div className="space-y-6">
                      {/* Recommended Workflows */}
                      <div>
                        <p className="text-sm font-medium text-gray-700 mb-3">Recommended workflows for you:</p>
                        <div className="space-y-3">
                          {Object.entries(selectedWorkflows).map(([workflow, selected]) => (
                            <div key={workflow} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg">
                              <input
                                type="checkbox"
                                checked={selected}
                                onChange={(e) => setSelectedWorkflows({
                                  ...selectedWorkflows,
                                  [workflow]: e.target.checked
                                })}
                                className="h-4 w-4 text-blue-600"
                              />
                              <div className="flex-1">
                                <span className="text-sm font-medium text-gray-900">{workflow}</span>
                                <p className="text-xs text-gray-600 mt-1">
                                  {workflow === 'Auto-ticket severity detector' && 'Automatically categorize ticket severity based on content'}
                                  {workflow === 'Spam detector' && 'Identify and filter spam tickets automatically'}
                                  {workflow === 'Auto-redact sensitive information' && 'Automatically redact PII and sensitive data from tickets'}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Custom Workflow Request */}
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Have a custom use case? Describe it here:
                        </label>
                        <textarea
                          value={customWorkflowRequest}
                          onChange={(e) => setCustomWorkflowRequest(e.target.value)}
                          placeholder="E.g., Automatically escalate tickets from VIP customers, or create follow-up tasks for unresolved issues after 48 hours..."
                          className="w-full h-24 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>

                      {(Object.values(selectedWorkflows).some(Boolean) || customWorkflowRequest.trim()) && (
                        <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <CheckCircle2 className="h-5 w-5 text-green-600" />
                            <div>
                              <p className="text-sm font-medium text-green-900">
                                AI will create workflows and snap-ins for your selected use cases
                              </p>
                              <p className="text-xs text-green-700">
                                Custom workflows will be automatically configured and deployed
                              </p>
                            </div>
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end">
                        <button
                          onClick={handleStep7Complete}
                          className="px-6 py-2 bg-black hover:bg-gray-800 text-white rounded-lg"
                        >
                          Complete Setup
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Notification */}
      {showNotification && (
        <div className="fixed top-4 right-4 bg-green-500 text-white px-6 py-3 rounded-lg shadow-lg z-50 flex items-center space-x-3">
          <CheckCircle2 className="h-5 w-5" />
          <span>
            {trailsGenerated && !step2Completed && "Trails generated successfully! Check the 'Trails' section in the navigation."}
            {step2Completed && "Data import completed! New vistas have been added to your workspace."}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="flex items-center space-x-2">
              <Settings className="h-5 w-5 text-gray-600" />
              <span className="text-sm font-medium text-gray-600">Settings</span>
            </div>
          </div>
          <button className="text-sm text-blue-600 hover:text-blue-700 font-medium">
            Contact us
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <nav className="space-y-1">
              <div className="space-y-3">
                <a 
                  href="#" 
                  onClick={() => setCurrentPage('general')}
                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <User className="h-4 w-4" />
                  <span>General</span>
                </a>
                <a 
                  href="#" 
                  onClick={() => setCurrentPage('account')}
                  className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  <User className="h-4 w-4" />
                  <span>Account</span>
                </a>
                <a 
                  href="#" 
                  onClick={() => setCurrentPage('get-started')}
                  className={`flex items-center space-x-3 px-3 py-2 text-sm rounded-lg border-l-4 ${
                    currentPage === 'get-started' 
                      ? 'text-gray-900 bg-blue-50 border-blue-500 font-medium' 
                      : 'text-gray-700 hover:bg-gray-50 border-transparent'
                  }`}
                >
                  <Play className={`h-4 w-4 ${currentPage === 'get-started' ? 'text-blue-600' : ''}`} />
                  <span>Get Started</span>
                </a>
              </div>

              {/* Product Section */}
              {trailsGenerated && (
                <div className="pt-8">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Product
                  </h3>
                  <a 
                    href="#" 
                    onClick={() => setCurrentPage('trails')}
                    className={`flex items-center space-x-3 px-3 py-2 text-sm rounded-lg ${
                      currentPage === 'trails' 
                        ? 'text-gray-900 bg-gray-100 font-medium' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <GitBranch className="h-4 w-4" />
                    <span>Trails</span>
                  </a>
                </div>
              )}

              {/* Work Section */}
              {showWorkSections && (
                <div className="pt-8">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Work
                  </h3>
                  <div className="space-y-1">
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <Ticket className="h-4 w-4" />
                      <span>Tickets</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Conversations</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Customers Section */}
              {showWorkSections && (
                <div className="pt-8">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Customers
                  </h3>
                  <div className="space-y-1">
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <UserCheck className="h-4 w-4" />
                      <span>Contacts</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <Building2 className="h-4 w-4" />
                      <span>Accounts</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Customization Section */}
              {step3Completed && (
                <div className="pt-8">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Customization
                  </h3>
                  <div className="space-y-1">
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <Sliders3 className="h-4 w-4" />
                      <span>Object Customization</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <Workflow className="h-4 w-4" />
                      <span>Stage Customization</span>
                      <span className="px-1.5 py-0.5 text-xs bg-blue-100 text-blue-800 rounded-full">BETA</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Tags</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <FileText className="h-4 w-4" />
                      <span>Templates</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Channels Section */}
              {step4Completed && (
                <div className="pt-8">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Channels
                  </h3>
                  <div className="space-y-1">
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <Mail className="h-4 w-4" />
                      <span>Email</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <MessageSquare className="h-4 w-4" />
                      <span>Slack</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <Smartphone className="h-4 w-4" />
                      <span>Whatsapp</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <Bot className="h-4 w-4" />
                      <span>Live Chat widget</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <Globe2 className="h-4 w-4" />
                      <span>Customer Portal</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <Phone className="h-4 w-4" />
                      <span>Telephony</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Workflows & Routing Section */}
              {step5Completed && (
                <div className="pt-8">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Workflows & Routing
                  </h3>
                  <div className="space-y-1">
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <Workflow className="h-4 w-4" />
                      <span>Workflows</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <Route className="h-4 w-4" />
                      <span>Routing</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Snap-ins Section */}
              {step7Completed && (
                <div className="pt-8">
                  <h3 className="px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
                    Extensions
                  </h3>
                  <div className="space-y-1">
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-3 py-2 text-sm text-gray-700 rounded-lg hover:bg-gray-50"
                    >
                      <Plug className="h-4 w-4" />
                      <span>Snap-ins</span>
                    </a>
                  </div>
                </div>
              )}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        {currentPage === 'trails' ? <TrailsPage /> : 
         setupCompleted ? <TicketsPage /> : <GetStartedPage />}
      </div>

      {/* Modals */}
      {showVideoModal && <VideoModal />}
      {showAirsyncModal && <AirsyncModal />}
      {showCustomConnectorModal && <CustomConnectorModal />}
    </div>
  );
}

export default App;