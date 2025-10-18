import React from 'react';
import { Shield, Search, Filter, Edit, Trash, Plus } from 'lucide-react';
const Roles = () => {
  return <div className="w-full">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
            Roles & Permissions
          </h1>
          <p className="text-muted-foreground">
            Manage role-based access control for users
          </p>
        </div>
      </div>
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input type="text" placeholder="Search roles..." className="h-9 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169e1]" />
          </div>
        </div>
        <button className="inline-flex items-center justify-center rounded-md bg-black px-3 py-2 text-sm font-medium text-white hover:bg-black/80 w-full sm:w-auto">
          <Plus size={16} className="mr-2" />
          Add Role
        </button>
      </div>
      <div className="rounded-md border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b bg-muted/50">
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">
                  Role Name
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground">
                  Description
                </th>
                <th className="py-3 px-4 text-left text-sm font-medium text-muted-foreground hidden md:table-cell">
                  Users
                </th>
                <th className="py-3 px-4 text-right text-sm font-medium text-muted-foreground">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y">
              {[{
              name: 'Hospital Super Administrator',
              description: 'Full access to all system features and settings',
              users: 2,
              color: 'red'
            }, {
              name: 'Administrator',
              description: 'Can manage system settings and basic configurations',
              users: 5,
              color: 'blue'
            }, {
              name: 'Head of Department',
              description: 'Can manage departmental settings and staff',
              users: 8,
              color: 'green'
            }, {
              name: 'Management',
              description: 'Access to management dashboards and reports',
              users: 12,
              color: 'yellow'
            }].map((role, i) => <tr key={i} className="bg-card hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full bg-${role.color}-100 flex items-center justify-center text-${role.color}-600`}>
                        <Shield size={16} />
                      </div>
                      <div className="font-medium text-sm">{role.name}</div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="text-sm text-muted-foreground">
                      {role.description}
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <div className="inline-flex items-center rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-800">
                      {role.users} users
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
    </div>;
};
export default Roles;