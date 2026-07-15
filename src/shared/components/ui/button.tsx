import type { ButtonHTMLAttributes } from "react";
import styles from "./ui.module.css";

type ButtonVariant = "primary" | "secondary" | "ghost" | "danger";
type ButtonSize = "small" | "medium" | "large";

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

const variants: Record<ButtonVariant, string> = { primary: styles.buttonPrimary, secondary: styles.buttonSecondary, ghost: styles.buttonGhost, danger: styles.buttonDanger };
const sizes: Record<ButtonSize, string> = { small: styles.buttonSmall, medium: "", large: styles.buttonLarge };

export function Button({ className = "", variant = "primary", size = "medium", type = "button", ...props }: ButtonProps) {
  return <button className={`${styles.button} ${variants[variant]} ${sizes[size]} ${className}`.trim()} type={type} {...props} />;
}
