import type { ButtonKind, ButtonSize } from '@launchpad-ui/button';

import cx from 'clsx';

import { SplitButtonContext } from './context';
import './styles/SplitButton.css';

type SplitButtonProps = {
  className?: string;
  kind?: ButtonKind.PRIMARY | ButtonKind.DEFAULT;
  size?: ButtonSize;
  disabled?: boolean;
  testId?: string;
  children?: React.ReactNode;
};

const SplitButton = ({ disabled, kind, size, children, testId, className }: SplitButtonProps) => {
  return (
    <SplitButtonContext.Provider value={{ disabled: !!disabled, kind, size }}>
      <div className={cx('SplitButton', className)} data-test-id={testId}>
        {children}
      </div>
    </SplitButtonContext.Provider>
  );
};

SplitButton.displayName = 'SplitButton';

export { SplitButton };
export type { SplitButtonProps };
