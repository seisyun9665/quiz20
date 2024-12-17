interface StarShapeProps {
  filled?: boolean;
  className?: string;  // 追加のクラス名を受け入れられるように
}

export const StarShape: React.FC<StarShapeProps> = ({ 
  filled = false,
  className = ''
}) => (
  <svg 
    className={`w-8 h-8 transition-all duration-300 ${
      filled ? 'text-yellow-400 animate-[tada_1s_ease-in-out]' : 'text-blue-200'
    } ${className}`}
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 2L9.1 8.6 2 9.5l5 4.8L5.8 22 12 18.6l6.2 3.4-1.2-7.7 5-4.8-7.1-0.9z"
    />
  </svg>
);