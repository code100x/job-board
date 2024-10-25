interface SheetDetails {
  title: string;
  description: string;
}

type Sheets = Record<string, SheetDetails>;

export const SHEETS: Sheets = {
  expeience: {
    title: 'Add Work Experience',
    description:
      'Share your work history to highlight your career journey and expertise for employers.',
  },
  aboutMe: {
    title: 'Add About Me',
    description:
      'Share a brief introduction to let companies know who you are.',
  },
  editProfile: {
    title: 'Update Your Profile',
    description:
      'Update your personal information, contact details, and social links to keep your profile current and professional.',
  },
  resume: {
    title: 'Upload Your Resume',
    description:
      'Share your resume to give employers a full view of your qualifications and experiences.',
  },
  skills: {
    title: 'Add Your Skills',
    description:
      'Showcase your strongest skills to make your profile stand out to recruiters.',
  },
  project: {
    title: 'Add New Project',
    description:
      'Highlight key project that demonstrate your technical abilities and innovative problem-solving.',
  },
  expierence: {
    title: 'Add Work Experience',
    description:
      'Share your work history to highlight your career journey and expertise for employers.',
  },
  education: {
    title: 'Add Your Education',
    description:
      'Provide details about your academic background to showcase your qualifications.',
  },
  accountSetting: {
    title: 'Account Settings',
    description:
      'Manage your account preferences, update your password, or delete your account. Keep your profile secure and up-to-date.',
  },
};
