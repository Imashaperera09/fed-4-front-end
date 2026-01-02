import { useState } from 'react';

const EnergyProductionCard = ({ day, date, production, hasAnomaly, anomalyReason }) => {
  const [isSelected, setIsSelected] = useState(false);

  const handleClick = () => {
    setIsSelected(!isSelected);
  };

  return (
    <div className="relative group">
      <button
        className={`w-full text-left transition-all duration-300 ${isSelected ? "ring-2 ring-primary ring-offset-2" : ""
          } border ${hasAnomaly
            ? "border-destructive/20 bg-destructive/10 hover:bg-destructive/20"
            : "border-border bg-card hover:border-primary/30 hover:bg-primary/5"
          } rounded-2xl overflow-hidden shadow-sm hover:shadow-md`}
        onClick={handleClick}
      >
        <div className="p-4 flex flex-col items-center gap-1">
          <span className={`text-xs font-bold uppercase tracking-wider ${hasAnomaly ? "text-destructive/80" : "text-muted-foreground"}`}>
            {day}
          </span>
          <span className="text-[10px] text-muted-foreground font-medium">{date}</span>
        </div>

        <div className="px-4 pb-6 flex flex-col items-center">
          <span
            className={`text-3xl font-black tracking-tight ${hasAnomaly ? "text-destructive" : "text-primary"
              }`}
          >
            {production.toFixed(0)}
          </span>
          <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest mt-1">kWh</span>
        </div>

        {hasAnomaly && (
          <div className="bg-destructive text-destructive-foreground text-[9px] font-black uppercase tracking-tighter py-1 text-center">
            Anomaly
          </div>
        )}
      </button>

      {hasAnomaly && anomalyReason && (
        <div className="absolute -top-2 left-1/2 -translate-x-1/2 -translate-y-full w-48 p-2 bg-popover text-popover-foreground border border-border text-[10px] rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10 shadow-xl">
          <div className="font-bold text-destructive mb-1">Why is this an anomaly?</div>
          {anomalyReason}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-full border-8 border-transparent border-t-popover"></div>
        </div>
      )}

      {hasAnomaly && (
        <div className="mt-2 text-center">
          <span className="text-[9px] font-bold text-destructive uppercase tracking-widest">Below Average</span>
        </div>
      )}
    </div>
  );
};

export default EnergyProductionCard;
