import { LoginForm } from '@/components/auth/login';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'लॉगिन | प्रमाणीकरण',
  description: 'खात्यात प्रवेश करण्यासाठी लॉगिन पृष्ठ.'
};

export default async function Page() {
  return <LoginForm />;
}
