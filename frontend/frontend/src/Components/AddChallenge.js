import axios from "axios";
import { useState } from "react"

const months = [
    "January", "February", "March", "April", "May", "June", 
    "July", "August", "September", "October", "November", "December"
  ];

export default function AddChallenge({fetchChallenge}){
    const [month, setMonth] = useState("");
    const [description, setDescription] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const newChallenge = {  month, description };
          const response = await axios.post('http://backend:8080/challenges', newChallenge);
          console.log('Student added successfully:', response.data);
          // Reset form fields after successful submission
          setMonth('');
          setDescription('');
          fetchChallenge();
        } catch (error) {
          console.error('Error adding student:', error);
        }
      };



    return(
        <div className="card">
            <div class="card-header">
                Add a Challenge
            </div>
            <div className="card-boady m-3">
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                <label htmlFor="month" className="form-lable">Month</label>
                <select className="form-select" id="month" value={month} onChange={(e) => setMonth(e.target.value)} required>
                    <option value="" disabled>Select a month</option>
                    {months.map((month, index) => (
                        <option key={index} value={month}>{month}</option>
                    ))}
                </select>
                </div>
                <div className="mb-3">
                <label className="form-lable" htmlFor="description">Description</label>
                <input className="form-control " type="textarea" value={description} id="description"  onChange={(e) => setDescription(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">Add Challenge</button>
            </form>
            </div>
        </div>
    )

}