import React from 'react';
import { useQuery } from '@apollo/client';
import { 
  Grid, 
  Card, 
  CardContent, 
  Typography, 
  CardActions, 
  Button, 
  CircularProgress,
  Box,
  Chip
} from '@mui/material';
import { GET_COURSES } from '../graphql/courses';
import { type Course, type Assignment } from '../types/course';
import { format } from 'date-fns';

const CoursesPage = () => {
  const { loading, error, data } = useQuery<{ courses: Course[] }>(GET_COURSES);

  if (loading) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <CircularProgress />
    </Box>
  );

  if (error) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Typography variant="h6" color="error">
        Error loading courses: {error.message}
      </Typography>
    </Box>
  );

  if (!data?.courses.length) return (
    <Box display="flex" justifyContent="center" mt={4}>
      <Typography variant="h5">
        No courses found. Enroll in a course to get started.
      </Typography>
    </Box>
  );

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, fontWeight: 500 }}>
        My Courses
      </Typography>
      
      <Grid container spacing={3}>
        {data.courses.map((course) => (
          <Grid item key={course.id} xs={12} sm={6} md={4}>
            <CourseCard course={course} />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default CoursesPage;

// Course Card Component
const CourseCard = ({ course }: { course: Course }) => (
  <Card sx={{ 
    height: '100%', 
    display: 'flex', 
    flexDirection: 'column',
    boxShadow: 3,
    transition: 'transform 0.3s',
    '&:hover': {
      transform: 'translateY(-5px)',
      boxShadow: 6
    }
  }}>
    <CardContent sx={{ flexGrow: 1 }}>
      <Typography variant="h6" color="primary" gutterBottom>
        {course.code}
      </Typography>
      <Typography variant="h5" gutterBottom>
        {course.title}
      </Typography>
      
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {course.description || 'No description available'}
      </Typography>
      
      <Box sx={{ mb: 2 }}>
        <Chip 
          label={`${course.assignments.length} assignments`} 
          size="small" 
          sx={{ mr: 1 }} 
        />
        <Chip 
          label={`Enrolled: ${format(new Date(course.enrollment[0]?.enrolledAt), 'MMM d, yyyy')}`} 
          size="small" 
          color="info"
        />
      </Box>
      
      {course.assignments.length > 0 && (
        <Box sx={{ mt: 2 }}>
          <Typography variant="subtitle2" gutterBottom>
            Upcoming Assignments:
          </Typography>
          <ul style={{ paddingLeft: 20, margin: 0 }}>
            {course.assignments.slice(0, 3).map((assignment) => (
              <li key={assignment.id}>
                <Typography variant="body2">
                  {assignment.title} - {format(new Date(assignment.dueDate), 'MMM d')}
                </Typography>
              </li>
            ))}
          </ul>
          {course.assignments.length > 3 && (
            <Typography variant="caption">
              +{course.assignments.length - 3} more
            </Typography>
          )}
        </Box>
      )}
    </CardContent>
    
    <CardActions sx={{ justifyContent: 'space-between', p: 2 }}>
      <Button size="small" variant="outlined">
        View Assignments
      </Button>
      <Button size="small" variant="contained">
        Enter Course
      </Button>
    </CardActions>
  </Card>
);