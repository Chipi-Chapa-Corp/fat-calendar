import { GridField } from "./GridField";

type CalendarGridProps = {
    year: number;
};

export default function CalendarGrid(props: CalendarGridProps) {
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const months = [
    "Jan","Feb","Mar","Apr","May","Jun",
    "Jul","Aug","Sep","Oct","Nov","Dec"
  ];

  const getDaysInMonth = (monthIndex: number, year: number): number => {
    return new Date(year, monthIndex + 1, 0).getDate();
  };

  return (
      <div className="
        flex-1
        w-full h-full rounded
        grid
        grid-rows-13
        grid-cols-32
      ">

        <GridField type="empty" />
        {days.map(day => (
          <GridField key={`day-${day}`} type="label" label={String(day)} />
        ))}

        {months.map((month, i) => {
          const daysInMonth = getDaysInMonth(i, props.year);
          return (
            <div key={`row-${i}`} className="contents"> 
                
              <GridField type="label" label={month} />

              {Array.from({ length: 31 }).map((_, j) => (
                <GridField key={`cell-${i}-${j}`} 
                    type="day" 
                    valid={j + 1 <= daysInMonth} 
                    dayNumber={j + 1} 
                    monthIndex={i} 
                    year={props.year}/>
              ))}

            </div>
          );
        })}
      </div>
  );
}
