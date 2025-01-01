import axios from "axios";
import { useEffect, useState } from "react"
import AddChallenge from "./AddChallenge";

export default function ChallengeList(){
    const [challenges, setChallenges] = useState([]);
    const [editId, setEditId] = useState(null);
    const [editMonth, setEditMonth] = useState('');
    const [editDescription, setEditDescription] = useState('');
    
    useEffect(()=>{
        fetchChallenge();
    }, [])

    const fetchChallenge = async () =>{
        try {
           const response= await axios.get('http://localhost:8080/challenges');
           setChallenges(response.data);
        } catch (error) {
            console.error('error fetching data', error);
        }
    } 

    const deleteChallenge = async (id) => {
        try {
          await axios.delete(`http://localhost:8080/challenges/${id}`);
          fetchChallenge();
        } catch (error) {
          console.error('Error deleting challenge:', error);
        }
      };

      const startEditing = (challenge) => {
        setEditId(challenge.id);
        setEditMonth(challenge.month);
        setEditDescription(challenge.description);
      };

      const saveChallenge = async (id) => {
        try {
          const updatedChallenge = { month: editMonth, description: editDescription };
          await axios.put(`http://localhost:8080/challenges/${id}`, updatedChallenge);
          setEditId(null);
          fetchChallenge();
        } catch (error) {
          console.error('Error updating challenge:', error);
        }
      };



    return(
        
        <div>
            <div>
                <AddChallenge fetchChallenge={fetchChallenge}/>
            </div >
            <div className="list-group my-5" > 
            
            {challenges.map (challenge => (
                <a href="#" class="list-group-item list-group-item-action "  style={{ cursor: 'default' }} aria-current="true">
                <div key={challenge.id} class="d-flex w-100 justify-content-between">

                {editId === challenge.id ? (
                <>
                  <input
                    type="text"
                    value={editMonth}
                    onChange={(e) => setEditMonth(e.target.value)}
                    className="form-control me-3"
                  />
                  <input
                    type="text"
                    value={editDescription}
                    onChange={(e) => setEditDescription(e.target.value)}
                    className="form-control me-3"
                  />
                  <i className="fas fa-check custom-hover-effect" onClick={() => saveChallenge(challenge.id)} style={{ cursor: 'pointer' }}/>
                </>
              ) :(
                <>
                    <h5 className="mb-1">{challenge.month}</h5>
                    <div>
                    {/*When editId, editMonth, or editDescription change, the entire component re-renders(all the return part execute). then if editId === challenge.id this true
                    it renders the input fields. so only editing massege will display the input fields.  all the challenges are re render but dom identify the
                    updated status and React updates only the parts of the DOM that actually need to change, ensuring efficient performance even
                     when the entire component re-renders.*/}
                    <i className="fas fa-edit me-3 custom-hover-effect" onClick={() => startEditing(challenge)} style={{ cursor: 'pointer' }}/>
                    <i className="fas fa-trash custom-hover-effect" onClick={() => deleteChallenge(challenge.id)}style={{ cursor: 'pointer' }}/>
                  </div>
                  </>
                )}
                </div>
                {editId !== challenge.id && <p className="mb-1">{challenge.description}</p>}
                </a>
            )) }
            
            </div>
        </div>
    )
}