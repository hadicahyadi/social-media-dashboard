import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import { withStyles } from '@material-ui/core/styles';

import HttpApi from '@/services/HttpApi';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden'
  }
});

class Photos extends Component {
  state = {
    photos: [],
    album: {},
    user: {}
  }

  async getPhotos() {
    let photos = await HttpApi.fetchPhotosByAlbum(this.props.match.params.id);
    let album = await HttpApi.fetchAlbum(this.props.match.params.id);
    let user = await HttpApi.fetchUser(album.userId);
    this.setState({photos: photos, album: album, user: user});
  }

  componentDidMount() {
    this.getPhotos();
  }
  render() {
    const { classes } = this.props;
    return(
      <Fragment>
        <Typography variant="h5" gutterBottom>
          Album Detail
        </Typography>
        <Paper>
          <div className={classes.root}>
            <GridList cellHeight={180} cols={4}>
              <GridListTile key="Subheader" cols={4} style={{ height: 'auto', paddingLeft: '20px', paddingTop: '20px', paddingBottom: '20px' }}>
                <Typography component="div" variant="h6" display="block">
                  {this.state.album.title}
                </Typography>
                <Typography gutterBottom component="div" variant="body1" display="block">
                  @{this.state.user.username}
                </Typography>
                <Typography component="div" variant="caption" display="block" color="textSecondary">
                  {this.state.photos.length} photos
                </Typography>
              </GridListTile>
              {this.state.photos.map(photo => (
                <GridListTile key={photo.id} cols={1}>
                  <img src={photo.url} alt={photo.title} />
                  <GridListTileBar
                    title={photo.title}
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Paper>
      </Fragment>
    )
  }
}

Photos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Photos);
