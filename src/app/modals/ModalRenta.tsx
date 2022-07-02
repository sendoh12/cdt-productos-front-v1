import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { modelPelicula } from '../../interface/modelPelicula';

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

export interface Content {
  openRenta: boolean;
  onClose: (status: boolean) => void;
  peliculaModal: modelPelicula | undefined;
  costoRenta: number | undefined;
}

export default function BasicModal(props: Content) {
  const { openRenta, onClose, peliculaModal, costoRenta } = props;
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    onClose(false);
  };

  useEffect(() => {
    setOpen(openRenta);
  }, [openRenta, location]);

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Total a pagar por la renta
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            ${costoRenta}
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}
