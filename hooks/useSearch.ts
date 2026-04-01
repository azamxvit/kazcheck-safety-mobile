import { useState } from 'react';

export const useSearch = () => {
  const [loading, setLoading] = useState(false);
  // запрос к бэку
  return { loading, setLoading };
};
