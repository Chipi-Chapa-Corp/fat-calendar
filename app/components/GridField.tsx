type GridFieldProps = {
    type: "day";
    valid: boolean;
    dayNumber: number;
    monthIndex: number;
    year: number;
} | 
{
    type: "label";
    label: string;
} |
{
    type: "empty";
}

export function GridField(props: GridFieldProps) {
    const base = "flex border border-sky-600 w-full justify-center text-sky-600";

    const getIsWeekend = (monthIndex: number, dayNumber: number, year: number) => {
        const date = new Date(year, monthIndex, dayNumber);
        const dayOfWeek = date.getDay();
        return dayOfWeek === 0 || dayOfWeek === 6;
    };
    
    const dayStyles = () => {
        if (props.type !== "day") return "items-center bg-zinc-50";
        if (!props.valid) return "h-full bg-sky-600/30";
        return `h-full ${getIsWeekend(props.monthIndex, props.dayNumber, props.year) ? "bg-rose-600/10" : "bg-zinc-50"}`;
    };

    return <div className={`${base} ${dayStyles()}`}>
        {props.type === "day" && props.valid && (
            <div className="flex flex-col w-full h-full p-1">
                <textarea name="myInput" className="flex-1 w-full border-0 outline-none resize-none" />
            </div>
        )}
        {props.type === "label" && props.label}
    </div>;
}