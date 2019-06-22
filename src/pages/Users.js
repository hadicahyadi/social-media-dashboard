import React, { Component, Fragment } from 'react';

import Divider from '@material-ui/core/Divider';
import Typography from '@material-ui/core/Typography';
import Table from '@material-ui/core/Table';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import Paper from '@material-ui/core/Paper';

import HttpApi from '@/services/HttpApi';

class Users extends Component {

  state = {
    users: []
  }

  componentDidMount() {
    HttpApi.fetchUsers().then(
      resp => {
        this.setState({users: resp});
      }
    )
  }


  render() {
    return (
      <Fragment>
        <Typography variant="h5" gutterBottom>
          Users
        </Typography>
        <Paper>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Username</TableCell>
                <TableCell>Phone</TableCell>
                <TableCell>Website</TableCell>
                <TableCell>Company</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {this.state.users.map(user => (
                <TableRow key={user.id}>
                  <TableCell component="th" scope="row">
                    {user.name}
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.phone}</TableCell>
                  <TableCell>{user.website}</TableCell>
                  <TableCell>{user.company.name}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Paper>
      </Fragment>
    )
  }
}

export default Users;
