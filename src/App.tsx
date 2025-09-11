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
  Download
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
              className="px-6 py-2 bg-[#3B3BFF] hover:bg-[#2F2FFF] text-white rounded-lg"
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
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Describe your data source and requirements
              </label>
              <textarea
                value={connectorRequirements}
                onChange={(e) => setConnectorRequirements(e.target.value)}
                placeholder="E.g., I need to sync customer data from our internal CRM system. It has REST APIs for customers, tickets, and interactions. I need to map customer.email to contact.email and ticket.subject to work.title..."
                className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
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
                    ? 'bg-[#3B3BFF] hover:bg-[#2F2FFF] text-white' 
                    : 'bg-gray-100 text-gray-400 cursor-not-allowed'
                }`}
              >
                Generate Connector
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
                className="px-6 py-2 bg-[#3B3BFF] hover:bg-[#2F2FFF] text-white rounded-lg"
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
    <div className="flex-1 p-4">
      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        {/* Top bar */}
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

        {/* Mindmap container */}
        <div className="relative h-[560px] bg-gray-50">
          {/* Left column: Products */}
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

          {/* Center column: Capabilities */}
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

          {/* Right column: Features */}
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

          {/* Curved connections */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none">
            {/* Smooth bezier curves with lighter stroke */}
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
                <div className="p-2 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg">
                  <LifeBuoy className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-lg font-semibold text-gray-900">Support Settings</h2>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{[trailsGenerated, step2Completed, step3Completed, step4Completed].filter(Boolean).length}/4 completed</span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className={`bg-blue-500 h-2 rounded-full transition-all duration-300`} style={{
                    width: `${([trailsGenerated, step2Completed, step3Completed, step4Completed].filter(Boolean).length / 4) * 100}%`
                  }}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Step 1: Setup Trails */}
            {!trailsGenerated && (
              <div ref={step1Ref} className="border rounded-lg p-6 mb-4 border-gray-200 hover:border-blue-300">
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
                    
                    {/* Video Thumbnail */}
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

                    {/* Website URL Input */}
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
                                : 'bg-[#3B3BFF] hover:bg-[#2F2FFF] text-white shadow-lg hover:shadow-xl'
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
            {trailsGenerated && (
              <div
                ref={step2Ref}
                tabIndex={-1}
                className={`border rounded-lg p-6 mb-4 transition-colors ${
                  focusedStep === 2 ? 'border-blue-300 ring-2 ring-blue-400 bg-blue-50/40' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {step2Completed ? (
                      <CheckCircle2 className="h-6 w-6 text-blue-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Import Data from existing support applications</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Step 2</span>
                      {step2Completed && (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Completed</span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">
                      Connect your existing support tools to import tickets, customers, and historical data
                    </p>

                    {!step2Completed && !airsyncInProgress && (
                      <div className="space-y-4">
                        <p className="text-sm font-medium text-gray-700">Select your current support platform:</p>
                        <div className="grid grid-cols-2 gap-4">
                          {[
                            { name: 'Zendesk', icon: '🎫', color: 'border-gray-300' },
                            { name: 'Salesforce', icon: '☁️', color: 'border-blue-300' },
                            { name: 'Hubspot', icon: '🧡', color: 'border-orange-300' },
                            { name: 'Create own airsync connector', icon: '⚡', color: 'border-purple-300' }
                          ].map((platform) => (
                            <button
                              key={platform.name}
                              onClick={() => handleImportSourceSelect(platform.name === 'Create own airsync connector' ? 'custom' : platform.name)}
                              className={`p-4 border-2 rounded-lg hover:bg-gray-50 transition-colors ${platform.color} ${
                                selectedImportSource === platform.name ? 'border-blue-500 bg-blue-50' : ''
                              }`}
                            >
                              <div className="flex items-center space-x-3">
                                <span className="text-2xl">{platform.icon}</span>
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

                    {step2Completed && (
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                          <CheckCircle2 className="h-6 w-6 text-green-600" />
                          <div>
                            <h4 className="font-medium text-green-900">Import Completed</h4>
                            <p className="text-sm text-green-700">
                              Successfully imported data from {selectedImportSource}. New vistas have been added to your workspace.
                            </p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 3: Customize tickets and conversations */}
            {step2Completed && (
              <div
                ref={step3Ref}
                className={`border rounded-lg p-6 mb-4 transition-colors ${
                  focusedStep === 3 ? 'border-blue-300 ring-2 ring-blue-400 bg-blue-50/40' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {step3Completed ? (
                      <CheckCircle2 className="h-6 w-6 text-blue-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Customize tickets and conversations</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Step 3</span>
                      {step3Completed && (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Completed</span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">
                      Based on your website (paytm.com), we've detected you're in the <strong>Financial Services</strong> industry. 
                      We recommend adding these fields to your tickets:
                    </p>

                    {!step3Completed && (
                      <div className="space-y-4">
                        <div>
                          <p className="text-sm font-medium text-gray-700 mb-3">Recommended ticket fields for Financial Services:</p>
                          <div className="grid grid-cols-2 gap-3">
                            {Object.entries(selectedTicketFields).map(([field, selected]) => (
                              <label key={field} className="flex items-center space-x-3">
                                <input
                                  type="checkbox"
                                  checked={selected}
                                  onChange={(e) => setSelectedTicketFields({
                                    ...selectedTicketFields,
                                    [field]: e.target.checked
                                  })}
                                  className="h-4 w-4 text-blue-600"
                                />
                                <span className="text-sm text-gray-700">{field}</span>
                              </label>
                            ))}
                          </div>
                        </div>
                        <div className="flex justify-end">
                          <button
                            onClick={() => setStep3Completed(true)}
                            className="px-6 py-2 bg-[#3B3BFF] hover:bg-[#2F2FFF] text-white rounded-lg"
                          >
                            Apply Field Configuration
                          </button>
                        </div>
                      </div>
                    )}

                    {step3Completed && (
                      <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                        <div>
                          <h4 className="font-medium text-green-900">Fields Configured</h4>
                          <p className="text-sm text-green-700">
                            Custom fields have been added to your ticket and conversation forms.
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Step 4: Select channels */}
            {step3Completed && (
              <div
                ref={step4Ref}
                className={`border rounded-lg p-6 transition-colors ${
                  focusedStep === 4 ? 'border-blue-300 ring-2 ring-blue-400 bg-blue-50/40' : 'border-gray-200'
                }`}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 mt-1">
                    {step4Completed ? (
                      <CheckCircle2 className="h-6 w-6 text-blue-500" />
                    ) : (
                      <Circle className="h-6 w-6 text-gray-300" />
                    )}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-3">
                      <h3 className="text-lg font-semibold text-gray-900">Select channels to create tickets or conversations</h3>
                      <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Step 4</span>
                      {step4Completed && (
                        <span className="px-2 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">Completed</span>
                      )}
                    </div>
                    <p className="text-gray-600 mb-4">
                      Choose channels and minimal configuration to get started
                    </p>

                    {!step4Completed && (
                      <div className="space-y-4">
                        {step2CarouselIndex === 0 && (
                          <div className="space-y-4">
                            <p className="text-sm font-medium text-gray-700">Which email provider do you use?</p>
                            <div className="grid grid-cols-2 gap-4">
                              <button
                                onClick={() => {
                                  setSelectedEmailProvider('gmail');
                                  setStep2CarouselIndex(1);
                                }}
                                className={`p-6 border-2 rounded-lg hover:bg-gray-50 transition-colors ${
                                  selectedEmailProvider === 'gmail' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                }`}
                              >
                                <div className="flex flex-col items-center space-y-3">
                                  <Mail className="h-8 w-8 text-red-500" />
                                  <span className="font-medium text-gray-900">Gmail</span>
                                </div>
                              </button>
                              <button
                                onClick={() => {
                                  setSelectedEmailProvider('custom');
                                  setStep2CarouselIndex(1);
                                }}
                                className={`p-6 border-2 rounded-lg hover:bg-gray-50 transition-colors ${
                                  selectedEmailProvider === 'custom' ? 'border-blue-500 bg-blue-50' : 'border-gray-300'
                                }`}
                              >
                                <div className="flex flex-col items-center space-y-3">
                                  <Building className="h-8 w-8 text-orange-500" />
                                  <span className="font-medium text-gray-900">Custom Domain</span>
                                </div>
                              </button>
                            </div>
                          </div>
                        )}

                        {step2CarouselIndex === 1 && selectedEmailProvider === 'gmail' && !isGoogleSignedIn && (
                          <div className="space-y-4">
                            <div className="text-center p-6 border border-gray-200 rounded-lg">
                              <Mail className="h-12 w-12 text-red-500 mx-auto mb-4" />
                              <h4 className="text-lg font-medium text-gray-900 mb-2">Connect your Gmail</h4>
                              <p className="text-gray-600 mb-4">Sign in with Google to connect your Gmail account</p>
                              <button
                                onClick={handleGoogleSignIn}
                                className="flex items-center space-x-3 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 mx-auto"
                              >
                                <div className="w-5 h-5 bg-gradient-to-r from-red-500 to-yellow-500 rounded"></div>
                                <span>Sign in with Google</span>
                              </button>
                            </div>
                            <div className="flex justify-between">
                              <button
                                onClick={() => setStep2CarouselIndex(0)}
                                className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                              >
                                Back
                              </button>
                            </div>
                          </div>
                        )}

                        {step2CarouselIndex === 2 && isGoogleSignedIn && (
                          <div className="space-y-4">
                            <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                              <CheckCircle2 className="h-6 w-6 text-green-600" />
                              <div>
                                <h4 className="font-medium text-green-900">Gmail Connected Successfully</h4>
                                <p className="text-sm text-green-700">Your Gmail account has been connected.</p>
                              </div>
                            </div>
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                              <h4 className="font-medium text-blue-900 mb-2">Portal Created</h4>
                              <p className="text-sm text-blue-700 mb-3">
                                Based on your website design (paytm.com), we've automatically created a customer portal that matches your brand.
                              </p>
                              <div className="bg-white rounded border p-3">
                                <div className="flex items-center space-x-2 mb-2">
                                  <div className="w-4 h-4 bg-blue-600 rounded"></div>
                                  <span className="text-sm font-medium">Paytm Support Portal</span>
                                </div>
                                <p className="text-xs text-gray-600">Auto-generated based on your website theme and colors</p>
                              </div>
                            </div>
                            <div className="flex justify-end">
                              <button
                                onClick={() => setStep4Completed(true)}
                                className="px-6 py-2 bg-[#3B3BFF] hover:bg-[#2F2FFF] text-white rounded-lg"
                              >
                                Complete Setup
                              </button>
                            </div>
                          </div>
                        )}
                      </div>
                    )}

                    {step4Completed && (
                      <div className="flex items-center space-x-3 p-4 bg-green-50 border border-green-200 rounded-lg">
                        <CheckCircle2 className="h-6 w-6 text-green-600" />
                        <div>
                          <h4 className="font-medium text-green-900">Channels Configured</h4>
                          <p className="text-sm text-green-700">
                            Email channel and customer portal have been set up successfully.
                          </p>
                        </div>
                      </div>
                    )}
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
                <div className="h-6"></div>
              </div>

              {/* Product Section */}
              {trailsGenerated && (
                <div className="mt-8">
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
                    <div className="w-4 h-4 bg-gray-400 rounded"></div>
                    <span>Trails</span>
                  </a>
                </div>
              )}

              {/* Work Section */}
              {showWorkSections && (
                <div className="mt-8">
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
                <div className="mt-8">
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