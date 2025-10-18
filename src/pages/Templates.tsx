import React, { useState } from 'react';
import { Search, Filter, Plus, Download, Star, FileText, ChevronLeft, ChevronRight, ChevronUp, ChevronDown, Bot, Mail, Calendar, Database, MessageSquare, Users, Activity } from 'lucide-react';
const categories = [{
  id: 'all',
  name: 'All Templates'
}, {
  id: 'healthcare',
  name: 'Healthcare'
}, {
  id: 'automation',
  name: 'Automation'
}, {
  id: 'communication',
  name: 'Communication'
}, {
  id: 'data',
  name: 'Data Processing'
}];
const templates = [{
  id: 1,
  name: 'Patient Registration Automation',
  description: 'Automates patient intake and registration process',
  category: 'healthcare',
  downloads: 1240,
  popularity: 4.8,
  icon: Users,
  color: 'bg-blue-100 text-blue-600'
}, {
  id: 2,
  name: 'Appointment Scheduling',
  description: 'Manages appointment bookings and reminders',
  category: 'healthcare',
  downloads: 892,
  popularity: 4.6,
  icon: Calendar,
  color: 'bg-green-100 text-green-600'
}, {
  id: 3,
  name: 'Email Response Automation',
  description: 'Automatically responds to patient inquiries',
  category: 'communication',
  downloads: 756,
  popularity: 4.5,
  icon: Mail,
  color: 'bg-purple-100 text-purple-600'
}, {
  id: 4,
  name: 'Lab Results Processing',
  description: 'Processes and distributes lab results',
  category: 'data',
  downloads: 634,
  popularity: 4.7,
  icon: Database,
  color: 'bg-orange-100 text-orange-600'
}, {
  id: 5,
  name: 'Patient Follow-up',
  description: 'Automated patient follow-up workflows',
  category: 'healthcare',
  downloads: 523,
  popularity: 4.4,
  icon: MessageSquare,
  color: 'bg-red-100 text-red-600'
}, {
  id: 6,
  name: 'Insurance Verification',
  description: 'Verifies patient insurance information',
  category: 'automation',
  downloads: 445,
  popularity: 4.3,
  icon: Activity,
  color: 'bg-indigo-100 text-indigo-600'
}];
const Templates = () => {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [isCategoriesExpanded, setIsCategoriesExpanded] = useState(false);
  const templatesPerPage = 6;
  const filteredTemplates = templates.filter(template => {
    const matchesCategory = selectedCategory === 'all' || template.category === selectedCategory;
    const matchesSearch = template.name.toLowerCase().includes(searchQuery.toLowerCase()) || template.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });
  const pageCount = Math.ceil(filteredTemplates.length / templatesPerPage);
  const indexOfLastTemplate = currentPage * templatesPerPage;
  const indexOfFirstTemplate = indexOfLastTemplate - templatesPerPage;
  const currentTemplates = filteredTemplates.slice(indexOfFirstTemplate, indexOfLastTemplate);
  return <div>
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold tracking-tight">
          Automation Templates
        </h1>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center justify-center rounded-md bg-black px-4 py-2 text-sm font-medium text-white hover:bg-black/80">
            <Plus size={16} className="mr-2" />
            Create Template
          </button>
        </div>
      </div>
      <div className="flex items-center mb-6 gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <input type="text" placeholder="Search templates..." className="h-10 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-primary" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex items-center gap-2">
          <button className="inline-flex items-center text-sm text-muted-foreground">
            <Filter size={14} className="mr-1" />
            Filter
          </button>
          <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option>Most Popular</option>
            <option>Recently Added</option>
            <option>Most Downloaded</option>
          </select>
        </div>
      </div>
      {/* Horizontal category tabs */}
      <div className="mb-6 border-b border-gray-200 pb-2">
        <div className="flex items-center">
          <div className="flex items-center overflow-x-auto scrollbar-hide">
            {categories.slice(0, isCategoriesExpanded ? categories.length : 4).map(category => <button key={category.id} className={`flex items-center whitespace-nowrap px-4 py-2 text-sm rounded-md mr-2 ${selectedCategory === category.id ? 'bg-black/10 text-black font-medium' : 'text-foreground hover:bg-accent'}`} onClick={() => {
            setSelectedCategory(category.id);
            setCurrentPage(1);
          }}>
                  {category.name}
                </button>)}
          </div>
          <button className="ml-2 p-1 rounded-md hover:bg-gray-100" onClick={() => setIsCategoriesExpanded(!isCategoriesExpanded)}>
            {isCategoriesExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        </div>
      </div>
      {/* Templates grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[400px]">
        {currentTemplates.map(template => <div key={template.id} className="rounded-lg border bg-card text-card-foreground shadow-sm overflow-hidden">
            <div className={`p-4 ${template.color}`}>
              <template.icon size={24} />
            </div>
            <div className="p-4">
              <h3 className="font-medium mb-1">{template.name}</h3>
              <p className="text-sm text-muted-foreground mb-4">
                {template.description}
              </p>
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <Star size={14} className="text-yellow-400 fill-yellow-400" />
                  <Star size={14} className={template.popularity >= 4.8 ? 'text-yellow-400 fill-yellow-400' : 'text-yellow-400 fill-none'} />
                  <span className="text-xs text-muted-foreground ml-1">
                    {template.popularity}
                  </span>
                </div>
                <div className="text-xs text-muted-foreground">
                  {template.downloads} downloads
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button className="inline-flex items-center justify-center rounded-md bg-primary px-3 py-1 text-xs font-medium text-primary-foreground flex-1">
                  Use Template
                </button>
                <button className="inline-flex items-center justify-center rounded-md border border-input bg-background p-1 text-xs">
                  <Download size={14} />
                </button>
              </div>
            </div>
          </div>)}
      </div>
      {filteredTemplates.length === 0 && <div className="flex items-center justify-center h-64 border border-dashed rounded-md">
          <div className="text-center">
            <FileText size={48} className="mx-auto mb-4 text-muted-foreground" />
            <h3 className="text-lg font-medium">No templates found</h3>
            <p className="text-sm text-muted-foreground">
              Try adjusting your search or filter criteria
            </p>
          </div>
        </div>}
      {/* Pagination */}
      {pageCount > 1 && <div className="flex items-center justify-between mt-6">
          <div className="text-sm text-muted-foreground">
            Showing {indexOfFirstTemplate + 1}-
            {Math.min(indexOfLastTemplate, filteredTemplates.length)} of{' '}
            {filteredTemplates.length} templates
          </div>
          <div className="flex items-center gap-2">
            <button onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))} disabled={currentPage === 1} className={`p-2 rounded border ${currentPage === 1 ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
              <ChevronLeft size={16} />
            </button>
            {Array.from({
          length: Math.min(3, pageCount)
        }).map((_, i) => {
          // Show current page and adjacent pages
          let pageNumber;
          if (pageCount <= 3) {
            pageNumber = i + 1;
          } else if (currentPage === 1) {
            pageNumber = i + 1;
          } else if (currentPage === pageCount) {
            pageNumber = pageCount - 2 + i;
          } else {
            pageNumber = currentPage - 1 + i;
          }
          return <button key={i} onClick={() => setCurrentPage(pageNumber)} className={`w-8 h-8 flex items-center justify-center rounded ${currentPage === pageNumber ? 'bg-black text-white' : 'border hover:bg-gray-100'}`}>
                  {pageNumber}
                </button>;
        })}
            <button onClick={() => setCurrentPage(prev => Math.min(prev + 1, pageCount))} disabled={currentPage === pageCount} className={`p-2 rounded border ${currentPage === pageCount ? 'text-gray-300 cursor-not-allowed' : 'text-gray-600 hover:bg-gray-100'}`}>
              <ChevronRight size={16} />
            </button>
          </div>
        </div>}
    </div>;
};
export default Templates;