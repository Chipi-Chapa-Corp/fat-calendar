"use client";

import { useState } from "react";
import { Toolbar } from "./Toolbar";

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
    const [isSelected, setIsSelected] = useState(false);
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
                className="flex-1 w-full border border-transparent outline-none resize-none focus:border-rose-600 focus:border-2" 
                style={selectedColor ? { backgroundColor: selectedColor } : undefined}
                onFocus={() => setIsSelected(true)}
                onBlur={() => setIsSelected(false)}
                />
            </div>
        )}
        {props.type === "label" && props.label}
        {isSelected && props.type === "day" && props.valid && (
            <div className="absolute left-1/2 -translate-x-1/2 top-0 -translate-y-full">
                <Toolbar
                    selectedColor={selectedColor ? colorKeyFromValue(selectedColor) : null}
                    onSelectColor={(color) => setSelectedColor(colorValueFromKey(color))}
                />
            </div>

        )}
    </div>;
}

function colorValueFromKey(color: "red" | "green" | "blue") {
    return {
        red: "#ef4444",
        green: "#22c55e",
        blue: "#3b82f6",
    }[color];
}

function colorKeyFromValue(value: string) {
    if (value === "#ef4444") return "red";
    if (value === "#22c55e") return "green";
    return "blue";
}
