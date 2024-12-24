
import React from 'react';
import './App.css';
import AdminHome from './component/home/home';
import CustomerHome from './component/home/customerhome';
import MainHome from './component/Mainhome/Mainhome';
import Addproduct from './component/Addproduct/Addproduct';
import Productdetails from './component/Productdetails/Products';
import Customerproducts from './component/Customerproduct/Customerproducts';
import { Routes, Route } from 'react-router-dom';
import Updateproducts from "./component/Updateproducts/Updateproducts";

import AddSupplier  from "./component/AddSupplier/AddSupplier";
import SupplierDetails  from "./component/SupplierDetails/SupplierDetails";
import UpdateSupplier  from "./component/UpdateSupplier/UpdateSupplier";

import AddAdminDelivery  from "./component/AddAdminDelivery/AddAdminDelivery";
import AddCustomerDelivery  from "./component/AddCustomerDelivery/AddCustomerDelivery";
import AdminDeliveryDetails  from "./component/AdminDeliveryDetails/AdminDeliveries";
import CustomerDeliveryDetails  from "./component/CustomerDeliveryDetails/CustomerDeliveries";
import UpdateAdminDelivery  from "./component/UpdateAdminDelivery/UpdateAdminDelivery";
import UpdateCustomerDelivery  from "./component/UpdateCustomerDelivery/UpdateCustomerDelivery";

import AddAdminMaintenance  from "./component/AddAdminMaintenance/AddAdminMaintenance";
import AddCustomerMaintenance  from "./component/AddCustomerMaintenance/AddCustomerMaintenance";
import AdminMaintenanceDetails  from "./component/AdminMaintenanceDetails/AdminMaintenances";
import CustomerMaintenanceDetails  from "./component/CustomerMaintenanceDetails/CustomerMaintenances";
import UpdateAdminMaintenance  from "./component/UpdateAdminMaintenance/UpdateAdminMaintenance";
import UpdateCustomerMaintenance  from "./component/UpdateCustomerMaintenance/UpdateCustomerMaintenance";

import { CartProvider } from './CartContext';
import Payment from './component/Payment/Payment';
import PaymentDetails from './component/PaymentDetails/PaymentDetails';
import MyOrders from './component/Orders/MyOrders';
import UpdateAddress from './component/Orders/UpdateAddress';
import AdminOrders from './component/AdminOrders/AdminOrders';
import Cart from "./component/Cart/Cart";
import Customerproduct from './component/Customerproduct/Customerproduct';

import AddEmployee from './component/AddEmployee/AddEmployee';
import EmployeeDetails from './component/EmployeeDetails/Employees';
import UpdateEmployee from './component/UpdateEmployee/UpdateEmployee';

import AddUser from './component/AddUser/AddUser';
import UserDetails from './component/UserDetails/Users';
import UpdateUser from './component/UpdateUser/UpdateUser';

import Register from './component/Register';
import Login from './component/Login';


function App() {
  return (
    <div>
      <CartProvider>
      <React.Fragment>
        <Routes>
          <Route path="/" element={<MainHome />} />
          <Route path="/mainhome" element={<MainHome />} />
          <Route path="/adminhome" element={<AdminHome />} />
          <Route path="/customerhome" element={<CustomerHome />} />
          <Route path="/addproduct" element={<Addproduct />} />
          <Route path="/productdetails" element={<Productdetails />} />
          <Route path="/productdetails/:id" element={<Updateproducts />} />
          <Route path="/productdetails/:id" element={<Updateproducts />} />
          <Route path="/customerproducts" element={<Customerproducts />} />


          
          <Route path="/addsupplier" element={<AddSupplier/>}/>
          <Route path="/supplierdetails" element={<SupplierDetails/>}/>
          <Route path="/supplierdetails/:id" element={<UpdateSupplier/>}/>

          <Route path="/addadminDelivery/:id" element={<AddAdminDelivery/>}/>
          <Route path="/addcustomerdelivery" element={<AddCustomerDelivery/>}/>
          <Route path="/admindeliverydetails" element={<AdminDeliveryDetails/>}/>
          <Route path="/customerdeliverydetails" element={<CustomerDeliveryDetails/>}/>
          <Route path="/adminDeliveries/:id" element={<UpdateAdminDelivery/>}/>
          <Route path="/customerDeliveries/:id" element={<UpdateCustomerDelivery/>}/>

          <Route path="/addadminMaintenance/:id" element={<AddAdminMaintenance/>}/>
          <Route path="/addcustomermaintenance" element={<AddCustomerMaintenance/>}/>
          <Route path="/adminmaintenancedetails" element={<AdminMaintenanceDetails/>}/>
          <Route path="/customermaintenancedetails" element={<CustomerMaintenanceDetails/>}/>
          <Route path="/adminMaintenances/:id" element={<UpdateAdminMaintenance/>}/>
          <Route path="/customerMaintenances/:id" element={<UpdateCustomerMaintenance/>}/>


          <Route path="/cart" element={<Cart />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/products/:id" element={<Customerproduct />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/paymentdetails" element={<PaymentDetails />} /> 
          <Route path="/myorders" element={<MyOrders />} />
          <Route path="/updateaddress/:id" element={<UpdateAddress />} />
          <Route path="/AdminOrders" element={<AdminOrders />} />

          <Route path="/addemployee" element={<AddEmployee />} />
          <Route path="/employeedetails" element={<EmployeeDetails />} />
          <Route path="/updateemployee/:id" element={<UpdateEmployee />} />

          <Route path="/adduser" element={<AddUser />} />
          <Route path="/userdetails" element={<UserDetails />} />
          <Route path="/updateuser/:id" element={<UpdateUser />} /> 


        
          <Route path="/register" component={Register} />
          <Route path="/Login" component={Login} />

 
        </Routes>
      </React.Fragment>
      </CartProvider>
    </div>
  );
}

export default App;

