import EnergyProductionCard from "./EnergyProductionCard.jsx";

const SolarEnergyProduction = () => {
  return (
    <section className="px-12 font-[Inter] py-6">
        <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">Solar Energy Production</h2>
      <p className="text-gray-600">Daily energy output for the past 7 days</p>
     </div>
     <div className="grid grid-cols-7 gap-4">
        <EnergyProductionCard day="Mon" date="Sep 09" production="45.2" />
        <EnergyProductionCard day="Tue" date="Sep 10" production="38.7" />
        <EnergyProductionCard day="Wed" date="Sep 11" production="52.3" />
        <EnergyProductionCard day="Thu" date="Sep 12" production="29.6" />
        <EnergyProductionCard day="Fri" date="Sep 13" production="47.8" />
        <EnergyProductionCard day="Sat" date="Sep 14" production="51.1" />
        <EnergyProductionCard day="Sun" date="Sep 15" production="33.4" />
     </div>
    </section>
  )
};

export default SolarEnergyProduction;
