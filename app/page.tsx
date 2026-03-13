import CompanionCard from '@/components/CompanionCard';
import CompanionsList from '@/components/CompanionsList';
import CTA from '@/components/CTA';
import { recentSessions } from '@/constants';

const Page = () => {
  return (
    <main>
      
      <h1>Popular Companion</h1>
     <section className="home-section">
        <CompanionCard
            id="123"
            name="Neuriko the Brain Explorer"
            topic="Neuroscience and Brain Research"
            subject="Neuroscience"
            duration={45}
            color="#00F5D4"
        />
        <CompanionCard
            id="326"
            name="Aria the Quantum Physicist"
            topic="Quantum Mechanics and Particle Physics"
            subject="Physics"
            duration={30}
            color="#2D6A6A"
        />
          <CompanionCard
            id="456"
            name="Joram the Biology Master"
            topic="Biology for Teens"
            subject="Biology"
            duration={35}
            color="#94FBAB"
        />
     </section>
     <section className="home-section">
      <CompanionsList
      title="Recently Completed Sessions"
      companions={recentSessions}
      classNames="w-2/3 max-lg:w-full"/>
      <CTA/>
     </section>
     
    </main>
  )
}

export default Page