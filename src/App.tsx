import React, { useState } from 'react';
import { Home, Users, HelpCircle, CheckCircle, ArrowRight, Globe, Zap, Shield, Clock, Diamond, ChevronLeft, ChevronRight } from 'lucide-react';

function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedNav, setSelectedNav] = useState('Support');
  const [carouselStep, setCarouselStep] = useState(1);
  const [selectedOutcome, setSelectedOutcome] = useState('');
  const [customGoal, setCustomGoal] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateTrails = async () => {
    setIsGenerating(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    setCurrentStep(2);
    setIsGenerating(false);
  };

  const outcomes = [
    { id: 'reduce-response-time', label: 'Reduce response time by 50%', icon: Clock },
    { id: 'improve-satisfaction', label: 'Increase customer satisfaction scores', icon: Shield },
    { id: 'scale-support', label: 'Scale support without hiring more agents', icon: Zap },
    { id: 'improve-resolution', label: 'Improve first-contact resolution rate', icon: CheckCircle },
    { id: 'better-visibility', label: 'Better visibility into support performance', icon: Globe }
  ];

  const renderSetupContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  {carouselStep === 1 ? 'Personalize Your Support Setup' : 'Generate Trails'}
                </h2>
                <p className="text-gray-600">
                  {carouselStep === 1 
                    ? 'Tell us about the most important outcome you want to achieve with DevRev.'
                    : 'Provide your website URL to automatically generate support trails and documentation.'
                  }
                </p>
              </div>
              <div className="flex items-center space-x-2 text-sm text-gray-500">
                <span>{carouselStep} of 2</span>
              </div>
            </div>

            {carouselStep === 1 ? (
              <div className="space-y-4">
                <div>
                  <label htmlFor="custom-goal" className="block text-sm font-medium text-gray-700 mb-2">
                    Type your goal
                  </label>
                  <input
                    type="text"
                    id="custom-goal"
                    value={customGoal}
                    onChange={(e) => setCustomGoal(e.target.value)}
                    placeholder="Enter your support goal..."
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent mb-4"
                  />
                  
                  <div className="text-center text-gray-500 text-sm mb-4">or</div>
                  
                  <label className="block text-sm font-medium text-gray-700 mb-4">
                    Select one of the below:
                  </label>
                  <div className="grid grid-cols-1 gap-3">
                    {outcomes.map((outcome) => {
                      const IconComponent = outcome.icon;
                      return (
                        <button
                          key={outcome.id}
                          onClick={() => setSelectedOutcome(outcome.id)}
                          className={`flex items-center p-4 border rounded-lg text-left transition-all ${
                            selectedOutcome === outcome.id
                              ? 'border-blue-500 bg-blue-50 text-blue-900'
                              : 'border-gray-300 hover:border-gray-400 hover:bg-gray-50'
                          }`}
                        >
                          <IconComponent className={`w-5 h-5 mr-3 ${
                            selectedOutcome === outcome.id ? 'text-blue-600' : 'text-gray-500'
                          }`} />
                          <span className="font-medium">{outcome.label}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <div>
                  <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">
                    Website URL
                  </label>
                  <input
                    type="url"
                    id="website"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    placeholder="https://your-website.com"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                </div>
                
                <button
                  onClick={handleGenerateTrails}
                  disabled={!websiteUrl || isGenerating}
                  className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
                >
                  {isGenerating ? (
                    <>
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Generating trails...</span>
                    </>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      <span>Generate Trails</span>
                    </>
                  )}
                </button>
              </div>
            )}

            {/* Carousel Navigation */}
            <div className="flex items-center justify-between pt-6 border-t border-gray-200">
              <button
                onClick={() => setCarouselStep(Math.max(1, carouselStep - 1))}
                disabled={carouselStep === 1}
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-gray-800 disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Previous</span>
              </button>
              
              <div className="flex space-x-2">
                {[1, 2].map((step) => (
                  <button
                    key={step}
                    onClick={() => setCarouselStep(step)}
                    className={`w-2 h-2 rounded-full ${
                      carouselStep === step ? 'bg-blue-600' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={() => {
                  if (carouselStep === 2) {
                    setCurrentStep(2);
                  } else {
                    setCarouselStep(Math.min(2, carouselStep + 1));
                  }
                }}
                disabled={carouselStep === 1 && !selectedOutcome && !customGoal.trim()}
                className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed"
              >
                <span>{carouselStep === 2 ? 'Continue' : 'Next'}</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Setup Your Knowledge Base</h2>
              <p className="text-gray-600">Setup your knowledge base for our customer plug to deflect most of the queries on its own without involving your support teams.</p>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <HelpCircle className="w-5 h-5 text-blue-600" />
                <span className="text-blue-800 font-medium">Knowledge Base Configuration</span>
              </div>
              <p className="text-blue-700 mt-2">We'll help you organize your existing documentation and FAQs to power intelligent responses.</p>
            </div>

            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Knowledge Sources</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="font-medium">Upload Documentation</span>
                    <span className="text-sm text-blue-600">Configure</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="font-medium">Connect Help Center</span>
                    <span className="text-sm text-blue-600">Configure</span>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-white rounded border">
                    <span className="font-medium">Import FAQs</span>
                    <span className="text-sm text-blue-600">Configure</span>
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(3)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <span>Continue to Workflow Setup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Default Workflows Setup</h2>
              <p className="text-gray-600">Here are the default workflows we have setup for you:</p>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-4">
                <h3 className="text-lg font-medium text-gray-900">Automated Workflows</h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Auto-categorization of incoming tickets</p>
                        <p className="text-sm text-gray-500">Automatically categorize and route tickets</p>
                      </div>
                    </div>
                    <span className="text-sm text-green-600 font-medium">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Auto-responses for common queries</p>
                        <p className="text-sm text-gray-500">Instant responses for frequently asked questions</p>
                      </div>
                    </div>
                    <span className="text-sm text-green-600 font-medium">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Escalation workflows for complex issues</p>
                        <p className="text-sm text-gray-500">Smart escalation based on complexity and priority</p>
                      </div>
                    </div>
                    <span className="text-sm text-green-600 font-medium">Active</span>
                  </div>
                  <div className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium">Bulk update workflows for similar tickets</p>
                        <p className="text-sm text-gray-500">Efficiently handle multiple similar requests</p>
                      </div>
                    </div>
                    <span className="text-sm text-green-600 font-medium">Active</span>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center space-x-2">
                  <Zap className="w-5 h-5 text-green-600" />
                  <span className="text-green-800 font-medium">Impact: Saves 2-3 hours per agent daily</span>
                </div>
              </div>
            </div>

            <button
              onClick={() => setCurrentStep(4)}
              className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center space-x-2"
            >
              <span>Complete Setup</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        );

      case 4:
        return (
          <div className="text-center space-y-6">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Chat Widget and Portal Setup</h2>
              <p className="text-gray-600">We have setup chat widget and portal for you.</p>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-lg font-medium text-gray-900">Customer Touchpoints</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Chat Widget</p>
                      <p className="text-sm text-gray-500">Embedded on your website for instant support</p>
                    </div>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Ready</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Customer Portal</p>
                      <p className="text-sm text-gray-500">Self-service portal for ticket management</p>
                    </div>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Ready</span>
                </div>
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-green-600" />
                    <div>
                      <p className="font-medium">Email Integration</p>
                      <p className="text-sm text-gray-500">Seamless email-to-ticket conversion</p>
                    </div>
                  </div>
                  <span className="text-sm text-green-600 font-medium">Ready</span>
                </div>
              </div>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-green-800 font-medium">Setup Complete! Your support system is ready to scale.</span>
              </div>
            </div>

            <button
              onClick={() => {
                setCurrentStep(1);
                setCarouselStep(1);
                setSelectedOutcome('');
                setCustomGoal('');
                setWebsiteUrl('');
              }}
              className="bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700"
            >
              Start Over
            </button>
          </div>
        );

      default:
        return null;
    }
  };

  const renderTrailsView = () => {
    return (
      <div className="h-full bg-white">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center space-x-4">
            <h1 className="text-xl font-semibold text-gray-900">Trails</h1>
            <div className="relative">
              <input
                type="text"
                placeholder="Type to search"
                className="pl-8 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent w-64"
              />
              <div className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400">
                <svg viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                </svg>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm text-gray-600">Show</span>
            <select className="border border-gray-300 rounded px-3 py-1 text-sm">
              <option>All</option>
            </select>
            <span className="text-sm text-gray-600">Owner</span>
            <select className="border border-gray-300 rounded px-3 py-1 text-sm">
              <option>All</option>
            </select>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-8">
          {/* Product Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <button className="flex items-center space-x-2 px-3 py-1 border border-gray-300 rounded-lg">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </button>
                <h2 className="text-lg font-semibold text-gray-900">Product</h2>
                <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M3 3a1 1 0 000 2v8a2 2 0 002 2h2.586l-1.293 1.293a1 1 0 101.414 1.414L10 15.414l2.293 2.293a1 1 0 001.414-1.414L12.414 15H15a2 2 0 002-2V5a1 1 0 100-2H3zm11.707 4.707a1 1 0 00-1.414-1.414L10 9.586 8.707 8.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                </button>
                <button className="w-6 h-6 border border-gray-300 rounded flex items-center justify-center">
                  <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Diamond className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Paytm Money</h3>
                  <p className="text-sm text-gray-500">Mohit Singh Negi</p>
                </div>
              </div>
              <div className="flex items-center space-x-3 p-3 hover:bg-gray-50 rounded-lg">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <Diamond className="w-6 h-6 text-purple-600" />
                </div>
                <div>
                  <h3 className="font-medium text-gray-900">Default Product 1</h3>
                  <p className="text-sm text-gray-500">DevRev Bot</p>
                </div>
              </div>
            </div>
          </div>

          {/* Table View Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-semibold text-gray-900">Table View</h2>
              <button className="flex items-center space-x-2 px-3 py-1 border border-gray-300 rounded-lg text-sm">
                <svg className="w-4 h-4" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
                </svg>
                <span>Stage</span>
              </button>
            </div>

            <div className="border border-gray-200 rounded-lg overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">State</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stage</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900" rowSpan={13}>Open</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Open</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Open</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Triage</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Queued</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Backlog</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Ideation</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Qualification</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Deprioritized</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Stalled</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Prioritized</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Parked With BOT</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Acknowledged</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Customer Response Received</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Re-Open</span>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">In Progress</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex items-center space-x-2">
                        <Clock className="w-4 h-4" />
                        <span>Pending</span>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    );
  };

  if (selectedNav === 'Trails') {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Top Navigation */}
        <nav className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-8">
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">D</span>
                </div>
                <span className="font-semibold text-gray-900">DevRev</span>
              </div>
              <div className="flex items-center space-x-6">
                <button 
                  onClick={() => setSelectedNav('Home')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Home
                </button>
                <button 
                  onClick={() => setSelectedNav('Team')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Team
                </button>
                <button 
                  onClick={() => setSelectedNav('Support')}
                  className="text-gray-600 hover:text-gray-900"
                >
                  Support
                </button>
                <button 
                  onClick={() => setSelectedNav('Trails')}
                  className="text-blue-600 font-medium border-b-2 border-blue-600 pb-1"
                >
                  Trails
                </button>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <button className="p-2 text-gray-400 hover:text-gray-600">
                <HelpCircle className="w-5 h-5" />
              </button>
              <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
            </div>
          </div>
        </nav>

        {renderTrailsView()}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <nav className="bg-white border-b border-gray-200 px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <span className="font-semibold text-gray-900">DevRev</span>
            </div>
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => setSelectedNav('Home')}
                className={selectedNav === 'Home' ? "text-blue-600 font-medium border-b-2 border-blue-600 pb-1" : "text-gray-600 hover:text-gray-900"}
              >
                Home
              </button>
              <button 
                onClick={() => setSelectedNav('Team')}
                className={selectedNav === 'Team' ? "text-blue-600 font-medium border-b-2 border-blue-600 pb-1" : "text-gray-600 hover:text-gray-900"}
              >
                Team
              </button>
              <button 
                onClick={() => setSelectedNav('Support')}
                className={selectedNav === 'Support' ? "text-blue-600 font-medium border-b-2 border-blue-600 pb-1" : "text-gray-600 hover:text-gray-900"}
              >
                Support
              </button>
              <button 
                onClick={() => setSelectedNav('Trails')}
                className={selectedNav === 'Trails' ? "text-blue-600 font-medium border-b-2 border-blue-600 pb-1" : "text-gray-600 hover:text-gray-900"}
              >
                Trails
              </button>
            </div>
          </div>
          <div className="flex items-center space-x-4">
            <button className="p-2 text-gray-400 hover:text-gray-600">
              <HelpCircle className="w-5 h-5" />
            </button>
            <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
          </div>
        </div>
      </nav>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-64 bg-white border-r border-gray-200 min-h-screen">
          <div className="p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">AI-Native Support Setup</h2>
            <div className="space-y-2">
              {[1, 2, 3, 4].map((step) => (
                <div key={step} className="flex items-center space-x-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                    currentStep === step 
                      ? 'bg-blue-600 text-white' 
                      : currentStep > step 
                        ? 'bg-green-600 text-white' 
                        : 'bg-gray-200 text-gray-600'
                  }`}>
                    {currentStep > step ? (
                      <CheckCircle className="w-4 h-4" />
                    ) : (
                      <span className="text-sm font-medium">{step}</span>
                    )}
                  </div>
                  <span className={`text-sm ${
                    currentStep === step ? 'text-blue-600 font-medium' : 'text-gray-600'
                  }`}>
                    {step === 1 && 'Generate Trails'}
                    {step === 2 && 'Review Content'}
                    {step === 3 && 'Configure Workflow'}
                    {step === 4 && 'Complete Setup'}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 p-8">
          <div className="max-w-2xl mx-auto">
            {renderSetupContent()}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;