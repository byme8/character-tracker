// Save this file as `index.js`

import React, { useState, useRef, useEffect} from 'react';
import ReactDOM from 'react-dom/client';
import {
  Container,
  TextField,
  Button,
  Card,
  Typography,
  IconButton,
  Grid,
  Box,
  CssBaseline,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';

let currentColorIndex = 0;
const colors = [
  '#FFCDD2',
  '#F8BBD0',
  '#E1BEE7',
  '#D1C4E9',
  '#C5CAE9',
  '#BBDEFB',
  '#B3E5FC',
  '#B2EBF2',
  '#B2DFDB',
  '#C8E6C9',
];

// Function to get a random color from the predefined set
const getRandomColor = () => {
  return colors[currentColorIndex++ % colors.length];
};

// Create a custom theme with a black background and bright text
const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#000000',
      paper: '#1C1C1C',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#000000',
        },
      },
    },
  },
});

// Character component
const Character = ({
  name,
  isFocused,
  level,
  onIncrement,
  onDecrement,
  onDelete,
  backgroundColor,
  tabIndex,
}) => (
  <Card
    variant="outlined"
    tabIndex={tabIndex}
    sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      p: 2,
      backgroundColor: backgroundColor,
      width: '100%',
      marginTop: isFocused ? 1 : 0,
      border: isFocused ? '4px solid #ffffff' : 'none',
      transition: 'margin-top 0.3s',
      

      
    }}
    role="region"
    aria-label={`Character card for ${name}`}
  >
    <Typography variant="h3" component="div" color="text.primary">
      {level}
    </Typography>
    <Typography variant="h5" sx={{ mb: 1.5 }} color="text.primary">
      {name}
    </Typography>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <IconButton
        onClick={onIncrement}
        color="primary"
        size="large"
        tabIndex={-1}
        aria-label={`Increase level for ${name}`}
      >
        <AddCircleIcon fontSize="inherit" />
      </IconButton>
      <IconButton
        onClick={onDecrement}
        color="secondary"
        size="large"
        tabIndex={-1}
        aria-label={`Decrease level for ${name}`}
      >
        <RemoveCircleIcon fontSize="inherit" />
      </IconButton>
    </Box>
    <IconButton
      onClick={onDelete}
      color="error"
      size="large"
      tabIndex={-1}
      aria-label={`Delete ${name}`}
    >
      <DeleteIcon fontSize="inherit" />
    </IconButton>
  </Card>
);

// Main App component
const App = () => {
  const [currentCharacterIndex, setCurrentCharacterIndex] = useState(0);
  const [characters, setCharacters] = useState([]);
  const [newCharacterName, setNewCharacterName] = useState('');
  const inputRef = useRef(null); // Create a ref for the input field

  // Focus on the input field when the component is mounted
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const addCharacter = () => {
    if (newCharacterName.trim()) {
      setCharacters([
        ...characters,
        {
          name: newCharacterName,
          level: 1,
          backgroundColor: getRandomColor(),
        },
      ]);
      setNewCharacterName('');
    }
  };

  const removeCharacter = (index) => {
    setCharacters(characters.filter((_, i) => i !== index));
  };

  const incrementLevel = (index) => {
    const updatedCharacters = [...characters];
    updatedCharacters[index].level += 1;
    setCharacters(updatedCharacters);
  };

  const decrementLevel = (index) => {
    const updatedCharacters = [...characters];
    if (updatedCharacters[index].level > 1) {
      updatedCharacters[index].level -= 1;
      setCharacters(updatedCharacters);
    }
  };

  // Handle key presses for character cards
  const handleCardKeyDown = (event, index, set) => {
    console.log(event.key);

    switch (event.key) {
      case 'ArrowUp':
        incrementLevel(index);
        break
      case 'ArrowRight':
        set(index + 1);
        break;
      case 'ArrowDown':
        decrementLevel(index);
        break;
      case 'ArrowLeft':
        set(index - 1);
        break;
      default:
        break;
    }
  };

  return (
    <div onKeyDown={(e) => handleCardKeyDown(e, currentCharacterIndex, setCurrentCharacterIndex)}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            gutterBottom
            color="text.primary"
          >
            Board Game Character Tracker
          </Typography>
          <Box sx={{ display: 'flex', mb: 4 }}>
            <TextField
              fullWidth
              inputRef={inputRef}
              label="Character Name"
              value={newCharacterName}
              onChange={(e) => setNewCharacterName(e.target.value)}
              variant="outlined"
              InputProps={{ style: { fontSize: '1.5rem', color: '#ffffff' } }}
              InputLabelProps={{ style: { fontSize: '1.5rem', color: '#ffffff' } }}
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  addCharacter();
                }
              }}
            />
            <Button
              variant="contained"
              color="primary"
              onClick={addCharacter}
              sx={{ ml: 2 }}
              size="large"
            >
              Add Character
            </Button>
          </Box>
          <Grid container spacing={4}>
            {characters.map((character, index) => (
              <Grid item xs={6} sm={4} md={3} lg={2} key={index}>
                <Character
                  name={character.name}
                  isFocused={index === currentCharacterIndex}
                  level={character.level}
                  backgroundColor={character.backgroundColor}
                  onIncrement={() => incrementLevel(index)}
                  onDecrement={() => decrementLevel(index)}
                  onDelete={() => removeCharacter(index)}
                  tabIndex={index} />
              </Grid>
            ))}
          </Grid>
        </Container>
      </ThemeProvider>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
