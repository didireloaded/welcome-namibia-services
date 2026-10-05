import { Check } from "lucide-react";
export function ProgressSteps({
  steps,
  current,
}: {
  steps: readonly string[];
  current: number;
}) {
  return (
    <ol className="form-progress" aria-label="Request progress">
      {steps.map((step, index) => (
        <li
          className={index <= current ? "reached" : ""}
          aria-current={index === current ? "step" : undefined}
          key={step}
        >
          <b>{index < current ? <Check size={12} /> : index + 1}</b>
          <small>{step}</small>
        </li>
      ))}
    </ol>
  );
}
