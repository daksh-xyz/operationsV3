import React, { useState } from 'react';
import { X, Play, Plus, ArrowLeft, Globe, Type, MousePointer, Download, Clock, RotateCcw, Save, Brain, FileCode, Settings as SettingsIcon, ExternalLink, ChevronRight } from 'lucide-react';
const CreateRpaModal = ({
  isOpen,
  onClose
}) => {
  const [currentStep, setCurrentStep] = useState('template');
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [automationName, setAutomationName] = useState('');
  const [automationSteps, setAutomationSteps] = useState([{
    id: 1,
    type: 'go_to_url',
    url: 'https://surveyjs.io/form-library/examples/s/patient-registration-form-template-free/reactjs'
  }]);
  const [showAddStepMenu, setShowAddStepMenu] = useState(false);
  if (!isOpen) return null;
  const handleSelectTemplate = template => {
    setSelectedTemplate(template);
    setAutomationName(template.name);
    setCurrentStep('configure');
  };
  const handleAddStep = stepType => {
    const newStep = {
      id: automationSteps.length + 1,
      type: stepType
    };
    if (stepType === 'go_to_url') {
      newStep.url = '';
    } else if (stepType === 'type_text') {
      newStep.text = '';
      newStep.xpath = '';
    } else if (stepType === 'click_element') {
      newStep.xpath = '';
    } else if (stepType === 'download_file') {
      newStep.fileUrl = '';
      newStep.saveAs = '';
    } else if (stepType === 'wait') {
      newStep.waitTime = 5;
      newStep.waitType = 'seconds'; // or 'element'
    } else if (stepType === 'browser_agent') {
      newStep.prompt = '';
    }
    setAutomationSteps([...automationSteps, newStep]);
    setShowAddStepMenu(false);
  };
  const renderTemplateSelection = () => <div className="p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold">Create New RPA</h2>
        <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-accent" onClick={onClose}>
          <X className="h-4 w-4" />
        </button>
      </div>
      <div className="mb-6">
        <h3 className="text-lg font-medium mb-2">Start with a template</h3>
        <p className="text-sm text-muted-foreground">
          Choose a template to get started quickly, or create a new automation
          from scratch.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        <div className="border border-border rounded-lg p-4 hover:border-black hover:shadow-sm cursor-pointer transition-all" onClick={() => handleSelectTemplate({
        id: 'patient-reg',
        name: 'Automate Patient Registration',
        description: 'Automates patient data entry into EHR system',
        steps: 8
      })}>
          <div className="bg-black/10 text-black text-xs px-2 py-0.5 rounded-full inline-flex mb-2">
            TEMPLATE
          </div>
          <h4 className="font-medium mb-1">Patient Registration</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Automates patient data entry into EHR system
          </p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>8 steps</span>
            <span>Used 24 times</span>
          </div>
        </div>
        <div className="border border-border rounded-lg p-4 hover:border-black hover:shadow-sm cursor-pointer transition-all" onClick={() => handleSelectTemplate({
        id: 'insurance',
        name: 'Insurance Verification',
        description: 'Checks patient insurance eligibility',
        steps: 12
      })}>
          <div className="bg-black/10 text-black text-xs px-2 py-0.5 rounded-full inline-flex mb-2">
            TEMPLATE
          </div>
          <h4 className="font-medium mb-1">Insurance Verification</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Checks patient insurance eligibility
          </p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>12 steps</span>
            <span>Used 18 times</span>
          </div>
        </div>
        <div className="border border-border rounded-lg p-4 hover:border-black hover:shadow-sm cursor-pointer transition-all" onClick={() => handleSelectTemplate({
        id: 'appointment',
        name: 'Appointment Scheduling',
        description: 'Books patient appointments in calendar system',
        steps: 6
      })}>
          <div className="bg-black/10 text-black text-xs px-2 py-0.5 rounded-full inline-flex mb-2">
            TEMPLATE
          </div>
          <h4 className="font-medium mb-1">Appointment Scheduling</h4>
          <p className="text-sm text-muted-foreground mb-3">
            Books patient appointments in calendar system
          </p>
          <div className="flex justify-between items-center text-xs text-muted-foreground">
            <span>6 steps</span>
            <span>Used 32 times</span>
          </div>
        </div>
        <div className="border border-dashed border-border rounded-lg p-4 hover:border-black hover:shadow-sm cursor-pointer transition-all flex flex-col items-center justify-center text-center h-[132px]" onClick={() => {
        setAutomationName('New Automation');
        setAutomationSteps([{
          id: 1,
          type: 'go_to_url',
          url: ''
        }]);
        setCurrentStep('configure');
      }}>
          <div className="h-10 w-10 bg-black/10 rounded-full flex items-center justify-center mb-2">
            <Plus className="h-5 w-5 text-black" />
          </div>
          <span className="font-medium">Create from scratch</span>
          <p className="text-xs text-muted-foreground mt-1">
            Start with a blank automation
          </p>
        </div>
      </div>
      <div className="bg-accent/50 rounded-lg p-4">
        <h4 className="font-medium mb-2">Need help getting started?</h4>
        <p className="text-sm text-muted-foreground mb-3">
          Watch our tutorial on creating effective healthcare automations or
          browse our documentation.
        </p>
        <div className="flex gap-3">
          <button className="text-sm text-black">Watch tutorial</button>
          <button className="text-sm text-black">Read documentation</button>
        </div>
      </div>
    </div>;
  const renderStepConfiguration = () => <div className="flex h-[80vh]">
      <div className="w-[60%] border-r border-border flex flex-col">
        <div className="p-4 border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-accent" onClick={() => setCurrentStep('template')}>
              <ArrowLeft className="h-4 w-4" />
            </button>
            <input type="text" value={automationName} onChange={e => setAutomationName(e.target.value)} className="text-lg font-medium bg-transparent border-none focus:outline-none focus:ring-0" placeholder="Automation Name" />
            <div className="bg-blue-100 text-blue-800 text-xs px-2 py-0.5 rounded-full">
              TEMPLATE
            </div>
          </div>
          <div className="flex items-center gap-2">
            <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-xs font-medium">
              <Save size={14} className="mr-1" />
              Save
            </button>
            <button className="inline-flex items-center justify-center rounded-md bg-black px-3 py-1 text-xs font-medium text-white hover:bg-black/80">
              <Play size={14} className="mr-1" />
              Run Steps
            </button>
            <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-accent" onClick={onClose}>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
        <div className="p-4 flex-1 overflow-y-auto">
          <h3 className="text-md font-medium mb-3">Steps</h3>
          <p className="text-sm text-muted-foreground mb-4">
            Add and configure steps to build your automation workflow.
          </p>
          <div className="space-y-4 mb-4">
            {automationSteps.map((step, index) => <div key={step.id} className="border border-border rounded-md overflow-hidden">
                <div className="bg-card p-2 border-b border-border flex items-center gap-2">
                  <div className="h-6 w-6 rounded-full bg-black text-white flex items-center justify-center text-xs font-medium">
                    {index + 1}
                  </div>
                  <div className="font-medium text-sm">
                    {step.type === 'go_to_url' ? 'GO TO URL' : 'TYPE TEXT'}
                  </div>
                  <div className="flex-1"></div>
                  <button className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-accent">
                    <Play size={14} />
                  </button>
                  <button className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-accent">
                    <SettingsIcon size={14} />
                  </button>
                  <button className="h-6 w-6 rounded-full flex items-center justify-center hover:bg-accent text-red-500">
                    <X size={14} />
                  </button>
                </div>
                <div className="p-3">
                  {step.type === 'go_to_url' && <div>
                      <div className="text-sm mb-1">
                        Navigate to a given URL on the current tab
                      </div>
                      <div className="mb-2">
                        <label className="block text-xs font-medium mb-1">
                          URL
                        </label>
                        <div className="text-xs text-muted-foreground mb-1">
                          The URL to navigate to, url must start with http:// or
                          https://
                        </div>
                        <input type="text" value={step.url} onChange={e => {
                    const updatedSteps = [...automationSteps];
                    updatedSteps[index].url = e.target.value;
                    setAutomationSteps(updatedSteps);
                  }} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="https://example.com" />
                      </div>
                    </div>}
                  {step.type === 'type_text' && <div>
                      <div className="text-sm mb-1">
                        Type text into an element with the given XPath
                      </div>
                      <div className="mb-2">
                        <label className="block text-xs font-medium mb-1">
                          XPath
                        </label>
                        <div className="text-xs text-muted-foreground mb-1">
                          The XPath of the element to type text into
                        </div>
                        <input type="text" value={step.xpath || ''} onChange={e => {
                    const updatedSteps = [...automationSteps];
                    updatedSteps[index].xpath = e.target.value;
                    setAutomationSteps(updatedSteps);
                  }} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="//input[@id='name']" />
                      </div>
                      <div className="mb-2">
                        <label className="block text-xs font-medium mb-1">
                          Text
                        </label>
                        <div className="text-xs text-muted-foreground mb-1">
                          The text to type
                        </div>
                        <input type="text" value={step.text || ''} onChange={e => {
                    const updatedSteps = [...automationSteps];
                    updatedSteps[index].text = e.target.value;
                    setAutomationSteps(updatedSteps);
                  }} className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm" placeholder="John Doe" />
                      </div>
                    </div>}
                </div>
              </div>)}
          </div>
          <div className="relative">
            <button className="w-full flex items-center justify-center gap-2 border border-dashed border-border rounded-md p-3 hover:border-black hover:bg-black/5 transition-all" onClick={() => setShowAddStepMenu(!showAddStepMenu)}>
              <Plus size={16} />
              <span className="text-sm font-medium">Add Step</span>
            </button>
            {showAddStepMenu && <div className="absolute top-full left-0 w-full mt-2 bg-background border border-border rounded-md shadow-md z-10 max-h-[300px] overflow-y-auto">
                <div className="p-3 border-b border-border sticky top-0 bg-background">
                  <h4 className="text-sm font-medium">Add Step</h4>
                  <p className="text-xs text-muted-foreground">
                    Choose from the steps below to build your automation
                    workflow
                  </p>
                </div>
                <div className="p-2">
                  <div className="grid grid-cols-1 gap-2">
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer" onClick={() => handleAddStep('go_to_url')}>
                      <div className="h-8 w-8 rounded-md bg-black/10 flex items-center justify-center">
                        <Globe size={16} className="text-black" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Go to URL</div>
                        <div className="text-xs text-muted-foreground">
                          Navigate to a specific URL
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer" onClick={() => handleAddStep('type_text')}>
                      <div className="h-8 w-8 rounded-md bg-green-100 flex items-center justify-center">
                        <Type size={16} className="text-green-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Type Text</div>
                        <div className="text-xs text-muted-foreground">
                          Enter text into a field
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer" onClick={() => handleAddStep('click_element')}>
                      <div className="h-8 w-8 rounded-md bg-purple-100 flex items-center justify-center">
                        <MousePointer size={16} className="text-purple-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Click Element</div>
                        <div className="text-xs text-muted-foreground">
                          Click on an element with the given XPath
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer" onClick={() => handleAddStep('download_file')}>
                      <div className="h-8 w-8 rounded-md bg-orange-100 flex items-center justify-center">
                        <Download size={16} className="text-orange-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Download File</div>
                        <div className="text-xs text-muted-foreground">
                          Download a file from the page
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer" onClick={() => handleAddStep('wait')}>
                      <div className="h-8 w-8 rounded-md bg-yellow-100 flex items-center justify-center">
                        <Clock size={16} className="text-yellow-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">Wait</div>
                        <div className="text-xs text-muted-foreground">
                          Wait for a specific time or condition
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer" onClick={() => handleAddStep('browser_agent')}>
                      <div className="h-8 w-8 rounded-md bg-red-100 flex items-center justify-center">
                        <Brain size={16} className="text-red-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium">
                          Browser Use Agent
                        </div>
                        <div className="text-xs text-muted-foreground">
                          Use AI agent to execute a natural language prompt
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>}
          </div>
        </div>
      </div>
      <div className="w-[40%] flex flex-col">
        <div className="p-4 border-b border-border">
          <h3 className="text-md font-medium mb-1">Live Cloud Browser</h3>
          <p className="text-sm text-muted-foreground">
            Watch your automation in action. The browser shows the current state
            of your workflow execution.
          </p>
        </div>
        <div className="flex-1 bg-accent/30 p-4 overflow-y-auto flex items-start justify-center">
          <div className="w-full max-w-md bg-white border border-border rounded-md overflow-hidden shadow-sm">
            <div className="bg-gray-100 p-1 flex items-center gap-1 border-b border-border">
              <div className="h-3 w-3 rounded-full bg-red-400"></div>
              <div className="h-3 w-3 rounded-full bg-yellow-400"></div>
              <div className="h-3 w-3 rounded-full bg-green-400"></div>
              <div className="flex-1 mx-2">
                <div className="bg-white text-xs py-1 px-2 rounded text-center truncate">
                  about:blank
                </div>
              </div>
            </div>
            <div className="h-64 flex items-center justify-center p-4 text-center">
              <div>
                <div className="h-16 w-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Globe className="h-8 w-8 text-gray-400" />
                </div>
                <p className="text-sm text-muted-foreground">
                  Browser preview will appear here when you run the automation
                </p>
                <button className="mt-4 inline-flex items-center justify-center rounded-md bg-black px-3 py-1 text-xs font-medium text-white hover:bg-black/80">
                  <Play size={14} className="mr-1" />
                  Run Steps
                </button>
              </div>
            </div>
          </div>
        </div>
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between mb-3">
            <h4 className="text-sm font-medium">Settings</h4>
            <button className="text-xs text-[#4169e1] flex items-center" onClick={() => setCurrentStep('settings')}>
              View all settings <ChevronRight size={14} />
            </button>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <RotateCcw size={14} className="text-muted-foreground" />
                <span className="text-sm">Retry on failure</span>
              </div>
              <div className="relative inline-flex items-center">
                <input type="checkbox" className="peer sr-only" id="retry" defaultChecked />
                <label htmlFor="retry" className="relative h-5 w-9 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-black peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300">
                  <span className="absolute inset-y-0 left-0 h-4 w-4 transform rounded-full bg-white transition peer-checked:translate-x-4 m-0.5"></span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FileCode size={14} className="text-muted-foreground" />
                <span className="text-sm">Store logs & recordings</span>
              </div>
              <div className="relative inline-flex items-center">
                <input type="checkbox" className="peer sr-only" id="logs" defaultChecked />
                <label htmlFor="logs" className="relative h-5 w-9 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-black peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300">
                  <span className="absolute inset-y-0 left-0 h-4 w-4 transform rounded-full bg-white transition peer-checked:translate-x-4 m-0.5"></span>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <ExternalLink size={14} className="text-muted-foreground" />
                <span className="text-sm">Run in incognito mode</span>
              </div>
              <div className="relative inline-flex items-center">
                <input type="checkbox" className="peer sr-only" id="incognito" />
                <label htmlFor="incognito" className="relative h-5 w-9 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-black peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300">
                  <span className="absolute inset-y-0 left-0 h-4 w-4 transform rounded-full bg-white transition peer-checked:translate-x-4 m-0.5"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
  const renderSettings = () => <div className="p-6">
      <div className="flex items-center gap-2 mb-6">
        <button className="h-8 w-8 rounded-full flex items-center justify-center hover:bg-accent" onClick={() => setCurrentStep('configure')}>
          <ArrowLeft className="h-4 w-4" />
        </button>
        <h2 className="text-xl font-medium">{automationName} Settings</h2>
      </div>
      <div className="flex border-b border-border mb-6">
        <button className="px-4 py-2 text-sm font-medium border-b-2 border-black text-black">
          Overview
        </button>
        <button className="px-4 py-2 text-sm font-medium border-b-2 border-transparent text-muted-foreground hover:text-foreground">
          History
        </button>
        <button className="px-4 py-2 text-sm font-medium border-b-2 border-transparent text-muted-foreground hover:text-foreground">
          Settings
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="rounded-md border border-border overflow-hidden">
          <div className="bg-card p-4 border-b border-border">
            <h3 className="font-medium flex items-center gap-2">
              <Globe size={16} /> Webhooks
            </h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Configure webhooks to trigger API requests when your CopyCat run
              completes successfully or encounters an error.
            </p>
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2">Success Webhook</h4>
              <div className="bg-accent/30 text-sm p-3 rounded-md mb-2">
                No success webhook configured
              </div>
              <button className="inline-flex items-center justify-center rounded-md bg-black px-3 py-1 text-xs font-medium text-white hover:bg-black/80">
                Add Success Webhook
              </button>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Failure Webhook</h4>
              <div className="bg-accent/30 text-sm p-3 rounded-md mb-2">
                No failure webhook configured
              </div>
              <button className="inline-flex items-center justify-center rounded-md bg-black px-3 py-1 text-xs font-medium text-white hover:bg-black/80">
                Add Failure Webhook
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-md border border-border overflow-hidden">
          <div className="bg-card p-4 border-b border-border">
            <h3 className="font-medium flex items-center gap-2">
              <RotateCcw size={16} /> Retry Settings
            </h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Configure automatic retry behavior when CopyCat runs fail.
            </p>
            <div className="mb-4">
              <p className="text-sm mb-3">
                Configure retry settings to automatically retry failed CopyCat
                runs
              </p>
              <button className="inline-flex items-center justify-center rounded-md bg-black px-3 py-1 text-xs font-medium text-white hover:bg-black/80">
                Add Retry Setting
              </button>
            </div>
          </div>
        </div>
        <div className="rounded-md border border-border overflow-hidden">
          <div className="bg-card p-4 border-b border-border">
            <h3 className="font-medium flex items-center gap-2">
              <Globe size={16} /> Browser Settings
            </h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Configure how the browser behaves during CopyCat execution.
            </p>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">
                    Store Logs & Recordings
                  </label>
                  <div className="relative inline-flex items-center">
                    <input type="checkbox" className="peer sr-only" id="settings-logs" defaultChecked />
                    <label htmlFor="settings-logs" className="relative h-5 w-9 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-black peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300">
                      <span className="absolute inset-y-0 left-0 h-4 w-4 transform rounded-full bg-white transition peer-checked:translate-x-4 m-0.5"></span>
                    </label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Disables logging and recording of browser activity for
                  enhanced privacy and security.
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Incognito Mode</label>
                  <div className="relative inline-flex items-center">
                    <input type="checkbox" className="peer sr-only" id="settings-incognito" />
                    <label htmlFor="settings-incognito" className="relative h-5 w-9 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-black peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300">
                      <span className="absolute inset-y-0 left-0 h-4 w-4 transform rounded-full bg-white transition peer-checked:translate-x-4 m-0.5"></span>
                    </label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Starts a fresh browser session for each run, clearing all
                  cookies, cache, and stored data. This helps prevent tracking
                  and reduces bot detection.
                </p>
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-sm font-medium">Enable Proxy</label>
                  <div className="relative inline-flex items-center">
                    <input type="checkbox" className="peer sr-only" id="settings-proxy" />
                    <label htmlFor="settings-proxy" className="relative h-5 w-9 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-black peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300">
                      <span className="absolute inset-y-0 left-0 h-4 w-4 transform rounded-full bg-white transition peer-checked:translate-x-4 m-0.5"></span>
                    </label>
                  </div>
                </div>
                <p className="text-xs text-muted-foreground">
                  Enable proxy to run this CopyCat through a proxy server. This
                  will help you bypass anti-bot detection by using a different
                  IP address for each run. Proxy usage will increase your credit
                  usage.
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-md border border-border overflow-hidden">
          <div className="bg-card p-4 border-b border-border">
            <h3 className="font-medium flex items-center gap-2">
              <Bell size={16} /> Notifications
            </h3>
          </div>
          <div className="p-4">
            <p className="text-sm text-muted-foreground mb-4">
              Configure how and where you receive CopyCat run notifications.
            </p>
            <div className="mb-4">
              <h4 className="text-sm font-medium mb-2 flex items-center gap-2">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" className="h-4 w-4" />
                Slack Integration
              </h4>
              <p className="text-sm mb-3">
                Connect your Slack workspace to receive failure notifications.
              </p>
              <button className="inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-2 text-sm font-medium">
                <img src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/slack/slack-original.svg" className="h-4 w-4 mr-2" />
                Connect Slack
              </button>
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="text-sm font-medium">
                  Screenshot on Failure
                </label>
                <div className="relative inline-flex items-center">
                  <input type="checkbox" className="peer sr-only" id="settings-screenshot" defaultChecked />
                  <label htmlFor="settings-screenshot" className="relative h-5 w-9 cursor-pointer rounded-full bg-gray-300 peer-checked:bg-black peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-gray-300">
                    <span className="absolute inset-y-0 left-0 h-4 w-4 transform rounded-full bg-white transition peer-checked:translate-x-4 m-0.5"></span>
                  </label>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Captures a screenshot of the current page when CopyCat
                encounters an error or failure.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>;
  return <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
      <div className="bg-background border border-border rounded-lg shadow-lg w-[95%] max-w-[1200px] max-h-[90vh] overflow-hidden flex flex-col">
        {currentStep === 'template' && <div className="overflow-y-auto">{renderTemplateSelection()}</div>}
        {currentStep === 'configure' && renderStepConfiguration()}
        {currentStep === 'settings' && <div className="overflow-y-auto">{renderSettings()}</div>}
      </div>
    </div>;
};
export default CreateRpaModal;