import { Dispatch, SetStateAction, useCallback, useState } from 'react';

export default function useToggle(
  initialValue?: boolean,
): [boolean, () => void, Dispatch<SetStateAction<boolean>>] {
  const [value, setValue] = useState(!!initialValue);
  const toggle = useCallback(() => {
    setValue((prev) => !prev);
  }, []);

  return [value, toggle, setValue];
}
