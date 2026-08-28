import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  error?: string;
}

export function Input({ label, error, id, className = '', ...props }: InputProps) {
  const inputId = id || label.toLowerCase().replace(/\s+/g, '-');

  return (
    <div data-ev-id="ev_bd1e46942e" className="flex flex-col gap-1.5">
      <label data-ev-id="ev_7c18cf8ac3" htmlFor={inputId} className="text-sm font-medium text-charcoal">
        {label}
        {props.required && <span data-ev-id="ev_2afda66492" className="text-destructive ml-0.5">*</span>}
      </label>
      <input data-ev-id="ev_31aefefdd3"
      id={inputId}
      className={`w-full px-4 py-3 border border-border rounded-xl bg-white text-charcoal placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent transition-all ${error ? 'border-destructive ring-1 ring-destructive' : ''} ${className}`}
      {...props} />

      {error && <p data-ev-id="ev_cc7571a67a" className="text-sm text-destructive">{error}</p>}
    </div>);

}