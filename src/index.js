// Save this file as `index.js`

import React, { useState } from 'react';
import ReactDOM from 'react-dom';
import { Container, TextField, Button, Card, CardContent, Typography, IconButton, Grid, Box } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import RemoveCircleIcon from '@mui/icons-material/RemoveCircle';
import DeleteIcon from '@mui/icons-material/Delete';

const colors = ['#FFCDD2', '#F8BBD0', '#E1BEE7', '#D1C4E9', '#C5CAE9', '#BBDEFB', '#B3E5FC', '#B2EBF2', '#B2DFDB', '#C8E6C9'];

// Function to get a random color from the predefined set
const getRandomColor = () => {
  return colors[Math.floor(Math.random() * colors.length)];
};

// Character component
const Character = ({ name, level, onIncrement, onDecrement, onDelete, backgroundColor }) => (
  <Card variant="outlined" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', mb: 2, p: 2, backgroundColor, width: 150, height: 150 }}>
    <Typography variant="h3" component="div">{level}</Typography>
    <Typography sx={{ mb: 1.5 }} color="text.secondary">{name}</Typography>
    <Box sx={{ display: 'flex', justifyContent: 'center' }}>
      <IconButton onClick={onIncrement} color="primary">
        <AddCircleIcon />
      </IconButton>
      <IconButton onClick={onDecrement} color="secondary">
        <RemoveCircleIcon />
      </IconButton>
    </Box>
    <IconButton onClick={onDelete} color="error">
      <DeleteIcon />
    </IconButton>
  </Card>
);

// Main App component
const App = () => {
  const [characters, setCharacters] = useState([]);
  const [newCharacterName, setNewCharacterName] = useState('');

  const addCharacter = () => {
    if (newCharacterName.trim()) {
      setCharacters([
        ...characters,
        { name: newCharacterName, level: 1, backgroundColor: getRandomColor() }
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

  return (
    <Container maxWidth="md">
      <Typography variant="h3" component="h1" gutterBottom>
        Board Game Character Tracker
      </Typography>
      <Box sx={{ display: 'flex', mb: 2 }}>
        <TextField
          fullWidth
          label="Character Name"
          value={newCharacterName}
          onChange={(e) => setNewCharacterName(e.target.value)}
          variant="outlined"
        />
        <Button variant="contained" color="primary" onClick={addCharacter} sx={{ ml: 2 }}>
          Add Character
        </Button>
      </Box>
      <Grid container spacing={2}>
        {characters.map((character, index) => (
          <Grid item xs={3} md={3} key={index}>
            <Character
              name={character.name}
              level={character.level}
              backgroundColor={character.backgroundColor}
              onIncrement={() => incrementLevel(index)}
              onDecrement={() => decrementLevel(index)}
              onDelete={() => removeCharacter(index)}
            />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
