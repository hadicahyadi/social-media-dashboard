import React from 'react';
import Modal from '@material-ui/core/Modal';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

const useStyles = makeStyles(theme => ({
  media: {
    height: '400px',
    width: 'auto'
  }
}));

function AppPhotoModal({ isOpen, imageUrl, title }) {
  const classes = useStyles();

  return(
    <Card>
      <CardMedia
        className={classes.media}
        image={imageUrl}
        title={title}
      />
      <CardContent>
        <Typography variant="body1">
          {title}
        </Typography>
      </CardContent>
    </Card>
  )
}

export default AppPhotoModal;
