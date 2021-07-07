import styled from 'styled-components';
import { useSelector, useDispatch } from 'react-redux'
import {
  changeEditedId,
  fetchServices,
  deleteService
} from '../../Reducers/Reducers';
import React, { useEffect } from "react";
import Spinner from "../Spinner/Spinner";
import Error from "../Error/Error";
import { Link, useRouteMatch, } from "react-router-dom";

const List = styled.ul`
  margin-top: 25px;
  padding: 15px;
  border: 1px solid black;
  border-radius: 5px;

  & .item:nth-of-type(n + 2) {
    margin-top: 15px;
  }

  & .item {
    button {
      margin-left: 15px;
      &:hover {
        cursor: pointer;
      }
    }
  }
`

export default function ItemsList() {
  const state = useSelector(state => state.myState);
  const dispatch = useDispatch();
  const match = useRouteMatch();

  useEffect(() => {
    dispatch(fetchServices());
  }, [dispatch])


  const handleEdit = async (name, value, id) => {
    dispatch(changeEditedId(+id))
  }

  const handleRemove = async id => {
    dispatch(deleteService(id)) // подсветка от webstorm
  }

  return (
   <List>
     {(state.error && <Error/>) || (state.loading ? <Spinner /> : state.list.map(item =>
        <li key={item.id} className="item">
        {item.name} {item.price} <span>₽</span>
        <Link to={`${match.url}/${item.id}`}>
          <button onClick={() => handleEdit(item.name, item.price, item.id)}>✎</button>
        </Link>
        <button onClick={() => handleRemove(item.id)}>✕</button>
        </li>))}
   </List>
  )
}
