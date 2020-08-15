import React, { Component } from 'react';
import Total from './components/total/Total';
import History from './components/history/History';
import Operation from './components/operation/Operation';

export default class App extends Component {

	constructor(props) {
		super(props);
		this.state = JSON.parse(localStorage.getItem('calcMoney')) || 
			{
				transactions: [],
				description: '',
				amount: '',
				total: 0,
				income: 0,
				expense: `-${0}`	
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

		let newTotal, newIncome, newExpense;

		if (add) {
			newTotal = +this.state.total + +this.state.amount;
			newIncome = +this.state.income + +this.state.amount;
			newExpense = +this.state.expense;
		} else {
			newTotal = +this.state.total - +this.state.amount;
			newExpense = +this.state.expense - +this.state.amount;
			newIncome = +this.state.income;
		}

		this.setState({
			total: newTotal,
			income: newIncome,
			expense: (newExpense >= 0) ? `-${newExpense}` : newExpense,
			transactions,
			description: '',
			amount: ''
		});
	}

	addAmount = (elem) => {
		this.setState({
			amount: elem.target.value
		});
	}

	addDescription = (elem) => {
		this.setState({description: elem.target.value});
	}

	delTransaction = (key) => {
		const transactions = this.state.transactions.filter(item => item.id !== key);

		this.setState({transactions});

		const transactionsOk = this.state.transactions.filter(item => item.id === key);
		
		transactionsOk.forEach(elem => {
			if (elem.add) {
				this.setState({
					total: +this.state.total - +elem.amount,
					income: +this.state.income - +elem.amount,
				})
			} else {
				this.setState({
					total: +this.state.total + +elem.amount,
					expense: (+this.state.expense + +elem.amount >= 0) ?
						`-${+this.state.expense + +elem.amount }` :
						+this.state.expense + +elem.amount,
				})
			}
		});
	}

	addStorage() {
		localStorage.setItem('calcMoney', JSON.stringify(this.state));
	}

	componentDidUpdate() {
		this.addStorage();
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
						<Total 
							total={this.state.total}
							income={this.state.income}
							expense={this.state.expense}
						/>
						<History 
							transactions={this.state.transactions}
							delTransaction={this.delTransaction}
						/>
						<Operation 
							addTransaction={this.addTransaction}
							addAmount={this.addAmount}
							addDescription={this.addDescription}
							description={this.state.description}
							amount={this.state.amount}
							addTotal={this.addTotal}	
						/>
					</div>
				</main>
			</>
		);
	}
}