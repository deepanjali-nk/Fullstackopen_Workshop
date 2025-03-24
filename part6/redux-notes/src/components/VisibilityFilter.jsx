import { useDispatch } from "react-redux";
import { filterChange } from "../reducers/filterReducer";

const VisibilityFilter = () => {
    const filterSelected = (filter) => {
        console.log('filterSelected', filter);
        dispatch(filterChange(filter)); 
        // setFilter(filter);
      };
    const dispatch = useDispatch();
    const filter = useSelector(state => state.filter);

    return(
    <div>
    all          <input type="radio" name="filter"
    onChange={() => filterSelected('ALL')} checked={filter==='ALL'} />
    important    <input type="radio" name="filter"
    onChange={() => filterSelected('IMPORTANT')} />
    nonimportant <input type="radio" name="filter"
    onChange={() => filterSelected('NONIMPORTANT')} />
    </div>
    )
}

export default VisibilityFilter;