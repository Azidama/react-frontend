import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import {
  Container,
  Paper,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  RadioGroup,
  FormControlLabel,
  Radio,
  Checkbox,
  Button,
  Grid,
  Divider,
  FormHelperText,
  Box,
  Card,
  CardContent,
  Alert,
} from '@mui/material'

// This would be imported from your GraphQL mutations file
// import { ENROLL_MUTATION } from '../graphql/mutations';

const EnrollmentForm = () => {
  // State for form fields
  const [formData, setFormData] = useState({
    enrollmentType: '',
    paymentOption: '',
    name: '',
    identificationFormat: '',
    gender: 'Male',
    phone: '',
    city: '',
    fatherName: '',
    cnic: '',
    email: '',
    country: '',
    referralSource: '',
    trainingMode: '',
    agreedToTerms: false,
  })

  const [submitted, setSubmitted] = useState(false)

  // This would be your actual GraphQL mutation hook
  // const [enrollMutation, { loading, error }] = useMutation(ENROLL_MUTATION);

  const handleChange = e => {
    const { name, value, type, checked } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }))
  }

  const handleSubmit = e => {
    e.preventDefault()
    setSubmitted(true)
    // Here you would call your GraphQL mutation
    // enrollMutation({ variables: formData });
    console.log('Form submitted:', formData)
  }

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Paper
        elevation={0}
        sx={{
          p: { xs: 3, md: 6 },
          borderRadius: 4,
          background: 'linear-gradient(to bottom, #f9fafb, #ffffff)',
          border: '1px solid #e5e7eb',
        }}
      >
        <Box textAlign="center" mb={5}>
          <Typography
            variant="h3"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 800,
              background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontSize: { xs: '2rem', md: '2.75rem' },
            }}
          >
            READY TO PARTICIPATE?
          </Typography>

          <Typography
            variant="h5"
            component="h2"
            color="text.secondary"
            sx={{
              fontWeight: 500,
              fontSize: { xs: '1.25rem', md: '1.5rem' },
            }}
          >
            Kindly Fill Form To Enroll
          </Typography>
        </Box>

        {submitted && (
          <Alert severity="success" sx={{ mb: 4 }}>
            Your enrollment form has been submitted successfully!
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={4}>
            {/* Enrollment Type */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="enrollment-type-label">Enrollment For Training *</InputLabel>
                <Select
                  name="enrollmentType"
                  value={formData.enrollmentType}
                  label="Enrollment For Training *"
                  onChange={handleChange}
                  required
                  labelId="enrollment-type-label"
                >
                  <MenuItem value="Amazon Private Label">Amazon Private Label</MenuItem>
                  <MenuItem value="Other Training">Other Training</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Payment Options */}
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, mb: 2 }}>
                Payment Options *
              </Typography>
              <FormControl component="fieldset">
                <RadioGroup name="paymentOption" value={formData.paymentOption} onChange={handleChange} row sx={{ gap: { xs: 1, sm: 3 } }}>
                  <FormControlLabel value="Full Payment" control={<Radio />} label="Full Payment" />
                  <FormControlLabel value="Installments" control={<Radio />} label="Installments" />
                </RadioGroup>
              </FormControl>
            </Grid>

            {/* Divider */}
            <Grid item xs={12}>
              <Divider sx={{ my: 2 }} />
            </Grid>

            {/* Name and Identification */}
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Full Name *" name="name" value={formData.name} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="identification-format-label">Identification Format</InputLabel>
                <Select
                  name="identificationFormat"
                  value={formData.identificationFormat}
                  label="Identification Format"
                  onChange={handleChange}
                  labelId="identification-format-label"
                >
                  <MenuItem value="CNIC">CNIC</MenuItem>
                  <MenuItem value="Passport">Passport</MenuItem>
                  <MenuItem value="Driver License">Driver License</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Gender and Phone */}
            <Grid item xs={12} md={6}>
              <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 600 }}>
                Gender
              </Typography>
              <RadioGroup name="gender" value={formData.gender} onChange={handleChange} row sx={{ gap: { xs: 1, sm: 3 } }}>
                <FormControlLabel value="Male" control={<Radio />} label="Male" />
                <FormControlLabel value="Female" control={<Radio />} label="Female" />
                <FormControlLabel value="Other" control={<Radio />} label="Other" />
              </RadioGroup>
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Phone/WhatsApp Number *" name="phone" value={formData.phone} onChange={handleChange} required />
            </Grid>

            {/* Training Mode */}
            <Grid item xs={12}>
              <FormControl fullWidth>
                <InputLabel id="training-mode-label">Training Mode</InputLabel>
                <Select name="trainingMode" value={formData.trainingMode} label="Training Mode" onChange={handleChange} labelId="training-mode-label">
                  <MenuItem value="Online">Online</MenuItem>
                  <MenuItem value="In-Person">In-Person</MenuItem>
                  <MenuItem value="Hybrid">Hybrid</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Father Name and CNIC */}
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Father's Name *" name="fatherName" value={formData.fatherName} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="CNIC *" name="cnic" value={formData.cnic} onChange={handleChange} required />
            </Grid>

            {/* Email and Country */}
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Email Address *" name="email" type="email" value={formData.email} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12} md={6}>
              <TextField fullWidth label="Country *" name="country" value={formData.country} onChange={handleChange} required />
            </Grid>

            {/* City and Referral Source */}
            <Grid item xs={12} md={6}>
              <TextField fullWidth label="City *" name="city" value={formData.city} onChange={handleChange} required />
            </Grid>

            <Grid item xs={12} md={6}>
              <FormControl fullWidth>
                <InputLabel id="referral-source-label">Where did you hear about us? *</InputLabel>
                <Select
                  name="referralSource"
                  value={formData.referralSource}
                  label="Where did you hear about us? *"
                  onChange={handleChange}
                  required
                  labelId="referral-source-label"
                >
                  <MenuItem value="Social Media">Social Media</MenuItem>
                  <MenuItem value="Friend">Friend</MenuItem>
                  <MenuItem value="Advertisement">Advertisement</MenuItem>
                  <MenuItem value="Search Engine">Search Engine</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>

            {/* Terms and Conditions */}
            <Grid item xs={12}>
              <Divider sx={{ my: 3 }} />
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
                TERMS AND CONDITIONS
              </Typography>

              <Card variant="outlined" sx={{ mb: 3 }}>
                <CardContent>
                  <Typography variant="body1" paragraph>
                    <strong>Refund Process:</strong>
                  </Typography>
                  <Typography variant="body2" component="div" sx={{ pl: 2, mb: 2 }}>
                    <ul style={{ marginTop: 0 }}>
                      <li>
                        Refund can be made in the following categories:
                        <ul>
                          <li>100% refund before induction class</li>
                          <li>After induction class, there is no refund policy at all.</li>
                        </ul>
                      </li>
                      <li>Refund shall be processed in 14 working days after providing the bank details.</li>
                    </ul>
                  </Typography>

                  <Typography variant="body1" paragraph>
                    <strong>Updated Rules for Student Transfer:</strong>
                  </Typography>
                  <Typography variant="body2" component="div" sx={{ pl: 2 }}>
                    <ul style={{ marginTop: 0 }}>
                      <li>Transfer from one group to another or from one training to another will only be entertained before the 2nd class.</li>
                      <li>No transfer will be done after 2nd class. (Induction session is referred to as Class I).</li>
                    </ul>
                  </Typography>
                </CardContent>
              </Card>

              <FormControlLabel
                control={<Checkbox name="agreedToTerms" checked={formData.agreedToTerms} onChange={handleChange} required />}
                label={
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    I agree to the terms and conditions *
                  </Typography>
                }
              />
              <FormHelperText sx={{ ml: 4, mt: 0.5 }}>You must agree to the terms and conditions to proceed</FormHelperText>
            </Grid>

            {/* Submit Buttons */}
            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between', mt: 4, gap: 2 }}>
              <Button
                variant="outlined"
                color="secondary"
                size="large"
                sx={{
                  px: 4,
                  flex: { xs: 1, sm: 'none' },
                }}
              >
                ALREADY PAID
              </Button>

              <Button
                type="submit"
                variant="contained"
                size="large"
                disabled={!formData.agreedToTerms}
                sx={{
                  px: 6,
                  flex: { xs: 1, sm: 'none' },
                }}
              >
                SUBMIT
              </Button>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  )
}

export default EnrollmentForm
