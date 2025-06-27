import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './components/Card'

const financeCards = [
  {
    question: "What is a stock?",
    answer: "represents ownership in a company and a claim on a part of its assets and earnings",
    difficulty: "easy",
    keywords: ["ownership", "company", "assets", "earnings"]
  },
  {
    question: "What does ROI stand for?",
    answer: "Return on Investment",
    difficulty: "easy",
    keywords: ["return", "investment"]
  },
  {
    question: "What is a bond?",
    answer: "A bond is a fixed-income instrument that represents a loan made by an investor to a borrower.",
    difficulty: "medium",
    keywords: ["loan", "fixed-income", "investor", "borrower"]
  },
  {
    question: "What is the S&P 500?",
    answer: "A stock market index tracking the performance of 500 large companies listed on U.S. stock exchanges.",
    difficulty: "hard",
    keywords: ["index", "stock", "500", "companies", "performance"]
  },
  {
    question: "What is compound interest?",
    answer: "Interest calculated on the initial principal and also on the accumulated interest from previous periods.",
    difficulty: "easy",
    keywords: ["interest", "principal", "accumulated"]
  },
  {
    question: "What is diversification?",
    answer: "A risk management strategy that mixes a wide variety of investments within a portfolio.",
    difficulty: "medium",
    keywords: ["risk", "variety", "portfolio", "invest"]
  },
  {
    question: "What is a mutual fund?",
    answer: "An investment vehicle that pools money from many investors to purchase securities.",
    difficulty: "easy",
    keywords: ["investment", "pool", "investors", "securities"]
  },
  {
    question: "What does inflation mean?",
    answer: "The rate at which the general level of prices for goods and services is rising, decreasing purchasing power.",
    difficulty: "medium",
    keywords: ["prices", "services", "rising", "purchasing power"]
  },
  {
    question: "What is a 401(k)?",
    answer: "A retirement savings plan offered by employers that allows employees to invest a portion of their paycheck before taxes.",
    difficulty: "easy",
    keywords: ["retirement", "savings", "employers", "paycheck"]
  },
  {
    question: "What is a budget?",
    answer: "A budget is a financial plan that helps track income and expenses to manage spending and save money.",
    difficulty: "easy",
    keywords: ["plan", "income", "expenses", "spending", "save"]
  }
];



function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleRandom = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * financeCards.length);
    } while (randomIndex === currentIndex); // prevent showing same card
    
    setCurrentIndex(randomIndex);
    reset();
    setIsFlipped(false);
  };

  const currentCard = financeCards[currentIndex];

  const handleNext = () => {
    if (currentIndex < financeCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      
    }
    reset();
    setIsFlipped(false);
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      
    }
    reset();
    setIsFlipped(false);
  };

  const reset = () => {
    setUserGuess('');
    setFeedback(null);
  };

  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct' | 'wrong' | null

  const handleSubmit = () => {
    const guess = userGuess.trim().toLowerCase();
    const answer = currentCard.answer.toLowerCase();
    const keywords = currentCard.keywords || [];

    const isFullMatch = guess === answer;

    const containsKeywords = keywords.every((keyword) => guess.includes(keyword));

    if (feedback === 'correct') return;

    if (isFullMatch || containsKeywords) {
      setScore(score + 1);
      const newScore = score + 1;
      setHighestStreak(Math.max(highestStreak, newScore));
      setFeedback('correct');
    } else {
      setScore(0);
      setFeedback('wrong');
    }
  };

  const [score, setScore] = useState(0);
  const [highestStreak, setHighestStreak] = useState(0);


  return (
    <div style={{ textAlign: 'center', color: 'white' }}>
      <h1 style={{ fontSize: '2rem', marginBottom: '0.5rem' }}>Finance Flashcards</h1>

      <h2 style={{ fontWeight: 'normal', fontSize: '1.1rem', color: '#e5e7eb' }}>
        How well do you really understand the basics of personal finance?
      </h2>

      <div style={{ marginBottom: '10px' }}>
        <strong>Score:</strong> {score} | 
        <strong> Highest Streak:</strong> {highestStreak}
      </div>

      <Card
        question={currentCard.question}
        answer={currentCard.answer}
        difficulty={currentCard.difficulty}
        isFlipped={isFlipped}
        setIsFlipped={setIsFlipped}
      />
      
      <div>
        
        <input
          type="text"
          value={userGuess}
          onChange={(e) => setUserGuess(e.target.value)}
          placeholder="Type your answer"
        />
        <br /><br />
        <button onClick={handleSubmit}>Submit</button>

        {feedback === 'correct' && <p style={{ color: 'green' }}>✅ Correct!</p>}
        {feedback === 'wrong' && <p style={{ color: 'red' }}>❌ Try again!</p>}

      </div>

      <div style={{ marginTop: '30px', display: 'flex', justifyContent: 'center', gap: '10px' }}>
        <button
          onClick={handlePrev}
          disabled={currentIndex === 0}
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: currentIndex === 0 ? '#d1d5db' : '#10b981',
            color: 'white',
            cursor: currentIndex === 0 ? 'default' : 'pointer'
          }}
        >
          Back
        </button>

        <button
          onClick={handleRandom}
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: '#3b82f6',
            color: 'white',
            cursor: 'pointer'
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = '#2563eb')}
          onMouseOut={(e) => (e.target.style.backgroundColor = '#3b82f6')}
        >
          Random
        </button>

        <button
          onClick={handleNext}
          disabled={currentIndex === financeCards.length - 1}
          style={{
            padding: '10px 20px',
            fontSize: '1rem',
            borderRadius: '6px',
            border: 'none',
            backgroundColor: currentIndex === financeCards.length - 1 ? '#d1d5db' : '#f59e0b',
            color: 'white',
            cursor: currentIndex === financeCards.length - 1 ? 'default' : 'pointer'
          }}
        >
          Next
        </button>
      </div>

      <p style={{ marginTop: '20px', fontStyle: 'italic', fontSize: '0.95rem' }}>
        Card {currentIndex + 1} of {financeCards.length}     
      </p>
    </div>
  );


}

export default App;
