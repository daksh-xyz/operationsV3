import React, { useState } from 'react';
import { BarChart as BarChartIcon, Activity, Users, MessageSquare, GitBranch, Play, Search, Sparkles, CheckCircle, AlertTriangle, Clock, FileText, User, Settings, Calendar, RefreshCw, ChevronDown, X } from 'lucide-react';
const Dashboard = () => {
  const [showPromptSearch, setShowPromptSearch] = useState(false);
  return <div className="h-full overflow-auto">
      {/* Mobile prompt search button */}
      {!showPromptSearch && <button className="md:hidden mb-4 flex items-center justify-center gap-2 p-3 bg-black text-white rounded-lg w-full" onClick={() => setShowPromptSearch(true)}>
          <Sparkles size={16} />
          <span>What would you like to automate?</span>
        </button>}
      {/* New prompt search section - responsive */}
      {(showPromptSearch || !showPromptSearch && window.innerWidth >= 768) && <div className="bg-white border border-gray-100 rounded-lg p-4 mb-4 shadow-sm flex-shrink-0 relative">
          {showPromptSearch && <button className="absolute right-4 top-4 md:hidden" onClick={() => setShowPromptSearch(false)}>
              <X size={20} />
            </button>}
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
            <div className="flex items-center gap-3">
              <Sparkles className="h-5 w-5 text-black" />
              <h2 className="text-md font-medium">
                What would you like to automate today?
              </h2>
            </div>
            <div className="relative w-full md:w-1/2">
              <input type="text" placeholder="Describe a task..." className="h-9 w-full rounded-md border border-gray-200 bg-white pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-black focus:border-transparent" />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-black text-white px-3 py-1 rounded-md text-xs font-medium">
                Generate
              </button>
            </div>
          </div>
        </div>}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 flex-shrink-0 gap-3">
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
          Dashboard
        </h1>
        <div className="flex items-center gap-2">
          <select className="h-9 rounded-md border border-input bg-background px-3 text-sm flex-1 sm:flex-auto">
            <option>Last 24 hours</option>
            <option>Last 7 days</option>
            <option>Last 30 days</option>
          </select>
          <button className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 whitespace-nowrap">
            Export Report
          </button>
        </div>
      </div>
      <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mb-4 flex-shrink-0">
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-4 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              Total Patients
            </h3>
            <Users className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-4 pt-0">
            <div className="text-2xl font-bold">2,543</div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-4 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              Active Workflows
            </h3>
            <GitBranch className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-4 pt-0">
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground">+2 new today</p>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-4 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              Automations Run
            </h3>
            <Play className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-4 pt-0">
            <div className="text-2xl font-bold">1,284</div>
            <p className="text-xs text-muted-foreground">+19% from last week</p>
          </div>
        </div>
        <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
          <div className="p-4 flex flex-row items-center justify-between space-y-0 pb-2">
            <h3 className="tracking-tight text-sm font-medium">
              Messages Processed
            </h3>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="p-4 pt-0">
            <div className="text-2xl font-bold">3,782</div>
            <p className="text-xs text-muted-foreground">+8% from yesterday</p>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-12 gap-4 mb-4">
        {/* Performance chart - Adjusted to take 8/12 columns on desktop */}
        <div className="md:col-span-8 rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col">
          <div className="p-4 border-b border-border flex-shrink-0">
            <div className="flex items-center justify-between">
              <h3 className="text-md font-medium">Automation Performance</h3>
              <button className="text-sm text-black hover:underline">
                View all
              </button>
            </div>
          </div>
          <div className="p-4 overflow-x-auto">
            {/* Performance chart - reduced height */}
            <div className="h-[180px] md:h-[200px] relative min-w-[500px]">
              {/* Grid lines */}
              <div className="absolute inset-0 grid grid-cols-7 w-full h-full">
                {[0, 1, 2, 3, 4, 5, 6].map(i => <div key={i} className="border-r border-gray-100 h-full"></div>)}
              </div>
              <div className="absolute inset-0 grid grid-rows-5 w-full h-full">
                {[0, 1, 2, 3, 4].map(i => <div key={i} className="border-b border-gray-100 w-full"></div>)}
              </div>
              {/* Line chart for tasks executed */}
              <svg className="absolute inset-0 w-full h-full" viewBox="0 0 700 240" preserveAspectRatio="none">
                {/* Tasks executed line */}
                <path d="M50,180 L150,120 L250,160 L350,90 L450,130 L550,70 L650,100" fill="none" stroke="#000000" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {/* Success rate line */}
                <path d="M50,150 L150,130 L250,110 L350,100 L450,90 L550,70 L650,60" fill="none" stroke="#22c55e" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                {/* Data points for tasks executed */}
                <circle cx="50" cy="180" r="4" fill="#000000" />
                <circle cx="150" cy="120" r="4" fill="#000000" />
                <circle cx="250" cy="160" r="4" fill="#000000" />
                <circle cx="350" cy="90" r="4" fill="#000000" />
                <circle cx="450" cy="130" r="4" fill="#000000" />
                <circle cx="550" cy="70" r="4" fill="#000000" />
                <circle cx="650" cy="100" r="4" fill="#000000" />
                {/* Data points for success rate */}
                <circle cx="50" cy="150" r="4" fill="#22c55e" />
                <circle cx="150" cy="130" r="4" fill="#22c55e" />
                <circle cx="250" cy="110" r="4" fill="#22c55e" />
                <circle cx="350" cy="100" r="4" fill="#22c55e" />
                <circle cx="450" cy="90" r="4" fill="#22c55e" />
                <circle cx="550" cy="70" r="4" fill="#22c55e" />
                <circle cx="650" cy="60" r="4" fill="#22c55e" />
              </svg>
              {/* X-axis labels */}
              <div className="absolute bottom-0 left-0 right-0 flex justify-between px-[50px] text-xs text-gray-500">
                <div>Mon</div>
                <div className="hidden sm:block">Tue</div>
                <div>Wed</div>
                <div className="hidden sm:block">Thu</div>
                <div>Fri</div>
                <div className="hidden sm:block">Sat</div>
                <div>Sun</div>
              </div>
              {/* Y-axis labels */}
              <div className="absolute top-0 left-0 bottom-0 flex flex-col justify-between py-2 text-xs text-gray-500">
                <div>400</div>
                <div className="hidden sm:block">300</div>
                <div>200</div>
                <div className="hidden sm:block">100</div>
                <div>0</div>
              </div>
            </div>
            <div className="mt-2 grid grid-cols-2 sm:grid-cols-4 gap-2 text-center">
              <div className="p-2 bg-blue-50 rounded-md">
                <div className="text-sm font-medium text-blue-700">1,993</div>
                <div className="text-xs text-blue-600">Tasks Executed</div>
              </div>
              <div className="p-2 bg-green-50 rounded-md">
                <div className="text-sm font-medium text-green-700">95.2%</div>
                <div className="text-xs text-green-600">Success Rate</div>
              </div>
              <div className="p-2 bg-purple-50 rounded-md">
                <div className="text-sm font-medium text-purple-700">
                  128.5 hrs
                </div>
                <div className="text-xs text-purple-600">Time Saved</div>
              </div>
              <div className="p-2 bg-orange-50 rounded-md">
                <div className="text-sm font-medium text-orange-700">
                  $12,840
                </div>
                <div className="text-xs text-orange-600">Cost Savings</div>
              </div>
            </div>
          </div>
        </div>
        {/* Right column - Activity and Failures - Now side by side on desktop */}
        <div className="md:col-span-4 grid grid-cols-1 gap-4">
          {/* Recent Activity */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col">
            <div className="p-3 border-b border-border flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-medium">Recent Activity</h3>
                <button className="text-xs text-black hover:underline">
                  View all
                </button>
              </div>
            </div>
            <div className="overflow-y-auto p-2 max-h-[160px]">
              <div className="space-y-2">
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-6 w-6 rounded-full bg-blue-100 flex items-center justify-center">
                    <CheckCircle size={12} className="text-blue-600" />
                  </div>
                  <div>
                    <p className="text-xs">
                      <span className="font-medium">
                        Patient intake workflow
                      </span>{' '}
                      processed 12 new patients
                    </p>
                    <p className="text-xs text-muted-foreground">
                      10 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-6 w-6 rounded-full bg-red-100 flex items-center justify-center">
                    <AlertTriangle size={12} className="text-red-600" />
                  </div>
                  <div>
                    <p className="text-xs">
                      <span className="font-medium">
                        Insurance verification
                      </span>{' '}
                      automation failed
                    </p>
                    <p className="text-xs text-muted-foreground">
                      25 minutes ago
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <div className="mt-1 h-6 w-6 rounded-full bg-green-100 flex items-center justify-center">
                    <Calendar size={12} className="text-green-600" />
                  </div>
                  <div>
                    <p className="text-xs">
                      <span className="font-medium">Dr. Sarah Johnson</span>{' '}
                      scheduled 5 new appointments
                    </p>
                    <p className="text-xs text-muted-foreground">1 hour ago</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* Recent Automation Failures */}
          <div className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden flex flex-col">
            <div className="p-3 border-b border-border flex-shrink-0">
              <div className="flex items-center justify-between">
                <h3 className="text-md font-medium">Recent Failures</h3>
                <button className="text-xs text-black hover:underline">
                  View all
                </button>
              </div>
            </div>
            <div className="overflow-y-auto max-h-[160px]">
              <div className="divide-y divide-border">
                {[1, 2, 3].map(i => <div key={i} className="p-3 text-xs">
                    <div className="flex items-center justify-between mb-1">
                      <div className="font-medium">Patient Data Extraction</div>
                      <span className="inline-flex items-center rounded-full bg-destructive/10 px-1.5 py-0.5 text-xs font-medium text-destructive">
                        Failed
                      </span>
                    </div>
                    <div className="text-muted-foreground mb-1">
                      OCR recognition error
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="text-muted-foreground flex items-center">
                        <Clock size={10} className="mr-1" />
                        {i} hour{i !== 1 ? 's' : ''} ago
                      </div>
                      <button className="text-xs text-black hover:underline">
                        Fix
                      </button>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Dashboard;