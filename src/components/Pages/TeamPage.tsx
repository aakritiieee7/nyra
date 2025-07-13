import React from 'react';
import { motion } from 'framer-motion';
import { Github, Linkedin, Twitter, Leaf, Target, Users, Lightbulb } from 'lucide-react';

const TeamPage: React.FC = () => {
  const teamMembers = [
    {
      id: 1,
      name: 'Aradhana Dash',
      role: 'EcoGPT Integration Lead',
      image: 'https://media.licdn.com/dms/image/v2/D5603AQETQNU_VAmDQA/profile-displayphoto-crop_800_800/B56Zea6GbUHoAI-/0/1750650613141?e=1758153600&v=beta&t=SSOu6EVlxRVyKF0pa9gql_JEDMxeEPQF76trDnYe0GE',
      bio: 'Machine learning expert specializing in computer vision and packaging sustainability analysis.',
      social: {
        linkedin: '#',
        twitter: '#',
        github: '#',
      },
    },
    {
      id: 2,
      name: 'Gungun Jain',
      role: 'Sustainability Scoring Engineer',
      image: 'https://media.licdn.com/dms/image/v2/D4E03AQExLfKcDpFs_w/profile-displayphoto-shrink_800_800/B4EZccXOvRH0Ac-/0/1748527544293?e=1758153600&v=beta&t=mcp-XuQjYckpkYZdBrqQTjgxsN4CJuEpI16wAPOcUvw',
      bio: 'Environmental scientist with 15+ years in packaging sustainability and circular economy.',
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
    {
      id: 3,
      name: 'Aakriti Rajhans',
      role: 'Dashboard UI Engineer',
      image: 'https://media.licdn.com/dms/image/v2/D4D03AQEtbD18FH-FTg/profile-displayphoto-shrink_800_800/B4DZOOPgTXHUAg-/0/1733258250237?e=1758153600&v=beta&t=JQQnRHj0l46sy3dQFLqnibAtiCq5d_20wkHo1b4M64w',
      bio: 'Full-stack developer passionate about creating technology for sustainable packaging solutions.',
      social: {
        github: '#',
        linkedin: '#',
      },
    },
    {
      id: 4,
      name: 'Ishika Manchanda',
      role: 'Visual Packaging Classifier',
      image:'https://media.licdn.com/dms/image/v2/D4E03AQHLrV-H2HPjLQ/profile-displayphoto-crop_800_800/B4EZgFwIiMGwAM-/0/1752443163169?e=1758153600&v=beta&t=9qF9PcVy-Z4CupAiiiIdtNywwx6nT2wq9Qlgw_Rvv5k'
      bio: 'User experience designer focused on making packaging sustainability tools accessible to everyone.',
      social: {
        linkedin: '#',
        twitter: '#',
      },
    },
  ];

  const values = [
    {
      icon: Leaf,
      title: 'Sustainability',
      description: 'We believe in packaging solutions that serve the planet and future generations.',
    },
    {
      icon: Target,
      title: 'Transparency',
      description: 'Open data, clear methodologies, and honest packaging sustainability assessments.',
    },
    {
      icon: Lightbulb,
      title: 'Innovation',
      description: 'Pushing the boundaries of AI to solve complex packaging sustainability challenges.',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Working together with brands, manufacturers, and sustainability experts worldwide.',
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <section className="bg-black text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold mb-6"
          >
            Meet the PackedRight Team
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl text-gray-300 max-w-3xl mx-auto"
          >
            Passionate experts working together to revolutionize packaging sustainability through AI innovation
          </motion.p>
        </div>
      </section>

      {/* Team Members */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center group"
              >
                <div className="relative mb-6">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-32 h-32 rounded-full mx-auto object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-[#00EB88] bg-opacity-0 group-hover:bg-opacity-20 rounded-full transition-all duration-300"></div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                <p className="text-[#00EB88] font-medium mb-3">{member.role}</p>
                <p className="text-gray-600 text-sm mb-4 leading-relaxed">{member.bio}</p>
                <div className="flex justify-center space-x-3">
                  {member.social.linkedin && (
                    <a
                      href={member.social.linkedin}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#00EB88] hover:text-white transition-colors duration-200"
                    >
                      <Linkedin className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.twitter && (
                    <a
                      href={member.social.twitter}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#00EB88] hover:text-white transition-colors duration-200"
                    >
                      <Twitter className="w-4 h-4" />
                    </a>
                  )}
                  {member.social.github && (
                    <a
                      href={member.social.github}
                      className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center text-gray-600 hover:bg-[#00EB88] hover:text-white transition-colors duration-200"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              We're committed to leveraging artificial intelligence to create a more sustainable future by providing accessible tools for packaging sustainability assessment and improvement.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 text-center hover:shadow-md transition-shadow duration-300"
              >
                <div className="w-12 h-12 bg-[#00EB88] bg-opacity-10 rounded-lg mx-auto mb-4 flex items-center justify-center">
                  <value.icon className="w-6 h-6 text-[#00EB88]" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600 text-sm leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 bg-[#00EB88]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-black mb-4">Join Our Mission</h2>
          <p className="text-black text-lg mb-8 max-w-2xl mx-auto opacity-80">
            Ready to pack right? Get in touch to learn about partnership opportunities or how you can contribute to packaging sustainability.
          </p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-black text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-800 transition-colors duration-200"
          >
            Contact Us
          </motion.button>
        </div>
      </section>
    </div>
  );
};

export default TeamPage;
