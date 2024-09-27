import Script from 'next/script';
import { Input } from './ui/input';
import { clientEnv } from '@/env/client';
import { useImperativeHandle, useRef } from 'react';

export type TgmapsAddress = { city: string; fullAddress: string };

export default function GmapsAutocompleteAddress({
  form,
  innerRef,
}: {
  form: any;
  innerRef: any;
}) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(innerRef, () => {
    return {
      reset: () => {
        if (inputRef.current) {
          inputRef.current.value = '';
          form.setValue('city', '');
          form.setValue('address', '');
        }
      },
    };
  });

  let autocomplete: any = null;

  function onPlaceChanged() {
    const { name, formatted_address } = autocomplete.getPlace();
    form.setValue('city', name);
    form.setValue('address', formatted_address);
  }

  function initializeGmaps() {
    if ((window as any).google) {
      autocomplete = new (window as any).google.maps.places.Autocomplete(
        document.getElementById('autocomplete'),
        {
          types: ['(cities)'],
        }
      );
      autocomplete.addListener('place_changed', onPlaceChanged);
    }
  }
  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${clientEnv.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
        strategy="lazyOnload"
        onLoad={initializeGmaps}
      />

      <Input
        ref={inputRef}
        id="autocomplete"
        type="text"
        className="w-full bg-gray-800 border-none text-white"
        placeholder="Where is the job located?"
      />
    </>
  );
}
