'use client';

const DashboardCard = ({ title, value, subtitle, icon: Icon, color = 'primary' }) => {
  const colorClasses = {
    primary: 'bg-primary',
    secondary: 'bg-secondary',
    accent: 'bg-accent',
    danger: 'bg-danger',
  };

  return (
    <div className="card">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm text-gray-500 mb-2">{title}</p>
          <p className="text-3xl font-bold text-dark">{value}</p>
          {subtitle && <p className="text-xs text-gray-400 mt-2">{subtitle}</p>}
        </div>
        {Icon && (
          <div className={`${colorClasses[color]} text-white p-3 rounded`}>
            <Icon size={24} />
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardCard;
