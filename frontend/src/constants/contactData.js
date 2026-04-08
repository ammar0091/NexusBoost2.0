import { Mail, MapPin, Phone } from 'lucide-react';

export const CONTACT_INTEREST_OPTIONS = ['SEO', 'Design', 'Development', 'Marketing'];

export const CONTACT_CHANNELS = [
  {
    label: 'Quick Call',
    value: '+91 98765 43210',
    href: 'tel:+919876543210',
    icon: Phone,
  },
  {
    label: 'Email',
    value: 'hello@nexusboost.com',
    href: 'mailto:hello@nexusboost.com',
    icon: Mail,
  },
  {
    label: 'Office',
    value: 'Cyber City, Delhi, IN',
    icon: MapPin,
  },
];

export const CONTACT_FORM_DEFAULTS = {
  name: '',
  email: '',
  interest: CONTACT_INTEREST_OPTIONS[0],
  message: '',
};
