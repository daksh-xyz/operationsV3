import React, { useState } from 'react';
import { BarChart3, LineChart, PieChart, Clock, CreditCard, MessageSquare, CheckCircle2, DollarSign, Cpu, DownloadCloud, ChevronDown, ChevronUp, ArrowUpRight, ArrowDownRight } from 'lucide-react';
const Analytics = () => {
  const [timeRange, setTimeRange] = useState('30');
  return <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">AI Analytics</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Detailed performance metrics for Maya AI
          </p>
        </div>
        <div className="flex items-center gap-2">
          <select className="h-9 rounded-md border border-input bg-background px-3 text-sm" value={timeRange} onChange={e => setTimeRange(e.target.value)}>
            <option value="7">Last 7 days</option>
            <option value="30">Last 30 days</option>
            <option value="90">Last 90 days</option>
            <option value="365">Last 12 months</option>
          </select>
          <button className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800">
            Export Report
          </button>
        </div>
      </div>
      {/* Key metrics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-white shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                LLM Credits Used
              </p>
              <div className="flex items-baseline mt-2">
                <h3 className="text-2xl font-bold">287,492</h3>
                <span className="ml-2 text-xs font-medium text-green-600 flex items-center">
                  <ChevronUp size={12} />
                  12%
                </span>
              </div>
            </div>
            <div className="bg-gray-100 p-2 rounded-md">
              <CreditCard className="h-5 w-5 text-black" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>Monthly budget: 500,000</span>
              <span>57.5% used</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
              <div className="h-1.5 bg-black rounded-full" style={{
              width: '57.5%'
            }}></div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-white shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Conversations Completed
              </p>
              <div className="flex items-baseline mt-2">
                <h3 className="text-2xl font-bold">15,842</h3>
                <span className="ml-2 text-xs font-medium text-green-600 flex items-center">
                  <ChevronUp size={12} />
                  8%
                </span>
              </div>
            </div>
            <div className="bg-purple-50 p-2 rounded-md">
              <MessageSquare className="h-5 w-5 text-purple-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="w-full h-10 flex items-end">
              {[35, 28, 45, 52, 38, 48, 67].map((value, i) => <div key={i} className="flex-1 bg-purple-100 mx-0.5 rounded-t" style={{
              height: `${value}%`
            }}></div>)}
            </div>
            <div className="flex justify-between mt-1 text-xs text-gray-500">
              <span>Mon</span>
              <span>Sun</span>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-white shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Tasks Completed
              </p>
              <div className="flex items-baseline mt-2">
                <h3 className="text-2xl font-bold">32,614</h3>
                <span className="ml-2 text-xs font-medium text-green-600 flex items-center">
                  <ChevronUp size={12} />
                  15%
                </span>
              </div>
            </div>
            <div className="bg-green-50 p-2 rounded-md">
              <CheckCircle2 className="h-5 w-5 text-green-600" />
            </div>
          </div>
          <div className="mt-2 grid grid-cols-4 gap-1">
            <div className="text-center">
              <div className="text-xs text-gray-500">Intake</div>
              <div className="font-medium text-sm mt-1">8,452</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Triage</div>
              <div className="font-medium text-sm mt-1">12,187</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Follow-up</div>
              <div className="font-medium text-sm mt-1">7,325</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500">Admin</div>
              <div className="font-medium text-sm mt-1">4,650</div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-white shadow-sm p-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm font-medium text-gray-500">
                Revenue Generated
              </p>
              <div className="flex items-baseline mt-2">
                <h3 className="text-2xl font-bold">$184,267</h3>
                <span className="ml-2 text-xs font-medium text-green-600 flex items-center">
                  <ChevronUp size={12} />
                  23%
                </span>
              </div>
            </div>
            <div className="bg-emerald-50 p-2 rounded-md">
              <DollarSign className="h-5 w-5 text-emerald-600" />
            </div>
          </div>
          <div className="mt-2">
            <div className="flex items-center justify-between text-xs text-gray-500">
              <span>YTD Target: $500,000</span>
              <span>36.9% achieved</span>
            </div>
            <div className="w-full h-1.5 bg-gray-100 rounded-full mt-1">
              <div className="h-1.5 bg-emerald-500 rounded-full" style={{
              width: '36.9%'
            }}></div>
            </div>
          </div>
        </div>
      </div>
      {/* Time saved & AI models */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Time Saved</h3>
              <div className="bg-gray-100 p-1.5 rounded-md">
                <Clock className="h-4 w-4 text-black" />
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-3xl font-bold">2,847 hours</div>
                <div className="text-sm text-gray-500 mt-1">
                  Total time saved this month
                </div>
              </div>
              <div className="text-right">
                <div className="text-xl font-semibold text-green-600">+18%</div>
                <div className="text-sm text-gray-500 mt-1">vs. last month</div>
              </div>
            </div>
            <div className="mt-6">
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-black">
                      Patient Messaging
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-black">
                      1,245 hrs
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-gray-100">
                  <div style={{
                  width: '45%'
                }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-black"></div>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-purple-600">
                      Documentation
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-purple-600">
                      864 hrs
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-purple-100">
                  <div style={{
                  width: '30%'
                }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-purple-600"></div>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-green-600">
                      Appointment Scheduling
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-green-600">
                      432 hrs
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 mb-4 text-xs flex rounded bg-green-100">
                  <div style={{
                  width: '15%'
                }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-green-600"></div>
                </div>
              </div>
              <div className="relative pt-1">
                <div className="flex mb-2 items-center justify-between">
                  <div>
                    <span className="text-xs font-semibold inline-block text-orange-600">
                      Administrative Tasks
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-semibold inline-block text-orange-600">
                      306 hrs
                    </span>
                  </div>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-orange-100">
                  <div style={{
                  width: '10%'
                }} className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-600"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="rounded-lg border bg-white shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">AI Models Usage</h3>
              <div className="bg-gray-100 p-1.5 rounded-md">
                <Cpu className="h-4 w-4 text-black" />
              </div>
            </div>
          </div>
          <div className="p-6">
            <div className="flex items-center justify-center mb-6">
              <div className="relative h-48 w-48">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold">248,731</div>
                    <div className="text-sm text-gray-500">Total requests</div>
                  </div>
                </div>
                <svg viewBox="0 0 100 100" className="h-full w-full">
                  {/* GPT-4 Segment (55%) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="black" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="0" transform="rotate(-90 50 50)" />
                  {/* Claude Segment (25%) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#9333ea" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="138.16" transform="rotate(-90 50 50)" />
                  {/* GPT-3.5 Segment (15%) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#22c55e" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="188.4" transform="rotate(-90 50 50)" />
                  {/* Other Segment (5%) */}
                  <circle cx="50" cy="50" r="40" fill="transparent" stroke="#f97316" strokeWidth="15" strokeDasharray="251.2" strokeDashoffset="226.08" transform="rotate(-90 50 50)" />
                </svg>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-black mr-2"></div>
                  <span className="text-sm font-medium">GPT-4</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">136,802</span>
                  <span className="text-gray-500 ml-1">(55%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-purple-600 mr-2"></div>
                  <span className="text-sm font-medium">Claude 3</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">62,183</span>
                  <span className="text-gray-500 ml-1">(25%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-green-600 mr-2"></div>
                  <span className="text-sm font-medium">GPT-3.5</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">37,310</span>
                  <span className="text-gray-500 ml-1">(15%)</span>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="h-3 w-3 rounded-full bg-orange-500 mr-2"></div>
                  <span className="text-sm font-medium">Other Models</span>
                </div>
                <div className="text-sm">
                  <span className="font-medium">12,436</span>
                  <span className="text-gray-500 ml-1">(5%)</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* LLM Credits Consumption Over Time */}
      <div className="rounded-lg border bg-white shadow-sm">
        <div className="p-6 border-b">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-medium">LLM Credits Consumption</h3>
            <div className="flex items-center gap-2">
              <button className="px-2 py-1 text-xs font-medium rounded-md bg-black/10 text-black">
                Daily
              </button>
              <button className="px-2 py-1 text-xs font-medium rounded-md">
                Weekly
              </button>
              <button className="px-2 py-1 text-xs font-medium rounded-md">
                Monthly
              </button>
            </div>
          </div>
        </div>
        <div className="p-6">
          <div className="h-[300px] relative">
            {/* X-axis */}
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gray-200"></div>
            {/* Y-axis */}
            <div className="absolute top-0 bottom-0 left-0 w-px bg-gray-200"></div>
            {/* Line chart - simplified representation */}
            <svg className="w-full h-full" viewBox="0 0 1000 300" preserveAspectRatio="none">
              <path d="M0,280 C50,260 100,240 150,220 C200,200 250,190 300,180 C350,170 400,160 450,150 C500,140 550,145 600,130 C650,115 700,100 750,90 C800,80 850,70 900,60 C950,50 1000,40 1000,40" fill="none" stroke="black" strokeWidth="3" />
              <path d="M0,280 C50,260 100,240 150,220 C200,200 250,190 300,180 C350,170 400,160 450,150 C500,140 550,145 600,130 C650,115 700,100 750,90 C800,80 850,70 900,60 C950,50 1000,40 1000,40" fill="url(#gradient)" strokeWidth="0" opacity="0.2" />
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="black" />
                  <stop offset="100%" stopColor="black" stopOpacity="0" />
                </linearGradient>
              </defs>
            </svg>
            {/* Y-axis labels */}
            <div className="absolute top-0 left-2 text-xs text-gray-500">
              15,000
            </div>
            <div className="absolute top-1/4 left-2 text-xs text-gray-500">
              10,000
            </div>
            <div className="absolute top-1/2 left-2 text-xs text-gray-500">
              5,000
            </div>
            <div className="absolute bottom-2 left-2 text-xs text-gray-500">
              0
            </div>
            {/* X-axis labels */}
            <div className="absolute bottom-2 left-0 text-xs text-gray-500">
              Apr 1
            </div>
            <div className="absolute bottom-2 left-1/6 text-xs text-gray-500">
              Apr 5
            </div>
            <div className="absolute bottom-2 left-2/6 text-xs text-gray-500">
              Apr 10
            </div>
            <div className="absolute bottom-2 left-3/6 text-xs text-gray-500">
              Apr 15
            </div>
            <div className="absolute bottom-2 left-4/6 text-xs text-gray-500">
              Apr 20
            </div>
            <div className="absolute bottom-2 left-5/6 text-xs text-gray-500">
              Apr 25
            </div>
            <div className="absolute bottom-2 right-0 text-xs text-gray-500">
              Apr 30
            </div>
          </div>
        </div>
      </div>
      {/* Recent Model Usage & Cost Breakdown */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="rounded-lg border bg-white shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Recent Model Usage</h3>
              <button className="text-sm text-black hover:underline">
                View all
              </button>
            </div>
          </div>
          <div className="divide-y">
            {[{
            model: 'GPT-4',
            task: 'Patient Triage',
            tokens: 8245,
            time: '10 mins ago',
            cost: '$0.82'
          }, {
            model: 'Claude 3',
            task: 'Medical Summarization',
            tokens: 12548,
            time: '25 mins ago',
            cost: '$1.25'
          }, {
            model: 'GPT-3.5',
            task: 'Appointment Scheduling',
            tokens: 3562,
            time: '1 hour ago',
            cost: '$0.07'
          }, {
            model: 'GPT-4',
            task: 'Insurance Verification',
            tokens: 6821,
            time: '2 hours ago',
            cost: '$0.68'
          }, {
            model: 'Claude 3',
            task: 'Lab Results Analysis',
            tokens: 9654,
            time: '3 hours ago',
            cost: '$0.97'
          }].map((item, i) => <div key={i} className="p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`h-8 w-8 rounded-full flex items-center justify-center ${item.model.includes('GPT-4') ? 'bg-gray-100 text-black' : item.model.includes('Claude') ? 'bg-purple-100 text-purple-600' : 'bg-green-100 text-green-600'}`}>
                    <Cpu size={16} />
                  </div>
                  <div>
                    <div className="font-medium text-sm">{item.model}</div>
                    <div className="text-xs text-gray-500">{item.task}</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="font-medium text-sm">
                    {item.tokens.toLocaleString()} tokens
                  </div>
                  <div className="text-xs text-gray-500">
                    {item.time} • {item.cost}
                  </div>
                </div>
              </div>)}
          </div>
        </div>
        <div className="rounded-lg border bg-white shadow-sm">
          <div className="p-6 border-b">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Cost Breakdown</h3>
              <button className="text-sm text-black hover:underline">
                Download
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">Total Cost This Month</div>
                <div className="text-lg font-bold">$5,842.67</div>
              </div>
              <div className="h-px bg-gray-100"></div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">By Model</div>
                  <div className="text-xs text-gray-500">Cost (USD)</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-black mr-2"></div>
                      <span className="text-sm">GPT-4</span>
                    </div>
                    <div className="text-sm font-medium">$3,256.82</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-purple-600 mr-2"></div>
                      <span className="text-sm">Claude 3</span>
                    </div>
                    <div className="text-sm font-medium">$1,845.27</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-green-600 mr-2"></div>
                      <span className="text-sm">GPT-3.5</span>
                    </div>
                    <div className="text-sm font-medium">$482.35</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <div className="h-2 w-2 rounded-full bg-orange-500 mr-2"></div>
                      <span className="text-sm">Other Models</span>
                    </div>
                    <div className="text-sm font-medium">$258.23</div>
                  </div>
                </div>
              </div>
              <div className="h-px bg-gray-100"></div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <div className="text-sm font-medium">By Department</div>
                  <div className="text-xs text-gray-500">Cost (USD)</div>
                </div>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Patient Care</div>
                    <div className="text-sm font-medium">$2,845.32</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Administration</div>
                    <div className="text-sm font-medium">$1,256.78</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Billing</div>
                    <div className="text-sm font-medium">$982.45</div>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="text-sm">Research</div>
                    <div className="text-sm font-medium">$758.12</div>
                  </div>
                </div>
              </div>
              <div className="h-px bg-gray-100"></div>
              <div className="flex items-center justify-between">
                <div className="text-sm font-medium">
                  Projected Cost (Next Month)
                </div>
                <div className="text-sm font-bold text-black">$6,250.00</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>;
};
export default Analytics;