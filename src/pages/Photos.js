import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Icon from '@material-ui/core/Icon';
import IconButton from '@material-ui/core/IconButton';
import Modal from 'react-modal';
import { withStyles } from '@material-ui/core/styles';

import AppPhotoModal from '@/components/AppPhotoModal';

import HttpApi from '@/services/HttpApi';

const styles = theme => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    overflow: 'hidden'
  },
  photoModal: {
    position: 'absolute',
    width: 600,
    outline: 'none',
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  }
});
// react-modal content style
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};


class Photos extends Component {
  state = {
    photos: [],
    album: {},
    user: {},
    photo: {},
    isModalOpen: false
  }

  async getPhotos() {
    let photos = await HttpApi.fetchPhotosByAlbum(this.props.match.params.id);
    let album = await HttpApi.fetchAlbum(this.props.match.params.id);
    let user = await HttpApi.fetchUser(album.userId);
    this.setState({photos: photos, album: album, user: user});
  }

  handleOpenModal = photoId => {
    let photo = this.state.photos.find(photo => photo.id === photoId)
    this.setState({isModalOpen: !this.state.isModalOpen, photo: photo});
  }

  handleCloseModal = () => {
    this.setState({ isModalOpen: false });
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
                    actionIcon={
                      <IconButton
                        className={classes.icon}
                        onClick={() => this.handleOpenModal(photo.id)}>
                        <Icon>info</Icon>
                      </IconButton>
                    }
                  />
                </GridListTile>
              ))}
            </GridList>
          </div>
        </Paper>
        <Modal
          isOpen={this.state.isModalOpen}
          onRequestClose={this.handleCloseModal}
          style={customStyles}
          className={classes.photoModal}>
          <AppPhotoModal
            imageUrl={this.state.photo.url}
            title={this.state.photo.title} />
        </Modal>
      </Fragment>
    )
  }
}

Photos.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Photos);
