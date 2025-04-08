// Prevent `String#lastIndexOf` treat negative index as `0`
const safeLastIndexOf = (string, searchString, index) =>
	index < 0 ? -1 : string.lastIndexOf(searchString, index);

// Performance https://github.com/sindresorhus/index-to-position/pull/9
function getPosition(text, textIndex) {
	const lineBreakBefore = safeLastIndexOf(text, '\n', textIndex - 1);
	if (lineBreakBefore === -1) {
		return {line: 0, column: textIndex};
	}

	return {
		line: text.slice(0, lineBreakBefore + 1).match(/\n/g).length,
		column: textIndex - lineBreakBefore - 1,
	};
}

export default function indexToLineColumn(text, textIndex, {oneBased = false} = {}) {
	if (typeof text !== 'string') {
		throw new TypeError('Text parameter should be a string');
	}

	if (!Number.isInteger(textIndex)) {
		throw new TypeError('Index parameter should be an integer');
	}

	if (textIndex < 0 || textIndex > text.length) {
		throw new RangeError('Index out of bounds');
	}

	const position = getPosition(text, textIndex);

	return oneBased ? {line: position.line + 1, column: position.column + 1} : position;
}
