import fs from 'fs';
import path from 'path';
import { notFound } from 'next/navigation';
import { Header } from '@/app/components/Header';
import BackgroundImage from '@/app/components/BackgroundImage';
import { useQRCode } from 'next-qrcode';


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
    <main className='flex min-h-screen flex-col items-center bg-white'>
      <BackgroundImage/>
      <Header/>
      <div className='detailpage'>
        <div className='flex w-[66vw] justify-between'>
          <p></p>
        <h1 className="text-center pt-8 text-3xl pb-8">{project.title}</h1>
        <a
          href={project.urlToHomepage}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center bg-blue-500 text-white text-sm font-medium py-2 px-4 rounded hover:bg-blue-600 transition-colors duration-200 h-[65px] mt-5"
        >
          Visit Homepage
          <svg
            className="w-4 h-4 ml-2"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M10 6l6 6-6 6"
            />
          </svg>
        </a>

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

        <div className='flex flex-col justify-between w-[600px] h-[400px]'>
          <p>{project.descriptionLong}</p>
          <div className='flex flex-row justify-end'>
          {/* <QRCodeComponent url={`https://www.youtube.com/watch?v=AFUgGZPNT-k`} size={128} /> */}
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${project.urlToHomepage}`}
            alt={`Screenshot`}
            style={{ width: '125px', height: '125px' }}
          />
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

      
    <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
    <p>This is a project made by William Steqvist</p>
    </footer>
    </main>
    
  );
}
