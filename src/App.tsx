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
  MoreHorizontal
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

  const VideoModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowVideoModal(false)}>
      <div className="bg-white rounded-lg p-4 max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">What are trails?</h3>
          <button 
            onClick={() => setShowVideoModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
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

  const ChannelsModal = () => (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowChannelsModal(false)}>
      <div className="bg-white rounded-lg p-4 max-w-5xl w-full mx-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Select channels to create tickets or conversations</h3>
          <button 
            onClick={() => setShowChannelsModal(false)}
            className="text-gray-500 hover:text-gray-700"
          >
            ×
          </button>
        </div>
        <div className="space-y-4">
          {['Email', 'Slack', 'Whatsapp', 'Live Chat widget', 'Customer Portal', 'Telephony'].map((name) => (
            <div key={name} className="flex items-center space-x-3 border border-gray-200 rounded-lg p-4">
              <input
                type="checkbox"
                className="h-4 w-4"
                checked={selectedChannels[name]}
                onChange={(e) => setSelectedChannels({ ...selectedChannels, [name]: e.target.checked })}
              />
              <span className="text-sm text-gray-800">{name}</span>
            </div>
          ))}
        </div>

        <div className="mt-6 flex justify-end space-x-3">
          <button onClick={() => setShowChannelsModal(false)} className="px-4 py-2 rounded border border-gray-300">Cancel</button>
          <button onClick={() => { setShowChannelsModal(false); setStep2Completed(true); setFocusedStep(3); }} className="px-4 py-2 rounded bg-[#3B3BFF] hover:bg-[#2F2FFF] text-white">Save & Send Test</button>
        </div>
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
                <span>{trailsGenerated ? '1' : '0'}/4 completed</span>
                <div className="w-16 bg-gray-200 rounded-full h-2">
                  <div className={`bg-blue-500 h-2 rounded-full transition-all duration-300 ${trailsGenerated ? 'w-1/4' : 'w-0'}`}></div>
                </div>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Step 1: Setup Trails (visible until generated) */}
            {!trailsGenerated && (
              <div ref={step1Ref} className={`border rounded-lg p-6 mb-4 transition-colors border-gray-200 hover:border-blue-300`}>
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
                              placeholder="https://your-website.com"
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

            {/* Step 2 and further steps */}
            <div className="space-y-4">
              {[
                { title: 'Select channels to create tickets or conversations', description: 'Choose channels and minimal configuration to get started', gate: () => trailsGenerated, complete: step2Completed, backRef: step1Ref, backLabel: 'Back to Step 1' },
                { title: 'Add assignment rules for tickets/conversations (NEW)', description: 'Round robin, load balancing, random, capacity-based. Agent auto-updates workflows.', gate: () => step2Completed, complete: step3Completed, ref: (el: HTMLDivElement) => (step3Ref.current = el), backRef: step2Ref, backLabel: 'Back to Step 2' },
                { title: 'Set up support metrics', description: 'Introduce default metrics and SLA/CSAT with quick edits', gate: () => step3Completed, complete: step4Completed, ref: (el: HTMLDivElement) => (step4Ref.current = el), backRef: step3Ref, backLabel: 'Back to Step 3' }
              ].filter((cfg) => cfg.gate()).map((step, index) => (
                <div
                  key={index}
                  ref={index === 0 ? step2Ref : (step as any).ref}
                  tabIndex={index === 0 ? -1 : undefined}
                  className={`border rounded-lg p-6 ${focusedStep === 2 && index === 0 ? 'border-blue-300 ring-2 ring-blue-400 bg-blue-50/40' : 'border-gray-200'}`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 mt-1">
                      {((step as any).complete) ? (
                        <CheckCircle2 className="h-6 w-6 text-blue-500" />
                      ) : (
                        <Circle className="h-6 w-6 text-gray-300" />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center space-x-3 mb-2">
                        <h3 className="text-lg font-medium text-gray-700">{step.title}</h3>
                        <span className="px-2 py-1 text-xs font-medium bg-gray-100 text-gray-600 rounded-full">
                          Step {index + 2}
                        </span>
                        {((step as any).complete) && (
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">Completed</span>
                        )}
                      </div>
                      <div className="text-gray-500 space-y-2">
                        <p>{step.description}</p>
                        {index === 0 && (
                          <div className="space-y-4">
                            {step2CarouselIndex === 0 && (
                              <div className="space-y-2">
                                <p className="text-sm text-gray-600">Select channels:</p>
                                <div className="grid grid-cols-2 gap-2">
                                  {['Email', 'Slack', 'Whatsapp', 'Live Chat widget', 'Customer Portal', 'Telephony'].map((name) => (
                                    <label key={name} className="flex items-center space-x-2 text-sm">
                                      <input
                                        type="checkbox"
                                        className="h-3 w-3"
                                        checked={selectedChannels[name]}
                                        onChange={(e) => setSelectedChannels({ ...selectedChannels, [name]: e.target.checked })}
                                      />
                                      <span className="text-gray-700">{name}</span>
                                    </label>
                                  ))}
                                </div>
                                <div className="flex justify-end mt-4">
                                  <button
                                    onClick={() => setStep2CarouselIndex(1)}
                                    className="px-4 py-2 bg-[#3B3BFF] hover:bg-[#2F2FFF] text-white rounded-lg flex items-center space-x-2"
                                  >
                                    <span>Next</span>
                                    <ArrowRight className="h-4 w-4" />
                                  </button>
                                </div>
                              </div>
                            )}
                            {step2CarouselIndex === 1 && (
                              <div className="space-y-4">
                                <p className="text-sm text-gray-600">
                                  Answer quick questions for computer to quick setup email and chat widget channel for you:
                                </p>
                                <div className="space-y-3">
                                  <label className="block text-sm font-medium text-gray-700">
                                    1. Which Email Provider do you use?
                                  </label>
                                  <select
                                    value={emailProvider}
                                    onChange={(e) => setEmailProvider(e.target.value)}
                                    className="w-full border border-gray-300 rounded-lg px-3 py-2"
                                  >
                                    <option value="">Select email provider</option>
                                    <option value="gmail">Gmail</option>
                                    <option value="outlook">Outlook</option>
                                    <option value="yahoo">Yahoo</option>
                                    <option value="other">Other</option>
                                  </select>
                                </div>
                                <div className="flex justify-between mt-4">
                                  <button
                                    onClick={() => setStep2CarouselIndex(0)}
                                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                  >
                                    Back
                                  </button>
                                  <button
                                    onClick={() => setStep2Completed(true)}
                                    className="px-4 py-2 bg-[#3B3BFF] hover:bg-[#2F2FFF] text-white rounded-lg"
                                  >
                                    Complete Setup
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        )}
                        {index === 1 && (
                          <ul className="list-disc pl-5 text-sm text-gray-600">
                            <li>Round robin, Load balancing, Random, Capacity-based</li>
                            <li>Agent applies rules to workflows or snap-ins automatically</li>
                          </ul>
                        )}
                        {index === 2 && (
                          <ul className="list-disc pl-5 text-sm text-gray-600">
                            <li>SLA: default metrics, default schedule; edit org schedule and conditions</li>
                            <li>CSAT: deployed with standard settings; edit anytime</li>
                            <li>i) Setup SLA metrics (NEW)  ii) Setup org schedules  iii) SLA policies</li>
                          </ul>
                        )}
                        <div className="pt-3">
                          {index === 0 && step2CarouselIndex === 0 && (
                            <button
                              className="text-sm text-blue-600 hover:text-blue-700"
                              onClick={() => {
                                // Scroll to a hidden Step 1 reference or show a modal
                                alert('Step 1 is completed. You can regenerate trails from the main page.');
                              }}
                            >
                              Back to Step 1
                            </button>
                          )}
                          {index > 0 && (step as any).backRef?.current && (
                            <button
                              className="text-sm text-blue-600 hover:text-blue-700"
                              onClick={() => (step as any).backRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })}
                            >
                              {(step as any).backLabel}
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
          <span>Trails generated successfully! Check the "Trails" section in the navigation.</span>
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
            </nav>
          </div>
        </div>

        {/* Main Content */}
        {currentPage === 'trails' ? <TrailsPage /> : <GetStartedPage />}
      </div>

      {/* Video Modal */}
      {showVideoModal && <VideoModal />}
    </div>
  );
}

export default App;