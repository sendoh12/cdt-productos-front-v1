import React, { useEffect, useState } from 'react';
import FormControl from '@mui/material/FormControl';
import { styled } from '@mui/material/styles';
import NativeSelect from '@mui/material/NativeSelect';
import InputBase from '@mui/material/InputBase';
import Axios from 'axios-observable';
import { urlRentas } from '../../components/utils/endpoints';
import { ModelRentas } from '../../interface/ModelRentas';

export interface Content {
  diasRenta: (dias: number | string) => void;
}

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

function SelectRenta(props: Content) {
  const { diasRenta } = props;
  const [age, setAge] = React.useState<string | number>('');
  const [rentas, setRentas] = useState<ModelRentas[]>([]);

  const handleChange = (event: { target: { value: string } }) => {
    const valor = event.target.value;
    setAge(valor);
    diasRenta(event.target.value);
  };

  const getRentas = () => {
    Axios.get(urlRentas).subscribe({
      next: (res) => {
        console.log('resultado', res.data);
        setRentas(res.data);
      },
      error: (error) => {
        console.log('error', error);
      },
    });
  };

  useEffect(() => {
    getRentas();
  }, []);

  return (
    <div>
      <FormControl sx={{ m: 2, minWidth: 100 }} variant="standard">
        <NativeSelect id="demo-controlled-open-select" value={age} onChange={handleChange} input={<BootstrapInput />}>
          {rentas.map((item) => (
            <React.Fragment key={item.id_renta}>
              <option value={item.dias_renta}>{item.descripcion_renta}</option>
            </React.Fragment>
          ))}
        </NativeSelect>
      </FormControl>
    </div>
  );
}

export default SelectRenta;
