import React, { useState } from 'react';
import { MapPin, Phone, Mail, Linkedin } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';
import useMetaDescription from '../hooks/useMetaDescription';

const API_URL = process.env.REACT_APP_BACKEND_URL;

// Country codes with flags and names
const countryCodes = [
  { code: '+1', flag: '🇺🇸', name: 'United States' },
  { code: '+1', flag: '🇨🇦', name: 'Canada' },
  { code: '+7', flag: '🇷🇺', name: 'Russia' },
  { code: '+20', flag: '🇪🇬', name: 'Egypt' },
  { code: '+27', flag: '🇿🇦', name: 'South Africa' },
  { code: '+30', flag: '🇬🇷', name: 'Greece' },
  { code: '+31', flag: '🇳🇱', name: 'Netherlands' },
  { code: '+32', flag: '🇧🇪', name: 'Belgium' },
  { code: '+33', flag: '🇫🇷', name: 'France' },
  { code: '+34', flag: '🇪🇸', name: 'Spain' },
  { code: '+36', flag: '🇭🇺', name: 'Hungary' },
  { code: '+39', flag: '🇮🇹', name: 'Italy' },
  { code: '+40', flag: '🇷🇴', name: 'Romania' },
  { code: '+41', flag: '🇨🇭', name: 'Switzerland' },
  { code: '+43', flag: '🇦🇹', name: 'Austria' },
  { code: '+44', flag: '🇬🇧', name: 'United Kingdom' },
  { code: '+45', flag: '🇩🇰', name: 'Denmark' },
  { code: '+46', flag: '🇸🇪', name: 'Sweden' },
  { code: '+47', flag: '🇳🇴', name: 'Norway' },
  { code: '+48', flag: '🇵🇱', name: 'Poland' },
  { code: '+49', flag: '🇩🇪', name: 'Germany' },
  { code: '+51', flag: '🇵🇪', name: 'Peru' },
  { code: '+52', flag: '🇲🇽', name: 'Mexico' },
  { code: '+53', flag: '🇨🇺', name: 'Cuba' },
  { code: '+54', flag: '🇦🇷', name: 'Argentina' },
  { code: '+55', flag: '🇧🇷', name: 'Brazil' },
  { code: '+56', flag: '🇨🇱', name: 'Chile' },
  { code: '+57', flag: '🇨🇴', name: 'Colombia' },
  { code: '+58', flag: '🇻🇪', name: 'Venezuela' },
  { code: '+60', flag: '🇲🇾', name: 'Malaysia' },
  { code: '+61', flag: '🇦🇺', name: 'Australia' },
  { code: '+62', flag: '🇮🇩', name: 'Indonesia' },
  { code: '+63', flag: '🇵🇭', name: 'Philippines' },
  { code: '+64', flag: '🇳🇿', name: 'New Zealand' },
  { code: '+65', flag: '🇸🇬', name: 'Singapore' },
  { code: '+66', flag: '🇹🇭', name: 'Thailand' },
  { code: '+81', flag: '🇯🇵', name: 'Japan' },
  { code: '+82', flag: '🇰🇷', name: 'South Korea' },
  { code: '+84', flag: '🇻🇳', name: 'Vietnam' },
  { code: '+86', flag: '🇨🇳', name: 'China' },
  { code: '+90', flag: '🇹🇷', name: 'Turkey' },
  { code: '+91', flag: '🇮🇳', name: 'India' },
  { code: '+92', flag: '🇵🇰', name: 'Pakistan' },
  { code: '+93', flag: '🇦🇫', name: 'Afghanistan' },
  { code: '+94', flag: '🇱🇰', name: 'Sri Lanka' },
  { code: '+95', flag: '🇲🇲', name: 'Myanmar' },
  { code: '+98', flag: '🇮🇷', name: 'Iran' },
  { code: '+212', flag: '🇲🇦', name: 'Morocco' },
  { code: '+213', flag: '🇩🇿', name: 'Algeria' },
  { code: '+216', flag: '🇹🇳', name: 'Tunisia' },
  { code: '+218', flag: '🇱🇾', name: 'Libya' },
  { code: '+220', flag: '🇬🇲', name: 'Gambia' },
  { code: '+221', flag: '🇸🇳', name: 'Senegal' },
  { code: '+234', flag: '🇳🇬', name: 'Nigeria' },
  { code: '+254', flag: '🇰🇪', name: 'Kenya' },
  { code: '+255', flag: '🇹🇿', name: 'Tanzania' },
  { code: '+256', flag: '🇺🇬', name: 'Uganda' },
  { code: '+260', flag: '🇿🇲', name: 'Zambia' },
  { code: '+263', flag: '🇿🇼', name: 'Zimbabwe' },
  { code: '+351', flag: '🇵🇹', name: 'Portugal' },
  { code: '+352', flag: '🇱🇺', name: 'Luxembourg' },
  { code: '+353', flag: '🇮🇪', name: 'Ireland' },
  { code: '+354', flag: '🇮🇸', name: 'Iceland' },
  { code: '+358', flag: '🇫🇮', name: 'Finland' },
  { code: '+370', flag: '🇱🇹', name: 'Lithuania' },
  { code: '+371', flag: '🇱🇻', name: 'Latvia' },
  { code: '+372', flag: '🇪🇪', name: 'Estonia' },
  { code: '+380', flag: '🇺🇦', name: 'Ukraine' },
  { code: '+381', flag: '🇷🇸', name: 'Serbia' },
  { code: '+385', flag: '🇭🇷', name: 'Croatia' },
  { code: '+386', flag: '🇸🇮', name: 'Slovenia' },
  { code: '+420', flag: '🇨🇿', name: 'Czech Republic' },
  { code: '+421', flag: '🇸🇰', name: 'Slovakia' },
  { code: '+501', flag: '🇧🇿', name: 'Belize' },
  { code: '+502', flag: '🇬🇹', name: 'Guatemala' },
  { code: '+503', flag: '🇸🇻', name: 'El Salvador' },
  { code: '+504', flag: '🇭🇳', name: 'Honduras' },
  { code: '+505', flag: '🇳🇮', name: 'Nicaragua' },
  { code: '+506', flag: '🇨🇷', name: 'Costa Rica' },
  { code: '+507', flag: '🇵🇦', name: 'Panama' },
  { code: '+509', flag: '🇭🇹', name: 'Haiti' },
  { code: '+591', flag: '🇧🇴', name: 'Bolivia' },
  { code: '+592', flag: '🇬🇾', name: 'Guyana' },
  { code: '+593', flag: '🇪🇨', name: 'Ecuador' },
  { code: '+595', flag: '🇵🇾', name: 'Paraguay' },
  { code: '+598', flag: '🇺🇾', name: 'Uruguay' },
  { code: '+852', flag: '🇭🇰', name: 'Hong Kong' },
  { code: '+853', flag: '🇲🇴', name: 'Macau' },
  { code: '+855', flag: '🇰🇭', name: 'Cambodia' },
  { code: '+856', flag: '🇱🇦', name: 'Laos' },
  { code: '+880', flag: '🇧🇩', name: 'Bangladesh' },
  { code: '+886', flag: '🇹🇼', name: 'Taiwan' },
  { code: '+960', flag: '🇲🇻', name: 'Maldives' },
  { code: '+961', flag: '🇱🇧', name: 'Lebanon' },
  { code: '+962', flag: '🇯🇴', name: 'Jordan' },
  { code: '+963', flag: '🇸🇾', name: 'Syria' },
  { code: '+964', flag: '🇮🇶', name: 'Iraq' },
  { code: '+965', flag: '🇰🇼', name: 'Kuwait' },
  { code: '+966', flag: '🇸🇦', name: 'Saudi Arabia' },
  { code: '+967', flag: '🇾🇪', name: 'Yemen' },
  { code: '+968', flag: '🇴🇲', name: 'Oman' },
  { code: '+971', flag: '🇦🇪', name: 'UAE' },
  { code: '+972', flag: '🇮🇱', name: 'Israel' },
  { code: '+973', flag: '🇧🇭', name: 'Bahrain' },
  { code: '+974', flag: '🇶🇦', name: 'Qatar' },
  { code: '+975', flag: '🇧🇹', name: 'Bhutan' },
  { code: '+976', flag: '🇲🇳', name: 'Mongolia' },
  { code: '+977', flag: '🇳🇵', name: 'Nepal' },
  { code: '+992', flag: '🇹🇯', name: 'Tajikistan' },
  { code: '+993', flag: '🇹🇲', name: 'Turkmenistan' },
  { code: '+994', flag: '🇦🇿', name: 'Azerbaijan' },
  { code: '+995', flag: '🇬🇪', name: 'Georgia' },
  { code: '+996', flag: '🇰🇬', name: 'Kyrgyzstan' },
  { code: '+998', flag: '🇺🇿', name: 'Uzbekistan' },
];

const Contact = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phoneCode: '+91',
    phoneNumber: '',
    inquiryType: '',
    message: ''
  });
  const [emailVerified, setEmailVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [validationErrors, setValidationErrors] = useState({});

  useDocumentTitle('Contact us | Blubridge');
  useMetaDescription('Get in touch with Blubridge to collaborate on AI research, model engineering, and deployment.');

  // Get the selected country info for display
  const getSelectedCountry = () => {
    return countryCodes.find(c => c.code === formData.phoneCode) || countryCodes.find(c => c.code === '+91');
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[0-9]{6,15}$/;
    return phoneRegex.test(phone.replace(/\s/g, ''));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear validation error when user starts typing
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handlePhoneChange = (e) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Only allow numbers
    setFormData(prev => ({ ...prev, phoneNumber: value }));
    if (validationErrors.phoneNumber) {
      setValidationErrors(prev => ({ ...prev, phoneNumber: '' }));
    }
  };

  const handleVerifyEmail = () => {
    if (formData.email && validateEmail(formData.email)) {
      setEmailVerified(true);
      setValidationErrors(prev => ({ ...prev, email: '' }));
    } else {
      setValidationErrors(prev => ({ ...prev, email: 'Please enter a valid email address' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) {
      errors.firstName = 'First name is required';
    }
    
    if (!formData.lastName.trim()) {
      errors.lastName = 'Last name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (!formData.phoneNumber.trim()) {
      errors.phoneNumber = 'Phone number is required';
    } else if (!validatePhone(formData.phoneNumber)) {
      errors.phoneNumber = 'Please enter a valid phone number (6-15 digits)';
    }
    
    if (!formData.inquiryType) {
      errors.inquiryType = 'Please select an inquiry type';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      errors.message = 'Message must be at least 10 characters';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) {
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitError('');

    try {
      const response = await fetch(`${API_URL}/api/contacts/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: 'contact_us',
          firstName: formData.firstName.trim(),
          lastName: formData.lastName.trim(),
          email: formData.email.trim().toLowerCase(),
          phone: `${formData.phoneCode} ${formData.phoneNumber}`,
          enquiryCategory: formData.inquiryType,
          message: formData.message.trim()
        }),
      });

      if (response.ok) {
        alert('Thank you for your inquiry. We will get back to you soon!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          phoneCode: '+91',
          phoneNumber: '',
          inquiryType: '',
          message: ''
        });
        setEmailVerified(false);
        setValidationErrors({});
      } else if (response.status === 409) {
        // Duplicate submission
        setSubmitError('You have already submitted this form recently. Please wait a moment before trying again.');
      } else {
        const errorData = await response.json();
        setSubmitError(errorData.detail || 'Failed to submit form. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitError('Failed to submit form. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div 
      data-testid="contact-page"
      className="contact-page-container"
      style={{
        paddingTop: '60px',
        paddingBottom: '60px',
        backgroundColor: 'rgb(255, 253, 247)'
      }}
    >
      <style>{`
        .contact-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
        }
        @media (min-width: 900px) {
          .contact-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
        .contact-form-row {
          display: grid;
          grid-template-columns: 1fr;
          gap: 16px;
        }
        @media (min-width: 640px) {
          .contact-form-row {
            grid-template-columns: 1fr 1fr;
          }
        }
        .email-row {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        @media (min-width: 480px) {
          .email-row {
            flex-direction: row;
          }
        }
        .email-row input {
          flex: 1;
        }
        .email-row button {
          width: 100%;
        }
        @media (min-width: 480px) {
          .email-row button {
            width: auto;
          }
        }
      `}</style>
      <div style={{
        maxWidth: '1261px',
        margin: '0 auto',
        padding: '0 24px'
      }}>
        <div className="contact-grid">
          
          {/* Left Column - Our Offices */}
          <div 
            data-testid="offices-card"
            style={{
              backgroundColor: 'rgb(239, 237, 229)',
              borderRadius: '16px',
              padding: '36px 32px',
              border: '1px solid #e8e6e0'
            }}
          >
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              color: '#0B1F3B',
              marginBottom: '28px',
              textAlign: 'center',
              letterSpacing: '-0.02em'
            }}>
              Office Locations
            </h2>
            
            {/* Office Card 1 */}
            <div style={{
              backgroundColor: '#fffdf7',
              border: '1px solid #e0ded8',
              borderLeft: '3px solid #0b1f3b',
              borderRadius: '12px',
              padding: '20px 24px',
              marginBottom: '16px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                   <h3 style={{
                    fontWeight: '600',
                    color: '#0B1F3B',
                    fontSize: '16px',
                    marginBottom: '8px',
                    lineHeight: '1.3'
                  }}>
                   INDIA
                  </h3>
                  <p style={{
                    color: '#4a5568',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    Plot #E160 Tiger Varadhachari Road,<br />
                    Kalakshetra Colony, Besant Nagar,<br />
                    Chennai – 600090
                  </p>
                </div>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  marginLeft: '16px',
                  paddingTop: '22px'
                }}>
                  <MapPin size={22} color="#0B1F3B" style={{ marginBottom: '8px' }} />
                  <a 
                    href="https://maps.google.com/?q=Plot+E160+Tiger+Varadhachari+Road+Kalakshetra+Colony+Besant+Nagar+Chennai+600090"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#3b82f6', 
                      fontSize: '13px',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    View on Map »
                  </a>
                </div>
              </div>
            </div>

            {/* Office Card 2 */}
            <div style={{
              backgroundColor: '#fffdf7',
              border: '1px solid #e0ded8',
              borderLeft: '3px solid #0b1f3b',
              borderRadius: '12px',
              padding: '20px 24px',
              marginBottom: '15px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                 <h3 style={{
                    fontWeight: '600',
                    color: '#0B1F3B',
                    fontSize: '16px',
                    marginBottom: '8px',
                    lineHeight: '1.3'
                  }}>
                   INDIA
                  </h3> 
                  <p style={{
                    color: '#4a5568',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    30, Norton Rd, Mandavelipakkam,<br />
                    Raja Annamalai Puram,<br />
                    Chennai, Tamil Nadu 600028
                  </p>
                </div>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  marginLeft: '16px',
                  paddingTop: '22px'
                }}>
                  <MapPin size={22} color="#0B1F3B" style={{ marginBottom: '8px' }} />
                  <a 
                    href="https://maps.google.com/?q=30+Norton+Rd+Mandavelipakkam+Raja+Annamalai+Puram+Chennai+600028"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#3b82f6', 
                      fontSize: '13px',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    View on Map »
                  </a>
                </div>
              </div>
            </div>
            {/* Office Card 2 */}
            <div style={{
              backgroundColor: '#fffdf7',
              border: '1px solid #e0ded8',
              borderLeft: '3px solid #0b1f3b',
              borderRadius: '12px',
              padding: '20px 24px',
              marginBottom: '15px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div style={{ flex: 1 }}>
                 <h3 style={{
                    fontWeight: '600',
                    color: '#0B1F3B',
                    fontSize: '16px',
                    marginBottom: '8px',
                    lineHeight: '1.3'
                  }}>
                    USA
                  </h3> 
                  <p style={{
                    color: '#4a5568',
                    fontSize: '14px',
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    44 Center Grove Rd, Randolph,<br />
                    New Jersey – 07869
                  </p>
                </div>
                <div style={{ 
                  display: 'flex', 
                  flexDirection: 'column', 
                  alignItems: 'center',
                  marginLeft: '16px',
                  paddingTop: '22px'
                }}>
                  <MapPin size={22} color="#0B1F3B" style={{ marginBottom: '8px' }} />
                  <a 
                    href="https://maps.google.com/?q=44+Center+Grove+Rd+Randolph+New+Jersey+07869"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      color: '#3b82f6', 
                      fontSize: '13px',
                      textDecoration: 'none',
                      whiteSpace: 'nowrap'
                    }}
                  >
                    View on Map »
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Info Boxes - Exact Design Match */}
            <div style={{ }}>
              {/* Contact Number Box */}
              <div style={{
                flex: 1,
                backgroundColor: '#fffdf7',
                borderRadius: '10px',
                border: '1px solid #e0ded8',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                paddingLeft:'7px',
                marginBottom:'15px'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#f0efe9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  borderRadius: '10px'
                }}>
                  <Phone size={22} color="#5a5a5a" />
                </div>
                <div style={{ padding: '12px 10px' }}>
                  <p style={{ 
                    fontSize: '11px', 
                    fontWeight: '600', 
                    color: '#888888',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    margin: 0,
                    marginBottom: '2px'
                  }}>
                    Contact Number
                  </p>
                  <a 
                    href="tel:+918925987250" 
                    style={{ 
                      fontSize: '14px', 
                      color: '#333333',
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}
                  >
                    +91 8925987250
                  </a>
                </div>
              </div>

              {/* Email Box */}
              <div style={{
                flex: 1,
                backgroundColor: '#fffdf7',
                borderRadius: '10px',
                border: '1px solid #e0ded8',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                paddingLeft:'7px',
                marginBottom:'15px'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#f0efe9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  borderRadius: '10px'
                }}>
                  <Mail size={22} color="#5a5a5a" />
                </div>
                <div style={{ padding: '12px 10px' }}>
                  <p style={{ 
                    fontSize: '11px', 
                    fontWeight: '600', 
                    color: '#888888',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    margin: 0,
                    marginBottom: '2px'
                  }}>
                    Email
                  </p>
                  <a 
                    href="mailto:info.1@blubridge.com" 
                    style={{ 
                      fontSize: '14px', 
                      color: '#333333',
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}
                  >
                    info.1@blubridge.com
                  </a>
                </div>
              </div>

              {/* LinkedIn Box */}
              <div style={{
                flex: 1,
                backgroundColor: '#fffdf7',
                borderRadius: '10px',
                border: '1px solid #e0ded8',
                display: 'flex',
                alignItems: 'center',
                overflow: 'hidden',
                paddingLeft:'7px'
              }}>
                <div style={{
                  width: '56px',
                  height: '56px',
                  backgroundColor: '#f0efe9',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexShrink: 0,
                  borderRadius: '10px'
                }}>
                  <Linkedin size={22} color="#5a5a5a" />
                </div>
                <div style={{ padding: '12px 10px' }}>
                  <p style={{ 
                    fontSize: '11px', 
                    fontWeight: '600', 
                    color: '#888888',
                    textTransform: 'uppercase',
                    letterSpacing: '0.5px',
                    margin: 0,
                    marginBottom: '2px'
                  }}>
                    LinkedIn
                  </p>
                  <a 
                    href="https://www.linkedin.com/company/blubridge/"
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{ 
                      fontSize: '14px', 
                      color: '#333333',
                      textDecoration: 'none',
                      fontWeight: '500'
                    }}
                  >
                    linkedin.com/company/blubridge
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Contact Us Form */}
          <div 
            data-testid="contact-form-card"
            style={{
              backgroundColor: 'rgb(239, 237, 229)',
              borderRadius: '16px',
              padding: '36px 32px',
              border: '1px solid #e8e6e0'
            }}
          >
            <h1 style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              color: '#0B1F3B',
              marginBottom: '28px',
              textAlign: 'center',
              letterSpacing: '-0.02em'
            }}>
              Contact Us
            </h1>
            
            <form onSubmit={handleSubmit}>
              {/* First Name & Last Name */}
              <div className="contact-form-row" style={{ marginBottom: '20px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#0B1F3B',
                    marginBottom: '8px'
                  }}>
                    First Name<span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: validationErrors.firstName ? '1px solid #ef4444' : '1px solid #d4d4d4',
                      borderRadius: '8px',
                      backgroundColor: '#fffdf7',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  {validationErrors.firstName && (
                    <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', marginBottom: 0 }}>
                      {validationErrors.firstName}
                    </p>
                  )}
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#0B1F3B',
                    marginBottom: '8px'
                  }}>
                    Last Name<span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: validationErrors.lastName ? '1px solid #ef4444' : '1px solid #d4d4d4',
                      borderRadius: '8px',
                      backgroundColor: '#fffdf7',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  {validationErrors.lastName && (
                    <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', marginBottom: 0 }}>
                      {validationErrors.lastName}
                    </p>
                  )}
                </div>
              </div>

              {/* Email with Verify Button */}
              <div style={{ marginBottom: '20px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#0B1F3B',
                  marginBottom: '8px'
                }}>
                  Email<span style={{ color: '#ef4444' }}>*</span>
                </label>
                <div className="email-row">
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: validationErrors.email ? '1px solid #ef4444' : '1px solid #d4d4d4',
                      borderRadius: '8px',
                      backgroundColor: '#fffdf7',
                      fontSize: '14px',
                      outline: 'none'
                    }}
                  />
                  <button
                    type="button"
                    onClick={handleVerifyEmail}
                    style={{
                      padding: '12px 20px',
                      borderRadius: '24px',
                      fontSize: '14px',
                      fontWeight: '500',
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                      backgroundColor: emailVerified ? '#16a34a' : '#fffdf7',
                      color: emailVerified ? '#fffdf7' : '#0B1F3B',
                      border: emailVerified ? 'none' : '1px solid #0B1F3B'
                    }}
                  >
                    {emailVerified ? 'Verified ✓' : 'Verify Email'}
                  </button>
                </div>
                {validationErrors.email && (
                  <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', marginBottom: 0 }}>
                    {validationErrors.email}
                  </p>
                )}
              </div>

              {/* Phone Number & Inquiry Type */}
              <div className="contact-form-row" style={{ marginBottom: '20px' }}>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#0B1F3B',
                    marginBottom: '8px'
                  }}>
                    Phone No<span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <div style={{ display: 'flex' }}>
                    <select
                      name="phoneCode"
                      value={formData.phoneCode}
                      onChange={handleInputChange}
                      style={{
                        padding: '12px 8px',
                        backgroundColor: '#f5f5f4',
                        border: validationErrors.phoneNumber ? '1px solid #ef4444' : '1px solid #d4d4d4',
                        borderRight: 'none',
                        borderRadius: '8px 0 0 8px',
                        fontSize: '14px',
                        color: '#0B1F3B',
                        outline: 'none',
                        cursor: 'pointer',
                        minWidth: '91px'
                      }}
                    >
                      {countryCodes.map((country, index) => (
                        <option key={`${country.code}-${index}`} value={country.code}>
                          {country.flag} {country.code}
                        </option>
                      ))}
                    </select>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handlePhoneChange}
                      placeholder="Enter phone number"
                      maxLength={15}
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        border: validationErrors.phoneNumber ? '1px solid #ef4444' : '1px solid #d4d4d4',
                        borderRadius: '0 8px 8px 0',
                        backgroundColor: '#fffdf7',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>
                  {validationErrors.phoneNumber && (
                    <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', marginBottom: 0 }}>
                      {validationErrors.phoneNumber}
                    </p>
                  )}
                </div>
                <div>
                  <label style={{
                    display: 'block',
                    fontSize: '14px',
                    fontWeight: '500',
                    color: '#0B1F3B',
                    marginBottom: '8px'
                  }}>
                    Inquiry Type<span style={{ color: '#ef4444' }}>*</span>
                  </label>
                  <select
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: validationErrors.inquiryType ? '1px solid #ef4444' : '1px solid #d4d4d4',
                      borderRadius: '8px',
                      backgroundColor: '#fffdf7',
                      fontSize: '14px',
                      color: formData.inquiryType ? '#0B1F3B' : '#9ca3af',
                      outline: 'none',
                      cursor: 'pointer',
                      boxSizing: 'border-box'
                    }}
                  >
                    <option value="" disabled>Select</option>
                    <option value="sales">Sales Inquiry</option>
                    <option value="support">Technical Support</option>
                    <option value="partnership">Partnership</option>
                    <option value="careers">Careers</option>
                    <option value="other">Other</option>
                  </select>
                  {validationErrors.inquiryType && (
                    <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', marginBottom: 0 }}>
                      {validationErrors.inquiryType}
                    </p>
                  )}
                </div>
              </div>

              {/* Message */}
              <div style={{ marginBottom: '28px' }}>
                <label style={{
                  display: 'block',
                  fontSize: '14px',
                  fontWeight: '500',
                  color: '#0B1F3B',
                  marginBottom: '8px'
                }}>
                  How can we help you?<span style={{ color: '#ef4444' }}>*</span>
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleInputChange}
                  rows={11}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: validationErrors.message ? '1px solid #ef4444' : '1px solid #d4d4d4',
                    borderRadius: '8px',
                    backgroundColor: '#fffdf7',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box'
                  }}
                />
                {validationErrors.message && (
                  <p style={{ color: '#ef4444', fontSize: '12px', marginTop: '4px', marginBottom: 0 }}>
                    {validationErrors.message}
                  </p>
                )}
              </div>

              {/* Error Message */}
              {submitError && (
                <div style={{
                  padding: '12px 16px',
                  backgroundColor: '#fef2f2',
                  border: '1px solid #fecaca',
                  borderRadius: '8px',
                  marginBottom: '20px'
                }}>
                  <p style={{ color: '#dc2626', fontSize: '14px', margin: 0 }}>
                    {submitError}
                  </p>
                </div>
              )}

              {/* Submit Button */}
              <div style={{ textAlign: 'center' }}>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    padding: '14px 48px',
                    backgroundColor: '#0B1F3B',
                    color: '#ffffff',
                    fontSize: '15px',
                    fontWeight: '500',
                    borderRadius: '8px',
                    border: 'none',
                    cursor: 'pointer',
                    opacity: isSubmitting ? 0.7 : 1
                  }}
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      
    </div>
  );
};

export default Contact;
