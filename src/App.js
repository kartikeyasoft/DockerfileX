import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

// --- Animations ---
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const glow = keyframes`
  0% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.3); }
  50% { box-shadow: 0 0 20px rgba(0, 255, 255, 0.6); }
  100% { box-shadow: 0 0 5px rgba(0, 255, 255, 0.3); }
`;

// --- Styled Components ---
const Container = styled.div`
  background: radial-gradient(circle at 20% 30%, #0a0f1e, #03050b);
  min-height: 100vh;
  padding: 2rem 1rem;
  font-family: 'Inter', 'Segoe UI', system-ui, sans-serif;
  color: #eef5ff;
`;

const GlassCard = styled.div`
  background: rgba(15, 25, 45, 0.75);
  backdrop-filter: blur(12px);
  border-radius: 2rem;
  border: 1px solid rgba(0, 255, 255, 0.2);
  box-shadow: 0 25px 45px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(0, 255, 255, 0.1);
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  animation: ${fadeIn} 0.5s ease-out;
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 3rem;
  font-weight: 800;
  background: linear-gradient(135deg, #00f2fe, #4facfe, #00c9ff);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: -0.02em;
  text-shadow: 0 0 10px rgba(0, 242, 254, 0.3);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const Sub = styled.p`
  color: #a0b3d9;
  font-size: 1.1rem;
  font-weight: 500;
  border-bottom: 1px dashed #2a3a60;
  display: inline-block;
  padding-bottom: 6px;
`;

// --- Input Area ---
const InputArea = styled.div`
  display: flex;
  gap: 1rem;
  margin: 2rem 0;
  flex-wrap: wrap;
  justify-content: center;
`;

const MagicInput = styled.input`
  flex: 2;
  background: #0f172f;
  border: 1px solid #2a3a60;
  color: #eef5ff;
  padding: 14px 20px;
  font-size: 1rem;
  border-radius: 60px;
  outline: none;
  transition: all 0.2s;
  &:focus {
    border-color: #00f2fe;
    box-shadow: 0 0 0 3px rgba(0, 242, 254, 0.2);
  }
`;

const Select = styled.select`
  background: #0f172f;
  border: 1px solid #2a3a60;
  color: #eef5ff;
  padding: 14px 20px;
  font-size: 0.9rem;
  border-radius: 60px;
  outline: none;
  cursor: pointer;
`;

const DateInput = styled.input`
  background: #0f172f;
  border: 1px solid #2a3a60;
  color: #eef5ff;
  padding: 14px 20px;
  font-size: 0.9rem;
  border-radius: 60px;
  outline: none;
`;

const MagicButton = styled.button`
  background: linear-gradient(95deg, #00c9ff, #4facfe);
  border: none;
  padding: 14px 28px;
  font-weight: bold;
  border-radius: 60px;
  cursor: pointer;
  transition: all 0.2s;
  display: inline-flex;
  align-items: center;
  gap: 8px;
  color: #03050b;
  font-size: 1rem;
  &:hover {
    transform: scale(1.02);
    box-shadow: 0 0 15px #00c9ff;
  }
`;

// --- Filters & Controls ---
const FilterBar = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  margin: 1.5rem 0;
  justify-content: space-between;
  align-items: center;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 0.5rem;
  flex-wrap: wrap;
`;

const FilterChip = styled.button`
  background: ${props => props.active ? '#00c9ff' : '#0f172f'};
  color: ${props => props.active ? '#03050b' : '#a0b3d9'};
  border: 1px solid ${props => props.active ? '#00c9ff' : '#2a3a60'};
  padding: 6px 16px;
  border-radius: 40px;
  cursor: pointer;
  font-weight: 500;
  transition: all 0.2s;
  &:hover {
    background: #1e2a4a;
    color: white;
  }
`;

const SearchInput = styled.input`
  background: #0f172f;
  border: 1px solid #2a3a60;
  color: #eef5ff;
  padding: 8px 16px;
  border-radius: 40px;
  outline: none;
  width: 200px;
`;

// --- Spell/Task Grid ---
const SpellGrid = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
  margin: 1.5rem 0;
  max-height: 500px;
  overflow-y: auto;
  padding-right: 8px;
  &::-webkit-scrollbar {
    width: 6px;
  }
  &::-webkit-scrollbar-track {
    background: #0f172f;
    border-radius: 10px;
  }
  &::-webkit-scrollbar-thumb {
    background: #00c9ff;
    border-radius: 10px;
  }
`;

const SpellCard = styled.div`
  background: linear-gradient(135deg, #101826, #0b1120);
  border-radius: 1.2rem;
  padding: 1rem 1.5rem;
  cursor: pointer;
  transition: all 0.2s;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-left: 5px solid ${props => {
    switch(props.priority) {
      case 'high': return '#ff4d4d';
      case 'medium': return '#ffaa33';
      default: return '#33ff99';
    }
  }};
  border-right: 1px solid #2a3a60;
  border-top: 1px solid #2a3a60;
  border-bottom: 1px solid #2a3a60;
  &:hover {
    transform: translateX(6px);
    background: #141e30;
    border-left-width: 8px;
  }
`;

const SpellInfo = styled.div`
  flex: 3;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const SpellText = styled.span`
  font-size: 1.1rem;
  font-weight: 500;
  color: ${props => props.completed ? '#6c86a3' : '#eef5ff'};
  text-decoration: ${props => props.completed ? 'line-through' : 'none'};
`;

const MetaInfo = styled.div`
  display: flex;
  gap: 12px;
  font-size: 0.7rem;
  color: #8aa0c0;
  flex-wrap: wrap;
`;

const PriorityBadge = styled.span`
  background: ${props => {
    switch(props.priority) {
      case 'high': return '#ff4d4d20';
      case 'medium': return '#ffaa3320';
      default: return '#33ff9920';
    }
  }};
  color: ${props => {
    switch(props.priority) {
      case 'high': return '#ff8888';
      case 'medium': return '#ffcc88';
      default: return '#88ffcc';
    }
  }};
  padding: 2px 8px;
  border-radius: 30px;
  font-weight: 600;
`;

const DueDate = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  background: #1a253c;
  padding: 2px 8px;
  border-radius: 30px;
`;

const SpellStatus = styled.span`
  font-size: 0.7rem;
  background: ${props => props.completed ? '#33ff99' : '#ffaa33'};
  color: #03050b;
  padding: 5px 14px;
  border-radius: 40px;
  font-weight: bold;
  text-align: center;
  min-width: 100px;
`;

// --- Stats & Footer ---
const StatsBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 1.5rem;
  padding: 0.8rem 1.2rem;
  background: rgba(0, 201, 255, 0.1);
  border-radius: 60px;
  font-size: 0.85rem;
  font-weight: 500;
  flex-wrap: wrap;
  gap: 10px;
`;

const ClearButton = styled.button`
  background: rgba(255, 77, 77, 0.2);
  border: 1px solid #ff4d4d;
  color: #ff8888;
  padding: 5px 14px;
  border-radius: 40px;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  &:hover {
    background: #ff4d4d;
    color: white;
  }
`;

const Footer = styled.div`
  text-align: center;
  margin-top: 2rem;
  padding-top: 1rem;
  border-top: 1px solid #2a3a60;
  font-size: 0.85rem;
  color: #6c86a3;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`;

const Kartikeya = styled.span`
  font-weight: bold;
  background: linear-gradient(135deg, #00f2fe, #4facfe);
  -webkit-background-clip: text;
  background-clip: text;
  color: transparent;
  letter-spacing: 1px;
`;

// --- Main Component ---
function App() {
  const [spells, setSpells] = useState([]);
  const [newSpell, setNewSpell] = useState('');
  const [priority, setPriority] = useState('medium');
  const [dueDate, setDueDate] = useState('');
  const [filter, setFilter] = useState('all'); // all, pending, completed
  const [search, setSearch] = useState('');

  // Load from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('productivity_spells');
    if (stored) setSpells(JSON.parse(stored));
  }, []);

  useEffect(() => {
    localStorage.setItem('productivity_spells', JSON.stringify(spells));
  }, [spells]);

  const addSpell = () => {
    if (!newSpell.trim()) return;
    const spellObj = {
      id: Date.now(),
      text: newSpell.trim(),
      completed: false,
      priority: priority,
      dueDate: dueDate || null,
      createdAt: new Date().toISOString(),
    };
    setSpells([spellObj, ...spells]);
    setNewSpell('');
    setDueDate('');
    setPriority('medium');
  };

  const toggleSpell = (id) => {
    setSpells(spells.map(spell =>
      spell.id === id ? { ...spell, completed: !spell.completed } : spell
    ));
  };

  const deleteSpell = (id, e) => {
    e.stopPropagation();
    if (window.confirm('Remove this spell forever?')) {
      setSpells(spells.filter(spell => spell.id !== id));
    }
  };

  const clearCompleted = () => {
    setSpells(spells.filter(spell => !spell.completed));
  };

  // Filter & search logic
  const filteredSpells = spells.filter(spell => {
    if (filter === 'pending') return !spell.completed;
    if (filter === 'completed') return spell.completed;
    return true;
  }).filter(spell =>
    spell.text.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    total: spells.length,
    completed: spells.filter(s => s.completed).length,
    pending: spells.filter(s => !s.completed).length,
    highPriority: spells.filter(s => s.priority === 'high' && !s.completed).length,
  };

  return (
    <Container>
      <GlassCard>
        <Header>
          <Title>
            <span>📜</span> PRODUCTIVITY SPELLBOOK <span>⚡</span>
          </Title>
          <Sub>— cast tasks with priority & due dates, store locally —</Sub>
        </Header>

        <InputArea>
          <MagicInput
            type="text"
            value={newSpell}
            onChange={(e) => setNewSpell(e.target.value)}
            placeholder="✍️ Write your task (e.g., 'Finish report')"
            onKeyPress={(e) => e.key === 'Enter' && addSpell()}
          />
          <Select value={priority} onChange={(e) => setPriority(e.target.value)}>
            <option value="high">🔴 High Priority</option>
            <option value="medium">🟡 Medium Priority</option>
            <option value="low">🟢 Low Priority</option>
          </Select>
          <DateInput
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
          <MagicButton onClick={addSpell}>
            <span>🪄</span> Cast Spell
          </MagicButton>
        </InputArea>

        <FilterBar>
          <FilterGroup>
            <FilterChip active={filter === 'all'} onClick={() => setFilter('all')}>All</FilterChip>
            <FilterChip active={filter === 'pending'} onClick={() => setFilter('pending')}>Pending</FilterChip>
            <FilterChip active={filter === 'completed'} onClick={() => setFilter('completed')}>Executed</FilterChip>
          </FilterGroup>
          <SearchInput
            type="text"
            placeholder="🔍 Search spells..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </FilterBar>

        <SpellGrid>
          {filteredSpells.length === 0 ? (
            <div style={{ textAlign: 'center', color: '#6c86a3', padding: '2rem' }}>
              ✨ No spells match your criteria. Add one above! ✨
            </div>
          ) : (
            filteredSpells.map(spell => (
              <SpellCard key={spell.id} priority={spell.priority} onClick={() => toggleSpell(spell.id)}>
                <SpellInfo>
                  <SpellText completed={spell.completed}>{spell.text}</SpellText>
                  <MetaInfo>
                    <PriorityBadge priority={spell.priority}>
                      {spell.priority === 'high' ? '🔴 High' : spell.priority === 'medium' ? '🟡 Medium' : '🟢 Low'}
                    </PriorityBadge>
                    {spell.dueDate && (
                      <DueDate>
                        📅 {new Date(spell.dueDate).toLocaleDateString()}
                      </DueDate>
                    )}
                    <span>🕒 {new Date(spell.createdAt).toLocaleDateString()}</span>
                  </MetaInfo>
                </SpellInfo>
                <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                  <SpellStatus completed={spell.completed}>
                    {spell.completed ? '✓ EXECUTED' : '▶ PENDING'}
                  </SpellStatus>
                  <button
                    onClick={(e) => deleteSpell(spell.id, e)}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#ff8888',
                      fontSize: '1.2rem',
                      cursor: 'pointer',
                      padding: '4px 8px',
                      borderRadius: '30px'
                    }}
                    title="Delete spell"
                  >
                    🗑️
                  </button>
                </div>
              </SpellCard>
            ))
          )}
        </SpellGrid>

        {spells.length > 0 && (
          <StatsBar>
            <span>📊 Total: {stats.total} | ✅ Completed: {stats.completed} | ⏳ Pending: {stats.pending}</span>
            <span>⚡ High priority pending: {stats.highPriority}</span>
            {stats.completed > 0 && <ClearButton onClick={clearCompleted}>🧹 Clear Executed</ClearButton>}
          </StatsBar>
        )}

        <Footer>
          <span>💾 Local Enchantment — your data stays in your browser</span>
          <KartikeyaSoft>✨ KartikeyaSoft ✨</KartikeyaSoft>
        </Footer>
      </GlassCard>
    </Container>
  );
}

// Helper component for styled credit
const KartikeyaSoft = styled(Kartikeya)`
  font-size: 1rem;
  font-weight: 700;
`;

export default App;
