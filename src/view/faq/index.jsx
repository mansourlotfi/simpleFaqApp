import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import SaveIcon from '@material-ui/icons/Save';
import DeleteIcon from '@material-ui/icons/Delete';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';

import './Faq.css';

class Faq extends Component {
	state = {
		title: 'FAQ',
		act: 'add',
		selectedQuestion: '',
		questions: [],
		answerInput: ''
	};

	componentDidMount() {
		this.refs.name.focus();
	}

	fSubmit = (e) => {
		e.preventDefault();
		let questions = this.state.questions;
		let name = this.refs.name.value;
		let question = this.refs.question.value;

		if (this.state.act === 'add') {
			let data = {
				id: (Math.random() * (9999 - 1) + 1).toFixed(0), // generate random id
				name,
				question
			};
			questions.push(data);
		} else {
			let index = this.state.index;
			questions[index].name = name;
			questions[index].question = question;
		}

		this.setState({
			questions: questions,
			act: 'add'
		});

		this.refs.myForm.reset();
		this.refs.name.focus();
	};

	fRemove = (i) => {
		let questions = this.state.questions;
		questions.splice(i, 1);
		this.setState({
			questions: questions
		});

		this.refs.myForm.reset();
		this.refs.name.focus();
	};

	fEdit = (i) => {
		let data = this.state.questions[i];
		this.refs.name.value = data.name;
		this.refs.question.value = data.question;

		this.setState({
			act: 'edit',
			index: i
		});

		this.refs.name.focus();
	};

	handleChange = (value) => {
		const questionID =  value.currentTarget.getAttribute('data-value')
		const question = this.state.questions.find(question => question.id === questionID)
		this.setState({
			selectedQuestion: question.id,
			answerInput: question.answer || ''
		});
	};

	answerfSubmit = () => {

		const questions = this.state.questions.map(question => question.id === this.state.selectedQuestion
			? {...question, answer: this.state.answerInput} : question)

		this.setState({ questions })
	};

	render() {
		let questions = this.state.questions;

		return (
			<div className="App">
				<h2 style={{ textAlign: 'center' }}>{this.state.title}</h2>
				<form ref="myForm" className="myForm">
					<div style={{ textAlign: 'center' }}>questions</div>
					<input type="text" ref="name" placeholder="نام خود را وارد کنید" className="formField" />
					<textarea type="text" ref="question" placeholder="سوال خود را مطرح نمایید" className="formField" />
					<Button
						variant="contained"
						color="primary"
						startIcon={<SaveIcon />}
						size="small"
						onClick={(e) => this.fSubmit(e)}
					>
						{
							this.state.act === 'add' ? 'ارسال' :
							'ویرایش'}
					</Button>
				</form>
				<div>
					{questions.map((data, i) => (
						<li key={i} className="myList">
							{i + 1}. {data.name}, {data.question}
							<Button
								variant="contained"
								color="secondary"
								size="small"
								startIcon={<DeleteIcon fontSize="small" />}
								onClick={() => this.fRemove(i)}
								className="myListButton"
							>
								حذف
							</Button>
							<Button
								variant="contained"
								color="secondary"
								startIcon={<SaveIcon />}
								size="small"
								onClick={() => this.fEdit(i)}
								className="myListButton"
							>
								ویرایش
							</Button>
							answer :
							{data.answer? data.answer : "پاسخی وجود ندارد"}
						</li>
					))}
				</div>
				<div className="answers">answers</div>
				<FormControl style={{ minWidth: 300 }}>
					<InputLabel>انتخاب سوال برای پاسخ</InputLabel>
					<Select value={questions.value} onChange={(value) => this.handleChange(value)}>
						{this.state.questions.map((questions, index) => (
							<MenuItem key={index} value={questions.id}>
								{questions.question}
							</MenuItem>
						))}
					</Select>
					<textarea type="text" ref="answer" value={this.state.answerInput}
							  onChange={(e) =>
									this.setState({answerInput: e.target.value})}
							  placeholder="سوال خود را مطرح نمایید"
							  className="formField" />
					<Button
						variant="contained"
						color="primary"
						startIcon={<SaveIcon />}
						size="small"
						onClick={(index) => this.answerfSubmit(index)}
					>
						پاسخ
					</Button>
				</FormControl>

				<div>
					{this.state.questions?.answer && questions.map((data, index) => (
						<li key={index} className="myList">
							{index + 1}. {data.answer}
						</li>
					))}
				</div>
			</div>
		);
	}
}

export default Faq;
