import React, { Component } from 'react';
import Total from './components/total/Total';
import History from './components/history/History';
import Operation from './components/operation/Operation';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = {
			transactions: [],
			description: '',
			amount: ''
			
		}
	}

	addTransaction = (add) => {
		const transactions = [...this.state.transactions,
			{
				id: `cmr${(+new Date).toString(16)}`,
				description: this.state.description,
				amount: this.state.amount,
				add
			}
		];

		this.setState({
			transactions,
			description: '',
			amount: '',
		})
	}

	addAmount = (elem) => {
		this.setState({amount: elem.target.value})
	}

	addDescription = (elem) => {
		this.setState({description: elem.target.value})
	}

	render() {
		return (
			<>
				<header>
					<h1>Кошелек</h1>
					<h2>Калькулятор расходов</h2>
				</header>

				<main>
					<div className="container">
						<Total/>
						<History transactions={this.state.transactions}/>
						<Operation 
							addTransation={this.addTransaction}
							addAmount={this.addAmount}
							addDescription={this.addDescription}
							description={this.state.description}
							amount={this.state.amount}	
						/>
					</div>
				</main>
			</>
		);
	}
}