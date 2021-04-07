import { Inject, Injectable } from '@nestjs/common';
import { CONFIG_OPTIONS } from 'common/common.constants';
import * as FormData from 'form-data';
import got from 'got';
import { IMailModuleOptions } from 'mail/mail.interfaces';

@Injectable()
export class MailService {
  constructor(
    @Inject(CONFIG_OPTIONS) private readonly options: IMailModuleOptions,
  ) {
    this.sendEmail('testing', 'test');
  }

  private async sendEmail(subject: string, content: string) {
    const form = new FormData();
    form.append('from', `Marley <mailgun@${this.options.domain}>`);
    form.append('to', 'a3333333@gmail.com');
    form.append('subject', subject);
    form.append('template', 'verify-email');
    form.append('v:code', 'mycode');
    form.append('v:username', 'marley');

    try {
      const response = await got(
        `https://api.mailgun.net/v3/${this.options.domain}/messages`,
        {
          method: 'POST',
          headers: {
            Authorization: `Basic ${Buffer.from(
              `api:${this.options.apiKey}`,
            ).toString('base64')}`,
          },
          body: form,
        },
      );
      console.log(response.body);
    } catch (error) {
      console.log(error);
    }
  }
}
