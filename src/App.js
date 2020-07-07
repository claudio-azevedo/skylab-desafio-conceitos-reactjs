import React, {useState, useEffect} from "react";

import "./styles.css";
import api from "./services/api";

function App() {
  const [ repositories, setRepository] = useState([]);

  useEffect(() => {
    api.get('/repositories').then(response =>{
      setRepository(response.data);
    }
    );
  },[]); 
  
  async function handleAddRepository() {
    try{
      const date = new Date().toLocaleString();
      const addRepository = {
        title : `Repositorio ${date}`,
	      url : "https://google.com",
	      techs : ["React", "NodeJS", "React-Native"]
      }
      await api.post('/repositories', addRepository).then(
        response => {
          setRepository([...repositories, response.data])
        }
      );
    } catch (err) {
      console.log(err);
    }
  }

  async function handleRemoveRepository(id) {
    console.log(id);
    await api.delete(`/repositories/${id}`);
    const newRepositories = repositories.filter( repository => repository.id !== id);
    setRepository(newRepositories);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories &&
        repositories.map(repository => (
          <span key={repository.id}>
            <li>{repository.title}</li>
            <button onClick={() => handleRemoveRepository(repository.id)}>
            Remover
            </button>
          </span>
        ))}
      </ul>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
