import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import {
  User,
  Camera,
  MapPin,
  Clock,
  DollarSign,
  FileText,
  Plus,
  Trash2,
  Save,
  CheckCircle,
} from 'lucide-react';
import { Button, Card, Input, Select } from '../../components/common';
import { ISRAELI_CITIES, DAYS_OF_WEEK, CATEGORIES } from '../../utils/constants';
import { classNames } from '../../utils/helpers';
import type { ServicePrice, WorkingHours } from '../../types/professional.types';

type TabId = 'basic' | 'areas' | 'hours' | 'services' | 'certificates';

const tabs = [
  { id: 'basic' as const, label: 'פרטים בסיסיים', icon: User },
  { id: 'areas' as const, label: 'אזורי שירות', icon: MapPin },
  { id: 'hours' as const, label: 'שעות פעילות', icon: Clock },
  { id: 'services' as const, label: 'שירותים ומחירים', icon: DollarSign },
  { id: 'certificates' as const, label: 'תעודות', icon: FileText },
];

// Mock data - in production would come from API
const mockProfile = {
  firstName: 'דוד',
  lastName: 'כהן',
  email: 'david@example.com',
  phone: '0501234567',
  categoryId: 'electrician',
  description: 'חשמלאי מוסמך עם ניסיון של מעל 15 שנה. מתמחה בהתקנות חשמל ביתיות ומסחריות.',
  yearsOfExperience: 15,
  serviceAreas: ['ירושלים', 'בית שמש', 'מודיעין'],
  workingHours: DAYS_OF_WEEK.map((day) => ({
    day: day.value as WorkingHours['day'],
    isWorking: day.value !== 'saturday',
    startTime: '08:00',
    endTime: '17:00',
  })),
  services: [
    { id: '1', name: 'תיקון תקלות חשמל', minPrice: 150, maxPrice: 350 },
    { id: '2', name: 'התקנת נקודות חשמל', minPrice: 100, maxPrice: 200 },
    { id: '3', name: 'החלפת לוח חשמל', minPrice: 800, maxPrice: 2500 },
  ],
};

export default function ProfessionalProfileEdit() {
  const [activeTab, setActiveTab] = useState<TabId>('basic');
  const [isSaving, setIsSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [services, setServices] = useState<ServicePrice[]>(mockProfile.services);

  const { register, control, handleSubmit, watch } = useForm({
    defaultValues: {
      ...mockProfile,
    },
  });

  const categoryOptions = CATEGORIES.map((c) => ({ value: c.id, label: c.name }));

  const addService = () => {
    setServices([...services, { id: Date.now().toString(), name: '', minPrice: 0, maxPrice: 0 }]);
  };

  const removeService = (id: string) => {
    if (services.length > 1) {
      setServices(services.filter((s) => s.id !== id));
    }
  };

  const updateService = (id: string, field: keyof Omit<ServicePrice, 'id'>, value: string | number) => {
    setServices(services.map((s) => {
      if (s.id === id) {
        return { ...s, [field]: field === 'name' ? value : Number(value) };
      }
      return s;
    }));
  };

  const onSubmit = async (data: typeof mockProfile) => {
    setIsSaving(true);
    setSuccessMessage(null);
    try {
      console.log('Saving profile:', { ...data, services });
      // In production: await professionalService.updateProfile(data);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      setSuccessMessage('הפרופיל עודכן בהצלחה');
    } catch (error) {
      console.error('Failed to save profile:', error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-secondary-800 mb-2">עריכת פרופיל</h1>
        <p className="text-secondary-600">עדכנו את הפרטים שלכם כדי למשוך יותר לקוחות</p>
      </div>

      {/* Success Message */}
      {successMessage && (
        <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-center gap-2 text-green-700">
          <CheckCircle className="w-5 h-5" />
          {successMessage}
        </div>
      )}

      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar Navigation */}
        <aside className="w-full md:w-64 flex-shrink-0">
          <Card className="p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={classNames(
                    'w-full flex items-center gap-3 px-4 py-3 rounded-lg text-right transition-colors',
                    activeTab === tab.id
                      ? 'bg-primary-50 text-primary-700'
                      : 'text-secondary-600 hover:bg-secondary-50'
                  )}
                >
                  <tab.icon className="w-5 h-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </Card>
        </aside>

        {/* Content */}
        <div className="flex-1">
          <form onSubmit={handleSubmit(onSubmit)}>
            {/* Basic Info */}
            {activeTab === 'basic' && (
              <Card>
                <h2 className="text-lg font-semibold text-secondary-800 mb-6">פרטים בסיסיים</h2>

                {/* Profile Image */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center text-primary-700 text-3xl font-bold">
                    {mockProfile.firstName[0]}{mockProfile.lastName[0]}
                  </div>
                  <div>
                    <Button type="button" variant="outline" size="sm">
                      <Camera className="w-4 h-4" />
                      העלה תמונה
                    </Button>
                    <p className="text-xs text-secondary-500 mt-1">JPG, PNG עד 5MB</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <Input label="שם פרטי" {...register('firstName')} />
                    <Input label="שם משפחה" {...register('lastName')} />
                  </div>
                  <Input label="אימייל" type="email" dir="ltr" {...register('email')} disabled />
                  <Input label="טלפון" type="tel" dir="ltr" {...register('phone')} />
                  <Select
                    label="תחום התמחות"
                    options={categoryOptions}
                    {...register('categoryId')}
                  />
                  <Input
                    label="שנות ניסיון"
                    type="number"
                    {...register('yearsOfExperience', { valueAsNumber: true })}
                  />
                  <div>
                    <label className="block text-sm font-medium text-secondary-700 mb-2">
                      תיאור
                    </label>
                    <textarea
                      rows={4}
                      className="w-full px-4 py-3 border border-secondary-300 rounded-lg focus:outline-none focus:ring-2 focus:border-primary-500 focus:ring-primary-500/20 resize-none"
                      {...register('description')}
                    />
                  </div>
                </div>
              </Card>
            )}

            {/* Service Areas */}
            {activeTab === 'areas' && (
              <Card>
                <h2 className="text-lg font-semibold text-secondary-800 mb-6">אזורי שירות</h2>
                <p className="text-secondary-600 text-sm mb-4">
                  סמנו את הערים בהן אתם מספקים שירות
                </p>
                <Controller
                  name="serviceAreas"
                  control={control}
                  render={({ field }) => (
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 max-h-96 overflow-y-auto p-2 border border-secondary-200 rounded-lg">
                      {ISRAELI_CITIES.map((city) => (
                        <label
                          key={city}
                          className={classNames(
                            'flex items-center gap-2 cursor-pointer p-2 rounded transition-colors',
                            field.value?.includes(city)
                              ? 'bg-primary-50 border border-primary-200'
                              : 'hover:bg-secondary-50'
                          )}
                        >
                          <input
                            type="checkbox"
                            checked={field.value?.includes(city)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                field.onChange([...(field.value || []), city]);
                              } else {
                                field.onChange(field.value?.filter((c: string) => c !== city));
                              }
                            }}
                            className="w-4 h-4 rounded border-secondary-300 text-primary-500 focus:ring-primary-500"
                          />
                          <span className="text-sm text-secondary-700">{city}</span>
                        </label>
                      ))}
                    </div>
                  )}
                />
                <p className="text-sm text-secondary-500 mt-2">
                  נבחרו {watch('serviceAreas')?.length || 0} ערים
                </p>
              </Card>
            )}

            {/* Working Hours */}
            {activeTab === 'hours' && (
              <Card>
                <h2 className="text-lg font-semibold text-secondary-800 mb-6">שעות פעילות</h2>
                <Controller
                  name="workingHours"
                  control={control}
                  render={({ field }) => (
                    <div className="space-y-3">
                      {DAYS_OF_WEEK.map((day, index) => {
                        const wh = field.value?.[index];
                        return (
                          <div
                            key={day.value}
                            className="flex items-center gap-4 p-3 bg-secondary-50 rounded-lg"
                          >
                            <label className="flex items-center gap-2 w-24">
                              <input
                                type="checkbox"
                                checked={wh?.isWorking}
                                onChange={(e) => {
                                  const updated = [...(field.value || [])];
                                  updated[index] = { ...updated[index], isWorking: e.target.checked };
                                  field.onChange(updated);
                                }}
                                className="w-4 h-4 rounded border-secondary-300 text-primary-500 focus:ring-primary-500"
                              />
                              <span className="text-sm font-medium text-secondary-700">
                                {day.label}
                              </span>
                            </label>
                            {wh?.isWorking && (
                              <div className="flex items-center gap-2 flex-1">
                                <input
                                  type="time"
                                  value={wh.startTime || '08:00'}
                                  onChange={(e) => {
                                    const updated = [...(field.value || [])];
                                    updated[index] = { ...updated[index], startTime: e.target.value };
                                    field.onChange(updated);
                                  }}
                                  className="px-3 py-2 border border-secondary-300 rounded-lg text-sm"
                                />
                                <span className="text-secondary-500">עד</span>
                                <input
                                  type="time"
                                  value={wh.endTime || '17:00'}
                                  onChange={(e) => {
                                    const updated = [...(field.value || [])];
                                    updated[index] = { ...updated[index], endTime: e.target.value };
                                    field.onChange(updated);
                                  }}
                                  className="px-3 py-2 border border-secondary-300 rounded-lg text-sm"
                                />
                              </div>
                            )}
                            {!wh?.isWorking && (
                              <span className="text-sm text-secondary-400">סגור</span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  )}
                />
              </Card>
            )}

            {/* Services */}
            {activeTab === 'services' && (
              <Card>
                <h2 className="text-lg font-semibold text-secondary-800 mb-6">שירותים ומחירים</h2>
                <div className="space-y-4">
                  {services.map((service) => (
                    <div key={service.id} className="flex gap-4 items-end p-4 bg-secondary-50 rounded-lg">
                      <div className="flex-1">
                        <Input
                          label="שם השירות"
                          value={service.name}
                          onChange={(e) => updateService(service.id, 'name', e.target.value)}
                        />
                      </div>
                      <div className="w-28">
                        <Input
                          label="מינימום (ש״ח)"
                          type="number"
                          value={service.minPrice || ''}
                          onChange={(e) => updateService(service.id, 'minPrice', e.target.value)}
                        />
                      </div>
                      <div className="w-28">
                        <Input
                          label="מקסימום (ש״ח)"
                          type="number"
                          value={service.maxPrice || ''}
                          onChange={(e) => updateService(service.id, 'maxPrice', e.target.value)}
                        />
                      </div>
                      {services.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeService(service.id)}
                          className="p-2 text-secondary-400 hover:text-error transition-colors mb-1"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      )}
                    </div>
                  ))}
                  <Button type="button" variant="outline" onClick={addService}>
                    <Plus className="w-5 h-5" />
                    הוסף שירות
                  </Button>
                </div>
              </Card>
            )}

            {/* Certificates */}
            {activeTab === 'certificates' && (
              <Card>
                <h2 className="text-lg font-semibold text-secondary-800 mb-6">תעודות והסמכות</h2>
                <div className="space-y-4">
                  <div className="p-4 bg-secondary-50 rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-secondary-800">תעודת חשמלאי מוסמך</span>
                      <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded">מאומת</span>
                    </div>
                    <p className="text-sm text-secondary-500">הועלה ב-15/01/2024</p>
                  </div>
                  <div className="border-2 border-dashed border-secondary-300 rounded-lg p-8 text-center">
                    <FileText className="w-12 h-12 text-secondary-300 mx-auto mb-3" />
                    <p className="text-secondary-600 mb-2">גרור קבצים לכאן או</p>
                    <Button type="button" variant="outline" size="sm">
                      בחר קובץ
                    </Button>
                    <p className="text-xs text-secondary-400 mt-2">PDF, JPG, PNG עד 5MB</p>
                  </div>
                </div>
              </Card>
            )}

            {/* Save Button */}
            <div className="mt-6">
              <Button type="submit" isLoading={isSaving} size="lg">
                <Save className="w-5 h-5" />
                שמור שינויים
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
