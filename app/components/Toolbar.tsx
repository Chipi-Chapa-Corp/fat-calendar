import { useContext, useEffect, useState } from "react";
import { ColorPickerContext } from "../providers/ColorPickerProvider";

type ToolbarProps = {
	selectedColor: string | null;
	onSelectColor: (color: string | null) => void;
};

type SwatchProps = ToolbarProps & {
	color: string;
};

export function Toolbar(props: ToolbarProps) {
	const [color, setColor] = useState("#fff");
	const { setDate } = useContext(ColorPickerContext)!;

	useEffect(() => {
		const callback = (event: MouseEvent) => {
			const target = event.target as HTMLElement;
			if (target.closest(".color-select")) return;
			setDate(null);
		};
		document.addEventListener("click", callback);
		return () => document.removeEventListener("click", callback);
	}, [setDate]);

	return (
		<div className="color-select relative z-10 flex items-center gap-2 p-2 bg-white border border-sky-600 rounded shadow">
			{ColorSwatch({ ...props, color: "#FF0000" })}
			{ColorSwatch({ ...props, color: "#22C55E" })}
			{ColorSwatch({ ...props, color: "#3B82F6" })}
			<div className="relative flex items-center justify-center">
				<p className="absolute text-black pointer-events-none">+</p>
				<input
					type="color"
					className="cursor-pointer h-4 w-4 rounded border border-gray-300 [&::-moz-color-swatch]:border-none [&::-webkit-color-swatch]:border-none"
					value={color}
					onChange={(event) => {
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
			className={`cursor-pointer h-4 w-4 rounded ${isSelected ? "ring-2 ring-sky-600 ring-offset-1" : ""}`}
			style={{ backgroundColor: props.color }}
			aria-pressed={isSelected}
			aria-label={`Set color ${props.color}`}
			onClick={() => {
				props.onSelectColor(props.color);
			}}
		/>
	);
}
