import React from 'react';
import { Navigate, useSearchParams } from "react-router-dom";

export default function RedirectWithHash({ param = 'to' }) {
  const [searchParams] = useSearchParams();
  const path = searchParams.get(param) || '/';

	return (
    <Navigate to={path + location.hash} replace />
  );
}
