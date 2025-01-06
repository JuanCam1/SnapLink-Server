import {
  PrismaClientInitializationError,
  PrismaClientKnownRequestError,
  PrismaClientRustPanicError,
  PrismaClientValidationError,
} from "@prisma/client/runtime/library";

import type { Context } from "hono";

export const validateErrorCatch = (c: Context, error: unknown) => {
  if (error instanceof PrismaClientKnownRequestError) {
    if (error.code === "P2002") {
      return c.json({ error: "Violation of uncial in the database" }, 400);
    }
    if (error.code === "P2025") {
      return c.json({ error: "Registro no encontrado" }, 404);
    }

    return c.json({ error: "Error conocido en la base de datos" }, 500);
  }

  if (error instanceof PrismaClientValidationError) {
    return c.json(
      { error: "Error de validación en la consulta de base de datos" },
      400
    );
  }

  if (error instanceof PrismaClientInitializationError) {
    return c.json({ error: "Error al conectar con la base de datos" }, 500);
  }

  if (error instanceof PrismaClientRustPanicError) {
    return c.json({ error: "Error crítico en el motor de base de datos" }, 500);
  }
  return c.json({ error: "Error en servicio de base de datos" }, 500);
};
