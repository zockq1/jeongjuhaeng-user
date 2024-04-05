import { ReactNode } from 'react';

interface AsyncProps<T> {
  data: T | undefined;
  isLoading?: boolean;
  loadingComponent?: ReactNode;
  isError?: boolean;
  errorComponent?: ReactNode;
  children: (data: T) => ReactNode;
}

export default function Async<T>({
  data,
  isLoading,
  loadingComponent,
  errorComponent,
  isError,
  children,
}: AsyncProps<T>) {
  if (isLoading) {
    return loadingComponent;
  }

  if (isError) {
    return errorComponent;
  }

  if (data === undefined) return <div>데이터를 찾지 못했습니다.</div>;

  return <>{children(data)}</>;
}
