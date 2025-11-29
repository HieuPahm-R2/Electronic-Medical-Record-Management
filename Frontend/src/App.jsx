import { RouterProvider } from "react-router-dom";
import router from "./routes/index.jsx";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from "react";
import Loading from "./components/share/ux/Loading.jsx";
import { fetchAccount } from "./redux/slice/accountSlice.js";

function App() {
  const dispatch = useDispatch()
  const isLoading = useSelector(state => state.account.isLoading)
  const rootRef = useRef < HTMLDivElement > (null);

  useEffect(() => {
    if (rootRef && rootRef.current) {
      rootRef.current.scrollIntoView({ behavior: 'smooth' });
    }

  }, [location]);

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
