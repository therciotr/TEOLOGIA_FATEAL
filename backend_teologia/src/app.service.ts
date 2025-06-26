import { Injectable, Logger } from '@nestjs/common';
import { memoryUsage, version as nodeVersion } from 'process';
import { readFileSync, existsSync } from 'fs';
import { join } from 'path';

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
  memoryUsage: {
    rss: number;
    heapTotal: number;
    heapUsed: number;
    external: number;
    arrayBuffers?: number;
  };
}

@Injectable()
export class AppService {
  private readonly startedAt: number = Date.now();
  private readonly logger = new Logger(AppService.name);
  private readonly pkgVersion: string;

  constructor() {
    this.pkgVersion = this.loadPackageVersion();
    this.logger.log(`✅ API iniciada em ${new Date(this.startedAt).toISOString()}`);
  }

  private loadPackageVersion(): string {
    const localPath = join(__dirname, '..', '..', 'package.json'); // local dev
    const distPath = join(__dirname, 'package.json'); // docker dist build

    const pathToUse = existsSync(distPath) ? distPath : localPath;

    if (existsSync(pathToUse)) {
      try {
        const pkg = JSON.parse(readFileSync(pathToUse, 'utf-8'));
        return pkg.version || '0.0.0';
      } catch (err) {
        this.logger.error('❌ Erro ao ler package.json', err);
        return 'unknown';
      }
    }

    this.logger.warn(`⚠️ package.json não encontrado em: ${pathToUse}`);
    return 'unknown';
  }

  getStatus(): StatusPayload {
    const now = Date.now();
    const memory = memoryUsage();

    return {
      status: 'ok',
      message: 'API do Projeto Teologia FATEAL funcionando!',
      version: this.pkgVersion,
      commit: process.env.COMMIT_SHA || 'unknown',
      environment: (process.env.NODE_ENV as StatusPayload['environment']) || 'development',
      port: process.env.PORT ? Number(process.env.PORT) : undefined,
      uptime: Math.floor((now - this.startedAt) / 1000),
      startedAt: new Date(this.startedAt).toISOString(),
      timestamp: new Date(now).toISOString(),
      node: nodeVersion,
      memoryUsage: {
        rss: memory.rss,
        heapTotal: memory.heapTotal,
        heapUsed: memory.heapUsed,
        external: memory.external,
        arrayBuffers: memory.arrayBuffers,
      },
    };
  }
}
