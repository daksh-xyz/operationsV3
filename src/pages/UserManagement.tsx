import React, { useState } from 'react';
import { Users, Search, Filter, Edit, Trash, Check, X, Plus } from 'lucide-react';
const UserManagement = () => {
  return <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            User Management
          </h1>
          <p className="text-muted-foreground">
            Manage users and their access permissions
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search users..." className="h-9 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169e1]" />
          </div>
          <button className="inline-flex items-center text-sm text-muted-foreground mt-2 sm:mt-0">
            <Filter size={14} className="mr-1" />
            Filter
          </button>
        </div>
        <button className="inline-flex items-center justify-center rounded-md bg-[#4169e1] px-3 py-2 text-sm font-medium text-white hover:bg-[#3a5ecc] w-full sm:w-auto">
          <Plus size={16} className="mr-2" />
          Add User
        </button>
      </div>
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">
                  User
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground hidden sm:table-cell">
                  Role
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">
                  Status
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">
                  Last Active
                </th>
                <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[{
              name: 'Dr. John Davis',
              email: 'john.davis@novocuris.com',
              role: 'Head of Department',
              status: 'Active',
              lastActive: '2 hours ago',
              initials: 'JD'
            }, {
              name: 'Sarah Miller',
              email: 'sarah.miller@novocuris.com',
              role: 'Hospital Super Administrator',
              status: 'Active',
              lastActive: '5 mins ago',
              initials: 'SM'
            }, {
              name: 'Robert Wilson',
              email: 'robert.wilson@novocuris.com',
              role: 'Administrator',
              status: 'Pending Activation',
              lastActive: 'Never',
              initials: 'RW'
            }, {
              name: 'Karen Lee',
              email: 'karen.lee@novocuris.com',
              role: 'Management',
              status: 'Active',
              lastActive: '1 day ago',
              initials: 'KL'
            }, {
              name: 'Alex Peterson',
              email: 'alex.peterson@novocuris.com',
              role: 'Management',
              status: 'Active',
              lastActive: '3 hours ago',
              initials: 'AP'
            }, {
              name: 'Maria Rodriguez',
              email: 'maria.rodriguez@novocuris.com',
              role: 'Head of Department',
              status: 'Active',
              lastActive: 'Just now',
              initials: 'MR'
            }, {
              name: 'James Thompson',
              email: 'james.thompson@novocuris.com',
              role: 'Administrator',
              status: 'Inactive',
              lastActive: '2 weeks ago',
              initials: 'JT'
            }].map((user, i) => <tr key={i} className="bg-card hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#4169e1]/10 flex items-center justify-center text-[#4169e1] font-medium text-sm">
                        {user.initials}
                      </div>
                      <div>
                        <div className="font-medium text-sm">{user.name}</div>
                        <div className="text-xs text-muted-foreground">
                          {user.email}
                        </div>
                        <div className="sm:hidden text-xs mt-1">
                          <span className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-800">
                            {user.role}
                          </span>
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden sm:table-cell">
                    <div className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {user.role}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${user.status === 'Active' ? 'bg-green-100 text-green-800' : user.status === 'Inactive' ? 'bg-gray-100 text-gray-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {user.status === 'Active' ? <Check size={12} /> : user.status === 'Inactive' ? <X size={12} /> : null}
                      {user.status}
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <div className="text-sm text-muted-foreground">
                      {user.lastActive}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-2">
                      <button className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted">
                        <Edit size={14} className="text-muted-foreground" />
                      </button>
                      <button className="inline-flex items-center justify-center h-8 w-8 rounded-md hover:bg-muted">
                        <Trash size={14} className="text-muted-foreground" />
                      </button>
                    </div>
                  </td>
                </tr>)}
            </tbody>
          </table>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
        <div className="text-sm text-muted-foreground order-2 sm:order-1">
          Showing 7 of 24 users
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm font-medium">
            Previous
          </button>
          <button className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm font-medium">
            Next
          </button>
        </div>
      </div>
    </div>;
};
export default UserManagement;