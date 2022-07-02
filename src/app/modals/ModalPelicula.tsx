import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import { Box, Button, Card, Grid, Paper, TextField } from '@mui/material';
import CardMedia from '@material-ui/core/CardMedia';
import { modelPelicula } from '../../interface/modelPelicula';
import SelectRenta from './SelectRenta';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import BasicModal from './ModalRenta';

export const useStyles = makeStyles((theme) => ({
  appBar: {
    position: 'relative',
  },
  title: {
    marginLeft: theme.spacing(2),
    flex: 1,
  },
  root: {
    maxWidth: 345,
  },
  media: {
    height: 500,
  },
}));

export interface Content {
  openModal: boolean;
  onClose: (status: boolean) => void;
  peliculaModal: modelPelicula | undefined;
  noVistas: boolean;
}

function ModalPelicula(props: Content) {
  const { openModal, onClose, peliculaModal, noVistas } = props;
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [reciveDias, setReciveDias] = React.useState<number>();
  const [openRenta, setOpenRenta] = React.useState(false);
  const [modalPelicula, setModalPelicula] = useState<modelPelicula | undefined>();

  const handleClose = () => {
    setOpen(false);
    onClose(false);
  };

  const openRentarPeli = () => {
    setOpenRenta(true);
  };

  const rentarPeli = (dias: number | string) => {
    const valor = Number(peliculaModal?.costo_renta) * Number(dias);
    setReciveDias(valor);
  };

  const cerrarModal = (status: boolean) => {
    setOpenRenta(status);
  };

  useEffect(() => {
    setOpen(openModal);
  }, [openModal, location]);

  return (
    <div>
      <Dialog fullScreen open={open} onClose={handleClose}>
        <AppBar className={classes.appBar}>
          <Toolbar>
            <IconButton edge="start" color="inherit" onClick={handleClose} aria-label="close">
              <CloseIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              Detalle
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component={Paper}
          elevation={5}
          marginTop={5}
          marginLeft={5}
          marginRight={5}
          style={{ textAlign: 'center', marginBottom: '3%' }}
        >
          <Grid container>
            <Grid item xs={12} sm={6} md={4} textAlign={'center'} marginTop={0}>
              <CardMedia
                className={classes.media}
                image={peliculaModal?.modal_pelicula}
                title="Contemplative Reptile"
              />
            </Grid>
            <Grid item xs={12} sm={6} md={8} textAlign={'center'} marginTop={0} wrap="nowrap" spacing={2}>
              <Grid item>
                <Grid item xs>
                  <br />
                  <Typography gutterBottom variant="subtitle1">
                    {peliculaModal?.nombre_pelicula}
                  </Typography>{' '}
                  <br />
                  <Typography variant="body2" color="textSecondary">
                    Año: {peliculaModal?.anio_pelicula}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Genero: {peliculaModal?.genero_pelicula}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Costo: ${peliculaModal?.costo_renta}
                  </Typography>{' '}
                  <br />
                  <Typography variant="body2" color="textSecondary">
                    Elegir dias a rentar: <SelectRenta diasRenta={(dias: number | string) => rentarPeli(dias)} />
                  </Typography>{' '}
                  <br />
                  <Typography variant="body2" gutterBottom>
                    {peliculaModal?.descripcion_pelicula}
                  </Typography>{' '}
                  <br />
                  {noVistas && (
                    <Typography variant="body2" gutterBottom>
                      Recomendada
                    </Typography>
                  )}{' '}
                  <br />
                  <Button
                    variant="contained"
                    color="primary"
                    data-testid="button-submit"
                    sx={{ borderRadius: '12px', textTransform: 'none', backgroundColor: '#3f51b5' }}
                    onClick={() => {
                      openRentarPeli();
                      setModalPelicula(peliculaModal);
                    }}
                  >
                    <MoreVertIcon /> Rentar
                  </Button>
                </Grid>
                <BasicModal
                  openRenta={openRenta}
                  onClose={(status: boolean) => cerrarModal(status)}
                  peliculaModal={modalPelicula}
                  costoRenta={reciveDias}
                />
              </Grid>
            </Grid>
          </Grid>
        </Box>
      </Dialog>
    </div>
  );
}

export default ModalPelicula;
