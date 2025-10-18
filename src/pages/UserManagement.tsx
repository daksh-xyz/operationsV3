import React, { useState, useEffect } from 'react';
import { Users, Search, Filter, Edit, Trash, Check, X, Plus } from 'lucide-react';
import UserService from '../services/users';
import { User } from '../services/mockData';

const UserManagement = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    loadUsers();
  }, [currentPage, searchQuery]);

  const loadUsers = async () => {
    setLoading(true);
    const filters = searchQuery ? { search: searchQuery } : {};
    const response = await UserService.getUsersListAsync(currentPage, 10, filters);
    
    if (response.success) {
      setUsers(response.data.users);
      setTotalPages(response.data.totalPages);
    } else {
      console.error(response.message);
    }
    
    setLoading(false);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const getUserInitials = (firstName: string, lastName: string) => {
    return `${firstName.charAt(0)}${lastName.charAt(0)}`.toUpperCase();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
    
    if (diffInHours < 1) return 'Just now';
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    if (diffInHours < 48) return '1 day ago';
    return `${Math.floor(diffInHours / 24)} days ago`;
  };

  if (loading) {
    return <div className="w-full flex justify-center items-center py-20">
      <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#4169e1]"></div>
    </div>;
  }

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
            <input 
              type="text" 
              placeholder="Search users..." 
              value={searchQuery}
              onChange={handleSearch}
              className="h-9 w-full rounded-md border border-input bg-background pl-10 pr-4 text-sm focus:outline-none focus:ring-2 focus:ring-[#4169e1]" 
            />
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
              {users.map((user) => <tr key={user.id} className="bg-card hover:bg-muted/50 transition-colors">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="h-8 w-8 rounded-full bg-[#4169e1]/10 flex items-center justify-center text-[#4169e1] font-medium text-sm">
                        {getUserInitials(user.firstName, user.lastName)}
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
                      {user.role.replace('_', ' ').toUpperCase()}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                      {user.status === 'active' ? <Check size={12} /> : <X size={12} />}
                      {user.status === 'active' ? 'Active' : 'Inactive'}
                    </div>
                  </td>
                  <td className="py-3 px-4 hidden md:table-cell">
                    <div className="text-sm text-muted-foreground">
                      {formatDate(user.createdAt)}
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
          Showing page {currentPage} of {totalPages} ({users.length} users)
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto order-1 sm:order-2">
          <button 
            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>
          <button 
            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="flex-1 sm:flex-none inline-flex items-center justify-center rounded-md border border-input bg-background px-3 py-1 text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      </div>
    </div>;
};
export default UserManagement;