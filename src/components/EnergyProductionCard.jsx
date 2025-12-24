import { useState } from 'react';

const EnergyProductionCard = ({ day, date, production, hasAnomaly, anomalyReason }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className="relative group">
      <button
        className={`w-full text-left transition-all duration-300 ${isSelected ? "ring-2 ring-blue-500 ring-offset-2" : ""
          } border ${hasAnomaly
            ? "border-red-200 bg-red-50/30 hover:bg-red-50/50"
            : "border-gray-100 bg-white hover:border-blue-100 hover:bg-blue-50/10"
          } rounded-2xl overflow-hidden shadow-sm hover:shadow-md`}
        onClick={handleClick}
      >
        <div className="p-4 flex flex-col items-center gap-1">
          <span className={`text-xs font-bold uppercase tracking-wider ${hasAnomaly ? "text-red-400" : "text-gray-400"}`}>
            {day}
          </span>
          <span className="text-[10px] text-gray-400 font-medium">{date}</span>
        </div>

        <div className="px-4 pb-6 flex flex-col items-center">
          <span
            className={`text-3xl font-black tracking-tight ${hasAnomaly ? "text-red-600" : "text-blue-600"
              }`}
          >
            {production.toFixed(0)}
          </span>
          <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mt-1">kWh</span>
        </div>

        {hasAnomaly && (
          <div className="bg-red-500 text-white text-[9px] font-black uppercase tracking-tighter py-1 text-center">
            Anomaly
          </div>
        )}
      </button>

      {hasAnomaly && anomalyReason && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full w-48 p-2 bg-gray-900 text-white text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
          <div className="font-bold text-red-400 mb-1">Why is this an anomaly?</div>
          {anomalyReason}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-8 border-transparent border-t-gray-900"></div>
        </div>
      )}

      {hasAnomaly && (
        <div className="mt-2 text-center">
          <span className="text-[9px] font-bold text-red-500 uppercase tracking-widest">Below Average</span>
        </div>
      )}
    </div>
  );
};

export default EnergyProductionCard;
