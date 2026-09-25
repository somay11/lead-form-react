import React, { useState } from 'react';
import FormInput from './FormInput';
import FormSelect from './FormSelect';
import FormTextarea from './FormTextarea';
import { User, Mail, Phone, Calendar, IndianRupee, Send, X, CheckCircle2 } from 'lucide-react';
import { indianStates } from '../data/indianStates';
import { citiesByState } from '../data/cities';
import { loanTypes } from '../data/loanTypes';
import './LoanApplicationForm.css';

const LoanApplicationForm = ({ onClose }) => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    dob: '',
    gender: '',
    state: '',
    city: '',
    pincode: '',
    loanType: '',
    amount: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [leadId, setLeadId] = useState('');

  const generateLeadId = () => {
    const date = new Date();
    const dateStr = date.toISOString().slice(0, 10).replace(/-/g, '');
    const random = Math.floor(100 + Math.random() * 900);
    return `LD${dateStr}${random}`;
  };

  const formatIndianNumber = (value) => {
    const num = parseInt(value.replace(/,/g, ''), 10);
    if (isNaN(num)) return value;
    return num.toLocaleString('en-IN');
  };

  const validateField = (name, value) => {
    switch (name) {
      case 'fullName':
        if (!value.trim()) return 'Full name is required';
        if (value.trim().length < 2) return 'Full name is required';
        return '';
      case 'email':
        if (!value.trim()) return 'Email address is required';
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(value.trim())) return 'Enter a valid email address';
        return '';
      case 'mobile':
        if (!value.trim()) return 'Mobile number is required';
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!mobileRegex.test(value.trim())) return 'Enter a valid 10-digit mobile number';
        return '';
      case 'dob':
        if (!value) return 'Date of birth is required';
        const birthDate = new Date(value);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        const m = today.getMonth() - birthDate.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
          age--;
        }
        if (age < 18) return 'You must be at least 18 years old';
        return '';
      case 'gender':
        if (!value) return 'Please select your gender';
        return '';
      case 'state':
        if (!value) return 'Please select your state';
        return '';
      case 'city':
        if (!value) return 'Please select your city';
        return '';
      case 'pincode':
        if (!value.trim()) return 'Pincode is required';
        const pincodeRegex = /^\d{6}$/;
        if (!pincodeRegex.test(value.trim())) return 'Enter a valid 6-digit pincode';
        return '';
      case 'loanType':
        if (!value) return 'Please select loan type';
        return '';
      case 'amount':
        if (!value) return 'Enter required loan amount';
        const numVal = parseFloat(value.replace(/,/g, ''));
        if (isNaN(numVal) || numVal <= 0) return 'Enter required loan amount';
        return '';
      case 'address':
        if (!value.trim()) return 'Address is required';
        return '';
      default:
        return '';
    }
  };

  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      newErrors[key] = validateField(key, formData[key]);
    });
    setErrors(newErrors);
    return Object.values(newErrors).every(error => error === '');
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;

    if (name === 'mobile' || name === 'pincode') {
      processedValue = value.replace(/\D/g, '').slice(0, name === 'mobile' ? 10 : 6);
    } else if (name === 'amount') {
      processedValue = value.replace(/\D/g, '');
    }

    setFormData(prev => ({ ...prev, [name]: processedValue }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }

    if (name === 'state') {
      setFormData(prev => ({ ...prev, city: '' }));
      setErrors(prev => ({ ...prev, city: '' }));
    }
  };

  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    
    if (name === 'amount' && value) {
      const formatted = formatIndianNumber(value);
      setFormData(prev => ({ ...prev, [name]: formatted }));
      const error = validateField(name, formatted.replace(/,/g, ''));
      setErrors(prev => ({ ...prev, [name]: error }));
    } else {
      const error = validateField(name, value);
      setErrors(prev => ({ ...prev, [name]: error }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const allTouched = {};
    Object.keys(formData).forEach(key => {
      allTouched[key] = true;
    });
    setTouched(allTouched);

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      const newLeadId = generateLeadId();
      setLeadId(newLeadId);
      
      const lead = {
        ...formData,
        leadId: newLeadId,
        submittedAt: new Date().toISOString()
      };

      console.log('New Loan Lead:', lead);
      
      localStorage.setItem('latestLoanLead', JSON.stringify(lead));
      
      const existingLeads = JSON.parse(localStorage.getItem('loanLeads') || '[]');
      existingLeads.push(lead);
      localStorage.setItem('loanLeads', JSON.stringify(existingLeads));

      setIsSuccess(true);
    } catch (error) {
      console.error('Submission error:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const availableCities = formData.state ? (citiesByState[formData.state] || []) : [];

  if (isSuccess) {
    return (
      <div className="form-card">
        <div className="success-container">
          <div className="success-icon">
            <CheckCircle2 size={48} strokeWidth={2} />
          </div>
          <h3 className="success-title">Application submitted successfully!</h3>
          <p className="success-message">
            Lead ID: <span className="lead-id">{leadId}</span>
          </p>
          {onClose && (
            <button type="button" className="success-close-btn" onClick={onClose}>
              Close
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="form-card">
      <div className="form-header">
        <div className="header-left">
          <h2 className="form-title">Apply Now</h2>
          <p className="form-subtitle">Fill in the details to apply loan</p>
        </div>
        {onClose && (
          <button type="button" className="close-btn" onClick={onClose} aria-label="Close">
            <X size={20} />
          </button>
        )}
      </div>
      
      <div className="form-divider" />
      
      <form onSubmit={handleSubmit} noValidate>
        <div className="form-grid">
          <div className="form-column">
            <FormInput
              label="Full Name"
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="John Doe"
              icon={User}
              error={touched.fullName ? errors.fullName : ''}
              required
            />
            
            <FormInput
              label="Mobile Number"
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="9876543210"
              icon={Phone}
              error={touched.mobile ? errors.mobile : ''}
              required
              maxLength={10}
              inputMode="numeric"
            />
            
            <FormSelect
              label="Gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              onBlur={handleBlur}
              options={['Male', 'Female', 'Other']}
              placeholder="Select Gender"
              error={touched.gender ? errors.gender : ''}
              required
            />
            
            <FormSelect
              label="City"
              name="city"
              value={formData.city}
              onChange={handleChange}
              onBlur={handleBlur}
              options={availableCities}
              placeholder={!formData.state ? 'Select State First' : 'Select City'}
              error={touched.city ? errors.city : ''}
              required
              disabled={!formData.state}
            />
            
            <FormSelect
              label="Loan Type"
              name="loanType"
              value={formData.loanType}
              onChange={handleChange}
              onBlur={handleBlur}
              options={loanTypes}
              placeholder="Select Loan Type"
              error={touched.loanType ? errors.loanType : ''}
              required
            />
            
            <FormTextarea
              label="Full Address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="House No., Street, Landmark..."
              error={touched.address ? errors.address : ''}
              required
              rows={3}
            />
          </div>
          
          <div className="form-column">
            <FormInput
              label="Email Address"
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="john@example.com"
              icon={Mail}
              error={touched.email ? errors.email : ''}
              required
            />
            
            <FormInput
              label="Date of Birth"
              type="date"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              onBlur={handleBlur}
              icon={Calendar}
              error={touched.dob ? errors.dob : ''}
              required
            />
            
            <FormSelect
              label="State"
              name="state"
              value={formData.state}
              onChange={handleChange}
              onBlur={handleBlur}
              options={indianStates}
              placeholder="Select State"
              error={touched.state ? errors.state : ''}
              required
            />
            
            <FormInput
              label="Pincode"
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="302001"
              error={touched.pincode ? errors.pincode : ''}
              required
              maxLength={6}
              inputMode="numeric"
            />
            
            <FormInput
              label="Required Amount (₹)"
              type="text"
              name="amount"
              value={formData.amount}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="e.g. 50000"
              icon={IndianRupee}
              error={touched.amount ? errors.amount : ''}
              required
              inputMode="numeric"
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className={`submit-btn ${isSubmitting ? 'submitting' : ''}`}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <span className="btn-spinner" />
          ) : (
            <>
              <Send size={16} />
              <span>Submit Application</span>
            </>
          )}
        </button>
      </form>
    </div>
  );
};

export default LoanApplicationForm;
