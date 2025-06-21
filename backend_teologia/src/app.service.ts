import { Injectable } from '@nestjs/common';
import { version as pkgVersion } from '../package.json';

export interface StatusPayload {
  status: 'ok';
  message: string;
  version: string;
  commit?: string;
  environment: 'production' | 'staging' | 'development' | string;
  port?: number;
  uptime: number;
  startedAt: string;
  timestamp: string;
  node: string;
  memoryUsage?: NodeJS.MemoryUsage;  
}

@Injectable()
export class AppService {
  private readonly startedAt = Date.now();

  getStatus(): StatusPayload {
    const now = Date.now();

    return {
      status: 'ok',
      message: 'API do Projeto Teologia FATEAL funcionando!',
      version: process.env.npm_package_version ?? pkgVersion,
      commit: process.env.COMMIT_SHA,
      environment: (process.env.NODE_ENV ?? 'development') as StatusPayload['environment'],
      port: process.env.PORT ? Number(process.env.PORT) : undefined,
      uptime: Math.floor((now - this.startedAt) / 1000),
      startedAt: new Date(this.startedAt).toISOString(),
      timestamp: new Date(now).toISOString(),
      node: process.version,
      memoryUsage: process.memoryUsage(),
    };
  }
}