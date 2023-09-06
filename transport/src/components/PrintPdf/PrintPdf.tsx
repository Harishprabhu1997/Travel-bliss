import { useRef } from 'react';
import ReactToPrint from 'react-to-print';
import QrDownload from '../QrDownload/QrDownload';
import { Button } from '@mui/material';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import './PrintPdf.scss'

function PrintPdf() {
  const componentRef = useRef<HTMLElement | null>(null);

  return (
    <div id='PrintPdf'>
      <ReactToPrint
        trigger={() => <Button variant="contained" color="success" className='download'>
          <CloudDownloadIcon />
        </Button>}
        content={() => componentRef.current}
      />
      <QrDownload ref={componentRef} />
    </div>
  )
}

export default PrintPdf
