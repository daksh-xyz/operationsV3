import React, { useState } from 'react';
import { Bell, Lock, Globe, HardDrive, CreditCard, LifeBuoy, Check, Shield, Key, Smartphone, AlertTriangle, RefreshCw, Clock, Zap, FileText, User, Mail, Calendar, DollarSign, CreditCard as CreditCardIcon, Receipt, HelpCircle, MessageSquare, BookOpen, ExternalLink, Headphones, ChevronDown, ChevronRight, Activity, Server } from 'lucide-react';
const Settings = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  // State to track expanded sections for each tab
  const [expandedSections, setExpandedSections] = useState({
    notifications: {
      emailNotifications: true,
      inAppNotifications: true,
      notificationSchedule: true
    },
    security: {
      passwordManagement: true,
      twoFactorAuth: true,
      loginHistory: true,
      accountRecovery: true
    },
    integrations: {
      connectedSystems: true,
      availableIntegrations: true
    },
    storage: {
      storageUsage: true,
      dataRetention: true,
      dataBackup: true
    },
    billing: {
      currentPlan: true,
      paymentMethod: true,
      billingHistory: true,
      billingInfo: true
    },
    support: {
      contactSupport: true,
      helpResources: true
    },
    systemStatus: {
      currentStatus: true,
      statusHistory: true
    }
  });
  // Toggle section expansion
  const toggleSection = (tab, section) => {
    setExpandedSections(prev => ({
      ...prev,
      [tab]: {
        ...prev[tab],
        [section]: !prev[tab][section]
      }
    }));
  };
  return <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">
            Manage your account settings and preferences
          </p>
        </div>
      </div>
      {/* Horizontal Tabs */}
      <div className="flex flex-wrap border-b border-border mb-6 flex-shrink-0">
        <button className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 ${activeTab === 'notifications' ? 'border-[#4169e1] text-[#4169e1]' : 'border-transparent text-muted-foreground hover:text-foreground'}`} onClick={() => setActiveTab('notifications')}>
          <Bell size={16} />
          <span>Notifications</span>
        </button>
        <button className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 ${activeTab === 'security' ? 'border-[#4169e1] text-[#4169e1]' : 'border-transparent text-muted-foreground hover:text-foreground'}`} onClick={() => setActiveTab('security')}>
          <Lock size={16} />
          <span>Security</span>
        </button>
        <button className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 ${activeTab === 'integrations' ? 'border-[#4169e1] text-[#4169e1]' : 'border-transparent text-muted-foreground hover:text-foreground'}`} onClick={() => setActiveTab('integrations')}>
          <Globe size={16} />
          <span>Integrations</span>
        </button>
        <button className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 ${activeTab === 'storage' ? 'border-[#4169e1] text-[#4169e1]' : 'border-transparent text-muted-foreground hover:text-foreground'}`} onClick={() => setActiveTab('storage')}>
          <HardDrive size={16} />
          <span>Storage</span>
        </button>
        <button className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 ${activeTab === 'billing' ? 'border-[#4169e1] text-[#4169e1]' : 'border-transparent text-muted-foreground hover:text-foreground'}`} onClick={() => setActiveTab('billing')}>
          <CreditCard size={16} />
          <span>Billing</span>
        </button>
        <button className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 ${activeTab === 'support' ? 'border-[#4169e1] text-[#4169e1]' : 'border-transparent text-muted-foreground hover:text-foreground'}`} onClick={() => setActiveTab('support')}>
          <LifeBuoy size={16} />
          <span>Support</span>
        </button>
        <button className={`flex items-center gap-2 px-3 py-2 text-sm font-medium border-b-2 ${activeTab === 'systemStatus' ? 'border-[#4169e1] text-[#4169e1]' : 'border-transparent text-muted-foreground hover:text-foreground'}`} onClick={() => setActiveTab('systemStatus')}>
          <Activity size={16} />
          <span>System Status</span>
        </button>
      </div>
      {/* Tab Content with Scrollable Container */}
      <div className="flex-1 rounded-md border overflow-y-auto">
        {activeTab === 'notifications' && <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Notification Settings</h2>
            <p className="text-muted-foreground mb-6">
              Manage how you receive notifications and alerts
            </p>
            <div className="space-y-6">
              {/* Email Notifications - Collapsible Section */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('notifications', 'emailNotifications')}>
                  <h3 className="text-md font-medium mb-2">
                    Email Notifications
                  </h3>
                  {expandedSections.notifications.emailNotifications ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.notifications.emailNotifications && <div className="space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">
                          Patient Appointment Reminders
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications when patients schedule or cancel
                          appointments
                        </div>
                      </div>
                      <div className="relative inline-flex items-center">
                        <input type="checkbox" className="peer sr-only" id="email-appointments" defaultChecked />
                        <label htmlFor="email-appointments" className="relative h-5 w-9 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-[#4169e1] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300">
                          <span className="absolute inset-y-0 left-0 h-4 w-4 transform rounded-full bg-white transition peer-checked:translate-x-4 m-0.5"></span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">
                          AI Voice Agent Call Summaries
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Receive email summaries of AI voice agent interactions
                        </div>
                      </div>
                      <div className="relative inline-flex items-center">
                        <input type="checkbox" className="peer sr-only" id="email-voice-agent" defaultChecked />
                        <label htmlFor="email-voice-agent" className="relative h-5 w-9 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-[#4169e1] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300">
                          <span className="absolute inset-y-0 left-0 h-4 w-4 transform rounded-full bg-white transition peer-checked:translate-x-4 m-0.5"></span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">
                          Workflow Execution Reports
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Get notified when automated workflows complete or fail
                        </div>
                      </div>
                      <div className="relative inline-flex items-center">
                        <input type="checkbox" className="peer sr-only" id="email-workflow" />
                        <label htmlFor="email-workflow" className="relative h-5 w-9 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-[#4169e1] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300">
                          <span className="absolute inset-y-0 left-0 h-4 w-4 transform rounded-full bg-white transition peer-checked:translate-x-4 m-0.5"></span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">
                          System Updates
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Get notified about platform updates and new features
                        </div>
                      </div>
                      <div className="relative inline-flex items-center">
                        <input type="checkbox" className="peer sr-only" id="email-updates" defaultChecked />
                        <label htmlFor="email-updates" className="relative h-5 w-9 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-[#4169e1] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300">
                          <span className="absolute inset-y-0 left-0 h-4 w-4 transform rounded-full bg-white transition peer-checked:translate-x-4 m-0.5"></span>
                        </label>
                      </div>
                    </div>
                  </div>}
              </div>
              {/* In-App Notifications - Collapsible Section */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('notifications', 'inAppNotifications')}>
                  <h3 className="text-md font-medium mb-2">
                    In-App Notifications
                  </h3>
                  {expandedSections.notifications.inAppNotifications ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.notifications.inAppNotifications && <div className="space-y-4 mt-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">
                          Real-time Alerts
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Show real-time notifications within the dashboard
                        </div>
                      </div>
                      <div className="relative inline-flex items-center">
                        <input type="checkbox" className="peer sr-only" id="app-alerts" defaultChecked />
                        <label htmlFor="app-alerts" className="relative h-5 w-9 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-[#4169e1] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300">
                          <span className="absolute inset-y-0 left-0 h-4 w-4 transform rounded-full bg-white transition peer-checked:translate-x-4 m-0.5"></span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">
                          Task Assignments
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Get notified when you are assigned a new task
                        </div>
                      </div>
                      <div className="relative inline-flex items-center">
                        <input type="checkbox" className="peer sr-only" id="app-tasks" defaultChecked />
                        <label htmlFor="app-tasks" className="relative h-5 w-9 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-[#4169e1] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300">
                          <span className="absolute inset-y-0 left-0 h-4 w-4 transform rounded-full bg-white transition peer-checked:translate-x-4 m-0.5"></span>
                        </label>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">Sound Alerts</div>
                        <div className="text-sm text-muted-foreground">
                          Play sound when receiving important notifications
                        </div>
                      </div>
                      <div className="relative inline-flex items-center">
                        <input type="checkbox" className="peer sr-only" id="app-sound" />
                        <label htmlFor="app-sound" className="relative h-5 w-9 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-[#4169e1] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300">
                          <span className="absolute inset-y-0 left-0 h-4 w-4 transform rounded-full bg-white transition peer-checked:translate-x-4 m-0.5"></span>
                        </label>
                      </div>
                    </div>
                  </div>}
              </div>
              {/* Notification Schedule - Collapsible Section */}
              <div>
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('notifications', 'notificationSchedule')}>
                  <h3 className="text-md font-medium mb-2">
                    Notification Schedule
                  </h3>
                  {expandedSections.notifications.notificationSchedule ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.notifications.notificationSchedule && <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Quiet Hours
                      </label>
                      <div className="text-sm text-muted-foreground mb-2">
                        Set a time range when you don't want to receive
                        notifications
                      </div>
                      <div className="flex items-center gap-3">
                        <select className="h-9 rounded-md border border-input bg-background px-3 text-sm">
                          <option>9:00 PM</option>
                          <option>10:00 PM</option>
                          <option>11:00 PM</option>
                          <option>12:00 AM</option>
                        </select>
                        <span>to</span>
                        <select className="h-9 rounded-md border border-input bg-background px-3 text-sm">
                          <option>6:00 AM</option>
                          <option>7:00 AM</option>
                          <option>8:00 AM</option>
                          <option>9:00 AM</option>
                        </select>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-medium text-sm">
                          Weekend Notifications
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Receive notifications on weekends
                        </div>
                      </div>
                      <div className="relative inline-flex items-center">
                        <input type="checkbox" className="peer sr-only" id="weekend-notifs" />
                        <label htmlFor="weekend-notifs" className="relative h-5 w-9 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-[#4169e1] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300">
                          <span className="absolute inset-y-0 left-0 h-4 w-4 transform rounded-full bg-white transition peer-checked:translate-x-4 m-0.5"></span>
                        </label>
                      </div>
                    </div>
                  </div>}
              </div>
              <div className="pt-4">
                <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc]">
                  Save Notification Settings
                </button>
              </div>
            </div>
          </div>}
        {activeTab === 'security' && <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Security Settings</h2>
            <p className="text-muted-foreground mb-6">
              Manage your account security and access controls
            </p>
            <div className="space-y-6">
              {/* Password Management - Collapsible Section */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('security', 'passwordManagement')}>
                  <h3 className="text-md font-medium mb-2">
                    Password Management
                  </h3>
                  {expandedSections.security.passwordManagement ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.security.passwordManagement && <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Current Password
                      </label>
                      <input type="password" className="w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        New Password
                      </label>
                      <input type="password" className="w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="••••••••" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Confirm New Password
                      </label>
                      <input type="password" className="w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="••••••••" />
                    </div>
                    <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc]">
                      <Key size={16} className="mr-2" />
                      Change Password
                    </button>
                  </div>}
              </div>
              {/* Two-Factor Authentication - Collapsible Section */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('security', 'twoFactorAuth')}>
                  <h3 className="text-md font-medium mb-2">
                    Two-Factor Authentication
                  </h3>
                  {expandedSections.security.twoFactorAuth ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.security.twoFactorAuth && <div className="space-y-4 mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-medium text-sm">
                          Enable Two-Factor Authentication
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Add an extra layer of security to your account
                        </div>
                      </div>
                      <div className="relative inline-flex items-center">
                        <input type="checkbox" className="peer sr-only" id="enable-2fa" />
                        <label htmlFor="enable-2fa" className="relative h-5 w-9 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-[#4169e1] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300">
                          <span className="absolute inset-y-0 left-0 h-4 w-4 transform rounded-full bg-white transition peer-checked:translate-x-4 m-0.5"></span>
                        </label>
                      </div>
                    </div>
                    <div className="bg-accent/30 p-4 rounded-md mb-4">
                      <div className="flex items-start gap-3">
                        <Shield className="h-5 w-5 text-[#4169e1] mt-0.5" />
                        <div>
                          <p className="text-sm font-medium">
                            Two-factor authentication is not enabled
                          </p>
                          <p className="text-sm text-muted-foreground mt-1">
                            Enable two-factor authentication for enhanced
                            security. We recommend using an authenticator app.
                          </p>
                        </div>
                      </div>
                    </div>
                    <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium">
                      <Smartphone size={16} className="mr-2" />
                      Set Up Authenticator App
                    </button>
                  </div>}
              </div>
              {/* Login History - Collapsible Section */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('security', 'loginHistory')}>
                  <h3 className="text-md font-medium mb-2">Login History</h3>
                  {expandedSections.security.loginHistory ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.security.loginHistory && <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between p-3 bg-accent/30 rounded-md">
                      <div>
                        <div className="font-medium text-sm">
                          Current Session
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Chrome on Windows • Miami, FL • Just now
                        </div>
                      </div>
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                        Active
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-md">
                      <div>
                        <div className="text-sm">Safari on macOS</div>
                        <div className="text-sm text-muted-foreground">
                          New York, NY • Yesterday, 3:24 PM
                        </div>
                      </div>
                      <button className="text-sm text-[#4169e1]">
                        Sign Out
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 rounded-md">
                      <div>
                        <div className="text-sm">Chrome on Android</div>
                        <div className="text-sm text-muted-foreground">
                          Chicago, IL • Jan 15, 2023, 10:42 AM
                        </div>
                      </div>
                      <button className="text-sm text-[#4169e1]">
                        Sign Out
                      </button>
                    </div>
                    <button className="mt-4 inline-flex items-center justify-center rounded-md border border-destructive bg-destructive/10 px-4 py-2 text-sm font-medium text-destructive hover:bg-destructive/20">
                      <AlertTriangle size={16} className="mr-2" />
                      Sign Out All Other Devices
                    </button>
                  </div>}
              </div>
              {/* Account Recovery - Collapsible Section */}
              <div>
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('security', 'accountRecovery')}>
                  <h3 className="text-md font-medium mb-2">Account Recovery</h3>
                  {expandedSections.security.accountRecovery ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.security.accountRecovery && <div className="mt-4">
                    <label className="block text-sm font-medium mb-1">
                      Recovery Email
                    </label>
                    <div className="flex items-center gap-2 max-w-md">
                      <input type="email" className="flex-1 rounded-md border border-input bg-background px-3 py-2 text-sm" value="backup.email@novocuris.com" />
                      <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc]">
                        Update
                      </button>
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      This email will be used to recover your account if you
                      lose access
                    </p>
                  </div>}
              </div>
              <div className="pt-4">
                <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc]">
                  Save Security Settings
                </button>
              </div>
            </div>
          </div>}
        {activeTab === 'integrations' && <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Integrations</h2>
            <p className="text-muted-foreground mb-6">
              Connect your Maya AI Dashboard with other healthcare systems and
              services
            </p>
            <div className="space-y-6">
              {/* Connected Systems - Collapsible Section */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('integrations', 'connectedSystems')}>
                  <h3 className="text-md font-medium mb-2">
                    Connected Systems
                  </h3>
                  {expandedSections.integrations.connectedSystems ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.integrations.connectedSystems && <div className="space-y-4 mt-4">
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                          <img src="/Epic_EHR.webp" alt="Epic Systems" className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="font-medium">Epic EHR</div>
                          <div className="text-sm text-muted-foreground">
                            Connected on Jan 15, 2023
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check size={12} />
                          Connected
                        </div>
                        <button className="text-sm text-[#4169e1]">
                          Configure
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                          <img src="https://www.salesforce.com/content/dam/web/en_us/www/images/home/logo-salesforce.svg" alt="Salesforce" className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="font-medium">
                            Salesforce Health Cloud
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Connected on Feb 3, 2023
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check size={12} />
                          Connected
                        </div>
                        <button className="text-sm text-[#4169e1]">
                          Configure
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between p-4 border rounded-md">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                          <img src="/Screenshot_2025-09-01_at_16.13.29.png" alt="Twilio" className="h-6 w-6" />
                        </div>
                        <div>
                          <div className="font-medium">Twilio</div>
                          <div className="text-sm text-muted-foreground">
                            Connected on Mar 22, 2023
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                          <Check size={12} />
                          Connected
                        </div>
                        <button className="text-sm text-[#4169e1]">
                          Configure
                        </button>
                      </div>
                    </div>
                  </div>}
              </div>
              {/* Available Integrations - Collapsible Section */}
              <div>
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('integrations', 'availableIntegrations')}>
                  <h3 className="text-md font-medium mb-2">
                    Available Integrations
                  </h3>
                  {expandedSections.integrations.availableIntegrations ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.integrations.availableIntegrations && <div className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a5/Google_Calendar_icon_%282020%29.svg/2048px-Google_Calendar_icon_%282020%29.svg.png" alt="Google Calendar" className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="font-medium">Google Calendar</div>
                            <div className="text-sm text-muted-foreground">
                              Sync appointments with Google Calendar
                            </div>
                          </div>
                        </div>
                        <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm font-medium">
                          Connect
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d5/Slack_icon_2019.svg/2048px-Slack_icon_2019.svg.png" alt="Slack" className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="font-medium">Slack</div>
                            <div className="text-sm text-muted-foreground">
                              Get notifications in your Slack workspace
                            </div>
                          </div>
                        </div>
                        <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm font-medium">
                          Connect
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/9/9b/Zoom_logo.png/640px-Zoom_logo.png" alt="Zoom" className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="font-medium">Zoom</div>
                            <div className="text-sm text-muted-foreground">
                              Create and manage telehealth meetings
                            </div>
                          </div>
                        </div>
                        <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm font-medium">
                          Connect
                        </button>
                      </div>
                      <div className="flex items-center justify-between p-4 border rounded-md">
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 bg-gray-100 rounded-md flex items-center justify-center">
                            <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Dropbox_Icon.svg/2202px-Dropbox_Icon.svg.png" alt="Dropbox" className="h-6 w-6" />
                          </div>
                          <div>
                            <div className="font-medium">Dropbox</div>
                            <div className="text-sm text-muted-foreground">
                              Store and share patient documents
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full flex items-center gap-1">
                            <Check size={12} />
                            Connected
                          </div>
                          <button className="text-sm text-[#4169e1]">
                            Configure
                          </button>
                        </div>
                      </div>
                    </div>
                    <button className="mt-4 inline-flex items-center justify-center rounded-md bg-[#4169e1] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc]">
                      Browse Integration Marketplace
                    </button>
                  </div>}
              </div>
            </div>
          </div>}
        {activeTab === 'storage' && <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Storage Management</h2>
            <p className="text-muted-foreground mb-6">
              Manage your data storage and retention settings
            </p>
            <div className="space-y-6">
              {/* Storage Usage - Collapsible Section */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('storage', 'storageUsage')}>
                  <h3 className="text-md font-medium mb-2">Storage Usage</h3>
                  {expandedSections.storage.storageUsage ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.storage.storageUsage && <div className="mt-4">
                    <div className="bg-accent/30 p-4 rounded-md mb-4">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          Total Storage Used
                        </span>
                        <span className="text-sm font-medium">
                          3.2 GB of 10 GB
                        </span>
                      </div>
                      <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                        <div className="h-full bg-[#4169e1] rounded-full" style={{
                    width: '32%'
                  }}></div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <FileText size={16} className="text-blue-500" />
                          <span className="text-sm">Patient Documents</span>
                        </div>
                        <div className="text-sm">1.8 GB</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <MessageSquare size={16} className="text-green-500" />
                          <span className="text-sm">Voice Call Recordings</span>
                        </div>
                        <div className="text-sm">0.9 GB</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <RefreshCw size={16} className="text-purple-500" />
                          <span className="text-sm">Workflow Logs</span>
                        </div>
                        <div className="text-sm">0.3 GB</div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Mail size={16} className="text-orange-500" />
                          <span className="text-sm">Message Attachments</span>
                        </div>
                        <div className="text-sm">0.2 GB</div>
                      </div>
                    </div>
                    <button className="mt-4 inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium">
                      Upgrade Storage Plan
                    </button>
                  </div>}
              </div>
              {/* Data Retention - Collapsible Section */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('storage', 'dataRetention')}>
                  <h3 className="text-md font-medium mb-2">
                    Data Retention Policy
                  </h3>
                  {expandedSections.storage.dataRetention ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.storage.dataRetention && <div className="space-y-4 mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Voice Call Recordings
                      </label>
                      <select className="w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Keep for 90 days</option>
                        <option>Keep for 180 days</option>
                        <option>Keep for 1 year</option>
                        <option>Keep indefinitely</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Workflow Execution Logs
                      </label>
                      <select className="w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Keep for 30 days</option>
                        <option>Keep for 90 days</option>
                        <option>Keep for 180 days</option>
                        <option>Keep for 1 year</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        AI Analysis Data
                      </label>
                      <select className="w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm">
                        <option>Keep for 90 days</option>
                        <option>Keep for 180 days</option>
                        <option>Keep for 1 year</option>
                        <option>Keep indefinitely</option>
                      </select>
                    </div>
                  </div>}
              </div>
              {/* Data Backup - Collapsible Section */}
              <div>
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('storage', 'dataBackup')}>
                  <h3 className="text-md font-medium mb-2">Data Backup</h3>
                  {expandedSections.storage.dataBackup ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.storage.dataBackup && <div className="mt-4">
                    <div className="flex items-center justify-between mb-4">
                      <div>
                        <div className="font-medium text-sm">
                          Automatic Backups
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Schedule regular backups of your data
                        </div>
                      </div>
                      <div className="relative inline-flex items-center">
                        <input type="checkbox" className="peer sr-only" id="auto-backup" defaultChecked />
                        <label htmlFor="auto-backup" className="relative h-5 w-9 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-[#4169e1] peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300">
                          <span className="absolute inset-y-0 left-0 h-4 w-4 transform rounded-full bg-white transition peer-checked:translate-x-4 m-0.5"></span>
                        </label>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Backup Frequency
                        </label>
                        <select className="w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option>Daily</option>
                          <option>Weekly</option>
                          <option>Monthly</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-1">
                          Backup Time
                        </label>
                        <select className="w-full max-w-md rounded-md border border-input bg-background px-3 py-2 text-sm">
                          <option>12:00 AM (Midnight)</option>
                          <option>3:00 AM</option>
                          <option>6:00 AM</option>
                        </select>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc]">
                          <Clock size={16} className="mr-2" />
                          Schedule Backup
                        </button>
                        <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium">
                          <Zap size={16} className="mr-2" />
                          Backup Now
                        </button>
                      </div>
                    </div>
                  </div>}
              </div>
              <div className="pt-4">
                <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc]">
                  Save Storage Settings
                </button>
              </div>
            </div>
          </div>}
        {activeTab === 'billing' && <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Billing & Subscription</h2>
            <p className="text-muted-foreground mb-6">
              Manage your subscription plan and billing information
            </p>
            <div className="space-y-6">
              {/* Current Plan - Collapsible Section */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('billing', 'currentPlan')}>
                  <h3 className="text-md font-medium mb-2">Current Plan</h3>
                  {expandedSections.billing.currentPlan ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.billing.currentPlan && <div className="mt-4">
                    <div className="bg-accent/30 p-4 rounded-md mb-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="text-lg font-medium">
                            Healthcare Enterprise Plan
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Billed annually • Renews on Jan 15, 2024
                          </div>
                        </div>
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Active
                        </div>
                      </div>
                      <div className="mt-4 grid grid-cols-3 gap-4">
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Users
                          </div>
                          <div className="text-lg font-medium">25 / 50</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Storage
                          </div>
                          <div className="text-lg font-medium">10 GB</div>
                        </div>
                        <div>
                          <div className="text-sm text-muted-foreground">
                            Voice Agent Minutes
                          </div>
                          <div className="text-lg font-medium">
                            5,000 / month
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc]">
                        Upgrade Plan
                      </button>
                      <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium">
                        View Plan Details
                      </button>
                    </div>
                  </div>}
              </div>
              {/* Payment Method - Collapsible Section */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('billing', 'paymentMethod')}>
                  <h3 className="text-md font-medium mb-2">Payment Method</h3>
                  {expandedSections.billing.paymentMethod ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.billing.paymentMethod && <div className="mt-4">
                    <div className="flex items-center justify-between p-4 border rounded-md mb-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 bg-blue-100 rounded-md flex items-center justify-center">
                          <CreditCardIcon size={20} className="text-blue-600" />
                        </div>
                        <div>
                          <div className="font-medium">Visa ending in 4242</div>
                          <div className="text-sm text-muted-foreground">
                            Expires 09/2025
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button className="text-sm text-[#4169e1]">Edit</button>
                        <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full">
                          Default
                        </div>
                      </div>
                    </div>
                    <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium">
                      <CreditCardIcon size={16} className="mr-2" />
                      Add Payment Method
                    </button>
                  </div>}
              </div>
              {/* Billing History - Collapsible Section */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('billing', 'billingHistory')}>
                  <h3 className="text-md font-medium mb-2">Billing History</h3>
                  {expandedSections.billing.billingHistory ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.billing.billingHistory && <div className="mt-4">
                    <div className="rounded-md border overflow-hidden">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b bg-muted/50">
                            <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">
                              Date
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">
                              Description
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">
                              Amount
                            </th>
                            <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">
                              Status
                            </th>
                            <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">
                              Receipt
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y">
                          <tr className="bg-card">
                            <td className="py-3 px-4 text-sm">Jan 15, 2023</td>
                            <td className="py-3 px-4 text-sm">
                              Healthcare Enterprise Plan (Annual)
                            </td>
                            <td className="py-3 px-4 text-sm">$9,999.00</td>
                            <td className="py-3 px-4">
                              <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full inline-block">
                                Paid
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button className="text-sm text-[#4169e1]">
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr className="bg-card">
                            <td className="py-3 px-4 text-sm">Dec 5, 2022</td>
                            <td className="py-3 px-4 text-sm">
                              Voice Agent Minutes (Add-on)
                            </td>
                            <td className="py-3 px-4 text-sm">$499.00</td>
                            <td className="py-3 px-4">
                              <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full inline-block">
                                Paid
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button className="text-sm text-[#4169e1]">
                                Download
                              </button>
                            </td>
                          </tr>
                          <tr className="bg-card">
                            <td className="py-3 px-4 text-sm">Jan 15, 2022</td>
                            <td className="py-3 px-4 text-sm">
                              Healthcare Enterprise Plan (Annual)
                            </td>
                            <td className="py-3 px-4 text-sm">$8,999.00</td>
                            <td className="py-3 px-4">
                              <div className="bg-green-100 text-green-800 text-xs px-2 py-0.5 rounded-full inline-block">
                                Paid
                              </div>
                            </td>
                            <td className="py-3 px-4 text-right">
                              <button className="text-sm text-[#4169e1]">
                                Download
                              </button>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>}
              </div>
              {/* Billing Information - Collapsible Section */}
              <div>
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('billing', 'billingInfo')}>
                  <h3 className="text-md font-medium mb-2">
                    Billing Information
                  </h3>
                  {expandedSections.billing.billingInfo ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.billing.billingInfo && <div className="space-y-4 max-w-md mt-4">
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Organization Name
                      </label>
                      <input type="text" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value="Novocuris Medical Center" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Billing Email
                      </label>
                      <input type="email" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value="billing@novocuris.com" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Billing Address
                      </label>
                      <textarea className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm min-h-[80px]">
                        123 Healthcare Ave, Suite 500 Miami, FL 33101 United
                        States
                      </textarea>
                    </div>
                    <div>
                      <label className="block text-sm font-medium mb-1">
                        Tax ID / VAT Number
                      </label>
                      <input type="text" className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" value="US123456789" />
                    </div>
                    <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc]">
                      <DollarSign size={16} className="mr-2" />
                      Update Billing Information
                    </button>
                  </div>}
              </div>
              <div className="pt-4">
                <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc]">
                  Save Billing Settings
                </button>
              </div>
            </div>
          </div>}
        {activeTab === 'support' && <div className="p-6">
            <h2 className="text-lg font-medium mb-4">Support & Help</h2>
            <p className="text-muted-foreground mb-6">
              Get help with your Maya AI Dashboard and access support resources
            </p>
            <div className="space-y-6">
              {/* Contact Support - Collapsible Section */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('support', 'contactSupport')}>
                  <h3 className="text-md font-medium mb-2">Contact Support</h3>
                  {expandedSections.support.contactSupport ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.support.contactSupport && <div className="mt-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                      <div className="p-4 border rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <MessageSquare size={18} className="text-[#4169e1]" />
                          <h4 className="font-medium">Live Chat</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Chat with our support team in real-time
                        </p>
                        <div className="text-xs text-green-600 mb-2">
                          Available now • Response time: ~2 minutes
                        </div>
                        <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-3 py-1 text-xs font-medium text-white hover:bg-[#3a5ecc]">
                          Start Chat
                        </button>
                      </div>
                      <div className="p-4 border rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Mail size={18} className="text-[#4169e1]" />
                          <h4 className="font-medium">Email Support</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Send us an email and we'll respond within 24 hours
                        </p>
                        <div className="text-xs mb-2">
                          support@novocuris.com
                        </div>
                        <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-3 py-1 text-xs font-medium text-white hover:bg-[#3a5ecc]">
                          Send Email
                        </button>
                      </div>
                      <div className="p-4 border rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Headphones size={18} className="text-[#4169e1]" />
                          <h4 className="font-medium">Phone Support</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Speak directly with a support specialist
                        </p>
                        <div className="text-xs mb-2">Mon-Fri, 9am-6pm EST</div>
                        <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-3 py-1 text-xs font-medium text-white hover:bg-[#3a5ecc]">
                          Call Support
                        </button>
                      </div>
                      <div className="p-4 border rounded-md">
                        <div className="flex items-center gap-2 mb-2">
                          <Calendar size={18} className="text-[#4169e1]" />
                          <h4 className="font-medium">Schedule Training</h4>
                        </div>
                        <p className="text-sm text-muted-foreground mb-3">
                          Book a personalized training session
                        </p>
                        <div className="text-xs mb-2">
                          30-minute or 1-hour sessions available
                        </div>
                        <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-3 py-1 text-xs font-medium text-white hover:bg-[#3a5ecc]">
                          Schedule
                        </button>
                      </div>
                    </div>
                  </div>}
              </div>
              {/* Help Resources - Collapsible Section */}
              <div>
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('support', 'helpResources')}>
                  <h3 className="text-md font-medium mb-2">Help Resources</h3>
                  {expandedSections.support.helpResources ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.support.helpResources && <div className="space-y-3 mt-4">
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <BookOpen size={16} className="text-[#4169e1]" />
                        <span className="text-sm font-medium">
                          Documentation
                        </span>
                      </div>
                      <button className="inline-flex items-center text-sm text-[#4169e1]">
                        View <ExternalLink size={14} className="ml-1" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <HelpCircle size={16} className="text-[#4169e1]" />
                        <span className="text-sm font-medium">
                          Knowledge Base
                        </span>
                      </div>
                      <button className="inline-flex items-center text-sm text-[#4169e1]">
                        View <ExternalLink size={14} className="ml-1" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <FileText size={16} className="text-[#4169e1]" />
                        <span className="text-sm font-medium">Tutorials</span>
                      </div>
                      <button className="inline-flex items-center text-sm text-[#4169e1]">
                        View <ExternalLink size={14} className="ml-1" />
                      </button>
                    </div>
                    <div className="flex items-center justify-between p-3 border rounded-md">
                      <div className="flex items-center gap-2">
                        <User size={16} className="text-[#4169e1]" />
                        <span className="text-sm font-medium">
                          Community Forum
                        </span>
                      </div>
                      <button className="inline-flex items-center text-sm text-[#4169e1]">
                        View <ExternalLink size={14} className="ml-1" />
                      </button>
                    </div>
                  </div>}
              </div>
              <div className="pt-4">
                <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc]">
                  Contact Support Team
                </button>
              </div>
            </div>
          </div>}
        {activeTab === 'systemStatus' && <div className="p-6">
            <h2 className="text-lg font-medium mb-4">System Status</h2>
            <p className="text-muted-foreground mb-6">
              Monitor the status of all system components and services
            </p>
            <div className="space-y-6">
              {/* Current Status - Collapsible Section */}
              <div className="border-b pb-4">
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('systemStatus', 'currentStatus')}>
                  <h3 className="text-md font-medium mb-2">Current Status</h3>
                  {expandedSections.systemStatus.currentStatus ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.systemStatus.currentStatus && <div className="mt-4">
                    <div className="bg-green-100 p-4 rounded-md mb-4">
                      <div className="flex items-start gap-3">
                        <Check className="h-5 w-5 text-green-600 mt-0.5" />
                        <div>
                          <p className="text-sm font-medium text-green-800">
                            All systems operational
                          </p>
                          <p className="text-sm text-green-700 mt-1">
                            Last updated: Today at 10:42 AM
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm">Voice Agent System</span>
                        </div>
                        <span className="text-xs text-green-600">
                          Operational
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm">Workflow Engine</span>
                        </div>
                        <span className="text-xs text-green-600">
                          Operational
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm">API Services</span>
                        </div>
                        <span className="text-xs text-green-600">
                          Operational
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm">Data Storage</span>
                        </div>
                        <span className="text-xs text-green-600">
                          Operational
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm">Authentication</span>
                        </div>
                        <span className="text-xs text-green-600">
                          Operational
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-green-500"></div>
                          <span className="text-sm">Messaging Services</span>
                        </div>
                        <span className="text-xs text-green-600">
                          Operational
                        </span>
                      </div>
                    </div>
                  </div>}
              </div>
              {/* Status History - Collapsible Section */}
              <div>
                <div className="flex items-center justify-between cursor-pointer" onClick={() => toggleSection('systemStatus', 'statusHistory')}>
                  <h3 className="text-md font-medium mb-2">Status History</h3>
                  {expandedSections.systemStatus.statusHistory ? <ChevronDown size={18} /> : <ChevronRight size={18} />}
                </div>
                {expandedSections.systemStatus.statusHistory && <div className="mt-4">
                    <div className="space-y-4">
                      <div className="border-l-2 border-green-500 pl-4 py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">
                              All Systems Operational
                            </p>
                            <p className="text-sm text-muted-foreground">
                              All services are running normally
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Jan 15, 2024
                          </div>
                        </div>
                      </div>
                      <div className="border-l-2 border-yellow-500 pl-4 py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Partial System Outage</p>
                            <p className="text-sm text-muted-foreground">
                              Voice Agent System experienced degraded
                              performance
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Jan 10, 2024
                          </div>
                        </div>
                      </div>
                      <div className="border-l-2 border-red-500 pl-4 py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">API Service Outage</p>
                            <p className="text-sm text-muted-foreground">
                              API services were unavailable for 25 minutes
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Dec 28, 2023
                          </div>
                        </div>
                      </div>
                      <div className="border-l-2 border-green-500 pl-4 py-2">
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-medium">Scheduled Maintenance</p>
                            <p className="text-sm text-muted-foreground">
                              System updates and performance improvements
                            </p>
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Dec 15, 2023
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="mt-4">
                      <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-4 py-2 text-sm font-medium">
                        <Server size={16} className="mr-2" />
                        View Full Status History
                      </button>
                    </div>
                  </div>}
              </div>
              <div className="pt-4">
                <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc]">
                  Subscribe to Status Updates
                </button>
              </div>
            </div>
          </div>}
      </div>
    </div>;
};
export default Settings;