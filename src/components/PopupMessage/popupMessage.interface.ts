export interface Props {
  title: string | undefined;
  type: string | undefined;
  message: string | undefined;
  onClose: React.MouseEventHandler<HTMLImageElement> | undefined;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
}
