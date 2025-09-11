import React, { useEffect, useRef, useState } from 'react';
import { 
  Settings, 
  ChevronLeft, 
  User, 
  Bell, 
  Zap, 
  LifeBuoy, 
  Plug, 
  Users, 
  BookOpen,
  CheckCircle2,
  Circle,
  Play,
  ExternalLink,
  ArrowRight,
  Globe,
  Loader2,
  Search,
  Filter,
  ChevronDown,
  MoreHorizontal,
  Mail,
  Building,
  Database,
  MessageSquare,
  Ticket,
  UserCheck,
  Building2,
  Plus,
  X,
  Check,
  AlertCircle,
  Eye,
  EyeOff,
  Code,
  Download,
  GitBranch,
  Hexagon,
  Phone,
  Slack,
  MessageCircle,
  Monitor,
  Copy,
  Palette,
  Settings as SettingsIcon
} from 'lucide-react';

function App() {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [trailsGenerated, setTrailsGenerated] = useState(false);
  const [step2Completed, setStep2Completed] = useState(false);
  const [step3Completed, setStep3Completed] = useState(false);
  const [step4Completed, setStep4Completed] = useState(false);
  const [step2CarouselIndex, setStep2CarouselIndex] = useState(0);
  const [emailProvider, setEmailProvider] = useState('');
  const [showNotification, setShowNotification] = useState(false);
  const [currentPage, setCurrentPage] = useState('get-started');
  const [focusedStep, setFocusedStep] = useState<number | null>(null);
  const step2Ref = useRef<HTMLDivElement | null>(null);
  const [showChannelsModal, setShowChannelsModal] = useState(false);
  const [selectedChannels, setSelectedChannels] = useState<{[k: string]: boolean}>({
    Email: false,
    Slack: false,
    Whatsapp: false,
    'Live Chat widget': false,
    'Customer Portal': false,
    Telephony: false,
  });
  const [channelCreateMode, setChannelCreateMode] = useState<{[k: string]: 'Tickets' | 'Conversations' | 'Both'}>({
    Email: 'Both',
    'Live Chat widget': 'Both',
  });
  const step1Ref = useRef<HTMLDivElement | null>(null);
  const step3Ref = useRef<HTMLDivElement | null>(null);
  const step4Ref = useRef<HTMLDivElement | null>(null);
  
  // New state for the revamped flow
  const [selectedEmailProvider, setSelectedEmailProvider] = useState('');
  const [isGoogleSignedIn, setIsGoogleSignedIn] = useState(false);
  const [selectedImportSource, setSelectedImportSource] = useState('');
  const [showAirsyncModal, setShowAirsyncModal] = useState(false);
  const [airsyncInProgress, setAirsyncInProgress] = useState(false);
  const [airsyncCompleted, setAirsyncCompleted] = useState(false);
  const [showCustomConnectorModal, setShowCustomConnectorModal] = useState(false);
  const [connectorRequirements, setConnectorRequirements] = useState('');
  const [connectorGenerated, setConnectorGenerated] = useState(false);
  const [selectedTicketFields, setSelectedTicketFields] = useState<{[k: string]: boolean}>({
    'Payment Method': true,
    'Transaction ID': true,
    'Account Type': true,
    'KYC Status': true,
    'Issue Category': true,
    'Priority Level': true,
  });
  const [showWorkSections, setShowWorkSections] = useState(false);
  const [showCustomizationSection, setShowCustomizationSection] = useState(false);
  const [showChannelsSection, setShowChannelsSection] = useState(false);
  const [selectedObjectType, setSelectedObjectType] = useState('Tickets');
  const [copyFromAirsynced, setCopyFromAirsynced] = useState(true);

  const handleGenerateTrails = async () => {
    if (!websiteUrl) return;
    
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    setIsGenerating(false);
    setTrailsGenerated(true);
    setShowNotification(true);
    // Focus Step 2 within Get Started
    setFocusedStep(2);
    setTimeout(() => {
      if (step2Ref.current) {
        step2Ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
        step2Ref.current.focus();
      }
    }, 50);
    
    // Hide notification after 4 seconds
    setTimeout(() => {
      setShowNotification(false);
    }, 4000);
  };

  const handleGoogleSignIn = async () => {
    // Simulate Google OAuth flow
    await new Promise(resolve => setTimeout(resolve, 1500));
    setIsGoogleSignedIn(true);
    setStep2CarouselIndex(2); // Move to portal creation step
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
    
    // Simulate airsync progress
    await new Promise(resolve => setTimeout(resolve, 4000));
    setAirsyncInProgress(false);
    setAirsyncCompleted(true);
    setStep2Completed(true);
    setFocusedStep(3);
    
    // Show completion notification
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 4000);
  };

  const handleGenerateConnector = async () => {
    if (!connectorRequirements) return;
    
    // Simulate connector generation
    await new Promise(resolve => setTimeout(resolve, 2000));
    setConnectorGenerated(true);
    setStep2Completed(true);
    setShowWorkSections(true);
    setFocusedStep(3);
  };

  const handleStep3Complete = () => {
    setStep3Completed(true);
    setShowCustomizationSection(true);
    setFocusedStep(4);
  };

  const handleStep4Complete = () => {
    setStep4Completed(true);
    setShowChannelsSection(true);
  };

  const VideoModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowVideoModal(false)}>
      <div className="bg-white rounded-xl p-6 max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">What are trails?</h3>
          <button 
            onClick={() => setShowVideoModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
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
      <div className="bg-white rounded-xl p-8 max-w-5xl w-full mx-4 max-h-[85vh] overflow-y-auto" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-semibold text-gray-900">Configure {selectedImportSource} Airsync</h3>
          <button 
            onClick={() => setShowAirsyncModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        <div className="space-y-8">
          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Objects to Airsync</h4>
            <p className="text-gray-600 mb-6">
              The following objects will be airsynced from {selectedImportSource} to DevRev:
            </p>
            
            <div className="grid grid-cols-2 gap-4">
              {['Tickets', 'Users', 'Organizations', 'Articles', 'Comments', 'Attachments'].map((object) => (
                <div key={object} className="flex items-center space-x-3 p-4 border border-gray-200 rounded-lg hover:border-gray-300 transition-colors">
                  <input type="checkbox" defaultChecked className="h-4 w-4 text-blue-600 rounded" />
                  <span className="text-sm font-medium text-gray-900">{object}</span>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h4 className="text-lg font-semibold text-gray-900 mb-4">Data Mapping Preview</h4>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="grid grid-cols-2 gap-8">
                <div>
                  <h5 className="font-semibold text-gray-900 mb-4">{selectedImportSource} Fields</h5>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-700 font-mono">• ticket.subject</div>
                    <div className="text-sm text-gray-700 font-mono">• ticket.description</div>
                    <div className="text-sm text-gray-700 font-mono">• ticket.priority</div>
                    <div className="text-sm text-gray-700 font-mono">• ticket.status</div>
                    <div className="text-sm text-gray-700 font-mono">• ticket.assignee</div>
                  </div>
                </div>
                <div>
                  <h5 className="font-semibold text-gray-900 mb-4">DevRev Fields</h5>
                  <div className="space-y-3">
                    <div className="text-sm text-gray-700 font-mono">→ work.title</div>
                    <div className="text-sm text-gray-700 font-mono">→ work.body</div>
                    <div className="text-sm text-gray-700 font-mono">→ work.priority</div>
                    <div className="text-sm text-gray-700 font-mono">→ work.stage</div>
                    <div className="text-sm text-gray-700 font-mono">→ work.owned_by</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-4">
            <button 
              onClick={() => setShowAirsyncModal(false)}
              className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
            >
              Cancel
            </button>
            <button 
              onClick={handleStartAirsync}
              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
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
      <div className="bg-white rounded-xl p-8 max-w-3xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-8">
          <h3 className="text-2xl font-semibold text-gray-900">Create Custom Airsync Connector</h3>
          <button 
            onClick={() => setShowCustomConnectorModal(false)}
            className="text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {!connectorGenerated ? (
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Describe your data source and requirements
              </label>
              <textarea
                value={connectorRequirements}
                onChange={(e) => setConnectorRequirements(e.target.value)}
                placeholder="E.g., I need to sync customer data from our internal CRM system. It has REST APIs for customers, tickets, and interactions. I need to map customer.email to contact.email and ticket.subject to work.title..."
                className="w-full h-40 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors resize-none"
              />
            </div>
            <div className="flex justify-end space-x-4">
              <button 
                onClick={() => setShowCustomConnectorModal(false)}
                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors text-gray-700 font-medium"
              >
                Cancel
              </button>
              <button 
                onClick={handleGenerateConnector}
                disabled={!connectorRequirements.trim()}
                className={`px-8 py-3 rounded-lg font-medium transition-colors ${
                  connectorRequirements.trim() 
                    ? 'bg-blue-600 hover:bg-blue-700 text-white' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Generate Connector
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            <div className="flex items-center space-x-4 p-6 bg-green-50 border border-green-200 rounded-xl">
              <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0" />
              <div>
                <h4 className="font-semibold text-green-900 text-lg">Connector Generated Successfully!</h4>
                <p className="text-green-700">Your custom airsync connector has been created.</p>
              </div>
            </div>
            <div className="bg-gray-50 rounded-xl p-6">
              <div className="flex items-center space-x-4 mb-4">
                <Code className="h-6 w-6 text-gray-600" />
                <span className="font-semibold text-gray-900 text-lg">Generated Snap-in</span>
              </div>
              <p className="text-gray-600 mb-4">
                Clone the project in your code editor to review and publish as your DevRev snap-in.
              </p>
              <button className="flex items-center space-x-3 px-6 py-3 bg-gray-900 text-white rounded-lg hover:bg-gray-800 transition-colors font-medium">
                <Download className="h-5 w-5" />
                <span>Clone Project</span>
              </button>
            </div>
            <div className="flex justify-end">
              <button 
                onClick={() => setShowCustomConnectorModal(false)}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Continue Setup
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );

  const TrailsPage = () => (
    <div className="flex-1 p-6">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
        {/* Top bar */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center space-x-4">
            <h1 className="text-lg font-semibold text-gray-900">Trails</h1>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Type to search"
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 w-64 text-sm"
              />
            </div>
          </div>
          <div className="flex items-center space-x-3 text-sm text-gray-600">
            <span>Show</span>
            <button className="flex items-center space-x-2 px-3 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              <span>Owner</span>
              <ChevronDown className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Mindmap container */}
        <div className="relative h-[600px] bg-gradient-to-br from-gray-50 to-white">
          {/* Left column: Products */}
          <div className="absolute left-16 top-20 space-y-8">
            {["DevRev Studio","DevRev AgentOS","DevRevU","The Book of DevRev","DevRev Corp","DevRev Community","DevRev Apps"].map((name, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-purple-200 w-56 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-purple-100 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-purple-500 rounded" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{name}</h3>
                    <p className="text-xs text-gray-500">Sample owner +1</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Center column: Capabilities */}
          <div className="absolute left-[28rem] top-28 space-y-12">
            {["Agent Platform","Knowledge Graph","Analytics Platform","Agent and Workflow Studio","Observability, performance a..."]
              .map((name, idx) => (
              <div key={idx} className="bg-white rounded-xl p-4 shadow-sm border border-blue-200 w-56 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                    <div className="w-4 h-4 bg-blue-500 rounded" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{name}</h3>
                    <p className="text-xs text-gray-500">Owner +1</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Right column: Features */}
          <div className="absolute right-16 top-20 space-y-8">
            {["Workflows and Skills: Observa...","Agent creation and Personaliz...","Workflow Controls","Workflow Builder UX"]
              .map((name, idx) => (
              <div key={idx} className="bg-white rounded-xl p-3 shadow-sm border border-gray-200 w-64 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  <div className="w-7 h-7 bg-gray-100 rounded-lg flex items-center justify-center">
                    <div className="w-3.5 h-3.5 bg-gray-400 rounded" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-gray-900 truncate">{name}</h3>
                    <p className="text-xs text-gray-500">Owner</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Curved connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            <path d="M 320 140 C 360 140, 370 160, 400 185" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            <path d="M 320 220 C 355 220, 370 225, 400 240" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            <path d="M 320 300 C 350 300, 370 295, 400 295" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            <path d="M 320 380 C 355 380, 370 360, 400 340" stroke="#e2e8f0" strokeWidth="2" fill="none" />

            <path d="M 610 185 C 640 150, 660 150, 700 130" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            <path d="M 610 245 C 640 210, 660 205, 700 185" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            <path d="M 610 305 C 640 270, 660 260, 700 245" stroke="#e2e8f0" strokeWidth="2" fill="none" />
            <path d="M 610 365 C 640 330, 660 315, 700 305" stroke="#e2e8f0" strokeWidth="2" fill="none" />
          </svg>
        </div>
      </div>
    </div>
  );

  const GetStartedPage = () => (
    <div className="flex-1 p-8">
      <div className="max-w-6xl">
        {/* Header */}
        <div className="mb-10">
          <div className="flex items-center space-x-3 mb-3">
            <span className="text-3xl font-bold tracking-tight text-gray-900">DevRev</span>
          </div>
          <p className="text-gray-700 font-medium text-lg">Let us Setup DevRev Support for you</p>
        </div>

        {/* Support Settings Section */}
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
          <div className="px-8 py-6 border-b border-gray-200 bg-gray-50">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <h2 className="text-xl font-semibold text-gray-900">Support Settings</h2>
              </div>
              <div className="flex items-center space-x-3 text-sm text-gray-600">
                <span>{[trailsGenerated, step2Completed, step3Completed, step4Completed].filter(Boolean).length}/4 completed</span>
                <div className="w-20 bg-gray-200 rounded-full h-2.5">
                  <div className={`bg-blue-600 h-2.5 rounded-full transition-all duration-500`} style={{
                    width: `${([trailsGenerated, step2Completed, step3Completed, step4Completed].filter(Boolean).length / 4) * 100}%`
                  }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-8">
            {/* Step 1: Setup Trails - Hide when completed */}
            {!trailsGenerated && (
              <div ref={step1Ref} className="border border-gray-200 rounded-xl p-8 mb-6 hover:border-gray-300 transition-colors">
                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0 mt-1">
                    <Circle className="h-7 w-7 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">Start by setting up trails</h3>
                      <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">Step 1</span>
                    </div>
                    <p className="text-gray-600 mb-6 text-base">
                      Let's start by creating a mind-map of your product to track your support tickets to relevant product parts
                    </p>
                    
                    {/* Video Thumbnail */}
                    <div className="mb-8">
                      <div 
                        className="relative bg-gradient-to-br from-blue-50 to-purple-50 rounded-xl p-6 cursor-pointer hover:from-blue-100 hover:to-purple-100 transition-all duration-200 border border-blue-200"
                        onClick={() => setShowVideoModal(true)}
                      >
                        <div className="flex items-center space-x-5">
                          <div className="flex-shrink-0">
                            <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                              <Play className="h-10 w-10 text-white ml-1" />
                            </div>
                          </div>
                          <div>
                            <h4 className="font-semibold text-gray-900 mb-2 text-lg">What are trails?</h4>
                            <p className="text-gray-600">Learn how trails help organize your support workflow</p>
                          </div>
                          <ExternalLink className="h-5 w-5 text-gray-400 ml-auto" />
                        </div>
                      </div>
                    </div>

                    {/* Website URL Input */}
                    <div className="space-y-6">
                      <div>
                        <label htmlFor="website-url" className="block text-sm font-semibold text-gray-900 mb-3">
                          Website URL
                        </label>
                        <div className="flex space-x-4">
                          <div className="flex-1 relative">
                            <Globe className="absolute left-4 top-3.5 h-5 w-5 text-gray-400" />
                            <input
                              type="text"
                              id="website-url"
                              autoFocus
                              value={websiteUrl}
                              onChange={(e) => setWebsiteUrl(e.target.value)}
                              placeholder="https://paytm.com"
                              className="block w-full pl-12 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors text-base"
                            />
                          </div>
                          <button
                            onClick={handleGenerateTrails}
                            disabled={websiteUrl.trim().length < 1 || isGenerating}
                            className={`px-8 py-3 rounded-lg font-semibold transition-all duration-200 flex items-center space-x-3 ${
                              websiteUrl.trim().length < 1 || isGenerating
                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg hover:shadow-xl'
                            }`}
                          >
                            {isGenerating ? (
                              <>
                                <Loader2 className="h-5 w-5 animate-spin" />
                                <span>Generating...</span>
                              </>
                            ) : (
                              <>
                                <span>Auto-generate trails</span>
                                <ArrowRight className="h-5 w-5" />
                              </>
                            )}
                          </button>
                        </div>
                        <p className="text-sm text-gray-500 mt-3">
                          DevRev will analyze your website and automatically create relevant trails for your product
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 2: Import Data - Hide when completed */}
            {trailsGenerated && !step2Completed && (
              <div
                ref={step2Ref}
                tabIndex={-1}
                className={`border rounded-xl p-8 mb-6 transition-colors ${
                  focusedStep === 2 ? 'border-blue-300 ring-2 ring-blue-100 bg-blue-50/30' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0 mt-1">
                    <Circle className="h-7 w-7 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">Import Data from existing support applications</h3>
                      <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">Step 2</span>
                    </div>
                    <p className="text-gray-600 mb-6 text-base">
                      Connect your existing support tools to import tickets, customers, and historical data
                    </p>

                    {!airsyncInProgress && (
                      <div className="space-y-6">
                        <p className="text-sm font-semibold text-gray-900">Select your current support platform:</p>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { name: 'Zendesk', color: 'border-gray-300 hover:border-gray-400' },
                            { name: 'Salesforce', color: 'border-blue-300 hover:border-blue-400' },
                            { name: 'Hubspot', color: 'border-orange-300 hover:border-orange-400' },
                            { name: 'Create own airsync connector', color: 'border-purple-300 hover:border-purple-400' }
                          ].map((platform) => (
                            <button
                              key={platform.name}
                              onClick={() => handleImportSourceSelect(platform.name === 'Create own airsync connector' ? 'custom' : platform.name)}
                              className={`p-6 border-2 rounded-xl hover:bg-gray-50 transition-all duration-200 ${platform.color} ${
                                selectedImportSource === platform.name ? 'border-blue-500 bg-blue-50' : ''
                              }`}
                            >
                              <div className="text-center">
                                <span className="font-semibold text-gray-900 text-base">{platform.name}</span>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {airsyncInProgress && (
                      <div className="space-y-6">
                        <div className="flex items-center space-x-4 p-6 bg-blue-50 border border-blue-200 rounded-xl">
                          <Loader2 className="h-8 w-8 text-blue-600 animate-spin flex-shrink-0" />
                          <div>
                            <h4 className="font-semibold text-blue-900 text-lg">Airsync in Progress</h4>
                            <p className="text-blue-700">Importing data from {selectedImportSource}...</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-xl p-6">
                          <div className="flex items-center justify-between mb-3">
                            <span className="font-semibold text-gray-900">Transformation Progress</span>
                            <span className="text-gray-600 font-medium">75%</span>
                          </div>
                          <div className="w-full bg-gray-200 rounded-full h-3">
                            <div className="bg-blue-600 h-3 rounded-full w-3/4 transition-all duration-300"></div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Customize tickets and conversations - Hide when completed */}
            {step2Completed && !step3Completed && (
              <div
                ref={step3Ref}
                className={`border rounded-xl p-8 mb-6 transition-colors ${
                  focusedStep === 3 ? 'border-blue-300 ring-2 ring-blue-100 bg-blue-50/30' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0 mt-1">
                    <Circle className="h-7 w-7 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">Customize tickets and conversations</h3>
                      <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">Step 3</span>
                    </div>
                    <p className="text-gray-600 mb-6 text-base">
                      Based on your website (paytm.com), we've detected you're in the <strong>Financial Services</strong> industry. 
                      We recommend adding these fields to your tickets:
                    </p>

                    <div className="space-y-6">
                      {/* Object Type Selection */}
                      <div>
                        <p className="text-sm font-semibold text-gray-900 mb-4">Select object type to customize:</p>
                        <div className="flex space-x-3">
                          {['Tickets', 'Conversations', 'Contacts'].map((type) => (
                            <button
                              key={type}
                              onClick={() => setSelectedObjectType(type)}
                              className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                selectedObjectType === type
                                  ? 'bg-blue-600 text-white'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {type}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Copy from Airsynced Option */}
                      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                        <div className="flex items-start space-x-3">
                          <input
                            type="checkbox"
                            checked={copyFromAirsynced}
                            onChange={(e) => setCopyFromAirsynced(e.target.checked)}
                            className="h-5 w-5 text-blue-600 mt-0.5"
                          />
                          <div>
                            <h4 className="font-semibold text-blue-900 mb-2">Copy configuration from airsynced {selectedObjectType.toLowerCase()}</h4>
                            <p className="text-blue-700 text-sm">
                              Apply the same field configuration from your {selectedImportSource} {selectedObjectType.toLowerCase()} to all {selectedObjectType.toLowerCase()} subtypes in DevRev.
                            </p>
                          </div>
                        </div>
                      </div>

                      {selectedObjectType === 'Tickets' && (
                        <div>
                          <p className="text-sm font-semibold text-gray-900 mb-4">Recommended ticket fields for Financial Services:</p>
                          <div className="grid grid-cols-2 gap-4">
                            {Object.entries(selectedTicketFields).map(([field, selected]) => (
                              <label key={field} className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors">
                                <input
                                  type="checkbox"
                                  checked={selected}
                                  onChange={(e) => setSelectedTicketFields({
                                    ...selectedTicketFields,
                                    [field]: e.target.checked
                                  })}
                                  className="h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm text-gray-700 font-medium">{field}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                      )}

                      <div className="flex justify-end">
                        <button
                          onClick={handleStep3Complete}
                          className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                        >
                          Apply Configuration
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Select channels - Hide when completed */}
            {step3Completed && !step4Completed && (
              <div
                ref={step4Ref}
                className={`border rounded-xl p-8 transition-colors ${
                  focusedStep === 4 ? 'border-blue-300 ring-2 ring-blue-100 bg-blue-50/30' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-5">
                  <div className="flex-shrink-0 mt-1">
                    <Circle className="h-7 w-7 text-gray-300" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-4 mb-4">
                      <h3 className="text-xl font-semibold text-gray-900">Select channels to create tickets or conversations</h3>
                      <span className="px-3 py-1 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">Step 4</span>
                    </div>
                    <p className="text-gray-600 mb-6 text-base">
                      Choose channels and minimal configuration to get started
                    </p>

                    <div className="space-y-6">
                      {step2CarouselIndex === 0 && (
                        <div className="space-y-6">
                          <p className="text-sm font-semibold text-gray-900">Which email provider do you use?</p>
                          <div className="grid grid-cols-2 gap-6">
                            <button
                              onClick={() => {
                                setSelectedEmailProvider('gmail');
                                setStep2CarouselIndex(1);
                              }}
                              className={`p-8 border-2 rounded-xl hover:bg-gray-50 transition-all duration-200 ${
                                selectedEmailProvider === 'gmail' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              <div className="flex flex-col items-center space-y-4">
                                <div className="w-16 h-16 bg-gradient-to-r from-red-500 to-yellow-500 rounded-xl flex items-center justify-center">
                                  <Mail className="h-8 w-8 text-white" />
                                </div>
                                <span className="font-semibold text-gray-900 text-lg">Gmail</span>
                              </div>
                            </button>
                            <button
                              onClick={() => {
                                setSelectedEmailProvider('custom');
                                setStep2CarouselIndex(1);
                              }}
                              className={`p-8 border-2 rounded-xl hover:bg-gray-50 transition-all duration-200 ${
                                selectedEmailProvider === 'custom' ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'
                              }`}
                            >
                              <div className="flex flex-col items-center space-y-4">
                                <div className="w-16 h-16 bg-gradient-to-r from-orange-500 to-red-500 rounded-xl flex items-center justify-center">
                                  <Building className="h-8 w-8 text-white" />
                                </div>
                                <span className="font-semibold text-gray-900 text-lg">Custom Domain</span>
                              </div>
                            </button>
                          </div>
                        </div>
                      )}

                      {step2CarouselIndex === 1 && selectedEmailProvider === 'gmail' && !isGoogleSignedIn && (
                        <div className="space-y-6">
                          <div className="text-center p-8 border border-gray-200 rounded-xl">
                            <div className="w-20 h-20 bg-gradient-to-r from-red-500 to-yellow-500 rounded-xl flex items-center justify-center mx-auto mb-6">
                              <Mail className="h-10 w-10 text-white" />
                            </div>
                            <h4 className="text-xl font-semibold text-gray-900 mb-3">Connect your Gmail</h4>
                            <p className="text-gray-600 mb-6">Sign in with Google to connect your Gmail account</p>
                            <button
                              onClick={handleGoogleSignIn}
                              className="flex items-center space-x-4 px-8 py-4 border border-gray-300 rounded-xl hover:bg-gray-50 mx-auto transition-colors"
                            >
                              <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-yellow-500 rounded"></div>
                              <span className="font-semibold">Sign in with Google</span>
                            </button>
                          </div>
                          <div className="flex justify-between">
                            <button
                              onClick={() => setStep2CarouselIndex(0)}
                              className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 font-medium transition-colors"
                            >
                              Back
                            </button>
                          </div>
                        </div>
                      )}

                      {step2CarouselIndex === 2 && isGoogleSignedIn && (
                        <div className="space-y-6">
                          <div className="flex items-center space-x-4 p-6 bg-green-50 border border-green-200 rounded-xl">
                            <CheckCircle2 className="h-8 w-8 text-green-600 flex-shrink-0" />
                            <div>
                              <h4 className="font-semibold text-green-900 text-lg">Gmail Connected Successfully</h4>
                              <p className="text-green-700">Your Gmail account has been connected.</p>
                            </div>
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
                            <h4 className="font-semibold text-blue-900 mb-3 text-lg">Portal Created & Knowledge Base Updated</h4>
                            <p className="text-blue-700 mb-4">
                              Based on your website design (paytm.com), we've automatically created a customer portal that matches your brand. 
                              Your portal has been updated with the airsynced knowledge base from {selectedImportSource}.
                            </p>
                            <div className="bg-white rounded-xl border p-6 mb-4">
                              <div className="flex items-center space-x-3 mb-3">
                                <div className="w-6 h-6 bg-blue-600 rounded"></div>
                                <span className="font-semibold text-gray-900">Paytm Support Portal</span>
                              </div>
                              <p className="text-sm text-gray-600 mb-4">Auto-generated based on your website theme and colors</p>
                              <div className="bg-gray-50 rounded-lg p-4">
                                <div className="text-xs text-gray-500 mb-2">Portal Preview</div>
                                <div className="bg-blue-600 h-2 rounded mb-2"></div>
                                <div className="space-y-1">
                                  <div className="bg-gray-300 h-1 rounded w-3/4"></div>
                                  <div className="bg-gray-300 h-1 rounded w-1/2"></div>
                                  <div className="bg-gray-300 h-1 rounded w-2/3"></div>
                                </div>
                              </div>
                            </div>
                            <p className="text-sm text-blue-700">
                              You can customize the portal further through Portal Settings.
                            </p>
                          </div>
                          <div className="flex justify-end">
                            <button
                              onClick={handleStep4Complete}
                              className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors"
                            >
                              Complete Setup
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Completion Message */}
            {step4Completed && (
              <div className="text-center p-8 bg-green-50 border border-green-200 rounded-xl">
                <CheckCircle2 className="h-16 w-16 text-green-600 mx-auto mb-4" />
                <h3 className="text-2xl font-semibold text-green-900 mb-2">Setup Complete!</h3>
                <p className="text-green-700 text-lg">
                  Your DevRev support system is now ready. You can access all features through the navigation menu.
                </p>
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
        <div className="fixed top-6 right-6 bg-green-600 text-white px-8 py-4 rounded-xl shadow-lg z-50 flex items-center space-x-4">
          <CheckCircle2 className="h-6 w-6 flex-shrink-0" />
          <span className="font-medium">
            {trailsGenerated && !step2Completed && "Trails generated successfully! Check the 'Trails' section in the navigation."}
            {step2Completed && "Data import completed! New vistas have been added to your workspace."}
          </span>
        </div>
      )}

      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-8 py-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-5">
            <button className="text-gray-600 hover:text-gray-800 transition-colors">
              <ChevronLeft className="h-6 w-6" />
            </button>
            <div className="flex items-center space-x-3">
              <Settings className="h-6 w-6 text-gray-600" />
              <span className="font-semibold text-gray-600">Settings</span>
            </div>
          </div>
          <button className="text-blue-600 hover:text-blue-700 font-semibold transition-colors">
            Contact us
          </button>
        </div>
      </div>

      <div className="flex">
        {/* Sidebar */}
        <div className="w-72 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-8">
            <nav className="space-y-2">
              <div className="space-y-1">
                <a 
                  href="#" 
                  onClick={() => setCurrentPage('general')}
                  className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>General</span>
                </a>
                <a 
                  href="#" 
                  onClick={() => setCurrentPage('account')}
                  className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  <User className="h-5 w-5" />
                  <span>Account</span>
                </a>
                <a 
                  href="#" 
                  onClick={() => setCurrentPage('get-started')}
                  className={`flex items-center space-x-3 px-4 py-3 text-sm rounded-lg border-l-4 transition-colors ${
                    currentPage === 'get-started' 
                      ? 'text-gray-900 bg-blue-50 border-blue-500 font-semibold' 
                      : 'text-gray-700 hover:bg-gray-50 border-transparent'
                  }`}
                >
                  <Play className={`h-5 w-5 ${currentPage === 'get-started' ? 'text-blue-600' : ''}`} />
                  <span>Get Started</span>
                </a>
              </div>

              {/* Product Section */}
              {trailsGenerated && (
                <div className="pt-8">
                  <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                    Product
                  </h3>
                  <a 
                    href="#" 
                    onClick={() => setCurrentPage('trails')}
                    className={`flex items-center space-x-3 px-4 py-3 text-sm rounded-lg transition-colors ${
                      currentPage === 'trails' 
                        ? 'text-gray-900 bg-gray-100 font-semibold' 
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                  >
                    <GitBranch className="h-5 w-5" />
                    <span>Trails</span>
                  </a>
                </div>
              )}

              {/* Work Section */}
              {showWorkSections && (
                <div className="pt-8">
                  <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                    Work
                  </h3>
                  <div className="space-y-1">
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Ticket className="h-5 w-5" />
                      <span>Tickets</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <MessageSquare className="h-5 w-5" />
                      <span>Conversations</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Customers Section */}
              {showWorkSections && (
                <div className="pt-8">
                  <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                    Customers
                  </h3>
                  <div className="space-y-1">
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <UserCheck className="h-5 w-5" />
                      <span>Contacts</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Building2 className="h-5 w-5" />
                      <span>Accounts</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Customization Section */}
              {showCustomizationSection && (
                <div className="pt-8">
                  <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                    Customization
                  </h3>
                  <div className="space-y-1">
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <SettingsIcon className="h-5 w-5" />
                      <span>Commands</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Hexagon className="h-5 w-5" />
                      <span>Object Customization</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <GitBranch className="h-5 w-5" />
                      <span>Stage Customization</span>
                      <span className="px-2 py-0.5 text-xs font-semibold bg-blue-100 text-blue-800 rounded-full">BETA</span>
                    </a>
                  </div>
                </div>
              )}

              {/* Channels Section */}
              {showChannelsSection && (
                <div className="pt-8">
                  <h3 className="px-4 text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">
                    Channels
                  </h3>
                  <div className="space-y-1">
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Mail className="h-5 w-5" />
                      <span>Email</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Slack className="h-5 w-5" />
                      <span>Slack</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span>Whatsapp</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Monitor className="h-5 w-5" />
                      <span>Live Chat widget</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Globe className="h-5 w-5" />
                      <span>Customer Portal</span>
                    </a>
                    <a 
                      href="#" 
                      className="flex items-center space-x-3 px-4 py-3 text-sm text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      <Phone className="h-5 w-5" />
                      <span>Telephony</span>
                    </a>
                  </div>
                </div>
              )}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        {currentPage === 'trails' ? <TrailsPage /> : <GetStartedPage />}
      </div>

      {/* Modals */}
      {showVideoModal && <VideoModal />}
      {showAirsyncModal && <AirsyncModal />}
      {showCustomConnectorModal && <CustomConnectorModal />}
    </div>
  );
}

export default App;