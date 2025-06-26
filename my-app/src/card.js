// MUI version of CardCreationWizard (maintaining layout and functionality)
// Replaced missing ThemeSelector import and updated icons source

import React, { useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Typography,
  TextField,
  Grid
} from '@mui/material';
import ArrowLeft from '@mui/icons-material/ArrowBack';
import ArrowRight from '@mui/icons-material/ArrowForward';
import Check from '@mui/icons-material/Check';
import Upload from '@mui/icons-material/CloudUpload';
import Copy from '@mui/icons-material/ContentCopy';
import ExternalLink from '@mui/icons-material/OpenInNew';
import axios from 'axios';
const DummyThemeSelector = ({ selectedTheme, onThemeSelect }) => (
  <Box>
    <Typography variant="body2">[Theme selector placeholder]</Typography>
  </Box>
);

const useToast = () => ({
  toast: ({ title, description }) => alert(`${title}\n${description}`),
});

const CardCreationWizard = ({ onClose }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [cardCreated, setCardCreated] = useState(false);
  const [cardUrl, setCardUrl] = useState('');
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    companyName: '',
    selectedTheme: 1,
    firstName: '',
    lastName: '',
    position: '',
    phone: '',
    whatsapp: '',
    email: '',
    website: '',
    about: '',
    facebook: '',
    twitter: '',
    instagram: '',
    linkedin: '',
    youtube: '',
    pinterest: '',
    paytm: '',
    googlepay: '',
    phonepe: '',
    bankName: '',
    accountHolder: '',
    accountNumber: '',
    ifsc: '',
    established_date: '',
    products: Array(10).fill({ name: '', image: null }),
    gallery: Array(10).fill(null),
    videos: Array(5).fill('')
  });
  const { toast } = useToast();

  const steps = [
    'Company Name',
    'Select Template',
    'Company Details',
    'Social Links',
    'Payment Options',
    'Products & Services',
    'Preview Card'
  ];
  const API_BASE_URL = "http://localhost:5000/api/auth";


  const generateCardUrl = (companyName) => {
    const sanitized = companyName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
    return `ncsdigitalcard.com/${sanitized}`;
  };

  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  const validateStep = () => {
  const newErrors = {};

  if (currentStep === 1 && !formData.companyName.trim()) {
    newErrors.companyName = 'Company name is required';
  }

  if (currentStep === 3) {
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    if (!formData.about.trim()) newErrors.about = 'About is required';
    if (!formData.established_date) newErrors.established_date = 'Date is required';
  }

  if (currentStep === 5) {
    if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
    if (!formData.accountHolder.trim()) newErrors.accountHolder = 'Account holder is required';
    if (!formData.accountNumber.trim()) newErrors.accountNumber = 'Account number is required';
    if (!formData.ifsc.trim()) newErrors.ifsc = 'IFSC is required';
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
const handleSubmit = async () => {
  if (!validateStep()) return;

  const url = generateCardUrl(formData.companyName);

  // ✅ Get user_id from localStorage
  const user = JSON.parse(localStorage.getItem("user"));
  const user_id =  user?.id; // depends on how you named it in your backend

  if (!user_id) {
    toast({ title: "Error", description: "User not logged in." });
    return;
  }

  const cardPayload = {
    ...formData,
    user_id, // ✅ attach user_id to the request
    name: `${formData.firstName} ${formData.lastName}`,
    url_slug: url,
  };

  try {
    const response = await axios.post(`${API_BASE_URL}/create-card`, cardPayload);

    if (response.data.success) {
      setCardCreated(true);
      setCardUrl(url);
      toast({
        title: 'Card Created Successfully!',
        description: `Your card is live at ${url}`,
      });
    } else {
      toast({
        title: 'Error',
        description: response.data.error || 'Something went wrong',
      });
    }
  } catch (err) {
    
    console.error('Axios error:', err);
    toast({
      title: 'Error',
      description: err.response?.data?.error || 'Network or server error',
    });
  }
};



  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <TextField
            fullWidth
            label="Company Name"
            value={formData.companyName}
            onChange={(e) => handleChange('companyName', e.target.value)}
            helperText={`URL will be: ${generateCardUrl(formData.companyName)}`}
          />
        );
      case 2:
        return <DummyThemeSelector selectedTheme={formData.selectedTheme} onThemeSelect={(t) => handleChange('selectedTheme', t)} />;
      case 3:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}><TextField label="First Name" fullWidth required value={formData.firstName} onChange={(e) => handleChange('firstName', e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="Last Name (Optional)" fullWidth value={formData.lastName} onChange={(e) => handleChange('lastName', e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="Position" fullWidth required value={formData.position} onChange={(e) => handleChange('position', e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="Phone" fullWidth required value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="WhatsApp (Optional)" fullWidth value={formData.whatsapp} onChange={(e) => handleChange('whatsapp', e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="Email" fullWidth required value={formData.email} onChange={(e) => handleChange('email', e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="Website (Optional)" fullWidth value={formData.website} onChange={(e) => handleChange('website', e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="About Us" fullWidth required multiline minRows={3} value={formData.about} onChange={(e) => handleChange('about', e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="Established Date" type="date" InputLabelProps={{ shrink: true }} fullWidth required value={formData.established_date} onChange={(e) => handleChange('established_date', e.target.value)} /></Grid>
          </Grid>
        );
      case 4:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}><TextField label="Facebook (Optional)" fullWidth value={formData.facebook} onChange={(e) => handleChange('facebook', e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="Instagram (Optional)" fullWidth value={formData.instagram} onChange={(e) => handleChange('instagram', e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="YouTube (Optional)" fullWidth value={formData.youtube} onChange={(e) => handleChange('youtube', e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="Google Map Link (Optional)" fullWidth value={formData.googleMap} onChange={(e) => handleChange('googleMap', e.target.value)} /></Grid>
          </Grid>
        );
      case 5:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}><TextField label="Bank Name" fullWidth required value={formData.bankName} onChange={(e) => handleChange('bankName', e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="Account Holder" fullWidth required value={formData.accountHolder} onChange={(e) => handleChange('accountHolder', e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="Account Number" fullWidth required value={formData.accountNumber} onChange={(e) => handleChange('accountNumber', e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="IFSC" fullWidth required value={formData.ifsc} onChange={(e) => handleChange('ifsc', e.target.value)} /></Grid>
            <Grid item xs={12}><TextField label="GPay (Optional)" fullWidth value={formData.googlepay} onChange={(e) => handleChange('googlepay', e.target.value)} /></Grid>
          </Grid>
        );
      case 6:
        return (
          <>
            <Typography align="center" mb={2} color="error">(Upload images within 250 KB each image)</Typography>
            <Grid container spacing={2}>
              {Array.from({ length: 10 }).map((_, i) => (
                <Grid item xs={12} sm={6} md={4} lg={3} key={i}>
                  <Card sx={{ p: 2, textAlign: 'center', borderRadius: 2, boxShadow: 3 }}>
                    <Typography variant="subtitle2" sx={{ bgcolor: '#9c27b0', color: 'white', py: 0.5, borderRadius: 1 }}>{i + 1}</Typography>
                    <Typography variant="subtitle2" gutterBottom color="green">{`${i + 1}${['st','nd','rd'][((i+1)%10)-1] || 'th'} Product & Service`}</Typography>
                    <TextField
                      fullWidth
                      placeholder="Product/Service"
                      value={formData.products[i]?.name || ''}
                      onChange={(e) => {
                        const updated = [...formData.products];
                        updated[i] = { ...updated[i], name: e.target.value };
                        handleChange('products', updated);
                      }}
                      size="small"
                      sx={{ mb: 1 }}
                    />
                    <Box
                      component="label"
                      htmlFor={`product-image-${i}`}
                      sx={{
                        border: '2px dashed #ccc',
                        borderRadius: '8px',
                        padding: 1,
                        display: 'block',
                        cursor: 'pointer',
                        mb: 1
                      }}
                    >
                      <Upload sx={{ fontSize: 30, color: '#9c27b0' }} />
                    </Box>
                    <input
                      type="file"
                      id={`product-image-${i}`}
                      accept="image/*"
                      style={{ display: 'none' }}
                      onChange={(e) => {
                        const file = e.target.files[0];
                        const updated = [...formData.products];
                        updated[i] = { ...updated[i], image: file };
                        handleChange('products', updated);
                      }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        );
      case 7:
        return (
          <Box textAlign="center">
            <Typography variant="h6">Preview</Typography>
            <Box mt={2} p={2} borderRadius={2} bgcolor="#e3f2fd">
              <Typography variant="h5">{formData.companyName || 'Company Name'}</Typography>
              <Typography>{formData.firstName} {formData.lastName}</Typography>
              <Typography>{formData.position}</Typography>
              <Typography>{formData.phone}</Typography>
              <Typography>{formData.email}</Typography>
            </Box>
          </Box>
        );
      default:
        return null;
    }
  };

  if (cardCreated) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <Card sx={{ maxWidth: 500, textAlign: 'center' }}>
          <CardHeader title="🎉 Card Created Successfully!" />
          <CardContent>
            <Typography gutterBottom>Card URL:</Typography>
            <Typography variant="body2" color="primary" sx={{ wordBreak: 'break-word' }}>{cardUrl}</Typography>
            <Box mt={2} display="flex" justifyContent="space-between">
              <Button startIcon={<Copy />} onClick={() => navigator.clipboard.writeText(`https://${cardUrl}`)}>
                Copy URL
              </Button>
              <Button startIcon={<ExternalLink />} onClick={() => window.open(`/card/${generateCardUrl(formData.companyName)}`, '_blank')}>
                View Card
              </Button>
            </Box>
            <Button fullWidth sx={{ mt: 2 }} onClick={onClose}>Back to Dashboard</Button>
          </CardContent>
        </Card>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: '100vh', bgcolor: '#f0f0f0', py: 4 }}>
      <Box sx={{ maxWidth: '960px', mx: 'auto' }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Button variant="outlined" startIcon={<ArrowLeft />} onClick={onClose}>Back</Button>
          {currentStep < steps.length && <Button variant="contained">Skip →</Button>}
        </Box>

        <Box display="flex" justifyContent="center" mb={3}>
          {steps.map((step, idx) => (
            <Box
              key={idx}
              sx={{
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: idx + 1 === currentStep ? 'primary.main' : idx + 1 < currentStep ? 'grey.400' : 'grey.200',
                color: idx + 1 <= currentStep ? 'white' : 'text.primary',
                mx: 0.5
              }}
            >
              <Typography variant="body2">{step}</Typography>
            </Box>
          ))}
        </Box>

        <Card>
          <CardHeader title={steps[currentStep - 1]} />
          <CardContent>
            {renderStep()}
            <Box mt={4} display="flex" justifyContent="center" gap={2}>
              {currentStep > 1 && (
                <Button variant="outlined" startIcon={<ArrowLeft />} onClick={() => setCurrentStep(currentStep - 1)}>
                  Previous
                </Button>
              )}
              {currentStep < steps.length ? (
             <Button variant="contained" endIcon={<ArrowRight />} onClick={() => {
  if (validateStep()) setCurrentStep(currentStep + 1);
}}>
  Submit & Next
</Button>
              ) : (
                <Button variant="contained" color="success" endIcon={<Check />} onClick={handleSubmit}>
                  Create Card
                </Button>
              )}
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default CardCreationWizard;
