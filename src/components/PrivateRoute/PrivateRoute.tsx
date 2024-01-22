import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getUser } from '../../helpers/selectors';
interface PrivateRouteProps {
	children: ReactNode;
}
const PrivateRoute = ({ children }: PrivateRouteProps) => {
	const user = useSelector(getUser);
	const isAdmin = user.role === 'admin';
	return isAdmin ? <>{children}</> : <Navigate to={'/login'}></Navigate>;
};

export default PrivateRoute;
