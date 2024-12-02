// cartActions.js
import axios from 'axios';
import { addCartItemRequest, addCartItemSuccess, addCartItemFailure } from './cartSlice';

export const fetchCartItems = () => async (dispatch) => {
    dispatch(addCartItemRequest());
    try {
        const response = await axios.get(`http://localhost:5001/api/v1/livedog/${id}`);
        dispatch(addCartItemSuccess(response.data.items));
    } catch (error) {
        dispatch(addCartItemFailure(error.message));
    }
};
