export function formatDuration(duration: number): string {
	const hh: number = Math.floor(duration / 60);
	const mm: number = duration % 60;
	return `${format(hh)}:${format(mm)}`;
}

function format(num: number): string {
	if (num < 10) {
		return `0${num}`;
	} else {
		return `${num}`;
	}
}
