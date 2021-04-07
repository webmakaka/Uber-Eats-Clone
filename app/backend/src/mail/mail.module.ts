import { DynamicModule, Module } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'common/common.constants';
import { IMailModuleOptions } from 'mail/mail.interfaces';
import { MailService } from 'mail/mail.service';

@Module({})
export class MailModule {
  static forRoot(options: IMailModuleOptions): DynamicModule {
    return {
      module: MailModule,
      providers: [
        {
          provide: CONFIG_OPTIONS,
          useValue: options,
        },
        MailService,
      ],
      exports: [MailService],
    };
  }
}
