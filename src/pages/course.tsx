import { useQuery } from '@apollo/client'
import { Box, Card, CardContent, Chip, Container, Grid, LinearProgress, Typography, Button, Avatar, Stack } from '@mui/material'
import { GET_COURSES } from '../graphql/courses'
import { type Course } from '../types/course'

const CoursesPage = () => {
  const { loading, error, data } = useQuery<{ getCourses: Course[] }>(GET_COURSES)

  if (loading) return <LinearProgress sx={{ mt: 2 }} />

  if (error)
    return (
      <Box textAlign="center" mt={4}>
        <Typography variant="h6" color="error">
          Error loading courses: {error.message}
        </Typography>
      </Box>
    )

  const courses = data?.getCourses || []

  return (
    <Container maxWidth="xl" sx={{ py: 6, backgroundColor: 'white' }}>
      <Box textAlign="center" mb={6}>
        <Typography
          variant="h3"
          sx={{
            fontWeight: 800,
            mb: 2,
            background: 'linear-gradient(90deg, #4f46e5 0%, #7c3aed 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Explore Our Courses
        </Typography>
        <Typography variant="h6" color="text.secondary" maxWidth="700px" mx="auto">
          Discover our expertly crafted programs designed to accelerate your career growth
        </Typography>
      </Box>

      {courses.length === 0 ? (
        <Box textAlign="center" mt={4}>
          <Typography variant="h6">No courses available yet. Check back soon!</Typography>
        </Box>
      ) : (
        <Grid container spacing={4} justifyContent="center">
          {courses.map(course => (
            <Grid item key={course.id} xs={12} sm={6} md={4} lg={3} sx={{ display: 'flex' }}>
              <CourseCard course={course} />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  )
}

const CourseCard = ({ course }: { course: Course }) => {
  const getColorByCode = (code: string) => {
    const colorMap: Record<string, string> = {
      SE: '#4f46e5', // Indigo
      TS: '#ec4899', // Pink
      DM: '#0ea5e9', // Sky
      CE: '#10b981', // Emerald
      PM: '#f59e0b', // Amber
      GD: '#8b5cf6', // Violet
      VE: '#ef4444', // Red
      WM: '#06b6d4', // Cyan
      AL: '#f97316', // Orange
      FS: '#6366f1', // Indigo
      EB: '#14b8a6', // Teal
      AM: '#3b82f6', // Blue
    }
    const prefix = code.substring(0, 2)
    return colorMap[prefix] || '#64748b' // Default slate
  }

  const cardColor = getColorByCode(course.code)

  return (
    <Card
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 3,
        boxShadow: '0 10px 30px rgba(0,0,0,0.05)',
        transition: 'transform 0.3s, box-shadow 0.3s',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: `0 15px 40px ${cardColor}20`,
        },
      }}
    >
      <Box
        sx={{
          height: '6px',
          background: `linear-gradient(90deg, ${cardColor} 0%, ${cardColor}80 100%)`,
        }}
      />

      <Box sx={{ flexGrow: 1 }}>
        <CardContent sx={{ p: 3, flexGrow: 1 }}>
          <Stack direction="row" alignItems="center" spacing={1} mb={2}>
            <Avatar
              sx={{
                bgcolor: `${cardColor}15`,
                color: cardColor,
                width: 40,
                height: 40,
                fontWeight: 700,
                fontSize: '0.9rem',
              }}
            >
              {course.code.substring(0, 2)}
            </Avatar>
            <Typography
              variant="subtitle1"
              sx={{
                fontWeight: 700,
                color: cardColor,
                letterSpacing: '0.5px',
              }}
            >
              {course.code}
            </Typography>
          </Stack>

          <Typography
            variant="h5"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 2,
              lineHeight: 1.3,
              minHeight: '64px',
            }}
          >
            {course.title}
          </Typography>

          {/* Fixed description wrapping */}
          <Typography
            variant="h6"
            color="text.secondary"
            sx={{
              mb: 2,
              minHeight: '100px', // Increased height for more text
              lineHeight: 1.6, // Better line spacing
              display: 'block',
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              whiteSpace: 'normal', // Allow wrapping
              wordWrap: 'break-word', // Break long words
            }}
          >
            {course.description}
          </Typography>

          <Stack direction="row" spacing={1} mb={2}>
            <Chip
              label="3 Months"
              size="small"
              sx={{
                backgroundColor: '#f1f5f9',
                fontWeight: 500,
                fontSize: '0.75rem',
              }}
            />
            <Chip
              label="Online"
              size="small"
              sx={{
                backgroundColor: '#f1f5f9',
                fontWeight: 500,
                fontSize: '0.75rem',
              }}
            />
          </Stack>
        </CardContent>
      </Box>

      <Box sx={{ p: 2, borderTop: '1px solid #f1f5f9' }}>
        <Button
          fullWidth
          variant="contained"
          size="medium"
          sx={{
            fontWeight: 600,
            borderRadius: 2,
            py: 1.2,
            background: `linear-gradient(90deg, ${cardColor} 0%, ${cardColor}80 100%)`,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 4px 15px ${cardColor}40`,
            },
          }}
        >
          Enroll Now
        </Button>
      </Box>
    </Card>
  )
}

export default CoursesPage
