import { Activity, Layers, Scaling } from 'lucide-react';

export const OUR_STORY_CONTENT = {
  eyebrow: 'OUR STORY',
  titlePrefix: 'Welcome to',
  titleBrand: 'NexusBoost',
  highlight:
    'We combine search strategy, performance marketing, and conversion-focused design to build revenue-ready digital systems.',
  paragraphs: [
    'NexusBoost was built for brands that need more than vanity metrics. We partner with founders, marketing teams, and operators to create practical growth plans grounded in intent data, channel alignment, and clear business outcomes.',
    'From SEO architecture and high-converting websites to paid campaigns and analytics, our team works as one integrated unit. Every sprint is connected to ranking movement, lead quality, conversion lift, and long-term compounding growth.',
  ],
};

export const OUR_STORY_IMAGES = [
  {
    src: '/assets/remote/agency-client-workshop.jpg',
    alt: 'NexusBoost strategists reviewing campaign and SEO performance reports',
  },
  {
    src: '/assets/remote/team-success-presentation.jpg',
    alt: 'Digital marketing team celebrating a successful sprint in a collaborative workspace',
  },
];

export const ABOUT_DIFFERENTIATOR_POINTS = [
  {
    title: 'Strategy before execution',
    desc: 'Audience intent, keyword opportunity, offer positioning, and business goals shape every sprint before production begins.',
    icon: Layers,
  },
  {
    title: 'Data over assumptions',
    desc: 'We tie decisions to rankings, traffic quality, conversion events, and campaign performance instead of guesswork.',
    icon: Activity,
  },
  {
    title: 'Built to scale',
    desc: 'Our sites, content systems, and reporting frameworks are designed for your next stage of growth, not just launch day.',
    icon: Scaling,
  },
];

export const ABOUT_DIFFERENTIATOR_VISUAL = {
  src: '/assets/remote/content-strategy-workshop.jpg',
  alt: 'Team mapping a search and content strategy on a collaborative whiteboard',
};
