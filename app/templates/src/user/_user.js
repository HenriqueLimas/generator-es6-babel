export class User {
	constructor(firstName, lastName, userName) {
		this.firstName = firstName;
		this.lastName = lastName;
		this.userName = userName;
	}
	get fullName() {
		return this.firstName + ' ' + this.lastName;
	}
}