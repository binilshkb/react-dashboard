import React from 'react';
import { Users, UserCheck, UserX, Activity } from 'lucide-react';

const StatisticsCards = ({ users }) => {
  const totalUsers = users.length;
  const activeUsers = users.filter(u => u.status === 'Active').length;
  const inactiveUsers = totalUsers - activeUsers;
  const activePercentage = totalUsers ? Math.round((activeUsers / totalUsers) * 100) : 0;

  const stats = [
    { title: 'Total Users', value: totalUsers, icon: <Users size={24} />, color: 'var(--accent-primary)' },
    { title: 'Active Users', value: activeUsers, icon: <UserCheck size={24} />, color: 'var(--accent-success)' },
    { title: 'Inactive Users', value: inactiveUsers, icon: <UserX size={24} />, color: 'var(--accent-danger)' },
    { title: 'Engagement', value: `${activePercentage}%`, icon: <Activity size={24} />, color: 'var(--accent-info)' }
  ];

  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
      {stats.map((stat, idx) => (
        <div key={idx} className="glass-panel" style={{ padding: '1.5rem', display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ 
            backgroundColor: `${stat.color}20`, 
            color: stat.color, 
            padding: '1rem', 
            borderRadius: 'var(--radius-full)' 
          }}>
            {stat.icon}
          </div>
          <div>
            <p style={{ fontSize: '0.875rem', marginBottom: '0.25rem' }}>{stat.title}</p>
            <h2 style={{ margin: 0, fontSize: '1.75rem' }}>{stat.value}</h2>
          </div>
        </div>
      ))}
    </div>
  );
};

export default StatisticsCards;
