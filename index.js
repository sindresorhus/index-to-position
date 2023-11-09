export default function indexToLineColumn(text, textIndex, {oneBased = false} = {}) {
	if (textIndex < 0 || (textIndex >= text.length && text.length > 0)) {
		throw new RangeError('Index out of bounds');
	}

	let line = 0;
	let column = -1;

	for (let index = 0; index <= textIndex; index++) {
		if (text[index - 1] === '\n' || (text[index - 2] === '\r' && text[index - 1] === '\n')) {
			line++;
			column = 0;

			if (text[index - 2] === '\r') {
				index++;
			}
		} else {
			column++;
		}
	}

	return {line: oneBased ? line + 1 : line, column: oneBased ? column + 1 : column};
}
