'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Users,
  DollarSign,
  TrendingUp,
  Activity,
  Search,
  Filter,
  Download,
  Plus,
  MoreHorizontal,
  Eye,
  Edit,
  Trash2,
  Bell,
  Settings,
  LogOut,
} from 'lucide-react';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'User' | 'Manager';
  status: 'Active' | 'Inactive' | 'Pending';
  lastLogin: string;
  revenue: number;
}

interface DashboardStats {
  totalUsers: number;
  totalRevenue: number;
  activeUsers: number;
  growthRate: number;
}

export default function Dashboardadmin() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedTab, setSelectedTab] = useState('overview');
  const [users, setUsers] = useState<User[]>([]);
  const [stats, setStats] = useState<DashboardStats>({
    totalUsers: 0,
    totalRevenue: 0,
    activeUsers: 0,
    growthRate: 0,
  });

  // Mock data initialization
  useEffect(() => {
    const mockUsers: User[] = [
      {
        id: '1',
        name: 'John Doe',
        email: 'john@example.com',
        role: 'Admin',
        status: 'Active',
        lastLogin: '2024-01-15',
        revenue: 15000,
      },
      {
        id: '2',
        name: 'Jane Smith',
        email: 'jane@example.com',
        role: 'Manager',
        status: 'Active',
        lastLogin: '2024-01-14',
        revenue: 12000,
      },
      {
        id: '3',
        name: 'Bob Johnson',
        email: 'bob@example.com',
        role: 'User',
        status: 'Inactive',
        lastLogin: '2024-01-10',
        revenue: 8000,
      },
      {
        id: '4',
        name: 'Alice Brown',
        email: 'alice@example.com',
        role: 'User',
        status: 'Pending',
        lastLogin: '2024-01-12',
        revenue: 5000,
      },
    ];

    setUsers(mockUsers);
    setStats({
      totalUsers: mockUsers.length,
      totalRevenue: mockUsers.reduce((sum, user) => sum + user.revenue, 0),
      activeUsers: mockUsers.filter(user => user.status === 'Active').length,
      growthRate: 12.5,
    });
  }, []);

  const filteredUsers = users.filter(
    user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Active':
        return 'bg-primary text-primary-foreground';
      case 'Inactive':
        return 'bg-destructive text-destructive-foreground';
      case 'Pending':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getRoleColor = (role: string) => {
    switch (role) {
      case 'Admin':
        return 'bg-accent text-accent-foreground';
      case 'Manager':
        return 'bg-primary text-primary-foreground';
      case 'User':
        return 'bg-secondary text-secondary-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  return (
    <section className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="flex h-16 items-center justify-between px-6">
          <div className="flex items-center space-x-4">
            <h1 className="text-2xl font-bold text-foreground">
              <span data-editable="dashboardTitle">Admin Dashboard</span>
            </h1>
          </div>
          <div className="flex items-center space-x-4">
            <Button variant="outline" size="sm">
              <Bell className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <Settings className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="sm">
              <LogOut className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                <span data-editable="totalUsersLabel">Total Users</span>
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.totalUsers}</div>
              <p className="text-xs text-muted-foreground">
                <span data-editable="usersGrowth">+20.1% from last month</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                <span data-editable="totalRevenueLabel">Total Revenue</span>
              </CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">
                ${stats.totalRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-muted-foreground">
                <span data-editable="revenueGrowth">+15.3% from last month</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                <span data-editable="activeUsersLabel">Active Users</span>
              </CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.activeUsers}</div>
              <p className="text-xs text-muted-foreground">
                <span data-editable="activeUsersGrowth">+5.2% from last month</span>
              </p>
            </CardContent>
          </Card>

          <Card className="bg-card border-border">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                <span data-editable="growthRateLabel">Growth Rate</span>
              </CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground">{stats.growthRate}%</div>
              <p className="text-xs text-muted-foreground">
                <span data-editable="growthRateChange">+2.1% from last month</span>
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="bg-muted">
            <TabsTrigger value="overview" className="data-[state=active]:bg-background">
              <span data-editable="overviewTab">Overview</span>
            </TabsTrigger>
            <TabsTrigger value="users" className="data-[state=active]:bg-background">
              <span data-editable="usersTab">Users</span>
            </TabsTrigger>
            <TabsTrigger value="analytics" className="data-[state=active]:bg-background">
              <span data-editable="analyticsTab">Analytics</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  <span data-editable="recentActivityTitle">Recent Activity</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-primary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        <span data-editable="activity1">New user registration: John Doe</span>
                      </p>
                      <p className="text-xs text-muted-foreground">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-accent rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        <span data-editable="activity2">Payment received: $1,200</span>
                      </p>
                      <p className="text-xs text-muted-foreground">5 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-4 p-4 bg-muted rounded-lg">
                    <div className="w-2 h-2 bg-secondary rounded-full"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-foreground">
                        <span data-editable="activity3">System backup completed</span>
                      </p>
                      <p className="text-xs text-muted-foreground">1 hour ago</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="users" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between space-y-4 sm:space-y-0">
                  <CardTitle className="text-foreground">
                    <span data-editable="userManagementTitle">User Management</span>
                  </CardTitle>
                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-2">
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      <Input
                        placeholder="Search users..."
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        className="pl-10 bg-background border-input"
                      />
                    </div>
                    <Button variant="outline" size="sm">
                      <Filter className="h-4 w-4 mr-2" />
                      <span data-editable="filterButton">Filter</span>
                    </Button>
                    <Button variant="outline" size="sm">
                      <Download className="h-4 w-4 mr-2" />
                      <span data-editable="exportButton">Export</span>
                    </Button>
                    <Button
                      size="sm"
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      <span data-editable="addUserButton">Add User</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          <span data-editable="nameHeader">Name</span>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          <span data-editable="emailHeader">Email</span>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          <span data-editable="roleHeader">Role</span>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          <span data-editable="statusHeader">Status</span>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          <span data-editable="lastLoginHeader">Last Login</span>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          <span data-editable="revenueHeader">Revenue</span>
                        </th>
                        <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                          <span data-editable="actionsHeader">Actions</span>
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredUsers.map(user => (
                        <tr
                          key={user.id}
                          className="border-b border-border hover:bg-muted/50 transition-colors"
                        >
                          <td className="py-3 px-4">
                            <div className="font-medium text-foreground">{user.name}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-muted-foreground">{user.email}</div>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getRoleColor(user.role)}>{user.role}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <Badge className={getStatusColor(user.status)}>{user.status}</Badge>
                          </td>
                          <td className="py-3 px-4">
                            <div className="text-muted-foreground">{user.lastLogin}</div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="font-medium text-foreground">
                              ${user.revenue.toLocaleString()}
                            </div>
                          </td>
                          <td className="py-3 px-4">
                            <div className="flex space-x-2">
                              <Button variant="outline" size="sm">
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <Trash2 className="h-4 w-4" />
                              </Button>
                              <Button variant="outline" size="sm">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="analytics" className="space-y-6">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">
                  <span data-editable="analyticsTitle">Analytics Overview</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      <span data-editable="userGrowthTitle">User Growth</span>
                    </h3>
                    <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">
                        <span data-editable="chartPlaceholder">
                          Chart placeholder - Analytics data would be displayed here
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-foreground">
                      <span data-editable="revenueAnalyticsTitle">Revenue Analytics</span>
                    </h3>
                    <div className="h-48 bg-muted rounded-lg flex items-center justify-center">
                      <p className="text-muted-foreground">
                        <span data-editable="revenueChartPlaceholder">
                          Revenue chart would be displayed here
                        </span>
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  );
}
