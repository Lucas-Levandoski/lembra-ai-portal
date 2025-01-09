
import { ReactNode } from 'react';
import { Dialog } from './dialog';
import { Button } from './button';
import { BouncingThreeDotsLoading } from './loadings';

type props = {
  isLoading?: boolean;
  isOpen?: boolean;
  content?: ReactNode;
  confirmMessage?: string;
  cancelMessage?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function ConfirmationDialog({ 
  isLoading = false,
  isOpen = false,
  cancelMessage = 'Não',
  confirmMessage = 'Sim',
  content,
  onConfirm = () => {},
  onCancel = () => {} }: props) {
  return (
    <Dialog isOpen={isOpen} onClose={onCancel}>
      <div className="flex flex-col gap-4">
        <h3>{content}</h3>
        <div className="flex justify-around">
          <Button variant="danger" onClick={() => onCancel() }>{cancelMessage}</Button>
          <Button onClick={() => onConfirm() }>
            {
              isLoading 
                ? <BouncingThreeDotsLoading />
                : confirmMessage
            }
          </Button>
        </div>
      </div> 
    </Dialog>
  );
}