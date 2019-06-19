import React, { useState, useEffect } from 'react';

export default function App() {
  const [repositories, setRepositories] = useState([]);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(async () => {
   const response = await fetch('https://api.github.com/users/MiguelSilva9910/repos');
   const data = await response.json();

   setRepositories(data);
  }, []);

  useEffect(() => {
    const filtered = repositories.filter(repo => repo.like);

    document.title = `Tu tens ${filtered.length} likes`;
  }, [repositories]);

  function handleLike(id) {
    const newRepositories = repositories.map(repo => {
      return repo.id === id ? { ...repo, like: !repo.like } : repo
    });

    setRepositories(newRepositories);
  };

  return (
      <ul>
        {repositories.map(repo => (
          <li key={repo.id}>
            {repo.name}
            {repo.like && <span>(Like)</span>}
            <button onClick={() => handleLike(repo.id)}>Like</button>
          </li>
        ))}
      </ul>
  )
};