import { useContext } from 'react'
import { CategoryContext } from '../../context/categoryContext'
import { ProductPageContext } from '../../context/productPageContext'
import { Select, Label } from 'flowbite-react'

const CategoryFilter = () => {
  const { setCategoryFilter } = useContext(ProductPageContext)
  const { categories } = useContext(CategoryContext)

  return (
    <div className="px-5 py-2.5 text-center inline-flex items-center m-2">
      <Label className="text-white" htmlFor="categoryFilter" value="Filtrer par categorie" />
      <Select
        id="categoryFilter"
        onChange={(event) => setCategoryFilter(event.target.value)}
        className="ml-2"
      >
        <option value="">Select a category</option>
        {categories.map((category) => (
          <option key={category._id} value={category._id}>
            {category.name}
          </option>
        ))}
      </Select>
    </div>
  )
}

export default CategoryFilter
