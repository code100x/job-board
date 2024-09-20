import React from 'react';
import Image from 'next/image';
import { FaGithub, FaTwitter, FaLinkedin } from 'react-icons/fa';

function UserCard() {
  const profiles = [
    {
      firstName: 'Harkirat',
      lastName: 'Singh',
      title: 'Entrepreneur & Innovator',
      subtitle: 'Scaling Ecom & SaaS Businesses & Driving Growth',
      // status: "Actively looking",
      salary: 10,
      skills: [
        'Consulting',
        'Email',
        'Growth hacking',
        'Landing page',
        'Marketing automation',
      ],
      description:
        'Marketer. Previously co-founded and bootstrapped SAWA, a successful e-commerce business, to nearly $3.5M in annual recurring revenue (ARR). Achieved two smaller tech exits in 2023. Took over Videosupport.io in April 2023 to grow it to a leading enterprise in the video space.',
      imageUrl: '/main.png',
      resumeUrl: 'https://example.com/john-smith-resume',
      githubUrl: 'https://github.com/johnsmith',
      twitterUrl: 'https://twitter.com/johnsmith',
      linkedinUrl: 'https://linkedin.com/in/johnsmith',
    },
    {
      firstName: 'Harkirat',
      lastName: 'Singh',
      title: 'Tech Lead & Full Stack Developer',
      subtitle: 'Building Scalable Web Applications',
      // status: "Open to opportunities",
      salary: 10,
      skills: ['React', 'Node.js', 'AWS', 'GraphQL', 'TypeScript'],
      description:
        'Experienced developer with a track record of leading teams to deliver high-performance web applications. Specialized in React and Node.js ecosystems. Previously led development at a fintech startup, scaling the platform to handle millions of daily transactions.',
      imageUrl: '/main.png',
      resumeUrl: 'https://example.com/emily-johnson-resume',
      githubUrl: 'https://github.com/emilyjohnson',
      twitterUrl: 'https://twitter.com/emilyjohnson',
      linkedinUrl: 'https://linkedin.com/in/emilyjohnson',
    },
    {
      firstName: 'Harkirat',
      lastName: 'Singh',
      title: 'Data Scientist & ML Engineer',
      subtitle: 'Driving Business Decisions with AI',
      // status: "Passively looking",
      salary: 8,
      skills: [
        'Python',
        'TensorFlow',
        'SQL',
        'Data Visualization',
        'Statistical Analysis',
      ],
      description:
        'Data scientist with a PhD in Machine Learning. Experienced in developing and deploying ML models for real-world applications. Previously worked at a major tech company, where I led a team that improved recommendation algorithms, resulting in a 15% increase in user engagement.',
      imageUrl: '/main.png',
      resumeUrl: 'https://example.com/michael-chen-resume',
      githubUrl: 'https://github.com/michaelchen',
      twitterUrl: 'https://twitter.com/michaelchen',
      linkedinUrl: 'https://linkedin.com/in/michaelchen',
    },
    {
      firstName: 'Harkirat',
      lastName: 'Singh',
      title: 'UX/UI Designer & Product Strategist',
      subtitle: 'Creating Intuitive Digital Experiences',
      // status: "Not looking",
      salary: 9,
      skills: [
        'User Research',
        'Wireframing',
        'Prototyping',
        'Figma',
        'Design Systems',
      ],
      description:
        "Passionate about creating user-centered designs that drive product success. With over 8 years of experience, I've worked with startups and Fortune 500 companies to design intuitive interfaces and improve user experiences, resulting in increased user satisfaction and retention rates.",
      imageUrl: '/main.png',
      resumeUrl: 'https://example.com/sarah-rodriguez-resume',
      githubUrl: 'https://github.com/sarahrodriguez',
      twitterUrl: 'https://twitter.com/sarahrodriguez',
      linkedinUrl: 'https://linkedin.com/in/sarahrodriguez',
    },
  ];

  return (
    <div className="space-y-4 max-w-3xl mx-auto">
      {profiles.map((profile, index) => (
        <div
          key={index}
          className="flex items-start space-x-4 bg-white text-gray-700 p-4 border border-gray-200 rounded-lg"
        >
          <div className="w-16 flex-shrink-0">
            <Image
              src={profile.imageUrl}
              alt={`${profile.firstName} ${profile.lastName}`}
              width={64}
              height={80}
              className="rounded-full object-cover w-16 mt-1 h-16 mb-2"
            />
          </div>
          <div className="flex-grow">
            <div className="flex justify-between items-start mb-1">
              <div>
                <div className="font-bold text-lg">
                  {profile.firstName} {profile.lastName}
                  {/* <span className={` mb-4 ml-2 select-none rounded-full text-[10px] font-medium px-2 py-0.5 ${
                profile.status === "Actively looking" ? "bg-green-100 text-green-800" :
                profile.status === "Open to opportunities" ? "bg-blue-100 text-blue-800" :
                profile.status === "Passively looking" ? "bg-yellow-100 text-yellow-800" :
                "bg-gray-100 text-gray-800"
              }`}>
                {profile.status}
              </span> */}
                </div>
                <p className="text-sm text-gray-600">{profile.title}</p>
                <p className="text-xs text-gray-500">{profile.subtitle}</p>
              </div>
              <div className="flex justify-between gap-2">
                <a
                  href={profile.resumeUrl}
                  className="text-blue-600 hover:text-blue-800 text-sm font-medium"
                >
                  View Resume
                </a>
                <div className="flex gap-2">
                  <a
                    href={profile.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FaGithub size={16} />
                  </a>
                  <a
                    href={profile.twitterUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FaTwitter size={16} />
                  </a>
                  <a
                    href={profile.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-600 hover:text-gray-800"
                  >
                    <FaLinkedin size={16} />
                  </a>
                </div>
              </div>
            </div>
            <div className="flex justify-between items-center mb-2">
              <div className="flex flex-wrap gap-2">
                {profile.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded"
                  >
                    {skill}
                  </span>
                ))}
              </div>
              <span className="text-xs font-medium bg-green-100 p-1 rounded-lg text-green-800">
                {profile.salary} LPA
              </span>
            </div>
            <p className="text-sm text-gray-700">{profile.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default UserCard;
