import React, { useEffect, useState } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ModelProductos } from '../../interface/ModelProductos';
import { Box, CardMedia, Grid, TextField, Typography } from '@mui/material';
import SelectVariacion from './SelectVariacion';
import Axios from 'axios-observable';
import { urlProductos } from '../../components/utils/endpoints';
import styled from '@emotion/styled';
import Swal from 'sweetalert2';

export interface Content {
  openModal: boolean;
  onClose: (status: boolean) => void;
  productoModal: ModelProductos | undefined;
}

const style = {
  position: 'absolute' as 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export const CssTextField = styled(TextField)({
  '&.css-1t8l2tu-MuiInputBase-input-MuiOutlinedInput-input': {
    height: '0.0375em',
  },
});

export default function ModalProducto(props: Content) {
  const { openModal, onClose, productoModal } = props;
  const [open, setOpen] = React.useState(false);
  const [cantidad, setCantidad] = React.useState<number>(0);
  const [imagenProducto, setImagenProducto] = React.useState<string | undefined>('');
  const [bandera, setbandera] = React.useState<boolean>(true);
  const [cantidadProduct, setCantidadProduct] = React.useState<number | undefined>();

  const handleClose = () => {
    onClose(false);
    setOpen(false);
    setCantidad(0);
    setbandera(true);
  };

  const confirmarCompra = (totalProducto: ModelProductos | undefined) => {
    onClose(false);
    setOpen(false);
    Swal.fire({
      title: 'Esta seguro de su compra?',
      text: 'El articulo sera enviado a su domicilio!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmar compra!',
      cancelButtonText: 'Cancelar!',
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Compra exitosa!', 'Gracias por comprar con nosotros.', 'success');
        comprarProducto(totalProducto);
      }
      setCantidad(0);
      setbandera(true);
    });
  };

  const mostrarAlerta = (textError: string) => {
    Swal.fire({
      icon: 'error',
      title: 'Error...',
      text: textError,
    });
  };

  const comprarProducto = (totalProducto: ModelProductos | undefined) => {
    console.log('totalProducto', totalProducto);
    const operacion = Number(totalProducto?.total_producto) - Number(cantidad);
    setCantidadProduct(Number(operacion));

    const params = {
      total_producto: operacion,
    };

    Axios.put(urlProductos + totalProducto?.id_producto, params).subscribe({
      next: (res) => {
        console.log('resultado', res.data);
        setbandera(true);
        // setProductos(res.data);
      },
      error: (error) => {
        mostrarAlerta('Favor de contactar a soporte');
      },
    });

    onClose(false);
    setOpen(false);
  };

  const validarNumeros = (value: string): boolean => {
    const regNumber = /^([0-9])*$/;
    return regNumber.test(value);
  };

  const onChangeCantidad = (data: React.ChangeEvent<HTMLInputElement>): void => {
    if (validarNumeros(data.target.value)) {
      const { id, value } = data.target;
      console.log('value', value);
      if (Number(value) <= Number(productoModal?.total_producto)) {
        setCantidad(Number(data.target.value));
        setbandera(false);
      }
      if (value.length === 0) {
        setbandera(true);
      }
    }
  };

  const validarColor = (color: string | undefined) => {
    console.log('validarColor', color);
    if (color === 'Blanco') {
      setImagenProducto(productoModal?.blanco_producto);
    } else if (color === 'Negro') {
      setImagenProducto(productoModal?.negro_producto);
    } else if (color === 'Azul') {
      setImagenProducto(productoModal?.azul_producto);
    } else if (color === 'Gris') {
      setImagenProducto(productoModal?.gris_producto);
    }
  };

  useEffect(() => {
    setOpen(openModal);
    setImagenProducto(productoModal?.imagen_producto);
    setCantidadProduct(Number(productoModal?.total_producto));
  }, [openModal, location, productoModal]);

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">{productoModal?.nombre_producto}</DialogTitle>

        <DialogContent>
          <DialogContentText id="alert-dialog-description">{productoModal?.descripcion_producto}</DialogContentText>
        </DialogContent>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <Grid container>
              <Grid item sm={6} md={6}>
                <CardMedia
                  component="img"
                  height="200"
                  width="150"
                  sx={{ maxWidth: 250 }}
                  image={imagenProducto}
                  alt="Paella dish"
                />
              </Grid>
              <Grid item sm={6} md={6}>
                <Typography variant="body2" color="textSecondary">
                  Precio: ${productoModal?.precio_producto}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Producto: {productoModal?.estado_producto}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Total de productos: {cantidadProduct}
                </Typography>{' '}
                <br />
                <Grid container>
                  <Grid item sm={6} md={6}>
                    <Typography variant="body2" color="textSecondary">
                      Elegir color:
                      <SelectVariacion
                        variacionProducto={productoModal?.variacion_producto}
                        cambiarImagen={(color: string | undefined) => {
                          validarColor(color);
                        }}
                      />
                    </Typography>
                  </Grid>
                  <Grid item sm={6} md={6}>
                    <Typography variant="body2" color="textSecondary">
                      <br />
                      <TextField
                        id="cantidad"
                        label="Cantidad"
                        onChange={onChangeCantidad}
                        value={cantidad}
                        color="secondary"
                        size="small"
                        style={{ width: '80%', height: '0.0375em' }}
                      />
                    </Typography>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              confirmarCompra(productoModal);
            }}
            color="primary"
            disabled={bandera}
          >
            Aceptar
          </Button>
          <Button onClick={handleClose} color="primary">
            Cerrar
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
