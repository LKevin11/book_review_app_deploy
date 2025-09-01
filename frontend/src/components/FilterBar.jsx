function FilterBar({filters, setFilters}){


    function handleChange(e){
        setFilters({...filters,[e.target.name]:e.target.value,page:1})
    }

    return (
        <div className="filter-bar">
            <input name="title" value={filters.title} onChange={handleChange} placeholder="Title"/>
            <input name="author" value={filters.author} onChange={handleChange} placeholder="Author"/>
            <input name="genre" value={filters.genre} onChange={handleChange} placeholder="Genre"/>
            <select name="sort" value={filters.sort} onChange={handleChange} className="border p-2">
                <option value="title">Title</option>
                <option value="author">Author</option>
                <option value="genre">Genre</option>
            </select>
            <select name="order" value={filters.order} onChange={handleChange}>
                <option value="ASC">Asc</option>
                <option value="DESC">Desc</option>
            </select>
        </div>
    )

}

export default FilterBar