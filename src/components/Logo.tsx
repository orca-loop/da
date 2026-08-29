import logoImage from '@/assets/generated/logo.png';

export function Logo({ size = 'default' }: {size?: 'small' | 'default' | 'large';}) {
  const sizes = {
    small: { container: 'w-12 h-12' },
    default: { container: 'w-20 h-20' },
    large: { container: 'w-28 h-28' }
  };

  const s = sizes[size];

  return (
    <div data-ev-id="ev_da5c2a45cc" className="flex flex-col items-center">
      <div data-ev-id="ev_680e65dbc2"
      className={`${s.container} flex items-center justify-center`}>
        <img src={logoImage} alt="Hotel Amrit logo" className="w-full h-full object-cover" />
      </div>
      <p data-ev-id="ev_ec0535c4df" className="mt-2 text-[10px] tracking-[0.2em] text-charcoal-light font-medium uppercase">
        Luxury · Shining · Family
      </p>
    </div>);

}
