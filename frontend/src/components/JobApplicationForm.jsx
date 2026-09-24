import React, { useState, useRef, useEffect, forwardRef } from 'react';
import { Upload, X, Loader2, CheckCircle2, AlertCircle, Linkedin, FileText } from 'lucide-react';

const JobApplicationForm = forwardRef(({ jobTitle, onClose, isVisible }, ref) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    location: '',
    linkedInProfile: '',
    resume: null
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null); // 'success' | 'error' | null
  const [submitMessage, setSubmitMessage] = useState('');
  
  const fileInputRef = useRef(null);
  const API_URL = process.env.REACT_APP_BACKEND_URL || window.location.origin;

  // Validation functions
  const validateFirstName = (value) => {
    if (!value || value.trim().length < 2) {
      return 'First name must be at least 2 characters';
    }
    return '';
  };

  const validateLastName = (value) => {
    if (!value || value.trim().length < 2) {
      return 'Last name must be at least 2 characters';
    }
    return '';
  };

  const validateEmail = (value) => {
    if (!value) return 'Email is required';
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const validatePhone = (value) => {
    if (!value) return 'Phone number is required';
    const digits = value.replace(/\D/g, '');
    if (digits.length < 10 || digits.length > 15) {
      return 'Please enter a valid phone number (10-15 digits)';
    }
    return '';
  };

  const validateLocation = (value) => {
    if (!value || value.trim().length < 1) {
      return 'Location is required';
    }
    return '';
  };

  const validateResume = (file) => {
    if (!file) return 'Resume is required';
    
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    const allowedExtensions = ['.pdf', '.doc', '.docx'];
    const maxSize = 5 * 1024 * 1024; // 5MB
    
    const fileExtension = '.' + file.name.split('.').pop().toLowerCase();
    
    if (!allowedTypes.includes(file.type) && !allowedExtensions.includes(fileExtension)) {
      return 'Only PDF, DOC, and DOCX files are allowed';
    }
    
    if (file.size > maxSize) {
      return 'File size must be less than 5MB';
    }
    
    return '';
  };

  // Handle input changes with real-time validation
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Real-time validation if field has been touched
    if (touched[name]) {
      validateField(name, value);
    }
  };

  // Handle blur - mark field as touched and validate
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    validateField(name, value);
  };

  // Validate a single field
  const validateField = (name, value) => {
    let error = '';
    
    switch (name) {
      case 'firstName':
        error = validateFirstName(value);
        break;
      case 'lastName':
        error = validateLastName(value);
        break;
      case 'email':
        error = validateEmail(value);
        break;
      case 'phone':
        error = validatePhone(value);
        break;
      case 'location':
        error = validateLocation(value);
        break;
      default:
        break;
    }
    
    setErrors(prev => ({ ...prev, [name]: error }));
    return error;
  };

  // Handle file selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({ ...prev, resume: file }));
      setTouched(prev => ({ ...prev, resume: true }));
      const error = validateResume(file);
      setErrors(prev => ({ ...prev, resume: error }));
    }
  };

  // Remove selected file
  const handleRemoveFile = () => {
    setFormData(prev => ({ ...prev, resume: null }));
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    if (touched.resume) {
      setErrors(prev => ({ ...prev, resume: 'Resume is required' }));
    }
  };

  // Validate all fields
  const validateAll = () => {
    const newErrors = {
      firstName: validateFirstName(formData.firstName),
      lastName: validateLastName(formData.lastName),
      email: validateEmail(formData.email),
      phone: validatePhone(formData.phone),
      location: validateLocation(formData.location),
      resume: validateResume(formData.resume)
    };
    
    setErrors(newErrors);
    setTouched({
      firstName: true,
      lastName: true,
      email: true,
      phone: true,
      location: true,
      resume: true
    });
    
    return !Object.values(newErrors).some(error => error);
  };

  // Check if form is valid
  const isFormValid = () => {
    return (
      formData.firstName.trim().length >= 2 &&
      formData.lastName.trim().length >= 2 &&
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email) &&
      formData.phone.replace(/\D/g, '').length >= 10 &&
      formData.phone.replace(/\D/g, '').length <= 15 &&
      formData.location.trim().length >= 1 &&
      formData.resume !== null &&
      !validateResume(formData.resume)
    );
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Prevent double submission
    if (isSubmitting) {
      return;
    }
    
    if (!validateAll()) {
      return;
    }
    
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('firstName', formData.firstName.trim());
      formDataToSend.append('lastName', formData.lastName.trim());
      formDataToSend.append('email', formData.email.trim().toLowerCase());
      formDataToSend.append('phone', formData.phone.trim());
      formDataToSend.append('location', formData.location.trim());
      formDataToSend.append('jobTitle', jobTitle);
      formDataToSend.append('resume', formData.resume);
      
      if (formData.linkedInProfile.trim()) {
        formDataToSend.append('linkedInProfile', formData.linkedInProfile.trim());
      }
      
      const response = await fetch(`${API_URL}/api/job-applications/submit`, {
        method: 'POST',
        body: formDataToSend
      });
      
      // Clone the response so other listeners (analytics, etc.) can't lock the stream
      let data;
      try {
        data = await response.clone().json();
      } catch {
        try {
          const text = await response.clone().text();
          data = text ? { success: false, detail: text } : { success: false, detail: 'Server returned an invalid response' };
        } catch {
          data = { success: false, detail: 'Server returned an invalid response' };
        }
      }
      
      if (response.ok && data.success) {
        setSubmitStatus('success');
        setSubmitMessage('Application submitted successfully!');
        // Reset form after success
        setTimeout(() => {
          setFormData({
            firstName: '',
            lastName: '',
            email: '',
            phone: '',
            location: '',
            linkedInProfile: '',
            resume: null
          });
          setTouched({});
          setErrors({});
          if (fileInputRef.current) {
            fileInputRef.current.value = '';
          }
        }, 2000);
      } else if (response.status === 409) {
        // Duplicate submission
        setSubmitStatus('error');
        if (data.errors?.duplicate) {
          setSubmitMessage(data.errors.duplicate);
        } else {
          setSubmitMessage('You have already applied for this position recently. Please wait 24 hours before reapplying.');
        }
      } else {
        setSubmitStatus('error');
        if (data.errors) {
          setErrors(data.errors);
          setSubmitMessage('Please fix the errors below');
        } else {
          setSubmitMessage(data.detail || 'Failed to submit application. Please try again.');
        }
      }
    } catch (error) {
      console.error('Submission error:', error);
      setSubmitStatus('error');
      if (error.message && (error.message.includes('Failed to fetch') || error.message.includes('NetworkError'))) {
        setSubmitMessage('Network error. Please check your connection and try again.');
      } else {
        setSubmitMessage('An error occurred while submitting. Please try again.');
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  // Format file size
  const formatFileSize = (bytes) => {
    if (bytes < 1024) return bytes + ' B';
    if (bytes < 1024 * 1024) return (bytes / 1024).toFixed(1) + ' KB';
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  if (!isVisible) return null;

  return (
    <div 
      ref={ref}
      data-testid="job-application-form"
      className="job-application-form-container"
      style={{
        backgroundColor: '#ffffff',
        borderRadius: '20px',
        marginTop: '40px',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.08)',
        animation: 'slideInUp 0.5s ease-out',
        border: '1px solid #e5e7eb'
      }}
    >
      {/* Responsive Styles */}
      <style>{`
        .job-application-form-container {
          padding: 24px;
        }
        @media (min-width: 640px) {
          .job-application-form-container {
            padding: 48px;
          }
        }
        .form-row-grid {
          display: grid;
          grid-template-columns: 1fr;
          gap: 20px;
        }
        @media (min-width: 480px) {
          .form-row-grid {
            grid-template-columns: repeat(2, 1fr);
          }
        }
      `}</style>
      
      {/* Form Header */}
      <div style={{ 
        marginBottom: '32px',
        borderBottom: '2px solid #0B1F3B',
        paddingBottom: '20px'
      }}>
        <h2 style={{
          fontSize: '22px',
          fontWeight: '700',
          color: '#0B1F3B',
          marginBottom: '8px'
        }}>
          Apply for {jobTitle}
        </h2>
        <p style={{
          fontSize: '14px',
          color: '#6b7280'
        }}>
          Fill out the form below to submit your application. Fields marked with <span style={{ color: '#ef4444' }}>*</span> are required.
        </p>
      </div>

      {/* Success Message */}
      {submitStatus === 'success' && (
        <div 
          data-testid="success-message"
          style={{
            backgroundColor: '#ecfdf5',
            border: '1px solid #10b981',
            borderRadius: '12px',
            padding: '20px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <CheckCircle2 size={24} color="#10b981" />
          <div>
            <p style={{ fontSize: '16px', fontWeight: '600', color: '#065f46', marginBottom: '4px' }}>
              Application Submitted Successfully!
            </p>
            <p style={{ fontSize: '14px', color: '#047857' }}>
              Thank you for applying. We review your application and get back to you soon.
            </p>
          </div>
        </div>
      )}

      {/* Error Message */}
      {submitStatus === 'error' && submitMessage && (
        <div 
          data-testid="error-message"
          style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #ef4444',
            borderRadius: '12px',
            padding: '16px',
            marginBottom: '24px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}
        >
          <AlertCircle size={20} color="#ef4444" />
          <p style={{ fontSize: '14px', color: '#dc2626' }}>{submitMessage}</p>
        </div>
      )}

      <form onSubmit={handleSubmit}>
        {/* Name Row */}
        <div className="form-row-grid" style={{ marginBottom: '20px' }}>
          {/* First Name */}
          <div>
            <label 
              htmlFor="firstName"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}
            >
              First Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              data-testid="input-firstName"
              value={formData.firstName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your first name"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: `1px solid ${errors.firstName && touched.firstName ? '#ef4444' : '#d1d5db'}`,
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxSizing: 'border-box'
              }}
            />
            {errors.firstName && touched.firstName && (
              <p data-testid="error-firstName" style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                {errors.firstName}
              </p>
            )}
          </div>

          {/* Last Name */}
          <div>
            <label 
              htmlFor="lastName"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}
            >
              Last Name <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              data-testid="input-lastName"
              value={formData.lastName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Enter your last name"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: `1px solid ${errors.lastName && touched.lastName ? '#ef4444' : '#d1d5db'}`,
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxSizing: 'border-box'
              }}
            />
            {errors.lastName && touched.lastName && (
              <p data-testid="error-lastName" style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                {errors.lastName}
              </p>
            )}
          </div>
        </div>

        {/* Email and Phone Row */}
        <div className="form-row-grid" style={{ marginBottom: '20px' }}>
          {/* Email */}
          <div>
            <label 
              htmlFor="email"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}
            >
              Email <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="email"
              id="email"
              name="email"
              data-testid="input-email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="you@example.com"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: `1px solid ${errors.email && touched.email ? '#ef4444' : '#d1d5db'}`,
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxSizing: 'border-box'
              }}
            />
            {errors.email && touched.email && (
              <p data-testid="error-email" style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                {errors.email}
              </p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label 
              htmlFor="phone"
              style={{
                display: 'block',
                fontSize: '14px',
                fontWeight: '500',
                color: '#374151',
                marginBottom: '8px'
              }}
            >
              Phone <span style={{ color: '#ef4444' }}>*</span>
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              data-testid="input-phone"
              value={formData.phone}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="+91 98765 43210"
              style={{
                width: '100%',
                padding: '12px 16px',
                borderRadius: '10px',
                border: `1px solid ${errors.phone && touched.phone ? '#ef4444' : '#d1d5db'}`,
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxSizing: 'border-box'
              }}
            />
            {errors.phone && touched.phone && (
              <p data-testid="error-phone" style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
                {errors.phone}
              </p>
            )}
          </div>
        </div>

        {/* Location */}
        <div style={{ marginBottom: '20px' }}>
          <label 
            htmlFor="location"
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}
          >
            Location <span style={{ color: '#ef4444' }}>*</span>
          </label>
          <input
            type="text"
            id="location"
            name="location"
            data-testid="input-location"
            value={formData.location}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="City, State, Country"
            style={{
              width: '100%',
              padding: '12px 16px',
              borderRadius: '10px',
              border: `1px solid ${errors.location && touched.location ? '#ef4444' : '#d1d5db'}`,
              fontSize: '15px',
              outline: 'none',
              transition: 'border-color 0.2s, box-shadow 0.2s',
              boxSizing: 'border-box'
            }}
          />
          {errors.location && touched.location && (
            <p data-testid="error-location" style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
              {errors.location}
            </p>
          )}
        </div>

        {/* Resume Upload */}
        <div style={{ marginBottom: '20px' }}>
          <label 
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}
          >
            Resume/CV <span style={{ color: '#ef4444' }}>*</span>
          </label>
          
          {!formData.resume ? (
            <div
              data-testid="resume-dropzone"
              onClick={() => fileInputRef.current?.click()}
              style={{
                border: `2px dashed ${errors.resume && touched.resume ? '#ef4444' : '#d1d5db'}`,
                borderRadius: '12px',
                padding: '32px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'border-color 0.2s, background-color 0.2s',
                backgroundColor: '#fafafa'
              }}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = '#0B1F3B';
                e.currentTarget.style.backgroundColor = '#f0f9ff';
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = errors.resume && touched.resume ? '#ef4444' : '#d1d5db';
                e.currentTarget.style.backgroundColor = '#fafafa';
              }}
            >
              <Upload size={32} color="#6b7280" style={{ marginBottom: '12px' }} />
              <p style={{ fontSize: '15px', color: '#374151', marginBottom: '4px', fontWeight: '500' }}>
                Click to upload your resume
              </p>
              <p style={{ fontSize: '13px', color: '#9ca3af' }}>
                PDF, DOC, or DOCX (Max 5MB)
              </p>
            </div>
          ) : (
            <div
              data-testid="resume-preview"
              style={{
                border: '1px solid #d1d5db',
                borderRadius: '12px',
                padding: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                backgroundColor: '#f9fafb'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  backgroundColor: '#0B1F3B',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <FileText size={22} color="#ffffff" />
                </div>
                <div>
                  <p style={{ fontSize: '14px', fontWeight: '500', color: '#374151', marginBottom: '2px' }}>
                    {formData.resume.name}
                  </p>
                  <p style={{ fontSize: '12px', color: '#9ca3af' }}>
                    {formatFileSize(formData.resume.size)}
                  </p>
                </div>
              </div>
              <button
                type="button"
                data-testid="remove-resume-btn"
                onClick={handleRemoveFile}
                style={{
                  width: '32px',
                  height: '32px',
                  borderRadius: '8px',
                  border: 'none',
                  backgroundColor: '#fee2e2',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background-color 0.2s'
                }}
                onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#fecaca'}
                onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#fee2e2'}
              >
                <X size={18} color="#ef4444" />
              </button>
            </div>
          )}
          
          <input
            type="file"
            ref={fileInputRef}
            data-testid="input-resume"
            accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
          
          {errors.resume && touched.resume && (
            <p data-testid="error-resume" style={{ color: '#ef4444', fontSize: '13px', marginTop: '6px' }}>
              {errors.resume}
            </p>
          )}
        </div>

        {/* LinkedIn Profile (Optional) */}
        <div style={{ marginBottom: '32px' }}>
          <label 
            htmlFor="linkedInProfile"
            style={{
              display: 'block',
              fontSize: '14px',
              fontWeight: '500',
              color: '#374151',
              marginBottom: '8px'
            }}
          >
            LinkedIn Profile <span style={{ color: '#9ca3af', fontWeight: '400' }}>(Optional)</span>
          </label>
          <div style={{ position: 'relative' }}>
            <Linkedin 
              size={18} 
              color="#6b7280" 
              style={{ 
                position: 'absolute', 
                left: '14px', 
                top: '50%', 
                transform: 'translateY(-50%)' 
              }} 
            />
            <input
              type="url"
              id="linkedInProfile"
              name="linkedInProfile"
              data-testid="input-linkedIn"
              value={formData.linkedInProfile}
              onChange={handleChange}
              placeholder="https://linkedin.com/in/your-profile"
              style={{
                width: '100%',
                padding: '12px 16px 12px 44px',
                borderRadius: '10px',
                border: '1px solid #d1d5db',
                fontSize: '15px',
                outline: 'none',
                transition: 'border-color 0.2s, box-shadow 0.2s',
                boxSizing: 'border-box'
              }}
            />
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          data-testid="submit-application-btn"
          disabled={isSubmitting || !isFormValid()}
          style={{
            width: '100%',
            padding: '16px 24px',
            borderRadius: '12px',
            border: 'none',
            backgroundColor: isSubmitting || !isFormValid() ? '#9ca3af' : '#0B1F3B',
            color: '#ffffff',
            fontSize: '16px',
            fontWeight: '600',
            cursor: isSubmitting || !isFormValid() ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '10px',
            transition: 'background-color 0.2s, transform 0.2s'
          }}
          onMouseOver={(e) => {
            if (!isSubmitting && isFormValid()) {
              e.currentTarget.style.backgroundColor = '#162B4D';
              e.currentTarget.style.transform = 'translateY(-2px)';
            }
          }}
          onMouseOut={(e) => {
            if (!isSubmitting && isFormValid()) {
              e.currentTarget.style.backgroundColor = '#0B1F3B';
              e.currentTarget.style.transform = 'translateY(0)';
            }
          }}
        >
          {isSubmitting ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              Submitting...
            </>
          ) : (
            'Submit Application'
          )}
        </button>
      </form>

      {/* Animation styles */}
      <style>{`
        @keyframes slideInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .job-application-form-container input:focus {
          border-color: #0B1F3B;
          box-shadow: 0 0 0 3px rgba(11, 31, 59, 0.1);
        }
        
        .animate-spin {
          animation: spin 1s linear infinite;
        }
        
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
});

JobApplicationForm.displayName = 'JobApplicationForm';

export default JobApplicationForm;
