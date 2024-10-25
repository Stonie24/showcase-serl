import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import BackgroundImage from '@/app/components/BackgroundImage';



export async function generateStaticParams() {
  const filePath = path.join(process.cwd(), 'public', 'projects.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const projects = JSON.parse(fileContents);
  
  
  // Generate paths for each project ID
  return projects.map((project: any) => ({
    id: project.id.toString(),
  }));
}

export default async function Page({ params }: { params: { id: string } }) {
  const { id } = params;

  // Fetch projects data
  const filePath = path.join(process.cwd(), 'public', 'projects.json');
  const fileContents = fs.readFileSync(filePath, 'utf8');
  const projects = JSON.parse(fileContents);

  const project = projects.find((project: any) => project.id === id);
  console.log(project.urlToHomepage + "um");
  
  if (!project) {
    notFound();
  }

  
  return (
    <main className='flex min-h-screen flex-col items-center bg-white overflow-x-hidden '>
      <BackgroundImage/>
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
          />
        </div>

        <div className='flex flex-row justify-between w-[800px] h-[400px]'>
          <p className='descriptionlong'>{project.descriptionLong}</p>
          <div className='flex flex-col qrcode'>
          {/* <QRCodeComponent url={`https://www.youtube.com/watch?v=AFUgGZPNT-k`} size={128} /> */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=/projects/${id}`}
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
