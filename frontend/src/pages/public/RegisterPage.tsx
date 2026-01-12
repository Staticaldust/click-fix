import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, UserPlus } from 'lucide-react';
import { toast } from 'react-toastify';
import { Button, Input, Select, Checkbox, Card } from '../../components/common';
import { useAuthStore } from '../../store/authStore';
import { registerSchema, RegisterFormData } from '../../utils/validators';
import { GENDER_OPTIONS, ISRAELI_CITIES } from '../../utils/constants';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { register: registerUser, isLoading } = useAuthStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      password: '',
      confirmPassword: '',
      city: '',
      gender: undefined,
      acceptTerms: false,
    },
  });

  const onSubmit = async (data: RegisterFormData) => {
    try {
      await registerUser(data);
      toast.success('נרשמת בהצלחה!');
      navigate('/');
    } catch {
      toast.error('שגיאה בהרשמה. אנא בדוק את הפרטים ונסה שוב.');
    }
  };

  const cityOptions = ISRAELI_CITIES.map((city) => ({
    value: city,
    label: city,
  }));

  const genderOptions = GENDER_OPTIONS.map((g) => ({
    value: g.value,
    label: g.label,
  }));

  return (
    <div className="min-h-screen bg-secondary-50 flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-3xl font-bold text-primary-600">אנשי שלומנו</h1>
          </Link>
          <p className="mt-2 text-secondary-600">הצטרפו אלינו</p>
        </div>

        <Card>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className="text-center mb-6">
              <h2 className="text-2xl font-semibold text-secondary-800">הרשמה</h2>
            </div>

            {/* Name fields */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="שם פרטי"
                placeholder="ישראל"
                required
                error={errors.firstName?.message}
                {...register('firstName')}
              />
              <Input
                label="שם משפחה"
                placeholder="ישראלי"
                required
                error={errors.lastName?.message}
                {...register('lastName')}
              />
            </div>

            {/* Contact fields */}
            <Input
              label="אימייל"
              type="email"
              placeholder="example@email.com"
              required
              error={errors.email?.message}
              {...register('email')}
            />

            <Input
              label="טלפון"
              type="tel"
              placeholder="0501234567"
              required
              error={errors.phone?.message}
              {...register('phone')}
            />

            {/* Password fields */}
            <div className="relative">
              <Input
                label="סיסמה"
                type={showPassword ? 'text' : 'password'}
                placeholder="לפחות 8 תווים, אות גדולה ומספר"
                required
                error={errors.password?.message}
                {...register('password')}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute left-3 top-[42px] text-secondary-400 hover:text-secondary-600"
              >
                {showPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            <div className="relative">
              <Input
                label="אישור סיסמה"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="הזן שוב את הסיסמה"
                required
                error={errors.confirmPassword?.message}
                {...register('confirmPassword')}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute left-3 top-[42px] text-secondary-400 hover:text-secondary-600"
              >
                {showConfirmPassword ? (
                  <EyeOff className="w-5 h-5" />
                ) : (
                  <Eye className="w-5 h-5" />
                )}
              </button>
            </div>

            {/* Optional fields */}
            <div className="grid grid-cols-2 gap-4">
              <Select
                label="עיר"
                options={cityOptions}
                placeholder="בחר עיר"
                error={errors.city?.message}
                {...register('city')}
              />
              <Select
                label="מגדר"
                options={genderOptions}
                placeholder="בחר מגדר"
                error={errors.gender?.message}
                {...register('gender')}
              />
            </div>

            {/* Terms */}
            <Checkbox
              label={
                <span>
                  קראתי ואני מסכים/מה ל
                  <Link
                    to="/terms"
                    className="text-primary-600 hover:text-primary-700 underline mx-1"
                  >
                    תנאי השימוש
                  </Link>
                  ול
                  <Link
                    to="/privacy"
                    className="text-primary-600 hover:text-primary-700 underline mx-1"
                  >
                    מדיניות הפרטיות
                  </Link>
                </span>
              }
              error={errors.acceptTerms?.message}
              {...register('acceptTerms')}
            />

            <Button
              type="submit"
              fullWidth
              isLoading={isLoading}
            >
              <UserPlus className="w-5 h-5" />
              הרשמה
            </Button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-secondary-600">
              כבר יש לך חשבון?{' '}
              <Link
                to="/login"
                className="text-primary-600 hover:text-primary-700 font-medium"
              >
                התחברות
              </Link>
            </p>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/register/professional"
              className="text-sm text-secondary-500 hover:text-secondary-700"
            >
              הרשמה כבעל מקצוע
            </Link>
          </div>
        </Card>
      </div>
    </div>
  );
}
