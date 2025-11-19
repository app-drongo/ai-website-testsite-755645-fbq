'use client';

import React, { useState, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Trash2,
  ChevronLeft,
  ChevronRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';

interface TableData {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive' | 'pending';
  role: string;
  lastActive: string;
  revenue: number;
}

interface SortConfig {
  key: keyof TableData | null;
  direction: 'asc' | 'desc';
}

const mockData: TableData[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'Admin',
    lastActive: '2024-01-15',
    revenue: 12500,
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'pending',
    role: 'User',
    lastActive: '2024-01-14',
    revenue: 8750,
  },
  {
    id: '3',
    name: 'Mike Johnson',
    email: 'mike@example.com',
    status: 'active',
    role: 'Manager',
    lastActive: '2024-01-13',
    revenue: 15200,
  },
  {
    id: '4',
    name: 'Sarah Wilson',
    email: 'sarah@example.com',
    status: 'inactive',
    role: 'User',
    lastActive: '2024-01-10',
    revenue: 6300,
  },
  {
    id: '5',
    name: 'David Brown',
    email: 'david@example.com',
    status: 'active',
    role: 'Admin',
    lastActive: '2024-01-12',
    revenue: 18900,
  },
];

export default function Datatable() {
  const [data, setData] = useState<TableData[]>(mockData);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: null, direction: 'asc' });
  const itemsPerPage = 3;

  // Filter and search data
  const filteredData = useMemo(() => {
    return data.filter(item => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.role.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === 'all' || item.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [data, searchTerm, statusFilter]);

  // Sort data
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key!];
      const bValue = b[sortConfig.key!];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [filteredData, sortConfig]);

  // Paginate data
  const paginatedData = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return sortedData.slice(startIndex, startIndex + itemsPerPage);
  }, [sortedData, currentPage]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);

  const handleSort = (key: keyof TableData) => {
    setSortConfig(prevConfig => ({
      key,
      direction: prevConfig.key === key && prevConfig.direction === 'asc' ? 'desc' : 'asc',
    }));
  };

  const getSortIcon = (key: keyof TableData) => {
    if (sortConfig.key !== key) {
      return <ArrowUpDown className="w-4 h-4 text-muted-foreground" />;
    }
    return sortConfig.direction === 'asc' ? (
      <ArrowUp className="w-4 h-4 text-primary" />
    ) : (
      <ArrowDown className="w-4 h-4 text-primary" />
    );
  };

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200',
      inactive: 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200',
      pending: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200',
    };

    return (
      <Badge
        className={variants[status as keyof typeof variants] || 'bg-muted text-muted-foreground'}
      >
        <span data-editable={`status-${status}`}>{status}</span>
      </Badge>
    );
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  };

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            <span data-editable="title">Data Management Dashboard</span>
          </h2>
          <p className="text-muted-foreground">
            <span data-editable="description">
              Manage and analyze your data with powerful filtering, sorting, and search
              capabilities.
            </span>
          </p>
        </div>

        <Card className="bg-card border-border">
          <CardHeader className="border-b border-border">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              <CardTitle className="text-card-foreground">
                <span data-editable="tableTitle">User Management</span>
              </CardTitle>

              {/* Controls */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="Search users..."
                    value={searchTerm}
                    onChange={e => setSearchTerm(e.target.value)}
                    className="pl-10 w-full sm:w-64"
                  />
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={e => setStatusFilter(e.target.value)}
                  className="px-3 py-2 border border-input rounded-md bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="all">All Status</option>
                  <option value="active">Active</option>
                  <option value="inactive">Inactive</option>
                  <option value="pending">Pending</option>
                </select>

                {/* Export Button */}
                <Button variant="outline" className="flex items-center gap-2">
                  <Download className="w-4 h-4" />
                  <span data-editable="exportText">Export</span>
                </Button>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0">
            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      <button
                        onClick={() => handleSort('name')}
                        className="flex items-center gap-2 hover:text-foreground transition-colors"
                      >
                        <span data-editable="nameHeader">Name</span>
                        {getSortIcon('name')}
                      </button>
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      <button
                        onClick={() => handleSort('email')}
                        className="flex items-center gap-2 hover:text-foreground transition-colors"
                      >
                        <span data-editable="emailHeader">Email</span>
                        {getSortIcon('email')}
                      </button>
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      <button
                        onClick={() => handleSort('status')}
                        className="flex items-center gap-2 hover:text-foreground transition-colors"
                      >
                        <span data-editable="statusHeader">Status</span>
                        {getSortIcon('status')}
                      </button>
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      <button
                        onClick={() => handleSort('role')}
                        className="flex items-center gap-2 hover:text-foreground transition-colors"
                      >
                        <span data-editable="roleHeader">Role</span>
                        {getSortIcon('role')}
                      </button>
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      <button
                        onClick={() => handleSort('revenue')}
                        className="flex items-center gap-2 hover:text-foreground transition-colors"
                      >
                        <span data-editable="revenueHeader">Revenue</span>
                        {getSortIcon('revenue')}
                      </button>
                    </th>
                    <th className="text-left p-4 font-medium text-muted-foreground">
                      <span data-editable="actionsHeader">Actions</span>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedData.map((item, index) => (
                    <tr
                      key={item.id}
                      className="border-b border-border hover:bg-muted/30 transition-colors"
                    >
                      <td className="p-4">
                        <div className="font-medium text-foreground">{item.name}</div>
                        <div className="text-sm text-muted-foreground">ID: {item.id}</div>
                      </td>
                      <td className="p-4 text-foreground">{item.email}</td>
                      <td className="p-4">{getStatusBadge(item.status)}</td>
                      <td className="p-4 text-foreground">{item.role}</td>
                      <td className="p-4 font-medium text-foreground">
                        {formatCurrency(item.revenue)}
                      </td>
                      <td className="p-4">
                        <div className="flex items-center gap-2">
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Eye className="w-4 h-4" />
                          </Button>
                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                            <Edit className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Empty State */}
            {paginatedData.length === 0 && (
              <div className="text-center py-12">
                <div className="text-muted-foreground mb-2">
                  <span data-editable="noDataText">No data found</span>
                </div>
                <p className="text-sm text-muted-foreground">
                  <span data-editable="noDataDescription">
                    Try adjusting your search or filter criteria
                  </span>
                </p>
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex items-center justify-between p-4 border-t border-border">
                <div className="text-sm text-muted-foreground">
                  Showing {(currentPage - 1) * itemsPerPage + 1} to{' '}
                  {Math.min(currentPage * itemsPerPage, sortedData.length)} of {sortedData.length}{' '}
                  results
                </div>

                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center gap-1"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span data-editable="previousText">Previous</span>
                  </Button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                      <Button
                        key={page}
                        variant={currentPage === page ? 'default' : 'outline'}
                        size="sm"
                        onClick={() => setCurrentPage(page)}
                        className="w-8 h-8 p-0"
                      >
                        {page}
                      </Button>
                    ))}
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center gap-1"
                  >
                    <span data-editable="nextText">Next</span>
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    <span data-editable="totalUsersLabel">Total Users</span>
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">{data.length}</p>
                </div>
                <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Filter className="w-6 h-6 text-primary" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    <span data-editable="activeUsersLabel">Active Users</span>
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {data.filter(item => item.status === 'active').length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-lg flex items-center justify-center">
                  <Eye className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">
                    <span data-editable="totalRevenueLabel">Total Revenue</span>
                  </p>
                  <p className="text-2xl font-bold text-card-foreground">
                    {formatCurrency(data.reduce((sum, item) => sum + item.revenue, 0))}
                  </p>
                </div>
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-lg flex items-center justify-center">
                  <Download className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
