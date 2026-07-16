"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  registerPlayer,
  type RegisterPlayerInput,
} from "../services/registration-service";
import styles from "./registration-form.module.css";

type RegistrationData = RegisterPlayerInput;

export function RegistrationForm() {
  const [registeredPlayer, setRegisteredPlayer] = useState<string | null>(null);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<RegistrationData>({ mode: "onBlur" });

  const onSubmit = async (data: RegistrationData) => {
    setSubmitError(null);
    setRegisteredPlayer(null);

    try {
      const player = await registerPlayer(data);
      setRegisteredPlayer(player.playerName);
      reset();
    } catch (error) {
      setSubmitError(
        error instanceof Error
          ? error.message
          : "No fue posible completar el registro. Inténtalo nuevamente.",
      );
    }
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className={styles.fields}>
        <div className={styles.field}>
          <label htmlFor="name">Nombre</label>
          <input
            id="name"
            type="text"
            autoComplete="name"
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? "name-error" : undefined}
            {...register("name", {
              required: "Escribe tu nombre.",
              minLength: { value: 2, message: "Usa al menos 2 caracteres." },
            })}
          />
          {errors.name && <p id="name-error" className={styles.error}>{errors.name.message}</p>}
        </div>

        <div className={styles.field}>
          <label htmlFor="playerName">Nombre de jugador</label>
          <input
            id="playerName"
            type="text"
            autoComplete="nickname"
            aria-invalid={Boolean(errors.playerName)}
            aria-describedby={errors.playerName ? "player-name-error" : undefined}
            {...register("playerName", {
              required: "Elige tu nombre de jugador.",
              minLength: { value: 3, message: "Usa al menos 3 caracteres." },
              maxLength: { value: 24, message: "Usa máximo 24 caracteres." },
            })}
          />
          {errors.playerName && <p id="player-name-error" className={styles.error}>{errors.playerName.message}</p>}
        </div>

        {/* <div className={styles.field}>
          <label htmlFor="age">Edad</label>
          <input
            id="age"
            type="number"
            inputMode="numeric"
            min={12}
            max={120}
            aria-invalid={Boolean(errors.age)}
            aria-describedby={errors.age ? "age-error" : undefined}
            {...register("age", {
              valueAsNumber: true,
              required: "Indica tu edad.",
              min: { value: 12, message: "Debes tener al menos 12 años." },
              max: { value: 120, message: "Ingresa una edad válida." },
            })}
          />
          {errors.age && <p id="age-error" className={styles.error}>{errors.age.message}</p>}
        </div> */}

        <div className={styles.field}>
          <label htmlFor="email">Correo</label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            {...register("email", {
              required: "Escribe tu correo.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Ingresa un correo válido.",
              },
            })}
          />
          {errors.email && <p id="email-error" className={styles.error}>{errors.email.message}</p>}
        </div>
      </div>

      <button className={styles.submit} type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Sellando inscripción…" : "Confirmar"}
      </button>

      {submitError && (
        <p className={styles.submitError} role="alert">
          {submitError}
        </p>
      )}

      {registeredPlayer && (
        <p className={styles.success} role="status">
          ¡Bienvenido, {registeredPlayer}! Tu inscripción ha sido registrada.
        </p>
      )}
    </form>
  );
}
