import { useState } from "react";

type ToolbarProps = {
    selectedColor: string | null;
    onSelectColor: (color: string) => void;
};

type SwatchProps = ToolbarProps & {
    color: string;
}

export function Toolbar(props: ToolbarProps) {
    const [color, setColor] = useState("#fff");
    return (
        <div
            className="relative z-10 flex items-center gap-2 p-2 bg-white border border-sky-600 rounded shadow"
            onMouseDown={(event) => event.preventDefault()}
        >
            {ColorSwatch({...props, color: "#FF0000"})}
            {ColorSwatch({...props, color: "#22C55E"})}
            {ColorSwatch({...props, color: "#3B82F6"})}
            <div className="relative flex items-center justify-center">
                <p className="absolute text-black">+</p>
                <input 
                    type="color" 
                    className="h-4 w-4 rounded"
                    value={color}
                    onChange={event => {
                        setColor(event.target.value);
                        props.onSelectColor(event.target.value);
                    }}
                    />
            </div>
        </div>
    );
}

function ColorSwatch(props: SwatchProps) {
    const isSelected = props.selectedColor === props.color;

    return (
        <button
            type="button"
            className={`h-4 w-4 rounded ${isSelected ? "ring-2 ring-sky-600 ring-offset-1" : ""}`}
            style={{ backgroundColor: props.color }}
            aria-pressed={isSelected}
            aria-label={`Set color ${props.color}`}
            onClick={() => props.onSelectColor(props.color)}
        />
    );
}
