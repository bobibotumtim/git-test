import React, { useState } from 'react';
import {Col, Container} from "react-bootstrap";
import Top from '../Top';
import Middle from '../Middle';
import { Bottom } from '../Bottom';

const HomePage = () => {
  const [selectedCuisines, setSelectedCuisines] = useState([]);
  const [selectedMealTypes, setSelectedMealTypes] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);



  return (
    <Container>
      <h1 className='m-4'>Subject List</h1>
      
        <Col>
        
        <Top
            selectedCuisines={selectedCuisines}
            setSelectedCuisines={setSelectedCuisines}
            selectedMealTypes={selectedMealTypes}
            setSelectedMealTypes={setSelectedMealTypes}
          />
        
          <Middle
            selectedCuisines={selectedCuisines}
            selectedMealTypes={selectedMealTypes}
            selectedTags={selectedTags}
          />
          <Bottom
            selectedTags={selectedTags}
            setSelectedTags={setSelectedTags}
          />
        
        </Col>
          
    </Container>
  )
}

export default HomePage;