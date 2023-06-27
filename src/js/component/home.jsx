import React from "react";
import { useState } from "react"

//create your first component
const Home = () => {

	const [inputValue, setinputValue] = useState("");
	const [todos, setTodos] = useState([]);

	return (
		<div className="container p-5">
			<h1 className="d-flex justify-content-center align-items-center">TODOs</h1>
			<div className="card bg-light">
				<input
					type="text"
					className="card"
					onChange={(e) => setinputValue(e.target.value)}
					value={inputValue}
					onKeyPress={(e) => {
						if (e.key === "Enter") {
							setTodos(todos.concat(inputValue));
							setinputValue("")
						}
					}}
					placeholder="What do you need to do? "></input>
				<div>
					{todos.map(item => {
						return (
							<div className="card text-grey">
								<div>
									{item}
									<button type="button" className="btn btn-light float-end" onClick={(e) => {
										setTodos(todos.filter(todo => todo != item));
									}}>
										<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
											<path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
										</svg>
									</button>
								</div>

							</div>
						);
					})}
				</div>
				<div>{todos.length > 0 ? todos.length + " items left" : "No TODOs, please add one"}</div>
			</div>
		</div>
	);
};

export default Home;
