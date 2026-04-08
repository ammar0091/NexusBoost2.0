import { Mail, MessageCircle, Phone } from 'lucide-react';

export const SUPPORT_CARDS = [
  {
    icon: Mail,
    title: 'Email support',
    value: 'support@nexusboost.com',
    href: 'mailto:support@nexusboost.com',
  },
  {
    icon: Phone,
    title: 'Call support',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
  },
  {
    icon: MessageCircle,
    title: 'Strategy chat',
    value: 'Get help with website, SEO, or campaign questions',
    href: '/contact',
  },
];

export const SUPPORT_FAQS = [
  {
    q: 'How quickly will I get a response?',
    a: 'Most support and campaign questions are answered within one business day, and urgent delivery issues are prioritized faster.',
  },
  {
    q: 'Can you help after launch with SEO and performance?',
    a: 'Yes. We support clients with post-launch SEO updates, tracking fixes, landing page improvements, and campaign optimization.',
  },
  {
    q: 'Do you offer custom retainers?',
    a: 'Yes, we can tailor support around website maintenance, content production, reporting, SEO, or paid media management.',
  },
];
