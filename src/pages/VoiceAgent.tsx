import React, { useEffect, useState } from 'react';
import { Phone, Search, Tag, Plus, ChevronDown, MessageSquare, X, User, FileText, ClipboardCheck, Calendar, Clock, AlertCircle, CheckCircle, RefreshCw, HelpCircle, Bell, Eye, MoreVertical, VoicemailIcon, PhoneCall, PhoneForwarded, PhoneIncoming, PhoneMissed, Menu, ArrowLeft, ChevronLeft, ChevronRight } from 'lucide-react';
const VoiceAgent = () => {
  const [activeTab, setActiveTab] = useState('completed');
  const [showPatientProfile, setShowPatientProfile] = useState(false);
  const [showCallTranscript, setShowCallTranscript] = useState(false);
  const [showCallOptions, setShowCallOptions] = useState(null);
  const [showCallDetail, setShowCallDetail] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const callsPerPage = 5;
  // Completed calls data
  const completedCallData = [{
    id: 1,
    name: 'Sarah Johnson',
    type: 'AI Voice Agent Call',
    time: '10:17am',
    duration: '03:23',
    date: 'Jan 14',
    tags: ['Prescription Refill'],
    patientId: 'MRN-48273'
  }, {
    id: 2,
    name: 'Robert Williams',
    type: 'Appointment Scheduling',
    time: '09:45am',
    duration: '04:12',
    date: 'Jan 14',
    tags: ['Follow-up Visit'],
    patientId: 'MRN-36429'
  }, {
    id: 3,
    name: 'Maria Garcia',
    type: 'Medication Inquiry',
    time: '11:30am',
    duration: '02:45',
    date: 'Jan 14',
    tags: ['Side Effects'],
    patientId: 'MRN-59371'
  }, {
    id: 4,
    name: 'James Chen',
    type: 'Lab Results',
    time: '02:15pm',
    duration: '03:50',
    date: 'Jan 13',
    tags: ['Blood Work'],
    patientId: 'MRN-27483'
  }, {
    id: 5,
    name: 'Emily Davis',
    type: 'Insurance Question',
    time: '04:30pm',
    duration: '05:10',
    date: 'Jan 13',
    tags: ['Coverage Verification'],
    patientId: 'MRN-19384'
  }];
  // Voicemail data
  const voicemailData = [{
    id: 101,
    name: 'Thomas Wilson',
    type: 'Voicemail',
    time: '08:22am',
    duration: '01:45',
    date: 'Jan 14',
    tags: ['Urgent'],
    patientId: 'MRN-62145'
  }, {
    id: 102,
    name: 'Jennifer Lopez',
    type: 'Voicemail',
    time: '12:05pm',
    duration: '00:58',
    date: 'Jan 13',
    tags: ['Billing Question'],
    patientId: 'MRN-75391'
  }, {
    id: 103,
    name: 'Michael Brown',
    type: 'Voicemail',
    time: '05:17pm',
    duration: '01:22',
    date: 'Jan 12',
    tags: ['Appointment Request'],
    patientId: 'MRN-83472'
  }];
  // Callbacks data
  const callbacksData = [{
    id: 201,
    name: 'David Smith',
    type: 'Callback Request',
    time: '09:30am',
    requestTime: 'ASAP',
    date: 'Jan 14',
    tags: ['Medication Question'],
    patientId: 'MRN-29384'
  }];
  // Get the appropriate call data based on active tab
  const getActiveCallData = () => {
    switch (activeTab) {
      case 'voicemail':
        return voicemailData;
      case 'callbacks':
        return callbacksData;
      case 'completed':
      default:
        return completedCallData;
    }
  };
  const activeCallData = getActiveCallData();
  const pageCount = Math.ceil(activeCallData.length / callsPerPage);
  const indexOfLastCall = currentPage * callsPerPage;
  const indexOfFirstCall = indexOfLastCall - callsPerPage;
  const currentCalls = activeCallData.slice(indexOfFirstCall, indexOfLastCall);
  const handleNextPage = () => {
    if (currentPage < pageCount) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  // Close call options menu when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      setShowCallOptions(null);
    };
    document.addEventListener('click', handleClickOutside);
    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);
  // Toggle call options menu
  const handleCallOptionsClick = (e, callId) => {
    e.stopPropagation();
    setShowCallOptions(showCallOptions === callId ? null : callId);
  };
  // Get icon for call type
  const getCallTypeIcon = type => {
    if (type.includes('Voicemail')) {
      return <VoicemailIcon size={16} />;
    } else if (type.includes('Callback')) {
      return <PhoneForwarded size={16} />;
    } else {
      return <Phone size={16} />;
    }
  };
  // Handle call click for mobile view
  const handleCallClick = () => {
    setShowCallDetail(true);
  };
  // Back button for mobile view
  const handleBackClick = () => {
    setShowCallDetail(false);
  };
  return <div className="h-[calc(100vh-8rem)] flex flex-col lg:flex-row bg-white rounded-lg shadow-sm overflow-hidden">
      {/* Call List - Full width on mobile, 1/3 on desktop */}
      <div className={`${showCallDetail ? 'hidden' : 'block'} lg:block w-full lg:w-1/3 border-r border-border h-full flex flex-col`}>
        <div className="p-4 border-b border-border flex-shrink-0">
          <h2 className="text-xl font-semibold flex items-center gap-2">
            <Phone className="text-[#4169e1]" size={20} />
            Calls
          </h2>
          <div className="mt-4 flex border-b border-border overflow-x-auto">
            <button className={`pb-2 px-3 ${activeTab === 'completed' ? 'border-b-2 border-[#4169e1] text-[#4169e1] font-medium' : 'text-muted-foreground'}`} onClick={() => {
            setActiveTab('completed');
            setCurrentPage(1);
          }}>
              Completed{' '}
              <span className="bg-[#4169e1] text-white rounded-full px-1.5 py-0.5 text-xs ml-1">
                {completedCallData.length}
              </span>
            </button>
            <button className={`pb-2 px-3 ${activeTab === 'voicemail' ? 'border-b-2 border-[#4169e1] text-[#4169e1] font-medium' : 'text-muted-foreground'}`} onClick={() => {
            setActiveTab('voicemail');
            setCurrentPage(1);
          }}>
              Voicemails{' '}
              <span className={`${activeTab === 'voicemail' ? 'bg-[#4169e1] text-white' : 'bg-gray-200 text-gray-700'} rounded-full px-1.5 py-0.5 text-xs ml-1`}>
                {voicemailData.length}
              </span>
            </button>
            <button className={`pb-2 px-3 ${activeTab === 'callbacks' ? 'border-b-2 border-[#4169e1] text-[#4169e1] font-medium' : 'text-muted-foreground'}`} onClick={() => {
            setActiveTab('callbacks');
            setCurrentPage(1);
          }}>
              Callbacks{' '}
              <span className={`${activeTab === 'callbacks' ? 'bg-[#4169e1] text-white' : 'bg-gray-200 text-gray-700'} rounded-full px-1.5 py-0.5 text-xs ml-1`}>
                {callbacksData.length}
              </span>
            </button>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-muted-foreground">
              Follow ups{' '}
              <span className="bg-gray-200 text-gray-700 rounded-full px-1.5 py-0.5 text-xs ml-1">
                8
              </span>
            </div>
            <div className="text-sm text-muted-foreground">Call History</div>
          </div>
          <div className="mt-4 relative">
            <input type="text" placeholder={`Search ${activeTab === 'voicemail' ? 'voicemails' : activeTab === 'callbacks' ? 'callbacks' : 'patient calls'}...`} className="w-full p-2 pl-8 border border-border rounded-md text-sm" />
            <Search size={16} className="absolute left-2.5 top-2.5 text-muted-foreground" />
          </div>
        </div>
        <div className="overflow-y-auto flex-1 min-h-0 max-h-[calc(100%-13rem)]">
          {currentCalls.length > 0 ? currentCalls.map(call => <div key={call.id} className="p-4 border-b border-border hover:bg-accent cursor-pointer relative" onClick={() => handleCallClick()}>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#4169e1]/10 flex items-center justify-center text-[#4169e1]">
                    {getCallTypeIcon(call.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex justify-between">
                      <div className="font-medium">{call.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {call.time}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {call.type}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {call.duration && `${call.duration} • `}
                      {call.date}
                    </div>
                    {call.tags && <div className="mt-1">
                        <span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-[#4169e1]/10 text-[#4169e1]">
                          {call.tags[0]}
                        </span>
                      </div>}
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="p-1 rounded-full hover:bg-gray-200 transition-colors" onClick={e => {
                e.stopPropagation();
                setShowCallTranscript(true);
              }} title="View transcript">
                      <Eye size={16} className="text-gray-500" />
                    </button>
                    <div className="relative">
                      <button className="p-1 rounded-full hover:bg-gray-200 transition-colors" onClick={e => handleCallOptionsClick(e, call.id)} title="Call options">
                        <MoreVertical size={16} className="text-gray-500" />
                      </button>
                      {showCallOptions === call.id && <div className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg border border-gray-200 z-50">
                          <div className="py-1">
                            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                              <FileText size={14} />
                              <span>Save to patient record</span>
                            </button>
                            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                              <PhoneCall size={14} />
                              <span>Call back patient</span>
                            </button>
                            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 text-left">
                              <MessageSquare size={14} />
                              <span>Send follow-up message</span>
                            </button>
                            <button className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100 text-left">
                              <X size={14} />
                              <span>Delete record</span>
                            </button>
                          </div>
                        </div>}
                    </div>
                  </div>
                </div>
              </div>) : <div className="p-6 text-center text-muted-foreground">
              No calls found in this category
            </div>}
        </div>
        {/* Pagination - Always visible */}
        <div className="p-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50 flex-shrink-0">
          <span className="text-sm text-gray-500">
            Page {currentPage} of {pageCount || 1}
          </span>
          <div className="flex items-center gap-2">
            <button onClick={handlePrevPage} disabled={currentPage === 1} className={`p-1 rounded ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
              <ChevronLeft size={16} />
            </button>
            <button onClick={handleNextPage} disabled={currentPage === pageCount || pageCount === 0} className={`p-1 rounded ${currentPage === pageCount || pageCount === 0 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </div>
      {/* Call Detail - Hidden on mobile by default, shown when a call is clicked */}
      <div className={`${showCallDetail ? 'block' : 'hidden'} lg:block flex-1 flex flex-col h-full overflow-y-auto`}>
        {/* Mobile back button */}
        <div className="lg:hidden p-2 border-b border-border">
          <button className="flex items-center gap-2 text-[#4169e1]" onClick={handleBackClick}>
            <ArrowLeft size={18} />
            <span>Back to calls</span>
          </button>
        </div>
        <div className="p-4 overflow-y-auto">
          {/* Patient header section */}
          <div className="border border-border rounded-lg p-3 mb-4">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-lg font-medium">Sarah Johnson</h2>
                  <span className="text-sm text-muted-foreground">
                    MRN-48273
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-[#4169e1]/10 text-[#4169e1]">
                    Prescription Refill
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    High Priority
                  </span>
                </div>
                <div className="flex flex-wrap items-center gap-3 mt-1">
                  <div className="text-sm text-muted-foreground">03:23</div>
                  <div className="text-sm text-muted-foreground">
                    Jan 14, 10:17am
                  </div>
                  {/* Only show this button on mobile */}
                  <button className="text-sm text-[#4169e1] hover:underline flex items-center gap-1 lg:hidden" onClick={() => setShowPatientProfile(true)}>
                    <FileText size={14} />
                    View Patient Profile
                  </button>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium border border-dashed border-muted-foreground text-muted-foreground">
                  <Plus size={12} className="mr-1" /> Add tag
                </button>
              </div>
            </div>
          </div>
          {/* EPIC EHR Patient Profile - Desktop Only */}
          <div className="hidden lg:block border border-border rounded-lg mb-4 overflow-hidden">
            <div className="bg-blue-800 text-white p-2 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/Epic_EHR.webp" alt="Epic Systems" className="h-5 w-5" />
                <span className="font-semibold text-sm">
                  EPIC EHR - Patient Record
                </span>
              </div>
            </div>
            <div className="p-3">
              <div className="flex gap-3">
                <div className="flex-shrink-0 w-16 h-16 bg-gray-100 rounded-lg overflow-hidden">
                  <img src="/Screenshot_2025-09-01_at_23.22.12.png" alt="Sarah Johnson" className="w-full h-full object-cover" />
                </div>
                <div className="flex-1">
                  <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                    <div>
                      <p className="text-gray-500">Date of Birth</p>
                      <p className="font-medium">May 12, 1975 (48 years)</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Phone</p>
                      <p className="font-medium">(555) 123-4567</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Insurance</p>
                      <p className="font-medium">Blue Cross Blue Shield</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Address</p>
                      <p className="font-medium truncate">
                        123 Main St, New York, NY
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Current Medications */}
              <div className="mt-3">
                <h4 className="text-xs font-semibold mb-1 flex items-center gap-1">
                  <ClipboardCheck size={12} className="text-blue-600" />
                  Current Medications
                </h4>
                <div className="grid grid-cols-3 gap-2">
                  <div className="border-l-2 border-blue-600 pl-2 py-0.5">
                    <p className="text-xs font-medium">Lisinopril 10mg</p>
                    <p className="text-xs text-gray-500">Once daily</p>
                  </div>
                  <div className="border-l-2 border-blue-600 pl-2 py-0.5">
                    <p className="text-xs font-medium">Atorvastatin 20mg</p>
                    <p className="text-xs text-gray-500">Once daily</p>
                  </div>
                  <div className="border-l-2 border-blue-600 pl-2 py-0.5">
                    <p className="text-xs font-medium">Metformin 500mg</p>
                    <p className="text-xs text-gray-500">Twice daily</p>
                  </div>
                </div>
              </div>
              {/* Prescription History - Compact Table */}
              <div className="mt-3">
                <h4 className="text-xs font-semibold mb-1 flex items-center gap-1">
                  <Clock size={12} className="text-blue-600" />
                  Prescription History
                </h4>
                <div className="bg-gray-50 p-2 rounded-md text-xs">
                  <table className="w-full text-xs">
                    <thead>
                      <tr className="border-b border-gray-200">
                        <th className="text-left pb-1 font-medium">
                          Medication
                        </th>
                        <th className="text-left pb-1 font-medium">
                          Last Filled
                        </th>
                        <th className="text-left pb-1 font-medium">Refills</th>
                        <th className="text-left pb-1 font-medium">Status</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="border-b border-gray-200">
                        <td className="py-1">Lisinopril 10mg</td>
                        <td className="py-1">Dec 15, 2023</td>
                        <td className="py-1">2</td>
                        <td className="py-1">
                          <span className="bg-yellow-100 text-yellow-800 px-1 py-0.5 rounded text-xs">
                            Requested
                          </span>
                        </td>
                      </tr>
                      <tr>
                        <td className="py-1">Atorvastatin 20mg</td>
                        <td className="py-1">Jan 2, 2024</td>
                        <td className="py-1">5</td>
                        <td className="py-1">
                          <span className="bg-green-100 text-green-800 px-1 py-0.5 rounded text-xs">
                            Active
                          </span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
          {/* Two column layout for Notes and Action Items - Stack on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Notes column */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-medium">Voice Agent Notes</h3>
                <button className="text-[#4169e1] text-sm flex items-center">
                  <Plus size={14} className="mr-1" /> Add note
                </button>
              </div>
              <div className="text-sm space-y-2">
                <div className="text-xs text-muted-foreground">
                  Jan 14 - 10:17am
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-2 gap-y-1">
                  <div className="font-medium">Patient medication</div>
                  <div>Lisinopril 10mg, once daily</div>
                  <div className="font-medium">Last refill date</div>
                  <div>December 15, 2023</div>
                  <div className="font-medium">Pharmacy preference</div>
                  <div>Walgreens on 5th Avenue</div>
                  <div className="font-medium">Side effects reported</div>
                  <div>Slight dizziness in the morning</div>
                </div>
              </div>
            </div>
            {/* Action items column */}
            <div className="border border-border rounded-lg p-3">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-medium">Voice Agent Tasks</h3>
                <button className="text-[#4169e1] text-sm flex items-center">
                  <Plus size={14} className="mr-1" /> Add
                </button>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-start justify-between">
                  <div className="flex items-start">
                    <button className="flex-shrink-0 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <CheckCircle size={12} className="text-green-800" />
                    </button>
                    <span>Upload prescription to patient portal</span>
                  </div>
                </li>
                <li className="flex items-start justify-between">
                  <div className="flex items-start">
                    <button className="flex-shrink-0 w-4 h-4 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                      <AlertCircle size={12} className="text-yellow-800" />
                    </button>
                    <span>Set medication reminder for patient</span>
                  </div>
                </li>
                <li className="flex items-start justify-between">
                  <div className="flex items-start">
                    <button className="flex-shrink-0 w-4 h-4 rounded-full bg-blue-100 flex items-center justify-center mr-2">
                      <RefreshCw size={12} className="text-blue-800" />
                    </button>
                    <span>Book follow-up appointment in 30 days</span>
                  </div>
                </li>
                <li className="flex items-start justify-between">
                  <div className="flex items-start">
                    <button className="flex-shrink-0 w-4 h-4 rounded-full bg-green-100 flex items-center justify-center mr-2">
                      <CheckCircle size={12} className="text-green-800" />
                    </button>
                    <span>Send side effect monitoring instructions</span>
                  </div>
                </li>
                <li className="flex items-start justify-between">
                  <div className="flex items-start">
                    <button className="flex-shrink-0 w-4 h-4 rounded-full bg-yellow-100 flex items-center justify-center mr-2">
                      <AlertCircle size={12} className="text-yellow-800" />
                    </button>
                    <span>Update patient's medication history in EMR</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      {/* EPIC EHR Patient Profile Modal */}
      {showPatientProfile && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-4xl h-[90vh] rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="bg-blue-800 text-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img src="/Epic_EHR.webp" alt="Epic Systems" className="h-6 w-6" />
                <span className="font-semibold">EPIC EHR - Patient Record</span>
              </div>
              <button className="text-white hover:bg-blue-700 rounded-full p-1" onClick={() => setShowPatientProfile(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 md:p-6">
              <div className="flex flex-col md:flex-row items-start gap-6">
                <div className="w-full md:w-48 h-48 bg-gray-100 rounded-lg flex items-center justify-center flex-shrink-0 mb-4 md:mb-0">
                  <User size={64} className="text-gray-400" />
                </div>
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    <h2 className="text-2xl font-bold">Sarah Johnson</h2>
                    <span className="bg-blue-100 text-blue-800 px-2 py-0.5 rounded-md text-sm font-medium">
                      MRN-48273
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                    <div>
                      <p className="text-sm text-gray-500">Date of Birth</p>
                      <p className="font-medium">May 12, 1975 (48 years)</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Gender</p>
                      <p className="font-medium">Female</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Phone</p>
                      <p className="font-medium">(555) 123-4567</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Email</p>
                      <p className="font-medium">sarah.johnson@example.com</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Address</p>
                      <p className="font-medium">
                        123 Main Street, Apt 4B, New York, NY 10001
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Insurance</p>
                      <p className="font-medium">
                        Blue Cross Blue Shield (ID: BCBS12345678)
                      </p>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <ClipboardCheck size={18} className="text-blue-600" />
                      Current Medications
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="border-l-4 border-blue-600 pl-3 py-1">
                          <p className="font-medium">Lisinopril 10mg</p>
                          <p className="text-sm text-gray-500">Once daily</p>
                          <p className="text-xs text-gray-400">
                            Prescribed: Nov 15, 2023
                          </p>
                        </div>
                        <div className="border-l-4 border-blue-600 pl-3 py-1">
                          <p className="font-medium">Atorvastatin 20mg</p>
                          <p className="text-sm text-gray-500">
                            Once daily at bedtime
                          </p>
                          <p className="text-xs text-gray-400">
                            Prescribed: Jan 5, 2023
                          </p>
                        </div>
                        <div className="border-l-4 border-blue-600 pl-3 py-1">
                          <p className="font-medium">Metformin 500mg</p>
                          <p className="text-sm text-gray-500">
                            Twice daily with meals
                          </p>
                          <p className="text-xs text-gray-400">
                            Prescribed: Dec 10, 2023
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Calendar size={18} className="text-blue-600" />
                      Recent Appointments
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md">
                      <div className="space-y-3">
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 border-b border-gray-200">
                          <div className="mb-2 sm:mb-0">
                            <p className="font-medium">Annual Physical</p>
                            <p className="text-sm text-gray-500">
                              Dr. Michael Chen
                            </p>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="font-medium">January 5, 2024</p>
                            <p className="text-sm text-gray-500">9:30 AM</p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center pb-2 border-b border-gray-200">
                          <div className="mb-2 sm:mb-0">
                            <p className="font-medium">Cardiology Follow-up</p>
                            <p className="text-sm text-gray-500">
                              Dr. Emily Rodriguez
                            </p>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="font-medium">December 12, 2023</p>
                            <p className="text-sm text-gray-500">2:15 PM</p>
                          </div>
                        </div>
                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center">
                          <div className="mb-2 sm:mb-0">
                            <p className="font-medium">Diabetes Management</p>
                            <p className="text-sm text-gray-500">
                              Dr. James Wilson
                            </p>
                          </div>
                          <div className="text-left sm:text-right">
                            <p className="font-medium">November 20, 2023</p>
                            <p className="text-sm text-gray-500">11:00 AM</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2 flex items-center gap-2">
                      <Clock size={18} className="text-blue-600" />
                      Prescription History
                    </h3>
                    <div className="bg-gray-50 p-4 rounded-md overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-gray-200">
                            <th className="text-left pb-2 font-medium">
                              Medication
                            </th>
                            <th className="text-left pb-2 font-medium">
                              Dosage
                            </th>
                            <th className="text-left pb-2 font-medium">
                              Last Filled
                            </th>
                            <th className="text-left pb-2 font-medium">
                              Refills
                            </th>
                            <th className="text-left pb-2 font-medium">
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          <tr className="border-b border-gray-200">
                            <td className="py-2">Lisinopril</td>
                            <td className="py-2">10mg, once daily</td>
                            <td className="py-2">Dec 15, 2023</td>
                            <td className="py-2">2 remaining</td>
                            <td className="py-2">
                              <span className="bg-yellow-100 text-yellow-800 px-2 py-0.5 rounded text-xs">
                                Refill requested
                              </span>
                            </td>
                          </tr>
                          <tr className="border-b border-gray-200">
                            <td className="py-2">Atorvastatin</td>
                            <td className="py-2">20mg, once daily</td>
                            <td className="py-2">Jan 2, 2024</td>
                            <td className="py-2">5 remaining</td>
                            <td className="py-2">
                              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                                Active
                              </span>
                            </td>
                          </tr>
                          <tr>
                            <td className="py-2">Metformin</td>
                            <td className="py-2">500mg, twice daily</td>
                            <td className="py-2">Dec 10, 2023</td>
                            <td className="py-2">3 remaining</td>
                            <td className="py-2">
                              <span className="bg-green-100 text-green-800 px-2 py-0.5 rounded text-xs">
                                Active
                              </span>
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-3 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button className="bg-blue-600 text-white px-4 py-2 rounded flex items-center gap-1 text-sm">
                  <RefreshCw size={14} />
                  Update Record
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded flex items-center gap-1 text-sm">
                  <Calendar size={14} />
                  Schedule Appointment
                </button>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-500 w-full sm:w-auto text-center sm:text-right">
                <HelpCircle size={14} />
                <span>Last updated: Jan 14, 2024 at 10:45 AM</span>
              </div>
            </div>
          </div>
        </div>}
      {/* Call Transcript Modal */}
      {showCallTranscript && <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white w-full max-w-3xl h-[90vh] rounded-lg shadow-lg overflow-hidden flex flex-col">
            <div className="bg-[#4169e1] text-white p-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <MessageSquare size={18} />
                <span className="font-semibold">
                  Call Transcript - Sarah Johnson
                </span>
              </div>
              <button className="text-white hover:bg-[#3a5ecc] rounded-full p-1" onClick={() => setShowCallTranscript(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="flex-1 overflow-auto p-4 md:p-6">
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4169e1]/10 flex items-center justify-center text-[#4169e1] flex-shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">AI Voice Agent</span>
                      <span className="text-xs text-gray-500">10:17am</span>
                    </div>
                    <p className="mt-1">
                      Hello, thank you for calling Novocuris Medical Center.
                      This is Maya, your AI assistant. How may I help you today?
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
                    <User size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Sarah Johnson</span>
                      <span className="text-xs text-gray-500">10:17am</span>
                    </div>
                    <p className="mt-1">
                      Hi, I'm calling to request a refill for my blood pressure
                      medication. It's Lisinopril 10mg.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4169e1]/10 flex items-center justify-center text-[#4169e1] flex-shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">AI Voice Agent</span>
                      <span className="text-xs text-gray-500">10:18am</span>
                    </div>
                    <p className="mt-1">
                      I'd be happy to help you with that refill request, Sarah.
                      Can you please confirm your date of birth for
                      verification?
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
                    <User size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Sarah Johnson</span>
                      <span className="text-xs text-gray-500">10:18am</span>
                    </div>
                    <p className="mt-1">May 12, 1975.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4169e1]/10 flex items-center justify-center text-[#4169e1] flex-shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">AI Voice Agent</span>
                      <span className="text-xs text-gray-500">10:18am</span>
                    </div>
                    <p className="mt-1">
                      Thank you for confirming. I see you're requesting a refill
                      for Lisinopril 10mg, once daily. Your last refill was on
                      December 15, 2023. Would you like us to send this refill
                      to the same pharmacy as before - Walgreens on 5th Avenue?
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
                    <User size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Sarah Johnson</span>
                      <span className="text-xs text-gray-500">10:19am</span>
                    </div>
                    <p className="mt-1">Yes, the same pharmacy please.</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4169e1]/10 flex items-center justify-center text-[#4169e1] flex-shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">AI Voice Agent</span>
                      <span className="text-xs text-gray-500">10:19am</span>
                    </div>
                    <p className="mt-1">
                      Great. Before I submit this request, I need to ask - have
                      you experienced any side effects or concerns with this
                      medication that you'd like to report to your doctor?
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
                    <User size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Sarah Johnson</span>
                      <span className="text-xs text-gray-500">10:19am</span>
                    </div>
                    <p className="mt-1">
                      Well, I've been feeling a little dizzy sometimes in the
                      morning after taking it, but it usually goes away after
                      breakfast.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4169e1]/10 flex items-center justify-center text-[#4169e1] flex-shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">AI Voice Agent</span>
                      <span className="text-xs text-gray-500">10:20am</span>
                    </div>
                    <p className="mt-1">
                      Thank you for sharing that information. I'll make note of
                      the morning dizziness you're experiencing and include it
                      in your refill request for your doctor to review. This may
                      be something your doctor will want to discuss with you.
                      Would you like me to schedule a follow-up appointment to
                      discuss these side effects?
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
                    <User size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Sarah Johnson</span>
                      <span className="text-xs text-gray-500">10:20am</span>
                    </div>
                    <p className="mt-1">
                      Yes, that would be good. Maybe in about a month or so?
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4169e1]/10 flex items-center justify-center text-[#4169e1] flex-shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">AI Voice Agent</span>
                      <span className="text-xs text-gray-500">10:20am</span>
                    </div>
                    <p className="mt-1">
                      I'll add a request to schedule a follow-up appointment in
                      30 days. Your refill request for Lisinopril 10mg has been
                      submitted to your doctor for approval. You should receive
                      a notification when it's ready for pickup, usually within
                      24-48 hours. Is there anything else I can help you with
                      today?
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-600 flex-shrink-0">
                    <User size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Sarah Johnson</span>
                      <span className="text-xs text-gray-500">10:21am</span>
                    </div>
                    <p className="mt-1">
                      No, that's all. Thank you for your help.
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-8 h-8 rounded-full bg-[#4169e1]/10 flex items-center justify-center text-[#4169e1] flex-shrink-0">
                    <Phone size={16} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="font-medium">AI Voice Agent</span>
                      <span className="text-xs text-gray-500">10:21am</span>
                    </div>
                    <p className="mt-1">
                      You're welcome, Sarah. Thank you for calling Novocuris
                      Medical Center. If you have any other questions or
                      concerns, please don't hesitate to call back. Have a great
                      day!
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-100 p-3 flex flex-col sm:flex-row justify-between items-center gap-3">
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
                <button className="bg-[#4169e1] text-white px-4 py-2 rounded flex items-center gap-1 text-sm">
                  <FileText size={14} />
                  Save to Patient Record
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded flex items-center gap-1 text-sm">
                  <MessageSquare size={14} />
                  Send to Doctor
                </button>
              </div>
              <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-center sm:justify-end">
                <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm">
                  Download Transcript
                </button>
                <button className="bg-white border border-gray-300 text-gray-700 px-3 py-1 rounded text-sm">
                  Print
                </button>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default VoiceAgent;