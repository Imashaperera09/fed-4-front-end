import EnergyProductionCard from "./EnergyProductionCard.jsx";

const SolarEnergyProduction = () => {
  const energyProductionData = [
    { day: "Mon", date: "Aug 18", production: 34.1, hasAnomaly: false },
    { day: "Tue", date: "Aug 19", production: 3.2, hasAnomaly: true},
    { day: "Wed", date: "Aug 20", production: 44.7, hasAnomaly: false },
    { day: "Thu", date: "Aug 21", production: 21.9, hasAnomaly: false },
    { day: "Fri", date: "Aug 22", production: 47.2, hasAnomaly: false },
    { day: "Sat", date: "Aug 23", production: 43, hasAnomaly: false },
    { day: "Sun", date: "Aug 24", production: 26.8, hasAnomaly: false },
  ];

  return (
    <section className="px-12 font-[Inter] py-6">
        <div className="mb-6">
      <h2 className="text-2xl font-bold mb-2">Solar Energy Production</h2>
      <p className="text-gray-600">Daily energy output for the past 7 days</p>
     </div>
     <div className="grid grid-cols-7 gap-4">
       {energyProductionData.map((el) => {
          return (
          <EnergyProductionCard 
          key={el.date}  // unique key for each card
           day={el.day} 
           date={el.date}
            production={el.production} 
            hasAnomaly={el.hasAnomaly}
            />
          );
       })}
     </div>
    </section>
  )
};

export default SolarEnergyProduction;
