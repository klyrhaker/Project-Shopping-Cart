import type { ComponentPropsWithoutRef } from "react";

type ButtonProps = ComponentPropsWithoutRef<"button">;

function Button(props: ButtonProps) {
  const { className, children, ...rest } = props;
  return (
    <button className={className} {...rest}>
      {children}
    </button>
  );
}
export default Button;
