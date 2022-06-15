import { ICustomerActionTypes, ICustomerActionCreator, ICustomerState } from 'models/ICustomerState';

const initialState: ICustomerState = {
  customers: [],
  customer: null,
  error: null,
  isLoading: false,
};

const reducer = (state = initialState, { type, payload }: ICustomerActionCreator) => {
  switch (type) {
    case ICustomerActionTypes.GET_CUSTOMERS_SUCCESSFUL:
      return {
        ...state,
        customers: payload.customers,
      };
    case ICustomerActionTypes.GET_CUSTOMERS_FAILED:
      return {
        ...state,
        error: payload.error,
      };
    case ICustomerActionTypes.GET_CUSTOMER_SUCCESSFUL:
      return {
        ...state,
        customer: payload.customer,
      };
    case ICustomerActionTypes.GET_CUSTOMER_FAILED:
      return {
        ...state,
        error: payload.error,
      };
    case ICustomerActionTypes.EDIT_CUSTOMER_SUCCESSFUL:
      return {
        ...state,
        customer: payload.customer,
      };
    case ICustomerActionTypes.EDIT_CUSTOMER_FAILED:
      return {
        ...state,
        error: payload.error,
      };
    case ICustomerActionTypes.CREATE_CUSTOMER_SUCCESSFUL:
      return {
        ...state,
        customer: payload.customer,
      };
    case ICustomerActionTypes.CREATE_CUSTOMER_FAILED:
      return {
        ...state,
        error: payload.error,
      };
    case ICustomerActionTypes.DELETE_CUSTOMER_SUCCESSFUL:
      return {
        ...state,
        customer: payload.customer,
      };
    case ICustomerActionTypes.DELETE_CUSTOMER_FAILED:
      return {
        ...state,
        error: payload.error,
      };
    case ICustomerActionTypes.CUSTOMERS_IS_LOADING:
      return {
        ...state,
        isLoading: payload.isLoading,
      };
    default:
      return state;
  }
};

export default reducer;
