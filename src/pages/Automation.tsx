import React, { useState } from 'react';
import { Play, Pause, RotateCcw, Monitor, Eye, AlertTriangle, Search, Filter, Clock, CheckCircle, XCircle, Info, Bell } from 'lucide-react';
import CreateRpaModal from '../components/automation/CreateRpaModal';
const Automation = () => {
  const [activeTab, setActiveTab] = useState('recorder');
  const [showCreateModal, setShowCreateModal] = useState(false);
  return <div className="h-[calc(100vh-8rem)] flex flex-col">
      <div className="flex items-center justify-between mb-6 flex-shrink-0">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Robotic Process Automation
          </h1>
          <p className="text-muted-foreground">
            Record, automate and analyze repetitive tasks
          </p>
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80" onClick={() => setShowCreateModal(true)}>
            <Play size={16} className="mr-2" />
            Create New RPA
          </button>
        </div>
      </div>
      <div className="flex items-center border-b border-border mb-4 flex-shrink-0">
        <button className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'recorder' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`} onClick={() => setActiveTab('recorder')}>
          RPA Recorder
        </button>
        <button className={`px-4 py-2 text-sm font-medium border-b-2 ${activeTab === 'analysis' ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground'}`} onClick={() => setActiveTab('analysis')}>
          Failure Analysis
        </button>
      </div>
      {/* Create RPA Modal */}
      <CreateRpaModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} />

      <div className="flex-1 overflow-auto">
        {activeTab === 'recorder' && <div className="flex flex-col lg:grid lg:grid-cols-12 lg:gap-4 gap-4">
            {/* Screen Recorder - First */}
            <div className="rounded-md border border-border overflow-hidden lg:col-span-7 lg:row-span-2">
              <div className="bg-card p-3 border-b border-border flex items-center justify-between flex-wrap gap-2">
                <h3 className="font-medium">Screen Recorder</h3>
                <div className="flex items-center gap-2">
                  <button className="inline-flex items-center justify-center rounded-md bg-destructive px-3 py-1 text-xs font-medium text-destructive-foreground">
                    <Play size={12} className="mr-1" />
                    Record
                  </button>
                  <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-xs font-medium">
                    <Pause size={12} className="mr-1" />
                    Pause
                  </button>
                  <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-xs font-medium">
                    <RotateCcw size={12} className="mr-1" />
                    Reset
                  </button>
                </div>
              </div>
              <div className="bg-black aspect-video lg:aspect-auto lg:h-[calc(100%-6.5rem)] flex items-center justify-center">
                <div className="text-center text-white">
                  <Monitor size={48} className="mx-auto mb-2" />
                  <p className="text-sm">Screen recording will appear here</p>
                  <p className="text-xs text-gray-400 mt-1">
                    Click "Record" to start capturing your screen
                  </p>
                </div>
              </div>
              <div className="bg-card p-3 border-t border-border">
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div>
                    <span className="text-sm font-medium">
                      Recording status:
                    </span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      Ready to record
                    </span>
                  </div>
                  <div>
                    <span className="text-sm font-medium">Duration:</span>
                    <span className="ml-2 text-sm text-muted-foreground">
                      00:00:00
                    </span>
                  </div>
                </div>
              </div>
            </div>
            {/* Recording Steps - Second */}
            <div className="rounded-md border border-border overflow-hidden lg:col-span-5 lg:row-span-1 lg:max-h-[14rem]">
              <div className="bg-card p-3 border-b border-border">
                <h3 className="font-medium">Recording Steps</h3>
              </div>
              <div className="p-3 lg:overflow-y-auto lg:max-h-[10.5rem]">
                <div className="text-sm text-muted-foreground mb-3">
                  No steps recorded yet. Click "Record" to start capturing your
                  actions.
                </div>
                <div className="space-y-3">
                  <div className="p-2 rounded-md bg-accent/50 border border-border">
                    <h4 className="text-sm font-medium mb-1">
                      How to use the RPA Recorder
                    </h4>
                    <ol className="text-xs text-muted-foreground space-y-1 ml-4 list-decimal">
                      <li>
                        Click "Record" to start capturing your screen and
                        actions
                      </li>
                      <li>Perform the task you want to automate</li>
                      <li>Click "Stop" when finished</li>
                      <li>Review and edit the recorded steps</li>
                      <li>Save the automation for future use</li>
                    </ol>
                  </div>
                  <div className="p-2 rounded-md bg-blue-50 border border-blue-100">
                    <div className="flex items-start gap-2">
                      <Info size={16} className="text-blue-500 mt-0.5" />
                      <div>
                        <h4 className="text-sm font-medium text-blue-700 mb-1">
                          Best Practices
                        </h4>
                        <ul className="text-xs text-blue-600 space-y-1 ml-4 list-disc">
                          <li>
                            Close unnecessary applications before recording
                          </li>
                          <li>Move slowly and deliberately during recording</li>
                          <li>Use keyboard shortcuts when possible</li>
                          <li>
                            Test your automation in a safe environment first
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* RPA Templates - Third */}
            <div className="rounded-md border border-border overflow-hidden lg:col-span-2 lg:row-span-1 lg:max-h-[14rem]">
              <div className="bg-card p-3 border-b border-border">
                <h3 className="font-medium">RPA Templates</h3>
              </div>
              <div className="divide-y divide-border lg:overflow-y-auto lg:max-h-[10.5rem]">
                <div className="p-3">
                  <div className="text-sm font-medium mb-1">
                    Patient Registration
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Automates patient data entry
                  </p>
                  <button className="text-xs text-primary" onClick={() => setShowCreateModal(true)}>
                    Use Template
                  </button>
                </div>
                <div className="p-3">
                  <div className="text-sm font-medium mb-1">
                    Insurance Verification
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Checks insurance eligibility
                  </p>
                  <button className="text-xs text-primary" onClick={() => setShowCreateModal(true)}>
                    Use Template
                  </button>
                </div>
                <div className="p-3">
                  <div className="text-sm font-medium mb-1">
                    Appointment Scheduling
                  </div>
                  <p className="text-xs text-muted-foreground mb-2">
                    Books appointments
                  </p>
                  <button className="text-xs text-primary" onClick={() => setShowCreateModal(true)}>
                    Use Template
                  </button>
                </div>
              </div>
            </div>
            {/* Recent Recordings - Fourth */}
            <div className="rounded-md border border-border overflow-hidden lg:col-span-3 lg:row-span-1 lg:max-h-[14rem]">
              <div className="bg-card p-3 border-b border-border">
                <h3 className="font-medium">Recent Recordings</h3>
              </div>
              <div className="divide-y divide-border lg:overflow-y-auto lg:max-h-[10.5rem]">
                {[1, 2, 3].map(i => <div key={i} className="p-3 flex items-center justify-between flex-wrap gap-2">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded bg-accent flex items-center justify-center">
                        <Monitor size={16} className="text-muted-foreground" />
                      </div>
                      <div>
                        <div className="font-medium text-sm">
                          Patient Data Entry
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {i} day{i !== 1 ? 's' : ''} ago • 2:45
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <button className="text-xs text-primary">
                        <Eye size={14} className="mr-1 inline-block" />
                        View
                      </button>
                      <button className="text-xs text-primary">
                        <Play size={14} className="mr-1 inline-block" />
                        Run
                      </button>
                    </div>
                  </div>)}
              </div>
            </div>
          </div>}

        {activeTab === 'analysis' && <div className="h-full overflow-y-auto">
            <div className="mb-6 grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">
                    Total Automations
                  </h3>
                  <Play className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="p-6 pt-0">
                  <div className="text-2xl font-bold">28</div>
                  <p className="text-xs text-muted-foreground">
                    +3 new this week
                  </p>
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">
                    Success Rate
                  </h3>
                  <CheckCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="p-6 pt-0">
                  <div className="text-2xl font-bold">94.2%</div>
                  <p className="text-xs text-muted-foreground">
                    +2.1% from last month
                  </p>
                </div>
              </div>
              <div className="rounded-lg border bg-card text-card-foreground shadow-sm">
                <div className="p-6 flex flex-row items-center justify-between space-y-0 pb-2">
                  <h3 className="tracking-tight text-sm font-medium">
                    Failed Automations
                  </h3>
                  <XCircle className="h-4 w-4 text-muted-foreground" />
                </div>
                <div className="p-6 pt-0">
                  <div className="text-2xl font-bold">5</div>
                  <p className="text-xs text-muted-foreground">
                    -2 from last week
                  </p>
                </div>
              </div>
            </div>
            <div className="rounded-md border border-border overflow-hidden mb-6">
              <div className="bg-card p-4 border-b border-border flex items-center justify-between flex-wrap gap-3">
                <h3 className="font-medium">Recent Automation Failures</h3>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <input type="text" placeholder="Search failures..." className="h-9 w-full sm:w-64 rounded-md border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary" />
                  </div>
                  <button className="inline-flex items-center text-sm text-muted-foreground">
                    <Filter size={14} className="mr-1" />
                    Filter
                  </button>
                </div>
              </div>
              <div className="divide-y divide-border max-h-[300px] overflow-y-auto">
                {[1, 2, 3, 4, 5].map(i => <div key={i} className="p-4 grid grid-cols-1 md:grid-cols-12 gap-4">
                    <div className="md:col-span-5">
                      <div className="flex items-start gap-3">
                        <div className="h-8 w-8 rounded bg-red-100 flex items-center justify-center mt-1">
                          <AlertTriangle size={16} className="text-red-500" />
                        </div>
                        <div>
                          <div className="font-medium">
                            Patient Data Entry Automation
                          </div>
                          <div className="text-sm text-muted-foreground">
                            Failed at step {i + 2}: Element not found
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-sm font-medium">Error Type</div>
                      <div className="text-sm text-muted-foreground">
                        UI Element Changed
                      </div>
                    </div>
                    <div className="md:col-span-2">
                      <div className="text-sm font-medium">Time</div>
                      <div className="text-sm text-muted-foreground flex items-center">
                        <Clock size={12} className="mr-1" />
                        {i} hour{i !== 1 ? 's' : ''} ago
                      </div>
                    </div>
                    <div className="md:col-span-3 flex items-center justify-start md:justify-end gap-2">
                      <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-xs font-medium">
                        View Details
                      </button>
                      <button className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground">
                        Fix & Retry
                      </button>
                    </div>
                  </div>)}
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="rounded-md border border-border overflow-hidden">
                <div className="bg-card p-4 border-b border-border">
                  <h3 className="font-medium">Common Failure Patterns</h3>
                </div>
                <div className="p-4 max-h-[300px] overflow-y-auto">
                  <div className="space-y-4">
                    <div className="p-3 rounded-md border border-border">
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded bg-red-100 flex items-center justify-center mt-0.5">
                          <span className="text-xs font-medium text-red-600">
                            1
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">
                            UI Element Changes
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            EHR system updates changed element IDs and positions
                          </p>
                          <p className="text-xs text-primary mt-1">
                            View affected automations (12)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-md border border-border">
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded bg-red-100 flex items-center justify-center mt-0.5">
                          <span className="text-xs font-medium text-red-600">
                            2
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">
                            Timing Issues
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            System response times vary, causing automation to
                            proceed too quickly
                          </p>
                          <p className="text-xs text-primary mt-1">
                            View affected automations (8)
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-md border border-border">
                      <div className="flex items-start gap-2">
                        <div className="h-6 w-6 rounded bg-red-100 flex items-center justify-center mt-0.5">
                          <span className="text-xs font-medium text-red-600">
                            3
                          </span>
                        </div>
                        <div>
                          <h4 className="text-sm font-medium mb-1">
                            Data Format Changes
                          </h4>
                          <p className="text-xs text-muted-foreground">
                            New data format requirements in patient records
                            system
                          </p>
                          <p className="text-xs text-primary mt-1">
                            View affected automations (5)
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="rounded-md border border-border overflow-hidden">
                <div className="bg-card p-4 border-b border-border">
                  <h3 className="font-medium">Recommended Actions</h3>
                </div>
                <div className="p-4 max-h-[300px] overflow-y-auto">
                  <div className="space-y-4">
                    <div className="p-3 rounded-md bg-green-50 border border-green-100">
                      <div className="flex items-start gap-2">
                        <CheckCircle size={16} className="text-green-500 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-green-700 mb-1">
                            Update Patient Data Entry Automation
                          </h4>
                          <p className="text-xs text-green-600">
                            Re-record the automation to adapt to new UI changes
                            in the EHR system
                          </p>
                          <button className="text-xs text-primary mt-2">
                            Update Now
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-md bg-yellow-50 border border-yellow-100">
                      <div className="flex items-start gap-2">
                        <Info size={16} className="text-yellow-500 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-yellow-700 mb-1">
                            Add Wait Times
                          </h4>
                          <p className="text-xs text-yellow-600">
                            Increase wait times between steps in Insurance
                            Verification automation
                          </p>
                          <button className="text-xs text-primary mt-2">
                            Adjust Settings
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="p-3 rounded-md bg-blue-50 border border-blue-100">
                      <div className="flex items-start gap-2">
                        <Info size={16} className="text-blue-500 mt-0.5" />
                        <div>
                          <h4 className="text-sm font-medium text-blue-700 mb-1">
                            Schedule Maintenance
                          </h4>
                          <p className="text-xs text-blue-600">
                            Schedule regular maintenance for your automations to
                            prevent failures
                          </p>
                          <button className="text-xs text-primary mt-2">
                            Set Schedule
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>}
      </div>
    </div>;
};
export default Automation;