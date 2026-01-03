import CalendarGrid from "./components/CalendarGrid";

export default function Home() {
	const year = new Date().getFullYear();
	return (
		<div className="flex flex-col min-w-screen min-h-screen items-center justify-center bg-zinc-50 font-sans pt-4 gap-4">
			<h1 className="text-4xl font-bold text-sky-600">
				{`Fat Year Calendar ${year}`}
			</h1>
			<CalendarGrid year={year} />
		</div>
	);
}
