"use client";

import { useContext, useEffect, useState } from "react";
import { Toolbar } from "./Toolbar";
import { ColorPickerContext } from "../providers/ColorPickerProvider";

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
    const {date, setDate} = useContext(ColorPickerContext)!;
    const base = "flex border border-sky-600 w-full justify-center text-sky-600";
    const [selectedColor, setSelectedColor] = useState<null | string>(null);

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

    return <div className={`${base} ${dayStyles()} relative`}>
        {props.type === "day" && props.valid && (
            <div className="flex flex-col w-full h-full">
                <textarea 
                name="myInput" 
                className="flex-1 w-full border border-transparent outline-none resize-none focus:border-rose-600 focus:border-2 text-black" 
                style={selectedColor ? { backgroundColor: selectedColor } : undefined}
                onClick={() => setDate({ day: props.dayNumber, month: props.monthIndex })}
                />
            </div>
        )}
        {props.type === "label" && props.label}
        {props.type === "day" && date?.day === props.dayNumber && date?.month === props.monthIndex && props.valid && (
            <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-full">
                <Toolbar
                    selectedColor={selectedColor}
                    onSelectColor={(color) => setSelectedColor(color)}
                />
            </div>
        )}
    </div>;
}