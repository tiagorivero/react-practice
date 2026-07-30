import  './Filters.css';
import { useState , useId } from 'react';
import { useFilters } from '../hooks/useFilters.js';

export function Filters () {
    const { filters , setFilters } = useFilters();
    const [minPrice, setMinPrice] = useState(0);
    const minPriceFilterId = useId();
    const categoryFilterId = useId();

    const handleChangeMinPrice = (event) => {
        setFilters(prevState => ({
            ...prevState,
            minPrice: event.target.value
        }));
    }
    
    const handleChangeCategory = (event) => {
        setFilters(prevState => ({
            ...prevState, // para mantener el resto de los filtros sin cambios
            category: event.target.value
        }));
    }

    return (
        <section className="filters">
            <div>
                <label htmlFor={minPriceFilterId}>Precio Minimo:</label>
                <input 
                    type="range" 
                    id={minPriceFilterId}
                    min="0"
                    max="1000"
                    onChange={handleChangeMinPrice}
                    value={filters.minPrice}
                />
                <span>${filters.minPrice}</span>
            </div>

            <div>
                <label htmlFor={categoryFilterId}>Categoria:</label>
                <select id={categoryFilterId} onChange={handleChangeCategory}>
                    <option value="all">Todas</option>
                    <option value="laptops">Portatiles</option>
                    <option value="smartphones">Celulares</option>
                </select>
            </div>
        </section>
    )
}