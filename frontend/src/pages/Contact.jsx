import React, { useState } from 'react';
import { MapPin, Phone, Mail, Linkedin } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

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

  useDocumentTitle('Contact | BluBridge');

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
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          phone: `${formData.phoneCode} ${formData.phoneNumber}`,
          enquiryCategory: formData.inquiryType,
          message: formData.message
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
            <h2 style={{ 
              fontSize: '28px', 
              fontWeight: '700', 
              color: '#0B1F3B',
              marginBottom: '28px',
              textAlign: 'center',
              letterSpacing: '-0.02em'
            }}>
              Contact Us
            </h2>
            
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
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d4d4d4',
                      borderRadius: '8px',
                      backgroundColor: '#fffdf7',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
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
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d4d4d4',
                      borderRadius: '8px',
                      backgroundColor: '#fffdf7',
                      fontSize: '14px',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
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
                    required
                    style={{
                      flex: 1,
                      padding: '12px 16px',
                      border: '1px solid #d4d4d4',
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
                        border: '1px solid #d4d4d4',
                        borderRight: 'none',
                        borderRadius: '8px 0 0 8px',
                        fontSize: '14px',
                        color: '#0B1F3B',
                        outline: 'none',
                        cursor: 'pointer',
                        minWidth: '80px'
                      }}
                    >
                      <option value="+1">+1</option>
                      <option value="+7">+7</option>
                      <option value="+20">+20</option>
                      <option value="+27">+27</option>
                      <option value="+30">+30</option>
                      <option value="+31">+31</option>
                      <option value="+32">+32</option>
                      <option value="+33">+33</option>
                      <option value="+34">+34</option>
                      <option value="+36">+36</option>
                      <option value="+39">+39</option>
                      <option value="+40">+40</option>
                      <option value="+41">+41</option>
                      <option value="+43">+43</option>
                      <option value="+44">+44</option>
                      <option value="+45">+45</option>
                      <option value="+46">+46</option>
                      <option value="+47">+47</option>
                      <option value="+48">+48</option>
                      <option value="+49">+49</option>
                      <option value="+51">+51</option>
                      <option value="+52">+52</option>
                      <option value="+53">+53</option>
                      <option value="+54">+54</option>
                      <option value="+55">+55</option>
                      <option value="+56">+56</option>
                      <option value="+57">+57</option>
                      <option value="+58">+58</option>
                      <option value="+60">+60</option>
                      <option value="+61">+61</option>
                      <option value="+62">+62</option>
                      <option value="+63">+63</option>
                      <option value="+64">+64</option>
                      <option value="+65">+65</option>
                      <option value="+66">+66</option>
                      <option value="+81">+81</option>
                      <option value="+82">+82</option>
                      <option value="+84">+84</option>
                      <option value="+86">+86</option>
                      <option value="+90">+90</option>
                      <option value="+91">+91</option>
                      <option value="+92">+92</option>
                      <option value="+93">+93</option>
                      <option value="+94">+94</option>
                      <option value="+95">+95</option>
                      <option value="+98">+98</option>
                      <option value="+211">+211</option>
                      <option value="+212">+212</option>
                      <option value="+213">+213</option>
                      <option value="+216">+216</option>
                      <option value="+218">+218</option>
                      <option value="+220">+220</option>
                      <option value="+221">+221</option>
                      <option value="+222">+222</option>
                      <option value="+223">+223</option>
                      <option value="+224">+224</option>
                      <option value="+225">+225</option>
                      <option value="+226">+226</option>
                      <option value="+227">+227</option>
                      <option value="+228">+228</option>
                      <option value="+229">+229</option>
                      <option value="+230">+230</option>
                      <option value="+231">+231</option>
                      <option value="+232">+232</option>
                      <option value="+233">+233</option>
                      <option value="+234">+234</option>
                      <option value="+235">+235</option>
                      <option value="+236">+236</option>
                      <option value="+237">+237</option>
                      <option value="+238">+238</option>
                      <option value="+239">+239</option>
                      <option value="+240">+240</option>
                      <option value="+241">+241</option>
                      <option value="+242">+242</option>
                      <option value="+243">+243</option>
                      <option value="+244">+244</option>
                      <option value="+245">+245</option>
                      <option value="+246">+246</option>
                      <option value="+247">+247</option>
                      <option value="+248">+248</option>
                      <option value="+249">+249</option>
                      <option value="+250">+250</option>
                      <option value="+251">+251</option>
                      <option value="+252">+252</option>
                      <option value="+253">+253</option>
                      <option value="+254">+254</option>
                      <option value="+255">+255</option>
                      <option value="+256">+256</option>
                      <option value="+257">+257</option>
                      <option value="+258">+258</option>
                      <option value="+260">+260</option>
                      <option value="+261">+261</option>
                      <option value="+262">+262</option>
                      <option value="+263">+263</option>
                      <option value="+264">+264</option>
                      <option value="+265">+265</option>
                      <option value="+266">+266</option>
                      <option value="+267">+267</option>
                      <option value="+268">+268</option>
                      <option value="+269">+269</option>
                      <option value="+290">+290</option>
                      <option value="+291">+291</option>
                      <option value="+297">+297</option>
                      <option value="+298">+298</option>
                      <option value="+299">+299</option>
                      <option value="+350">+350</option>
                      <option value="+351">+351</option>
                      <option value="+352">+352</option>
                      <option value="+353">+353</option>
                      <option value="+354">+354</option>
                      <option value="+355">+355</option>
                      <option value="+356">+356</option>
                      <option value="+357">+357</option>
                      <option value="+358">+358</option>
                      <option value="+359">+359</option>
                      <option value="+370">+370</option>
                      <option value="+371">+371</option>
                      <option value="+372">+372</option>
                      <option value="+373">+373</option>
                      <option value="+374">+374</option>
                      <option value="+375">+375</option>
                      <option value="+376">+376</option>
                      <option value="+377">+377</option>
                      <option value="+378">+378</option>
                      <option value="+380">+380</option>
                      <option value="+381">+381</option>
                      <option value="+382">+382</option>
                      <option value="+383">+383</option>
                      <option value="+385">+385</option>
                      <option value="+386">+386</option>
                      <option value="+387">+387</option>
                      <option value="+389">+389</option>
                      <option value="+420">+420</option>
                      <option value="+421">+421</option>
                      <option value="+423">+423</option>
                      <option value="+500">+500</option>
                      <option value="+501">+501</option>
                      <option value="+502">+502</option>
                      <option value="+503">+503</option>
                      <option value="+504">+504</option>
                      <option value="+505">+505</option>
                      <option value="+506">+506</option>
                      <option value="+507">+507</option>
                      <option value="+508">+508</option>
                      <option value="+509">+509</option>
                      <option value="+590">+590</option>
                      <option value="+591">+591</option>
                      <option value="+592">+592</option>
                      <option value="+593">+593</option>
                      <option value="+594">+594</option>
                      <option value="+595">+595</option>
                      <option value="+596">+596</option>
                      <option value="+597">+597</option>
                      <option value="+598">+598</option>
                      <option value="+599">+599</option>
                      <option value="+670">+670</option>
                      <option value="+672">+672</option>
                      <option value="+673">+673</option>
                      <option value="+674">+674</option>
                      <option value="+675">+675</option>
                      <option value="+676">+676</option>
                      <option value="+677">+677</option>
                      <option value="+678">+678</option>
                      <option value="+679">+679</option>
                      <option value="+680">+680</option>
                      <option value="+681">+681</option>
                      <option value="+682">+682</option>
                      <option value="+683">+683</option>
                      <option value="+685">+685</option>
                      <option value="+686">+686</option>
                      <option value="+687">+687</option>
                      <option value="+688">+688</option>
                      <option value="+689">+689</option>
                      <option value="+690">+690</option>
                      <option value="+691">+691</option>
                      <option value="+692">+692</option>
                      <option value="+850">+850</option>
                      <option value="+852">+852</option>
                      <option value="+853">+853</option>
                      <option value="+855">+855</option>
                      <option value="+856">+856</option>
                      <option value="+880">+880</option>
                      <option value="+886">+886</option>
                      <option value="+960">+960</option>
                      <option value="+961">+961</option>
                      <option value="+962">+962</option>
                      <option value="+963">+963</option>
                      <option value="+964">+964</option>
                      <option value="+965">+965</option>
                      <option value="+966">+966</option>
                      <option value="+967">+967</option>
                      <option value="+968">+968</option>
                      <option value="+970">+970</option>
                      <option value="+971">+971</option>
                      <option value="+972">+972</option>
                      <option value="+973">+973</option>
                      <option value="+974">+974</option>
                      <option value="+975">+975</option>
                      <option value="+976">+976</option>
                      <option value="+977">+977</option>
                      <option value="+992">+992</option>
                      <option value="+993">+993</option>
                      <option value="+994">+994</option>
                      <option value="+995">+995</option>
                      <option value="+996">+996</option>
                      <option value="+998">+998</option>
                    </select>
                    <input
                      type="tel"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleInputChange}
                      required
                      style={{
                        flex: 1,
                        padding: '12px 16px',
                        border: '1px solid #d4d4d4',
                        borderRadius: '0 8px 8px 0',
                        backgroundColor: '#fffdf7',
                        fontSize: '14px',
                        outline: 'none'
                      }}
                    />
                  </div>
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
                    required
                    style={{
                      width: '100%',
                      padding: '12px 16px',
                      border: '1px solid #d4d4d4',
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
                  required
                  rows={11}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    border: '1px solid #d4d4d4',
                    borderRadius: '8px',
                    backgroundColor: '#fffdf7',
                    fontSize: '14px',
                    outline: 'none',
                    resize: 'none',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

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
