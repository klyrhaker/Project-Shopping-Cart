function Button(props) {
  const { className, children, onClick, ...rest } = props;
  return (
    <button className={className} onClick={onClick} {...rest}>
      {children}
    </button>
  );
}
export default Button;
