import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';

const FormContainer = styled(motion.section)`
  background: var(--bg-secondary);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  border-radius: 1.5rem;
  padding: 2.5rem;
  box-shadow: var(--shadow-md);
  border: 1px solid var(--border-color);
  max-width: 600px;
  margin: 0 auto;

  @media (max-width: 768px) {
    padding: 2rem 1.5rem;
    border-radius: 1rem;
  }
`;

const FormTitle = styled.h2`
  font-size: 2rem;
  font-weight: 700;
  color: var(--text-primary);
  margin-bottom: 0.5rem;
  background: var(--accent-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;

  @media (max-width: 768px) {
    font-size: 1.5rem;
  }
`;

const FormSubtitle = styled.p`
  color: var(--text-secondary);
  margin-bottom: 2rem;
  font-size: 1rem;
  line-height: 1.6;

  @media (max-width: 768px) {
    font-size: 0.95rem;
    margin-bottom: 1.5rem;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  color: var(--text-primary);
  font-weight: 600;
  font-size: 0.95rem;
  
  ${props => props.$optional && `
    &::after {
      content: ' (optional)';
      font-weight: 400;
      color: var(--text-tertiary);
      font-size: 0.85rem;
    }
  `}
`;

const Input = styled.input`
  padding: 0.9rem 1.2rem;
  border: 2px solid var(--border-color);
  border-radius: 0.75rem;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-size: 1rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px var(--accent-light);
    background: var(--bg-secondary);
  }

  &::placeholder {
    color: var(--text-tertiary);
  }

  &:invalid:not(:placeholder-shown) {
    border-color: #e74c3c;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    font-size: 0.95rem;
  }
`;

const TextArea = styled.textarea`
  padding: 0.9rem 1.2rem;
  border: 2px solid var(--border-color);
  border-radius: 0.75rem;
  background: var(--bg-tertiary);
  color: var(--text-primary);
  font-size: 1rem;
  min-height: 150px;
  resize: vertical;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-family: inherit;

  &:focus {
    outline: none;
    border-color: var(--accent-primary);
    box-shadow: 0 0 0 3px var(--accent-light);
    background: var(--bg-secondary);
  }

  &::placeholder {
    color: var(--text-tertiary);
  }

  &:invalid:not(:placeholder-shown) {
    border-color: #e74c3c;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1rem;
    font-size: 0.95rem;
    min-height: 120px;
  }
`;

const ErrorMessage = styled(motion.div)`
  color: #e74c3c;
  font-size: 0.85rem;
  margin-top: 0.25rem;
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const SubmitButton = styled(motion.button)`
  padding: 1rem 2rem;
  background: var(--accent-gradient);
  color: white;
  border: none;
  border-radius: 0.75rem;
  font-size: 1.05rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: var(--shadow-glow);
  position: relative;
  overflow: hidden;
  margin-top: 0.5rem;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: -100%;
    width: 100%;
    height: 100%;
    background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.3), transparent);
    transition: left 0.5s ease;
  }

  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(39, 174, 96, 0.4);
    background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
  }

  &:hover:not(:disabled)::before {
    left: 100%;
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }

  @media (max-width: 768px) {
    padding: 0.9rem 1.5rem;
    font-size: 1rem;
  }
`;

const SuccessMessage = styled(motion.div)`
  background: var(--accent-light);
  border: 2px solid var(--accent-primary);
  border-radius: 0.75rem;
  padding: 1.5rem;
  color: var(--accent-primary);
  text-align: center;
  margin-top: 1rem;

  h3 {
    margin: 0 0 0.5rem;
    font-size: 1.2rem;
    font-weight: 700;
  }

  p {
    margin: 0;
    font-size: 0.95rem;
    line-height: 1.6;
  }
`;

const LoadingSpinner = styled.div`
  display: inline-block;
  width: 16px;
  height: 16px;
  border: 2px solid rgba(255, 255, 255, 0.3);
  border-top-color: white;
  border-radius: 50%;
  animation: spin 0.6s linear infinite;
  margin-right: 0.5rem;

  @keyframes spin {
    to { transform: rotate(360deg); }
  }
`;

function FeedbackForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const validateEmail = (email) => {
    if (!email) return true; // Email is optional
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    // Message is required
    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    } else if (formData.message.trim().length < 10) {
      newErrors.message = 'Message must be at least 10 characters';
    }

    // Email validation (if provided)
    if (formData.email && !validateEmail(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Log feedback data to console
    const feedbackData = {
      name: formData.name || 'Anonymous',
      email: formData.email || 'Not provided',
      message: formData.message,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    };

    console.log('Feedback submitted:', feedbackData);

    // TODO: In the future, this can be connected to:
    // - Email service (SendGrid, Mailgun, etc.)
    // - Google Forms API
    // - Backend API endpoint
    // - Webhook service

    setIsSubmitting(false);
    setIsSuccess(true);
    
    // Reset form after success
    setFormData({
      name: '',
      email: '',
      message: ''
    });

    // Hide success message after 5 seconds
    setTimeout(() => {
      setIsSuccess(false);
    }, 5000);
  };

  return (
    <FormContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
    >
      <FormTitle>Share Your Feedback</FormTitle>
      <FormSubtitle>
        We'd love to hear your thoughts, suggestions, or questions about Ayush Aura. 
        Your feedback helps us improve the platform.
      </FormSubtitle>

      <AnimatePresence mode="wait">
        {isSuccess ? (
          <SuccessMessage
            key="success"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <h3>✓ Thank You!</h3>
            <p>Your feedback has been received. We appreciate you taking the time to share your thoughts with us.</p>
          </SuccessMessage>
        ) : (
          <Form
            key="form"
            onSubmit={handleSubmit}
            noValidate
          >
            <FormGroup>
              <Label htmlFor="name" $optional>
                Name
              </Label>
              <Input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your name"
                aria-label="Your name (optional)"
              />
            </FormGroup>

            <FormGroup>
              <Label htmlFor="email" $optional>
                Email
              </Label>
              <Input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your.email@example.com"
                aria-label="Your email (optional)"
                aria-invalid={errors.email ? 'true' : 'false'}
              />
              <AnimatePresence>
                {errors.email && (
                  <ErrorMessage
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <span>⚠</span> {errors.email}
                  </ErrorMessage>
                )}
              </AnimatePresence>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="message">
                Message
              </Label>
              <TextArea
                id="message"
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your thoughts, suggestions, or questions..."
                required
                aria-label="Your message (required)"
                aria-invalid={errors.message ? 'true' : 'false'}
                aria-describedby={errors.message ? 'message-error' : undefined}
              />
              <AnimatePresence>
                {errors.message && (
                  <ErrorMessage
                    id="message-error"
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                  >
                    <span>⚠</span> {errors.message}
                  </ErrorMessage>
                )}
              </AnimatePresence>
            </FormGroup>

            <SubmitButton
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: isSubmitting ? 1 : 1.02 }}
              whileTap={{ scale: isSubmitting ? 1 : 0.98 }}
            >
              {isSubmitting ? (
                <>
                  <LoadingSpinner />
                  Sending...
                </>
              ) : (
                'Send Feedback'
              )}
            </SubmitButton>
          </Form>
        )}
      </AnimatePresence>
    </FormContainer>
  );
}

export default FeedbackForm;
