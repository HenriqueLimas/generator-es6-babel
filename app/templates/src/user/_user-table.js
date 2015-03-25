'use strict';

export class UserTable {
	constructor(users = []) {
		this.users = users;
		this.table = document.querySelector('#users');
	}

	createHeader() {
		if (!this.users.length) {
			return;
		}

		if (!this.thead) {
			this.thead = document.createElement('thead');

			let tr = document.createElement('tr');
			let thFirst = document.createElement('th');
			let thLast = document.createElement('th');
			let thUser = document.createElement('th');

			thFirst.textContent = 'First Name';
			tr.appendChild(thFirst);

			thLast.textContent = 'Last Name';
			tr.appendChild(thLast);

			thUser.textContent = 'Username';
			tr.appendChild(thUser);

			this.thead.appendChild(tr);

			this.table.appendChild(this.thead);
		}
	}

	createBody() {
		if(!this.tbody) {
			this.tbody = document.createElement('tbody');
		}

		this.users.forEach(user => {
			let row = document.createElement('tr');
			let firstNameData = document.createElement('td');
			let lastNameData = document.createElement('td');
			let userNameData = document.createElement('td');

			firstNameData.textContent = user.firstName;
			lastNameData.textContent = user.lastName;
			userNameData.textContent = user.userName;

			row.appendChild(firstNameData);
			row.appendChild(lastNameData);
			row.appendChild(userNameData);

			this.tbody.appendChild(row);
		});

		this.table.appendChild(this.tbody);
	}

	createTable() {
		this.createHeader();
		this.createBody();
	}
}
