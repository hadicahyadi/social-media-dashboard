import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TablePagination from '@material-ui/core/TablePagination';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import HttpApi from '@/services/HttpApi';

const styles = theme => ({
  root: {
    flexGrow: 1,
    marginBottom: theme.spacing(3)
  }
});

class Albums extends Component {

  state = {
    albums: [],
    pagination: {
      perPage: 10,
      page: 0,
      total: 0
    }
  }

  async getAlbums() {
    let { perPage, page } = this.state.pagination;
    let albums = await HttpApi.fetchAlbums(perPage * page, perPage);
    let users = await HttpApi.fetchUsers();

    this.setState({
      pagination: {...this.state.pagination, total: parseInt(albums.headers['x-total-count'])}
    });

    let tmp = albums.data.map(album => ({
      ...album,
      user: users.find(user => user.id === album.userId)
    }));
    this.setState({albums: tmp});
  }

  handleChangePage = (event, newPage) => {
    this.setState({
      pagination: {...this.state.pagination, page: newPage}
    }, () => this.getAlbums());
  }

  componentDidMount() {
    this.getAlbums();
  }


  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <Typography variant="h5" gutterBottom>
          Albums
        </Typography>
        <div className={classes.root}>
          <Grid container spacing={3}>
            {this.state.albums.map(album => (
              <Grid key={album.id} item xs={12} sm={6} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h5" component="h2">
                      {album.title}
                    </Typography>
                    <Typography color="textSecondary">
                      @{album.user.username}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    <Button color="secondary" size="small">View Photos</Button>
                  </CardActions>
                </Card>
              </Grid>
            ))}
          </Grid>
        </div>
        <Paper>
          <TablePagination
            component="div"
            count={this.state.pagination.total}
            rowsPerPage={this.state.pagination.perPage}
            rowsPerPageOptions={[10]}
            page={this.state.pagination.page}
            backIconButtonProps={{
              'aria-label': 'Previous Page',
            }}
            nextIconButtonProps={{
              'aria-label': 'Next Page',
            }}
            onChangePage={this.handleChangePage}
          />
        </Paper>
      </Fragment>
    )
  }
}

Albums.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Albums);
