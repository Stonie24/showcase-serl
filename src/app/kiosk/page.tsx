"use client"
import React, { useState, useEffect } from 'react';
import { LoadSpinner } from '../components/Loadspinner';


export default function Home() {
    const [projects, setProjects] = useState<any[]>([]);
    const [currentProjectIndex, setCurrentProjectIndex] = useState(0);
    const [currentProjectUrl, setCurrentProjectUrl] = useState<string>("");
    const [loading, setLoading] = useState(true);
    
    const fetchProjects = async () => {
        try {
          const response = await fetch('/projects.json');
          if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
          }
          const data = await response.json();
          setProjects(data);
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

  useEffect(() => {
    const fullUrl = window.location.href;   // Full URL
    const pathname = window.location.pathname;
    const urlRouting = fullUrl.replace(pathname, '');

    console.log('Current URL:', urlRouting);
    setCurrentProjectUrl(urlRouting)
  }, []);

  useEffect(() => {
    if (projects.length > 0) {
      const rotationInterval = setInterval(() => {
        setCurrentProjectIndex((prevIndex) => (prevIndex + 1) % projects.length);
      }, 10000);
      return () => clearInterval(rotationInterval);
    }
  }, [projects]);

  if (loading) {
    return (
        <LoadSpinner/>
    );
}

  const handleImageError = (event: React.SyntheticEvent<HTMLImageElement, Event>) => {
    event.currentTarget.src = "https://media.istockphoto.com/id/1396814518/vector/image-coming-soon-no-photo-no-thumbnail-image-available-vector-illustration.jpg?s=612x612&w=0&k=20&c=hnh2OZgQGhf0b46-J2z7aHbIWwq8HNlSDaNp2wn_iko=" 
  };

  const project = projects[currentProjectIndex];


  return (
    <main className='flex min-h-screen flex-col items-center bg-white overflow-x-hidden '>
      <div className='kioskmode '>
        <div className='flex w-[86vw] justify-between'>
        <h1 className="text-center pt-8 text-3xl pb-8">{project.title}</h1>
        
        </div>
      
      <div className='flex gap-10'>      
        <div className='relative w-full max-w-sm mb-2 min-w-[400px] min-h-[400px]'>
        <img
            src={project.screenshots}
            alt={`Screenshot`}
            style={{ width: '400px', height: '400px' }}
            className='projectimage'
            onError={handleImageError} 
          />
        </div>

        <div className='flex flex-row justify-between w-[800px] h-[400px]'>
          <p className='descriptionlong'>{project.descriptionLong}</p>
          <div className='flex flex-col qrcode'>
          {/* <QRCodeComponent url={`https://www.youtube.com/watch?v=AFUgGZPNT-k`} size={128} /> */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${currentProjectUrl}/projects/${project.id}`}
            alt={`Screenshot`}
            style={{ width: '200px', height: '200px' }}
          />
          <div className='flex pt-2 justify-between'>
          <p className='pt-2 text-l' >Visit Detail Page</p>
           <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-500 mr-4 pl-4" // Adjust size and color
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
        >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 15l7-7 7 7" />
        </svg>
          </div>
          
          </div>
        </div>  
        
      </div>
      
      <div className="flex flex-wrap gap-2">
        {project.tags.map((tag, index) => (
          <span key={index} className="bg-gray-200 text-gray-800 text-sm font-medium py-1 px-2 rounded-full">
            {tag}
          </span>
        ))}
      </div>
      </div>
    </main>
    
  );
}