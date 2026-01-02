"use client";

import { createContext, useState } from "react";

type SelectedDate = {
    day: number;
    month: number;
}

type ColorPickerContextType = {
    date: SelectedDate | null;
    setDate: (date: SelectedDate | null) => void;
};

export const ColorPickerContext = createContext<ColorPickerContextType | null>(null);

export const ColorPickerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [date, setDate] = useState<SelectedDate | null>(null);
    
    return (
        <ColorPickerContext.Provider value={{ date, setDate }}>
            {children}
        </ColorPickerContext.Provider>
    );
}