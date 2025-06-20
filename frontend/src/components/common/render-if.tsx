interface Props {
  condition: boolean;
  children: React.ReactNode;
}

const RenderIf: React.FC<Props> = ({ condition, children }) => {
  return condition ? <>{children}</> : null;
};

export default RenderIf;
