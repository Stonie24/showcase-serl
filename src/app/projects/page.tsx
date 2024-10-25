"use client";
import React, { useState, useEffect } from 'react';
import { SearchBar } from '../components/SearchBar';
import { Header } from '../components/Header';
import BackgroundImage from '../components/BackgroundImage';
import Dropdown from '../components/Dropdown';
import {LoadSpinner} from '../components/Loadspinner';


export default function Home() {
  const [numberOfMatches, setNumberOfMatches] = useState<number>(-1);
  const [filteredProjects, setFilteredProjects] = useState<any[]>([]);
  const [projects, setProjects] = useState<any[]>([]);
  const [firstSelection, setFirstSelection] = useState<string>('');
  const [secondSelection, setSecondSelection] = useState<string>('');
  const [tags, setTags] = useState<string[]>([]);
  const [type, setType] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);



  const fetchProjects = async () => {
    try {
      const response = await fetch('/projects.json');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      setProjects(data);

      // Set up the tags 
      const allTags = data.flatMap((project: any) => project.tags);
      const uniqueTags = Array.from(new Set(allTags)); 
      setTags(uniqueTags);

      // Set up project type
      const alltypes = data.flatMap((project: any) => project.type);
      const uniqueTypes = Array.from(new Set(alltypes)); 
      setType(uniqueTypes);

      //Removes the loading spinner 
      setLoading(false);

    } catch (error) {
      console.error('Error fetching projects data:', error);
    }
  };

  useEffect(() => {
    fetchProjects(); 
    const intervalId = setInterval(fetchProjects, 5 * 60 * 1000); 

    return () => clearInterval(intervalId);
  }, []);

  const handleSearch = (query: string ) => {

    if (query === "" && firstSelection && secondSelection) {
      const matches = projects.filter(project =>
        project.type === firstSelection &&
        project.tags.includes(secondSelection)
      );
      setNumberOfMatches(matches.length);
      setFilteredProjects(matches);
      console.log("doing tags and project type")
    } else if ( query === "" && !firstSelection && secondSelection){
      const matches = projects.filter(project =>  
        project.tags.includes(secondSelection)
      );
      setNumberOfMatches(matches.length);
      setFilteredProjects(matches);
      console.log("only tags")
    } else if ( query === "" && !secondSelection && firstSelection){
      const matches = projects.filter(project =>
        project.type === firstSelection
      );
      setNumberOfMatches(matches.length);
      setFilteredProjects(matches);
      console.log("only project type")
    } else if (query !== "" && !secondSelection && !firstSelection){
      const matches = projects.filter(project =>
        project.title.toLowerCase().includes(query.toLowerCase()) 
      );
      setNumberOfMatches(matches.length);
      setFilteredProjects(matches);
      console.log("doing only searchbar")
    } else if ( query !== "" && !secondSelection && firstSelection){
      const matches = projects.filter(project =>
        project.title.toLowerCase().includes(query.toLowerCase()) &&
        project.type === firstSelection 
      );
      setNumberOfMatches(matches.length);
      setFilteredProjects(matches);
      console.log(" searchbar and project type")
    }  else if ( query !== "" && secondSelection && !firstSelection){
      const matches = projects.filter(project =>
        project.title.toLowerCase().includes(query.toLowerCase()) &&
        project.tags.includes(secondSelection)
      );
      setNumberOfMatches(matches.length);
      setFilteredProjects(matches);
      console.log(" searchbar and project tags")
    }else if (query !== "" && secondSelection && firstSelection){
      const matches = projects.filter(project =>
        project.title.toLowerCase().includes(query.toLowerCase()) &&
        project.type === firstSelection &&
        project.tags.includes(secondSelection)
      );
      setNumberOfMatches(matches.length);
      setFilteredProjects(matches);
      console.log("testar för alla 3")
    } else {
      setNumberOfMatches(projects.length);
      setFilteredProjects(projects);
      console.log("testar alla ändå")
    }
     
    console.log(`Found ${filteredProjects.length} match(es)`);
 
  };

  useEffect(() => {
    if (projects.length > 0) {
      handleSearch('');
    }
  }, [projects]);

  const handleFirstDropdownChange = (value: string) => {
    setFirstSelection(value);
    // console.log(value)
  };

  const handleSecondDropdownChange = (value: string) => {
    setSecondSelection(value);
    // console.log(value)
  };

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=" 
  };
  
  if (loading) {
    return (
        <LoadSpinner/>
    );
}

  return (
    <main className='flex min-h-screen flex-col items-center bg-white'>
      <BackgroundImage/>
        <Header/>
      <div className='background-color'>

      <div  className='flex items-center gap-20 justify-center'>

      <Dropdown
        label="Project type"
        options={type}
        onSelect={handleFirstDropdownChange}
      />

      <Dropdown
        label="Tags"
        options={tags}
        onSelect={handleSecondDropdownChange}
      />

      <SearchBar
        onSearch={handleSearch}
        placeholder="Search projects..."
      />
      </div>
      {numberOfMatches > 0 && (
        <p className='matches'>Found {numberOfMatches} match(es)</p>
      )}

      {numberOfMatches === 0 && (
        <div className='flex flex-col items-center'>
        <h1> Could not find any projects that matches your requierments </h1>
        <img src="/image/no-results.png" alt="notfound" />
        </div>
      )}

      <div className='project-list'>
        {filteredProjects.map(project => (
          <div key={project.title} className='project-display'>
            
            <h2 className='text-xl font-bold'>{project.title}</h2>
            <div className='infobox'>
            <div>
                {project.screenshots.map((url, index) => (
                    <div key={index} className='relative w-full max-w-sm mb-2'>
                    <img
                        src={url}
                        alt={`Screenshot ${index + 1}`}
                        style={{ width: '200px', height: '200px' }}
                        className='projectimage'
                        onError={handleImageError} 
                    />
                    </div>
                ))}
            </div>
            <p className='description'>{project.description}</p>
            <p className='font-semibold owner'>Owner: {project.project.owner}</p>
            <p className='font-semibold tags'> #{project.tags.join(' #')}</p>
            <a href={`/projects/${project.id}`} target="_blank" rel="noopener noreferrer" className='text-blue-500 hover:underline'>
              More info
            </a>
            </div>
            
            

          </div>
        ))}
      </div>
      </div>
    </main>
  );
}
