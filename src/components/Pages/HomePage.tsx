import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Zap, Target, Brain, Recycle } from 'lucide-react';
import DoughnutChart from '../Charts/DoughnutChart';
import FeatureCard from '../UI/FeatureCard';
import { api } from '../../utils/api';
import { MaterialDistribution } from '../../types';

const HomePage: React.FC = () => {
  const [materialData, setMaterialData] = useState<MaterialDistribution | null>(null);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    api.getMaterialDistribution().then(setMaterialData);
  }, []);

  const features = [
    {
      icon: Brain,
      title: 'Smart Recognition',
      description: 'AI instantly identifies packaging materials and analyzes their environmental impact.',
      metric: '94%',
    },
    {
      icon: Target,
      title: 'Planet Score',
      description: 'Get clear A-F ratings for your packaging sustainability performance.',
      metric: 'A-F',
    },
    {
      icon: Zap,
      title: 'Smart Suggestions',
      description: 'Receive personalized recommendations for more sustainable packaging choices.',
      metric: '∞',
    },
    {
      icon: Recycle,
      title: 'Progress Tracking',
      description: 'Track your packaging improvements and environmental impact over time.',
      metric: '100%',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="text-left">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-4xl md:text-6xl font-bold text-black mb-6"
              >
                Is your pack{' '}
                <span className="text-[#00EB88]">planet-smart?</span>
              </motion.h1>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-xl text-gray-600 mb-8 max-w-lg"
              >
                Upload your product's packaging and let AI judge its sustainability
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-[#00EB88] text-black px-8 py-4 rounded-full font-semibold text-lg hover:bg-green-400 transition-colors duration-200"
                >
                  Try Now
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="flex items-center justify-center space-x-2 text-black border border-gray-300 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-50 transition-all duration-200"
                >
                  <span>Learn More</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </motion.button>
              </motion.div>
            </div>

            {/* Right Illustration */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative"
            >
              <div className="relative w-full max-w-lg mx-auto">
                <img
                  src="https://cdn.dribbble.com/userupload/9127097/file/original-5945d7ec45073513b5117215cd5a48ce.png?resize=752x&vertical=center"
                  alt="Kids recycling and being eco-friendly"
                  className="w-full h-auto rounded-2xl shadow-lg"
                />
                {/* Floating recycling badge */}
                <div className="absolute -top-4 -right-4 w-16 h-16 bg-[#00EB88] rounded-full flex items-center justify-center shadow-lg animate-bounce">
                  <Recycle className="w-8 h-8 text-white" />
                </div>
                {/* Eco badge */}
                <div className="absolute -bottom-4 -left-4 bg-white rounded-full px-4 py-2 shadow-lg border-2 border-[#00EB88]">
                  <span className="text-[#00EB88] font-bold text-sm">ECO SMART</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
<section className="py-16 bg-gray-50">
  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
      
      {/* Stat 1 */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <h3 className="text-4xl font-bold text-[#00EB88] mb-2">8M+</h3>
        <p className="text-gray-600">Tons of plastic waste enter oceans annually</p>
      </motion.div>

      {/* Stat 2 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="text-center"
      >
        <h3 className="text-4xl font-bold text-[#00EB88] mb-2">94%</h3>
        <p className="text-gray-600">AI accuracy in material detection</p>
      </motion.div>

      {/* Stat 3 */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="text-center"
      >
        <h3 className="text-4xl font-bold text-[#00EB88] mb-2">A-F</h3>
        <p className="text-gray-600">Clear sustainability scoring system</p>
      </motion.div>
      
    </div>
  </div>
</section>

      {/* Material Distribution Chart */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Packaging Material Analysis
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              AI-powered insights into packaging materials and their environmental impact
            </p>
          </div>
          <div className="max-w-2xl mx-auto">
            {materialData ? (
              <DoughnutChart data={materialData} />
            ) : (
              <div className="h-80 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#00EB88]"></div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Why Choose PackedRight?
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Advanced AI technology to help you make smarter packaging decisions
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, index) => (
              <FeatureCard
                key={feature.title}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
                metric={feature.metric}
                index={index}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-[#99ff99]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">
            Ready to PackedRight?
          </h2>
          <p className="text-black text-lg mb-8 max-w-2xl mx-auto opacity-80">
            Start analyzing your packaging and make planet-smart choices today
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-200"
          >
            Try PackedRight Now
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;