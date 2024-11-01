import { CgCheck } from 'react-icons/cg';
import { twMerge } from 'tailwind-merge';

type props = {
  isChecked: boolean;
  color: string;
  label: string;
  id: string;
  onChange: () => void;
}

export function Checkbox({ id, color, isChecked, label, onChange }: props) {
  return (
    <>
      <label htmlFor={`checkbox-${id}`} className="cursor-pointer flex items-center gap-3 relative">
        <input 
          className="opacity-0 absolute peer" 
          id={`checkbox-${id}`} 
          type="checkbox" 
          checked={isChecked} 
          onChange={onChange} 
        />
        <span 
          className={twMerge(
            'flex items-center justify-center transition-colors duration-200 border-2 cursor-pointer size-6 rounded-lg ring-offset-2 peer-focus:ring-2',
            `peer-checked:bg-${color}-500 peer-focus:ring-${color}-500`
          )}
        >
          <CgCheck className={twMerge('size-8 text-white', isChecked ? 'opacity-100' : 'opacity-0')} />
        </span>
        {label}
      </label>
    </>
  );
}