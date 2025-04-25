import React from 'react';

interface SocialButtonProps {
  icon: React.ReactNode;
  label: string;
  onClick: () => void;
}

const SocialButton: React.FC<SocialButtonProps> = ({ icon, label, onClick }) => {
  return (
    <button
      type="button"
      className="w-full flex gap-3 items-center justify-center p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors duration-200"
      onClick={onClick}
    >
      {icon}
      <span className="text-sm font-medium">{label}</span>
    </button>
  );
};

export default SocialButton;