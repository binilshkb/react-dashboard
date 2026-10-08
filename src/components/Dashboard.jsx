import React, { useState } from 'react';
import StatisticsCards from './StatisticsCards';
import UserTable from './UserTable';
import UserModal from './UserModal';
import ActivityLog from './ActivityLog';
import UserAnalyticsChart from './UserAnalyticsChart';
import { initialUsers, initialActivities, userGrowthData } from '../data/mockData';
import { Plus, Bell } from 'lucide-react';

const Dashboard = () => {
  const [users, setUsers] = useState(initialUsers);
  const [activities, setActivities] = useState(initialActivities);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const handleAddUser = () => {
    setEditingUser(null);
    setIsModalOpen(true);
  };

  const handleEditUser = (user) => {
    setEditingUser(user);
    setIsModalOpen(true);
  };

  const handleDeleteUser = (id) => {
    if (window.confirm('Are you sure you want to deactivate this user?')) {
      const userToDeactivate = users.find(u => u.id === id);
      setUsers(users.map(u => u.id === id ? { ...u, status: 'Inactive' } : u));
      
      logActivity(`Deactivated user ${userToDeactivate.name}`);
    }
  };

  const handleSaveUser = (userData) => {
    if (editingUser) {
      setUsers(users.map(u => u.id === userData.id ? userData : u));
      logActivity(`Updated user ${userData.name}`);
    } else {
      const newUser = {
        ...userData,
        id: Math.max(...users.map(u => u.id), 0) + 1,
        lastLogin: new Date().toISOString()
      };
      setUsers([...users, newUser]);
      logActivity(`Created user ${newUser.name}`);
    }
    setIsModalOpen(false);
  };

  const logActivity = (action) => {
    const newActivity = {
      id: Date.now(),
      user: 'Current Admin', // Mock current user
      action,
      time: new Date().toISOString()
    };
    setActivities([newActivity, ...activities].slice(0, 10)); // Keep last 10
  };

  return (
    <div className="main-content animate-fade-in">
      <header className="top-header">
        <div>
          <h1 style={{ margin: 0 }}>Dashboard</h1>
          <p style={{ margin: 0, marginTop: '0.25rem' }}>Manage your team members and their account permissions here.</p>
        </div>
        <div className="header-actions">
          <button className="btn-icon hide-on-mobile">
            <Bell size={20} />
          </button>
          <div className="user-profile-btn hide-on-mobile">
            <div className="avatar">A</div>
            <span style={{ fontSize: '0.875rem', fontWeight: 500 }}>Admin User</span>
          </div>
        </div>
      </header>

      <StatisticsCards users={users} />

      <div style={{ marginBottom: '1.5rem', height: '350px' }}>
        <UserAnalyticsChart data={userGrowthData} />
      </div>

      <div className="dashboard-grid">
        <div style={{ height: '100%' }}>
          <UserTable 
            users={users} 
            onEdit={handleEditUser} 
            onDelete={handleDeleteUser} 
            onAdd={handleAddUser}
          />
        </div>
        <div style={{ height: '100%' }}>
          <ActivityLog activities={activities} />
        </div>
      </div>

      <UserModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveUser}
        user={editingUser}
      />
    </div>
  );
};

export default Dashboard;
