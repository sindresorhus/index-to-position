export default function indexToLineColumn(text, textIndex, {oneBased = false} = {}) {
	if (textIndex < 0 || (textIndex >= text.length && text.length > 0)) {
		throw new RangeError('Index out of bounds');
	}

	let index = textIndex;
	let line = 0;
	let column = -1;

	// Count columns
	for (; index >= 0; index--) {
		column++;

		if (text.charAt(index - 1) === '\n') {
			break;
		}
	}

	// Count lines
	for (; index >= 0; index--) {
		if (text.charAt(index) === '\n') {
			line++;
		}
	}

	return {line: oneBased ? line + 1 : line, column: oneBased ? column + 1 : column};
}
