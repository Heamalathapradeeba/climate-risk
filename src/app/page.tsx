import Image from 'next/image'
import LocationMap from './components/map.js';
import 'bootstrap/dist/css/bootstrap.css';
import './components/map.css'
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
        <h3 className="w-full heading text-center p-4">Climate Risk Analysis</h3>
        <LocationMap />
    </main>
  )
}
