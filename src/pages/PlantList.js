import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import plants from '../data/plants';
import LazyPlantCard from '../components/LazyPlantCard';

const PageContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const SearchBar = styled.div`
  margin-bottom: 2rem;
`;

const SearchInput = styled.input`
  width: 100%;
  padding: 1rem;
  font-size: 1.1rem;
  border: 2px solid #e0e0e0;
  border-radius: 0.5rem;
  &:focus {
    outline: none;
    border-color: #27ae60;
  }

  @media (max-width: 768px) {
    padding: 0.8rem;
    font-size: 1rem;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  gap: 1rem;
  margin-bottom: 2rem;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    gap: 0.5rem;
    margin-bottom: 1.5rem;
  }
`;

const FilterButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 0.5rem;
  background: ${props => props.$active ? '#27ae60' : '#e0e0e0'};
  color: ${props => props.$active ? 'white' : '#2c3e50'};
  cursor: pointer;
  transition: all 0.3s ease;
  &:hover {
    background: ${props => props.$active ? '#219a52' : '#d0d0d0'};
  }

  @media (max-width: 768px) {
    padding: 0.6rem 0.8rem;
    font-size: 0.9rem;
    min-width: 80px;
  }
`;

const PlantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }
`;

const TopBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
    align-items: stretch;
  }
`;

const BackButton = styled.button`
  background: none;
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #27ae60;
  padding: 0;
  margin-right: 1rem;
  &:hover {
    color: #219a52;
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-right: 0;
    align-self: flex-start;
  }
`;

const HomeButton = styled(Link)`
  background: #27ae60;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  text-decoration: none;
  font-size: 1rem;
  transition: background 0.3s ease;
  &:hover {
    background: #219a52;
  }

  @media (max-width: 768px) {
    text-align: center;
    padding: 0.8rem 1rem;
  }
`;

const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 1rem;
  }
`;

const PaginationButton = styled.button`
  padding: 0.5rem 1rem;
  border-radius: 0.5rem;
  border: none;
  background: #e0e0e0;
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: background 0.3s ease;

  &:hover:not(:disabled) {
    background: #d0d0d0;
  }

  @media (max-width: 768px) {
    padding: 0.8rem 1.5rem;
    font-size: 1rem;
    min-width: 120px;
  }
`;

const PageInfo = styled.span`
  font-size: 1rem;
  color: #2c3e50;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`;

const MobileHidden = styled.div`
  @media (max-width: 768px) {
    display: none;
  }
`;

function PlantList() {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const plantsPerPage = 9;
  const navigate = useNavigate();

  const categories = ['all', 'Ayurveda', 'Unani', 'Siddha', 'Homeopathy'];

  const filteredPlants = React.useMemo(() => {
    return plants.filter(plant => {
      const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           plant.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = activeFilter === 'all' || plant.category === activeFilter;
      return matchesSearch && matchesFilter;
    });
  }, [searchTerm, activeFilter]);

  // Pagination logic
  const totalPages = Math.ceil(filteredPlants.length / plantsPerPage);
  const indexOfLastPlant = currentPage * plantsPerPage;
  const indexOfFirstPlant = indexOfLastPlant - plantsPerPage;
  const currentPlants = filteredPlants.slice(indexOfFirstPlant, indexOfLastPlant);

  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, activeFilter]);

  return (
    <PageContainer>
      <TopBar>
        <BackButton onClick={() => navigate(-1)} title="Go Back">←</BackButton>
        <HomeButton to="/">Home</HomeButton>
      </TopBar>
      <SearchBar>
        <SearchInput
          type="text"
          placeholder="Search plants..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </SearchBar>

      <MobileHidden>
        <FilterContainer>
          {categories.map(category => (
            <FilterButton
              key={category}
              $active={activeFilter === category}
              onClick={() => setActiveFilter(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </FilterButton>
          ))}
        </FilterContainer>
      </MobileHidden>

      <PlantGrid>
        {currentPlants.map((plant, index) => (
          <LazyPlantCard
            key={plant.id}
            plant={plant}
            index={index}
          />
        ))}
      </PlantGrid>

      {/* Pagination Controls */}
      {totalPages > 1 && (
        <PaginationContainer>
          <PaginationButton
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </PaginationButton>
          <PageInfo>Page {currentPage} of {totalPages}</PageInfo>
          <PaginationButton
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </PaginationButton>
        </PaginationContainer>
      )}
    </PageContainer>
  );
}

export default PlantList; 