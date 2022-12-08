import { ButtonProps as MButtonProps } from '@mui/material/Button';
import { Button as MButton } from '@mui/material';
import { LinkBehavior } from '../../theme';

type ButtonProps = {
  to?: string;
} & MButtonProps

export function Button(props: ButtonProps) {
  if (props.to || props.href) {
    const to = props.to || props.href;
    return (
      <MButton LinkComponent={LinkBehavior} {...props} href={to}>
        {props.children}
      </MButton>
    );
  }

  return <MButton {...props}>{props.children}</MButton>;
}
