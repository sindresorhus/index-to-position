import test from 'ava';
import indexToPosition from './index.js';

test('basic', t => {
	const text = 'hello\nworld\n!';
	const result = indexToPosition(text, 7);
	t.deepEqual(result, {line: 1, column: 1});
});

test('multiple lines', t => {
	const text = 'hello\nworld\n!';
	const result = indexToPosition(text, 12);
	t.deepEqual(result, {line: 2, column: 0});
});

test('first index', t => {
	const text = 'hello\nworld\n!';
	const result = indexToPosition(text, 0);
	t.deepEqual(result, {line: 0, column: 0});
});

test('first index - oneBased', t => {
	const text = 'hello\nworld\n!';
	const result = indexToPosition(text, 0, {oneBased: true});
	t.deepEqual(result, {line: 1, column: 1});
});

test('last index', t => {
	const text = 'hello\nworld\n!';
	const result = indexToPosition(text, text.length - 1);
	t.deepEqual(result, {line: 2, column: 0});
});

test('last index - oneBased', t => {
	const text = 'hello\nworld\n!';
	const result = indexToPosition(text, text.length - 1, {oneBased: true});
	t.deepEqual(result, {line: 3, column: 1});
});

test('index out of bounds', t => {
	t.throws(() => {
		indexToPosition('hello\nworld\n!', 20);
	}, {
		message: 'Index out of bounds',
	});
});

test('CRLF', t => {
	const text = 'hello\r\nworld\r\n!';
	const result1 = indexToPosition(text, 7);
	const result2 = indexToPosition(text, 7, {oneBased: true});
	t.deepEqual(result1, {line: 1, column: 0});
	t.deepEqual(result2, {line: 2, column: 1});
});

test('index on line break', t => {
	{
		const text = '\na\r\nb';
		t.deepEqual(indexToPosition(text, 0), {line: 0, column: 0});
		t.deepEqual(indexToPosition(text, 1), {line: 1, column: 0});
		t.deepEqual(indexToPosition(text, 2), {line: 1, column: 1});
		t.deepEqual(indexToPosition(text, 3), {line: 1, column: 2});
		t.deepEqual(indexToPosition(text, 4), {line: 2, column: 0});
	}

	{
		const text = '\r\na\r\nb';
		t.deepEqual(indexToPosition(text, 0), {line: 0, column: 0});
		t.deepEqual(indexToPosition(text, 1), {line: 0, column: 1});
		t.deepEqual(indexToPosition(text, 2), {line: 1, column: 0});
		t.deepEqual(indexToPosition(text, 3), {line: 1, column: 1});
		t.deepEqual(indexToPosition(text, 4), {line: 1, column: 2});
		t.deepEqual(indexToPosition(text, 5), {line: 2, column: 0});
	}
});

test('mixed line endings', t => {
	const text = 'hello\nworld\r\n!';
	const result = indexToPosition(text, text.length - 1);
	t.deepEqual(result, {line: 2, column: 0});
});

test('oneBased option', t => {
	const text = 'hello\nworld\n!';
	const result = indexToPosition(text, 7, {oneBased: true});
	t.deepEqual(result, {line: 2, column: 2});
});

test('empty text', t => {
	const text = '';
	const result = indexToPosition(text, 0);
	t.deepEqual(result, {line: 0, column: 0});
});

test('empty text - oneBased', t => {
	const text = '';
	const result = indexToPosition(text, 0, {oneBased: true});
	t.deepEqual(result, {line: 1, column: 1});
});

test('single character text', t => {
	const text = 'a';
	const result = indexToPosition(text, 0);
	t.deepEqual(result, {line: 0, column: 0});
});

test('single character text - oneBased', t => {
	const text = 'a';
	const result = indexToPosition(text, 0, {oneBased: true});
	t.deepEqual(result, {line: 1, column: 1});
});

test('validate `text` parameter', t => {
	t.throws(() => {
		indexToPosition(1);
	}, {
		message: /should be a string/,
	});
});

test('validate `index` parameter', t => {
	t.throws(() => {
		indexToPosition('hello\nworld\n!');
	}, {
		message: /integer/,
	});

	t.throws(() => {
		indexToPosition('hello\nworld\n!', 'x');
	}, {
		message: /integer/,
	});

	t.throws(() => {
		indexToPosition('hello\nworld\n!', {});
	}, {
		message: /integer/,
	});
});
