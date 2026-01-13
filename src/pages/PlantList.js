import React, { useState, useMemo } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import SEO from '../components/SEO';
import plants from '../data/plants';
import LazyPlantCard from '../components/LazyPlantCard';
import { highlightText } from '../components/SearchHighlight';

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
  padding: 1rem 1.5rem;
  font-size: 1.1rem;
  border: 2px solid #e0e0e0;
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  background: rgba(255, 255, 255, 0.9);
  backdrop-filter: blur(10px);
  -webkit-backdrop-filter: blur(10px);
  
  &:focus {
    outline: none;
    border-color: #27ae60;
    box-shadow: 0 0 0 3px rgba(39, 174, 96, 0.1);
    background: rgba(255, 255, 255, 1);
  }

  &::placeholder {
    color: #999;
  }

  @media (max-width: 768px) {
    padding: 0.9rem 1.2rem;
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
  padding: 0.6rem 1.2rem;
  border: none;
  border-radius: 0.75rem;
  background: ${props => props.$active 
    ? 'linear-gradient(135deg, #27ae60 0%, #2ecc71 100%)' 
    : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.$active ? 'white' : '#2c3e50'};
  cursor: pointer;
  font-weight: ${props => props.$active ? '600' : '500'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: ${props => props.$active 
    ? '0 4px 12px rgba(39, 174, 96, 0.3)' 
    : '0 2px 4px rgba(0, 0, 0, 0.05)'};
  border: ${props => props.$active ? 'none' : '1px solid rgba(0, 0, 0, 0.1)'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.$active 
      ? '0 6px 16px rgba(39, 174, 96, 0.4)' 
      : '0 4px 8px rgba(0, 0, 0, 0.1)'};
    background: ${props => props.$active 
      ? 'linear-gradient(135deg, #2ecc71 0%, #27ae60 100%)' 
      : 'rgba(255, 255, 255, 1)'};
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.7rem 1rem;
    font-size: 0.9rem;
    min-width: 80px;
  }
`;

const PlantGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;

  @media (max-width: 1024px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }

  @media (max-width: 768px) {
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 1rem;
  }
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 4rem 2rem;
  color: var(--text-secondary);

  h3 {
    font-size: 1.5rem;
    color: var(--text-primary);
    margin-bottom: 1rem;
  }

  p {
    font-size: 1rem;
    margin-bottom: 1.5rem;
  }

  svg {
    font-size: 4rem;
    margin-bottom: 1rem;
    opacity: 0.5;
  }
`;

const ResultsCount = styled(motion.div)`
  text-align: center;
  color: var(--text-secondary);
  margin-bottom: 1.5rem;
  font-size: 0.95rem;
  padding: 0.5rem;
  background: var(--bg-tertiary);
  border-radius: 0.5rem;
  border: 1px solid var(--border-color);

  strong {
    color: var(--accent-primary);
    font-weight: 600;
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
  background: rgba(39, 174, 96, 0.1);
  border: none;
  font-size: 2rem;
  cursor: pointer;
  color: #27ae60;
  padding: 0.5rem 1rem;
  margin-right: 1rem;
  border-radius: 0.75rem;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  
  &:hover {
    background: rgba(39, 174, 96, 0.2);
    transform: translateX(-4px) scale(1.05);
    color: #219a52;
  }

  &:active {
    transform: translateX(-2px) scale(1);
  }

  @media (max-width: 768px) {
    font-size: 1.5rem;
    margin-right: 0;
    align-self: flex-start;
    width: 45px;
    height: 45px;
  }
`;

const HomeButton = styled(Link)`
  background: linear-gradient(135deg, #27ae60 0%, #2ecc71 100%);
  color: white;
  padding: 0.7rem 1.5rem;
  border-radius: 0.75rem;
  text-decoration: none;
  font-size: 1rem;
  font-weight: 600;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  box-shadow: 0 4px 12px rgba(39, 174, 96, 0.3);
  display: inline-block;
  
  &:hover {
    background: linear-gradient(135deg, #2ecc71 0%, #27ae60 100%);
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(39, 174, 96, 0.4);
  }

  &:active {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    text-align: center;
    padding: 0.9rem 1.2rem;
    width: 100%;
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
  padding: 0.7rem 1.5rem;
  border-radius: 0.75rem;
  border: none;
  background: ${props => props.disabled 
    ? '#e0e0e0' 
    : 'rgba(255, 255, 255, 0.9)'};
  color: ${props => props.disabled ? '#999' : '#2c3e50'};
  cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  font-weight: 600;
  box-shadow: ${props => props.disabled 
    ? 'none' 
    : '0 2px 4px rgba(0, 0, 0, 0.1)'};
  border: ${props => props.disabled ? 'none' : '1px solid rgba(0, 0, 0, 0.1)'};

  &:hover:not(:disabled) {
    background: rgba(255, 255, 255, 1);
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.15);
  }

  &:active:not(:disabled) {
    transform: translateY(0);
  }

  @media (max-width: 768px) {
    padding: 0.9rem 1.5rem;
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

  const filteredPlants = useMemo(() => {
    return plants.filter(plant => {
      const matchesSearch = plant.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           plant.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (plant.scientificName && plant.scientificName.toLowerCase().includes(searchTerm.toLowerCase()));
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
      <SEO
        title="Browse All Plants"
        description="Browse our complete collection of AYUSH medicinal plants. Search and filter by category to find the perfect plant for your needs."
      />
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

      {filteredPlants.length > 0 && (
        <ResultsCount
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
        >
          Found <strong>{filteredPlants.length}</strong> {filteredPlants.length === 1 ? 'plant' : 'plants'}
          {searchTerm && ` matching "${searchTerm}"`}
          {activeFilter !== 'all' && ` in ${activeFilter}`}
        </ResultsCount>
      )}

      <AnimatePresence mode="wait">
        {currentPlants.length > 0 ? (
          <PlantGrid key="plants">
            {currentPlants.map((plant, index) => (
              <LazyPlantCard
                key={plant.id}
                plant={plant}
                index={index}
                searchTerm={searchTerm}
              />
            ))}
          </PlantGrid>
        ) : (
          <EmptyState
            key="empty"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.3 }}
          >
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🌿</div>
            <h3>No plants found</h3>
            <p>
              {searchTerm 
                ? `No plants match "${searchTerm}"${activeFilter !== 'all' ? ` in ${activeFilter}` : ''}.`
                : `No plants found in ${activeFilter}.`}
            </p>
            <p style={{ fontSize: '0.9rem', marginTop: '1rem' }}>
              Try adjusting your search or filter criteria.
            </p>
          </EmptyState>
        )}
      </AnimatePresence>

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