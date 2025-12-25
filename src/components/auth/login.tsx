'use client';
import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { AlertCircle, Shield, Building2, Users, FileCheck } from 'lucide-react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel
} from '@/components/ui/field';
import { Input } from '@/components/ui/input';
import { LoadingButton } from '@/components/ui/custom/loading-button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { loginSuccess } from '@/store/slices/authSlice';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { PasswordInput } from '../ui/password-input';

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  const slides = [
    {
      image: '/loginScreen/banner1.png',
      background: '/loginScreen/login-background.svg',
      title: 'शेगाव नगर परिषद प्रशासन',
      text: 'नागरी सेवा, पारदर्शकता आणि कार्यक्षम प्रशासन'
    },
    {
      image: '/loginScreen/banner2.png',
      background: '/loginScreen/login-background2.svg',
      title: 'नागरी सेवा पोर्टल',
      text: 'सर्व नागरी सेवा एकाच ठिकाणी, ऑनलाइन आणि सुलभ'
    },
    {
      image: '/loginScreen/banner3.png',
      background: '/loginScreen/login-background3.svg',
      title: 'डिजिटल महाराष्ट्र',
      text: 'तंत्रज्ञानाच्या सहाय्याने सुशासनाची हमी'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      if (
        (email === 'user@gmail.com' && password === 'user@123') ||
        (email === 'admin@gmail.com' && password === 'admin@123')
      ) {
        // Create user object with all properties
        const user = {
          id: email === 'admin@gmail.com' ? 'admin_001' : 'user_001',
          email: email,
          name: email === 'admin@gmail.com' ? 'Admin User' : 'Regular User',
          role: email === 'admin@gmail.com' ? 'admin' : 'user',
          department: 'शेगाव नगर परिषद',
          permissions:
            email === 'admin@gmail.com'
              ? ['read', 'write', 'delete', 'admin']
              : ['read', 'write'],
          token: 'dummy_jwt_token_1234567890' // Include token in user object
        };

        // Store in localStorage
        localStorage.setItem('user', JSON.stringify(user));
        localStorage.setItem('isAuthenticated', 'true');

        toast.success('यशस्वीरित्या लॉगिन केले!');
        // Pass user object wrapped in { user } to match PayloadAction type
        dispatch(loginSuccess({ user }));
        router.push('/dashboard');
      } else {
        setError('अवैध ईमेल किंवा पासवर्ड. कृपया पुन्हा प्रयत्न करा.');
      }
    } catch (err: any) {
      setError('लॉगिन प्रक्रिया अयशस्वी. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setIsLoading(false);
    }

    // Comment out the original API call
    /*
    try {
      const apiUrl = `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/sign-in`;
      const res = await axios.post(
        apiUrl,
        { email, password },
        { withCredentials: true }
      );
      if (res.data?.code?.toLowerCase() === 'success') {
        toast.success('यशस्वीरित्या लॉगिन केले!');
        dispatch(loginSuccess(res.data));
        router.push('/dashboard');
      } else if (res.data?.code?.toLowerCase() === 'auth_failed') {
        setError(
          res.data?.message ||
            'अवैध ईमेल किंवा पासवर्ड. कृपया पुन्हा प्रयत्न करा.'
        );
      }
    } catch (err: any) {
      setError('अवैध ईमेल किंवा पासवर्ड. कृपया पुन्हा प्रयत्न करा.');
    } finally {
      setIsLoading(false);
    }
    */
  };

  return (
    <div className='flex min-h-screen flex-col bg-gradient-to-br from-gray-50 via-white to-gray-50 lg:flex-row'>
      {/* Government Portal Left Section */}
      <div className='flex w-full flex-col justify-between bg-gradient-to-b from-white to-gray-50 px-6 py-8 sm:px-12 lg:w-[50%] lg:px-16'>
        {/* Government Header */}
        <div className='mb-8'>
          <div className='flex items-center justify-between'>
            <div className='flex items-center gap-3'>
              <div className='flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-[#b01d4f] to-[#7a1e4f] p-2'>
                <Building2 className='h-7 w-7 text-white' />
              </div>
              <div>
                <h1 className='text-xl font-bold text-gray-900'>
                  शेगाव नगर परिषद
                </h1>
                <p className='text-sm text-gray-600'>नागरी प्रशासन पोर्टल</p>
              </div>
            </div>
            <div className='hidden items-center gap-2 rounded-full bg-[#b01d4f]/10 px-3 py-1 sm:flex'>
              <Shield className='h-4 w-4 text-[#b01d4f]' />
              <span className='text-xs font-medium text-[#b01d4f]'>
                सुरक्षित लॉगिन
              </span>
            </div>
          </div>
        </div>

        {/* Login Form Section */}
        <div className='mx-auto w-full max-w-md'>
          {/* Government Portal Welcome */}
          <div className='mb-8 text-center'>
            <div className='mb-3 inline-flex items-center gap-2 rounded-full bg-[#b01d4f]/10 px-4 py-2'>
              <Users className='h-4 w-4 text-[#b01d4f]' />
              <span className='text-sm font-medium text-[#b01d4f]'>
                कर्मचारी लॉगिन
              </span>
            </div>
            <h2 className='mb-2 text-2xl font-bold text-gray-900'>
              प्रशासनिक पोर्टलमध्ये स्वागत आहे
            </h2>
            <p className='text-sm text-gray-600'>
              कृपया प्रवेश करण्यासाठी आपली प्रमाणित माहिती प्रविष्ट करा
            </p>
          </div>

          {/* Government Style Card */}
          <Card className='mb-6 overflow-hidden border border-gray-200 shadow-lg'>
            <div className='h-2 bg-gradient-to-r from-[#b01d4f] via-[#9c1c4c] to-[#7a1e4f]' />
            <CardHeader className='pb-4 text-center'>
              <CardTitle className='text-xl font-semibold text-gray-900'>
                प्रवेश करा
              </CardTitle>
              <CardDescription className='text-gray-600'>
                आपले कर्मचारी ईमेल आणि पासवर्ड प्रविष्ट करा
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit}>
                <FieldGroup className='gap-4'>
                  <Field>
                    <FieldLabel htmlFor='email' className='text-gray-700'>
                      कर्मचारी ईमेल
                    </FieldLabel>
                    <Input
                      id='email'
                      type='email'
                      placeholder='employee@shegaon.gov.in'
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      disabled={isLoading}
                      className='border-gray-300 focus:border-[#b01d4f] focus:ring-[#b01d4f]'
                    />
                  </Field>
                  <Field className='mb-0 pb-0'>
                    <div className='flex items-center'>
                      <FieldLabel htmlFor='password' className='text-gray-700'>
                        पासवर्ड
                      </FieldLabel>
                      <a
                        href='#'
                        className='ml-auto text-sm text-[#b01d4f] hover:underline'
                      >
                        पासवर्ड विसरलात?
                      </a>
                    </div>
                    <PasswordInput
                      id='password'
                      placeholder='••••••••••'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      disabled={isLoading}
                      className='border-gray-300 focus:border-[#b01d4f] focus:ring-[#b01d4f]'
                    />
                  </Field>
                  <div className='mt-2 flex items-center'>
                    <label className='flex items-center space-x-2 text-sm text-gray-600'>
                      <input
                        type='checkbox'
                        id='rememberMe'
                        className='h-4 w-4 cursor-pointer rounded accent-[#b01d4f]'
                      />
                      <span>मला लक्षात ठेवा</span>
                    </label>
                  </div>

                  {error && (
                    <Alert
                      variant='destructive'
                      className='mb-4 border-[#b01d4f] bg-[#b01d4f]/10'
                    >
                      <AlertCircle className='h-4 w-4 text-[#b01d4f]' />
                      <AlertTitle className='text-[#b01d4f]'>
                        लॉगिन अयशस्वी
                      </AlertTitle>
                      <AlertDescription className='text-[#7a1e4f]'>
                        {error}
                      </AlertDescription>
                    </Alert>
                  )}

                  <Field>
                    <LoadingButton
                      type='submit'
                      isLoading={isLoading}
                      className='w-full bg-gradient-to-r from-[#b01d4f] to-[#7a1e4f] text-white hover:from-[#7a1e4f] hover:to-[#5a1a3a]'
                    >
                      {isLoading ? 'प्रवेश करीत आहे...' : 'प्रवेश करा'}
                    </LoadingButton>
                  </Field>
                </FieldGroup>
              </form>
            </CardContent>
          </Card>

          {/* Government Services Info */}
          <div className='rounded-lg border border-gray-200 bg-white p-4 shadow-sm'>
            <div className='mb-3 flex items-center gap-2'>
              <FileCheck className='h-4 w-4 text-[#b01d4f]' />
              <h3 className='text-sm font-medium text-gray-900'>उपलब्ध सेवा</h3>
            </div>
            <ul className='space-y-2 text-xs text-gray-600'>
              <li className='flex items-center gap-2'>
                <div className='h-1.5 w-1.5 rounded-full bg-[#b01d4f]'></div>
                नागरी सेवा व्यवस्थापन
              </li>
              <li className='flex items-center gap-2'>
                <div className='h-1.5 w-1.5 rounded-full bg-[#b01d4f]'></div>
                दस्तऐवज प्रक्रिया
              </li>
              <li className='flex items-center gap-2'>
                <div className='h-1.5 w-1.5 rounded-full bg-[#b01d4f]'></div>
                अहवाल आणि विश्लेषण
              </li>
              <li className='flex items-center gap-2'>
                <div className='h-1.5 w-1.5 rounded-full bg-[#b01d4f]'></div>
                ग्राहक समस्यानिवारण
              </li>
            </ul>
          </div>

          {/* Footer */}
          <FieldDescription className='mt-6 text-center text-xs text-gray-500'>
            © {new Date().getFullYear()} शेगाव नगर परिषद. सर्व हक्क राखीव.
            <br />
            <a href='#' className='text-[#b01d4f] hover:underline'>
              वापराच्या अटी
            </a>{' '}
            |{' '}
            <a href='#' className='text-[#b01d4f] hover:underline'>
              गोपनीयता धोरण
            </a>{' '}
            |{' '}
            <a href='#' className='text-[#b01d4f] hover:underline'>
              मदत केंद्र
            </a>
          </FieldDescription>
        </div>

        {/* Bottom Government Stamp */}
        <div className='mt-8 flex justify-center'>
          <div className='flex items-center gap-2 rounded-lg border border-gray-200 bg-white px-4 py-2 shadow-sm'>
            <div className='h-8 w-8 rounded-full border-2 border-[#b01d4f] p-1'>
              <Shield className='h-full w-full text-[#b01d4f]' />
            </div>
            <div className='text-xs'>
              <div className='font-medium text-gray-900'>
                भारत सरकार मान्यताप्राप्त
              </div>
              <div className='text-gray-600'>सुरक्षित डिजिटल पोर्टल</div>
            </div>
          </div>
        </div>
      </div>

      {/* Right: Government Carousel */}
      <div className='relative flex w-full items-center justify-center overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 lg:w-[50%]'>
        {/* Dynamic Background with Government Pattern */}
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-all duration-1000 ease-in-out ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className='absolute inset-0 bg-gradient-to-br from-[#b01d4f]/20 via-transparent to-[#7a1e4f]/10' />
            <div
              className='absolute inset-0'
              style={{
                backgroundImage:
                  'linear-gradient(45deg, transparent 49%, rgba(255,255,255,.1) 50%, transparent 51%)',
                backgroundSize: '50px 50px'
              }}
            />
          </div>
        ))}

        {/* Carousel Container */}
        <div className='relative z-10 flex h-full w-full flex-col items-center justify-center p-8'>
          {/* Government Seal */}
          <div className='absolute top-8 left-8'>
            <div className='relative h-16 w-16 rounded-full border-4 border-white/30 bg-gradient-to-br from-[#b01d4f] to-[#7a1e4f] p-2'>
              <Building2 className='h-full w-full text-white' />
              <div className='absolute -right-1 -bottom-1 h-6 w-6 rounded-full border-2 border-white bg-green-500' />
            </div>
          </div>

          {/* Slide Content */}
          <div className='relative flex w-full max-w-2xl items-center justify-center'>
            {slides.map((slide, index) => (
              <div
                key={index}
                className={`absolute inset-0 flex flex-col items-center justify-center transition-all duration-700 ease-in-out ${
                  index === currentSlide
                    ? 'translate-y-0 opacity-100'
                    : 'translate-y-10 opacity-0'
                }`}
              >
                <div className='mb-8 rounded-2xl border-4 border-white/20 bg-white/10 p-2 backdrop-blur-sm'>
                  <img
                    src={slide.image}
                    alt='Government Service'
                    className='w-full max-w-md rounded-xl object-contain shadow-2xl'
                  />
                </div>
              </div>
            ))}
          </div>

          {/* Slide Dots with Government Colors */}
          <div className='absolute bottom-24 left-1/2 z-20 flex -translate-x-1/2 transform gap-2'>
            {slides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`h-2 rounded-full transition-all duration-300 ${
                  index === currentSlide
                    ? 'w-8 bg-gradient-to-r from-[#b01d4f] to-[#7a1e4f]'
                    : 'w-2 bg-white/50'
                }`}
              />
            ))}
          </div>

          {/* Government Information */}
          <div className='absolute bottom-12 left-1/2 z-20 w-full max-w-2xl -translate-x-1/2 transform px-4'>
            <div className='rounded-xl border border-white/20 bg-gradient-to-r from-white/10 to-white/5 p-6 backdrop-blur-sm'>
              <div className='relative'>
                <div className='absolute top-1/2 -left-3 h-1 w-6 -translate-y-1/2 bg-gradient-to-r from-[#b01d4f] to-[#7a1e4f]' />
                <h3 className='mb-2 text-2xl font-bold text-white'>
                  {slides[currentSlide].title}
                </h3>
                <p className='text-white/90'>{slides[currentSlide].text}</p>
              </div>
            </div>
          </div>

          {/* Emergency Contact */}
          <div className='absolute right-8 bottom-8'>
            <div className='rounded-lg border border-white/20 bg-red-600/20 p-3 backdrop-blur-sm'>
              <div className='flex items-center gap-2'>
                <div className='h-3 w-3 animate-pulse rounded-full bg-red-500' />
                <span className='text-xs font-medium text-white'>
                  आणीबाणी केंद्र: १०७७
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
