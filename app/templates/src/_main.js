<% if (hasBootstrap) { %>import 'twbs/bootstrap';<% } %>
import {User} from './user/user';
import {UserTable} from './user/user-table';

let users = [];

users.push(new User('Luke', 'Skywalker', '@luke'));
users.push(new User('Anakin', 'Skywalker', '@anakin'));
users.push(new User('Obi-wan', 'Kenobi', '@obiWan'));

let userTable = new UserTable(users);

userTable.createTable();
