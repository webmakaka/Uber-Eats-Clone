import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'common/common.constants';
import { IMainModuleOptions } from 'mail/mail.interfaces';

@Module({})
export class MailModule {
  static forRoot(options: IMainModuleOptions): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
      ],
      exports: [],
    };
  }
}
