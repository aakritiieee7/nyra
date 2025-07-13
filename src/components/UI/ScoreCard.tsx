import React from 'react';
import { motion } from 'framer-motion';
import { getScoreColor, getScoreLabel } from '../../utils/scoreColor';

interface ScoreCardProps {
  material: string;
  score: string;
  summary: string;
  confidence: number;
  recommendations: string[];
}

const ScoreCard: React.FC<ScoreCardProps> = ({
  material,
  score,
  summary,
  confidence,
  recommendations,
}) => {
  const scoreColor = getScoreColor(score);
  const scoreLabel = getScoreLabel(score);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 max-w-md mx-auto"
    >
      <div className="text-center mb-6">
        <div
          className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold"
          style={{ backgroundColor: scoreColor }}
        >
          {score}
        </div>
        <h3 className="text-xl font-semibold text-gray-900 mb-1">{material}</h3>
        <p className="text-sm text-gray-500">{scoreLabel} • {confidence}% confidence</p>
      </div>

      <div className="mb-6">
        <h4 className="text-sm font-medium text-gray-700 mb-2">Summary</h4>
        <p className="text-gray-600 text-sm leading-relaxed">{summary}</p>
      </div>

      <div>
        <h4 className="text-sm font-medium text-gray-700 mb-2">Recommendations</h4>
        <ul className="space-y-1">
          {recommendations.map((rec, index) => (
            <li key={index} className="text-sm text-gray-600 flex items-start">
              <span className="text-[#00EB88] mr-2">•</span>
              {rec}
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default ScoreCard;