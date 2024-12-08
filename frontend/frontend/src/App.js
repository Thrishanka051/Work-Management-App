import logo from './logo.svg';
import './App.css';
import ChallengeList from './Components/ChallengeList';
import AddChallenge from './Components/AddChallenge';
import 'bootstrap/dist/css/bootstrap.min.css';
import '@fortawesome/fontawesome-free/css/all.min.css';



function App() {
  return (
    <div className="container mt-5">
      <h1 className='text-center mb-4'>Monthly Challenges</h1>
      
      <ChallengeList/>
      
    </div>
  ); 
}

export default App;
