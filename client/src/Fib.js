import React, { useState, useEffect } from 'react';

function Fib() {
	const [seenIndexes, setSeenIndexes] = useState([]);
	const [values, setValues] = useState({});
	const [index, setIndex] = useState('');

	useEffect(() => {
		fetchValues();
		fetchIndexes();
	}, []);

	const fetchValues = async () => {
		try {
			const response = await fetch('/api/values/current');
			const data = await response.json();
			setValues(data);
		} catch (error) {
			console.error('Error fetching values:', error);
		}
	};

	const fetchIndexes = async () => {
		try {
			const response = await fetch('/api/values/all');
			const data = await response.json();
			setSeenIndexes(data);
		} catch (error) {
			console.error('Error fetching indexes:', error);
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();

		await fetch('/api/values', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ index: index }),
		});

		setIndex('');
	};

	const renderSeenIndexes = () => {
		return seenIndexes.map(({ number }) => number).join(', ');
	};

	const renderValues = () => {
		const entries = [];
		for (let key in values) {
			entries.push(
				<div key={key}>
					For index {key} I calculated {values[key]}
				</div>
			);
		}
		return entries;
	};

	return (
		<div>
			<form onSubmit={handleSubmit}>
				<label>Enter your index:</label>
				<input
					value={index}
					onChange={(event) => setIndex(event.target.value)}
				/>
				<button>Submit</button>
			</form>

			<h3>Indexes I have seen:</h3>
			{renderSeenIndexes()}

			<h3>Calculated Values:</h3>
			{renderValues()}
		</div>
	);
}

export default Fib;