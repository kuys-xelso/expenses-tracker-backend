import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { prisma } from '../db';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  constructor() {
    super();
    // Return the singleton instance to ensure we share the same connection pool
    return prisma as any;
  }

  async onModuleInit() {
    await (this as any).$connect();
  }
}
