function getPosition(text, textIndex) {
	if (textIndex === 0) {
		return {line: 0, column: 0};
	}

	const lineBreakBefore = text.lastIndexOf('\n', textIndex - 1);
	const column = textIndex - lineBreakBefore - 1;

	let line = 0;
	for (
		let index = lineBreakBefore;
		index > 0;
		index = text.lastIndexOf('\n', index - 1)
	) {
		line++;
	}

	return {line, column};
}

export default function indexToLineColumn(text, textIndex, {oneBased = false} = {}) {
	if (textIndex < 0 || (textIndex >= text.length && text.length > 0)) {
		throw new RangeError('Index out of bounds');
	}

	const position = getPosition(text, textIndex);

	return oneBased ? {line: position.line + 1, column: position.column + 1} : position;
}


console.log(indexToLineColumn('\na',1))
