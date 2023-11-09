export default function indexToLineColumn(text, textIndex, {oneBased = false} = {}) {
	if (textIndex < 0 || (textIndex >= text.length && text.length > 0)) {
		throw new RangeError('Index out of bounds');
	}

	const lineBreakBefore = text.lastIndexOf('\n', textIndex - 1);
	const column = textIndex - lineBreakBefore - 1;

	let line = 0;
	for (let index = 0; index <= lineBreakBefore; index++) {
		if (text.charAt(index) === '\n') {
			line++;
		}
	}

	return {line: oneBased ? line + 1 : line, column: oneBased ? column + 1 : column};
}
