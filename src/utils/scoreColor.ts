export const getScoreColor = (score: string): string => {
  const scoreColors = {
    'A': '#22c55e', // green-500
    'B': '#84cc16', // lime-500
    'C': '#eab308', // yellow-500
    'D': '#f97316', // orange-500
    'F': '#ef4444'  // red-500
  };
  
  return scoreColors[score as keyof typeof scoreColors] || '#6b7280';
};

export const getScoreLabel = (score: string): string => {
  const labels = {
    'A': 'Excellent',
    'B': 'Good',
    'C': 'Fair',
    'D': 'Poor',
    'F': 'Very Poor'
  };
  
  return labels[score as keyof typeof labels] || 'Unknown';
};