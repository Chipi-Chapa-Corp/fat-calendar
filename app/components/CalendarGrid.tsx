import { ColorPickerProvider } from "../providers/ColorPickerProvider";
import { GridField } from "./GridField";

type CalendarGridProps = {
	year: number;
};

export default function CalendarGrid(props: CalendarGridProps) {
	const days = Array.from({ length: 31 }, (_, i) => i + 1);
	const months = [
		"Jan",
		"Feb",
		"Mar",
		"Apr",
		"May",
		"Jun",
		"Jul",
		"Aug",
		"Sep",
		"Oct",
		"Nov",
		"Dec",
	];

	const getDaysInMonth = (monthIndex: number, year: number): number => {
		return new Date(year, monthIndex + 1, 0).getDate();
	};

	return (
		<ColorPickerProvider>
			<div
				className="
          flex-1
          w-full h-full rounded
          grid
          grid-rows-13
          grid-cols-32
          "
			>
				<GridField type="empty" />
				{days.map((day) => (
					<GridField key={`day-${day}`} type="label" label={String(day)} />
				))}

				{months.map((month, i) => {
					const daysInMonth = getDaysInMonth(i, props.year);
					return (
						<div key={`row-${month}`} className="contents">
							<GridField type="label" label={month} />

							{Array.from({ length: 31 }).map((_, day) => (
								<GridField
									// biome-ignore lint/suspicious/noArrayIndexKey: never changes
									key={`cell-${month}-${day}`}
									type="day"
									valid={day + 1 <= daysInMonth}
									dayNumber={day + 1}
									monthIndex={i}
									year={props.year}
								/>
							))}
						</div>
					);
				})}
			</div>
		</ColorPickerProvider>
	);
}
