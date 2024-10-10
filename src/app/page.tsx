"use client";
import { Header } from './components/Header';
import BackgroundImage from '../app/components/BackgroundImage';
import Flashlight from './components/Flashlight';
import BasicExample from '../app/components/Carusel'; // Corrected import
import 'bootstrap/dist/css/bootstrap.min.css';

export default function Home() {
  return (
    <main className='flex min-h-screen flex-col items-center bg-white min-w-screen-80'>
      <BackgroundImage />
      <Header />
      <div className='homepage'>
        <div className='background-color'>
          <h1 className='ladningpageh1 font-mono text-2xl'>Let us Showcase your inspiration</h1>
        </div>
        <BasicExample />
      </div>
      <footer className='row-start-3 flex flex-wrap items-center justify-center gap-6'>
        <p>This is a project made by William Steqvist</p>
      </footer>
    </main>
  );
}
