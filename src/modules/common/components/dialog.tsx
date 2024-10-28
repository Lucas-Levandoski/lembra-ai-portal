import { ReactNode } from 'react';
import { Dialog as ReactDialog, Transition, TransitionChild, DialogPanel  } from '@headlessui/react';

type props = {
  isOpen: boolean;
  children: ReactNode;
  onClose?: () => void;
}

export function Dialog({ isOpen = false, children, onClose = () => {} }: props) {
  return (
    // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions
    <Transition show={isOpen}>
      <ReactDialog onClose={() => onClose()}>
        <TransitionChild
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-slate-700 bg-opacity-60 transition-opacity" />
        </TransitionChild>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <TransitionChild
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <DialogPanel className="relative transform w-auto p-6 rounded-lg bg-white text-left shadow-lg transition-all sm:my-8">
                {children}
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </ReactDialog>
    </Transition>
  );
}