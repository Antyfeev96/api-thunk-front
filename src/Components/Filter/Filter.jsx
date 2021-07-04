import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux';
import { applyFilter, changeFilteredList } from '../../Reducers/Reducers';

const StyledFilter = styled.div`
  width: 100%;
  display: flex;
  margin-top: 25px;
  justify-content: space-evenly;
  align-items: center;
`

export default function Filter() {
  const filterString = useSelector(state => state.myState.filterString);
  const dispatch = useDispatch();
  
  const handleFilter = event => {
    const { value } = event.target;
    dispatch(applyFilter(value));
    dispatch(changeFilteredList())
  }

  return (
    <StyledFilter className="filter">
      <span>Поле фильтрации</span>
      <input onChange={handleFilter} className="filter__input" type="text" name="filter" value={filterString}/>
    </StyledFilter>
  )
}
