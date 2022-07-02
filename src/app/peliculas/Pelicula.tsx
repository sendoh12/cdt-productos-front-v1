import React, { useEffect, useState } from 'react';
import { Box, Button, Card, Grid, Paper, TextField } from '@mui/material';
import Layout from '../../components/layout/Layout';
import { url } from '../../components/utils/endpoints';
import Axios from 'axios-observable';
import { modelPelicula } from '../../interface/modelPelicula';
import { styled } from '@mui/material/styles';
import CardMedia from '@mui/material/CardMedia';
import IconButton, { IconButtonProps } from '@mui/material/IconButton';
import { grey } from '@mui/material/colors';
import ModalPelicula from '../modals/ModalPelicula';

function Pelicula() {
  const [pelicula, setPelicula] = useState<modelPelicula[]>([]);
  const [modalPelicula, setModalPelicula] = useState<modelPelicula>();
  const [searchMovie, setSearchMovie] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);
  const [noVistas, setNoVistas] = React.useState(false);

  const getPeliculas = () => {
    Axios.get(url).subscribe({
      next: (res) => {
        setPelicula(res.data);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  };

  const onChangepelicula = (data: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = data.target;

    if (value.length === 0) {
      setSearchMovie(false);
      getPeliculas();
    } else {
      setSearchMovie(true);
      const params = {
        nombre_pelicula: value.toString().toUpperCase(),
      };

      Axios.post(url, params).subscribe({
        next: (res) => {
          console.log('resultado', res.data);
          setPelicula(res.data);
        },
        error: (error) => {
          console.log('error', error);
        },
      });
    }
  };

  const verDetalle = (pelicula: modelPelicula) => {
    console.log('idPelicula', pelicula);
    setOpenModal(true);
    setModalPelicula(pelicula);
    if (pelicula.vista_peliculas > 9) {
      setNoVistas(true);
    } else {
      setNoVistas(false);
    }
  };

  const cerrarModal = (status: boolean) => {
    setOpenModal(status);
  };

  useEffect(() => {
    getPeliculas();
  }, []);

  return (
    <Layout titleHederLayout={'Peliculas'}>
      <ModalPelicula
        openModal={openModal}
        onClose={(status: boolean) => cerrarModal(status)}
        peliculaModal={modalPelicula}
        noVistas={noVistas}
      />
      <Box
        component={Paper}
        elevation={5}
        marginTop={1}
        marginLeft={5}
        marginRight={5}
        style={{ textAlign: 'center', marginBottom: '5%' }}
      >
        <Card style={{ textAlign: 'center' }}>
          <Grid item xs={12} sm={12} md={12} style={{ textAlign: 'left' }} marginLeft={5} marginRight={5}>
            <h2>Busca tu pelicula</h2>
          </Grid>
          <Grid item xs={12} sm={12} md={3} style={{ textAlign: 'center', marginBottom: '7%' }}>
            <TextField
              id="bPelicula"
              label="Buscar pelicula"
              onChange={onChangepelicula}
              style={{ width: '80%' }}
              color="secondary"
              size="small"
            />
          </Grid>
          {!searchMovie && (
            <Grid item xs={12} sm={12} md={3} style={{ textAlign: 'center' }}>
              <h3>Peliculas Mas Rentadas</h3>
            </Grid>
          )}
          <Grid container item style={{ width: '90%', textAlign: 'center' }} marginLeft={0.1} spacing={10}>
            {pelicula.map((item) => (
              // Without the `key`, React will fire a key warning
              <React.Fragment key={item.id_pelicula}>
                <Grid item xs={12} sm={6} md={3} textAlign={'center'} marginTop={1}>
                  <Card sx={{ maxWidth: 200, bgcolor: grey[100] }}>
                    <Button
                      onClick={() => {
                        verDetalle(item);
                      }}
                    >
                      <CardMedia component="img" height="300" image={item.imagen_pelicula} alt="Paella dish" />
                    </Button>
                  </Card>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Card>
      </Box>
    </Layout>
  );
}

export default Pelicula;
