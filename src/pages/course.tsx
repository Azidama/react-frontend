import React from 'react';
import { useQuery } from '@apollo/client';
import {
  Box,
  Card,
  CardContent,
  CardActionArea,
  Chip,
  Container,
  Grid,
  LinearProgress,
  Typography
} from '@mui/material';
import { GET_COURSES } from '../graphql/courses'
import { type Course } from '../types/course'; // Your Course type

const CoursesPage = () => {
  const { loading, error, data } = useQuery<{ getCourses: Course[] }>(GET_COURSES);

  if (loading) return <LinearProgress sx={{ mt: 2 }} />;
  
  if (error) return (
    <Box textAlign="center" mt={4}>
      <Typography variant="h6" color="error">
        Error loading courses: {error.message}
      </Typography>
    </Box>
  );

  const courses = data?.getCourses || [];

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ 
        fontWeight: 700, 
        mb: 4,
        textAlign: 'center',
        color: 'primary.main'
      }}>
        Available Courses
      </Typography>
      
      {courses.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6">
            No courses available yet. Check back soon!
          </Typography>
        </Box>
      ) : (
        <Grid container spacing={3}>
          {courses.map((course) => (
            <Grid item key={course.id} xs={12} sm={6} md={4} lg={3}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

// Course Card Component
const CourseCard = ({ course }: { course: Course }) => (
  <Card sx={{ 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column',
    border: '1px solid #e0e0e0',
    borderRadius: 2,
    boxShadow: '0 4px 12px rgba(0,0,0,0.05)',
    transition: 'transform 0.3s, box-shadow 0.3s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: '0 6px 16px rgba(0,0,0,0.1)'
    }
  }}>
    <CardActionArea sx={{ flexGrow: 1 }}>
      <CardContent sx={{ flexGrow: 1 }}>
        <Chip 
          label={course.code} 
          size="small" 
          sx={{ 
            mb: 1.5,
            fontWeight: 700,
            backgroundColor: '#f0f7ff',
            color: 'primary.main'
          }} 
        />
        
        <Typography variant="h6" gutterBottom sx={{ 
          fontWeight: 600, 
          minHeight: '64px',
          display: 'flex',
          alignItems: 'center'
        }}>
          {course.title}
        </Typography>
        
        <Typography variant="body2" color="text.secondary" sx={{ 
          minHeight: '80px',
          overflow: 'hidden',
          display: '-webkit-box',
          WebkitLineClamp: 4,
          WebkitBoxOrient: 'vertical'
        }}>
          {course.description}
        </Typography>
      </CardContent>
    </CardActionArea>
    
    <Box sx={{ 
      p: 2, 
      display: 'flex', 
      justifyContent: 'space-between',
      borderTop: '1px solid #f5f5f5'
    }}>
      <Chip 
        label="Enroll Now" 
        size="small" 
        sx={{ 
          backgroundColor: '#4caf50', 
          color: 'white',
          fontWeight: 500
        }} 
      />
      <Typography variant="caption" color="text.secondary">
        ID: {course.id}
      </Typography>
    </Box>
  </Card>
);

export default CoursesPage;