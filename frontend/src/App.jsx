import { useState, useEffect } from 'react'
//import './App.css'

function App(){
  const [projects, setProjects] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('https://expert-space-barnacle-xjjp554wv4xh6xpg-5000.app.github.dev/api/projects');
        const result = await response.json();
        setProjects(result.data);
      } catch (error){
        console.error("Failed to fetch the error", error);
      }
    };
    fetchProjects();
  }, []);

  const handleAddLink = async (e) => {
    e.preventDefault();
    const newProjectData = {
      title: newTitle,
      url: newUrl
    };

    try {
      const response = await fetch('https://expert-space-barnacle-xjjp554wv4xh6xpg-5000.app.github.dev/api/projects', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProjectData)
      });
      
      const result = await response.json();

      if(response.ok){
        setProjects([...projects, result.data]);
        setNewTitle('');
        setNewUrl('');
      } 
    } catch (error) {
      console.error("Dailed to add new project: ", error);
    }
  };


  return (
    <div className='app-container'>
      <h1 className="text-4xl font-extrabold text-blue-600 mb-8">My LinkTree</h1>

      <form className="add-link-form" onSubmit={handleAddLink}>
        <input
          type="text"
          placeholder="Link Title (e.g. My Portfolio)"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
        />
        <input
          type="url"
          placeHolder="URL"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          required
        />
        <button type="submit">Add New Link</button>
      </form>

      <div className='links-list'>
        {projects.map((project) => (
        <a
          key={project._id}
          href={project.url}
          target="_blank"
          rel="noopener noreferrer"
          className="link-card"
        >
          {project.title}
        </a>
        ))}
      </div>
    </div>
  )
}

export default App;