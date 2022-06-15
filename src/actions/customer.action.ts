import { Dispatch } from 'redux';

// types
import { ICustomer } from 'models/ICustomer';
import { ICustomerActionTypes } from 'models/ICustomerState';

// services
import httpRequest from 'services/httpRequest';

// configs
import { CUSTOMERS_URI } from 'configs/uri';

export const getCustomers = () => async (dispatch: Dispatch<any>) => {
  customersIsLoading(true);
  httpRequest
    .get(CUSTOMERS_URI)
    .then((result) => {
      dispatch({ type: ICustomerActionTypes.GET_CUSTOMERS_SUCCESSFUL, customers: result.data });
    })
    .catch((result) => {
      dispatch({ type: ICustomerActionTypes.GET_CUSTOMERS_FAILED, error: result });
    })
    .finally(() => {
      customersIsLoading(false);
    });
};

export const getCustomer = (customerCode: string, projectCode: string) => async (dispatch: Dispatch<any>) => {
  const url = `${CUSTOMERS_URI}/${customerCode}/${projectCode}`;
  httpRequest
    .get(url)
    .then((result) => {
      dispatch({ type: ICustomerActionTypes.GET_CUSTOMER_SUCCESSFUL, customer: result.data });
    })
    .catch((result) => {
      dispatch({ type: ICustomerActionTypes.GET_CUSTOMER_FAILED, error: result });
    });
};

export const createCustomer = (customer: ICustomer) => async (dispatch: Dispatch<any>) => {
  httpRequest
    .post(CUSTOMERS_URI, customer)
    .then((result) => {
      dispatch({ type: ICustomerActionTypes.CREATE_CUSTOMER_SUCCESSFUL, customer: result.data });
    })
    .catch((result) => {
      dispatch({ type: ICustomerActionTypes.CREATE_CUSTOMER_FAILED, error: result });
    });
};

export const updateCustomer = (customer: ICustomer) => async (dispatch: Dispatch<any>) => {
  httpRequest
    .put(CUSTOMERS_URI, customer)
    .then((result) => {
      dispatch({ type: ICustomerActionTypes.EDIT_CUSTOMER_SUCCESSFUL, customer: result.data });
    })
    .catch((result) => {
      dispatch({ type: ICustomerActionTypes.EDIT_CUSTOMER_FAILED, error: result });
    });
};

export const deleteCustomer = (customerid: number) => async (dispatch: Dispatch<any>) => {
  const url = `${CUSTOMERS_URI}/${customerid}`;
  httpRequest
    .delete(url)
    .then((result) => {
      dispatch({ type: ICustomerActionTypes.DELETE_CUSTOMER_SUCCESSFUL, customer: result.data });
    })
    .catch((result) => {
      dispatch({ type: ICustomerActionTypes.DELETE_CUSTOMER_FAILED, error: result });
    });
};

export const customersIsLoading = (flag: boolean) => async (dispatch: Dispatch<any>) => {
  dispatch({ type: ICustomerActionTypes.CUSTOMERS_IS_LOADING, isLoading: flag });
};
