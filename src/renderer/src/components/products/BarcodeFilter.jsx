import { useContext, useState } from 'react'
import { ProductPageContext } from '../../context/productPageContext'
import { TextInput, Button } from 'flowbite-react'

const BarcodeFilter = () => {
  const { handleBarcodefilter, barcode, setBarcode } = useContext(ProductPageContext)

  const handleInputChange = (event) => {
    const value = event.target.value
    setBarcode(value)
    handleBarcodefilter(value)
  }

  return (
    <div className="flex items-center space-x-4">
      <TextInput
        id="barcodeFilter"
        placeholder="Trouver par code barre..."
        value={barcode}
        onChange={handleInputChange}
      />
    </div>
  )
}

export default BarcodeFilter
