import React from 'react';
import { Table } from 'react-bootstrap'
//testcommit
class UserList extends React.Component {
	state = {
		filteredUserList: {
			data: []
		},
		searchTermByField: {
			first_name: '',
			last_name: ''
		}
	}

	componentDidMount() {
		this.getUserList()
	}

	getUserList = () => {
		fetch("https://reqres.in/api/users").then(res => { return res.json() })
			.then(response => {
				this.setState({
					originalUserList: response,
					filteredUserList: response
				})
			})
	}

	searchUsers = ({ currentTarget: { id, value } }) => {
		let searchTermByField = { ...this.state.searchTermByField },
			filteredUserList = { ...this.state.originalUserList }
		searchTermByField[id] = value

		if (id == "first_name") {
			filteredUserList.data = filteredUserList.data.filter(el => el.first_name.toLowerCase().includes(searchTermByField["first_name"].toLowerCase())) //incomplete
			searchTermByField["last_name"] = ""
		}
		else {
			filteredUserList.data = filteredUserList.data.filter(el => el.last_name.toLowerCase().includes(searchTermByField["last_name"].toLowerCase())) //incomplete
			searchTermByField["first_name"] = ""
		}
		this.setState({
			searchTermByField
		})
	}

	render() {
		return (
			<body>
				<React.Fragment>
					<div>
						{this.state.filteredUserList.data.length ?
							<Table striped bordered style={{ height: "500px" }}>
								<thead>
									<tr>
										{Object.keys(this.state.filteredUserList.data[0]).map((userFields, index) => {
											return (
												<th key={index}>
													{userFields == "first_name" || userFields == "last_name" ? <React.Fragment> {userFields} < input type="text" id={userFields} value={this.state.searchTermByField[userFields]} onChange={this.searchUsers} /></React.Fragment> : userFields}
												</th>)
										})}
									</tr>
								</thead>
								<tbody>
									{this.state.filteredUserList.data.map(user => {
										return (
											< tr key={user.id} >
												{
													Object.keys(this.state.filteredUserList.data[0]).map((userFields, index) => {
														return (<td key={index}>
															{userFields != "avatar" ? user[userFields] : <img src={user[userFields]} />}
														</td>)
													})
												}
											</tr>)
									})}
								</tbody>
							</Table> : null}

					</div>
				</React.Fragment >
			</body >
		)
	}
}

export default UserList