import React from 'react';
import { Building2, Search, Filter, Edit, Trash, Plus, Users } from 'lucide-react';
const Departments = () => {
  return <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Departments
          </h1>
          <p className="text-muted-foreground">
            Manage hospital departments and staff assignments
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search departments..." className="h-9 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169e1]" />
          </div>
        </div>
        <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-3 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc] w-full sm:w-auto">
          <Plus size={16} className="mr-2" />
          Add Department
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[{
        name: 'Emergency Department',
        head: 'Dr. Sarah Miller',
        staff: 28,
        color: 'red'
      }, {
        name: 'Cardiology',
        head: 'Dr. John Davis',
        staff: 15,
        color: 'blue'
      }, {
        name: 'Pediatrics',
        head: 'Dr. Maria Rodriguez',
        staff: 12,
        color: 'green'
      }, {
        name: 'Oncology',
        head: 'Dr. Robert Wilson',
        staff: 18,
        color: 'purple'
      }, {
        name: 'Neurology',
        head: 'Dr. James Thompson',
        staff: 10,
        color: 'yellow'
      }, {
        name: 'Radiology',
        head: 'Dr. Karen Lee',
        staff: 8,
        color: 'orange'
      }, {
        name: 'Orthopedics',
        head: 'Dr. Alex Peterson',
        staff: 14,
        color: 'indigo'
      }, {
        name: 'Psychiatry',
        head: 'Dr. Lisa Wang',
        staff: 9,
        color: 'pink'
      }].map((department, i) => <div key={i} className="bg-card rounded-md border p-4 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`h-10 w-10 rounded-md bg-${department.color}-100 flex items-center justify-center text-${department.color}-600`}>
                  <Building2 size={20} />
                </div>
                <div>
                  <h3 className="font-medium">{department.name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {department.head}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted">
                  <Edit size={14} className="text-muted-foreground" />
                </button>
                <button className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted">
                  <Trash size={14} className="text-muted-foreground" />
                </button>
              </div>
            </div>
            <div className="flex items-center mt-3 text-sm text-muted-foreground">
              <Users size={16} className="mr-2" />
              <span>{department.staff} staff members</span>
            </div>
            <div className="mt-3 pt-3 border-t border-border">
              <button className="w-full text-center text-sm text-[#4169e1] hover:underline">
                View Details
              </button>
            </div>
          </div>)}
      </div>
    </div>;
};
export default Departments;