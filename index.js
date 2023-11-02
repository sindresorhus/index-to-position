export default function indexToLineColumn(text, textIndex, {oneBased = false} = {}) {
	if (textIndex < 0 || (textIndex >= text.length && text.length > 0)) {
		throw new RangeError('Index out of bounds');
	}

	let line = oneBased ? 1 : 0;
	let column = oneBased ? 1 : 0;

	for (let index = 0; index < textIndex; index++) {
		if (text[index] === '\n' || (text[index] === '\r' && text[index + 1] === '\n')) {
			line++;
			column = oneBased ? 1 : 0;

			if (text[index] === '\r') {
				index++;
			}
		} else {
			column++;
		}
	}

	return {line, column};
}
