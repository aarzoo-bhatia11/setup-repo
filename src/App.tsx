import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  User, 
  Play, 
  Route, 
  Ticket, 
  Zap, 
  BookOpen, 
  BarChart3, 
  Check, 
  X, 
  MessageSquare 
} from 'lucide-react';

function App() {
  const [currentPage, setCurrentPage] = useState('get-started');
  const [step1Complete, setStep1Complete] = useState(false);
  const [step2Complete, setStep2Complete] = useState(false);
  const [step3Complete, setStep3Complete] = useState(false);
  const [personalizedSetupStarted, setPersonalizedSetupStarted] = useState(false);
  const [userObjective, setUserObjective] = useState('');
  const [showZendeskModal, setShowZendeskModal] = useState(false);
  const [toasts, setToasts] = useState<Array<{id: number, message: string, type: 'success' | 'error'}>>([]);

  const addToast = (message: string, type: 'success' | 'error') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => removeToast(id), 3000);
  };

  const removeToast = (id: number) => {
    setToasts(prev => prev.filter(toast => toast.id !== id));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="flex h-screen bg-gray-50">
        {/* Sidebar */}
        <div className="w-64 bg-white shadow-lg">
          <div className="p-6">
            <h1 className="text-2xl font-bold text-gray-900">DevRev</h1>
          </div>
          
          <nav className="mt-6">
            <div className="space-y-3">
              <button
                onClick={() => setCurrentPage('account')}
                className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                  currentPage === 'account' 
                    ? 'bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <User className="w-4 h-4 mr-3" />
                <span>Account</span>
              </button>
              
              <button
                onClick={() => setCurrentPage('get-started')}
                className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                  currentPage === 'get-started' 
                    ? 'bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-600' 
                    : 'text-gray-700 hover:bg-gray-50'
                }`}
              >
                <Play className="w-4 h-4 mr-3" />
                <span>Get Started</span>
              </button>
              
              <button
                onClick={() => setCurrentPage('trails')}
                className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                  currentPage === 'trails' 
                    ? 'bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-600' 
                    : step1Complete ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-400 cursor-not-allowed'
                }`}
                disabled={!step1Complete}
              >
                <Route className="w-4 h-4 mr-3" />
                <span>Trails</span>
              </button>
              
              <button
                onClick={() => setCurrentPage('tickets')}
                className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                  currentPage === 'tickets' 
                    ? 'bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-600' 
                    : step1Complete ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-400 cursor-not-allowed'
                }`}
                disabled={!step1Complete}
              >
                <Ticket className="w-4 h-4 mr-3" />
                <span>Tickets</span>
              </button>
              
              <button
                onClick={() => setCurrentPage('all-tickets')}
                className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                  currentPage === 'all-tickets' 
                    ? 'bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-600' 
                    : step2Complete ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-400 cursor-not-allowed'
                }`}
                disabled={!step2Complete}
              >
                <Ticket className="w-4 h-4 mr-3" />
                <span>All Tickets</span>
              </button>
              
              <button
                onClick={() => setCurrentPage('airsync')}
                className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                  currentPage === 'airsync' 
                    ? 'bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-600' 
                    : step2Complete ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-400 cursor-not-allowed'
                }`}
                disabled={!step2Complete}
              >
                <Zap className="w-4 h-4 mr-3" />
                <span>AirSync</span>
              </button>
              
              <button
                onClick={() => setCurrentPage('knowledge-base')}
                className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                  currentPage === 'knowledge-base' 
                    ? 'bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-600' 
                    : step3Complete ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-400 cursor-not-allowed'
                }`}
                disabled={!step3Complete}
              >
                <BookOpen className="w-4 h-4 mr-3" />
                <span>Knowledge Base</span>
              </button>
              
              <button
                onClick={() => setCurrentPage('analytics')}
                className={`w-full flex items-center px-3 py-2 text-sm transition-colors ${
                  currentPage === 'analytics' 
                    ? 'bg-blue-50 text-blue-600 font-medium border-r-2 border-blue-600' 
                    : step3Complete ? 'text-gray-700 hover:bg-gray-50' : 'text-gray-400 cursor-not-allowed'
                }`}
                disabled={!step3Complete}
              >
                <BarChart3 className="w-4 h-4 mr-3" />
                <span>Analytics</span>
              </button>
            </div>
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Header */}
          <header className="bg-white shadow-sm border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">
                  {
                    currentPage === 'get-started' ? 'Get Started' :
                    currentPage === 'trails' ? 'Trails' :
                    currentPage === 'tickets' ? 'Tickets' :
                    currentPage === 'all-tickets' ? 'All Tickets' :
                    currentPage === 'airsync' ? 'AirSync' :
                    currentPage === 'knowledge-base' ? 'Knowledge Base' :
                    currentPage === 'analytics' ? 'Analytics' :
                    'Account'
                  }
                </h2>
              </div>
            </div>
          </header>

          {/* Content */}
          <main className="flex-1 overflow-auto p-6">
            {currentPage === 'get-started' && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  {!personalizedSetupStarted ? (
                    <div className="text-center">
                      <h1 className="text-3xl font-bold text-gray-900 mb-4">Welcome to DevRev</h1>
                      <p className="text-lg text-gray-600 mb-8">Let's create your personalized setup journey</p>
                      
                      <div className="max-w-md mx-auto">
                        <label className="block text-sm font-medium text-gray-700 mb-3 text-left">
                          What is the most important outcome you want to derive from DevRev?
                        </label>
                        <input
                          type="text"
                          value={userObjective}
                          onChange={(e) => setUserObjective(e.target.value)}
                          placeholder="e.g., Smart Routing & Auto-Assignment, Self-Service Expansion"
                          className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                        <button
                          onClick={() => {
                            if (userObjective.trim()) {
                              setPersonalizedSetupStarted(true);
                            }
                          }}
                          disabled={!userObjective.trim()}
                          className="w-full mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400 disabled:cursor-not-allowed"
                        >
                          Create My Personalized Setup Journey
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="text-center mb-8">
                        <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Personalized Setup Journey</h1>
                        <p className="text-lg text-gray-600">Focused on: <span className="font-medium text-gray-900">{userObjective}</span></p>
                        <p className="text-lg text-gray-600">Let's set up your AI-native support system in just a few steps</p>
                      </div>

                      {/* Step 1: Auto-create trails */}
                      <div className="mb-8">
                        <div className="flex items-center mb-4">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                            step1Complete ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                          }`}>
                            {step1Complete ? <Check className="w-4 h-4" /> : '1'}
                          </div>
                          <h3 className="ml-3 text-xl font-semibold text-gray-900">Auto-create trails from your website</h3>
                        </div>
                        
                        {!step1Complete ? (
                          <div className="ml-11">
                            <p className="text-gray-600 mb-4">Enter your website URL to automatically generate support trails</p>
                            <div className="flex gap-3">
                              <input
                                type="url"
                                placeholder="eg. https://devrev.ai"
                                className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                              />
                              <button
                                onClick={() => {
                                  setStep1Complete(true);
                                  addToast('Trails auto-created successfully from your website!', 'success');
                                }}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              >
                                Create Trails
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="ml-11">
                            <p className="text-green-600 font-medium">✓ Trails created successfully</p>
                          </div>
                        )}
                      </div>

                      {/* Step 2: Setup tickets */}
                      {step1Complete && (
                        <div className="mb-8">
                          <div className="flex items-center mb-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              step2Complete ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              {step2Complete ? <Check className="w-4 h-4" /> : '2'}
                            </div>
                            <h3 className="ml-3 text-xl font-semibold text-gray-900">Setup your ticket system</h3>
                          </div>
                          
                          {!step2Complete ? (
                            <div className="ml-11">
                              <p className="text-gray-600 mb-4">Configure how tickets are handled and routed</p>
                              <button
                                onClick={() => {
                                  setStep2Complete(true);
                                  addToast('Ticket system configured successfully!', 'success');
                                }}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              >
                                Configure Tickets
                              </button>
                            </div>
                          ) : (
                            <div className="ml-11">
                              <p className="text-green-600 font-medium">✓ Ticket system configured</p>
                            </div>
                          )}
                        </div>
                      )}

                      {/* Step 3: AirSync integration */}
                      {step2Complete && (
                        <div className="mb-8">
                          <div className="flex items-center mb-4">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                              step3Complete ? 'bg-green-100 text-green-600' : 'bg-blue-100 text-blue-600'
                            }`}>
                              {step3Complete ? <Check className="w-4 h-4" /> : '3'}
                            </div>
                            <h3 className="ml-3 text-xl font-semibold text-gray-900">Connect with AirSync</h3>
                          </div>
                          
                          {!step3Complete ? (
                            <div className="ml-11">
                              <p className="text-gray-600 mb-4">Integrate with your existing support tools</p>
                              <button
                                onClick={() => setShowZendeskModal(true)}
                                className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                              >
                                Connect AirSync
                              </button>
                            </div>
                          ) : (
                            <div className="ml-11">
                              <p className="text-green-600 font-medium">✓ AirSync connected successfully</p>
                            </div>
                          )}
                        </div>
                      )}

                      {step3Complete && (
                        <div className="text-center mt-8 p-6 bg-green-50 rounded-lg border border-green-200">
                          <h4 className="text-xl font-semibold text-green-800 mb-2">Setup Complete! 🎉</h4>
                          <p className="text-green-700">Your DevRev AI-native support system is ready to go.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            )}

            {currentPage === 'account' && (
              <div className="max-w-2xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Account Settings</h3>
                  <p className="text-gray-600">Manage your account preferences and settings here.</p>
                </div>
              </div>
            )}

            {currentPage === 'trails' && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Trails Configuration</h3>
                  <p className="text-gray-600 mb-6">Configure your auto-generated trails and customize their behavior.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Payment Issues Trail</h4>
                      <p className="text-sm text-gray-600 mb-3">Auto-generated from DevRev payment flows</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-600">Active</span>
                        <button className="text-sm text-blue-600 hover:text-blue-700">Configure</button>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Account Management Trail</h4>
                      <p className="text-sm text-gray-600 mb-3">Auto-generated from user account flows</p>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-green-600">Active</span>
                        <button className="text-sm text-blue-600 hover:text-blue-700">Configure</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentPage === 'tickets' && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Ticket Configuration</h3>
                  <p className="text-gray-600 mb-6">Set up how tickets are created, assigned, and managed.</p>
                  
                  <div className="space-y-6">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Auto-Assignment Rules</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">Route payment issues to billing team</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">Assign account issues to customer success</span>
                        </label>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-3">Priority Settings</h4>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                          <span className="ml-2 text-sm text-gray-700">High priority for payment failures</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                          <span className="ml-2 text-sm text-gray-700">Escalate after 24 hours</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentPage === 'all-tickets' && (
              <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <div className="p-6 border-b border-gray-200">
                    <h3 className="text-lg font-semibold text-gray-900">All Tickets</h3>
                    <p className="text-gray-600 mt-1">View and manage all support tickets</p>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Subject</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Priority</th>
                          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assignee</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#001</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Payment not processing</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">
                              Open
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">High</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Billing Team</td>
                        </tr>
                        <tr>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">#002</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Account verification issue</td>
                          <td className="px-6 py-4 whitespace-nowrap">
                            <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                              Resolved
                            </span>
                          </td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Medium</td>
                          <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Customer Success</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}

            {currentPage === 'airsync' && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">AirSync Integration</h3>
                  <p className="text-gray-600 mb-6">Connect DevRev with your existing support tools and platforms.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-6 border border-gray-200 rounded-lg text-center">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <Zap className="w-6 h-6 text-green-600" />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">Zendesk</h4>
                      <p className="text-sm text-gray-600 mb-4">Sync tickets and customer data</p>
                      <button
                        onClick={() => setShowZendeskModal(true)}
                        className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                      >
                        Connect
                      </button>
                    </div>
                    
                    <div className="p-6 border border-gray-200 rounded-lg text-center">
                      <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
                        <MessageSquare className="w-6 h-6 text-gray-400" />
                      </div>
                      <h4 className="font-medium text-gray-900 mb-2">Slack</h4>
                      <p className="text-sm text-gray-600 mb-4">Get notifications and updates</p>
                      <button
                        disabled
                        className="w-full px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                      >
                        Coming Soon
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentPage === 'knowledge-base' && (
              <div className="max-w-4xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Knowledge Base</h3>
                  <p className="text-gray-600 mb-6">Create and manage your support documentation and FAQs.</p>
                  
                  <div className="space-y-4">
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <BookOpen className="w-5 h-5 text-gray-400 mr-3" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Payment Processing Guide</h4>
                          <p className="text-sm text-gray-600">Step-by-step guide for payment issues</p>
                        </div>
                        <button className="text-sm text-blue-600 hover:text-blue-700">Edit</button>
                      </div>
                    </div>
                    
                    <div className="p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center">
                        <BookOpen className="w-5 h-5 text-gray-400 mr-3" />
                        <div className="flex-1">
                          <h4 className="font-medium text-gray-900">Account Management FAQ</h4>
                          <p className="text-sm text-gray-600">Common questions about account setup</p>
                        </div>
                        <button className="text-sm text-blue-600 hover:text-blue-700">Edit</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {currentPage === 'analytics' && (
              <div className="max-w-6xl mx-auto">
                <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Analytics & Insights</h3>
                  <p className="text-gray-600 mb-6">Track your support performance and customer satisfaction.</p>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Total Tickets</h4>
                      <p className="text-3xl font-bold text-gray-900">1,234</p>
                      <p className="text-sm text-green-600">+12% from last month</p>
                    </div>
                    
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Avg Response Time</h4>
                      <p className="text-3xl font-bold text-gray-900">2.4h</p>
                      <p className="text-sm text-green-600">-15% from last month</p>
                    </div>
                    
                    <div className="p-6 bg-gray-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-2">Customer Satisfaction</h4>
                      <p className="text-3xl font-bold text-gray-900">4.8/5</p>
                      <p className="text-sm text-green-600">+0.2 from last month</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Zendesk Modal */}
      {showZendeskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Connect Zendesk</h3>
                <button
                  onClick={() => setShowZendeskModal(false)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
              
              <p className="text-gray-600 mb-6">Choose what to sync from your Zendesk instance:</p>
              
              <div className="space-y-3 mb-6">
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Accounts</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" defaultChecked />
                  <span className="ml-2 text-sm text-gray-700">Contacts</span>
                </label>
                <label className="flex items-center">
                  <input type="checkbox" className="rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                  <span className="ml-2 text-sm text-gray-700">Historical Tickets</span>
                </label>
              </div>
              
              <div className="flex gap-3">
                <button
                  onClick={() => setShowZendeskModal(false)}
                  className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                >
                  Cancel
                </button>
                <button
                  onClick={() => {
                    setShowZendeskModal(false);
                    setStep3Complete(true);
                    addToast('AirSync connected successfully with Zendesk!', 'success');
                  }}
                  className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                >
                  Connect
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Toast Notifications */}
      <div className="fixed top-4 right-4 space-y-2 z-50">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`flex items-center justify-between p-4 rounded-lg shadow-lg ${
              toast.type === 'success' ? 'bg-green-50 text-green-800 border border-green-200' : 'bg-red-50 text-red-800 border border-red-200'
            }`}
          >
            <span className="text-sm">{toast.message}</span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-4 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;