// src/app.service.ts
import { Injectable } from '@nestjs/common';
import { version as pkgVersion } from '../package.json';

interface StatusPayload {
  status: 'ok';
  message: string;
  version: string;
  commit?: string;
  environment: 'production' | 'staging' | 'development' | string;
  port?: number;
  uptime: number;          // em segundos
  startedAt: string;       // ISO-8601
  timestamp: string;       // ISO-8601
}

@Injectable()
export class AppService {
  /** Armazena o instante em que a aplicação foi bootstrapada */
  private readonly startedAt = Date.now();

  /**
   * Retorna um payload enxuto porém útil para health-checks,
   * monitoramento (Kubernetes, Traefik, Uptime-Robot, etc.) e
   * dashboards internos.
   */
  getStatus(): StatusPayload {
    const now = Date.now();

    return {
      status: 'ok',
      message: 'API do Projeto Teologia FATEAL funcionando!',
      version: process.env.npm_package_version ?? pkgVersion,
      commit : process.env.COMMIT_SHA,            // opcional (CI)
      environment: (process.env.NODE_ENV ?? 'development') as StatusPayload['environment'],
      port: process.env.PORT ? Number(process.env.PORT) : undefined,
      uptime: Number(((now - this.startedAt) / 1000).toFixed(0)),
      startedAt: new Date(this.startedAt).toISOString(),
      timestamp : new Date(now).toISOString(),
    };
  }
}