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
import { useNavigate } from 'react-router-dom';
import Template1 from './assests/template1.png';
import Template2 from './assests/template2.png';
import Template3 from './assests/template3.png';
import { useParams } from 'react-router-dom';
import { useEffect} from 'react';

const useToast = () => ({
  toast: ({ title, description }) => alert(`${title}\n${description}`),
});


const CardCreationWizard = ({ onClose }) => {
  const navigate = useNavigate();
const { url_slug } = useParams();
const isEdit = !!url_slug;   
  const [currentStep, setCurrentStep] = useState(1);
  const [cardCreated, setCardCreated] = useState(false);
  const [cardUrl, setCardUrl] = useState('');
  const [checkingName, setCheckingName] = useState(false);
  const [errors, setErrors] = useState({});
  const [formData, setFormData] = useState({
    companyName: '',
    selectedTheme: 1,
      templateType: 'Basic',     // Add this line
  templatePrice: 2000,       // Add this line

    firstName: '',
    lastName: '',
    position: '',
    phone: '',
    logo: null,
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
    address: '',
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
useEffect(() => {
  if (cardCreated && cardUrl) {
    // Wait for a second and then redirect to the card page
    const timeout = setTimeout(() => {
      navigate(`/card/${cardUrl}`);
    }, 2000); // or reduce/increase timing as needed

    return () => clearTimeout(timeout);
  }
}, [cardCreated, cardUrl]);

  const steps = [
    'Company Name',
    'Select Template',
    'Company Details',
    'Social Links',
    'youtube videos',
    'Payment Options',
    'Products & Services',
    'Preview Card'
  ];
  const API_BASE_URL = "http://localhost:5000/api/auth";
  const token = localStorage.getItem("token");




 const generateCardUrl = (companyName) => {
  if (!companyName) return ''; // or a fallback value like 'default-url'

  const sanitized = companyName.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/g, '');
  return `${sanitized}`;
};

useEffect(() => {
  const fetchCardForEdit = async () => {
    if (!url_slug) return; // Not in edit mode

    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(`${API_BASE_URL}/card/${url_slug}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const card = response.data.card;

      setFormData({
        companyName: card.company_name || '',
        logo: card.logo || '',
        selectedTheme: card.theme_id || '',
        firstName: card.name?.split(' ')[0] || '',
        lastName: card.name?.split(' ')[1] || '',
        position: card.position || '',
        phone: card.phone_number || '',
        whatsapp: card.alternate_phone_number || '',
        email: card.email || '',
        website: card.website || '',
        about: card.about_us || '',
        facebook: card.facebook_link || '',
        twitter: card.twitter_link || '',
        instagram: card.instagram_link || '',
        linkedin: card.linkedin_link || '',
        youtube: card.youtube_link || '',
        pinterest: card.pinterest_link || '',
        paytm: card.paytm_number || '',
        googlepay: card.gpay || '',
        phonepe: card.phonepay || '',
        bankName: card.bank_name || '',
        accountHolder: card.account_holder_name || '',
        accountNumber: card.account_number || '',
        ifsc: card.ifsc || '',
        established_date: card.established_date || '',
        address: card.address || '',
        location: card.location || '',
        gst: card.gst || '',
        googleMap: card.google_map || '',
        videos: [
          card.link1 || '',
          card.link2 || '',
          card.link3 || '',
          card.link4 || '',
          card.link5 || '',
        ],
        products: [
          {
            image: card.product1_img || null,
            name: card.product1_name || '',
          },
          {
            image: card.product2_img || null,
            name: card.product2_name || '',
          },
          {
            image: card.product3_img || null,
            name: card.product3_name || '',
          },
          {
            image: card.product4_img || null,
            name: card.product4_name || '',
          },
          {
            image: card.product5_img || null,
            name: card.product5_name || '',
          },
           {
            image: card.product6_img || null,
            name: card.product6_name || '',
          }, {
            image: card.product7_img || null,
            name: card.product7_name || '',
          }, {
            image: card.product8_img || null,
            name: card.product8_name || '',
          }, {
            image: card.product9_img || null,
            name: card.product9_name || '',
          }, {
            image: card.product10_img || null,
            name: card.product10_name || '',
          },
        ],
      });

    } catch (err) {
      console.error("Error fetching card for edit:", err);
    }
  };

  fetchCardForEdit();
}, [url_slug]);


  const handleChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const checkCompanyNameExists = async (name) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/check-company-name/${name}`);
    return response.data.exists; // true or false
  } catch (err) {
    console.error('Company name check error:', err);
    return false;
  }
};
useEffect(() => {
  if (isEdit) return; // ✅ Skip name check in edit mode

  const checkName = async () => {
    const trimmedName = formData.companyName.trim();
    setCheckingName(true);
    const exists = await checkCompanyNameExists(trimmedName);
    setCheckingName(false);

    if (exists) {
      setErrors((prev) => ({ ...prev, companyName: 'This company name already exists' }));
    } else {
      setErrors((prev) => {
        const updated = { ...prev };
        delete updated.companyName;
        return updated;
      });
    }
  };

  const timeout = setTimeout(checkName, 500);
  return () => clearTimeout(timeout);
}, [formData.companyName, isEdit]);


const validateStep = () => {
  const newErrors = {};
  const phoneRegex = /^[6-9]\d{9}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const urlRegex = /^(https?:\/\/)?([\w\-]+\.)+[a-z]{2,}(\/[^\s]*)?$/i;

  if (currentStep === 1 && !formData.companyName.trim()) {
    newErrors.companyName = ' name is required';
  }else if (errors.companyName === 'This company name already exists') {
      // 👈 Prevent next step if company name exists
      newErrors.companyName = 'This company name already exists';
    }

  if (currentStep === 1 && !formData.address.trim()) {
    newErrors.address = 'address is required';
  }
  if (currentStep === 2 && !formData.selectedTheme) {
    newErrors.selectedTheme = 'Please select a template';
  }

  if (currentStep === 3) {
    if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
    if (!formData.position.trim()) newErrors.position = 'Position is required';

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!phoneRegex.test(formData.phone)) {
      newErrors.phone = 'Enter a valid 10-digit phone number';
    }

    
    if (!phoneRegex.test(formData.whatsapp)) {
      newErrors.whatsapp = 'Enter a valid 10-digit phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!emailRegex.test(formData.email)) {
      newErrors.email = 'Enter a valid email address';
    }

    if (formData.website && !urlRegex.test(formData.website)) {
      newErrors.website = 'Enter a valid website URL';
    }

    if (!formData.about.trim()) newErrors.about = 'About is required';
    if (!formData.established_date) newErrors.established_date = 'Established Date is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
  }

  if (currentStep === 4) {
    if (formData.facebook && !urlRegex.test(formData.facebook)) newErrors.facebook = 'Invalid Facebook URL';
    if (formData.instagram && !urlRegex.test(formData.instagram)) newErrors.instagram = 'Invalid Instagram URL';
    if (formData.youtube && !urlRegex.test(formData.youtube)) newErrors.youtube = 'Invalid YouTube URL';
    if (formData.googleMap && !urlRegex.test(formData.googleMap)) newErrors.googleMap = 'Invalid Google Map URL';
  }

  if (currentStep === 5) {
    formData.videos.forEach((link, idx) => {
      if (link && !urlRegex.test(link)) {
        newErrors[`video${idx}`] = `Invalid URL at Video ${idx + 1}`;
      }
    });
  }

  if (currentStep === 6) {
    if (!formData.bankName.trim()) newErrors.bankName = 'Bank name is required';
    if (!formData.accountHolder.trim()) newErrors.accountHolder = 'Account holder name is required';
    if (!formData.accountNumber.trim() || isNaN(formData.accountNumber)) {
      newErrors.accountNumber = 'Account number must be numeric';
    }
    if (!formData.ifsc.trim()) newErrors.ifsc = 'IFSC code is required';

    ['paytm', 'googlepay', 'phonepe'].forEach((key) => {
      const value = formData[key];
      if (value && !/^\d{10}$/.test(value)) {
        newErrors[key] = `${key} number must be 10 digits`;
      }
    });
  }

  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};

const handleSubmit = async (paymentId) => {
  if (!validateStep()) return;

  const token = localStorage.getItem("token");
  if (!token) {
    toast({ title: "Error", description: "User not logged in." });
    return;
  }

  const isEdit = !!url_slug;
  const url = isEdit ? url_slug : generateCardUrl(formData.companyName);

  const data = new FormData();
  data.append('companyName', formData.companyName);
  data.append('logo', formData.logo);
  data.append('selectedTheme', formData.selectedTheme);
  data.append('firstName', formData.firstName);
  data.append('lastName', formData.lastName);
  data.append('position', formData.position);
  data.append('phone', formData.phone);
  data.append('whatsapp', formData.whatsapp);
  data.append('email', formData.email);
  data.append('website', formData.website);
  data.append('about', formData.about);
  data.append('facebook', formData.facebook);
  data.append('twitter', formData.twitter);
  data.append('instagram', formData.instagram);
  data.append('linkedin', formData.linkedin);
  data.append('youtube', formData.youtube);
  data.append('pinterest', formData.pinterest);
  data.append('paytm', formData.paytm);
  data.append('googlepay', formData.googlepay);
  data.append('phonepe', formData.phonepe);
  data.append('bankName', formData.bankName);
  data.append('accountHolder', formData.accountHolder);
  data.append('accountNumber', formData.accountNumber);
  data.append('ifsc', formData.ifsc);
  data.append('established_date', formData.established_date);
  data.append('address', formData.address);
  data.append('location', formData.location);
  data.append('gst', formData.gst);
  data.append('google_map', formData.googleMap);
  data.append('url_slug', url);
  data.append('razorpay_payment_id', paymentId);

  formData.videos.forEach((link, index) => {
    data.append(`video${index + 1}`, link);
  });

  formData.products.forEach((product, index) => {
    if (product.image) {
      data.append(`product${index + 1}_img`, product.image);
    }
    if (product.name) {
      data.append(`product${index + 1}_name`, product.name);
    }
  });

  try {
    const response = await axios({
      method: isEdit ? 'put' : 'post',
      url: `${API_BASE_URL}/${isEdit ? `update-card/${url_slug}` : 'create-card'}`,
      data,
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
    });

    console.log('response.data:', response.data);

    if (response.data.success || response.status === 201) {
      toast({
        title: isEdit ? 'Card Updated Successfully!' : 'Card Created Successfully!',
        description: 'Redirecting to dashboard...',
      });

      // Wait briefly before navigating so toast can be seen
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);
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



const handlePayment = () => {
  const amountInPaise = formData.templatePrice * 100;

  const options = {
    key: process.env.REACT_APP_RAZORPAY_ID, // ✅ Replace with your actual Razorpay test Key ID
    amount: amountInPaise,
    currency: 'INR',
    name: formData.companyName || 'Digital Card',
    description: `${formData.templateType} Template - ₹${formData.templatePrice}`,
    handler: function (response) {
      console.log("✅ Razorpay Payment ID:", response.razorpay_payment_id);
    handleSubmit(response.razorpay_payment_id);
// Call your existing function to save data to DB
    },
    prefill: {
      name: `${formData.firstName} ${formData.lastName}`,
      email: formData.email,
      contact: formData.phone
    },
    theme: {
      color: "#1976d2"
    }
  };

  const rzp = new window.Razorpay(options);
  rzp.open();
};

const templateOptions = [
  {
    id: 1,
    name: "Classic Blue",
    type: "Basic",
    price: 2000,
    borderColor: "blue",
    image:Template1
  },
  {
    id: 2,
    name: "Green Boxed",
    type: "Premium",
    price: 5000,
    borderColor: "green",
        image:Template2

  },
  {
    id: 3,
    name: "Premium Style",
    type: "Basic",
    price: 2000,
    borderColor: "purple",
    image:Template3
  }
];




  const renderStep = () => {
    switch (currentStep) {
     case 1:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}>
            <TextField
  fullWidth
  label="Company Name"
  value={formData.companyName}
  onChange={(e) => handleChange('companyName', e.target.value)}
  error={!!errors.companyName}
  helperText={checkingName ? 'Checking...' : errors.companyName || `URL will be: ${generateCardUrl(formData.companyName)}`}
  disabled={isEdit}
/>

            </Grid>
             <Grid item xs={12}>
    <Typography variant="subtitle2">Upload Company Logo (optional)</Typography>
    <input
      type="file"
      accept="image/*"
      onChange={(e) => handleChange('logo', e.target.files[0])}
    />
  </Grid>
            <Grid item xs={12}>
              <TextField
                label="Address"
                fullWidth
                required
                value={formData.address}
                onChange={(e) => handleChange('address', e.target.value)}
                error={!!errors.address}
                helperText={errors.address}
              />
            </Grid>
          </Grid>
        );
     // Inside renderStep() case 2
  case 2:
        return (
          <Grid container spacing={2}>
            {templateOptions.map((template) => (
              <Grid item xs={12} sm={6} md={4} key={template.id}>
                <Card
                  sx={{
                    p: 2,
                    cursor: 'pointer',
                    border: formData.selectedTheme === template.id ? `2px solid ${template.borderColor}` : '1px solid gray',
                    boxShadow: formData.selectedTheme === template.id ? 4 : 1,
                    '&:hover': {
                      border: `2px solid ${template.borderColor}`
                    }
                  }}
                  onClick={() => {
                    handleChange('selectedTheme', template.id);
                    handleChange('templatePrice', template.price);
                    handleChange('templateType', template.type);
                  }}
                >
                  <Box
                    sx={{
                      height: 150,
                      overflow: 'hidden',
                      borderRadius: 2,
                      mb: 1
                    }}
                  >
                    <img
                      src={template.image}
                      alt={`${template.name} Preview`}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        borderRadius: 8
                      }}
                    />
                  </Box>
                  <Typography variant="h6">{template.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {template.type} Template - ₹{template.price}
                     disabled={isEdit} 
                  </Typography>
                </Card>
              </Grid>
            ))}
            {errors.selectedTheme && (
              <Grid item xs={12}>
                <Typography color="error" align="center">{errors.selectedTheme}</Typography>
              </Grid>
            )}
          </Grid>
        );

      case 3:
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="First Name"
          fullWidth
          required
          value={formData.firstName}
          onChange={(e) => handleChange('firstName', e.target.value)}
          error={!!errors.firstName}
          helperText={errors.firstName}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Last Name (Optional)"
          fullWidth
          value={formData.lastName}
          onChange={(e) => handleChange('lastName', e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Position"
          fullWidth
          required
          value={formData.position}
          onChange={(e) => handleChange('position', e.target.value)}
          error={!!errors.position}
          helperText={errors.position}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Phone"
          fullWidth
          required
          value={formData.phone}
          onChange={(e) => handleChange('phone', e.target.value)}
          error={!!errors.phone}
          helperText={errors.phone}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="WhatsApp (Optional)"
          fullWidth
          value={formData.whatsapp}
          onChange={(e) => handleChange('whatsapp', e.target.value)}
           error={!!errors.whatsapp}
          helperText={errors.whatsapp}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Email"
          fullWidth
          required
          value={formData.email}
          onChange={(e) => handleChange('email', e.target.value)}
          error={!!errors.email}
          helperText={errors.email}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Website (Optional)"
          fullWidth
          value={formData.website}
          onChange={(e) => handleChange('website', e.target.value)}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="About Us"
          fullWidth
          required
          multiline
          minRows={3}
          value={formData.about}
          onChange={(e) => handleChange('about', e.target.value)}
          error={!!errors.about}
          helperText={errors.about}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Established Date"
          type="date"
          InputLabelProps={{ shrink: true }}
          fullWidth
          required
          value={formData.established_date}
          onChange={(e) => handleChange('established_date', e.target.value)}
          error={!!errors.established_date}
          helperText={errors.established_date}
        />
      </Grid>
    </Grid>
  );

      case 4:
        return (
          <Grid container spacing={2}>
            <Grid item xs={12}><TextField label="Facebook (Optional)" fullWidth value={formData.facebook} onChange={(e) => handleChange('facebook', e.target.value)} error={!!errors.facebook}
          helperText={errors.facebook} /></Grid>
            <Grid item xs={12}><TextField label="Instagram (Optional)" fullWidth value={formData.instagram} onChange={(e) => handleChange('instagram', e.target.value)} error={!!errors.instagram}
          helperText={errors.instagram} /></Grid>
            <Grid item xs={12}><TextField label="YouTube (Optional)" fullWidth value={formData.youtube} onChange={(e) => handleChange('youtube', e.target.value)}  error={!!errors.youtube}
          helperText={errors.youtube}/></Grid>
            <Grid item xs={12}><TextField label="Google Map Link (Optional)" fullWidth value={formData.googleMap} onChange={(e) => handleChange('googleMap', e.target.value)}  error={!!errors.googleMap}
          helperText={errors.googleMap}/></Grid>
          </Grid>
        );

        case 5:
  return (
    <Grid container spacing={2}>
      {formData.videos.map((video, idx) => (
        <Grid item xs={12} key={idx}>
          <TextField
            fullWidth
            label={`YouTube Video Link ${idx + 1}`}
            value={video}
            onChange={(e) => {
              const updated = [...formData.videos];
              updated[idx] = e.target.value;
              handleChange('videos', updated);
            }}
            
          />
        </Grid>
      ))}
    </Grid>
  );

  case 6:
  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <TextField
          label="Bank Name"
          fullWidth
          required
          value={formData.bankName}
          onChange={(e) => handleChange('bankName', e.target.value)}
          error={!!errors.bankName}
          helperText={errors.bankName}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Account Holder"
          fullWidth
          required
          value={formData.accountHolder}
          onChange={(e) => handleChange('accountHolder', e.target.value)}
          error={!!errors.accountHolder}
          helperText={errors.accountHolder}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="Account Number"
          fullWidth
          required
          value={formData.accountNumber}
          onChange={(e) => handleChange('accountNumber', e.target.value)}
          error={!!errors.accountNumber}
          helperText={errors.accountNumber}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="IFSC"
          fullWidth
          required
          value={formData.ifsc}
          onChange={(e) => handleChange('ifsc', e.target.value)}
          error={!!errors.ifsc}
          helperText={errors.ifsc}
        />
      </Grid>

      <Grid item xs={12}>
        <TextField
          label="GPay (Optional)"
          fullWidth
          value={formData.googlepay}
          onChange={(e) => handleChange('googlepay', e.target.value)}
        />
      </Grid>
    </Grid>
  );

      case 7:
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
  {/* ✅ Show preview for newly uploaded or saved image */}
  {formData.products[i]?.image && typeof formData.products[i].image !== 'string' ? (
    <img
      src={URL.createObjectURL(formData.products[i].image)}
      alt="preview"
      style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 4 }}
    />
  ) : formData.products[i]?.image && typeof formData.products[i].image === 'string' ? (
    <img
      src={`http://localhost:5000${formData.products[i].image}`}
      alt="product"
      style={{ width: '100%', height: 100, objectFit: 'cover', borderRadius: 4 }}
    />
  ) : (
    <Upload sx={{ fontSize: 30, color: '#9c27b0' }} />
  )}
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
     case 8:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>Card Summary Preview</Typography>
            <Card variant="outlined" sx={{ p: 3, backgroundColor: '#e3f2fd', borderRadius: 3 }}>
              <Typography variant="h5" gutterBottom>{formData.companyName || 'Company Name'}</Typography>
              <Typography><strong>Name:</strong> {formData.firstName} {formData.lastName}</Typography>
              <Typography><strong>Position:</strong> {formData.position}</Typography>
              <Typography><strong>Phone:</strong> {formData.phone}</Typography>
              <Typography><strong>Email:</strong> {formData.email}</Typography>
              <Typography><strong>Template:</strong> {formData.templateType} – ₹{formData.templatePrice}</Typography>
              <Typography><strong>Bank Name:</strong> {formData.bankName}</Typography>
              <Typography><strong>Account No:</strong> {formData.accountNumber}</Typography>
              <Typography><strong>IFSC:</strong> {formData.ifsc}</Typography>
              <Typography><strong>Established:</strong> {formData.established_date}</Typography>
              <Typography><strong>Address:</strong> {formData.address}</Typography>
              <Typography sx={{ mt: 2 }}><strong>About:</strong> {formData.about}</Typography>
            </Card>
          </Box>
        );

      default:
        return null;
    }
  };

  return (
    <Box sx={{ minHeight: '100vh',  background: 'linear-gradient(to right, #e0f7fa, #f1f8e9)',py:4 }}>
      <Box sx={{ maxWidth: '960px', mx: 'auto' }}>
        <Box display="flex" justifyContent="center" mb={3}>
          {steps.map((step, idx) => (
            <Box
              key={idx}
              sx={{
                px: 2,
                py: 1,
                borderRadius: 2,
                bgcolor: idx + 1 === currentStep ? 'primary.main' : idx + 1 < currentStep ? 'success.light' : 'grey.200',
                color: idx + 1 === currentStep ? 'white' : 'text.primary',
                mx: 0.5,
                transition: '0.3s'
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
                <Button variant="contained" color="success" endIcon={<Check />} onClick={handlePayment}>
                  Pay & Create Card
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
