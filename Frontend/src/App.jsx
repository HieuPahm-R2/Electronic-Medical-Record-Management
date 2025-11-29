import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { fetchAccount } from "./redux/slice/accountSlice.js";
import Loading from "./components/share/ux/Loading.jsx";

function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.account.isLoading)

  useEffect(() => {
    if (
      window.location.pathname === '/login'
      || window.location.pathname === '/register'
    )
      return;
    dispatch(fetchAccount())
  }, [])
  return (
    <>
      {
        <RouterProvider router={router} />
      }
    </>
  );
}

export default App
