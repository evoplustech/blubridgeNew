import React, { useState } from 'react';
import { MapPin, Phone, Mail, Linkedin } from 'lucide-react';
import useDocumentTitle from '../hooks/useDocumentTitle';

const API_URL = process.env.REACT_APP_BACKEND_URL;

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

  useDocumentTitle('Contact | BluBridge');

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleVerifyEmail = () => {
    if (formData.email && formData.email.includes('@')) {
      setEmailVerified(true);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
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
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      padding: '0 12px',
                      backgroundColor: '#f5f5f4',
                      border: '1px solid #d4d4d4',
                      borderRight: 'none',
                      borderRadius: '8px 0 0 8px',
                      gap: '4px'
                    }}>
                      {/* <span style={{ fontSize: '16px' }}>🇮🇳</span> */}
                        <span style={{ fontSize: '14px' }}>IN</span>
                      <select
                        name="phoneCode"
                        value={formData.phoneCode}
                        onChange={handleInputChange}
                        style={{
                          backgroundColor: 'transparent',
                          border: 'none',
                          fontSize: '14px',
                          color: '#0B1F3B',
                          outline: 'none',
                          cursor: 'pointer',
                          padding: '12px 0'
                        }}
                      >
                        <option value="+91">+91</option>
                        <option value="+1">+1</option>
                        <option value="+44">+44</option>
                        <option value="+61">+61</option>
                        <option value="+49">+49</option>
                      </select>
                    </div>
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
