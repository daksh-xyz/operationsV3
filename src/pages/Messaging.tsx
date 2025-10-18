import React, { useEffect, useState, useRef } from 'react';
import { Bell, MessageSquare, Instagram, Facebook, Phone, Search, Filter, User, Clock, Flag, Calendar, CheckCircle, FileText, ChevronRight, AlertTriangle, ChevronLeft, ChevronDown, ChevronUp, Mail, X, Menu, ArrowLeft } from 'lucide-react';
const channels = [{
  id: 'urgent',
  name: 'Urgent',
  icon: AlertTriangle,
  count: 2,
  color: 'text-red-500',
  bgColor: 'bg-red-100/50',
  activeColor: 'bg-red-100',
  activeTextColor: 'text-red-600'
}, {
  id: 'all',
  name: 'All',
  icon: MessageSquare,
  count: 24
}, {
  id: 'email',
  name: 'Email',
  icon: Mail,
  count: 8
}, {
  id: 'instagram',
  name: 'Instagram',
  icon: Instagram,
  count: 5
}, {
  id: 'facebook',
  name: 'Facebook',
  icon: Facebook,
  count: 3
}, {
  id: 'whatsapp',
  name: 'WhatsApp',
  icon: Phone,
  count: 6
}, {
  id: 'portal',
  name: 'Portal',
  icon: User,
  count: 2
}];
const messages = [{
  id: 1,
  channel: 'email',
  patient: 'John Smith',
  subject: 'Appointment Rescheduling',
  message: 'I need to reschedule my appointment from Friday to next Monday if possible.',
  time: '10 mins ago',
  unread: true,
  needsAttention: true,
  actions: [{
    type: 'appointment',
    status: 'scheduled',
    details: 'Appointment rescheduled with Dr. Wilson for Monday, 10:00 AM',
    date: '2023-09-05T10:00:00'
  }]
}, {
  id: 2,
  channel: 'whatsapp',
  patient: 'Sarah Johnson',
  subject: 'Medication Question',
  message: "Is it okay if I take my medication with food? The instructions weren't clear.",
  time: '25 mins ago',
  unread: true,
  needsAttention: false,
  actions: [{
    type: 'referral',
    status: 'completed',
    details: 'Referred to Dr. Martinez for medication consultation',
    date: '2023-09-02T14:30:00'
  }]
}, {
  id: 3,
  channel: 'instagram',
  patient: 'Michael Brown',
  subject: 'Lab Results',
  message: 'When will my lab results be available? I had blood work done yesterday.',
  time: '1 hour ago',
  unread: false,
  needsAttention: true,
  actions: []
}, {
  id: 4,
  channel: 'portal',
  patient: 'Emily Davis',
  subject: 'Insurance Coverage',
  message: "I'm wondering if my insurance will cover the specialist referral I received.",
  time: '2 hours ago',
  unread: false,
  needsAttention: false,
  actions: [{
    type: 'document',
    status: 'sent',
    details: 'Insurance verification document sent to patient',
    date: '2023-09-01T16:45:00'
  }]
}, {
  id: 5,
  channel: 'facebook',
  patient: 'Robert Wilson',
  subject: 'Follow-up Appointment',
  message: 'Do I need to schedule a follow-up appointment after my procedure next week?',
  time: '3 hours ago',
  unread: false,
  needsAttention: false,
  actions: [{
    type: 'appointment',
    status: 'scheduled',
    details: 'Follow-up appointment scheduled with Dr. Garcia for September 15',
    date: '2023-09-15T11:30:00'
  }]
}, {
  id: 6,
  channel: 'email',
  patient: 'Jennifer Adams',
  subject: 'Medical Records Request',
  message: 'I need a copy of my medical records for a specialist appointment next week.',
  time: '4 hours ago',
  unread: false,
  needsAttention: false,
  actions: []
}, {
  id: 7,
  channel: 'whatsapp',
  patient: 'David Miller',
  subject: 'Prescription Refill',
  message: 'My blood pressure medication is running low. Can I get a refill?',
  time: '5 hours ago',
  unread: false,
  needsAttention: false,
  actions: []
}, {
  id: 8,
  channel: 'email',
  patient: 'Lisa Johnson',
  subject: 'Bill Question',
  message: 'I received a bill that I think my insurance should have covered. Can you help?',
  time: '6 hours ago',
  unread: false,
  needsAttention: false,
  actions: []
}, {
  id: 9,
  channel: 'instagram',
  patient: 'Thomas Wright',
  subject: 'Clinic Hours',
  message: 'Are you open this Saturday? I need to come in for a quick check-up.',
  time: '7 hours ago',
  unread: false,
  needsAttention: false,
  actions: []
}, {
  id: 10,
  channel: 'email',
  patient: 'Maria Rodriguez',
  subject: 'Telehealth Question',
  message: 'How do I connect to my telehealth appointment scheduled for tomorrow?',
  time: '8 hours ago',
  unread: false,
  needsAttention: false,
  actions: []
}, {
  id: 11,
  channel: 'whatsapp',
  patient: 'James Wilson',
  subject: 'Test Results',
  message: "When will my blood test results be available? It's been a week.",
  time: '9 hours ago',
  unread: false,
  needsAttention: false,
  actions: '[]'
}];
const Messaging = () => {
  const [selectedChannel, setSelectedChannel] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [isChannelExpanded, setIsChannelExpanded] = useState(false);
  const [isActionsExpanded, setIsActionsExpanded] = useState(true);
  const [showChannelDropdown, setShowChannelDropdown] = useState(false);
  const [showMessageModal, setShowMessageModal] = useState(false);
  const channelDropdownRef = useRef(null);
  const messagesPerPage = 10;
  const filteredMessages = selectedChannel === 'all' ? messages : selectedChannel === 'urgent' ? messages.filter(msg => msg.needsAttention) : messages.filter(msg => msg.channel === selectedChannel);
  const pageCount = Math.ceil(filteredMessages.length / messagesPerPage);
  const indexOfLastMessage = currentPage * messagesPerPage;
  const indexOfFirstMessage = indexOfLastMessage - messagesPerPage;
  const currentMessages = filteredMessages.slice(indexOfFirstMessage, indexOfLastMessage);
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
  const handleMessageClick = msg => {
    setSelectedMessage(msg);
    setShowMessageModal(true);
  };
  const handleCloseModal = () => {
    setShowMessageModal(false);
  };
  // Close channel dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = event => {
      if (channelDropdownRef.current && !channelDropdownRef.current.contains(event.target)) {
        setShowChannelDropdown(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  // Get channel object by ID
  const getChannelById = id => {
    return channels.find(channel => channel.id === id) || channels[1]; // Default to 'all'
  };
  const currentChannel = getChannelById(selectedChannel);
  return <div className="h-[calc(100vh-8rem)] bg-white rounded-lg shadow-sm flex flex-col">
      <div className="flex items-center justify-between p-4 border-b border-gray-100">
        <h1 className="text-xl font-bold tracking-tight">Patient Messaging</h1>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc] transition-colors">
            Compose Message
          </button>
        </div>
      </div>

      {/* Mobile Channel Selector Dropdown */}
      <div className="p-2 border-b border-gray-100 flex items-center justify-between md:hidden">
        <div className="relative" ref={channelDropdownRef}>
          <button className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-md text-gray-800" onClick={() => setShowChannelDropdown(!showChannelDropdown)}>
            <currentChannel.icon size={16} className={currentChannel.color || ''} />
            <span>{currentChannel.name}</span>
            <span className={`rounded-full px-2 py-0.5 text-xs ml-1 ${selectedChannel === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-[#4169e1]/20 text-[#4169e1]'}`}>
              {currentChannel.count}
            </span>
            <ChevronDown size={16} />
          </button>
          {showChannelDropdown && <div className="absolute top-full left-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200">
              {channels.map(channel => <button key={channel.id} className={`flex items-center gap-2 w-full text-left px-3 py-2 ${selectedChannel === channel.id ? channel.id === 'urgent' ? 'bg-red-100/50 text-red-600' : 'bg-[#4169e1]/10 text-[#4169e1]' : 'hover:bg-gray-50'}`} onClick={() => {
            setSelectedChannel(channel.id);
            setCurrentPage(1);
            setShowChannelDropdown(false);
          }}>
                  <channel.icon size={16} className={channel.color || ''} />
                  <span>{channel.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-xs ml-auto ${selectedChannel === channel.id ? channel.id === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-[#4169e1]/20 text-[#4169e1]' : 'bg-gray-100 text-gray-600'}`}>
                    {channel.count}
                  </span>
                </button>)}
            </div>}
        </div>
      </div>

      {/* Horizontal Channel Tabs - Hidden on mobile */}
      <div className="hidden md:flex p-2 border-b border-gray-100 items-center">
        <div className="flex items-center overflow-x-auto scrollbar-hide">
          {channels.slice(0, isChannelExpanded ? channels.length : 5).map(channel => <button key={channel.id} className={`flex items-center gap-1 px-3 py-2 mx-1 rounded-md whitespace-nowrap ${selectedChannel === channel.id ? channel.id === 'urgent' ? 'bg-red-100/50 text-red-600 font-medium' : 'bg-[#4169e1]/10 text-[#4169e1] font-medium' : 'text-gray-700 hover:bg-gray-100'}`} onClick={() => {
          setSelectedChannel(channel.id);
          setCurrentPage(1);
        }}>
                <channel.icon size={16} className={channel.color || ''} />
                <span>{channel.name}</span>
                <span className={`rounded-full px-2 py-0.5 text-xs ml-1 ${selectedChannel === channel.id ? channel.id === 'urgent' ? 'bg-red-100 text-red-600' : 'bg-[#4169e1]/20 text-[#4169e1]' : 'bg-gray-100 text-gray-600'}`}>
                  {channel.count}
                </span>
              </button>)}
        </div>
        <button className="ml-2 p-1 rounded-md hover:bg-gray-100" onClick={() => setIsChannelExpanded(!isChannelExpanded)}>
          {isChannelExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
        </button>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Messages list - Full width on mobile, 2/5 on desktop */}
        <div className="w-full md:w-2/5 border-r border-gray-100 flex flex-col">
          <div className="p-3 border-b border-gray-100">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input type="text" placeholder="Search messages..." className="h-10 w-full rounded-md border border-gray-200 bg-white pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169e1] focus:border-transparent" />
            </div>
          </div>
          <div className="p-3 border-b border-gray-100 flex items-center justify-between bg-gray-50/50">
            <div className="text-sm font-medium text-gray-700">
              {filteredMessages.length} messages
              {selectedChannel === 'urgent' && <span className="ml-2 text-red-600">• Needs attention</span>}
            </div>
            <button className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900">
              <Filter size={14} />
              <span>Filter</span>
            </button>
          </div>
          <div className="overflow-y-auto flex-1">
            {currentMessages.map(msg => <div key={msg.id} className={`p-4 border-b border-gray-100 cursor-pointer hover:bg-gray-50 transition-colors ${msg.unread ? 'bg-blue-50/50' : msg.needsAttention && selectedChannel === 'urgent' ? 'bg-red-50/30' : ''}`} onClick={() => handleMessageClick(msg)}>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <User size={18} className="text-gray-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        {msg.patient}
                        {msg.unread && <span className="h-2 w-2 rounded-full bg-[#4169e1]"></span>}
                        {msg.needsAttention && <Flag size={14} className="text-red-500" />}
                      </div>
                      <div className="text-sm text-gray-600">{msg.subject}</div>
                    </div>
                  </div>
                  <div className="flex items-center text-xs text-gray-500">
                    <Clock size={12} className="mr-1" />
                    {msg.time}
                  </div>
                </div>
                <div className="mt-2 text-sm text-gray-600 line-clamp-2">
                  {msg.message}
                </div>
                <div className="mt-2 flex flex-wrap items-center gap-2">
                  {msg.channel === 'email' && <span className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      <Mail size={10} className="mr-1" />
                      Email
                    </span>}
                  {msg.channel === 'whatsapp' && <span className="inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800">
                      <Phone size={10} className="mr-1" />
                      WhatsApp
                    </span>}
                  {msg.channel === 'instagram' && <span className="inline-flex items-center rounded-full bg-purple-100 px-2.5 py-0.5 text-xs font-medium text-purple-800">
                      <Instagram size={10} className="mr-1" />
                      Instagram
                    </span>}
                  {msg.channel === 'facebook' && <span className="inline-flex items-center rounded-full bg-indigo-100 px-2.5 py-0.5 text-xs font-medium text-indigo-800">
                      <Facebook size={10} className="mr-1" />
                      Facebook
                    </span>}
                  {msg.channel === 'portal' && <span className="inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800">
                      <User size={10} className="mr-1" />
                      Portal
                    </span>}
                  {msg.needsAttention && <span className="inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800">
                      <AlertTriangle size={10} className="mr-1" />
                      Urgent
                    </span>}
                  {msg.actions.length > 0 && <span className="inline-flex items-center rounded-full bg-emerald-100 px-2.5 py-0.5 text-xs font-medium text-emerald-800 ml-auto">
                      <CheckCircle size={10} className="mr-1" />
                      Action Taken
                    </span>}
                </div>
              </div>)}
          </div>
          {/* Pagination */}
          {pageCount > 1 && <div className="p-3 border-t border-gray-100 flex items-center justify-between bg-gray-50/50">
              <span className="text-sm text-gray-500">
                Page {currentPage} of {pageCount}
              </span>
              <div className="flex items-center gap-2">
                <button onClick={handlePrevPage} disabled={currentPage === 1} className={`p-1 rounded ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <ChevronLeft size={16} />
                </button>
                <button onClick={handleNextPage} disabled={currentPage === pageCount} className={`p-1 rounded ${currentPage === pageCount ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
                  <ChevronRight size={16} />
                </button>
              </div>
            </div>}
        </div>

        {/* Message view - Hidden on mobile, 3/5 width on desktop */}
        <div className="hidden md:flex md:w-3/5 flex-col bg-white">
          {selectedMessage ? <>
              <div className="p-4 border-b border-gray-100 bg-white">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <User size={18} className="text-gray-500" />
                    </div>
                    <div>
                      <div className="font-medium text-gray-900 flex items-center gap-2">
                        {selectedMessage.patient}
                        {selectedMessage.needsAttention && <Flag size={14} className="text-red-500" />}
                      </div>
                      <div className="text-sm text-gray-600">
                        {selectedMessage.subject}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="text-sm text-[#4169e1] hover:underline">
                      Patient Profile
                    </button>
                    <button className="text-sm text-[#4169e1] hover:underline">
                      View History
                    </button>
                  </div>
                </div>
              </div>
              <div className="flex-1 overflow-y-auto p-4">
                {/* Collapsible Actions Section */}
                {selectedMessage.actions.length > 0 && <div className="mb-4 bg-emerald-50 rounded-lg border border-emerald-100 overflow-hidden">
                    <div className="p-3 flex items-center justify-between cursor-pointer hover:bg-emerald-100/50" onClick={() => setIsActionsExpanded(!isActionsExpanded)}>
                      <h3 className="text-sm font-medium text-emerald-800 flex items-center">
                        <CheckCircle size={16} className="mr-2" />
                        Actions Taken
                      </h3>
                      {isActionsExpanded ? <ChevronUp size={16} className="text-emerald-700" /> : <ChevronDown size={16} className="text-emerald-700" />}
                    </div>
                    {isActionsExpanded && <div className="p-3 pt-0">
                        {selectedMessage.actions.map((action, index) => <div key={index} className="flex items-start gap-2 text-sm text-emerald-700 mb-1 last:mb-0">
                            {action.type === 'appointment' && <>
                                <Calendar size={14} className="mt-0.5 flex-shrink-0" />
                                <span>{action.details}</span>
                              </>}
                            {action.type === 'document' && <>
                                <FileText size={14} className="mt-0.5 flex-shrink-0" />
                                <span>{action.details}</span>
                              </>}
                            {action.type === 'referral' && <>
                                <ChevronRight size={14} className="mt-0.5 flex-shrink-0" />
                                <span>{action.details}</span>
                              </>}
                          </div>)}
                      </div>}
                  </div>}
                {selectedMessage.needsAttention && <div className="mb-4 bg-red-50 rounded-lg p-3 border border-red-100">
                    <div className="flex items-center gap-2 text-sm text-red-700">
                      <AlertTriangle size={16} />
                      <span>This message requires human attention</span>
                    </div>
                  </div>}
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mt-1">
                      <User size={16} className="text-gray-500" />
                    </div>
                    <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-gray-800">
                        {selectedMessage.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {selectedMessage.time}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 justify-end">
                    <div className="bg-[#4169e1]/10 rounded-lg p-3 max-w-[80%]">
                      <p className="text-sm text-gray-800">
                        Thank you for your message. I'll check with the doctor
                        and get back to you shortly.
                      </p>
                      <p className="text-xs text-gray-500 mt-1">5 mins ago</p>
                    </div>
                    <div className="h-8 w-8 rounded-full bg-[#4169e1] flex items-center justify-center mt-1">
                      <span className="text-xs text-white font-medium">AI</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="p-4 border-t border-gray-100 bg-white">
                <div className="flex items-center gap-2">
                  <div className="flex-1">
                    <textarea className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#4169e1] focus:border-transparent" placeholder="Type your message..."></textarea>
                  </div>
                  <div>
                    <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc] transition-colors h-10">
                      Send
                    </button>
                  </div>
                </div>
                <div className="mt-2 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <button className="flex items-center gap-1 hover:text-gray-900">
                      <span>AI Assist</span>
                    </button>
                    <button className="flex items-center gap-1 hover:text-gray-900">
                      <span>Templates</span>
                    </button>
                  </div>
                  <div>
                    <button className="text-sm text-[#4169e1] hover:underline">
                      Create Workflow
                    </button>
                  </div>
                </div>
              </div>
            </> : <div className="flex items-center justify-center h-full text-gray-500">
              <div className="text-center">
                <MessageSquare size={48} className="mx-auto mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-700">
                  No message selected
                </h3>
                <p className="text-sm">
                  Select a message from the list to view it here
                </p>
              </div>
            </div>}
        </div>
      </div>

      {/* Message Modal - Shown on mobile when a message is selected */}
      {showMessageModal && <div className="fixed inset-0 bg-black/50 z-50 flex md:hidden">
          <div className="bg-white w-full h-full flex flex-col">
            <div className="p-3 border-b border-gray-100 flex items-center">
              <button className="p-2 mr-2 rounded-full hover:bg-gray-100" onClick={handleCloseModal}>
                <ArrowLeft size={20} />
              </button>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-gray-100 flex items-center justify-center">
                  <User size={18} className="text-gray-500" />
                </div>
                <div>
                  <div className="font-medium text-gray-900 flex items-center gap-2">
                    {selectedMessage.patient}
                    {selectedMessage.needsAttention && <Flag size={14} className="text-red-500" />}
                  </div>
                  <div className="text-sm text-gray-600">
                    {selectedMessage.subject}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              {/* Collapsible Actions Section */}
              {selectedMessage.actions.length > 0 && <div className="mb-4 bg-emerald-50 rounded-lg border border-emerald-100 overflow-hidden">
                  <div className="p-3 flex items-center justify-between cursor-pointer hover:bg-emerald-100/50" onClick={() => setIsActionsExpanded(!isActionsExpanded)}>
                    <h3 className="text-sm font-medium text-emerald-800 flex items-center">
                      <CheckCircle size={16} className="mr-2" />
                      Actions Taken
                    </h3>
                    {isActionsExpanded ? <ChevronUp size={16} className="text-emerald-700" /> : <ChevronDown size={16} className="text-emerald-700" />}
                  </div>
                  {isActionsExpanded && <div className="p-3 pt-0">
                      {selectedMessage.actions.map((action, index) => <div key={index} className="flex items-start gap-2 text-sm text-emerald-700 mb-1 last:mb-0">
                          {action.type === 'appointment' && <>
                              <Calendar size={14} className="mt-0.5 flex-shrink-0" />
                              <span>{action.details}</span>
                            </>}
                          {action.type === 'document' && <>
                              <FileText size={14} className="mt-0.5 flex-shrink-0" />
                              <span>{action.details}</span>
                            </>}
                          {action.type === 'referral' && <>
                              <ChevronRight size={14} className="mt-0.5 flex-shrink-0" />
                              <span>{action.details}</span>
                            </>}
                        </div>)}
                    </div>}
                </div>}
              {selectedMessage.needsAttention && <div className="mb-4 bg-red-50 rounded-lg p-3 border border-red-100">
                  <div className="flex items-center gap-2 text-sm text-red-700">
                    <AlertTriangle size={16} />
                    <span>This message requires human attention</span>
                  </div>
                </div>}
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center mt-1">
                    <User size={16} className="text-gray-500" />
                  </div>
                  <div className="bg-gray-100 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-gray-800">
                      {selectedMessage.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-1">
                      {selectedMessage.time}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 justify-end">
                  <div className="bg-[#4169e1]/10 rounded-lg p-3 max-w-[80%]">
                    <p className="text-sm text-gray-800">
                      Thank you for your message. I'll check with the doctor and
                      get back to you shortly.
                    </p>
                    <p className="text-xs text-gray-500 mt-1">5 mins ago</p>
                  </div>
                  <div className="h-8 w-8 rounded-full bg-[#4169e1] flex items-center justify-center mt-1">
                    <span className="text-xs text-white font-medium">AI</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="p-4 border-t border-gray-100 bg-white">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <textarea className="w-full rounded-md border border-gray-200 bg-white px-3 py-2 text-sm min-h-[80px] focus:outline-none focus:ring-2 focus:ring-[#4169e1] focus:border-transparent" placeholder="Type your message..."></textarea>
                </div>
                <div>
                  <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-4 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc] transition-colors h-10">
                    Send
                  </button>
                </div>
              </div>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-4 text-sm text-gray-600">
                  <button className="flex items-center gap-1 hover:text-gray-900">
                    <span>AI Assist</span>
                  </button>
                  <button className="flex items-center gap-1 hover:text-gray-900">
                    <span>Templates</span>
                  </button>
                </div>
                <div>
                  <button className="text-sm text-[#4169e1] hover:underline">
                    Create Workflow
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>}
    </div>;
};
export default Messaging;