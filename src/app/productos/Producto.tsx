import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import Layout from '../../components/layout/Layout';
import { urlProductos } from '../../components/utils/endpoints';
import Axios from 'axios-observable';
import CardMedia from '@mui/material/CardMedia';
import { ModelProductos } from '../../interface/ModelProductos';
import ModalProducto from '../modals/ModalProducto';
import Swal from 'sweetalert2';

function Producto() {
  const [productos, setProductos] = useState<ModelProductos[]>([]);
  const [modalProducto, setModalProducto] = useState<ModelProductos>();
  const [searchProduct, setSearchProduct] = React.useState(false);
  const [openModal, setOpenModal] = React.useState(false);

  const getProductos = () => {
    Axios.get(urlProductos).subscribe({
      next: (res) => {
        setProductos(res.data);
      },
      error: (error) => {
        mostrarAlerta('Favor de contactar a soporte');
      },
    });
  };

  const onChangeProducto = (data: React.ChangeEvent<HTMLInputElement>): void => {
    const { value } = data.target;

    if (value.length === 0) {
      setSearchProduct(false);
      getProductos();
    } else {
      setSearchProduct(true);
      const params = {
        estado_producto: value.toString().toUpperCase(),
      };

      Axios.post(urlProductos, params).subscribe({
        next: (res) => {
          setProductos(res.data);
        },
        error: (error) => {
          mostrarAlerta('Favor de contactar a soporte');
        },
      });
    }
  };

  const verDetalle = (producto: ModelProductos) => {
    setOpenModal(true);
    setModalProducto(producto);
  };

  const cerrarModal = (status: boolean) => {
    setOpenModal(status);
  };

  const mostrarAlerta = (textError: string) => {
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: textError,
    });
  };
  useEffect(() => {
    getProductos();
  }, [location]);

  return (
    <Layout titleHederLayout={'Productos'}>
      <ModalProducto
        openModal={openModal}
        onClose={(status: boolean) => cerrarModal(status)}
        productoModal={modalProducto}
      />
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ minHeight: '10vh', border: '1px solid grey' }}
      >
        <Grid container item style={{ width: '80%', textAlign: 'center' }} marginLeft={0} spacing={1}>
          <h3>Buscar Producto</h3>
        </Grid>
        <Grid container item style={{ width: '80%', textAlign: 'center', border: '1px solid grey' }} spacing={1}>
          <TextField
            id="bPelicula"
            label="Buscar pelicula"
            onChange={onChangeProducto}
            style={{ width: '100%' }}
            color="secondary"
            size="small"
          />
        </Grid>

        {!searchProduct && (
          <Grid item marginTop={2}>
            <h3>Productos más nuevos</h3>
          </Grid>
        )}

        <Grid container item style={{ width: '100%', textAlign: 'center' }} marginTop={3} spacing={1}>
          {productos.map((item) => (
            // Without the `key`, React will fire a key warning
            <React.Fragment key={item.id_producto}>
              <Grid item xs={12} sm={6} md={3} textAlign={'center'} marginTop={1}>
                <Grid item style={{ height: '8vh' }}>
                  {item.nombre_producto}
                </Grid>
                <Button
                  onClick={() => {
                    verDetalle(item);
                  }}
                >
                  <CardMedia
                    component="img"
                    height="150"
                    width="150"
                    sx={{ maxWidth: 300 }}
                    image={item.imagen_producto}
                    alt="Paella dish"
                  />
                </Button>
              </Grid>
            </React.Fragment>
          ))}
        </Grid>
      </Grid>
    </Layout>
  );
}

export default Producto;
