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

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`https://expert-space-barnacle-xjjp554wv4xh6xpg-5000.app.github.dev/api/projects/${id}`, {
        method: 'DELETE',
      });
      if(Response.ok){
        setProjects(projects.filter((project) => project._id !== id));
      }
    } catch (error) {
      console.error("Failed to delete project: ", error);
    }
  };

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col items-center p-6 font-sans'>
      <div className="flex flex-col items-center mt-12 mb-8">
        <img 
          src="https://github.com/SohamX05.png"
          alt="Profile"
          className="w-28 h-28 rounded-full shadow-xl border-4 border-white object-cover"
        />
        <h1 className="mt-4 text-3xl font-extrabold text-gray-900 tracking-tight">Soham</h1>
        <p className="text-blue-600 font-semibold tracking-wide">@SohamX05</p>
        <p className="mt-3 text-center text-gray-600 max-w-sm leading-relaxed">
        Full Stack Developer || CSE || AI Developer, Java & MERN Stack. Welcome to My Portfolio
        </p>
      </div>
      <form 
        onSubmit={handleAddLink}
        className="flex flex-col gap-4 w-full max-w-md bg-white p-6 rounded-2xl shadow-sm border border-gray-200 mb-8"  
      >
        <input
          type="text"
          placeholder="Link Title (e.g. My Portfolio)"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <input
          type="url"
          placeholder="URL"
          value={newUrl}
          onChange={(e) => setNewUrl(e.target.value)}
          required
          className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
        />
        <button 
          type="submit"
          className="w-full py-3 mt-2 bg-black text-white font-bold rounded-xl hover:bg-gray-800 transition-all active:scale-95 shadow-md"  
        >
        Add New Link</button>
      </form>

      <div className='w-full max-w-md flex flex-col gap-4 mb-12'>
        {projects.map((project) => (
          <div key={project._id} className="flex items-center gap-3 w-full">
            <a
            href={project.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-grow py-4 px-6 bg-emerald-500 hover:bg-emerald-600 text-black font-bold text-center text-lg rounded-xl shadow-md transition-all hover:scale-105 active:scale-95"            >
              {project.title}
            </a>
            <button
              onClick={() => handleDelete(project._id)}
              className="flex-shrink-0 flex items-center justify-center w-[60px] h-[60px] bg-red-100 text-red-600 hover:bg-red-500 hover:text-white rounded-xl shadow-md transition-all active:scale-95 text-2xl"
              title="Delete Link"
            >
              🗑️
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App;