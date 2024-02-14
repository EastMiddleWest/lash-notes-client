
import {useLocation, Navigate} from 'react-router-dom'

const HistoryWrapper = ({to}:{to: string}) => {
  const prevRoute = useLocation();
  return <Navigate to={to} state={{ prevRoute }} replace />
}

export default HistoryWrapper