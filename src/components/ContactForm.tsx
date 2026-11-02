import { useState, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { site } from '../content/site';
import { buildMailto, submitContact } from '../lib/contact';
import { PROJECT_TYPES, validateContact, type ContactErrors, type ContactValues } from '../lib/validation';
import { primaryButtonClass } from './styles';

type Status = 'idle' | 'sending' | 'sent' | 'unconfigured' | 'error';

const FIELD_IDS: Record<keyof ContactValues, string> = {
  name: 'contato-nome',
  email: 'contato-email',
  phone: 'contato-telefone',
  projectType: 'contato-tipo',
  message: 'contato-mensagem',
  consent: 'contato-consentimento',
};

const emptyValues: ContactValues = { name: '', email: '', phone: '', projectType: '', message: '', consent: false };

const inputClass = (invalid: boolean) =>
  `w-full border-b bg-transparent py-3 text-lg outline-none transition-colors duration-500 focus:border-olive ${
    invalid ? 'border-clay' : 'border-ink/30'
  }`;

export function ContactForm() {
  const [searchParams] = useSearchParams();
  const presetType = searchParams.get('tipo') ?? '';
  const [values, setValues] = useState<ContactValues>({
    ...emptyValues,
    projectType: (PROJECT_TYPES as readonly string[]).includes(presetType) ? presetType : '',
  });
  const [errors, setErrors] = useState<ContactErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  function update<K extends keyof ContactValues>(key: K, value: ContactValues[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const found = validateContact(values);
    setErrors(found);

    const firstInvalid = (Object.keys(found) as (keyof ContactValues)[])[0];
    if (firstInvalid) {
      document.getElementById(FIELD_IDS[firstInvalid])?.focus();
      return;
    }

    setStatus('sending');
    const result = await submitContact(site.contactEndpoint, values);
    if (result.ok) {
      setStatus('sent');
      setValues({ ...emptyValues });
      return;
    }
    setStatus(result.reason === 'not-configured' ? 'unconfigured' : 'error');
  }

  const mailto = buildMailto(site.email, values);

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-10" aria-describedby="contato-aviso">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <label htmlFor={FIELD_IDS.name} className="block text-sm text-stone">Nome completo</label>
          <input
            id={FIELD_IDS.name}
            autoComplete="name"
            value={values.name}
            onChange={(e) => update('name', e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'erro-nome' : undefined}
            className={inputClass(Boolean(errors.name))}
          />
          {errors.name && <p id="erro-nome" className="mt-2 text-sm text-clay">{errors.name}</p>}
        </div>

        <div>
          <label htmlFor={FIELD_IDS.email} className="block text-sm text-stone">E-mail</label>
          <input
            id={FIELD_IDS.email}
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(e) => update('email', e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'erro-email' : undefined}
            className={inputClass(Boolean(errors.email))}
          />
          {errors.email && <p id="erro-email" className="mt-2 text-sm text-clay">{errors.email}</p>}
        </div>

        <div>
          <label htmlFor={FIELD_IDS.phone} className="block text-sm text-stone">Telefone com DDD (opcional)</label>
          <input
            id={FIELD_IDS.phone}
            type="tel"
            inputMode="tel"
            autoComplete="tel"
            value={values.phone}
            onChange={(e) => update('phone', e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={errors.phone ? 'erro-telefone' : undefined}
            className={inputClass(Boolean(errors.phone))}
          />
          {errors.phone && <p id="erro-telefone" className="mt-2 text-sm text-clay">{errors.phone}</p>}
        </div>

        <div>
          <label htmlFor={FIELD_IDS.projectType} className="block text-sm text-stone">Tipo de projeto</label>
          <select
            id={FIELD_IDS.projectType}
            value={values.projectType}
            onChange={(e) => update('projectType', e.target.value)}
            aria-invalid={Boolean(errors.projectType)}
            aria-describedby={errors.projectType ? 'erro-tipo' : undefined}
            className={`${inputClass(Boolean(errors.projectType))} bg-paper`}
          >
            <option value="">Selecione</option>
            {PROJECT_TYPES.map((type) => (
              <option key={type} value={type}>{type}</option>
            ))}
          </select>
          {errors.projectType && <p id="erro-tipo" className="mt-2 text-sm text-clay">{errors.projectType}</p>}
        </div>
      </div>

      <div>
        <label htmlFor={FIELD_IDS.message} className="block text-sm text-stone">Sobre o projeto</label>
        <textarea
          id={FIELD_IDS.message}
          rows={5}
          value={values.message}
          onChange={(e) => update('message', e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={errors.message ? 'erro-mensagem' : undefined}
          className={`${inputClass(Boolean(errors.message))} resize-y`}
        />
        {errors.message && <p id="erro-mensagem" className="mt-2 text-sm text-clay">{errors.message}</p>}
      </div>

      <div>
        <div className="flex items-start gap-3">
          <input
            id={FIELD_IDS.consent}
            type="checkbox"
            checked={values.consent}
            onChange={(e) => update('consent', e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? 'erro-consentimento' : undefined}
            className="mt-1 h-4 w-4 accent-olive"
          />
          <label htmlFor={FIELD_IDS.consent} className="text-sm text-stone">
            Autorizo o uso dos meus dados apenas para retorno deste contato.
          </label>
        </div>
        {errors.consent && <p id="erro-consentimento" className="mt-2 text-sm text-clay">{errors.consent}</p>}
      </div>

      <div className="flex flex-col gap-6 md:flex-row md:items-center">
        <button type="submit" disabled={status === 'sending'} className={`${primaryButtonClass} disabled:opacity-60`}>
          {status === 'sending' ? 'Enviando…' : 'Enviar mensagem'}
        </button>
        <p id="contato-aviso" className="text-sm text-stone">
          Respondemos em até dois dias úteis.
        </p>
      </div>

      <div role="status" aria-live="polite" className="text-base">
        {status === 'sent' && <p>Recebemos sua mensagem. Retornamos em breve.</p>}
        {status === 'unconfigured' && (
          <p>
            O envio pelo site ainda não está configurado. Você pode{' '}
            <a href={mailto} className="underline underline-offset-4 hover:text-olive">enviar pelo seu aplicativo de e-mail</a>.
          </p>
        )}
        {status === 'error' && (
          <p>
            Não foi possível enviar agora. Tente novamente ou{' '}
            <a href={mailto} className="underline underline-offset-4 hover:text-olive">envie pelo e-mail</a>.
          </p>
        )}
      </div>
    </form>
  );
}
