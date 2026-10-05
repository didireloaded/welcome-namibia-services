import {
  useId,
  type InputHTMLAttributes,
  type SelectHTMLAttributes,
  type ReactNode,
} from "react";
import { cn } from "@/lib/utils";
type Common = {
  label: string;
  error?: string;
  hint?: string;
  optional?: boolean;
};
export function Field({
  label,
  error,
  hint,
  optional,
  id,
  className,
  ...props
}: Common & InputHTMLAttributes<HTMLInputElement>) {
  const generated = useId();
  const inputId = id || generated;
  const messageId = `${inputId}-message`;
  return (
    <label className={cn("ui-field", className)} htmlFor={inputId}>
      <span className="ui-field-label">
        {label}
        {optional && <span className="optional"> optional</span>}
      </span>
      <input
        id={inputId}
        aria-invalid={!!error}
        aria-describedby={error || hint ? messageId : undefined}
        {...props}
      />
      {error ? (
        <small className="field-error" id={messageId}>
          {error}
        </small>
      ) : (
        hint && (
          <small className="ui-field-hint" id={messageId}>
            {hint}
          </small>
        )
      )}
    </label>
  );
}
export function SelectField({
  label,
  error,
  hint,
  id,
  className,
  children,
  ...props
}: Common & SelectHTMLAttributes<HTMLSelectElement> & { children: ReactNode }) {
  const generated = useId();
  const selectId = id || generated;
  const messageId = `${selectId}-message`;
  return (
    <label className={cn("ui-field", className)} htmlFor={selectId}>
      <span className="ui-field-label">{label}</span>
      <select
        id={selectId}
        aria-invalid={!!error}
        aria-describedby={error || hint ? messageId : undefined}
        {...props}
      >
        {children}
      </select>
      {error ? (
        <small className="field-error" id={messageId}>
          {error}
        </small>
      ) : (
        hint && (
          <small className="ui-field-hint" id={messageId}>
            {hint}
          </small>
        )
      )}
    </label>
  );
}
