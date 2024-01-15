import "./app.css";

type Day = {
	name: {
		short: string;
		long: string;
	};
	date: number;
};

type Month = {
	name: string;
	days: Array<Day>;
};

type Calendar = {
	year: number;
	months: Array<Month>;
};

type Calendars = Array<Calendar>;

const generateCalendar = (year: number): Calendar => {
	const date = new Date(year);
	const months: Array<Month> = [];

	for (let i = 0; i < 12; i++) {
		const days = [];
		const monthname = date.toLocaleString("default", { month: "long" });

		while (date.getMonth() === i) {
			const current = date.getDate();
			days.push({
				name: {
					short: date.toLocaleString("default", { weekday: "short" }),
					long: date.toLocaleString("default", { weekday: "long" }),
				},
				date: current,
			});
			date.setDate(current + 1);
		}

		months.push({ name: monthname, days });
	}

	return { year, months };
};

const narrowDays = {
	Sun: "Su",
	Mon: "Mo",
	Tue: "Tu",
	Wed: "We",
	Thu: "Th",
	Fri: "Fr",
	Sat: "Sa",
};

type ShortDays = keyof typeof narrowDays;

function App() {
	const year = new Date().getFullYear();
	const calendar = generateCalendar(year);

	return (
		<div className="grid grid-cols-[repeat(auto-fill,_minmax(180px,_1fr))]">
			{calendar.months.map((month) => (
				<>
					<div
						className="p-2 bg-slate-950 text-slate-50 col-span-2 flex items-center justify-center"
						key={month.name}
					>
						<h3 className="text-7xl font-bold">{month.name}</h3>
					</div>
					{month.days.map((day) => (
						<div
							className="h-fit border border-slate-950 border-collapse"
							key={year + month.name + day.name.short + day.date}
						>
							<div className="flex border-b border-b-slate-950 max-w-full">
								<label className="inline-flex flex-col pl-2">
									<small className="text-[8px] uppercase">Challenge</small>
									<input className="border-none outline-none" />
								</label>
								<div className="bg-slate-950 h-9 text-slate-50 uppercase text-2xl max-w-11 w-full text-center">
									{narrowDays[day.name.short as ShortDays]}
								</div>
							</div>
							<div className="flex border-b border-b-slate-950">
								<label className="inline-flex flex-col pl-2">
									<small className="text-[8px] uppercase">Object</small>
									<input className="border-none outline-none" />
								</label>
							</div>
							<div className="tabular-nums font-mono font-bold text-8xl text-center">
								{day.date}
								<small>.</small>
							</div>
						</div>
					))}
				</>
			))}
		</div>
	);
}

export default App;
