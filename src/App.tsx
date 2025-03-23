import { useRoutes } from 'react-router-dom'


import AdminLayout from './layout/admin'
import Dashboard from './layout/admin/quanLySanPham'
import AddDanhMuc from './layout/admin/addDanhMuc'
import EditDanhMuc from './layout/admin/editDanhMuc'
import DanhMucDB from './layout/admin/quanLyDanhMuc'
import AddProduct from './layout/admin/addSanPham'
import EditProduct from './layout/admin/editSanPham'



import ClientLayout from './layout/cilent'
import HomeClient from './layout/cilent/home'
import ListClient from './layout/cilent/listproduct'
import Detail from './layout/cilent/detailproduct'
import Login from './layout/cilent/login'
import Register from './layout/cilent/register'
import DetailUser from './layout/cilent/userdetail'

function App() {
    // Khai báo routes
    const routes = useRoutes([
      

      {path:'/dashboard',element:<AdminLayout/>,children:[
        {path:'',element:<Dashboard/>},
        {path:'product-add',element:<AddProduct/>},
        {path:'danhmuc-add',element:<AddDanhMuc/>},
        {path:'danhmuc-edit/:id',element:<EditDanhMuc/>},
        {path:'product-edit/:id',element:<EditProduct/>},
        {path:'danhmuc',element:<DanhMucDB/>},

        // {path:'/product-edit/:id',element:<EditProduct/>}
      ]},
      {path:'/',element:<ClientLayout/>,children:[
       {path:'',element:<HomeClient/>},
       {path:'list-product',element:<ListClient/>},
       {path:'product-detail/:id',element:<Detail/>},
       {path:'dang-ky',element:<Register/>},
       {path:'dang-nhap',element:<Login/>},
       {path:'user-detail/:id',element:<DetailUser/>},
       

      ]}
    ])
    return routes
}
 
export default App