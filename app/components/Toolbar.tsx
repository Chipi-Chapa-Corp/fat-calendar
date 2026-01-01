type ToolbarProps = {
    colorKey: ColorKey;
    selectedColor: ColorKey | null;
    onSelectColor: (color: ColorKey) => void;
};

type ColorKey = "red" | "green" | "blue";

export function Toolbar(props: Omit<ToolbarProps, "colorKey">) {
    return (
        <div
            className="relative z-10 flex items-center gap-2 p-2 bg-white border border-sky-600 rounded shadow"
            onMouseDown={(event) => event.preventDefault()}
        >
            {ColorSwatch({...props, colorKey: "red"})}
            {ColorSwatch({...props, colorKey: "green"})}
            {ColorSwatch({...props, colorKey: "blue"})}
        </div>
    );
}

function ColorSwatch(props: ToolbarProps) {
    const swatchClass = {
        red: "bg-red-500",
        green: "bg-green-500",
        blue: "bg-blue-500",
    }[props.colorKey];
    const isSelected = props.selectedColor === props.colorKey;

    return (
        <button
            type="button"
            className={`h-4 w-4 rounded ${swatchClass} ${isSelected ? "ring-2 ring-sky-600 ring-offset-1" : ""}`}
            aria-pressed={isSelected}
            aria-label={`Set color ${props.colorKey}`}
            onClick={() => props.onSelectColor(props.colorKey)}
        />
    );
}
